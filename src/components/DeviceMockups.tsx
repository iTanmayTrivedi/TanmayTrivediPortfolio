import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { getSimulatedScreen } from "./SimulatedScreens";

interface DeviceMockupsProps {
  screenshots: string[];
  title: string;
  projectSlug?: string;
}

const DeviceFrame = ({
  type,
  screenshot,
  title,
  index,
  projectSlug,
}: {
  type: "macbook" | "ipad" | "iphone";
  screenshot: string;
  title: string;
  index: number;
  projectSlug?: string;
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const animationRef = useRef<number | null>(null);

  // Check if we have a simulated screen for this project
  const SimulatedScreen = projectSlug ? getSimulatedScreen(projectSlug, type) : null;

  const startAutoScroll = () => {
    setIsHovered(true);
    if (SimulatedScreen) return; // No scroll needed for simulated screens
    const el = scrollRef.current;
    if (!el) return;

    const scroll = () => {
      if (!scrollRef.current) return;
      const maxScroll = scrollRef.current.scrollHeight - scrollRef.current.clientHeight;
      if (scrollRef.current.scrollTop >= maxScroll) {
        scrollRef.current.scrollTop = 0;
      } else {
        scrollRef.current.scrollTop += 0.8;
      }
      animationRef.current = requestAnimationFrame(scroll);
    };
    animationRef.current = requestAnimationFrame(scroll);
  };

  const stopAutoScroll = () => {
    setIsHovered(false);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  };

  const renderContent = () => {
    if (SimulatedScreen) {
      return (
        <div className="w-full h-full overflow-hidden">
          <SimulatedScreen />
        </div>
      );
    }
    return (
      <div
        ref={scrollRef}
        className="w-full h-full overflow-hidden"
        style={{ scrollBehavior: "auto" }}
      >
        <img
          src={screenshot}
          alt={`${title} on ${type}`}
          className="w-full object-cover object-top"
          style={{ minHeight: type === "iphone" ? "300%" : type === "ipad" ? "250%" : "200%" }}
          draggable={false}
        />
      </div>
    );
  };

  if (type === "macbook") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.15, duration: 0.7 }}
        className="flex flex-col items-center flex-shrink-0"
        style={{ width: "55%" }}
      >
        <div
          className="relative w-full rounded-t-xl border-[12px] border-foreground/90 bg-foreground/90 overflow-hidden"
          style={{ aspectRatio: "16/10" }}
          onMouseEnter={startAutoScroll}
          onMouseLeave={stopAutoScroll}
          data-cursor="View"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-foreground/40 z-10" style={{ top: "-2px" }} />
          {renderContent()}
          <motion.div
            className="absolute inset-0 pointer-events-none border-2 border-primary/0 rounded-sm"
            animate={{ borderColor: isHovered ? "hsl(var(--primary) / 0.3)" : "hsl(var(--primary) / 0)" }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div className="w-[110%] h-4 bg-foreground/80 rounded-b-md relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-foreground/50 rounded-b-sm" />
        </div>
        <div className="w-[115%] h-2 bg-foreground/60 rounded-b-lg" />
      </motion.div>
    );
  }

  if (type === "ipad") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.15, duration: 0.7 }}
        className="flex flex-col items-center flex-shrink-0"
        style={{ width: "28%" }}
      >
        <div
          className="relative w-full rounded-2xl border-[10px] border-foreground/90 bg-foreground/90 overflow-hidden"
          style={{ aspectRatio: "3/4" }}
          onMouseEnter={startAutoScroll}
          onMouseLeave={stopAutoScroll}
          data-cursor="View"
        >
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-foreground/40 z-10" />
          {renderContent()}
          <motion.div
            className="absolute inset-0 pointer-events-none border-2 border-primary/0 rounded-xl"
            animate={{ borderColor: isHovered ? "hsl(var(--primary) / 0.3)" : "hsl(var(--primary) / 0)" }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.div>
    );
  }

  // iPhone
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.7 }}
      className="flex flex-col items-center flex-shrink-0"
      style={{ width: "17%" }}
    >
      <div
        className="relative w-full rounded-[2rem] border-[8px] border-foreground/90 bg-foreground/90 overflow-hidden"
        style={{ aspectRatio: "9/19.5" }}
        onMouseEnter={startAutoScroll}
        onMouseLeave={stopAutoScroll}
        data-cursor="View"
      >
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[35%] h-[14px] rounded-full bg-foreground/90 z-10" />
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-[35%] h-1 rounded-full bg-background/50 z-10" />
        {renderContent()}
        <motion.div
          className="absolute inset-0 pointer-events-none border-2 border-primary/0 rounded-[1.5rem]"
          animate={{ borderColor: isHovered ? "hsl(var(--primary) / 0.3)" : "hsl(var(--primary) / 0)" }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
};

const DeviceMockups = ({ screenshots, title, projectSlug }: DeviceMockupsProps) => {
  const macScreenshot = screenshots[0] || screenshots[0];
  const ipadScreenshot = screenshots[1] || screenshots[0];
  const iphoneScreenshot = screenshots[2] || screenshots[0];

  return (
    <div className="flex items-end justify-center gap-4 sm:gap-6 lg:gap-8 w-full py-8">
      <DeviceFrame type="macbook" screenshot={macScreenshot} title={title} index={0} projectSlug={projectSlug} />
      <DeviceFrame type="ipad" screenshot={ipadScreenshot} title={title} index={1} projectSlug={projectSlug} />
      <DeviceFrame type="iphone" screenshot={iphoneScreenshot} title={title} index={2} projectSlug={projectSlug} />
    </div>
  );
};

export default DeviceMockups;
