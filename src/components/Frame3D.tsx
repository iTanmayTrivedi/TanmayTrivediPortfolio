import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState, ReactNode } from "react";

interface Frame3DProps {
  children: ReactNode;
  className?: string;
  maxWidthClass?: string;
}

/**
 * Reusable 3D-tilt frame with corner brackets and shine sweep,
 * matching the About photo aesthetic.
 */
const Frame3D = ({ children, className = "", maxWidthClass = "" }: Frame3DProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 300 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <div
      ref={ref}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000 }}
    >
      {[
        "-top-4 -left-4 border-l-2 border-t-2",
        "-top-4 -right-4 border-r-2 border-t-2",
        "-bottom-4 -left-4 border-l-2 border-b-2",
        "-bottom-4 -right-4 border-r-2 border-b-2",
      ].map((pos, i) => {
        const isRight = pos.includes("right");
        const isBottom = pos.includes("bottom");
        return (
          <motion.div
            key={i}
            className={`absolute ${pos} w-12 h-12 border-foreground/40 z-10 pointer-events-none`}
            animate={{
              x: isHovered ? (isRight ? 4 : -4) : 0,
              y: isHovered ? (isBottom ? 4 : -4) : 0,
              borderColor: isHovered ? "hsl(var(--foreground))" : "hsl(var(--foreground) / 0.4)",
            }}
            transition={{ duration: 0.3 }}
          />
        );
      })}

      <motion.div
        className={`relative overflow-hidden ${maxWidthClass}`}
        style={{ rotateX, rotateY }}
      >
        {children}
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent pointer-events-none"
          initial={{ x: "-100%", opacity: 0 }}
          animate={{
            x: isHovered ? "100%" : "-100%",
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.6 }}
        />
      </motion.div>
    </div>
  );
};

export default Frame3D;
