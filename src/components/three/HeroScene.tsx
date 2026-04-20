import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Points, PointMaterial, Torus, MeshDistortMaterial, Sphere, Stars } from "@react-three/drei";
import * as THREE from "three";

const ParticleField = () => {
  const ref = useRef<THREE.Points>(null!);
  const positions = new Float32Array(2500 * 3);
  for (let i = 0; i < 2500; i++) {
    const r = 4 + Math.random() * 2;
    const t = Math.random() * Math.PI * 2;
    const p = Math.acos(2 * Math.random() - 1);
    positions[i * 3] = r * Math.sin(p) * Math.cos(t);
    positions[i * 3 + 1] = r * Math.sin(p) * Math.sin(t);
    positions[i * 3 + 2] = r * Math.cos(p);
  }

  useFrame((_, d) => {
    if (ref.current) {
      ref.current.rotation.y += d * 0.05;
      ref.current.rotation.x += d * 0.02;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial transparent color="#c084fc" size={0.025} sizeAttenuation depthWrite={false} />
    </Points>
  );
};

const Core = () => {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((_, d) => {
    if (ref.current) {
      ref.current.rotation.x += d * 0.2;
      ref.current.rotation.y += d * 0.3;
    }
  });
  return (
    <Sphere ref={ref} args={[1.4, 64, 64]}>
      <MeshDistortMaterial color="#a855f7" distort={0.45} speed={2.2} roughness={0.1} metalness={0.9} />
    </Sphere>
  );
};

const Rings = () => {
  const a = useRef<THREE.Mesh>(null!);
  const b = useRef<THREE.Mesh>(null!);
  useFrame((_, d) => {
    if (a.current) a.current.rotation.x += d * 0.4;
    if (b.current) b.current.rotation.y += d * 0.5;
  });
  return (
    <group>
      <Torus ref={a} args={[2.2, 0.02, 16, 100]}>
        <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={1.5} />
      </Torus>
      <Torus ref={b} args={[2.6, 0.015, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={1.5} />
      </Torus>
    </group>
  );
};

const HeroScene = () => {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 50 }} dpr={[1, 2]}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={1.5} color="#c084fc" />
        <pointLight position={[-5, -5, -5]} intensity={1.2} color="#22d3ee" />
        <Stars radius={50} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
        <Float speed={1.5} rotationIntensity={1} floatIntensity={1.2}>
          <Core />
        </Float>
        <Rings />
        <ParticleField />
      </Suspense>
    </Canvas>
  );
};

export default HeroScene;
