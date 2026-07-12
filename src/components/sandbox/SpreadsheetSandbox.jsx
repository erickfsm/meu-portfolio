import { useState } from "react";
import { RefreshCw, Calculator, ShieldCheck, Filter } from "lucide-react";
import { slaTrackerSeed, auditSeed, randomBetween } from "../../data/mockData";
import { ActionButton, StatusBadge, BarChart, TableShell } from "./ui";

const COLUMNS = "ABCDEFGH".split("");

const CONFIG = {
  sla: {
    seed: slaTrackerSeed,
    formula: '=SE(DIAS_ABERTO>7;"VENCIDO";"EM ANÁLISE")',
    cellRef: "E14",
    breakdownKey: "status",
    breakdownValueKey: "count",
    breakdownFormat: (v) => v,
    columns: ["ID", "Cliente", "Valor", "Dias em Aberto", "Status"],
    row: (r) => [r.id, r.cliente, r.valor, r.diasAberto, r.status],
    statusField: "status",
    secondaryAction: { label: "Recalcular SLA", icon: Calculator },
    filterAction: { label: "Filtrar Vencidos", icon: Filter, matchStatus: "Vencido" },
  },
  audit: {
    seed: auditSeed,
    formula: "=PROCV(ID_OCORRENCIA;BASE_FATURAS;3;FALSO)",
    cellRef: "C22",
    breakdownKey: "motivo",
    breakdownValueKey: "valor",
    breakdownFormat: (v) => `R$ ${v.toLocaleString("pt-BR")}`,
    columns: ["ID", "Tipo", "Transportadora", "Valor", "Status"],
    row: (r) => [r.id, r.tipo, r.transportadora, r.valor, r.status],
    statusField: "status",
    secondaryAction: { label: "Auditar Faturamento", icon: ShieldCheck },
    filterAction: { label: "Filtrar Pendentes", icon: Filter, matchStatus: "Pendente" },
  },
};

export default function SpreadsheetSandbox({ mode }) {
  const config = CONFIG[mode];
  const [rows, setRows] = useState(config.seed.rows);
  const [breakdown, setBreakdown] = useState(config.seed.breakdown);
  const [filterOn, setFilterOn] = useState(false);
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
      setBreakdown((prev) =>
        prev.map((b) => ({
          ...b,
          [config.breakdownValueKey]:
            mode === "sla" ? randomBetween(5, 60) : randomBetween(2000, 22000),
        }))
      );
    });

  const handleSecondary = () =>
    run("secondary", 1000, () => {
      if (mode === "sla") {
        setRows((prev) =>
          prev.map((r) => ({
            ...r,
            status: r.diasAberto > 7 ? "Vencido" : r.status === "Vencido" ? "Em análise" : r.status,
          }))
        );
      } else {
        const options = ["Auditado", "Divergência", "Pendente"];
        setRows((prev) =>
          prev.map((r) =>
            Math.random() > 0.5 ? { ...r, status: options[Math.floor(Math.random() * options.length)] } : r
          )
        );
      }
    });

  const handleFilter = () => run("filter", 500, () => setFilterOn((v) => !v));

  const visibleRows = filterOn
    ? rows.filter((r) => r[config.statusField] === config.filterAction.matchStatus)
    : rows;
  const busy = loadingKey !== null;
  const SecondaryIcon = config.secondaryAction.icon;
  const FilterIcon = config.filterAction.icon;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-end gap-2">
        <ActionButton icon={RefreshCw} loading={loadingKey === "refresh"} onClick={handleRefresh}>
          Atualizar Dados
        </ActionButton>
        <ActionButton icon={SecondaryIcon} loading={loadingKey === "secondary"} onClick={handleSecondary} variant="primary">
          {config.secondaryAction.label}
        </ActionButton>
        <ActionButton icon={FilterIcon} loading={loadingKey === "filter"} onClick={handleFilter}>
          {filterOn ? "Limpar Filtro" : config.filterAction.label}
        </ActionButton>
      </div>

      {/* Barra de fórmula estilo planilha */}
      <div className="flex items-center gap-3 rounded-lg border border-line bg-panel-soft px-3 py-2 font-mono text-xs">
        <span className="rounded border border-line bg-white/5 px-2 py-1 text-gold">{config.cellRef}</span>
        <span className="text-mist-dim">fx</span>
        <span className="truncate text-mist">{config.formula}</span>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr]">
        <div className="rounded-xl border border-line bg-panel-soft p-4">
          <div className="mb-3 text-[11px] uppercase tracking-wider text-mist-dim">
            {mode === "sla" ? "Casos por Status" : "Indenizações por Motivo"}
          </div>
          <BarChart
            data={breakdown}
            labelKey={config.breakdownKey}
            valueKey={config.breakdownValueKey}
            format={config.breakdownFormat}
            loading={loadingKey === "refresh"}
          />
        </div>

        {/* Data grid estilo Excel */}
        <div className="overflow-hidden rounded-xl border border-line">
          <div className="no-scrollbar overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-left text-xs">
              <thead>
                <tr className="bg-panel-raised text-mist-dim">
                  <th className="w-8 border border-line/60 bg-white/[0.02] px-2 py-1.5 text-center font-mono"> </th>
                  {COLUMNS.slice(0, config.columns.length).map((c) => (
                    <th key={c} className="border border-line/60 bg-white/[0.02] px-2 py-1.5 text-center font-mono">
                      {c}
                    </th>
                  ))}
                </tr>
                <tr className="bg-panel-soft text-[11px] uppercase tracking-wider text-mist-dim">
                  <th className="border border-line/60 px-2 py-2 text-center font-mono">#</th>
                  {config.columns.map((c) => (
                    <th key={c} className="border border-line/60 px-3 py-2 font-medium">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {visibleRows.map((r, i) => (
                  <tr key={r.id} className={i % 2 === 0 ? "bg-transparent" : "bg-white/[0.015]"}>
                    <td className="border border-line/60 px-2 py-2 text-center font-mono text-mist-dim">{i + 1}</td>
                    {config.row(r).map((cell, j) => (
                      <td key={j} className="border border-line/60 px-3 py-2 text-mist">
                        {j === config.row(r).length - 1 ? (
                          <StatusBadge status={cell} />
                        ) : (
                          <span className={j === 0 ? "font-mono text-ivory" : ""}>{cell}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
