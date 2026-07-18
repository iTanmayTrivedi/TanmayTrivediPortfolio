import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";
import project5 from "@/assets/project-5.jpg";
import project6 from "@/assets/project-6.jpg";

export interface ProjectData {
  id: number;
  title: string;
  subtitle: string;
  heroImage: string;
  tags: string[];
  overview: string;
  techStack: { name: string; reason: string }[];
  problem: string[];
  features: string[];
  roles: { name: string; description: string }[];
  screens: { name: string; description: string }[];
  uiDecisions: string;
  apiDesign: { description: string; endpoints: string[] };
  architecture: Record<string, string>;
  challenges: { problem: string; solution: string }[];
  developmentHighlights: string[];
  database: { type: string; description: string; stores: string[] };
  security: string[];
  coreCapabilities: string[];
  screenshots: string[];
  metrics?: { value: string; label: string }[];
  videoUrl?: string;
  liveUrl: string;
  githubUrl: string;
  architecturalDiagram: { components: { name: string; description: string }[]; flow: string[] };
  limitations: string[];
  whatFailed: string[];
  improvements: string[];
  scalability: string[];
  learningPoints: string[];
}

export const projectsData: Record<string, ProjectData> = {
  // 1. TeamHub — Internal Company Management System
  "dataflow": {
    id: 1,
    title: "TeamHub",
    subtitle: "Bilingual Team & Task Management Platform",
    heroImage: project1,
    tags: ["React", "TypeScript", "Supabase", "Tailwind", "Gemini AI"],
    metrics: [
      { value: "~70%", label: "Faster dashboard load (2.4s → 0.7s)" },
      { value: "<100ms", label: "Task status update latency" },
      { value: "100%", label: "Public tables under RLS" },
      { value: "2", label: "Full locales (EN / JA)" },
      { value: "~1.5s", label: "AI summary p95 latency" },
      { value: "6+", label: "Tables secured by has_role()" },
    ],
    overview: `TeamHub is an internal team operations platform that unifies employees, departments, and task workflows into a single bilingual (English / Japanese) workspace. It is designed for small-to-mid sized organizations that have outgrown spreadsheets and chat-based task tracking but don't want the overhead of enterprise tools like Jira or Asana.

It replaces fragmented to-do lists, scattered status updates, and manual reporting with a single source of truth for who is doing what, by when, and how the team is performing — accessible in both English and Japanese to support cross-border teams.`,
    techStack: [
      { name: "React 18 + Vite", reason: "Component-driven SPA with fast HMR for building data-dense dashboards, kanban boards, and calendar views." },
      { name: "Supabase", reason: "Managed Postgres with Row Level Security, Google OAuth, realtime presence, and serverless Edge Functions for AI workloads." },
      { name: "Tailwind + shadcn/ui", reason: "Token-based design system with dark/light themes and an accessible component library tuned to a slate + amber palette." },
      { name: "TypeScript", reason: "End-to-end type safety from database types down to UI props." },
      { name: "Recharts", reason: "Lightweight charting for status, priority, and completion analytics." },
      { name: "Google Gemini (via Lovable AI Gateway)", reason: "Powers daily summaries, prioritization, and activity insights." },
    ],
    problem: [
      "Managers had no single view of team workload — status lived in chats, sheets, and email.",
      "Employees lacked clarity on what's mine, what's next, what's overdue.",
      "Manual end-of-week status reports consumed hours and were always out of date.",
      "Existing tools were English-only, creating friction for Japanese-speaking team members.",
      "No safe role separation — everyone could edit anything.",
    ],
    features: [
      "Kanban board with drag-and-drop status progression",
      "Calendar view of tasks by due date",
      "Role-based access (Admin / Manager / Employee)",
      "AI-powered daily summaries, prioritization & activity digest",
      "Realtime presence + live activity feed",
      "Bilingual UI (English / Japanese) with one-click switch",
      "Per-employee performance analytics & completion charts",
      "CSV export (UTF-8 BOM, Excel-Japanese compatible)",
    ],
    roles: [
      { name: "Admin", description: "Full access. Manages departments, employees, roles, and all tasks. Sees system-wide analytics and activity logs." },
      { name: "Manager", description: "Creates and assigns tasks across their team, views team analytics, exports reports, and reviews activity. Cannot modify role assignments." },
      { name: "Employee", description: "Sees only their own tasks. Can progress tasks forward through the workflow (pending → in progress → completed) but cannot delete or reassign work — protecting audit integrity." },
    ],
    screens: [
      { name: "Dashboard", description: "KPI cards, status/priority charts, per-employee completion, AI insights, live activity feed." },
      { name: "Kanban Board", description: "Three-column drag-and-drop with priority and due-date badges." },
      { name: "Calendar View", description: "Monthly grid of tasks color-coded by status." },
      { name: "Tasks", description: "Filterable table with bulk actions and CSV export." },
      { name: "Employees & Departments", description: "Admin/manager management screens." },
      { name: "Analytics", description: "Trend charts and team performance breakdowns." },
      { name: "Profile & Settings", description: "Theme toggle, language switch, account." },
    ],
    uiDecisions: `The interface follows a calm, minimal aesthetic — a slate base with amber accents — chosen to feel professional in both Western and Japanese enterprise contexts where visual noise is poorly received. Typography and spacing were tuned to remain comfortable in Japanese, where character density is much higher than English; layouts never break or clip when toggling languages.

Every destructive action (delete employee, remove task) requires confirmation. Form validation is inline. Transitions use a global fade-in + vertical slide-up so navigation feels continuous rather than jarring. Dark mode is a first-class citizen, not an afterthought.`,
    apiDesign: {
      description: "The backend is powered by Supabase's auto-generated PostgREST API plus custom Edge Functions for AI workloads.",
      endpoints: [
        "POST  /auth/v1/token                (email + Google OAuth)",
        "GET   /rest/v1/tasks?select=*",
        "POST  /rest/v1/tasks",
        "PATCH /rest/v1/tasks?id=eq.:id",
        "GET   /rest/v1/profiles",
        "GET   /rest/v1/user_roles",
        "GET   /rest/v1/activity_logs",
        "POST  /functions/v1/ai-insights",
        "POST  /functions/v1/due-date-reminders",
        "RPC   has_role(_user_id, _role)",
      ],
    },
    architecture: {
      frontend: "React 18 + Vite SPA, React Router, custom event bus for cross-component sync, shadcn/ui components.",
      backend: "Supabase Postgres with RLS policies on every table; SECURITY DEFINER functions (has_role) to avoid RLS recursion.",
      auth: "Supabase Auth with email/password + Google OAuth. Roles stored in a dedicated user_roles table to prevent privilege escalation.",
      realtime: "Supabase Realtime channels for presence and activity feed.",
      ai: "Supabase Edge Functions calling google/gemini-3-flash-preview through the Lovable AI Gateway.",
      deployment: "Lovable hosting + Supabase managed infrastructure.",
    },
    challenges: [
      { problem: "RLS recursion when checking roles.", solution: "Initial policies referenced the user_roles table directly inside other policies, causing infinite recursion. Solved by isolating roles in their own table and querying them through a SECURITY DEFINER function (has_role) that bypasses RLS safely." },
      { problem: "Keeping UI in sync across views without a heavy state library.", solution: "Built a lightweight custom event bus so creating a task on the Kanban board instantly updates the Dashboard, Activity Feed, and Calendar — without prop-drilling or a global store." },
      { problem: "Japanese CSV exports breaking in Excel.", solution: "Excel on Japanese Windows misreads UTF-8 without a BOM, mangling kanji. Fixed by prepending a UTF-8 BOM to every export." },
      { problem: "Network resilience.", solution: "Added linear backoff retries on transient failures so the app degrades gracefully on flaky connections." },
    ],
    developmentHighlights: [
      "Designed a token-based design system supporting dark and light themes out of the box.",
      "Shipped full English/Japanese localization with a single LanguageProvider and no third-party i18n dependency.",
      "Integrated Gemini-powered insights through Supabase Edge Functions — no API keys exposed to the client.",
      "Built a hybrid Supabase + mock-data layer so the app works in demo mode without a live backend.",
      "Custom event bus reduced wasted re-renders and removed the need for a global store.",
    ],
    database: {
      type: "PostgreSQL (Supabase)",
      description: "PostgreSQL via Supabase stores:",
      stores: ["User accounts, profiles, and departments", "user_roles (separated from profiles for security)", "Tasks with status, priority, due dates, assignees", "Activity logs and comments", "Notifications"],
    },
    security: [
      "Supabase Auth with JWT session management and refresh-token rotation.",
      "Row Level Security on every public table — no implicit access.",
      "Roles stored in a separate user_roles table and checked via a SECURITY DEFINER function to prevent recursive RLS and privilege escalation.",
      "Explicit GRANT statements per table — anonymous role has zero access.",
      "Google OAuth + email/password; no anonymous sign-ups; no auto-confirm.",
      "Server-side role validation in every Edge Function.",
      "Employees restricted to forward-only task progression.",
    ],
    coreCapabilities: [
      "Secure authentication (email/password + Google OAuth) with JWT sessions",
      "Hardened Role-Based Access Control (Admin / Manager / Employee)",
      "Persistent storage on managed PostgreSQL with RLS",
      "Realtime presence, activity feed, and cross-tab sync",
      "AI-generated daily summaries, prioritization, and activity digests",
      "Fully bilingual interface (English / Japanese)",
    ],
    screenshots: [project1, project2, project3],
    liveUrl: "https://teamhub.tanmaytrivedi.dev/",
    githubUrl: "https://github.com/iTanmayTrivedi/TeamManagementSystemJapan",
    architecturalDiagram: {
      components: [
        { name: "React SPA", description: "Vite, React Router, shadcn/ui, custom hooks" },
        { name: "Supabase Postgres", description: "Tables, RLS policies, SECURITY DEFINER functions" },
        { name: "Supabase Auth", description: "Email + Google OAuth" },
        { name: "Supabase Realtime", description: "Presence + activity broadcasts" },
        { name: "Edge Functions", description: "ai-insights, due-date-reminders" },
        { name: "Lovable AI Gateway", description: "Routes to Gemini models" },
      ],
      flow: [
        "Client → Supabase Auth (JWT issued)",
        "Client → PostgREST (/rest/v1/*) — RLS enforced per request",
        "Client ↔ Realtime channel — presence + activity events",
        "Client → Edge Function → AI Gateway → Gemini → response",
        "Scheduled Edge Function → inserts notifications for due tasks",
      ],
    },
    limitations: [
      "Single-tenant — not designed for multi-org SaaS deployment.",
      "No native mobile app (responsive web only).",
      "AI insights are read-only summaries — no agentic actions.",
      "No offline mode; requires an active connection.",
      "Notification delivery is in-app only (no email/push yet).",
    ],
    whatFailed: [
      "First attempt stored roles on the profiles table — opened a privilege-escalation path. Rewrote with a dedicated user_roles table.",
      "Tried polling for activity updates — wasteful and laggy. Switched to Supabase Realtime channels.",
      "Initial RLS policies queried roles inline and caused recursion. Replaced with a SECURITY DEFINER helper.",
      "First CSV export produced mojibake in Japanese Excel. Adding a UTF-8 BOM resolved it.",
    ],
    improvements: [
      "Email + push notifications via a transactional provider",
      "Multi-tenant architecture for SaaS deployment",
      "Mobile app (React Native) sharing the Supabase backend",
      "Granular per-department permissions beyond the three core roles",
      "AI agent that can propose task reassignments and deadline shifts, not just summarize",
    ],
    scalability: [
      "Supabase Postgres scales vertically with read replicas available when needed.",
      "Stateless Edge Functions scale horizontally on demand.",
      "Realtime channels are scoped per workspace to avoid global fan-out.",
      "Frontend assets served via CDN; aggressive code-splitting per route.",
      "AI calls are async and cached per-user/per-day to control cost.",
    ],
    learningPoints: [
      "RLS is powerful but unforgiving — designing the auth model first saves painful rewrites.",
      "Separating roles into their own table is non-negotiable for security.",
      "Realtime is almost always better than polling, but presence channels need careful cleanup to avoid leaks.",
      "Internationalization is a layout problem, not just a translation problem — Japanese reshapes every component.",
      "Edge Functions + a managed AI gateway remove an enormous amount of plumbing compared to running your own LLM proxy.",
    ],
  },

  // 2. BookFlow — Appointment & Reservation
  "shopify-plus": {
    id: 2,
    title: "BookFlow",
    subtitle: "Intelligent Appointment & Reservation Platform",
    heroImage: project2,
    tags: ["React", "TypeScript", "Supabase", "Tailwind", "Framer Motion"],
    metrics: [
      { value: "0.8s", label: "Median TTI (was 2.4s)" },
      { value: "3", label: "User roles (Customer/Staff/Admin)" },
      { value: "2", label: "Languages (EN / 日本語)" },
      { value: "100%", label: "Tables under RLS" },
      { value: "4", label: "AI Edge Functions" },
      { value: "3 clicks", label: "Booking flow (was ~6)" },
    ],
    overview: `BookFlow is a full-stack appointment management platform built for service businesses that need more than a calendar. It unifies customer booking, staff availability, and admin operations into a single, real-time workspace — and layers AI on top to predict no-shows, recommend optimal slots, and forecast demand.

The product was designed with Japanese SMBs in mind: a minimalist visual language, full Japanese localization, and a calm-precision aesthetic inspired by Zen design (the Enso favicon is a small nod to that). A unique Demo Mode lets recruiters, prospects, and stakeholders explore the entire app with realistic mock data — zero signup, zero friction.`,
    techStack: [
      { name: "React 18 + Vite", reason: "Fast SPA with sub-second HMR and component-driven UI." },
      { name: "TypeScript", reason: "End-to-end type safety from Supabase types down to UI props." },
      { name: "Tailwind + shadcn/ui", reason: "Token-based design system, fully themeable, persistent dark mode." },
      { name: "Supabase", reason: "Postgres, Auth, Row-Level Security, Storage, Edge Functions." },
      { name: "Framer Motion", reason: "Micro-interactions, page transitions, interactive auth showcase." },
      { name: "i18next", reason: "Full English / Japanese localization with runtime switching." },
      { name: "Google Gemini", reason: "LLM backend for AI assistant and predictions (via Edge Functions)." },
      { name: "TanStack Query", reason: "Server-state caching, background refetching, optimistic updates." },
    ],
    problem: [
      "Service businesses juggle bookings across phone calls, paper diaries, and disconnected SaaS tools.",
      "Customers abandon bookings when flows take more than 3 taps or require account creation upfront.",
      "Owners have no visibility into no-show patterns, peak hours, or staff utilization.",
      "Japanese SMBs are underserved by English-first booking tools that ignore local UX conventions.",
      "Recruiters reviewing portfolios need to experience a product, not read about it — most demos are locked behind signup walls.",
    ],
    features: [
      "Tripartite role system — Customer, Staff, Admin — each with a tailored dashboard.",
      "Real-time appointment lifecycle: pending → confirmed → completed / cancelled / no-show.",
      "AI-powered smart slot recommendations and no-show risk scoring.",
      "Loyalty system with points, tiers, and badges to drive customer retention.",
      "Dual-mode architecture: live Supabase backend or offline demo with mock data.",
      "Full EN / JA localization with persistent language and dark-mode preferences.",
      "Rescheduling window logic, auto-release of expired holds, business-hours validation.",
      "Google OAuth + email/password authentication with password-reset flow.",
    ],
    roles: [
      { name: "Customer", description: "Books, reschedules, cancels appointments. Earns loyalty points and badges. Rates completed services." },
      { name: "Staff", description: "Manages personal availability, views assigned appointments, marks completion or no-show." },
      { name: "Admin", description: "Configures services, business hours, and staff. Oversees all appointments, ratings, and analytics. Manages user roles." },
    ],
    screens: [
      { name: "Customer Dashboard", description: "Upcoming appointments, loyalty card, quick rebook." },
      { name: "Book Appointment", description: "Service → staff → date → slot flow with live availability." },
      { name: "My Appointments", description: "History, reschedule, cancel, rate." },
      { name: "Staff Dashboard", description: "Today's schedule, weekly view, completion actions." },
      { name: "Staff Availability", description: "Weekly recurring + ad-hoc time-off." },
      { name: "Admin Dashboard", description: "Revenue, bookings trend, no-show rate, AI demand forecast." },
      { name: "Admin Appointments / Services / Business Hours", description: "Full CRUD with validation." },
      { name: "AI Assistant", description: "Floating chatbot available across authenticated routes." },
    ],
    uiDecisions: `The interface follows a calm precision philosophy — heavily inspired by Japanese minimalism and the visual restraint of tools like Linear and Notion. Generous whitespace, a single accent teal against a deep neutral background, and motion that informs rather than decorates.

The auth screen splits into a focused left form and an interactive right-side showcase that lets visitors click through product highlights — turning a passive login page into a mini product tour. Demo Mode is surfaced as a first-class toggle, not an afterthought, because the primary visitor is a recruiter, not a customer.

Every destructive action (cancel, delete, no-show) is confirmed. Form errors appear inline. Empty states explain what to do next. Loading states use skeletons, not spinners, to preserve layout stability.`,
    apiDesign: {
      description: "The backend uses Supabase's auto-generated REST + Realtime API, extended with custom Edge Functions for AI and privileged operations.",
      endpoints: [
        "GET     /rest/v1/appointments?customer_id=eq.{uid}",
        "POST    /rest/v1/appointments",
        "PATCH   /rest/v1/appointments?id=eq.{id}",
        "GET     /rest/v1/services",
        "GET     /rest/v1/staff_availability?staff_id=eq.{uid}",
        "GET     /rest/v1/business_hours",
        "POST    /functions/v1/ai-assistant",
        "POST    /functions/v1/predict-no-show",
        "POST    /functions/v1/recommend-slot",
        "POST    /functions/v1/forecast-demand",
      ],
    },
    architecture: {
      frontend: "React 18 + TypeScript SPA, TanStack Query for server state, Framer Motion for interaction, deployed on the Lovable CDN.",
      backend: "Supabase (Postgres) with RLS policies as the primary authorization layer. Edge Functions (Deno) handle AI and privileged mutations.",
      database: "Postgres with custom enums (app_role, appointment_status), trigger-driven role provisioning, separate user_roles table.",
      auth: "Supabase Auth with email/password + Google OAuth, JWT sessions, password reset via email link.",
      deployment: "Lovable hosting with automatic preview environments per change.",
    },
    challenges: [
      { problem: "Letting recruiters experience the full app without signup.", solution: "Built a Dual-Mode architecture. A single useAuth hook abstracts the auth source, swapping live Supabase calls for an in-memory mock layer when demo mode is active." },
      { problem: "Preventing double-bookings under concurrent requests.", solution: "Server-side validation in an Edge Function that re-checks staff availability, business hours, and existing appointments within a single transaction before insert." },
      { problem: "Role-based routing without flashing the wrong dashboard.", solution: "A useAuth hook that resolves role before the first render of protected routes, paired with a skeleton loading state and a timeout-backed fallback." },
      { problem: "Loading reliability on slow connections.", solution: "Every async data fetch has an explicit timeout, a fallback UI, and (in demo mode) a local-data short-circuit so the app never gets stuck." },
    ],
    developmentHighlights: [
      "Built an interactive auth showcase that converts a login page into a mini product tour.",
      "Centralized all AI features behind versioned Supabase Edge Functions with shared error handling.",
      "Achieved persistent dark mode + language preference with zero layout shift on hydration.",
      "Designed a custom Enso brush-stroke favicon in-house to reinforce the Zen brand.",
      "Built a semantic token system in index.css so the entire palette can be re-skinned by changing ~10 CSS variables.",
    ],
    database: {
      type: "PostgreSQL (Supabase)",
      description: "Postgres (via Supabase) stores:",
      stores: ["profiles — user profile data, avatar, full name", "user_roles — role assignments (separate table for security)", "services — bookable offerings with duration & price", "staff_availability — recurring weekly schedules and exceptions", "business_hours — global open/close per weekday", "appointments — the core entity with status lifecycle", "ratings — post-completion customer feedback", "loyalty_points — accrual ledger with tier calculation", "notifications — in-app notification feed"],
    },
    security: [
      "Row-Level Security enabled on every public table — no implicit access.",
      "Roles stored in a separate user_roles table (never on the profile) to prevent client-side privilege escalation.",
      "has_role() security-definer function for safe, non-recursive policy checks.",
      "JWT session validation on every request; refresh-token rotation.",
      "Google OAuth with provider configured server-side.",
      "Password reset flow with single-use, expiring tokens.",
      "All Edge Function secrets stored in Supabase Vault, never in client code.",
      "No anonymous sign-ups; email confirmation required by default.",
    ],
    coreCapabilities: [
      "Role-based authentication (Customer / Staff / Admin) with database-trigger-driven provisioning.",
      "Real-time appointment lifecycle with auto-release of unconfirmed slots.",
      "AI assistant powered by Gemini for natural-language scheduling questions.",
      "Smart slot recommendation, no-show prediction, and demand forecasting.",
      "Bilingual UI (EN / JA) with persistent user preference.",
      "Dual-mode operation: live Supabase or fully offline demo.",
    ],
    screenshots: [project2, project3, project4],
    liveUrl: "https://bookflow.tanmaytrivedi.dev/",
    githubUrl: "https://github.com/iTanmayTrivedi/ServiceScheduleJapan",
    architecturalDiagram: {
      components: [
        { name: "React SPA", description: "TypeScript, Vite, Tailwind, shadcn/ui." },
        { name: "Supabase Postgres", description: "Primary data store with RLS." },
        { name: "Supabase Auth", description: "JWT sessions + Google OAuth." },
        { name: "Supabase Edge Functions (Deno)", description: "AI assistant, predictions, privileged mutations." },
        { name: "Google Gemini API", description: "LLM backend for AI features." },
        { name: "Supabase Storage", description: "User avatars." },
      ],
      flow: [
        "Client SPA → Supabase REST API (RLS-filtered queries).",
        "Client → Supabase Auth (JWT issue + refresh).",
        "Client → Edge Function → Gemini API → response.",
        "Database triggers → role assignment + loyalty point accrual.",
        "Realtime channels → push appointment updates to subscribed clients.",
      ],
    },
    limitations: [
      "Demo Mode data resets on refresh — by design, but not suitable for evaluating persistence.",
      "No native mobile app (responsive web only).",
      "Single-timezone scheduling — multi-timezone coordination is not yet handled.",
      "AI features depend on Gemini availability; no local fallback model.",
      "Single-tenant — each deployment serves one business.",
    ],
    whatFailed: [
      "First version used optimistic updates everywhere; race conditions caused phantom bookings — switched to server-validated inserts with rollback.",
      "Initial design embedded roles in the profiles table — refactored to a dedicated user_roles table after recognizing the privilege-escalation risk.",
      "Original AI assistant ran client-side with the API key in env vars — moved entirely to Edge Functions.",
      "First favicon was too small and visually inert — iterated to a bold edge-to-edge Enso brush stroke.",
    ],
    improvements: [
      "Multi-tenant architecture so one deployment can serve many businesses.",
      "Native iOS / Android via React Native or Capacitor.",
      "SMS / LINE notification channels (critical for the Japanese market).",
      "Calendar sync (Google / Apple / Outlook) with two-way updates.",
      "Payments + deposits to further reduce no-shows.",
      "Multi-timezone support for remote consultations.",
    ],
    scalability: [
      "Supabase Postgres scales vertically with read replicas available on demand.",
      "Edge Functions run on a global Deno runtime — low latency from any region.",
      "Static SPA assets served from CDN, cache-busted per deploy.",
      "TanStack Query client-side cache reduces redundant API calls.",
      "RLS pushes authorization into the database, removing a class of N+1 permission checks.",
    ],
    learningPoints: [
      "Security primitives matter early — separating roles from profiles from day one would have saved a painful refactor.",
      "Demo mode is a feature, not a hack — designing it as a first-class architecture unlocked a much stronger portfolio narrative.",
      "Motion should inform, not decorate — every animation in BookFlow exists to communicate state, not to look cool.",
      "Localization is more than translation — spacing, density, and tone all shift when designing for Japanese users.",
      "Edge Functions > client-side AI calls — keeping keys server-side and centralizing prompt logic paid back immediately.",
      "RLS is your best friend and worst enemy — write it carefully, test with multiple roles, and always include GRANTs.",
    ],
  },

  // 3. Rakuten Reimagined — E-commerce Admin Dashboard
  "fintrack": {
    id: 3,
    title: "Rakuten Reimagined",
    subtitle: "A Bilingual AI-Powered Marketplace Clone",
    heroImage: project3,
    tags: ["React", "TypeScript", "Tailwind", "Supabase", "Lovable AI"],
    metrics: [
      { value: "23", label: "Code-split routes" },
      { value: "9", label: "RLS-secured Postgres tables" },
      { value: "3", label: "AI Edge Functions" },
      { value: "<1.5s", label: "First contentful paint (worst case)" },
      { value: "100%", label: "TypeScript strict coverage" },
      { value: "100%", label: "EN ↔ JP key parity (type-enforced)" },
    ],
    overview: `Rakuten Reimagined is a portfolio-grade clone of Rakuten Ichiba, Japan's largest online marketplace. It recreates the high-density, deal-driven shopping experience Japanese users expect — crimson branding, glassmorphism, flash sales, point rewards, and a fully bilingual EN/JP interface.

The platform supports three distinct roles, simulated checkout with multiple payment methods, AI-driven shopping assistance, and admin BI tools — all backed by Lovable Cloud with a persistent mock-data fallback so the app stays fully functional even when the backend is unavailable.`,
    techStack: [
      { name: "React 18 + Vite", reason: "Fast, modular SPA with HMR and instant cold starts." },
      { name: "TypeScript", reason: "End-to-end type safety across UI, hooks, and Edge Functions." },
      { name: "Tailwind CSS + shadcn/ui", reason: "Token-driven design system with semantic HSL variables." },
      { name: "Supabase (Lovable Cloud)", reason: "Auth, Postgres, RLS, and Edge Functions." },
      { name: "Lovable AI Gateway", reason: "LLM access for the assistant, SEO generator, and BI insights." },
      { name: "Framer Motion + IntersectionObserver", reason: "Scroll-reveal and awwwards-level micro-interactions." },
      { name: "i18n Context", reason: "Custom bilingual provider for EN/JP toggling across the entire UI." },
    ],
    problem: [
      "Most marketplace clones stop at a static product grid — no roles, no real flows.",
      "Japanese e-commerce UX (density, vertical typography, points, coupons) is rarely modelled correctly in Western templates.",
      "AI in commerce demos is usually a bolted-on chatbot; woven it into discovery, listing, and analytics instead.",
      "Needed one project that proves both design fidelity (Rakuten's crimson, glassmorphism, banners) and engineering depth (auth, RLS, Edge Functions, i18n).",
    ],
    features: [
      "Bilingual EN/JP UI with instant switching",
      "AI shopping assistant (Lovable AI)",
      "Flash sales with live countdowns",
      "Coupons (% / fixed) + point rewards",
      "Simulated multi-method checkout",
      "Printable post-purchase receipts",
      "Seller inventory + AI description generator",
      "Admin BI: forecasts, segmentation, fraud",
    ],
    roles: [
      { name: "Customer", description: "Browse, search, wishlist, checkout, track orders, redeem points." },
      { name: "Seller", description: "Manage inventory, generate AI descriptions, view sales." },
      { name: "Admin", description: "Oversee marketplace, run BI tools, detect fraud, segment customers." },
    ],
    screens: [
      { name: "Homepage", description: "Hero carousel, categories, flash sale, recently viewed, featured grids." },
      { name: "Product Detail", description: "Gallery, bilingual reviews, ratings, recommendations." },
      { name: "Cart & Checkout", description: "Coupon input, shipping, multiple mock payment methods." },
      { name: "Order Success / Receipt", description: "Printable receipt with full transaction data." },
      { name: "Seller Dashboard", description: "Inventory CRUD + AI description generator." },
      { name: "Admin Dashboard", description: "Forecasts, recommendations, segmentation, fraud feed." },
    ],
    uiDecisions: `The UI deliberately mirrors Rakuten's high-density, crimson-and-white aesthetic instead of a generic minimal SaaS look. Product grids are intentionally tight to maximize SKU exposure, glassmorphism softens the dense layout, and the golden Yen (¥) favicon reinforces the Japanese commerce signal.

Every destructive action is confirmed via dialogs, forms validate inline, and the entire interface respects prefers-reduced-motion. Loading skeletons, scroll-reveal fades, and subtle card lifts deliver an awwwards-level feel without sacrificing the dense, deal-driven personality.`,
    apiDesign: {
      description: "The backend uses Supabase Edge Functions for AI and PostgREST for data.",
      endpoints: [
        "GET   /rest/v1/products",
        "POST  /rest/v1/orders",
        "GET   /rest/v1/order_items?order_id=eq.{id}",
        "POST  /functions/v1/ai-chat",
        "POST  /functions/v1/ai-seller-description",
        "POST  /functions/v1/ai-bi-insights",
        "GET   /rest/v1/user_roles",
        "RPC   has_role(_user_id, _role)",
      ],
    },
    architecture: {
      frontend: "React 18 + TypeScript SPA, TanStack Query for server state, Tailwind tokens for theming.",
      backend: "Supabase (Postgres + Auth + Edge Functions); every public table protected by RLS and has_role().",
      ai: "Lovable AI Gateway invoked from Edge Functions (no keys leaked to client).",
      auth: "Dual-mode: real Supabase session OR demo sign-in with persisted mock users.",
      resilience: "Persistent mock-data fallback keeps the app usable while the backend is cold-starting.",
    },
    challenges: [
      { problem: "Cold-start latency on Lovable Cloud killed first load.", solution: "Mock-data layer hydrates instantly and silently swaps to live data once warm." },
      { problem: "Full bilingual UI without bloating components.", solution: "Single useLanguage() context + keyed string maps; every label resolves at render." },
      { problem: "Privilege escalation risk in role-gated dashboards.", solution: "Roles isolated in user_roles + non-recursive has_role() SECURITY DEFINER." },
      { problem: "Dense Rakuten layout breaking on mobile.", solution: "Responsive grids, condensed header, polished hamburger drawer — desktop density preserved." },
    ],
    developmentHighlights: [
      "Shipped 9+ Edge Function-backed AI features without exposing a single key client-side.",
      "Achieved full EN/JP parity across 20+ pages with a single context provider.",
      "Implemented awwwards-grade scroll reveals via a custom IntersectionObserver hook, respecting prefers-reduced-motion.",
      "Reduced perceived load time to near-zero by hydrating from persistent mock data while the backend warms up.",
      "Built receipts, order timelines, coupons, points, flash sales, and notifications — full commerce surface area.",
    ],
    database: {
      type: "PostgreSQL (Supabase)",
      description: "PostgreSQL via Supabase stores:",
      stores: ["User profiles and a dedicated user_roles table", "Products, categories, inventory", "Orders, order items, receipts, coupons", "Reviews, ratings, browsing history", "Notifications and audit logs"],
    },
    security: [
      "Supabase Auth with JWT + refresh-token rotation",
      "Roles stored in a separate user_roles table (never on profiles) to prevent privilege escalation",
      "has_role() SECURITY DEFINER function used inside every RLS policy",
      "Explicit GRANTs per table; anon access only where intentional",
      "AI keys held server-side in Edge Functions — never exposed to the browser",
      "Input validation and confirmation dialogs on every destructive action",
    ],
    coreCapabilities: [
      "Secure auth with session + JWT refresh",
      "Role-based access (Customer / Seller / Admin)",
      "Persistent Postgres storage + mock fallback",
      "Real-time UI for cart, notifications, orders",
      "AI assistant, SEO generator, BI insights",
      "Full bilingual EN/JP across every screen",
    ],
    screenshots: [project3, project1, project2],
    liveUrl: "https://rakuten.tanmaytrivedi.dev/",
    githubUrl: "https://github.com/iTanmayTrivedi/RakutenJapan",
    architecturalDiagram: {
      components: [
        { name: "React SPA", description: "Vite, TanStack Query, Tailwind tokens" },
        { name: "Supabase Postgres", description: "Products, orders, roles, reviews" },
        { name: "Supabase Auth", description: "JWT sessions, Google OAuth, demo mode" },
        { name: "Edge Functions", description: "ai-chat (assistant / seller / BI)" },
        { name: "Lovable AI Gateway", description: "LLM provider abstraction" },
        { name: "LocalStorage", description: "Browsing history, cart, demo session, i18n preference" },
      ],
      flow: [
        "Client → React SPA (Vite-served)",
        "SPA → Supabase REST (RLS-enforced)",
        "SPA → Edge Function → Lovable AI → response",
        "SPA → Supabase Auth (sign-in, refresh, OAuth)",
        "SPA ↔ LocalStorage (cart, history, demo session, language)",
      ],
    },
    limitations: [
      "Payments are simulated — no real PSP integration.",
      "Single-region deploy; no multi-tenant or seller-side billing.",
      "Mock-data fallback can drift from live DB during long sessions.",
      "AI rate-limited by the Lovable AI Gateway quota.",
      "Search is client-side filter; no full-text index (yet).",
    ],
    whatFailed: [
      "First real-time attempt used polling — replaced with optimistic UI + on-focus refetch.",
      "Role checks via profiles.role opened a privilege-escalation hole — migrated to user_roles + has_role().",
      "Aggressive 'slow connection' page hijacked working networks — fixed to trigger only on true navigator.onLine === false.",
      "Hero carousel's heavy gradients hurt LCP — replaced with vibrant flat backgrounds and lazy image loading.",
    ],
    improvements: [
      "Add real Stripe / PayPay / Konbini payment integration",
      "Server-side full-text search (Postgres tsvector or Meilisearch)",
      "Multi-tenant seller onboarding with KYC and payouts",
      "Push notifications + PWA install for mobile shoppers",
      "Personalized homepage powered by browsing-history embeddings",
    ],
    scalability: [
      "Stateless React SPA served from CDN — horizontally infinite.",
      "Supabase Postgres with read replicas for catalog queries.",
      "Edge Functions auto-scale per request; AI calls fan out through the Lovable AI Gateway.",
      "Aggressive client-side caching via TanStack Query reduces backend load.",
      "Mock-data fallback acts as a graceful-degradation layer during traffic spikes.",
    ],
    learningPoints: [
      "Biggest UX wins came from handling the unhappy path — cold starts, offline, slow networks.",
      "A dedicated roles table + SECURITY DEFINER function is non-negotiable; never trust a role column on profiles.",
      "Design tokens (semantic HSL variables) make a bold brand like Rakuten's crimson easy to keep consistent across 50+ components.",
      "i18n is an architectural decision, not a feature — building around useLanguage() from day one made every new screen trivially bilingual.",
      "AI is most valuable when it's invisible glue (descriptions, summaries, segmentation), not just a chat bubble.",
    ],
  },

  // 4. Kaizen — Multilingual SaaS Platform
  "estate-pro": {
    id: 4,
    title: "Kaizen",
    subtitle: "AI-Powered Japanese Business Operations Suite",
    heroImage: project4,
    tags: ["React", "TypeScript", "Tailwind", "Supabase", "Gemini 1.5"],
    metrics: [
      { value: "7", label: "Production AI tools" },
      { value: "1,200+", label: "EN/JP string pairs" },
      { value: "<280KB", label: "Gzipped JS bundle" },
      { value: "~1.2s", label: "Median AI response" },
      { value: "<1s", label: "Initial route TTI" },
      { value: "100%", label: "Public tables under RLS" },
    ],
    overview: `Kaizen is a bilingual SaaS platform that helps teams operating in or with Japanese businesses handle the cultural and linguistic nuances of professional communication. It combines a multi-tenant org dashboard with a suite of AI tools — Keigo (honorific) verification, JP↔EN translation, meeting minutes generation, resume screening, sentiment analysis, and an AI email composer — under one unified Linear-inspired dark UI.

Built to replace a fragmented stack of translation apps, Google Docs templates, and ad-hoc Slack threads with a single source of truth for cross-cultural business operations.`,
    techStack: [
      { name: "React 18 + Vite", reason: "Component-based SPA with fast HMR and a type-safe architecture for complex, interactive UIs." },
      { name: "TypeScript", reason: "End-to-end type safety across UI, contexts, and Edge Functions to reduce runtime errors." },
      { name: "Tailwind + shadcn/ui", reason: "Token-driven design system using semantic HSL variables — zero raw colors in components." },
      { name: "Supabase (Cloud)", reason: "Postgres, Auth (email + Google OAuth), Row-Level Security, and Edge Functions." },
      { name: "Google Gemini 1.5-flash", reason: "LLM provider invoked exclusively from Edge Functions for every AI feature." },
      { name: "TanStack Query + Zod", reason: "Server-state caching, background refetching, and schema-validated forms." },
    ],
    problem: [
      "Foreign teams working with Japanese clients constantly mis-use Keigo, damaging trust.",
      "General-purpose translators ignore business context and politeness register.",
      "Mixed JP/EN meeting notes take hours to summarize manually.",
      "No single tool combined org-level RBAC, multi-tenancy, and JP-specific AI in one place.",
    ],
    features: [
      "Keigo Checker",
      "Bilingual JP↔EN translator",
      "AI meeting minutes generator",
      "Resume analyzer for JP market fit",
      "Sentiment analysis with emotion tags",
      "Email composer with tone presets",
      "Multi-tenant org switcher (RLS)",
      "Command palette (⌘K) + notifications",
    ],
    roles: [
      { name: "Owner", description: "Full org control, billing, member invites, audit log access." },
      { name: "Admin", description: "Manage members, configure org settings, use all AI tools." },
      { name: "Member", description: "Access AI tools, view dashboard, contribute to the phrase dictionary." },
    ],
    screens: [
      { name: "Dashboard", description: "KPI cards, weekly activity chart, recent AI usage." },
      { name: "AI Tools Hub", description: "Tabbed interface for all 7 AI features." },
      { name: "Phrase Dictionary", description: "Searchable Keigo reference library." },
      { name: "Members & Roles", description: "Invite flow and RBAC matrix." },
      { name: "Audit Log", description: "Immutable history of org-level actions." },
      { name: "Billing", description: "Simulated subscription tiers and usage meters." },
    ],
    uiDecisions: `The interface follows a Linear-inspired dark aesthetic — Space Grotesk for headings, Inter for body, semantic HSL tokens throughout (no raw colors in components). Density is balanced: dashboard surfaces breathe, while AI tool panels prioritize content. Every destructive action requires confirmation; Zod-backed forms surface inline validation. The auth screen pairs login with a live, interactive showcase panel that demonstrates real product features instead of a static marketing image.`,
    apiDesign: {
      description: "Edge Functions act as a thin, secure proxy to Gemini, keeping the API key server-side and enforcing per-user rate limits.",
      endpoints: [
        "POST /functions/v1/ai-tools { action, text }",
        "POST /functions/v1/ai-chat { messages }",
        "POST /functions/v1/seed-demo-user",
        "GET  /rest/v1/organizations (RLS-scoped)",
        "GET  /rest/v1/user_roles (security-definer has_role)",
        "GET  /rest/v1/audit_logs (org-scoped)",
      ],
    },
    architecture: {
      frontend: "React 18 SPA, TanStack Query for server state, Context providers for Auth / Org / Language.",
      backend: "Supabase Postgres with RLS on every table; Edge Functions (Deno) for AI orchestration.",
      auth: "Supabase Auth (email verification + Google OAuth) plus a parallel Demo Mode using mock users.",
      ai: "Gemini 1.5-flash, invoked exclusively from Edge Functions — never called from the browser.",
    },
    challenges: [
      { problem: "Redirect loop between Dashboard and Onboarding.", solution: "A race in OrgContext let ProtectedRoute see loading=false, organizations=[] before fetch resolved. Fixed by setting loading=true synchronously on user-auth changes and inside fetchOrgs." },
      { problem: "RLS recursion when checking admin roles.", solution: "Querying user_roles from a policy on the same table caused infinite recursion. Solved with a SECURITY DEFINER function (has_role) called from policies." },
      { problem: "Gemini key exposure risk.", solution: "Initial prototype called Gemini from the browser. Migrated to Supabase Edge Functions so the key never leaves the server." },
      { problem: "Bilingual UX without 2× maintenance.", solution: "Built a centralized translations file and LanguageContext with formatter utilities for Imperial dates and currency, so adding a string updates both locales in one place." },
    ],
    developmentHighlights: [
      "Shipped 7 AI features behind a single unified Edge Function dispatcher.",
      "Sub-second AI response perception via optimistic UI and streaming feedback.",
      "Fully token-based theme system — switching dark/light requires zero component changes.",
      "Built an interactive auth showcase panel that demos real product features instead of marketing copy.",
    ],
    database: {
      type: "PostgreSQL (Supabase)",
      description: "PostgreSQL (via Supabase) stores:",
      stores: ["profiles — user metadata", "organizations & organization_members — multi-tenant structure", "user_roles — separate roles table using an app_role enum and a has_role() security-definer function", "audit_logs — append-only org activity", "phrase_dictionary — Keigo reference entries", "notifications — per-user inbox"],
    },
    security: [
      "Roles stored in a dedicated user_roles table, accessed via SECURITY DEFINER has_role() to prevent RLS recursion and privilege escalation.",
      "RLS enabled on every public table, with explicit GRANTs to authenticated only.",
      "AI keys live in Supabase secrets — never shipped to the client.",
      "Client-side rate limiting layered on top of server enforcement.",
      "Zod validation on every form input; centralized API error handling with safe messages.",
      "Email verification required for real accounts; Demo Mode strictly sandboxed.",
    ],
    coreCapabilities: [
      "Dual authentication — real Supabase login or instant Demo Mode.",
      "Multi-tenant org system with strict data isolation.",
      "Seven production AI tools tailored to Japanese business workflows.",
      "Full EN/JP localization including Reiwa (Imperial) dates.",
      "Role-based access control with full audit trail.",
      "Real-time notifications and command palette navigation.",
    ],
    screenshots: [project4, project2, project1],
    liveUrl: "https://globaldashboard.tanmaytrivedi.dev/",
    githubUrl: "https://github.com/iTanmayTrivedi/GlobalSaaSDashboardJapan",
    architecturalDiagram: {
      components: [
        { name: "React SPA (Vite)", description: "UI & client state" },
        { name: "Supabase Auth", description: "Sessions, OAuth, email verification" },
        { name: "Supabase Postgres", description: "RLS-isolated multi-tenant data" },
        { name: "Edge Functions (Deno)", description: "AI gateway & rate limiting" },
        { name: "Gemini 1.5-flash", description: "LLM provider" },
      ],
      flow: [
        "Client → Supabase Auth (session JWT)",
        "Client → PostgREST (RLS-scoped queries)",
        "Client → Edge Function (AI request with JWT)",
        "Edge Function → Gemini API (server-side key)",
        "Edge Function → Postgres (audit log write)",
      ],
    },
    limitations: [
      "AI responses depend on Gemini availability and quotas.",
      "Demo Mode data is in-memory only — not persisted across reloads.",
      "Currency support limited to USD and JPY by design.",
      "Voice tab is browser-API dependent (no native mobile fallback).",
    ],
    whatFailed: [
      "First auth attempt redirected / straight to /dashboard — new users hit a blank screen. Switched to / → /auth.",
      "Initial OrgContext fetched without loading=true, causing a flicker loop between Dashboard and Onboarding.",
      "Tried storing roles on the profiles table — flagged as a privilege escalation risk and refactored to a dedicated user_roles table.",
      "Early AI calls happened client-side; key exposure forced a full migration to Edge Functions.",
    ],
    improvements: [
      "Real-time collaboration on meeting minutes (presence + cursors).",
      "Fine-tuned model for Keigo instead of prompt-engineered Gemini.",
      "Mobile-native app for on-the-go translation.",
      "Stripe billing integration replacing the current simulation.",
      "Voice-first meeting capture with speaker diarization.",
    ],
    scalability: [
      "Supabase scales Postgres vertically and read replicas for analytics.",
      "Edge Functions auto-scale globally on the Deno runtime.",
      "RLS keeps tenant isolation enforced at the DB layer regardless of client count.",
      "AI calls are rate-limited per user and per org to control cost.",
      "Static assets served via CDN edge.",
    ],
    learningPoints: [
      "Designing RLS policies is a first-class architecture concern, not an afterthought.",
      "Security-definer functions are essential for any non-trivial role check.",
      "A great auth screen sells the product — make it interactive, not decorative.",
      "Localization is cheaper to build in from day one than to retrofit.",
      "Race conditions in auth and context flows are the #1 source of 'blank screen' bugs.",
    ],
  },

  // 5. SysMonitor — System Monitoring & Log Dashboard
  "taskboard": {
    id: 5,
    title: "SysMonitor",
    subtitle: "Real-time Observability & AI Diagnostics",
    heroImage: project5,
    tags: ["React", "TypeScript", "Supabase", "Gemini AI"],
    metrics: [
      { value: "<800ms", label: "First dashboard paint" },
      { value: "60fps", label: "Under burst load (500 logs/s)" },
      { value: "~90%", label: "Alert-noise reduction" },
      { value: "<5s", label: "Recruiter demo time-to-screen" },
      { value: "100%", label: "TypeScript coverage" },
      { value: "2", label: "Languages (EN / 日本語)" },
    ],
    overview: `SysMonitor is a real-time observability platform that gives engineering and SRE teams a single pane of glass for system health — live CPU, memory, disk, and network metrics, structured log streaming, rule-based alerting, and AI-assisted root-cause analysis. It is designed for fast-moving teams that need to detect, diagnose, and resolve incidents before users feel them.

The platform ships in two modes: a fully live backend powered by Lovable Cloud (Postgres + Realtime + Edge Functions), and a self-contained Offline Mock Demo for recruiters and stakeholders to explore the product without an account.`,
    techStack: [
      { name: "React 18 + Vite", reason: "Fast HMR and component-driven dashboard UI built for high-frequency data updates." },
      { name: "TypeScript", reason: "End-to-end type safety across hooks, edge functions, and Supabase-generated DB types." },
      { name: "Tailwind + shadcn/ui", reason: "Design-token-based terminal aesthetic with dark/light themes." },
      { name: "Supabase", reason: "Postgres, Realtime, Edge Functions, and Auth — RLS-secured tables and serverless compute." },
      { name: "Lovable AI Gateway", reason: "Gemini 3 Flash powers log summarization, anomaly detection, and root-cause suggestions." },
      { name: "Recharts + Framer Motion", reason: "Animated time-series charts, uptime heatmaps, and smooth page transitions." },
    ],
    problem: [
      "Engineering teams juggle multiple monitoring tabs (logs, metrics, alerts) with no unified view.",
      "Alert fatigue: most tools fire on static thresholds, drowning on-call engineers in noise.",
      "Root-cause analysis is manual — engineers grep logs at 3 a.m. instead of getting a summary.",
      "Recruiters and stakeholders can rarely try a real monitoring tool without provisioning infrastructure.",
    ],
    features: [
      "Real-time Metrics — CPU, memory, disk, and network snapshots refreshed every 10 seconds.",
      "Live Log Stream — level & source filtering with full-text search across log entries.",
      "Dynamic Alerting — user-defined rules, thresholds, and incident lifecycle tracking.",
      "AI Diagnostics — automated log summarization, anomaly detection, root-cause suggestions.",
      "RBAC + RLS — Admin / Viewer / User roles enforced via has_role security-definer function.",
      "Hybrid Mode — live Supabase backend OR fully offline Mock Demo for instant exploration.",
    ],
    roles: [
      { name: "Admin", description: "Full access: configure alert rules, generate logs, acknowledge incidents, manage roles." },
      { name: "Viewer", description: "Read-only access to dashboards, logs, alerts, and incident history." },
      { name: "User", description: "Default authenticated role; access to personal views and basic monitoring." },
    ],
    screens: [
      { name: "Auth Page", description: "Claude.ai-inspired split-screen with interactive product showcase." },
      { name: "Main Dashboard", description: "Status cards, system charts, AI insights, anomalies, uptime SLA, activity feed." },
      { name: "Incidents Page", description: "Temporal grouping of alerts with MTTR analytics and timeline view." },
      { name: "Alert Rules Panel", description: "CRUD interface for thresholds and notification logic." },
      { name: "Command Palette (⌘K)", description: "Keyboard-first navigation between sections, themes, and actions." },
    ],
    uiDecisions: `The product leans into a terminal aesthetic — JetBrains Mono throughout, neon-green accents on dark surfaces, and a Seigaiha-wave + pulse-line favicon that signals "monitoring + real-time." Data density is favored over decoration, mirroring tools engineers already trust (Datadog, Grafana, Vercel). Animations are restrained to Framer Motion page transitions and pulse glows on active states so motion conveys signal, not flair.

The auth page intentionally breaks the pattern with a refined editorial split-screen to make first contact feel premium. Full English and Japanese (日本語) localization supports the Japanese recruitment context.`,
    apiDesign: {
      description: "The frontend talks to Supabase via the generated client; long-running and privileged logic lives in Edge Functions.",
      endpoints: [
        "POST /functions/v1/ai-analyze",
        "POST /functions/v1/generate-logs",
        "POST /functions/v1/demo-login",
        "GET  /rest/v1/system_logs",
        "GET  /rest/v1/metric_snapshots",
        "GET  /rest/v1/alerts",
        "POST /rest/v1/alert_rules",
        "GET  /rest/v1/incidents",
        "RPC  has_role(_user_id, _role)",
      ],
    },
    architecture: {
      frontend: "React 18 SPA — dashboards, command palette, animated charts.",
      backend: "Supabase Postgres with RLS; Edge Functions (Deno) for AI orchestration.",
      realtime: "Supabase Realtime channels for log/metric/alert subscriptions.",
      ai: "Lovable AI Gateway (Gemini 3 Flash) invoked from Edge Functions.",
      auth: "Supabase Auth (email/password + Google OAuth) with Offline Mock Demo mode.",
      deployment: "Lovable hosting + Supabase managed infrastructure.",
    },
    challenges: [
      { problem: "Recursive RLS policies on the roles table.", solution: "Naive policies checking user_roles from within user_roles policies cause infinite recursion. Solved with a SECURITY DEFINER function (has_role) that bypasses RLS for the lookup only." },
      { problem: "Avoiding alert-storm noise from raw thresholds.", solution: "Static thresholds fired dozens of times for a single underlying incident. Solved by introducing temporal grouping into an incidents table and computing MTTR from grouped events." },
      { problem: "Letting recruiters try the product without signup.", solution: "Built a fully self-contained Mock Data Engine that simulates logs, alerts, and metrics in-memory, toggled via an Offline Demo mode at the auth screen." },
    ],
    developmentHighlights: [
      "Built a hybrid Live/Offline architecture so the project is demoable in under 5 seconds with zero setup.",
      "Implemented a has_role SECURITY DEFINER pattern that eliminated an entire class of RLS recursion bugs.",
      "Integrated the Lovable AI Gateway (Gemini 3 Flash) for structured JSON diagnostics — no API keys required.",
      "Designed a distinctive terminal aesthetic with a custom Seigaiha-wave + pulse-line favicon and full EN/JA localization.",
      "Shipped a command palette (⌘K) for keyboard-first navigation, modeled on Linear and Raycast.",
    ],
    database: {
      type: "PostgreSQL (Supabase)",
      description: "PostgreSQL (via Supabase) stores:",
      stores: ["profiles — user metadata", "user_roles — RBAC role assignments (separate table to prevent privilege escalation)", "system_logs — timestamped, leveled, source-tagged log entries", "metric_snapshots — CPU/memory/disk/network samples", "alerts — fired incidents with severity, metric, threshold, acknowledgement", "alert_rules — user-defined thresholds and conditions", "incidents — temporally grouped alerts with MTTR data"],
    },
    security: [
      "Roles stored in a dedicated user_roles table — never on profiles (prevents privilege escalation).",
      "has_role(_user_id, _role) security-definer function used by all RLS policies (no recursion).",
      "RLS enabled on every public-schema table with explicit GRANTs for authenticated and service_role.",
      "JWT validation in edge functions before any privileged action.",
      "No client-side admin checks — every gated action is re-verified server-side.",
    ],
    coreCapabilities: [
      "Secure authentication with email/password and Google OAuth.",
      "RBAC (Admin / Viewer / User) enforced at the database layer via RLS.",
      "Real-time metric, log, and alert streams via Supabase Realtime.",
      "AI-powered diagnostics: summarization, anomaly detection, predictive alerts.",
      "CSV export and reportable activity feed for audits.",
      "Hybrid architecture — instantly switch between Live and Offline Demo.",
    ],
    screenshots: [project5, project1, project3],
    liveUrl: "https://sysmonitor.tanmaytrivedi.dev/",
    githubUrl: "https://github.com/iTanmayTrivedi/SystemMonitoringJapan",
    architecturalDiagram: {
      components: [
        { name: "React SPA", description: "Dashboards, command palette, animated charts." },
        { name: "Supabase Postgres", description: "Primary data store with RLS." },
        { name: "Supabase Realtime", description: "Log/metric/alert subscriptions." },
        { name: "Edge Functions (Deno)", description: "ai-analyze, generate-logs, demo-login." },
        { name: "Lovable AI Gateway", description: "Gemini 3 Flash inference." },
        { name: "Mock Data Engine", description: "In-browser substitute for Offline Demo mode." },
      ],
      flow: [
        "Client → Supabase Auth (email/password or Google OAuth).",
        "Client → Postgres via PostgREST (RLS-filtered reads/writes).",
        "Postgres → Realtime channel → live dashboard updates.",
        "Client → Edge Function ai-analyze → Lovable AI Gateway → structured JSON diagnostics.",
        "Offline Mode: Client ↔ Mock Data Engine (no network calls).",
      ],
    },
    limitations: [
      "Metrics are synthetic samples, not real agent telemetry (no node-exporter integration yet).",
      "Alert rules support thresholds but not multi-condition boolean expressions.",
      "AI analysis is on-demand; no scheduled background runs.",
      "Single-workspace architecture — no multi-tenant org separation.",
    ],
    whatFailed: [
      "Initially stored roles on the profiles table — rewrote into a dedicated user_roles table after recognizing the privilege-escalation risk.",
      "First alerting implementation fired on every metric tick, flooding the UI — replaced with rule-evaluation + incident grouping.",
      "Early auth page was a generic centered card — redesigned into a Claude-style split screen after it felt indistinguishable from every other SaaS login.",
    ],
    improvements: [
      "Real agent ingestion (Prometheus / OpenTelemetry) instead of synthetic samples.",
      "Multi-tenant workspaces with org-level RBAC.",
      "Slack / PagerDuty / webhook notification channels for alerts.",
      "Scheduled AI digests (daily/weekly health reports emailed to admins).",
      "Mobile-first incident view with push notifications.",
    ],
    scalability: [
      "Supabase Postgres scales vertically and horizontally with read replicas.",
      "Edge Functions run globally on Deno Deploy — no cold-start concerns for AI calls.",
      "Realtime channels are partitioned per table; filters live server-side to minimize fan-out.",
      "Frontend is a static SPA served from a CDN; heavy work runs in the database or at the edge.",
    ],
    learningPoints: [
      "RLS done right is your security model. A single has_role SECURITY DEFINER function eliminated entire categories of bugs.",
      "Demoability is a product feature. Adding an Offline Mock mode tripled how often non-technical reviewers actually opened the app.",
      "Real-time UIs need backpressure. Throttling Realtime updates and batching renders kept the dashboard responsive under burst load.",
      "AI is most useful when constrained. Forcing Gemini to respond with a strict JSON schema turned a chatbot into a reliable diagnostic component.",
      "Design tokens save weeks. Committing to semantic HSL tokens made the dark/light theme switch trivial across 30+ components.",
    ],
  },

  // 6. JapanPath (also featured as LYNT) — Japan Career Path Platform
  "mediconnect": {
    id: 6,
    title: "JapanPath",
    subtitle: "Bilingual Relocation & Career OS for International Talent (the LYNT case study)",
    heroImage: project6,
    tags: ["React 18", "TypeScript", "Supabase", "Gemini 2.5 Flash", "Framer Motion", "AI Gateway"],
    metrics: [
      { value: "14+", label: "Personalized onboarding routes" },
      { value: "30+", label: "Visa types modeled" },
      { value: "20+", label: "Production screens" },
      { value: "0→100", label: "Readiness Score engine" },
      { value: "<220KB", label: "Initial JS (gzip)" },
      { value: "<1.5s", label: "TTI on mid-range Android" },
    ],
    overview: `JapanPath (shipped as LYNT) is a production-grade, bilingual (EN / Japanese) decision-and-execution platform that helps international students, engineers and professionals plan, prepare for and execute their move to Japan — combining personalized onboarding, a JIS-compliant Rirekisho & Shokumukirekisho builder, a 30+ visa eligibility engine, a Decision Engine, a Cost-of-Living calculator and AI-assisted resume tooling powered by the Lovable AI Gateway.

Built solo as a B.Tech final-year project to demonstrate startup-grade product execution for Japan-based hiring managers: every flow is mobile-first, every public table is locked down with Row Level Security, and the design system is fully token-driven (Vermillion #E94E1B / Slate #1F2937, Inter + Noto Sans JP). 20+ routes · ~9,500 LOC TypeScript · 6 Postgres tables with RLS · 2 Edge Functions · 4 resume templates (JIS B5 / A4 / Soufujou cover letter). Manual research that previously consumed 40–60 hours per applicant is compressed into a single guided session.`,
    techStack: [
      { name: "React 18 + TypeScript + Vite", reason: "Type-safe SPA with fast HMR." },
      { name: "Tailwind CSS + shadcn/ui", reason: "Design-token system, Japanese palette (Vermillion #E94E1B / Sumi Slate / Washi)." },
      { name: "Framer Motion", reason: "Fluid micro-interactions, sakura petals, page transitions." },
      { name: "Lovable Cloud (Supabase)", reason: "Postgres + Auth + Edge Functions + Storage with RLS-protected data." },
      { name: "Lovable AI Gateway", reason: "Resume polishing, ATS review, JD-tailoring, cover-letter generation." },
      { name: "React Context + LocalStorage", reason: "Offline-first state with cloud sync (JapanPathContext, ResumeFormContext)." },
    ],
    problem: [
      "Moving to Japan means stitching together 20+ disconnected sources — immigration sites, JLPT blogs, salary aggregators, housing forums.",
      "Most applicants use the wrong resume format. Japanese companies expect 履歴書 (Rirekisho) on JIS B5/A4 with photo, eras (年号), and 自己PR — Western CVs get silently rejected.",
      "Visa eligibility rules are confusing; people pay agents ¥200K+ for advice that can be deterministic.",
      "No product tells a user: 'Given your degree, country, savings, and JLPT level — here's your fastest path, in order, with which documents.'",
    ],
    features: [
      "Personalized Onboarding Engine — 14+ branching routes by goal (Study / Work / PR / Long-term).",
      "Readiness Score (0–100) with skill-gap breakdown.",
      "Visa Intelligence — 30+ visa types, country-aware eligibility checker.",
      "Decision Engine — compare paths by cost, time, success probability.",
      "Bilingual Rirekisho + Shokumukirekisho builder — JIS-compliant, AI polish, ATS review, JD-tailoring, version control, cover letters.",
      "Mission Mode — gamified daily/weekly coaching tasks.",
      "Learning System — JLPT N5→N1 + technical roadmaps with progress.",
      "Education Finder — universities/language schools with tiering & JLPT cutoffs.",
      "Job Portal — visa-sponsoring employers, English-OK filter, hiring calendar.",
      "Relocation Toolkit — cost-of-living, housing, document checklist, cultural prep.",
      "Community & News with visa-categorized impact badges.",
      "Customizable Profile — premium banners (Seigaiha, Asanoha), avatar, theme picker.",
    ],
    roles: [
      { name: "Explorer", description: "Default user; onboarding → readiness → dashboard." },
      { name: "Applicant", description: "Uses resume builder, job tracker, mission mode." },
      { name: "Authenticated Member", description: "Cloud-synced profile, saved resume versions, application tracker." },
      { name: "Future: Mentor / Recruiter", description: "Reviewing role for community layer." },
    ],
    screens: [
      { name: "Onboarding", description: "Dynamic 5–9 steps." },
      { name: "Dashboard", description: "Readiness Score + next missions." },
      { name: "Rirekisho Builder", description: "Edit / Preview / AI Review / Tailor / Versions." },
      { name: "Decision Engine", description: "Visa Info + Eligibility Checker." },
      { name: "University & Job Portal", description: "Visa-sponsoring employers and language schools." },
      { name: "Cost of Living, Housing, Document Checklist", description: "Relocation toolkit." },
      { name: "Profile", description: "Custom banner & theme." },
    ],
    uiDecisions: `The design language is "Japanese minimalism, startup polish." Vermillion accents over Sumi slate, Noto Sans JP paired with Inter, generous whitespace, sakura petals reserved for moments of delight (not decoration). Tables collapse to cards on mobile for true mobile-first usability. Empty states are proactive (suggest the next action), skeletons replace spinners, and every destructive action requires confirmation. The Rirekisho preview mirrors a real printed JIS form down to the 30×40 mm photo box and 年号-era date column, so users trust what they'll send.`,
    apiDesign: {
      description: "The SPA talks to Supabase Edge Functions and PostgREST endpoints for auth, profile data, and AI assistance.",
      endpoints: [
        "POST /auth/v1/signup",
        "POST /auth/v1/token?grant_type=password",
        "GET  /rest/v1/profiles?id=eq.{uid}",
        "PATCH /rest/v1/profiles?id=eq.{uid}",
        "GET  /rest/v1/resume_versions?user_id=eq.{uid}",
        "POST /rest/v1/resume_versions",
        "POST /functions/v1/resume-assist  // polish | review | tailor | cover",
        "GET  /rest/v1/applications",
        "GET  /storage/v1/object/avatars/{path}",
      ],
    },
    architecture: {
      frontend: "React 18 + Vite SPA, Tailwind design tokens, Framer Motion, React Context state.",
      backend: "Supabase Postgres with Row Level Security on every public table.",
      edge: "resume-assist (Deno) calling Lovable AI Gateway.",
      auth: "Supabase Auth (email + Google OAuth), JWT in httpOnly storage.",
      storage: "Buckets for avatars, banners, resume photos.",
      deployment: "Vercel + custom domain, CDN-cached assets.",
    },
    challenges: [
      { problem: "Modeling Japanese resume format faithfully.", solution: "Western form libraries don't understand 年号 (Reiwa/Heisei eras) or merged Education+Work chronology. Built japanDate.ts to convert Gregorian dates to era + 年号 handling, with a single merged history table pixel-aligned to printed JIS B5." },
      { problem: "Personalization without server round-trips.", solution: "Unified JapanPathContext + localStorage hydration, then debounced cloud sync for signed-in users. Instant offline, durable online." },
      { problem: "Safe role checks without RLS recursion.", solution: "Moved to a dedicated user_roles table + has_role() SECURITY DEFINER function, bypassing RLS cleanly and avoiding infinite-recursion policies." },
      { problem: "AI that produces business-grade keigo, not LLM mush.", solution: "Edge Function builds tight context (name, latest role, skills, JLPT) and constrains output length & register per field. Result: copy a hiring manager would actually read." },
    ],
    developmentHighlights: [
      "Shipped a complete JIS-compliant Rirekisho engine (photo box, eras, status indicators).",
      "ATS scoring + JD-tailoring Edge Function returning structured JSON in <2s.",
      "Token-only design system — zero hard-coded colors, instant dark-mode readiness.",
      "14+ premium banner templates with authentic Japanese patterns (Seigaiha, Asanoha, Sumi ink, Washi).",
      "Mobile-first refactor: every table converts to a card grid under 768 px.",
      "All state auto-persists; users never lose progress on refresh.",
    ],
    database: {
      type: "PostgreSQL (Supabase)",
      description: "PostgreSQL via Supabase. Every public table has RLS scoped to auth.uid() and explicit GRANTs.",
      stores: ["profiles — display name, bio, avatar_url, banner_url, banner_theme", "user_roles — separate roles table with app_role enum and has_role() SECURITY DEFINER", "resume_versions — named drafts of full resume JSON, per user", "applications — job tracker rows", "missions_progress — gamified coaching state", "onboarding_state — JapanPathContext snapshot"],
    },
    security: [
      "Supabase Auth with email confirmation and Google OAuth.",
      "Row Level Security on every public table — never trust the client.",
      "Roles in a separate user_roles table behind has_role() SECURITY DEFINER (prevents privilege escalation).",
      "httpOnly JWT session handling via Supabase client.",
      "Image upload validation (≤2 MB, type-checked) for resume photo / avatar / banner.",
      "AI Edge Function rate-limited and key-isolated via Lovable AI Gateway — no client-side API keys.",
    ],
    coreCapabilities: [
      "Personalized onboarding routing across 14+ scenarios.",
      "Real-time Readiness Score with skill-gap explainer.",
      "JIS-compliant bilingual Rirekisho + Shokumukirekisho builder.",
      "AI-assisted writing: polish, ATS review (0–100), JD tailor, cover letter.",
      "Deterministic visa eligibility engine across 30+ visa types.",
      "Cloud-synced multi-version resumes with JSON import/export.",
      "Cost-of-living, housing, and document-checklist tooling.",
      "Mission Mode gamified coaching with daily/weekly tasks.",
    ],
    screenshots: [project6, project2, project4],
    liveUrl: "https://lynt.tanmaytrivedi.dev/",
    githubUrl: "https://github.com/iTanmayTrivedi/LyntJapan",
    architecturalDiagram: {
      components: [
        { name: "React SPA", description: "Vite + Tailwind + Framer Motion." },
        { name: "Supabase Postgres", description: "Primary store with RLS." },
        { name: "Supabase Auth", description: "Email + Google OAuth." },
        { name: "Supabase Storage", description: "Avatars / banners / resume photos." },
        { name: "Edge Function resume-assist", description: "Deno runtime." },
        { name: "Lovable AI Gateway", description: "Groq / GPT routing." },
      ],
      flow: [
        "Browser → Lovable CDN → React SPA.",
        "SPA → Supabase Auth (JWT).",
        "SPA → PostgREST (RLS-filtered CRUD) for profiles, resumes, applications.",
        "SPA → Storage API for image upload/download.",
        "SPA → Edge Function → AI Gateway → LLM → structured JSON back to UI.",
      ],
    },
    limitations: [
      "Visa engine reflects publicly available rules; not legal advice.",
      "Job and university listings are curated, not real-time scraped.",
      "AI features depend on Lovable AI Gateway availability/quota.",
      "No native mobile app yet — PWA-style only.",
      "Single-language UI per session (EN with JP labels); full localization pending.",
    ],
    whatFailed: [
      "First attempt at a 3D mascot canvas (Three.js) tanked mobile FPS — replaced with an SVG/Framer-motion mascot.",
      "A standalone 'LifeQuest' mini-game felt off-brand — removed in favor of focused Mission Mode.",
      "Early auth page used a generic split-card — rebuilt Claude-style (left auth panel, right interactive showcase) for conversion.",
      "Storing roles on profiles had to be ripped out and replaced with a dedicated user_roles + has_role() pattern after a security review.",
    ],
    improvements: [
      "Real-time job feed via official partners (HelloWork API, Daijob).",
      "Native iOS/Android wrappers + push notifications for visa deadlines.",
      "Mentor marketplace — connect with people already in Japan.",
      "Full JP UI localization with language switcher.",
      "Document OCR — upload passport/degree to auto-fill the Rirekisho.",
      "Integrated payment for premium AI quota & 1:1 expert reviews.",
    ],
    scalability: [
      "Stateless React SPA served from CDN — horizontally infinite.",
      "Supabase Postgres with read replicas for heavy analytics queries.",
      "Edge Functions auto-scale per region (low cold-start Deno runtime).",
      "AI calls funneled through Lovable AI Gateway with caching of identical prompts.",
      "Image assets resized & served via Supabase Storage transformations + CDN cache.",
    ],
    learningPoints: [
      "RLS is non-negotiable — every new table needs policies and GRANTs in the same migration, or the app silently 401s in production.",
      "Roles belong in their own table behind a SECURITY DEFINER function; otherwise you ship a privilege-escalation bug.",
      "Design tokens > utility classes — committing to semantic HSL variables made dark-mode and theme variants nearly free.",
      "Cultural fidelity is a feature — Japanese users immediately trusted the product once the Rirekisho matched the real JIS form, era column included.",
      "AI is best when scoped: short context, strict output shape, per-field tone rules — generic 'rewrite this' produces unusable Japanese.",
      "Mobile-first means redesigning tables as cards, not just shrinking them.",
    ],
  },
};
