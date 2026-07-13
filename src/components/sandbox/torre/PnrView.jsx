import { useState } from "react";
import { Copy, Check } from "lucide-react";

const FASES = ["A Tratar", "Penalidade", "Saving", "Desconto"];
const FASE_ACCENT = {
  "A Tratar": "border-t-rose-400",
  Penalidade: "border-t-amber-400",
  Saving: "border-t-sky-400",
  Desconto: "border-t-emerald-400",
};
const RISCO_CLASSES = {
  Crítico: "text-rose-400 bg-rose-400/10",
  Alto: "text-amber-400 bg-amber-400/10",
  Médio: "text-amber-400 bg-amber-400/10",
  Baixo: "text-emerald-400 bg-emerald-400/10",
  Financeiro: "text-sky-400 bg-sky-400/10",
};

function buildMessage(item) {
  return `Olá ${item.cliente}, referente ao caso do produto "${item.produto}" (fase: ${item.fase}): estamos com a tratativa em andamento. Prazo restante: ${item.slaRestante}.`;
}

export default function PnrView({ pnrs }) {
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = async (item) => {
    try {
      await navigator.clipboard.writeText(buildMessage(item));
    } catch {
      // ambiente sem permissão de clipboard — feedback visual segue mesmo assim
    }
    setCopiedId(item.id);
    setTimeout(() => setCopiedId((c) => (c === item.id ? null : c)), 1500);
  };

  return (
    <div className="space-y-4">
      <div>
        <div className="text-sm font-bold text-white">PNR — Paguei e Não Recebi</div>
        <div className="mt-0.5 text-[11px] text-slate-500">
          Fases reais do case-center: A Tratar → Penalidade → Saving → Desconto.
        </div>
      </div>

      <div className="no-scrollbar grid grid-flow-col auto-cols-[minmax(230px,1fr)] gap-3 overflow-x-auto pb-1 md:grid-flow-row md:grid-cols-4 md:auto-cols-auto">
        {FASES.map((fase) => {
          const cards = pnrs.filter((p) => p.fase === fase);
          return (
            <div key={fase} className={`rounded-xl border border-white/5 border-t-2 bg-[#1f2937] p-3 ${FASE_ACCENT[fase]}`}>
              <div className="mb-3 flex items-center justify-between px-1">
                <span className="text-xs font-bold text-white">{fase}</span>
                <span className="rounded-full bg-black/25 px-2 py-0.5 font-mono text-[11px] text-slate-400">
                  {cards.length}
                </span>
              </div>
              <div className="space-y-2">
                {cards.map((item) => (
                  <div key={item.id} className="rounded-lg border border-white/5 bg-black/20 p-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[11px] text-slate-500">{item.id}</span>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${RISCO_CLASSES[item.risco]}`}>
                        {item.risco}
                      </span>
                    </div>
                    <div className="mt-1.5 text-xs font-semibold text-white">{item.cliente}</div>
                    <div className="mt-0.5 text-[11px] text-slate-400">{item.produto}</div>
                    <div className="mt-2 flex items-center justify-between text-[11px]">
                      <span className="font-mono text-slate-300">{item.slaRestante}</span>
                      <span className="text-slate-500">{item.contato}</span>
                    </div>
                    <button
                      onClick={() => handleCopy(item)}
                      className="mt-2 inline-flex w-full items-center justify-center gap-1.5 rounded-md border border-white/10 bg-white/[0.03] px-2 py-1.5 text-[10px] font-semibold text-slate-300 transition-colors duration-300 hover:border-[#ff6200]/40 hover:text-white"
                    >
                      {copiedId === item.id ? (
                        <>
                          <Check className="h-3 w-3 text-emerald-400" /> Copiado
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" /> Mensagem
                        </>
                      )}
                    </button>
                  </div>
                ))}
                {cards.length === 0 && (
                  <div className="rounded-lg border border-dashed border-white/10 py-4 text-center text-[11px] text-slate-500">
                    Vazio
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
