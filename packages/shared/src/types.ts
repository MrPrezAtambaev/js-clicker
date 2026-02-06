import type { Upgrade, Achievement } from "./schemas";

// Upgrade definitions with all game data
export const UPGRADES: Omit<Upgrade, "owned">[] = [
  {
    id: "cursor",
    name: "Курсор",
    description: "Двойная сила клика",
    baseCost: 50,
    cps: 0,
    clickMultiplier: 1,
    icon: "👆",
  },
  {
    id: "better-cursor",
    name: "Мощный курсор",
    description: "+3 к силе клика",
    baseCost: 500,
    cps: 0,
    clickMultiplier: 3,
    icon: "✌️",
  },
  {
    id: "auto-clicker",
    name: "Авто-кликер",
    description: "+10 к силе клика",
    baseCost: 5000,
    cps: 0,
    clickMultiplier: 10,
    icon: "🖱️",
  },
  {
    id: "hello-world",
    name: "Hello World",
    description: 'console.log("Hello World")',
    baseCost: 15,
    cps: 0.1,
    icon: "👋",
  },
  {
    id: "html",
    name: "HTML",
    description: "Статичная разметка <div>",
    baseCost: 100,
    cps: 0.5,
    icon: "📄",
  },
  {
    id: "css",
    name: "CSS",
    description: "Стили и красота ✨",
    baseCost: 500,
    cps: 2,
    icon: "🎨",
  },
  {
    id: "script",
    name: "<script>",
    description: "Интерактивность на странице",
    baseCost: 2000,
    cps: 8,
    icon: "⚡",
  },
  {
    id: "jquery",
    name: "jQuery",
    description: "$(document).ready()",
    baseCost: 10000,
    cps: 30,
    icon: "💲",
  },
  {
    id: "npm-install",
    name: "npm install",
    description: "node_modules бесконечность",
    baseCost: 50000,
    cps: 100,
    icon: "📦",
  },
  {
    id: "react",
    name: "React",
    description: "Компоненты и хуки",
    baseCost: 250000,
    cps: 400,
    icon: "⚛️",
  },
  {
    id: "typescript",
    name: "TypeScript",
    description: "Типобезопасность превыше всего",
    baseCost: 1000000,
    cps: 1500,
    icon: "📘",
  },
  {
    id: "docker",
    name: "Docker",
    description: "Контейнеризация всего",
    baseCost: 5000000,
    cps: 5000,
    icon: "🐳",
  },
  {
    id: "kubernetes",
    name: "Kubernetes",
    description: "Оркестрация контейнеров",
    baseCost: 25000000,
    cps: 20000,
    icon: "☸️",
  },
  {
    id: "ai-copilot",
    name: "AI Copilot",
    description: "ИИ пишет код за тебя",
    baseCost: 100000000,
    cps: 100000,
    icon: "🤖",
  },
];

// Achievement definitions
export const ACHIEVEMENTS: Omit<Achievement, "unlocked" | "unlockedAt">[] = [
  {
    id: "first-commit",
    name: "First Commit",
    description: "Сделай первый клик",
    icon: "🎉",
  },
  {
    id: "hello-world-ach",
    name: "Hello World",
    description: "Купи первый апгрейд",
    icon: "👋",
  },
  {
    id: "100-commits",
    name: "100 Commits",
    description: "Накопи 100 коммитов",
    icon: "💯",
  },
  {
    id: "1000-commits",
    name: "1K Commits",
    description: "Накопи 1,000 коммитов",
    icon: "🔥",
  },
  {
    id: "10000-commits",
    name: "10K Commits",
    description: "Накопи 10,000 коммитов",
    icon: "💪",
  },
  {
    id: "100000-commits",
    name: "100K Commits",
    description: "Накопи 100,000 коммитов",
    icon: "🚀",
  },
  {
    id: "million-commits",
    name: "Senior Developer",
    description: "Накопи 1,000,000 коммитов",
    icon: "👨‍💻",
  },
  {
    id: "full-stack",
    name: "Full Stack",
    description: "Купи все апгрейды до React",
    icon: "🏆",
  },
  {
    id: "10x-engineer",
    name: "10x Engineer",
    description: "Достигни 100 CPS",
    icon: "⚡",
  },
  {
    id: "100x-engineer",
    name: "100x Engineer",
    description: "Достигни 1,000 CPS",
    icon: "🌟",
  },
  {
    id: "click-addict",
    name: "Click Addict",
    description: "Сделай 1,000 кликов",
    icon: "🖱️",
  },
  {
    id: "open-source-hero",
    name: "Open Source Hero",
    description: "Играй 1 час",
    icon: "❤️",
  },
  {
    id: "all-upgrades",
    name: "Tech Lead",
    description: "Купи все типы апгрейдов",
    icon: "👑",
  },
];

// Helper function to calculate upgrade cost with scaling
export function calculateUpgradeCost(baseCost: number, owned: number): number {
  return Math.floor(baseCost * Math.pow(1.15, owned));
}

// Helper to get total CPS from upgrades
export function calculateTotalCPS(upgrades: Record<string, number>): number {
  return UPGRADES.reduce((total, upgrade) => {
    const owned = upgrades[upgrade.id] || 0;
    return total + upgrade.cps * owned;
  }, 0);
}

// Helper to calculate total click power from click multiplier upgrades
export function calculateClickPower(upgrades: Record<string, number>): number {
  const baseClick = 1;
  const multiplierBonus = UPGRADES.reduce((total, upgrade) => {
    const owned = upgrades[upgrade.id] || 0;
    const clickMult = upgrade.clickMultiplier || 0;
    return total + clickMult * owned;
  }, 0);
  return baseClick + multiplierBonus;
}

// Helper to calculate XP needed for a level
export function calculateXPForLevel(level: number): number {
  return Math.floor(100 * Math.pow(1.5, level - 1));
}

// Helper to get click upgrades
export function getClickUpgrades() {
  return UPGRADES.filter(u => u.clickMultiplier && u.clickMultiplier > 0);
}

// Helper to get CPS upgrades
export function getCPSUpgrades() {
  return UPGRADES.filter(u => u.cps > 0);
}
