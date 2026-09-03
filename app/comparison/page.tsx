import type { Metadata } from "next";
import { Comparison } from "@/components/Comparison/Comparison";

export const metadata: Metadata = {
  title: "Compare Models | Shanti Electric Vehicles",
  description:
    "Compare all 8 Shanti EV models side by side — range, speed, price, features and more. Find the perfect electric scooter or moped for your needs.",
  keywords:
    "Shanti EV comparison, electric scooter compare, Actone vs Supreme, Megna vs Glyder",
};

export default function ComparisonPage() {
  return (
    <main>
      <Comparison />
    </main>
  );
}
