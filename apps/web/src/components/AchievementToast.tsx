import { motion, AnimatePresence } from "framer-motion";
import { Trophy } from "lucide-react";
import { ACHIEVEMENTS } from "@code-clicker/shared";

interface AchievementToastProps {
  achievementIds: string[];
  onDismiss: (id: string) => void;
}

export function AchievementToast({ achievementIds, onDismiss }: AchievementToastProps) {
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      <AnimatePresence>
        {achievementIds.map((id) => {
          const achievement = ACHIEVEMENTS.find((a) => a.id === id);
          if (!achievement) return null;

          return (
            <motion.div
              key={id}
              initial={{ opacity: 0, x: 100, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.8 }}
              onAnimationComplete={() => {
                // Auto dismiss after 3 seconds
                setTimeout(() => onDismiss(id), 3000);
              }}
              className="flex items-center gap-3 p-4 bg-gradient-to-r from-yellow-900/90 to-yellow-800/90 border border-yellow-500/50 rounded-lg shadow-lg backdrop-blur-sm cursor-pointer"
              onClick={() => onDismiss(id)}
            >
              {/* Trophy icon */}
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-yellow-500/20 rounded-full">
                <Trophy className="w-6 h-6 text-yellow-400" />
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="text-xs text-yellow-300 uppercase tracking-wide">
                  Достижение разблокировано!
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xl">{achievement.icon}</span>
                  <span className="font-bold text-white">{achievement.name}</span>
                </div>
                <div className="text-xs text-yellow-200/70 mt-0.5">
                  {achievement.description}
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
