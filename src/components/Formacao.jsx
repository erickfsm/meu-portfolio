import { motion } from "framer-motion";
import { formacao } from "../data/formacaoData";
import SectionWrapper from "./SectionWrapper";

const statusColor = {
  "Concluída": "from-emerald-400 to-emerald-500",
  "Em andamento": "from-amber-400 to-amber-500",
  "Planejada": "from-slate-500 to-slate-600",
};

export default function Formacao() {
  return (
    <SectionWrapper id="formacao" contentClassName="text-slate-200">
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
      >
        Formação & Desenvolvimento
      </motion.h2>

      <div className="mt-10 space-y-10">
        {formacao.map((programa, i) => (
          <motion.div
            key={programa.programa}
            className="rounded-2xl border border-white/10 bg-white/5 p-8 shadow-[0_20px_60px_rgba(5,10,30,0.35)] backdrop-blur"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-xl font-semibold text-white">{programa.programa}</h3>
                <p className="text-sm text-slate-400">{programa.foco}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {programa.badges.map((badge) => (
                  <span
                    key={badge}
                    className="rounded-full border border-white/15 bg-[#0b1328]/80 px-3 py-1 text-xs font-medium text-slate-200"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {programa.etapas.map((etapa, j) => (
                <motion.div
                  key={etapa.nome}
                  className="rounded-xl border border-white/10 bg-[#0f1b33]/70 p-5 backdrop-blur"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: j * 0.1 }}
                >
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-base font-medium text-white">{etapa.nome}</h4>
                    <span className="rounded-full border border-white/15 bg-white/10 px-2 py-1 text-xs text-slate-200">
                      {etapa.status}
                    </span>
                  </div>

                  <div className="mt-4">
                    <div className="h-2 overflow-hidden rounded-full bg-slate-700/60">
                      <div
                        className={`h-full bg-gradient-to-r ${statusColor[etapa.status] || "from-slate-500 to-slate-600"}`}
                        style={{ width: `${etapa.progresso}%` }}
                      />
                    </div>
                    <div className="mt-1 text-right text-xs text-slate-400">{etapa.progresso}%</div>
                  </div>

                  <ul className="mt-4 space-y-1 text-sm text-slate-300">
                    {etapa.cursos.map((curso) => (
                      <li key={curso}>• {curso}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
