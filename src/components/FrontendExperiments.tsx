import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Github, ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Experiment {
  id: number;
  title: string;
  titleJa: string;
  description: string;
  descriptionJa: string;
  tags: string[];
  githubUrl: string;
  liveUrl: string;
  gradient: string; // semantic gradient using tokens
}

const experiments: Experiment[] = [
  {
    id: 1,
    title: "Motion Playground",
    titleJa: "モーション実験室",
    description:
      "A sandbox of Framer Motion experiments — spring physics, scroll choreography, and layout transitions.",
    descriptionJa:
      "Framer Motionの実験場。スプリング物理、スクロール演出、レイアウト遷移。",
    tags: ["React", "Framer Motion", "TypeScript"],
    githubUrl: "https://github.com/",
    liveUrl: "#",
    gradient:
      "linear-gradient(135deg, hsl(var(--foreground)) 0%, hsl(var(--muted-foreground)) 100%)",
  },
  {
    id: 2,
    title: "Shader Garden",
    titleJa: "シェーダーガーデン",
    description:
      "GLSL fragment shaders ported to React Three Fiber — ripples, noise fields, and ink dispersion.",
    descriptionJa:
      "GLSLフラグメントシェーダーをR3Fへ移植。波紋・ノイズ・墨流し。",
    tags: ["R3F", "GLSL", "WebGL"],
    githubUrl: "https://github.com/",
    liveUrl: "#",
    gradient:
      "linear-gradient(135deg, hsl(var(--muted-foreground)) 0%, hsl(var(--foreground)) 100%)",
  },
  {
    id: 3,
    title: "Type Specimen",
    titleJa: "活字標本",
    description:
      "Interactive type specimen exploring variable fonts, kinetic typography, and bilingual pairing.",
    descriptionJa:
      "可変フォント、キネティックタイポ、和欧混植のインタラクティブ標本。",
    tags: ["Variable Fonts", "CSS", "i18n"],
    githubUrl: "https://github.com/",
    liveUrl: "#",
    gradient:
      "linear-gradient(160deg, hsl(var(--foreground)) 0%, hsl(var(--secondary)) 100%)",
  },
  {
    id: 4,
    title: "Edge AI Demos",
    titleJa: "Edge AIデモ",
    description:
      "Tiny open-source demos calling AI Gateway from Edge Functions with strict JSON schemas.",
    descriptionJa:
      "Edge FunctionからAI Gatewayを呼び出す軽量OSSデモ集。",
    tags: ["Deno", "AI Gateway", "Zod"],
    githubUrl: "https://github.com/",
    liveUrl: "#",
    gradient:
      "linear-gradient(135deg, hsl(var(--secondary)) 0%, hsl(var(--foreground)) 100%)",
  },
];

const ExperimentCard = ({ exp, index }: { exp: Experiment; index: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { language } = useLanguage();

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col bg-background border border-foreground/10 hover:border-foreground/30 transition-colors duration-500 overflow-hidden"
    >
      {/* Visual */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{ backgroundImage: exp.gradient }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
        <div className="absolute inset-0 flex items-end p-6">
          <div className="text-background/90 text-7xl sm:text-8xl font-bold tracking-tighter leading-none opacity-30 group-hover:opacity-60 transition-opacity duration-500">
            0{index + 1}
          </div>
        </div>
        <div className="absolute top-4 right-4 text-xs tracking-[0.25em] uppercase text-background/70">
          {language === "ja" ? "実験" : "Experiment"}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-6 sm:p-7">
        <h3 className="text-xl sm:text-2xl font-semibold tracking-tight">
          {language === "ja" ? exp.titleJa : exp.title}
        </h3>
        <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed flex-1">
          {language === "ja" ? exp.descriptionJa : exp.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {exp.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] tracking-[0.18em] uppercase text-muted-foreground px-2 py-1 border border-foreground/10"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-3">
          <motion.a
            href={exp.githubUrl}
            target="_blank"
            rel="noreferrer noopener"
            whileHover={{ y: -2 }}
            className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2.5 rounded-full border border-foreground/20 hover:bg-foreground hover:text-background transition-colors duration-300"
          >
            <Github size={14} />
            GitHub
          </motion.a>
          <motion.a
            href={exp.liveUrl}
            target="_blank"
            rel="noreferrer noopener"
            whileHover={{ y: -2 }}
            className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2.5 rounded-full bg-foreground text-background hover:opacity-90 transition-opacity duration-300"
          >
            <ExternalLink size={14} />
            {language === "ja" ? "ライブ" : "Live"}
          </motion.a>
        </div>
      </div>
    </motion.article>
  );
};

const FrontendExperiments = () => {
  const { language } = useLanguage();
  const headerRef = useRef(null);
  const inView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section
      id="experiments"
      aria-label="Frontend Experiments & Open Source"
      className="section-padding"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12 sm:mb-16"
        >
          <div>
            <div className="text-xs tracking-[0.3em] uppercase text-muted-foreground">
              {language === "ja" ? "実験とオープンソース" : "Experiments & Open Source"}
            </div>
            <h2 className="mt-4 text-3xl sm:text-4xl md:text-6xl font-bold tracking-tighter">
              {language === "ja"
                ? "フロントエンドの遊び場。"
                : "Frontend playground."}
            </h2>
          </div>
          <p className="max-w-md text-muted-foreground text-sm sm:text-base">
            {language === "ja"
              ? "本番プロダクトの外で試している小さな実験とOSS。MITライセンスで公開。"
              : "Small experiments and OSS I tinker with outside of production work. MIT-licensed, fork freely."}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
          {experiments.map((exp, i) => (
            <ExperimentCard key={exp.id} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FrontendExperiments;
