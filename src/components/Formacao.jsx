import { motion } from "framer-motion";
import { formacao } from "../data/formacaoData";

const statusColor = {
  Concluída: "from-green-400 to-emerald-500",
  "Em andamento": "from-yellow-400 to-amber-500",
  Planejada: "from-slate-400 to-slate-500",
};

export default function Formacao() {
  return (
    <section id="formacao" className="relative py-20">
      {/* Fundo imersivo */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#081226] via-[#0a1630] to-[#060b1c]" />
      <div className="max-w-6xl mx-auto px-6 text-slate-200">
        <motion.h2
          className="text-3xl md:text-4xl font-extrabold tracking-tight text-center mb-12"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          Formação e Desenvolvimento Profissional
        </motion.h2>

        {formacao.map((programa, i) => (
          <motion.div
            key={i}
            className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <h3 className="text-xl font-semibold text-white">{programa.programa}</h3>
            <p className="text-slate-400 text-sm mb-6">{programa.foco}</p>

            <div className="grid md:grid-cols-3 gap-6">
              {programa.etapas.map((etapa, j) => (
                <motion.div
                  key={j}
                  className="bg-white/5 border border-white/10 rounded-xl p-5"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: j * 0.1 }}
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-white font-medium text-base">{etapa.nome}</h4>
                    <span
                      className={`text-xs px-3 py-1 rounded-full bg-gradient-to-r ${
                        statusColor[etapa.status]
                      } text-black font-semibold`}
                    >
                      {etapa.status}
                    </span>
                  </div>

                  {/* Barra de progresso */}
                  <div className="mt-4">
                    <div className="h-2 bg-slate-700/60 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${statusColor[etapa.status]}`}
                        style={{
                          width:
                            etapa.status === "Concluída"
                              ? "100%"
                              : etapa.status === "Em andamento"
                              ? "45%"
                              : "10%",
                        }}
                      />
                    </div>
                  </div>

                  <ul className="mt-4 space-y-1 text-sm text-slate-300">
                    {etapa.cursos.map((curso, k) => (
                      <li key={k}>• {curso}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}