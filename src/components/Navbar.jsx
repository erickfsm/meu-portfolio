import { useState, useEffect } from "react";
import { Menu, X, FileDown } from "lucide-react";
import { profile } from "../data/mockData";

const navItems = [
  { label: "Trajetória", href: "#trajetoria" },
  { label: "Showroom", href: "#showroom" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    const el = document.querySelector(href);
    if (el) {
      const offset = 76;
      const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 z-40 w-full transition-all duration-300 ${
        scrolled ? "border-b border-line bg-ink/90 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex h-16 items-center justify-between">
          <a
            href="#inicio"
            onClick={(e) => handleClick(e, "#inicio")}
            className="font-display text-lg font-bold text-ivory"
          >
            Erick <span className="text-gold">Filipe</span>
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleClick(e, item.href)}
                className="text-sm font-medium text-mist transition-colors hover:text-gold"
              >
                {item.label}
              </a>
            ))}
            <a
              href={profile.cv}
              download
              className="inline-flex items-center gap-2 rounded-lg border border-line bg-white/[0.03] px-4 py-2 text-sm font-semibold text-ivory transition-all duration-300 hover:border-gold/40 hover:bg-gold hover:text-ink"
            >
              <FileDown className="h-4 w-4" />
              Currículo
            </a>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-ivory md:hidden"
            aria-label="Alternar menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {isOpen && (
          <div className="mt-2 space-y-1 rounded-xl border border-line bg-panel/95 p-3 backdrop-blur-md md:hidden">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleClick(e, item.href)}
                className="block rounded-lg px-3 py-2 text-sm font-medium text-mist transition-colors hover:bg-white/5 hover:text-gold"
              >
                {item.label}
              </a>
            ))}
            <a
              href={profile.cv}
              download
              className="mt-1 block rounded-lg bg-gold px-3 py-2.5 text-center text-sm font-bold text-ink"
            >
              Baixar Currículo
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
