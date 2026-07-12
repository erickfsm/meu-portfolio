import { useState } from "react";
import { RefreshCw, Play, ListRestart } from "lucide-react";
import { engineSeed, randomBetween } from "../../data/mockData";
import { ActionButton, StatusBadge, KpiCard, TableShell } from "./ui";

const now = () => new Date().toLocaleTimeString("pt-BR", { hour12: false });

export default function EngineSandbox() {
  const [metrics, setMetrics] = useState(engineSeed.metrics);
  const [rules, setRules] = useState(engineSeed.rules);
  const [log, setLog] = useState(engineSeed.log);
  const [loadingKey, setLoadingKey] = useState(null);

  const pushLog = (message, level = "ok") =>
    setLog((prev) => [{ time: now(), message, level }, ...prev].slice(0, 6));

  const run = (key, delayMs, updater) => {
    setLoadingKey(key);
    setTimeout(() => {
      updater();
      setLoadingKey(null);
    }, delayMs);
  };

  const handleRefresh = () =>
    run("refresh", 1000, () => {
      setMetrics({
        processedToday: randomBetween(3800, 5600),
        pendingQueue: randomBetween(20, 90),
        errorRate: randomBetween(0.2, 2.4, 1),
        erpGapsFilled: randomBetween(200, 420),
      });
      pushLog("Sincronização de dados concluída", "ok");
    });

  const handleRunEngine = () =>
    run("run", 1000, () => {
      const processed = randomBetween(150, 420);
      setRules((prev) =>
        prev.map((r) => ({ ...r, processed: r.processed + Math.floor(processed / prev.length) }))
      );
      setMetrics((prev) => ({
        ...prev,
        processedToday: prev.processedToday + processed,
        pendingQueue: Math.max(0, prev.pendingQueue - randomBetween(5, 15)),
      }));
      pushLog(`Motor de regras executado: ${processed} registros processados`, "ok");
    });

  const handleReprocess = () =>
    run("reprocess", 1000, () => {
      setMetrics((prev) => ({ ...prev, pendingQueue: randomBetween(0, 20) }));
      pushLog("Fila reprocessada — pendências reduzidas", "warn");
    });

  const busy = loadingKey !== null;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-end gap-2">
        <ActionButton icon={RefreshCw} loading={loadingKey === "refresh"} onClick={handleRefresh}>
          Atualizar Dados
        </ActionButton>
        <ActionButton icon={Play} loading={loadingKey === "run"} onClick={handleRunEngine} variant="primary">
          Executar Motor de Regras
        </ActionButton>
        <ActionButton icon={ListRestart} loading={loadingKey === "reprocess"} onClick={handleReprocess}>
          Reprocessar Fila
        </ActionButton>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <KpiCard label="Processados Hoje" value={metrics.processedToday} tone="gold" loading={busy} />
        <KpiCard label="Fila Pendente" value={metrics.pendingQueue} loading={busy} />
        <KpiCard label="Taxa de Erro" value={metrics.errorRate} suffix="%" loading={loadingKey === "refresh"} />
        <KpiCard label="Gaps de ERP Preenchidos" value={metrics.erpGapsFilled} loading={loadingKey === "refresh"} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <TableShell>
          <thead>
            <tr className="bg-panel-soft text-[11px] uppercase tracking-wider text-mist-dim">
              <th className="px-4 py-3 font-medium">Regra de Negócio</th>
              <th className="px-4 py-3 font-medium">Categoria</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Processados</th>
            </tr>
          </thead>
          <tbody>
            {rules.map((r) => (
              <tr key={r.id} className="border-t border-line">
                <td className="px-4 py-3 font-medium text-ivory">{r.name}</td>
                <td className="px-4 py-3 text-mist">{r.category}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={r.status} />
                </td>
                <td className={`px-4 py-3 font-mono text-gold ${busy ? "animate-pulseSoft" : ""}`}>
                  {r.processed.toLocaleString("pt-BR")}
                </td>
              </tr>
            ))}
          </tbody>
        </TableShell>

        <div className="rounded-xl border border-line bg-panel-soft p-4">
          <div className="mb-3 text-[11px] uppercase tracking-wider text-mist-dim">
            Log de Execução
          </div>
          <div className="space-y-3 font-mono text-xs">
            {log.map((entry, i) => (
              <div key={i} className="flex items-start gap-2">
                <span
                  className={`mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full ${
                    entry.level === "warn" ? "bg-amber-400" : "bg-emerald-400"
                  }`}
                />
                <div>
                  <div className="text-mist-dim">{entry.time}</div>
                  <div className="text-mist">{entry.message}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
