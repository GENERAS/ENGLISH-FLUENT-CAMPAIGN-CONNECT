import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Star, Award, Trophy } from "lucide-react";

interface RewardAnimationProps {
  isVisible: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  xpAmount?: number;
}

export const RewardAnimation: React.FC<RewardAnimationProps> = ({
  isVisible,
  onClose,
  title = "Congratulations!",
  subtitle = "You earned a Fluency Reward!",
  xpAmount = 100,
}) => {
  // Generate random particles
  const particles = Array.from({ length: 18 }).map((_, i) => ({
    id: i,
    angle: (i * 360) / 18 + Math.random() * 15,
    distance: 100 + Math.random() * 80,
    size: 10 + Math.random() * 14,
    color: i % 3 === 0 ? "text-amber-400" : i % 3 === 1 ? "text-blue-500" : "text-emerald-400",
  }));

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop blur & fade */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/75 backdrop-blur-md cursor-pointer"
          />

          {/* Celebration Modal container */}
          <motion.div
            initial={{ scale: 0.85, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 30, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="relative w-full max-w-sm rounded-3xl border border-slate-800 bg-slate-900 p-8 text-center shadow-2xl overflow-hidden"
          >
            {/* Ambient Background Glow */}
            <div className="absolute -top-12 -left-12 h-44 w-44 rounded-full bg-blue-500/15 blur-3xl" />
            <div className="absolute -bottom-12 -right-12 h-44 w-44 rounded-full bg-amber-500/15 blur-3xl" />

            {/* Sparkle Emitter (Framer Motion Particle Explosion) */}
            <div className="absolute left-1/2 top-[35%] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              {particles.map((p) => {
                const rad = (p.angle * Math.PI) / 180;
                const targetX = Math.cos(rad) * p.distance;
                const targetY = Math.sin(rad) * p.distance;

                return (
                  <motion.div
                    key={p.id}
                    initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
                    animate={{
                      x: targetX,
                      y: targetY,
                      opacity: [1, 1, 0],
                      scale: [0.5, 1.2, 0],
                      rotate: [0, Math.random() * 360],
                    }}
                    transition={{
                      duration: 1.4,
                      ease: "easeOut",
                    }}
                    className={`absolute ${p.color}`}
                    style={{ width: p.size, height: p.size }}
                  >
                    <Star className="w-full h-full fill-current" />
                  </motion.div>
                );
              })}
            </div>

            {/* Center Spinning Badge */}
            <div className="relative mb-6 flex justify-center">
              <motion.div
                initial={{ rotate: -180, scale: 0.4 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ type: "spring", damping: 15 }}
                className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 p-0.5 shadow-lg shadow-amber-500/25"
              >
                <div className="flex h-full w-full items-center justify-center rounded-full bg-slate-950">
                  <Trophy className="h-10 w-10 text-amber-400 fill-amber-400/10" />
                </div>
                {/* Micro orbit star */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-1 -left-1 text-yellow-300 bg-slate-900 p-1 rounded-full border border-amber-500/40"
                >
                  <Sparkles className="h-4.5 w-4.5 fill-current text-amber-400" />
                </motion.div>
              </motion.div>
            </div>

            {/* XP Counter Banner */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: [0.8, 1.1, 1], opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 px-5 py-2 mb-4 text-amber-400 font-extrabold text-lg tracking-wide font-mono shadow-xs"
            >
              +{xpAmount} XP
            </motion.div>

            {/* Typography */}
            <motion.div
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="space-y-2 mb-6"
            >
              <h3 className="text-xl font-extrabold text-white tracking-tight leading-snug">
                {title}
              </h3>
              <p className="text-xs text-slate-400 max-w-[240px] mx-auto leading-relaxed">
                {subtitle}
              </p>
            </motion.div>

            {/* Claim/Dismiss Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onClose}
              className="w-full rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-extrabold py-3.5 text-xs tracking-wider uppercase shadow-lg shadow-amber-500/20 hover:from-amber-400 hover:to-yellow-300 transition duration-300 cursor-pointer"
            >
              Claim Fluency Reward! 🎉
            </motion.button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
export default RewardAnimation;
