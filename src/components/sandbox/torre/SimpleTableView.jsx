import { RefreshCw } from "lucide-react";
import { ActionButton } from "../ui";

export default function SimpleTableView({ title, hint, columns, rows, loading, onRefresh, renderCell }) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-sm font-bold text-white">{title}</div>
          {hint && <div className="mt-0.5 text-[11px] text-slate-500">{hint}</div>}
        </div>
        {onRefresh && (
          <ActionButton icon={RefreshCw} loading={loading} onClick={onRefresh}>
            Atualizar
          </ActionButton>
        )}
      </div>

      <div className="no-scrollbar overflow-x-auto rounded-xl border border-white/5">
        <table className="w-full min-w-[520px] border-collapse text-left text-xs">
          <thead>
            <tr className="bg-black/20 text-slate-400">
              {columns.map((c) => (
                <th key={c.key} className="px-3 py-2.5 font-semibold uppercase tracking-wider">
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={loading ? "animate-pulseSoft" : ""}>
            {rows.map((row, i) => (
              <tr key={i} className="border-t border-white/5 text-slate-200">
                {columns.map((c) => (
                  <td key={c.key} className="px-3 py-2.5">
                    {renderCell ? renderCell(c.key, row) ?? row[c.key] : row[c.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
