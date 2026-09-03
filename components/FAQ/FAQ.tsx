"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, Search } from "lucide-react";
import styles from "./FAQ.module.css";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQItem[] = [
  {
    id: "faq1",
    category: "Legality",
    question: "Do I need a driving licence to ride a Shanti EV?",
    answer:
      "No! Shanti EV scooters are classified as low-speed electric vehicles (LSEVs) with a top speed below 25 km/h in restricted mode, making them exempt from driving licence and RC (Registration Certificate) requirements under Indian Motor Vehicles Act. You can buy and ride immediately — no paperwork, no RTO visits.",
  },
  {
    id: "faq2",
    category: "Legality",
    question: "Is insurance mandatory for Shanti EV?",
    answer:
      "Third-party insurance is not mandated for non-RTO low-speed EVs. However, we always recommend taking comprehensive insurance for your own peace of mind. Our dealer partners can assist you with optional insurance plans at competitive rates.",
  },
  {
    id: "faq3",
    category: "Battery & Range",
    question: "What is the real-world range of Shanti EV scooters?",
    answer:
      "Our scooters offer 80–120+ km per charge depending on the model and battery configuration. Factors like rider weight, terrain, and riding mode can affect range. Our Megna Plus and Supreme models consistently deliver 120+ km in real-world city conditions.",
  },
  {
    id: "faq4",
    category: "Battery & Range",
    question: "How long does it take to fully charge the battery?",
    answer:
      "All Shanti EV models charge in 4–6 hours using a standard home wall socket (15A). You can plug it in overnight and wake up to a fully charged scooter. No special charging infrastructure required — just a regular power outlet works fine.",
  },
  {
    id: "faq5",
    category: "Battery & Range",
    question: "Can I choose between Lithium-Ion and Lead-Acid batteries?",
    answer:
      "Yes! We offer both battery options. Lithium-Ion batteries are lighter, last longer (1,000+ charge cycles), and provide better performance. Lead-Acid batteries are more affordable upfront. Our sales team will help you choose the best option based on your daily riding distance and budget.",
  },
  {
    id: "faq6",
    category: "Pricing",
    question: "What is the starting price of Shanti EV scooters?",
    answer:
      "Shanti EV scooters start at just ₹39,999 (ex-showroom). The price varies by model and battery configuration. All models come with a 3-year manufacturer warranty. Given zero fuel costs and minimal maintenance, most riders recover their investment within 12–18 months.",
  },
  {
    id: "faq7",
    category: "Pricing",
    question: "What is included in the 3-year warranty?",
    answer:
      "Our 3-year warranty covers the motor, battery pack, controller, and all electrical components against manufacturing defects. Physical damage and wear-and-tear items like tyres and brakes are not covered. Extended warranty plans are also available through our dealer network.",
  },
  {
    id: "faq8",
    category: "Service",
    question: "How do I get my Shanti EV serviced?",
    answer:
      "We have an authorised dealer and service network across 15 states in India. You can visit your nearest service centre or request a doorstep service pickup in select cities. For minor issues, our technicians can often resolve them at your location. Call our helpline or use the Contact page to book a service.",
  },
  {
    id: "faq9",
    category: "Service",
    question: "What are the maintenance costs for a Shanti EV?",
    answer:
      "Maintenance costs are extremely low compared to petrol scooters. There's no engine oil, no spark plugs, no timing belts. Routine maintenance includes checking tyre pressure, brake adjustment, and periodic battery health checks. Most owners spend less than ₹500 per year on maintenance.",
  },
  {
    id: "faq10",
    category: "Features",
    question: "Does Shanti EV have anti-theft and smart features?",
    answer:
      "Yes! Higher-end models come equipped with an anti-theft alarm system, cruise mode for highway comfort, reverse gear for tight parking spaces, and an advanced BLDC motor controller for smooth and silent performance. Some models also feature a digital instrument cluster with battery indicator.",
  },
  {
    id: "faq11",
    category: "Purchasing",
    question: "Can I book a test ride before buying?",
    answer:
      "Absolutely! We encourage all buyers to take a test ride. Simply click the 'Book a Test Ride' button anywhere on our website, fill in your details, and our nearest dealer will contact you within 24 hours to schedule your ride. Test rides are completely free with no obligation to purchase.",
  },
  {
    id: "faq12",
    category: "Purchasing",
    question: "Do you offer EMI or financing options?",
    answer:
      "Yes, we have tie-ups with leading NBFCs and banks to offer easy EMI options. Down payments start as low as ₹5,000 and EMIs can be spread over 12–36 months. Our dealers can assist you with loan applications and approvals, often processed within 24–48 hours.",
  },
];

