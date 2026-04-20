import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        scrolled ? "glass py-3" : "py-5 bg-transparent"
      )}
    >
      <nav className="container flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-display font-bold text-xl">
          <span className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-accent grid place-items-center shadow-glow">
            <span className="text-primary-foreground font-black">D</span>
          </span>
          <span className="text-gradient">Deific</span>
          <span className="text-foreground/80">Digital</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                cn(
                  "px-4 py-2 text-sm font-medium rounded-lg transition-colors relative",
                  isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                )
              }
            >
              {({ isActive }) => (
                <>
                  {l.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-3 -bottom-0.5 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full"
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        <div className="hidden md:block">
          <Button asChild className="bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 shadow-glow">
            <Link to="/contact">Start a Project</Link>
          </Button>
        </div>

        <button className="md:hidden p-2" onClick={() => setOpen((v) => !v)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden glass mt-3 mx-4 rounded-2xl p-4 flex flex-col gap-1"
          >
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "px-4 py-3 rounded-lg",
                    isActive ? "bg-secondary text-foreground" : "text-muted-foreground"
                  )
                }
              >
                {l.label}
              </NavLink>
            ))}
            <Button asChild className="mt-2 bg-gradient-to-r from-primary to-accent text-primary-foreground">
              <Link to="/contact">Start a Project</Link>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
