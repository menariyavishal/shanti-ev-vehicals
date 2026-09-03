"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Star, Quote } from "lucide-react";
import styles from "./Testimonials.module.css";

/* ─── Animated Counter Hook ──────────────────────────────────── */
function useCountUp(target: number, duration = 1800, decimals = 0) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(parseFloat((eased * target).toFixed(decimals)));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target, duration, decimals]);

  return { count, ref };
}

/* ─── Animated Stat Component ────────────────────────────────── */
interface StatItem {
  numeric: number;
  decimals?: number;
  prefix?: string;
  suffix: string;
  label: string;
}

function AnimatedStat({ stat, delay }: { stat: StatItem; delay: number }) {
  const { count, ref } = useCountUp(stat.numeric, 1800, stat.decimals ?? 0);
  const display = stat.decimals ? count.toFixed(stat.decimals) : Math.floor(count).toLocaleString("en-IN");

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className={styles.stat}
    >
      <span ref={ref} className={styles.statValue}>
        {stat.prefix}{display}{stat.suffix}
      </span>
      <span className={styles.statLabel}>{stat.label}</span>
    </motion.div>
  );
}

interface Testimonial {
  id: string;
  name: string;
  city: string;
  model: string;
  rating: number;
  review: string;
  initials: string;
  avatarColor: string;
}

const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Rajesh Patel",
    city: "Surat, Gujarat",
    model: "Shanti Supreme",
    rating: 5,
    review:
      "Best decision I made this year. No petrol, no RTO tension, just smooth riding every day. My office commute of 25 km is effortless now.",
    initials: "RP",
    avatarColor: "#F0A500",
  },
  {
    id: "t2",
    name: "Meena Sharma",
    city: "Jaipur, Rajasthan",
    model: "Shanti Megna",
    rating: 5,
    review:
      "Bought for my daily market visits. Super lightweight, easy to handle. The reverse gear is a lifesaver in tight parking. Highly recommend to every lady!",
    initials: "MS",
    avatarColor: "#E91E63",
  },
  {
    id: "t3",
    name: "Arjun Nair",
    city: "Kochi, Kerala",
    model: "Shanti Actone",
    rating: 5,
    review:
      "Honestly shocked by the build quality at this price. The hydraulic shockers make it ride so smooth. Zero maintenance cost in 8 months. Can't ask for more.",
    initials: "AN",
    avatarColor: "#2196F3",
  },
  {
    id: "t4",
    name: "Sunita Devi",
    city: "Patna, Bihar",
    model: "Shanti Windy",
    rating: 4,
    review:
      "Saving ₹3,000 every month on petrol. The scooter paid for itself in less than a year. Service team came to my doorstep when I had an issue. 10/10 experience.",
    initials: "SD",
    avatarColor: "#8BC34A",
  },
  {
    id: "t5",
    name: "Kiran Reddy",
    city: "Hyderabad, Telangana",
    model: "Shanti Supra",
    rating: 5,
    review:
      "The Supra is a beast! 80 km/h top speed is more than enough for city roads. The anti-theft alarm gives me peace of mind. Fantastic EV at an unbeatable price.",
    initials: "KR",
    avatarColor: "#FF5722",
  },
  {
    id: "t6",
    name: "Amit Verma",
    city: "Lucknow, UP",
    model: "Shanti Glyder",
    rating: 5,
    review:
      "My whole family uses it! Wife takes it to school in the morning, I use it for office. 110 km range on a single charge is more than enough for our daily needs.",
    initials: "AV",
    avatarColor: "#4CAF50",
  },
  {
    id: "t7",
    name: "Fatima Khan",
    city: "Bhopal, MP",
    model: "Shanti Megna Plus",
    rating: 5,
    review:
      "As a working woman, I needed something reliable and easy. Shanti Megna Plus is exactly that. No licence needed was the biggest plus point for me!",
    initials: "FK",
    avatarColor: "#9C27B0",
  },
  {
    id: "t8",
    name: "Suresh Chandra",
    city: "Nagpur, Maharashtra",
    model: "Shanti Tejas",
    rating: 4,
    review:
      "The Tejas looks premium and performs better than I expected. Dealer support in Nagpur is excellent. Got a test ride and bought it the same day!",
    initials: "SC",
    avatarColor: "#00BCD4",
  },
  {
    id: "t9",
    name: "Priya Iyer",
    city: "Chennai, Tamil Nadu",
    model: "Shanti Supreme",
    rating: 5,
    review:
      "Switched from petrol two years ago. Never looked back. My children can ride it without any licence worries. The build quality is genuinely premium for the price.",
    initials: "PI",
    avatarColor: "#FF9800",
  },
  {
    id: "t10",
    name: "Deepak Joshi",
    city: "Pune, Maharashtra",
    model: "Shanti Actone",
    rating: 5,
    review:
      "Delivery was fast, bike was exactly as shown. Charging time is just 4 hours and I get more than 100 km range. The cruise mode on highways is a game-changer!",
    initials: "DJ",
    avatarColor: "#3F51B5",
  },
];

