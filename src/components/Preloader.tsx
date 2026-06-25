import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [showBars, setShowBars] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const duration = 2500;
    const interval = 20;
    const increment = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment + Math.random() * 0.5;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setShowBars(true);
            setTimeout(() => {
              setIsExiting(true);
              setTimeout(onComplete, 700);
            }, 450);
          }, 200);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <>
      <AnimatePresence>
        {!showBars && !isExiting && (
          <motion.div
            className="fixed inset-0 z-[100] bg-background flex items-center justify-center overflow-hidden"
            exit={{
              opacity: 0,
              transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
            }}
          >
            {/* Subtle vignette */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at center, transparent 0%, transparent 55%, hsl(var(--foreground) / 0.05) 100%)",
              }}
            />

            {/* Corner labels — editorial */}
            <div className="absolute top-6 left-6 sm:top-8 sm:left-10 text-[10px] tracking-[0.4em] uppercase text-muted-foreground/70 flex items-center gap-2">
              <motion.span
                className="w-1.5 h-1.5 rounded-full bg-foreground"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.4, repeat: Infinity }}
              />
              Index · 001
            </div>
            <div className="absolute top-6 right-6 sm:top-8 sm:right-10 text-[10px] tracking-[0.4em] uppercase text-muted-foreground/70 tabular-nums">
              {new Date().getFullYear()} — Portfolio
            </div>

            {/* Centered mark */}
            <div className="relative flex flex-col items-center">
              {/* Concentric rotating rings */}
              <div className="relative w-44 h-44 flex items-center justify-center">
                <motion.svg
                  className="absolute inset-0 w-full h-full -rotate-90"
                  viewBox="0 0 100 100"
                >
                  <circle cx="50" cy="50" r="48" stroke="hsl(var(--foreground) / 0.08)" strokeWidth="0.5" fill="none" />
                  <motion.circle
                    cx="50" cy="50" r="48"
                    stroke="hsl(var(--foreground))"
                    strokeWidth="0.8"
                    fill="none"
                    strokeLinecap="round"
                    pathLength={1}
                    style={{ strokeDasharray: 1, strokeDashoffset: 1 - progress / 100 }}
                  />
                </motion.svg>
                <motion.div
                  className="absolute inset-3 rounded-full border border-foreground/10"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                >
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1 h-1 rounded-full bg-foreground/60" />
                </motion.div>

                {/* Inner monogram */}
                <motion.div
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="relative w-20 h-20 rounded-full bg-foreground flex items-center justify-center"
                >
                  <span
                    className="text-background text-3xl font-bold tracking-tight"
                    style={{ fontFamily: "'Inter Tight', system-ui, sans-serif" }}
                  >
                    T
                  </span>
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ boxShadow: "0 0 60px hsl(var(--foreground) / 0.3)" }}
                    animate={{ opacity: [0.4, 0.9, 0.4] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                  />
                </motion.div>
              </div>

              {/* Big percentage — kinetic */}
              <div className="mt-12 flex items-baseline gap-1 tabular-nums leading-none">
                <motion.span
                  key={Math.round(progress)}
                  initial={{ opacity: 0.5, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.15 }}
                  className="text-5xl sm:text-6xl font-bold tracking-tighter text-foreground"
                  style={{ fontFamily: "'Inter Tight', system-ui, sans-serif" }}
                >
                  {String(Math.round(progress)).padStart(2, "0")}
                </motion.span>
                <span className="text-2xl font-bold text-foreground/40">%</span>
              </div>

              {/* Wordmark */}
              <div className="mt-4 text-[10px] tracking-[0.5em] uppercase text-muted-foreground">
                Tanmay&nbsp;·&nbsp;Trivedi
              </div>
            </div>

            {/* Bottom marquee — kinetic skill stream */}
            <div className="absolute bottom-8 sm:bottom-10 left-0 right-0 overflow-hidden pointer-events-none">
              <motion.div
                className="flex gap-10 whitespace-nowrap text-[11px] tracking-[0.45em] uppercase text-muted-foreground/60"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              >
                {Array.from({ length: 2 }).flatMap((_, k) =>
                  ["Full Stack", "✦", "TypeScript", "✦", "React", "✦", "Django", "✦", "AI", "✦", "Design", "✦", "Tokyo → Mumbai", "✦"].map((w, i) => (
                    <span key={`${k}-${i}`}>{w}</span>
                  ))
                )}
              </motion.div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>


      {/* Creative Bar Transition */}
      <AnimatePresence>
        {showBars && (
          <div className="fixed inset-0 z-[100] pointer-events-none">
            {/* 5 staggered bars for more dynamic feel */}
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={`bar-${i}`}
                className="absolute left-0 right-0 bg-foreground"
                initial={{ scaleX: 0 }}
                animate={{
                  scaleX: isExiting ? [1, 1, 0] : [0, 1],
                }}
                transition={{
                  duration: isExiting ? 0.6 : 0.4,
                  delay: isExiting ? i * 0.05 : (4 - i) * 0.06,
                  ease: [0.76, 0, 0.24, 1],
                  times: isExiting ? [0, 0.35, 1] : undefined,
                }}
                style={{
                  top: `${i * 20}%`,
                  height: "20.1%",
                  transformOrigin: isExiting 
                    ? (i % 2 === 0 ? "right" : "left") 
                    : (i % 2 === 0 ? "left" : "right"),
                }}
              />
            ))}

            {/* Center kanji flash — 創 (creation) with glitch */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center z-10"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: isExiting ? [1, 0] : [0, 1],
              }}
              transition={{
                duration: isExiting ? 0.3 : 0.15,
                delay: isExiting ? 0 : 0.2,
                ease: "easeOut",
              }}
            >
              {/* Glitch layers */}
              <div className="relative">
                {/* Red offset layer */}
                <motion.span
                  className="absolute inset-0 text-red-500/40 text-[12rem] md:text-[20rem] font-thin select-none leading-none"
                  style={{ fontFamily: "serif" }}
                  animate={{
                    x: isExiting ? 0 : [0, -6, 4, -2, 0, 5, -3, 0],
                    y: isExiting ? 0 : [0, 3, -4, 2, -1, 0, 3, 0],
                    opacity: isExiting ? 0 : [0, 0.7, 0, 0.5, 0, 0.6, 0, 0],
                  }}
                  transition={{
                    duration: 0.4,
                    delay: isExiting ? 0 : 0.25,
                    ease: "linear",
                    repeat: isExiting ? 0 : 2,
                  }}
                >
                  創
                </motion.span>
                {/* Cyan offset layer */}
                <motion.span
                  className="absolute inset-0 text-cyan-400/40 text-[12rem] md:text-[20rem] font-thin select-none leading-none"
                  style={{ fontFamily: "serif" }}
                  animate={{
                    x: isExiting ? 0 : [0, 5, -3, 6, -2, 0, 4, 0],
                    y: isExiting ? 0 : [0, -2, 5, -3, 1, 0, -2, 0],
                    opacity: isExiting ? 0 : [0, 0.6, 0, 0.4, 0, 0.7, 0, 0],
                  }}
                  transition={{
                    duration: 0.4,
                    delay: isExiting ? 0 : 0.27,
                    ease: "linear",
                    repeat: isExiting ? 0 : 2,
                  }}
                >
                  創
                </motion.span>
                {/* Main kanji */}
                <motion.span
                  className="relative text-background text-[12rem] md:text-[20rem] font-thin select-none leading-none block"
                  style={{ fontFamily: "serif" }}
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ 
                    scale: isExiting ? [1, 1.4] : [0.6, 1.05, 1],
                    opacity: isExiting ? [1, 0] : [0, 1, 0.7, 1, 0.8, 1],
                    skewX: isExiting ? [0, -5] : [8, -3, 2, 0],
                  }}
                  transition={{
                    duration: isExiting ? 0.3 : 0.5,
                    delay: isExiting ? 0 : 0.22,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  創
                </motion.span>
                {/* Horizontal glitch slice lines */}
                {[20, 40, 55, 75].map((top, i) => (
                  <motion.div
                    key={`slice-${i}`}
                    className="absolute left-[-20%] right-[-20%] h-[2px] bg-background/30"
                    style={{ top: `${top}%` }}
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{
                      scaleX: isExiting ? 0 : [0, 1, 0],
                      opacity: isExiting ? 0 : [0, 1, 0],
                      x: isExiting ? 0 : [0, (i % 2 === 0 ? 30 : -30), 0],
                    }}
                    transition={{
                      duration: 0.3,
                      delay: isExiting ? 0 : 0.3 + i * 0.04,
                      ease: "easeOut",
                      repeat: isExiting ? 0 : 1,
                    }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Thin accent lines that slash across */}
            {[0, 1].map((i) => (
              <motion.div
                key={`accent-${i}`}
                className="absolute bg-background/20"
                initial={{ scaleX: 0 }}
                animate={{
                  scaleX: isExiting ? [1, 0] : [0, 1, 1],
                }}
                transition={{
                  duration: isExiting ? 0.4 : 0.35,
                  delay: isExiting ? 0.1 : 0.15 + i * 0.08,
                  ease: [0.76, 0, 0.24, 1],
                }}
                style={{
                  top: i === 0 ? "40%" : "60%",
                  left: 0,
                  right: 0,
                  height: "1px",
                  transformOrigin: isExiting ? "left" : "right",
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Preloader;
