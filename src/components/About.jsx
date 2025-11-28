import { useState } from "react";
import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { aboutNarrative, positioning, quickFacts, badges } from "../data/profileData";

export default function About() {
  const [expanded, setExpanded] = useState(false);

  return (
    <SectionWrapper id="sobre" contentClassName="space-y-10">
      <motion.h2
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }} viewport={{ once: true }}
        className="section-title"
      >
        Sobre mim (versão curta)
      </motion.h2>

      <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr]">
        <motion.div
          initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="space-y-5 text-slate-300"
        >
          {/* TL;DR em 3 bullets */}
          <ul className="grid gap-3 rounded-2xl border border-white/10 bg-[#0c162f]/80 p-5">
            <li>• <strong>Dados + Operações:</strong> OTD, rastreio, painéis e automação.</li>
            <li>• <strong>Resultados rápidos:</strong> foco em gargalos com métricas.</li>
            <li>• <strong>Comunicação:</strong> integra compras, transporte e SAC.</li>
          </ul>

          {/* Narrativa expansível */}
          <div className="relative">
            <div className={expanded ? "space-y-4" : "space-y-4 line-clamp-3"}>
              {aboutNarrative.map((p, i) => (
                <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
              ))}
            </div>
            <button
              type="button"
              onClick={() => setExpanded(v => !v)}
              className="mt-3 text-xs uppercase tracking-[0.28em] text-[#00c9a7] underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00c9a7]"
              aria-expanded={expanded}
            >
              {expanded ? "ver menos" : "ver mais"}
            </button>
          </div>

          <div className="grid gap-3 rounded-2xl border border-white/10 bg-[#0c162f]/80 p-5 text-sm text-slate-300 md:grid-cols-4 md:text-center">
            {quickFacts.map((fact) => (
              <div key={fact.label}>
                <div className="text-xs uppercase tracking-[0.3em] text-slate-500">{fact.label}</div>
                <div className="mt-1 text-sm text-white">{fact.value}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="space-y-6 rounded-2xl border border-white/10 bg-white/5 p-6 text-slate-200 shadow-[0_22px_70px_rgba(8,15,35,0.3)] backdrop-blur"
        >
          <figure className="overflow-hidden rounded-2xl border border-white/10 bg-[#050b18]/60 shadow-[0_18px_55px_rgba(5,11,24,0.55)]">
            <img
              src="/foto-perfil.jpg"
              alt="Erick Filipe"
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
            <figcaption className="px-4 py-3 text-center text-[11px] uppercase tracking-[0.3em] text-slate-400">
              Data-driven Ops · Belo Horizonte/MG
            </figcaption>
          </figure>

          <h3 className="text-xl font-semibold text-white">{positioning.headline}</h3>
          <div className="space-y-3 text-sm leading-relaxed text-slate-300">
            {positioning.pillars.map((pillar) => (
              <div key={pillar.title}>
                <div className="text-xs font-semibold uppercase tracking-[0.25em] text-[#00c9a7]">
                  {pillar.title}
                </div>
                <p className="mt-1 text-[15px] text-slate-200/90">{pillar.description}</p>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <h4 className="text-xs uppercase tracking-[0.35em] text-slate-400">Certificações & Badges</h4>
            <div className="mt-2 flex flex-wrap gap-2">
              {badges.map((b) => (
                <span
                  key={b}
                  className="rounded-full border border-white/15 bg-[#0b1328]/80 px-3 py-1 text-xs font-medium text-slate-200"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
