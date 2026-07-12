import { useState } from "react";
import { RefreshCw, ArrowRightCircle, AlarmClock } from "lucide-react";
import { auditB2BSeed, randomBetween } from "../../data/mockData";
import { ActionButton, KpiCard } from "./ui";

function OtdTrendChart({ series, target, targetLabel, loading }) {
  const width = 640;
  const height = 200;
  const pad = 32;
  const min = 75;
  const max = 100;

  const scaleX = (i) => pad + (i * (width - pad * 2)) / (series.length - 1);
  const scaleY = (v) => height - pad - ((v - min) / (max - min)) * (height - pad * 2);

  const linePoints = series.map((d, i) => `${scaleX(i)},${scaleY(d.value)}`).join(" ");
  const targetY = scaleY(target);

  return (
    <div className={loading ? "animate-pulseSoft" : ""}>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full">
        <line x1={pad} y1={targetY} x2={width - pad} y2={targetY} stroke="#C9A961" strokeDasharray="5 5" strokeWidth="1.5" />
        <text x={width - pad} y={targetY - 8} textAnchor="end" className="fill-gold text-[10px] font-mono">
          {targetLabel} — {target}%
        </text>

        <polyline points={linePoints} fill="none" stroke="#34D399" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
        <polyline
          points={`${scaleX(0)},${height - pad} ${linePoints} ${scaleX(series.length - 1)},${height - pad}`}
          fill="rgba(52,211,153,0.08)"
          stroke="none"
        />

        {series.map((d, i) => (
          <g key={d.mes}>
            <circle cx={scaleX(i)} cy={scaleY(d.value)} r="4" fill="#34D399" />
            <text x={scaleX(i)} y={scaleY(d.value) - 12} textAnchor="middle" className="fill-ivory text-[11px] font-mono font-semibold">
              {d.value}%
            </text>
            <text x={scaleX(i)} y={height - pad + 18} textAnchor="middle" className="fill-mist-dim text-[10px] uppercase">
              {d.mes}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

const STAGE_ORDER = ["novo", "analise", "transportadora", "concluido"];

export default function AuditB2BSandbox() {
  const [series, setSeries] = useState(auditB2BSeed.otdSeries);
  const [kanban, setKanban] = useState(auditB2BSeed.kanban);
  const [filterAtrasados, setFilterAtrasados] = useState(false);
  const [loadingKey, setLoadingKey] = useState(null);

  const run = (key, delayMs, updater) => {
    setLoadingKey(key);
    setTimeout(() => {
      updater();
      setLoadingKey(null);
    }, delayMs);
  };

  const handleRefresh = () =>
    run("refresh", 1000, () => {
      setSeries((prev) => prev.map((d, i) => (i === prev.length - 1 ? { ...d, value: randomBetween(87, 92, 0) } : d)));
    });

  const handleAdvance = () =>
    run("advance", 1000, () => {
      setKanban((prev) => {
        const next = prev.map((col) => ({ ...col, cards: [...col.cards] }));
        for (let i = STAGE_ORDER.length - 2; i >= 0; i--) {
          const from = next[i];
          const to = next[i + 1];
          if (from.cards.length > 0) {
            const [moved] = from.cards.splice(0, 1);
            to.cards.push({ ...moved, dias: moved.dias + 1 });
          }
        }
        return next;
      });
    });

  const handleFilter = () => run("filter", 500, () => setFilterAtrasados((v) => !v));

  const openReturns = kanban
    .filter((c) => c.id !== "concluido")
    .reduce((sum, c) => sum + c.cards.length, 0);
  const currentOtd = series[series.length - 1].value;
  const busy = loadingKey !== null;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-end gap-2">
        <ActionButton icon={RefreshCw} loading={loadingKey === "refresh"} onClick={handleRefresh}>
          Atualizar Dados
        </ActionButton>
        <ActionButton icon={ArrowRightCircle} loading={loadingKey === "advance"} onClick={handleAdvance} variant="primary">
          Simular Novo Ciclo
        </ActionButton>
        <ActionButton icon={AlarmClock} loading={loadingKey === "filter"} onClick={handleFilter}>
          {filterAtrasados ? "Limpar Filtro" : "Filtrar Atrasados"}
        </ActionButton>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <KpiCard label="OTD Atual" value={currentOtd} suffix="%" tone="gold" loading={loadingKey === "refresh"} />
        <KpiCard label="Meta OTIF Projetada" value={auditB2BSeed.otdTarget} suffix="%" />
        <KpiCard label="Devoluções em Aberto" value={openReturns} loading={loadingKey === "advance"} />
      </div>

      <div className="rounded-xl border border-line bg-panel-soft p-5">
        <div className="mb-2 text-[11px] uppercase tracking-wider text-mist-dim">Evolução do OTD</div>
        <OtdTrendChart series={series} target={auditB2BSeed.otdTarget} targetLabel={auditB2BSeed.otdTargetLabel} loading={loadingKey === "refresh"} />
      </div>

      <div>
        <div className="mb-3 text-[11px] uppercase tracking-wider text-mist-dim">Gestão de Devoluções — Kanban</div>
        <div className="no-scrollbar grid grid-flow-col auto-cols-[minmax(230px,1fr)] gap-3 overflow-x-auto pb-1 md:grid-flow-row md:grid-cols-4 md:auto-cols-auto">
          {kanban.map((col) => (
            <div key={col.id} className="rounded-xl border border-line bg-panel-soft p-3">
              <div className="mb-3 flex items-center justify-between px-1">
                <span className="text-xs font-semibold text-ivory">{col.title}</span>
                <span className="rounded-full bg-white/5 px-2 py-0.5 font-mono text-[11px] text-mist">
                  {col.cards.length}
                </span>
              </div>
              <div className="space-y-2">
                {col.cards.map((card) => {
                  const atrasado = card.dias >= 6;
                  const dim = filterAtrasados && !atrasado;
                  return (
                    <div
                      key={card.id}
                      className={`rounded-lg border border-line bg-panel-raised p-3 transition-opacity duration-300 ${dim ? "opacity-25" : ""} ${busy ? "animate-pulseSoft" : ""}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[11px] text-mist-dim">{card.id}</span>
                        <span className={`text-[11px] font-semibold ${atrasado ? "text-rose-400" : "text-mist"}`}>
                          {card.dias}d
                        </span>
                      </div>
                      <div className="mt-1.5 text-xs font-medium text-ivory">{card.cliente}</div>
                      <div className="mt-0.5 text-[11px] text-mist-dim">{card.motivo}</div>
                    </div>
                  );
                })}
                {col.cards.length === 0 && (
                  <div className="rounded-lg border border-dashed border-line py-4 text-center text-[11px] text-mist-dim">
                    Vazio
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
