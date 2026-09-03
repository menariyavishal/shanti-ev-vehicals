"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import {
  ArrowLeft, Zap, Shield, RotateCcw, Usb, ParkingSquare,
  ChevronRight, MessageCircle, Camera,
} from "lucide-react";
import styles from "../supreme/supreme.module.css";

const keyFeatures = [
  { icon: Shield,        label: "Anti-Theft Alarm",  desc: "Built-in alarm system"    },
  { icon: RotateCcw,     label: "Central Locking",   desc: "One-touch remote lock"    },
  { icon: ParkingSquare, label: "Parking Switch",    desc: "Safe parking mode"        },
  { icon: Zap,           label: "Reverse Gear",      desc: "Easy reverse control"     },
  { icon: Usb,           label: "USB Charger",       desc: "Charge on the go"         },
];

const specGroups = [
  {
    group: "Electrical",
    color: "#F0A500",
    items: [
      { label: "Speedometer",   value: "Digital"                               },
      { label: "Battery",       value: "Lead Acid / Lithium"                   },
      { label: "Charger",       value: "Micro Charger With Auto CutOff"        },
      { label: "Charging Time", value: "Lithium: 3–5 Hrs · Lead Acid: 6–8 Hrs" },
      { label: "Headlight",     value: "LED Headlamp"                          },
    ],
  },
  {
    group: "Motor / Chassis",
    color: "#F0A500",
    items: [
      { label: "Motor",            value: "Highly Insulated BLDC Motor"         },
      { label: "Speed",            value: "Low Speed"                           },
      { label: "Chassis",          value: "High Strength Tubular Frame"         },
      { label: "Front Suspension", value: "Front Hydraulic Telescopic"          },
      { label: "Rear Suspension",  value: "Rear Double Shocker with Dual Tube"  },
    ],
  },
  {
    group: "Brake / Tyre / Weight",
    color: "#F0A500",
    items: [
      { label: "Brake System", value: "F-Disc / R-Disc"      },
      { label: "Tyres",        value: "Tubeless"             },
      { label: "Tyre Size",    value: 'Front-12″ · Rear-12″' },
      { label: "Weight",       value: "100 Kg"               },
    ],
  },
];

const galleryImages = [
  { src: "/vehicles/glyder/Glyder-Front.jpeg",   label: "Front View"    },
  { src: "/vehicles/glyder/Glyder-Back.webp",    label: "Rear View"     },
  { src: "/vehicles/glyder/Glyder-Side.webp",    label: "Side View"     },
  { src: "/vehicles/glyder/Glyder-Side-1.webp",  label: "Side View 2"   },
];

