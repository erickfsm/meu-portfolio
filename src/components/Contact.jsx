import SectionWrapper from "./SectionWrapper";

const contactLinks = [
  {
    label: "E-mail",
    href: "mailto:erickfilipe.dev@gmail.com",
    style: "primary",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/erickfilipe26",
    style: "outline",
    external: true,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/5531972372452",
    style: "outline",
    external: true,
  },
];

export default function Contact() {
  return (
    <SectionWrapper
      as="footer"
      id="contact"
      surfaceClassName="py-14 md:py-20"
      contentClassName="mx-auto flex max-w-3xl flex-col items-center text-center space-y-6"
    >
      <div>
        <h2 className="section-title">Vamos conversar?</h2>
        <p className="mt-4 text-sm text-slate-300 md:text-base">
          Aberto a oportunidades e projetos que unam dados, processos e automação.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        {contactLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noreferrer" : undefined}
            className={
              link.style === "primary"
                ? "rounded-full bg-gradient-to-r from-[#6c3cff] to-[#00c9a7] px-6 py-2 text-sm font-semibold text-black shadow-[0_12px_36px_rgba(108,60,255,0.35)] transition hover:brightness-110"
                : "rounded-full border border-white/20 px-6 py-2 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10"
            }
          >
            {link.label}
          </a>
        ))}
        <a
          href="/curriculo-erick-filipe.pdf"
          download
          className="rounded-full border border-[#00c9a7]/40 bg-[#00c9a7]/10 px-6 py-2 text-sm font-semibold text-[#00f0c2] shadow-[0_10px_30px_rgba(0,201,167,0.25)] transition hover:bg-[#00c9a7]/20"
        >
          Download CV
        </a>
      </div>

      <div className="text-xs uppercase tracking-[0.4em] text-slate-500">
        © {new Date().getFullYear()} Erick Filipe · Data-Driven Supply Chain
      </div>
    </SectionWrapper>
  );
}
