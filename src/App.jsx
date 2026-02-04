import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Timeline from "./components/Timeline";
import Projects from "./components/Projects";
import Formacao from "./components/Formacao";
import Methodologies from "./components/Methodologies";
import Contact from "./components/Contact";
import StickyCTA from "./components/StickyCTA";
import BackToTopButton from "./components/BackToTopButton";

export default function App() {
  return (
    <div className="min-h-screen bg-[#050b18] text-slate-200 font-sans selection:bg-[#00c9a7] selection:text-[#050b18]">
      <Navbar />
      
      <main>
        <Hero />
        <About />
        <Timeline />
        <Projects />
        <Formacao />
        <Methodologies />
        <Contact />
      </main>

      <StickyCTA />
      <BackToTopButton />
    </div>
  );
}
