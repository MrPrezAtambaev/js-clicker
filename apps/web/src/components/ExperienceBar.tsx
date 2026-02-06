import { useMemo } from "react";
import { motion } from "framer-motion";
import { useGameStore } from "@/stores/gameStore";
import { calculateXPForLevel } from "@code-clicker/shared";

export function ExperienceBar() {
    const { experience, level } = useGameStore();

    const xpNeeded = useMemo(() => calculateXPForLevel(level), [level]);
    const xpProgress = useMemo(() => (experience / xpNeeded) * 100, [experience, xpNeeded]);

    return (
        <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 border border-border">
            {/* Level badge */}
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center border-2 border-purple-400">
                <div className="text-center">
                    <div className="text-xs font-bold text-white/80">LVL</div>
                    <div className="text-lg font-bold text-white">{level}</div>
                </div>
            </div>

            {/* XP bar */}
            <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-purple-400">Опыт</span>
                    <span className="text-xs text-muted-foreground">
                        {experience} / {xpNeeded} XP
                    </span>
                </div>
                <div className="h-3 bg-secondary rounded-full overflow-hidden border border-border">
                    <motion.div
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${xpProgress}%` }}
                        transition={{ duration: 0.3 }}
                    />
                </div>
            </div>
        </div>
    );
}
