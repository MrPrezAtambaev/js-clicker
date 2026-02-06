import { useEffect, useState, useCallback } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Save, RotateCcw, Monitor } from "lucide-react";
import { useGameStore } from "@/stores/gameStore";
import { Clicker } from "@/components/Clicker";
import { Upgrades } from "@/components/Upgrades";
import { Achievements } from "@/components/Achievements";
import { AchievementToast } from "@/components/AchievementToast";
import { CodeRain } from "@/components/CodeRain";
import { Stats } from "@/components/Stats";
import { ExperienceBar } from "@/components/ExperienceBar";
import { DevPanel } from "@/components/DevPanel";
import { Button } from "@/components/ui/button";
import type { GameState, SaveGameResponse, LoadGameResponse } from "@code-clicker/shared";

const API_URL = "http://localhost:3001";

function App() {
  const { tick, checkAchievements, reset, loadState, commits, totalCommits, upgrades, achievements, totalClicks, playTime, commitsPerSecond, startedAt } = useGameStore();
  const [newAchievements, setNewAchievements] = useState<string[]>([]);

  // Game tick - runs every 100ms for smooth updates
  useEffect(() => {
    const interval = setInterval(() => {
      tick(0.1);
      const unlocked = checkAchievements();
      if (unlocked.length > 0) {
        setNewAchievements((prev) => [...prev, ...unlocked]);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [tick, checkAchievements]);

  // Save mutation
  const saveMutation = useMutation<SaveGameResponse, Error, GameState>({
    mutationFn: async (gameState) => {
      const response = await fetch(`${API_URL}/save`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gameState }),
      });
      return response.json();
    },
  });

  // Load query (manual)
  const loadQuery = useQuery<LoadGameResponse>({
    queryKey: ["load-game"],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/load`);
      return response.json();
    },
    enabled: false,
  });

  const handleSave = useCallback(() => {
    const state = useGameStore.getState();
    const saveState: GameState = {
      commits: state.commits,
      totalCommits: state.totalCommits,
      commitsPerClick: state.commitsPerClick,
      commitsPerSecond: state.commitsPerSecond,
      upgrades: state.upgrades,
      achievements: state.achievements,
      totalClicks: state.totalClicks,
      startedAt: state.startedAt,
      playTime: state.playTime,
      experience: state.experience,
      level: state.level,
    };
    saveMutation.mutate(saveState);
  }, [saveMutation]);

  const handleLoad = useCallback(async () => {
    const result = await loadQuery.refetch();
    if (result.data?.success && result.data.gameState) {
      loadState(result.data.gameState);
    }
  }, [loadQuery, loadState]);

  const handleReset = useCallback(() => {
    if (confirm("Вы уверены? Весь прогресс будет потерян!")) {
      reset();
    }
  }, [reset]);

  const dismissAchievement = useCallback((id: string) => {
    setNewAchievements((prev) => prev.filter((a) => a !== id));
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Background code rain */}
      <CodeRain />

      {/* Achievement toasts */}
      <AchievementToast achievementIds={newAchievements} onDismiss={dismissAchievement} />

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="flex flex-col gap-3 p-4 border-b border-border bg-background/80 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Monitor className="w-6 h-6 text-green-400" />
              <h1 className="text-xl font-bold">Code Clicker</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleSave}
                disabled={saveMutation.isPending}
                className="gap-2"
              >
                <Save className="w-4 h-4" />
                {saveMutation.isPending ? "..." : "Save"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLoad}
                disabled={loadQuery.isFetching}
                className="gap-2"
              >
                {loadQuery.isFetching ? "..." : "Load"}
              </Button>
              <Achievements />
              <Button
                variant="ghost"
                size="icon"
                onClick={handleReset}
                title="Сбросить прогресс"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Experience Bar */}
          <ExperienceBar />
        </header>

        {/* Main game area */}
        <main className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4 p-4">
          {/* Left column - Stats */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-4">
              <h2 className="text-lg font-bold text-green-400 mb-3">Статистика</h2>
              <Stats />
            </div>
          </div>

          {/* Center - Clicker */}
          <div className="flex items-center justify-center lg:col-span-1">
            <Clicker />
          </div>

          {/* Right column - Upgrades */}
          <div className="lg:col-span-1">
            <div className="h-[calc(100vh-200px)] overflow-y-auto">
              <Upgrades />
            </div>
          </div>
        </main>

        {/* Mobile stats */}
        <div className="lg:hidden p-4 border-t border-border bg-background/80 backdrop-blur-sm">
          <Stats />
        </div>
      </div>

      {/* Hidden Dev Panel - Activated with Ctrl+Shift+D */}
      <DevPanel />
    </div>
  );
}

export default App;
