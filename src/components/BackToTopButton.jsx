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
      // ✅ CORRIGIDO: Verificação mais robusta
      const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
      const shouldShow = scrollY > SCROLL_OFFSET;
      setVisible(shouldShow);
    };

    // ✅ Verifica scroll inicial
    handleScroll();
    
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    if (typeof window === "undefined") {
      return;
    }

    // ✅ CORRIGIDO: Fallback para navegadores mais antigos
    if (window.scrollTo) {
      window.scrollTo({ 
        top: 0, 
        behavior: "smooth" 
      });
    } else {
      document.documentElement.scrollTop = 0;
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 12 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-6 right-4 z-[9999] flex items-center gap-2 rounded-full border border-white/20 bg-[#050b18]/95 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-white shadow-[0_12px_35px_rgba(5,11,24,0.55)] backdrop-blur-md transition hover:border-white/35 hover:scale-105 hover:text-[#00f0c2] md:bottom-8 md:right-8"
          aria-label="Voltar ao topo"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-base" aria-hidden="true">
            ↑
          </span>
          <span className="hidden sm:inline">Voltar ao topo</span>
          <span className="sm:hidden">Topo</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}