import Hero from "./components/Hero";
import Timeline from "./components/Timeline";
import Projects from "./components/Projects";
import Methodologies from "./components/Methodologies";
import Contact from "./components/Contact";
import SmoothScroll from "./components/SmoothScroll";
import About from "./components/About";
import Formacao from "./components/Formacao";

export default function App() {
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

        {/* Navbar */}
        <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#050b18]/70 backdrop-blur-xl">
          <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 text-xs font-medium uppercase tracking-[0.25em] md:text-sm">
            <span className="font-semibold text-white/90 tracking-[0.32em]">Erick Filipe — Data-Driven Ops</span>
            <div className="flex gap-4 md:gap-6">
              <a href="#sobre" className="transition hover:text-white">Sobre</a>
              <a href="#timeline" className="transition hover:text-white">Trajetória</a>
              <a href="#projects" className="transition hover:text-white">Projetos</a>
              <a href="#formacao" className="transition hover:text-white">Formação</a>
              <a href="#contact" className="transition hover:text-white">Contato</a>
            </div>
          </nav>
        </header>

        {/* Conteúdo */}
        <main className="relative isolate pt-20 md:pt-24 space-y-24 md:space-y-32">
          <Hero />
          <About />
          <Timeline />
          <Formacao />
          <Projects />
          <Methodologies />
          <Contact />
        </main>
      </div>
    </SmoothScroll>
  );
}

