import { useCallback, useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { MoveRight, MoveLeft } from "lucide-react";

type Screen = {
  src: string;
  step: string;
  title: string;
  body: string;
  alt: string;
};

const SCREENS: Screen[] = [
  {
    src: "/users-1.png",
    step: "01 — Pre-run",
    title: "Mood check",
    body: "Tap one emoji. Six options: Happy, Sad, Chill, Focus, Hype, Angry. Under two seconds and the music engine has what it needs.",
    alt: "Pacebeats mood-check screen — six emoji options to pick how you feel before a run",
  },
  {
    src: "/users-2.png",
    step: "02 — Setup",
    title: "Quick start",
    body: "Quick run or goal-based. Pace zones inherit from your last calibration so the targets land somewhere you can actually hit.",
    alt: "Pacebeats start-run screen with run-type selection and pace-zone preview",
  },
  {
    src: "/users-3.png",
    step: "03 — In motion",
    title: "Now playing",
    body: "Your playlist locks to your stride. Album art, track, pace, and BPM in one glance. Two-tap controls when you need them.",
    alt: "Pacebeats now-playing screen with cadence-matched track, album art, pace, and BPM",
  },
  {
    src: "/users-4.png",
    step: "04 — Live pace",
    title: "Map + cadence",
    body: "Route view with cadence, BPM, and current split surfaced large. Designed to be read mid-stride, not stared at.",
    alt: "Pacebeats live-pace map screen with cadence, BPM, and current split metrics",
  },
  {
    src: "/users-5.png",
    step: "05 — Post-run",
    title: "Run summary",
    body: "Distance, duration, average pace, and a comparison to your personal average. Save and share without scrolling.",
    alt: "Pacebeats run-summary screen showing distance, pace, comparison to average, and save/share actions",
  },
];

export default function UsersClient() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion() ?? false;
  const inView = useInView(sectionRef, { once: true, amount: 0.15 });
  const [activeIdx, setActiveIdx] = useState(0);

  // Drive the reveal classes once the section enters view.
  useEffect(() => {
    if (!sectionRef.current) return;
    if (reducedMotion || inView) {
      sectionRef.current
        .querySelectorAll<HTMLElement>("[data-reveal]")
        .forEach((el) => el.classList.add("is-visible"));
    }
  }, [inView, reducedMotion]);

  // Track which card is closest to centre so we can light its progress dot.
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const update = () => {
      const mid = scroller.scrollLeft + scroller.clientWidth / 2;
      const cards = Array.from(
        scroller.querySelectorAll<HTMLElement>("[data-card]"),
      );
      let bestIdx = 0;
      let bestDist = Infinity;
      cards.forEach((card, i) => {
        const cardMid = card.offsetLeft + card.offsetWidth / 2;
        const d = Math.abs(cardMid - mid);
        if (d < bestDist) {
          bestDist = d;
          bestIdx = i;
        }
      });
      setActiveIdx(bestIdx);
    };
    update();
    scroller.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      scroller.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  // Scroll one card width with the keyboard arrows / nav buttons.
  const scrollByCard = useCallback(
    (dir: 1 | -1) => {
      const scroller = scrollerRef.current;
      if (!scroller) return;
      const first = scroller.querySelector<HTMLElement>("[data-card]");
      if (!first) return;
      const cardWidth = first.getBoundingClientRect().width;
      const gap = 24;
      scroller.scrollBy({
        left: dir * (cardWidth + gap),
        behavior: reducedMotion ? "auto" : "smooth",
      });
    },
    [reducedMotion],
  );

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      scrollByCard(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      scrollByCard(-1);
    }
  };

  return (
    <div ref={sectionRef}>
      {/* Toolbar — drag hint on the left, nav controls on the right. */}
      <div className="flex items-center justify-between mb-8 reveal-fade-rise" data-reveal>
        <div className="hidden md:flex items-center gap-3">
          <span className="font-mono text-slate text-xs tracking-[0.18em] uppercase">
            Drag
          </span>
          <MoveRight
            className="text-cobalt w-4 h-4"
            strokeWidth={2}
            aria-hidden="true"
          />
          <span className="font-mono text-slate text-xs tracking-[0.18em] uppercase">
            To browse
          </span>
        </div>

        <div className="flex items-center gap-2 ml-auto" aria-label="Gallery navigation">
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            disabled={activeIdx === 0}
            className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-sky-3 bg-paper text-ink-on-sky hover:border-cobalt hover:text-cobalt disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-150 ease-out-quart"
            aria-label="Previous screen"
          >
            <MoveLeft className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            disabled={activeIdx === SCREENS.length - 1}
            className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-sky-3 bg-paper text-ink-on-sky hover:border-cobalt hover:text-cobalt disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-150 ease-out-quart"
            aria-label="Next screen"
          >
            <MoveRight className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Horizontal scroll-snap row. Edges bleed to viewport via negative margins
          that mirror the parent container's px-6 / md:px-10 padding. */}
      <div
        ref={scrollerRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-6 -mx-6 px-6 md:-mx-10 md:px-10 [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: "none" }}
        role="region"
        aria-label="Pacebeats app screens — use arrow keys to browse"
        tabIndex={0}
        onKeyDown={onKeyDown}
      >
        {SCREENS.map((screen, idx) => (
          <figure
            key={screen.src}
            data-card
            data-reveal
            className="reveal-fade-rise w-[78vw] sm:w-[60vw] md:w-[420px] lg:w-[460px] snap-center flex-shrink-0 flex flex-col"
            itemScope
            itemType="https://schema.org/ImageObject"
            aria-current={idx === activeIdx ? "true" : undefined}
          >
            {/* Phone frame — softer rounded device chrome */}
            <div className="relative overflow-hidden rounded-[28px] border border-sky-3 bg-paper p-3 shadow-[0_18px_44px_-18px_rgba(11,20,38,0.22)]">
              <img
                src={screen.src}
                alt={screen.alt}
                loading="lazy"
                decoding="async"
                className="block w-full h-auto rounded-[20px]"
                itemProp="contentUrl"
              />
            </div>

            {/* Caption block — step / title / body. */}
            <figcaption className="mt-6 flex flex-col gap-2.5">
              <span className="font-mono text-cobalt-2 text-xs tracking-[0.18em] uppercase">
                {screen.step}
              </span>
              <h3
                className="font-display font-bold text-ink-on-sky text-2xl tracking-[-0.02em]"
                itemProp="name"
              >
                {screen.title}
              </h3>
              <p
                className="font-body text-slate text-[0.95rem] leading-relaxed max-w-[40ch]"
                itemProp="caption"
              >
                {screen.body}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>

      {/* Progress dots — current card highlighted. */}
      <ul
        className="mt-8 flex items-center justify-center gap-2"
        role="list"
        aria-label="Screen progress"
      >
        {SCREENS.map((screen, idx) => (
          <li key={screen.src}>
            <button
              type="button"
              onClick={() => {
                const scroller = scrollerRef.current;
                const card = scroller?.querySelectorAll<HTMLElement>("[data-card]")[idx];
                if (!card || !scroller) return;
                scroller.scrollTo({
                  left: card.offsetLeft - (scroller.clientWidth - card.offsetWidth) / 2,
                  behavior: reducedMotion ? "auto" : "smooth",
                });
              }}
              className={`block h-1.5 rounded-full transition-[width,background-color] duration-200 ease-out-quart cursor-pointer ${
                idx === activeIdx
                  ? "w-8 bg-cobalt"
                  : "w-1.5 bg-sky-3 hover:bg-slate"
              }`}
              aria-label={`Jump to screen ${idx + 1}: ${screen.title}`}
              aria-current={idx === activeIdx ? "true" : undefined}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
