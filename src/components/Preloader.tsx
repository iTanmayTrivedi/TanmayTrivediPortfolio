import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  onComplete: () => void;
}

/**
 * Word-free loading screen:
 * ambient blobs + grain + blueprint grid, giant concentric circles,
 * rotating crosshair, pulsing plus-marks, corner brackets, scanline sweep,
 * sonar rings around a ticked progress dial with orbiting satellites,
 * a breathing core, the rising percentage and a hairline progress bar.
 */
const Preloader = ({ onComplete }: PreloaderProps) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [showBars, setShowBars] = useState(false);

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
            {/* Blueprint grid — fades out from the center */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage:
                  "linear-gradient(to right, hsl(var(--foreground) / 0.045) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--foreground) / 0.045) 1px, transparent 1px)",
                backgroundSize: "56px 56px",
                maskImage:
                  "radial-gradient(ellipse at center, black 0%, transparent 72%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse at center, black 0%, transparent 72%)",
              }}
            />

            {/* Ambient light blobs drifting behind everything */}
            <motion.div
              className="absolute -top-32 -left-24 w-[34rem] h-[34rem] rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, hsl(var(--foreground) / 0.07), transparent 70%)",
                filter: "blur(60px)",
              }}
              animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -bottom-40 -right-28 w-[38rem] h-[38rem] rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, hsl(var(--foreground) / 0.05), transparent 70%)",
                filter: "blur(70px)",
              }}
              animate={{ x: [0, -35, 0], y: [0, -25, 0] }}
              transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Fine grain texture */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.05]"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
              }}
            />

            {/* Vignette */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at center, transparent 0%, transparent 55%, hsl(var(--foreground) / 0.06) 100%)",
              }}
            />

            {/* Giant concentric circles radiating behind the mark */}
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={`mega-${i}`}
                className="absolute rounded-full border border-foreground/[0.06] pointer-events-none"
                style={{
                  width: `${46 + i * 26}vmin`,
                  height: `${46 + i * 26}vmin`,
                }}
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  duration: 1.6,
                  delay: 0.15 + i * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            ))}

            {/* Rotating crosshair lines through center */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              animate={{ rotate: 360 }}
              transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
            >
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-foreground/[0.07] to-transparent" />
              <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-foreground/[0.07] to-transparent" />
            </motion.div>

            {/* Registration plus marks scattered like a drafting sheet */}
            {[
              { top: "14%", left: "12%" },
              { top: "18%", right: "14%" },
              { bottom: "16%", left: "16%" },
              { bottom: "20%", right: "11%" },
              { top: "50%", left: "6%" },
              { top: "50%", right: "6%" },
            ].map((pos, i) => (
              <motion.div
                key={`plus-${i}`}
                className="absolute pointer-events-none"
                style={pos}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{
                  opacity: [0.15, 0.45, 0.15],
                  scale: 1,
                }}
                transition={{
                  opacity: {
                    duration: 3 + i * 0.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                  scale: {
                    duration: 0.8,
                    delay: 0.3 + i * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  },
                }}
              >
                <div className="relative w-4 h-4">
                  <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-foreground" />
                  <div className="absolute top-1/2 left-0 right-0 h-px -translate-y-1/2 bg-foreground" />
                </div>
              </motion.div>
            ))}

            {/* Corner brackets framing the viewport */}
            {[
              { top: "2rem", left: "2rem", rotate: 0 },
              { top: "2rem", right: "2rem", rotate: 90 },
              { bottom: "2rem", right: "2rem", rotate: 180 },
              { bottom: "2rem", left: "2rem", rotate: 270 },
            ].map((pos, i) => (
              <motion.div
                key={`corner-${i}`}
                className="absolute w-8 h-8 pointer-events-none"
                style={{
                  top: pos.top,
                  left: pos.left,
                  right: pos.right,
                  bottom: pos.bottom,
                  transform: `rotate(${pos.rotate}deg)`,
                }}
                initial={{ opacity: 0, x: i % 2 === 0 ? -8 : 8 }}
                animate={{ opacity: 0.35, x: 0 }}
                transition={{
                  duration: 0.9,
                  delay: 0.4 + i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="absolute top-0 left-0 w-full h-px bg-foreground" />
                <div className="absolute top-0 left-0 h-full w-px bg-foreground" />
              </motion.div>
            ))}

            {/* Vertical scanline sweep */}
            <motion.div
              className="absolute top-0 bottom-0 w-px pointer-events-none"
              style={{
                background:
                  "linear-gradient(to bottom, transparent, hsl(var(--foreground) / 0.18), transparent)",
              }}
              animate={{ left: ["0%", "100%"] }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
                repeatType: "mirror",
              }}
            />

            {/* Centered mark */}
            <div className="relative flex flex-col items-center">
              <div className="relative w-44 h-44 flex items-center justify-center">
                {/* Sonar rings pulsing outward */}
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={`sonar-${i}`}
                    className="absolute w-44 h-44 rounded-full border border-foreground/15 pointer-events-none"
                    animate={{ scale: [1, 1.9], opacity: [0.5, 0] }}
                    transition={{
                      duration: 2.6,
                      delay: i * 0.8,
                      repeat: Infinity,
                      ease: "easeOut",
                    }}
                  />
                ))}

                {/* Progress dial — ticked ring + progress arc */}
                <motion.svg
                  className="absolute inset-0 w-full h-full -rotate-90"
                  viewBox="0 0 100 100"
                >
                  {Array.from({ length: 24 }).map((_, i) => {
                    const a = (i / 24) * Math.PI * 2;
                    return (
                      <line
                        key={`tick-${i}`}
                        x1={50 + 45 * Math.cos(a)}
                        y1={50 + 45 * Math.sin(a)}
                        x2={50 + 47.5 * Math.cos(a)}
                        y2={50 + 47.5 * Math.sin(a)}
                        stroke="hsl(var(--foreground) / 0.18)"
                        strokeWidth="0.6"
                      />
                    );
                  })}
                  <circle
                    cx="50"
                    cy="50"
                    r="46"
                    stroke="hsl(var(--foreground) / 0.08)"
                    strokeWidth="0.5"
                    fill="none"
                  />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="46"
                    stroke="hsl(var(--foreground))"
                    strokeWidth="0.9"
                    fill="none"
                    strokeLinecap="round"
                    pathLength={1}
                    style={{
                      strokeDasharray: 1,
                      strokeDashoffset: 1 - progress / 100,
                    }}
                  />
                </motion.svg>

                {/* Counter-rotating dashed orbit */}
                <motion.div
                  className="absolute inset-6 rounded-full border border-dashed border-foreground/15 pointer-events-none"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
                />

                {/* Orbiting satellite particles */}
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <motion.div
                    key={`sat-${i}`}
                    className="absolute inset-0 pointer-events-none"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 10 + i * 2.5,
                      delay: -i * 1.7,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <div
                      className="absolute top-1/2 left-1/2"
                      style={{
                        transform: `rotate(${i * 60}deg) translateX(${
                          40 + (i % 2) * 6
                        }px)`,
                      }}
                    >
                      <div
                        className="rounded-full bg-foreground/40"
                        style={{
                          width: 2 + (i % 3),
                          height: 2 + (i % 3),
                          transform: "translate(-50%, -50%)",
                        }}
                      />
                    </div>
                  </motion.div>
                ))}

                {/* Breathing core with inner ring cutout */}
                <motion.div
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: [1, 1.04, 1], opacity: 1 }}
                  transition={{
                    scale: { duration: 2.4, repeat: Infinity, ease: "easeInOut" },
                    opacity: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
                  }}
                  className="relative w-20 h-20 rounded-full bg-foreground flex items-center justify-center"
                >
                  <div className="w-7 h-7 rounded-full border border-background/30" />
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ boxShadow: "0 0 60px hsl(var(--foreground) / 0.3)" }}
                    animate={{ opacity: [0.4, 0.9, 0.4] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                  />
                </motion.div>
              </div>

              {/* Percentage + hairline progress bar */}
              <div className="mt-12 flex flex-col items-center gap-4">
                <div className="flex items-baseline gap-1 tabular-nums leading-none">
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
                <div className="w-40 h-px bg-foreground/10 relative overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 bg-foreground/60"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Exit — 5 staggered bars + accent lines */}
      <AnimatePresence>
        {showBars && (
          <div className="fixed inset-0 z-[100] pointer-events-none">
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
                    ? i % 2 === 0
                      ? "right"
                      : "left"
                    : i % 2 === 0
                      ? "left"
                      : "right",
                }}
              />
            ))}

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
