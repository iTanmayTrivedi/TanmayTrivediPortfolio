import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import Frame3D from "./Frame3D";
import letterAsset from "@/assets/letter-new.png.asset.json";
const letterImg = letterAsset.url;

const LetterSection = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <section className="section-padding bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <p className="text-sm tracking-widest uppercase text-muted-foreground mb-6">
              A Letter
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Words that<br />
              <span className="text-foreground/40">shape the craft.</span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-md mb-4">
              A reminder of what drives the work — building tools that empower
              the people who think different.
            </p>
            <p className="text-xs uppercase tracking-widest text-muted-foreground/70">
              Click the letter to read →
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            className="flex justify-center"
          >
            <button
              onClick={() => setOpen(true)}
              aria-label="Open letter"
              className="block w-full max-w-md cursor-zoom-in"
            >
              <Frame3D className="w-full">
                <img
                  src={letterImg}
                  alt="Letter"
                  className="w-full h-auto object-cover bg-white"
                />
              </Frame3D>
            </button>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[9999] bg-foreground/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8 cursor-zoom-out"
            onClick={() => setOpen(false)}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
              }}
              aria-label="Close letter"
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-12 h-12 rounded-full bg-background text-foreground flex items-center justify-center hover:scale-110 transition-transform z-10"
            >
              <X className="w-5 h-5" />
            </button>
            <motion.img
              key="letter-zoom"
              src={letterImg}
              alt="Letter full view"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-full max-h-full w-auto h-auto object-contain bg-white shadow-2xl"
              style={{ maxHeight: "92vh" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default LetterSection;
