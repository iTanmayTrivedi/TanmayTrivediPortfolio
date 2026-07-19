import { motion, useInView } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import { useLanguage } from "@/contexts/LanguageContext";
import { projectsData } from "@/data/projectsData";
import DeviceMockups from "@/components/DeviceMockups";

// Animated Section Component
const AnimatedSection = ({ 
  children, 
  className = "",
  delay = 0 
}: { 
  children: React.ReactNode; 
  className?: string;
  delay?: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.section>
  );
};

// Interactive Feature Card
const FeatureCard = ({ feature, index }: { feature: string; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      className="group relative overflow-hidden"
    >
      <div className="flex items-start gap-4 p-5 border border-foreground/10 bg-card hover:border-foreground/30 transition-colors">
        <span className="text-muted-foreground font-mono text-sm mt-0.5 group-hover:text-foreground transition-colors">
          0{index + 1}
        </span>
        <span className="text-foreground">{feature}</span>
      </div>
    </motion.div>
  );
};

// Interactive Role Card
const RoleCard = ({ role, index }: { role: { name: string; description: string }; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group p-8 border border-foreground/10 hover:border-foreground hover:bg-foreground hover:text-background transition-all duration-300 cursor-pointer"
    >
      <motion.div
        className="text-6xl font-bold text-foreground/10 group-hover:text-background/20 mb-4 transition-colors"
      >
        0{index + 1}
      </motion.div>
      <h4 className="font-bold text-2xl mb-3">{role.name}</h4>
      <p className="text-muted-foreground group-hover:text-background/70 text-sm transition-colors">{role.description}</p>
    </motion.div>
  );
};

// Interactive Screen Card
const ScreenCard = ({ screen, index }: { screen: { name: string; description: string }; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      whileHover={{ x: 8 }}
      className="group p-6 border-l-2 border-foreground/20 hover:border-foreground bg-secondary/30 hover:bg-secondary transition-all duration-300 cursor-pointer"
    >
      <div className="flex items-center gap-3 mb-2">
        <motion.div 
          className="w-2 h-2 rounded-full bg-foreground/30 group-hover:bg-foreground transition-colors"
          whileHover={{ scale: 1.5 }}
        />
        <h4 className="font-semibold">{screen.name}</h4>
      </div>
      <p className="text-muted-foreground text-sm pl-5">{screen.description}</p>
    </motion.div>
  );
};

// Architecture Card
const ArchCard = ({ label, value, index }: { label: string; value: string; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      whileHover={{ scale: 1.03, y: -5 }}
      className="group p-6 bg-secondary hover:bg-foreground hover:text-background transition-all duration-300 cursor-pointer relative overflow-hidden"
    >
      <motion.div
        className="absolute -top-6 -right-6 text-8xl font-bold text-foreground/5 group-hover:text-background/10 transition-colors"
      >
        {label.charAt(0).toUpperCase()}
      </motion.div>
      <h4 className="font-semibold capitalize mb-3 relative z-10">{label}</h4>
      <p className="text-muted-foreground group-hover:text-background/70 text-sm relative z-10 transition-colors">{value}</p>
    </motion.div>
  );
};

