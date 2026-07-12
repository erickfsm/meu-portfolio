// Todos os dados abaixo são fictícios (mock), usados apenas para simular
// o comportamento das interfaces dentro do "Showroom de Projetos".

export const profile = {
  name: "Erick Filipe",
  fullName: "Erick Filipe da Silva Marques",
  role: "Analista de Operações & Dados",
  roleSub: "Supply Chain & Torre de Controle",
  email: "erickfilipe66@gmail.com",
  linkedin: "https://www.linkedin.com/in/erickfsm",
  whatsapp: "https://wa.me/5531972372452",
  cv: "/Cv__Erick_Filipe_logistico.pdf",
};

export const heroMetrics = [
  { label: "DS Last Mile", value: "+6,4 pp", hint: "torre de controle" },
  { label: "SLA de PNR", value: "-42%", hint: "tempo médio de resolução" },
  { label: "Bases monitoradas", value: "12", hint: "em tempo real" },
];

export const timelineData = [
  {
    id: 1,
    period: "2022 — 2023",
    label: "Fundamentos B2B",
    subtitle: "Suprimentos, Estoque & Compras",
    description:
      "Base sólida em operações B2B: gestão de suprimentos, controle de estoque e processos de compras em ambiente industrial, com primeiro contato com sistemas de gestão (SAP).",
    tags: ["Suprimentos", "Gestão de Estoque", "Compras", "SAP"],
  },
  {
    id: 2,
    period: "2024 — 2025",
    label: "Automação & Processos",
    subtitle: "APIs, Power Query, SSOT & Ágil",
    description:
      "Integração de sistemas via APIs, tratamento de dados com Power Query, construção de fonte única da verdade (SSOT) e adoção de metodologias ágeis para eliminar retrabalho.",
    tags: ["APIs", "Power Query", "SSOT", "Scrum", "Kanban"],
  },
  {
    id: 3,
    period: "2026",
    label: "Inteligência Operacional",
    subtitle: "SQL, Torre de Controle & Governança",
    description:
      "Atuação em larga escala: consultas SQL, torres de controle para Last Mile e governança de dados como pilar central da tomada de decisão.",
    tags: ["SQL", "Torre de Controle", "Last Mile", "Governança de Dados"],
  },
];

