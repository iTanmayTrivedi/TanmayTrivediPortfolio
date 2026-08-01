import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import BarTransition from "./BarTransition";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";
import project5 from "@/assets/project-5.jpg";
import project6 from "@/assets/project-6.jpg";

const NavTransitionContext = createContext<(slug: string) => void>(() => {});

const projects = [
  {
    id: 1,
    title: "TeamHub",
    titleJa: "チームハブ",
    slug: "dataflow",
    description: "Bilingual team & task management platform with realtime collaboration and AI insights.",
    descriptionJa: "リアルタイム協働とAIインサイトを備えたバイリンガル対応のチーム管理プラットフォーム。",
    image: project1,
    tags: ["React", "Supabase", "Gemini AI"],
  },
  {
    id: 2,
    title: "BookFlow",
    titleJa: "ブックフロー",
    slug: "shopify-plus",
    description: "Intelligent appointment & reservation platform with AI scheduling and dual demo mode.",
    descriptionJa: "AIスケジューリングとデモモードを備えた予約・受付プラットフォーム。",
    image: project2,
    tags: ["React", "Supabase", "Framer Motion"],
  },
  {
    id: 3,
    title: "Rakuten Reimagined",
    titleJa: "楽天リイマジンド",
    slug: "fintrack",
    description: "Bilingual AI-powered marketplace clone with roles, checkout, and BI dashboards.",
    descriptionJa: "ロール・決済・BIを備えたAI搭載バイリンガルマーケットプレイス。",
    image: project3,
    tags: ["React", "Supabase", "Lovable AI"],
  },
  {
    id: 4,
    title: "Kaizen",
    titleJa: "改善",
    slug: "estate-pro",
    description: "AI-powered Japanese business operations suite — Keigo, translation, minutes, sentiment.",
    descriptionJa: "敬語、翻訳、議事録、感情分析を備えたAI搭載の日本ビジネス運営スイート。",
    image: project4,
    tags: ["React", "Supabase", "Gemini 1.5"],
  },
  {
    id: 5,
    title: "SysMonitor",
    titleJa: "システムモニター",
    slug: "taskboard",
    description: "Real-time observability & alerting platform with AI-assisted root-cause analysis.",
    descriptionJa: "AIによる根本原因分析を備えたリアルタイム監視プラットフォーム。",
    image: project5,
    tags: ["React", "Supabase", "Gemini AI"],
    hidden: true,
  },
  {
    id: 6,
    title: "JapanPath",
    titleJa: "ジャパンパス",
    slug: "mediconnect",
    description: "The operating system for moving, studying & working in Japan — visas, resumes, jobs.",
    descriptionJa: "日本での移住・留学・就職のためのOS。ビザ、履歴書、求人。",
    image: project6,
    tags: ["React", "Lovable Cloud", "AI Gateway"],
    hidden: true,
  },
];

