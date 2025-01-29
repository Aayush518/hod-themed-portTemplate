import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Shield, Sword, Crown, Scroll } from 'lucide-react';

interface AboutProps {
  theme: 'blacks' | 'greens';
}

const FloatingSymbol = ({ children, index, theme }: { children: React.ReactNode; index: number; theme: 'blacks' | 'greens' }) => (
  <motion.div
    className={`absolute ${theme === 'blacks' ? 'text-red-600/20' : 'text-green-600/20'}`}
    style={{
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      fontSize: '2rem',
    }}
    animate={{
      y: [0, -20, 0],
      rotate: [0, 360],
      opacity: [0.2, 0.5, 0.2],
    }}
    transition={{
      duration: 5,
      delay: index * 0.5,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    {children}
  </motion.div>
);

export const About: React.FC<AboutProps> = ({ theme }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  const symbols = [<Shield />, <Sword />, <Crown />, <Scroll />];
  const themeColors = theme === 'blacks'
    ? 'from-red-900 via-red-600 to-red-900'
    : 'from-green-900 via-green-600 to-green-900';

  const bgGradient = theme === 'blacks'
    ? 'from-black to-gray-900'
    : 'from-green-950 to-green-900';

  return (
    <section 
      ref={containerRef}
      id="about" 
      className={`relative py-32 bg-gradient-to-b ${bgGradient} overflow-hidden`}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&q=80')] bg-fixed opacity-5" />
        <motion.div
          className={`absolute inset-0 bg-gradient-radial ${
            theme === 'blacks' ? 'from-red-900/20' : 'from-green-900/20'
          } to-transparent`}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
          }}
        />
        
        {/* Floating Symbols */}
        {symbols.map((symbol, index) => (
          <FloatingSymbol key={index} index={index} theme={theme}>
            {symbol}
          </FloatingSymbol>
        ))}
      </div>

      <motion.div 
        className="relative z-10 max-w-5xl mx-auto px-4"
        style={{ opacity, scale }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Shield className={`w-16 h-16 ${
            theme === 'blacks' ? 'text-red-600' : 'text-green-600'
          } mx-auto mb-4 animate-pulse`} />
          <h2 className={`text-6xl font-targaryen ${
            theme === 'blacks' ? 'text-red-600' : 'text-green-600'
          } mb-4`}>
            The Tale Begins
          </h2>
          <motion.div 
            className={`w-32 h-1 bg-gradient-to-r ${themeColors} mx-auto`}
            animate={{
              scaleX: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative group"
          >
            <motion.div
              className={`absolute -inset-4 ${
                theme === 'blacks' ? 'bg-red-600/20' : 'bg-green-600/20'
              } rounded-lg blur-xl group-hover:${
                theme === 'blacks' ? 'bg-red-600/30' : 'bg-green-600/30'
              }`}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
            />
            <div className="relative overflow-hidden rounded-lg">
              <motion.img
                src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80"
                alt="Developer Setup"
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.5 }}
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50"
                whileHover={{ opacity: 0.3 }}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <motion.p
              className={`text-xl leading-relaxed ${
                theme === 'blacks' ? 'text-gray-300' : 'text-emerald-200'
              }`}
              whileHover={{ x: 10 }}
            >
              Like the great houses of Westeros, every developer has their own story.
              Mine began with a passion for creating digital experiences that leave
              a lasting impression.
            </motion.p>
            
            <motion.p
              className={`text-xl leading-relaxed ${
                theme === 'blacks' ? 'text-gray-300' : 'text-emerald-200'
              }`}
              whileHover={{ x: 10 }}
            >
              With over [X] years of experience in web development, I've forged
              powerful applications and elegant interfaces that stand the test of time.
            </motion.p>

            <div className="flex flex-wrap gap-4">
              {['React', 'Node.js', 'TypeScript'].map((tech, index) => (
                <motion.span
                  key={tech}
                  className="px-6 py-3 rounded-full relative overflow-hidden group"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-r ${themeColors} opacity-50`}
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                      delay: index * 0.2,
                    }}
                  />
                  <span className={`relative ${
                    theme === 'blacks' ? 'text-red-500' : 'text-green-500'
                  } font-bold`}>{tech}</span>
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};