import { motion, useInView } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRef } from "react";

const AnimatedName = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <div ref={ref} className="relative inline-block w-full">
      <h2
        className="leading-[1.05] whitespace-nowrap text-center pb-6 select-none"
        style={{
          fontFamily: '"Homemade Apple", "Snell Roundhand", "Apple Chancery", cursive',
          fontSize: 'clamp(3.5rem, 14vw, 16rem)',
        }}
      >
        <motion.span
          className="inline-block"
          style={{
            backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.95) 50%, rgba(255,255,255,0) 50%)',
            backgroundSize: '220% 100%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
          initial={{ backgroundPositionX: '100%' }}
          animate={inView ? { backgroundPositionX: '0%' } : {}}
          transition={{ duration: 2.6, ease: [0.65, 0, 0.35, 1] }}
        >
          Tanmay Trivedi
        </motion.span>
      </h2>
      <motion.div
        className="absolute left-[10%] right-[10%] bottom-3 h-[2px] origin-left"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(120,180,255,0.7), transparent)' }}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, delay: 2, ease: [0.76, 0, 0.24, 1] }}
      />
    </div>
  );
};

const Footer = () => {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-foreground text-background">
      <div className="overflow-hidden pt-4 sm:pt-8">
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <AnimatedName />
        </motion.div>
      </div>

      <div className="border-t border-background/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs opacity-40"
            >
              © 2026 Tanmay Trivedi. All rights reserved.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs opacity-40"
            >
              {t("footer.builtWith")}
            </motion.p>

            <motion.button
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              onClick={scrollToTop}
              className="flex items-center gap-2 text-xs opacity-40 hover:opacity-100 transition-opacity cursor-pointer"
              whileHover={{ y: -2 }}
            >
              {t("footer.backToTop")} <ArrowUp className="w-3 h-3" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;