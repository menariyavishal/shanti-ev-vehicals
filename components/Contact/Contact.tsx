"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, ChevronRight } from "lucide-react";
import styles from "./Contact.module.css";

interface FormData {
  name: string;
  email: string;
  phone: string;
  city: string;
  interest: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  city?: string;
  message?: string;
}

const contactInfo = [
  {
    icon: Phone,
    label: "Call Us",
    value: "+91 98765 43210",
    sub: "Mon–Sat, 9 AM – 7 PM",
    href: "tel:+919876543210",
    color: "#F0A500",
  },
  {
    icon: Mail,
    label: "Email Us",
    value: "hello@shantielectricvehicles.com",
    sub: "We reply within 4 hours",
    href: "mailto:hello@shantielectricvehicles.com",
    color: "#2196F3",
  },
  {
    icon: MapPin,
    label: "Visit Us",
    value: "Shanti Electric Vehicles",
    sub: "Rajkot, Gujarat — 360001, India",
    href: "#",
    color: "#E91E63",
  },
  {
    icon: Clock,
    label: "Business Hours",
    value: "Mon – Sat: 9:00 AM – 7:00 PM",
    sub: "Sunday: 10:00 AM – 5:00 PM",
    href: null,
    color: "#4CAF50",
  },
];

export function Contact() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    city: "",
    interest: "test-ride",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = (): boolean => {
    const errs: FormErrors = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      errs.email = "Enter a valid email address";
    if (!form.phone.match(/^[6-9]\d{9}$/))
      errs.phone = "Enter a valid 10-digit Indian mobile number";
    if (!form.city.trim()) errs.city = "City is required";
    if (!form.message.trim() || form.message.length < 10)
      errs.message = "Message must be at least 10 characters";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    // Simulate API call
    await new Promise((res) => setTimeout(res, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <section
      id="contact"
      className={styles.section}
      aria-labelledby="contact-heading"
    >
      <div className="container-xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={styles.header}
        >
          <p className="eyebrow">06 — Get In Touch</p>
          <h2 id="contact-heading" className={styles.heading}>
            Let's get you{" "}
            <span style={{ color: "var(--accent)" }}>riding.</span>
          </h2>
          <p className={styles.subtext}>
            Book a test ride, ask a question, or just say hello. Our team is
            always happy to help you make the right choice.
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className={styles.grid}>
          {/* Left — Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className={styles.infoPanel}
          >
            <div className={styles.infoPanelInner}>
              <h3 className={styles.infoPanelTitle}>Contact Information</h3>
              <p className={styles.infoPanelSub}>
                We're here to answer all your questions about Shanti EV.
              </p>

              {/* Contact Cards */}
              <div className={styles.contactCards}>
                {contactInfo.map((info) => {
                  const Icon = info.icon;
                  const inner = (
                    <div className={styles.contactCard} key={info.label}>
                      <div
                        className={styles.contactCardIcon}
                        style={{
                          background: `${info.color}18`,
                          border: `1px solid ${info.color}35`,
                        }}
                      >
                        <Icon size={18} style={{ color: info.color }} />
                      </div>
                      <div>
                        <p className={styles.contactCardLabel}>{info.label}</p>
                        <p className={styles.contactCardValue}>{info.value}</p>
                        <p className={styles.contactCardSub}>{info.sub}</p>
                      </div>
                    </div>
                  );
                  return info.href ? (
                    <a key={info.label} href={info.href} className={styles.contactCardLink}>
                      {inner}
                    </a>
                  ) : (
                    <div key={info.label}>{inner}</div>
                  );
                })}
              </div>

              {/* Quick CTA */}
              <div className={styles.quickCta}>
                <p className={styles.quickCtaText}>Want to ride before you buy?</p>
                <a href="#testride" className="btn-primary">
                  Book a Free Test Ride
                  <ChevronRight size={15} />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className={styles.formPanel}
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className={styles.successState}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                  >
                    <CheckCircle
                      size={64}
                      style={{ color: "#4CAF50" }}
                      strokeWidth={1.5}
                    />
                  </motion.div>
                  <h3>Message Sent!</h3>
                  <p>
                    Thank you, {form.name.split(" ")[0]}! Our team will reach out to
                    you at {form.phone} within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({
                        name: "", email: "", phone: "",
                        city: "", interest: "test-ride", message: "",
                      });
                    }}
                    className="btn-ghost"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  noValidate
                  className={styles.form}
                  aria-label="Contact form"
                >
                  <h3 className={styles.formTitle}>Send us a message</h3>

                  {/* Row 1 — Name & Phone */}
                  <div className={styles.formRow}>
                    <div className={styles.fieldGroup}>
                      <label htmlFor="contact-name" className={styles.label}>
                        Full Name <span className={styles.required}>*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="e.g. Rajesh Patel"
                        className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
                        aria-describedby={errors.name ? "name-error" : undefined}
                        autoComplete="name"
                      />
                      {errors.name && (
                        <span id="name-error" className={styles.errorMsg} role="alert">
                          {errors.name}
                        </span>
                      )}
                    </div>

                    <div className={styles.fieldGroup}>
                      <label htmlFor="contact-phone" className={styles.label}>
                        Mobile Number <span className={styles.required}>*</span>
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="10-digit mobile number"
                        className={`${styles.input} ${errors.phone ? styles.inputError : ""}`}
                        aria-describedby={errors.phone ? "phone-error" : undefined}
                        autoComplete="tel"
                        maxLength={10}
                      />
                      {errors.phone && (
                        <span id="phone-error" className={styles.errorMsg} role="alert">
                          {errors.phone}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Row 2 — Email & City */}
                  <div className={styles.formRow}>
                    <div className={styles.fieldGroup}>
                      <label htmlFor="contact-email" className={styles.label}>
                        Email Address <span className={styles.required}>*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        autoComplete="email"
                      />
                      {errors.email && (
                        <span id="email-error" className={styles.errorMsg} role="alert">
                          {errors.email}
                        </span>
                      )}
                    </div>

                    <div className={styles.fieldGroup}>
                      <label htmlFor="contact-city" className={styles.label}>
                        City <span className={styles.required}>*</span>
                      </label>
                      <input
                        id="contact-city"
                        type="text"
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        placeholder="e.g. Surat"
                        className={`${styles.input} ${errors.city ? styles.inputError : ""}`}
                        aria-describedby={errors.city ? "city-error" : undefined}
                        autoComplete="address-level2"
                      />
                      {errors.city && (
                        <span id="city-error" className={styles.errorMsg} role="alert">
                          {errors.city}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Interest */}
                  <div className={styles.fieldGroup}>
                    <label htmlFor="contact-interest" className={styles.label}>
                      I'm interested in
                    </label>
                    <select
                      id="contact-interest"
                      name="interest"
                      value={form.interest}
                      onChange={handleChange}
                      className={styles.select}
                    >
                      <option value="test-ride">Booking a Test Ride</option>
                      <option value="purchase">Purchasing a Scooter</option>
                      <option value="service">Service / Support</option>
                      <option value="dealership">Dealership Enquiry</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div className={styles.fieldGroup}>
                    <label htmlFor="contact-message" className={styles.label}>
                      Message <span className={styles.required}>*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us anything — which model interests you, your daily commute distance, any questions..."
                      rows={4}
                      className={`${styles.textarea} ${errors.message ? styles.inputError : ""}`}
                      aria-describedby={errors.message ? "message-error" : undefined}
                    />
                    {errors.message && (
                      <span id="message-error" className={styles.errorMsg} role="alert">
                        {errors.message}
                      </span>
                    )}
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    className={`btn-primary ${styles.submitBtn}`}
                    disabled={loading}
                    whileHover={!loading ? { scale: 1.02 } : {}}
                    whileTap={!loading ? { scale: 0.98 } : {}}
                  >
                    {loading ? (
                      <>
                        <span className={styles.spinner} aria-hidden="true" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send size={15} />
                      </>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
