import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { apiClient, Service, AvailabilityResponse } from '@/lib/api';
import { format, startOfDay, isBefore } from 'date-fns';
import { Calendar as CalendarIcon, Clock, Loader2, ArrowLeft, Edit } from 'lucide-react';
import ConsultationSelectionModal from './ConsultationSelectionModal';

const BookingSection = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [availability, setAvailability] = useState<AvailabilityResponse | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [loadingAvailability, setLoadingAvailability] = useState(false);
  const [showConsultationModal, setShowConsultationModal] = useState(false);
  const [formData, setFormData] = useState({
    userName: '',
    userEmail: '',
    userPhone: '',
    notes: '',
  });
  const { toast } = useToast();

  // Listen for service selection from consultation modal or other components
  useEffect(() => {
    const handleSelectService = (event: CustomEvent) => {
      const serviceId = event.detail?.serviceId;
      if (serviceId) {
        setServices((prevServices) => {
          const service = prevServices.find((s) => s.id === serviceId);
          if (service) {
            setSelectedService(service);
            // Scroll to booking section if not already visible
            setTimeout(() => {
              const bookingSection = document.getElementById("booking");
              if (bookingSection) {
                bookingSection.scrollIntoView({ behavior: "smooth" });
              }
            }, 100);
          }
          return prevServices;
        });
      }
    };

    // Listen for "Book Consultation" button clicks to open modal
    const handleBookConsultation = (event: Event) => {
      const customEvent = event as CustomEvent;
      const preselectedServiceId = customEvent.detail?.preselectedServiceId;
      setShowConsultationModal(true);
      // If a service was pre-selected, select it after modal opens
      if (preselectedServiceId) {
        setTimeout(() => {
          const service = services.find((s) => s.id === preselectedServiceId);
          if (service) {
            setSelectedService(service);
          }
        }, 100);
      }
      // Scroll to booking section so modal is visible
      setTimeout(() => {
        const bookingSection = document.getElementById("booking");
        if (bookingSection) {
          bookingSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    };

    window.addEventListener("selectService", handleSelectService as EventListener);
    window.addEventListener("openConsultationModal", handleBookConsultation);
    return () => {
      window.removeEventListener("selectService", handleSelectService as EventListener);
      window.removeEventListener("openConsultationModal", handleBookConsultation);
    };
  }, [services]);

  // Handle consultation selection from modal
  const handleConsultationContinue = async (serviceId: string) => {
    // If services aren't loaded yet, load them first
    if (services.length === 0) {
      try {
        const data = await apiClient.getServices();
        setServices(data);
        const service = data.find((s) => s.id === serviceId);
        if (service) {
          setSelectedService(service);
        }
      } catch (error) {
        // Error is already handled in modal
        return;
      }
    } else {
      const service = services.find((s) => s.id === serviceId);
      if (service) {
        setSelectedService(service);
      }
    }
    setShowConsultationModal(false);
    // Scroll to booking section after modal closes
    setTimeout(() => {
      const bookingSection = document.getElementById("booking");
      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 300); // Wait for modal close animation
  };

  const loadAvailability = async () => {
    if (!selectedService || !selectedDate) return;

    try {
      setLoadingAvailability(true);
      const dateStr = format(selectedDate, 'yyyy-MM-dd');
      const data = await apiClient.getAvailability(dateStr, selectedService.id);
      setAvailability(data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load availability. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoadingAvailability(false);
    }
  };

  // Load availability when service or date changes
  useEffect(() => {
    if (selectedService && selectedDate) {
      loadAvailability();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedService?.id, selectedDate]);

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) {
      setSelectedDate(undefined);
      return;
    }

    // Compare dates at start of day to allow today's date
    const today = startOfDay(new Date());
    const selectedDay = startOfDay(date);

    if (isBefore(selectedDay, today)) {
      toast({
        title: 'Invalid Date',
        description: 'Please select today or a future date.',
        variant: 'destructive',
      });
      return;
    }

    setSelectedDate(date);
    setSelectedTime('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedService || !selectedDate || !selectedTime) {
      toast({
        title: 'Missing Information',
        description: 'Please select a service, date, and time.',
        variant: 'destructive',
      });
      return;
    }

    // Validate date is today or future
    const today = startOfDay(new Date());
    const selectedDay = startOfDay(selectedDate);
    if (isBefore(selectedDay, today)) {
      toast({
        title: 'Invalid Date',
        description: 'Please select today or a future date.',
        variant: 'destructive',
      });
      return;
    }

    try {
      setLoading(true);
      const booking = await apiClient.createBooking({
        serviceId: selectedService.id,
        userEmail: formData.userEmail,
        userName: formData.userName,
        userPhone: formData.userPhone || undefined,
        bookingDate: format(selectedDate, 'yyyy-MM-dd'),
        bookingTime: selectedTime,
        notes: formData.notes || undefined,
      });

      toast({
        title: 'Booking Confirmed!',
        description: `Your booking for ${selectedService.title} on ${format(selectedDate, 'PPP')} at ${selectedTime} has been confirmed.`,
      });

      // Reset form
      setFormData({
        userName: '',
        userEmail: '',
        userPhone: '',
        notes: '',
      });
      setSelectedTime('');
      loadAvailability();
    } catch (error: any) {
      toast({
        title: 'Booking Failed',
        description: error.message || 'Failed to create booking. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // Disable past dates (allow today)
  const today = startOfDay(new Date());
  const disabledDates = {
    before: today,
  };

  return (
    <section id="booking" className="py-24 bg-background">
      <ConsultationSelectionModal
        open={showConsultationModal}
        onOpenChange={setShowConsultationModal}
        onContinue={handleConsultationContinue}
        preselectedServiceId={selectedService?.id}
      />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-body tracking-[0.3em] uppercase text-secondary">Book Your Consultation</span>
          <h2 className="font-display text-4xl md:text-5xl text-foreground mt-4 mb-6">Schedule Appointment</h2>
          <p className="font-body text-foreground/70 max-w-2xl mx-auto">
            {selectedService 
              ? "Select your preferred date and time slot for your consultation."
              : "Select your consultation type to begin booking."}
          </p>
        </motion.div>

        {!selectedService ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mx-auto"
          >
            <div className="card-elegant p-12 text-center">
              <p className="font-body text-foreground/70 mb-6">
                Please select a consultation type to continue with your booking.
              </p>
              <Button
                onClick={() => setShowConsultationModal(true)}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-body tracking-wide uppercase"
              >
                Select Consultation Type
              </Button>
            </div>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Left Side - Selected Consultation & Calendar */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Selected Consultation Display */}
              <div className="card-elegant p-6">
                <div className="flex items-start justify-between mb-4">
                  <label className="block font-body text-sm text-foreground/70 uppercase tracking-wide">
                    Selected Consultation
                  </label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowConsultationModal(true)}
                    className="text-secondary hover:text-secondary/80 font-body text-xs uppercase tracking-wide"
                  >
                    <Edit className="w-3 h-3 mr-1" />
                    Change
                  </Button>
                </div>
                <div className="p-4 bg-secondary/10 rounded-lg border border-secondary/20">
                  <h3 className="font-display text-lg text-foreground mb-2">{selectedService.title}</h3>
                  <p className="font-body text-sm text-foreground/60 mb-3">{selectedService.description}</p>
                  <div className="flex items-center gap-4 text-xs font-body text-foreground/70">
                    <span>Duration: {selectedService.duration} minutes</span>
                    {selectedService.price && (
                      <span>Price: ₹{selectedService.price.toLocaleString("en-IN")}</span>
                    )}
                  </div>
                </div>
              </div>

            {/* Calendar */}
            <div className="card-elegant p-6">
              <label className="block font-body text-sm text-foreground/70 mb-4 uppercase tracking-wide">
                Select Date
              </label>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                disabled={disabledDates}
                className="rounded-md border"
              />
            </div>

            {/* Time Slots */}
            {selectedDate && (
              <div className="card-elegant p-6">
                <label className="block font-body text-sm text-foreground/70 mb-4 uppercase tracking-wide flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Available Time Slots
                </label>
                {loadingAvailability ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-6 h-6 animate-spin text-secondary" />
                  </div>
                ) : availability && availability.availableSlots.length > 0 ? (
                  <div className="grid grid-cols-3 gap-3">
                    {availability.availableSlots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => setSelectedTime(slot)}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          selectedTime === slot
                            ? 'border-secondary bg-secondary text-secondary-foreground'
                            : 'border-border hover:border-secondary/50'
                        }`}
                      >
                        <span className="font-body text-sm">{slot}</span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="font-body text-foreground/60 text-center py-4">
                    No available slots for this date. Please select another date.
                  </p>
                )}
              </div>
            )}
            </motion.div>

            {/* Right Side - Booking Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form id="booking-form" onSubmit={handleSubmit} className="card-elegant p-8 space-y-6">
              {/* Selected Consultation Display at Top */}
              {selectedService && (
                <div className="p-5 bg-secondary/10 rounded-lg border-2 border-secondary/20 mb-6">
                  <div className="flex items-start justify-between mb-3">
                    <label className="block font-body text-xs text-foreground/70 uppercase tracking-wide">
                      Selected Consultation: {selectedService.title}
                    </label>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setShowConsultationModal(true);
                        // Scroll to top of form when changing consultation
                        const form = document.getElementById("booking-form");
                        if (form) {
                          form.scrollIntoView({ behavior: "smooth", block: "start" });
                        }
                      }}
                      className="text-secondary hover:text-secondary/80 font-body text-xs uppercase tracking-wide h-auto py-1"
                    >
                      <Edit className="w-3 h-3 mr-1" />
                      Change Consultation
                    </Button>
                  </div>
                  <p className="font-display text-base text-foreground font-medium mb-2">
                    {selectedService.title} ({selectedService.duration} mins)
                  </p>
                  {selectedService.description && (
                    <p className="font-body text-sm text-foreground/60 mt-2">
                      {selectedService.description}
                    </p>
                  )}
                  {selectedService.price && (
                    <div className="flex items-center gap-2 mt-3 text-xs font-body">
                      <span className="text-secondary font-medium">
                        ₹{selectedService.price.toLocaleString("en-IN")}
                      </span>
                    </div>
                  )}
                </div>
              )}

              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display text-2xl text-foreground">Booking Details</h3>
              </div>

              <div>
                <label className="block font-body text-sm text-foreground/70 mb-2 uppercase tracking-wide">
                  Full Name
                </label>
                <Input
                  value={formData.userName}
                  onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                  className="bg-background border-border focus:border-secondary font-body"
                  required
                />
              </div>

              <div>
                <label className="block font-body text-sm text-foreground/70 mb-2 uppercase tracking-wide">
                  Email
                </label>
                <Input
                  type="email"
                  value={formData.userEmail}
                  onChange={(e) => setFormData({ ...formData, userEmail: e.target.value })}
                  className="bg-background border-border focus:border-secondary font-body"
                  required
                />
              </div>

              <div>
                <label className="block font-body text-sm text-foreground/70 mb-2 uppercase tracking-wide">
                  Phone (Optional)
                </label>
                <Input
                  value={formData.userPhone}
                  onChange={(e) => setFormData({ ...formData, userPhone: e.target.value })}
                  className="bg-background border-border focus:border-secondary font-body"
                />
              </div>

              <div>
                <label className="block font-body text-sm text-foreground/70 mb-2 uppercase tracking-wide">
                  Additional Notes (Optional)
                </label>
                <Textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="bg-background border-border focus:border-secondary font-body min-h-[100px]"
                  placeholder="Any specific areas you'd like to discuss..."
                />
              </div>

              {selectedService && selectedDate && selectedTime && (
                <div className="p-4 bg-muted/50 rounded-lg space-y-2">
                  <p className="font-body text-sm text-foreground/70">
                    <strong>Service:</strong> {selectedService.title}
                  </p>
                  <p className="font-body text-sm text-foreground/70">
                    <strong>Date:</strong> {format(selectedDate, 'PPP')}
                  </p>
                  <p className="font-body text-sm text-foreground/70">
                    <strong>Time:</strong> {selectedTime}
                  </p>
                </div>
              )}

              <Button
                type="submit"
                size="lg"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-body tracking-wide uppercase group"
                disabled={loading || !selectedService || !selectedDate || !selectedTime}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Confirm Booking
                    <CalendarIcon className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>

              <p className="text-xs font-body text-foreground/40 text-center">
                A confirmation will be sent to your email address
              </p>
            </form>
          </motion.div>
          </div>
        )}
      </div>
    </section>
  );
};

export default BookingSection;
