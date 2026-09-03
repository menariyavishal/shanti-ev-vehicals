import { Hero } from "@/components/Hero/Hero";
import { Features } from "@/components/Features/Features";
import { Vehicles } from "@/components/Vehicles/Vehicles";
import { BrandStatement } from "@/components/BrandStatement/BrandStatement";
import { WhereWeAre } from "@/components/WhereWeAre/WhereWeAre";
import { Testimonials } from "@/components/Testimonials/Testimonials";
import { FAQ } from "@/components/FAQ/FAQ";
import { Contact } from "@/components/Contact/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <Vehicles />
      <BrandStatement />
      <WhereWeAre />
      <Testimonials />
      <FAQ />
      <Contact />
    </main>
  );
}
