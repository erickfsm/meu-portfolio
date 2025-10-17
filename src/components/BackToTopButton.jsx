import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const SCROLL_OFFSET = 320;

export default function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const handleScroll = () => {
      const shouldShow = window.scrollY > SCROLL_OFFSET;
      setVisible(shouldShow);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    if (typeof window === "undefined") {
      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-6 right-4 z-50 flex items-center gap-2 rounded-full border border-white/20 bg-[#050b18]/85 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-white shadow-[0_12px_35px_rgba(5,11,24,0.55)] backdrop-blur-md transition hover:border-white/35 hover:text-[#00f0c2] md:bottom-8 md:right-8"
          aria-label="Voltar ao topo"
        >
          <span className="text-base" aria-hidden="true">
            ↑
          </span>
          Voltar ao topo
        </motion.button>
      )}
    </AnimatePresence>
  );
}
