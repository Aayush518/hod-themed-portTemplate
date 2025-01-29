import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Hexagon, Scroll, Shield, Sword, Menu, X } from 'lucide-react';
import { profile } from '../../data/profile';

interface NavProps {
  theme: 'blacks' | 'greens';
}

const NavLink: React.FC<{ href: string; icon: React.ReactNode; text: string; theme: 'blacks' | 'greens' }> = ({ href, icon, text, theme }) => {
  const themeColors = theme === 'blacks' 
    ? 'text-gray-300 hover:text-red-600 group-hover:from-red-900/20 group-hover:via-red-600/20 group-hover:to-red-900/20'
    : 'text-emerald-300 hover:text-green-500 group-hover:from-green-900/20 group-hover:via-green-600/20 group-hover:to-green-900/20';

  return (
    <motion.a
      href={href}
      className={`flex items-center space-x-2 transition-colors relative group ${themeColors}`}
      whileHover={{ scale: 1.05 }}
    >
      <motion.div
        className="absolute -inset-2 bg-gradient-to-r rounded-lg opacity-0 group-hover:opacity-100 blur-sm transition-opacity"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0, 0.5, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      />
      <span className="relative z-10 group-hover:animate-pulse">{icon}</span>
      <span className="relative z-10">{text}</span>
      <motion.span
        className={`absolute bottom-0 left-0 w-full h-0.5 ${
          theme === 'blacks' ? 'bg-gradient-to-r from-red-900 via-red-600 to-red-900' 
          : 'bg-gradient-to-r from-green-900 via-green-600 to-green-900'
        }`}
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.a>
  );
};

const MobileNavLink: React.FC<{ href: string; text: string; theme: 'blacks' | 'greens' }> = ({ href, text, theme }) => {
  const themeColors = theme === 'blacks'
    ? 'text-gray-300 hover:text-red-600 hover:from-red-900/10'
    : 'text-emerald-300 hover:text-green-500 hover:from-green-900/10';

  return (
    <motion.a
      href={href}
      className={`block px-3 py-2 transition-colors relative group ${themeColors}`}
      whileHover={{ x: 10 }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0, 0.3, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      />
      <span className="relative z-10">{text}</span>
    </motion.a>
  );
};

const DragonLogo = ({ theme }: { theme: 'blacks' | 'greens' }) => {
  const themeColors = theme === 'blacks'
    ? 'from-red-600 to-orange-500 text-red-600'
    : 'from-green-600 to-green-500 text-green-600';

  return (
    <motion.div
      className="relative w-12 h-12"
      animate={{
        rotate: [0, 10, -10, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <motion.div
        className={`absolute inset-0 bg-gradient-to-r ${themeColors} rounded-full blur-lg`}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      />
      <Hexagon className={`w-full h-full relative z-10 ${themeColors}`} />
    </motion.div>
  );
};

export const Navigation: React.FC<NavProps> = ({ theme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollPosition(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const themeColors = theme === 'blacks'
    ? 'from-red-600 via-orange-500 to-red-600'
    : 'from-green-600 via-green-500 to-green-600';

  return (
    <motion.nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrollPosition > 50 
          ? `${theme === 'blacks' ? 'bg-black/90' : 'bg-green-950/90'} backdrop-blur-lg shadow-lg ${
              theme === 'blacks' ? 'shadow-red-900/20' : 'shadow-green-900/20'
            }` 
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
          >
            <DragonLogo theme={theme} />
            <motion.span 
              className={`text-2xl font-targaryen bg-gradient-to-r ${themeColors} text-transparent bg-clip-text`}
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {profile.name}
            </motion.span>
          </motion.div>
          
          <div className="md:hidden">
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`${theme === 'blacks' ? 'text-gray-200 hover:text-red-600' : 'text-emerald-200 hover:text-green-500'} transition-colors`}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{
                  rotate: isMenuOpen ? 90 : 0,
                }}
                transition={{ duration: 0.2 }}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.div>
            </motion.button>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="#about" icon={<Shield size={18} />} text="About" theme={theme} />
            <NavLink href="#projects" icon={<Sword size={18} />} text="Projects" theme={theme} />
            <NavLink href="#skills" icon={<Flame size={18} />} text="Skills" theme={theme} />
            <NavLink href="#contact" icon={<Scroll size={18} />} text="Contact" theme={theme} />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className={`md:hidden ${theme === 'blacks' ? 'bg-black/95' : 'bg-green-950/95'} backdrop-blur-xl`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="px-2 pt-2 pb-3 space-y-1 sm:px-3"
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              transition={{ staggerChildren: 0.1 }}
            >
              <MobileNavLink href="#about" text="About" theme={theme} />
              <MobileNavLink href="#projects" text="Projects" theme={theme} />
              <MobileNavLink href="#skills" text="Skills" theme={theme} />
              <MobileNavLink href="#contact" text="Contact" theme={theme} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};