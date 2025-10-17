import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
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
import SectionWrapper from "./SectionWrapper";
import { projectCases } from "../data/projectCases";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Tooltip, Legend);

const statusColors = {
  "Em andamento": "bg-amber-500/15 text-amber-200 border-amber-400/30",
  "Plano executando": "bg-indigo-500/15 text-indigo-200 border-indigo-400/30",
  "POC": "bg-sky-500/15 text-sky-200 border-sky-400/30",
  "Entregue": "bg-emerald-500/15 text-emerald-200 border-emerald-400/30",
  "Operando": "bg-violet-500/15 text-violet-200 border-violet-400/30",
  "Interrompido": "bg-rose-500/15 text-rose-200 border-rose-400/30",
};

function StatusBadge({ status }) {
  const cls = statusColors[status] || "bg-white/10 text-slate-200 border-white/20";
  return <span className={`rounded-full border px-2 py-1 text-xs ${cls}`}>{status}</span>;
}

function Highlights({ highlights }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4">
      {highlights.map((item) => (
        <div key={item.label} className="rounded-lg bg-[#0b1328]/80 p-3">
          <div className="text-[11px] uppercase tracking-[0.22em] text-[#6c3cff]">{item.label}</div>
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
  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  const titleId = caseData ? `case-modal-title-${caseData.id}` : undefined;

  return (
    <AnimatePresence>
      {open && caseData && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
          <motion.div
            className="relative z-10 w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-[#0b1328] p-6 text-slate-200 shadow-[0_28px_90px_rgba(8,15,35,0.35)] backdrop-blur sm:p-8"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.25 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h4 id={titleId} className="text-xl font-semibold text-white">
                  {caseData.title}
                </h4>
                <p className="mt-1 text-sm text-slate-400">{caseData.meta}</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="self-start rounded-full border border-white/15 px-3 py-2 text-[11px] uppercase tracking-[0.3em] text-slate-400 transition hover:border-white/35 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6c3cff]"
                aria-label="Fechar modal de case"
              >
                Fechar
              </button>
            </div>
            <div className="mt-6 max-h-[min(70vh,520px)] space-y-4 overflow-y-auto pr-1 text-sm leading-relaxed text-slate-200 sm:pr-2">
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
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-120px" });
  const [ChartComponent, setChartComponent] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!chart || !isInView) {
      return undefined;
    }

    let isMounted = true;
    setLoading(true);
    setChartComponent(null);

    import("react-chartjs-2")
      .then((module) => {
        if (!isMounted) return;
        setChartComponent(() => (chart.type === "line" ? module.Line : module.Bar));
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [chart, isInView]);

  const dataset = useMemo(() => {
    if (!chart) return null;
    return {
      labels: chart.labels,
      datasets: [
        {
          label: chart.type === "line" ? "Resultado" : "Volume",
          data: chart.data,
          tension: 0.35,
          borderWidth: 2,
          borderColor: "rgba(0,201,167,1)",
          pointBackgroundColor: "rgba(108,60,255,1)",
          pointRadius: chart.type === "line" ? 4 : 0,
          backgroundColor:
            chart.type === "bar"
              ? chart.labels.map((_, index) =>
                  index === chart.labels.length - 1 ? "rgba(0,201,167,0.9)" : "rgba(108,60,255,0.9)"
                )
              : "rgba(0,201,167,0.35)",
          borderRadius: chart.type === "bar" ? 8 : undefined,
          fill: chart.type === "line",
        },
      ],
    };
  }, [chart]);

  const options = useMemo(() => {
    if (!chart) return null;
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: { mode: "index", intersect: false } },
      scales: {
        x: {
          ticks: { color: "#cbd5e1", maxRotation: 45, minRotation: 0 },
          grid: { color: "rgba(255,255,255,0.08)" },
        },
        y: {
          ticks: { color: "#cbd5e1" },
          grid: { color: "rgba(255,255,255,0.08)" },
          beginAtZero: true,
        },
      },
    };
  }, [chart]);

  if (!chart) return null;

  return (
    <div ref={containerRef} className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4">
      {ChartComponent && dataset && options ? (
        <div className="h-[240px]">
          <ChartComponent data={dataset} options={options} />
        </div>
      ) : (
        <div className="grid h-[220px] place-content-center gap-2 text-center text-xs text-slate-400">
          <span className="animate-pulse text-slate-500">
            {isInView && loading ? "Carregando gráfico..." : "Gráfico disponível ao rolar"}
          </span>
        </div>
      )}
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
      className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#0f1b33]/70 p-6 shadow-[0_24px_80px_rgba(8,15,35,0.35)] backdrop-blur transition hover:border-white/25 sm:p-8"
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

          <p className="text-sm leading-relaxed text-slate-300">{caseData.summary}</p>

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
          <div className="flex flex-col gap-2 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
            <span className="order-2 sm:order-1">Status: {caseData.status}</span>
            <button
              onClick={() => onOpen(caseData)}
              className="order-1 w-full rounded-full bg-gradient-to-r from-[#6c3cff] to-[#00c9a7] px-4 py-2 font-semibold text-black shadow-[0_15px_40px_rgba(108,60,255,0.35)] transition hover:brightness-110 sm:order-2 sm:w-auto"
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
