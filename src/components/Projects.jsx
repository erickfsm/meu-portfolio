import { useState } from "react";
import { Radar, Cog, ClipboardCheck, Sofa, ArrowUpRight, Github, ExternalLink } from "lucide-react";
import { projects } from "../data/mockData";
import ProjectModal from "./ProjectModal";

const iconByType = {
  "control-tower-ext": Radar,
  engine: Cog,
  "audit-b2b": ClipboardCheck,
  "apex-care": Sofa,
};

const accentClasses = {
  gold: {
    icon: "text-gold",
    ring: "group-hover:border-gold/35",
    glow: "group-hover:shadow-[0_0_40px_rgba(201,169,97,0.12)]",
  },
  amber: {
    icon: "text-amber-400",
    ring: "group-hover:border-amber-400/35",
    glow: "group-hover:shadow-[0_0_40px_rgba(251,191,36,0.10)]",
  },
  sky: {
    icon: "text-sky-400",
    ring: "group-hover:border-sky-400/35",
    glow: "group-hover:shadow-[0_0_40px_rgba(56,189,248,0.10)]",
  },
  emerald: {
    icon: "text-emerald-400",
    ring: "group-hover:border-emerald-400/35",
    glow: "group-hover:shadow-[0_0_40px_rgba(52,211,153,0.10)]",
  },
  rose: {
    icon: "text-rose-400",
    ring: "group-hover:border-rose-400/35",
    glow: "group-hover:shadow-[0_0_40px_rgba(251,113,133,0.10)]",
  },
};

const EXTERNAL_LINKS = [
  { key: "github", label: "GitHub", icon: Github },
  { key: "live", label: "Site", icon: ExternalLink },
  { key: "prelaunch", label: "Pré-lançamento", icon: ExternalLink },
];

export default function Projects() {
  const [activeProject, setActiveProject] = useState(null);

  return (
    <section id="showroom" className="px-6 py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="font-display text-2xl font-bold text-ivory md:text-3xl">
            Showroom de Projetos
          </h2>
          <p className="mt-2 text-sm text-mist">
            Sistemas construídos para resolver dor operacional real. Clique para entrar na experiência.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((project) => {
            const Icon = iconByType[project.type];
            const accent = accentClasses[project.accent];
            const links = project.links || {};
            const hasLinks = Object.keys(links).length > 0;

            return (
              <div
                key={project.id}
                className={`group relative flex flex-col rounded-2xl border border-line bg-panel/60 p-7 backdrop-blur-sm transition-all duration-300 ${accent.ring} ${accent.glow}`}
              >
                <div className="flex items-start justify-between">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-white/[0.03] ${accent.icon}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col items-end gap-1.5">
                    <span className="font-mono text-xs text-mist-dim">{project.number}</span>
                    {project.status && (
                      <span className="rounded-full border border-amber-400/25 bg-amber-400/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-400">
                        {project.status}
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="mt-5 font-display text-lg font-bold text-ivory">
                  {project.title}
                </h3>
                <p className="mt-1 text-sm font-medium text-mist">{project.subtitle}</p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-mist-dim">
                  {project.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-line bg-white/[0.03] px-2.5 py-1 text-[11px] text-mist"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {hasLinks && (
                  <div className="mt-4 flex flex-wrap gap-3">
                    {EXTERNAL_LINKS.filter((l) => links[l.key]).map((l) => (
                      <a
                        key={l.key}
                        href={links[l.key]}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 text-[11px] font-medium text-mist-dim transition-colors duration-300 hover:text-gold"
                      >
                        <l.icon className="h-3 w-3" />
                        {l.label}
                      </a>
                    ))}
                  </div>
                )}

                <button
                  onClick={() => setActiveProject(project)}
                  className="group/btn mt-6 inline-flex items-center justify-center gap-2 rounded-lg border border-line bg-white/[0.03] px-5 py-3 text-sm font-semibold text-ivory transition-all duration-300 hover:border-gold/40 hover:bg-gold hover:text-ink"
                >
                  Entrar na Experiência
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {activeProject && (
        <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
      )}
    </section>
  );
}
