"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle, ChevronRight, Calendar, Clock, User, Phone, Mail, Bike } from "lucide-react";

/* ─── Validation Schema ──────────────────────────────────────── */
const schema = z.object({
  fullName:  z.string().min(2, "Please enter your full name"),
  phone:     z.string().min(10, "Enter a valid 10-digit phone number").max(10, "Enter a valid 10-digit phone number"),
  email:     z.string().email("Please enter a valid email address"),
  vehicle:   z.string().min(1, "Please select a vehicle"),
  date:      z.string().min(1, "Please select a preferred date"),
  time:      z.string().min(1, "Please select a preferred time"),
});

type FormData = z.infer<typeof schema>;

const vehicleOptions = [
  "Shanti Actone", "Shanti Glyder", "Shanti Megna",
  "Shanti Megna Plus", "Shanti Supra", "Shanti Supreme",
  "Shanti Tejas", "Shanti Windy",
];

const timeSlots = [
  "10:00 AM – 11:00 AM",
  "11:00 AM – 12:00 PM",
  "12:00 PM – 01:00 PM",
  "02:00 PM – 03:00 PM",
  "03:00 PM – 04:00 PM",
  "04:00 PM – 05:00 PM",
  "05:00 PM – 06:00 PM",
];

/* ─── Input Field ────────────────────────────────────────────── */
interface FieldProps {
  icon:         React.ElementType;
  label:        string;
  id:           string;
  error?:       string;
  children:     React.ReactNode;
}

