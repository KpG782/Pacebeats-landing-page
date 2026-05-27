import { motion, useReducedMotion } from "motion/react";

type Step = {
  number: string;
  title: string;
  body: string;
};

type HowClientProps = {
  steps: Step[];
};

const EASE_OUT_QUART: [number, number, number, number] = [0.25, 1, 0.5, 1];

export default function HowClient({ steps }: HowClientProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <ol
      className="relative before:content-[''] before:absolute before:left-12 before:top-0 before:bottom-0 before:w-px before:bg-sky-3 before:hidden md:before:block"
      role="list"
    >
      {steps.map((step, index) => {
        const initial = prefersReducedMotion
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: 16 };

        return (
          <motion.li
            key={step.number}
            initial={initial}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.6,
              ease: EASE_OUT_QUART,
              delay: prefersReducedMotion ? 0 : index * 0.08,
            }}
            className="grid grid-cols-[6rem_1fr] md:grid-cols-[8rem_1fr] gap-6 md:gap-8 py-12 md:py-16 border-t border-sky-3 first:border-t-0"
            itemProp="step"
            itemScope
            itemType="https://schema.org/HowToStep"
          >
            <meta itemProp="position" content={String(index + 1)} />
            <span
              className="font-mono text-cobalt leading-none"
              style={{
                fontSize: "clamp(3rem, 6vw, 5rem)",
                letterSpacing: "-0.02em",
              }}
              aria-hidden="true"
            >
              {step.number}
            </span>
            <div className="flex flex-col gap-4">
              <h3
                className="font-display font-bold text-ink-on-sky"
                style={{
                  fontSize: "clamp(1.75rem, 3vw, 3rem)",
                  lineHeight: 0.95,
                  letterSpacing: "-0.02em",
                }}
                itemProp="name"
              >
                {step.title}
              </h3>
              <p
                className="font-body text-slate max-w-[55ch] text-base md:text-lg leading-relaxed"
                itemProp="text"
              >
                {step.body}
              </p>
            </div>
          </motion.li>
        );
      })}
    </ol>
  );
}
