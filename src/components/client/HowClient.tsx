import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import {
  Activity,
  Music,
  Heart,
  Zap,
  Radio,
  TrendingUp,
  Filter,
  Sparkles,
  ArrowDown,
  Clock,
  Target,
  BarChart3,
  ListMusic,
  Play,
  ChevronRight,
} from "lucide-react";

export default function HowClient() {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const [showDemo, setShowDemo] = useState(false);
  const [demoMinute, setDemoMinute] = useState(0);

  const steps = [
    {
      number: "01",
      title: "Data Collection",
      description:
        "GPS, cadence & heart rate sensors capture your running metrics in real-time",
      icon: Activity,
      color: "from-blue-500 to-cyan-500",
      borderColor: "border-blue-500/50",
      glowColor: "shadow-blue-500/50",
      details: [
        { icon: Target, text: "GPS tracks distance covered" },
        { icon: TrendingUp, text: "Cadence counts steps per minute" },
        { icon: Heart, text: "Heart rate monitors BPM" },
      ],
      result: "System calculates pace (e.g., 5.5 min/km)",
    },
    {
      number: "02",
      title: "Pace Mapping",
      description:
        "Your pace is mapped to intelligent BPM buckets for optimal music matching",
      icon: BarChart3,
      color: "from-purple-500 to-pink-500",
      borderColor: "border-purple-500/50",
      glowColor: "shadow-purple-500/50",
      details: [
        { icon: Zap, text: "Sprint: <3 min/km → 190 BPM" },
        { icon: Zap, text: "Tempo: 4-5 min/km → 150 BPM" },
        { icon: Activity, text: "Cruise: 5-6 min/km → 130 BPM" },
      ],
      result: "5.5 min/km → Cruise → Target 130 BPM songs",
    },
    {
      number: "03",
      title: "Smart Filtering",
      description:
        "Songs are filtered by your mood preference and target BPM range (±10)",
      icon: Filter,
      color: "from-amber-500 to-orange-500",
      borderColor: "border-amber-500/50",
      glowColor: "shadow-amber-500/50",
      details: [
        { icon: Sparkles, text: "Matches your selected mood" },
        { icon: Music, text: "BPM range: 120-140 (±10 from 130)" },
        { icon: Target, text: "Filters thousands of songs instantly" },
      ],
      result: "Only mood-matched songs within BPM range",
    },
    {
      number: "04",
      title: "AI Scoring",
      description:
        "Machine learning ranks songs based on your listening history and preferences",
      icon: Sparkles,
      color: "from-rose-500 to-red-500",
      borderColor: "border-rose-500/50",
      glowColor: "shadow-rose-500/50",
      details: [
        { icon: Heart, text: "Liked songs: +2.0 points" },
        { icon: Play, text: "Completed listening: Strong boost" },
        { icon: Clock, text: "Skip patterns: Negative signal" },
      ],
      result: "Songs ranked by personalized score (0-10)",
    },
    {
      number: "05",
      title: "Live Queue",
      description:
        "Playlist updates every minute, adapting automatically to your changing pace",
      icon: Radio,
      color: "from-green-500 to-emerald-500",
      borderColor: "border-green-500/50",
      glowColor: "shadow-green-500/50",
      details: [
        { icon: TrendingUp, text: "Recalculates pace every 60 seconds" },
        { icon: ListMusic, text: "Updates queue with top 20 songs" },
        { icon: Zap, text: "Seamless transitions between songs" },
      ],
      result: "Music that perfectly matches your rhythm!",
    },
  ];

  const demoData = [
    {
      minute: 0,
      pace: "5.5 min/km",
      bucket: "Cruise",
      bpm: 130,
      emoji: "🏃",
      songs: [
        { title: "Walking on Sunshine", bpm: 125, score: 8.5 },
        { title: "Good Life", bpm: 132, score: 6.2 },
        { title: "I Gotta Feeling", bpm: 128, score: 5.8 },
      ],
    },
    {
      minute: 1,
      pace: "4.8 min/km",
      bucket: "Tempo",
      bpm: 150,
      emoji: "🔥",
      songs: [
        { title: "Can't Stop the Feeling", bpm: 145, score: 9.1 },
        { title: "Uptown Funk", bpm: 148, score: 7.8 },
        { title: "Shake It Off", bpm: 152, score: 6.5 },
      ],
    },
    {
      minute: 2,
      pace: "6.2 min/km",
      bucket: "Recovery",
      bpm: 90,
      emoji: "😌",
      songs: [
        { title: "Three Little Birds", bpm: 88, score: 7.3 },
        { title: "Count on Me", bpm: 92, score: 6.1 },
        { title: "Here Comes the Sun", bpm: 87, score: 5.4 },
      ],
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      {/* Flow Diagram */}
      <div className="relative">
        {/* Connection Lines */}
        <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-green-500 opacity-30 hidden md:block" />

        {/* Steps */}
        <div className="space-y-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isHovered = hoveredStep === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onHoverStart={() => setHoveredStep(index)}
                onHoverEnd={() => setHoveredStep(null)}
                className="relative"
              >
                <div
                  className={`relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-3xl p-6 md:p-8 border-2 transition-all duration-500 ${
                    step.borderColor
                  } ${
                    isHovered
                      ? `shadow-2xl ${step.glowColor} scale-[1.02]`
                      : "shadow-lg"
                  }`}
                >
                  {/* Step Number Badge */}
                  <motion.div
                    className={`absolute -left-4 md:-left-6 top-8 w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center font-bold text-white text-lg md:text-xl shadow-xl z-10`}
                    animate={
                      isHovered
                        ? { scale: 1.1, rotate: 5 }
                        : { scale: 1, rotate: 0 }
                    }
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {step.number}
                  </motion.div>

                  <div className="ml-12 md:ml-16">
                    {/* Header */}
                    <div className="flex items-start gap-4 mb-6">
                      <motion.div
                        className={`flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}
                        animate={
                          isHovered
                            ? { rotate: 360, scale: 1.1 }
                            : { rotate: 0, scale: 1 }
                        }
                        transition={{ duration: 0.6 }}
                      >
                        <Icon className="w-7 h-7 text-white" />
                      </motion.div>

                      <div className="flex-1">
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                          {step.title}
                        </h3>
                        <p className="text-white/70 text-base md:text-lg">
                          {step.description}
                        </p>
                      </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                      {step.details.map((detail, i) => {
                        const DetailIcon = detail.icon;
                        return (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 + i * 0.1 }}
                            className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all"
                          >
                            <DetailIcon className="w-5 h-5 text-white/80 flex-shrink-0" />
                            <span className="text-sm text-white/90">
                              {detail.text}
                            </span>
                          </motion.div>
                        );
                      })}
                    </div>

                    {/* Result */}
                    <motion.div
                      className={`bg-gradient-to-r ${step.color} rounded-xl p-4 flex items-center gap-3`}
                      animate={
                        isHovered
                          ? {
                              scale: 1.02,
                              boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                            }
                          : {
                              scale: 1,
                              boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
                            }
                      }
                    >
                      <ChevronRight className="w-5 h-5 text-white flex-shrink-0" />
                      <span className="font-semibold text-white">
                        {step.result}
                      </span>
                    </motion.div>
                  </div>
                </div>

                {/* Arrow Connector */}
                {index < steps.length - 1 && (
                  <motion.div
                    className="flex justify-center py-4"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    <motion.div
                      animate={{ y: [0, 10, 0] }}
                      transition={{
                        repeat: Infinity,
                        duration: 2,
                        ease: "easeInOut",
                      }}
                    >
                      <ArrowDown className="w-8 h-8 text-white/40" />
                    </motion.div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Live Demo Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-16"
      >
        <motion.button
          onClick={() => setShowDemo(!showDemo)}
          className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white font-bold py-6 px-8 rounded-2xl shadow-2xl flex items-center justify-center gap-4 text-xl transition-all"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Play className="w-6 h-6" />
          {showDemo ? "Hide" : "Watch"} Live 3-Minute Demo
          <Sparkles className="w-6 h-6" />
        </motion.button>

        <AnimatePresence>
          {showDemo && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
              className="overflow-hidden"
            >
              <div className="mt-8 space-y-6">
                <div className="text-center">
                  <h3 className="text-3xl font-bold text-white mb-2">
                    Real-Time Adaptation Demo
                  </h3>
                  <p className="text-white/70 text-lg">
                    Watch how the playlist changes with your pace
                  </p>
                </div>

                {/* Minute Selector */}
                <div className="flex justify-center gap-4">
                  {demoData.map((data, i) => (
                    <motion.button
                      key={i}
                      onClick={() => setDemoMinute(i)}
                      className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                        demoMinute === i
                          ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg scale-110"
                          : "bg-white/10 text-white/60 hover:bg-white/20"
                      }`}
                      whileHover={{ scale: demoMinute === i ? 1.1 : 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Minute {data.minute}
                    </motion.button>
                  ))}
                </div>

                {/* Demo Content */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={demoMinute}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.4 }}
                    className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border-2 border-white/20"
                  >
                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                      <div className="bg-white/5 rounded-xl p-4 text-center">
                        <Clock className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-white">
                          {demoData[demoMinute].minute}:00
                        </div>
                        <div className="text-white/60 text-sm">Time</div>
                      </div>
                      <div className="bg-white/5 rounded-xl p-4 text-center">
                        <Activity className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-white">
                          {demoData[demoMinute].pace}
                        </div>
                        <div className="text-white/60 text-sm">Pace</div>
                      </div>
                      <div className="bg-white/5 rounded-xl p-4 text-center">
                        <Music className="w-8 h-8 text-pink-400 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-white">
                          {demoData[demoMinute].bpm}
                        </div>
                        <div className="text-white/60 text-sm">Target BPM</div>
                      </div>
                      <div className="bg-white/5 rounded-xl p-4 text-center">
                        <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-white">
                          {demoData[demoMinute].bucket}
                        </div>
                        <div className="text-white/60 text-sm">Zone</div>
                      </div>
                    </div>

                    {/* Song Queue */}
                    <div>
                      <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <ListMusic className="w-6 h-6" />
                        Current Queue (Top 3)
                      </h4>
                      <div className="space-y-3">
                        {demoData[demoMinute].songs.map((song, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-gradient-to-r from-white/10 to-white/5 rounded-xl p-4 flex items-center justify-between hover:from-white/15 hover:to-white/10 transition-all group"
                          >
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center font-bold text-white text-lg">
                                {i + 1}
                              </div>
                              <div>
                                <div className="text-white font-semibold group-hover:text-blue-300 transition-colors">
                                  {song.title}
                                </div>
                                <div className="text-white/60 text-sm">
                                  {song.bpm} BPM
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="text-right">
                                <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                                  {song.score}
                                </div>
                                <div className="text-white/60 text-xs">
                                  Score
                                </div>
                              </div>
                              <Play className="w-6 h-6 text-white/40 group-hover:text-white group-hover:scale-110 transition-all" />
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Key Takeaway */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-xl rounded-2xl p-6 border-2 border-green-500/30"
                >
                  <div className="flex items-start gap-4">
                    <Sparkles className="w-8 h-8 text-green-400 flex-shrink-0" />
                    <div>
                      <h4 className="text-xl font-bold text-white mb-2">
                        💡 The Magic of Adaptation
                      </h4>
                      <p className="text-white/80">
                        Your playlist automatically updates every minute! Speed
                        up for faster songs, slow down for recovery tracks — all
                        while learning from your listening habits.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
