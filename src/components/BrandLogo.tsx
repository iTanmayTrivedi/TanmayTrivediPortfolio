import { useState, useRef, useEffect, useMemo } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

const BrandLogo = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Magnetic cursor
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 15 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 15 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        const pull = (120 - dist) / 120;
        mouseX.set(dx * pull * 0.3);
        mouseY.set(dy * pull * 0.3);
      } else {
        mouseX.set(0);
        mouseY.set(0);
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Stable random particles
  const floatingParticles = useMemo(
    () =>
      Array.from({ length: 12 }).map((_, i) => ({
        angle: (i * 30 + Math.random() * 15) % 360,
        radius: 18 + Math.random() * 10,
        size: 1 + Math.random() * 2,
        duration: 3 + Math.random() * 4,
        delay: Math.random() * 3,
      })),
    []
  );

  return (
    <motion.a
      href="#"
      className="flex items-center relative"
      whileTap={{ scale: 0.9 }}
      onClick={() => {
        setClickCount((c) => c + 1);
        setTimeout(() => setClickCount(0), 2000);
      }}
      style={{ x: springX, y: springY }}
    >
      <div
        ref={containerRef}
        className="relative w-14 h-14 flex items-center justify-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* ─── LAYER 1: Floating dust particles (always) ─── */}
        {floatingParticles.map((p, i) => (
          <motion.div
            key={`dust-${i}`}
            className="absolute rounded-full bg-foreground"
            style={{
              width: p.size,
              height: p.size,
              top: "50%",
              left: "50%",
            }}
            animate={{
              x: [
                Math.cos((p.angle * Math.PI) / 180) * p.radius,
                Math.cos(((p.angle + 180) * Math.PI) / 180) * (isHovered ? p.radius * 1.6 : p.radius),
                Math.cos(((p.angle + 360) * Math.PI) / 180) * p.radius,
              ],
              y: [
                Math.sin((p.angle * Math.PI) / 180) * p.radius,
                Math.sin(((p.angle + 180) * Math.PI) / 180) * (isHovered ? p.radius * 1.6 : p.radius),
                Math.sin(((p.angle + 360) * Math.PI) / 180) * p.radius,
              ],
              opacity: [0.2, 0.7, 0.2],
              scale: isHovered ? [1, 2, 1] : [1, 1.3, 1],
            }}
            transition={{
              duration: isHovered ? p.duration * 0.5 : p.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: p.delay,
            }}
          />
        ))}

        {/* ─── LAYER 2: Morphing geometric ring (always) ─── */}
        <svg className="absolute inset-[-4px] w-[calc(100%+8px)] h-[calc(100%+8px)]" viewBox="0 0 64 64">
          {/* Outer morphing shape */}
          <motion.path
            d={
              isHovered
                ? "M32 2 L58 16 L58 48 L32 62 L6 48 L6 16 Z" // hexagon on hover
                : "M32 4 A28 28 0 1 1 31.99 4 Z" // circle default
            }
            fill="none"
            stroke="currentColor"
            className="text-foreground"
            strokeWidth="0.6"
            animate={{
              opacity: [0.15, 0.35, 0.15],
              rotate: isHovered ? 30 : 0,
            }}
            transition={{
              opacity: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 0.6, ease: "easeOut" },
              d: { duration: 0.6, ease: "easeOut" },
            }}
            style={{ transformOrigin: "center" }}
          />

          {/* Inner rotating triangle (always, subtle) */}
          <motion.polygon
            points="32,10 50,46 14,46"
            fill="none"
            stroke="currentColor"
            className="text-foreground"
            strokeWidth="0.4"
            strokeLinejoin="round"
            animate={{
              rotate: [0, 360],
              opacity: isHovered ? 0.4 : 0.1,
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{
              rotate: { duration: 12, repeat: Infinity, ease: "linear" },
              opacity: { duration: 0.4 },
              scale: { duration: 0.4 },
            }}
            style={{ transformOrigin: "32px 34px" }}
          />

          {/* Counter-rotating inverted triangle */}
          <motion.polygon
            points="32,54 50,18 14,18"
            fill="none"
            stroke="currentColor"
            className="text-foreground"
            strokeWidth="0.4"
            strokeLinejoin="round"
            animate={{
              rotate: [360, 0],
              opacity: isHovered ? 0.4 : 0.08,
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{
              rotate: { duration: 15, repeat: Infinity, ease: "linear" },
              opacity: { duration: 0.4 },
              scale: { duration: 0.4 },
            }}
            style={{ transformOrigin: "32px 30px" }}
          />
        </svg>

        {/* ─── LAYER 3: Orbiting moons (always visible, 3D feel) ─── */}
        {[
          { dur: 3.5, size: 5, rx: 26, ry: 26, tilt: 0 },
          { dur: 5, size: 3.5, rx: 24, ry: 14, tilt: -35 },
          { dur: 6.5, size: 2.5, rx: 22, ry: 10, tilt: 55 },
        ].map((orb, i) => (
          <motion.div
            key={`moon-${i}`}
            className="absolute inset-0 pointer-events-none"
            animate={{ rotate: 360 }}
            transition={{
              duration: isHovered ? orb.dur * 0.35 : orb.dur,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ transformOrigin: "center" }}
          >
            <div
              className="absolute"
              style={{
                top: "50%",
                left: "50%",
                width: 0,
                height: 0,
                transform: `rotate(${orb.tilt}deg)`,
              }}
            >
              <motion.div
                className="absolute rounded-full bg-foreground"
                style={{
                  width: orb.size,
                  height: orb.size,
                  top: -orb.ry - orb.size / 2,
                  left: -orb.size / 2,
                }}
                animate={{
                  boxShadow: isHovered
                    ? [
                        `0 0 ${orb.size}px hsl(var(--foreground) / 0.3)`,
                        `0 0 ${orb.size * 3}px hsl(var(--foreground) / 0.6)`,
                        `0 0 ${orb.size}px hsl(var(--foreground) / 0.3)`,
                      ]
                    : `0 0 0px transparent`,
                  scale: isHovered ? [1, 1.4, 1] : 1,
                }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
              {/* Comet trail */}
              {[1, 2, 3, 4].map((t) => (
                <motion.div
                  key={t}
                  className="absolute rounded-full bg-foreground"
                  style={{
                    width: Math.max(orb.size - t * 0.8, 0.5),
                    height: Math.max(orb.size - t * 0.8, 0.5),
                    top: -orb.ry - Math.max(orb.size - t * 0.8, 0.5) / 2 + t * 2,
                    left: -Math.max(orb.size - t * 0.8, 0.5) / 2 + t * 1.5,
                  }}
                  animate={{
                    opacity: isHovered ? 0.35 - t * 0.06 : 0.15 - t * 0.03,
                  }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </div>
          </motion.div>
        ))}

        {/* ─── HOVER: Gravitational lensing rings ─── */}
        <AnimatePresence>
          {isHovered && (
            <>
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={`lens-${i}`}
                  className="absolute rounded-full border border-foreground"
                  style={{
                    inset: -(8 + i * 6),
                  }}
                  initial={{ scale: 0.5, opacity: 0, rotate: i * 30 }}
                  animate={{
                    scale: [0.9, 1.05, 0.9],
                    opacity: [0.08, 0.2, 0.08],
                    rotate: i * 30 + 360,
                  }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  transition={{
                    scale: { duration: 2 + i, repeat: Infinity, ease: "easeInOut" },
                    opacity: { duration: 2 + i, repeat: Infinity, ease: "easeInOut" },
                    rotate: { duration: 8 + i * 4, repeat: Infinity, ease: "linear" },
                  }}
                />
              ))}

              {/* Energy arcs */}
              <svg className="absolute inset-[-14px] w-[calc(100%+28px)] h-[calc(100%+28px)]" viewBox="0 0 84 84">
                {[0, 90, 180, 270].map((angle, i) => (
                  <motion.circle
                    key={`arc-${i}`}
                    cx="42" cy="42" r="38"
                    fill="none"
                    stroke="currentColor"
                    className="text-foreground"
                    strokeWidth="1.5"
                    strokeDasharray="12 80"
                    strokeDashoffset={angle}
                    strokeLinecap="round"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3, rotate: 360 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      opacity: { duration: 0.3, delay: i * 0.05 },
                      rotate: { duration: 4, repeat: Infinity, ease: "linear" },
                    }}
                    style={{ transformOrigin: "center" }}
                  />
                ))}
              </svg>
            </>
          )}
        </AnimatePresence>

        {/* ─── CENTRAL T ─── */}
        <motion.div
          className="relative z-10"
          animate={{ scale: clickCount > 0 ? [1, 1.4, 1] : 1 }}
          transition={{ duration: 0.35 }}
        >
          {/* Heartbeat ring around T */}
          <motion.div
            className="absolute inset-[-5px] rounded-full border border-foreground"
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="w-8 h-8 rounded-full bg-foreground flex items-center justify-center overflow-hidden relative"
            animate={{
              scale: isHovered ? 1.2 : [1, 1.03, 1],
              rotate: isHovered ? [0, -10, 10, -5, 5, 0] : 0,
            }}
            transition={{
              scale: isHovered
                ? { type: "spring", stiffness: 300, damping: 12 }
                : { duration: 3, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 0.5 },
            }}
          >
            {/* Click ripple */}
            <AnimatePresence>
              {clickCount > 0 && (
                <motion.div
                  key={clickCount}
                  className="absolute inset-0 rounded-full border-2 border-background/60"
                  initial={{ scale: 0.3, opacity: 1 }}
                  animate={{ scale: 3, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7 }}
                />
              )}
            </AnimatePresence>

            {/* Shine sweep */}
            <motion.div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(110deg, transparent 25%, hsl(var(--background) / 0.35) 50%, transparent 75%)",
              }}
              animate={{ x: ["-200%", "200%"] }}
              transition={{
                duration: 1.2,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: isHovered ? 0.8 : 3,
              }}
            />

            {/* Gradient overlay on hover */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: "radial-gradient(circle at 30% 30%, hsl(var(--background) / 0.15), transparent 60%)",
              }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />

            {/* The T */}
            <motion.span
              className="text-background font-black text-sm leading-none select-none relative z-10"
              animate={{
                scale: isHovered ? [1, 1.1, 1] : 1,
                textShadow: isHovered
                  ? "0 0 12px hsl(var(--background) / 0.7)"
                  : "0 0 0px transparent",
              }}
              transition={{
                scale: { duration: 0.8, repeat: isHovered ? Infinity : 0, ease: "easeInOut" },
                textShadow: { duration: 0.3 },
              }}
            >
              T
            </motion.span>
          </motion.div>
        </motion.div>

        {/* ─── CLICK BURST ─── */}
        <AnimatePresence>
          {clickCount > 0 && (
            <>
              {Array.from({ length: 12 }).map((_, i) => (
                <motion.div
                  key={`burst-${clickCount}-${i}`}
                  className="absolute rounded-full bg-foreground"
                  style={{
                    width: 2 + (i % 3),
                    height: 2 + (i % 3),
                    top: "50%",
                    left: "50%",
                  }}
                  initial={{ x: 0, y: 0, scale: 1.5, opacity: 1 }}
                  animate={{
                    x: Math.cos((i * 30 * Math.PI) / 180) * (30 + (i % 3) * 8),
                    y: Math.sin((i * 30 * Math.PI) / 180) * (30 + (i % 3) * 8),
                    scale: 0,
                    opacity: 0,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.55, ease: "easeOut", delay: i * 0.015 }}
                />
              ))}
              {/* Shockwave ring */}
              <motion.div
                key={`shock-${clickCount}`}
                className="absolute rounded-full border border-foreground/40"
                style={{ top: "50%", left: "50%", width: 0, height: 0, marginTop: 0, marginLeft: 0 }}
                initial={{ width: 10, height: 10, marginTop: -5, marginLeft: -5, opacity: 1 }}
                animate={{ width: 80, height: 80, marginTop: -40, marginLeft: -40, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.a>
  );
};

export default BrandLogo;