function Field({ icon: Icon, label, id, error, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-xs font-bold uppercase tracking-wider flex items-center gap-2"
        style={{ color: "var(--text-secondary)" }}
      >
        <Icon size={12} style={{ color: "var(--accent)" }} />
        {label}
      </label>
      {children}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs"
          style={{ color: "#EF4444" }}
          role="alert"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "var(--bg-card)",
  border: "1px solid var(--border)",
  borderRadius: "var(--radius-sm)",
  color: "var(--text-primary)",
  fontFamily: "var(--font-main)",
  fontSize: "0.9rem",
  padding: "0.75rem 1rem",
  outline: "none",
  transition: "border-color 0.2s",
};

/* ─── Component ──────────────────────────────────────────────── */
export function TestRide() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    // Frontend-only: simulate async submission
    await new Promise((res) => setTimeout(res, 1200));
    console.log("Test ride booking:", data);
    setSubmitted(true);
  };

  return (
    <section
      id="testride"
      className="section-pad relative overflow-hidden"
      style={{ background: "var(--bg-primary)" }}
      aria-labelledby="testride-heading"
    >
      {/* Accent glow */}
      <div
        className="absolute -top-32 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(240,165,0,0.07) 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="container-xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left — Copy */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:sticky lg:top-28"
          >
            <p className="eyebrow mb-5">04 — Experience</p>
            <h2
              id="testride-heading"
              className="section-heading mb-6"
              style={{ color: "var(--text-primary)" }}
            >
              Feel the
              <br />
              <span style={{ color: "var(--accent)" }}>Difference.</span>
            </h2>
            <p
              className="text-base leading-relaxed mb-8 max-w-sm"
              style={{ color: "var(--text-secondary)" }}
            >
              Words can't describe the feeling of riding a Shanti Electric Vehicle.
              Book a free test ride at our dealership and experience the future of mobility.
            </p>

            {/* Promises */}
            <div className="flex flex-col gap-4">
              {[
                "No obligation. Completely free.",
                "Ride any model in our showroom.",
                "Our team guides you through every feature.",
                "Available 6 days a week.",
              ].map((point, i) => (
                <motion.div
                  key={point}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="flex items-center gap-3"
                >
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: "var(--accent-glow)", border: "1px solid var(--border-accent)" }}
                  >
                    <CheckCircle size={11} style={{ color: "var(--accent)" }} />
                  </div>
                  <span className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
                    {point}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Dealership info */}
            <div
              className="mt-10 p-5 rounded-xl"
              style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)" }}
            >
              <p className="eyebrow mb-3">Visit Us</p>
              <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                Shanti Electric Vehicles Showroom
              </p>
              <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
                Rajkot, Gujarat — India
              </p>
              <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
                Mon – Sat: 10:00 AM – 6:00 PM
              </p>
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="p-6 md:p-8 rounded-2xl"
              style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)" }}
            >
              <AnimatePresence mode="wait">
                {/* ── Success State ── */}
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center justify-center text-center py-16 gap-5"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
                      className="w-16 h-16 rounded-full flex items-center justify-center"
                      style={{ background: "var(--accent-glow)", border: "2px solid var(--accent)" }}
                    >
                      <CheckCircle size={32} style={{ color: "var(--accent)" }} />
                    </motion.div>
                    <div>
                      <h3
                        className="text-2xl font-extrabold mb-2"
                        style={{ color: "var(--text-primary)" }}
                      >
                        Request Received!
                      </h3>
                      <p className="text-sm leading-relaxed max-w-xs" style={{ color: "var(--text-secondary)" }}>
                        Thank you! Our team will contact you within 24 hours to confirm
                        your test ride booking.
                      </p>
                    </div>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="btn-ghost text-sm mt-4"
                    >
                      Book Another Ride
                    </button>
                  </motion.div>
                ) : (
                  /* ── Form ── */
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                    className="flex flex-col gap-5"
                    aria-label="Test ride booking form"
                  >
                    <h3
                      className="text-lg font-extrabold mb-1"
                      style={{ color: "var(--text-primary)" }}
                    >
                      Book Your Test Ride
                    </h3>

                    {/* Full Name */}
                    <Field icon={User} label="Full Name" id="fullName" error={errors.fullName?.message}>
                      <input
                        id="fullName"
                        type="text"
                        placeholder="Your full name"
                        autoComplete="name"
                        style={inputStyle}
                        {...register("fullName")}
                        onFocus={(e) => { e.target.style.borderColor = "var(--accent)"; }}
                        onBlur={(e) => { e.target.style.borderColor = "var(--border)"; }}
                      />
                    </Field>

                    {/* Phone & Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Field icon={Phone} label="Phone" id="phone" error={errors.phone?.message}>
                        <input
                          id="phone"
                          type="tel"
                          placeholder="10-digit number"
                          autoComplete="tel"
                          maxLength={10}
                          style={inputStyle}
                          {...register("phone")}
                          onFocus={(e) => { e.target.style.borderColor = "var(--accent)"; }}
                          onBlur={(e) => { e.target.style.borderColor = "var(--border)"; }}
                        />
                      </Field>
                      <Field icon={Mail} label="Email" id="email" error={errors.email?.message}>
                        <input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          autoComplete="email"
                          style={inputStyle}
                          {...register("email")}
                          onFocus={(e) => { e.target.style.borderColor = "var(--accent)"; }}
                          onBlur={(e) => { e.target.style.borderColor = "var(--border)"; }}
                        />
                      </Field>
                    </div>

                    {/* Vehicle */}
                    <Field icon={Bike} label="Preferred Vehicle" id="vehicle" error={errors.vehicle?.message}>
                      <select
                        id="vehicle"
                        style={{ ...inputStyle, cursor: "pointer" }}
                        {...register("vehicle")}
                        onFocus={(e) => { e.target.style.borderColor = "var(--accent)"; }}
                        onBlur={(e) => { e.target.style.borderColor = "var(--border)"; }}
                      >
                        <option value="" style={{ background: "var(--bg-card)" }}>Select a model</option>
                        {vehicleOptions.map((v) => (
                          <option key={v} value={v} style={{ background: "var(--bg-card)" }}>
                            {v}
                          </option>
                        ))}
                      </select>
                    </Field>

                    {/* Date & Time */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Field icon={Calendar} label="Preferred Date" id="date" error={errors.date?.message}>
                        <input
                          id="date"
                          type="date"
                          style={{ ...inputStyle, colorScheme: "dark" }}
                          min={new Date().toISOString().split("T")[0]}
                          {...register("date")}
                          onFocus={(e) => { e.target.style.borderColor = "var(--accent)"; }}
                          onBlur={(e) => { e.target.style.borderColor = "var(--border)"; }}
                        />
                      </Field>
                      <Field icon={Clock} label="Preferred Time" id="time" error={errors.time?.message}>
                        <select
                          id="time"
                          style={{ ...inputStyle, cursor: "pointer" }}
                          {...register("time")}
                          onFocus={(e) => { e.target.style.borderColor = "var(--accent)"; }}
                          onBlur={(e) => { e.target.style.borderColor = "var(--border)"; }}
                        >
                          <option value="" style={{ background: "var(--bg-card)" }}>Select a slot</option>
                          {timeSlots.map((t) => (
                            <option key={t} value={t} style={{ background: "var(--bg-card)" }}>
                              {t}
                            </option>
                          ))}
                        </select>
                      </Field>
                    </div>

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                      className="btn-primary w-full justify-center mt-2"
                      style={{ opacity: isSubmitting ? 0.7 : 1 }}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                            className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full"
                          />
                          Booking...
                        </span>
                      ) : (
                        <>
                          Book My Test Ride
                          <ChevronRight size={16} strokeWidth={2.5} />
                        </>
                      )}
                    </motion.button>

                    <p className="text-xs text-center" style={{ color: "var(--text-muted)" }}>
                      No payment required. Completely free.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
