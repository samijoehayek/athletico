// app/layout.tsx
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import FloatingWhatsAppButton from "./components/FloatingWhatsAppButton";
import CartDrawer from "./components/store/CartDrawer";
import { CartProvider } from "@/lib/store/cart-context";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-outfit",
  display: "swap",
});

// Athletico brand display font
const qbOne = localFont({
  src: "./fonts/QBOne-Bold.woff2",
  weight: "700",
  style: "normal",
  variable: "--qb-one-font",
  display: "swap",
});

export const metadata: Metadata = {
  // Needed so Open Graph / social share images resolve to absolute URLs.
  // Set NEXT_PUBLIC_SITE_URL in production to the club's real domain.
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://athleticosc.com"),
  title: "Athletico Sports Club",
  description: "Premier sports club and fitness center",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${qbOne.variable} antialiased`}>
        {/* The bag is reachable from every page, not only inside the store. */}
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
        <FloatingWhatsAppButton />
      </body>
    </html>
  );
}
