"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const stats = [
  { value: "Assured",    unit: "Service",     label: "Doorstep support across 15 states" },
  { value: "3-Year",     unit: "Warranty",    label: "Battery & motor covered" },
  { value: "Zero",       unit: "Emissions",   label: "100% electric, always clean" },
  { value: "No RTO",     unit: "Hassle",      label: "No licence, no RC needed" },
];

export function BrandStatement() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const xLeft  = useTransform(scrollYProgress, [0, 1], ["-6%", "0%"]);
  const xRight = useTransform(scrollYProgress, [0, 1], ["6%",  "0%"]);

  return (
    <section
      id="promise"
      ref={ref}
      className="relative overflow-hidden py-24 md:py-36"
      style={{ background: "var(--bg-secondary)" }}
      aria-label="Brand statement section"
    >
      {/* Top border glow */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, var(--accent), transparent)" }}
        aria-hidden="true"
      />

      {/* Large background text */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none"
        aria-hidden="true"
      >
        <span
          className="font-extrabold whitespace-nowrap"
          style={{
            fontSize: "clamp(6rem, 20vw, 20rem)",
            color: "transparent",
            WebkitTextStroke: "1px rgba(255,255,255,0.03)",
            letterSpacing: "-0.04em",
            lineHeight: 1,
          }}
        >
          SHANTI
        </span>
      </div>

      <div className="container-xl relative z-10">

        {/* Headline */}
        <div className="mb-16 md:mb-24 text-center">
          <motion.p
            className="eyebrow mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            03 — Our Promise
          </motion.p>

          <motion.div style={{ x: xLeft }}>
            <h2
              className="section-heading text-center"
              style={{ color: "var(--text-primary)", lineHeight: 0.95 }}
            >
              <span>BUILT FOR</span>
            </h2>
          </motion.div>

          <motion.div style={{ x: xRight }}>
            <h2
              className="section-heading text-center"
              style={{ color: "var(--text-primary)", lineHeight: 0.95 }}
            >
              <span>THE WAY</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <h2
              className="section-heading text-center"
              style={{ color: "var(--accent)", lineHeight: 0.95 }}
            >
              YOU MOVE.
            </h2>
          </motion.div>
        </div>

        {/* Promise Cards Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center md:items-start text-center md:text-left"
            >
              {/* Accent line */}
              <div
                className="w-8 h-0.5 mb-5 hidden md:block"
                style={{ background: "var(--accent)" }}
                aria-hidden="true"
              />

              {/* Value + Unit */}
              <div style={{ lineHeight: 1.05 }}>
                <span
                  style={{
                    fontSize: "clamp(1.6rem, 3.5vw, 2.6rem)",
                    fontWeight: 800,
                    color: "var(--accent)",
                    letterSpacing: "-0.03em",
                    display: "block",
                  }}
                >
                  {stat.value}
                </span>
                <span
                  style={{
                    fontSize: "clamp(1rem, 2vw, 1.4rem)",
                    fontWeight: 700,
                    color: "var(--text-secondary)",
                    letterSpacing: "-0.01em",
                    display: "block",
                  }}
                >
                  {stat.unit}
                </span>
              </div>

              {/* Description */}
              <p
                className="text-xs font-semibold uppercase tracking-widest mt-3"
                style={{ color: "var(--text-muted)", lineHeight: 1.6 }}
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 pt-10 border-t flex flex-col md:flex-row items-center justify-between gap-6"
          style={{ borderColor: "var(--border)" }}
        >
          <p
            className="text-sm leading-relaxed max-w-sm text-center md:text-left"
            style={{ color: "var(--text-secondary)" }}
          >
            Every Shanti Electric Vehicle is engineered to transform your daily
            commute into a seamless, emissions-free experience.
          </p>
          <motion.a
            href="#vehicles"
            className="btn-primary flex-shrink-0"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Explore All Models
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
