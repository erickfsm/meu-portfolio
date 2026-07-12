import { useState } from "react";
import { RefreshCw, PackagePlus, Filter, Lock, Github, ExternalLink, Rocket } from "lucide-react";
import { apexCareSeed, randomBetween } from "../../data/mockData";
import { ActionButton, KpiCard, StatusBadge, TableShell } from "./ui";

const LINKS = [
  { key: "live", label: "Abrir Sistema", icon: ExternalLink, url: "https://app.apexcare.com.br/" },
  { key: "prelaunch", label: "Página VIP (Pré-lançamento)", icon: Rocket, url: "https://apexcare.com.br/vip" },
  { key: "github", label: "Repositório", icon: Github, url: "https://github.com/erickfsm/apex-care-website" },
];

function TechniciansView({ agenda }) {
  const byTech = {};
  agenda.forEach((a) => {
    byTech[a.tecnico] = (byTech[a.tecnico] || 0) + 1;
  });
  const techs = Object.entries(byTech);

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {techs.map(([name, count]) => (
        <div key={name} className="rounded-xl border border-line bg-panel-soft p-4 text-center">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-rose-400/15 font-mono text-sm font-bold text-rose-400">
            {name
              .split(" ")
              .map((p) => p[0])
              .join("")}
          </div>
          <div className="mt-2 text-sm font-semibold text-ivory">{name}</div>
          <div className="text-[11px] text-mist-dim">{count} ordens de serviço ativas</div>
        </div>
      ))}
    </div>
  );
}

export default function ApexCareSandbox() {
  const [stats, setStats] = useState(apexCareSeed.stats);
  const [agenda, setAgenda] = useState(apexCareSeed.agenda);
  const [view, setView] = useState("Dashboard");
  const [filterConfirmado, setFilterConfirmado] = useState(false);
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
      setStats((prev) =>
        prev.map((s) =>
          typeof s.value === "number" ? { ...s, value: randomBetween(Math.max(4, s.value - 20), s.value + 20) } : s
        )
      );
    });

  const handleNovoOrcamento = () =>
    run("novo", 1000, () => {
      const nomes = ["Juliana Prado", "Carlos Eduardo", "Beatriz Lima", "Studio Aurora"];
      const nome = nomes[Math.floor(Math.random() * nomes.length)];
      setAgenda((prev) => [
        { id: `OS-${randomBetween(2300, 2399)}`, cliente: nome, servico: "Higienização de estofado", tecnico: "Diego M.", data: "Hoje · a definir", status: "Aguardando" },
        ...prev,
      ]);
      setStats((prev) => prev.map((s) => (s.label === "Orçamentos no Mês" ? { ...s, value: s.value + 1 } : s)));
    });

  const handleFilter = () => run("filter", 500, () => setFilterConfirmado((v) => !v));

  const visibleAgenda = filterConfirmado ? agenda.filter((a) => a.status === "Confirmado") : agenda;
  const busy = loadingKey !== null;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap justify-end gap-2">
        {LINKS.map((link) => (
          <a
            key={link.key}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-line bg-white/[0.03] px-4 py-2.5 text-xs font-semibold text-ivory transition-all duration-300 hover:border-gold/40 hover:bg-gold hover:text-ink"
          >
            <link.icon className="h-3.5 w-3.5" />
            {link.label}
          </a>
        ))}
      </div>

      {/* Moldura de navegador simulando a visualização da interface web */}
      <div className="overflow-hidden rounded-2xl border border-line bg-panel-raised shadow-2xl shadow-black/40">
        <div className="flex items-center gap-3 border-b border-line bg-panel px-4 py-3">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
          </div>
          <div className="flex flex-1 items-center justify-center gap-1.5 rounded-md bg-black/25 px-3 py-1.5 font-mono text-[11px] text-mist">
            <Lock className="h-3 w-3 text-mist-dim" />
            app.apexcare.com.br
          </div>
        </div>

        <div className="p-5 md:p-6">
          <div className="mb-4 flex flex-wrap gap-1.5 border-b border-line pb-4">
            {apexCareSeed.nav.map((item) => (
              <button
                key={item}
                onClick={() => setView(item)}
                className={`rounded-md px-3.5 py-1.5 text-xs font-semibold transition-colors duration-300 ${
                  view === item ? "bg-gold text-ink" : "bg-white/[0.03] text-mist hover:text-ivory"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {view === "Técnicos" ? (
            <TechniciansView agenda={agenda} />
          ) : (
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                {stats.map((s) => (
                  <KpiCard key={s.label} label={s.label} value={s.value} loading={loadingKey === "refresh"} />
                ))}
              </div>

              <div className="flex flex-wrap justify-end gap-2">
                <ActionButton icon={RefreshCw} loading={loadingKey === "refresh"} onClick={handleRefresh}>
                  Atualizar Dados
                </ActionButton>
                <ActionButton icon={PackagePlus} loading={loadingKey === "novo"} onClick={handleNovoOrcamento} variant="primary">
                  Novo Orçamento
                </ActionButton>
                <ActionButton icon={Filter} loading={loadingKey === "filter"} onClick={handleFilter}>
                  {filterConfirmado ? "Limpar Filtro" : "Filtrar Confirmados"}
                </ActionButton>
              </div>

              <TableShell>
                <thead>
                  <tr className="bg-panel-soft text-[11px] uppercase tracking-wider text-mist-dim">
                    <th className="px-4 py-3 font-medium">OS</th>
                    <th className="px-4 py-3 font-medium">Cliente</th>
                    <th className="px-4 py-3 font-medium">Serviço</th>
                    <th className="px-4 py-3 font-medium">Técnico</th>
                    <th className="px-4 py-3 font-medium">Data</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className={busy ? "animate-pulseSoft" : ""}>
                  {visibleAgenda.map((a) => (
                    <tr key={a.id} className="border-t border-line">
                      <td className="px-4 py-3 font-mono text-mist-dim">{a.id}</td>
                      <td className="px-4 py-3 font-medium text-ivory">{a.cliente}</td>
                      <td className="px-4 py-3 text-mist">{a.servico}</td>
                      <td className="px-4 py-3 text-mist">{a.tecnico}</td>
                      <td className="px-4 py-3 font-mono text-mist">{a.data}</td>
                      <td className="px-4 py-3">
                        <StatusBadge status={a.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </TableShell>
            </div>
          )}
        </div>
      </div>

      <p className="text-center text-[11px] text-mist-dim">
        Pré-visualização ilustrativa da interface — acesse o sistema real pelos links acima.
      </p>
    </div>
  );
}
