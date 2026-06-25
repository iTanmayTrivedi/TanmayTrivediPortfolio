import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Frame3D from "./Frame3D";

import certCsharp from "@/assets/cert-csharp-microsoft.png";
import certAi from "@/assets/cert-elements-of-ai.png";
import certPython from "@/assets/cert-hackerrank-python.jpg";
import certLlm from "@/assets/cert-llm-nasscom.png";
import certCisco from "@/assets/cert-cisco-cybersecurity.png";
import certGenAi from "@/assets/cert-simplilearn-genai.png";
import certMcp from "@/assets/cert-anthropic-mcp.png";
import certAppleAds from "@/assets/cert-apple-ads.png";
import certAppleTeacher from "@/assets/cert-apple-teacher.png";
import certAwsAsset from "@/assets/cert-aws-s3.png.asset.json";
import certCnnAsset from "@/assets/cert-cnn-tf.png.asset.json";
import certAzureAsset from "@/assets/cert-azure-cv.png.asset.json";

import logoMicrosoft from "@/assets/logo-microsoft.webp";
import logoHelsinki from "@/assets/logo-helsinki.png";
import logoApple from "@/assets/logo-apple.png";
import logoHackerrank from "@/assets/logo-hackerrank.png";
import logoMeta from "@/assets/logo-meta.png";
import logoCisco from "@/assets/logo-cisco.png";
import logoAnthropic from "@/assets/logo-anthropic.jpg";
import logoSimplilearn from "@/assets/logo-simplilearn.avif";
import logoCoursera from "@/assets/logo-coursera.png";
import logoAws from "@/assets/logo-aws.png";

const certAwsS3 = certAwsAsset.url;
const certCnnTf = certCnnAsset.url;
const certAzureCv = certAzureAsset.url;

interface Cert {
  id: string;
  image: string;
  title: string;
  titleJa: string;
  issuer: string;
  issuerLogo: React.ReactNode;
  date: string;
  learned: string;
  learnedJa: string;
  applied: string;
  appliedJa: string;
  accent: string;
}

// Square brand-logo badge holding actual issuer logo image.
const LogoBadge = ({
  bg = "#FFFFFF",
  src,
  title,
}: {
  bg?: string;
  src: string;
  title?: string;
}) => (
  <span
    title={title}
    aria-label={title}
    className="inline-flex items-center justify-center w-10 h-10 rounded-md border border-foreground/15 transition-all duration-300 group-hover/cert:scale-110 group-hover/cert:border-foreground overflow-hidden flex-shrink-0"
    style={{ background: bg }}
  >
    <img src={src} alt={title || ""} className="w-7 h-7 object-contain" />
  </span>
);

