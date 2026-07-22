import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUpRight, Send } from "lucide-react";
import { useState, useRef, useEffect } from "react";

type Msg = { role: "User" | "Yuki"; text: string };

const seedConversation: Msg[] = [
  { role: "User", text: "I want to move to Japan." },
  { role: "Yuki", text: "Why Japan?" },
  { role: "User", text: "A better future." },
  { role: "Yuki", text: "What does a better future mean to you?" },
];

const yukiReplies = [
  "What does that mean to you, really?",
  "And underneath that — what's the quieter reason?",
  "If no one was watching, would the answer change?",
  "What would it cost you to be wrong about this?",
  "Sit with that for a moment. What surfaces?",
  "Is that the thought, or the feeling beneath it?",
  "What would the version of you in five years say?",
  "Where did that belief first take shape?",
];

const kanjiSet = [
  { ji: "悠", romaji: "yū", meaning: "distant calm", english: "A patience that doesn't need to arrive." },
  { ji: "間", romaji: "ma", meaning: "the space between", english: "Silence is not absence. It is form." },
  { ji: "侘", romaji: "wabi", meaning: "quiet imperfection", english: "Beauty in what is unfinished." },
  { ji: "寂", romaji: "sabi", meaning: "weathered grace", english: "What time gives, never takes back." },
  { ji: "禅", romaji: "zen", meaning: "stillness in motion", english: "Think less. Notice more." },
  { ji: "縁", romaji: "en", meaning: "unseen thread", english: "Every meeting was already on its way." },
];

const SERIF =
  "'Playfair Display', 'Hiragino Mincho ProN', 'Yu Mincho', 'Noto Serif JP', serif";
const MINCHO =
  "'Noto Serif JP', 'Hiragino Mincho ProN', 'Yu Mincho', serif";
const SANS = "'Inter Tight', system-ui, sans-serif";
const MONO = "'JetBrains Mono', ui-monospace, monospace";
const EASE = [0.22, 1, 0.36, 1] as const;

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.8, delay, ease: EASE },
});

