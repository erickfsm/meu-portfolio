const dsStatus = (ds) => (ds >= 92 ? "ok" : ds >= 87 ? "warn" : "bad");
const dsClasses = {
  ok: "bg-emerald-400/15 text-emerald-400",
  warn: "bg-amber-400/15 text-amber-400",
  bad: "bg-rose-400/15 text-rose-400",
};
const dsTextClasses = {
  ok: "text-emerald-400",
  warn: "text-amber-400",
  bad: "text-rose-400",
};

function KpiBox({ label, value, border, hint }) {
  return (
    <div className="rounded-xl bg-[#1f2937] p-4" style={{ borderLeft: `4px solid ${border}` }}>
      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{label}</div>
      <div className="mt-1 font-mono text-2xl font-extrabold text-white">{value}</div>
      <div className="mt-1 text-[11px] text-slate-500">{hint}</div>
    </div>
  );
}

function BaseCard({ base }) {
  const status = dsStatus(base.ds);
  return (
    <div className="rounded-xl border border-white/5 bg-[#1f2937] p-4">
      <div className="mb-3 flex items-center justify-between border-b border-white/10 pb-2.5">
        <span className="text-sm font-extrabold tracking-wide text-white">{base.id}</span>
        <span className={`rounded-md px-2 py-0.5 font-mono text-xs font-bold ${dsClasses[status]}`}>
          DS {base.ds}%
        </span>
      </div>
      <div className="grid grid-cols-3 gap-2.5 text-xs">
        <div>
          <div className="text-[10px] uppercase text-slate-500">Falhas</div>
          <div className="font-semibold text-slate-200">{base.falhas}</div>
        </div>
        <div>
          <div className="text-[10px] uppercase text-slate-500">Pendentes</div>
          <div className="font-semibold text-slate-200">{base.pendentes}</div>
        </div>
        <div>
          <div className="text-[10px] uppercase text-slate-500">PPH</div>
          <div className="font-semibold text-slate-200">{base.pph}</div>
        </div>
      </div>
    </div>
  );
}

function DsSparkline({ data, loading }) {
  const width = 560;
  const height = 90;
  const pad = 8;
  const values = data.map((d) => d.ds);
  const min = Math.min(...values) - 1;
  const max = Math.max(...values) + 1;
  const scaleX = (i) => pad + (i * (width - pad * 2)) / (data.length - 1);
  const scaleY = (v) => height - pad - ((v - min) / (max - min)) * (height - pad * 2);
  const points = data.map((d, i) => `${scaleX(i)},${scaleY(d.ds)}`).join(" ");

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={`w-full ${loading ? "animate-pulseSoft" : ""}`}>
      <polyline
        points={`${scaleX(0)},${height - pad} ${points} ${scaleX(data.length - 1)},${height - pad}`}
        fill="rgba(255,159,77,0.12)"
        stroke="none"
      />
      <polyline points={points} fill="none" stroke="#ff9a4d" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
      {data.map((d, i) => (
        <circle key={d.hora} cx={scaleX(i)} cy={scaleY(d.ds)} r="2.5" fill="#ff9a4d" />
      ))}
    </svg>
  );
}

export default function DashboardView({ kpis, dsTrend, bases, topOfensores, topPendencias, scope, loading }) {
  const visibleBases = scope === "GLOBAL" ? bases : bases.filter((b) => b.id === scope);
  const visibleOfensores = scope === "GLOBAL" ? topOfensores : topOfensores.filter((o) => o.base === scope);
  const visiblePendencias = scope === "GLOBAL" ? topPendencias : topPendencias.filter((p) => p.base === scope);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <KpiBox label="Performance Global (DS)" value={`${kpis.ds}%`} border="#fff159" hint="Delivery Success" />
        <KpiBox label="Pacotes Totais" value={kpis.pacotesTotais.toLocaleString("pt-BR")} border="#ff6200" hint="4 bases" />
        <KpiBox label="Rotas Totais" value={kpis.rotasTotais} border="#38bdf8" hint="Capacidade operacional" />
        <KpiBox label="Insucessos Pendentes" value={kpis.insucessosPendentes} border="#ef4444" hint="A tratar + em tratativa" />
      </div>

      <div className="rounded-xl border border-white/5 bg-[#1f2937] p-4">
        <div className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">
          Tendência de DS (1 ponto / hora)
        </div>
        <DsSparkline data={dsTrend} loading={loading} />
      </div>

      <div className={`grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 ${loading ? "animate-pulseSoft" : ""}`}>
        {visibleBases.map((b) => (
          <BaseCard key={b.id} base={b} />
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-white/5 bg-[#1f2937] p-4">
          <div className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">
            Top Ofensores (rotas com mais falhas)
          </div>
          <div className="space-y-2">
            {visibleOfensores.length === 0 && <div className="text-xs text-slate-500">Sem dados para esta base.</div>}
            {visibleOfensores.map((o) => (
              <div key={o.rota} className="flex items-center justify-between rounded-lg bg-black/20 px-3 py-2 text-xs">
                <span className="font-mono text-slate-300">{o.rota}</span>
                <span className="font-mono font-bold text-rose-400">{o.falhas} falhas</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-white/5 bg-[#1f2937] p-4">
          <div className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">
            Top Pendências
          </div>
          <div className="space-y-2">
            {visiblePendencias.length === 0 && <div className="text-xs text-slate-500">Sem dados para esta base.</div>}
            {visiblePendencias.map((p) => (
              <div key={p.rota} className="flex items-center justify-between rounded-lg bg-black/20 px-3 py-2 text-xs">
                <span className="font-mono text-slate-300">{p.rota}</span>
                <span className="font-mono font-bold text-amber-400">{p.pendentes} pend.</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-white/5 bg-[#1f2937] p-4">
        <div className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">
          Matriz de Nível de Serviço (SLA) por Estação
        </div>
        <div className="no-scrollbar overflow-x-auto">
          <table className="w-full min-w-[440px] border-collapse text-center text-xs">
            <thead>
              <tr className="text-slate-400">
                {["Estação", "DS", "Falhas", "Pendentes", "PPH Méd"].map((h) => (
                  <th key={h} className="border border-white/10 bg-black/20 px-2 py-2 font-semibold uppercase">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visibleBases.map((b) => (
                <tr key={b.id} className="text-slate-200">
                  <td className="border border-white/10 px-2 py-2 text-left font-bold">{b.id}</td>
                  <td className={`border border-white/10 px-2 py-2 font-mono font-bold ${dsTextClasses[dsStatus(b.ds)]}`}>
                    {b.ds}%
                  </td>
                  <td className="border border-white/10 px-2 py-2">{b.falhas}</td>
                  <td className="border border-white/10 px-2 py-2">{b.pendentes}</td>
                  <td className="border border-white/10 px-2 py-2">{b.pph}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
