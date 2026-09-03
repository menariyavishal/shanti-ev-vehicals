"use client";

import { motion } from "framer-motion";
import { Zap, MapPin, Phone, Mail, ChevronRight } from "lucide-react";
import Link from "next/link";
import styles from "./Footer.module.css";

/* ─── SVG Social Icons ──────────────────────────────────────── */
function IconInstagram({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  );
}
function IconFacebook({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}
function IconYoutube({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.54C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none"/>
    </svg>
  );
}
function IconLinkedin({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  );
}

const socialLinks = [
  { icon: IconInstagram, href: "#", label: "Follow us on Instagram", color: "#E1306C" },
  { icon: IconFacebook,  href: "#", label: "Like us on Facebook",    color: "#1877F2" },
  { icon: IconYoutube,   href: "#", label: "Watch on YouTube",       color: "#FF0000" },
  { icon: IconLinkedin,  href: "#", label: "Connect on LinkedIn",    color: "#0A66C2" },
];

const quickNav = [
  { href: "#home",         label: "Home" },
  { href: "#vehicles",     label: "Our Vehicles" },
  { href: "#technology",   label: "Why Shanti EV" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#faq",          label: "FAQ" },
  { href: "#contact",      label: "Contact Us" },
];

const models = [
  { label: "Actone",     href: "#vehicles" },
  { label: "Glyder",     href: "#vehicles" },
  { label: "Megna",      href: "#vehicles" },
  { label: "Megna Plus", href: "#vehicles" },
  { label: "Supra",      href: "#vehicles" },
  { label: "Supreme",    href: "#vehicles" },
  { label: "Tejas",      href: "#vehicles" },
  { label: "Windy",      href: "#vehicles" },
];

const customerLinks = [
  { href: "#testride",   label: "Book a Test Ride" },
  { href: "#contact",    label: "Request a Callback" },
  { href: "/comparison", label: "Compare Models" },
  { href: "#faq",        label: "FAQs" },
  { href: "#contact",    label: "Dealer Enquiry" },
];

export function Footer() {
  return (
    <footer
      id="footer"
      className={styles.footer}
      aria-label="Site footer"
    >
      {/* Main Footer Body */}
      <div className={styles.body}>
        <div className="container-xl">
          <div className={styles.grid}>

            {/* Brand Column */}
            <div className={styles.brandCol}>
              {/* Logo */}
              <a href="#home" className={styles.logo} aria-label="Shanti Electric Vehicles Home">
                <div className={styles.logoIcon}>
                  <Zap size={16} strokeWidth={2.5} color="var(--bg-primary)" />
                </div>
                <span className={styles.logoText}>
                  SHANTI<span style={{ color: "var(--accent)" }}> EV</span>
                </span>
              </a>

              <p className={styles.brandTagline}>
                Premium electric vehicles for everyday Indian life.
                Engineered in Gujarat. Built for the road ahead.
              </p>

              {/* Badges */}
              <div className={styles.badges}>
                <span className={styles.badge}>🇮🇳 Made in India</span>
                <span className={styles.badge}>⚡ Zero Emission</span>
                <span className={styles.badge}>🛡️ 3-Year Warranty</span>
              </div>

              {/* Social Icons */}
              <div className={styles.socials} role="list" aria-label="Social media links">
                {socialLinks.map(({ icon: Icon, href, label, color }) => (
                  <motion.a
                    key={label}
                    href={href}
                    aria-label={label}
                    whileHover={{ y: -3, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className={styles.socialBtn}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = color;
                      (e.currentTarget as HTMLAnchorElement).style.borderColor = color;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-secondary)";
                      (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--border)";
                    }}
                    role="listitem"
                  >
                    <Icon size={16} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Navigate Column */}
            <div>
              <h3 className={styles.colTitle}>Navigate</h3>
              <ul className={styles.linkList} role="list">
                {quickNav.map((link) => (
                  <li key={link.href} role="listitem">
                    <a href={link.href} className={styles.footerLink}>
                      <ChevronRight size={11} className={styles.linkArrow} />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Models Column */}
            <div>
              <h3 className={styles.colTitle}>Our Models</h3>
              <ul className={styles.linkList} role="list">
                {models.map((m) => (
                  <li key={m.label} role="listitem">
                    <a href={m.href} className={styles.footerLink}>
                      <ChevronRight size={11} className={styles.linkArrow} />
                      {m.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Customer Column */}
            <div>
              <h3 className={styles.colTitle}>Customer</h3>
              <ul className={styles.linkList} role="list">
                {customerLinks.map((link) => (
                  <li key={link.label} role="listitem">
                    {link.href.startsWith("/") ? (
                      <Link href={link.href} className={styles.footerLink}>
                        <ChevronRight size={11} className={styles.linkArrow} />
                        {link.label}
                      </Link>
                    ) : (
                      <a href={link.href} className={styles.footerLink}>
                        <ChevronRight size={11} className={styles.linkArrow} />
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Column */}
            <div>
              <h3 className={styles.colTitle}>Contact</h3>
              <ul className={styles.contactList} role="list">
                <li>
                  <a href="tel:+919876543210" className={styles.contactItem}>
                    <Phone size={14} style={{ color: "var(--accent)", flexShrink: 0, marginTop: 2 }} />
                    <span>
                      +91 98765 43210
                      <small>Mon–Sat, 9AM–7PM</small>
                    </span>
                  </a>
                </li>
                <li>
                  <a href="mailto:hello@shantielectricvehicles.com" className={styles.contactItem}>
                    <Mail size={14} style={{ color: "var(--accent)", flexShrink: 0, marginTop: 2 }} />
                    <span>
                      hello@shantielectricvehicles.com
                      <small>Reply within 4 hours</small>
                    </span>
                  </a>
                </li>
                <li>
                  <div className={styles.contactItem}>
                    <MapPin size={14} style={{ color: "var(--accent)", flexShrink: 0, marginTop: 2 }} />
                    <span>
                      Shanti Electric Vehicles<br />
                      Rajkot, Gujarat — 360001
                      <small>India</small>
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={styles.bottomBar}>
        <div className="container-xl">
          <div className={styles.bottomInner}>
            <p className={styles.copyright}>
              © 2026 Shanti Electric Vehicles Pvt. Ltd. All rights reserved.
            </p>
            <div className={styles.legalLinks}>
              <a href="#" className={styles.legalLink}>Privacy Policy</a>
              <a href="#" className={styles.legalLink}>Terms of Use</a>
              <a href="#" className={styles.legalLink}>Dealer Network</a>
            </div>
            <p className={styles.madeWith}>
              Designed for the future of Indian mobility.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
