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
  
  if (normalized.includes("forma") || normalized.includes("estud")) {
    return "O Erick estuda ADS na PUC Minas e está fazendo formação em Análise de Dados pela Alura, com foco em Power BI, SQL, Lean Six Sigma e automações.";
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
  const [error, setError] = useState(null);

  const endpoint = import.meta.env.VITE_GEMINI_ENDPOINT;

  const sendMessage = async (event) => {
    event.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      if (endpoint) {
        // ✅ CORRIGIDO: Formato correto do payload para API Gemini
        const apiKey = endpoint.split('key=')[1];
        const baseUrl = endpoint.split('?')[0];
        
        const response = await fetch(`${baseUrl}?key=${apiKey}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: userMessage.content
              }]
            }]
          }),
        });
        
        if (response.ok) {
          const data = await response.json();
          // ✅ Extrai o texto da resposta do Gemini corretamente
          const content = data?.candidates?.[0]?.content?.parts?.[0]?.text 
            || generateFallbackResponse(userMessage.content);
          setMessages((prev) => [...prev, { role: "assistant", content }]);
        } else {
          const errorData = await response.json().catch(() => ({}));
          console.error(`Erro ${response.status}:`, errorData);
          
          setError(`Erro ${response.status}: ${errorData?.error?.message || 'Verifique a chave da API'}`);
          setMessages((prev) => [
            ...prev,
            { 
              role: "assistant", 
              content: `⚠️ A API Gemini retornou um erro (${response.status}). Respondendo com base local:\n\n${generateFallbackResponse(userMessage.content)}` 
            },
          ]);
        }
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: generateFallbackResponse(userMessage.content) },
        ]);
      }
    } catch (err) {
      console.error("Erro ao conectar com Gemini:", err);
      setError("Falha na conexão. Usando respostas locais.");
      
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `🔌 Não consegui conectar ao endpoint, mas posso responder com a base local:\n\n${generateFallbackResponse(userMessage.content)}`,
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
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-white">Chatbot Gemini · Beta controlada</h2>
            <p className="mt-2 text-sm text-slate-300">
              Converse com o copiloto treinado em cima dos cases. 
              {!endpoint && (
                <span className="block mt-1 text-amber-400">
                  ⚠️ Modo offline: Configure <code className="bg-black/30 px-1 rounded">VITE_GEMINI_ENDPOINT</code> para usar a API.
                </span>
              )}
            </p>
          </div>
          
          {/* ✅ Indicador de status */}
          <div className="flex items-center gap-2 text-xs">
            <span className={`h-2 w-2 rounded-full ${endpoint ? 'bg-green-500' : 'bg-amber-500'} animate-pulse`} />
            <span className="text-slate-400">{endpoint ? 'API' : 'Local'}</span>
          </div>
        </div>

        {/* ✅ CORRIGIDO: Mensagem de erro visível */}
        {error && (
          <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
            {error}
          </div>
        )}

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
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-slate-400">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#00c9a7]" />
              Gemini digitando...
            </div>
          )}
        </div>

        <form onSubmit={sendMessage} className="mt-4 flex gap-3">
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Pergunte sobre OTD, romaneios, devoluções..."
            className="flex-1 rounded-full border border-white/15 bg-[#0b1328]/80 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-[#00c9a7] focus:outline-none focus:ring-2 focus:ring-[#00c9a7]/50"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
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
        
        <div className="space-y-3">
          <div className="rounded-xl border border-[#00c9a7]/40 bg-[#00c9a7]/10 p-4 text-xs text-[#00f0c2]">
            <p>
              <strong>Modo Beta:</strong> Atualmente rodando com respostas locais. Para conectar à API Gemini oficial, adicione a variável de ambiente no arquivo <code className="bg-black/30 px-1 rounded">.env</code>:
            </p>
            <code className="mt-2 block bg-black/30 p-2 rounded text-xs">
              VITE_GEMINI_ENDPOINT=sua_url_aqui
            </code>
          </div>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}