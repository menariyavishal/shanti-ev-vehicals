"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Minus, ChevronRight, ArrowLeft } from "lucide-react";
import Link from "next/link";
import styles from "./Comparison.module.css";

/* ─── Vehicle Data ────────────────────────────────────────────── */
interface Model {
  id: string;
  name: string;
  tagline: string;
  category: string;
  color: string;
  price: string;
  range: string;
  topSpeed: string;
  chargingTime: string;
  motor: string;
  battery: string;
  payload: string;
  reverseGear: boolean;
  antiTheft: boolean;
  cruiseMode: boolean;
  digitalDash: boolean;
  hydraulicShock: boolean;
  warranty: string;
  rtoFree: boolean;
}

const models: Model[] = [
  {
    id: "actone",
    name: "Actone",
    tagline: "City Dominator",
    category: "Scooter",
    color: "#2A6EBB",
    price: "₹49,999",
    range: "100+ KM",
    topSpeed: "75 KM/H",
    chargingTime: "4 Hours",
    motor: "BLDC Hub Motor",
    battery: "Li-Ion 60V",
    payload: "150 KG",
    reverseGear: true,
    antiTheft: true,
    cruiseMode: false,
    digitalDash: true,
    hydraulicShock: true,
    warranty: "3 Years",
    rtoFree: true,
  },
  {
    id: "glyder",
    name: "Glyder",
    tagline: "Glide Every Turn",
    category: "Scooter",
    color: "#4CAF50",
    price: "₹51,999",
    range: "110+ KM",
    topSpeed: "75 KM/H",
    chargingTime: "4 Hours",
    motor: "BLDC Hub Motor",
    battery: "Li-Ion 60V",
    payload: "150 KG",
    reverseGear: true,
    antiTheft: true,
    cruiseMode: false,
    digitalDash: true,
    hydraulicShock: true,
    warranty: "3 Years",
    rtoFree: true,
  },
  {
    id: "megna",
    name: "Megna",
    tagline: "Effortless Every Day",
    category: "Scooter",
    color: "#E91E63",
    price: "₹39,999",
    range: "100+ KM",
    topSpeed: "70 KM/H",
    chargingTime: "4 Hours",
    motor: "BLDC Hub Motor",
    battery: "Li-Ion 60V",
    payload: "140 KG",
    reverseGear: false,
    antiTheft: true,
    cruiseMode: false,
    digitalDash: false,
    hydraulicShock: true,
    warranty: "3 Years",
    rtoFree: true,
  },
  {
    id: "megna-plus",
    name: "Megna Plus",
    tagline: "More Power, More Range",
    category: "Scooter",
    color: "#9C27B0",
    price: "₹55,999",
    range: "120+ KM",
    topSpeed: "75 KM/H",
    chargingTime: "4 Hours",
    motor: "BLDC Hub Motor",
    battery: "Li-Ion 72V",
    payload: "150 KG",
    reverseGear: true,
    antiTheft: true,
    cruiseMode: true,
    digitalDash: true,
    hydraulicShock: true,
    warranty: "3 Years",
    rtoFree: true,
  },
  {
    id: "supra",
    name: "Supra",
    tagline: "Built for the Bold",
    category: "Scooter",
    color: "#FF5722",
    price: "₹58,999",
    range: "115+ KM",
    topSpeed: "80 KM/H",
    chargingTime: "4 Hours",
    motor: "BLDC Hub Motor",
    battery: "Li-Ion 72V",
    payload: "160 KG",
    reverseGear: true,
    antiTheft: true,
    cruiseMode: true,
    digitalDash: true,
    hydraulicShock: true,
    warranty: "3 Years",
    rtoFree: true,
  },
  {
    id: "supreme",
    name: "Supreme",
    tagline: "Pinnacle of Electric",
    category: "Scooter",
    color: "#F0A500",
    price: "₹62,999",
    range: "120+ KM",
    topSpeed: "80 KM/H",
    chargingTime: "4 Hours",
    motor: "BLDC Hub Motor",
    battery: "Li-Ion 72V",
    payload: "160 KG",
    reverseGear: true,
    antiTheft: true,
    cruiseMode: true,
    digitalDash: true,
    hydraulicShock: true,
    warranty: "3 Years",
    rtoFree: true,
  },
  {
    id: "tejas",
    name: "Tejas",
    tagline: "Speed Meets Elegance",
    category: "Moped",
    color: "#00BCD4",
    price: "₹47,999",
    range: "110+ KM",
    topSpeed: "75 KM/H",
    chargingTime: "4 Hours",
    motor: "BLDC Hub Motor",
    battery: "Li-Ion 60V",
    payload: "150 KG",
    reverseGear: true,
    antiTheft: true,
    cruiseMode: false,
    digitalDash: true,
    hydraulicShock: true,
    warranty: "3 Years",
    rtoFree: true,
  },
  {
    id: "windy",
    name: "Windy",
    tagline: "Light, Nimble, Unstoppable",
    category: "Moped",
    color: "#8BC34A",
    price: "₹43,999",
    range: "100+ KM",
    topSpeed: "70 KM/H",
    chargingTime: "4 Hours",
    motor: "BLDC Hub Motor",
    battery: "Li-Ion 60V",
    payload: "140 KG",
    reverseGear: false,
    antiTheft: true,
    cruiseMode: false,
    digitalDash: false,
    hydraulicShock: true,
    warranty: "3 Years",
    rtoFree: true,
  },
];

