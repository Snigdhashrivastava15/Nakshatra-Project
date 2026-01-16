import { PremiumService } from "@/data/premiumServices";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Check } from "lucide-react";

interface ServiceDetailModalProps {
  service: PremiumService | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ServiceDetailModal = ({ service, open, onOpenChange }: ServiceDetailModalProps) => {
  if (!service) return null;

  const handleBookService = () => {
    onOpenChange(false);
    // Scroll to booking section
    const bookingSection = document.getElementById("booking");
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: "smooth" });
      // Small delay to ensure scroll completes, then trigger service selection
      setTimeout(() => {
        const event = new CustomEvent("selectService", { detail: { serviceId: service.id } });
        window.dispatchEvent(event);
      }, 500);
    }
  };

  const handleEnquire = () => {
    onOpenChange(false);
    // Scroll to contact section
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-3xl md:text-4xl text-foreground leading-tight">
            {service.title}
          </DialogTitle>
          <DialogDescription className="text-base font-body text-secondary/90 pt-2 italic">
            {service.tagline}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-8 py-6">
          {/* Overview */}
          <div>
            <h4 className="font-display text-lg text-foreground mb-3">Overview</h4>
            <p className="font-body text-foreground/70 leading-relaxed">
              {service.fullDescription}
            </p>
          </div>

          {/* Key Highlights */}
          {service.highlights && service.highlights.length > 0 && (
            <div>
              <h4 className="font-display text-lg text-foreground mb-4">Key Highlights</h4>
              <div className="grid md:grid-cols-2 gap-3">
                {service.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                    <p className="font-body text-foreground/70 text-sm leading-relaxed">
                      {highlight}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Ideal For */}
          {service.idealFor && service.idealFor.length > 0 && (
            <div>
              <h4 className="font-display text-lg text-foreground mb-4">Ideal For</h4>
              <ul className="space-y-2">
                {service.idealFor.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-secondary mt-1.5">•</span>
                    <p className="font-body text-foreground/70 text-sm leading-relaxed">
                      {item}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Category Badge */}
          <div className="pt-4 border-t border-border">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-xs font-body tracking-[0.2em] uppercase text-secondary/70">
                Category:
              </span>
              <span className="text-sm font-body text-foreground/80">
                {service.category}
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={handleBookService}
                size="lg"
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-body tracking-wide uppercase group"
              >
                Book Consultation
                <CalendarIcon className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                onClick={handleEnquire}
                size="lg"
                variant="outline"
                className="flex-1 border-border hover:bg-muted/50 font-body tracking-wide uppercase"
              >
                Enquire Now
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceDetailModal;
