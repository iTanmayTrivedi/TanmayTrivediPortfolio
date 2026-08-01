import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Play } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Frame3D from "./Frame3D";
import aboutPhoto from "@/assets/about-photo.jpg";

const About = () => {
  const ref = useRef(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isHovered, setIsHovered] = useState(false);
  const { t } = useLanguage();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 300 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!photoRef.current) return;
    const rect = photoRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  const words1 = t("about.description1").split(" ");
  const words2 = t("about.description2").split(" ");
  const words3 = t("about.description3").split(" ");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.03,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section id="about" className="section-padding bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Photo with Creative Frame */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative order-2 lg:order-1 flex justify-center"
          >
            <div 
              ref={photoRef}
              className="relative cursor-pointer"
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={handleMouseLeave}
              data-cursor="View"
              style={{ perspective: 1000 }}
            >
              {/* Decorative corner brackets */}
              <motion.div 
                className="absolute -top-4 -left-4 w-12 h-12 border-l-2 border-t-2 border-foreground/40"
                animate={{ 
                  x: isHovered ? -4 : 0, 
                  y: isHovered ? -4 : 0,
                  borderColor: isHovered ? "hsl(var(--foreground))" : "hsl(var(--foreground) / 0.4)"
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.div 
                className="absolute -top-4 -right-4 w-12 h-12 border-r-2 border-t-2 border-foreground/40"
                animate={{ 
                  x: isHovered ? 4 : 0, 
                  y: isHovered ? -4 : 0,
                  borderColor: isHovered ? "hsl(var(--foreground))" : "hsl(var(--foreground) / 0.4)"
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.div 
                className="absolute -bottom-4 -left-4 w-12 h-12 border-l-2 border-b-2 border-foreground/40"
                animate={{ 
                  x: isHovered ? -4 : 0, 
                  y: isHovered ? 4 : 0,
                  borderColor: isHovered ? "hsl(var(--foreground))" : "hsl(var(--foreground) / 0.4)"
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.div 
                className="absolute -bottom-4 -right-4 w-12 h-12 border-r-2 border-b-2 border-foreground/40"
                animate={{ 
                  x: isHovered ? 4 : 0, 
                  y: isHovered ? 4 : 0,
                  borderColor: isHovered ? "hsl(var(--foreground))" : "hsl(var(--foreground) / 0.4)"
                }}
                transition={{ duration: 0.3 }}
              />

              {/* Photo container with 3D tilt */}
              <motion.div
                className="relative overflow-hidden max-w-[200px] sm:max-w-xs md:max-w-sm"
                style={{ rotateX, rotateY }}
              >
                <img
                  src={aboutPhoto}
                  alt="About me"
                  className="w-full h-auto object-cover transition-transform duration-500"
                />
                
                {/* Shine effect on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent"
                  initial={{ x: "-100%", opacity: 0 }}
                  animate={{ 
                    x: isHovered ? "100%" : "-100%",
                    opacity: isHovered ? 1 : 0
                  }}
                  transition={{ duration: 0.6 }}
                />
              </motion.div>

              {/* Floating label */}
              <motion.div
                className="absolute -bottom-16 sm:-bottom-20 left-1/2 -translate-x-1/2 text-xs tracking-widest uppercase text-muted-foreground whitespace-nowrap"
                animate={{ opacity: isHovered ? 1 : 0.6, y: isHovered ? 4 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {t("about.floatingLabel")}
              </motion.div>
            </div>
          </motion.div>

          {/* Text Content */}
          <div className="order-1 lg:order-2">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-sm tracking-widest uppercase text-muted-foreground mb-8"
            >
              {t("about.label")}
            </motion.p>

            <div ref={ref}>
              <motion.p
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium leading-tight mb-6 sm:mb-8"
              >
                {words1.map((word, index) => (
                  <motion.span
                    key={index}
                    variants={wordVariants}
                    className="inline-block mr-[0.3em]"
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.p>

              <motion.p
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed mb-6 sm:mb-8"
              >
                {words2.map((word, index) => (
                  <motion.span
                    key={index}
                    variants={wordVariants}
                    className="inline-block mr-[0.3em]"
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.p>

              <motion.p
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed"
              >
                {words3.map((word, index) => (
                  <motion.span
                    key={index}
                    variants={wordVariants}
                    className="inline-block mr-[0.3em]"
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

const IntroVideoFrame = () => {
  const [playing, setPlaying] = useState(false);
  return (
    <Frame3D className="cursor-pointer w-full max-w-3xl">
      <div className="relative aspect-video bg-foreground/5">
        {playing ? (
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
            title="Intro video"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        ) : (
          <button
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 w-full h-full flex items-center justify-center"
            aria-label="Play intro video"
          >
            <img
              src="https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg"
              alt="Video preview"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <span className="absolute inset-0 bg-foreground/30 group-hover:bg-foreground/20 transition-colors" />
            <motion.span
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="relative z-10 w-20 h-20 rounded-full bg-background flex items-center justify-center shadow-2xl"
            >
              <Play className="w-8 h-8 text-foreground fill-foreground ml-1" />
            </motion.span>
          </button>
        )}
      </div>
    </Frame3D>
  );
};

export default About;
