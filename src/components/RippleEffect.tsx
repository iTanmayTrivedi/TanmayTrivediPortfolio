import { useEffect, useState } from "react";

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
}

/**
 * Global click ripple — water-like concentric rings emanate from the click point.
 * Pointer-events: none so it never blocks UI.
 */
const RippleEffect = () => {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  useEffect(() => {
    let counter = 0;
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest("[data-no-ripple]")) return;
      const size = Math.max(window.innerWidth, window.innerHeight) * 0.45;
      const id = ++counter;
      setRipples((prev) => [...prev, { id, x: e.clientX, y: e.clientY, size }]);

      // Underwater body sway — briefly distort everything under the ripple
      document.body.classList.remove("underwater-pulse");
      // force reflow so the animation re-triggers
      void document.body.offsetWidth;
      document.body.classList.add("underwater-pulse");
      window.setTimeout(() => {
        document.body.classList.remove("underwater-pulse");
      }, 900);

      window.setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 1300);
    };
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9998] overflow-hidden">
      {ripples.map((r) => (
        <span key={r.id}>
          {/* Outer ring */}
          <span
            className="ripple-ring"
            style={{
              left: r.x - r.size / 2,
              top: r.y - r.size / 2,
              width: r.size,
              height: r.size,
            }}
          />
          {/* Inner ring (delayed) */}
          <span
            className="ripple-ring ripple-ring--inner"
            style={{
              left: r.x - r.size / 2,
              top: r.y - r.size / 2,
              width: r.size,
              height: r.size,
            }}
          />
          {/* Distortion blob */}
          <span
            className="ripple-blob"
            style={{
              left: r.x - r.size / 4,
              top: r.y - r.size / 4,
              width: r.size / 2,
              height: r.size / 2,
            }}
          />
        </span>
      ))}
    </div>
  );
};

export default RippleEffect;
