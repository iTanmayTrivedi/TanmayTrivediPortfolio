import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Github, Linkedin, FileText, Copy, Check, Instagram } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import ContactForm from "./ContactForm";
import lineQrCode from "@/assets/line-qr.jpeg";
import resumeEn from "@/assets/resume-en.pdf.asset.json";
import resumeJa from "@/assets/resume-rirekisho.pdf.asset.json";

const XIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LineIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 1C5.8 1 .8 5.1.8 10.2c0 4.5 4 8.3 9.4 9-.4.1.3.7.3 1v1.7c0 .5.3.8.7.8.2 0 .4-.1.7-.2 1.2-.7 6.5-3.8 8.9-6.5 1.6-1.8 2.4-3.6 2.4-5.8C23.2 5.1 18.2 1 12 1zM8.3 12.7H6.5c-.3 0-.5-.2-.5-.5V8.1c0-.3.2-.5.5-.5s.5.2.5.5v3.6h1.3c.3 0 .5.2.5.5s-.2.5-.5.5zm2.1-.5c0 .3-.2.5-.5.5s-.5-.2-.5-.5V8.1c0-.3.2-.5.5-.5s.5.2.5.5v4.1zm5 0c0 .2-.1.4-.3.5-.1 0-.1.1-.2.1-.1 0-.3-.1-.4-.2L12.2 9.8v2.4c0 .3-.2.5-.5.5s-.5-.2-.5-.5V8.1c0-.2.1-.4.3-.5.1 0 .3 0 .5.1l2.4 2.8V8.1c0-.3.2-.5.5-.5s.5.2.5.5v4.1zm3.1-2.6c.3 0 .5.2.5.5s-.2.5-.5.5h-1.3v1h1.3c.3 0 .5.2.5.5s-.2.5-.5.5h-1.8c-.3 0-.5-.2-.5-.5V8.1c0-.3.2-.5.5-.5h1.8c.3 0 .5.2.5.5s-.2.5-.5.5h-1.3v1h1.3z" />
  </svg>
);

const EMAIL = "tanmay.trivedi.jp@gmail.com";

