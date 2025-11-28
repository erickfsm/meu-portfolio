import Hero from "../components/Hero";
import Timeline from "../components/Timeline";
import Projects from "../components/Projects";
import Methodologies from "../components/Methodologies";
import Contact from "../components/Contact";
import SmoothScroll from "../components/SmoothScroll";
import About from "../components/About";
import Formacao from "../components/Formacao";
import GeminiAssistant from "../components/GeminiAssistant";
import BackToTopButton from "../components/BackToTopButton";

export default function Portfolio() {
  return (
    <SmoothScroll>
      <div className="relative min-h-screen text-slate-100">
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
