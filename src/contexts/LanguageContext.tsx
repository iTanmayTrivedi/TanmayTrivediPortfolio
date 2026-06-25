import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "en" | "ja";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};

// Translations
const translations: Record<string, Record<Language, string>> = {
  // Header
  "nav.projects": { en: "Projects", ja: "プロジェクト" },
  "nav.skills": { en: "Skills", ja: "スキル" },
  "nav.resume": { en: "Resume", ja: "履歴書" },
  "nav.about": { en: "About Me", ja: "自己紹介" },
  "nav.contact": { en: "Contact", ja: "お問い合わせ" },
  "nav.startProject": { en: "Open to Opportunities", ja: "採用をご検討中の企業様へ" },

  // Hero
  "hero.fullStack": { en: "Full Stack", ja: "フルスタック" },
  "hero.developer": { en: "Developer", ja: "デベロッパー" },
  "hero.englishResume": { en: "English Resume", ja: "英語履歴書" },
  "hero.japaneseResume": { en: "履歴書", ja: "履歴書" },
  "hero.scroll": { en: "Scroll", ja: "スクロール" },

  // Projects
  "projects.title": { en: "Selected Work", ja: "主な実績" },
  "projects.viewAll": { en: "View All", ja: "すべて見る" },

  // About
  "about.label": { en: "About Me", ja: "自己紹介" },
  "about.description1": {
    en: "Full-Stack Developer focused on building reliable and maintainable web applications.",
    ja: "信頼性が高く保守性に優れたウェブアプリケーションの構築に注力するフルスタック開発者。",
  },
  "about.description2": {
    en: "I develop end-to-end systems with attention to clean architecture, API design, and structured database development. My projects include internal management systems and SaaS dashboards with authentication and deployment workflows.",
    ja: "クリーンアーキテクチャ、API設計、構造化されたデータベース開発に注意を払いながら、エンドツーエンドのシステムを開発しています。プロジェクトには、認証やデプロイワークフローを備えた社内管理システムやSaaSダッシュボードが含まれます。",
  },
  "about.description3": {
    en: "I am seeking an opportunity to grow within a collaborative engineering team and contribute to long-term product development.",
    ja: "協力的なエンジニアリングチームの中で成長し、長期的なプロダクト開発に貢献する機会を求めています。",
  },
  "about.floatingLabel": { en: "Developer & Designer", ja: "開発者 & デザイナー" },

  // Skills
  "skills.label": { en: "Expertise", ja: "専門知識" },
  "skills.title1": { en: "Skills &", ja: "スキル &" },
  "skills.title2": { en: "Technologies", ja: "テクノロジー" },
  "skills.description": {
    en: "A comprehensive toolkit refined over 8+ years of building products that scale. Hover over each skill to explore.",
    ja: "8年以上のスケーラブルなプロダクト開発で磨き上げた包括的なツールキット。各スキルにマウスオーバーしてご覧ください。",
  },
  "skills.fullStackProjects": { en: "Full-Stack Projects", ja: "フルスタックプロジェクト" },
  "skills.technologiesLearned": { en: "Technologies Learned", ja: "習得テクノロジー" },
  "skills.restApisBuilt": { en: "REST APIs Built", ja: "構築したREST API" },
  "skills.continuousImprovement": { en: "Continuous Improvement", ja: "継続的改善" },
  "skills.frontend": { en: "Frontend", ja: "フロントエンド" },
  "skills.backend": { en: "Backend", ja: "バックエンド" },
  "skills.devops": { en: "DevOps", ja: "デベロッパーオプス" },
  "skills.design": { en: "Design", ja: "デザイン" },

  // Services
  "services.label": { en: "Services", ja: "サービス" },
  "services.description": {
    en: "I combine deep technical expertise with a designer's eye to build products that are both powerful and beautiful.",
    ja: "深い技術的専門知識とデザイナーの目を組み合わせて、パワフルで美しいプロダクトを構築します。",
  },
  "services.frontendDev": { en: "Frontend Development", ja: "フロントエンド開発" },
  "services.backendDev": { en: "Backend Development", ja: "バックエンド開発" },
  "services.databaseArch": { en: "Database Architecture", ja: "データベース設計" },
  "services.apiDev": { en: "API Development", ja: "API開発" },
  "services.cloudInfra": { en: "Cloud Infrastructure", ja: "クラウドインフラ" },
  "services.devopsCicd": { en: "DevOps & CI/CD", ja: "DevOps & CI/CD" },
  "services.uiuxDesign": { en: "UI/UX Design", ja: "UI/UXデザイン" },
  "services.techConsulting": { en: "Technical Consulting", ja: "技術コンサルティング" },

  // Testimonials
  "testimonials.label": { en: "Testimonials", ja: "お客様の声" },
  "certificates.label": { en: "Certificates & Learnings", ja: "資格と学び" },

  // Recognition
  "recognition.label": { en: "Engineering Focus", ja: "エンジニアリング" },
  "recognition.githubStars": { en: "GitHub Stars", ja: "GitHubスター" },
  "recognition.projectsCompleted": { en: "Projects Completed", ja: "完了プロジェクト" },
  "recognition.yearsExperience": { en: "Years Experience", ja: "年の経験" },
  "recognition.happyClients": { en: "Happy Clients", ja: "満足クライアント" },
  "recognition.openSource": { en: "Open Source", ja: "オープンソース" },

  // Contact
  "contact.label": { en: "Get in touch", ja: "お問い合わせ" },
  "contact.lets": { en: "Let's build", ja: "一緒に" },
  "contact.something": { en: "something", ja: "何か素晴らしい" },
  "contact.amazing": { en: "amazing.", ja: "ものを作ろう。" },
  "contact.email": { en: "Email", ja: "メール" },
  "contact.location": { en: "Location", ja: "所在地" },
  "contact.socials": { en: "Socials", ja: "ソーシャル" },
  "contact.copied": { en: "Copied!", ja: "コピーしました！" },
  "contact.clickToCopy": { en: "Click to copy", ja: "クリックでコピー" },
  "contact.formTitle": { en: "Send me a message", ja: "メッセージを送る" },
  "contact.name": { en: "Your Name", ja: "お名前" },
  "contact.namePlaceholder": { en: "John Doe", ja: "田中太郎" },
  "contact.emailField": { en: "Your Email", ja: "メールアドレス" },
  "contact.emailPlaceholder": { en: "john@company.com", ja: "tanaka@company.com" },
  "contact.company": { en: "Company", ja: "会社名" },
  "contact.companyPlaceholder": { en: "Acme Inc.", ja: "株式会社〇〇" },
  "contact.subject": { en: "Subject", ja: "件名" },
  "contact.subjectPlaceholder": { en: "Job Opportunity / Collaboration", ja: "採用 / コラボレーション" },
  "contact.message": { en: "Message", ja: "メッセージ" },
  "contact.messagePlaceholder": { en: "Tell me about the opportunity...", ja: "お話をお聞かせください..." },
  "contact.send": { en: "Send Message", ja: "送信する" },
  "contact.sending": { en: "Sending...", ja: "送信中..." },
  "contact.sent": { en: "Message Sent!", ja: "送信完了！" },
  "contact.sentDesc": { en: "Thanks for your courteous message — I'll reply within 24 hours.", ja: "ご丁寧なメッセージをありがとうございます。24時間以内にご返信いたします。" },

  // Footer
  "footer.builtWith": { en: "Built with React, TypeScript & Framer Motion", ja: "React、TypeScript、Framer Motionで構築" },
  "footer.backToTop": { en: "Back to top ↑", ja: "トップに戻る ↑" },

  // Project Detail
  "projectDetail.backToProjects": { en: "Back to Projects", ja: "プロジェクトに戻る" },
  "projectDetail.project": { en: "Project", ja: "プロジェクト" },
  "projectDetail.overview": { en: "Overview", ja: "概要" },
  "projectDetail.projectOverview": { en: "Project Overview", ja: "プロジェクト概要" },
  "projectDetail.motivation": { en: "Motivation", ja: "動機" },
  "projectDetail.problemMotivation": { en: "Problem & Motivation", ja: "課題と動機" },
  "projectDetail.features": { en: "Features", ja: "機能" },
  "projectDetail.keyFeatures": { en: "Key Features", ja: "主な機能" },
  "projectDetail.usersScreens": { en: "Users & Screens", ja: "ユーザーと画面" },
  "projectDetail.userRolesScreens": { en: "User Roles & Screens", ja: "ユーザーロールと画面" },
  "projectDetail.userRoles": { en: "User Roles", ja: "ユーザーロール" },
  "projectDetail.keyScreens": { en: "Key Screens", ja: "主な画面" },
  "projectDetail.design": { en: "Design", ja: "デザイン" },
  "projectDetail.uiuxDecisions": { en: "UI & UX Decisions", ja: "UI・UXの決定" },
  "projectDetail.architecture": { en: "Architecture", ja: "アーキテクチャ" },
  "projectDetail.systemArchitecture": { en: "System Architecture", ja: "システムアーキテクチャ" },
  "projectDetail.challenges": { en: "Challenges", ja: "課題" },
  "projectDetail.technicalChallenges": { en: "Technical Challenges & Solutions", ja: "技術的課題と解決策" },
  "projectDetail.challenge": { en: "Challenge", ja: "課題" },
  "projectDetail.solution": { en: "Solution:", ja: "解決策：" },
  "projectDetail.gallery": { en: "Gallery", ja: "ギャラリー" },
  "projectDetail.screenshots": { en: "Screenshots", ja: "スクリーンショット" },
  "projectDetail.links": { en: "Links", ja: "リンク" },
  "projectDetail.projectLinks": { en: "Project Links", ja: "プロジェクトリンク" },
  "projectDetail.liveDemo": { en: "Live Demo", ja: "ライブデモ" },
  "projectDetail.viewOnGithub": { en: "View on GitHub", ja: "GitHubで見る" },
  "projectDetail.thanksForReading": { en: "Thanks for reading", ja: "ご覧いただきありがとうございます" },
  "projectDetail.interestedInWorking": { en: "Interested in working together?", ja: "一緒に働きませんか？" },
  "projectDetail.getInTouch": { en: "Get in touch", ja: "お問い合わせ" },
  "projectDetail.notFound": { en: "Project not found", ja: "プロジェクトが見つかりません" },

  // Preloader
  "preloader.loading": { en: "Loading", ja: "読み込み中" },
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("preferredLanguage");
    return (saved as Language) || "en";
  });

  useEffect(() => {
    localStorage.setItem("preferredLanguage", language);
    document.documentElement.lang = language;
    
    // Apply Apple font for English, Inter Tight for Japanese
    if (language === "en") {
      document.body.classList.add("font-english");
      document.body.classList.remove("font-japanese");
    } else {
      document.body.classList.add("font-japanese");
      document.body.classList.remove("font-english");
    }
  }, [language]);

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
