import { useState } from "react";
import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import formacaoData from "../data/formacaoData";
import projectCases from "../data/projectCases";

export default function Dashboard() {
  const [tasks, setTasks] = useState([
    { id: 1, titulo: "Finalizar integração da API da LEO", status: "Em andamento" },
    { id: 2, titulo: "Revisar TMS e estrutura do portfólio", status: "Pendente" },
    { id: 3, titulo: "Planejar automação de relatórios Power BI", status: "Concluído" },
  ]);

  const getColor = (status) => {
    switch (status) {
      case "Concluído":
        return "text-emerald-400 border-emerald-400/40 bg-emerald-900/10";
      case "Em andamento":
        return "text-amber-400 border-amber-400/40 bg-amber-900/10";
      default:
        return "text-slate-400 border-slate-400/30 bg-slate-800/40";
    }
  };

  const totalConcluido =
    formacaoData.filter((i) => i.status === "Concluído").length +
    projectCases.filter((i) => i.status === "Concluído").length;

  const totalItens = formacaoData.length + projectCases.length;
  const progressoTotal = Math.round((totalConcluido / totalItens) * 100);

  return (
    <SectionWrapper id="dashboard" contentClassName="text-slate-200 space-y-10">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="section-title"
      >
        Painel de Gestão Pessoal
      </motion.h2>

      {/* === RESUMO GERAL === */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur-sm"
      >
        <h3 className="text-lg font-semibold text-white">Resumo Geral</h3>
        <div className="mt-4 flex items-center justify-between text-sm text-slate-400">
          <span>{totalConcluido} concluídos de {totalItens} totais</span>
          <span>{progressoTotal}%</span>
        </div>
        <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-slate-800">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressoTotal}%` }}
            transition={{ duration: 1 }}
            className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400"
          />
        </div>
      </motion.div>

      {/* === SEÇÃO DE ESTUDOS === */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
      >
        <h3 className="text-xl font-semibold text-white">📚 Estudos</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {formacaoData.map((curso) => (
            <motion.div
              key={curso.titulo}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className={`rounded-xl border p-4 ${getColor(curso.status)}`}
            >
              <h4 className="font-semibold">{curso.titulo}</h4>
              <p className="text-sm text-slate-400 mt-1">{curso.descricao}</p>
              <p className="mt-2 text-xs">Progresso: {curso.progresso}%</p>
              <p className="mt-1 text-xs italic">{curso.status}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* === SEÇÃO DE PROJETOS === */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="space-y-4"
      >
        <h3 className="text-xl font-semibold text-white">🚀 Projetos</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projectCases.map((proj) => (
            <motion.div
              key={proj.titulo}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className={`rounded-xl border p-4 ${getColor(proj.status)}`}
            >
              <h4 className="font-semibold">{proj.titulo}</h4>
              <p className="text-sm text-slate-400 mt-1">{proj.descricao}</p>
              <p className="mt-2 text-xs italic">{proj.status}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* === SEÇÃO DE TAREFAS === */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="space-y-4"
      >
        <h3 className="text-xl font-semibold text-white">🧠 Tarefas pessoais</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tasks.map((task) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className={`rounded-xl border p-4 ${getColor(task.status)}`}
            >
              <h4 className="font-semibold">{task.titulo}</h4>
              <p className="mt-2 text-xs italic">{task.status}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
