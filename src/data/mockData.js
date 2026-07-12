// Todos os dados abaixo são fictícios ou reconstituídos para fins de demonstração
// (mock), usados apenas para simular o comportamento das interfaces dentro do
// "Showroom de Projetos". Nenhuma chamada de rede real é feita a partir daqui.

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
  { value: "4", legend: "Bases Logísticas Monitoradas (Torre de Controle)" },
  { value: "+6% OTD", legend: "Recuperação de Performance em 60 dias (Foco 99%)" },
  { value: "-65%", legend: "Retrabalho Eliminado via Automação de Processos" },
];

// ---------------------------------------------------------------------------
// Timeline — cada etapa mantém o vocabulário exclusivo da respectiva empresa
// (regra de isolamento de contexto: Last Mile/B2C na Mercado Livre/Kangu,
// Transporte B2B/OTIF na Global Hospitalar).
// ---------------------------------------------------------------------------
export const timelineData = [
  {
    id: 1,
    period: "2022 — 2023",
    company: "Isab",
    title: "Fundamentos B2B",
    description:
      "Contratado para Suprimentos B2B. Entrega da rotina completa de compras + implementação paralela de Kanban de estoque integrado à produção.",
    tags: ["Suprimentos", "Compras B2B", "Kanban de Estoque", "Produção"],
  },
  {
    id: 2,
    period: "2024 — 2025",
    company: "Global Hospitalar",
    title: "Automação B2B",
    description:
      "Contratado para Transporte B2B. Execução de romaneios/faturamento + entrega de projetos de automação via API REST (Portal do Cliente) e dashboards em Power Query (-65% de retrabalho).",
    tags: ["Romaneio", "Faturamento", "API REST", "Portal do Cliente", "Power Query"],
  },
  {
    id: 3,
    period: "2026",
    company: "Mercado Livre",
    title: "Inteligência Operacional",
    description:
      "Atuação em Torre de Controle Last Mile. Execução logística + desenvolvimento de Extensão SSOT dedicada (JavaScript) para automação de rotas e gestão inteligente de incidentes de entrega (PNR).",
    tags: ["Torre de Controle", "Last Mile", "SSOT", "JavaScript", "PNR"],
  },
];

