import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

type Stat = {
  value: number;
  suffix: string;
  label: string;
};

const DUR_MS = 1200;
// easeOutExpo
const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

function CountUp({ to, prefersReduced }: { to: number; prefersReduced: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [n, setN] = useState(prefersReduced ? to : 0);

  useEffect(() => {
    if (!inView) return;
    if (prefersReduced) {
      setN(to);
      return;
    }
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min((now - start) / DUR_MS, 1);
      setN(Math.round(easeOutExpo(t) * to));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, prefersReduced]);

  return <span ref={ref}>{n.toLocaleString()}</span>;
}

export default function StatsClient({ stats }: { stats: Stat[] }) {
  const prefersReduced = useReducedMotion() ?? false;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-12 lg:gap-y-0 divide-hairline">
      {stats.map((s) => (
        <div key={s.label} className="px-6 first:pl-0 last:pr-0">
          <div
            className="font-mono font-medium text-paper leading-none tabular-nums"
            style={{ fontSize: "clamp(3rem, 7vw, 6.5rem)", letterSpacing: "-0.04em" }}
          >
            <CountUp to={s.value} prefersReduced={prefersReduced} />
            <span className="text-cobalt">{s.suffix}</span>
          </div>
          <div className="mt-6 h-px w-12 bg-cobalt" />
          <p className="mt-4 font-display font-semibold tracking-[0.04em] text-paper-2 text-base md:text-lg">
            {s.label}
          </p>
        </div>
      ))}
    </div>
  );
}
