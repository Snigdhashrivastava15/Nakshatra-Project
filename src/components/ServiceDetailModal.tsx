import { Service } from "@/lib/api";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon } from "lucide-react";

interface ServiceDetailModalProps {
  service: Service | null;
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
        // This will be handled by the booking section
        const event = new CustomEvent("selectService", { detail: { serviceId: service.id } });
        window.dispatchEvent(event);
      }, 500);
    }
  };

  const fullDescription = service.fullDescription || service.description || "";
  const shortDescription = service.shortDescription || service.description || "";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-3xl text-foreground">
            {service.title}
          </DialogTitle>
          <DialogDescription className="text-base font-body text-foreground/70 pt-2">
            {shortDescription}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div>
            <h4 className="font-display text-lg text-foreground mb-3">Service Details</h4>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm font-body text-foreground/60 uppercase tracking-wide mb-1">
                    Duration
                  </p>
                  <p className="font-body text-foreground">{service.duration} minutes</p>
                </div>
                {service.price && (
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm font-body text-foreground/60 uppercase tracking-wide mb-1">
                      Price
                    </p>
                    <p className="font-body text-foreground">
                      ₹{service.price.toLocaleString("en-IN")}
                    </p>
                  </div>
                )}
              </div>

              {fullDescription && (
                <div>
                  <h5 className="font-display text-base text-foreground mb-2">
                    Full Description
                  </h5>
                  <p className="font-body text-foreground/70 leading-relaxed whitespace-pre-line">
                    {fullDescription}
                  </p>
                </div>
              )}

              {!fullDescription && (
                <div>
                  <p className="font-body text-foreground/70 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <Button
              onClick={handleBookService}
              size="lg"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-body tracking-wide uppercase group"
            >
              Book This Service
              <CalendarIcon className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceDetailModal;
