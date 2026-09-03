"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Leaf, Users, Award, TrendingUp } from "lucide-react";

const values = [
  {
    icon:        Leaf,
    title:       "Sustainability First",
    description: "Every kilometer on a Shanti vehicle is a kilometer without emissions. We're committed to a cleaner Gujarat, one ride at a time.",
  },
  {
    icon:        Users,
    title:       "Community Driven",
    description: "Built around real riders. We listen, iterate, and design EVs that solve real commuting challenges faced by everyday Indians.",
  },
  {
    icon:        Award,
    title:       "Uncompromising Quality",
    description: "Every Shanti vehicle undergoes rigorous testing before leaving our facility. We never ship anything we wouldn't ride ourselves.",
  },
  {
    icon:        TrendingUp,
    title:       "Constant Innovation",
    description: "From battery chemistry to smart connectivity, we invest in technologies that keep Shanti riders ahead of the curve.",
  },
];

export function About() {
  return (
    <section
      id="about"
      className="section-pad relative overflow-hidden"
      style={{ background: "var(--bg-secondary)" }}
      aria-labelledby="about-heading"
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, var(--accent), transparent)" }}
        aria-hidden="true"
      />

      <div className="container-xl">

        {/* Section Label */}
        <motion.p
          className="eyebrow mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          05 — Our Story
        </motion.p>

        {/* Asymmetric Layout: Text + Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20 lg:mb-28">

          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2
              id="about-heading"
              className="section-heading mb-8"
              style={{ color: "var(--text-primary)" }}
            >
              Electric Mobility
              <br />
              <span style={{ color: "var(--accent)" }}>for Every Indian.</span>
            </h2>

            <div
              className="flex flex-col gap-5 text-base leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              <p>
                Shanti Electric Vehicles was founded on a simple belief: clean, affordable,
                and beautiful electric mobility shouldn't be a luxury. It should be
                accessible to every Indian family, every commuter, every dreamer.
              </p>
              <p>
                Rooted in Rajkot — the industrial heart of Gujarat — we understand the
                roads our riders travel. The potholes, the traffic, the daily 20-kilometer
                round trip to work. We build EVs that handle it all, quietly and efficiently.
              </p>
              <p>
                Our vehicles are more than machines. They are a statement. A vote for a
                cleaner city. A belief that progress and practicality can coexist. That
                style and sustainability aren't opposites.
              </p>
            </div>

            <motion.a
              href="#vehicles"
              className="btn-primary mt-8 inline-flex"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              See Our Vehicles
            </motion.a>
          </motion.div>

          {/* Right: Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 40 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Main image */}
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{ aspectRatio: "4/3" }}
            >
              <Image
                src="/vehicles/supreme/supreme family.webp"
                alt="Shanti Supreme family — multiple color options"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={85}
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(8,8,14,0.6) 0%, transparent 60%)" }}
              />
              {/* Floating caption */}
              <div className="absolute bottom-5 left-5 right-5 z-10">
                <p
                  className="text-xs font-bold uppercase tracking-wider"
                  style={{ color: "var(--accent)" }}
                >
                  Shanti Supreme — Available in 5 Colors
                </p>
              </div>
            </div>

            {/* Floating stat card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="absolute -bottom-6 -left-6 hidden sm:block"
            >
              <div
                className="p-5 rounded-xl shadow-2xl"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-accent)",
                  minWidth: "160px",
                }}
              >
                <div
                  className="text-3xl font-extrabold tracking-tight"
                  style={{ color: "var(--accent)" }}
                >
                  8+
                </div>
                <div
                  className="text-xs font-bold uppercase tracking-wider mt-1"
                  style={{ color: "var(--text-muted)" }}
                >
                  Models Available
                </div>
              </div>
            </motion.div>

            {/* Second floating card */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="absolute -top-4 -right-4 hidden sm:block"
            >
              <div
                className="p-4 rounded-xl shadow-2xl"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  minWidth: "140px",
                }}
              >
                <div
                  className="text-2xl font-extrabold tracking-tight"
                  style={{ color: "var(--text-primary)" }}
                >
                  120+
                </div>
                <div
                  className="text-xs font-bold uppercase tracking-wider mt-1"
                  style={{ color: "var(--text-muted)" }}
                >
                  KM Range
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Values Grid */}
        <div>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xl font-extrabold mb-8 tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            What We Stand For
          </motion.h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((val, i) => {
              const Icon = val.icon;
              return (
                <motion.div
                  key={val.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -4 }}
                  className="p-6 rounded-xl group"
                  style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: "var(--accent-glow)", border: "1px solid var(--border-accent)" }}
                  >
                    <Icon size={18} style={{ color: "var(--accent)" }} />
                  </div>
                  <h4
                    className="font-bold text-sm mb-2"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {val.title}
                  </h4>
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {val.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
