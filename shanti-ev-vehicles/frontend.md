# Shanti Electric Vehicals - Frontend Project Guidelines

Welcome to the **Shanti Electric Vehicals** frontend project! 

The goal of this project is to build a sleek, highly-converting, and modern public-facing landing page for an electric vehicle brand. Your sole focus is on delivering a pixel-perfect, responsive, and animated user interface.

## Reference Inspiration
Please study this reference site carefully before starting:
👉 **[https://bonjoev.com/](https://bonjoev.com/)**

Notice the large typography, smooth scroll animations, high-quality imagery, and clean spacing. We want to achieve a similar premium feel.

---

## 🛠 Tech Stack

You must strictly use the following technologies. Do not introduce alternative frameworks or state managers unless explicitly approved.

- **Framework:** Next.js (App Router)
- **Language:** TypeScript (Strict typing required)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion (Crucial for a premium EV feel)
- **Icons:** Lucide React
- **Forms (Optional):** React Hook Form & Zod (For the "Book a Test Ride" or Contact forms)
- **UI Components (Optional):** shadcn/ui or Radix (For accessible dropdowns, modals, etc.)

---

## 📂 Directory Structure

Please structure the project exactly like this to ensure a seamless merge with the main billing system later. All UI components should live in their own dedicated folders under the `components/` directory.

```text
📦 shanti-ev-frontend
 ┣ 📂 app
 ┃ ┣ 📜 layout.tsx           # Main layout (includes Navbar & Footer)
 ┃ ┣ 📜 page.tsx             # The primary landing page orchestrating all components
 ┃ ┗ 📜 globals.css          # Tailwind imports and base CSS variables
 ┣ 📂 components
 ┃ ┣ 📂 Navbar
 ┃ ┃ ┗ 📜 Navbar.tsx         # Sticky navigation with transparent-to-solid scroll effect
 ┃ ┣ 📂 Hero
 ┃ ┃ ┗ 📜 Hero.tsx           # Large hero section with EV image/video background
 ┃ ┣ 📂 Vehicles
 ┃ ┃ ┗ 📜 Vehicles.tsx       # Showcase of models (e.g., Scooters, Bikes)
 ┃ ┣ 📂 Features
 ┃ ┃ ┗ 📜 Features.tsx       # Highlights: Battery, Range, Top Speed, Charging Time
 ┃ ┣ 📂 TestRide
 ┃ ┃ ┗ 📜 TestRide.tsx       # "Book a Test Ride" / Lead Generation Form
 ┃ ┣ 📂 About
 ┃ ┃ ┗ 📜 About.tsx          # Brand story and mission
 ┃ ┗ 📂 Footer
 ┃   ┗ 📜 Footer.tsx         # Links, social icons, and contact info
 ┣ 📂 public                 # Store all static assets (images, videos, fonts)
 ┣ 📜 tailwind.config.ts
 ┗ 📜 package.json
```

---

## 📝 Development Guidelines & Rules

1. **Pure UI Only:** Do not write any database logic (Prisma, SQL) or API routes. Mock all data (e.g., vehicle specs, feature lists) using simple arrays or constants within the components.
2. **Component Isolation:** Keep components self-contained. The `page.tsx` file should essentially just be a list of stacked components:
   ```tsx
   export default function Home() {
     return (
       <main>
         <Hero />
         <Features />
         <Vehicles />
         <TestRide />
         <About />
       </main>
     )
   }
   ```
3. **Animations:** Use `framer-motion` to add subtle fade-ins, slide-ups, and scroll-triggered animations. EV websites feel "fast" and modern largely due to motion.
4. **Responsiveness:** The site must look perfect on Mobile (iPhone SE size), Tablets, and large Desktop screens. Test your Tailwind breakpoints (`sm:`, `md:`, `lg:`) rigorously.
5. **Types:** Define proper TypeScript interfaces for any mocked data (e.g., `interface Vehicle { id: string; name: string; range: string; image: string; }`).
