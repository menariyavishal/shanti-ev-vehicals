'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import StarsBackground from '@/components/StarsBackground';
import SideRays from '@/components/SideRays';

export default function ComingSoon() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="coming-soon-page">
      {/* ── Layer 1: Dark radial sky ──────────────────────────────────── */}
      <div className="cs-sky" />

      {/* ── Layer 2: Twinkling stars ──────────────────────────────────── */}
      {mounted && (
        <StarsBackground
          starCount={300}
          starColor="#ffffff"
          maxRadius={1.6}
          minRadius={0.2}
          className="z-[1]"
        />
      )}

      {/* ── Layer 3: Side rays (top-right origin) ─────────────────────── */}
      {mounted && (
        <div className="cs-rays">
          <SideRays
            speed={3.5}
            rayColor1="#C8A23D"
            rayColor2="#6c9ed8"
            intensity={2.6}
            spread={0.9}
            origin="top-right"
            tilt={0}
            saturation={1.55}
            blend={0.81}
            falloff={1.6}
            opacity={0.85}
          />
        </div>
      )}

      {/* ── Layer 4: Main content ─────────────────────────────────────── */}
      <div className="cs-content">
        <div className={`cs-card ${mounted ? 'cs-card--visible' : ''}`}>
          {/* Left: Text content */}
          <div className="cs-card-left">
            <div className="cs-logo-wrap">
              <Image
                src="/images/logo.png"
                alt="Shanti Electric Motors"
                width={140}
                height={140}
                priority
                unoptimized
                className="cs-logo"
              />
            </div>

            <h2 className="cs-shop-name">
              <span className="cs-shop-name--shanti">Shanti</span>
              <span className="cs-shop-name--electric">Electric</span>
              <span className="cs-shop-name--motors">Motors</span>
            </h2>

            <h1 className="cs-heading">
              <span className="cs-word cs-word--coming">Coming</span>
              <span className="cs-word cs-word--soon">Soon</span>
            </h1>

            <p className="cs-tagline">
              Electric vehicles for a greener tomorrow
            </p>

            <div className="cs-divider" />

            <a
              href="https://shantielectricmotors.in"
              target="_blank"
              rel="noopener noreferrer"
              className="cs-domain"
            >
              shantielectricmotors.in
            </a>
          </div>
        </div>
      </div>

      {/* ── Layer 5: Scooter (independent, right side) ────────────────── */}
      <div className={`cs-scooter-layer ${mounted ? 'cs-scooter-layer--visible' : ''}`}>
        <div className="cs-scooter-glow" />
        <Image
          src="/images/scooter.png"
          alt="Shanti Electric Scooter"
          width={1200}
          height={1200}
          priority
          className="cs-scooter"
        />
      </div>
    </div>
  );
}
