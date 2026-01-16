import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Service } from "@/lib/api";
import { apiClient } from "@/lib/api";
import { Check, Loader2 } from "lucide-react";

interface ConsultationSelectionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onContinue: (serviceId: string) => void;
}

const ConsultationSelectionModal = ({
  open,
  onOpenChange,
  onContinue,
}: ConsultationSelectionModalProps) => {
  const [services, setServices] = useState<Service[]>([]);
  const [selectedServiceId, setSelectedServiceId] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadServices = async () => {
      try {
        setLoading(true);
        const data = await apiClient.getServices();
        setServices(data);
      } catch (error) {
        console.error("Failed to load services:", error);
      } finally {
        setLoading(false);
      }
    };

    if (open) {
      loadServices();
      setSelectedServiceId(""); // Reset selection when modal opens
    }
  }, [open]);

  // Map consultation types to actual services
  const getConsultationOptions = () => {
    // Find best matching service for each consultation type
    const findBestService = (predicates: ((s: Service) => boolean)[]): Service | null => {
      for (const predicate of predicates) {
        const service = services.find(predicate);
        if (service) return service;
      }
      return null;
    };

    const options = [
      {
        id: "one-on-one",
        label: "One-on-One Vedic Consultation (60 mins)",
        service: findBestService([
          (s) => s.title.includes("Destiny Architecture"),
          (s) => s.category === "Personal" && s.duration === 60,
          (s) => s.duration === 60 && !s.title.includes("Retainer"),
        ]),
      },
      {
        id: "career-business",
        label: "Career & Business Guidance",
        service: findBestService([
          (s) => s.title.includes("Celestial Strategy"),
          (s) => s.title.includes("Boardroom Muhurta"),
          (s) => s.title.includes("Cosmic Capital"),
          (s) => s.category === "Executive",
          (s) => s.category === "Corporate",
        ]),
      },
      {
        id: "marriage-relationship",
        label: "Marriage & Relationship Analysis",
        service: findBestService([
          (s) => s.title.includes("Union Intelligence"),
          (s) => s.category === "Relationships",
        ]),
      },
      {
        id: "long-term",
        label: "Long-Term Celestial Strategy",
        service: findBestService([
          (s) => s.title.includes("Celestial Strategy"),
          (s) => s.title.includes("Inner Circle Retainer"),
          (s) => s.title.includes("Maharaja Protocol"),
          (s) => s.category === "Legacy",
        ]),
      },
      {
        id: "custom",
        label: "Custom Consultation",
        service: services[0] || null, // Use first available service
      },
    ];

    // Return only options that have a matching service
    return options.filter((opt) => opt.service !== null);
  };

  const consultationOptions = getConsultationOptions();

  const handleContinue = () => {
    if (selectedServiceId) {
      onContinue(selectedServiceId);
      onOpenChange(false);
    }
  };

  const handleSelect = (serviceId: string) => {
    setSelectedServiceId(serviceId);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl text-foreground">
            Select Your Consultation Type
          </DialogTitle>
          <DialogDescription className="font-body text-foreground/70 pt-2">
            Choose the consultation type that best fits your needs. You can change this later.
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-secondary" />
          </div>
        ) : (
          <div className="space-y-4 py-4">
            {consultationOptions.map((option) => {
              const service = option.service;
              if (!service) return null;

              const isSelected = selectedServiceId === service.id;

              return (
                <button
                  key={option.id}
                  onClick={() => handleSelect(service.id)}
                  className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                    isSelected
                      ? "border-secondary bg-secondary/10"
                      : "border-border hover:border-secondary/50 bg-background"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                        isSelected
                          ? "border-secondary bg-secondary"
                          : "border-border"
                      }`}
                    >
                      {isSelected && (
                        <Check className="w-3 h-3 text-secondary-foreground" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-lg text-foreground mb-1">
                        {option.label}
                      </h3>
                      <p className="font-body text-sm text-foreground/60">
                        {service.description}
                      </p>
                      <span className="inline-block mt-2 text-xs font-body text-secondary">
                        Duration: {service.duration} minutes
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        <div className="pt-4 border-t border-border flex gap-3">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1 font-body tracking-wide uppercase"
          >
            Cancel
          </Button>
          <Button
            onClick={handleContinue}
            disabled={!selectedServiceId || loading}
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-body tracking-wide uppercase"
          >
            Continue
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConsultationSelectionModal;
