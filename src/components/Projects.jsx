import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import SectionWrapper from "./SectionWrapper";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend
);

/* ---------- Badge de Status (cores) ---------- */
const statusColors = {
  "Entregue": "bg-emerald-500/15 text-emerald-300 border-emerald-400/30",
  "Em andamento": "bg-amber-500/15 text-amber-300 border-amber-400/30",
  "POC": "bg-sky-500/15 text-sky-300 border-sky-400/30",
  "Interrompido": "bg-rose-500/15 text-rose-300 border-rose-400/30",
  "Operando": "bg-violet-500/15 text-violet-300 border-violet-400/30",
  "Plano executando": "bg-indigo-500/15 text-indigo-300 border-indigo-400/30",
};

function StatusBadge({ status }) {
  const cls = statusColors[status] || "bg-white/10 text-slate-200 border-white/20";
  return (
    <span className={`px-2 py-1 rounded-full text-xs border ${cls}`}>
      {status}
    </span>
  );
}

/* ---------- Componentes UI ---------- */
function KPI({ label, value, helper }) {
  return (
    <div className="flex flex-col bg-white/5 rounded-lg p-3">
      <span className="text-slate-400 text-xs">{label}</span>
      <span className="text-white font-semibold text-base">{value}</span>
      {helper && <span className="text-slate-400 text-[11px] mt-1">{helper}</span>}
    </div>
  );
}

