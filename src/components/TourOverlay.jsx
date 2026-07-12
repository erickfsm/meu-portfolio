import { ArrowRight, X } from "lucide-react";

const POSITIONS = [
  "top-24 left-4 md:left-16 md:top-28",
  "top-1/2 right-4 -translate-y-1/2 md:right-16",
  "bottom-8 left-1/2 -translate-x-1/2 md:bottom-14",
];

export default function TourOverlay({ steps, stepIndex, onNext, onSkip }) {
  const step = steps[stepIndex];
  const isLast = stepIndex === steps.length - 1;

  return (
    <div className="absolute inset-0 z-30">
      <div className="absolute inset-0 bg-ink/70 backdrop-blur-[2px]" />

      <div
        className={`absolute z-40 w-[calc(100%-2rem)] max-w-sm animate-floatIn rounded-2xl border border-gold/30 bg-panel-raised p-5 shadow-2xl shadow-black/60 ${POSITIONS[stepIndex]}`}
      >
        <div className="mb-2 flex items-center justify-between">
          <span className="font-mono text-[11px] uppercase tracking-wider text-gold">
            Passo {stepIndex + 1} de {steps.length}
          </span>
          <button
            onClick={onSkip}
            className="text-mist-dim transition-colors hover:text-ivory"
            aria-label="Pular tour"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <h4 className="font-display text-base font-bold text-ivory">{step.title}</h4>
        <p className="mt-2 text-sm leading-relaxed text-mist">{step.text}</p>

        <div className="mt-4 flex items-center justify-between">
          <button
            onClick={onSkip}
            className="text-xs font-medium text-mist-dim transition-colors hover:text-ivory"
          >
            Pular
          </button>
          <button
            onClick={onNext}
            className="inline-flex items-center gap-1.5 rounded-lg bg-gold px-4 py-2 text-xs font-bold text-ink transition-all duration-300 hover:bg-gold-soft"
          >
            {isLast ? "Explorar Sandbox" : "Próximo"}
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="mt-4 flex gap-1.5">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                i <= stepIndex ? "bg-gold" : "bg-white/10"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
