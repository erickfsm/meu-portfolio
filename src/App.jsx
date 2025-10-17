import { useEffect, useState } from "react";
import Hero from "./components/Hero";
import Timeline from "./components/Timeline";
import Projects from "./components/Projects";
import Methodologies from "./components/Methodologies";
import Contact from "./components/Contact";
import SmoothScroll from "./components/SmoothScroll";
import About from "./components/About";
import Formacao from "./components/Formacao";
import GeminiAssistant from "./components/GeminiAssistant";
import BackToTopButton from "./components/BackToTopButton";

const navLinks = [
  { href: "#sobre", label: "Sobre" },
  { href: "#timeline", label: "Trajetória" },
  { href: "#projects", label: "Projetos" },
  { href: "#formacao", label: "Formação" },
  { href: "#assistant", label: "Gemini" },
  { href: "#contact", label: "Contato" },
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) {
      return undefined;
    }

    const { style } = document.body;
    const originalOverflow = style.overflow;
    style.overflow = "hidden";

    return () => {
      style.overflow = originalOverflow;
    };
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <SmoothScroll>
      <div className="relative min-h-screen overflow-hidden text-slate-100">
        <div className="pointer-events-none fixed inset-0 -z-50">
          <div className="absolute inset-0 bg-gradient-to-b from-[#04070f] via-[#071229] to-[#01020a]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(108,60,255,0.2),transparent_65%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(0,201,167,0.18),transparent_65%)]" />
          <div className="absolute inset-0 opacity-20 mix-blend-screen [background-image:linear-gradient(120deg,rgba(108,60,255,0.25)_0%,rgba(0,201,167,0.15)_35%,transparent_70%)]" />
        </div>

        <div className="pointer-events-none fixed inset-0 -z-40 opacity-25 [background-image:radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:100px_100px]" />

        <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#050b18]/70 backdrop-blur-xl">
          <nav
            className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 text-[11px] font-medium uppercase tracking-[0.22em] text-white/80 md:px-6 md:text-xs md:tracking-[0.28em]"
            aria-label="Seções do portfólio"
          >
            <span className="font-semibold text-white/90 tracking-[0.3em]">
              Erick Filipe — Data-Driven Ops
            </span>
            <div className="hidden items-center gap-5 md:flex">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} className="transition hover:text-white">
                  {link.label}
                </a>
              ))}
            </div>
            <button
              type="button"
              onClick={toggleMenu}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-[11px] uppercase tracking-[0.32em] text-white transition hover:border-white/40 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6c3cff] md:hidden"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
            >
              <span className="sr-only">{isMenuOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}</span>
              <span aria-hidden="true">{isMenuOpen ? "Fechar" : "Menu"}</span>
            </button>
          </nav>
        </header>

        {isMenuOpen && (
          <div className="fixed inset-0 z-40 md:hidden" role="dialog" aria-modal="true">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeMenu} aria-hidden="true" />
            <div
              id="mobile-navigation"
              className="absolute inset-x-4 top-20 rounded-3xl border border-white/15 bg-[#050b18]/95 p-6 shadow-[0_18px_65px_rgba(5,11,24,0.55)]"
            >
              <nav className="space-y-4 text-sm font-semibold uppercase tracking-[0.3em]">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    className="block rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white transition hover:border-white/25"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        )}

        <main className="relative isolate space-y-24 pt-20 md:space-y-32 md:pt-24">
          <Hero />
          <About />
          <Timeline />
          <Formacao />
          <Projects />
          <Methodologies />
          <GeminiAssistant />
          <Contact />
        </main>
        <BackToTopButton />
      </div>
    </SmoothScroll>
  );
}
