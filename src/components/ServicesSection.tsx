import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import * as LucideIcons from "lucide-react";
import { apiClient, Service } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
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
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const loadServices = async () => {
      try {
        const data = await apiClient.getServices();
        setServices(data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load services. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadServices();

    // Listen for service selection from modal
    const handleSelectService = (event: CustomEvent) => {
      const serviceId = event.detail?.serviceId;
      if (serviceId) {
        setServices((prevServices) => {
          const service = prevServices.find((s) => s.id === serviceId);
          if (service) {
            setSelectedService(service);
          }
          return prevServices;
        });
      }
    };

    window.addEventListener("selectService", handleSelectService as EventListener);
    return () => {
      window.removeEventListener("selectService", handleSelectService as EventListener);
    };
  }, [toast]);

  const getIcon = (iconName?: string) => {
    if (!iconName) return LucideIcons.Star;
    return iconMap[iconName] || LucideIcons.Star;
  };

  return (
    <section id="services" className="py-24 bg-muted/30 pattern-overlay">
      <div className="container mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-16">
          <span className="text-sm font-body tracking-[0.3em] uppercase text-secondary">Our Expertise</span>
          <h2 className="font-display text-4xl md:text-5xl text-foreground mt-4 mb-6 deco-line">Premium Advisory Services</h2>
          <p className="font-body text-foreground/70 max-w-2xl mx-auto mt-8">Bespoke astrological solutions crafted for those who demand excellence in every dimension of life.</p>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const IconComponent = getIcon(service.iconName);
              return (
                <motion.div key={service.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} className="group card-elegant p-8 hover:bg-card">
                  <span className="inline-block text-xs font-body tracking-[0.2em] uppercase text-secondary mb-4">{service.category}</span>
                  <div className="w-12 h-12 rounded bg-secondary/10 flex items-center justify-center mb-6 group-hover:bg-secondary/20 transition-colors">
                    <IconComponent className="w-6 h-6 text-secondary" />
                  </div>
                  <h3 className="font-display text-xl text-foreground mb-3">{service.title}</h3>
                  <p className="font-body text-foreground/60 leading-relaxed">{service.description}</p>
                  <button
                    onClick={() => {
                      setSelectedService(service);
                      setIsModalOpen(true);
                    }}
                    className="mt-6 flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  >
                    <span className="text-sm font-body tracking-wide">Learn More</span>
                    <span className="text-lg">→</span>
                  </button>
                </motion.div>
              );
            })}
          </div>
        )}
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
