import { motion } from "framer-motion";
import { useGameStore } from "@/stores/gameStore";
import { UPGRADES } from "@code-clicker/shared";
import { formatNumber } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function Upgrades() {
  const { upgrades, commits, buyUpgrade, getUpgradeCost, canAffordUpgrade } = useGameStore();

  return (
    <div className="flex flex-col gap-2 h-full overflow-y-auto pr-2">
      <h2 className="text-xl font-bold text-green-400 mb-2 sticky top-0 bg-background py-2">
        Апгрейды
      </h2>

      {UPGRADES.map((upgrade, index) => {
        const owned = upgrades[upgrade.id] || 0;
        const cost = getUpgradeCost(upgrade.id);
        const canAfford = canAffordUpgrade(upgrade.id);

        return (
          <motion.button
            key={upgrade.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => buyUpgrade(upgrade.id)}
            disabled={!canAfford}
            className={cn(
              "upgrade-card w-full p-3 rounded-lg border border-border bg-card text-left transition-all",
              canAfford
                ? "hover:border-green-500/50 cursor-pointer"
                : "opacity-50 cursor-not-allowed"
            )}
          >
            <div className="flex items-center gap-3">
              {/* Icon */}
              <div className="text-3xl w-12 h-12 flex items-center justify-center bg-secondary rounded-lg">
                {upgrade.icon}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-foreground truncate">
                    {upgrade.name}
                  </span>
                  {owned > 0 && (
                    <span className="text-green-400 font-bold ml-2">
                      x{owned}
                    </span>
                  )}
                </div>
                <div className="text-xs text-muted-foreground truncate">
                  {upgrade.description}
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span
                    className={cn(
                      "text-sm font-mono",
                      canAfford ? "text-green-400" : "text-red-400"
                    )}
                  >
                    {formatNumber(cost)} 💾
                  </span>
                  <span className="text-xs text-muted-foreground">
                    +{upgrade.cps} CPS
                  </span>
                </div>
              </div>
            </div>

            {/* Progress bar showing how close to affording */}
            {!canAfford && (
              <div className="mt-2 h-1 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500/50 transition-all"
                  style={{ width: `${Math.min((commits / cost) * 100, 100)}%` }}
                />
              </div>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
