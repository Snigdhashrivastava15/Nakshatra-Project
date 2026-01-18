import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Service } from "@/lib/api";
import { apiClient } from "@/lib/api";
import { Loader2, RefreshCw } from "lucide-react";

interface ConsultationSelectionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onContinue: (serviceId: string) => void;
  preselectedServiceId?: string;
}

const ConsultationSelectionModal = ({
  open,
  onOpenChange,
  onContinue,
  preselectedServiceId,
}: ConsultationSelectionModalProps) => {
  const [services, setServices] = useState<Service[]>([]);
  const [selectedServiceId, setSelectedServiceId] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadServices = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await apiClient.getServices();
        setServices(data || []);
      } catch (error: any) {
        const errorMessage = error?.message || "Unable to connect to server. Please check if the backend is running.";
        setError(errorMessage);
        setServices([]);
      } finally {
        setLoading(false);
      }
    };

    if (open) {
      loadServices();
      // If preselectedServiceId is provided, use it; otherwise reset selection
      if (preselectedServiceId) {
        setSelectedServiceId(preselectedServiceId);
      } else {
        setSelectedServiceId("");
      }
    }
  }, [open, preselectedServiceId]);

  // Display all available services directly
  const availableServices = services.filter((s) => s.active);

  // Auto-select preselected service when services load
  useEffect(() => {
    if (preselectedServiceId && services.length > 0 && !selectedServiceId) {
      const service = services.find((s) => s.id === preselectedServiceId && s.active);
      if (service) {
        setSelectedServiceId(preselectedServiceId);
      }
    }
  }, [services, preselectedServiceId, selectedServiceId]);

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
            Choose the consultation type that best fits your needs. Only one consultation can be selected at a time.
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-secondary" />
            <span className="ml-3 font-body text-foreground/70">Loading services...</span>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="font-body text-foreground/70 mb-2">
              {error}
            </p>
            <p className="font-body text-sm text-foreground/50 mb-4">
              Make sure the backend server is running on {apiClient.baseUrl}
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setError(null);
                setLoading(true);
                apiClient.getServices()
                  .then((data) => {
                    setServices(data || []);
                  })
                  .catch((error: any) => {
                    setError(error?.message || "Failed to load services. Please try again.");
                  })
                  .finally(() => {
                    setLoading(false);
                  });
              }}
              className="font-body tracking-wide uppercase group"
            >
              <RefreshCw className="mr-2 h-4 w-4 group-hover:rotate-180 transition-transform" />
              Retry
            </Button>
          </div>
        ) : availableServices.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="font-body text-foreground/70 mb-4">
              No services are currently available. Please check the database or contact support.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setError(null);
                setLoading(true);
                apiClient.getServices()
                  .then((data) => {
                    setServices(data || []);
                  })
                  .catch((error: any) => {
                    setError(error?.message || "Failed to load services. Please try again.");
                  })
                  .finally(() => {
                    setLoading(false);
                  });
              }}
              className="font-body tracking-wide uppercase group"
            >
              <RefreshCw className="mr-2 h-4 w-4 group-hover:rotate-180 transition-transform" />
              Retry
            </Button>
          </div>
        ) : (
          <div className="space-y-3 py-4">
            {availableServices.map((service) => {
              const isSelected = selectedServiceId === service.id;
              const labelText = `${service.title} (${service.duration} mins)`;

              return (
                <label
                  key={service.id}
                  htmlFor={`consultation-${service.id}`}
                  className={`flex items-start gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    isSelected
                      ? "border-secondary bg-secondary/10"
                      : "border-border hover:border-secondary/50 bg-background"
                  }`}
                >
                  <div className="mt-1 flex-shrink-0">
                    <Checkbox
                      id={`consultation-${service.id}`}
                      checked={isSelected}
                      onCheckedChange={(checked) => {
                        // Single-select behavior: uncheck all others when one is checked
                        if (checked) {
                          handleSelect(service.id);
                        } else {
                          // Allow unchecking by clicking again
                          handleSelect("");
                        }
                      }}
                      className="h-5 w-5"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="font-display text-base text-foreground mb-1">
                      {labelText}
                    </div>
                    {service.description || service.shortDescription ? (
                      <p className="font-body text-sm text-foreground/60 mb-2">
                        {service.description || service.shortDescription}
                      </p>
                    ) : null}
                    {service.price && (
                      <div className="flex items-center gap-2 text-xs font-body">
                        <span className="text-secondary font-medium">
                          ₹{service.price.toLocaleString("en-IN")}
                        </span>
                      </div>
                    )}
                  </div>
                </label>
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
            disabled={!selectedServiceId || loading || !!error}
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-body tracking-wide uppercase disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConsultationSelectionModal;
