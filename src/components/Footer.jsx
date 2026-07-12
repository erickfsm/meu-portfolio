import { Mail, Linkedin, MessageCircle, FileDown } from "lucide-react";
import { profile } from "../data/mockData";

const links = [
  { label: "E-mail", icon: Mail, href: `mailto:${profile.email}` },
  { label: "LinkedIn", icon: Linkedin, href: profile.linkedin },
  { label: "WhatsApp", icon: MessageCircle, href: profile.whatsapp },
  { label: "Currículo", icon: FileDown, href: profile.cv, download: true },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center">
        <p className="max-w-xl text-sm text-mist">
          Aberto a oportunidades em <span className="text-ivory">Análise de Operações</span> e{" "}
          <span className="text-ivory">Inteligência Logística</span>.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.download ? undefined : "_blank"}
              rel={link.download ? undefined : "noopener noreferrer"}
              download={link.download}
              className="inline-flex items-center gap-2 rounded-lg border border-line bg-white/[0.03] px-4 py-2 text-xs font-medium text-mist transition-all duration-300 hover:border-gold/40 hover:text-ivory"
            >
              <link.icon className="h-3.5 w-3.5 text-gold" />
              {link.label}
            </a>
          ))}
        </div>

        <p className="text-[11px] uppercase tracking-[0.25em] text-mist-dim">
          © {year} {profile.fullName}
        </p>
      </div>
    </footer>
  );
}
