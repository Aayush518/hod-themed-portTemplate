import React, { Suspense, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Flame, Shield, Sword, Crown } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { DragonModel } from '../3d/DragonModel';

const FireEmbers = () => {
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
            background: `radial-gradient(circle, rgba(255,${Math.random() * 100 + 100},0,${Math.random() * 0.7 + 0.3}) 0%, rgba(255,69,0,0) 70%)`,
            filter: 'blur(1px)',
            boxShadow: '0 0 10px rgba(255,69,0,0.5)',
          }}
        />
      ))}
    </div>
  );
};

const DragonBreath = () => {
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
      <div className="absolute inset-0 bg-gradient-radial from-red-600/30 via-orange-500/20 to-transparent dragon-breath" />
    </motion.div>
  );
};

const FloatingRunes = () => {
  const runes = ['ᚠ', 'ᚢ', 'ᚦ', 'ᚨ', 'ᚱ', 'ᚲ', 'ᚷ', 'ᚹ'];
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {runes.map((rune, index) => (
        <motion.div
          key={index}
          className="absolute text-2xl font-targaryen text-red-600/30"
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

const TitleEffect = ({ children }: { children: React.ReactNode }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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
        className="absolute -inset-2 bg-gradient-to-r from-red-600/20 via-orange-500/20 to-red-600/20 rounded-lg blur-xl"
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

const HeroButton = ({ href, icon, text }: { href: string; icon: React.ReactNode; text: string }) => {
  return (
    <motion.a
      href={href}
      className="group relative"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="absolute -inset-1 bg-gradient-to-r from-red-600 to-orange-500 rounded-lg opacity-75 blur group-hover:opacity-100"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      />
      <div className="relative px-6 py-3 bg-black rounded-lg border border-red-600/50 text-red-500 font-targaryen tracking-wider flex items-center gap-2">
        {icon}
        <span>{text}</span>
        <motion.div
          className="absolute bottom-0 left-0 h-[2px] bg-red-600"
          initial={{ width: 0 }}
          whileHover={{ width: '100%' }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.a>
  );
};

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  return (
    <section ref={containerRef} className="relative min-h-screen overflow-hidden bg-black">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-dragon-scales opacity-30" />
        <motion.div
          className="absolute inset-0 bg-gradient-radial from-red-900/20 to-transparent"
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
          <pointLight position={[10, 10, 10]} intensity={2} color="#FF4500" />
          <Suspense fallback={null}>
            <DragonModel />
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
      <FireEmbers />
      <DragonBreath />
      <FloatingRunes />

      {/* Content */}
      <motion.div 
        className="relative z-10 h-screen flex flex-col items-center justify-center"
        style={{ y, opacity, scale }}
      >
        <div className="text-center px-4">
          <TitleEffect>
            <h1 className="text-8xl md:text-9xl font-targaryen text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-orange-500 to-red-600 mb-8 animate-pulse-fire">
              [Your Name]
            </h1>
          </TitleEffect>

          <motion.p
            className="text-2xl md:text-3xl font-targaryen text-gray-300 tracking-wider mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <span className="text-red-500">Digital Dragon Tamer</span> & <span className="text-orange-500">Code Warrior</span>
          </motion.p>

          {/* Interactive Navigation */}
          <motion.div
            className="flex flex-wrap justify-center gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <HeroButton href="#about" icon={<Shield className="w-5 h-5" />} text="About" />
            <HeroButton href="#projects" icon={<Sword className="w-5 h-5" />} text="Projects" />
            <HeroButton href="#skills" icon={<Crown className="w-5 h-5" />} text="Skills" />
            <HeroButton href="#contact" icon={<Flame className="w-5 h-5" />} text="Contact" />
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
        <Flame className="w-8 h-8 text-red-600 animate-pulse" />
        <motion.div
          className="mt-2 text-red-500 font-targaryen text-sm tracking-widest"
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