const categories = ["All", "Legality", "Battery & Range", "Pricing", "Service", "Features", "Purchasing"];

export function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = faqs.filter((f) => {
    const matchCat = activeCategory === "All" || f.category === activeCategory;
    const matchSearch =
      search === "" ||
      f.question.toLowerCase().includes(search.toLowerCase()) ||
      f.answer.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const toggle = (id: string) => setOpenId(openId === id ? null : id);

  return (
    <section
      id="faq"
      className={styles.section}
      aria-labelledby="faq-heading"
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
          <p className="eyebrow">05 — FAQ</p>
          <h2 id="faq-heading" className={styles.heading}>
            Questions we get{" "}
            <span style={{ color: "var(--accent)" }}>all the time.</span>
          </h2>
          <p className={styles.subtext}>
            Everything you need to know before making the switch to electric.
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={styles.searchWrap}
        >
          <Search size={16} className={styles.searchIcon} />
          <input
            type="search"
            placeholder="Search questions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.searchInput}
            aria-label="Search FAQ questions"
            id="faq-search"
          />
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className={styles.categories}
          role="group"
          aria-label="Filter FAQ by category"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={styles.catBtn}
              style={{
                background: activeCategory === cat ? "var(--accent)" : "var(--bg-card)",
                color: activeCategory === cat ? "var(--bg-primary)" : "var(--text-secondary)",
                border: activeCategory === cat ? "1px solid var(--accent)" : "1px solid var(--border)",
              }}
              aria-pressed={activeCategory === cat}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* FAQ Items */}
        <div className={styles.faqGrid}>
          {filtered.length === 0 ? (
            <div className={styles.noResults}>
              <p>No questions found. Try a different search term.</p>
            </div>
          ) : (
            filtered.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className={styles.faqItem}
                style={{
                  borderColor: openId === item.id ? "var(--border-accent)" : "var(--border)",
                  background: openId === item.id ? "var(--bg-card-hover)" : "var(--bg-card)",
                }}
              >
                <button
                  className={styles.faqQuestion}
                  onClick={() => toggle(item.id)}
                  aria-expanded={openId === item.id}
                  aria-controls={`faq-answer-${item.id}`}
                  id={`faq-btn-${item.id}`}
                >
                  <span className={styles.questionText}>{item.question}</span>
                  <span className={styles.toggleIcon}>
                    {openId === item.id ? (
                      <Minus size={18} style={{ color: "var(--accent)" }} />
                    ) : (
                      <Plus size={18} style={{ color: "var(--text-muted)" }} />
                    )}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {openId === item.id && (
                    <motion.div
                      id={`faq-answer-${item.id}`}
                      role="region"
                      aria-labelledby={`faq-btn-${item.id}`}
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                      style={{ overflow: "hidden" }}
                    >
                      <div className={styles.faqAnswer}>
                        <span
                          className={styles.categoryTag}
                          style={{
                            background: "rgba(240,165,0,0.1)",
                            border: "1px solid rgba(240,165,0,0.25)",
                            color: "var(--accent)",
                          }}
                        >
                          {item.category}
                        </span>
                        <p>{item.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          )}
        </div>

        {/* Still have questions CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={styles.ctaBox}
        >
          <h3>Still have questions?</h3>
          <p>Our team is happy to help. Reach out and we'll respond within a few hours.</p>
          <a href="#contact" className="btn-primary">
            Contact Us
          </a>
        </motion.div>
      </div>
    </section>
  );
}
