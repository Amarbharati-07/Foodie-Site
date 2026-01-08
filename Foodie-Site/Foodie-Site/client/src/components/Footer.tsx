import { Link } from "wouter";
import { Facebook, Instagram, Twitter, MapPin, Phone, Clock, UtensilsCrossed } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white pt-20 pb-10 border-t border-white/5">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white">
                <UtensilsCrossed size={24} />
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-2xl leading-none">SHRI KRISHNA</span>
                <span className="text-xs uppercase tracking-widest text-gray-400 mt-1">Pure Vegetarian</span>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed text-sm">
              Experience the authentic taste of Indian cuisine. We serve pure vegetarian dishes made with love, fresh ingredients, and traditional recipes.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:pl-8">
            <h3 className="font-serif text-xl mb-6">Explore</h3>
            <ul className="space-y-4">
              {['Home', 'Menu', 'About Us', 'Gallery', 'Contact'].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase().replace(' ', '') === 'home' ? '' : item.toLowerCase().replace(' ', '')}`}>
                    <div className="text-gray-400 hover:text-primary transition-colors cursor-pointer text-sm tracking-wide uppercase">
                      {item}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-serif text-xl mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-gray-400 text-sm">
                <MapPin className="text-primary mt-0.5 shrink-0" size={18} />
                <span>Station Road, Near Shiv Mandir,<br />Ambernath (West), Thane 421501</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400 text-sm">
                <Phone className="text-primary shrink-0" size={18} />
                <a href="tel:+917028684786" className="hover:text-white transition-colors">+91 7028684786</a>
              </li>
              <li className="flex items-center space-x-3 text-gray-400 text-sm">
                <Clock className="text-primary shrink-0" size={18} />
                <span>Mon - Sun: 8:45 AM - 10:45 PM</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-serif text-xl mb-6">Opening Hours</h3>
            <div className="space-y-2 text-gray-400 text-sm">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span>Breakfast</span>
                <span>8:45 AM - 11:30 AM</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span>Lunch</span>
                <span>12:00 PM - 3:30 PM</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span>Dinner</span>
                <span>7:00 PM - 10:45 PM</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Shri Krishna Restaurant. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
