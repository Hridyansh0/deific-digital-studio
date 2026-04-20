import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Code2, Boxes, Film, Palette, Megaphone, ShoppingBag, Star, Quote } from "lucide-react";
import HeroScene from "@/components/three/HeroScene";
import SectionHeader from "@/components/sections/SectionHeader";
import { Button } from "@/components/ui/button";

const services = [
  { icon: Code2, title: "Web Design & Development", desc: "Cinematic, conversion-focused websites." },
  { icon: Boxes, title: "3D Animation & VFX", desc: "Photorealistic 3D and visual effects." },
  { icon: Film, title: "Motion Graphics", desc: "Brand films, explainers and kinetic typography." },
  { icon: Palette, title: "Branding & UI/UX", desc: "Identity systems and digital product design." },
  { icon: Megaphone, title: "Digital Marketing", desc: "SEO, performance ads and content." },
  { icon: ShoppingBag, title: "E-commerce", desc: "Shopify and custom storefronts." },
];

const stats = [
  { value: "510+", label: "Websites Delivered" },
  { value: "770+", label: "Projects Completed" },
  { value: "400+", label: "Happy Clients" },
  { value: "9+", label: "Years of Craft" },
];

const clients = ["Lumen", "Nova", "Helix", "Orbit", "Vortex", "Pulse", "Flux", "Apex", "Quanta", "Zenith", "Mirage", "Echelon"];

const testimonials = [
  { name: "Aarav Mehta", role: "Founder, NovaTech", text: "Deific transformed our brand. The 3D hero alone tripled our demo signups." },
  { name: "Sara Khan", role: "CMO, Helix Studios", text: "Cinematic, fast and on-brand. Best agency we've worked with — globally." },
  { name: "Daniel Park", role: "CEO, Orbit Labs", text: "Their motion work is unreal. We've never had a launch perform this well." },
];

const Home = () => {
  return (
    <div>
      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-hero">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute inset-0 -z-0">
          <HeroScene />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background pointer-events-none" />

        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full text-xs uppercase tracking-[0.25em] text-accent font-semibold mb-6">
              <Sparkles className="w-3 h-3" /> Award-winning creative studio
            </span>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95]">
              We craft <span className="text-gradient">cinematic</span><br />
              digital experiences.
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Web design, 3D animation, VFX and motion graphics for brands that refuse to be ordinary.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-glow hover:opacity-90">
                <Link to="/contact">Start a Project <ArrowRight className="ml-2 w-4 h-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="glass">
                <Link to="/portfolio">View Our Work</Link>
              </Button>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs text-muted-foreground tracking-widest uppercase animate-bounce">
          Scroll
        </div>
      </section>

      {/* STATS */}
      <section className="py-20 border-y border-border/60">
        <div className="container grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="font-display text-4xl md:text-6xl font-bold text-gradient">{s.value}</div>
              <div className="mt-2 text-xs md:text-sm uppercase tracking-widest text-muted-foreground">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-24">
        <div className="container">
          <SectionHeader
            eyebrow="What we do"
            title={<>Services that <span className="text-gradient">push the medium</span></>}
            description="From your first 3D pixel to the final pixel-perfect deployment."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="group relative bg-card-elegant border border-border rounded-2xl p-6 hover:border-primary/50 transition-all overflow-hidden"
              >
                <div className="absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl" />
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 grid place-items-center mb-4 group-hover:shadow-glow transition-shadow">
                    <s.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-display font-semibold text-xl">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="outline" className="glass">
              <Link to="/services">Explore all services <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CLIENTS MARQUEE */}
      <section className="py-16 border-y border-border/60 overflow-hidden">
        <p className="text-center text-xs uppercase tracking-[0.3em] text-muted-foreground mb-8">Trusted by ambitious brands worldwide</p>
        <div className="relative">
          <div className="flex gap-16 animate-marquee whitespace-nowrap">
            {[...clients, ...clients].map((c, i) => (
              <span key={i} className="font-display text-2xl md:text-3xl text-muted-foreground/60 hover:text-foreground transition">
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24">
        <div className="container">
          <SectionHeader
            eyebrow="Client love"
            title={<>What clients <span className="text-gradient">are saying</span></>}
          />
          <div className="grid md:grid-cols-3 gap-6 mt-14">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card-elegant border border-border rounded-2xl p-6 relative"
              >
                <Quote className="w-8 h-8 text-primary/40 mb-2" />
                <p className="text-foreground/90 leading-relaxed">"{t.text}"</p>
                <div className="flex gap-1 mt-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container">
          <div className="relative bg-gradient-to-br from-primary/20 via-card to-accent/20 border border-border rounded-3xl p-10 md:p-16 text-center overflow-hidden">
            <div className="absolute inset-0 grid-bg opacity-20" />
            <div className="relative">
              <h2 className="font-display text-3xl md:text-5xl font-bold">Ready to build something <span className="text-gradient">unforgettable</span>?</h2>
              <p className="mt-4 text-muted-foreground max-w-xl mx-auto">Let's craft a digital experience your audience won't scroll past.</p>
              <Button asChild size="lg" className="mt-8 bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-glow">
                <Link to="/contact">Start your project <ArrowRight className="ml-2 w-4 h-4" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