const certificates: Cert[] = [
  {
    id: "csharp",
    image: certCsharp,
    title: "Foundational C# with Microsoft",
    titleJa: "Microsoft 公式 C# 基礎",
    issuer: "freeCodeCamp × Microsoft",
    date: "Dec 2025",
    accent: "#258FFB",
    issuerLogo: <LogoBadge bg="#FFFFFF" src={logoMicrosoft} title="Microsoft" />,
    learned:
      "Strongly-typed OOP fundamentals — classes, inheritance, interfaces, generics, LINQ, async/await and exception design in modern .NET.",
    learnedJa:
      "クラス、継承、インターフェース、ジェネリクス、LINQ、async/await、例外設計など、.NET の OOP 基礎を体系的に習得。",
    applied:
      "Used the same type-driven thinking when designing TypeScript domain models and API contracts in my SaaS dashboards.",
    appliedJa:
      "SaaS ダッシュボードの TypeScript ドメインモデルと API 契約設計に応用。",
  },
  {
    id: "ai",
    image: certAi,
    title: "Elements of AI",
    titleJa: "AI の要素",
    issuer: "University of Helsinki × MinnaLearn",
    date: "Dec 2025",
    accent: "#5B47E0",
    issuerLogo: <LogoBadge bg="#FFFFFF" src={logoHelsinki} title="University of Helsinki" />,
    learned:
      "Foundations of AI — search, probability, Bayesian reasoning, neural networks, and the societal implications of automated decision-making.",
    learnedJa:
      "探索、確率、ベイズ推論、ニューラルネットワーク、AI が社会に与える影響まで体系的に学習。",
    applied:
      "Informed how I scope AI features responsibly — choosing the right model, framing prompts, and respecting user data boundaries.",
    appliedJa:
      "AI 機能の設計で、適切なモデル選定・プロンプト設計・ユーザーデータの境界尊重に応用。",
  },
  {
    id: "python",
    image: certPython,
    title: "Python (Basic) Certified",
    titleJa: "Python（基礎）認定",
    issuer: "HackerRank",
    date: "Dec 2025",
    accent: "#1BA94C",
    issuerLogo: <LogoBadge bg="#0E1116" src={logoHackerrank} title="HackerRank" />,
    learned:
      "Python data structures, comprehensions, error handling, and writing concise, idiomatic scripts under timed assessment conditions.",
    learnedJa:
      "Python のデータ構造、内包表記、例外処理、簡潔で慣用的なスクリプトを時間制限下で記述。",
    applied:
      "Backed automation scripts and data-shaping utilities used across project tooling and content pipelines.",
    appliedJa:
      "自動化スクリプトやデータ整形ユーティリティに活用し、プロジェクトの開発体験を底上げ。",
  },
  {
    id: "llm",
    image: certLlm,
    title: "LLM for Young Developers — Foundational",
    titleJa: "LLM 基礎（若手開発者向け）",
    issuer: "INDIAai × Meta × NASSCOM FutureSkills",
    date: "Feb 2026",
    accent: "#0866FF",
    issuerLogo: <LogoBadge bg="#FFFFFF" src={logoMeta} title="Meta" />,
    learned:
      "How transformer-based LLMs are trained, evaluated, and deployed — tokenization, context windows, fine-tuning vs. prompting, and guardrails.",
    learnedJa:
      "トランスフォーマー型 LLM の学習・評価・運用、トークン化、コンテキストウィンドウ、ファインチューニングとプロンプトの使い分け、安全策を理解。",
    applied:
      "Drove smarter LLM integration in product flows — picking the cheapest capable model and structuring prompts as reusable contracts.",
    appliedJa:
      "プロダクトの LLM 連携で、最適なモデル選定と再利用可能なプロンプト契約の設計に応用。",
  },
  {
    id: "cisco",
    image: certCisco,
    title: "Introduction to Cybersecurity",
    titleJa: "サイバーセキュリティ入門",
    issuer: "Cisco Networking Academy (Japan)",
    date: "Dec 2025",
    accent: "#1BA0D7",
    issuerLogo: <LogoBadge bg="#FFFFFF" src={logoCisco} title="Cisco" />,
    learned:
      "Threat models, common attack vectors, defense-in-depth, and the security responsibilities of every developer touching user data.",
    learnedJa:
      "脅威モデル、代表的な攻撃手法、多層防御、ユーザーデータを扱う開発者としてのセキュリティ責任を学習。",
    applied:
      "Hardened auth flows, RLS policies, and secret handling in Lovable Cloud projects — security as a default, not a feature.",
    appliedJa:
      "Lovable Cloud プロジェクトの認証・RLS・シークレット管理を強化。セキュリティを既定値として実装。",
  },
  {
    id: "genai",
    image: certGenAi,
    title: "SkillQuest — Generative AI Literacy",
    titleJa: "生成 AI リテラシー",
    issuer: "Simplilearn SkillUp",
    date: "Apr 2026",
    accent: "#F59C1A",
    issuerLogo: <LogoBadge bg="#FFFFFF" src={logoSimplilearn} title="Simplilearn" />,
    learned:
      "Practical literacy across generative AI — diffusion vs. autoregressive models, evaluation, hallucination mitigation, and ethical use.",
    learnedJa:
      "生成 AI の実践的リテラシー。拡散モデルと自己回帰モデルの違い、評価、ハルシネーション抑制、倫理的活用までを習得。",
    applied:
      "Shipped AI-assisted UX (copy, search, summaries) with clear fallbacks and human-in-the-loop checkpoints.",
    appliedJa:
      "AI 支援 UX（コピー生成、検索、要約）に明確なフォールバックと人間によるチェックポイントを実装。",
  },
  {
    id: "mcp",
    image: certMcp,
    title: "Model Context Protocol — Advanced Topics",
    titleJa: "Model Context Protocol 上級",
    issuer: "Anthropic",
    date: "Dec 2025",
    accent: "#CC785C",
    issuerLogo: <LogoBadge bg="#FFFFFF" src={logoAnthropic} title="Anthropic" />,
    learned:
      "Designing MCP servers and tools — resource exposure, structured tool calls, sampling, and safe agent-tool interaction patterns.",
    learnedJa:
      "MCP サーバーとツール設計、リソース公開、構造化ツール呼び出し、サンプリング、安全なエージェント連携パターンを学習。",
    applied:
      "Connected internal data sources to AI agents through MCP, turning static dashboards into conversational, tool-using interfaces.",
    appliedJa:
      "社内データソースを MCP で AI エージェントに接続し、静的ダッシュボードを会話型・ツール活用型の UI に進化。",
  },
  {
    id: "apple-ads",
    image: certAppleAds,
    title: "Apple Ads Certified — Class of 2026",
    titleJa: "Apple Ads 認定 — Class of 2026",
    issuer: "Apple",
    date: "2026",
    accent: "#0071E3",
    issuerLogo: <LogoBadge bg="#FFFFFF" src={logoApple} title="Apple" />,
    learned:
      "Apple Search Ads strategy — campaign structure, keyword intent, audience targeting, creative sets, and attribution on the App Store.",
    learnedJa:
      "Apple Search Ads 戦略 — キャンペーン構成、キーワード意図、オーディエンス設計、クリエイティブセット、App Store のアトリビューションを習得。",
    applied:
      "Used the same intent-first thinking when designing app landing pages and conversion funnels for client iOS launches.",
    appliedJa:
      "クライアントの iOS リリース時、ランディングページとコンバージョン導線を意図ファーストで設計。",
  },
  {
    id: "apple-teacher",
    image: certAppleTeacher,
    title: "Apple Teacher — Certificate of Recognition",
    titleJa: "Apple Teacher 認定証",
    issuer: "Apple · Rama University",
    date: "Dec 2025",
    accent: "#A2AAAD",
    issuerLogo: <LogoBadge bg="#FFFFFF" src={logoApple} title="Apple" />,
    learned:
      "Mastery of Apple's productivity and creativity suite — Pages, Keynote, Numbers, iMovie, GarageBand and Clips for storytelling and teaching.",
    learnedJa:
      "Pages・Keynote・Numbers・iMovie・GarageBand・Clips を活用したストーリーテリングと教育設計を習得。",
    applied:
      "Brought that craft into client decks, product walkthroughs, and case-study videos that ship alongside the code.",
    appliedJa:
      "クライアント向け資料、プロダクト紹介、ケーススタディ動画の制作にそのクラフトを応用。",
  },
  {
    id: "aws-s3",
    image: certAwsS3,
    title: "AWS S3 Basics",
    titleJa: "AWS S3 基礎",
    issuer: "Coursera Project Network",
    date: "Jun 2026",
    accent: "#FF9900",
    issuerLogo: <LogoBadge bg="#FFFFFF" src={logoAws} title="AWS" />,
    learned:
      "Object storage fundamentals — buckets, versioning, lifecycle policies, IAM permissions, and secure public/private access patterns.",
    learnedJa:
      "オブジェクトストレージの基礎 — バケット、バージョニング、ライフサイクル、IAM、公開/非公開アクセスの安全設計。",
    applied:
      "Used S3 patterns for media uploads, signed URLs, and cost-aware storage tiers in production Lovable Cloud projects.",
    appliedJa:
      "メディアアップロード、署名付き URL、コスト最適化されたストレージ階層を実プロジェクトで活用。",
  },
  {
    id: "cnn-tf",
    image: certCnnTf,
    title: "Visualizing Filters of a CNN using TensorFlow",
    titleJa: "TensorFlow を用いた CNN フィルタの可視化",
    issuer: "Coursera Project Network",
    date: "Jun 2026",
    accent: "#FF6F00",
    issuerLogo: <LogoBadge bg="#FFFFFF" src={logoCoursera} title="Coursera" />,
    learned:
      "How convolutional layers learn features — gradient ascent on filter activations to reveal what each filter responds to.",
    learnedJa:
      "畳み込み層が学習する特徴を、フィルタ活性への勾配上昇で可視化する手法を理解。",
    applied:
      "Brought interpretability thinking into AI features — showing users why a model decided what it did, not just the answer.",
    appliedJa:
      "AI 機能に解釈性の視点を持ち込み、結果だけでなく根拠もユーザーに提示。",
  },
  {
    id: "azure-cv",
    image: certAzureCv,
    title: "Build a Computer Vision App with Azure Cognitive Services",
    titleJa: "Azure Cognitive Services でコンピュータビジョンアプリ構築",
    issuer: "Microsoft × Coursera",
    date: "Jun 2026",
    accent: "#0078D4",
    issuerLogo: <LogoBadge bg="#FFFFFF" src={logoMicrosoft} title="Microsoft" />,
    learned:
      "End-to-end CV pipeline on Azure — image analysis, OCR, object detection, and wiring vision APIs into a production app.",
    learnedJa:
      "Azure 上の CV パイプライン — 画像解析、OCR、物体検出、Vision API のプロダクト統合まで習得。",
    applied:
      "Designed image-intelligent UX (auto-tagging, OCR ingestion, content moderation) with managed cloud vision services.",
    appliedJa:
      "自動タグ付け、OCR 取り込み、コンテンツモデレーションなど画像知能 UX をマネージドサービスで設計。",
  },
];


