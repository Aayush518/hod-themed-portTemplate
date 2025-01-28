import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Flame, Hexagon as Dragon, Sword, Shield, Crown, Scroll } from 'lucide-react';

interface Skill {
  name: string;
  level: number;
  icon: React.ReactNode;
  house: string;
  description: string;
  color: string;
}

const skills: Skill[] = [
  {
    name: "Dragon Taming (React)",
    level: 90,
    icon: <Dragon className="w-8 h-8" />,
    house: "House Targaryen",
    description: "Mastery over the most powerful frontend beasts",
    color: "#FF0000"
  },
  {
    name: "Battle Strategy (System Design)",
    level: 85,
    icon: <Sword className="w-8 h-8" />,
    house: "House Stark",
    description: "Architecting scalable digital kingdoms",
    color: "#4A5568"
  },
  {
    name: "Kingdom Defense (Security)",
    level: 80,
    icon: <Shield className="w-8 h-8" />,
    house: "House Lannister",
    description: "Protecting realms from digital threats",
    color: "#FFD700"
  },
  {
    name: "Royal Protocol (TypeScript)",
    level: 85,
    icon: <Crown className="w-8 h-8" />,
    house: "House Baratheon",
    description: "Maintaining order in the code kingdoms",
    color: "#FFA500"
  },
  {
    name: "Ancient Wisdom (Backend)",
    level: 75,
    icon: <Scroll className="w-8 h-8" />,
    house: "House Tully",
    description: "Mastery of server-side sorcery",
    color: "#0000FF"
  },
  {
    name: "Dragon Glass (Next.js)",
    level: 88,
    icon: <Flame className="w-8 h-8" />,
    house: "House Targaryen",
    description: "Forging powerful web applications",
    color: "#800000"
  }
];

const SkillCard: React.FC<Skill> = ({ name, level, icon, house, description, color }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const dragonScaleCount = Math.floor(level / 10);

  return (
    <motion.div
      ref={ref}
      style={{ scale, opacity }}
      whileHover={{ scale: 1.05, rotateY: 10 }}
      className="relative group"
    >
      <div 
        className="absolute -inset-1 rounded-lg blur-lg opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"
        style={{ background: `linear-gradient(45deg, ${color}, transparent)` }}
      />
      <div className="relative bg-black/90 rounded-lg p-8 h-full backdrop-blur-xl">
        {/* Animated Border */}
        <div className="absolute inset-0 rounded-lg overflow-hidden">
          <div className="absolute inset-0 opacity-30">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-8 h-8"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  background: color,
                  clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                }}
              />
            ))}
          </div>
        </div>

        <div className="relative z-10">
          {/* Icon with Glow */}
          <motion.div
            className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
            animate={{
              boxShadow: [
                `0 0 20px ${color}50`,
                `0 0 60px ${color}30`,
                `0 0 20px ${color}50`,
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ background: `${color}20` }}
          >
            <div style={{ color }}>{icon}</div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-targaryen mb-2 text-center" style={{ color }}>
              {name}
            </h3>
            <p className="text-sm mb-4 text-center italic" style={{ color: `${color}99` }}>
              {house}
            </p>
            <p className="text-sm mb-6 text-center text-gray-300">
              {description}
            </p>
          </motion.div>

          {/* Power Level Indicator */}
          <div className="flex flex-wrap justify-center gap-2">
            {Array.from({ length: 10 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: i < dragonScaleCount ? 1 : 0.3,
                  scale: 1,
                  rotate: Math.random() * 30 - 15,
                }}
                transition={{ delay: i * 0.1 }}
                className="relative w-6 h-6"
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background: i < dragonScaleCount ? color : `${color}30`,
                    clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                  }}
                />
                <div
                  className="absolute inset-0 blur-sm"
                  style={{
                    background: i < dragonScaleCount ? color : 'transparent',
                    clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                    opacity: 0.5,
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const Skills: React.FC = () => {
  return (
    <section className="relative py-32 bg-gradient-to-b from-black to-gray-900 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&q=80')] bg-fixed opacity-5" />
        <motion.div
          className="absolute inset-0 bg-gradient-radial from-red-900/20 to-transparent"
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

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            animate={{
              rotateZ: [0, 5, -5, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Dragon className="w-20 h-20 text-red-600 mx-auto mb-6" />
          </motion.div>
          <h2 className="text-6xl font-targaryen text-red-600 mb-6">
            Arsenal of Powers
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-red-900 via-red-600 to-orange-600 mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {skills.map((skill, index) => (
            <SkillCard key={index} {...skill} />
          ))}
        </div>
      </div>
    </section>
  );
};