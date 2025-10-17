import SectionWrapper from "./SectionWrapper";

export default function Contact() {
  return (
    <SectionWrapper
      as="footer"
      id="contact"
      surfaceClassName="py-14 md:py-20"
      contentClassName="mx-auto flex max-w-2xl flex-col items-center text-center"
    >
      <h2 className="section-title">Vamos conversar?</h2>
      <p className="mt-4 text-sm text-slate-300 md:text-base">
        Aberto a oportunidades em logística inteligente, dados e automação. Vamos construir
        operações guiadas por indicadores reais.
      </p>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <a
          href="mailto:seuemail@email.com"
          className="rounded-full bg-gradient-to-r from-[#6c3cff] to-[#00c9a7] px-6 py-2 text-sm font-semibold text-black shadow-[0_12px_36px_rgba(108,60,255,0.35)] transition hover:brightness-110"
        >
          Enviar e-mail
        </a>
        <a
          href="https://www.linkedin.com/in/seu-perfil"
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-white/20 px-6 py-2 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10"
        >
          LinkedIn
        </a>
      </div>

      <div className="mt-8 text-xs uppercase tracking-[0.4em] text-slate-500">
        © {new Date().getFullYear()} Erick Filipe · Data-Driven Supply Chain
      </div>
    </SectionWrapper>
  );
}