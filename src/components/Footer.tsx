import { motion, useInView } from "framer-motion";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRef } from "react";

const AnimatedName = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <div ref={ref} className="relative inline-block w-full">
      <h2
        className="leading-[1.05] whitespace-nowrap text-center pb-6 select-none tracking-tight font-semibold"
        style={{
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Helvetica, Arial, sans-serif',
          fontSize: 'clamp(2.5rem, 11vw, 12rem)',
          letterSpacing: '-0.04em',
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

const footerColumns = [
  {
    title: "Work",
    links: [
      { label: "Projects", href: "#projects" },
      { label: "Lynt", href: "#lynt" },
      { label: "Yuki AI", href: "#yuki" },
      { label: "Frontend Playground", href: "#experiments" },
    ],
  },
  {
    title: "Profile",
    links: [
      { label: "About", href: "#about" },
      { label: "Skills", href: "#skills" },
      { label: "Services", href: "#services" },
      { label: "Résumé & 履歴書", href: "#contact" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Contact", href: "#contact" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/itanmaytrivedi", external: true },
      { label: "GitHub", href: "https://github.com/itanmaytrivedi", external: true },
      { label: "LINE", href: "https://line.me/ti/p/bK65DKm_vR", external: true },
    ],
  },
];

const FooterLink = ({ label, href, external, index }: { label: string; href: string; external?: boolean; index: number }) => (
  <motion.li
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: 0.05 * index }}
  >
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group/link relative inline-flex items-center gap-1.5 text-sm text-background/70 hover:text-background transition-colors duration-300"
    >
      <span className="relative">
        {label}
        <span
          className="absolute -bottom-0.5 left-0 right-0 h-px origin-bottom-right scale-x-0 bg-background transition-transform duration-300 ease-out group-hover/link:origin-bottom-left group-hover/link:scale-x-100"
          aria-hidden
        />
      </span>
      {external && (
        <ArrowUpRight
          className="w-3 h-3 opacity-0 -translate-x-1 translate-y-1 transition-all duration-300 group-hover/link:opacity-60 group-hover/link:translate-x-0 group-hover/link:translate-y-0"
          aria-hidden
        />
      )}
    </a>
  </motion.li>
);

const Footer = () => {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-foreground text-background">
      {/* Name banner */}
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

      {/* Super footer */}
      <div className="border-t border-background/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="py-16 sm:py-20 lg:py-28 grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">
            {/* Brand */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="flex flex-col items-start gap-6"
            >
              <a href="#top" className="block" aria-label="Tanmay Trivedi — home">
                <img
                  src={faviconWhite}
                  alt="Tanmay Trivedi developer favicon"
                  className="w-12 h-12 sm:w-14 sm:h-14"
                  loading="lazy"
                />
              </a>
              <p className="text-sm leading-relaxed text-background/60 max-w-xs">
                Full-Stack Developer
                <br />& AI / ML
              </p>
            </motion.div>

            {/* Link columns */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 sm:gap-12">
              {footerColumns.map((col, colIdx) => (
                <motion.div
                  key={col.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.08 * colIdx }}
                >
                  <h3 className="text-xs uppercase tracking-[0.2em] text-background/40 mb-5 font-medium">
                    {col.title}
                  </h3>
                  <ul className="space-y-3.5">
                    {col.links.map((link, i) => (
                      <FooterLink
                        key={link.label}
                        label={link.label}
                        href={link.href}
                        external={link.external}
                        index={i}
                      />
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
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
