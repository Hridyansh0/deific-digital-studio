import { motion } from "framer-motion";
import SectionHeader from "@/components/sections/SectionHeader";
import { Award, Heart, Rocket, Sparkles, Users } from "lucide-react";

const values = [
  { icon: Sparkles, title: "Cinematic Craft", desc: "Every pixel, frame and interaction is treated like a shot in a film." },
  { icon: Rocket, title: "Velocity", desc: "We ship in weeks, not quarters — without sacrificing quality." },
  { icon: Heart, title: "Partnership", desc: "We treat your brand like our own. Your wins are our wins." },
  { icon: Award, title: "Award-Worthy", desc: "Work designed to win awards and convert customers." },
];

const team = [
  { name: "Anaya Sharma", role: "Creative Director" },
  { name: "Vikram Iyer", role: "3D & VFX Lead" },
  { name: "Riya Kapoor", role: "Motion Designer" },
  { name: "Arjun Verma", role: "Lead Engineer" },
];

const About = () => {
  return (
    <div>
      <section className="py-20 bg-hero relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="container relative">
          <SectionHeader
            eyebrow="About us"
            title={<>A studio of <span className="text-gradient">obsessive craftspeople</span></>}
            description="Deific Digital is a multidisciplinary creative studio building cinematic experiences for ambitious brands across the globe."
          />
        </div>
      </section>

      <section className="py-20">
        <div className="container grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="font-display text-3xl md:text-4xl font-bold leading-tight">
              We blend <span className="text-gradient">design, code and cinema</span> into work that moves people.
            </h3>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Born from a love for film, motion and the open web, Deific Digital is where 3D artists, designers and engineers
              collaborate from day one. The result: digital products that feel like trailers — and convert like landing pages.
            </p>
            <div className="grid grid-cols-3 gap-4 mt-8">
              {[
                { v: "510+", l: "Websites" },
                { v: "770+", l: "Projects" },
                { v: "400+", l: "Clients" },
              ].map((s) => (
                <div key={s.l} className="bg-card-elegant border border-border rounded-2xl p-4 text-center">
                  <div className="font-display text-2xl font-bold text-gradient">{s.v}</div>
                  <div className="text-xs text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative h-[420px]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 rounded-3xl blur-3xl" />
            <div className="relative h-full bg-card-elegant border border-border rounded-3xl p-8 grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-primary/20 to-transparent rounded-2xl p-6 animate-float">
                <Users className="w-8 h-8 text-accent mb-3" />
                <p className="font-display font-semibold">Global team</p>
                <p className="text-xs text-muted-foreground mt-1">Across 4 continents</p>
              </div>
              <div className="bg-gradient-to-br from-accent/20 to-transparent rounded-2xl p-6 animate-float" style={{ animationDelay: "1s" }}>
                <Award className="w-8 h-8 text-primary mb-3" />
                <p className="font-display font-semibold">Award-winning</p>
                <p className="text-xs text-muted-foreground mt-1">Featured globally</p>
              </div>
              <div className="bg-gradient-to-br from-accent/20 to-transparent rounded-2xl p-6 animate-float col-span-2" style={{ animationDelay: "0.5s" }}>
                <Sparkles className="w-8 h-8 text-accent mb-3" />
                <p className="font-display font-semibold">9+ years of cinematic craft</p>
                <p className="text-xs text-muted-foreground mt-1">Trusted by 400+ brands worldwide</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 border-t border-border/60">
        <div className="container">
          <SectionHeader eyebrow="Our values" title={<>What we <span className="text-gradient">live by</span></>} />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-card-elegant border border-border rounded-2xl p-6 hover:border-primary/40 transition"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 grid place-items-center mb-4">
                  <v.icon className="w-6 h-6 text-accent" />
                </div>
                <h4 className="font-display font-semibold text-lg">{v.title}</h4>
                <p className="text-sm text-muted-foreground mt-2">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <SectionHeader eyebrow="The crew" title={<>Meet the <span className="text-gradient">makers</span></>} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
            {team.map((m, i) => (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-card-elegant border border-border rounded-2xl overflow-hidden group"
              >
                <div className="aspect-square bg-gradient-to-br from-primary/30 to-accent/30 grid place-items-center">
                  <span className="font-display text-6xl font-bold text-foreground/30">
                    {m.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>
                <div className="p-4 text-center">
                  <p className="font-display font-semibold">{m.name}</p>
                  <p className="text-xs text-muted-foreground">{m.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
