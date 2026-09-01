'use client';

import { useRef, useEffect, useCallback } from 'react';

interface Star {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  twinkleSpeed: number;
  twinkleOffset: number;
}

interface StarsBackgroundProps {
  starCount?: number;
  starColor?: string;
  maxRadius?: number;
  minRadius?: number;
  className?: string;
}

export default function StarsBackground({
  starCount = 260,
  starColor = '#ffffff',
  maxRadius = 1.8,
  minRadius = 0.3,
  className = '',
}: StarsBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const animationRef = useRef<number | null>(null);

  const generateStars = useCallback(
    (width: number, height: number): Star[] => {
      return Array.from({ length: starCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: minRadius + Math.random() * (maxRadius - minRadius),
        opacity: 0.2 + Math.random() * 0.8,
        twinkleSpeed: 0.3 + Math.random() * 2.0,
        twinkleOffset: Math.random() * Math.PI * 2,
      }));
    },
    [starCount, maxRadius, minRadius],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      starsRef.current = generateStars(rect.width, rect.height);
    };

    resize();
    window.addEventListener('resize', resize);

    const draw = (time: number) => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      for (const star of starsRef.current) {
        const twinkle =
          0.4 +
          0.6 *
            ((Math.sin(time * 0.001 * star.twinkleSpeed + star.twinkleOffset) +
              1) /
              2);
        const alpha = star.opacity * twinkle;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = starColor;
        ctx.globalAlpha = alpha;
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      animationRef.current = requestAnimationFrame(draw);
    };

    animationRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [starColor, generateStars]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ pointerEvents: 'none' }}
    />
  );
}
