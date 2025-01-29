import React from 'react';
import { motion } from 'framer-motion';
import { Hexagon as Dragon } from 'lucide-react';

interface ThemeSwitcherProps {
  theme: 'blacks' | 'greens';
  setTheme: (theme: 'blacks' | 'greens') => void;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ theme, setTheme }) => {
  const isBlacks = theme === 'blacks';

  return (
    <motion.div
      className="fixed bottom-4 sm:bottom-6 md:bottom-8 lg:bottom-10 left-1/2 transform -translate-x-1/2 z-[60]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.button
        onClick={() => setTheme(isBlacks ? 'greens' : 'blacks')}
        className={`relative group p-1.5 sm:p-2 md:p-2.5 lg:p-3 rounded-full backdrop-blur-lg ${
          isBlacks 
            ? 'bg-red-900/20 hover:bg-red-900/30' 
            : 'bg-green-900/20 hover:bg-green-900/30'
        } transition-colors`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.div
          className={`absolute inset-0 rounded-full blur-lg ${
            isBlacks ? 'bg-red-600/20' : 'bg-green-600/20'
          }`}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div
          className="relative"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Dragon className={`w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 ${
            isBlacks ? 'text-red-500' : 'text-green-500'
          }`} />
        </motion.div>
        <motion.div
          className={`absolute -top-4 sm:-top-5 md:-top-6 lg:-top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-[10px] sm:text-xs md:text-sm font-targaryen ${
            isBlacks ? 'text-red-500' : 'text-green-500'
          } opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
        >
          {isBlacks ? "House Black" : "House Green"}
        </motion.div>
      </motion.button>
    </motion.div>
  );
};