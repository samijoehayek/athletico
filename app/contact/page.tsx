// app/contact/page.tsx

import Navbar from "../components/NavbarDark";
import Footer from "../components/Footer";
import ContactHero from "@/app/components/contact/ContactHero";
import LocateUs from "@/app/components/contact/LocateUs";
import ContactFAQ from "@/app/components/contact/ContactFAQ";

export default function ContactPage() {
  return (
    <main className="bg-white min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Hero Contact Section */}
      <ContactHero />

      {/* Locate Us Section */}
      <div id="branches">
        <LocateUs />
      </div>

      {/* FAQ Section */}
      <ContactFAQ />

      {/* Footer */}
      <Footer />
    </main>
  );
}
