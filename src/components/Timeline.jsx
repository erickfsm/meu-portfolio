import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { timelineSteps } from "../data/timelineData";

export default function Timeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeStep = timelineSteps[activeIndex];

  return (
    <SectionWrapper id="timeline" contentClassName="space-y-10">
      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="section-title"
      >
        Minha trajetória
      </motion.h2>

      <div className="grid gap-8 md:grid-cols-[240px_1fr] md:items-start">
        <ol className="relative space-y-4 border-l border-white/10 pl-6">
          {timelineSteps.map((step, index) => {
            const isActive = index === activeIndex;
            return (
              <li key={step.year} className="relative">
                <button
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`flex w-full flex-col items-start rounded-xl border px-4 py-3 text-left transition ${
                    isActive
                      ? "border-[#00c9a7]/60 bg-[#0f1f3e] text-white shadow-[0_15px_40px_rgba(0,201,167,0.25)]"
                      : "border-white/10 bg-white/5 text-slate-300 hover:border-white/25"
                  }`}
                >
                  <span className="text-xs uppercase tracking-[0.28em] text-[#00c9a7]">{step.year}</span>
                  <span className="mt-1 text-sm font-semibold">{step.role}</span>
                  <span className="mt-1 text-xs text-slate-400">{step.focus}</span>
                </button>
                <span
                  className={`absolute -left-[7px] top-5 h-3 w-3 rounded-full ${
                    isActive ? "bg-[#00c9a7] shadow-[0_0_15px_rgba(0,201,167,0.8)]" : "bg-white/20"
                  }`}
                />
              </li>
            );
          })}
        </ol>

        <div className="relative min-h-[220px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep.year}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="h-full rounded-2xl border border-white/10 bg-white/5 p-8 text-slate-200 shadow-[0_24px_70px_rgba(8,15,35,0.3)] backdrop-blur"
            >
              <div className="text-sm uppercase tracking-[0.3em] text-[#00c9a7]">{activeStep.year}</div>
              <h3 className="mt-2 text-2xl font-semibold text-white">{activeStep.role}</h3>
              <p className="mt-4 text-base leading-relaxed text-slate-300">{activeStep.context}</p>
              <div className="mt-6 rounded-xl border border-white/10 bg-[#0c162f]/70 p-4 text-sm text-slate-300">
                <span className="text-xs uppercase tracking-[0.3em] text-slate-400">Foco</span>
                <p className="mt-2 text-slate-200">{activeStep.focus}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </SectionWrapper>
  );
}
