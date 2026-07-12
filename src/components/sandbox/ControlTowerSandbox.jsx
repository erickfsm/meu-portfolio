import { useState } from "react";
import { RefreshCw, Shuffle, Filter } from "lucide-react";
import { controlTowerSeed, randomBetween } from "../../data/mockData";
import { ActionButton, StatusBadge, KpiCard, TableShell } from "./ui";

const TABS = [
  { id: "geral", label: "Visão Geral" },
  { id: "motoristas", label: "Atribuição de Motoristas" },
];

export default function ControlTowerSandbox() {
  const [kpis, setKpis] = useState(controlTowerSeed.kpis);
  const [bases, setBases] = useState(controlTowerSeed.bases);
  const [drivers, setDrivers] = useState(controlTowerSeed.drivers);
  const [tab, setTab] = useState("geral");
  const [filterLeste, setFilterLeste] = useState(false);
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
        deliverySuccess: randomBetween(87, 96, 1),
        activeRoutes: randomBetween(100, 150),
        allocatedDrivers: randomBetween(80, 110),
        criticalOccurrences: randomBetween(2, 12),
      });
      setBases((prev) =>
        prev.map((b) => {
          const ds = randomBetween(82, 97, 1);
          const pending = randomBetween(1, 18);
          const status = ds < 86 || pending > 14 ? "Crítico" : ds < 91 || pending > 8 ? "Atenção" : "Estável";
          return { ...b, ds, pending, status };
        })
      );
    });

  const handleDistribute = () =>
    run("distribute", 1000, () => {
      const statuses = ["Em rota", "Carregando", "Aguardando", "Finalizado"];
      setDrivers((prev) =>
        prev.map((d) => ({
          ...d,
          status: statuses[Math.floor(Math.random() * statuses.length)],
        }))
      );
      setKpis((prev) => ({ ...prev, allocatedDrivers: randomBetween(85, 112) }));
    });

  const handleFilter = () =>
    run("filter", 500, () => setFilterLeste((v) => !v));

  const visibleBases = filterLeste ? bases.filter((b) => b.name === "Base Leste") : bases;
  const visibleDrivers = filterLeste ? drivers.filter((d) => d.base === "Base Leste") : drivers;
  const busy = loadingKey !== null;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-1 rounded-lg border border-line bg-panel-soft p-1">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`rounded-md px-3.5 py-1.5 text-xs font-semibold transition-colors duration-300 ${
                tab === t.id ? "bg-gold text-ink" : "text-mist hover:text-ivory"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          <ActionButton icon={RefreshCw} loading={loadingKey === "refresh"} onClick={handleRefresh}>
            Atualizar Dados
          </ActionButton>
          <ActionButton icon={Shuffle} loading={loadingKey === "distribute"} onClick={handleDistribute} variant="primary">
            Executar Distribuição
          </ActionButton>
          <ActionButton icon={Filter} loading={loadingKey === "filter"} onClick={handleFilter}>
            {filterLeste ? "Limpar Filtro" : "Filtrar Base Leste"}
          </ActionButton>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <KpiCard label="Delivery Success" value={kpis.deliverySuccess} suffix="%" tone="gold" loading={loadingKey === "refresh"} />
        <KpiCard label="Rotas Ativas" value={kpis.activeRoutes} loading={loadingKey === "refresh"} />
        <KpiCard label="Motoristas Alocados" value={kpis.allocatedDrivers} loading={busy} />
        <KpiCard label="Ocorrências Críticas" value={kpis.criticalOccurrences} loading={loadingKey === "refresh"} />
      </div>

      {tab === "geral" ? (
        <TableShell>
          <thead>
            <tr className="bg-panel-soft text-[11px] uppercase tracking-wider text-mist-dim">
              <th className="px-4 py-3 font-medium">Base</th>
              <th className="px-4 py-3 font-medium">Região</th>
              <th className="px-4 py-3 font-medium">Delivery Success</th>
              <th className="px-4 py-3 font-medium">Pendências</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {visibleBases.map((b) => (
              <tr key={b.id} className="border-t border-line">
                <td className="px-4 py-3 font-medium text-ivory">{b.name}</td>
                <td className="px-4 py-3 text-mist">{b.region}</td>
                <td className={`px-4 py-3 font-mono text-gold ${loadingKey === "refresh" ? "animate-pulseSoft" : ""}`}>
                  {b.ds}%
                </td>
                <td className={`px-4 py-3 font-mono text-mist ${loadingKey === "refresh" ? "animate-pulseSoft" : ""}`}>
                  {b.pending}
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={b.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </TableShell>
      ) : (
        <TableShell>
          <thead>
            <tr className="bg-panel-soft text-[11px] uppercase tracking-wider text-mist-dim">
              <th className="px-4 py-3 font-medium">Motorista</th>
              <th className="px-4 py-3 font-medium">Base</th>
              <th className="px-4 py-3 font-medium">Veículo</th>
              <th className="px-4 py-3 font-medium">Rota</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {visibleDrivers.map((d) => (
              <tr key={d.id} className="border-t border-line">
                <td className="px-4 py-3 font-medium text-ivory">{d.name}</td>
                <td className="px-4 py-3 text-mist">{d.base}</td>
                <td className="px-4 py-3 text-mist">{d.vehicle}</td>
                <td className="px-4 py-3 font-mono text-mist">{d.route}</td>
                <td className={`px-4 py-3 ${loadingKey === "distribute" ? "animate-pulseSoft" : ""}`}>
                  <StatusBadge status={d.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </TableShell>
      )}
    </div>
  );
}
