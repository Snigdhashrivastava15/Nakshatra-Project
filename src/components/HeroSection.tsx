import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import planetNakshatraLogo from "@/assets/planet-nakshatra-logo.png";
import planetNakshatraWatermark from "@/assets/planet-nakshatra-watermark.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/10 via-background to-background" />
      
      {/* Watermark logo as background design */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.08, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <img 
          src={planetNakshatraWatermark} 
          alt="" 
          className="w-[80%] max-w-3xl h-auto object-contain"
          aria-hidden="true"
        />
      </motion.div>

      <div className="relative z-10 container mx-auto px-6 text-center pt-20">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.6 }} className="flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-secondary" />
            <img src={planetNakshatraLogo} alt="Planet Nakshatra" className="w-8 h-8 object-contain" />
            <span className="text-sm font-body tracking-[0.3em] uppercase text-muted-foreground">Premium Astrological Advisory</span>
            <img src={planetNakshatraLogo} alt="Planet Nakshatra" className="w-8 h-8 object-contain" />
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-secondary" />
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }} className="font-display text-5xl md:text-7xl lg:text-8xl text-foreground mb-6 leading-tight drop-shadow-lg">
            Illuminate Your<span className="block text-gold-gradient mt-2 drop-shadow-md">Destiny</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }} className="font-body text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto mb-10 leading-relaxed">
            Exclusive Vedic astrological guidance for distinguished individuals, executives, and families seeking clarity in life's most profound decisions.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.8 }} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-base font-body tracking-wide uppercase group"
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
              Begin Your Journey<ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-foreground/20 text-foreground hover:bg-foreground/5 px-8 py-6 text-base font-body tracking-wide uppercase"
              onClick={() => {
                const servicesSection = document.getElementById("services");
                if (servicesSection) {
                  servicesSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              Explore Services
            </Button>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 0.8 }} className="mt-16 pt-8 border-t border-border/50">
            <p className="text-xs font-body tracking-[0.2em] uppercase text-muted-foreground mb-6">Trusted by Leaders Across Industries</p>
            <div className="flex flex-wrap justify-center gap-8 text-muted-foreground/50">
              {["Fortune 500 CXOs", "Industrialists", "Public Figures", "Distinguished Families"].map((item, index) => (
                <span key={index} className="text-sm font-body tracking-wide">{item}</span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
