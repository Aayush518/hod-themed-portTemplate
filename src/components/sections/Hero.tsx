import React, { Suspense, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Flame, Shield, Sword, Crown, Hexagon as Dragon } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { DragonModel } from '../3d/DragonModel';
import { profile } from '../../data/profile';

interface HeroProps {
  theme: 'blacks' | 'greens';
}

const FireEmbers = ({ theme }: { theme: 'blacks' | 'greens' }) => {
  const emberCount = 150;
  return (
    <div className="absolute inset-0 pointer-events-none">
      {Array.from({ length: emberCount }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1"
          initial={{
            opacity: 0,
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + Math.random() * 100,
          }}
          animate={{
            opacity: [0, 1, 0],
            x: `${Math.random() * 100}%`,
            y: -100,
            scale: [1, 1.5, 0.5],
            rotate: [0, 360],
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeOut",
          }}
          style={{
            background: theme === 'blacks'
              ? `radial-gradient(circle, rgba(255,${Math.random() * 100 + 100},0,${Math.random() * 0.7 + 0.3}) 0%, rgba(255,69,0,0) 70%)`
              : `radial-gradient(circle, rgba(0,255,${Math.random() * 100 + 100},${Math.random() * 0.7 + 0.3}) 0%, rgba(0,255,69,0) 70%)`,
            filter: 'blur(1px)',
            boxShadow: theme === 'blacks'
              ? '0 0 10px rgba(255,69,0,0.5)'
              : '0 0 10px rgba(0,255,69,0.5)',
          }}
        />
      ))}
    </div>
  );
};

const DragonBreath = ({ theme }: { theme: 'blacks' | 'greens' }) => {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0.3, 0.7, 0.3],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <div className={`absolute inset-0 bg-gradient-radial ${
        theme === 'blacks'
          ? 'from-red-600/30 via-orange-500/20'
          : 'from-green-600/30 via-green-500/20'
      } to-transparent dragon-breath`} />
    </motion.div>
  );
};

const FloatingRunes = ({ theme }: { theme: 'blacks' | 'greens' }) => {
  const runes = ['ᚠ', 'ᚢ', 'ᚦ', 'ᚨ', 'ᚱ', 'ᚲ', 'ᚷ', 'ᚹ'];
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {runes.map((rune, index) => (
        <motion.div
          key={index}
          className={`absolute text-2xl font-targaryen ${
            theme === 'blacks' ? 'text-red-600/30' : 'text-green-600/30'
          }`}
          initial={{ opacity: 0, y: '100vh' }}
          animate={{
            opacity: [0, 1, 0],
            y: [100, -100],
            x: Math.sin(index) * 50,
            rotate: [0, 360],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            delay: index * 0.5,
            ease: "linear",
          }}
          style={{
            left: `${(index / runes.length) * 100}%`,
          }}
        >
          {rune}
        </motion.div>
      ))}
    </div>
  );
};

const TitleEffect = ({ children, theme }: { children: React.ReactNode; theme: 'blacks' | 'greens' }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const themeColors = theme === 'blacks'
    ? 'from-red-600/20 via-orange-500/20 to-red-600/20'
    : 'from-green-600/20 via-green-500/20 to-green-600/20';

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) * 0.01,
        y: (e.clientY - window.innerHeight / 2) * 0.01,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
      style={{
        transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
      }}
    >
      <motion.div
        className={`absolute -inset-2 bg-gradient-to-r ${themeColors} rounded-lg blur-xl`}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <div className="relative">
        {children}
      </div>
    </motion.div>
  );
};

