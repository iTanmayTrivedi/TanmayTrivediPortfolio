import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const serviceKeys = [
  { nameKey: "services.frontendDev", tools: "React, Vue, Next.js" },
  { nameKey: "services.backendDev", tools: "Node.js, Python, Go" },
  { nameKey: "services.databaseArch", tools: "PostgreSQL, MongoDB" },
  { nameKey: "services.apiDev", tools: "REST, GraphQL" },
  { nameKey: "services.cloudInfra", tools: "AWS, GCP, Azure" },
  { nameKey: "services.devopsCicd", tools: "Docker, Kubernetes" },
  { nameKey: "services.uiuxDesign", tools: "Figma, Framer" },
  { nameKey: "services.techConsulting", tools: "Architecture, Code Review" },
];

const Services = () => {
  const titleRef = useRef(null);
  const isTitleInView = useInView(titleRef, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  const descWords = t("services.description").split(" ");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.03,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section id="services" className="section-padding">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-16">
          {/* Left Column - Description */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-sm tracking-widest uppercase text-muted-foreground mb-8"
            >
              {t("services.label")}
            </motion.p>

            <motion.p
              ref={titleRef}
              variants={containerVariants}
              initial="hidden"
              animate={isTitleInView ? "visible" : "hidden"}
              className="text-xl sm:text-2xl md:text-3xl font-medium leading-relaxed"
            >
              {descWords.map((word, index) => (
                <motion.span
                  key={index}
                  variants={wordVariants}
                  className="inline-block mr-[0.3em]"
                >
                  {word}
                </motion.span>
              ))}
            </motion.p>
          </div>

          {/* Right Column - Services List */}
          <div>
            {serviceKeys.map((service, index) => (
              <motion.div
                key={service.nameKey}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.05,
                  ease: [0.19, 1, 0.22, 1],
                }}
                className="service-item group flex-col sm:flex-row gap-1 sm:gap-0"
              >
                <span className="text-base sm:text-lg font-medium group-hover:text-foreground transition-colors">
                  {t(service.nameKey)}
                </span>
                <span className="text-xs sm:text-sm text-muted-foreground">
                  {service.tools}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
