import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const testimonials = [
  {
    quote:
      "Working with this developer was transformative for our startup. They delivered a robust MVP in record time that helped us secure our Series A funding.",
    quoteJa:
      "このデベロッパーとの仕事は、私たちのスタートアップにとって変革的でした。短期間で堅牢なMVPを提供してくれ、シリーズA資金調達に成功しました。",
    author: "Sarah Chen",
    role: "CEO at TechFlow",
    roleJa: "TechFlow CEO",
  },
  {
    quote:
      "Exceptional technical skills combined with a deep understanding of product design. Our platform's performance improved by 300% after the refactor.",
    quoteJa:
      "卓越した技術スキルとプロダクトデザインへの深い理解を兼ね備えています。リファクタリング後、プラットフォームのパフォーマンスが300%向上しました。",
    author: "Marcus Johnson",
    role: "CTO at DataScale",
    roleJa: "DataScale CTO",
  },
  {
    quote:
      "The attention to detail and code quality is outstanding. They don't just write code, they architect solutions that scale beautifully.",
    quoteJa:
      "細部へのこだわりとコード品質は卓越しています。単にコードを書くだけでなく、美しくスケールするソリューションを設計してくれます。",
    author: "Elena Rodriguez",
    role: "Product Lead at FinServe",
    roleJa: "FinServe プロダクトリード",
  },
  {
    quote:
      "Best developer I've worked with in 15 years. Communicative, reliable, and consistently delivers beyond expectations.",
    quoteJa:
      "15年間で一緒に仕事をした中で最高のデベロッパーです。コミュニケーション能力が高く、信頼でき、常に期待を超える成果を出してくれます。",
    author: "James Mitchell",
    role: "Founder at CloudOps",
    roleJa: "CloudOps 創業者",
  },
];

const Testimonials = () => {
  const { language, t } = useLanguage();

  return (
    <section className="section-padding bg-secondary overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 mb-12">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-sm tracking-widest uppercase text-muted-foreground"
        >
          {t("testimonials.label")}
        </motion.p>
      </div>

      {/* Testimonials Carousel */}
      <div className="relative">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex gap-6 overflow-x-auto pb-8 px-6 lg:px-12 scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="testimonial-card flex-shrink-0 w-[350px] md:w-[450px] group cursor-pointer"
              data-cursor="Read"
            >
              <motion.span
                className="text-8xl font-serif text-foreground/10 absolute -top-4 -left-2 group-hover:text-foreground/20 transition-colors"
                whileHover={{ scale: 1.2 }}
              >
                "
              </motion.span>
              
              <p className="text-lg leading-relaxed mb-8 relative z-10">
                "{language === "ja" ? testimonial.quoteJa : testimonial.quote}"
              </p>
              
              <div className="flex items-center gap-4">
                <motion.div
                  className="w-12 h-12 rounded-full bg-foreground/10 flex items-center justify-center text-lg font-bold group-hover:bg-foreground group-hover:text-background transition-all"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  {testimonial.author.charAt(0)}
                </motion.div>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">
                    {language === "ja" ? testimonial.roleJa : testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
