import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, X } from "lucide-react";
import { useGameStore } from "@/stores/gameStore";
import { ACHIEVEMENTS } from "@code-clicker/shared";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Achievements() {
  const [isOpen, setIsOpen] = useState(false);
  const { achievements } = useGameStore();

  const unlockedCount = achievements.length;
  const totalCount = ACHIEVEMENTS.length;

  return (
    <>
      {/* Trigger button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="gap-2"
      >
        <Trophy className="w-4 h-4" />
        {unlockedCount}/{totalCount}
      </Button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 z-40"
            />

            {/* Modal content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[500px] md:max-h-[80vh] bg-card border border-border rounded-lg shadow-xl z-50 flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-border">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  <h2 className="text-lg font-bold">Достижения</h2>
                  <span className="text-sm text-muted-foreground">
                    ({unlockedCount}/{totalCount})
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* Achievement list */}
              <div className="flex-1 overflow-y-auto p-4 grid gap-2">
                {ACHIEVEMENTS.map((achievement) => {
                  const isUnlocked = achievements.includes(achievement.id);

                  return (
                    <motion.div
                      key={achievement.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={cn(
                        "flex items-center gap-3 p-3 rounded-lg border",
                        isUnlocked
                          ? "border-yellow-500/30 bg-yellow-500/5"
                          : "border-border bg-secondary/30 opacity-50"
                      )}
                    >
                      {/* Icon */}
                      <div
                        className={cn(
                          "text-2xl w-10 h-10 flex items-center justify-center rounded-lg",
                          isUnlocked ? "bg-yellow-500/20" : "bg-secondary"
                        )}
                      >
                        {isUnlocked ? achievement.icon : "🔒"}
                      </div>

                      {/* Info */}
                      <div className="flex-1">
                        <div
                          className={cn(
                            "font-semibold",
                            isUnlocked ? "text-yellow-400" : "text-muted-foreground"
                          )}
                        >
                          {achievement.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {achievement.description}
                        </div>
                      </div>

                      {/* Unlocked indicator */}
                      {isUnlocked && (
                        <div className="text-yellow-500">✓</div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
