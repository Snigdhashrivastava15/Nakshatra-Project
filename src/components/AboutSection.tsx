import { motion } from "framer-motion";
import { Award, BookOpen, Users, Globe } from "lucide-react";

const credentials = [
  { icon: BookOpen, title: "35+ Years", description: "Of dedicated Vedic study and practice" },
  { icon: Users, title: "2,000+", description: "Distinguished clients worldwide" },
  { icon: Award, title: "Legacy", description: "Third-generation astrologer lineage" },
  { icon: Globe, title: "Global", description: "Advisory across continents" },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <span className="text-sm font-body tracking-[0.3em] uppercase text-secondary">About the Advisor</span>
            <h2 className="font-display text-4xl md:text-5xl text-foreground mt-4 mb-8">Astrologer Sameer</h2>
            <div className="space-y-6 font-body text-foreground/70 leading-relaxed">
              <p>Born into a distinguished lineage of Vedic scholars, Astrologer Sameer represents the convergence of ancient wisdom and contemporary insight. His mastery spans the complete spectrum of Jyotish Shastra.</p>
              <p>What distinguishes his practice is an unwavering commitment to discretion and precision. Each consultation is conducted with the confidentiality befitting the stature of his clientele.</p>
              <p>His methodology synthesizes classical techniques with pragmatic application, delivering insights that inform consequential decisions with clarity and conviction.</p>
            </div>
            <div className="mt-10 pt-8 border-t border-border">
              <p className="font-display text-2xl italic text-foreground/80">"The stars illuminate the path; wisdom guides the journey."</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="grid grid-cols-2 gap-6">
            {credentials.map((item, index) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }} className="card-elegant p-8 text-center">
                <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-7 h-7 text-secondary" />
                </div>
                <h3 className="font-display text-3xl text-foreground mb-2">{item.title}</h3>
                <p className="font-body text-sm text-foreground/60">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
