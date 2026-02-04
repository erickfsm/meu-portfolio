import SectionWrapper from "./SectionWrapper";

const formacao = {

  aluraPlus: {
    titulo: "Formação Alura Plus",
    foco: "Análise de Dados e Automação",
    etapas: [
      {
        nome: "Consolidação Técnica",
        status: "Concluída",
        progresso: 100,
        cursos: [
          "Excel Avançado (Power Query, Pivot Tables, Fórmulas Complexas)",
          "Power BI para Análise de Dados",
          "SQL para Análise de Dados",
          "Fundamentos de Estatística"
        ]
      },
      {
        nome: "Eficiência e Melhoria Contínua",
        status: "Em andamento",
        progresso: 60,
        cursos: [
          "Lean Six Sigma Yellow Belt",
          "BPMN - Modelagem de Processos",
          "Metodologias Ágeis (Scrum, Kanban)",
          "Gestão de Projetos"
        ]
      },
      {
        nome: "Automação e Integração",
        status: "Planejada",
        progresso: 15,
        cursos: [
          "Power Automate",
          "Python para Automação",
          "APIs REST",
          "Integração de Sistemas"
        ]
      }
    ]
  },
  certificacoes: [
    {
      titulo: "Programa de Socioaprendizagem",
      instituicao: "ESPRO",
      ano: "2023",
      areas: ["Gestão", "Qualidade", "Atendimento", "Serviços"]
    },
    {
      titulo: "Desenvolvimento Pessoal e Interpessoal",
      instituicao: "Aprende Mais / SEST SENAT",
      ano: "2024",
      areas: ["Comunicação", "Liderança", "Trabalho em Equipe"]
    }
  ]
};

export default function Formacao() {
  return (
    <SectionWrapper id="formacao" title="Formação & Desenvolvimento">
    
      {/* Formação Alura Plus */}
      <div className="rounded-2xl border border-white/10 bg-[#0b1328]/60 p-8 mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">
          📊 {formacao.aluraPlus.titulo}
        </h3>
        <p className="text-slate-400 mb-6">
          Foco em {formacao.aluraPlus.foco}
        </p>

        <div className="space-y-6">
          {formacao.aluraPlus.etapas.map((etapa, index) => {
            const statusColors = {
              "Concluída": "from-emerald-400 to-emerald-500",
              "Em andamento": "from-amber-400 to-amber-500",
              "Planejada": "from-slate-500 to-slate-600"
            };

            return (
              <div 
                key={index}
                className="rounded-xl border border-white/10 bg-[#050b18]/50 p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-white">
                    Etapa {index + 1}: {etapa.nome}
                  </h4>
                  <span className="text-xs px-3 py-1 rounded-full bg-white/10 text-slate-300 border border-white/10">
                    {etapa.status}
                  </span>
                </div>

                {/* Barra de Progresso */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-slate-400 mb-2">
                    <span>Progresso</span>
                    <span>{etapa.progresso}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${statusColors[etapa.status]}`}
                      style={{ width: `${etapa.progresso}%` }}
                    />
                  </div>
                </div>

                {/* Lista de Cursos */}
                <ul className="space-y-2">
                  {etapa.cursos.map((curso, i) => (
                    <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                      <span className="text-[#00c9a7] mt-1">•</span>
                      <span>{curso}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      {/* Certificações Complementares */}
      <div className="rounded-2xl border border-white/10 bg-[#0b1328]/60 p-8">
        <h3 className="text-2xl font-bold text-white mb-6">
          🏆 Certificações Complementares
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          {formacao.certificacoes.map((cert, index) => (
            <div 
              key={index}
              className="rounded-xl border border-white/10 bg-[#050b18]/50 p-6"
            >
              <h4 className="text-lg font-semibold text-white mb-2">
                {cert.titulo}
              </h4>
              <p className="text-sm text-slate-400 mb-4">
                {cert.instituicao} · {cert.ano}
              </p>
              <div className="flex flex-wrap gap-2">
                {cert.areas.map((area) => (
                  <span 
                    key={area}
                    className="text-xs px-2.5 py-1 rounded-full bg-[#00c9a7]/10 text-[#00c9a7] border border-[#00c9a7]/20"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Resumo de Skills */}
      <div className="mt-8 p-8 rounded-2xl bg-gradient-to-r from-[#0b1328] to-[#0f1b33] border border-white/10">
        <h3 className="text-lg font-bold text-white mb-6 text-center">
          🎯 Stack Técnico Atual
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { skill: "Excel Avançado", level: "Avançado" },
            { skill: "Power BI", level: "Intermediário" },
            { skill: "Storytelling", level: "Intermediário" },
            { skill: "SQL", level: "Básico" },
            { skill: "BPMN", level: "Intermediário" },
            { skill: "Power Automate", level: "Básico" },
            { skill: "Python", level: "Aprendendo" },
            { skill: "Scrum/Kanban", level: "Intermediário" },
            { skill: "Lean Six Sigma", level: "Yellow Belt" }
          ].map((item) => (
            <div key={item.skill} className="text-center p-4 rounded-lg bg-white/5 border border-white/10">
              <div className="text-sm font-semibold text-white mb-1">
                {item.skill}
              </div>
              <div className="text-xs text-slate-400">
                {item.level}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
