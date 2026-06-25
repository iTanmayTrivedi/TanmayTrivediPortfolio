import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

type PillTone = "blue" | "green" | "purple" | "yellow" | "red";

const toneClasses: Record<PillTone, string> = {
  blue: "bg-blue-50 text-blue-900/80 border-blue-100",
  green: "bg-emerald-50 text-emerald-900/80 border-emerald-100",
  purple: "bg-violet-50 text-violet-900/80 border-violet-100",
  yellow: "bg-amber-50 text-amber-900/80 border-amber-100",
  red: "bg-rose-50 text-rose-900/80 border-rose-100",
};

interface Project {
  en: string;
  ja: string;
  date: string;
  pills: { label: string; tone: PillTone }[];
}

const projects: Project[] = [
  { en: "Internal Company Management System", ja: "社内管理システム", date: "2023 · Mar", pills: [{ label: "System", tone: "blue" }, { label: "Backend", tone: "blue" }] },
  { en: "Appointment & Reservation System", ja: "予約・受付管理システム", date: "2023 · Aug", pills: [{ label: "System", tone: "blue" }, { label: "Real-time", tone: "red" }] },
  { en: "E-commerce Admin Dashboard", ja: "EC管理ダッシュボード", date: "2024 · Jan", pills: [{ label: "Frontend", tone: "purple" }, { label: "Backend", tone: "blue" }] },
  { en: "Multilingual SaaS Platform", ja: "多言語SaaSプラットフォーム", date: "2024 · Jun", pills: [{ label: "i18n", tone: "purple" }, { label: "SaaS", tone: "blue" }] },
  { en: "System Monitoring & Log Dashboard", ja: "監視・ログダッシュボード", date: "2024 · Oct", pills: [{ label: "Real-time", tone: "red" }, { label: "Performance", tone: "red" }] },
  { en: "Japan Career Path Platform", ja: "日本就職支援プラットフォーム", date: "2025 · Feb", pills: [{ label: "AI", tone: "green" }, { label: "Frontend", tone: "purple" }] },
  { en: "Developer Tool", ja: "開発者ツール", date: "2025 · Jul", pills: [{ label: "Dev Tools", tone: "yellow" }, { label: "Utility", tone: "yellow" }] },
  { en: "3D Room Portfolio", ja: "3Dルームポートフォリオ", date: "2025 · Dec", pills: [{ label: "Frontend", tone: "purple" }, { label: "3D", tone: "purple" }] },
];

const DevelopmentJourney = () => {
  const { language } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });

  return (
    <section className="py-12 md:py-16 bg-background relative">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-sm tracking-widest uppercase text-muted-foreground mb-6"
        >
          {language === "ja" ? "開発の歩み" : "Development Journey"}
        </motion.p>

        <div
          ref={ref}
          className="relative grid lg:grid-cols-[1fr_1px_1fr] gap-8 lg:gap-12 items-center"
        >
          {/* Left: alternating timeline */}
          <div className="relative py-1">
            {/* Center track */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[3px] rounded-full bg-foreground/10" />
            {/* Filled progress (fills once on view) */}
            <motion.div
              initial={{ scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: "top" }}
              className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[3px] rounded-full bg-foreground"
            />

            <ul className="relative space-y-2.5 md:space-y-3">
              {projects.map((p, i) => {
                const delay = 0.1 + (i / projects.length) * 1.1;
                const isLeft = i % 2 === 0;
                return (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, y: 6 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
                    transition={{ delay, duration: 0.4, ease: "easeOut" }}
                    className="relative grid grid-cols-2 gap-4"
                  >
                    <motion.span
                      initial={{ scale: 0.4, backgroundColor: "hsl(var(--foreground) / 0.15)" }}
                      animate={inView ? { scale: 1, backgroundColor: "hsl(var(--foreground))" } : {}}
                      transition={{ delay: delay + 0.05, duration: 0.4 }}
                      className="absolute left-1/2 -translate-x-1/2 top-1 w-2.5 h-2.5 rounded-full ring-4 ring-background z-10"
                    />
                    <div className={isLeft ? "col-start-1 text-right pr-5" : "col-start-2 text-left pl-5"}>
                      <p className="text-[9px] uppercase tracking-widest text-muted-foreground mb-0.5">{p.date}</p>
                      <p className="text-xs md:text-sm font-semibold text-foreground leading-snug">
                        {language === "ja" ? p.ja : p.en}
                      </p>
                      <div className={`mt-1 flex flex-wrap gap-1 ${isLeft ? "justify-end" : "justify-start"}`}>
                        {p.pills.map((pill, idx) => (
                          <span
                            key={idx}
                            className={`px-1.5 py-0 text-[9px] font-medium rounded-full border ${toneClasses[pill.tone]}`}
                          >
                            {pill.label}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.li>
                );
              })}
            </ul>
          </div>


          {/* Premium grey divider between grids */}
          <div className="hidden lg:block w-px self-stretch bg-gradient-to-b from-transparent via-foreground/15 to-transparent" />

          {/* Right: tagline centered */}
          <div className="relative flex items-center justify-center">
            <div className="max-w-md text-center lg:text-left">
              <motion.h2
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-foreground"
              >
                Clear. Consistent. Intentional.
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.45 }}
                className="mt-5 text-base md:text-lg font-medium text-foreground/60"
              >
                継続的な学習と実装の積み重ね
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DevelopmentJourney;
