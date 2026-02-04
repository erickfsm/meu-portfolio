import SectionWrapper from "./SectionWrapper";

const methodologies = [
  {
    name: "5S",
    desc: "Base da organização e disciplina operacional",
    principles: [
      { name: "Seiri", desc: "Utilização - Eliminar o desnecessário" },
      { name: "Seiton", desc: "Ordenação - Organizar logicamente" },
      { name: "Seiso", desc: "Limpeza - Manter ambiente/dados limpos" },
      { name: "Seiketsu", desc: "Padronização - Criar padrões claros" },
      { name: "Shitsuke", desc: "Disciplina - Cultivar constância" }
    ]
  },
  {
    name: "Melhoria Contínua",
    desc: "Frameworks para eficiência e aprendizado",
    principles: [
      { name: "PDCA", desc: "Planejar, Executar, Verificar, Agir" },
      { name: "Kaizen", desc: "Aprimoramento incremental diário" },
      { name: "Scrum", desc: "Sprints iterativas com entregas de valor" },
      { name: "Kanban", desc: "Visualização e controle de fluxo" }
    ]
  }
];

export default function Methodologies() {
  return (
    <SectionWrapper id="metodologias" title="Metodologias & Cultura">
      <div className="space-y-8">
        {methodologies.map((category, i) => (
          <div 
            key={i}
            className="rounded-2xl border border-white/10 bg-[#0b1328]/60 p-8"
          >
            <h3 className="text-2xl font-bold text-white mb-2">
              {category.name}
            </h3>
            <p className="text-slate-400 mb-6">
              {category.desc}
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.principles.map((principle, j) => (
                <div 
                  key={j}
                  className="rounded-xl border border-white/10 bg-[#050b18]/50 p-5 hover:border-[#00c9a7]/30 transition-all"
                >
                  <div className="text-sm font-bold text-[#00c9a7] uppercase tracking-wider mb-2">
                    {principle.name}
                  </div>
                  <p className="text-sm text-slate-300">
                    {principle.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 rounded-xl bg-[#0b1328]/60 border border-white/10">
        <p className="text-sm text-slate-300 text-center italic">
          <strong className="text-[#00c9a7]">Aplicação prática:</strong> Todas essas 
          metodologias foram aplicadas nos projetos da Global Hospitalar, resultando 
          em melhorias mensuráveis no OTD, tempo de processamento e qualidade operacional.
        </p>
      </div>
    </SectionWrapper>
  );
}
