import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SCROLL_OFFSET = 280;

export default function StickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      const scrollY =
        window.scrollY ||
        window.pageYOffset ||
        document.documentElement.scrollTop;
      setVisible(scrollY > SCROLL_OFFSET);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <a
            href="https://wa.me/5531972372452"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#00c9a7] to-[#00f0c2] px-5 py-3 text-sm font-semibold text-[#061122] shadow-[0_20px_50px_rgba(0,201,167,0.4)] transition hover:scale-105 hover:shadow-[0_24px_60px_rgba(0,201,167,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00c9a7] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b1224]"
            aria-label="Conversar via WhatsApp"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
            <span className="hidden sm:inline">Conversar agora</span>
            <span className="sm:hidden">WhatsApp</span>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