const HeroButton = ({ href, icon, text, theme }: { href: string; icon: React.ReactNode; text: string; theme: 'blacks' | 'greens' }) => {
  const themeColors = theme === 'blacks'
    ? 'from-red-600 to-orange-500 border-red-600/50 text-red-500 hover:bg-red-800/30'
    : 'from-green-600 to-green-500 border-green-600/50 text-green-500 hover:bg-green-800/30';

  return (
    <motion.a
      href={href}
      className="group relative"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className={`absolute -inset-1 bg-gradient-to-r ${themeColors} rounded-lg opacity-75 blur group-hover:opacity-100`}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      />
      <div className={`relative px-6 py-3 bg-black rounded-lg border transition-colors flex items-center gap-2 ${
        theme === 'blacks' ? 'border-red-600/50' : 'border-green-600/50'
      }`}>
        {icon}
        <span>{text}</span>
        <motion.div
          className={`absolute bottom-0 left-0 h-[2px] ${
            theme === 'blacks' ? 'bg-red-600' : 'bg-green-600'
          }`}
          initial={{ width: 0 }}
          whileHover={{ width: '100%' }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.a>
  );
};

export const Hero: React.FC<HeroProps> = ({ theme }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  const themeColors = theme === 'blacks'
    ? 'from-red-600 via-orange-500 to-red-600'
    : 'from-green-600 via-green-500 to-green-600';

  return (
    <section ref={containerRef} className="relative min-h-screen overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className={`absolute inset-0 ${
          theme === 'blacks' ? 'bg-dragon-scales' : 'bg-green-scales'
        } opacity-30`} />
        <motion.div
          className={`absolute inset-0 bg-gradient-radial ${
            theme === 'blacks' ? 'from-red-900/20' : 'from-green-900/20'
          } to-transparent`}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
      
      {/* 3D Scene */}
      <div className="absolute inset-0">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <Environment preset="sunset" />
          <ambientLight intensity={0.5} />
          <pointLight 
            position={[10, 10, 10]} 
            intensity={2} 
            color={theme === 'blacks' ? '#FF4500' : '#22c55e'} 
          />
          <Suspense fallback={null}>
            <DragonModel theme={theme} />
          </Suspense>
          <OrbitControls 
            enableZoom={false}
            enablePan={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 3}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Canvas>
      </div>

      {/* Effects */}
      <FireEmbers theme={theme} />
      <DragonBreath theme={theme} />
      <FloatingRunes theme={theme} />

      {/* Content */}
      <motion.div 
        className="relative z-10 h-screen flex flex-col items-center justify-center"
        style={{ y, opacity, scale }}
      >
        <div className="text-center px-4">
          <TitleEffect theme={theme}>
            <h1 className={`text-8xl md:text-9xl font-targaryen text-transparent bg-clip-text bg-gradient-to-r ${themeColors} mb-8 animate-pulse-fire`}>
              {profile.name}
            </h1>
          </TitleEffect>

          <motion.p
            className={`text-2xl md:text-3xl font-targaryen tracking-wider mb-12 ${
              theme === 'blacks' 
                ? 'text-gray-300' 
                : 'text-emerald-300'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <span className={theme === 'blacks' ? 'text-red-500' : 'text-green-500'}>
              {profile.title}
            </span>
          </motion.p>

          {/* Navigation */}
          <motion.div
            className="flex flex-wrap justify-center gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <HeroButton href="#about" icon={<Shield className="w-5 h-5" />} text="About" theme={theme} />
            <HeroButton href="#projects" icon={<Sword className="w-5 h-5" />} text="Projects" theme={theme} />
            <HeroButton href="#skills" icon={<Crown className="w-5 h-5" />} text="Skills" theme={theme} />
            <HeroButton href="#contact" icon={<Flame className="w-5 h-5" />} text="Contact" theme={theme} />
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Flame className={`w-8 h-8 ${
          theme === 'blacks' ? 'text-red-600' : 'text-green-600'
        } animate-pulse`} />
        <motion.div
          className={`mt-2 font-targaryen text-sm tracking-widest ${
            theme === 'blacks' ? 'text-red-500' : 'text-green-500'
          }`}
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          SCROLL
        </motion.div>
      </motion.div>
    </section>
  );
};