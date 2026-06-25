import { motion, AnimatePresence } from "framer-motion";

interface BarTransitionProps {
  show: boolean;
}

/**
 * 3 horizontal bars that sweep across the viewport — used between
 * the main site and project case-study pages. Mirrors the preloader
 * exit transition for visual cohesion.
 */
const BarTransition = ({ show }: BarTransitionProps) => {
  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-[9999] pointer-events-none">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute left-0 right-0 bg-foreground"
              style={{
                top: `${i * 33.4}%`,
                height: "33.4%",
                transformOrigin: i % 2 === 0 ? "left" : "right",
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
              transition={{
                duration: 0.55,
                delay: i * 0.07,
                ease: [0.76, 0, 0.24, 1],
              }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  );
};

export default BarTransition;
