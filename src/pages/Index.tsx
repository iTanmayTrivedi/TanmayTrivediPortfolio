import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import DevelopmentJourney from "@/components/DevelopmentJourney";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Certificates from "@/components/Certificates";
import Recognition from "@/components/Recognition";
import Contact from "@/components/Contact";
import LetterSection from "@/components/LetterSection";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import Preloader from "@/components/Preloader";
import LyntSection from "@/components/LyntSection";
import FrontendExperiments from "@/components/FrontendExperiments";

const Index = () => {
  // Only show preloader on first visit, not when navigating back
  const hasVisited = sessionStorage.getItem("hasVisited");
  const [isLoading, setIsLoading] = useState(!hasVisited);
  const [showContent, setShowContent] = useState(!!hasVisited);

  const handleLoadingComplete = () => {
    sessionStorage.setItem("hasVisited", "true");
    setIsLoading(false);
    // Small delay before showing content for smooth transition
    setTimeout(() => setShowContent(true), 50);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <div className="min-h-screen bg-background cursor-none overflow-x-hidden">
      <AnimatePresence mode="wait">
        {isLoading && <Preloader onComplete={handleLoadingComplete} />}
      </AnimatePresence>
      
      <CustomCursor />
      
      <AnimatePresence>
        {showContent && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <Header />
            </motion.div>
            <motion.div variants={itemVariants}>
              <Hero />
            </motion.div>
            <motion.div variants={itemVariants}>
              <DevelopmentJourney />
            </motion.div>
            <motion.div variants={itemVariants}>
              <LyntSection />
            </motion.div>
            <motion.div variants={itemVariants}>
              <Projects />
            </motion.div>
            <motion.div variants={itemVariants}>
              <FrontendExperiments />
            </motion.div>
            <motion.div variants={itemVariants}>
              <About />
            </motion.div>
            <motion.div variants={itemVariants}>
              <Skills />
            </motion.div>
            <motion.div variants={itemVariants}>
              <Certificates />
            </motion.div>
            <motion.div variants={itemVariants}>
              <Recognition />
            </motion.div>
            <motion.div variants={itemVariants}>
              <LetterSection />
            </motion.div>
            <motion.div variants={itemVariants}>
              <Contact />
            </motion.div>
            <motion.div variants={itemVariants}>
              <Footer />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
