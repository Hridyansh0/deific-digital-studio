import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Code2, Boxes, Film, Palette, Megaphone, ShoppingBag, Check, ArrowRight } from "lucide-react";
import SectionHeader from "@/components/sections/SectionHeader";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Code2,
    title: "Web Design & Development",
    tagline: "Cinematic, fast, conversion-focused.",
    bullets: ["React / Next.js / Webflow", "WordPress & Shopify", "Custom 3D + WebGL hero scenes", "Lightning-fast Core Web Vitals"],
  },
  {
    icon: Boxes,
    title: "3D Animation & VFX",
    tagline: "Photorealistic worlds, hyper-real products.",
    bullets: ["Product visualization", "Character animation", "Environmental VFX", "Cinematic camera work"],
  },
  {
    icon: Film,
    title: "Motion Graphics",
    tagline: "Stories that move people — literally.",
    bullets: ["Brand films & explainers", "Kinetic typography", "Social ads & reels", "Title sequences"],
  },
  {
    icon: Palette,
    title: "Branding & UI/UX",
    tagline: "Identity systems and product design.",
    bullets: ["Logo & visual identity", "Design systems", "Mobile & web UI/UX", "Prototyping & user testing"],
  },
  {
    icon: Megaphone,
    title: "Digital Marketing",
    tagline: "Reach audiences. Drive results.",
    bullets: ["SEO & content strategy", "Performance ads (Meta / Google)", "Social media management", "Email marketing"],
  },
  {
    icon: ShoppingBag,
    title: "E-commerce Solutions",
    tagline: "Storefronts that convert.",
    bullets: ["Shopify & WooCommerce", "Custom headless stores", "Payment integrations", "CRO optimization"],
  },
];

const Services = () => {
  return (
    <div>
      <section className="py-20 bg-hero relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="container relative">
          <SectionHeader
            eyebrow="Services"
            title={<>Everything you need to <span className="text-gradient">launch & scale</span></>}
            description="Six end-to-end disciplines, one studio, zero handoffs."
          />
        </div>
      </section>

      <section className="py-16">
        <div className="container space-y-8">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group bg-card-elegant border border-border rounded-3xl p-8 md:p-12 grid md:grid-cols-3 gap-8 hover:border-primary/40 transition-all"
            >
              <div className="md:col-span-1">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 grid place-items-center shadow-glow mb-4">
                  <s.icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="font-display text-2xl md:text-3xl font-bold">{s.title}</h3>
                <p className="text-muted-foreground mt-2">{s.tagline}</p>
              </div>
              <div className="md:col-span-2 grid sm:grid-cols-2 gap-3">
                {s.bullets.map((b) => (
                  <div key={b} className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-gradient-to-br from-primary to-accent grid place-items-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-primary-foreground" />
                    </span>
                    <span className="text-sm text-foreground/90">{b}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <div className="bg-gradient-to-br from-primary/20 via-card to-accent/20 rounded-3xl p-12 text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold">Need a custom blend?</h2>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">Most projects mix 2–3 of our services. Let's design a package that fits.</p>
            <Button asChild size="lg" className="mt-6 bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-glow">
              <Link to="/contact">Get a free quote <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