const YukiSection = () => {
  const [messages, setMessages] = useState<Msg[]>(seedConversation);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [activeKanji, setActiveKanji] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, thinking]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || thinking) return;
    setMessages((m) => [...m, { role: "User", text }]);
    setInput("");
    setThinking(true);
    const reply = yukiReplies[Math.floor(Math.random() * yukiReplies.length)];
    setTimeout(() => {
      setMessages((m) => [...m, { role: "Yuki", text: reply }]);
      setThinking(false);
    }, 1100);
  };

  const kanji = kanjiSet[activeKanji];

  return (
    <section
      id="yuki"
      className="relative overflow-hidden bg-[#f5f5f7] text-[#1d1d1f]"
      style={{ contain: "paint", fontFamily: SANS }}
    >
      {/* Ambient wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 15% 10%, rgba(255,255,255,0.75) 0%, rgba(245,245,247,0) 60%), radial-gradient(50% 45% at 90% 95%, rgba(0,0,0,0.04) 0%, rgba(245,245,247,0) 70%)",
        }}
      />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-10 py-24 md:py-32">
        <div className="mb-10 md:mb-14" />

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6 auto-rows-min">
          {/* ─── Identity (pillar) ─── */}
          <motion.div
            {...reveal(0.05)}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="lg:col-span-4 lg:row-span-2 relative group overflow-hidden rounded-[2.5rem] bg-white border border-[#EBEBE8] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.06)] hover:shadow-[0_48px_96px_-24px_rgba(0,0,0,0.12)] hover:border-[#1d1d1f]/15 transition-[box-shadow,border-color] duration-700 p-10 md:p-12 flex flex-col justify-between min-h-[560px]"
          >
            {/* Hover sheen */}
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style={{
                background:
                  "radial-gradient(600px circle at 30% 0%, rgba(0,0,0,0.04), transparent 50%)",
              }}
            />
            {/* Vertical kanji */}
            <div className="absolute top-10 right-10 flex flex-col items-center pointer-events-none">
              <span
                className="[writing-mode:vertical-rl] text-5xl md:text-6xl font-light text-[#EBEBE8] select-none tracking-[0.5em] transition-all duration-1000 group-hover:text-[#1d1d1f]/25 group-hover:tracking-[0.7em]"
                style={{ fontFamily: MINCHO }}
              >
                悠然自適
              </span>
            </div>

            <div className="relative z-10">
              <h1
                className="text-7xl md:text-8xl font-normal italic tracking-tight leading-none text-[#1d1d1f] transition-transform duration-700 group-hover:-translate-y-0.5"
                style={{ fontFamily: SERIF }}
              >
                Yuki
              </h1>
              <div className="h-[2px] w-14 bg-[#1d1d1f] mt-8 mb-6 opacity-80 transition-all duration-700 group-hover:w-24" />
              <p className="text-lg md:text-xl text-[#86868B] font-light leading-relaxed max-w-[220px]">
                Think{" "}
                <span className="text-[#1d1d1f] font-medium">deeper</span>.
                An assistant that sits with you in the question.
              </p>
            </div>

            <div className="relative z-10 space-y-3 mt-10">
              <a
                href="https://yuki.tanmaytrivedi.dev"
                target="_blank"
                rel="noreferrer noopener"
                className="group/btn w-full inline-flex items-center justify-between gap-4 py-4 px-6 rounded-2xl bg-[#1d1d1f] text-white text-[12px] font-medium tracking-[0.12em] uppercase transition-all duration-500 hover:bg-black hover:-translate-y-0.5 shadow-[0_8px_24px_-12px_rgba(29,29,31,0.18)] hover:shadow-[0_12px_32px_-16px_rgba(29,29,31,0.25)]"
              >
                Say Hello to Yuki
                <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center transition-all duration-500 group-hover/btn:bg-white/20 group-hover/btn:rotate-[-35deg]">
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/btn:translate-x-1" />
                </span>
              </a>
              <a
                href="#yuki"
                className="group/btn w-full inline-flex items-center justify-between gap-2 py-4 px-6 rounded-2xl border border-[#D2D2D7]/60 text-[#1d1d1f] text-[12px] font-medium tracking-[0.06em] hover:bg-white hover:border-[#1d1d1f]/30 hover:-translate-y-0.5 transition-all duration-500"
              >
                Get to know more about Yuki
                <ArrowUpRight className="w-4 h-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 group-hover/btn:rotate-[20deg]" />
              </a>
            </div>
          </motion.div>

          {/* ─── Interaction Hub ─── */}
          <motion.div
            id="yuki-chat"
            {...reveal(0.15)}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="lg:col-span-8 rounded-[2.5rem] bg-white/70 border border-white shadow-[0_48px_96px_-32px_rgba(0,0,0,0.06)] hover:shadow-[0_64px_120px_-32px_rgba(0,0,0,0.12)] transition-shadow duration-700 p-8 md:p-10 flex flex-col min-h-[440px]"
            style={{ backdropFilter: "blur(20px)" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-8 md:mb-10">
              <div className="flex items-center gap-4">
                <div className="flex gap-1.5">
                  <div className={`w-2 h-2 rounded-full ${thinking ? "bg-emerald-500 animate-pulse" : "bg-[#1d1d1f]"}`} />
                  <div className="w-2 h-2 rounded-full bg-[#1d1d1f]/30" />
                  <div className="w-2 h-2 rounded-full bg-[#1d1d1f]/10" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#1d1d1f]">
                  {thinking ? "Yuki is thinking…" : "Active Dialogue"}
                </span>
              </div>
              <div
                className="hidden md:block text-[10px] text-[#86868B] tracking-widest opacity-60"
                style={{ fontFamily: MONO }}
              >
                REF: 00-JAPAN-{String(messages.length).padStart(2, "0")}
              </div>
            </div>

            {/* Conversation */}
            <div
              ref={scrollRef}
              className="flex-1 space-y-7 md:space-y-9 px-1 max-h-[360px] overflow-y-auto pr-2 scroll-smooth"
            >
              <AnimatePresence initial={false}>
              {messages.map((line, i) => {
                const isUser = line.role === "User";
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className={`flex ${
                      isUser ? "justify-start items-start gap-5" : "flex-col items-end gap-2"
                    }`}
                  >
                    {isUser ? (
                      <>
                        <div className="w-10 h-10 shrink-0 rounded-full border border-[#D2D2D7]/50 flex items-center justify-center text-[10px] font-bold tracking-tighter text-[#1d1d1f]/70 transition-colors hover:border-[#1d1d1f]/40">
                          YU
                        </div>
                        <div className="max-w-[78%]">
                          <p
                            className="text-lg md:text-xl leading-relaxed italic text-[#1d1d1f]"
                            style={{ fontFamily: SERIF }}
                          >
                            "{line.text}"
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="max-w-[85%] bg-[#1d1d1f] text-white px-7 py-5 rounded-[1.75rem] rounded-tr-none shadow-[0_6px_20px_-10px_rgba(29,29,31,0.18)] hover:shadow-[0_10px_28px_-14px_rgba(29,29,31,0.22)] hover:-translate-y-0.5 transition-all duration-500 cursor-default">
                          <p className="text-[15px] md:text-base leading-relaxed font-light opacity-95">
                            {line.text}
                          </p>
                        </div>
                        <span className="text-[9px] uppercase tracking-[0.3em] text-[#86868B] mr-2">
                          Yuki · synthesized
                        </span>
                      </>
                    )}
                  </motion.div>
                );
              })}
              {thinking && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-end gap-2"
                >
                  <div className="bg-[#1d1d1f] text-white px-6 py-4 rounded-[1.75rem] rounded-tr-none flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </motion.div>
              )}
              </AnimatePresence>
            </div>

            {/* Composer */}
            <form
              onSubmit={handleSend}
              className="mt-8 flex items-center gap-3 bg-[#F2F2F0]/60 p-2.5 rounded-2xl border border-white/80 focus-within:border-[#1d1d1f]/20 focus-within:bg-white transition-all duration-300"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about the unseen…"
                className="flex-1 bg-transparent px-4 py-2 text-sm font-light text-[#1d1d1f] placeholder:italic placeholder:text-[#86868B] focus:outline-none"
              />
              <button
                type="submit"
                disabled={!input.trim() || thinking}
                className="w-11 h-11 rounded-xl bg-white flex items-center justify-center shadow-sm transition-all hover:bg-[#1d1d1f] hover:text-white hover:scale-105 active:scale-95 disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-[#1d1d1f] disabled:hover:scale-100 group/send"
                aria-label="Send message"
              >
                <Send className="w-4 h-4 transition-transform duration-300 group-hover/send:translate-x-0.5" />
              </button>
            </form>
          </motion.div>

          {/* ─── Philosophy (dark) ─── */}
          <motion.div
            {...reveal(0.2)}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="lg:col-span-5 rounded-[2.5rem] bg-[#1d1d1f] p-10 md:p-12 flex flex-col justify-between text-[#F5F5F7] min-h-[320px] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.35)] hover:shadow-[0_60px_120px_-30px_rgba(0,0,0,0.55)] transition-all duration-700 hover:bg-black group relative overflow-hidden"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style={{
                background:
                  "radial-gradient(500px circle at 70% 30%, rgba(255,255,255,0.06), transparent 50%)",
              }}
            />
            <div>
              <p
                className="text-2xl md:text-[1.7rem] leading-snug font-light tracking-tight"
                style={{ fontFamily: SERIF }}
              >
                Most assistants optimize for{" "}
                <span className="line-through decoration-1 opacity-40">
                  answers
                </span>
                .
                <br />
                Yuki optimizes for{" "}
                <span className="italic">understanding.</span>
              </p>
            </div>
          </motion.div>

          {/* ─── Kanji Oracle (interactive) ─── */}
          <motion.div
            {...reveal(0.28)}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="lg:col-span-3 rounded-[2.5rem] bg-white border border-[#EBEBE8] p-7 md:p-8 flex flex-col min-h-[320px] shadow-[0_24px_48px_-16px_rgba(0,0,0,0.06)] hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.12)] transition-shadow duration-700 group"
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#86868B]">
                Kanji Oracle
              </p>
              <span
                className="text-[9px] tracking-[0.3em] uppercase text-[#86868B]"
                style={{ fontFamily: MONO }}
              >
                {String(activeKanji + 1).padStart(2, "0")}/{String(kanjiSet.length).padStart(2, "0")}
              </span>
            </div>

            <div className="relative flex-1 flex flex-col items-center justify-center text-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={kanji.ji}
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.96 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="flex flex-col items-center"
                >
                  <span
                    className="text-[7rem] leading-none text-[#1d1d1f] transition-transform duration-700 group-hover:scale-110"
                    style={{ fontFamily: MINCHO, fontWeight: 200 }}
                  >
                    {kanji.ji}
                  </span>
                  <span
                    className="mt-3 text-[11px] tracking-[0.4em] uppercase text-[#1d1d1f]/70"
                    style={{ fontFamily: MONO }}
                  >
                    {kanji.romaji} · {kanji.meaning}
                  </span>
                  <p
                    className="mt-3 text-[13px] italic text-[#6e6e73] leading-snug max-w-[200px]"
                    style={{ fontFamily: SERIF }}
                  >
                    "{kanji.english}"
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-center gap-1.5 mt-5 pt-5 border-t border-[#EBEBE8]">
              {kanjiSet.map((k, i) => (
                <button
                  key={k.ji}
                  onClick={() => setActiveKanji(i)}
                  className={`text-base w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-[#f5f5f7] ${
                    i === activeKanji
                      ? "bg-[#1d1d1f] text-white shadow-md"
                      : "text-[#86868B] hover:text-[#1d1d1f]"
                  }`}
                  style={{ fontFamily: MINCHO }}
                  aria-label={`Kanji ${k.romaji}`}
                >
                  {k.ji}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default YukiSection;