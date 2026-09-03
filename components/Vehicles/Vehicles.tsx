"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, X, Gauge, Zap, Clock, Battery, ChevronLeft, BarChart2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./Vehicles.module.css";

/* ─── Types ──────────────────────────────────────────────────── */
interface VehicleSpec {
  range:        string;
  topSpeed:     string;
  chargingTime: string;
  motor:        string;
  battery:      string;
  payload:      string;
}

interface Vehicle {
  id:          string;
  name:        string;
  tagline:     string;
  category:    string;
  categoryKey: "scooter" | "moped";
  range:       string;
  topSpeed:    string;
  chargingTime:string;
  images:      string[];
  specs:       VehicleSpec;
  color:       string;
  description: string;
  price:       string;
}

/* ─── Data ───────────────────────────────────────────────────── */
const vehicles: Vehicle[] = [
  {
    id:          "actone",
    name:        "Actone",
    tagline:     "Long ride, easy charge.",
    category:    "Electric Scooter",
    categoryKey: "scooter",
    range:       "100+ KM",
    topSpeed:    "75 KM/H",
    chargingTime:"4 Hrs",
    color:       "#2A6EBB",
    price:       "₹60,000",
    description: "Urban-bred and performance-ready. The Actone takes on every city challenge with a powerful BLDC motor, agile handling, and a sleek profile that commands the road.",
    images: [
      "/vehicles/actone/actoneev.webp",
      "/vehicles/actone/Actone-Side-1.webp",
      "/vehicles/actone/Actone-Front-1.jpeg",
      "/vehicles/actone/Actone-Rear.webp",
    ],
    specs: {
      range:        "100+ KM",
      topSpeed:     "75 KM/H",
      chargingTime: "4 Hours",
      motor:        "BLDC Hub Motor",
      battery:      "Lithium-Ion 60V",
      payload:      "150 KG",
    },
  },
  {
    id:          "glyder",
    name:        "Glyder",
    tagline:     "Power and precision.",
    category:    "Electric Scooter",
    categoryKey: "scooter",
    range:       "110+ KM",
    topSpeed:    "75 KM/H",
    chargingTime:"4 Hrs",
    color:       "#4CAF50",
    price:       "₹65,000",
    description: "Designed for the rider who values comfort and style in equal measure. The Glyder's aerodynamic silhouette cuts through traffic with effortless elegance.",
    images: [
      "/vehicles/glyder/Glyder family.webp",
      "/vehicles/glyder/Glyder-Side-1.webp",
      "/vehicles/glyder/Glyder-Front.jpeg",
      "/vehicles/glyder/Glyder-Back.webp",
    ],
    specs: {
      range:        "110+ KM",
      topSpeed:     "75 KM/H",
      chargingTime: "4 Hours",
      motor:        "BLDC Hub Motor",
      battery:      "Lithium-Ion 60V",
      payload:      "150 KG",
    },
  },
  {
    id:          "megna",
    name:        "Megna",
    tagline:     "Comfort bhi, style bhi.",
    category:    "Electric Scooter",
    categoryKey: "scooter",
    range:       "100+ KM",
    topSpeed:    "70 KM/H",
    chargingTime:"4 Hrs",
    color:       "#E91E63",
    price:       "₹39,999",
    description: "Your everyday companion for city commutes. Lightweight, reliable, and packed with smart features — the Megna makes electric mobility approachable and enjoyable.",
    images: [
      "/vehicles/megna/Megnane.webp",
      "/vehicles/megna/Megna-Side.jpeg",
      "/vehicles/megna/Megna-Front.webp",
      "/vehicles/megna/Megna-Back.webp",
    ],
    specs: {
      range:        "100+ KM",
      topSpeed:     "70 KM/H",
      chargingTime: "4 Hours",
      motor:        "BLDC Hub Motor",
      battery:      "Lithium-Ion 60V",
      payload:      "140 KG",
    },
  },
  {
    id:          "megna-plus",
    name:        "Megna Plus",
    tagline:     "Choose comfort, choose more.",
    category:    "Electric Scooter",
    categoryKey: "scooter",
    range:       "120+ KM",
    topSpeed:    "75 KM/H",
    chargingTime:"4 Hrs",
    color:       "#9C27B0",
    price:       "₹45,000",
    description: "Everything you love about the Megna — upgraded. Larger battery, enhanced motor output, and premium finishes that set the Megna Plus apart from the crowd.",
    images: [
      "/vehicles/megna-plus/megnaplusev.webp",
      "/vehicles/megna-plus/MegnaPlus-Side.webp",
      "/vehicles/megna-plus/megna-plus-ev-front.jpeg",
      "/vehicles/megna-plus/MegnaPlus-Rear.webp",
    ],
    specs: {
      range:        "120+ KM",
      topSpeed:     "75 KM/H",
      chargingTime: "4 Hours",
      motor:        "BLDC Hub Motor",
      battery:      "Lithium-Ion 72V",
      payload:      "150 KG",
    },
  },
  {
    id:          "supra",
    name:        "Supra",
    tagline:     "Stronger, longer rides.",
    category:    "Electric Scooter",
    categoryKey: "scooter",
    range:       "115+ KM",
    topSpeed:    "80 KM/H",
    chargingTime:"4 Hrs",
    color:       "#FF5722",
    price:       "₹70,000",
    description: "The Supra is for those who refuse to compromise. Sport-tuned suspension, performance-grade motor, and an aggressive stance that turns heads at every intersection.",
    images: [
      "/vehicles/supra/supra family.webp",
      "/vehicles/supra/Supra-side.webp",
      "/vehicles/supra/Supra-front.webp",
      "/vehicles/supra/Supra-Rear.webp",
    ],
    specs: {
      range:        "115+ KM",
      topSpeed:     "80 KM/H",
      chargingTime: "4 Hours",
      motor:        "BLDC Hub Motor",
      battery:      "Lithium-Ion 72V",
      payload:      "160 KG",
    },
  },
  {
    id:          "supreme",
    name:        "Supreme",
    tagline:     "Own the road.",
    category:    "Electric Scooter",
    categoryKey: "scooter",
    range:       "120+ KM",
    topSpeed:    "80 KM/H",
    chargingTime:"4 Hrs",
    color:       "#F0A500",
    price:       "₹75,000",
    description: "At the top of the Shanti lineup sits the Supreme. Premium materials, cutting-edge technology, and the highest specifications — crafted for those who accept nothing but the best.",
    images: [
      "/vehicles/supreme/supreme family.webp",
      "/vehicles/supreme/Supreme-side.webp",
      "/vehicles/supreme/supreme-ev-front.webp",
      "/vehicles/supreme/Supreme-Rear.webp",
    ],
    specs: {
      range:        "120+ KM",
      topSpeed:     "80 KM/H",
      chargingTime: "4 Hours",
      motor:        "BLDC Hub Motor",
      battery:      "Lithium-Ion 72V",
      payload:      "160 KG",
    },
  },
  {
    id:          "tejas",
    name:        "Tejas",
    tagline:     "Feel the power.",
    category:    "Electric Moped",
    categoryKey: "moped",
    range:       "110+ KM",
    topSpeed:    "75 KM/H",
    chargingTime:"4 Hrs",
    color:       "#00BCD4",
    price:       "₹65,000",
    description: "Inspired by the brilliance of a shooting star, the Tejas combines sporty aerodynamics with effortless comfort. A head-turner built for the discerning commuter.",
    images: [
      "/vehicles/tejas/tejasev.webp",
      "/vehicles/tejas/Tejas-Side.jpeg",
      "/vehicles/tejas/tejas-ev-front.webp",
      "/vehicles/tejas/Tejas-Rear.webp",
    ],
    specs: {
      range:        "110+ KM",
      topSpeed:     "75 KM/H",
      chargingTime: "4 Hours",
      motor:        "BLDC Hub Motor",
      battery:      "Lithium-Ion 60V",
      payload:      "150 KG",
    },
  },
  {
    id:          "windy",
    name:        "Windy",
    tagline:     "Ride the freedom.",
    category:    "Electric Moped",
    categoryKey: "moped",
    range:       "100+ KM",
    topSpeed:    "70 KM/H",
    chargingTime:"4 Hrs",
    color:       "#8BC34A",
    price:       "₹65,000",
    description: "The Windy is your lightweight city companion. Compact dimensions, agile handling, and breezy performance make it the perfect partner for urban exploration.",
    images: [
      "/vehicles/windy/windy-ev.webp",
      "/vehicles/windy/Windy-Side.webp",
      "/vehicles/windy/windy-ev-front.webp",
      "/vehicles/windy/Windy-Rear.webp",
    ],
    specs: {
      range:        "100+ KM",
      topSpeed:     "70 KM/H",
      chargingTime: "4 Hours",
      motor:        "BLDC Hub Motor",
      battery:      "Lithium-Ion 60V",
      payload:      "140 KG",
    },
  },
];

