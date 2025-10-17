import { useState } from "react";
import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";

const FALLBACK_CONTEXT =
  "Sou o Gemini, copiloto treinado pelo Erick para responder dúvidas sobre os cases de logística, OTD, romaneios e melhoria contínua.";

function generateFallbackResponse(message) {
  const normalized = message.toLowerCase();
  if (normalized.includes("otd")) {
    return "Recuperamos o OTD de 83% para 89% em 60 dias com auditoria diária, revisão de prazos por transportadora e alertas preventivos. A meta atual é chegar a 96% até novembro.";
  }
  if (normalized.includes("romaneio")) {
    return "Os romaneios cresceram 409% em três meses. A solução foi sincronizar expedição e faturamento, priorizar lotes críticos e projetar a capacidade para cortar 70% do tempo de digitação.";
  }
  if (normalized.includes("devol")) {
    return "O fluxo de devoluções está em fase beta com um kanban integrado ao rastreio. Ele classifica por atraso real e expõe bloqueios de SAC, Fiscal e Transporte.";
  }
  if (normalized.includes("contato") || normalized.includes("cv")) {
    return "Você pode falar direto com o Erick pelo WhatsApp (+55 31 97237-2452) ou baixar o currículo na seção de Contato.";
  }
  return "Posso explicar detalhes sobre OTD, romaneios, devoluções ou metodologia de trabalho. Qual resultado você quer entender melhor?";
}

export default function GeminiAssistant() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: FALLBACK_CONTEXT,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const endpoint = import.meta.env.VITE_GEMINI_ENDPOINT;

  const sendMessage = async (event) => {
    event.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      if (endpoint) {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: userMessage.content }),
        });
        if (response.ok) {
          const data = await response.json();
          const content = data?.output || generateFallbackResponse(userMessage.content);
          setMessages((prev) => [...prev, { role: "assistant", content }]);
        } else {
          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: generateFallbackResponse(userMessage.content) },
          ]);
        }
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: generateFallbackResponse(userMessage.content) },
        ]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Não consegui acessar o endpoint agora, mas posso continuar respondendo com a base local. Pergunte sobre os resultados e planos de ação!",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SectionWrapper
      id="assistant"
      disableSurface
      className="py-10"
      contentClassName="grid gap-8 md:grid-cols-[1fr_320px]"
    >
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="rounded-3xl border border-white/10 bg-[#0f1b33]/80 p-8 shadow-[0_35px_110px_rgba(5,10,30,0.55)] backdrop-blur"
      >
        <h2 className="text-2xl font-semibold text-white">Chatbot Gemini · Beta controlada</h2>
        <p className="mt-2 text-sm text-slate-300">
          Converse com o copiloto treinado em cima dos cases. Configure a variável <code>VITE_GEMINI_ENDPOINT</code> para usar a API oficial.
        </p>

        <div className="mt-6 h-[320px] space-y-4 overflow-y-auto rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
          {messages.map((message, index) => (
            <div
              key={`${message.role}-${index}`}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.role === "user"
                    ? "bg-gradient-to-r from-[#6c3cff] to-[#00c9a7] text-black"
                    : "bg-[#0b1328]/80 text-slate-200"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="text-xs uppercase tracking-[0.35em] text-slate-400">Gemini digitando...</div>
          )}
        </div>

        <form onSubmit={sendMessage} className="mt-4 flex gap-3">
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Pergunte sobre OTD, romaneios, devoluções..."
            className="flex-1 rounded-full border border-white/15 bg-[#0b1328]/80 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-[#00c9a7] focus:outline-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="rounded-full bg-gradient-to-r from-[#6c3cff] to-[#00c9a7] px-5 text-sm font-semibold text-black shadow-[0_12px_40px_rgba(108,60,255,0.35)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Enviar
          </button>
        </form>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-white/5 p-6 text-slate-200 backdrop-blur"
      >
        <div>
          <h3 className="text-lg font-semibold text-white">Como o bot ajuda?</h3>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            <li>• Responde perguntas rápidas sobre os cases e indicadores.</li>
            <li>• Gera próximos passos para melhoria contínua.</li>
            <li>• Pode ser integrado ao SAC para acelerar tratativas.</li>
          </ul>
        </div>
        <div className="rounded-xl border border-[#00c9a7]/40 bg-[#00c9a7]/10 p-4 text-xs text-[#00f0c2]">
          <p>
            Mantenho um log local durante a fase beta. Ao publicar, conecte ao endpoint Gemini oficial e habilite autenticação.
          </p>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
