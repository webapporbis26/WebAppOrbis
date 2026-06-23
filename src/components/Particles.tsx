import React, { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  tx: string;
  ty: string;
}

const Particles: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Create random particles with large movement vectors
    const newParticles: Particle[] = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage
      y: Math.random() * 100, // percentage
      size: Math.random() * 8 + 3, // 3px to 11px
      opacity: Math.random() * 0.6 + 0.2, // 0.2 to 0.8
      duration: Math.random() * 15 + 15, // 15s to 30s
      delay: Math.random() * -30, // Start at different times
      tx: `${Math.random() * 800 - 400}px`, // Large random x movement
      ty: `${Math.random() * 800 - 400}px`, // Large random y movement
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-[#2DD4BF]"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            '--tx': p.tx,
            '--ty': p.ty,
            animation: `moveParticle ${p.duration}s ease-in-out ${p.delay}s infinite alternate`,
          } as React.CSSProperties}
        />
      ))}
      <style>{`
        @keyframes moveParticle {
          0% { transform: translate(0, 0) scale(1); opacity: 0.1; }
          25% { opacity: 0.8; }
          50% { transform: translate(calc(var(--tx) * 0.5), calc(var(--ty) * 0.5)) scale(1.5); }
          75% { opacity: 0.8; }
          100% { transform: translate(var(--tx), var(--ty)) scale(1); opacity: 0.1; }
        }
      `}</style>
    </div>
  );
};

export default Particles;
