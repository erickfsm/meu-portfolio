import { ArrowDown, Activity } from "lucide-react";
import { heroMetrics } from "../data/mockData";

export default function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden pt-36 pb-24 md:pt-44 md:pb-32">
      <div className="grid-texture pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]" />

      <div className="mx-auto max-w-5xl px-6 text-center">
        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-line bg-panel/60 px-4 py-1.5 backdrop-blur-sm">
          <Activity className="h-3.5 w-3.5 text-gold" />
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-mist">
            Torre de Controle · Operações Ativas
          </span>
        </div>

        <h1 className="font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-ivory md:text-6xl">
          Erick Filipe
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg font-medium text-gold-soft md:text-xl">
          Analista de Operações & Dados{" "}
          <span className="text-mist font-normal">| Supply Chain & Torre de Controle</span>
        </p>

        <p className="mx-auto mt-6 max-w-2xl text-balance text-base leading-relaxed text-mist md:text-lg">
          Desenvolvo sistemas, dashboards e automações para eliminar gargalos
          operacionais e garantir a eficiência logística do B2B ao{" "}
          <span className="text-ivory">Last Mile</span>.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4">
          <a
            href="#showroom"
            className="group inline-flex items-center gap-2 rounded-lg bg-gold px-8 py-3.5 text-sm font-bold text-ink transition-all duration-300 hover:bg-gold-soft hover:shadow-[0_0_36px_rgba(201,169,97,0.35)]"
          >
            Explorar Showroom de Projetos
            <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
          </a>
        </div>

        <div className="mx-auto mt-14 grid max-w-2xl grid-cols-3 gap-4 border-t border-line pt-8">
          {heroMetrics.map((m) => (
            <div key={m.label}>
              <div className="font-mono text-xl font-semibold text-gold md:text-2xl">
                {m.value}
              </div>
              <div className="mt-1 text-[11px] uppercase tracking-wider text-mist-dim">
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute -top-24 right-0 -z-10 h-[520px] w-[520px] rounded-full bg-gold/[0.06] blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 -z-10 h-[360px] w-[360px] rounded-full bg-gold/[0.04] blur-[120px]" />
    </section>
  );
}
