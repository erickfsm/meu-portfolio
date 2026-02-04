import SectionWrapper from "./SectionWrapper";

const timeline = [
  {
    year: "09/2022 - 12/2023",
    role: "Jovem Aprendiz · ESAB Indústria",
    company: "ESAB Indústria e Comércio",
    location: "Contagem, MG",
    description: "Primeiro contato com o mundo corporativo. Atuei em compras indiretas, cadastro de fornecedores, follow-up de pedidos e gestão de almoxarifado.",
    achievements: [
      "Aprendi fundamentos de SAP e processos de compras e suprimentos",
      "Desenvolvi organização e metodologia de trabalho",
      "Experiência com transferências entre filiais e conferência de notas"
    ],
    skills: ["SAP", "Compras", "Almoxarifado", "Excel Básico", "Supply Chain"]
  },
  {
    year: "01/2024 - 09/2025",
    role: "Auxiliar de Transporte e SAC · Global Hospitalar",
    company: "Global Hospitalar",
    location: "Contagem, MG",
    description: "Responsável por gestão de entregas, rastreamento, devoluções, contato com cliente e indenizações. E apoio na operação de faturamento, roteirização, romaneio e organização de documentos e etc.",
    achievements: [
      "Aumentamos OTD de 83% para 89% em menos de 60 dias",
      "Criei planilhas inteligentes que reduziram retrabalho em 30%",
      "Implementei sistema Kanban para devoluções",
      "Reduzimos 70% do retrabalho em romaneio",
      "Escuta ativa ao cliente melhorou OTD em 6%",
      "Tomei a iniciativa de liderar mapeamento de processos críticos (BPMN)"
    ],
    skills: ["Excel Avançado", "Power BI", "Kanban", "Gestão de KPIs", "Atendimento ao cliente"]
  },

  {
    year: "Atual",
    role: "Estudante de tecnologia",
    company: "Alura",
    location: "Belo Horizonte / Ibirité, MG",
    description: "Cursando Formação em Análise de Dados e Ciência de Dados, focando em SQL, Python, Power Automate e metodologias ágeis.",
    achievements: [
      "Unindo formação técnica com visão de negócio",
      "Desenvolvendo habilidades em SQL, Python e automação",
      "Aplicando metodologias ágeis no empreendimento"
    ],
    skills: ["SQL", "Python", "Power Automate", "Scrum", "Visão de Negócio"]
  }
];

export default function Timeline() {
  return (
    <SectionWrapper id="trajetoria" title="Minha Trajetória">
      <div className="relative">
        {/* Linha do Tempo */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#00c9a7] via-[#6c3cff] to-transparent" />

        <div className="space-y-12">
          {timeline.map((item, index) => (
            <div 
              key={index}
              className={`relative flex gap-8 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Bolinha da Timeline */}
              <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-6 w-4 h-4 rounded-full bg-[#00c9a7] ring-4 ring-[#0b1328] z-10" />

              {/* Espaçador para mobile */}
              <div className="w-12 flex-shrink-0 md:hidden" />

              {/* Conteúdo */}
              <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:pl-12'}`}>
                <div className="inline-block">
                  <span className="inline-block px-3 py-1 rounded-full bg-[#00c9a7]/10 border border-[#00c9a7]/20 text-[#00c9a7] text-xs font-bold uppercase mb-3">
                    {item.year}
                  </span>
                </div>

                <div className={`rounded-2xl border border-white/10 bg-[#0b1328]/60 p-6 backdrop-blur-sm transition-all hover:border-[#00c9a7]/30 hover:bg-[#0b1328]`}>
                  <h3 className="text-xl font-bold text-white mb-1">
                    {item.role}
                  </h3>
                  <div className="text-sm text-slate-400 mb-4">
                    {item.company} · {item.location}
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed mb-4">
                    {item.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="text-xs uppercase tracking-wider text-[#00c9a7] font-semibold">
                      Principais Conquistas:
                    </div>
                    <ul className="space-y-1.5">
                      {item.achievements.map((achievement, i) => (
                        <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                          <span className="text-[#00c9a7] mt-1">✓</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-3 border-t border-white/10">
                    {item.skills.map((skill) => (
                      <span 
                        key={skill}
                        className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-slate-400 border border-white/10"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Espaçador para desktop */}
              <div className="hidden md:block flex-1" />
            </div>
          ))}
        </div>
      </div>

      {/* Resumo da Trajetória */}
      <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-[#0b1328] to-[#0f1b33] border border-white/10">
        <h3 className="text-lg font-bold text-white mb-3 text-center">
          🎯 Resumo da Jornada
        </h3>
        <div className="grid md:grid-cols-3 gap-6 mt-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-[#00c9a7]">3+</div>
            <div className="text-sm text-slate-400 mt-1">Anos de experiência</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#00c9a7]">4</div>
            <div className="text-sm text-slate-400 mt-1">Projetos de impacto</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#00c9a7]">89%</div>
            <div className="text-sm text-slate-400 mt-1">OTD alcançado</div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
