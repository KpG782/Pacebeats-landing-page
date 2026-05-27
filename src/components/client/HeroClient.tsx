import React, { useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Download, ArrowDown, ChevronDown } from "lucide-react";
import { APK_RELEASE } from "../../config/apkRelease";

export default function HeroClient() {
  const prefersReducedMotion = useReducedMotion();

  // Trigger the server-rendered `.reveal-words` headline once mounted.
  // Under reduced motion we add the class synchronously (no delay).
  useEffect(() => {
    const heading = document.getElementById("hero-heading");
    if (!heading) return;

    if (prefersReducedMotion) {
      heading.classList.add("is-visible");
      return;
    }

    const id = window.requestAnimationFrame(() => {
      // One extra frame so the browser has painted the initial state.
      window.requestAnimationFrame(() => heading.classList.add("is-visible"));
    });
    return () => window.cancelAnimationFrame(id);
  }, [prefersReducedMotion]);

  const indicatorAnimation = prefersReducedMotion
    ? { opacity: 1 }
    : { opacity: [0.35, 1, 0.35] };

  const indicatorTransition = prefersReducedMotion
    ? { duration: 0 }
    : {
        duration: 2.4,
        repeat: Infinity,
        ease: "easeInOut" as const,
      };

  return (
    <>
      {/* CTA row */}
      <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <a
          href={APK_RELEASE.downloadUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-cta btn-cta--primary"
          aria-label={`Download Pacebeats Android APK ${APK_RELEASE.version} — opens in new tab`}
        >
          <Download className="w-4 h-4" strokeWidth={2} />
          <span>Download APK</span>
        </a>
        <a
          href="#how"
          className="btn-cta btn-cta--secondary"
          aria-label="See how Pacebeats works"
        >
          <ArrowDown className="w-4 h-4" strokeWidth={2} />
          <span>How it works</span>
        </a>
      </div>

      {/* Scroll indicator — fixed inside hero, bottom center. Opacity-only. */}
      <motion.a
        href="#maps"
        animate={indicatorAnimation}
        transition={indicatorTransition}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-cobalt hover:text-cobalt-2 transition-colors duration-150 ease-out-quart"
        aria-label="Scroll to next section"
      >
        <span className="font-mono uppercase text-[0.65rem] tracking-[0.24em]">
          Scroll
        </span>
        <ChevronDown className="w-4 h-4" strokeWidth={2} />
      </motion.a>
    </>
  );
}
