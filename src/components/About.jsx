import { motion } from "framer-motion";

export default function About() {
  return (
    <section
      id="sobre"
      className="max-w-5xl mx-auto px-6 py-24 text-slate-200"
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-3xl font-bold mb-6 text-center text-white"
      >
        Sobre Mim
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="leading-relaxed text-lg text-slate-300 text-justify"
      >
        Sou <strong>Erick Filipe</strong>, apaixonado por entender como dados e processos
        podem transformar resultados reais.  
        Iniciei minha carreira aos 15 anos como aprendiz, atuando em setores como compras e
        almoxarifado. Essa vivência me deu uma visão ampla sobre a importância da eficiência
        operacional e da comunicação entre áreas.  
        <br /><br />
        Aos 18, entrei no setor de transporte de uma distribuidora farmacêutica, onde
        desenvolvi projetos de rastreamento, controle de entregas e dashboards logísticos,
        aplicando automações e análises de dados para reduzir custos e atrasos.
        <br /><br />
        Hoje, com 19 anos, estudo <strong>ADS (PUC Minas)</strong> e sigo evoluindo para me tornar
        um profissional completo em <strong>operações e análise de dados</strong>,
        unindo tecnologia, estratégia e propósito.
      </motion.p>
    </section>
  );
}