import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { aboutNarrative, positioning, quickFacts, badges } from "../data/profileData";

export default function About() {
  return (
    <SectionWrapper id="sobre" contentClassName="space-y-10">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="section-title"
      >
        Sobre mim
      </motion.h2>

      <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr]">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-4 text-lg leading-relaxed text-slate-300"
        >
          {aboutNarrative.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}

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
          initial={{ opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-5 rounded-2xl border border-white/10 bg-white/5 p-6 text-slate-200 shadow-[0_22px_70px_rgba(8,15,35,0.3)] backdrop-blur"
        >
          <h3 className="text-xl font-semibold text-white">{positioning.headline}</h3>
          <div className="space-y-4 text-sm leading-relaxed text-slate-300">
            {positioning.pillars.map((pillar) => (
              <div key={pillar.title}>
                <div className="text-sm font-semibold uppercase tracking-[0.25em] text-[#00c9a7]">
                  {pillar.title}
                </div>
                <p className="mt-2 text-[15px] text-slate-200/90">{pillar.description}</p>
              </div>
            ))}
          </div>

          <div className="pt-4">
            <h4 className="text-xs uppercase tracking-[0.35em] text-slate-400">Certificações & Badges</h4>
            <div className="mt-3 flex flex-wrap gap-2">
              {badges.map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-white/15 bg-[#0b1328]/80 px-3 py-1 text-xs font-medium text-slate-200"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
