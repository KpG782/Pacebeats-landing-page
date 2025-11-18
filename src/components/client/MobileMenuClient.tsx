import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Home,
  Activity,
  Zap,
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

export default function MobileMenuClient() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Listen for menu button clicks from NavbarClient
    const handleMenuToggle = () => {
      setIsMenuOpen((prev) => !prev);
    };

    const menuButton = document.getElementById("mobile-menu-button");
    menuButton?.addEventListener("click", handleMenuToggle);

    return () => {
      menuButton?.removeEventListener("click", handleMenuToggle);
    };
  }, []);

  const openModal = (modalId: string) => {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove("hidden");
      modal.classList.add("flex");
      setIsMenuOpen(false);
    }
  };

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          id="mobile-menu"
          className="lg:hidden bg-black bg-opacity-90 backdrop-blur-sm mt-4 mx-0 py-4 px-4 shadow-lg border-t border-gray-700 w-full overflow-hidden"
          role="menu"
          aria-hidden={!isMenuOpen}
          aria-labelledby="mobile-menu-button"
        >
          <div className="flex flex-col space-y-4">
            <motion.a
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              href="#hero"
              className="text-sm text-white hover:text-gray-300 transition-colors flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 rounded-md px-2 py-1"
              role="menuitem"
              aria-label="Navigate to homepage"
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </motion.a>

            {/* Mobile Features Section */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="border-l-2 border-red-500 pl-3"
              role="group"
              aria-labelledby="mobile-features-heading"
            >
              <h3
                id="mobile-features-heading"
                className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2"
              >
                Features
              </h3>
              <div className="space-y-2" role="list">
                <a
                  href="#features"
                  className="flex items-center gap-3 text-sm text-white hover:text-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 rounded-md px-2 py-1"
                  role="menuitem"
                  aria-label="Real-Time Pace & Analytics feature"
                >
                  <Activity className="w-4 h-4 text-red-400" />
                  <div>
                    <span className="font-medium">
                      Real-Time Pace & Analytics
                    </span>
                    <p className="text-xs text-gray-400 mt-1">
                      Live pacing insights + post-run performance trends
                    </p>
                  </div>
                </a>
                <a
                  href="#features"
                  className="flex items-center gap-3 text-sm text-white hover:text-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 rounded-md px-2 py-1"
                  role="menuitem"
                  aria-label="Smart Pace Detection feature"
                >
                  <Zap className="w-4 h-4 text-red-400" />
                  <div>
                    <span className="font-medium">Smart Pace Detection</span>
                    <p className="text-xs text-gray-400 mt-1">
                      AI-driven analysis that adapts to your running style
                    </p>
                  </div>
                </a>
                <a
                  href="#features"
                  className="flex items-center gap-3 text-sm text-white hover:text-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 rounded-md px-2 py-1"
                  role="menuitem"
                  aria-label="Spotify Integration feature"
                >
                  <Music className="w-4 h-4 text-red-400" />
                  <div>
                    <span className="font-medium">Spotify Integration</span>
                    <p className="text-xs text-gray-400 mt-1">
                      Music playback that syncs with your running pace
                    </p>
                  </div>
                </a>
                <a
                  href="#watch-integration"
                  className="flex items-center gap-3 text-sm text-white hover:text-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 rounded-md px-2 py-1"
                  role="menuitem"
                  aria-label="Pacebeats Watch Companion feature"
                >
                  <Watch className="w-4 h-4 text-red-400" />
                  <div>
                    <span className="font-medium">
                      Pacebeats Watch Companion
                    </span>
                    <p className="text-xs text-gray-400 mt-1">
                      Companion app for selected smartwatches
                    </p>
                  </div>
                </a>
              </div>
            </motion.div>

            <motion.a
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              href="#how-it-works"
              className="text-sm text-white hover:text-gray-300 transition-colors flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 rounded-md px-2 py-1"
              role="menuitem"
              aria-label="Learn how Pacebeats works"
            >
              <BookOpen className="w-4 h-4" />
              <span>How It Works</span>
            </motion.a>
            <motion.a
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.25 }}
              href="#tech-stack"
              className="text-sm text-white hover:text-gray-300 transition-colors flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 rounded-md px-2 py-1"
              role="menuitem"
              aria-label="View Pacebeats technology stack"
            >
              <Code className="w-4 h-4" />
              <span>Tech Stack</span>
            </motion.a>
            <motion.a
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              href="https://buymeacoffee.com/Loki123"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="text-sm text-white hover:text-gray-300 transition-colors flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 rounded-md px-2 py-1"
              role="menuitem"
              aria-label="Support Pacebeats development on Buy Me a Coffee - Opens in new tab"
            >
              <Heart className="w-4 h-4" />
              <span>Support</span>
            </motion.a>
            <motion.a
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.35 }}
              href="#team"
              className="text-sm text-white hover:text-gray-300 transition-colors flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 rounded-md px-2 py-1"
              role="menuitem"
              aria-label="Meet the Pacebeats team"
            >
              <Users className="w-4 h-4" />
              <span>Team</span>
            </motion.a>

            <motion.hr
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.4 }}
              className="border-gray-300"
              role="separator"
            />

            {/* Legal Section - Centered */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="text-center space-y-3"
              role="group"
              aria-label="Legal information"
            >
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                Legal
              </h4>
              <div className="space-y-2">
                <button
                  onClick={() => openModal("termsModal")}
                  className="text-sm text-white hover:text-gray-300 transition-colors flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 rounded-md px-2 py-1 mx-auto"
                  type="button"
                  aria-label="View terms and conditions"
                >
                  <FileText className="w-4 h-4" />
                  Terms and Conditions
                </button>
                <button
                  onClick={() => openModal("privacyModal")}
                  className="text-sm text-white hover:text-gray-300 transition-colors flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 rounded-md px-2 py-1 mx-auto"
                  type="button"
                  aria-label="View privacy policy"
                >
                  <Shield className="w-4 h-4" />
                  Privacy Policy
                </button>
              </div>
            </motion.div>

            <motion.a
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              href="https://github.com/KpG782/"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="flex items-center justify-center text-sm text-white hover:text-gray-300 transition-colors gap-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 rounded-md px-2 py-1"
              role="menuitem"
              aria-label="View Pacebeats documentation on GitHub - Opens in new tab"
            >
              <Github className="w-4 h-4" />
              <span>Documentation</span>
            </motion.a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
