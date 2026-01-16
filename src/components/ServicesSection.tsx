import { motion } from "framer-motion";
import { useState } from "react";
import * as LucideIcons from "lucide-react";
import { premiumServices, PremiumService } from "@/data/premiumServices";
import ServiceDetailModal from "./ServiceDetailModal";

// Icon mapping for dynamic icon loading
const iconMap: Record<string, any> = {
  Crown: LucideIcons.Crown,
  Building2: LucideIcons.Building2,
  Users: LucideIcons.Users,
  TrendingUp: LucideIcons.TrendingUp,
  Calendar: LucideIcons.Calendar,
  Shield: LucideIcons.Shield,
  Heart: LucideIcons.Heart,
  Home: LucideIcons.Home,
  Zap: LucideIcons.Zap,
  AlertTriangle: LucideIcons.AlertTriangle,
  Star: LucideIcons.Star,
};

const ServicesSection = () => {
  const [selectedService, setSelectedService] = useState<PremiumService | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getIcon = (iconName: string) => {
    return iconMap[iconName] || LucideIcons.Star;
  };

  return (
    <section id="services" className="py-24 bg-muted/30 pattern-overlay">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.8 }} 
          className="text-center mb-16"
        >
          <span className="text-sm font-body tracking-[0.3em] uppercase text-secondary">Our Expertise</span>
          <h2 className="font-display text-4xl md:text-5xl text-foreground mt-4 mb-6 deco-line">
            Premium Advisory Services
          </h2>
          <p className="font-body text-foreground/70 max-w-2xl mx-auto mt-8">
            Bespoke astrological solutions crafted for those who demand excellence in every dimension of life.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {premiumServices.map((service, index) => {
            const IconComponent = getIcon(service.icon);
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative card-elegant p-8 hover:bg-card transition-all duration-300 hover:shadow-lg"
              >
                <span className="inline-block text-xs font-body tracking-[0.2em] uppercase text-secondary mb-4">
                  {service.category}
                </span>
                <div className="w-12 h-12 rounded bg-secondary/10 flex items-center justify-center mb-6 group-hover:bg-secondary/20 transition-colors duration-300">
                  <IconComponent className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="font-display text-xl text-foreground mb-2 leading-tight">
                  {service.title}
                </h3>
                <p className="text-xs font-body text-secondary/80 mb-3 italic">
                  {service.tagline}
                </p>
                <p className="font-body text-foreground/60 leading-relaxed text-sm mb-6">
                  {service.description}
                </p>
                <button
                  onClick={() => {
                    setSelectedService(service);
                    setIsModalOpen(true);
                  }}
                  className="mt-auto flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer font-body tracking-wide text-sm hover:gap-3"
                >
                  <span>Learn More</span>
                  <span className="text-lg transition-transform group-hover:translate-x-1">→</span>
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>

      <ServiceDetailModal
        service={selectedService}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </section>
  );
};

export default ServicesSection;
