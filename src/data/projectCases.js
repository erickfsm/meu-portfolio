export const projectCases = [
  {
    id: "otd",
    title: "Evolução do OTD",
    status: "Em andamento",
    progress: 72,
    meta: "OTD ≥ 96%",
    challenge:
      "Sem visibilidade confiável dos prazos por transportadora, o atendimento prometia datas irreais e aumentava atrasos.",
    action: [
      "Auditoria diária dos atrasos e recalibração dos prazos por histórico real",
      "Roteiro preventivo de contato com transportadoras e time comercial",
      "Dashboard com heatmap de risco por UF e transportadora",
    ],
    result:
      "OTD subiu de 83% para 89% em 60 dias. Plano de ação ativo projeta 96% até novembro.",
    highlights: [
      { label: "Jul", value: "83%" },
      { label: "Ago", value: "89%" },
      { label: "Meta", value: "96%" },
      { label: "Auditoria", value: "Diária" },
    ],
    narrative: [
      "Mapeamento da base histórica para ajustar prazos e alinhar expectativas com clientes.",
      "Automação de alertas diários para priorizar ocorrências críticas.",
      "Reuniões semanais com transportadoras para revisar performance e plano de ação.",
    ],
    chart: {
      type: "line",
      labels: ["Jul", "Ago", "Set (proj)", "Nov (meta)"],
      data: [83, 89, 93, 96],
    },
  },
  {
    id: "romaneio",
    title: "Controle de Romaneios",
    status: "Plano executando",
    progress: 40,
    meta: "−70% no tempo de digitalização",
    challenge:
      "Volume de romaneios cresceu 409% em três meses, estourando o tempo de digitação e gerando gargalos na expedição.",
    action: [
      "Correlação entre emissões, faturamento e lead time para encontrar gargalos",
      "Padronização do fluxo expedição ↔ faturamento com prioridade por tipo de carga",
      "Dashboard de capacidade para projetar pico de +699% e antecipar recursos",
    ],
    result:
      "Processo redesenhado com metas semanais. Projeção aponta redução de 70% do tempo em outubro.",
    highlights: [
      { label: "Jun", value: "70" },
      { label: "Ago", value: "240" },
      { label: "Set parcial", value: "356" },
      { label: "Redução alvo", value: "−70%" },
    ],
    narrative: [
      "Simulação de cenários com Power Query para dimensionar equipe e turnos.",
      "Checkpoints diários com expedição para eliminar emissões duplicadas.",
      "Documentação do novo fluxo e indicadores de aderência para manter disciplina.",
    ],
    chart: {
      type: "bar",
      labels: ["Jun", "Jul", "Ago", "Set", "Out (proj)"],
      data: [70, 120, 240, 356, Math.round(356 * 0.3)],
    },
  },
  {
    id: "devolucoes",
    title: "Controle de Devoluções",
    status: "POC",
    progress: 55,
    meta: "Kanban automatizado",
    challenge:
      "Projeto interrompido sem governança clara. Era preciso visibilidade diária para reativar o fluxo.",
    action: [
      "Kanban em planilha conectada ao rastreamento para priorizar por atraso real",
      "Categorias de bloqueio para expor gargalos de SAC, Fiscal e Transporte",
      "Rituais semanais com responsáveis até definir ferramenta definitiva",
    ],
    result:
      "Projeto beta validado: pendências críticas controladas e rotina reativada aguardando automação.",
    highlights: [
      { label: "Monitoramento", value: "Diário" },
      { label: "Pendências", value: "Classificadas" },
      { label: "Status", value: "POC ativa" },
      { label: "Próximo", value: "Bot Gemini" },
    ],
    narrative: [
      "Framework de prioridades (Atraso, Cliente, Valor) para escalonar decisões.",
      "Checklist de retomada compartilhado com SAC e Fiscal.",
      "Plano para integração com chatbot Gemini auxiliando tratativas.",
    ],
  },
];
