import { useState } from "react";
import { RefreshCw, Radio, LayoutGrid, Truck, GraduationCap, Trophy } from "lucide-react";
import { controlTowerSeed, randomBetween } from "../../data/mockData";
import { ActionButton } from "./ui";
import DashboardView from "./torre/DashboardView";
import InsucessosView from "./torre/InsucessosView";
import PnrView from "./torre/PnrView";
import DistribuicaoView from "./torre/DistribuicaoView";
import SimpleTableView from "./torre/SimpleTableView";

const SCOPES = ["GLOBAL", "SMG1", "SMG8", "SMG14", "SMG15"];
const MODULES = [
  { id: "dashboard", label: "Dashboard" },
  { id: "distribuicao", label: "Distribuição" },
  { id: "insucessos", label: "Insucessos" },
  { id: "pnr", label: "PNR" },
  { id: "carregamento", label: "Carregamento", icon: Truck },
  { id: "comercial", label: "Comercial", icon: LayoutGrid },
  { id: "treinamentos", label: "Treinamentos", icon: GraduationCap },
  { id: "scorecard", label: "Score Card", icon: Trophy },
];

export default function ControlTowerSandbox() {
  const [scope, setScope] = useState("GLOBAL");
  const [module, setModule] = useState("dashboard");
  const [kpis, setKpis] = useState(controlTowerSeed.kpis);
  const [bases, setBases] = useState(controlTowerSeed.bases);
  const [insucessos, setInsucessos] = useState(controlTowerSeed.insucessos);
  const [carregamento, setCarregamento] = useState(controlTowerSeed.carregamento);
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
        ds: randomBetween(88, 96, 2),
        pacotesTotais: randomBetween(9800, 12500),
        rotasTotais: randomBetween(100, 140),
        insucessosPendentes: randomBetween(400, 700),
      });
      setBases((prev) => prev.map((b) => ({ ...b, ds: randomBetween(84, 97, 2), pendentes: randomBetween(100, 1200) })));
    });

  const handleRefreshCarregamento = () =>
    run("carregamento", 900, () => {
      const statuses = ["Pendente", "Subiu", "Em rota", "Finalizada"];
      setCarregamento((prev) => prev.map((c) => ({ ...c, status: statuses[Math.floor(Math.random() * statuses.length)] })));
    });

  const visibleCarregamento = scope === "GLOBAL" ? carregamento : carregamento.filter((c) => c.base === scope);
  const scopeLabel = (s) => (s === "GLOBAL" ? "VISÃO GLOBAL" : s);

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
              {scopeLabel(s)}
            </button>
          ))}
        </div>
        <ActionButton icon={RefreshCw} loading={loadingKey === "refresh"} onClick={handleRefresh}>
          Atualizar Dados
        </ActionButton>
      </div>

      <div className="no-scrollbar flex gap-1 overflow-x-auto rounded-lg border border-white/5 bg-[#1f2937] p-1">
        {MODULES.map((m) => (
          <button
            key={m.id}
            onClick={() => setModule(m.id)}
            className={`flex-shrink-0 rounded-md px-4 py-2 text-xs font-bold uppercase tracking-wide transition-colors duration-300 ${
              module === m.id ? "bg-[#ff6200] text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {module === "dashboard" && (
        <DashboardView
          kpis={kpis}
          dsTrend={controlTowerSeed.dsTrend}
          bases={bases}
          topOfensores={controlTowerSeed.topOfensores}
          topPendencias={controlTowerSeed.topPendencias}
          scope={scope}
          loading={loadingKey === "refresh"}
        />
      )}

      {module === "distribuicao" && (
        <DistribuicaoView
          rotasAbertas={controlTowerSeed.distribuicao.rotasAbertas}
          motoristasDisponiveis={controlTowerSeed.distribuicao.motoristasDisponiveis}
          scope={scope}
        />
      )}

      {module === "insucessos" && (
        <InsucessosView insucessos={insucessos} onChange={setInsucessos} scope={scope} />
      )}

      {module === "pnr" && <PnrView pnrs={controlTowerSeed.pnrs} />}

      {module === "carregamento" && (
        <SimpleTableView
          title="Carregamento — Aduana / Expedição"
          hint="Plano reconciliado com as rotas ao vivo pelo cluster."
          columns={[
            { key: "rota", label: "Rota" },
            { key: "cluster", label: "Cluster" },
            { key: "doca", label: "Doca" },
            { key: "status", label: "Status" },
            { key: "tempoAduana", label: "Tempo em Aduana" },
          ]}
          rows={visibleCarregamento}
          loading={loadingKey === "carregamento"}
          onRefresh={handleRefreshCarregamento}
        />
      )}

      {module === "comercial" && (
        <SimpleTableView
          title="Comercial — Pendências"
          hint="Clientes com pendências e horário-limite de fechamento."
          columns={[
            { key: "cliente", label: "Cliente" },
            { key: "pendencias", label: "Pendências" },
            { key: "horarioLimite", label: "Horário-Limite" },
          ]}
          rows={controlTowerSeed.comercial}
        />
      )}

      {module === "treinamentos" && (
        <SimpleTableView
          title="Treinamentos — Aderência por Motorista"
          columns={[
            { key: "motorista", label: "Motorista" },
            { key: "curso", label: "Curso" },
            { key: "status", label: "Status" },
            { key: "aderencia", label: "Aderência" },
          ]}
          rows={controlTowerSeed.treinamentos}
          renderCell={(key, row) => (key === "aderencia" ? `${row.aderencia}%` : undefined)}
        />
      )}

      {module === "scorecard" && (
        <SimpleTableView
          title="Score Card — Ranking Semanal"
          hint="Meritocracia a partir do desempenho de entrega."
          columns={[
            { key: "posicao", label: "#" },
            { key: "motorista", label: "Motorista" },
            { key: "ds", label: "DS" },
            { key: "insucessosResolvidos", label: "Insucessos Resolvidos" },
          ]}
          rows={controlTowerSeed.scoreCard}
          renderCell={(key, row) => (key === "ds" ? `${row.ds}%` : undefined)}
        />
      )}
    </div>
  );
}
