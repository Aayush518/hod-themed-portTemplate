import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Trail } from '@react-three/drei';
import * as THREE from 'three';

interface DragonModelProps {
  theme: 'blacks' | 'greens';
}

export const DragonModel: React.FC<DragonModelProps> = ({ theme }) => {
  const dragonRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const fireRef = useRef<THREE.Points>(null);

  const themeColors = {
    primary: theme === 'blacks' ? '#FF0000' : '#00FF00',
    secondary: theme === 'blacks' ? '#8B0000' : '#006400',
    glow: theme === 'blacks' ? '#FF4500' : '#32CD32',
  };

  // Create dragon body geometry
  const bodyGeometry = useMemo(() => {
    const geometry = new THREE.IcosahedronGeometry(1, 4);
    const positions = geometry.attributes.position;
    const vertices = positions.array;
    
    // Add noise to vertices for dragon-like appearance
    for (let i = 0; i < vertices.length; i += 3) {
      vertices[i] += (Math.random() - 0.5) * 0.2;
      vertices[i + 1] += (Math.random() - 0.5) * 0.2;
      vertices[i + 2] += (Math.random() - 0.5) * 0.2;
    }
    
    geometry.computeVertexNormals();
    return geometry;
  }, []);

  // Create fire particles
  const fireParticles = useMemo(() => {
    const particles = new Float32Array(1000 * 3);
    for (let i = 0; i < particles.length; i += 3) {
      particles[i] = (Math.random() - 0.5) * 3;
      particles[i + 1] = Math.random() * 3;
      particles[i + 2] = (Math.random() - 0.5) * 3;
    }
    return particles;
  }, []);

  useFrame(({ clock }) => {
    if (dragonRef.current) {
      const time = clock.getElapsedTime();
      dragonRef.current.rotation.y = Math.sin(time * 0.3) * 0.3;
      dragonRef.current.position.y = Math.sin(time * 0.5) * 0.2;
      
      dragonRef.current.children.forEach((child, index) => {
        if (child.name === 'wing') {
          child.rotation.z = Math.sin(time * 2 + index) * 0.2;
        }
      });
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.001;
      const positions = particlesRef.current.geometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(clock.getElapsedTime() + i) * 0.001;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }

    if (fireRef.current) {
      const positions = fireRef.current.geometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += 0.02;
        if (positions[i + 1] > 3) positions[i + 1] = 0;
        positions[i] += (Math.random() - 0.5) * 0.01;
        positions[i + 2] += (Math.random() - 0.5) * 0.01;
      }
      fireRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  const dragonMaterial = new THREE.MeshStandardMaterial({
    color: themeColors.primary,
    emissive: themeColors.secondary,
    roughness: 0.5,
    metalness: 0.8,
    normalScale: new THREE.Vector2(2, 2),
  });

  return (
    <group ref={dragonRef}>
      {/* Dragon Body */}
      <mesh geometry={bodyGeometry} material={dragonMaterial}>
        <meshStandardMaterial
          color={themeColors.primary}
          emissive={themeColors.secondary}
          roughness={0.5}
          metalness={0.8}
          normalScale={new THREE.Vector2(2, 2)}
        />
      </mesh>

      {/* Dragon Wings */}
      {[-1, 1].map((side) => (
        <group
          key={side}
          position={[side * 1.2, 0.2, 0]}
          rotation={[0, 0, side * Math.PI * 0.2]}
          name="wing"
        >
          <Trail
            width={2}
            length={8}
            color={new THREE.Color(themeColors.primary)}
            attenuation={(t) => t * t}
          >
            <Sphere args={[0.1, 32, 32]}>
              <meshStandardMaterial
                color={themeColors.glow}
                emissive={themeColors.secondary}
                emissiveIntensity={2}
                roughness={0.2}
                metalness={0.8}
              />
            </Sphere>
          </Trail>
        </group>
      ))}

      {/* Dragon Eyes */}
      {[-0.3, 0.3].map((x) => (
        <mesh key={x} position={[x, 0.2, 0.8]}>
          <sphereGeometry args={[0.1, 32, 32]} />
          <meshStandardMaterial
            color={themeColors.glow}
            emissive={themeColors.glow}
            emissiveIntensity={2}
            roughness={0}
            metalness={1}
          />
        </mesh>
      ))}

      {/* Fire Breath */}
      <points ref={fireRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={fireParticles.length / 3}
            array={fireParticles}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          color={themeColors.glow}
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
          vertexColors
        />
      </points>

      {/* Ambient Particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={1000}
            array={new Float32Array(3000).map(() => (Math.random() - 0.5) * 5)}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.02}
          color={themeColors.glow}
          transparent
          opacity={0.6}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
};