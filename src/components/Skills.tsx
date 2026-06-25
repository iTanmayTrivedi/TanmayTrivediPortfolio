import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const skills = [
  {
    categoryKey: "skills.frontend",
    items: ["React", "Vue.js", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    color: "from-foreground to-foreground/60",
  },
  {
    categoryKey: "skills.backend",
    items: ["Node.js", "Python", "Go", "PostgreSQL", "MongoDB", "Redis"],
    color: "from-foreground/80 to-foreground/40",
  },
  {
    categoryKey: "skills.devops",
    items: ["Docker", "Kubernetes", "AWS", "GCP", "CI/CD", "Terraform"],
    color: "from-foreground/60 to-foreground/20",
  },
  {
    categoryKey: "skills.design",
    items: ["Figma", "Framer", "UI/UX", "Prototyping", "Design Systems", "Motion"],
    color: "from-foreground/40 to-foreground/10",
  },
];

const SkillPill = ({ skill, index }: { skill: string; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={(e) => e.stopPropagation()}
      className="relative group cursor-pointer"
    >
      <motion.div
        animate={{
          scale: isHovered ? 1.05 : 1,
          y: isHovered ? -3 : 0,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 22 }}
        className="px-6 py-3 border border-foreground/20 hover:border-foreground hover:bg-foreground hover:text-background transition-colors duration-300"
      >
        <span className="text-sm font-medium tracking-wide">{skill}</span>
      </motion.div>
    </motion.div>
  );
};

const SkillCategory = ({
  categoryKey,
  items,
  index,
}: {
  categoryKey: string;
  items: string[];
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isExpanded, setIsExpanded] = useState(true);
  const { t } = useLanguage();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -40 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
      transition={{ delay: index * 0.15, duration: 0.6, ease: "easeOut" }}
      className="group"
    >
      <motion.div
        data-no-ripple
        className="flex items-center justify-between py-6 border-b border-foreground/10 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
        whileHover={{ x: 10 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <div className="flex items-center gap-6">
          <motion.span
            className="text-6xl md:text-8xl font-bold text-foreground/10 group-hover:text-foreground/30 transition-colors"
            animate={{ opacity: isExpanded ? 1 : 0.5 }}
          >
            0{index + 1}
          </motion.span>
          <h3 className="text-2xl md:text-4xl font-semibold">{t(categoryKey)}</h3>
        </div>
        
        <motion.div
          animate={{ rotate: isExpanded ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          className="w-12 h-12 rounded-full border border-foreground/20 flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-all"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </motion.div>
      </motion.div>

      <motion.div
        initial={false}
        animate={{
          height: isExpanded ? "auto" : 0,
          opacity: isExpanded ? 1 : 0,
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="overflow-hidden"
      >
        <div className="flex flex-wrap gap-3 py-8">
          {items.map((skill, skillIndex) => (
            <SkillPill key={skill} skill={skill} index={skillIndex} />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

const Skills = () => {
  const titleRef = useRef(null);
  const isTitleInView = useInView(titleRef, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  return (
    <section id="skills" className="section-padding">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-sm tracking-widest uppercase text-muted-foreground mb-4"
            >
              {t("skills.label")}
            </motion.p>
            <motion.h2
              ref={titleRef}
              initial={{ opacity: 0, y: 40 }}
              animate={isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-bold"
            >
              {t("skills.title1")}<br />
              <span className="text-foreground/40">{t("skills.title2")}</span>
            </motion.h2>
          </div>

        </div>

        {/* Skills Categories */}
        <div className="space-y-2">
          {skills.map((skillGroup, index) => (
            <SkillCategory
              key={skillGroup.categoryKey}
              categoryKey={skillGroup.categoryKey}
              items={skillGroup.items}
              index={index}
            />
          ))}
        </div>

        {/* Interactive Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-12 border-t border-foreground/10"
        >
          {[
            { number: "5+", labelKey: "skills.fullStackProjects" },
            { number: "20+", labelKey: "skills.technologiesLearned" },
            { number: "10+", labelKey: "skills.restApisBuilt" },
            { number: "∞", labelKey: "skills.continuousImprovement" },
          ].map((stat, index) => (
            <motion.div
              key={stat.labelKey}
              className="text-center group cursor-pointer"
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <motion.span
                className="block text-4xl md:text-6xl font-bold mb-2 group-hover:text-foreground/60 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                {stat.number}
              </motion.span>
              <span className="text-sm text-muted-foreground uppercase tracking-widest">
                {t(stat.labelKey)}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
