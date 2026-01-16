import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  { quote: "The strategic counsel provided has been instrumental in navigating complex business transitions. An invaluable advisor.", author: "Chairman", company: "Fortune 500 Conglomerate" },
  { quote: "For matters of consequence—from investments to alliances—the guidance has proven remarkably prescient.", author: "Managing Director", company: "Private Equity Firm" },
  { quote: "Our family has relied on this wisdom for succession planning. The discretion and insight are unparalleled.", author: "Patriarch", company: "Industrial Dynasty" },
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-16">
          <span className="text-sm font-body tracking-[0.3em] uppercase text-secondary">Client Perspectives</span>
          <h2 className="font-display text-4xl md:text-5xl text-foreground mt-4 mb-6 deco-line">Words of Trust</h2>
          <p className="font-body text-foreground/70 max-w-xl mx-auto mt-8 text-sm">Confidential testimonials from distinguished clients who entrust their most consequential decisions to our guidance.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.15 }} className="card-elegant p-8 relative">
              <Quote className="w-10 h-10 text-secondary/20 absolute top-6 right-6" />
              <p className="font-body text-foreground/80 leading-relaxed mb-8 italic">"{testimonial.quote}"</p>
              <div className="border-t border-border pt-6">
                <p className="font-display text-foreground">{testimonial.author}</p>
                <p className="font-body text-sm text-foreground/50 mt-1">{testimonial.company}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.5 }} className="text-center mt-12 font-body text-xs text-foreground/40 tracking-wide">
          All testimonials are anonymized to protect client confidentiality
        </motion.p>
      </div>
    </section>
  );
};

export default TestimonialsSection;
