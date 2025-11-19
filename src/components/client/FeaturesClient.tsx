import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Activity,
  Zap,
  Music,
  Watch,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

type Feature = {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  Icon: React.ComponentType<any>;
  gradient: string;
  stats?: { label: string; value: string }[];
};

const FEATURES: Feature[] = [
  {
    id: 1,
    title: "Real-Time Pace Tracking",
    subtitle: "Live GPS-Based Analytics",
    description:
      "Stay on target with instant pace feedback powered by GPS. Monitor your speed, distance, and route in real-time, ensuring every stride keeps you on track for your goals.",
    Icon: Activity,
    gradient: "from-red-600 to-red-800",
    stats: [
      { label: "GPS Accuracy", value: "±5m" },
      { label: "Update Rate", value: "1s" },
      { label: "Battery Impact", value: "Low" },
    ],
  },
  {
    id: 2,
    title: "Smart Pace Detection",
    subtitle: "AI-Powered Running Intelligence",
    description:
      "Advanced AI analyzes your running patterns, adapts to your style, and provides personalized recommendations to optimize performance while preventing overexertion.",
    Icon: Zap,
    gradient: "from-yellow-500 to-orange-600",
    stats: [
      { label: "Learning Time", value: "3 runs" },
      { label: "Accuracy", value: "95%" },
      { label: "Insights", value: "Real-time" },
    ],
  },
  {
    id: 3,
    title: "Spotify Integration",
    subtitle: "Music That Moves With You",
    description:
      "Seamlessly connect with Spotify for automatic music control. Your playlists adapt to your running pace, creating the perfect soundtrack for every training session.",
    Icon: Music,
    gradient: "from-green-500 to-emerald-700",
    stats: [
      { label: "Songs", value: "70M+" },
      { label: "Playlists", value: "Auto-sync" },
      { label: "Controls", value: "Voice" },
    ],
  },
  {
    id: 4,
    title: "Watch Companion",
    subtitle: "Hands-Free Running Experience",
    description:
      "Sync with smartwatches for complete hands-free monitoring. Get pace updates, heart rate data, and music control directly on your wrist during every run.",
    Icon: Watch,
    gradient: "from-blue-500 to-purple-600",
    stats: [
      { label: "Devices", value: "WearOS+" },
      { label: "Sync Speed", value: "<2s" },
      { label: "Battery", value: "All-day" },
    ],
  },
];

export default function FeaturesClient() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-advance slideshow
  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % FEATURES.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % FEATURES.length);
    setIsAutoPlaying(false);
  };

  const goToPrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + FEATURES.length) % FEATURES.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const currentFeature = FEATURES[currentIndex];

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] as any,
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] as any,
      },
    }),
  };

  return (
    <div
      className="relative w-full max-w-6xl mx-auto"
      role="region"
      aria-label="Features slideshow"
    >
      {/* Main Slide Container */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 to-black border border-gray-800 min-h-[500px] md:min-h-[600px]">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 p-8 md:p-12 lg:p-16 flex flex-col justify-between"
          >
            {/* Feature Content */}
            <div className="flex-1 flex flex-col md:flex-row items-start md:items-center gap-8">
              {/* Icon Section */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  delay: 0.2,
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`flex-shrink-0 w-24 h-24 md:w-32 md:h-32 rounded-3xl bg-gradient-to-br ${currentFeature.gradient} flex items-center justify-center shadow-2xl`}
              >
                <currentFeature.Icon className="w-12 h-12 md:w-16 md:h-16 text-white" />
              </motion.div>

              {/* Text Content */}
              <div className="flex-1 space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <p className="text-sm md:text-base text-gray-400 font-medium uppercase tracking-wider mb-2">
                    {currentFeature.subtitle}
                  </p>
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 font-inter">
                    {currentFeature.title}
                  </h3>
                  <p className="text-base md:text-lg text-gray-300 leading-relaxed max-w-2xl">
                    {currentFeature.description}
                  </p>
                </motion.div>

                {/* Stats Grid */}
                {currentFeature.stats && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="grid grid-cols-3 gap-4 pt-6"
                  >
                    {currentFeature.stats.map((stat, idx) => (
                      <div key={idx} className="text-center md:text-left">
                        <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                          {stat.value}
                        </div>
                        <div className="text-xs md:text-sm text-gray-400">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>
            </div>

            {/* Progress Bar */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 5, ease: "linear" }}
              className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-red-500 to-red-700"
              style={{ transformOrigin: "left" }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <button
          onClick={goToPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-black/70 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 z-10"
          aria-label="Previous feature"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-black/70 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 z-10"
          aria-label="Next feature"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Slide Indicators */}
      <div
        className="flex justify-center gap-3 mt-8"
        role="tablist"
        aria-label="Feature navigation"
      >
        {FEATURES.map((feature, index) => (
          <button
            key={feature.id}
            onClick={() => goToSlide(index)}
            className={`group relative transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-black rounded-full ${
              index === currentIndex ? "w-12" : "w-3"
            }`}
            role="tab"
            aria-selected={index === currentIndex}
            aria-label={`Go to ${feature.title}`}
          >
            <div
              className={`h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? `bg-gradient-to-r ${feature.gradient}`
                  : "bg-gray-600 group-hover:bg-gray-500"
              }`}
            />
            {/* Tooltip */}
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {feature.title}
            </span>
          </button>
        ))}
      </div>

      {/* Auto-play Toggle */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="text-sm text-gray-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 rounded px-3 py-1"
          aria-label={isAutoPlaying ? "Pause slideshow" : "Resume slideshow"}
        >
          {isAutoPlaying ? "⏸ Pause" : "▶ Play"} Auto-advance
        </button>
      </div>
    </div>
  );
}
