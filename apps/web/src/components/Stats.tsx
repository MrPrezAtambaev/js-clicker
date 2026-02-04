import { useGameStore } from "@/stores/gameStore";
import { formatNumber, formatCPS } from "@/lib/utils";

export function Stats() {
  const { totalCommits, totalClicks, commitsPerSecond, playTime } = useGameStore();

  const formatPlayTime = (seconds: number): string => {
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

  return (
    <div className="grid grid-cols-2 gap-2 text-sm">
      <div className="p-2 rounded bg-secondary/50">
        <div className="text-muted-foreground text-xs">Всего коммитов</div>
        <div className="font-mono text-green-400">{formatNumber(totalCommits)}</div>
      </div>
      <div className="p-2 rounded bg-secondary/50">
        <div className="text-muted-foreground text-xs">Всего кликов</div>
        <div className="font-mono text-green-400">{formatNumber(totalClicks)}</div>
      </div>
      <div className="p-2 rounded bg-secondary/50">
        <div className="text-muted-foreground text-xs">CPS</div>
        <div className="font-mono text-green-400">{formatCPS(commitsPerSecond)}</div>
      </div>
      <div className="p-2 rounded bg-secondary/50">
        <div className="text-muted-foreground text-xs">Время игры</div>
        <div className="font-mono text-green-400">{formatPlayTime(playTime)}</div>
      </div>
    </div>
  );
}
