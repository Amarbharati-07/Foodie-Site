import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Menu, X, Phone, UtensilsCrossed } from "lucide-react";
import { cn } from "../lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Menu", href: "/menu" },
    { name: "About", href: "/about" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav
      className={cn(
        "fixed w-full z-50 transition-all duration-300 font-sans",
        scrolled ? "bg-white shadow-md py-3" : "bg-black/20 backdrop-blur-sm py-4"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 group cursor-pointer shrink-0">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white group-hover:scale-105 transition-transform duration-300 shadow-lg shadow-primary/30">
              <UtensilsCrossed size={20} />
            </div>
            <div className="flex flex-col">
              <span className={cn(
                "font-serif font-bold text-lg md:text-xl leading-none tracking-wide",
                scrolled ? "text-foreground" : "text-white"
              )}>
                SHRI KRISHNA
              </span>
              <span className={cn(
                "text-[0.6rem] md:text-[0.65rem] uppercase tracking-widest font-medium opacity-90",
                scrolled ? "text-muted-foreground" : "text-white/90"
              )}>
                Pure Vegetarian
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href}>
                <div className={cn(
                  "text-sm font-semibold tracking-wider uppercase cursor-pointer relative py-1 transition-colors duration-300",
                  location === link.href 
                    ? "text-primary after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary" 
                    : scrolled ? "text-foreground hover:text-primary" : "text-white hover:text-primary"
                )}>
                  {link.name}
                </div>
              </Link>
            ))}
            <a 
              href="tel:+917028684786" 
              className={cn(
                "flex items-center space-x-2 px-5 py-2.5 rounded-full font-bold text-sm transition-all duration-300 shadow-md hover:shadow-lg active:scale-95",
                scrolled 
                  ? "bg-primary text-white hover:bg-primary/90 shadow-primary/20" 
                  : "bg-white text-primary hover:bg-primary hover:text-white shadow-black/10"
              )}
            >
              <Phone size={14} />
              <span>Call Now</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={cn(
              "md:hidden p-2 rounded-full backdrop-blur-sm transition-colors",
              scrolled ? "bg-muted text-foreground" : "bg-white/10 text-white"
            )}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden fixed inset-0 top-0 bg-background z-40 flex flex-col pt-24 px-6"
          >
             <button
                className="absolute top-6 right-6 p-2 rounded-full bg-muted text-foreground"
                onClick={() => setIsOpen(false)}
              >
                <X size={24} />
              </button>
            <div className="flex flex-col space-y-6 text-center">
              {navLinks.map((link) => (
                <Link key={link.name} href={link.href}>
                  <div 
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "text-2xl font-serif cursor-pointer py-2",
                      location === link.href ? "text-primary italic" : "text-foreground"
                    )}
                  >
                    {link.name}
                  </div>
                </Link>
              ))}
              <div className="pt-8 flex justify-center">
                <a 
                  href="tel:+917028684786"
                  className="bg-primary text-white px-8 py-3 rounded-full text-lg font-medium shadow-xl shadow-primary/30 flex items-center space-x-3"
                >
                  <Phone size={20} />
                  <span>+91 7028684786</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