// ---------------------------------------------------------------------------
// Showroom de Projetos
// ---------------------------------------------------------------------------
export const projects = [
  {
    id: "torre-controle-kangu",
    number: "01",
    type: "control-tower-ext",
    title: "Extensão de Torre de Controle Kangu",
    subtitle: "Last Mile · Mercado Livre / Kangu",
    description:
      "Extensão de navegador que centraliza o monitoramento em tempo real das 4 bases Last Mile, KPIs de Delivery Success e atribuição de motoristas.",
    status: "Em Desenvolvimento",
    tags: ["JavaScript", "APIs", "Dashboards", "Last Mile"],
    accent: "amber",
    links: {},
    tour: [
      {
        title: "A Dor Operacional",
        text: "A ferramenta nativa não expõe o Delivery Success (DS) em tempo real por base nem cruza pendências de PNR (Paguei e Não Recebi) com a operação de rotas — a atribuição de motoristas ainda dependia de planilhas paralelas.",
      },
      {
        title: "A Solução Aplicada",
        text: "Desenvolvi uma extensão de navegador (JavaScript) que roda na própria sessão operacional: centraliza SMG1, SMG8, SMG14 e SMG15 num único painel, calcula o DS ao vivo e simula a atribuição de motoristas em modo Dry-Run antes de qualquer escrita.",
      },
      {
        title: "O Impacto",
        text: "Visibilidade unificada das 4 bases, priorização mais rápida de incidentes de PNR e uma prévia segura (dry-run) antes de qualquer atribuição real de motorista.",
      },
    ],
  },
  {
    id: "motor-operacional",
    number: "02",
    type: "engine",
    title: "Motor de Gestão Operacional",
    subtitle: "Gateway de regras de negócio · Python",
    description:
      "Motor/gateway que processa regras de negócio e logs para suprir lacunas que o ERP corporativo não cobre.",
    tags: ["Python", "PostgreSQL", "SQLite", "APIs"],
    accent: "sky",
    links: { github: "https://github.com/erickfsm/Sistemagestao" },
    tour: [
      {
        title: "A Dor Operacional",
        text: "O ERP corporativo não cobria regras de negócio específicas da operação, exigindo controles paralelos em planilhas manuais — sujeitos a erro e sem rastreabilidade.",
      },
      {
        title: "A Solução Aplicada",
        text: "Desenvolvi um motor/gateway em Python, com persistência em PostgreSQL/SQLite, que processa a lógica de negócio faltante, valida exceções automaticamente e registra logs de cada execução.",
      },
      {
        title: "O Impacto",
        text: "Retrabalho manual eliminado, regras de negócio padronizadas e rastreabilidade completa das exceções processadas fora do ERP.",
      },
    ],
  },
  {
    id: "auditoria-b2b",
    number: "03",
    type: "audit-b2b",
    title: "Inteligência de Performance & Auditoria B2B",
    subtitle: "Transporte B2B · Global Hospitalar",
    description:
      "Painel de auditoria de OTD/OTIF e gestão visual de devoluções para a operação de transporte corporativo.",
    tags: ["Excel Avançado", "Power Query", "OTIF", "Kanban"],
    accent: "emerald",
    links: {},
    tour: [
      {
        title: "A Dor Operacional",
        text: "O OTD da operação de transporte B2B estava em 83%, sem visibilidade diária das causas de atraso, e as devoluções se acumulavam sem um fluxo visual de priorização.",
      },
      {
        title: "A Solução Aplicada",
        text: "Construí um painel de auditoria com Excel Avançado e Power Query que acompanha a evolução do OTD rumo à meta projetada de 99% OTIF, além de um Kanban de devoluções priorizado por etapa.",
      },
      {
        title: "O Impacto",
        text: "OTD recuperado de 83% para 89% em 60 dias e fluxo de devoluções normalizado, com -65% de retrabalho na operação.",
      },
    ],
  },
  {
    id: "apex-care",
    number: "04",
    type: "apex-care",
    title: "Apex Care Integrated System",
    subtitle: "Plataforma de agendamento · Estofados",
    description:
      "Sistema completo de orçamento, agendamento e gestão para a Apex Care, especializada em tratamento técnico de estofados.",
    tags: ["Supabase", "JavaScript", "PostgreSQL", "Web"],
    accent: "rose",
    links: {
      github: "https://github.com/erickfsm/apex-care-website",
      live: "https://app.apexcare.com.br/",
      prelaunch: "https://apexcare.com.br/vip",
    },
    tour: [
      {
        title: "A Dor Operacional",
        text: "Orçamentos e agendamentos eram tratados manualmente por WhatsApp e telefone, sem histórico de atendimentos nem visão consolidada da agenda dos técnicos em campo.",
      },
      {
        title: "A Solução Aplicada",
        text: "Desenvolvi um sistema web completo (Supabase + JavaScript) com orçamento instantâneo em etapas, agendamento online, portal do cliente e dashboards dedicados para administradores e técnicos.",
      },
      {
        title: "O Impacto",
        text: "Processo de orçamento e agendamento totalmente digital, com histórico de atendimentos, gestão de promoções e ordens de serviço organizadas por técnico.",
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Sandbox seed data — usado pelos componentes de sandbox de cada projeto
// ---------------------------------------------------------------------------

// Projeto 01 — Extensão de Torre de Controle Kangu (Last Mile)
export const controlTowerSeed = {
  kpis: {
    ds: 91.4,
    insucessos: 47,
    volumeRotas: 812,
    taxaReversao: 34,
  },
  tactical: {
    entregues: 6820,
    pendentes: 340,
    concluidas: 96,
    sacas: 128,
  },
  bases: [
    { id: "SMG1", ds: 93.1, rotas: 210, andamento: 12, pacotes: 1720, entregues: 1602, pendencias: 84, falhas: 34, pph: 18.4 },
    { id: "SMG8", ds: 88.7, rotas: 196, andamento: 18, pacotes: 1584, entregues: 1401, pendencias: 121, falhas: 62, pph: 15.9 },
    { id: "SMG14", ds: 95.2, rotas: 224, andamento: 7, pacotes: 1890, entregues: 1798, pendencias: 52, falhas: 40, pph: 20.1 },
    { id: "SMG15", ds: 84.9, rotas: 182, andamento: 21, pacotes: 1626, entregues: 1381, pendencias: 155, falhas: 90, pph: 14.2 },
  ],
  roster: [
    { serviceID: "RT-40231", rota: "SMG1-014", motorista: "R. Almeida", placa: "KNG1A23", tipo: "VUC", status: "MATCH" },
    { serviceID: "RT-40255", rota: "SMG8-002", motorista: "M. Santos", placa: "KNG8B41", tipo: "Moto", status: "MATCH" },
    { serviceID: "RT-40260", rota: "SMG14-021", motorista: "T. Nogueira", placa: "KNG4C09", tipo: "3/4", status: "MATCH" },
    { serviceID: "RT-40271", rota: "SMG15-009", motorista: "—", placa: "—", tipo: "VUC", status: "SEM_MOTORISTA" },
    { serviceID: "RT-40288", rota: "SMG1-008", motorista: "L. Ferraz", placa: "KNG1D77", tipo: "3/4", status: "ATRIBUIDO_ML" },
    { serviceID: "RT-40299", rota: "SMG8-017", motorista: "C. Ribeiro", placa: "KNG8E12", tipo: "Moto", status: "MATCH" },
  ],
};

// Projeto 02 — Motor de Gestão Operacional
export const engineSeed = {
  stack: "Python · PostgreSQL / SQLite",
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

// Projeto 03 — Inteligência de Performance & Auditoria B2B (Global Hospitalar)
export const auditB2BSeed = {
  otdSeries: [
    { mes: "Mai", value: 83 },
    { mes: "Jun", value: 84 },
    { mes: "Jul", value: 86 },
    { mes: "Ago", value: 89 },
  ],
  otdTarget: 99,
  otdTargetLabel: "Meta Projetada · 99% OTIF",
  kanban: [
    {
      id: "novo",
      title: "Novo",
      cards: [
        { id: "DEV-812", cliente: "Rede Saúde Plus", motivo: "Avaria no transporte", dias: 1 },
        { id: "DEV-809", cliente: "Clínica Bem Estar", motivo: "Divergência de pedido", dias: 2 },
      ],
    },
    {
      id: "analise",
      title: "Em Análise",
      cards: [
        { id: "DEV-798", cliente: "Hospital São Marcos", motivo: "Produto fora da validade", dias: 4 },
        { id: "DEV-791", cliente: "FarmaCenter LTDA", motivo: "Erro de separação", dias: 5 },
        { id: "DEV-788", cliente: "Drogal Distribuidora", motivo: "Avaria no transporte", dias: 6 },
      ],
    },
    {
      id: "transportadora",
      title: "Aguardando Transportadora",
      cards: [{ id: "DEV-775", cliente: "MedSupply Comércio", motivo: "Coleta pendente", dias: 8 }],
    },
    {
      id: "concluido",
      title: "Concluído",
      cards: [
        { id: "DEV-760", cliente: "Distrib. Vitamed", motivo: "Estorno confirmado", dias: 12 },
        { id: "DEV-754", cliente: "Rede Saúde Plus", motivo: "Troca realizada", dias: 14 },
      ],
    },
  ],
};

// Projeto 04 — Apex Care Integrated System
export const apexCareSeed = {
  nav: ["Dashboard", "Orçamentos", "Agendamentos", "Técnicos", "Clientes"],
  stats: [
    { label: "Orçamentos no Mês", value: 128 },
    { label: "Agendamentos Confirmados", value: 96 },
    { label: "Técnicos Ativos", value: 7 },
    { label: "Taxa de Conversão", value: "42%" },
  ],
  agenda: [
    { id: "OS-2291", cliente: "Fernanda Rocha", servico: "Higienização de sofá 3L", tecnico: "Diego M.", data: "12/07 · 09:30", status: "Confirmado" },
    { id: "OS-2288", cliente: "Marcos Vinícius", servico: "Impermeabilização", tecnico: "Ana P.", data: "12/07 · 11:00", status: "Confirmado" },
    { id: "OS-2284", cliente: "Studio Lótus", servico: "Higienização de cadeiras (12un)", tecnico: "Diego M.", data: "12/07 · 14:00", status: "Em rota" },
    { id: "OS-2279", cliente: "Renata Ferreira", servico: "Higienização de colchão", tecnico: "Bruno S.", data: "13/07 · 08:30", status: "Aguardando" },
  ],
};

export const randomBetween = (min, max, decimals = 0) => {
  const value = Math.random() * (max - min) + min;
  return Number(value.toFixed(decimals));
};
