// app/layout.tsx
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import FloatingWhatsAppButton from "./components/FloatingWhatsAppButton";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
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
      <body className={outfit.className}>
        {children}
        <FloatingWhatsAppButton />
      </body>
    </html>
  );
}