/* ─── Spec rows ─────────────────────────────────────────────── */
type SpecType = "text" | "bool";

interface SpecRow {
  key: keyof Model;
  label: string;
  type: SpecType;
  highlight?: boolean; // highlight best value
}

const specRows: SpecRow[] = [
  { key: "price",         label: "Starting Price",      type: "text", highlight: true },
  { key: "range",         label: "Range",               type: "text", highlight: true },
  { key: "topSpeed",      label: "Top Speed",           type: "text", highlight: true },
  { key: "chargingTime",  label: "Charging Time",       type: "text" },
  { key: "motor",         label: "Motor",               type: "text" },
  { key: "battery",       label: "Battery",             type: "text" },
  { key: "payload",       label: "Max Payload",         type: "text" },
  { key: "warranty",      label: "Warranty",            type: "text" },
  { key: "rtoFree",       label: "RTO Free",            type: "bool" },
  { key: "reverseGear",   label: "Reverse Gear",        type: "bool" },
  { key: "antiTheft",     label: "Anti-Theft Alarm",    type: "bool" },
  { key: "cruiseMode",    label: "Cruise Mode",         type: "bool" },
  { key: "digitalDash",   label: "Digital Dashboard",   type: "bool" },
  { key: "hydraulicShock",label: "Hydraulic Shockers",  type: "bool" },
];

/* ─── Helper to find best text value among selected models ── */
function getBestValues(key: keyof Model, selected: Model[]): Set<string> {
  const vals = selected
    .map((m) => m[key] as string)
    .filter((v) => typeof v === "string");
  // Best = highest numeric prefix
  const withNums = vals.map((v) => {
    const match = v.match(/\d+/);
    return { v, n: match ? parseInt(match[0]) : 0 };
  });
  const max = Math.max(...withNums.map((x) => x.n));
  if (max === 0) return new Set();
  return new Set(withNums.filter((x) => x.n === max).map((x) => x.v));
}

/* ─── Cell rendering ─────────────────────────────────────────── */
function BoolCell({ value }: { value: boolean }) {
  return value ? (
    <span className={styles.boolTrue}>
      <Check size={14} strokeWidth={2.5} />
    </span>
  ) : (
    <span className={styles.boolFalse}>
      <X size={14} strokeWidth={2.5} />
    </span>
  );
}

