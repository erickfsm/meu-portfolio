import { Loader2 } from "lucide-react";

export function ActionButton({ children, onClick, loading, disabled, variant = "ghost", icon: Icon }) {
  const base =
    "inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-semibold transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60";
  const variants = {
    primary: "bg-gold text-ink hover:bg-gold-soft",
    ghost: "border border-line bg-white/[0.03] text-ivory hover:border-gold/40 hover:bg-white/[0.06]",
  };

  return (
    <button
      onClick={onClick}
      disabled={loading || disabled}
      className={`${base} ${variants[variant]}`}
    >
      {loading ? (
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
      ) : (
        Icon && <Icon className="h-3.5 w-3.5" />
      )}
      {children}
    </button>
  );
}

const statusColors = {
  Estável: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  Ativa: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  Auditado: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  Reembolsado: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  Confirmado: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  "Em rota": "text-sky-400 bg-sky-400/10 border-sky-400/20",
  Carregando: "text-sky-400 bg-sky-400/10 border-sky-400/20",
  Novo: "text-sky-400 bg-sky-400/10 border-sky-400/20",
  "Em análise": "text-sky-400 bg-sky-400/10 border-sky-400/20",
  Atenção: "text-amber-400 bg-amber-400/10 border-amber-400/20",
  Aguardando: "text-amber-400 bg-amber-400/10 border-amber-400/20",
  "Em revisão": "text-amber-400 bg-amber-400/10 border-amber-400/20",
  Divergência: "text-amber-400 bg-amber-400/10 border-amber-400/20",
  Pendente: "text-amber-400 bg-amber-400/10 border-amber-400/20",
  Crítico: "text-rose-400 bg-rose-400/10 border-rose-400/20",
  Vencido: "text-rose-400 bg-rose-400/10 border-rose-400/20",
  Finalizado: "text-mist bg-white/5 border-line",
};

export function StatusBadge({ status }) {
  const cls = statusColors[status] || "text-mist bg-white/5 border-line";
  return (
    <span className={`inline-block whitespace-nowrap rounded-full border px-2.5 py-1 text-[11px] font-medium ${cls}`}>
      {status}
    </span>
  );
}

export function KpiCard({ label, value, suffix = "", loading, tone = "default" }) {
  const toneClass = tone === "gold" ? "text-gold" : "text-ivory";
  return (
    <div className="rounded-xl border border-line bg-panel-soft p-4">
      <div className="text-[11px] uppercase tracking-wider text-mist-dim">{label}</div>
      <div className={`mt-2 font-mono text-2xl font-semibold ${toneClass} ${loading ? "animate-pulseSoft" : ""}`}>
        {value}
        <span className="text-sm text-mist-dim">{suffix}</span>
      </div>
    </div>
  );
}

export function BarChart({ data, labelKey, valueKey, format, loading, barClassName = "bg-gold" }) {
  const max = Math.max(...data.map((d) => d[valueKey]), 1);
  return (
    <div className="space-y-3">
      {data.map((d) => (
        <div key={d[labelKey]}>
          <div className="mb-1 flex items-center justify-between text-xs">
            <span className="text-mist">{d[labelKey]}</span>
            <span className={`font-mono text-ivory ${loading ? "animate-pulseSoft" : ""}`}>
              {format ? format(d[valueKey]) : d[valueKey]}
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-white/5">
            <div
              className={`h-full rounded-full ${barClassName} transition-all duration-700 ease-out`}
              style={{ width: `${(d[valueKey] / max) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export function TableShell({ children }) {
  return (
    <div className="no-scrollbar overflow-x-auto rounded-xl border border-line">
      <table className="w-full min-w-[560px] border-collapse text-left text-sm">{children}</table>
    </div>
  );
}
