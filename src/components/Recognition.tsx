import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const Recognition = () => {
  const { t } = useLanguage();

  const marqueeItems = [
    "FULL STACK DEVELOPMENT",
    "BACKEND ENGINEERING",
    "REST API DESIGN",
    "DATABASE ARCHITECTURE",
    "SCALABLE WEB APPLICATIONS",
    "CLEAN CODE",
    "MODERN JAVASCRIPT STACK",
  ];

  return (
    <section className="py-16 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 mb-8">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-sm tracking-widest uppercase text-muted-foreground"
        >
          {t("recognition.label")}
        </motion.p>
      </div>

      {/* Marquee */}
      <div className="relative">
        <div className="flex overflow-hidden">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 20,
                ease: "linear",
              },
            }}
            className="flex gap-12 pr-12"
          >
            {[...marqueeItems, ...marqueeItems].map((item, index) => (
              <div key={index} className="flex items-center gap-12 flex-shrink-0">
                <span className="text-2xl md:text-4xl font-bold whitespace-nowrap">
                  {item}
                </span>
                <span className="text-2xl md:text-4xl text-muted-foreground">•</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Reverse Marquee */}
      <div className="relative mt-8">
        <div className="flex overflow-hidden">
          <motion.div
            animate={{ x: ["-50%", "0%"] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 25,
                ease: "linear",
              },
            }}
            className="flex gap-12 pr-12"
          >
            {[...marqueeItems].reverse().concat([...marqueeItems].reverse()).map((item, index) => (
              <div key={index} className="flex items-center gap-12 flex-shrink-0">
                <span className="text-lg md:text-2xl font-medium text-muted-foreground whitespace-nowrap">
                  {item}
                </span>
                <span className="text-lg md:text-2xl text-muted-foreground/50">•</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Recognition;
