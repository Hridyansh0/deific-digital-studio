import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SectionHeader from "@/components/sections/SectionHeader";

const categories = ["All", "Web", "3D & VFX", "Motion", "Branding"];

const projects = [
  { title: "Nova Aerospace", category: "3D & VFX", color: "from-purple-500/40 to-cyan-500/40", year: "2024" },
  { title: "Helix Studios", category: "Web", color: "from-cyan-500/40 to-blue-500/40", year: "2024" },
  { title: "Orbit Labs Launch", category: "Motion", color: "from-pink-500/40 to-purple-500/40", year: "2024" },
  { title: "Vortex Energy", category: "Branding", color: "from-amber-500/40 to-pink-500/40", year: "2023" },
  { title: "Pulse Wearables", category: "3D & VFX", color: "from-emerald-500/40 to-cyan-500/40", year: "2023" },
  { title: "Apex Finance", category: "Web", color: "from-blue-500/40 to-purple-500/40", year: "2023" },
  { title: "Quanta AI", category: "Motion", color: "from-violet-500/40 to-fuchsia-500/40", year: "2024" },
  { title: "Mirage Hotels", category: "Web", color: "from-rose-500/40 to-orange-500/40", year: "2023" },
  { title: "Echelon Sports", category: "Branding", color: "from-cyan-500/40 to-emerald-500/40", year: "2024" },
];

const Portfolio = () => {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div>
      <section className="py-20 bg-hero relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="container relative">
          <SectionHeader
            eyebrow="Our work"
            title={<>Recent <span className="text-gradient">cinematic</span> projects</>}
            description="A glimpse into worlds we've built for clients across the globe."
          />
        </div>
      </section>

      <section className="py-12">
        <div className="container">
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === c
                    ? "bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-glow"
                    : "glass text-muted-foreground hover:text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p, i) => (
              <motion.a
                href="#"
                key={p.title}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group relative aspect-[4/5] rounded-2xl overflow-hidden border border-border bg-card-elegant"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${p.color}`} />
                <div className="absolute inset-0 grid-bg opacity-30" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full glass grid place-items-center opacity-0 group-hover:opacity-100 group-hover:rotate-45 transition-all">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
                <div className="absolute bottom-0 inset-x-0 p-6">
                  <p className="text-xs uppercase tracking-widest text-accent">{p.category} · {p.year}</p>
                  <h3 className="font-display text-2xl font-bold mt-2 group-hover:text-gradient transition">{p.title}</h3>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
