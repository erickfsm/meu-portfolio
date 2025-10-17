import { useMemo, useState } from "react";
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
import { projectCases } from "../data/projectCases";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Tooltip, Legend);

const statusColors = {
  "Em andamento": "bg-amber-500/15 text-amber-300 border-amber-400/30",
  "Plano executando": "bg-indigo-500/15 text-indigo-300 border-indigo-400/30",
  "POC": "bg-sky-500/15 text-sky-300 border-sky-400/30",
};

function StatusBadge({ status }) {
  const cls = statusColors[status] || "bg-white/10 text-slate-200 border-white/20";
  return <span className={`rounded-full border px-2 py-1 text-xs ${cls}`}>{status}</span>;
}

function Highlights({ highlights }) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {highlights.map((item) => (
        <div key={item.label} className="rounded-lg bg-[#0b1328]/80 p-3">
          <div className="text-[11px] uppercase tracking-[0.28em] text-[#6c3cff]">{item.label}</div>
          <div className="mt-2 text-base font-semibold text-white">{item.value}</div>
        </div>
      ))}
    </div>
  );
}

function Progress({ percent }) {
  const pct = Math.max(0, Math.min(100, percent));
  return (
    <div className="flex items-center gap-2 text-sm text-slate-300">
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-700/50">
        <div className="h-full bg-gradient-to-r from-[#6c3cff] to-[#00c9a7]" style={{ width: `${pct}%` }} />
      </div>
      <span className="min-w-[56px] text-right font-medium text-white">{pct}%</span>
    </div>
  );
}

function CaseModal({ open, onClose, caseData }) {
  return (
    <AnimatePresence>
      {open && caseData && (
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-black/60" onClick={onClose} aria-hidden="true" />
          <motion.div
            className="relative z-10 w-full max-w-3xl rounded-2xl border border-white/10 bg-[#0b1328] p-8 text-slate-200 shadow-[0_45px_120px_rgba(5,10,30,0.55)] backdrop-blur"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex items-start justify-between gap-6">
              <div>
                <h4 className="text-xl font-semibold text-white">{caseData.title}</h4>
                <p className="mt-1 text-sm text-slate-400">{caseData.meta}</p>
              </div>
              <button onClick={onClose} className="text-xs uppercase tracking-[0.35em] text-slate-400 hover:text-white">
                Fechar
              </button>
            </div>
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-slate-200">
              {caseData.narrative.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function CaseChart({ chart }) {
  const options = useMemo(() => {
    if (!chart) return null;
    return {
      responsive: true,
      plugins: { legend: { display: false }, tooltip: { mode: "index", intersect: false } },
      scales: {
        x: { ticks: { color: "#cbd5e1" }, grid: { color: "rgba(255,255,255,0.08)" } },
        y: { ticks: { color: "#cbd5e1" }, grid: { color: "rgba(255,255,255,0.08)" }, beginAtZero: true },
      },
    };
  }, [chart]);

  if (!chart) return null;

  const dataset = {
    labels: chart.labels,
    datasets: [
      {
        label: chart.type === "line" ? "Resultado" : "Volume",
        data: chart.data,
        tension: 0.35,
        borderWidth: 2,
        borderColor: "rgba(0,201,167,1)",
        pointBackgroundColor: "rgba(108,60,255,1)",
        pointRadius: 4,
        backgroundColor:
          chart.type === "bar"
            ? [
                "rgba(108,60,255,0.9)",
                "rgba(108,60,255,0.9)",
                "rgba(108,60,255,0.9)",
                "rgba(108,60,255,0.9)",
                "rgba(0,201,167,0.9)",
              ]
            : "rgba(0,201,167,0.35)",
        borderRadius: chart.type === "bar" ? 8 : undefined,
        fill: chart.type === "line",
      },
    ],
  };

  return (
    <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4">
      {chart.type === "line" ? <Line data={dataset} options={options} /> : <Bar data={dataset} options={options} />}
    </div>
  );
}

function ProjectCard({ caseData, onOpen }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#0f1b33]/70 p-8 shadow-[0_35px_110px_rgba(5,10,30,0.55)] backdrop-blur transition hover:border-white/25"
    >
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <span className="absolute -top-32 right-6 h-48 w-48 rounded-full bg-[#6c3cff25] blur-[120px]" />
        <span className="absolute -bottom-32 left-6 h-52 w-52 rounded-full bg-[#00c9a725] blur-[120px]" />
      </div>

      <div className="relative z-10 flex flex-1 flex-col gap-6">
        <div className="flex flex-col gap-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-2xl font-semibold text-white">{caseData.title}</h3>
              <p className="mt-1 text-sm text-slate-300">{caseData.meta}</p>
            </div>
            <StatusBadge status={caseData.status} />
          </div>

          <div className="space-y-3 text-sm leading-relaxed text-slate-200">
            <div>
              <span className="text-xs uppercase tracking-[0.35em] text-slate-400">Desafio</span>
              <p className="mt-1 text-slate-200/90">{caseData.challenge}</p>
            </div>
            <div>
              <span className="text-xs uppercase tracking-[0.35em] text-slate-400">Ação</span>
              <ul className="mt-1 list-disc space-y-1 pl-4">
                {caseData.action.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ul>
            </div>
            <div>
              <span className="text-xs uppercase tracking-[0.35em] text-slate-400">Resultado</span>
              <p className="mt-1 text-slate-200/90">{caseData.result}</p>
            </div>
          </div>
        </div>

        <Highlights highlights={caseData.highlights} />
        <CaseChart chart={caseData.chart} />

        <div className="space-y-3">
          <Progress percent={caseData.progress} />
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Status: {caseData.status}</span>
            <button
              onClick={() => onOpen(caseData)}
              className="rounded-full bg-gradient-to-r from-[#6c3cff] to-[#00c9a7] px-3 py-1.5 font-semibold text-black shadow-[0_15px_40px_rgba(108,60,255,0.35)] transition hover:brightness-110"
            >
              Ver narrativa completa
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [modal, setModal] = useState({ open: false, caseData: null });
  const openModal = (caseData) => setModal({ open: true, caseData });
  const closeModal = () => setModal({ open: false, caseData: null });

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
        Cases estruturados em Desafio → Ação → Resultado, com dados reais e plano de evolução contínua.
      </p>

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {projectCases.map((caseData) => (
          <ProjectCard key={caseData.id} caseData={caseData} onOpen={openModal} />
        ))}
      </div>

      <CaseModal open={modal.open} caseData={modal.caseData} onClose={closeModal} />
    </SectionWrapper>
  );
}
