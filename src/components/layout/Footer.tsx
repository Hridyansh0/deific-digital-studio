import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative mt-32 border-t border-border/60 bg-card-elegant">
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
      <div className="container py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-1">
          <Link to="/" className="flex items-center gap-2 font-display font-bold text-xl">
            <span className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-accent grid place-items-center shadow-glow">
              <span className="text-primary-foreground font-black">D</span>
            </span>
            <span className="text-gradient">Deific Digital</span>
          </Link>
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
            Cinematic web design, 3D experiences, motion graphics & VFX for ambitious brands.
          </p>
          <div className="flex gap-3 mt-6">
            {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
              <a key={i} href="#" className="w-9 h-9 grid place-items-center rounded-lg glass hover:shadow-glow transition-all">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display font-semibold mb-4">Explore</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/services" className="hover:text-foreground transition">Services</Link></li>
            <li><Link to="/portfolio" className="hover:text-foreground transition">Portfolio</Link></li>
            <li><Link to="/about" className="hover:text-foreground transition">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-foreground transition">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold mb-4">Services</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Web Design & Development</li>
            <li>3D Animation & VFX</li>
            <li>Motion Graphics</li>
            <li>Branding & UI/UX</li>
            <li>Digital Marketing</li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold mb-4">Get in Touch</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-2"><Phone className="w-4 h-4 mt-0.5 text-accent" /> +91 99999 88888</li>
            <li className="flex gap-2"><Mail className="w-4 h-4 mt-0.5 text-accent" /> hello@deificdigital.com</li>
            <li className="flex gap-2"><MapPin className="w-4 h-4 mt-0.5 text-accent" /> India · Worldwide</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/60">
        <div className="container py-6 flex flex-col md:flex-row items-center justify-between text-xs text-muted-foreground gap-2">
          <p>© {new Date().getFullYear()} Deific Digital Studio. All rights reserved.</p>
          <p>Crafted with vision · Animated with code.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
