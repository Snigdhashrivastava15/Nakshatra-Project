import planetNakshatraLogo from "@/assets/planet-nakshatra-logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-4 mb-6">
              <img 
                src={planetNakshatraLogo} 
                alt="Planet Nakshatra Logo" 
                className="h-16 w-auto object-contain hover:scale-105 transition-transform duration-300" 
              />
              <div>
                <span className="font-display text-xl text-background">Planet Nakshatra</span>
                <div className="text-xs text-background/50 tracking-[0.2em] uppercase">By Sameer</div>
              </div>
            </div>
            <p className="font-body text-background/60 leading-relaxed max-w-md">Exclusive astrological counsel for those who shape industries, steward legacies, and make decisions of consequence.</p>
          </div>
          <div>
            <h4 className="font-display text-background mb-6">Navigation</h4>
            <ul className="space-y-3">
              {["Services", "About", "Testimonials", "Contact"].map((link) => (
                <li key={link}><a href={`#${link.toLowerCase()}`} className="font-body text-background/60 hover:text-secondary transition-colors text-sm">{link}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display text-background mb-6">Services</h4>
            <ul className="space-y-3">
              {["Strategic Counsel", "Muhurta Planning", "Legacy Advisory", "Crisis Management"].map((service) => (
                <li key={service}><span className="font-body text-background/60 text-sm">{service}</span></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-background/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-xs text-background/40">© {currentYear} Planet Nakshatra. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="font-body text-xs text-background/40 hover:text-secondary transition-colors">Privacy Policy</a>
            <a href="#" className="font-body text-xs text-background/40 hover:text-secondary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
