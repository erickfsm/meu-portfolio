import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Typewriter from "typewriter-effect";

export default function Hero() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const parallaxOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.5]);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center text-white"
    >
      {/* Fundo base contínuo */}
      <div className="absolute inset-0 -z-30 bg-gradient-to-b from-[#05070f] via-[#081735] to-[#04060f]" />

      {/* Partículas suaves */}
      <div className="pointer-events-none absolute inset-0 -z-20 overflow-hidden">
        <div className="absolute -inset-[40%] opacity-30 [background-image:radial-gradient(rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:120px_120px] [filter:blur(0.5px)] animate-[heroParticles_28s_linear_infinite]" />
        <motion.div
          style={{ y: parallaxY, opacity: parallaxOpacity }}
          className="absolute inset-0"
        >
          <div className="absolute -top-32 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[#6c3cff33] blur-3xl" />
          <div className="absolute -bottom-44 right-1/3 h-[520px] w-[520px] rounded-full bg-[#00c9a733] blur-[140px]" />
        </motion.div>
      </div>

      {/* Glow flutuante atrás do conteúdo */}
      <div className="absolute inset-x-0 top-[18%] -z-10 mx-auto h-64 w-64 rounded-full bg-[#0c1f4b] opacity-60 blur-[140px] [animation:heroGlowFloat_12s_ease-in-out_infinite]" />

      {/* Conteúdo */}
      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl font-extrabold tracking-tight md:text-6xl"
          style={{ fontFamily: "Orbitron, sans-serif" }}
        >
          <motion.span
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          >
            De aprendiz a analista de operações
          </motion.span>
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-4 text-sm uppercase tracking-[0.3em] text-slate-300 md:text-base"
          style={{ letterSpacing: "0.28em" }}
        >
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
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-slate-300 md:text-lg"
        >
          Tenho <strong>19 anos</strong> e iniciei minha trajetória aos <strong>15</strong> como aprendiz. Hoje,
          estudante de <strong>ADS (PUC Minas)</strong>, aplico dados, automação e melhoria contínua para
          transformar operação em <strong>resultado mensurável</strong>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.6 }}
          className="mt-10 flex flex-wrap justify-center gap-4"
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
      </div>

      {/* Transição sutil para próxima seção */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#03040b] via-[#040712]/70 to-transparent" />
    </section>
  );
}
