import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@/stores/gameStore";
import { X, Code2, Zap, TrendingUp, Award, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DevPanel() {
    const [isOpen, setIsOpen] = useState(false);
    const { devAddCommits, devAddXP, devUnlockAllUpgrades, devSetLevel, commits, experience, level } = useGameStore();

    // Listen for Ctrl+Shift+D to toggle dev panel
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.shiftKey && e.key === "D") {
                e.preventDefault();
                setIsOpen((prev) => !prev);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={() => setIsOpen(false)}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-gradient-to-br from-gray-900 to-gray-950 border-2 border-red-500/50 rounded-xl p-6 max-w-md w-full shadow-2xl"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                            <Code2 className="w-6 h-6 text-red-500" />
                            <h2 className="text-xl font-bold text-red-500">Developer Mode</h2>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Current Stats */}
                    <div className="bg-gray-800/50 rounded-lg p-3 mb-4 text-sm">
                        <div className="grid grid-cols-3 gap-2 text-center">
                            <div>
                                <div className="text-gray-400">Commits</div>
                                <div className="text-green-400 font-mono">{Math.floor(commits)}</div>
                            </div>
                            <div>
                                <div className="text-gray-400">Level</div>
                                <div className="text-purple-400 font-mono">{level}</div>
                            </div>
                            <div>
                                <div className="text-gray-400">XP</div>
                                <div className="text-blue-400 font-mono">{Math.floor(experience)}</div>
                            </div>
                        </div>
                    </div>

                    {/* Cheat Buttons */}
                    <div className="space-y-2">
                        <Button
                            onClick={() => devAddCommits(1000)}
                            className="w-full bg-green-600 hover:bg-green-700 text-white gap-2"
                        >
                            <Zap className="w-4 h-4" />
                            +1,000 Commits
                        </Button>

                        <Button
                            onClick={() => devAddCommits(1000000)}
                            className="w-full bg-green-700 hover:bg-green-800 text-white gap-2"
                        >
                            <Sparkles className="w-4 h-4" />
                            +1,000,000 Commits
                        </Button>

                        <Button
                            onClick={() => devAddXP(500)}
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white gap-2"
                        >
                            <TrendingUp className="w-4 h-4" />
                            +500 XP
                        </Button>

                        <Button
                            onClick={() => devSetLevel(10)}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white gap-2"
                        >
                            <Award className="w-4 h-4" />
                            Set Level 10
                        </Button>

                        <Button
                            onClick={devUnlockAllUpgrades}
                            className="w-full bg-yellow-600 hover:bg-yellow-700 text-white gap-2"
                        >
                            <Sparkles className="w-4 h-4" />
                            Unlock All Upgrades
                        </Button>
                    </div>

                    {/* Info */}
                    <div className="mt-4 text-xs text-gray-500 text-center">
                        Press <kbd className="px-1 py-0.5 bg-gray-800 rounded">Ctrl+Shift+D</kbd> to toggle
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
