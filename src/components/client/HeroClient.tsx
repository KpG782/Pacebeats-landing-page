import { motion } from 'motion/react';
import { Rocket, ChevronDown } from 'lucide-react';

export default function HeroClient() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      {/* Main Hero Content */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-4xl mx-auto"
      >
        {/* Main headline */}
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 
            className="hero-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 sm:mb-6 md:mb-8 mt-4 sm:mt-8 md:mt-16 leading-tight tracking-tight text-glow"
          >
            <motion.span 
              className="block"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Run to the Rhythm.
            </motion.span>
            <motion.span 
              className="block"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Achieve your Pace.
            </motion.span>
          </h1>
        </motion.header>
        
        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 md:mb-12 text-gray-100 max-w-2xl mx-auto font-medium leading-relaxed px-2"
        >
          Pacebeats transforms every run by syncing your steps with the perfect song.
          Feel the music adapt to your stride, push past your limits, and turn every workout into a rhythm-powered journey.
        </motion.p>
        
        {/* CTA Button */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="mb-8 sm:mb-12 md:mb-16 px-4 flex justify-center"
        >
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-10 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg transition-all duration-300 shadow-xl hover:shadow-2xl max-w-xs flex items-center justify-center gap-2"
            type="button"
            onClick={() => scrollToSection('features')}
            aria-label="Get started with Pacebeats - Scroll to features section"
          >
            <Rocket className="w-5 h-5" strokeWidth={2.5} />
            Let's Get Moving
          </motion.button>
        </motion.div>

        {/* Phone mockup */}
        <motion.figure 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="relative flex justify-center px-4"
          role="img"
          aria-label="Pacebeats mobile app interface preview"
        >
          <motion.img 
            whileHover={{ scale: 1.05, rotate: 2 }}
            transition={{ duration: 0.3 }}
            src="/hero-section-1.svg" 
            alt="Pacebeats mobile app interface showing real-time pace tracking, music synchronization, and running analytics dashboard"
            className="rounded-2xl shadow-2xl w-32 sm:w-40 md:w-48 lg:w-80 max-w-full h-auto"
            loading="eager"
            width="320"
            height="640"
          />
          <div className="absolute inset-0 bg-blue-600/20 blur-3xl rounded-full scale-150 -z-10 pointer-events-none" aria-hidden="true"></div>
        </motion.figure>
      </motion.div>
      
      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.6, 
          delay: 1.5,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 1
        }}
        className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
        onClick={() => scrollToSection('features')}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            scrollToSection('features');
          }
        }}
        role="button"
        tabIndex={0}
        aria-label="Scroll down to see more content"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center items-center">
          <motion.div 
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-4 h-4 text-white/60" strokeWidth={2} />
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}
