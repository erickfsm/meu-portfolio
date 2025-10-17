import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";

const timeline = [
  {
    ano: "2022",
    empresa: "ESAB",
    cargo: "Jovem Aprendiz (Compras & Logística)",
    desc:
      "Início no mundo corporativo. Rotinas de compras e cadastros no ERP (SAP). Base sólida de processos.",
  },
  {
    ano: "2024 (início)",
    empresa: "Bio Beauty Industry",
    cargo: "Auxiliar de Almoxarifado",
    desc:
      "Controle de estoque e apoio à expedição. Visão operacional e fluxo de pedidos.",
  },
  {
    ano: "2024 (meio)",
    empresa: "Global Hospitalar",
    cargo: "Auxiliar de SAC / Transporte",
    desc:
      "Rastreamento, prazos e contato com clientes. Olhar para dados e performance.",
  },
  {
    ano: "2025",
    empresa: "Global Hospitalar (fase analítica)",
    cargo: "Auxiliar de Transporte — Data-Driven",
    desc:
      "Dashboards, métricas de OTD e automações simples para reduzir retrabalho.",
  },
  {
    ano: "Hoje",
    empresa: "Desenvolvimento Profissional",
    cargo: "ADS (PUC Minas) + Formação Alura",
    desc:
      "Plano de 90 dias: Power BI, SQL, Lean/Kaizen, automação (Power Automate / APIs).",
  },
];

export default function Timeline() {
  return (
    <SectionWrapper id="timeline" contentClassName="mx-auto max-w-3xl">
      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="section-title"
      >
        Minha trajetória
      </motion.h2>
      <div className="mt-10 relative border-l border-white/10 pl-6">
        {timeline.map((item, i) => (
          <motion.div
            key={item.ano}
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="mb-10"
          >
            <div className="absolute -left-[7px] mt-2 h-3 w-3 rounded-full bg-[#00c9a7] shadow-[0_0_15px_rgba(0,201,167,0.8)]" />
            <div className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <div className="text-sm text-slate-400">{item.ano} — {item.empresa}</div>
              <div className="text-white font-semibold">{item.cargo}</div>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}