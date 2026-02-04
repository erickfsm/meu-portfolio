import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Início", href: "#inicio" },
  { label: "Sobre", href: "#sobre" },
  { label: "Trajetória", href: "#trajetoria" },
  { label: "Projetos", href: "#projetos" },
  { label: "Formação", href: "#formacao" },
  { label: "Contato", href: "#contato" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <nav className={`fixed top-0 z-50 w-full transition-all duration-300 ${
      scrolled ? "bg-[#050b18]/95 backdrop-blur-md shadow-lg" : "bg-transparent"
    }`}>
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo */}
          <a href="#inicio" onClick={(e) => handleClick(e, "#inicio")} className="text-xl font-bold text-white">
            Erick <span className="text-[#00c9a7]">Filipe</span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleClick(e, item.href)}
                className="text-sm font-medium text-slate-300 transition-colors hover:text-[#00c9a7]"
              >
                {item.label}
              </a>
            ))}
            <a
              href="/Cv__Erick_Filipe_logistico.pdf"
              download
              className="rounded-lg bg-[#00c9a7] px-4 py-2 text-sm font-bold text-[#050b18] transition-transform hover:scale-105"
            >
              Download CV
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2 bg-[#0b1328]/95 backdrop-blur-md rounded-lg mt-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleClick(e, item.href)}
                className="block px-4 py-2 text-sm font-medium text-slate-300 hover:text-[#00c9a7] hover:bg-white/5 rounded transition-colors"
              >
                {item.label}
              </a>
            ))}
            <a
              href="/Cv__Erick_Filipe_logistico.pdf"
              download
              className="block mx-4 mt-4 rounded-lg bg-[#00c9a7] px-4 py-2 text-center text-sm font-bold text-[#050b18]"
            >
              Download CV
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
