import { useState, useCallback, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@/stores/gameStore";
import { formatNumber, formatCPS } from "@/lib/utils";
import { playClickSound } from "@/lib/sounds";

interface ClickEffect {
  id: number;
  x: number;
  y: number;
}

export function Clicker() {
  const { commits, commitsPerClick, commitsPerSecond, click } = useGameStore();
  const [clickEffects, setClickEffects] = useState<ClickEffect[]>([]);
  const clickIdRef = useRef(0);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      click();
      playClickSound();

      // Get click position relative to button
      const rect = buttonRef.current?.getBoundingClientRect();
      if (rect) {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const newEffect: ClickEffect = {
          id: clickIdRef.current++,
          x,
          y,
        };

        setClickEffects((prev) => [...prev, newEffect]);

        // Remove effect after animation
        setTimeout(() => {
          setClickEffects((prev) => prev.filter((effect) => effect.id !== newEffect.id));
        }, 1000);
      }
    },
    [click]
  );

  const formattedCommits = useMemo(() => formatNumber(commits), [commits]);
  const formattedCPS = useMemo(() => formatCPS(commitsPerSecond), [commitsPerSecond]);

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Stats */}
      <div className="text-center">
        <motion.div
          className="text-5xl font-bold text-green-400"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 0.1 }}
          key={Math.floor(commits)}
        >
          {formattedCommits}
        </motion.div>
        <div className="text-xl text-muted-foreground mt-1">Commits</div>
        {commitsPerSecond > 0 && (
          <div className="text-sm text-green-500 mt-2">
            +{formattedCPS} в секунду
          </div>
        )}
      </div>

      {/* Main clicker button */}
      <div className="relative">
        <motion.button
          ref={buttonRef}
          onClick={handleClick}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.02 }}
          className="relative w-48 h-48 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border-4 border-green-500/50 clicker-glow cursor-pointer select-none flex items-center justify-center overflow-visible"
        >
          {/* Code brackets icon */}
          <span className="text-7xl text-green-400 font-mono select-none">
            {"{ }"}
          </span>

          {/* Click effects */}
          <AnimatePresence>
            {clickEffects.map((effect) => (
              <motion.div
                key={effect.id}
                initial={{ opacity: 1, scale: 1 }}
                animate={{ opacity: 0, scale: 1.2, y: -50 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{
                  position: "absolute",
                  left: effect.x,
                  top: effect.y,
                  transform: "translate(-50%, -50%)",
                }}
                className="text-xl font-bold text-green-400 pointer-events-none whitespace-nowrap"
              >
                +{commitsPerClick}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.button>

        {/* Pulsing ring effect */}
        <div className="absolute inset-0 rounded-full border-2 border-green-500/20 animate-ping pointer-events-none" />
      </div>

      {/* Click info */}
      <div className="text-sm text-muted-foreground">
        +{commitsPerClick} за клик
      </div>
    </div>
  );
}
