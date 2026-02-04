import { useState } from "react";
import SectionWrapper from "./SectionWrapper";
import { ChevronDown, ChevronUp } from "lucide-react";

const projects = [
  {
    id: "otd",
    title: "Evolução do OTD",
    tag: "Entregue",
    tagColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    summary: "Recuperação do On-Time Delivery de 83% para 89% em 60 dias através de auditoria diária e ajuste de prazos.",
    stats: [
      { label: "OTD Inicial", value: "83%" },
      { label: "OTD Atual", value: "89%" },
      { label: "Meta Nov", value: "96%" },
      { label: "Período", value: "60 dias" }
    ],
    challenge: "Prazos desatualizados e falta de visibilidade criavam promessas irreais de entrega, gerando insatisfação do cliente.",
    actions: [
      "Revisão completa da tabela de prazos com base em histórico real de entregas",
      "Remapeamento de regiões conforme performance real das transportadoras",
      "Implementação de auditoria diária com dashboard de acompanhamento",
      "Sistema de aviso preventivo ao Comercial em casos de risco de atraso"
    ],
    results: "OTD subiu de 83% para 89% em menos de 60 dias. Plano de ação estruturado projeta 96% até 3 meses com foco em transportadoras críticas."
  },
  {
    id: "romaneio",
    title: "Controle de Romaneios",
    tag: "Entregue",
    tagColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    summary: "Otimização do processo de emissão de romaneios com projeção de redução de 70% no tempo de digitalização.",
    stats: [
      { label: "Jun", value: "70" },
      { label: "Set", value: "356" },
      { label: "Tempo atual", value: "18,6h" },
      { label: "Meta redução", value: "-70%" }
    ],
    challenge: "Crescimento de 409% no volume de romaneios evidenciou gargalos graves no processo de digitalização e emissão.",
    actions: [
      "Análise comparativa detalhada Jun→Set identificando pontos de falha",
      "Simulação de cenários com diferentes volumes e prazos",
      "Integração operacional entre Faturamento e Expedição",
      "Padronização de critérios e priorização de lotes urgentes"
    ],
    results: "Plano conjunto com Faturamento projeta redução de 70% no tempo de digitalização através da eliminação de emissões redundantes."
  },
  {
    id: "devolucoes",
    title: "Gestão de Devoluções",
    tag: "Implementado",
    tagColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    summary: "Sistema Kanban priorizado por atraso real que normalizou o fluxo e eliminou gargalos recorrentes.",
    stats: [
      { label: "Monitoramento", value: "Diário" },
      { label: "Critério", value: "Dias atraso" },
      { label: "Retrabalho", value: "-65%" },
      { label: "SLA", value: "Normalizado" }
    ],
    challenge: "Pendências sem priorização clara geravam atrasos críticos e falta de visibilidade sobre impacto no SLA.",
    actions: [
      "Criação de Kanban priorizado por dias de atraso real",
      "Alimentação automática pela base de rastreio",
      "Visão única de pendências com responsáveis definidos",
      "Rotina de atualização diária com foco em gargalos"
    ],
    results: "Pendências críticas solucionadas e fluxo normalizado. Redução de 65% no retrabalho com foco no que mais impacta o SLA."
  },
  {
    id: "visibilidade",
    title: "Dashboard de Visibilidade",
    tag: "implementado",
    tagColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    summary: "Planilha inteligente com visão consolidada de entregas, atrasos e exceções para decisões rápidas.",
    stats: [
      { label: "Atualização", value: "Automática" },
      { label: "Tempo/NF", value: "~20s" },
      { label: "Erros", value: "-70%" },
      { label: "Clientes", value: "7k+" }
    ],
    challenge: "Falta de visão unificada dificultava priorização e comunicação eficaz com o time Comercial.",
    actions: [
      "Construção de planilha central com KPIs operacionais críticos",
      "Filtros inteligentes por nota fiscal, UF, transportadora e status",
      "Atualização automática via API - Power Query",
      "Alertas visuais para casos urgentes"
    ],
    results: "Respostas 70% mais rápidas, redução drástica de erros manuais e decisões baseadas em dados confiáveis."
  }
];

export default function Projects() {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <SectionWrapper id="projetos" title="Projetos & Resultados">
      <div className="space-y-6">
        {projects.map((project) => {
          const isExpanded = expandedId === project.id;
          
          return (
            <div 
              key={project.id}
              className="rounded-2xl border border-white/10 bg-[#0b1328]/60 overflow-hidden transition-all hover:border-[#00c9a7]/30"
            >
              {/* Header sempre visível */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-sm text-slate-400">{project.summary}</p>
                  </div>
                  <span className={`text-xs uppercase font-bold px-3 py-1 rounded-full border ${project.tagColor} whitespace-nowrap`}>
                    {project.tag}
                  </span>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                  {project.stats.map((stat, i) => (
                    <div key={i} className="bg-[#050b18] p-3 rounded-lg border border-white/5">
                      <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">
                        {stat.label}
                      </div>
                      <div className="text-lg font-bold text-[#00c9a7]">
                        {stat.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Botão de Expandir */}
                <button
                  onClick={() => toggleExpand(project.id)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-white/10 text-sm font-medium text-slate-300 hover:bg-white/5 hover:text-white transition-colors"
                >
                  {isExpanded ? (
                    <>
                      <span>Ver menos</span>
                      <ChevronUp className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      <span>Ver detalhes completos</span>
                      <ChevronDown className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              {/* Conteúdo Expandido */}
              {isExpanded && (
                <div className="px-6 pb-6 space-y-5 border-t border-white/10 pt-6 animate-fadeIn">
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-[#00c9a7] font-bold mb-2">
                      O Desafio
                    </h4>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {project.challenge}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-[#00c9a7] font-bold mb-2">
                      Ações Implementadas
                    </h4>
                    <ul className="space-y-2">
                      {project.actions.map((action, i) => (
                        <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                          <span className="text-[#00c9a7] mt-1">•</span>
                          <span>{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-[#00c9a7] font-bold mb-2">
                      Resultados
                    </h4>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {project.results}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* CTA Final */}
      <div className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-[#0b1328] to-[#0f1b33] border border-white/10 text-center">
        <h3 className="text-xl font-bold text-white mb-3">
          Quer saber mais sobre como esses resultados foram alcançados?
        </h3>
        <p className="text-slate-400 mb-6 max-w-2xl mx-auto">
          Tenho todos detalhes de cada projeto incluindo planilhas, dashboards e processos.
        </p>
        <a
          href="https://wa.me/5531972372452"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-lg bg-[#00c9a7] px-8 py-3 text-sm font-bold text-[#050b18] hover:scale-105 transition-transform"
        >
          Vamos conversar no WhatsApp
        </a>
      </div>
    </SectionWrapper>
  );
}
