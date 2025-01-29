import React from 'react';
import { motion } from 'framer-motion';
import { Scroll } from 'lucide-react';

export const Contact: React.FC<{ theme: 'blacks' | 'greens' }> = ({ theme }) => {
  const themeColors = theme === 'blacks'
    ? {
        primary: 'text-red-500',
        secondary: 'text-red-400',
        border: 'border-red-900/30',
        bg: 'bg-red-900/20',
        hover: 'hover:bg-red-800/30',
        gradient: 'from-red-900 via-red-600 to-red-900'
      }
    : {
        primary: 'text-green-500',
        secondary: 'text-green-400',
        border: 'border-green-900/30',
        bg: 'bg-green-900/20',
        hover: 'hover:bg-green-800/30',
        gradient: 'from-green-900 via-green-600 to-green-900'
      };

  const bgGradient = theme === 'blacks'
    ? 'from-gray-900 to-black'
    : 'from-green-900 to-green-950';

  return (
    <section id="contact" className={`relative py-20 bg-gradient-to-b ${bgGradient} overflow-hidden`}>
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&q=80')] bg-fixed opacity-5" />
        <motion.div
          className={`absolute inset-0 bg-gradient-radial ${themeColors.bg}`}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Scroll className={`w-12 h-12 ${themeColors.primary} mx-auto mb-4`} />
          <h2 className={`text-4xl font-targaryen ${themeColors.primary} mb-4`}>
            Send a Raven
          </h2>
          <div className={`w-24 h-1 ${themeColors.bg} mx-auto`} />
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          <div className="relative group">
            <div className={`absolute -inset-0.5 ${themeColors.bg} rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500`} />
            <input
              type="text"
              placeholder="Your Name"
              className={`relative w-full bg-black/50 ${themeColors.border} rounded-lg p-4 focus:outline-none focus:border-red-600 transition-colors`}
            />
          </div>

          <div className="relative group">
            <div className={`absolute -inset-0.5 ${themeColors.bg} rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500`} />
            <input
              type="email"
              placeholder="Your Email"
              className={`relative w-full bg-black/50 ${themeColors.border} rounded-lg p-4 focus:outline-none focus:border-red-600 transition-colors`}
            />
          </div>

          <div className="relative group">
            <div className={`absolute -inset-0.5 ${themeColors.bg} rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500`} />
            <textarea
              placeholder="Your Message"
              rows={6}
              className={`relative w-full bg-black/50 ${themeColors.border} rounded-lg p-4 focus:outline-none focus:border-red-600 transition-colors`}
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative w-full group"
          >
            <div className={`absolute -inset-0.5 bg-gradient-to-r ${themeColors.gradient} rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-500`} />
            <div className={`relative w-full ${themeColors.bg} ${themeColors.hover} text-white font-bold py-4 px-8 rounded-lg transition-colors`}>
              Send Message
            </div>
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
};