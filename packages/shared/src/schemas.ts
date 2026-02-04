import { z } from "zod";

// Upgrade schema
export const upgradeSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  baseCost: z.number(),
  cps: z.number(), // commits per second
  icon: z.string(),
  owned: z.number().default(0),
});

// Achievement schema
export const achievementSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  icon: z.string(),
  unlocked: z.boolean().default(false),
  unlockedAt: z.number().optional(),
});

// Game state schema
export const gameStateSchema = z.object({
  commits: z.number().default(0),
  totalCommits: z.number().default(0),
  commitsPerClick: z.number().default(1),
  commitsPerSecond: z.number().default(0),
  upgrades: z.record(z.string(), z.number()).default({}), // upgradeId -> count owned
  achievements: z.array(z.string()).default([]), // array of unlocked achievement ids
  totalClicks: z.number().default(0),
  startedAt: z.number().default(Date.now()),
  playTime: z.number().default(0), // in seconds
  lastSaved: z.number().optional(),
});

// API request/response schemas
export const saveGameRequestSchema = z.object({
  userId: z.string().optional(),
  gameState: gameStateSchema,
});

export const saveGameResponseSchema = z.object({
  success: z.boolean(),
  savedAt: z.number(),
});

export const loadGameRequestSchema = z.object({
  userId: z.string().optional(),
});

export const loadGameResponseSchema = z.object({
  success: z.boolean(),
  gameState: gameStateSchema.optional(),
});

// Type exports from schemas
export type Upgrade = z.infer<typeof upgradeSchema>;
export type Achievement = z.infer<typeof achievementSchema>;
export type GameState = z.infer<typeof gameStateSchema>;
export type SaveGameRequest = z.infer<typeof saveGameRequestSchema>;
export type SaveGameResponse = z.infer<typeof saveGameResponseSchema>;
export type LoadGameRequest = z.infer<typeof loadGameRequestSchema>;
export type LoadGameResponse = z.infer<typeof loadGameResponseSchema>;
