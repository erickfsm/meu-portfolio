export const projectCases = [
  {
    id: "otd",
    title: "Evolução do OTD",
    status: "Em andamento",
    progress: 72,
    meta: "OTD ≥ 96%",
    summary:
      "Melhoria de 83% → 89% (Jul→Ago) com auditoria diária, ajuste de prazos por transportadora e aviso preventivo. Plano rumo a 96% até novembro.",
    challenge:
      "Ausência de visibilidade clara e prazos desatualizados por transportadora geravam atrasos recorrentes.",
    action: [
      "Revisão da tabela de prazos com base no histórico real",
      "Remapeamento de regiões conforme performance das transportadoras",
      "Auditoria diária e aviso preventivo ao Comercial em casos de risco",
    ],
    result:
      "OTD subiu de 83% para 89% (Jul→Ago). Plano de ação projeta 96% até novembro.",
    highlights: [
      { label: "OTD Jul", value: "83%" },
      { label: "OTD Ago", value: "89%" },
      { label: "Meta", value: "96%" },
      { label: "Auditoria", value: "Diária" },
    ],
    narrative: [
      "Contexto: prazos desatualizados e sem visibilidade clara criavam promessas irreais de entrega.",
      "Ações: revisão de prazos por transportadora, auditoria diária e comunicação preventiva com o Comercial.",
      "Resultados: OTD recuperado de 83% para 89% em 60 dias com plano rumo a 96%.",
    ],
    chart: {
      type: "line",
      labels: ["Jul", "Ago", "Nov (meta)"],
      data: [83, 89, 96],
    },
  },
  {
    id: "romaneio",
    title: "Controle de Romaneios",
    status: "Plano executando",
    progress: 40,
    meta: "Corte de 70% no mês",
    summary:
      "Crescimento acelerado expôs gargalos. Plano conjunto com Faturamento e Expedição projeta redução de 70% do tempo de digitalização em outubro.",
    challenge:
      "Curva de crescimento acelerada do volume de romaneios elevou o tempo de digitalização e aumentou o risco de erro.",
    action: [
      "Análise comparativa Jun→Set e simulação de cenários",
      "Integração das rotinas entre Faturamento e Expedição",
      "Padronização de critérios e priorização de lotes para reduzir emissões redundantes",
    ],
    result:
      "Plano conjunto projeta redução de 70% do tempo de digitalização em outubro.",
    highlights: [
      { label: "Jun", value: "70" },
      { label: "Set (parcial)", value: "356" },
      { label: "Tempo digit.", value: "18,6 h" },
      { label: "Redução alvo", value: "−70%" },
    ],
    narrative: [
      "Problema: crescimento acelerado evidenciou gargalos e retrabalho.",
      "Diagnóstico: correlação entre emissões, faturamento e lead time, com falhas de comunicação identificadas.",
      "Plano: integração entre Expedição/Faturamento e corte de emissões desnecessárias com meta de −70%.",
    ],
    chart: {
      type: "bar",
      labels: ["Jun", "Jul", "Ago", "Set", "Out (proj)"],
      data: [70, 120, 240, 356, Math.round(356 * 0.3)],
    },
  },
  {
    id: "devolucoes",
    title: "Controle de Devoluções (Kanban)",
    status: "Entregue",
    progress: 100,
    meta: "Fluxo normalizado",
    summary:
      "Kanban priorizado por atraso real, status e responsáveis. Normalizou fluxo e eliminou gargalos recorrentes.",
    challenge:
      "Pendências sem priorização clara geravam atrasos e falta de visibilidade sobre o que mais impactava o SLA.",
    action: [
      "Kanban priorizado por atraso real alimentado pela base de rastreio",
      "Visão única das pendências com status e responsáveis",
      "Rotina de atualização diária para eliminar gargalos recorrentes",
    ],
    result:
      "Pendências críticas solucionadas e fluxo normalizado com foco no que mais impacta o SLA.",
    highlights: [
      { label: "Monitoramento", value: "Diário" },
      { label: "Critério", value: "Dias em atraso" },
      { label: "Pendências", value: "Resolvidas" },
      { label: "Retrabalho", value: "↓ significativo" },
    ],
    narrative: [
      "Resumo: kanban trouxe previsibilidade e foco nas pendências mais críticas.",
      "Como: priorização por atraso, visão única e responsabilidade clara por etapa.",
    ],
  },
  {
    id: "visibilidade",
    title: "Planilha Inteligente — Visibilidade Diária",
    status: "Operando",
    progress: 85,
    meta: "Zero retrabalho manual",
    summary:
      "Consolidação diária com visão única de entregas, atrasos e exceções — base para reportes ao Comercial.",
    challenge:
      "Faltava visão unificada das entregas, atrasos e exceções para orientar o time Comercial e Operações.",
    action: [
      "Construção de planilha central com KPIs operacionais",
      "Filtros por vendedor, UF, transportadora e status",
      "Atualização automática para acelerar reportes e decisões",
    ],
    result:
      "Resposta mais rápida, menos erros manuais e decisões baseadas em dados.",
    highlights: [
      { label: "Atualização", value: "Automática" },
      { label: "Tempo/NF", value: "≈ 20 s" },
      { label: "Erros", value: "−70%" },
      { label: "Cobertura", value: "3k+ cidades" },
    ],
    narrative: [
      "Contexto: ausência de visão unificada dificultava priorização e comunicação.",
      "Entrega: planilha com KPIs, filtros e atualização automática.",
      "Impacto: redução de erros e respostas mais rápidas ao Comercial.",
    ],
  },
  {
    id: "bpm",
    title: "Mapeamento de Processos (BPM)",
    status: "Interrompido",
    progress: 28,
    meta: "Playbook + RACI",
    summary:
      "Padronização dos fluxos de faturamento, expedição e transporte. Projeto pausado com insumos prontos para retomada.",
    challenge:
      "Falta de padronização entre faturamento, expedição e transporte gerava variação na execução.",
    action: [
      "Mapeamento BPMN 2.0 dos fluxos críticos",
      "Identificação de handoffs e pontos de auditoria",
      "Preparação de matriz RACI para retomada com patrocinador",
    ],
    result:
      "Projeto suspenso por mudança de contexto, com aprendizados preservados para futura retomada.",
    highlights: [
      { label: "Escopo", value: "FAT · EXP · TRP" },
      { label: "Artefatos", value: "BPMN 2.0" },
      { label: "Críticos", value: "Handoffs" },
      { label: "Status", value: "Interrompido" },
    ],
    narrative: [
      "Objetivo: padronizar fluxos críticos e reduzir variação na execução.",
      "Status: interrompido por mudança de contexto, com materiais prontos para retomada.",
    ],
  },
];
