export default function Hero() {
  return (
    <section id="inicio" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 md:grid-cols-[1.3fr_0.7fr]">
          
          {/* Texto Principal */}
          <div className="space-y-6">
            <div className="inline-block">
              <span className="text-[#00c9a7] text-sm font-semibold uppercase tracking-wider">
                Analista Logístico & inovação
              </span>
            </div>
            
            <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
              Transformo dados em 
              <span className="text-[#00c9a7]"> decisões estratégicas</span>
            </h1>
            
            <p className="text-lg text-slate-300 max-w-xl leading-relaxed">
              Sou Erick Filipe. Estudante em tecnologia e otimização de processos logísticos 
              com foco em <strong>OTD</strong>, <strong>automação</strong> e 
              <strong> gestão de dados</strong>. Transformo complexidade em 
              simplicidade usando Excel Avançado, Power BI, metodologias ágeis e storytelling.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="#projetos"
                className="inline-block rounded-lg bg-[#00c9a7] px-8 py-3.5 text-sm font-bold text-[#050b18] transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(0,201,167,0.4)]"
              >
                Ver Projetos
              </a>
              <a
                href="https://wa.me/5531972372452"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-lg border border-white/20 bg-white/5 px-8 py-3.5 text-sm font-bold text-white transition-all hover:bg-white/10 hover:border-white/40"
              >
                Vamos conversar
              </a>
            </div>

            {/* Stats Rápidos */}
            <div className="flex flex-wrap gap-6 pt-6 border-t border-white/10">
              <div>
                <div className="text-2xl font-bold text-[#00c9a7]">83% → 89%</div>
                <div className="text-xs text-slate-400 uppercase">OTD em menos de 60 dias</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[#00c9a7]">-70%</div>
                <div className="text-xs text-slate-400 uppercase">Volume de romaneios</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[#00c9a7]">70%</div>
                <div className="text-xs text-slate-400 uppercase">Menos trabalho manual</div>
              </div>
            </div>
          </div>

          {/* Cards de Destaque */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Excel Avançado", value: "Power Query & Pivot", icon: "📊" },
              { label: "Power BI", value: "Dashboards", icon: "📈" },
              { label: "SQL", value: "Análise de Dados", icon: "🗄️" },
              { label: "Metodologias", value: "Lean, Scrum, PDCA, Storytelling", icon: "⚙️" }
            ].map((item, i) => (
              <div 
                key={i} 
                className="rounded-xl border border-white/10 bg-[#0b1328]/70 p-5 backdrop-blur-sm transition-all hover:border-[#00c9a7]/30 hover:bg-[#0b1328] hover:-translate-y-1"
              >
                <div className="text-2xl mb-2">{item.icon}</div>
                <div className="text-xs uppercase tracking-wider text-slate-400 mb-1">
                  {item.label}
                </div>
                <div className="text-sm font-semibold text-white">
                  {item.value}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
      
      {/* Efeito de fundo sutil */}
      <div className="absolute top-0 right-0 -z-10 h-[600px] w-[600px] bg-[#00c9a7]/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 -z-10 h-[400px] w-[400px] bg-[#6c3cff]/5 blur-[120px] rounded-full pointer-events-none" />
    </section>
  );
}
