import { useState } from "react";
import projectCases from "../data/projectCases";
import formacaoData from "../data/formacaoData";
import methodologiesData from "../data/methodologiesData";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("projetos");

  const renderTab = () => {
    switch (activeTab) {
      case "projetos":
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-4">📦 Projetos</h2>
            {projectCases.map((p, i) => (
              <div
                key={i}
                className="border border-white/10 rounded-2xl p-4 bg-white/5 hover:bg-white/10 transition"
              >
                <h3 className="text-lg font-semibold">{p.titulo}</h3>
                <p className="text-sm opacity-80 mb-2">{p.descricao}</p>
                <div className="flex items-center justify-between text-sm">
                  <span>Status: <b>{p.status || "–"}</b></span>
                  <span>Progresso: {p.progresso || 0}%</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full mt-2">
                  <div
                    className="h-2 bg-green-500 rounded-full"
                    style={{ width: `${p.progresso || 0}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        );

      case "formacoes":
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-4">🎓 Formações</h2>
            {formacaoData.map((f, i) => (
              <div
                key={i}
                className="border border-white/10 rounded-2xl p-4 bg-white/5 hover:bg-white/10 transition"
              >
                <h3 className="text-lg font-semibold">{f.titulo}</h3>
                <p className="text-sm opacity-80">{f.descricao}</p>
                <p className="text-xs mt-1">
                  Status: <b>{f.status || "–"}</b> | Progresso: {f.progresso || 0}%
                </p>
                <div className="w-full h-2 bg-white/10 rounded-full mt-2">
                  <div
                    className="h-2 bg-blue-500 rounded-full"
                    style={{ width: `${f.progresso || 0}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        );

      case "metodologias":
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-4">⚙️ Metodologias</h2>
            {methodologiesData.map((m, i) => (
              <div
                key={i}
                className="border border-white/10 rounded-2xl p-4 bg-white/5 hover:bg-white/10 transition"
              >
                <h3 className="text-lg font-semibold">{m.titulo}</h3>
                <p className="text-sm opacity-80">{m.descricao}</p>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#040b1a] to-[#0b1f3a] text-white p-8">
      <h1 className="text-3xl font-bold mb-6">
        Painel de Controle — <span className="text-sky-400">Erick FSM</span>
      </h1>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab("projetos")}
          className={`px-4 py-2 rounded-full transition ${
            activeTab === "projetos"
              ? "bg-sky-500 text-white"
              : "bg-white/10 hover:bg-white/20"
          }`}
        >
          Projetos
        </button>
        <button
          onClick={() => setActiveTab("formacoes")}
          className={`px-4 py-2 rounded-full transition ${
            activeTab === "formacoes"
              ? "bg-sky-500 text-white"
              : "bg-white/10 hover:bg-white/20"
          }`}
        >
          Formações
        </button>
        <button
          onClick={() => setActiveTab("metodologias")}
          className={`px-4 py-2 rounded-full transition ${
            activeTab === "metodologias"
              ? "bg-sky-500 text-white"
              : "bg-white/10 hover:bg-white/20"
          }`}
        >
          Metodologias
        </button>
      </div>

      <div>{renderTab()}</div>
    </div>
  );
}