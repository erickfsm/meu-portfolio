import { motion } from "framer-motion";

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
    <section id="timeline" className="max-w-6xl mx-auto px-6 py-20">
      <h2 className="text-3xl font-bold text-center mb-12">Minha trajetória</h2>
      <div className="relative border-l border-white/10 pl-6">
        {timeline.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="mb-10"
          >
            <div className="absolute -left-[7px] mt-2 w-3 h-3 rounded-full bg-[#00c9a7]" />
            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <div className="text-sm text-slate-400">{item.ano} — {item.empresa}</div>
              <div className="text-white font-semibold">{item.cargo}</div>
              <p className="text-slate-300 text-sm mt-2 leading-relaxed">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}