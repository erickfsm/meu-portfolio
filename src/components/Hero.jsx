import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useMemo, useRef } from "react";
import Typewriter from "typewriter-effect";
import { heroHighlights } from "../data/profileData";

export default function Hero() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const parallaxOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.5]);
  const prefersReducedMotion = useReducedMotion();

  const highlightItems = useMemo(
    () =>
      heroHighlights.map((item) => (
        <div key={item.label} className="rounded-xl bg-[#0c162f]/70 p-4">
          <div className="text-[11px] uppercase tracking-[0.24em] text-[#00c9a7]">{item.label}</div>
          <div className="mt-2 text-xl font-semibold text-white">{item.value}</div>
          <p className="mt-1 text-xs text-slate-400">{item.helper}</p>
        </div>
      )),
    []
  );
  const parallaxStyle = prefersReducedMotion ? { opacity: 1 } : { y: parallaxY, opacity: parallaxOpacity };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center text-white"
    >
      <div className="absolute inset-0 -z-30 bg-gradient-to-b from-[#05070f] via-[#081735] to-[#04060f]" />

      <div className="pointer-events-none absolute inset-0 -z-20 overflow-hidden">
        <div className="absolute -inset-[40%] opacity-30 [background-image:radial-gradient(rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:120px_120px] [filter:blur(0.5px)] animate-[heroParticles_28s_linear_infinite]" />
        <motion.div style={parallaxStyle} className="absolute inset-0">
          <div className="absolute -top-32 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[#6c3cff33] blur-3xl" />
          <div className="absolute -bottom-44 right-1/3 h-[520px] w-[520px] rounded-full bg-[#00c9a733] blur-[140px]" />
        </motion.div>
      </div>

      <div className="absolute inset-x-0 top-[18%] -z-10 mx-auto h-64 w-64 rounded-full bg-[#0c1f4b] opacity-60 blur-[140px] [animation:heroGlowFloat_12s_ease-in-out_infinite]" />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-6">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl font-extrabold tracking-tight md:text-6xl"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            <motion.span
              animate={
                prefersReducedMotion
                  ? undefined
                  : { y: [0, -12, 0] }
              }
              transition={
                prefersReducedMotion
                  ? undefined
                  : { duration: 6, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }
              }
            >
              De aprendiz a analista de operações
            </motion.span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-xs uppercase tracking-[0.22em] text-slate-300 sm:text-sm md:text-base md:tracking-[0.28em]"
          >
            {prefersReducedMotion ? (
              <span>Data · Performance · Estratégia</span>
            ) : (
              <Typewriter
                options={{
                  strings: [
                    "Data · Performance · Estratégia",
                    "Alta performance com propósito",
                    "Transformando dados em resultados reais",
                  ],
                  autoStart: true,
                  loop: true,
                  delay: 50,
                  deleteSpeed: 25,
                }}
              />
            )}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="mt-6 max-w-2xl text-base leading-relaxed text-slate-300 md:text-lg"
          >
            Tenho <strong>19 anos</strong> e iniciei minha trajetória aos <strong>15</strong> como aprendiz. Hoje, estudante de
            <strong> ADS (PUC Minas)</strong>, aplico dados, automação e melhoria contínua para transformar operação em
            <strong> resultado mensurável</strong>.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <a
            href="#timeline"
            className="rounded-full bg-gradient-to-r from-[#6c3cff] to-[#00c9a7] px-7 py-3 text-sm font-semibold uppercase tracking-wide text-black shadow-lg shadow-[#6c3cff33] transition hover:scale-105 hover:shadow-[#00c9a733]"
          >
            Explorar trajetória
          </a>
          <a
            href="#sobre"
            className="rounded-full border border-white/10 px-7 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:border-white/30 hover:bg-white/10"
          >
            Sobre mim
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="grid w-full max-w-3xl grid-cols-1 gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 text-left shadow-[0_22px_70px_rgba(8,15,35,0.3)] backdrop-blur sm:grid-cols-2 lg:grid-cols-3"
        >
          {highlightItems}
        </motion.div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#03040b] via-[#040712]/70 to-transparent" />
    </section>
  );
}
