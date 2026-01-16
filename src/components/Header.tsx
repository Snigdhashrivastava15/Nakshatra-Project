import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import planetNakshatraLogo from "@/assets/planet-nakshatra-logo.png";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "About", href: "#about" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm border-b border-border/50"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Mobile menu button - left side on mobile */}
          <button className="md:hidden text-foreground p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo - centered on mobile, left-aligned on desktop */}
          <motion.a 
            href="#" 
            className="flex items-center gap-3 group absolute left-1/2 -translate-x-1/2 md:relative md:left-0 md:translate-x-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.img 
              src={planetNakshatraLogo} 
              alt="Planet Nakshatra Logo" 
              className="h-14 w-auto object-contain max-h-[56px]"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
            <div className="hidden sm:block">
              <span className="font-display text-xl text-foreground tracking-wide">Planet Nakshatra</span>
              <div className="text-xs text-muted-foreground tracking-[0.2em] uppercase">By Sameer</div>
            </div>
          </motion.a>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-sm font-body font-medium text-foreground/80 hover:text-primary transition-colors tracking-wide uppercase">
                {link.name}
              </a>
            ))}
            <Button 
              variant="default" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-body tracking-wide uppercase text-sm"
              onClick={() => {
                // Dispatch event to open consultation modal
                const event = new CustomEvent("openConsultationModal");
                window.dispatchEvent(event);
                // Also scroll to booking section
                setTimeout(() => {
                  const bookingSection = document.getElementById("booking");
                  if (bookingSection) {
                    bookingSection.scrollIntoView({ behavior: "smooth" });
                  }
                }, 100);
              }}
            >
              Book Consultation
            </Button>
          </nav>

          {/* Spacer for mobile to balance the layout */}
          <div className="md:hidden w-10" />
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="md:hidden bg-background border-t border-border">
            <nav className="container mx-auto px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} className="text-foreground/80 hover:text-primary transition-colors py-2 font-body tracking-wide uppercase text-sm" onClick={() => setIsMobileMenuOpen(false)}>
                  {link.name}
                </a>
              ))}
              <Button 
                variant="default" 
                className="mt-4 w-full bg-primary hover:bg-primary/90 text-primary-foreground font-body tracking-wide uppercase"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  // Dispatch event to open consultation modal
                  const event = new CustomEvent("openConsultationModal");
                  window.dispatchEvent(event);
                  // Also scroll to booking section
                  setTimeout(() => {
                    const bookingSection = document.getElementById("booking");
                    if (bookingSection) {
                      bookingSection.scrollIntoView({ behavior: "smooth" });
                    }
                  }, 100);
                }}
              >
                Book Consultation
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
