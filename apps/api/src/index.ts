import { Elysia, t } from "elysia";
import { cors } from "@elysiajs/cors";
import {
  gameStateSchema,
  type GameState,
  type SaveGameResponse,
  type LoadGameResponse,
} from "@code-clicker/shared";

// In-memory storage (for simplicity - in production use a database)
const gameStates = new Map<string, { state: GameState; savedAt: number }>();

// Default user ID for single-player
const DEFAULT_USER_ID = "default";

const app = new Elysia()
  .use(cors())
  .get("/", () => ({
    name: "Code Clicker API",
    version: "1.0.0",
    endpoints: ["/save", "/load", "/health"],
  }))
  .get("/health", () => ({
    status: "ok",
    timestamp: Date.now(),
  }))
  .post(
    "/save",
    ({ body }): SaveGameResponse => {
      const userId = body.userId || DEFAULT_USER_ID;
      const savedAt = Date.now();

      // Validate game state with Zod
      const parseResult = gameStateSchema.safeParse(body.gameState);
      if (!parseResult.success) {
        return {
          success: false,
          savedAt: 0,
        };
      }

      gameStates.set(userId, {
        state: parseResult.data,
        savedAt,
      });

      console.log(`Game saved for user ${userId} at ${new Date(savedAt).toISOString()}`);

      return {
        success: true,
        savedAt,
      };
    },
    {
      body: t.Object({
        userId: t.Optional(t.String()),
        gameState: t.Any(),
      }),
    }
  )
  .get(
    "/load",
    ({ query }): LoadGameResponse => {
      const userId = query.userId || DEFAULT_USER_ID;
      const saved = gameStates.get(userId);

      if (!saved) {
        return {
          success: false,
          gameState: undefined,
        };
      }

      console.log(`Game loaded for user ${userId}`);

      return {
        success: true,
        gameState: saved.state,
      };
    },
    {
      query: t.Object({
        userId: t.Optional(t.String()),
      }),
    }
  )
  .listen(3001);

console.log(
  `🚀 Code Clicker API is running at ${app.server?.hostname}:${app.server?.port}`
);

export type App = typeof app;
