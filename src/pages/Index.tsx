import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import BookingSection from "@/components/BookingSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Planets Nakshatra - Sameer</title>
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="shortcut icon" type="image/png" href="/favicon.png" />
        <meta 
          name="description" 
          content="Exclusive astrological advisory for high-value individuals, executives, and distinguished families. Transform your destiny with Vedic wisdom from Astrologer Sameer." 
        />
        <meta name="keywords" content="vedic astrology, premium astrology, astrologer sameer, planet nakshatra, executive astrology, business astrology, muhurta, corporate astrology" />
        <meta property="og:title" content="Planet Nakshatra | Premium Vedic Astrology" />
        <meta property="og:description" content="Exclusive astrological advisory for high-value individuals and executives." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://planetnakshatra.com" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <HeroSection />
          <ServicesSection />
          <BookingSection />
          <AboutSection />
          <TestimonialsSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
