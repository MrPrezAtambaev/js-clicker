import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  type GameState,
  UPGRADES,
  ACHIEVEMENTS,
  calculateUpgradeCost,
  calculateTotalCPS,
} from "@code-clicker/shared";

interface GameStore extends GameState {
  // Actions
  click: () => void;
  buyUpgrade: (upgradeId: string) => void;
  tick: (deltaSeconds: number) => void;
  checkAchievements: () => string[];
  reset: () => void;
  loadState: (state: Partial<GameState>) => void;
  getUpgradeCost: (upgradeId: string) => number;
  canAffordUpgrade: (upgradeId: string) => boolean;
}

const initialState: GameState = {
  commits: 0,
  totalCommits: 0,
  commitsPerClick: 1,
  commitsPerSecond: 0,
  upgrades: {},
  achievements: [],
  totalClicks: 0,
  startedAt: Date.now(),
  playTime: 0,
  lastSaved: undefined,
};

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      click: () => {
        set((state) => ({
          commits: state.commits + state.commitsPerClick,
          totalCommits: state.totalCommits + state.commitsPerClick,
          totalClicks: state.totalClicks + 1,
        }));
      },

      buyUpgrade: (upgradeId: string) => {
        const state = get();
        const upgrade = UPGRADES.find((u) => u.id === upgradeId);
        if (!upgrade) return;

        const currentOwned = state.upgrades[upgradeId] || 0;
        const cost = calculateUpgradeCost(upgrade.baseCost, currentOwned);

        if (state.commits < cost) return;

        const newUpgrades = {
          ...state.upgrades,
          [upgradeId]: currentOwned + 1,
        };

        const newCPS = calculateTotalCPS(newUpgrades);

        set({
          commits: state.commits - cost,
          upgrades: newUpgrades,
          commitsPerSecond: newCPS,
        });
      },

      tick: (deltaSeconds: number) => {
        const state = get();
        if (state.commitsPerSecond > 0) {
          const gained = state.commitsPerSecond * deltaSeconds;
          set({
            commits: state.commits + gained,
            totalCommits: state.totalCommits + gained,
            playTime: state.playTime + deltaSeconds,
          });
        } else {
          set({
            playTime: state.playTime + deltaSeconds,
          });
        }
      },

      checkAchievements: () => {
        const state = get();
        const newAchievements: string[] = [];

        ACHIEVEMENTS.forEach((achievement) => {
          if (state.achievements.includes(achievement.id)) return;

          let unlocked = false;

          switch (achievement.id) {
            case "first-commit":
              unlocked = state.totalClicks >= 1;
              break;
            case "hello-world-ach":
              unlocked = Object.values(state.upgrades).some((count) => count > 0);
              break;
            case "100-commits":
              unlocked = state.totalCommits >= 100;
              break;
            case "1000-commits":
              unlocked = state.totalCommits >= 1000;
              break;
            case "10000-commits":
              unlocked = state.totalCommits >= 10000;
              break;
            case "100000-commits":
              unlocked = state.totalCommits >= 100000;
              break;
            case "million-commits":
              unlocked = state.totalCommits >= 1000000;
              break;
            case "full-stack":
              // Check if all upgrades up to React are owned
              const fullStackUpgrades = ["hello-world", "html", "css", "script", "jquery", "npm-install", "react"];
              unlocked = fullStackUpgrades.every((id) => (state.upgrades[id] || 0) > 0);
              break;
            case "10x-engineer":
              unlocked = state.commitsPerSecond >= 100;
              break;
            case "100x-engineer":
              unlocked = state.commitsPerSecond >= 1000;
              break;
            case "click-addict":
              unlocked = state.totalClicks >= 1000;
              break;
            case "open-source-hero":
              unlocked = state.playTime >= 3600; // 1 hour
              break;
            case "all-upgrades":
              unlocked = UPGRADES.every((u) => (state.upgrades[u.id] || 0) > 0);
              break;
          }

          if (unlocked) {
            newAchievements.push(achievement.id);
          }
        });

        if (newAchievements.length > 0) {
          set({
            achievements: [...state.achievements, ...newAchievements],
          });
        }

        return newAchievements;
      },

      reset: () => {
        set({
          ...initialState,
          startedAt: Date.now(),
        });
      },

      loadState: (loadedState: Partial<GameState>) => {
        set((state) => ({
          ...state,
          ...loadedState,
          commitsPerSecond: calculateTotalCPS(loadedState.upgrades || state.upgrades),
        }));
      },

      getUpgradeCost: (upgradeId: string) => {
        const state = get();
        const upgrade = UPGRADES.find((u) => u.id === upgradeId);
        if (!upgrade) return Infinity;
        return calculateUpgradeCost(upgrade.baseCost, state.upgrades[upgradeId] || 0);
      },

      canAffordUpgrade: (upgradeId: string) => {
        const state = get();
        return state.commits >= state.getUpgradeCost(upgradeId);
      },
    }),
    {
      name: "code-clicker-storage",
      partialize: (state) => ({
        commits: state.commits,
        totalCommits: state.totalCommits,
        commitsPerClick: state.commitsPerClick,
        commitsPerSecond: state.commitsPerSecond,
        upgrades: state.upgrades,
        achievements: state.achievements,
        totalClicks: state.totalClicks,
        startedAt: state.startedAt,
        playTime: state.playTime,
      }),
    }
  )
);
