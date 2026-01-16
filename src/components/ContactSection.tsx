import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { apiClient } from "@/lib/api";

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      await apiClient.submitContact({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        message: formData.message,
      });
      
      toast({ 
        title: "Inquiry Received", 
        description: "We will respond within 24 hours with complete discretion." 
      });
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to submit inquiry. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <span className="text-sm font-body tracking-[0.3em] uppercase text-secondary">Begin Your Consultation</span>
            <h2 className="font-display text-4xl md:text-5xl text-foreground mt-4 mb-8">Private Inquiry</h2>
            <p className="font-body text-foreground/70 leading-relaxed mb-10">All communications are handled with absolute discretion. Initial consultations are by appointment only.</p>

            <div className="space-y-6">
              {[
                { icon: Mail, label: "Email", value: "advisory@planetnakshatra.com" },
                { icon: Phone, label: "Private Line", value: "Available upon inquiry" },
                { icon: MapPin, label: "Consultations", value: "Mumbai • Delhi • Virtual" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded bg-secondary/10 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <p className="font-body text-sm text-foreground/50 uppercase tracking-wide">{item.label}</p>
                    <p className="font-body text-foreground">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}>
            <form onSubmit={handleSubmit} className="card-elegant p-8 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-body text-sm text-foreground/70 mb-2 uppercase tracking-wide">Full Name</label>
                  <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="bg-background border-border focus:border-secondary font-body" required />
                </div>
                <div>
                  <label className="block font-body text-sm text-foreground/70 mb-2 uppercase tracking-wide">Email</label>
                  <Input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="bg-background border-border focus:border-secondary font-body" required />
                </div>
              </div>
              <div>
                <label className="block font-body text-sm text-foreground/70 mb-2 uppercase tracking-wide">Phone (Optional)</label>
                <Input value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="bg-background border-border focus:border-secondary font-body" />
              </div>
              <div>
                <label className="block font-body text-sm text-foreground/70 mb-2 uppercase tracking-wide">Nature of Inquiry</label>
                <Textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="bg-background border-border focus:border-secondary font-body min-h-[120px]" placeholder="Please describe your requirements..." required />
              </div>
              <Button 
                type="submit" 
                size="lg" 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-body tracking-wide uppercase group"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Private Inquiry
                    <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
              <p className="text-xs font-body text-foreground/40 text-center">All inquiries are treated with complete confidentiality</p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