// Challenge Card
const ChallengeCard = ({ challenge, index }: { challenge: { problem: string; solution: string }; index: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onClick={() => setIsExpanded(!isExpanded)}
      className="group border border-foreground/10 hover:border-foreground/30 transition-all duration-300 cursor-pointer overflow-hidden"
    >
      <div className="p-6 flex items-start gap-6">
        <motion.span 
          className="text-5xl font-bold text-foreground/10 group-hover:text-foreground/30 transition-colors"
          animate={{ rotate: isExpanded ? 45 : 0 }}
        >
          0{index + 1}
        </motion.span>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-lg">{t("projectDetail.challenge")}: {challenge.problem}</h4>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              className="w-8 h-8 rounded-full border border-foreground/20 flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-all"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </motion.div>
          </div>
          <motion.div
            initial={false}
            animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="text-muted-foreground mt-4 pt-4 border-t border-foreground/10">
              <span className="font-medium text-foreground">{t("projectDetail.solution")}</span> {challenge.solution}
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

// Screenshot Gallery
const ScreenshotGallery = ({ screenshots, title }: { screenshots: string[]; title: string }) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {screenshots.map((screenshot, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.05, zIndex: 10 }}
            onClick={() => setSelectedImage(i)}
            className="relative aspect-video overflow-hidden bg-secondary cursor-pointer group"
            data-cursor="View"
          >
            <img
              src={screenshot}
              alt={`${title} screenshot ${i + 1}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <motion.div
              className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-300"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileHover={{ opacity: 1, scale: 1 }}
              className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-background text-foreground flex items-center justify-center"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8H13M8 3V13" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-background/95 flex items-center justify-center p-8 cursor-pointer"
        >
          <motion.img
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            src={screenshots[selectedImage]}
            alt="Screenshot"
            className="max-w-full max-h-full object-contain"
          />
          <motion.button
            className="absolute top-8 right-8 w-12 h-12 rounded-full border border-foreground/20 flex items-center justify-center hover:bg-foreground hover:text-background transition-all"
            whileHover={{ scale: 1.1, rotate: 90 }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 3L13 13M13 3L3 13" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </motion.button>
        </motion.div>
      )}
    </>
  );
};

const ProjectDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const project = projectsData[slug as keyof typeof projectsData];
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const handleBackClick = () => {
    navigate("/#projects");
    setTimeout(() => {
      const projectsSection = document.getElementById("projects");
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center cursor-none">
        <CustomCursor />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-6xl font-bold mb-4">404</h1>
          <p className="text-muted-foreground mb-8">{t("projectDetail.notFound")}</p>
          <button onClick={handleBackClick} className="btn-primary">
            {t("projectDetail.backToProjects")}
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background cursor-none">
      <CustomCursor />
      <Header />

      <main className="pt-24">
        {/* Back Button */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 mb-8">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onClick={handleBackClick}
            className="inline-flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors group"
          >
            <motion.div
              className="w-10 h-10 rounded-full border border-foreground/20 flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-4 h-4" />
            </motion.div>
            <span className="text-sm font-medium">{t("projectDetail.backToProjects")}</span>
          </motion.button>
        </div>

        {/* Hero Section */}
        <AnimatedSection className="container mx-auto px-4 sm:px-6 lg:px-12 mb-12">
          <motion.div 
            className="flex flex-wrap gap-3 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {project.tags.map((tag, i) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                whileHover={{ scale: 1.1 }}
                className="text-xs tracking-wider uppercase text-muted-foreground px-4 py-2 border border-foreground/10 hover:border-foreground hover:bg-foreground hover:text-background transition-all cursor-pointer"
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>
          
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-5xl sm:text-6xl md:text-8xl font-bold mb-4 transition-all duration-500 hover:[-webkit-text-stroke:2px_hsl(var(--foreground))] hover:text-transparent"
            >
              {project.title}
            </motion.h1>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl sm:text-2xl text-muted-foreground"
          >
            {project.subtitle}
          </motion.p>
        </AnimatedSection>


        {/* Project Number Badge */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 mb-16">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="inline-flex items-center gap-4"
          >
            <div className="w-20 h-20 rounded-full border-2 border-foreground flex items-center justify-center text-3xl font-bold">
              0{project.id}
            </div>
            <div className="h-px w-24 bg-foreground/20" />
            <span className="text-sm text-muted-foreground uppercase tracking-widest">{t("projectDetail.project")}</span>
          </motion.div>
        </div>

        {/* 1️⃣ Project Overview */}
        <AnimatedSection className="container mx-auto px-4 sm:px-6 lg:px-12 mb-24">
          <div className="grid lg:grid-cols-3 gap-12">
            <div>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-sm tracking-widest uppercase text-muted-foreground mb-4"
              >
                {t("projectDetail.overview")}
              </motion.p>
              <h2 className="text-3xl sm:text-4xl font-bold">{t("projectDetail.projectOverview")}</h2>
            </div>
            <div className="lg:col-span-2">
              {project.overview.split('\n\n').map((paragraph, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-muted-foreground text-lg leading-relaxed mb-6"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Measurable Metrics Strip */}
        {project.metrics && project.metrics.length > 0 && (
          <AnimatedSection className="container mx-auto px-4 sm:px-6 lg:px-12 mb-24">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-sm tracking-widest uppercase text-muted-foreground mb-4"
            >
              MEASURABLE IMPACT
            </motion.p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-12">By the numbers.</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px bg-foreground/10 border-y border-foreground/10">
              {project.metrics.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.5 }}
                  className="group bg-background p-6 sm:p-8 hover:bg-foreground hover:text-background transition-colors duration-500"
                >
                  <div className="text-3xl sm:text-4xl font-bold tracking-tighter tabular-nums">
                    {m.value}
                  </div>
                  <div className="mt-2 text-[10px] sm:text-xs uppercase tracking-[0.18em] text-muted-foreground group-hover:text-background/60 leading-snug">
                    {m.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        )}

        {/* 2️⃣ Tech Stack */}
        <AnimatedSection className="container mx-auto px-4 sm:px-6 lg:px-12 mb-24">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm tracking-widest uppercase text-muted-foreground mb-4"
          >
            TECHNOLOGIES
          </motion.p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-12">Tech Stack</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.techStack.map((tech, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group p-6 border border-foreground/10 hover:border-foreground/30 transition-all duration-300 cursor-pointer"
              >
                <h4 className="font-bold text-lg mb-2 group-hover:text-foreground transition-colors">{tech.name}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{tech.reason}</p>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>


        {/* 4️⃣ Problem & Motivation */}
        <AnimatedSection className="container mx-auto px-4 sm:px-6 lg:px-12 mb-24">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm tracking-widest uppercase text-muted-foreground mb-4"
          >
            {t("projectDetail.motivation")}
          </motion.p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-12">{t("projectDetail.problemMotivation")}</h2>
          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl">
            {project.problem.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ x: 10 }}
                className="flex items-start gap-4 p-6 bg-secondary/50 group cursor-pointer hover:bg-secondary transition-colors"
              >
                <motion.span 
                  className="w-3 h-3 rounded-full bg-foreground/30 mt-1.5 flex-shrink-0 group-hover:bg-foreground transition-colors"
                  whileHover={{ scale: 1.5 }}
                />
                <span className="text-muted-foreground group-hover:text-foreground transition-colors">{item}</span>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>

        {/* 5️⃣ Key Features */}
        <AnimatedSection className="container mx-auto px-4 sm:px-6 lg:px-12 mb-24 py-16 bg-secondary">
          <div className="max-w-6xl mx-auto">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-sm tracking-widest uppercase text-muted-foreground mb-4"
            >
              {t("projectDetail.features")}
            </motion.p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-12">{t("projectDetail.keyFeatures")}</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {project.features.map((feature, i) => (
                <FeatureCard key={i} feature={feature} index={i} />
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* 6️⃣ User Roles & Screens */}
        <AnimatedSection className="container mx-auto px-4 sm:px-6 lg:px-12 mb-24">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm tracking-widest uppercase text-muted-foreground mb-4"
          >
            {t("projectDetail.usersScreens")}
          </motion.p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-12">{t("projectDetail.userRolesScreens")}</h2>
          
          <div className="mb-16">
            <h3 className="text-lg font-semibold mb-6 text-muted-foreground">{t("projectDetail.userRoles")}</h3>
            <div className="grid sm:grid-cols-3 gap-6">
              {project.roles.map((role, i) => (
                <RoleCard key={i} role={role} index={i} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 text-muted-foreground">{t("projectDetail.keyScreens")}</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {project.screens.map((screen, i) => (
                <ScreenCard key={i} screen={screen} index={i} />
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* 7️⃣ UI & UX Decisions */}
        <AnimatedSection className="container mx-auto px-4 sm:px-6 lg:px-12 mb-24">
          <div className="grid lg:grid-cols-3 gap-12">
            <div>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-sm tracking-widest uppercase text-muted-foreground mb-4"
              >
                {t("projectDetail.design")}
              </motion.p>
              <h2 className="text-3xl sm:text-4xl font-bold">{t("projectDetail.uiuxDecisions")}</h2>
            </div>
            <div className="lg:col-span-2">
              {project.uiDecisions.split('\n\n').map((paragraph, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-muted-foreground text-lg leading-relaxed mb-6"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* 8️⃣ API Design */}
        <AnimatedSection className="container mx-auto px-4 sm:px-6 lg:px-12 mb-24">
          <div className="grid lg:grid-cols-3 gap-12">
            <div>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-sm tracking-widest uppercase text-muted-foreground mb-4"
              >
                API
              </motion.p>
              <h2 className="text-3xl sm:text-4xl font-bold">API Design</h2>
            </div>
            <div className="lg:col-span-2">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-muted-foreground text-lg leading-relaxed mb-8"
              >
                {project.apiDesign.description}
              </motion.p>
              <div className="bg-secondary/80 border border-foreground/10 p-6 font-mono text-sm">
                <p className="text-muted-foreground mb-4 font-sans text-xs tracking-widest uppercase">Example Endpoints</p>
                <div className="space-y-2">
                  {project.apiDesign.endpoints.map((endpoint, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="text-foreground/80 hover:text-foreground transition-colors"
                    >
                      {endpoint}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* 9️⃣ System Architecture */}
        <AnimatedSection className="container mx-auto px-4 sm:px-6 lg:px-12 mb-24">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm tracking-widest uppercase text-muted-foreground mb-4"
          >
            {t("projectDetail.architecture")}
          </motion.p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-12">{t("projectDetail.systemArchitecture")}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(project.architecture).map(([key, value], i) => (
              <ArchCard key={key} label={key} value={value} index={i} />
            ))}
          </div>
        </AnimatedSection>

        {/* Database Design */}
        <AnimatedSection className="container mx-auto px-4 sm:px-6 lg:px-12 mb-24">
          <div className="grid lg:grid-cols-3 gap-12">
            <div>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-sm tracking-widest uppercase text-muted-foreground mb-4"
              >
                DATA
              </motion.p>
              <h2 className="text-3xl sm:text-4xl font-bold">Database</h2>
            </div>
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 bg-secondary/50 border border-foreground/10"
              >
                <h4 className="font-bold text-lg mb-2">{project.database.type}</h4>
                <p className="text-muted-foreground mb-6">{project.database.description}</p>
                <ul className="space-y-3">
                  {project.database.stores.map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      className="flex items-center gap-3 text-muted-foreground"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-foreground/40 flex-shrink-0" />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </AnimatedSection>

        {/* Security Features */}
        <AnimatedSection className="container mx-auto px-4 sm:px-6 lg:px-12 mb-24">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm tracking-widest uppercase text-muted-foreground mb-4"
          >
            PROTECTION
          </motion.p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-12">Security Features</h2>
          <div className="grid sm:grid-cols-2 gap-4 max-w-4xl">
            {project.security.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ x: 8 }}
                className="group flex items-center gap-4 p-5 border border-foreground/10 hover:border-foreground/30 transition-all duration-300"
              >
                <motion.div 
                  className="w-8 h-8 rounded-full border border-foreground/20 flex items-center justify-center text-xs font-mono text-muted-foreground group-hover:border-foreground group-hover:text-foreground transition-colors"
                >
                  🔒
                </motion.div>
                <span className="text-foreground text-sm">{item}</span>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>

        {/* Core Capabilities */}
        <AnimatedSection className="container mx-auto px-4 sm:px-6 lg:px-12 mb-24 py-16 bg-secondary">
          <div className="max-w-6xl mx-auto">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-sm tracking-widest uppercase text-muted-foreground mb-4"
            >
              CAPABILITIES
            </motion.p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-12">Core Capabilities</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.coreCapabilities.map((cap, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group p-6 bg-background border border-foreground/10 hover:border-foreground/30 transition-all duration-300 cursor-pointer"
                >
                  <span className="text-4xl font-bold text-foreground/10 block mb-3">0{i + 1}</span>
                  <p className="text-foreground text-sm leading-relaxed">{cap}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* 🔟 Technical Challenges & Solutions */}
        <AnimatedSection className="container mx-auto px-4 sm:px-6 lg:px-12 mb-24">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm tracking-widest uppercase text-muted-foreground mb-4"
          >
            {t("projectDetail.challenges")}
          </motion.p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-12">{t("projectDetail.technicalChallenges")}</h2>
          <div className="space-y-4 max-w-4xl">
            {project.challenges.map((challenge, i) => (
              <ChallengeCard key={i} challenge={challenge} index={i} />
            ))}
          </div>
        </AnimatedSection>

        {/* 1️⃣1️⃣ Development Highlights */}
        <AnimatedSection className="container mx-auto px-4 sm:px-6 lg:px-12 mb-24">
          <div className="grid lg:grid-cols-3 gap-12">
            <div>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-sm tracking-widest uppercase text-muted-foreground mb-4"
              >
                HIGHLIGHTS
              </motion.p>
              <h2 className="text-3xl sm:text-4xl font-bold">Development Highlights</h2>
            </div>
            <div className="lg:col-span-2 space-y-4">
              {project.developmentHighlights.map((highlight, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ x: 8 }}
                  className="flex items-start gap-4 p-5 border-l-2 border-foreground/20 hover:border-foreground bg-secondary/30 hover:bg-secondary transition-all duration-300 cursor-pointer"
                >
                  <span className="text-muted-foreground font-mono text-sm mt-0.5">✦</span>
                  <span className="text-foreground">{highlight}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Architectural Diagram */}
        <AnimatedSection className="container mx-auto px-4 sm:px-6 lg:px-12 mb-24">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-sm tracking-widest uppercase text-muted-foreground mb-4">ARCHITECTURE</motion.p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-12">Architectural Diagram</h2>
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-lg font-semibold mb-6 text-muted-foreground">Components</h3>
              <div className="space-y-4">
                {project.architecturalDiagram.components.map((comp, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} whileHover={{ x: 8 }} className="group p-5 border border-foreground/10 hover:border-foreground/30 transition-all duration-300">
                    <h4 className="font-semibold mb-1">{comp.name}</h4>
                    <p className="text-muted-foreground text-sm">{comp.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-6 text-muted-foreground">Data Flow</h3>
              <div className="space-y-3">
                {project.architecturalDiagram.flow.map((step, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex items-center gap-3 p-4 bg-secondary/50 hover:bg-secondary transition-colors font-mono text-sm">
                    <span className="text-muted-foreground font-sans text-xs">0{i + 1}</span>
                    <span className="text-foreground">{step}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Limitations */}
        <AnimatedSection className="container mx-auto px-4 sm:px-6 lg:px-12 mb-24">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-sm tracking-widest uppercase text-muted-foreground mb-4">CONSTRAINTS</motion.p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-12">Limitations</h2>
          <div className="grid sm:grid-cols-2 gap-4 max-w-4xl">
            {project.limitations.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} whileHover={{ x: 8 }} className="flex items-start gap-4 p-5 border border-foreground/10 hover:border-foreground/30 transition-all duration-300">
                <span className="text-muted-foreground font-mono text-sm mt-0.5">⚠</span>
                <span className="text-foreground text-sm">{item}</span>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>

        {/* What Failed */}
        <AnimatedSection className="container mx-auto px-4 sm:px-6 lg:px-12 mb-24">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-sm tracking-widest uppercase text-muted-foreground mb-4">FAILURES</motion.p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-12">What Failed</h2>
          <div className="space-y-4 max-w-4xl">
            {project.whatFailed.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ x: 8 }} className="flex items-start gap-4 p-6 border-l-2 border-foreground/20 hover:border-foreground bg-secondary/30 hover:bg-secondary transition-all duration-300 cursor-pointer">
                <span className="text-muted-foreground font-mono text-sm mt-0.5">✕</span>
                <span className="text-foreground">{item}</span>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>

        {/* What Can Be Improved */}
        <AnimatedSection className="container mx-auto px-4 sm:px-6 lg:px-12 mb-24">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-sm tracking-widest uppercase text-muted-foreground mb-4">FUTURE</motion.p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-12">What Can Be Improved</h2>
          <div className="grid sm:grid-cols-2 gap-4 max-w-4xl">
            {project.improvements.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} whileHover={{ y: -5, scale: 1.02 }} className="group p-5 border border-foreground/10 hover:border-foreground hover:bg-foreground hover:text-background transition-all duration-300 cursor-pointer">
                <span className="text-4xl font-bold text-foreground/10 group-hover:text-background/20 block mb-2">0{i + 1}</span>
                <span className="text-sm">{item}</span>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>

        {/* Scalability */}
        <AnimatedSection className="container mx-auto px-4 sm:px-6 lg:px-12 mb-24">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-sm tracking-widest uppercase text-muted-foreground mb-4">SCALE</motion.p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-12">Scalability</h2>
          <div className="grid sm:grid-cols-2 gap-4 max-w-4xl">
            {project.scalability.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} whileHover={{ x: 8 }} className="group flex items-start gap-4 p-5 border border-foreground/10 hover:border-foreground/30 transition-all duration-300">
                <motion.div className="w-8 h-8 rounded-full border border-foreground/20 flex items-center justify-center text-xs font-mono text-muted-foreground group-hover:border-foreground group-hover:text-foreground transition-colors flex-shrink-0">↗</motion.div>
                <span className="text-foreground text-sm">{item}</span>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>

        {/* Learning Points */}
        <AnimatedSection className="container mx-auto px-4 sm:px-6 lg:px-12 mb-24 py-16 bg-secondary">
          <div className="max-w-6xl mx-auto">
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-sm tracking-widest uppercase text-muted-foreground mb-4">GROWTH</motion.p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-12">What I Learned</h2>
            <div className="space-y-4">
              {project.learningPoints.map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ x: 8 }} className="flex items-start gap-4 p-5 bg-background border border-foreground/10 hover:border-foreground/30 transition-all duration-300 cursor-pointer">
                  <span className="text-muted-foreground font-mono text-sm mt-0.5">💡</span>
                  <span className="text-foreground">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>


        {/* 1️⃣3️⃣ Live Demo + GitHub */}
        <AnimatedSection className="container mx-auto px-4 sm:px-6 lg:px-12 mb-24">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm tracking-widest uppercase text-muted-foreground mb-4"
          >
            {t("projectDetail.links")}
          </motion.p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-12">Live Demo + GitHub</h2>
          <div className="flex flex-wrap gap-4">
            <motion.a
              href={project.liveUrl}
              className="group inline-flex items-center gap-3"
              whileHover={{ x: 5 }}
            >
              <span className="btn-primary inline-flex items-center gap-2">
                <ExternalLink className="w-4 h-4" />
                {t("projectDetail.liveDemo")}
              </span>
              <motion.div
                className="w-10 h-10 rounded-full border border-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                whileHover={{ rotate: 45 }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </motion.div>
            </motion.a>
            <motion.a
              href={project.githubUrl}
              className="group inline-flex items-center gap-3"
              whileHover={{ x: 5 }}
            >
              <span className="btn-outline inline-flex items-center gap-2">
                <Github className="w-4 h-4" />
                {t("projectDetail.viewOnGithub")}
              </span>
            </motion.a>
          </div>
        </AnimatedSection>

        {/* Next Project Teaser */}
        <AnimatedSection className="container mx-auto px-4 sm:px-6 lg:px-12 mb-12">
          <div className="border-t border-foreground/10 pt-16">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
              <div>
                <p className="text-sm text-muted-foreground mb-2">{t("projectDetail.thanksForReading")}</p>
                <h3 className="text-2xl font-bold">{t("projectDetail.interestedInWorking")}</h3>
              </div>
              <motion.a
                href="/#contact"
                className="inline-flex items-center gap-3 group"
                whileHover={{ x: 5 }}
              >
                <span className="text-lg font-medium">{t("projectDetail.getInTouch")}</span>
                <motion.div
                  className="w-12 h-12 rounded-full border border-foreground flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-all"
                  whileHover={{ scale: 1.1, rotate: 45 }}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </motion.div>
              </motion.a>
            </div>
          </div>
        </AnimatedSection>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectDetail;
