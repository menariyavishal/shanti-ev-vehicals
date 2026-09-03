"use client";

import { motion } from "framer-motion";
import {
  Zap,
  BatteryCharging,
  Wallet,
  Wrench,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import styles from "./Features.module.css";

interface Reason {
  id: string;
  number: string;
  title: string;
  description: string;
  badges: string[];
  icon: React.ElementType;
  gradient: string;
}

const reasons: Reason[] = [
  {
    id: "rto",
    number: "01",
    title: "No RTO Hassle",
    description:
      "Skip the registration. Skip the licence. Just buy and ride. Shanti EV is a non-RTO low-speed EV — perfect for daily city commute.",
    badges: ["No Licence", "No RC", "No Insurance Mandate"],
    icon: Zap,
    gradient: "linear-gradient(135deg, rgba(240,165,0,0.2) 0%, rgba(240,165,0,0.05) 100%)",
  },
  {
    id: "range",
    number: "02",
    title: "Your Ride, Your Range",
    description:
      "Travel 30 km daily? 80 km? More? Choose your battery, choose your range. Don't pay for what you don't need.",
    badges: ["Lithium / Lead-Acid", "Customisable"],
    icon: BatteryCharging,
    gradient: "linear-gradient(135deg, rgba(76,175,80,0.18) 0%, rgba(76,175,80,0.04) 100%)",
  },
  {
    id: "savings",
    number: "03",
    title: "Best Price, Big Savings",
    description:
      "Starting at just ₹39,999. Save thousands every year on petrol. The scooter pays for itself in months — then it's pure savings for years.",
    badges: ["From ₹39,999", "3-yr Warranty"],
    icon: Wallet,
    gradient: "linear-gradient(135deg, rgba(33,150,243,0.18) 0%, rgba(33,150,243,0.04) 100%)",
  },
  {
    id: "service",
    number: "04",
    title: "Service That Comes to You",
    description:
      "Issue with your Shanti EV? Assured service through our dealer network across 15 states. Most customers come back to buy a second one.",
    badges: ["Assured Service", "15 States"],
    icon: Wrench,
    gradient: "linear-gradient(135deg, rgba(233,30,99,0.18) 0%, rgba(233,30,99,0.04) 100%)",
  },
  {
    id: "build",
    number: "05",
    title: "Premium Build, Built to Last",
    description:
      "High-quality fibre body. Strong engine motor. Hydraulic shockers for a smooth ride — even on broken roads. Premium quality you can feel.",
    badges: ["Heavy Fibre", "BLDC Motor", "Hydraulic"],
    icon: ShieldCheck,
    gradient: "linear-gradient(135deg, rgba(156,39,176,0.18) 0%, rgba(156,39,176,0.04) 100%)",
  },
  {
    id: "smart",
    number: "06",
    title: "Smart Features Made Easy",
    description:
      "Reverse gear for tight parking. Anti-theft alarm. Cruise mode for long stretches. Advanced controller for smooth, silent performance.",
    badges: ["Reverse", "Anti-Theft", "Cruise Mode"],
    icon: Sparkles,
    gradient: "linear-gradient(135deg, rgba(0,188,212,0.18) 0%, rgba(0,188,212,0.04) 100%)",
  },
];

const iconColors: Record<string, string> = {
  rto: "#F0A500",
  range: "#4CAF50",
  savings: "#2196F3",
  service: "#E91E63",
  build: "#9C27B0",
  smart: "#00BCD4",
};

export function Features() {
  return (
    <section
      id="technology"
      className={styles.section}
      aria-labelledby="features-heading"
    >
      {/* Top glow line */}
      <div className={styles.topLine} aria-hidden="true" />

      <div className="container-xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={styles.header}
        >
          <p className="eyebrow">01 — Why Choose Us</p>
          <h2 id="features-heading" className={styles.heading}>
            Six reasons riders across{" "}
            <span style={{ color: "var(--text-secondary)" }}>India are switching</span>{" "}
            to{" "}
            <span style={{ color: "var(--accent)" }}>Shanti EV.</span>
          </h2>
          <p className={styles.subtext}>
            We didn't build a scooter. We built the answer to every objection a
            smart Indian buyer has about going electric.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className={styles.grid}>
          {reasons.map((item, index) => {
            const Icon = item.icon;
            const color = iconColors[item.id];
            return (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.07,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={styles.card}
                aria-label={item.title}
              >
                {/* Gradient Background */}
                <div
                  className={styles.cardGradient}
                  style={{ background: item.gradient }}
                  aria-hidden="true"
                />

                {/* Number Badge */}
                <div className={styles.numberBadge} style={{ color }}>
                  {item.number}
                </div>

                {/* Icon */}
                <div
                  className={styles.iconWrap}
                  style={{
                    background: `${color}18`,
                    border: `1px solid ${color}40`,
                  }}
                >
                  <Icon size={28} style={{ color }} strokeWidth={1.8} />
                </div>

                {/* Text */}
                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.cardDesc}>{item.description}</p>
                </div>

                {/* Badges */}
                <div className={styles.badgeRow}>
                  {item.badges.map((badge) => (
                    <span
                      key={badge}
                      className={styles.badge}
                      style={{
                        background: `${color}12`,
                        border: `1px solid ${color}35`,
                        color,
                      }}
                    >
                      {badge}
                    </span>
                  ))}
                </div>

                {/* Hover glow border */}
                <div
                  className={styles.glowBorder}
                  style={{ background: `linear-gradient(135deg, ${color}60, transparent)` }}
                  aria-hidden="true"
                />
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
