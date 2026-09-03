import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar/Navbar";
import { Footer } from "@/components/Footer/Footer";

export const metadata: Metadata = {
  title: "Shanti Electric Vehicles | Premium Electric Mobility",
  description:
    "Discover Shanti Electric Vehicles — premium electric scooters and bikes crafted for everyday Indian roads. Book a test ride today in Rajkot, Gujarat.",
  keywords:
    "Shanti electric vehicles, electric scooter, EV dealership, Rajkot, Gujarat, electric bike, zero emission",
  openGraph: {
    title: "Shanti Electric Vehicles | Premium Electric Mobility",
    description: "Premium electric scooters built for the way you move.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
