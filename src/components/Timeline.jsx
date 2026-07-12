import { timelineData } from "../data/mockData";

export default function Timeline() {
  return (
    <section id="trajetoria" className="px-6 py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="font-display text-2xl font-bold text-ivory md:text-3xl">
            Linha do Tempo Operacional
          </h2>
          <p className="mt-2 text-sm text-mist">
            Da base do B2B à inteligência operacional em larga escala.
          </p>
        </div>

        <div className="relative">
          {/* Linha conectora — desktop */}
          <div className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-line to-transparent md:block" />

          <div className="grid gap-6 md:grid-cols-3 md:gap-8">
            {timelineData.map((step, i) => (
              <div key={step.id} className="relative">
                {/* Marcador */}
                <div className="mb-5 flex items-center gap-4 md:block">
                  <div className="relative z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-gold/30 bg-panel font-mono text-sm font-semibold text-gold shadow-[0_0_0_6px_#08090c]">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-mist-dim md:mt-4 md:block">
                    {step.period}
                  </span>
                </div>

                <div className="h-full rounded-2xl border border-line bg-panel/60 p-6 backdrop-blur-sm transition-all duration-300 hover:border-gold/25 hover:bg-panel">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-display text-lg font-bold text-ivory">
                      {step.title}
                    </h3>
                    <span className="flex-shrink-0 rounded-full border border-gold/20 bg-gold/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-gold-soft">
                      {step.company}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-mist">
                    {step.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2 border-t border-line pt-4">
                    {step.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-line bg-white/[0.03] px-2.5 py-1 text-[11px] text-mist"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