function Progress({ percent }) {
  const pct = Math.max(0, Math.min(100, percent));
  return (
    <div className="w-full h-2 bg-slate-700/60 rounded-full overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-[#6c3cff] to-[#00c9a7]"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

/* ---------- Dados dos gráficos ---------- */
// OTD (linha): 83 → 89 → 96(meta)
const otdLineData = {
  labels: ["Jul", "Ago", "Nov (meta)"],
  datasets: [
    {
      label: "OTD (%)",
      data: [83, 89, 96],
      tension: 0.35,
      borderWidth: 2,
      borderColor: "rgba(0, 201, 167, 1)",
      pointBackgroundColor: "rgba(108, 60, 255, 1)",
      pointRadius: 4,
    },
  ],
};
const otdLineOptions = {
  responsive: true,
  plugins: { legend: { display: false }, tooltip: { mode: "index", intersect: false } },
  scales: {
    x: { ticks: { color: "#cbd5e1" }, grid: { color: "rgba(255,255,255,0.08)" } },
    y: {
      beginAtZero: true,
      max: 100,
      ticks: { color: "#cbd5e1" },
      grid: { color: "rgba(255,255,255,0.08)" },
    },
  },
};

// Romaneios (barras): Jun–Set + Projeção Out (-70%)
const romaneioBarData = {
  labels: ["Jun", "Jul", "Ago", "Set", "Out (proj -70%)"],
  datasets: [
    {
      label: "Romaneios",
      data: [70, 120, 240, 356, Math.round(356 * 0.3)], // projeção redução 70%
      backgroundColor: [
        "rgba(108,60,255,0.9)",
        "rgba(108,60,255,0.9)",
        "rgba(108,60,255,0.9)",
        "rgba(108,60,255,0.9)",
        "rgba(0,201,167,0.9)",
      ],
      borderRadius: 8,
    },
  ],
};
const romaneioBarOptions = {
  responsive: true,
  plugins: { legend: { display: false } },
  scales: {
    x: { ticks: { color: "#cbd5e1" }, grid: { display: false } },
    y: { beginAtZero: true, ticks: { color: "#cbd5e1" }, grid: { color: "rgba(255,255,255,0.08)" } },
  },
};

/* ---------- Modal ---------- */
function CaseModal({ open, onClose, title, children }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-black/60"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            className="relative z-10 max-w-3xl w-full bg-[#0b1328] border border-white/10 rounded-xl p-6 text-slate-200"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-white text-xl font-semibold">{title}</h4>
              <button
                className="text-slate-400 hover:text-white text-sm"
                onClick={onClose}
              >
                Fechar
              </button>
            </div>
            <div className="prose prose-invert max-w-none">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------- Card genérico ---------- */
function ProjectCard({
  title,
  description,
  kpis = [],
  status,
  progress,
  meta,
  chart,
  onOpen,
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0f1b33]/70 p-6 shadow-[0_20px_70px_rgba(5,10,30,0.45)] backdrop-blur transition duration-300 hover:border-white/25 hover:shadow-[0_30px_90px_rgba(5,10,30,0.55)]">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <span className="absolute -top-24 right-4 h-48 w-48 rounded-full bg-[#6c3cff20] blur-[110px]" />
        <span className="absolute -bottom-24 left-6 h-56 w-56 rounded-full bg-[#00c9a722] blur-[120px]" />
      </div>

      <div className="relative z-10">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-xl font-semibold text-white">{title}</h3>
            <p className="mt-2 text-sm text-slate-300">{description}</p>
          </div>
          <StatusBadge status={status} />
        </div>

        {chart && <div className="mt-5 rounded-xl border border-white/10 bg-white/5 p-3">{chart}</div>}

        {kpis.length > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
            {kpis.map((k, i) => (
              <KPI key={i} {...k} />
            ))}
          </div>
        )}

        <div className="mt-6 flex items-center gap-3">
          <Progress percent={progress} />
          <span className="min-w-[72px] text-right text-sm text-slate-300">{progress}%</span>
        </div>

        <div className="mt-4 flex items-center justify-between text-sm text-slate-300">
          <span>
            Meta: <strong className="text-white">{meta}</strong>
          </span>
          <button
            onClick={onOpen}
            className="rounded-full bg-gradient-to-r from-[#6c3cff] to-[#00c9a7] px-3 py-1.5 text-xs font-semibold text-black shadow-[0_10px_35px_rgba(108,60,255,0.35)] transition hover:brightness-110"
          >
            Ver case completo
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Página de Projetos ---------- */
export default function Projects() {
  const [modal, setModal] = useState({ open: false, title: "", content: null });

  const openModal = (title, content) => setModal({ open: true, title, content });
  const closeModal = () => setModal({ open: false, title: "", content: null });

  return (
    <SectionWrapper id="projects" contentClassName="text-white">
      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="section-title"
      >
        Projetos & Resultados
      </motion.h2>
      <p className="mx-auto mt-4 max-w-3xl text-center text-sm text-slate-300">
        Entregas estruturadas em desafio → ação → resultado, com dados reais da operação
        logística e automações de suporte à tomada de decisão.
      </p>

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {/* 1) OTD */}
        <ProjectCard
          title="Evolução do OTD"
          description={
            <>
              Melhoria de <strong>83% → 89%</strong> (jul → ago), com auditoria diária, ajuste
              de prazos por transportadora e comunicação preventiva. Plano de Ação rumo a{" "}
              <strong>96%</strong> até novembro.
            </>
          }
          chart={<Line data={otdLineData} options={otdLineOptions} />}
          kpis={[
            { label: "OTD Jul", value: "83%" },
            { label: "OTD Ago", value: "89%" },
            { label: "Meta", value: "96%", helper: "Nov" },
            { label: "Auditoria", value: "Diária" },
          ]}
          status="Em andamento"
          progress={72}
          meta="OTD ≥ 96%"
          onOpen={() =>
            openModal(
              "Case — Evolução do OTD",
              <>
                <p>
                  <strong>Contexto:</strong> ausência de visibilidade clara e prazos
                  desatualizados por transportadora geravam atrasos.
                </p>
                <p>
                  <strong>Ações:</strong> revisão de tabela de prazos por histórico real;
                  remapeamento de regiões por performance; auditoria diária e aviso preventivo ao
                  Comercial em casos de risco.
                </p>
                <p>
                  <strong>Resultados:</strong> OTD subiu de <strong>83% para 89%</strong> (Jul→Ago).
                  Meta projetada: <strong>96%</strong> até Nov.
                </p>
              </>
            )
          }
        />

        {/* 2) Romaneios */}
        <ProjectCard
          title="Controle de Romaneios"
          description={
            <>
              Aumento de volume (Jun→Set) evidenciou gargalos. Plano de ação conjunto com
              Faturamento e Expedição para reduzir emissões redundantes e tempo de
              digitalização. <strong>Projeção: −70% em Out.</strong>
            </>
          }
          chart={<Bar data={romaneioBarData} options={romaneioBarOptions} />}
          kpis={[
            { label: "Jun", value: "70" },
            { label: "Set (parcial)", value: "356", helper: "até 18/09" },
            { label: "Tempo digit.", value: "18,6 h", helper: "↑ vs 2,3 h (base)" },
            { label: "Redução alvo", value: "−70% (Out)" },
          ]}
          status="Plano executando"
          progress={40}
          meta="Corte de 70% no mês"
          onOpen={() =>
            openModal(
              "Case — Controle de Romaneios",
              <>
                <p>
                  <strong>Problema:</strong> curva de crescimento acelerada de romaneios e
                  aumento do tempo de digitalização gerando retrabalho e risco de erro.
                </p>
                <p>
                  <strong>Diagnóstico:</strong> análise comparativa Jun→Set e simulação de
                  cenários. Falhas de comunicação e redundância de emissão.
                </p>
                <p>
                  <strong>Plano:</strong> integração de rotinas entre Faturamento/Expedição,
                  padronização de critérios e responsabilidade; priorização de lotes;
                  redução de emissões desnecessárias. <strong>Projeção: −70% em Out.</strong>
                </p>
              </>
            )
          }
        />

        {/* 3) Devoluções (Kanban) */}
        <ProjectCard
          title="Controle de Devoluções (Kanban)"
          description={
            <>
              Planilha/kanban prioriza por <strong>atraso real</strong>, status e pendências,
              alimentada pela base de rastreio. Eliminou gargalos recorrentes e normalizou o fluxo.
            </>
          }
          kpis={[
            { label: "Monitoramento", value: "Diário" },
            { label: "Critério", value: "Dias em atraso" },
            { label: "Pendências", value: "Resolvidas" },
            { label: "Retrabalho", value: "↓ significativo" },
          ]}
          status="Entregue"
          progress={100}
          meta="Fluxo normalizado"
          onOpen={() =>
            openModal(
              "Case — Controle de Devoluções (Kanban)",
              <>
                <p>
                  <strong>Resumo:</strong> todas as pendências foram solucionadas; o kanban
                  trouxe previsibilidade e foco no que mais impacta o SLA.
                </p>
                <p>
                  <strong>Como:</strong> priorização por atraso, visão única das pendências,
                  rotina de atualização e responsabilidade clara por etapa.
                </p>
              </>
            )
          }
        />

        {/* 4) Visibilidade Diária */}
        <ProjectCard
          title="Planilha Inteligente — Visibilidade Diária"
          description={
            <>
              Consolidação diária (sheet) com visão única operacional: entregas, atrasos,
              transportadoras e exceções por vendedor/UF. Base para reportes ao Comercial e decisões.
            </>
          }
          kpis={[
            { label: "Atualização", value: "Automática" },
            { label: "Tempo por NF", value: "≈ 20 s", helper: "antes: ~5 min" },
            { label: "Erros operacionais", value: "−70%" },
            { label: "Cobertura", value: "3k+ cidades" },
          ]}
          status="Operando"
          progress={85}
          meta="Zero retrabalho manual"
          onOpen={() =>
            openModal(
              "Case — Visibilidade Diária",
              <>
                <p>
                  <strong>Contexto:</strong> ausência de visão unificada, dificuldade de
                  priorização e comunicação com Comercial.
                </p>
                <p>
                  <strong>Entrega:</strong> planilha central com KPIs operacionais, filtros por
                  vendedor, UF, transportadora e status; atualizada automaticamente.
                </p>
                <p>
                  <strong>Impacto:</strong> resposta mais rápida, menos erros manuais e decisões
                  baseadas em dados.
                </p>
              </>
            )
          }
        />

        {/* 5) BPM (Interrompido) */}
        <ProjectCard
          title="Mapeamento de Processos (BPM)"
          description={
            <>
              Iniciativa de padronização (BPM) para faturamento/expedição/transporte. Projeto
              <strong> interrompido</strong> por mudança de contexto. Aprendizados preservados para retomada.
            </>
          }
          kpis={[
            { label: "Escopo", value: "FAT · EXP · TRP" },
            { label: "Artefatos", value: "BPMN 2.0 (draft)" },
            { label: "Pontos críticos", value: "Handoffs & auditoria" },
            { label: "Retomada", value: "Quando houver patrocinador" },
          ]}
          status="Interrompido"
          progress={28}
          meta="Playbook + RACI"
          onOpen={() =>
            openModal(
              "Case — Mapeamento de Processos (BPM)",
              <>
                <p>
                  <strong>Objetivo:</strong> padronizar fluxos críticos e reduzir variação na
                  execução através de BPMN e matriz RACI.
                </p>
                <p>
                  <strong>Status:</strong> interrompido por mudança de contexto e time; insumos
                  e rascunhos foram preservados para futura retomada.
                </p>
              </>
            )
          }
        />
      </div>

      <p className="mt-10 text-center text-sm text-slate-400">
        * Indicadores e metas são atualizados continuamente conforme novas evidências operacionais.
      </p>

      <CaseModal open={modal.open} onClose={closeModal} title={modal.title}>
        {modal.content}
      </CaseModal>
    </SectionWrapper>
  );
}