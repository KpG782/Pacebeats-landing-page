import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Menu,
  X,
  ChevronDown,
  Home,
  Zap,
  Activity,
  Music,
  Watch,
  BookOpen,
  Code,
  Heart,
  Users,
  FileText,
  Shield,
  Github,
} from "lucide-react";

export default function NavbarClient() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Left Navigation - Hidden on mobile/tablet */}
      <div className="hidden lg:flex items-center space-x-6 absolute left-4 top-1/2 transform -translate-y-1/2">
        <motion.a
          href="#hero"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-sm hover:text-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 rounded-md px-2 py-1"
          aria-label="Navigate to homepage hero section"
        >
          <span>Home</span>
        </motion.a>

        {/* Features Dropdown */}
        <div className="relative group" role="menubar">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center text-sm hover:text-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 rounded-md px-2 py-1"
            aria-expanded="false"
            aria-haspopup="true"
            aria-label="Features menu - Press enter or space to open"
            id="features-menu-button"
            role="menuitem"
            tabIndex={0}
          >
            <span>Features</span>
            <motion.div
              animate={{ rotate: isFeaturesOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-4 h-4 ml-1" />
            </motion.div>
          </motion.button>

          {/* Features Dropdown Menu */}
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileHover={{ opacity: 1, y: 0 }}
              className="absolute top-full left-0 mt-2 w-64 bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-gray-200"
              role="menu"
              aria-labelledby="features-menu-button"
              aria-hidden="true"
            >
              <div className="py-2">
                <a
                  href="#features"
                  className="flex items-center gap-3 px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 transition-colors focus:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-inset"
                  role="menuitem"
                  tabIndex={-1}
                  aria-describedby="feature-1-desc"
                >
                  <Activity className="w-4 h-4 text-red-500" />
                  <div>
                    <span className="font-medium">
                      Real-Time Pace & Analytics
                    </span>
                    <p id="feature-1-desc" className="text-xs text-gray-600">
                      Live pacing insights + post-run performance trends
                    </p>
                  </div>
                </a>
                <a
                  href="#features"
                  className="flex items-center gap-3 px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 transition-colors focus:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-inset"
                  role="menuitem"
                  tabIndex={-1}
                  aria-describedby="feature-2-desc"
                >
                  <Zap className="w-4 h-4 text-red-500" />
                  <div>
                    <span className="font-medium">Smart Pace Detection</span>
                    <p id="feature-2-desc" className="text-xs text-gray-600">
                      AI-driven analysis that adapts to your running style
                    </p>
                  </div>
                </a>
                <a
                  href="#features"
                  className="flex items-center gap-3 px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 transition-colors focus:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-inset"
                  role="menuitem"
                  tabIndex={-1}
                  aria-describedby="feature-3-desc"
                >
                  <Music className="w-4 h-4 text-red-500" />
                  <div>
                    <span className="font-medium">Spotify Integration</span>
                    <p id="feature-3-desc" className="text-xs text-gray-600">
                      Music playback that syncs with your running pace
                    </p>
                  </div>
                </a>
                <a
                  href="#watch-integration"
                  className="flex items-center gap-3 px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 transition-colors focus:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-inset"
                  role="menuitem"
                  tabIndex={-1}
                  aria-describedby="feature-4-desc"
                >
                  <Watch className="w-4 h-4 text-red-500" />
                  <div>
                    <span className="font-medium">
                      Pacebeats Watch Companion
                    </span>
                    <p id="feature-4-desc" className="text-xs text-gray-600">
                      Companion app for selected smartwatches
                    </p>
                  </div>
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.a
          href="#how-it-works"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-sm hover:text-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 rounded-md px-2 py-1"
          aria-label="Learn how Pacebeats works"
        >
          <span>How It Works</span>
        </motion.a>
        <motion.a
          href="#tech-stack"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-sm hover:text-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 rounded-md px-2 py-1"
          aria-label="View Pacebeats technology stack"
        >
          <span>Tech Stack</span>
        </motion.a>
      </div>

      {/* Mobile menu button - Visible on mobile and tablet */}
      <div className="lg:hidden absolute left-4 top-1/2 transform -translate-y-1/2">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={toggleMenu}
          id="mobile-menu-button"
          className="text-white hover:text-gray-300 transition-colors p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label={
            isMenuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          type="button"
        >
          <AnimatePresence mode="wait">
            {isMenuOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="w-6 h-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Center Logo - Always centered on ALL screen sizes */}
      <div className="flex items-center justify-center">
        <motion.a
          href="#hero"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 rounded-md"
          aria-label="Pacebeats - Navigate to homepage"
        >
          <img
            src="/pacebeats-text-white.svg"
            alt="Pacebeats - Running companion app that syncs every stride with the perfect beat"
            className="h-6"
            width="120"
            height="28"
            loading="eager"
            decoding="async"
          />
        </motion.a>
      </div>

      {/* Right Navigation - Hidden on mobile and tablet */}
      <div className="hidden lg:flex items-center space-x-6 absolute right-4 top-1/2 transform -translate-y-1/2">
        <motion.a
          href="https://buymeacoffee.com/Loki123"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="text-sm hover:text-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 rounded-md px-2 py-1"
          aria-label="Support Pacebeats development on Buy Me a Coffee - Opens in new tab"
        >
          <span>Support</span>
        </motion.a>
        <motion.a
          href="#team"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-sm hover:text-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 rounded-md px-2 py-1"
          aria-label="Meet the Pacebeats team"
        >
          <span>Team</span>
        </motion.a>
        <motion.a
          href="https://github.com/KpG782"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="flex items-center text-sm hover:text-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 rounded-md px-2 py-1"
          aria-label="View Pacebeats documentation on GitHub - Opens in new tab"
        >
          <Github className="w-4 h-4 mr-1" />
          <span>Docs</span>
        </motion.a>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white text-black px-4 py-2 rounded-full text-xs font-medium hover:bg-gray-200 transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 flex items-center"
          type="button"
          aria-label="Currently in development mode"
        >
          <Code className="w-4 h-4 mr-2" />
          Development Mode
        </motion.button>
      </div>
    </>
  );
}
