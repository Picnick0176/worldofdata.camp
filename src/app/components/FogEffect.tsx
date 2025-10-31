'use client';

import React, { useEffect, useRef } from 'react';

interface FogEffectProps {
  particleCount?: number;
  color1?: string;
  color2?: string;
  opacity?: number;
  speed?: number;
  zIndex?: number;
}

export const FogEffect: React.FC<FogEffectProps> = ({
  particleCount = 50,
  color1 = '139, 92, 246', // purple-500
  color2 = '88, 28, 135', // purple-900
  opacity = 0.3,
  speed = 1,
  zIndex = 10
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // capture non-null references to satisfy TypeScript for closures/classes
    const c = canvas;
    const context = ctx;

    c.width = window.innerWidth;
    c.height = window.innerHeight;

    const fogParticles: FogParticle[] = [];

    class FogParticle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;

      constructor() {
        this.x = Math.random() * c.width;
        this.y = Math.random() * c.height;
        this.size = Math.random() * 150 + 100;
        this.speedX = (Math.random() * 0.5 - 0.25) * speed;
        this.speedY = (Math.random() * 0.3 - 0.15) * speed;
        this.opacity = Math.random() * opacity + 0.1;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > c.width + this.size) this.x = -this.size;
        if (this.x < -this.size) this.x = c.width + this.size;
        if (this.y > c.height + this.size) this.y = -this.size;
        if (this.y < -this.size) this.y = c.height + this.size;
      }

      draw() {
        const gradient = context.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size
        );
        gradient.addColorStop(0, `rgba(${color1}, ${this.opacity})`);
        gradient.addColorStop(0.5, `rgba(${color2}, ${this.opacity * 0.5})`);
        gradient.addColorStop(1, `rgba(${color2}, 0)`);

        context.fillStyle = gradient;
        context.fillRect(this.x - this.size, this.y - this.size, this.size * 2, this.size * 2);
      }
    }

    for (let i = 0; i < particleCount; i++) {
      fogParticles.push(new FogParticle());
    }

    let animationFrameId: number;

    const animate = () => {
      context.clearRect(0, 0, c.width, c.height);

      fogParticles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      c.width = window.innerWidth;
      c.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    animate(); // ✅ เริ่มอนิเมชัน

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [particleCount, color1, color2, opacity, speed]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{
        zIndex,
        mixBlendMode: 'screen'
      }}
    />
  );
};