export default function GlyderPage() {
  const heroRef  = useRef<HTMLDivElement>(null);
  const cardRef  = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroImgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const heroOpacity  = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const rawGlareX  = useMotionValue(50);
  const rawGlareY  = useMotionValue(50);
  const rotateX = useSpring(rawRotateX, { stiffness: 200, damping: 22 });
  const rotateY = useSpring(rawRotateY, { stiffness: 200, damping: 22 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top)  / rect.height;
    rawRotateX.set((y - 0.5) * -16);
    rawRotateY.set((x - 0.5) *  16);
    rawGlareX.set(x * 100);
    rawGlareY.set(y * 100);
  };
  const handleMouseLeave = () => {
    rawRotateX.set(0); rawRotateY.set(0);
    rawGlareX.set(50); rawGlareY.set(50);
  };

  const [activeGallery, setActiveGallery] = useState(0);
  const [activeTab,     setActiveTab]     = useState(0);

  return (
    <main className={styles.page}>
      <section ref={heroRef} className={styles.hero}>
        <motion.div style={{ opacity: heroOpacity }} className={styles.heroLeft}>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <Link href="/#vehicles" className={styles.backLink}><ArrowLeft size={15} />All Models</Link>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }} className={styles.heroHeadBlock}>
            <h1 className={styles.heroTitle}>Glyder</h1>
            <p className={styles.heroTagline}>Power and precision.</p>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.35 }} className={styles.priceRow}>
              <span className={styles.priceAmount}>&#8377;65,000</span>
              <span className={styles.priceOnwards}>onwards</span>
            </motion.div>
          </motion.div>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }} className={styles.heroDesc}>
            Precision-built for the rider who values comfort and style. Disc brakes, a 100&nbsp;kg-rated frame, showroom colours — performance at an accessible price.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.55 }} className={styles.heroCtas}>
            <a href="https://wa.me/919876543210?text=Hi%2C+I%27m+interested+in+the+Glyder+EV" target="_blank" rel="noopener noreferrer" className={styles.ctaWhatsapp}>
              <MessageCircle size={16} />Get Best Price on WhatsApp
            </a>
            <a href="/#testride" className={styles.ctaTest}>Book a Test Ride</a>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1, duration: 0.8 }} className={styles.scrollHint}>
            <span className={styles.scrollDot} /><span className={styles.scrollText}>Scroll to explore</span>
          </motion.div>
        </motion.div>

        <div className={styles.heroRight}>
          <div className={styles.tiltScene} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
            <motion.div ref={cardRef} style={{ scale: heroImgScale, rotateX, rotateY }} className={styles.heroImgInner}>
              <Image src="/vehicles/glyder/Glyder family.webp" alt="Glyder EV" fill priority className={styles.heroImg} sizes="55vw" quality={90} />
              <motion.div className={styles.glareSpot} style={{ background: useTransform([rawGlareX, rawGlareY], ([gx, gy]) => `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.18) 0%, transparent 60%)`) }} />
            </motion.div>
          </div>
          <div className={styles.heroEdgeFade} />
        </div>
      </section>

      <section className={styles.specsSection}>
        <div className="container-xl">
          <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className={styles.specsHeader}>
            <p className="eyebrow">02 &mdash; Specs</p>
            <h2 className={styles.specsSectionTitle}>Features &amp; <span className={styles.accent}>Specifications</span></h2>
          </motion.div>
          <div className={styles.featureGrid}>
            {keyFeatures.map(({ icon: Icon, label, desc }, i) => (
              <motion.div key={label} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: i * 0.08 }} className={styles.featureCard}>
                <div className={styles.featureCardTop}>
                  <div className={styles.featureIcon}><Icon size={20} /></div>
                  <span className={styles.featureIncluded}>Included</span>
                </div>
                <p className={styles.featureLabel}>{label}</p>
                <p className={styles.featureDesc}>{desc}</p>
              </motion.div>
            ))}
          </div>
          <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }} className={styles.tabsWrapper}>
            <div className={styles.tabs}>
              {specGroups.map((sg, i) => (
                <button key={sg.group} onClick={() => setActiveTab(i)} className={styles.tabBtn} data-active={activeTab === i} style={{ "--tab-color": sg.color } as React.CSSProperties}>{sg.group}</button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={activeTab} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35 }} className={styles.tabPanel} style={{ "--tab-color": specGroups[activeTab].color } as React.CSSProperties}>
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
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className={styles.whoForCard}>
            <p className={styles.whoForLabel}>Who is this for?</p>
            <p className={styles.whoForText}>The style-conscious professional who wants a clean, premium look and dependable braking for the daily hustle.</p>
          </motion.div>
        </div>
      </section>

      <section className={styles.gallerySection}>
        <div className="container-xl">
          <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className={styles.galleryHeading}>
            <div>
              <div className={styles.galleryLabelRow}><span className={styles.galleryLabelLine} /><span className={styles.galleryLabelText}>03 &mdash; Gallery</span></div>
              <h2 className={styles.galleryTitle}>See the <span className={styles.accent}>Glyder</span> up close.</h2>
            </div>
            <p className={styles.galleryCounter}>{activeGallery + 1} / {galleryImages.length}</p>
          </motion.div>
        </div>
        <div className={styles.galleryGrid}>
          <div className={styles.gallerySpotlight}>
            <AnimatePresence mode="wait">
              <motion.div key={activeGallery} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }} className={styles.gallerySpotlightInner}>
                <Image src={galleryImages[activeGallery].src} alt={galleryImages[activeGallery].label} fill className={styles.gallerySpotlightImg} sizes="(max-width: 768px) 100vw, 70vw" quality={92} />
                <div className={styles.gallerySpotlightBottom}>
                  <span className={styles.gallerySpotlightLabel}><Camera size={13} />{galleryImages[activeGallery].label}</span>
                  <div className={styles.galleryDots}>
                    {galleryImages.map((_, i) => (<button key={i} onClick={() => setActiveGallery(i)} className={styles.galleryDot} data-active={activeGallery === i} aria-label={`View image ${i + 1}`} />))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className={styles.galleryPanels}>
            {galleryImages.map((img, i) => (
              <motion.button key={img.src} initial={{ opacity: 0, x: 32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }} onClick={() => setActiveGallery(i)} className={styles.galleryPanelItem} data-active={activeGallery === i} aria-label={`View ${img.label}`}>
                <Image src={img.src} alt={img.label} fill className={styles.galleryPanelImg} sizes="300px" quality={70} />
                <div className={styles.galleryPanelOverlay} />
                <span className={styles.galleryPanelLabel}>{img.label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className="container-xl">
          <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className={styles.ctaBox}>
            <div className={styles.ctaBoxLeft}>
              <p className="eyebrow">Ready to ride?</p>
              <h2 className={styles.ctaBoxTitle}>Book your <span className={styles.accent}>Glyder</span> today.</h2>
              <p className={styles.ctaBoxSub}>Visit our showroom in Rajkot or get a callback from our team.</p>
            </div>
            <div className={styles.ctaBoxActions}>
              <a href="/#testride" className="btn-primary">Book a Test Ride<ChevronRight size={15} /></a>
              <Link href="/#vehicles" className="btn-ghost">View All Models</Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
