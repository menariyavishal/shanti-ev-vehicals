"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import {
  ArrowLeft,
  Zap,
  Shield,
  RotateCcw,
  Usb,
  ParkingSquare,
  ChevronRight,
  MessageCircle,
  Camera,
} from "lucide-react";
import styles from "./supreme.module.css";

/* ─── Data ───────────────────────────────────────────────────── */
const keyFeatures = [
  { icon: Shield,        label: "Anti-Theft Alarm",  desc: "Built-in alarm system" },
  { icon: RotateCcw,     label: "Central Locking",   desc: "One-touch remote lock"  },
  { icon: ParkingSquare, label: "Parking Switch",    desc: "Safe parking mode"      },
  { icon: Zap,           label: "Reverse Gear",      desc: "Easy reverse control"   },
  { icon: Usb,           label: "USB Charger",       desc: "Charge on the go"       },
];

const specGroups = [
  {
    group: "Electrical",
    color: "#F0A500",
    items: [
      { label: "Speedometer",   value: "Digital"                              },
      { label: "Battery",       value: "Lead Acid / Lithium"                  },
      { label: "Charger",       value: "Micro Charger With Auto CutOff"       },
      { label: "Charging Time", value: "Lithium: 3–5 Hrs · Lead Acid: 6–8 Hrs" },
      { label: "Headlight",     value: "LED Headlamp"                         },
    ],
  },
  {
    group: "Motor / Chassis",
    color: "#F0A500",
    items: [
      { label: "Motor",            value: "Highly Insulated BLDC Motor"        },
      { label: "Speed",            value: "Low Speed"                          },
      { label: "Chassis",          value: "High Strength Tubular Frame"        },
      { label: "Front Suspension", value: "Front Hydraulic Telescopic"         },
      { label: "Rear Suspension",  value: "Rear Double Shocker with Dual Tube" },
    ],
  },
  {
    group: "Brake / Tyre / Weight",
    color: "#F0A500",
    items: [
      { label: "Brake System", value: "F-Disc / R-Disc"     },
      { label: "Tyres",        value: "Tubeless"            },
      { label: "Tyre Size",    value: 'Front-12″ · Rear-12″' },
      { label: "Weight",       value: "100 Kg"              },
    ],
  },
];

const galleryImages = [
  { src: "/vehicles/supreme/supreme-ev-front.webp", label: "Front View"    },
  { src: "/vehicles/supreme/Supreme-Rear.webp",     label: "Rear View"     },
  { src: "/vehicles/supreme/Supreme-side.webp",     label: "Side View"     },
  { src: "/vehicles/supreme/supreme-ev-color.webp", label: "Color Options" },
];

