import { useMemo, memo } from "react";
import { useGameStore } from "@/stores/gameStore";
import { formatNumber, formatCPS } from "@/lib/utils";

export const Stats = memo(function Stats() {
  const { totalCommits, totalClicks, commitsPerSecond, playTime } = useGameStore();

  const formatPlayTime = useMemo(() => {
    return (seconds: number): string => {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const secs = Math.floor(seconds % 60);

      if (hours > 0) {
        return `${hours}ч ${minutes}м`;
      }
      if (minutes > 0) {
        return `${minutes}м ${secs}с`;
      }
      return `${secs}с`;
    };
  }, []);

  const formattedTotalCommits = useMemo(() => formatNumber(totalCommits), [totalCommits]);
  const formattedTotalClicks = useMemo(() => formatNumber(totalClicks), [totalClicks]);
  const formattedCPS = useMemo(() => formatCPS(commitsPerSecond), [commitsPerSecond]);
  const formattedPlayTime = useMemo(() => formatPlayTime(playTime), [formatPlayTime, playTime]);

  return (
    <div className="grid grid-cols-2 gap-2 text-sm">
      <div className="p-2 rounded bg-secondary/50">
        <div className="text-muted-foreground text-xs">Всего коммитов</div>
        <div className="font-mono text-green-400">{formattedTotalCommits}</div>
      </div>
      <div className="p-2 rounded bg-secondary/50">
        <div className="text-muted-foreground text-xs">Всего кликов</div>
        <div className="font-mono text-green-400">{formattedTotalClicks}</div>
      </div>
      <div className="p-2 rounded bg-secondary/50">
        <div className="text-muted-foreground text-xs">CPS</div>
        <div className="font-mono text-green-400">{formattedCPS}</div>
      </div>
      <div className="p-2 rounded bg-secondary/50">
        <div className="text-muted-foreground text-xs">Время игры</div>
        <div className="font-mono text-green-400">{formattedPlayTime}</div>
      </div>
    </div>
  );
});