const Certificates = () => {
  const { language, t } = useLanguage();
  const [open, setOpen] = useState<Cert | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

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
          {t("certificates.label")}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-3 text-3xl md:text-4xl lg:text-5xl font-bold leading-tight max-w-3xl"
        >
          {language === "ja" ? (
            <>学んだこと、<span className="text-foreground/40">そして実装したこと。</span></>
          ) : (
            <>What I've learned,<br /><span className="text-foreground/40">and shipped because of it.</span></>
          )}
        </motion.h2>
      </div>

      <div className="relative">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex gap-12 overflow-x-auto pt-8 pb-10 px-6 lg:px-12 scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {certificates.map((c, index) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.08, ease: "easeOut" }}
              whileHover={{ y: -8 }}
              className="group/cert flex-shrink-0 w-[300px] md:w-[380px]"
            >
              {/* Unified frame — same as About photo / Video / Letter */}
              <button
                onClick={() => setOpen(c)}
                aria-label={`Open ${language === "ja" ? c.titleJa : c.title}`}
                className="block w-full cursor-zoom-in"
              >
                <Frame3D className="w-full">
                  <div className="aspect-[4/3] w-full bg-white flex items-center justify-center overflow-hidden">
                    <img
                      src={c.image}
                      alt={language === "ja" ? c.titleJa : c.title}
                      loading="lazy"
                      className="w-full h-full object-contain p-2"
                    />
                  </div>
                </Frame3D>
              </button>

              {/* Below-card description */}
              <div className="mt-8 space-y-3">
                <div className="flex items-center gap-3">
                  {c.issuerLogo}
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground truncate">
                      {c.issuer} · {c.date}
                    </p>
                    <h3 className="text-lg md:text-xl font-bold leading-snug truncate">
                      {language === "ja" ? c.titleJa : c.title}
                    </h3>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-2 pt-1">
                  <div className="flex gap-3">
                    <span
                      className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: c.accent }}
                    />
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      <span className="text-foreground font-semibold">
                        {language === "ja" ? "学んだこと — " : "Learned — "}
                      </span>
                      {language === "ja" ? c.learnedJa : c.learned}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <span
                      className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-foreground"
                    />
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      <span className="text-foreground font-semibold">
                        {language === "ja" ? "実装したこと — " : "Applied — "}
                      </span>
                      {language === "ja" ? c.appliedJa : c.applied}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[9999] bg-foreground/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8 cursor-zoom-out"
            onClick={() => setOpen(null)}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpen(null);
              }}
              aria-label="Close"
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-12 h-12 rounded-full bg-background text-foreground flex items-center justify-center hover:scale-110 transition-transform z-10"
            >
              <X className="w-5 h-5" />
            </button>
            <motion.img
              src={open.image}
              alt={open.title}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-full w-auto h-auto object-contain bg-white shadow-2xl"
              style={{ maxHeight: "92vh" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Certificates;
