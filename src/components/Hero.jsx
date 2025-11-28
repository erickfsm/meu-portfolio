import { motion } from "framer-motion";
import { heroHighlights } from "../data/profileData";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.08 * i } }),
};

export default function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="grid items-center gap-10 md:grid-cols-[1.2fr_0.8fr]">
          {/* Texto principal */}
          <div>
            <motion.h1
              initial="hidden" whileInView="show" viewport={{ once: true }}
              variants={fadeUp}
              className="text-3xl font-bold leading-tight text-white md:text-5xl"
            >
              Operações guiadas por <span className="text-[#00c9a7]">dados</span>,
              automação e entregas reais.
            </motion.h1>

            <motion.p
              custom={1} initial="hidden" whileInView="show" viewport={{ once: true }}
              variants={fadeUp}
              className="mt-4 max-w-xl text-slate-300"
            >
              Resultados comprovados em OTD, rastreio e redução de retrabalho. Em 6–8s, você sabe se
              eu sou o fit: veja os números abaixo.
            </motion.p>

            <motion.div
              custom={2} initial="hidden" whileInView="show" viewport={{ once: true }}
              variants={fadeUp}
              className="mt-6 flex flex-wrap gap-3"
            >
              <a
                href="#projetos"
                className="rounded-xl bg-[#00c9a7] px-5 py-3 text-sm font-semibold text-[#061122] shadow-[0_10px_30px_rgba(0,201,167,0.35)] transition hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00c9a7]"
              >
                Ver projetos em 30s
              </a>
              <a
                href="https://wa.me/5531972372452"
                className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:border-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
              >
                Falar no WhatsApp
              </a>
              <a
                href="/Erick_FSM_CV.pdf"
                className="rounded-xl border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
              >
                Baixar CV (PDF)
              </a>
            </motion.div>
          </div>

          {/* Cartão/Foto */}
          <motion.div
            custom={3} initial="hidden" whileInView="show" viewport={{ once: true }}
            variants={fadeUp}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_22px_70px_rgba(8,15,35,0.35)] backdrop-blur"
          >
            <figure className="overflow-hidden rounded-xl border border-white/10 bg-[#050b18]/60">
              <img
                src="/foto-perfil.jpg"
                alt="Erick Filipe – Data-driven Ops"
                loading="eager"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </figure>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {heroHighlights.map((h, i) => (
                <motion.div
                  key={h.label}
                  custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
                  className="rounded-xl border border-white/10 bg-[#0b1328]/80 p-3 text-center"
                >
                  <div className="text-xs uppercase tracking-[0.3em] text-slate-400">{h.label}</div>
                  <div className="mt-1 text-lg font-semibold text-white">{h.value}</div>
                  <div className="text-[11px] text-slate-400">{h.helper}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* gradiente decorativo sutil */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[80vw] -translate-x-1/2 rounded-[999px] bg-gradient-to-r from-[#00c9a7]/15 to-[#6ee7ff]/10 blur-3xl"
      />
    </section>
  );
}