const ProjectCard = ({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const triggerNav = useContext(NavTransitionContext);
  const { language } = useLanguage();

  const handleClick = () => {
    triggerNav(project.slug);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      className="project-card group cursor-pointer"
      onClick={handleClick}
    >
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
        
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-25 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-500"
        />
        
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileHover={{ opacity: 1, x: 0 }}
          className="absolute top-6 left-6 text-background text-8xl font-bold opacity-0 sm:group-hover:opacity-30 transition-opacity duration-500"
        >
          0{index + 1}
        </motion.div>

        <motion.div
          className="absolute bottom-5 right-5 sm:bottom-6 sm:right-6 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300"
          initial={{ y: 20 }}
          whileHover={{ scale: 1.1 }}
        >
          <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-background text-foreground flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 12 12" fill="none">
              <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>
        </motion.div>
      </div>
      
      <motion.div
        className="mt-6"
        initial={{ opacity: 0.8 }}
        whileHover={{ opacity: 1 }}
      >
        <motion.h3
          className="text-xl sm:text-2xl font-semibold mb-2 flex items-center gap-3"
          whileHover={{ x: 10 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          {language === "ja" && project.titleJa ? project.titleJa : project.title}
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            whileHover={{ opacity: 1, x: 0 }}
            className="text-muted-foreground"
          >
            →
          </motion.span>
        </motion.h3>
        <p className="text-muted-foreground mb-4">
          {language === "ja" ? project.descriptionJa : project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <motion.span
              key={tag}
              className="text-xs tracking-wider uppercase text-muted-foreground px-2 py-1 border border-foreground/10 hover:border-foreground/30 transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

const ProjectListItem = ({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const triggerNav = useContext(NavTransitionContext);
  const { language } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    triggerNav(project.slug);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: "easeOut" }}
    >
      <div
        ref={containerRef}
        className="relative border-b border-foreground/10 cursor-pointer group"
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-center py-7 sm:py-10 relative z-10">
          {/* Slide-in thumbnail from left */}
          <motion.div
            className="overflow-hidden rounded-xl shrink-0 hidden sm:block"
            animate={{
              width: isHovered ? 180 : 0,
              marginRight: isHovered ? 24 : 0,
              opacity: isHovered ? 1 : 0,
            }}
            transition={{
              width: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
              marginRight: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
              opacity: { duration: 0.3 },
            }}
          >
            <motion.div
              className="w-[180px] h-[110px] rounded-xl overflow-hidden relative"
              animate={{ scale: isHovered ? 1 : 1.2 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 h-[30%] bg-gradient-to-t from-black/50 to-transparent" />
              <motion.div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.15) 42%, rgba(255,255,255,0.3) 48%, rgba(255,255,255,0.15) 54%, transparent 66%)",
                }}
                animate={{
                  x: isHovered ? ["calc(-100%)", "calc(200%)"] : "calc(-100%)",
                }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeInOut" }}
              />
              <div className="absolute inset-0 rounded-xl ring-1 ring-white/10" />
            </motion.div>
          </motion.div>

          <div className="flex items-center justify-between flex-1 min-w-0">
            <div className="flex items-center gap-6 sm:gap-10 flex-1 min-w-0">
              <motion.span
                className="text-sm font-mono shrink-0 tabular-nums"
                animate={{
                  color: isHovered ? "hsl(var(--background))" : "hsl(var(--muted-foreground))",
                  opacity: isHovered ? 1 : 0.5,
                }}
                transition={{ duration: 0.3 }}
              >
                0{index + 1}
              </motion.span>
              <div className="flex-1 min-w-0">
                <div className="overflow-hidden">
                  <motion.h3
                    className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter"
                    animate={{
                      x: isHovered ? 15 : 0,
                      y: isHovered ? -2 : 0,
                      color: isHovered ? "hsl(var(--background))" : "hsl(var(--foreground))",
                    }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {language === "ja" && project.titleJa ? project.titleJa : project.title}
                  </motion.h3>
                </div>
                <motion.p
                  className="text-sm mt-1 hidden sm:block"
                  animate={{
                    opacity: isHovered ? 0.85 : 0.4,
                    x: isHovered ? 15 : 0,
                    color: isHovered ? "hsl(var(--background))" : "hsl(var(--muted-foreground))",
                  }}
                  transition={{ duration: 0.45, delay: 0.04, ease: [0.22, 1, 0.36, 1] }}
                >
                  {language === "ja" ? project.descriptionJa : project.description}
                </motion.p>
              </div>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <div className="hidden md:flex gap-2">
                {project.tags.slice(0, 2).map((tag, ti) => (
                  <motion.span
                    key={tag}
                    className="text-xs tracking-wider uppercase px-2 py-1 border"
                    animate={{
                      color: isHovered ? "hsl(var(--background))" : "hsl(var(--muted-foreground))",
                      borderColor: isHovered ? "hsl(var(--background) / 0.3)" : "hsl(var(--foreground) / 0.1)",
                      opacity: isHovered ? 1 : 0.6,
                    }}
                    transition={{ duration: 0.3, delay: ti * 0.03 }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
              <motion.div
                className="w-10 h-10 rounded-full border flex items-center justify-center"
                animate={{
                  rotate: isHovered ? 45 : 0,
                  backgroundColor: isHovered ? "hsl(var(--background))" : "transparent",
                  color: isHovered ? "hsl(var(--foreground))" : "hsl(var(--foreground))",
                  borderColor: isHovered ? "hsl(var(--background))" : "hsl(var(--foreground) / 0.2)",
                  scale: isHovered ? 1.1 : 1,
                }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Full background fill on hover — sweeps from left */}
        <motion.div
          className="absolute inset-0 bg-foreground"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          style={{ transformOrigin: "left" }}
        />
      </div>
    </motion.div>
  );
};

const ViewToggle = ({
  view,
  onToggle,
}: {
  view: "grid" | "list";
  onToggle: (v: "grid" | "list") => void;
}) => (
  <div className="flex items-center gap-1 border border-foreground/20 rounded-full p-1">
    <button
      onClick={() => onToggle("grid")}
      className={`p-2 rounded-full transition-all duration-300 ${
        view === "grid" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
      }`}
      aria-label="Grid view"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="1" y="1" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <rect x="9" y="1" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <rect x="1" y="9" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <rect x="9" y="9" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    </button>
    <button
      onClick={() => onToggle("list")}
      className={`p-2 rounded-full transition-all duration-300 ${
        view === "list" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
      }`}
      aria-label="List view"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <line x1="1" y1="3" x2="15" y2="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="1" y1="8" x2="15" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="1" y1="13" x2="15" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </button>
  </div>
);

const Projects = () => {
  const titleRef = useRef(null);
  const isTitleInView = useInView(titleRef, { once: true, margin: "-100px" });
  const { t } = useLanguage();
  const [showHidden, setShowHidden] = useState(false);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const navigate = useNavigate();

  const triggerNav = (slug: string) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    // Bars sweep in (~0.55s + 0.07*2 stagger ≈ 0.7s), then navigate
    window.setTimeout(() => {
      navigate(`/project/${slug}`);
    }, 750);
  };

  const visibleProjects = projects.filter(p => !p.hidden);
  const hiddenProjects = projects.filter(p => p.hidden);

  const allVisible = showHidden
    ? [...visibleProjects, ...hiddenProjects]
    : visibleProjects;

  return (
    <NavTransitionContext.Provider value={triggerNav}>
    <BarTransition show={isTransitioning} />
    <section id="projects" className="section-padding">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 40 }}
          animate={isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold">{t("projects.title")}</h2>
          <ViewToggle view={view} onToggle={setView} />
        </motion.div>

        <AnimatePresence mode="wait">
          {view === "grid" ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12"
            >
              {visibleProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
              <AnimatePresence>
                {showHidden && hiddenProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 60, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 60, scale: 0.95 }}
                    transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
                  >
                    <ProjectCard project={project} index={visibleProjects.length + index} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="border-t border-foreground/10"
            >
              {allVisible.map((project, index) => (
                <ProjectListItem key={project.id} project={project} index={index} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {!showHidden && view === "grid" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mt-16"
          >
            <motion.div
              className="w-24 h-24 rounded-full bg-foreground text-background flex items-center justify-center font-bold cursor-pointer"
              whileHover={{ scale: 1.2, rotate: 180 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              onClick={() => setShowHidden(true)}
            >
              +2
            </motion.div>
          </motion.div>
        )}

        {!showHidden && view === "list" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center mt-10"
          >
            <button
              onClick={() => setShowHidden(true)}
              className="text-sm text-muted-foreground hover:text-foreground border border-foreground/20 rounded-full px-6 py-3 transition-colors duration-300 hover:bg-foreground hover:text-background"
            >
              Show 2 more projects
            </button>
          </motion.div>
        )}
      </div>
    </section>
    </NavTransitionContext.Provider>
  );
};

export default Projects;
