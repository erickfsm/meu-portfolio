import { motion } from "framer-motion";
import { methodologies } from "../data/methodologiesData";

export default function Methodologies() {
  return (
    <section id="methodologies" className="relative py-20">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#081226] via-[#0a1630] to-[#060b1c]" />

      <div className="max-w-6xl mx-auto px-6 text-slate-200">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-center mb-12">
          Metodologias & Cultura de Alta Performance
        </h2>

        {methodologies.map((cat, i) => (
          <motion.div
            key={i}
            className="mb-14 bg-white/5 border border-white/10 rounded-2xl p-8"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.1 }}
          >
            <h3 className="text-xl font-semibold text-white">{cat.categoria}</h3>
            <p className="text-slate-400 text-sm mb-6 mt-1">{cat.descricao}</p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {cat.metodos.map((m, j) => (
                <motion.div
                  key={j}
                  className="bg-white/5 border border-white/10 rounded-xl p-5"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: j * 0.08 }}
                >
                  <div className="text-[#00c9a7] font-semibold text-sm tracking-wide">
                    {m.nome}
                  </div>
                  <p className="text-slate-300 text-sm mt-1 leading-relaxed">
                    {m.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}