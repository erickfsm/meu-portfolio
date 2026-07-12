import { useEffect, useState } from "react";
import { X } from "lucide-react";
import TourOverlay from "./TourOverlay";
import ControlTowerSandbox from "./sandbox/ControlTowerSandbox";
import EngineSandbox from "./sandbox/EngineSandbox";
import SpreadsheetSandbox from "./sandbox/SpreadsheetSandbox";

export default function ProjectModal({ project, onClose }) {
  const [tourStep, setTourStep] = useState(0);
  const tourActive = tourStep !== null;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  const handleNext = () => {
    if (tourStep < project.tour.length - 1) {
      setTourStep(tourStep + 1);
    } else {
      setTourStep(null);
    }
  };

  const renderSandbox = () => {
    switch (project.type) {
      case "control-tower":
        return <ControlTowerSandbox />;
      case "engine":
        return <EngineSandbox />;
      case "spreadsheet":
        return <SpreadsheetSandbox mode="sla" />;
      case "audit":
        return <SpreadsheetSandbox mode="audit" />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex animate-fadeIn flex-col bg-ink">
      <div className="grid-texture pointer-events-none absolute inset-0 opacity-40" />

      <header className="relative z-20 flex flex-shrink-0 items-center justify-between border-b border-line bg-panel/80 px-5 py-4 backdrop-blur-md md:px-8">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 flex-shrink-0 animate-pulseSoft rounded-full bg-emerald-400" />
            <span className="font-mono text-[11px] uppercase tracking-wider text-mist-dim">
              Sandbox ao vivo
            </span>
          </div>
          <h3 className="mt-1 truncate font-display text-lg font-bold text-ivory md:text-xl">
            {project.title}
          </h3>
        </div>

        <button
          onClick={onClose}
          className="flex-shrink-0 rounded-lg border border-line bg-white/[0.03] p-2.5 text-mist transition-all duration-300 hover:border-gold/40 hover:text-ivory"
          aria-label="Fechar experiência"
        >
          <X className="h-5 w-5" />
        </button>
      </header>

      <div className="relative flex-1 overflow-auto">
        <div
          className={`mx-auto max-w-6xl px-5 py-6 transition-all duration-300 md:px-8 md:py-8 ${
            tourActive ? "pointer-events-none blur-[1px] opacity-50" : ""
          }`}
        >
          {renderSandbox()}
        </div>

        {tourActive && (
          <TourOverlay
            steps={project.tour}
            stepIndex={tourStep}
            onNext={handleNext}
            onSkip={() => setTourStep(null)}
          />
        )}
      </div>
    </div>
  );
}
