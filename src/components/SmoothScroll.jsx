import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

/** Scroll suave, mas respeitando preferências de movimento e dispositivos móveis */
export default function SmoothScroll({ children }) {
  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;

    if (prefersReducedMotion || isCoarsePointer) {
      return undefined;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smooth: true,
    });

    let frame;
    const raf = (time) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      if (frame) {
        cancelAnimationFrame(frame);
      }
      lenis.destroy();
    };
  }, []);

  return <div>{children}</div>;
}