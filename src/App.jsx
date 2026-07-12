import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Timeline from "./components/Timeline";
import Projects from "./components/Projects";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-ink font-sans text-mist selection:bg-gold selection:text-ink">
      <Navbar />

      <main>
        <Hero />
        <Timeline />
        <Projects />
      </main>

      <Footer />
    </div>
  );
}
