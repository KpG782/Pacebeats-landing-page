import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { X, Download } from "lucide-react";
import { APK_RELEASE } from "../../config/apkRelease";

type NavItem = { label: string; href: string };

const NAV_ITEMS: NavItem[] = [
  { label: "Features", href: "#features" },
  { label: "Wear OS", href: "#wear" },
  { label: "How", href: "#how" },
  { label: "Team", href: "#team" },
  { label: "Tech", href: "#techstack" },
];

export default function MobileMenuClient() {
  const prefersReducedMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);

  // Listen for open events dispatched from NavbarClient.
  useEffect(() => {
    const onToggle = (e: Event) => {
      const detail = (e as CustomEvent<{ open?: boolean }>).detail;
      if (detail && typeof detail.open === "boolean") {
        setIsOpen(detail.open);
      } else {
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener("pb:mobile-menu", onToggle as EventListener);
    return () =>
      window.removeEventListener("pb:mobile-menu", onToggle as EventListener);
  }, []);

  // Body scroll lock + Escape to close.
  useEffect(() => {
    if (isOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") setIsOpen(false);
      };
      window.addEventListener("keydown", onKey);
      return () => {
        document.body.style.overflow = prev;
        window.removeEventListener("keydown", onKey);
      };
    }
  }, [isOpen]);

  const close = () => setIsOpen(false);

  const transition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.3, ease: [0.65, 0, 0.35, 1] as [number, number, number, number] };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={transition}
          className="fixed inset-0 z-[60] md:hidden bg-sky"
        >
          <div className="flex flex-col h-full max-w-7xl mx-auto px-6 md:px-10">
            {/* Top bar: logo + close */}
            <div className="flex items-center justify-between h-14 md:h-16 shrink-0">
              <a
                href="#hero"
                onClick={close}
                aria-label="Pacebeats — homepage"
              >
                <img
                  src="/pacebeats-text.svg"
                  alt="Pacebeats"
                  className="h-5 w-auto"
                  width="120"
                  height="24"
                />
              </a>
              <button
                type="button"
                onClick={close}
                className="text-ink-on-sky hover:text-cobalt transition-colors duration-150 ease-out-quart p-2 -mr-2"
                aria-label="Close navigation menu"
              >
                <X className="w-6 h-6" strokeWidth={2} />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 flex flex-col justify-center -mt-10">
              <ul className="flex flex-col gap-4">
                {NAV_ITEMS.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      onClick={close}
                      className="block font-display font-extrabold text-3xl tracking-[-0.02em] text-ink-on-sky hover:text-cobalt transition-colors duration-150 ease-out-quart py-2"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Bottom CTA */}
            <div className="pb-10 pt-6 border-t border-sky-3 shrink-0">
              <a
                href={APK_RELEASE.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={close}
                className="btn-cta btn-cta--primary w-full"
                aria-label={`Download Pacebeats Android APK ${APK_RELEASE.version} — opens in new tab`}
              >
                <Download className="w-5 h-5" strokeWidth={2} />
                <span>Download APK</span>
              </a>
              <p className="mt-4 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-slate text-center">
                {APK_RELEASE.version} · Updated {APK_RELEASE.updatedAt}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
