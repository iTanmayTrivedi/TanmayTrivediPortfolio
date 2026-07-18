import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, CheckCircle, ArrowRight, AlertCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// Web3Forms access key — safe to expose in the browser (it only routes to your inbox).
// Get yours at https://web3forms.com and paste it here.
const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "";

interface FormData {
  name: string;
  email: string;
  company: string;
  subject: string;
  message: string;
}

const ContactForm = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus("sending");
    setErrorMsg(null);

    if (!WEB3FORMS_ACCESS_KEY) {
      setStatus("idle");
      setErrorMsg("Form is not configured yet. Missing Web3Forms access key.");
      return;
    }

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          from_name: formData.name,
          name: formData.name,
          email: formData.email,
          company: formData.company,
          subject: formData.subject || `Portfolio Contact — ${formData.name}`,
          message: formData.message,
          botcheck: "",
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        setStatus("sent");
        setTimeout(() => {
          setStatus("idle");
          setFormData({ name: "", email: "", company: "", subject: "", message: "" });
        }, 3500);
      } else {
        setStatus("idle");
        setErrorMsg(data?.message || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("idle");
      setErrorMsg("Network error. Please try again.");
    }
  };

  const fields: { key: keyof FormData; label: string; placeholder: string; type?: string; required?: boolean }[] = [
    { key: "name", label: t("contact.name"), placeholder: t("contact.namePlaceholder"), required: true },
    { key: "email", label: t("contact.emailField"), placeholder: t("contact.emailPlaceholder"), type: "email", required: true },
    { key: "company", label: t("contact.company"), placeholder: t("contact.companyPlaceholder") },
    { key: "subject", label: t("contact.subject"), placeholder: t("contact.subjectPlaceholder") },
  ];

  const isActive = (key: string) => focusedField === key;
  const hasValue = (key: keyof FormData) => formData[key].length > 0;

  return (
    <div
      className="relative overflow-hidden"
      style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', system-ui, sans-serif" }}
    >
      {/* Subtle top accent line */}
      <motion.div
        className="h-[2px] bg-gradient-to-r from-background/0 via-background/60 to-background/0 mb-8"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      />

      <div className="flex items-center justify-between mb-10">
        <h3 className="text-2xl font-semibold tracking-tight">
          {t("contact.formTitle")}
        </h3>
      </div>

      <AnimatePresence mode="wait">
        {status === "sent" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center justify-center py-16 gap-5"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
            >
              <CheckCircle className="w-14 h-14" strokeWidth={1.5} />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-semibold tracking-tight"
            >
              {t("contact.sent")}
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 0.5 }}
              className="text-center text-sm"
            >
              {t("contact.sentDesc")}
            </motion.p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            className="space-y-0"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {/* Grid fields */}
            <div className="grid sm:grid-cols-2 gap-0">
              {fields.map((field, i) => (
                <motion.div
                  key={field.key}
                  className={`relative border-b border-background/10 ${
                    i % 2 === 0 ? "sm:border-r" : ""
                  } transition-colors duration-500 ${
                    isActive(field.key) ? "bg-background/8" : "hover:bg-background/4"
                  }`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <div className="px-5 py-4">
                    <motion.label
                      className={`block text-[11px] uppercase tracking-[0.15em] font-medium mb-2 transition-colors duration-300 ${
                        isActive(field.key) ? "text-background" : "text-background/45"
                      }`}
                      animate={{ x: isActive(field.key) ? 2 : 0 }}
                    >
                      {field.label}
                      {field.required && (
                        <motion.span
                          className="inline-block ml-1 text-background/30"
                          animate={{ opacity: isActive(field.key) ? 1 : 0.5 }}
                        >
                          •
                        </motion.span>
                      )}
                    </motion.label>
                    <input
                      type={field.type || "text"}
                      value={formData[field.key]}
                      onChange={(e) => handleChange(field.key, e.target.value)}
                      onFocus={() => setFocusedField(field.key)}
                      onBlur={() => setFocusedField(null)}
                      placeholder={field.placeholder}
                      required={field.required}
                      maxLength={field.key === "email" ? 255 : 100}
                      className="w-full bg-transparent outline-none text-background text-[15px] placeholder:text-background/20 font-light tracking-wide"
                    />
                  </div>

                  {/* Active indicator */}
                  <AnimatePresence>
                    {isActive(field.key) && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-background"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        exit={{ scaleX: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ transformOrigin: "left" }}
                      />
                    )}
                  </AnimatePresence>

                  {/* Filled indicator dot */}
                  <AnimatePresence>
                    {hasValue(field.key) && !isActive(field.key) && (
                      <motion.div
                        className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-background/40"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      />
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            {/* Message field */}
            <motion.div
              className={`relative border-b border-background/10 transition-colors duration-500 ${
                isActive("message") ? "bg-background/8" : "hover:bg-background/4"
              }`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <div className="px-5 py-4">
                <motion.label
                  className={`block text-[11px] uppercase tracking-[0.15em] font-medium mb-2 transition-colors duration-300 ${
                    isActive("message") ? "text-background" : "text-background/45"
                  }`}
                  animate={{ x: isActive("message") ? 2 : 0 }}
                >
                  {t("contact.message")}
                  <motion.span
                    className="inline-block ml-1 text-background/30"
                    animate={{ opacity: isActive("message") ? 1 : 0.5 }}
                  >
                    •
                  </motion.span>
                </motion.label>
                <textarea
                  value={formData.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  placeholder={t("contact.messagePlaceholder")}
                  required
                  rows={4}
                  maxLength={1000}
                  className="w-full bg-transparent outline-none text-background text-[15px] placeholder:text-background/20 font-light tracking-wide resize-none"
                />
              </div>

              <AnimatePresence>
                {isActive("message") && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-background"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    exit={{ scaleX: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ transformOrigin: "left" }}
                  />
                )}
              </AnimatePresence>

              <AnimatePresence>
                {hasValue("message") && !isActive("message") && (
                  <motion.div
                    className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-background/40"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  />
                )}
              </AnimatePresence>
            </motion.div>

            {/* Submit */}
            <motion.div
              className="pt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <AnimatePresence>
                {errorMsg && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mb-4 flex items-center gap-2 text-[13px] text-background/80"
                  >
                    <AlertCircle className="w-4 h-4" />
                    <span>{errorMsg}</span>
                  </motion.div>
                )}
              </AnimatePresence>
              <motion.button
                type="submit"
                disabled={status === "sending"}
                className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-4 bg-background text-foreground font-medium text-[15px] tracking-wide disabled:opacity-40 overflow-hidden"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <motion.div
                  className="absolute inset-0 bg-background"
                  whileHover={{ scale: 1.02 }}
                />
                {status === "sending" ? (
                  <span className="relative z-10 flex items-center gap-3">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {t("contact.sending")}
                  </span>
                ) : (
                  <span className="relative z-10 flex items-center gap-3">
                    <Send className="w-4 h-4" />
                    {t("contact.send")}
                    <motion.span
                      className="inline-block"
                      initial={{ x: 0 }}
                      whileHover={{ x: 4 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </motion.span>
                  </span>
                )}
              </motion.button>
            </motion.div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContactForm;
