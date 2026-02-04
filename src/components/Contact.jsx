import SectionWrapper from "./SectionWrapper";
import { Mail, Linkedin, MessageCircle, FileDown } from "lucide-react";

export default function Contact() {
  const currentYear = new Date().getFullYear();

  return (
    <SectionWrapper 
      id="contato" 
      className="bg-gradient-to-b from-transparent to-[#0b1328]/50"
    >
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Vamos conversar?
        </h2>
        <p className="text-slate-300 mb-8 text-lg">
          Aberto a oportunidades que unam <strong>dados</strong>, 
          <strong> processos</strong> e <strong>automação</strong>.
        </p>

        {/* Grid de Contatos */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <a
            href="mailto:erickfilipe66@gmail.com"
            className="flex items-center justify-center gap-3 p-4 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/40 transition-all group"
          >
            <Mail className="w-5 h-5 text-[#00c9a7] group-hover:scale-110 transition-transform" />
            <div className="text-left">
              <div className="text-sm font-semibold text-white">E-mail</div>
              <div className="text-xs text-slate-400">erickfilipe66@gmail.com</div>
            </div>
          </a>

          <a
            href="https://www.linkedin.com/in/erickfsm"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 p-4 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/40 transition-all group"
          >
            <Linkedin className="w-5 h-5 text-[#00c9a7] group-hover:scale-110 transition-transform" />
            <div className="text-left">
              <div className="text-sm font-semibold text-white">LinkedIn</div>
              <div className="text-xs text-slate-400">/in/erickfsm</div>
            </div>
          </a>

          <a
            href="https://wa.me/5531972372452"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 p-4 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/40 transition-all group"
          >
            <MessageCircle className="w-5 h-5 text-[#00c9a7] group-hover:scale-110 transition-transform" />
            <div className="text-left">
              <div className="text-sm font-semibold text-white">WhatsApp</div>
              <div className="text-xs text-slate-400">(31) 9 7237-2452</div>
            </div>
          </a>

          <a
            href="/Cv__Erick_Filipe_logistico.pdf"
            download
            className="flex items-center justify-center gap-3 p-4 rounded-xl border border-[#00c9a7]/40 bg-[#00c9a7]/10 hover:bg-[#00c9a7]/20 transition-all group"
          >
            <FileDown className="w-5 h-5 text-[#00c9a7] group-hover:scale-110 transition-transform" />
            <div className="text-left">
              <div className="text-sm font-semibold text-[#00c9a7]">Baixar CV</div>
              <div className="text-xs text-[#00c9a7]/70">Currículo completo</div>
            </div>
          </a>
        </div>

        {/* CTA Principal */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-[#0b1328] to-[#0f1b33] border border-white/10 mb-8">
          <h3 className="text-xl font-bold text-white mb-3">
            💼 Busco oportunidades em:
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "Análise de Dados",
              "Analista de Transporte",
              "Analista de Logistica",
              "Analista Comercial",
              "Analista de Operações",
              "Projetos de Melhoria Contínua"
            ].map((area) => (
              <span 
                key={area}
                className="px-4 py-2 rounded-full bg-white/5 text-sm text-slate-300 border border-white/10"
              >
                {area}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-8 border-t border-white/10">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
            © {currentYear} Erick Filipe da Silva Marques
          </p>
          <p className="text-xs text-slate-600 mt-2">
            Ibirité, MG • Data-Driven Supply Chain Analyst
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
