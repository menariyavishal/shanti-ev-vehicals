import type { Metadata } from "next";
import ComingSoon from "@/components/ComingSoon";

export const metadata: Metadata = {
  title: "Shanti Electric Motors — Coming Soon",
  description:
    "Something electric is coming. Shanti Electric Motors — launching soon.",
};

export default function Home() {
  return <ComingSoon />;
}
