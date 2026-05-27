import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { Activity, Moon, WifiOff, Watch } from "lucide-react";

type Feature = {
  id: string;
  title: string;
  body: string;
  Icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
};

const HEADLINE_FEATURE: Feature = {
  id: "smart-pace",
  title: "Smart Pace Detection",
  body: "Cadence-aware. Music shifts in real time to match your stride.",
  Icon: Activity,
};

const SECONDARY_FEATURES: Feature[] = [
  {
    id: "night-run",
    title: "Night-Run Ready",
    body: "High-contrast layouts and single-tap controls for low-light visibility.",
    Icon: Moon,
  },
  {
    id: "offline",
    title: "Offline-Friendly",
    body: "Routes and pace cues cached for runs beyond signal.",
    Icon: WifiOff,
  },
  {
    id: "wear-os",
    title: "Wear OS Companion",
    body: "Glance pace, BPM, and route from your Galaxy Watch.",
    Icon: Watch,
  },
];

// Easing tuple matches --ease-out-quart in global.css.
const EASE_OUT_QUART: [number, number, number, number] = [0.25, 1, 0.5, 1];

function FeatureCard({
  feature,
  index,
  inView,
  reducedMotion,
  large = false,
}: {
  feature: Feature;
  index: number;
  inView: boolean;
  reducedMotion: boolean;
  large?: boolean;
}) {
  const { Icon, title, body } = feature;

  const initial = reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 };
  const animate =
    reducedMotion || inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 };

  return (
    <motion.article
      className="card-hairline-light p-8 md:p-10 flex flex-col gap-4 h-full"
      initial={initial}
      animate={animate}
      transition={{
        duration: reducedMotion ? 0 : 0.6,
        delay: reducedMotion ? 0 : index * 0.08,
        ease: EASE_OUT_QUART,
      }}
      itemScope
      itemType="https://schema.org/SoftwareFeature"
    >
      <Icon className="text-cobalt w-6 h-6" strokeWidth={2} />
      <h3
        className="font-display font-bold text-ink-on-sky"
        style={{
          fontSize: large
            ? "clamp(2rem, 3.5vw, 3.25rem)"
            : "clamp(1.5rem, 2.5vw, 2.5rem)",
          lineHeight: 1,
          letterSpacing: "-0.02em",
        }}
        itemProp="name"
      >
        {title}
      </h3>
      <p
        className="font-body text-slate leading-relaxed max-w-[45ch]"
        style={{ fontSize: large ? "1.125rem" : "1rem" }}
        itemProp="description"
      >
        {body}
      </p>
    </motion.article>
  );
}

export default function FeaturesClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion() ?? false;
  const inView = useInView(containerRef, {
    once: true,
    amount: 0.15,
  });

  return (
    <div
      ref={containerRef}
      className="grid grid-cols-1 md:grid-cols-12 gap-6"
      role="list"
    >
      {/* Headline card: cols 1–7, spans 2 rows on md+ */}
      <div className="md:col-span-7 md:row-span-2" role="listitem">
        <FeatureCard
          feature={HEADLINE_FEATURE}
          index={0}
          inView={inView}
          reducedMotion={reducedMotion}
          large
        />
      </div>

      {/* Three secondary cards stack in cols 8–12 */}
      {SECONDARY_FEATURES.map((feature, i) => (
        <div key={feature.id} className="md:col-span-5" role="listitem">
          <FeatureCard
            feature={feature}
            index={i + 1}
            inView={inView}
            reducedMotion={reducedMotion}
          />
        </div>
      ))}
    </div>
  );
}
