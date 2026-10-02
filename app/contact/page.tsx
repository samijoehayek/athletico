// app/contact/page.tsx

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ContactHero from "@/app/components/contact/ContactHero";
import ContactOptions from "@/app/components/contact/ContactOptions";
import LocateUs from "@/app/components/contact/LocateUs";
import ContactFAQ from "@/app/components/contact/ContactFAQ";

export default function ContactPage() {
  return (
    <main className="bg-[#F1EAEA] min-h-screen">
      {/* Navbar */}
      <Navbar mode="dark" />

      {/* Hero Contact Section */}
      <ContactHero />

      {/* Players / Marketing & sponsors / Careers */}
      <ContactOptions />

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