export const projects = [
  {
    id: "torre-controle",
    number: "01",
    type: "control-tower",
    title: "Dashboard de Torre de Controle",
    subtitle: "Monitoramento em tempo real · Last Mile",
    description:
      "Painel de comando para bases logísticas com KPIs de Delivery Success e atribuição inteligente de motoristas.",
    tags: ["SQL", "APIs", "Dashboards", "Last Mile"],
    accent: "gold",
    tour: [
      {
        title: "A Dor Operacional",
        text: "Bases logísticas operavam sem visibilidade centralizada. A atribuição de motoristas era manual e o Delivery Success (DS) só era conhecido no dia seguinte — decisões sempre reativas.",
      },
      {
        title: "A Solução Aplicada",
        text: "Construí uma Torre de Controle que centraliza o status de todas as bases, automatiza a atribuição de motoristas por regra de prioridade e expõe KPIs de DS em tempo real via SQL e APIs.",
      },
      {
        title: "O Impacto",
        text: "Tempo de atribuição caiu de horas para minutos, o DS subiu de forma consistente e a operação passou a agir antes do problema virar atraso.",
      },
    ],
  },
  {
    id: "motor-operacional",
    number: "02",
    type: "engine",
    title: "Motor de Gestão Operacional",
    subtitle: "Regras de negócio & integração com ERP",
    description:
      "Backend de regras que processa exceções e complementa lacunas que o ERP corporativo não cobre.",
    tags: ["APIs", "Automação", "SQL", "Governança"],
    accent: "sky",
    tour: [
      {
        title: "A Dor Operacional",
        text: "O ERP não cobria regras de negócio específicas da operação, exigindo controles paralelos em planilhas manuais — sujeitos a erro e sem rastreabilidade.",
      },
      {
        title: "A Solução Aplicada",
        text: "Desenvolvi um motor de regras que processa a lógica de negócio faltante, valida exceções automaticamente e devolve dados consistentes para o ERP.",
      },
      {
        title: "O Impacto",
        text: "Retrabalho manual eliminado, regras de negócio padronizadas e confiabilidade nos dados que alimentam decisões operacionais diárias.",
      },
    ],
  },
  {
    id: "sla-pnr",
    number: "03",
    type: "spreadsheet",
    title: "Rastreador de SLA (PNR)",
    subtitle: "Planilha automatizada · Power Query",
    description:
      "Painel de controle para casos de 'Paguei e Não Recebi', com priorização automática por risco de estouro de SLA.",
    tags: ["Excel Avançado", "Power Query", "SLA", "Web"],
    accent: "emerald",
    tour: [
      {
        title: "A Dor Operacional",
        text: "Casos de 'Paguei e Não Recebi' (PNR) se acumulavam sem controle de prazo, gerando estouro de SLA e insatisfação do cliente.",
      },
      {
        title: "A Solução Aplicada",
        text: "Planilha automatizada com Power Query trata os dados brutos, calcula o SLA em tempo real e prioriza os casos mais críticos por dias em aberto.",
      },
      {
        title: "O Impacto",
        text: "Redução expressiva no tempo médio de resolução de PNR e visibilidade total sobre os casos em risco de estouro de prazo.",
      },
    ],
  },
  {
    id: "ocorrencias-indenizacoes",
    number: "04",
    type: "audit",
    title: "Controle de Ocorrências e Indenizações",
    subtitle: "Auditoria de faturamento & sinistros",
    description:
      "Painel de auditoria que cruza ocorrências, valores de indenização e faturas para sinalizar divergências.",
    tags: ["Excel Avançado", "Auditoria", "SQL", "Web"],
    accent: "rose",
    tour: [
      {
        title: "A Dor Operacional",
        text: "Faturamento logístico e sinistros eram auditados manualmente, item a item, consumindo horas e mascarando divergências recorrentes.",
      },
      {
        title: "A Solução Aplicada",
        text: "Painel de auditoria que cruza ocorrências, valores de indenização e faturas automaticamente, sinalizando divergências fora do padrão.",
      },
      {
        title: "O Impacto",
        text: "Auditoria mais rápida, identificação de divergências recorrentes e recuperação de valores antes perdidos por falta de controle.",
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Sandbox seed data — usado pelos componentes de sandbox de cada projeto
// ---------------------------------------------------------------------------

export const controlTowerSeed = {
  kpis: {
    deliverySuccess: 91.4,
    activeRoutes: 128,
    allocatedDrivers: 96,
    criticalOccurrences: 7,
  },
  bases: [
    { id: 1, name: "Base Leste", region: "Leste", ds: 93.1, pending: 4, status: "Estável" },
    { id: 2, name: "Base Oeste", region: "Oeste", ds: 88.7, pending: 11, status: "Atenção" },
    { id: 3, name: "Base Sul", region: "Sul", ds: 95.2, pending: 2, status: "Estável" },
    { id: 4, name: "Base Norte", region: "Norte", ds: 84.9, pending: 15, status: "Crítico" },
    { id: 5, name: "Base Central", region: "Central", ds: 90.6, pending: 6, status: "Estável" },
  ],
  drivers: [
    { id: 1, name: "R. Almeida", base: "Base Leste", vehicle: "VUC", route: "LES-014", status: "Em rota" },
    { id: 2, name: "M. Santos", base: "Base Oeste", vehicle: "Moto", route: "OES-002", status: "Carregando" },
    { id: 3, name: "T. Nogueira", base: "Base Sul", vehicle: "3/4", route: "SUL-021", status: "Em rota" },
    { id: 4, name: "C. Ribeiro", base: "Base Norte", vehicle: "VUC", route: "NOR-009", status: "Aguardando" },
    { id: 5, name: "P. Duarte", base: "Base Central", vehicle: "Moto", route: "CEN-017", status: "Em rota" },
    { id: 6, name: "L. Ferraz", base: "Base Leste", vehicle: "3/4", route: "LES-008", status: "Finalizado" },
  ],
};

export const engineSeed = {
  metrics: {
    processedToday: 4820,
    pendingQueue: 63,
    errorRate: 0.8,
    erpGapsFilled: 312,
  },
  rules: [
    { id: 1, name: "Validação de CEP x Zona de Entrega", category: "Roteirização", status: "Ativa", processed: 1284 },
    { id: 2, name: "Reconciliação de NF x Romaneio", category: "Faturamento", status: "Ativa", processed: 2036 },
    { id: 3, name: "Complemento de campos ausentes no ERP", category: "Integração", status: "Ativa", processed: 964 },
    { id: 4, name: "Alerta de duplicidade de pedido", category: "Qualidade", status: "Em revisão", processed: 118 },
  ],
  log: [
    { time: "09:41:02", message: "Fila processada: 214 registros sem erro", level: "ok" },
    { time: "09:38:47", message: "Gap de ERP preenchido: campo 'transportadora_id'", level: "ok" },
    { time: "09:35:10", message: "Divergência de CEP identificada em 3 pedidos", level: "warn" },
    { time: "09:31:55", message: "Reprocessamento automático concluído", level: "ok" },
  ],
};

export const slaTrackerSeed = {
  breakdown: [
    { status: "Novo", count: 18 },
    { status: "Em análise", count: 34 },
    { status: "Reembolsado", count: 52 },
    { status: "Vencido", count: 9 },
  ],
  rows: [
    { id: "PNR-1042", cliente: "Distrib. Vitamed", valor: "R$ 1.240,00", diasAberto: 2, status: "Novo" },
    { id: "PNR-1039", cliente: "FarmaCenter LTDA", valor: "R$ 640,50", diasAberto: 5, status: "Em análise" },
    { id: "PNR-1035", cliente: "Rede Saúde Plus", valor: "R$ 2.310,00", diasAberto: 9, status: "Vencido" },
    { id: "PNR-1031", cliente: "Clínica Bem Estar", valor: "R$ 380,00", diasAberto: 1, status: "Novo" },
    { id: "PNR-1027", cliente: "Hospital São Marcos", valor: "R$ 5.120,00", diasAberto: 4, status: "Em análise" },
    { id: "PNR-1022", cliente: "Drogal Distribuidora", valor: "R$ 910,00", diasAberto: 12, status: "Vencido" },
    { id: "PNR-1018", cliente: "MedSupply Comércio", valor: "R$ 1.780,00", diasAberto: 3, status: "Reembolsado" },
  ],
};

export const auditSeed = {
  breakdown: [
    { motivo: "Avaria em transporte", valor: 18400 },
    { motivo: "Extravio", valor: 9200 },
    { motivo: "Cobrança indevida de frete", valor: 6100 },
    { motivo: "Divergência de peso/cubagem", valor: 4300 },
  ],
  rows: [
    { id: "OC-3391", tipo: "Avaria em transporte", transportadora: "RápidoLog", valor: "R$ 3.200,00", status: "Pendente" },
    { id: "OC-3388", tipo: "Extravio", transportadora: "TransMinas", valor: "R$ 1.850,00", status: "Auditado" },
    { id: "OC-3382", tipo: "Cobrança indevida de frete", transportadora: "VoeCargo", valor: "R$ 940,00", status: "Divergência" },
    { id: "OC-3379", tipo: "Divergência de peso/cubagem", transportadora: "RápidoLog", valor: "R$ 610,00", status: "Auditado" },
    { id: "OC-3375", tipo: "Avaria em transporte", transportadora: "SulExpress", valor: "R$ 2.430,00", status: "Pendente" },
    { id: "OC-3370", tipo: "Extravio", transportadora: "VoeCargo", valor: "R$ 1.120,00", status: "Divergência" },
  ],
};

export const randomBetween = (min, max, decimals = 0) => {
  const value = Math.random() * (max - min) + min;
  return Number(value.toFixed(decimals));
};