// Duplicate for seamless loop
const allTestimonials = [...testimonials, ...testimonials];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className={styles.stars} aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={13}
          fill={i < rating ? "#F0A500" : "transparent"}
          stroke={i < rating ? "#F0A500" : "#5A5A70"}
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}

export function Testimonials() {
  const [paused, setPaused] = useState(false);

  return (
    <section
      id="testimonials"
      className={styles.section}
      aria-labelledby="testimonials-heading"
    >
      {/* Header */}
      <div className="container-xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={styles.header}
        >
          <p className="eyebrow">04 — Happy Riders</p>
          <h2 id="testimonials-heading" className={styles.heading}>
            Real riders.{" "}
            <span style={{ color: "var(--accent)" }}>Real stories.</span>
          </h2>
          <p className={styles.subtext}>
            Over 50,000 happy riders across 15 states. Here's what they say
            about their Shanti EV experience.
          </p>
        </motion.div>
      </div>

      {/* Marquee Strip */}
      <div
        className={styles.marqueeWrapper}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        aria-label="Scrolling testimonials — hover to pause"
      >
        {/* Fade edges */}
        <div className={styles.fadeLeft} aria-hidden="true" />
        <div className={styles.fadeRight} aria-hidden="true" />

        <div
          className={styles.marqueeTrack}
          style={{ animationPlayState: paused ? "paused" : "running" }}
        >
          {allTestimonials.map((t, idx) => (
            <article
              key={`${t.id}-${idx}`}
              className={styles.card}
              aria-label={`Review by ${t.name}`}
            >
              {/* Quote Icon */}
              <Quote
                size={22}
                className={styles.quoteIcon}
                fill="var(--accent)"
                stroke="none"
              />

              {/* Stars */}
              <StarRating rating={t.rating} />

              {/* Review Text */}
              <p className={styles.reviewText}>&ldquo;{t.review}&rdquo;</p>

              {/* Author */}
              <div className={styles.author}>
                <div
                  className={styles.avatar}
                  style={{ background: t.avatarColor }}
                  aria-hidden="true"
                >
                  {t.initials}
                </div>
                <div>
                  <p className={styles.authorName}>{t.name}</p>
                  <p className={styles.authorMeta}>
                    {t.city} &middot; <span style={{ color: "var(--accent)" }}>{t.model}</span>
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Stats Row */}
      <div className="container-xl">
        <div className={styles.statsRow}>
          {([
            { numeric: 50000, suffix: "+", label: "Happy Riders" },
            { numeric: 4.8,   suffix: "★", label: "Average Rating", decimals: 1 },
            { numeric: 15,    suffix: "",  label: "States Covered" },
            { numeric: 98,    suffix: "%", label: "Recommend Us" },
          ] as StatItem[]).map((stat, i) => (
            <AnimatedStat key={stat.label} stat={stat} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
