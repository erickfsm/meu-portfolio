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
      <div className="relative min-h-screen bg-gradient-to-b from-[#05070f] via-[#081227] to-[#03040b] text-slate-100">
        {/* Navbar */}
        <header className="fixed top-0 inset-x-0 z-50 border-b border-white/10 bg-black/20 backdrop-blur">
          <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6 text-sm font-medium tracking-wide">
            <span className="font-semibold uppercase text-white/90">Erick Filipe — Data-Driven Ops</span>
            <div className="flex gap-5 text-xs md:text-sm">
              <a href="#sobre" className="transition hover:text-white">Sobre</a>
              <a href="#timeline" className="transition hover:text-white">Trajetória</a>
              <a href="#projects" className="transition hover:text-white">Projetos</a>
              <a href="#formacao" className="transition hover:text-white">Formação</a>
              <a href="#contact" className="transition hover:text-white">Contato</a>
            </div>
          </nav>
        </header>

        {/* Conteúdo */}
        <main className="relative pt-14">
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

