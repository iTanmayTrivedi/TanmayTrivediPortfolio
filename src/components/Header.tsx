import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Github, Linkedin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import BrandLogo from "@/components/BrandLogo";

const LineIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 1C5.8 1 .8 5.1.8 10.2c0 4.5 4 8.3 9.4 9-.4.1.3.7.3 1v1.7c0 .5.3.8.7.8.2 0 .4-.1.7-.2 1.2-.7 6.5-3.8 8.9-6.5 1.6-1.8 2.4-3.6 2.4-5.8C23.2 5.1 18.2 1 12 1zM8.3 12.7H6.5c-.3 0-.5-.2-.5-.5V8.1c0-.3.2-.5.5-.5s.5.2.5.5v3.6h1.3c.3 0 .5.2.5.5s-.2.5-.5.5zm2.1-.5c0 .3-.2.5-.5.5s-.5-.2-.5-.5V8.1c0-.3.2-.5.5-.5s.5.2.5.5v4.1zm5 0c0 .2-.1.4-.3.5-.1 0-.1.1-.2.1-.1 0-.3-.1-.4-.2L12.2 9.8v2.4c0 .3-.2.5-.5.5s-.5-.2-.5-.5V8.1c0-.2.1-.4.3-.5.1 0 .3 0 .5.1l2.4 2.8V8.1c0-.3.2-.5.5-.5s.5.2.5.5v4.1zm3.1-2.6c.3 0 .5.2.5.5s-.2.5-.5.5h-1.3v1h1.3c.3 0 .5.2.5.5s-.2.5-.5.5h-1.8c-.3 0-.5-.2-.5-.5V8.1c0-.3.2-.5.5-.5h1.8c.3 0 .5.2.5.5s-.2.5-.5.5h-1.3v1h1.3z" />
  </svg>
);

const socialLinks = [
  { name: "GitHub", icon: Github, href: "https://github.com/itanmaytrivedi", size: 18 },
  { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/in/itanmaytrivedi", size: 18 },
  { name: "LINE", icon: LineIcon, href: "https://line.me/ti/p/bK65DKm_vR", size: 22 },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { key: "projects", label: t("nav.projects") },
    { key: "skills", label: t("nav.skills") },
    { key: "resume", label: t("nav.resume") },
    { key: "about", label: t("nav.about") },
    { key: "contact", label: t("nav.contact") },
  ];

  const handleNavClick = (key: string) => {
    setIsOpen(false);
    setTimeout(() => {
      const element = document.getElementById(key);
      element?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ja" : "en");
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/90 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-12 py-4 sm:py-6 flex items-center justify-between">
        {/* Logo */}
        <BrandLogo />

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-12 font-semibold">
          {navItems.map((item, index) => (
            <motion.a
              key={item.key}
              href={`#${item.key}`}
              className="nav-link text-sm tracking-wide relative overflow-hidden group"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -2 }}
            >
              <span className="relative z-10">{item.label}</span>
              <motion.span
                className="absolute bottom-0 left-0 w-full h-px bg-foreground origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          ))}

          {/* Language Toggle */}
          <motion.button
            onClick={toggleLanguage}
            className="text-sm tracking-wide font-semibold px-3 py-1.5 border border-foreground/20 hover:border-foreground hover:bg-foreground hover:text-background transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {language === "en" ? "日本語" : "EN"}
          </motion.button>
        </div>

        {/* Desktop CTA Button */}
        <motion.a
          href="#contact"
          className="hidden lg:flex items-center gap-3 group"
          whileHover={{ x: 5 }}
        >
          <span className="text-sm tracking-wide">{t("nav.startProject")}</span>
          <motion.div
            className="btn-circle"
            whileHover={{ scale: 1.2, rotate: 45 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 11L11 1M11 1H3M11 1V9"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </motion.div>
        </motion.a>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <motion.button
              className="lg:hidden btn-circle flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Open menu"
            >
              <svg
                width="16"
                height="12"
                viewBox="0 0 16 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 1H16M0 6H16M0 11H16"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </motion.button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full bg-background border-none p-0 overflow-hidden">
            {/* Full-screen creative menu */}
            <div className="relative h-full flex flex-col justify-between px-8 pt-20 pb-10">
              {/* Decorative large number index */}
              <motion.div
                className="absolute top-6 right-8 text-[8rem] font-black text-foreground/[0.03] leading-none select-none pointer-events-none"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                MENU
              </motion.div>

              {/* Nav Items */}
              <nav className="flex flex-col gap-2 relative z-10">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.key}
                    onClick={() => handleNavClick(item.key)}
                    className={`group text-left py-3 flex items-center justify-between ${index === navItems.length - 1 ? "" : "border-b border-foreground/10"}`}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.08, type: "spring", stiffness: 200, damping: 20 }}
                  >
                    <div className="flex items-baseline gap-4">
                      <span className="text-xs text-muted-foreground font-mono">
                        0{index + 1}
                      </span>
                      <span className="text-4xl font-bold tracking-tight group-hover:tracking-wide transition-all duration-300">
                        {item.label}
                      </span>
                    </div>
                    <motion.span
                      className="text-foreground/30 group-hover:text-foreground transition-colors duration-300"
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                    >
                      <svg width="20" height="20" viewBox="0 0 12 12" fill="none">
                        <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5"/>
                      </svg>
                    </motion.span>
                  </motion.button>
                ))}
              </nav>

              {/* Bottom section */}
              <div className="flex flex-col gap-6 relative z-10">
                {/* Language Toggle */}
                <motion.button
                  onClick={toggleLanguage}
                  className="self-start flex items-center gap-3 px-5 py-2.5 border border-foreground/20 rounded-full text-sm font-medium tracking-wide hover:bg-foreground hover:text-background transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <span className="text-lg">{language === "en" ? "🇯🇵" : "🇺🇸"}</span>
                  {language === "en" ? "日本語" : "English"}
                </motion.button>

                {/* Social Links */}
                <motion.div
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55 }}
                >
                  {socialLinks.map((social, i) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 border border-foreground/20 rounded-full flex items-center justify-center hover:bg-foreground hover:text-background transition-all duration-300"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.55 + i * 0.06, type: "spring", stiffness: 300, damping: 20 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label={social.name}
                    >
                      <social.icon size={social.size} />
                    </motion.a>
                  ))}
                </motion.div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </motion.header>
  );
};

export default Header;
