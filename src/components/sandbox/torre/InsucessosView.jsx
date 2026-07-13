import { useState } from "react";
import { Copy, Check } from "lucide-react";

const STATUS_OPTIONS = ["A Tratar", "Em Tratativa", "Resolvido", "Revertido"];
const STATUS_CLASSES = {
  "A Tratar": "text-rose-400 bg-rose-400/10 border-rose-400/20",
  "Em Tratativa": "text-sky-400 bg-sky-400/10 border-sky-400/20",
  Resolvido: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  Revertido: "text-slate-400 bg-white/5 border-white/10",
};

const CURRENT_OPERATOR = "Você";

function buildMessage(item) {
  return `Olá ${item.cliente}, identificamos uma ocorrência na entrega da rota ${item.rota}: "${item.motivo}". Já estamos tratando e retornaremos em breve.`;
}

export default function InsucessosView({ insucessos, onChange, scope }) {
  const [copiedId, setCopiedId] = useState(null);

  const visible = scope === "GLOBAL" ? insucessos : insucessos.filter((i) => i.base === scope);

  const updateRow = (id, patch) => {
    onChange(
      insucessos.map((row) => {
        if (row.id !== id) return row;
        const next = { ...row, ...patch };
        if (patch.status && patch.status !== "A Tratar" && !next.operador) {
          next.operador = CURRENT_OPERATOR;
        }
        return next;
      })
    );
  };

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
        <div className="text-sm font-bold text-white">Insucessos do Dia</div>
        <div className="mt-0.5 text-[11px] text-slate-500">
          Status e observação são compartilhados entre operadores, com autoria registrada.
        </div>
      </div>

      <div className="space-y-2.5">
        {visible.map((item) => (
          <div key={item.id} className="rounded-xl border border-white/5 bg-[#1f2937] p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-mono text-slate-500">{item.id}</span>
                  <span className="font-mono text-slate-400">{item.rota}</span>
                </div>
                <div className="mt-1 text-sm font-semibold text-white">{item.cliente}</div>
                <div className="mt-0.5 text-xs text-slate-400">{item.motivo}</div>
              </div>

              <select
                value={item.status}
                onChange={(e) => updateRow(item.id, { status: e.target.value })}
                className={`rounded-md border px-2.5 py-1.5 text-[11px] font-bold ${STATUS_CLASSES[item.status]} bg-[#111827]`}
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s} className="bg-[#111827] text-white">
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <input
                type="text"
                value={item.observacao}
                onChange={(e) => updateRow(item.id, { observacao: e.target.value })}
                placeholder="Observação da tratativa..."
                className="min-w-[200px] flex-1 rounded-md border border-white/10 bg-black/20 px-2.5 py-1.5 text-xs text-slate-200 placeholder:text-slate-600"
              />
              {item.operador && (
                <span className="whitespace-nowrap rounded-full bg-white/5 px-2.5 py-1 text-[10px] text-slate-400">
                  por {item.operador}
                </span>
              )}
              <button
                onClick={() => handleCopy(item)}
                className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-md border border-white/10 bg-black/20 px-2.5 py-1.5 text-[11px] font-semibold text-slate-300 transition-colors duration-300 hover:border-[#ff6200]/40 hover:text-white"
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
          </div>
        ))}
        {visible.length === 0 && (
          <div className="rounded-xl border border-dashed border-white/10 py-10 text-center text-xs text-slate-500">
            Nenhum insucesso para esta base.
          </div>
        )}
      </div>
    </div>
  );
}
