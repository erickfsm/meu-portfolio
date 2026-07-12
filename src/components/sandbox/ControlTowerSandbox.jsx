import { useState } from "react";
import { RefreshCw, PlayCircle, Zap, Radio } from "lucide-react";
import { controlTowerSeed, randomBetween } from "../../data/mockData";
import { ActionButton } from "./ui";

const SCOPES = ["GLOBAL", "SMG1", "SMG8", "SMG14", "SMG15"];
const TABS = [
  { id: "dashboard", label: "Dashboard" },
  { id: "atribuicao", label: "Atribuição de Motoristas" },
];

const dsStatus = (ds) => (ds >= 92 ? "ok" : ds >= 87 ? "warn" : "bad");
const dsClasses = {
  ok: "bg-emerald-400/15 text-emerald-400",
  warn: "bg-amber-400/15 text-amber-400",
  bad: "bg-rose-400/15 text-rose-400",
};

const ROSTER_STATUS = {
  MATCH: { label: "PRONTO P/ ATRIBUIR", cls: "bg-sky-400/15 text-sky-400" },
  ATRIBUIDO: { label: "ATRIBUÍDO", cls: "bg-emerald-400/15 text-emerald-400" },
  ATRIBUIDO_ML: { label: "ATRIB. (ML)", cls: "bg-white/10 text-slate-300" },
  CONFLITO: { label: "CONFLITO", cls: "bg-amber-400/15 text-amber-400" },
  SEM_MOTORISTA: { label: "SEM MOTORISTA", cls: "bg-rose-400/15 text-rose-400" },
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

function TacticalCard({ label, value }) {
  return (
    <div className="rounded-lg border border-white/5 bg-black/20 p-3 text-center">
      <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">{label}</div>
      <div className="mt-1 font-mono text-lg font-extrabold text-white">{value}</div>
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
      <div className="grid grid-cols-2 gap-2.5 text-xs">
        <div>
          <div className="text-[10px] uppercase text-slate-500">Rotas</div>
          <div className="font-semibold text-slate-200">{base.rotas}</div>
        </div>
        <div>
          <div className="text-[10px] uppercase text-slate-500">Pacotes</div>
          <div className="font-semibold text-slate-200">{base.pacotes}</div>
        </div>
        <div>
          <div className="text-[10px] uppercase text-slate-500">Pendências</div>
          <div className="font-semibold text-slate-200">{base.pendencias}</div>
        </div>
        <div>
          <div className="text-[10px] uppercase text-slate-500">Falhas</div>
          <div className="font-semibold text-slate-200">{base.falhas}</div>
        </div>
      </div>
    </div>
  );
}

export default function ControlTowerSandbox() {
  const [scope, setScope] = useState("GLOBAL");
  const [tab, setTab] = useState("dashboard");
  const [kpis, setKpis] = useState(controlTowerSeed.kpis);
  const [tactical, setTactical] = useState(controlTowerSeed.tactical);
  const [bases, setBases] = useState(controlTowerSeed.bases);
  const [roster, setRoster] = useState(null);
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
      setKpis({
        ds: randomBetween(85, 96, 1),
        insucessos: randomBetween(20, 70),
        volumeRotas: randomBetween(700, 900),
        taxaReversao: randomBetween(20, 45),
      });
      setBases((prev) => prev.map((b) => ({ ...b, ds: randomBetween(80, 97, 1), pendencias: randomBetween(30, 170) })));
    });

  const handleDryRun = () =>
    run("dryrun", 1100, () => {
      setRoster(controlTowerSeed.roster.map((r) => ({ ...r })));
    });

  const handleAtribuirTodos = () =>
    run("atribuir", 1000, () => {
      setRoster((prev) =>
        prev.map((r) => {
          if (r.status !== "MATCH") return r;
          const roll = Math.random();
          if (roll > 0.85) return { ...r, status: "CONFLITO" };
          return { ...r, status: "ATRIBUIDO" };
        })
      );
    });

  const visibleBases = scope === "GLOBAL" ? bases : bases.filter((b) => b.id === scope);
  const busy = loadingKey !== null;
  const pendingMatches = roster ? roster.filter((r) => r.status === "MATCH").length : 0;

  return (
    <div className="-mx-5 -my-6 space-y-5 bg-[#111827] p-5 md:-mx-8 md:-my-8 md:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/5 bg-[#1f2937] px-4 py-3">
        <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
          <Radio className="h-3.5 w-3.5 text-[#fff159]" />
          Seletor de Escopo
        </div>
        <div className="flex flex-wrap gap-1.5">
          {SCOPES.map((s) => (
            <button
              key={s}
              onClick={() => setScope(s)}
              className={`rounded-md px-3 py-1.5 text-[11px] font-bold tracking-wide transition-colors duration-300 ${
                scope === s ? "bg-[#ff6200] text-white" : "bg-black/20 text-slate-400 hover:text-white"
              }`}
            >
              {s === "GLOBAL" ? "VISÃO GLOBAL" : s}
            </button>
          ))}
        </div>
        <ActionButton icon={RefreshCw} loading={loadingKey === "refresh"} onClick={handleRefresh}>
          Atualizar Dados
        </ActionButton>
      </div>

      <div className="flex gap-1 rounded-lg border border-white/5 bg-[#1f2937] p-1">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`rounded-md px-4 py-2 text-xs font-bold uppercase tracking-wide transition-colors duration-300 ${
              tab === t.id ? "bg-[#ff6200] text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "dashboard" ? (
        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            <KpiBox label="Performance Global (DS)" value={`${kpis.ds}%`} border="#fff159" hint="Delivery Success" />
            <KpiBox label="Insucessos (Qtd.)" value={kpis.insucessos} border="#ef4444" hint="Fails pendentes" />
            <KpiBox label="Volume de Rotas" value={kpis.volumeRotas} border="#ff6200" hint="Capacidade operacional" />
            <KpiBox label="Taxa de Reversão" value={`${kpis.taxaReversao}%`} border="#10b981" hint="Ações de logística" />
          </div>

          <div className="grid grid-cols-2 gap-2.5 md:grid-cols-4">
            <TacticalCard label="Pacotes Entregues" value={tactical.entregues.toLocaleString("pt-BR")} />
            <TacticalCard label="Pacotes Pendentes" value={tactical.pendentes} />
            <TacticalCard label="Rotas Concluídas" value={tactical.concluidas} />
            <TacticalCard label="Cargas / Sacas DC" value={tactical.sacas} />
          </div>

          <div className={`grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 ${loadingKey === "refresh" ? "animate-pulseSoft" : ""}`}>
            {visibleBases.map((b) => (
              <BaseCard key={b.id} base={b} />
            ))}
          </div>

          <div className="rounded-xl border border-white/5 bg-[#1f2937] p-4">
            <div className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">
              Matriz de Nível de Serviço (SLA) por Estação
            </div>
            <div className="no-scrollbar overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-center text-xs">
                <thead>
                  <tr className="text-slate-400">
                    {["Estação", "DS", "Rotas", "Em Andamento", "Pacotes", "Entregues", "Pendências", "Falhas", "PPH Méd"].map((h) => (
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
                      <td className={`border border-white/10 px-2 py-2 font-mono font-bold ${dsStatus(b.ds) === "ok" ? "text-emerald-400" : dsStatus(b.ds) === "warn" ? "text-amber-400" : "text-rose-400"}`}>
                        {b.ds}%
                      </td>
                      <td className="border border-white/10 px-2 py-2">{b.rotas}</td>
                      <td className="border border-white/10 px-2 py-2">{b.andamento}</td>
                      <td className="border border-white/10 px-2 py-2">{b.pacotes}</td>
                      <td className="border border-white/10 px-2 py-2">{b.entregues}</td>
                      <td className="border border-white/10 px-2 py-2">{b.pendencias}</td>
                      <td className="border border-white/10 px-2 py-2">{b.falhas}</td>
                      <td className="border border-white/10 px-2 py-2">{b.pph}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="rounded-xl border border-white/5 bg-[#1f2937] p-5 text-center">
            <h4 className="flex items-center justify-center gap-2 text-base font-bold text-[#ff9a4d]">
              <Zap className="h-4 w-4" /> Atribuição de Motoristas
            </h4>
            <p className="mx-auto mt-1 max-w-xl text-xs text-slate-400">
              Recomenda o motorista ideal por rota (carga, cidade, mix, histórico) e roda em{" "}
              <strong className="text-slate-200">modo Dry-Run</strong> — nenhuma escrita real é feita até a confirmação.
            </p>
          </div>

          <textarea
            readOnly
            rows={3}
            placeholder="Cole os motoristas disponíveis — 1 por linha: Nome [TAB] Placa [TAB] Tipo"
            className="w-full resize-none rounded-lg border border-white/10 bg-black/20 p-3 text-xs text-slate-300 placeholder:text-slate-600"
          />

          <div className="flex flex-wrap gap-2">
            <ActionButton icon={PlayCircle} loading={loadingKey === "dryrun"} onClick={handleDryRun} variant="primary">
              Prévia (Dry-Run)
            </ActionButton>
            <ActionButton
              icon={Zap}
              loading={loadingKey === "atribuir"}
              onClick={handleAtribuirTodos}
            >
              {roster ? `Atribuir Todos (${pendingMatches})` : "Atribuir Todos"}
            </ActionButton>
          </div>

          {roster ? (
            <div className="no-scrollbar overflow-x-auto rounded-xl border border-white/5">
              <table className="w-full min-w-[600px] border-collapse text-left text-xs">
                <thead>
                  <tr className="bg-black/20 text-slate-400">
                    {["Serviço", "Rota", "Motorista", "Placa", "Tipo", "Status"].map((h) => (
                      <th key={h} className="px-3 py-2 font-semibold uppercase tracking-wider">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className={busy ? "animate-pulseSoft" : ""}>
                  {roster.map((r) => {
                    const st = ROSTER_STATUS[r.status];
                    return (
                      <tr key={r.serviceID} className="border-t border-white/5 text-slate-200">
                        <td className="px-3 py-2 font-mono text-slate-400">{r.serviceID}</td>
                        <td className="px-3 py-2 font-mono">{r.rota}</td>
                        <td className="px-3 py-2 font-medium">{r.motorista}</td>
                        <td className="px-3 py-2 font-mono text-slate-400">{r.placa}</td>
                        <td className="px-3 py-2">{r.tipo}</td>
                        <td className="px-3 py-2">
                          <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${st.cls}`}>{st.label}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-white/10 bg-black/10 py-10 text-center text-xs text-slate-500">
              Rode a prévia (Dry-Run) para ver as propostas de atribuição por rota.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
