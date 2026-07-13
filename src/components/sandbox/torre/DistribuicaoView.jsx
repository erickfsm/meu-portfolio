import { useState } from "react";
import { PlayCircle, Zap } from "lucide-react";
import { ActionButton } from "../ui";

const STATUS_LABELS = {
  MATCH: { label: "PRONTO P/ ATRIBUIR", cls: "bg-sky-400/15 text-sky-400" },
  ATRIBUIDO: { label: "ATRIBUÍDO", cls: "bg-emerald-400/15 text-emerald-400" },
  CONFLITO: { label: "CONFLITO", cls: "bg-amber-400/15 text-amber-400" },
  SEM_MOTORISTA: { label: "SEM MOTORISTA", cls: "bg-rose-400/15 text-rose-400" },
};

function computeMatches(rotas, motoristas) {
  const used = new Set();
  return rotas.map((rota) => {
    const candidato = motoristas.find((m) => m.tipo === rota.tipoExigido && m.status === "Livre" && !used.has(m.id));
    if (candidato) {
      used.add(candidato.id);
      return { ...rota, status: "MATCH", motoristaId: candidato.id, motorista: candidato.nome, placa: candidato.placa };
    }
    return { ...rota, status: "SEM_MOTORISTA", motoristaId: null, motorista: "—", placa: "—" };
  });
}

export default function DistribuicaoView({ rotasAbertas, motoristasDisponiveis, scope }) {
  const [motoristas, setMotoristas] = useState(motoristasDisponiveis);
  const [proposals, setProposals] = useState(null);
  const [loadingKey, setLoadingKey] = useState(null);

  const run = (key, delayMs, updater) => {
    setLoadingKey(key);
    setTimeout(() => {
      updater();
      setLoadingKey(null);
    }, delayMs);
  };

  const rotasEscopo = scope === "GLOBAL" ? rotasAbertas : rotasAbertas.filter((r) => r.base === scope);

  const handleDryRun = () =>
    run("dryrun", 1100, () => {
      setProposals(computeMatches(rotasEscopo, motoristas));
    });

  const handleAtribuirTodos = () =>
    run("atribuir", 1000, () => {
      const assignedDriverIds = new Set();
      setProposals((prev) =>
        prev.map((p) => {
          if (p.status !== "MATCH") return p;
          const conflito = Math.random() > 0.85;
          if (!conflito) assignedDriverIds.add(p.motoristaId);
          return { ...p, status: conflito ? "CONFLITO" : "ATRIBUIDO" };
        })
      );
      setMotoristas((prev) =>
        prev.map((m) => (assignedDriverIds.has(m.id) ? { ...m, status: "Atribuído" } : m))
      );
    });

  const pendingMatches = proposals ? proposals.filter((p) => p.status === "MATCH").length : 0;
  const busy = loadingKey !== null;

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-white/5 bg-[#1f2937] p-5 text-center">
        <h4 className="flex items-center justify-center gap-2 text-base font-bold text-[#ff9a4d]">
          <Zap className="h-4 w-4" /> Distribuição — Atribuição de Motoristas
        </h4>
        <p className="mx-auto mt-1 max-w-xl text-xs text-slate-400">
          Cruza rotas abertas por tipo de veículo e ciclo com motoristas disponíveis. Roda em{" "}
          <strong className="text-slate-200">modo Dry-Run</strong> — nenhuma escrita real é feita até a confirmação.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <ActionButton icon={PlayCircle} loading={loadingKey === "dryrun"} onClick={handleDryRun} variant="primary">
          Prévia (Dry-Run)
        </ActionButton>
        <ActionButton icon={Zap} loading={loadingKey === "atribuir"} onClick={handleAtribuirTodos} disabled={!proposals}>
          {proposals ? `Atribuir Todos (${pendingMatches})` : "Atribuir Todos"}
        </ActionButton>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
        {proposals ? (
          <div className="no-scrollbar overflow-x-auto rounded-xl border border-white/5">
            <table className="w-full min-w-[560px] border-collapse text-left text-xs">
              <thead>
                <tr className="bg-black/20 text-slate-400">
                  {["Serviço", "Rota", "Ciclo", "Motorista", "Placa", "Status"].map((h) => (
                    <th key={h} className="px-3 py-2 font-semibold uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className={busy ? "animate-pulseSoft" : ""}>
                {proposals.map((p) => {
                  const st = STATUS_LABELS[p.status];
                  return (
                    <tr key={p.id} className="border-t border-white/5 text-slate-200">
                      <td className="px-3 py-2 font-mono text-slate-400">{p.id}</td>
                      <td className="px-3 py-2 font-mono">{p.nome}</td>
                      <td className="px-3 py-2">{p.ciclo}</td>
                      <td className="px-3 py-2 font-medium">{p.motorista}</td>
                      <td className="px-3 py-2 font-mono text-slate-400">{p.placa}</td>
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

        <div className="rounded-xl border border-white/5 bg-[#1f2937] p-4">
          <div className="mb-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Motoristas Disponíveis
          </div>
          <div className="space-y-2">
            {motoristas.map((m) => (
              <div key={m.id} className="flex items-center justify-between rounded-lg bg-black/20 px-3 py-2 text-xs">
                <div>
                  <div className="font-medium text-slate-200">{m.nome}</div>
                  <div className="font-mono text-[11px] text-slate-500">
                    {m.placa} · {m.tipo}
                  </div>
                </div>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                    m.status === "Livre" ? "bg-emerald-400/15 text-emerald-400" : "bg-white/10 text-slate-300"
                  }`}
                >
                  {m.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
