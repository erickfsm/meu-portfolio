import { motion } from "framer-motion";
import { methodologies } from "../data/methodologiesData";
import SectionWrapper from "./SectionWrapper";

export default function Methodologies() {
  return (
    <SectionWrapper id="methodologies" contentClassName="text-slate-200">
      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="section-title"
      >
        Metodologias & Cultura de Alta Performance
      </motion.h2>

      <div className="mt-12 space-y-12">
        {methodologies.map((cat, i) => (
          <motion.div
            key={cat.categoria}
            className="rounded-2xl border border-white/10 bg-white/5 p-8 shadow-[0_20px_60px_rgba(8,15,35,0.3)] backdrop-blur"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.1 }}
          >
            <h3 className="text-xl font-semibold text-white">{cat.categoria}</h3>
            <p className="mt-2 text-sm text-slate-400">{cat.descricao}</p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {cat.metodos.map((m, j) => (
                <motion.div
                  key={m.nome}
                  className="rounded-xl border border-white/10 bg-[#0f1b33]/70 p-5 backdrop-blur"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: j * 0.08 }}
                >
                  <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[#00c9a7]">
                    {m.nome}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">
                    {m.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}