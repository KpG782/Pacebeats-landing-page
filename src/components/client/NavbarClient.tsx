import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
  ChevronDown,
  Menu,
  Activity,
  Zap,
  Music,
  Watch,
  Download,
  ArrowUpRight,
} from "lucide-react";
import { APK_RELEASE } from "../../config/apkRelease";

type NavItem = { label: string; href: string };

const NAV_ITEMS: NavItem[] = [
  { label: "Features", href: "#features" },
  { label: "Wear OS", href: "#wear" },
  { label: "How", href: "#how" },
  { label: "Team", href: "#team" },
  { label: "Tech", href: "#techstack" },
];

const FEATURE_LINKS = [
  {
    icon: Activity,
    title: "Real-time pace",
    desc: "Live pacing insights and post-run trends, surfaced as you go.",
    href: "#features",
  },
  {
    icon: Zap,
    title: "Cadence detection",
    desc: "Stride analysis that adapts your music tempo in real time.",
    href: "#features",
  },
  {
    icon: Music,
    title: "Spotify sync",
    desc: "Your playlist locks to your stride. No skipping tracks mid-run.",
    href: "#features",
  },
  {
    icon: Watch,
    title: "Wear OS companion",
    desc: "Galaxy Watch pairing for phone-free runs.",
    href: "#wear",
  },
];

export default function NavbarClient() {
  const prefersReducedMotion = useReducedMotion();
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number | null>(null);

  // Close dropdown on outside click + Escape.
  useEffect(() => {
    const onClickAway = (e: MouseEvent) => {
      if (!dropdownRef.current) return;
      if (!dropdownRef.current.contains(e.target as Node)) {
        setIsFeaturesOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsFeaturesOpen(false);
    };
    document.addEventListener("click", onClickAway);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClickAway);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const openDropdown = () => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setIsFeaturesOpen(true);
  };
  const scheduleClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setIsFeaturesOpen(false), 140);
  };

  const openMobileMenu = () => {
    window.dispatchEvent(new CustomEvent("pb:mobile-menu", { detail: { open: true } }));
  };

  const transition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.28, ease: [0.25, 1, 0.5, 1] as [number, number, number, number] };

  return (
    <div className="flex items-center justify-between w-full gap-4 md:gap-6">
      {/* Logo */}
      <a
        href="#hero"
        className="flex items-center shrink-0"
        aria-label="Pacebeats — homepage"
      >
        <img
          src="/pacebeats-text.svg"
          alt="Pacebeats"
          className="h-5 md:h-6 w-auto"
          width="120"
          height="24"
          loading="eager"
          decoding="async"
        />
      </a>

      {/* Inline nav — tablet (md+) shows it so tablets don't drop to hamburger. */}
      <ul className="hidden md:flex items-center gap-5 lg:gap-7 ml-auto">
        {NAV_ITEMS.map((item) =>
          item.label === "Features" ? (
            <li
              key={item.label}
              className="relative"
              ref={dropdownRef}
              onMouseEnter={openDropdown}
              onMouseLeave={scheduleClose}
            >
              <button
                type="button"
                className="flex items-center gap-1 font-body font-semibold text-sm text-slate hover:text-ink-on-sky transition-colors duration-150 ease-out-quart"
                aria-expanded={isFeaturesOpen}
                aria-haspopup="true"
                aria-controls="features-dropdown"
                onClick={() => setIsFeaturesOpen((v) => !v)}
                onFocus={openDropdown}
              >
                <span>{item.label}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ease-out-quart ${
                    isFeaturesOpen ? "rotate-180" : ""
                  }`}
                  strokeWidth={2.25}
                />
              </button>

              <AnimatePresence>
                {isFeaturesOpen && (
                  <motion.div
                    id="features-dropdown"
                    role="menu"
                    aria-label="Features menu"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={transition}
                    className="absolute right-0 top-full mt-3 w-[min(92vw,28rem)] overflow-hidden bg-paper border border-sky-3 rounded-xl shadow-[0_20px_50px_-12px_rgba(11,20,38,0.22)]"
                  >
                    {/* Eyebrow header */}
                    <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-sky-3">
                      <p className="font-mono text-[0.65rem] tracking-[0.18em] uppercase text-slate">
                        Features
                      </p>
                      <p className="font-mono text-[0.65rem] tracking-[0.18em] uppercase text-slate">
                        04
                      </p>
                    </div>

                    {/* Items */}
                    <ul role="none" className="py-2">
                      {FEATURE_LINKS.map(({ icon: Icon, title, desc, href }, i) => (
                        <li key={title} role="none" className={i > 0 ? "border-t border-sky-3/60" : ""}>
                          <a
                            href={href}
                            role="menuitem"
                            className="group flex items-start gap-4 px-5 py-3.5 hover:bg-sky transition-colors duration-150 ease-out-quart"
                            onClick={() => setIsFeaturesOpen(false)}
                          >
                            {/* Framed icon — small square hairline tile */}
                            <span className="shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-md border border-sky-3 bg-sky-2 text-cobalt group-hover:border-cobalt group-hover:bg-paper transition-colors duration-200 ease-out-quart">
                              <Icon className="w-[18px] h-[18px]" strokeWidth={2} />
                            </span>
                            <span className="flex-1 flex flex-col gap-1 min-w-0">
                              <span className="font-display font-bold text-[0.95rem] tracking-[-0.01em] text-ink-on-sky">
                                {title}
                              </span>
                              <span className="font-body text-[0.8rem] text-slate leading-snug">
                                {desc}
                              </span>
                            </span>
                            <ArrowUpRight
                              className="w-4 h-4 text-slate group-hover:text-cobalt mt-1 shrink-0 transition-colors duration-150 ease-out-quart"
                              strokeWidth={2}
                            />
                          </a>
                        </li>
                      ))}
                    </ul>

                    {/* Bottom CTA strip */}
                    <a
                      href="#features"
                      className="group flex items-center justify-between px-5 py-3.5 border-t border-sky-3 bg-sky-2 hover:bg-sky transition-colors duration-150 ease-out-quart"
                      onClick={() => setIsFeaturesOpen(false)}
                    >
                      <span className="font-display font-bold text-sm text-cobalt">
                        See all features
                      </span>
                      <ArrowUpRight
                        className="w-4 h-4 text-cobalt group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-150 ease-out-quart"
                        strokeWidth={2.25}
                      />
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          ) : (
            <li key={item.label}>
              <a
                href={item.href}
                className="font-body font-semibold text-sm text-slate hover:text-ink-on-sky transition-colors duration-150 ease-out-quart"
              >
                {item.label}
              </a>
            </li>
          ),
        )}
      </ul>

      {/* Right side: Download CTA + mobile menu button */}
      <div className="flex items-center gap-3 ml-auto md:ml-0">
        <a
          href={APK_RELEASE.downloadUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-cta btn-cta--primary hidden sm:inline-flex !min-h-0 !py-2.5 !px-4 !text-[0.78rem] !tracking-[0.08em] !rounded-full"
          aria-label={`Download Pacebeats Android APK ${APK_RELEASE.version} — opens in new tab`}
        >
          <Download className="w-4 h-4" strokeWidth={2.25} />
          <span>Download</span>
        </a>

        <button
          type="button"
          onClick={openMobileMenu}
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-md border border-sky-3 bg-paper text-ink-on-sky hover:border-cobalt hover:text-cobalt transition-colors duration-150 ease-out-quart"
          aria-label="Open navigation menu"
          aria-controls="mobile-menu"
        >
          <Menu className="w-5 h-5" strokeWidth={2.25} />
        </button>
      </div>
    </div>
  );
}
