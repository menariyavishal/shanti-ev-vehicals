"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Navigation, Compass } from "lucide-react";
import styles from "./WhereWeAre.module.css";

/* ─── Canvas 3D Globe Component ─────────────────────────────── */
function GlobeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { once: false, margin: "-80px" });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 500);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 400);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener("resize", handleResize);

    // Generate globe points (dots grid + continent emphasis)
    interface Point3D {
      lat: number;
      lon: number;
      isLand?: boolean;
    }

    const points: Point3D[] = [];
    const latLines = 38;
    const lonLines = 76;

    for (let i = 0; i <= latLines; i++) {
      const lat = (i / latLines) * Math.PI - Math.PI / 2; // -PI/2 to PI/2
      const dotsInRow = Math.max(1, Math.floor(lonLines * Math.cos(lat)));
      for (let j = 0; j < dotsInRow; j++) {
        const lon = (j / dotsInRow) * Math.PI * 2; // 0 to 2PI
        const latDeg = (lat * 180) / Math.PI;
        const lonDeg = (lon * 180) / Math.PI;

        // Land highlight for India & South Asia
        const isIndiaRegion = latDeg >= 6 && latDeg <= 38 && lonDeg >= 68 && lonDeg <= 96;
        points.push({ lat, lon, isLand: isIndiaRegion });
      }
    }

    // Rajasthan location pin coordinates
    const rajasthanLat = (26.9 * Math.PI) / 180;
    const rajasthanLon = (74.2 * Math.PI) / 180;

    // Target rotation to bring Rajasthan front & center
    const targetRotationY = -rajasthanLon + Math.PI / 2; // ~0.27 rad

    let currentRotationY = -1.2; // Start rotated away
    let currentScale = 0.52;     // Start zoomed out
    let pulseRadius = 0;
    let beaconScale = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height * 0.68;
      const baseRadius = Math.min(width, height) * 0.52;

      // Smooth lerp for zoom scale & rotation when section is in view
      const targetScale = isInView ? 1.15 : 0.55;
      const destRotY = isInView ? targetRotationY : currentRotationY + 0.002;

      currentScale += (targetScale - currentScale) * 0.045; // Smooth zoom lerp
      currentRotationY += (destRotY - currentRotationY) * 0.04; // Smooth rotation lerp

      // Gentle continuous ambient oscillation when locked on Rajasthan
      const ambientSway = isInView ? Math.sin(Date.now() * 0.001) * 0.05 : 0;
      const activeRotY = currentRotationY + ambientSway;

      const radius = baseRadius * currentScale;
      pulseRadius = (pulseRadius + 0.09) % 20;

      if (isInView && beaconScale < 1) {
        beaconScale += (1 - beaconScale) * 0.08;
      } else if (!isInView && beaconScale > 0) {
        beaconScale += (0 - beaconScale) * 0.08;
      }

      // Draw atmosphere background glow
      const glowGrad = ctx.createRadialGradient(cx, cy, radius * 0.6, cx, cy, radius * 1.35);
      glowGrad.addColorStop(0, "rgba(240, 165, 0, 0.12)");
      glowGrad.addColorStop(0.5, "rgba(240, 165, 0, 0.03)");
      glowGrad.addColorStop(1, "transparent");
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.35, 0, Math.PI * 2);
      ctx.fill();

      // Draw globe wireframe outline ring
      ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.stroke();

      // Draw Latitude rings
      for (let latDeg = -60; latDeg <= 60; latDeg += 30) {
        const rad = (latDeg * Math.PI) / 180;
        const rLat = radius * Math.cos(rad);
        const yLat = cy - radius * Math.sin(rad);
        ctx.beginPath();
        ctx.ellipse(cx, yLat, rLat, Math.max(1, rLat * 0.22), 0, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.035)";
        ctx.stroke();
      }

      // Render dots
      for (let i = 0; i < points.length; i++) {
        const pt = points[i];
        const cosLat = Math.cos(pt.lat);
        const sinLat = Math.sin(pt.lat);

        const currentLon = pt.lon + activeRotY;
        const cosLon = Math.cos(currentLon);
        const sinLon = Math.sin(currentLon);

        const x3d = radius * cosLat * sinLon;
        const y3d = -radius * sinLat;
        const z3d = radius * cosLat * cosLon;

        // Front hemisphere check
        if (z3d > 0) {
          const px = cx + x3d;
          const py = cy + y3d;
          const depthAlpha = Math.max(0.12, (z3d / radius) * 0.9);

          ctx.beginPath();
          ctx.arc(px, py, pt.isLand ? 1.8 * currentScale : 1.1 * currentScale, 0, Math.PI * 2);

          if (pt.isLand) {
            ctx.fillStyle = `rgba(240, 165, 0, ${depthAlpha * 0.95})`;
          } else {
            ctx.fillStyle = `rgba(255, 255, 255, ${depthAlpha * 0.38})`;
          }
          ctx.fill();
        }
      }

      // Calculate 3D position of Rajasthan pin
      const currRajLon = rajasthanLon + activeRotY;
      const rx3d = radius * Math.cos(rajasthanLat) * Math.sin(currRajLon);
      const ry3d = -radius * Math.sin(rajasthanLat);
      const rz3d = radius * Math.cos(rajasthanLat) * Math.cos(currRajLon);

      // Render pin & pulse beacon when visible on front hemisphere
      if (rz3d > -radius * 0.1) {
        const rpx = cx + rx3d;
        const rpy = cy + ry3d;
        const visibility = Math.min(1, Math.max(0, (rz3d + radius * 0.1) / (radius * 0.3))) * beaconScale;

        ctx.save();
        ctx.globalAlpha = visibility;

        // Expanding pulse rings
        ctx.beginPath();
        ctx.arc(rpx, rpy, 6 + pulseRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(239, 68, 68, ${1 - pulseRadius / 20})`;
        ctx.lineWidth = 1.8;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(rpx, rpy, Math.max(0, pulseRadius * 0.6), 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(240, 165, 0, ${0.85 - pulseRadius / 22})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Glowing Pin Center
        const pinGlow = ctx.createRadialGradient(rpx, rpy, 0, rpx, rpy, 12 * beaconScale);
        pinGlow.addColorStop(0, "#FF3B30");
        pinGlow.addColorStop(0.5, "#F0A500");
        pinGlow.addColorStop(1, "rgba(240, 165, 0, 0)");

        ctx.beginPath();
        ctx.arc(rpx, rpy, 12 * beaconScale, 0, Math.PI * 2);
        ctx.fillStyle = pinGlow;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(rpx, rpy, 6 * beaconScale, 0, Math.PI * 2);
        ctx.fillStyle = "#FF3B30";
        ctx.fill();

        ctx.beginPath();
        ctx.arc(rpx, rpy, 2.5 * beaconScale, 0, Math.PI * 2);
        ctx.fillStyle = "#FFFFFF";
        ctx.fill();

        // Tooltip Badge: Rajasthan, India
        if (beaconScale > 0.4) {
          const labelText = "📍 Rajasthan, India";
          ctx.font = "bold 11px var(--font-main, sans-serif)";
          const textWidth = ctx.measureText(labelText).width;

          const tx = rpx;
          const ty = rpy - 22;

          ctx.fillStyle = "rgba(10, 10, 18, 0.92)";
          ctx.strokeStyle = "rgba(240, 165, 0, 0.6)";
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.roundRect(tx - textWidth / 2 - 8, ty - 14, textWidth + 16, 22, 6);
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = "#F0A500";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(labelText, tx, ty - 3);
        }

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [isInView]);

  return (
    <div ref={containerRef} className="w-full h-full relative">
      <canvas ref={canvasRef} className={styles.globeCanvas} />
    </div>
  );
}

/* ─── Main WhereWeAre Component ─────────────────────────────── */
export function WhereWeAre() {
  const [mapLoaded, setMapLoaded] = useState(false);

  return (
    <section
      id="where-we-are"
      className={styles.section}
      aria-labelledby="where-heading"
    >
      <div className="container-xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className={styles.header}
        >
          <p className="eyebrow">03.5 — Where We Are</p>
          <h2 id="where-heading" className={styles.heading}>
            Rooted in{" "}
            <span style={{ color: "var(--accent)" }}>Rajasthan, India.</span>
          </h2>
          <p className={styles.subtext}>
            Headquartered in the historic state of Rajasthan — powering clean, sustainable mobility across 15+ states in India and expanding nationwide.
          </p>
        </motion.div>

        {/* Main Grid: Left Address & Map + Right Globe Card */}
        <div className={styles.grid}>

          {/* Left Column: Address Card + Google Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className={styles.leftCol}
          >
            {/* Address Card */}
            <div className={styles.addressCard}>
              <div className={styles.cardBadge}>
                <Navigation size={13} style={{ color: "var(--accent)" }} />
                <span>Corporate Headquarters & Hub</span>
              </div>

              <h3 className={styles.addressTitle}>Shanti Electric Vehicles Pvt. Ltd.</h3>

              <div className={styles.infoList}>
                <div className={styles.infoItem}>
                  <MapPin size={18} className={styles.infoIcon} />
                  <div>
                    <span className={styles.infoLabel}>Headquarters Address</span>
                    <p className={styles.infoVal}>
                      Plot No. 42, EV Innovation Park, RIICO Industrial Area, Sitapura, Jaipur, Rajasthan — 302022, India
                    </p>
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <Phone size={18} className={styles.infoIcon} />
                  <div>
                    <span className={styles.infoLabel}>Customer Support / Toll Free</span>
                    <p className={styles.infoVal}>+91 1800 266 9988 &nbsp;|&nbsp; +91 98765 43210</p>
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <Mail size={18} className={styles.infoIcon} />
                  <div>
                    <span className={styles.infoLabel}>General & Dealer Enquiries</span>
                    <p className={styles.infoVal}>contact@shantielectricvehicles.com</p>
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <Clock size={18} className={styles.infoIcon} />
                  <div>
                    <span className={styles.infoLabel}>Experience Center Hours</span>
                    <p className={styles.infoVal}>Monday – Saturday: 9:00 AM – 7:30 PM (IST)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Map Container Below Address */}
            <div className={styles.mapWrap}>
              <div className={styles.mapOverlayHeader}>
                <Compass size={14} style={{ color: "var(--accent)" }} />
                <span>Google Maps — Jaipur HQ, Rajasthan</span>
              </div>
              <iframe
                title="Shanti EV Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113911.39893708892!2d75.72051785!3d26.8851417!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db612341029c5%3A0x2c2954a20b784a9!2sJaipur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                className={styles.mapIframe}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                onLoad={() => setMapLoaded(true)}
              />
              {!mapLoaded && (
                <div className={styles.mapSkeleton}>
                  <span>Loading Map View...</span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Right Column: Interactive 3D Globe Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className={styles.globeCard}
          >
            {/* Top Text Header inside Globe Card */}
            <div className={styles.globeHeader}>
              <h3 className={styles.globeTitle}>Based in Rajasthan, India</h3>
              <div className={styles.globeStatus}>
                <span className={styles.greenPulseDot} />
                <span className={styles.statusText}>AVAILABLE NATIONWIDE</span>
              </div>
            </div>

            {/* 3D Canvas Globe Container */}
            <div className={styles.globeCanvasArea}>
              <GlobeCanvas />
            </div>

            {/* Bottom Info Banner */}
            <div className={styles.globeFooter}>
              <div className={styles.statPill}>
                <span className={styles.statPillNum}>15+</span>
                <span className={styles.statPillText}>States Active</span>
              </div>
              <div className={styles.statPill}>
                <span className={styles.statPillNum}>120+</span>
                <span className={styles.statPillText}>Dealerships</span>
              </div>
              <div className={styles.statPill}>
                <span className={styles.statPillNum}>50K+</span>
                <span className={styles.statPillText}>Riders</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