const CopyableEmail = () => {
  const [copied, setCopied] = useState(false);
  const { t } = useLanguage();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const el = document.createElement("textarea");
      el.value = EMAIL;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <motion.button
      onClick={handleCopy}
      className="group flex items-center gap-3 text-xl md:text-2xl hover:opacity-70 transition-opacity cursor-pointer"
      whileTap={{ scale: 0.97 }}
      title={t("contact.clickToCopy")}
    >
      <span>{EMAIL}</span>
      <motion.span
        key={copied ? "check" : "copy"}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 25 }}
      >
        {copied ? (
          <Check className="w-5 h-5 text-green-400" />
        ) : (
          <Copy className="w-5 h-5 opacity-40 group-hover:opacity-100 transition-opacity" />
        )}
      </motion.span>
      {copied && (
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-sm text-green-400"
        >
          {t("contact.copied")}
        </motion.span>
      )}
    </motion.button>
  );
};

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1 },
    },
  };

  const lineVariants = {
    hidden: { y: "100%", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" as const },
    },
  };

  return (
    <section id="contact" className="section-padding bg-foreground text-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        {/* Top Row: CTA left, Contact Info right */}
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-16">
          {/* Left Column - CTA */}
          <div ref={ref}>
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-sm tracking-widest uppercase opacity-60 mb-8"
            >
              {t("contact.label")}
            </motion.p>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <div className="overflow-hidden pb-1">
                <motion.h2 variants={lineVariants} className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  {t("contact.lets")}
                </motion.h2>
              </div>
              <div className="overflow-hidden pb-1">
                <motion.h2 variants={lineVariants} className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  {t("contact.something")}
                </motion.h2>
              </div>
              <div className="overflow-hidden pb-2">
                <motion.h2 variants={lineVariants} className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold leading-tight opacity-40">
                  {t("contact.amazing")}
                </motion.h2>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-wrap gap-4 sm:gap-6 mt-8 sm:mt-12"
            >
              <motion.a
                href={resumeEn.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-background text-foreground font-medium tracking-wide overflow-hidden text-sm sm:text-base"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  style={{ opacity: 0.3 }}
                />
                <motion.div animate={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}>
                  <FileText className="w-5 h-5 relative z-10" />
                </motion.div>
                <span className="relative z-10">{t("hero.englishResume")}</span>
                <motion.span className="relative z-10" initial={{ x: 0 }} whileHover={{ x: 5 }}>→</motion.span>
              </motion.a>
              <motion.a
                href={resumeJa.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-3 px-8 py-4 border-2 border-background text-background font-medium tracking-wide overflow-hidden text-sm sm:text-base"
                whileHover={{ scale: 1.05, y: -3, backgroundColor: "hsl(var(--background))", color: "hsl(var(--foreground))" }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2.5 }}>
                  <FileText className="w-5 h-5" />
                </motion.div>
                <span>{t("hero.japaneseResume")}</span>
                <motion.span initial={{ x: 0 }} whileHover={{ x: 5 }}>→</motion.span>
              </motion.a>
            </motion.div>
          </div>

          {/* Right Column - Contact Info only */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            className="flex flex-col justify-center"
          >
            <div className="space-y-8">
              <div>
                <p className="text-sm opacity-60 mb-2">{t("contact.email")}</p>
                <CopyableEmail />
              </div>

              <div>
                <p className="text-sm opacity-60 mb-2">{t("contact.location")}</p>
                <p className="text-xl md:text-2xl">Kanpur, India</p>
              </div>

              <div>
                <p className="text-sm opacity-60 mb-4">{t("contact.socials")}</p>
                <div className="flex gap-6">
                  {[
                    { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/in/itanmaytrivedi", iconSize: 20 },
                    { name: "GitHub", icon: Github, href: "https://github.com/itanmaytrivedi", iconSize: 20 },
                    { name: "LINE", icon: LineIcon, href: "https://line.me/ti/p/bK65DKm_vR", iconSize: 26 },
                    { name: "X", icon: XIcon, href: "https://x.com/iTanmayTrivedi", iconSize: 20 },
                    { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/itanmaytrivedi/", iconSize: 20 },
                  ].map((social) => {
                    const InteractiveIcon = (
                      <motion.a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/social relative w-12 h-12 border border-background/30 rounded-full flex items-center justify-center overflow-hidden hover:border-background transition-colors duration-300"
                        whileHover={{ scale: 1.12, y: -3 }}
                        whileTap={{ scale: 0.92 }}
                        transition={{ type: "spring", stiffness: 400, damping: 18 }}
                        aria-label={social.name}
                      >
                        {/* Background fill sweep */}
                        <span className="absolute inset-0 bg-background translate-y-full group-hover/social:translate-y-0 transition-transform duration-400 ease-[cubic-bezier(0.76,0,0.24,1)]" />
                        {/* Icon track: original slides out top-right, duplicate enters from bottom-left */}
                        <span className="relative w-full h-full overflow-hidden flex items-center justify-center">
                          <span className="absolute inset-0 flex items-center justify-center transition-transform duration-400 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover/social:translate-x-full group-hover/social:-translate-y-full">
                            <social.icon size={social.iconSize} />
                          </span>
                          <span className="absolute inset-0 flex items-center justify-center -translate-x-full translate-y-full transition-transform duration-400 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover/social:translate-x-0 group-hover/social:translate-y-0 text-foreground">
                            <social.icon size={social.iconSize} />
                          </span>
                        </span>
                      </motion.a>
                    );

                    if (social.name === "LINE") {
                      // On touch devices (mobile/tablet), open LINE app directly
                      if (isTouchDevice) {
                        return InteractiveIcon;
                      }

                      // Desktop: show QR code on hover
                      return (
                        <div key={social.name} className="relative group/line">
                          {InteractiveIcon}
                          <div className="absolute bottom-full right-0 mb-3 px-3 py-2 bg-foreground border border-background/20 text-background text-xs rounded-md w-48 text-center opacity-0 scale-0 origin-bottom group-hover/line:opacity-100 group-hover/line:scale-100 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] pointer-events-none z-50">
                            Scan the QR code on desktop or tap on mobile to open LINE
                          </div>
                          <div className="absolute top-0 left-full ml-4 mt-2 w-36 p-3 bg-foreground border border-background/20 text-background rounded-md opacity-0 scale-0 origin-left group-hover/line:opacity-100 group-hover/line:scale-100 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] delay-75 pointer-events-none z-50">
                            <img src={lineQrCode} alt="LINE QR Code" className="w-full rounded-md" />
                          </div>
                        </div>
                      );
                    }

                    return InteractiveIcon;
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Row: Full-width Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="mt-16 sm:mt-20"
        >
          <ContactForm />
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
