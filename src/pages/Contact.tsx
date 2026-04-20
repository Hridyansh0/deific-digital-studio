import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send, Check } from "lucide-react";
import SectionHeader from "@/components/sections/SectionHeader";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Contact = () => {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setSent(true);
    toast.success("Thanks! We'll get back to you within 24 hours.");
  };

  return (
    <div>
      <section className="py-20 bg-hero relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="container relative">
          <SectionHeader
            eyebrow="Get in touch"
            title={<>Let's build something <span className="text-gradient">unforgettable</span></>}
            description="Tell us about your project. We reply within 24 hours."
          />
        </div>
      </section>

      <section className="py-12">
        <div className="container grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-4">
            {[
              { icon: Phone, title: "Call us", value: "+91 99999 88888", href: "tel:+919999988888" },
              { icon: Mail, title: "Email", value: "hello@deificdigital.com", href: "mailto:hello@deificdigital.com" },
              { icon: MapPin, title: "Studio", value: "India · Worldwide" },
            ].map((c, i) => (
              <motion.a
                key={c.title}
                href={c.href}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="block bg-card-elegant border border-border rounded-2xl p-6 hover:border-primary/40 transition group"
              >
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 grid place-items-center mb-3 group-hover:shadow-glow transition">
                  <c.icon className="w-5 h-5 text-accent" />
                </div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">{c.title}</p>
                <p className="font-display font-semibold mt-1">{c.value}</p>
              </motion.a>
            ))}

            <div className="bg-gradient-to-br from-primary/20 to-accent/20 border border-border rounded-2xl p-6">
              <p className="font-display font-semibold">Free consultation</p>
              <p className="text-sm text-muted-foreground mt-1">30-min strategy call. No commitment.</p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 bg-card-elegant border border-border rounded-3xl p-8 md:p-10"
          >
            {sent ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent grid place-items-center mx-auto shadow-glow">
                  <Check className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="font-display text-2xl font-bold mt-6">Message received</h3>
                <p className="text-muted-foreground mt-2">We'll be in touch within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <Field label="Your name" name="name" required />
                  <Field label="Email" name="email" type="email" required />
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  <Field label="Company" name="company" />
                  <Field label="Budget (optional)" name="budget" placeholder="e.g. $5,000+" />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest text-muted-foreground">Service</label>
                  <select required className="mt-2 w-full bg-secondary/60 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/40 text-sm">
                    <option>Web Design & Development</option>
                    <option>3D Animation & VFX</option>
                    <option>Motion Graphics</option>
                    <option>Branding & UI/UX</option>
                    <option>Digital Marketing</option>
                    <option>Other / Mixed</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest text-muted-foreground">Tell us about your project</label>
                  <textarea required rows={5} className="mt-2 w-full bg-secondary/60 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/40 text-sm resize-none" placeholder="Goals, timeline, references..." />
                </div>
                <Button type="submit" size="lg" disabled={loading} className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-glow">
                  {loading ? "Sending..." : <>Send message <Send className="ml-2 w-4 h-4" /></>}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

const Field = ({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) => (
  <div>
    <label className="text-xs uppercase tracking-widest text-muted-foreground">{label}</label>
    <input {...props} className="mt-2 w-full bg-secondary/60 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/40 text-sm" />
  </div>
);

export default Contact;
