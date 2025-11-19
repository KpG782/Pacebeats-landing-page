import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export default function UsersClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax transforms for each phone
  const phone1Y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const phone2Y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const phone3Y = useTransform(scrollYProgress, [0, 1], [0, 0]); // Center stays still
  const phone4Y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const phone5Y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const phones = [
    {
      src: "/users-1.png",
      alt: "Pacebeats community dashboard",
      y: phone1Y,
      position:
        "absolute left-0 top-1/2 transform -translate-y-1/2 z-10 hidden lg:block",
      rotation: -15,
      scale: 0.7,
    },
    {
      src: "/users-2.png",
      alt: "Runner profile with stats",
      y: phone2Y,
      position:
        "absolute left-1/4 top-1/2 transform -translate-y-1/2 -translate-x-1/2 z-15 hidden md:block",
      rotation: -8,
      scale: 0.8,
    },
    {
      src: "/users-3.png",
      alt: "Community challenges and leaderboard",
      y: phone3Y,
      position: "relative z-20",
      rotation: 0,
      scale: 0.85,
    },
    {
      src: "/users-4.png",
      alt: "Training progress tracker",
      y: phone4Y,
      position:
        "absolute right-1/4 top-1/2 transform -translate-y-1/2 translate-x-1/2 z-15 hidden md:block",
      rotation: 8,
      scale: 0.8,
    },
    {
      src: "/users-5.png",
      alt: "Running analytics dashboard",
      y: phone5Y,
      position:
        "absolute right-0 top-1/2 transform -translate-y-1/2 z-10 hidden lg:block",
      rotation: 15,
      scale: 0.7,
    },
  ];

  return (
    <div
      ref={containerRef}
      className="relative h-[500px] md:h-[600px] lg:h-[650px] mb-24 md:mb-32 flex items-center justify-center"
      role="group"
      aria-label="Pacebeats app screenshots"
    >
      {phones.map((phone, index) => (
        <motion.div
          key={index}
          className={`phone-mockup ${phone.position}`}
          style={{ y: phone.y }}
          initial={{
            opacity: 0,
            scale: 0.5,
            rotate: phone.rotation * 2,
          }}
          whileInView={{
            opacity: 1,
            scale: phone.scale,
            rotate: phone.rotation,
          }}
          whileHover={{
            scale: phone.scale * 1.1,
            rotate: 0,
            zIndex: 30,
            transition: { duration: 0.3 },
          }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.8,
            delay: index * 0.15,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <motion.img
            src={phone.src}
            alt={phone.alt}
            className="w-48 sm:w-56 md:w-64 lg:w-72 xl:w-80 h-auto rounded-3xl shadow-2xl"
            loading="lazy"
            tabIndex={0}
            whileHover={{
              boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.5)",
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}