/* ─── Main Component ─────────────────────────────────────────── */
export function Comparison() {
  const [selected, setSelected] = useState<string[]>(["actone", "glyder", "supra", "supreme"]);

  const selectedModels = models.filter((m) => selected.includes(m.id));

  const toggleModel = (id: string) => {
    if (selected.includes(id)) {
      if (selected.length <= 2) return; // min 2
      setSelected(selected.filter((s) => s !== id));
    } else {
      if (selected.length >= 4) {
        // replace oldest
        setSelected([...selected.slice(1), id]);
      } else {
        setSelected([...selected, id]);
      }
    }
  };

  return (
    <section className={styles.section} aria-label="Model Comparison">
      <div className="container-xl">
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className={styles.backLink}
        >
          <Link href="/" className={styles.backBtn}>
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className={styles.header}
        >
          <p className="eyebrow">Compare Models</p>
          <h1 className={styles.heading}>
            Find your perfect{" "}
            <span style={{ color: "var(--accent)" }}>Shanti EV.</span>
          </h1>
          <p className={styles.subtext}>
            Select up to 4 models to compare side by side. Highlighted cells show the best value in each category.
          </p>
        </motion.div>

        {/* Model Picker */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={styles.picker}
          role="group"
          aria-label="Select models to compare"
        >
          {models.map((m) => {
            const isSelected = selected.includes(m.id);
            return (
              <button
                key={m.id}
                onClick={() => toggleModel(m.id)}
                className={styles.pickerBtn}
                style={{
                  borderColor: isSelected ? m.color : "var(--border)",
                  background: isSelected ? `${m.color}18` : "var(--bg-card)",
                  color: isSelected ? m.color : "var(--text-secondary)",
                }}
                aria-pressed={isSelected}
                title={`${isSelected ? "Remove" : "Add"} ${m.name}`}
              >
                <span
                  className={styles.pickerDot}
                  style={{ background: m.color }}
                />
                {m.name}
                {m.category === "Moped" && (
                  <span className={styles.pickerTag}>Moped</span>
                )}
              </button>
            );
          })}
        </motion.div>

        <p className={styles.pickerHint}>
          {selected.length} of 4 models selected.{" "}
          {selected.length < 2 && "Select at least 2 models."}
        </p>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={styles.tableWrap}
        >
          <div className={styles.tableScroll}>
            <table className={styles.table} role="table" aria-label="Model comparison table">
              <thead>
                <tr>
                  {/* Spec column header */}
                  <th className={styles.specCol} scope="col">
                    Specification
                  </th>
                  <AnimatePresence>
                    {selectedModels.map((m) => (
                      <motion.th
                        key={m.id}
                        scope="col"
                        className={styles.modelCol}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className={styles.modelHeader}>
                          <div
                            className={styles.modelColorDot}
                            style={{ background: m.color }}
                          />
                          <div>
                            <p className={styles.modelName}>{m.name}</p>
                            <p
                              className={styles.modelTagline}
                              style={{ color: m.color }}
                            >
                              {m.tagline}
                            </p>
                            <span className={styles.modelCat}>{m.category}</span>
                          </div>
                        </div>
                        <a
                          href="#testride"
                          className={styles.modelCta}
                          style={{
                            background: m.color,
                            color: "#08080E",
                          }}
                        >
                          Test Ride
                          <ChevronRight size={12} strokeWidth={2.5} />
                        </a>
                      </motion.th>
                    ))}
                  </AnimatePresence>
                </tr>
              </thead>

              <tbody>
                {specRows.map((row, rowIdx) => {
                  const bestVals =
                    row.type === "text" && row.highlight
                      ? getBestValues(row.key, selectedModels)
                      : new Set<string>();

                  return (
                    <tr
                      key={row.key}
                      className={rowIdx % 2 === 0 ? styles.rowEven : styles.rowOdd}
                    >
                      <td className={styles.specLabel}>{row.label}</td>
                      {selectedModels.map((m) => {
                        const val = m[row.key];
                        const isBest =
                          row.type === "text" &&
                          row.highlight &&
                          bestVals.has(val as string);

                        return (
                          <td
                            key={m.id}
                            className={`${styles.specVal} ${isBest ? styles.specBest : ""}`}
                          >
                            {row.type === "bool" ? (
                              <BoolCell value={val as boolean} />
                            ) : (
                              <span
                                style={isBest ? { color: "#4CAF50", fontWeight: 700 } : {}}
                              >
                                {val as string}
                                {isBest && (
                                  <span className={styles.bestBadge}>Best</span>
                                )}
                              </span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={styles.bottomCta}
        >
          <h3>Ready to make your choice?</h3>
          <p>Book a free test ride for any model. Our team will help you decide.</p>
          <div className={styles.ctaBtns}>
            <a href="/#testride" className="btn-primary">
              Book a Test Ride
              <ChevronRight size={15} />
            </a>
            <Link href="/" className="btn-ghost">
              <ArrowLeft size={15} />
              Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
