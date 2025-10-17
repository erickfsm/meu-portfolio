import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";

export default function About() {
  return (
    <SectionWrapper id="sobre" contentClassName="mx-auto max-w-3xl text-center md:text-left">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="section-title"
      >
        Sobre Mim
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="mt-6 text-lg leading-relaxed text-slate-300 md:text-[1.1rem]"
      >
        Sou <strong>Erick Filipe</strong> e iniciei minha trajetória aos <strong>15 anos</strong> como aprendiz.
        A experiência em compras, almoxarifado e logística trouxe visão de ponta a ponta e a certeza
        de que processos bem cuidados sustentam a operação.
        <br />
        <br />
        Aos 18 anos, mergulhei no transporte farmacêutico e construí rotinas de rastreamento,
        dashboards e automações que reduziram atrasos e retrabalho. Hoje, com 19, sigo estudando
        <strong> ADS (PUC Minas)</strong> e aplicando dados para transformar operações em resultados reais,
        sempre guiado por melhoria contínua.
      </motion.p>
    </SectionWrapper>
  );
}