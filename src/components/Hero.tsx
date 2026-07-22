import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { FileText } from "lucide-react";
import finderIcon from "@/assets/finder-icon.png";
import resumeEn from "@/assets/resume-en.pdf";
import resumeJa from "@/assets/resume-rirekisho.pdf";
import { useLanguage } from "@/contexts/LanguageContext";

const timeZones = [
  { zone: "Asia/Kolkata", label: "India" },
  { zone: "Asia/Tokyo", label: "Japan" },
];

const rotatingSkills = ["React", "Django", "TypeScript", "Node.js", "Tailwind"];


const fallingKanji = ["技", "術", "創", "造", "革", "新", "美", "和", "心", "道", "力", "光", "夢", "魂", "風"];

// Japanese calligraphy-inspired hero text with sumi-e brush effects
const HeroTextLine = ({ 
  variants, 
  text, 
  kanji,
  isSecondLine = false,
}: { 
  variants: any; 
  text: string; 
  kanji: string;
  isSecondLine?: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isTapped, setIsTapped] = useState(false);
  const chars = text.split("");
  const brushStrokes = ["一", "丨", "丿", "丶", "乙"];
  const hoverDisabled = isSecondLine;
  const isActive = !hoverDisabled && (isHovered || isTapped);

  const handleTap = () => {
    if (hoverDisabled) return;
    setIsTapped(prev => !prev);
  };

  return (
    <div 
      className="overflow-hidden relative group/line"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleTap}
    >
      {/* Sumi-e ink wash background sweep */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={isActive 
          ? { scaleX: 1, opacity: 1 } 
          : { scaleX: 0, opacity: 0 }
        }
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{ 
          originX: isSecondLine ? 1 : 0,
          background: "linear-gradient(90deg, hsl(var(--foreground) / 0.04), hsl(var(--foreground) / 0.08), hsl(var(--foreground) / 0.04))",
        }}
      />

      {/* Ink particle trail */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute rounded-full pointer-events-none z-0"
          style={{
            backgroundColor: "hsl(var(--foreground))",
            width: 2 + Math.random() * 4,
            height: 2 + Math.random() * 4,
            left: `${10 + i * 11}%`,
            top: `${30 + (i % 3) * 20}%`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={isActive
            ? { opacity: [0, 0.15, 0], scale: [0, 1.5, 0], y: [0, -20 - Math.random() * 30, -50] }
            : { opacity: 0, scale: 0 }
          }
          transition={{ duration: 1.5, delay: i * 0.06, repeat: isActive ? Infinity : 0, repeatDelay: 1 }}
        />
      ))}

      {/* Floating brush stroke fragments */}
      {brushStrokes.map((stroke, i) => (
        <motion.span
          key={i}
          className="absolute pointer-events-none select-none z-0"
          style={{ 
            left: `${15 + i * 18}%`, 
            top: `${20 + (i % 3) * 25}%`,
            color: "hsl(var(--foreground))",
            fontSize: "clamp(1rem, 3vw, 2.5rem)",
          }}
          initial={{ opacity: 0, scale: 0, rotate: -30 + i * 15 }}
          animate={isActive 
            ? { opacity: 0.05, scale: 1, rotate: [0, 5, -5, 0], y: [0, -8, 0] }
            : { opacity: 0, scale: 0, rotate: -30 + i * 15 }
          }
          transition={{ 
            duration: 0.6, 
            delay: i * 0.08,
            rotate: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          {stroke}
        </motion.span>
      ))}

      {/* Large kanji watermark with vertical writing feel */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={isActive ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {kanji.split("").map((k, i) => (
          <motion.span
            key={i}
            className="inline-block mx-[0.1em]"
            style={{ 
              color: "hsl(var(--foreground))",
              fontSize: "clamp(2rem, 8vw, 7rem)",
              fontWeight: 100,
            }}
            initial={{ opacity: 0, y: 40, scale: 0.5, filter: "blur(12px)" }}
            animate={isActive 
              ? { opacity: 0.06, y: 0, scale: 1, filter: "blur(0px)" }
              : { opacity: 0, y: 40, scale: 0.5, filter: "blur(12px)" }
            }
            transition={{ 
              duration: 0.7, 
              delay: 0.1 + i * 0.12,
              ease: [0.22, 1, 0.36, 1]
            }}
          >
            {k}
          </motion.span>
        ))}
      </motion.div>

      {/* Red hanko seal stamp */}
      <motion.div
        className="absolute z-20 pointer-events-none select-none"
        style={{ 
          right: isSecondLine ? "auto" : "3%",
          left: isSecondLine ? "3%" : "auto",
          top: "50%",
          translateY: "-50%",
        }}
        initial={{ opacity: 0, scale: 0, rotate: -15 }}
        animate={isActive 
          ? { opacity: 0.18, scale: 1, rotate: [-8, -5, -8] }
          : { opacity: 0, scale: 0, rotate: -15 }
        }
        transition={{ duration: 0.5, delay: 0.3, ease: "backOut", rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
      >
        <div 
          className="border-2 rounded-sm flex items-center justify-center"
          style={{ 
            borderColor: "hsl(0, 70%, 45%)",
            width: "clamp(2rem, 5vw, 4rem)",
            height: "clamp(2.5rem, 6vw, 5rem)",
            color: "hsl(0, 70%, 45%)",
            fontSize: "clamp(0.6rem, 1.5vw, 1.2rem)",
            writingMode: "vertical-rl",
            letterSpacing: "0.15em",
            fontWeight: 300,
          }}
        >
          {isSecondLine ? "匠" : "技"}
        </div>
      </motion.div>

      {/* Vertical brush line accent */}
      <motion.div
        className="absolute pointer-events-none z-0"
        style={{
          originY: isSecondLine ? 1 : 0,
          left: isSecondLine ? "8%" : "auto",
          right: isSecondLine ? "auto" : "8%",
          top: "10%",
          width: "1px",
          height: "80%",
          backgroundColor: "hsl(var(--foreground))",
        }}
        initial={{ scaleY: 0, opacity: 0 }}
        animate={isActive ? { scaleY: 1, opacity: 0.08 } : { scaleY: 0, opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      />

      <motion.h1
        variants={variants}
        className="hero-text relative z-10 flex justify-center flex-wrap"
      >
        {chars.map((char, i) => {
          // Deterministic pseudo-random scatter per character — clean & repeatable
          const seed = (i * 9301 + 49297) % 233280;
          const rand = seed / 233280;
          const seed2 = (i * 7919 + 104729) % 233280;
          const rand2 = seed2 / 233280;
          const scatterX = (rand - 0.5) * 600;
          const scatterY = (rand2 - 0.5) * 400 - 60;
          const scatterRot = (rand - 0.5) * 90;

          return (
            <motion.span
              key={i}
              className="inline-block relative"
              style={{
                whiteSpace: char === " " ? "pre" : "normal",
              }}
              animate={isActive ? {
                x: scatterX,
                y: scatterY,
                rotate: scatterRot,
                opacity: 0,
                scale: 0.6,
                filter: "blur(4px)",
              } : {
                x: 0,
                y: 0,
                rotate: 0,
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
              }}
              transition={{
                duration: isActive ? 0.7 : 0.55,
                delay: isActive ? i * 0.015 : (chars.length - i) * 0.012,
                ease: isActive ? [0.22, 1, 0.36, 1] : [0.34, 1.56, 0.64, 1],
              }}
            >
              <span className="inline-block">{char}</span>
            </motion.span>
          );
        })}
      </motion.h1>
    </div>
  );
};


const Hero = () => {
  const [time, setTime] = useState(new Date());
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeZoneIndex, setActiveZoneIndex] = useState(0);
  const [activeSkillIndex, setActiveSkillIndex] = useState(0);
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);
  const [blossoms, setBlossoms] = useState<{ id: number; x: number; delay: number; duration: number; size: number; rotation: number }[]>([]);
  const canvasRef = useRef<HTMLDivElement>(null);
  const rippleIdRef = useRef(0);
  const { t } = useLanguage();

  // 3D tilt
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 100, damping: 30 });
  const springRotateY = useSpring(rotateY, { stiffness: 100, damping: 30 });

  // Generate cherry blossoms
  useEffect(() => {
    const petals = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 6 + Math.random() * 6,
      size: 4 + Math.random() * 8,
      rotation: Math.random() * 360,
    }));
    setBlossoms(petals);
  }, []);

  const handleCanvasMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rotateX.set(y * -8);
    rotateY.set(x * 8);
  }, [rotateX, rotateY]);

  const handleCanvasMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  const handleCanvasClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    const id = rippleIdRef.current++;
    setRipples(prev => [...prev, { x, y, id }]);
    setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 1500);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const zoneSwitch = setInterval(() => {
      setActiveZoneIndex((prev) => (prev + 1) % timeZones.length);
    }, 4000);
    return () => clearInterval(zoneSwitch);
  }, []);

  useEffect(() => {
    const skillSwitch = setInterval(() => {
      setActiveSkillIndex((prev) => (prev + 1) % rotatingSkills.length);
    }, 3500);
    return () => clearInterval(skillSwitch);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const formatTimeForZone = (date: Date, timezone: string) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: timezone,
    });
  };

  const currentZone = timeZones[activeZoneIndex];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const lineVariants = {
    hidden: { y: "100%", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  };

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section className="min-h-screen relative overflow-hidden">
      <div className="container mx-auto px-5 sm:px-6 lg:px-12 pt-24 sm:pt-32 pb-8 sm:pb-12">
        {/* Time Display + Name */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mb-8 flex items-center justify-between"
        >
          <motion.span
            key={activeZoneIndex}
            className="text-sm tracking-widest inline-block font-semibold"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            {formatTimeForZone(time, currentZone.zone)}{" "}
            <span className="text-muted-foreground">— {currentZone.label}</span>
          </motion.span>
          <motion.div
            className="relative group/name cursor-pointer ml-auto mr-4 sm:mr-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <div
              className="flex items-center gap-1.5 text-sm tracking-widest font-semibold px-5 py-2 rounded-full border border-foreground/20 relative overflow-hidden group-hover/name:border-foreground/60 transition-all duration-500 group-hover/name:shadow-[0_0_20px_rgba(0,0,0,0.1)]"
            >
              {/* Sliding fill background */}
              <div
                className="absolute inset-0 bg-foreground rounded-full origin-left scale-x-0 group-hover/name:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
              />
              {/* Glint sweep */}
              <div className="absolute inset-0 -translate-x-full group-hover/name:translate-x-full transition-transform duration-700 delay-200 bg-gradient-to-r from-transparent via-background/20 to-transparent z-20 pointer-events-none" />
              <span className="text-foreground relative z-10 group-hover/name:text-background transition-colors duration-500">TANMAY</span>
              <span className="text-muted-foreground relative z-10 group-hover/name:text-background/70 transition-colors duration-500">TRIVEDI</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Hero Typography with parallax */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center"
          style={{
            transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
          }}
        >
          <HeroTextLine variants={lineVariants} text={t("hero.fullStack")} kanji="全技術" />
          <div className="relative w-full">
            <HeroTextLine variants={lineVariants} text={t("hero.developer")} kanji="開発者" isSecondLine />
            {/* Finder icon peeking above & behind the R in DEVELOPER */}
            <motion.img
              src={finderIcon}
              alt=""
              aria-hidden
              initial={{ opacity: 0, scale: 0.6, rotate: -16, y: 20 }}
              animate={{ opacity: 1, scale: 1, rotate: -10, y: 0 }}
              transition={{ delay: 1.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ rotate: -4, scale: 1.06 }}
              className="hidden sm:block absolute pointer-events-auto select-none z-0 right-[2%] md:right-[3%] lg:right-[4%] top-[-18%] md:top-[-26%] w-[clamp(3rem,7vw,6.5rem)] drop-shadow-[0_10px_24px_rgba(0,0,0,0.22)]"
              draggable={false}
            />

          </div>
          {/* Desktop/Tablet: outlined text */}
          <div className="hidden sm:block overflow-hidden w-full max-w-full px-4">
            <AnimatePresence mode="wait">
              <motion.h1
                key={activeSkillIndex}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="hero-text-outline transition-all duration-500 hover:[-webkit-text-stroke:0] hover:text-foreground"
              >
                {rotatingSkills[activeSkillIndex]}
              </motion.h1>
            </AnimatePresence>
          </div>

          {/* Mobile: clean animated pill */}
          <div className="sm:hidden mt-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSkillIndex}
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -10 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="inline-flex items-center gap-2 px-6 py-2.5 border border-foreground/30 rounded-full"
              >
                <motion.span
                  className="w-2 h-2 rounded-full bg-foreground"
                  animate={{ scale: [1, 1.4, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span className="hero-text font-bold text-base tracking-[0.2em] uppercase" style={{ fontSize: '0.875rem', lineHeight: '1.5', fontWeight: 600 }}>
                  {rotatingSkills[activeSkillIndex]}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Resume Buttons */}
        <motion.div
          id="resume"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap justify-center gap-4 mt-8 sm:mt-10 px-2"
        >
          <motion.a
            variants={fadeInVariants}
            href={resumeEn}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background font-medium tracking-wide overflow-hidden text-sm sm:text-base"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/80 to-foreground"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              style={{ opacity: 0.3 }}
            />
            <motion.div
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
            >
              <FileText className="w-5 h-5 relative z-10" />
            </motion.div>
            <span className="relative z-10">{t("hero.englishResume")}</span>
            <motion.span
              className="relative z-10"
              initial={{ x: 0 }}
              whileHover={{ x: 5 }}
            >
              →
            </motion.span>
          </motion.a>
          <motion.a
            variants={fadeInVariants}
            href={resumeJa}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 px-8 py-4 border-2 border-foreground text-foreground font-medium tracking-wide overflow-hidden text-sm sm:text-base"
            whileHover={{ 
              scale: 1.05, 
              y: -3,
              backgroundColor: "hsl(var(--foreground))",
              color: "hsl(var(--background))"
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2.5 }}
            >
              <FileText className="w-5 h-5" />
            </motion.div>
            <span>{t("hero.japaneseResume")}</span>
            <motion.span
              initial={{ x: 0 }}
              whileHover={{ x: 5 }}
            >
              →
            </motion.span>
          </motion.a>
        </motion.div>

        {/* Tech Tags */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap justify-center gap-4 sm:gap-8 mt-6 sm:mt-8 px-2"
        >
          {["React", "Node.js", "TypeScript"].map((tech) => (
            <motion.span
              key={tech}
              variants={fadeInVariants}
              className="text-sm tracking-widest text-muted-foreground uppercase relative group cursor-pointer"
              whileHover={{ color: "hsl(var(--foreground))" }}
            >
              {tech}
              <motion.span
                className="absolute -bottom-1 left-0 w-full h-px bg-foreground origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.span>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="fixed left-6 lg:left-12 bottom-1/4 hidden lg:flex flex-col items-center gap-2"
        >
          <motion.div
            className="w-px h-16 bg-foreground/30 origin-top"
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="scroll-indicator text-muted-foreground">{t("hero.scroll")}</span>
        </motion.div>

        {/* Creative Japanese-Inspired Interactive Visual */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
          className="mt-8 sm:mt-16 max-w-5xl mx-auto px-2 sm:px-0"
          style={{ perspective: 1200 }}
        >
          <motion.div
            ref={canvasRef}
            className="relative overflow-hidden border border-foreground/10 aspect-[16/9] sm:aspect-[21/9] bg-background cursor-none group"
            style={{ rotateX: springRotateX, rotateY: springRotateY, transformStyle: "preserve-3d" }}
            onMouseMove={handleCanvasMouseMove}
            onMouseLeave={handleCanvasMouseLeave}
            onClick={handleCanvasClick}
            whileHover={{ borderColor: "hsl(var(--foreground) / 0.3)" }}
            transition={{ duration: 0.4 }}
          >
            {/* Click ripple effects */}
            <AnimatePresence>
              {ripples.map(ripple => (
                <motion.div
                  key={ripple.id}
                  className="absolute pointer-events-none"
                  style={{ left: `${ripple.x}%`, top: `${ripple.y}%`, transform: "translate(-50%, -50%)" }}
                  initial={{ width: 0, height: 0, opacity: 0.6 }}
                  animate={{ width: 300, height: 300, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                >
                  <div className="w-full h-full rounded-full border border-foreground/30" />
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Falling kanji rain */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {fallingKanji.map((char, i) => (
                <motion.span
                  key={i}
                  className="absolute text-foreground/[0.04] group-hover:text-foreground/[0.08] text-sm sm:text-lg font-light transition-colors duration-700 select-none"
                  style={{ left: `${(i / fallingKanji.length) * 100}%` }}
                  initial={{ y: "-10%", opacity: 0 }}
                  animate={{ y: "110%", opacity: [0, 1, 1, 0] }}
                  transition={{
                    duration: 8 + i * 0.5,
                    repeat: Infinity,
                    delay: i * 0.8,
                    ease: "linear",
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </div>

            {/* Cherry blossom petals */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {blossoms.map(petal => (
                <motion.div
                  key={petal.id}
                  className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
                  style={{ left: `${petal.x}%`, width: petal.size, height: petal.size }}
                  initial={{ y: "-5%", rotate: petal.rotation }}
                  animate={{
                    y: "110%",
                    x: [0, 15, -10, 20, 0],
                    rotate: petal.rotation + 360,
                  }}
                  transition={{
                    y: { duration: petal.duration, repeat: Infinity, delay: petal.delay, ease: "linear" },
                    x: { duration: petal.duration * 0.8, repeat: Infinity, delay: petal.delay, ease: "easeInOut" },
                    rotate: { duration: petal.duration, repeat: Infinity, delay: petal.delay, ease: "linear" },
                  }}
                >
                  <svg viewBox="0 0 10 10" className="w-full h-full text-foreground/10 group-hover:text-foreground/20 transition-colors duration-500">
                    <ellipse cx="5" cy="5" rx="4" ry="2.5" fill="currentColor" />
                  </svg>
                </motion.div>
              ))}
            </div>

            {/* Mouse-reactive glow */}
            <motion.div
              className="absolute w-80 h-80 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: "radial-gradient(circle, hsl(var(--foreground) / 0.08) 0%, transparent 60%)",
                left: `calc(${((mousePosition.x + 10) / 20) * 100}% - 10rem)`,
                top: `calc(${((mousePosition.y + 10) / 20) * 100}% - 10rem)`,
              }}
            />

            {/* Animated grid with wave effect */}
            <div className="absolute inset-0 grid grid-cols-6 sm:grid-cols-12">
              {Array.from({ length: 12 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="border-r border-foreground/[0.03] group-hover:border-foreground/[0.07] transition-colors duration-700 h-full hidden sm:block"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: 1 + i * 0.05, duration: 0.6 }}
                  style={{ transformOrigin: "top" }}
                />
              ))}
              {Array.from({ length: 6 }).map((_, i) => (
                <motion.div
                  key={`m-${i}`}
                  className="border-r border-foreground/[0.04] h-full sm:hidden"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: 1 + i * 0.08, duration: 0.6 }}
                  style={{ transformOrigin: "top" }}
                />
              ))}
            </div>

            {/* Horizontal grid lines for depth */}
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute left-0 right-0 h-px bg-foreground/[0.03] group-hover:bg-foreground/[0.06] transition-colors duration-700"
                  style={{ top: `${(i + 1) * 16.67}%` }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1.2 + i * 0.08, duration: 0.8 }}
                />
              ))}
            </div>

            {/* Large floating kanji with deep parallax */}
            <motion.div
              className="absolute top-1/2 left-1/2 select-none pointer-events-none"
              animate={{
                x: `calc(-50% + ${mousePosition.x * 1.2}px)`,
                y: `calc(-50% + ${mousePosition.y * 1.2}px)`,
              }}
              transition={{ type: "spring", stiffness: 40, damping: 20 }}
              style={{ translateZ: 30 }}
            >
              <motion.span
                className="text-[8rem] sm:text-[14rem] md:text-[18rem] font-black text-foreground/[0.03] leading-none tracking-tighter group-hover:text-foreground/[0.07] transition-colors duration-700"
                initial={{ opacity: 0, scale: 0.7, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: 1.2, duration: 1.2, ease: "easeOut" }}
              >
                開発
              </motion.span>
            </motion.div>

            {/* Secondary kanji layer with opposite parallax */}
            <motion.div
              className="absolute top-[20%] right-[10%] select-none pointer-events-none"
              animate={{
                x: `${mousePosition.x * -0.5}px`,
                y: `${mousePosition.y * -0.5}px`,
              }}
              transition={{ type: "spring", stiffness: 60, damping: 25 }}
            >
              <motion.span
                className="text-[3rem] sm:text-[5rem] font-thin text-foreground/[0.02] group-hover:text-foreground/[0.05] transition-colors duration-700 select-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
              >
                創造
              </motion.span>
            </motion.div>

            {/* Wave pattern - Japanese great wave inspired */}
            <motion.svg
              className="absolute bottom-12 sm:bottom-16 left-1/2 -translate-x-1/2 w-48 sm:w-72 h-12 sm:h-16 text-foreground/[0.06] group-hover:text-foreground/[0.12] transition-colors duration-700 pointer-events-none"
              viewBox="0 0 200 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
            >
              {[0, 1, 2].map(i => (
                <motion.path
                  key={i}
                  d={`M -20 ${25 + i * 5} Q 30 ${10 + i * 5}, 60 ${25 + i * 5} T 140 ${25 + i * 5} T 220 ${25 + i * 5}`}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ delay: 1.8 + i * 0.2, duration: 1.5, ease: "easeOut" }}
                />
              ))}
            </motion.svg>

            {/* Animated torii gate */}
            <motion.svg
              className="absolute bottom-12 sm:bottom-16 left-6 sm:left-10 w-12 h-16 sm:w-20 sm:h-24 text-foreground/10 group-hover:text-foreground/25 transition-colors duration-500"
              viewBox="0 0 80 100"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              whileHover={{ scale: 1.15, rotate: -3, y: -5 }}
            >
              <motion.line x1="5" y1="8" x2="75" y2="8" strokeWidth="2.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.3, duration: 0.8 }} />
              <motion.line x1="10" y1="15" x2="70" y2="15" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.5, duration: 0.8 }} />
              <motion.line x1="18" y1="15" x2="18" y2="95" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.7, duration: 0.8 }} />
              <motion.line x1="62" y1="15" x2="62" y2="95" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.7, duration: 0.8 }} />
            </motion.svg>

            {/* Interactive terminal-style code window */}
            <motion.div
              className="absolute top-4 sm:top-6 right-4 sm:right-8 w-[140px] sm:w-[220px] md:w-[260px]"
              initial={{ opacity: 0, x: 30, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ delay: 1.6, duration: 0.8, ease: "easeOut" }}
              whileHover={{ scale: 1.05, y: -4 }}
              style={{ translateZ: 40 }}
            >
              {/* Terminal chrome */}
              <div className="flex items-center gap-1 sm:gap-1.5 mb-2 sm:mb-3">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-foreground/20 group-hover:bg-red-400/60 transition-colors duration-500" />
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-foreground/15 group-hover:bg-yellow-400/60 transition-colors duration-500" />
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-foreground/10 group-hover:bg-green-400/60 transition-colors duration-500" />
                <motion.span
                  className="text-[7px] sm:text-[9px] font-mono text-foreground/20 group-hover:text-foreground/40 ml-1 sm:ml-2 tracking-wider transition-colors duration-500"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ~/tokyo
                </motion.span>
              </div>

              {/* Code lines with staggered reveal */}
              <div className="font-mono text-[8px] sm:text-[10px] md:text-[11px] leading-[1.6] sm:leading-[1.8] text-right space-y-0">
                <motion.div
                  className="text-foreground/15 group-hover:text-foreground/35 transition-colors duration-500"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.8 }}
                >
                  <span className="text-foreground/30 group-hover:text-foreground/60 transition-colors duration-500">const</span> dev = &#123;
                </motion.div>
                <motion.div
                  className="text-foreground/15 group-hover:text-foreground/35 transition-colors duration-500"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 2.0 }}
                >
                  &nbsp;&nbsp;name: <span className="text-foreground/30 group-hover:text-foreground/55 transition-colors duration-500">"Dev"</span>,
                </motion.div>
                <motion.div
                  className="text-foreground/15 group-hover:text-foreground/35 transition-colors duration-500"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 2.2 }}
                >
                  &nbsp;&nbsp;location: <motion.span
                    className="text-foreground/30 group-hover:text-foreground/55 transition-colors duration-500"
                    animate={{ opacity: [1, 0.4, 1] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  >"東京"</motion.span>,
                </motion.div>
                <motion.div
                  className="text-foreground/15 group-hover:text-foreground/35 transition-colors duration-500"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 2.4 }}
                >
                  &nbsp;&nbsp;stack: <span className="text-foreground/30 group-hover:text-foreground/55 transition-colors duration-500">["React",</span>
                </motion.div>
                <motion.div
                  className="text-foreground/15 group-hover:text-foreground/35 transition-colors duration-500"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 2.5 }}
                >
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-foreground/30 group-hover:text-foreground/55 transition-colors duration-500">"Node", "TS"]</span>,
                </motion.div>
                <motion.div
                  className="text-foreground/15 group-hover:text-foreground/35 transition-colors duration-500"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 2.6 }}
                >
                  &nbsp;&nbsp;passion: <span className="text-foreground/30 group-hover:text-foreground/55 transition-colors duration-500">∞</span>,
                </motion.div>
                <motion.div
                  className="text-foreground/15 group-hover:text-foreground/35 transition-colors duration-500"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 2.8 }}
                >
                  &nbsp;&nbsp;status: <motion.span
                    className="text-foreground/30 group-hover:text-foreground/60 transition-colors duration-500"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  >"building"</motion.span>
                </motion.div>
                <motion.div
                  className="text-foreground/15 group-hover:text-foreground/35 transition-colors duration-500"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 3.0 }}
                >
                  &#125;;
                  <motion.span
                    className="inline-block w-[2px] h-2.5 sm:h-3 bg-foreground/30 group-hover:bg-foreground/60 ml-0.5 align-middle transition-colors duration-500"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  />
                </motion.div>
              </div>

              {/* Decorative connection line */}
              <motion.div
                className="absolute -left-4 sm:-left-8 top-1/2 w-4 sm:w-8 h-px bg-gradient-to-r from-transparent to-foreground/10 group-hover:to-foreground/25 transition-colors duration-500"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 3.2, duration: 0.6 }}
                style={{ transformOrigin: "right" }}
              />
            </motion.div>

            {/* Triple ensō circles - layered depth */}
            <motion.svg
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-56 sm:h-56 md:w-72 md:h-72 text-foreground/[0.05] group-hover:text-foreground/[0.12] transition-colors duration-700"
              viewBox="0 0 200 200"
              fill="none"
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              style={{ translateZ: 10 }}
            >
              <motion.circle
                cx="100" cy="100" r="90"
                stroke="currentColor" strokeWidth="1" strokeLinecap="round"
                initial={{ pathLength: 0 }} animate={{ pathLength: 0.85 }}
                transition={{ delay: 1.4, duration: 2, ease: "easeOut" }}
              />
            </motion.svg>

            <motion.svg
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 sm:w-36 sm:h-36 md:w-44 md:h-44 text-foreground/[0.03] group-hover:text-foreground/[0.08] transition-colors duration-700"
              viewBox="0 0 200 200"
              fill="none"
              animate={{ rotate: -360 }}
              transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
            >
              <motion.circle
                cx="100" cy="100" r="90"
                stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeDasharray="8 12"
                initial={{ pathLength: 0 }} animate={{ pathLength: 0.7 }}
                transition={{ delay: 1.6, duration: 2, ease: "easeOut" }}
              />
            </motion.svg>

            {/* Third micro ensō */}
            <motion.svg
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 sm:w-20 sm:h-20 md:w-28 md:h-28 text-foreground/[0.04] group-hover:text-foreground/[0.1] transition-colors duration-700"
              viewBox="0 0 200 200"
              fill="none"
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            >
              <motion.circle
                cx="100" cy="100" r="90"
                stroke="currentColor" strokeWidth="0.5" strokeLinecap="round"
                initial={{ pathLength: 0 }} animate={{ pathLength: 0.6 }}
                transition={{ delay: 1.8, duration: 1.5, ease: "easeOut" }}
              />
            </motion.svg>

            {/* Orbiting particles - dual orbit */}
            <motion.div
              className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full bg-foreground/15 group-hover:bg-foreground/40 transition-colors duration-500"
              animate={{ x: [0, 80, 0, -80, 0], y: [-80, 0, 80, 0, -80] }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute top-1/2 left-1/2 w-1 h-1 rounded-full bg-foreground/10 group-hover:bg-foreground/30 transition-colors duration-500"
              animate={{ x: [0, -60, 0, 60, 0], y: [60, 0, -60, 0, 60] }}
              transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
            />

            {/* Scanning lines - dual direction */}
            <motion.div
              className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent pointer-events-none"
              animate={{ top: ["0%", "100%", "0%"] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-foreground/8 to-transparent pointer-events-none"
              animate={{ left: ["0%", "100%", "0%"] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />

            {/* Corner brackets - all 4 corners */}
            {[
              { pos: "top-3 left-3", rotate: 0 },
              { pos: "top-3 right-3", rotate: 90 },
              { pos: "bottom-12 sm:bottom-16 left-3", rotate: 270 },
              { pos: "bottom-12 sm:bottom-16 right-3", rotate: 180 },
            ].map((corner, i) => (
              <motion.div
                key={i}
                className={`absolute ${corner.pos} w-4 h-4 sm:w-5 sm:h-5 border-l-[1.5px] border-t-[1.5px] border-foreground/10 group-hover:border-foreground/30 group-hover:w-6 group-hover:h-6 sm:group-hover:w-8 sm:group-hover:h-8 transition-all duration-500`}
                style={{ transform: `rotate(${corner.rotate}deg)` }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.8 + i * 0.1, type: "spring", stiffness: 200 }}
              />
            ))}

            {/* Bottom info bar */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-4 sm:px-8 py-2.5 sm:py-3 border-t border-foreground/10 group-hover:border-foreground/20 transition-colors duration-500 backdrop-blur-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.6 }}
            >
              <motion.span
                className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-foreground/30 group-hover:text-foreground/60 transition-colors duration-500 font-medium flex items-center gap-2"
                whileHover={{ letterSpacing: "0.4em" }}
              >
                <motion.span
                  className="w-1.5 h-1.5 rounded-full bg-foreground/30 group-hover:bg-foreground/60"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                Tokyo, Japan
              </motion.span>
              <div className="flex items-center gap-3 sm:gap-5">
                {["フロントエンド", "バックエンド", "フルスタック"].map((tag, i) => (
                  <motion.span
                    key={tag}
                    className="text-[9px] sm:text-[11px] tracking-wider uppercase text-foreground/20 group-hover:text-foreground/45 transition-colors duration-500 hidden sm:inline cursor-default"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2 + i * 0.15 }}
                    whileHover={{ scale: 1.2, color: "hsl(var(--foreground))", y: -2 }}
                  >
                    {tag}
                  </motion.span>
                ))}
                <motion.span
                  className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-foreground/30 group-hover:text-foreground/60 transition-colors duration-500 font-medium"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  2024 — ∞
                </motion.span>
              </div>
            </motion.div>

            {/* Floating particles with varied animations */}
            {[
              { top: "18%", left: "12%", delay: 1.5, size: "w-1 h-1" },
              { top: "65%", left: "78%", delay: 1.8, size: "w-1.5 h-1.5" },
              { top: "30%", left: "88%", delay: 2.0, size: "w-1 h-1" },
              { top: "75%", left: "25%", delay: 1.7, size: "w-1 h-1" },
              { top: "45%", left: "8%", delay: 1.9, size: "w-0.5 h-0.5" },
              { top: "55%", left: "65%", delay: 2.1, size: "w-0.5 h-0.5" },
              { top: "22%", left: "45%", delay: 2.3, size: "w-1 h-1" },
              { top: "80%", left: "55%", delay: 2.5, size: "w-0.5 h-0.5" },
            ].map((dot, i) => (
              <motion.div
                key={i}
                className={`absolute ${dot.size} rounded-full bg-foreground/10 group-hover:bg-foreground/30 transition-colors duration-500`}
                style={{ top: dot.top, left: dot.left }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: 1,
                  scale: [1, 1.8, 1],
                  y: [0, -5, 0, 5, 0],
                }}
                transition={{
                  opacity: { delay: dot.delay, duration: 0.4 },
                  scale: { delay: dot.delay + 0.5, duration: 2.5, repeat: Infinity, repeatDelay: 0.8 + i * 0.2 },
                  y: { delay: dot.delay, duration: 4 + i * 0.5, repeat: Infinity, ease: "easeInOut" },
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
