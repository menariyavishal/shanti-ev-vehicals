"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ChevronRight, ArrowDown } from "lucide-react";

/* ─── Hero slideshow — first image from each vehicle folder ── */
const heroSlides = [
  { src: "/vehicles/actone/actoneev.webp", alt: "Shanti Actone — Electric Scooter", position: "center 25%" },
  { src: "/vehicles/glyder/Glyder family.webp", alt: "Shanti Glyder — Electric Scooter", position: "top center" },
  { src: "/vehicles/megna/Megnane.webp", alt: "Shanti Megna — Electric Scooter", position: "center 25%" },
  { src: "/vehicles/megna-plus/megnaplusev.webp", alt: "Shanti Megna Plus — Electric Scooter", position: "center 25%" },
  { src: "/vehicles/supra/supra family.webp", alt: "Shanti Supra — Electric Scooter", position: "top center" },
  { src: "/vehicles/supreme/supreme family.webp", alt: "Shanti Supreme — Electric Scooter", position: "top center" },
  { src: "/vehicles/tejas/tejasev.webp", alt: "Shanti Tejas — Electric Moped", position: "top center" },
  { src: "/vehicles/windy/windy-ev.webp", alt: "Shanti Windy — Electric Moped", position: "top center" },
];

const SLIDE_INTERVAL = 4500; // ms between slides

const fadeUp = (delay: number = 0) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
});

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  /* ── Image slideshow state ── */
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex flex-col justify-center overflow-hidden"
      style={{ height: "100dvh", minHeight: "600px", background: "var(--bg-primary)" }}
      aria-label="Hero section"
    >
      {/* ── Background slideshow with parallax ── */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 z-0">

        {/* Gradient overlays — always visible above images */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, rgba(8,8,14,0.95) 0%, rgba(8,8,14,0.7) 40%, rgba(8,8,14,0.25) 65%, rgba(8,8,14,0.1) 100%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none"
          style={{
            height: "50%",
            background: "linear-gradient(to top, var(--bg-primary) 0%, transparent 100%)",
          }}
        />
        <div
          className="absolute top-0 left-0 right-0 z-10 pointer-events-none"
          style={{
            height: "20%",
            background: "linear-gradient(to bottom, rgba(8,8,14,0.5) 0%, transparent 100%)",
          }}
        />

        {/* Cycling images */}
        <AnimatePresence mode="popLayout">
          <motion.img
            key={currentSlide}
            src={heroSlides[currentSlide].src}
            alt={heroSlides[currentSlide].alt}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: heroSlides[currentSlide].position || "top center" }}
          />
        </AnimatePresence>
      </motion.div>

      {/* Accent glow */}
      <div
        className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full blur-3xl z-0 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(240,165,0,0.06) 0%, transparent 70%)" }}
      />

      {/* ── Content ── */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-20 container-xl py-20 md:py-0"
      >
        <div className="max-w-3xl">

          {/* Eyebrow */}
          <motion.div {...fadeUp(0.1)} className="flex items-center gap-3 mb-6">
            <span className="eyebrow">Shanti Electric Vehicles</span>
            <div className="w-8 h-px" style={{ background: "var(--accent)" }} />
            <span className="eyebrow" style={{ color: "var(--text-muted)" }}>Est. Rajkot, Gujarat</span>
          </motion.div>

          {/* Hero Heading */}
          <motion.h1 {...fadeUp(0.2)} className="mb-2" style={{ fontSize: "clamp(2.8rem, 7vw, 6.5rem)", fontWeight: 800, lineHeight: 0.92, letterSpacing: "-0.03em", color: "var(--text-primary)" }}>
            ELECTRIC.
          </motion.h1>
          <motion.h1
            {...fadeUp(0.3)}
            className="mb-2"
            style={{ fontSize: "clamp(2.8rem, 7vw, 6.5rem)", fontWeight: 800, lineHeight: 0.92, letterSpacing: "-0.03em", WebkitTextStroke: "1.5px rgba(255,255,255,0.25)", color: "transparent" }}
          >
            ELEVATED.
          </motion.h1>
          <motion.h1
            {...fadeUp(0.38)}
            style={{ fontSize: "clamp(2.8rem, 7vw, 6.5rem)", fontWeight: 800, lineHeight: 0.92, letterSpacing: "-0.03em", color: "var(--accent)" }}
          >
            UNSTOPPABLE.
          </motion.h1>

          {/* Subheading */}
          <motion.p
            {...fadeUp(0.48)}
            className="text-base md:text-lg leading-relaxed max-w-lg"
            style={{ color: "var(--text-secondary)", marginTop: "3rem", marginBottom: "3rem" }}
          >
            Premium electric vehicles designed for everyday Indian roads.
            Zero emissions. Maximum performance. Unmatched range.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.58, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-4"
          >
            <motion.a
              href="#vehicles"
              className="btn-primary"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Explore Vehicles
              <motion.span
                initial={{ x: 0 }}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronRight size={16} strokeWidth={2.5} />
              </motion.span>
            </motion.a>
            <motion.a
              href="#testride"
              className="btn-ghost"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Book a Test Ride
            </motion.a>
          </motion.div>


        </div>
      </motion.div>

      {/* ── Slide indicator dots ── */}
      <div className="absolute bottom-20 right-8 z-20 flex flex-col gap-1.5" aria-hidden="true">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className="rounded-full transition-all duration-400"
            style={{
              width: "6px",
              height: i === currentSlide ? "20px" : "6px",
              background: i === currentSlide ? "var(--accent)" : "rgba(255,255,255,0.3)",
            }}
            aria-label={`Show slide ${i + 1}`}
          />
        ))}
      </div>

      {/* ── Scroll Indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        style={{ color: "var(--text-muted)" }}
        aria-hidden="true"
      >
        <span className="text-xs font-bold uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}
