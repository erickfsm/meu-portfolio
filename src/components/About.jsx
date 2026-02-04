import SectionWrapper from "./SectionWrapper";
import { Mail, Linkedin, MapPin, Calendar, GraduationCap, Briefcase } from "lucide-react";

export default function About() {
  return (
    <SectionWrapper id="sobre" title="Sobre Mim">
      <div className="grid gap-10 md:grid-cols-[1fr_320px]">
        
        {/* Narrativa Principal */}
        <div className="space-y-5 text-slate-300 leading-relaxed">
          <p className="text-lg">
            Sou <strong className="text-white">Erick Filipe da Silva Marques</strong>, 
            analista logístico com especialização em dados e automação. Tenho 20 anos 
            e moro em Ibirité, Minas Gerais.
          </p>
          
          <p>
            Minha jornada começou aos 15 anos como <strong>Jovem Aprendiz na ESAB</strong>, 
            onde aprendi os fundamentos de compras indiretas, negociação e toda cadeia de suprimentos (supply chain). Foi lá que desenvolvi meu primeiro contato com sistemas como SAP 
            e metodologias de organização.
          </p>
          
          <p>
            Em 2024, assumi o desafio de trabalhar com <strong>SAC e transporte na 
            Global Hospitalar</strong>, uma distribuidora farmacêutica com mais de 7 mil 
            clientes. Realizando tarefas de faturamento, romaneio, roterização, monitoramento, 
            indenização, devolução, contato com cliente, identifiquei que muitos problemas operacionais 
            poderiam ser resolvidos com <strong>dados melhores e processos mais claros</strong>.
          </p>

          <p>
            Tomei a iniciativa de criar planilhas inteligentes, dashboards e sistemas de 
            priorização que aumentaram o <strong>OTD de 83% para 89%</strong> em menos de
            60 dias. Também iniciei o mapeamento de processos críticos (BPM) e implementei 
            controles visuais (Kanban) que eliminaram gargalos recorrentes e melhora na comunicação intersetorial.
          </p>

          <p>
            Hoje, estou cursando na Alura cursos complementares para consolidar minha formação 
            academica, conforme minha esperiencia pratica e consolidada. Meu
            objetivo é unir minha experiência prática na operação com habilidades técnicas 
            para resolver problemas reais usando tecnologia e dados.
          </p>

          <div className="p-6 rounded-xl bg-[#0b1328]/50 border border-white/10 mt-6">
            <p className="text-sm italic text-slate-400">
              <strong className="text-[#00c9a7]">Diferencial:</strong> Tenho facilidade 
              para traduzir complexidade técnica em linguagem simples. Uso analogias e 
              comunicação clara para garantir que todos — da diretoria à operação e clientes — 
              estejam alinhados e tomem decisões baseadas em dados. Facil aprendizado, proatividade 
              e foco em resultados/clientes. 
            </p>
          </div>
        </div>

        {/* Card Lateral com Info Rápida */}
        <div className="space-y-4">
          {/* Foto e Nome */}
          <div className="bg-[#0b1328]/50 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#00c9a7] to-[#6c3cff] p-[2px]">
                <div className="w-full h-full rounded-full bg-[#0b1328] flex items-center justify-center text-2xl font-bold text-white">
                  EF
                </div>
              </div>
              <div>
                <div className="font-bold text-white">Erick Filipe</div>
                <div className="text-xs text-slate-400">Data-Driven Analyst</div>
              </div>
            </div>

            {/* Informações de Contato */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#00c9a7] mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-xs text-slate-500 uppercase">Localização</div>
                  <div className="text-sm text-white">Ibirité, MG</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="w-4 h-4 text-[#00c9a7] mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-xs text-slate-500 uppercase">Idade</div>
                  <div className="text-sm text-white">20 anos</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <GraduationCap className="w-4 h-4 text-[#00c9a7] mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-xs text-slate-500 uppercase">Formação</div>
                  <div className="text-sm text-white">¨Dados · Alura</div>
                  <div className="text-xs text-slate-400">Início: set/2025</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Briefcase className="w-4 h-4 text-[#00c9a7] mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-xs text-slate-500 uppercase">Experiência</div>
                  <div className="text-sm text-white">3+ anos</div>
                  <div className="text-xs text-slate-400">Logística & Dados</div>
                </div>
              </div>
            </div>
          </div>

          {/* Links de Contato */}
          <div className="bg-[#0b1328]/50 border border-white/10 rounded-2xl p-6 space-y-3">
            <a 
              href="mailto:erickfilipe66@gmail.com"
              className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group"
            >
              <Mail className="w-4 h-4 text-[#00c9a7]" />
              <span className="text-sm text-slate-300 group-hover:text-white">E-mail</span>
            </a>

            <a 
              href="https://www.linkedin.com/in/erickfsm"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group"
            >
              <Linkedin className="w-4 h-4 text-[#00c9a7]" />
              <span className="text-sm text-slate-300 group-hover:text-white">LinkedIn</span>
            </a>

            <a 
              href="/Cv__Erick_Filipe_logistico.pdf"
              download
              className="block text-center py-3 rounded-lg bg-[#00c9a7] text-[#050b18] text-sm font-bold hover:scale-105 transition-transform"
            >
              Baixar Currículo
            </a>
          </div>

          {/* Badges de Skills */}
          <div className="bg-[#0b1328]/50 border border-white/10 rounded-2xl p-6">
            <div className="text-xs uppercase text-slate-500 tracking-wider mb-3">
              Principais Skills
            </div>
            <div className="flex flex-wrap gap-2">
              {["Excel Avançado", "Power BI", "SQL", "Power Automate", "BPMN", "Scrum", "Lean", "Análise de Dados"].map((skill) => (
                <span 
                  key={skill}
                  className="text-xs px-3 py-1.5 rounded-full bg-white/5 text-slate-300 border border-white/10"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