/* ─── Page ───────────────────────────────────────────────────── */
export default function SupremePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const cardRef  = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroImgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const heroOpacity  = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // 3-D tilt motion values
  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const rawGlareX  = useMotionValue(50);
  const rawGlareY  = useMotionValue(50);

  // Spring-smooth the tilt so it feels physical
  const rotateX = useSpring(rawRotateX, { stiffness: 200, damping: 22 });
  const rotateY = useSpring(rawRotateY, { stiffness: 200, damping: 22 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width;   // 0 → 1
    const y = (e.clientY - rect.top)  / rect.height;  // 0 → 1
    rawRotateX.set((y - 0.5) * -16);   // tilt up/down  ±8°
    rawRotateY.set((x - 0.5) *  16);   // tilt left/right ±8°
    rawGlareX.set(x * 100);
    rawGlareY.set(y * 100);
  };

  const handleMouseLeave = () => {
    rawRotateX.set(0);
    rawRotateY.set(0);
    rawGlareX.set(50);
    rawGlareY.set(50);
  };

  const [activeGallery, setActiveGallery] = useState(0);
  const [activeTab, setActiveTab] = useState(0);

  return (
    <main className={styles.page}>

      {/* ════ HERO ═══════════════════════════════════════════════ */}
      <section ref={heroRef} className={styles.hero}>

        {/* ── Left: all text ── */}
        <motion.div style={{ opacity: heroOpacity }} className={styles.heroLeft}>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/#vehicles" className={styles.backLink}>
              <ArrowLeft size={15} />
              All Models
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className={styles.heroHeadBlock}
          >
            <h1 className={styles.heroTitle}>Supreme</h1>
            <p className={styles.heroTagline}>Own the road.</p>

            {/* Price below tagline */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className={styles.priceRow}
            >
              <span className={styles.priceAmount}>&#8377;75,000</span>
              <span className={styles.priceOnwards}>onwards</span>
            </motion.div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className={styles.heroDesc}
          >
            The flagship. Disc brakes front and rear, a 100&nbsp;kg-rated frame,
            hydraulic shockers and six showroom colours. Built for the
            professional who wants the office gate to notice.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className={styles.heroCtas}
          >
            <a
              href="https://wa.me/919876543210?text=Hi%2C+I%27m+interested+in+the+Supreme+EV"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaWhatsapp}
            >
              <MessageCircle size={16} />
              Get Best Price on WhatsApp
            </a>
            <a href="/#testride" className={styles.ctaTest}>
              Book a Test Ride
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className={styles.scrollHint}
          >
            <span className={styles.scrollDot} />
            <span className={styles.scrollText}>Scroll to explore</span>
          </motion.div>
        </motion.div>

        {/* ── Right: 3-D tilt + glare on hover ── */}
        <div className={styles.heroRight}>
          {/* Perspective wrapper so tilt looks 3D */}
          <div
            className={styles.tiltScene}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <motion.div
              ref={cardRef}
              style={{ scale: heroImgScale, rotateX, rotateY }}
              className={styles.heroImgInner}
            >
              <Image
                src="/vehicles/supreme/supreme family.webp"
                alt="Supreme EV — Family"
                fill
                priority
                className={styles.heroImg}
                sizes="55vw"
                quality={90}
              />
              {/* Mouse-tracking glare spot */}
              <motion.div
                className={styles.glareSpot}
                style={{
                  background: useTransform(
                    [rawGlareX, rawGlareY],
                    ([gx, gy]) =>
                      `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.18) 0%, transparent 60%)`
                  ),
                }}
              />
            </motion.div>
          </div>
          <div className={styles.heroEdgeFade} />
        </div>
      </section>

      {/* ════ FEATURES & SPECS ═══════════════════════════════════ */}
      <section className={styles.specsSection}>
        <div className="container-xl">

          {/* Section heading */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className={styles.specsHeader}
          >
            <p className="eyebrow">02 &mdash; Specs</p>
            <h2 className={styles.specsSectionTitle}>
              Features &amp; <span className={styles.accent}>Specifications</span>
            </h2>
          </motion.div>

          {/* ── Key Features: 5 cards in a row ── */}
          <div className={styles.featureGrid}>
            {keyFeatures.map(({ icon: Icon, label, desc }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.08 }}
                className={styles.featureCard}
              >
                <div className={styles.featureCardTop}>
                  <div className={styles.featureIcon}>
                    <Icon size={20} />
                  </div>
                  <span className={styles.featureIncluded}>Included</span>
                </div>
                <p className={styles.featureLabel}>{label}</p>
                <p className={styles.featureDesc}>{desc}</p>
              </motion.div>
            ))}
          </div>

          {/* ── Tabbed spec groups ── */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className={styles.tabsWrapper}
          >
            {/* Tab buttons */}
            <div className={styles.tabs}>
              {specGroups.map((sg, i) => (
                <button
                  key={sg.group}
                  onClick={() => setActiveTab(i)}
                  className={styles.tabBtn}
                  data-active={activeTab === i}
                  style={{ "--tab-color": sg.color } as React.CSSProperties}
                >
                  {sg.group}
                </button>
              ))}
            </div>

            {/* Tab panel */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
                className={styles.tabPanel}
                style={{ "--tab-color": specGroups[activeTab].color } as React.CSSProperties}
              >
                <div className={styles.tabPanelGrid}>
                  {specGroups[activeTab].items.map((item, ii) => (
                    <div key={item.label} className={styles.tabItem}>
                      <span className={styles.tabItemIdx}>{String(ii + 1).padStart(2, "0")}</span>
                      <div className={styles.tabItemBody}>
                        <span className={styles.tabItemLabel}>{item.label}</span>
                        <span className={styles.tabItemValue}>{item.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Who is this for */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className={styles.whoForCard}
          >
            <p className={styles.whoForLabel}>Who is this for?</p>
            <p className={styles.whoForText}>
              The Tier-2 working professional, 25&ndash;50, who commutes daily and
              wants the most capable, best-looking vehicle &mdash; without RTO
              paperwork or petrol bills.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ════ GALLERY ════════════════════════════════════════════ */}
      <section className={styles.gallerySection}>

        {/* Heading inside container */}
        <div className="container-xl">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className={styles.galleryHeading}
          >
            <div>
              <div className={styles.galleryLabelRow}>
                <span className={styles.galleryLabelLine} />
                <span className={styles.galleryLabelText}>03 &mdash; Gallery</span>
              </div>
              <h2 className={styles.galleryTitle}>
                See the <span className={styles.accent}>Supreme</span> up close.
              </h2>
            </div>
            <p className={styles.galleryCounter}>
              {activeGallery + 1} / {galleryImages.length}
            </p>
          </motion.div>
        </div>

        {/* Full-width spotlight grid */}
        <div className={styles.galleryGrid}>

          {/* LEFT — large spotlight */}
          <div className={styles.gallerySpotlight}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeGallery}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                className={styles.gallerySpotlightInner}
              >
                <Image
                  src={galleryImages[activeGallery].src}
                  alt={galleryImages[activeGallery].label}
                  fill
                  className={styles.gallerySpotlightImg}
                  sizes="(max-width: 768px) 100vw, 70vw"
                  quality={92}
                />
                <div className={styles.gallerySpotlightBottom}>
                  <span className={styles.gallerySpotlightLabel}>
                    <Camera size={13} />
                    {galleryImages[activeGallery].label}
                  </span>
                  <div className={styles.galleryDots}>
                    {galleryImages.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveGallery(i)}
                        className={styles.galleryDot}
                        data-active={activeGallery === i}
                        aria-label={`View image ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT — stacked thumbnail panels */}
          <div className={styles.galleryPanels}>
            {galleryImages.map((img, i) => (
              <motion.button
                key={img.src}
                initial={{ opacity: 0, x: 32 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                onClick={() => setActiveGallery(i)}
                className={styles.galleryPanelItem}
                data-active={activeGallery === i}
                aria-label={`View ${img.label}`}
              >
                <Image
                  src={img.src}
                  alt={img.label}
                  fill
                  className={styles.galleryPanelImg}
                  sizes="300px"
                  quality={70}
                />
                <div className={styles.galleryPanelOverlay} />
                <span className={styles.galleryPanelLabel}>{img.label}</span>
              </motion.button>
            ))}
          </div>

        </div>
      </section>


      {/* ════ BOTTOM CTA ═════════════════════════════════════════ */}
      <section className={styles.ctaSection}>
        <div className="container-xl">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className={styles.ctaBox}
          >
            <div className={styles.ctaBoxLeft}>
              <p className="eyebrow">Ready to ride?</p>
              <h2 className={styles.ctaBoxTitle}>
                Book your <span className={styles.accent}>Supreme</span> today.
              </h2>
              <p className={styles.ctaBoxSub}>
                Visit our showroom in Rajkot or get a callback from our team.
              </p>
            </div>
            <div className={styles.ctaBoxActions}>
              <a href="/#testride" className="btn-primary">
                Book a Test Ride
                <ChevronRight size={15} />
              </a>
              <Link href="/#vehicles" className="btn-ghost">
                View All Models
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  );
}
