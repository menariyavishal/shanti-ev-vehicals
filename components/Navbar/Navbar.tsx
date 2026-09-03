"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Zap, ChevronRight, BarChart2 } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { href: "#home",         label: "Home" },
  { href: "#technology",   label: "Why Us" },
  { href: "#vehicles",     label: "Lineup" },
  { href: "#promise",      label: "Our Promise" },
  { href: "#where-we-are",  label: "Where We Are" },
  { href: "#testimonials", label: "Reviews" },
  { href: "#faq",          label: "FAQ" },
  { href: "#contact",      label: "Contact" },
];

export function Navbar() {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [activeLink,  setActiveLink]  = useState("#home");
  const menuRef = useRef<HTMLDivElement>(null);

  // Always start at top (Home) on page reload / initial load
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, []);

  // Background scroll state
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll Spy: Automatically update activeLink based on section in view
  useEffect(() => {
    const sectionIds = [
      "home",
      "technology",
      "vehicles",
      "promise",
      "where-we-are",
      "testimonials",
      "faq",
      "contact",
    ];

    const handleScrollSpy = () => {
      const scrollPosition = window.scrollY + 180;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveLink(`#${sectionIds[i]}`);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScrollSpy, { passive: true });
    handleScrollSpy();
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, []);

  // Close mobile menu on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    };
    if (mobileOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [mobileOpen]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleNavClick = (href: string) => {
    setActiveLink(href);
    setMobileOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled
            ? "rgba(8, 8, 14, 0.92)"
            : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        }}
      >
        <div className="container-xl">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* Logo */}
            <a
              href="#home"
              className="flex items-center gap-2.5 group"
              onClick={() => handleNavClick("#home")}
              aria-label="Shanti Electric Vehicles Home"
            >
              <motion.div
                whileHover={{ rotate: 15, scale: 1.1 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-center w-8 h-8 rounded-md"
                style={{ background: "var(--accent)" }}
              >
                <Zap size={16} strokeWidth={2.5} color="var(--bg-primary)" />
              </motion.div>
              <span
                className="font-extrabold tracking-tight leading-none text-base"
                style={{ color: "var(--text-primary)", fontFamily: "var(--font-main)" }}
              >
                SHANTI
                <span style={{ color: "var(--accent)" }}> EV</span>
              </span>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="relative text-sm transition-all duration-300 group py-1"
                  style={{
                    color: activeLink === link.href
                      ? "var(--accent)"
                      : "var(--text-secondary)",
                    fontWeight: 500,
                    letterSpacing: "0.02em",
                  }}
                >
                  {link.label}
                  <span
                    className="absolute -bottom-0.5 left-0 h-px transition-all duration-300 rounded-full"
                    style={{
                      background: "var(--accent)",
                      width: activeLink === link.href ? "100%" : "0%",
                    }}
                  />
                </a>
              ))}
            </nav>

            {/* Desktop CTA — Compare Models */}
            <div className="hidden md:flex items-center gap-3">
              <Link href="/comparison">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn-primary text-sm flex items-center gap-2 cursor-pointer"
                >
                  <BarChart2 size={15} />
                  Compare Models
                  <ChevronRight size={15} strokeWidth={2.5} />
                </motion.div>
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <button
              className="md:hidden relative z-50 w-10 h-10 flex items-center justify-center rounded-lg border transition-all duration-300"
              style={{
                border: "1px solid var(--border)",
                background: mobileOpen ? "rgba(240,165,0,0.1)" : "transparent",
                color: "var(--text-primary)",
              }}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              <AnimatePresence mode="wait">
                {mobileOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={20} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40"
              style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}
              onClick={() => setMobileOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              id="mobile-menu"
              key="menu"
              ref={menuRef}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 35 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 flex flex-col"
              style={{
                background: "var(--bg-secondary)",
                borderLeft: "1px solid var(--border)",
              }}
              role="dialog"
              aria-label="Mobile navigation"
            >
              {/* Panel Header */}
              <div
                className="flex items-center justify-between px-6 h-16"
                style={{ borderBottom: "1px solid var(--border)" }}
              >
                <span
                  className="font-extrabold tracking-tight text-sm"
                  style={{ color: "var(--text-primary)" }}
                >
                  SHANTI<span style={{ color: "var(--accent)" }}> EV</span>
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded"
                  style={{ color: "var(--text-secondary)" }}
                  aria-label="Close menu"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Nav Links */}
              <nav className="flex flex-col gap-1 px-4 py-6 flex-1" aria-label="Mobile navigation links">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ x: 30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.06 + 0.1, duration: 0.35 }}
                    onClick={() => handleNavClick(link.href)}
                    className="flex items-center justify-between px-4 py-3.5 rounded-lg text-sm font-semibold transition-all duration-200"
                    style={{
                      color: activeLink === link.href ? "var(--accent)" : "var(--text-primary)",
                      background: activeLink === link.href ? "rgba(240,165,0,0.08)" : "transparent",
                    }}
                  >
                    {link.label}
                    <ChevronRight size={14} style={{ color: "var(--text-muted)" }} />
                  </motion.a>
                ))}
              </nav>

              {/* Bottom CTA — Compare Models */}
              <div className="px-4 pb-8">
                <Link href="/comparison" onClick={() => setMobileOpen(false)}>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.35 }}
                    className="btn-primary w-full justify-center text-sm flex items-center gap-2 cursor-pointer"
                  >
                    <BarChart2 size={15} />
                    Compare Models
                    <ChevronRight size={15} />
                  </motion.div>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