/* ─── Vehicle Card ───────────────────────────────────────────── */
interface VehicleCardProps {
  vehicle:  Vehicle;
  index:    number;
  onExplore:(v: Vehicle) => void;
}

// IDs that have their own detail page
const DETAIL_PAGE_IDS: Record<string, string> = {
  supreme:    "/vehicles/supreme",
  glyder:     "/vehicles/glyder",
  tejas:      "/vehicles/tejas",
  supra:      "/vehicles/supra",
  windy:      "/vehicles/windy",
  megna:      "/vehicles/megna",
  actone:     "/vehicles/actone",
  "megna-plus": "/vehicles/megna-plus",
};

function VehicleCard({ vehicle, index, onExplore }: VehicleCardProps) {
  const router = useRouter();

  const handleExplore = () => {
    const detailPath = DETAIL_PAGE_IDS[vehicle.id];
    if (detailPath) {
      // Rewrite current history entry to /#vehicles so browser Back lands there
      window.history.replaceState(null, "", "/#vehicles");
      router.push(detailPath);
    } else {
      onExplore(vehicle);
    }
  };
  const [imgIndex,  setImgIndex]  = useState(0);
  const [hovered,   setHovered]   = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const nextImage = useCallback(() => {
    setImgIndex((i) => (i + 1) % vehicle.images.length);
  }, [vehicle.images.length]);

  const prevImage = useCallback(() => {
    setImgIndex((i) => (i - 1 + vehicle.images.length) % vehicle.images.length);
  }, [vehicle.images.length]);

  useEffect(() => {
    if (hovered && vehicle.images.length > 1) {
      timerRef.current = setInterval(nextImage, 2200);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      if (!hovered) setTimeout(() => setImgIndex(0), 400);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [hovered, nextImage, vehicle.images.length]);

  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className={styles.card}
      onClick={handleExplore}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={`${vehicle.name} — ${vehicle.category}`}
      style={{ cursor: "pointer" }}
    >
      {/* Color accent top bar — unified accent yellow */}
      <div
        className={styles.colorBar}
        style={{ background: "var(--accent)" }}
      />

      {/* Image Area */}
      <div className={styles.imageArea}>
        <AnimatePresence mode="wait">
          <motion.div
            key={imgIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: hovered ? 1.04 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            className={styles.imageFrame}
          >
            <Image
              src={vehicle.images[imgIndex]}
              alt={`${vehicle.name} — view ${imgIndex + 1}`}
              fill
              className={styles.vehicleImg}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              quality={80}
            />
          </motion.div>
        </AnimatePresence>

        {/* Gradient overlay */}
        <div className={styles.imgOverlay} />

        {/* Category badge removed */}

        {/* Nav arrows on hover */}
        {hovered && vehicle.images.length > 1 && (
          <>
            <button
              className={`${styles.imgNav} ${styles.imgNavLeft}`}
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              aria-label="Previous image"
            >
              <ChevronLeft size={14} />
            </button>
            <button
              className={`${styles.imgNav} ${styles.imgNavRight}`}
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              aria-label="Next image"
            >
              <ChevronRight size={14} />
            </button>
          </>
        )}

        {/* Image dots */}
        {vehicle.images.length > 1 && (
          <div className={styles.imgDots} aria-hidden="true">
            {vehicle.images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setImgIndex(i); }}
                className={styles.dot}
                style={{
                  width: i === imgIndex ? "16px" : "5px",
                  background: i === imgIndex ? "var(--accent)" : "rgba(255,255,255,0.35)",
                }}
                aria-label={`View image ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className={styles.cardContent}>
        {/* Name */}
        <h3 className={styles.vehicleName}>{vehicle.name}</h3>

        {/* Small phrase / tagline */}
        <p className={styles.vehicleTagline}>{vehicle.tagline}</p>

        {/* Price */}
        <p className={styles.vehiclePrice}>
          <span className={styles.priceAmount}>{vehicle.price}</span>
          <span className={styles.priceOnwards}> onwards</span>
        </p>

        {/* Explore CTA */}
        <motion.button
          whileHover={{ x: 4 }}
          onClick={handleExplore}
          className={styles.exploreBtn}
          aria-label={`Explore ${vehicle.name} details`}
        >
          Explore Model
          <ChevronRight size={14} strokeWidth={2.5} />
        </motion.button>
      </div>
    </motion.article>
  );
}

/* ─── Vehicle Modal ──────────────────────────────────────────── */
interface VehicleModalProps {
  vehicle:  Vehicle | null;
  onClose:  () => void;
}

function VehicleModal({ vehicle, onClose }: VehicleModalProps) {
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    setImgIndex(0);
    if (vehicle) {
      document.body.style.overflow = "hidden";
    }
    return () => { document.body.style.overflow = ""; };
  }, [vehicle]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  if (!vehicle) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className={styles.modalBackdrop}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={`${vehicle.name} model details`}
      >
        <motion.div
          key="modal-panel"
          initial={{ opacity: 0, y: 60, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 60, scale: 0.96 }}
          transition={{ type: "spring", stiffness: 280, damping: 30 }}
          className={styles.modalPanel}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className={styles.modalHeader}>
            <div>
              <h2 className={styles.modalTitle}>{vehicle.name}</h2>
              <p className={styles.modalSub}>{vehicle.category}</p>
            </div>
            <button
              onClick={onClose}
              className={styles.modalClose}
              aria-label="Close details"
            >
              <X size={16} />
            </button>
          </div>

          {/* Color bar */}
          <div style={{ height: "3px", background: vehicle.color }} />

          {/* Image Gallery */}
          <div className={styles.modalGallery}>
            <AnimatePresence mode="wait">
              <motion.div
                key={imgIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className={styles.modalImgFrame}
              >
                <Image
                  src={vehicle.images[imgIndex]}
                  alt={`${vehicle.name} view ${imgIndex + 1}`}
                  fill
                  className="object-contain object-center p-4"
                  sizes="(max-width: 768px) 100vw, 768px"
                  quality={85}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Thumbnails */}
          <div className={styles.thumbStrip}>
            {vehicle.images.map((src, i) => (
              <button
                key={i}
                onClick={() => setImgIndex(i)}
                className={styles.thumb}
                style={{
                  border: `2px solid ${i === imgIndex ? vehicle.color : "var(--border)"}`,
                  opacity: i === imgIndex ? 1 : 0.5,
                }}
                aria-label={`View image ${i + 1}`}
              >
                <Image src={src} alt={`Thumbnail ${i + 1}`} fill className="object-cover" sizes="64px" />
              </button>
            ))}
          </div>

          {/* Content */}
          <div className={styles.modalContent}>
            <p className={styles.modalDesc}>{vehicle.description}</p>

            <h3 className="eyebrow" style={{ marginBottom: "1rem" }}>Specifications</h3>
            <div className={styles.specsGrid}>
              {[
                { icon: Gauge,   label: "Range",    val: vehicle.specs.range },
                { icon: Zap,     label: "Top Speed", val: vehicle.specs.topSpeed },
                { icon: Clock,   label: "Charging",  val: vehicle.specs.chargingTime },
                { icon: Battery, label: "Battery",   val: vehicle.specs.battery },
                { icon: Zap,     label: "Motor",     val: vehicle.specs.motor },
                { icon: Gauge,   label: "Payload",   val: vehicle.specs.payload },
              ].map(({ icon: Icon, label, val }) => (
                <div key={label} className={styles.specCard}>
                  <Icon size={14} style={{ color: "var(--accent)" }} className="mb-2" />
                  <div className={styles.specCardVal}>{val}</div>
                  <div className={styles.specCardLabel}>{label}</div>
                </div>
              ))}
            </div>

            <motion.a
              href="#testride"
              onClick={onClose}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary"
              style={{ display: "flex", justifyContent: "center", width: "100%" }}
            >
              Book a Test Ride — {vehicle.name}
              <ChevronRight size={16} />
            </motion.a>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ─── Main Vehicles Section ─────────────────────────────── */
type FilterKey = "all" | "scooter" | "moped";

export function Vehicles() {
  const [filter,   setFilter]   = useState<FilterKey>("all");
  const [selected, setSelected] = useState<Vehicle | null>(null);

  // Scroll to this section when URL hash is #vehicles (handles browser Back)
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash === "#vehicles") {
      const el = document.getElementById("vehicles");
      if (el) {
        // Small delay lets the page finish rendering before scrolling
        setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
      }
    }
  }, []);

  const filtered = filter === "all"
    ? vehicles
    : vehicles.filter((v) => v.categoryKey === filter);

  return (
    <section
      id="vehicles"
      className={styles.section}
      aria-labelledby="vehicles-heading"
    >
      <div className="container-xl">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className={styles.sectionHeader}
        >
          <div>
            <p className="eyebrow">02 — Our Vehicles</p>
            <h2 id="vehicles-heading" className={styles.sectionHeading}>
              The Shanti{" "}
              <span style={{ color: "var(--accent)" }}>Lineup.</span>
            </h2>
          </div>

          {/* Filter + Compare link */}
          <div className={styles.headerRight}>
            <div
              className={styles.filterGroup}
              role="group"
              aria-label="Filter vehicles by category"
            >
              {(["all", "scooter", "moped"] as FilterKey[]).map((key) => (
                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  className={styles.filterBtn}
                  style={{
                    background: filter === key ? "var(--accent)" : "transparent",
                    color: filter === key ? "var(--bg-primary)" : "var(--text-muted)",
                  }}
                  aria-pressed={filter === key}
                >
                  {key === "all" ? "All" : key.charAt(0).toUpperCase() + key.slice(1) + "s"}
                </button>
              ))}
            </div>
            <Link href="/comparison" className={styles.compareLink}>
              <BarChart2 size={14} />
              Compare All Models
            </Link>
          </div>
        </motion.div>

        {/* Vehicle Grid — 3 columns */}
        <motion.div
          layout
          className={styles.grid}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((vehicle, i) => (
              <motion.div
                key={vehicle.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <VehicleCard
                  vehicle={vehicle}
                  index={i}
                  onExplore={setSelected}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className={styles.bottomCta}
        >
          <a href="#testride" className="btn-ghost">
            Book a Test Ride for Any Model
            <ChevronRight size={15} />
          </a>
          <Link href="/comparison" className="btn-primary">
            <BarChart2 size={15} />
            Compare All 8 Models
          </Link>
        </motion.div>
      </div>

      {/* Modal */}
      {selected && (
        <VehicleModal
          vehicle={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  );
}
