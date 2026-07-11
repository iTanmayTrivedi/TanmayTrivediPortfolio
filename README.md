<!--
  Repository README — Tanmay Trivedi · Portfolio
  Lives at the root of this project. Renders on the GitHub repo page.
-->

<div align="center">

<kbd>　作 品 集　</kbd>

# Tanmay Trivedi &nbsp;·&nbsp; Portfolio
### 田丸 環 &nbsp;·&nbsp; *Product Engineering Portfolio*

<sub>A bilingual (EN&nbsp;/&nbsp;日本語), motion-driven portfolio built with the same care as the products it showcases.</sub>

<br/>

[![Live](https://img.shields.io/badge/⌘_Live_Site-0A0A0A?style=for-the-badge&labelColor=0A0A0A)](https://itanmaytrivedi.com)
[![Stack](https://img.shields.io/badge/React_18-1A1A1A?style=for-the-badge&labelColor=1A1A1A&logo=react&logoColor=61DAFB)](#)
[![Vite](https://img.shields.io/badge/Vite-1A1A1A?style=for-the-badge&labelColor=1A1A1A&logo=vite&logoColor=FFD028)](#)
[![Tailwind](https://img.shields.io/badge/Tailwind-1A1A1A?style=for-the-badge&labelColor=1A1A1A&logo=tailwindcss&logoColor=38BDF8)](#)
[![Lovable Cloud](https://img.shields.io/badge/Lovable_Cloud-0A0A0A?style=for-the-badge&labelColor=0A0A0A)](#)

</div>

<br/>

---

<div align="center"><sub>　序　&nbsp;·&nbsp; OVERVIEW　</sub></div>

A minimalist, high-contrast black-and-white portfolio that pairs **Apple-keynote restraint** with **Japanese typographic detail**. Designed and built solo — from the empty `package.json` to the live URL — to function as both a portfolio and a calling card for Japanese recruiters.

```
Design language   ·   Minimal · Bold · 余白 (negative space)
Typography        ·   Inter Tight  +  Noto Sans JP · -apple-system
Motion            ·   Framer Motion · Three.js (R3F)
Language          ·   EN ↔ JP toggle, persisted, full UI parity
```

<br/>

---

<div align="center"><sub>　壱　&nbsp;·&nbsp; HIGHLIGHTS　/　見 所　</sub></div>

<br/>

<table align="center" width="92%">
<tr>
<td valign="top" width="50%">

#### ▮ &nbsp; Bilingual UI
EN ↔ JP toggle persisted via `LanguageContext` + `localStorage`. Every section — hero, projects, case studies, contact — has full parity.

</td>
<td valign="top" width="50%">

#### ▮ &nbsp; Sumi-e Hero
3D canvas with Ensō circles, Sakura petals, an interactive terminal, and rotating tech-skill text on a 3.5s cadence.

</td>
</tr>
<tr>
<td valign="top" width="50%">

#### ▮ &nbsp; Case-Study System
A 19-section engineering template with side-by-side device mockups — used across six bilingual case studies.

</td>
<td valign="top" width="50%">

#### ▮ &nbsp; LYNT Founder Section
Apple-keynote glass surfaces, animated readiness score, edge-fade marquee, and aurora-lit metric rails.

</td>
</tr>
<tr>
<td valign="top" width="50%">

#### ▮ &nbsp; Resume Access
English Resume + 履歴書 (Rirekisho) wired into the hero & contact section with shimmer-gradient CTAs.

</td>
<td valign="top" width="50%">

#### ▮ &nbsp; Considered Details
Living-cosmos brand logo, dual-timezone clock (IST ↔ JST), preloader with glitchy 「創」 kanji, footer wave hover.

</td>
</tr>
</table>

<br/>

---

<div align="center"><sub>　弐　&nbsp;·&nbsp; STACK　/　道 具　</sub></div>

<br/>

<table align="center" width="92%">
<tr>
<td valign="top" width="25%"><sub>**Frontend**</sub><br/><sub>React 18 · TypeScript 5 · Vite 5 · Tailwind v3 · Framer Motion · shadcn/ui · Three.js / R3F</sub></td>
<td valign="top" width="25%"><sub>**Backend**</sub><br/><sub>Lovable Cloud · Postgres + RLS · Edge Functions (Deno) · Resend (mail)</sub></td>
<td valign="top" width="25%"><sub>**Tooling**</sub><br/><sub>Vitest · ESLint · TypeScript strict · Bun · Lovable Editor</sub></td>
<td valign="top" width="25%"><sub>**Craft**</sub><br/><sub>i18n (EN ↔ JP) · WCAG AA · Design tokens · Motion choreography · Perf budgets</sub></td>
</tr>
</table>

<br/>

---

<div align="center"><sub>　参　&nbsp;·&nbsp; STRUCTURE　/　構 成　</sub></div>

```text
src/
├─ assets/              static images, certificates, resumes
├─ components/          composable UI (Hero, Projects, LyntSection, …)
│  └─ ui/               shadcn primitives
├─ contexts/            LanguageContext (EN ↔ JP)
├─ data/                projectsData.ts — case-study source of truth
├─ hooks/               use-mobile, use-toast
├─ pages/               Index · ProjectDetail · NotFound
└─ index.css            design tokens, theme, semantic palette
```

<br/>

---

<div align="center"><sub>　肆　&nbsp;·&nbsp; LOCAL DEVELOPMENT　/　開 発　</sub></div>

```bash
# 1 · install
bun install            # or  npm install

# 2 · run dev server
bun run dev            # vite at http://localhost:5173

# 3 · build & preview
bun run build
bun run preview

# 4 · test
bunx vitest run
```

> 
<br/>

---

<div align="center"><sub>　伍　&nbsp;·&nbsp; CASE STUDIES INCLUDED　/　事 例　</sub></div>

<br/>

<div align="center">

| #  | Project | 内容 | Headline metric |
|----|---------|------|-----------------|
| 01 | **TeamHub** · チームハブ | Realtime team & task platform | 70% faster status sync · 100ms presence |
| 02 | **BookFlow** · ブックフロー | AI scheduling & reservations | 0.8s TTI · 4 AI Edge Functions |
| 03 | **Rakuten Reimagined** · 楽天リイマジンド | Bilingual marketplace clone | <800ms first paint · 60fps |
| 04 | **Kaizen** · 改善 | AI 敬語 · 翻訳 · 議事録 suite | 23 routes · 9 RLS tables · 100% EN↔JP parity |
| 05 | **SysMonitor** · システムモニター | Observability + AI RCA | 7 tools · 1,200+ pairs · ~1.2s AI latency |
| 06 | **JapanPath** · ジャパンパス | OS for moving to Japan | 14+ routes · 30+ visas · LH 92/98/100 |

</div>

<br/>

---

<div align="center"><sub>　陸　&nbsp;·&nbsp; CONTACT　/　連 絡　</sub></div>

<br/>

<div align="center">

If your team is building thoughtful products in Japan and needs a single engineer who can own a feature **Figma → Postgres → ship → measure → 日本語化**, I'd love to talk.

📩 &nbsp; **itanmaytrivedi@gmail.com** &nbsp;·&nbsp; 🌐 &nbsp; [itanmaytrivedi.com](https://itanmaytrivedi.com)

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/itanmaytrivedi)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/itanmaytrivedi)
[![X](https://img.shields.io/badge/Twitter-000000?style=for-the-badge&logo=x&logoColor=white)](https://x.com/iTanmayTrivedi)
[![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/itanmaytrivedi/)

<br/>

<sub>━━━━━━━━━━━━━━━━━━━━&nbsp; 　 印 　 &nbsp;━━━━━━━━━━━━━━━━━━━━</sub>

<br/>

<samp>「神は細部に宿る。」</samp>
<br/>
<sub>*The divine is in the details.*</sub>

<br/>

<sub>© Tanmay Trivedi &nbsp;·&nbsp; 田丸 環 &nbsp;·&nbsp; Designed &amp; built with 静けさ</sub>

</div>
