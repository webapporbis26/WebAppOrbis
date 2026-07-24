import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Facebook, Twitter, Instagram, Linkedin, MessageCircle, Shield, Youtube, Plus, Minus } from "lucide-react";

function FooterSection({ title, children, colorClass, borderClass }: { title: string, children: React.ReactNode, colorClass: string, borderClass: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col border-b border-white/10 md:border-none py-4 md:py-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full md:cursor-default focus:outline-none md:pointer-events-none group"
      >
        <h3 className={`text-[15px] md:text-sm font-light md:font-bold md:uppercase md:tracking-widest md:inline-block md:border-b-2 md:pb-2 md:w-max md:mb-2 ${colorClass} ${borderClass}`}>
          {title}
        </h3>
        <span className={`md:hidden ${colorClass}`}>
          {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </span>
      </button>
      <div className={`mt-4 md:mt-0 overflow-hidden transition-all duration-300 md:!max-h-none md:!opacity-100 ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
        {children}
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="relative bg-[#050505] text-white pt-10 md:pt-24 pb-6 px-5 sm:px-8 border-t border-white/10 font-sans">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:grid md:grid-cols-3 gap-y-0 md:gap-y-12 md:gap-x-16 border-t border-white/10 md:border-none">
          
          {/* Column 1: Company */}
          <FooterSection title="Company" colorClass="text-blue-500" borderClass="md:border-blue-500">
            <ul className="flex flex-col gap-3.5 text-[15px] font-medium text-gray-400 mb-4 md:mb-0">
              <li><Link to="/" className="hover:text-white transition-all duration-300 inline-block hover:translate-x-1">Home</Link></li>
              <li><Link to="/about" className="hover:text-white transition-all duration-300 inline-block hover:translate-x-1">About Us</Link></li>
              <li><Link to="/portfolio" className="hover:text-white transition-all duration-300 inline-block hover:translate-x-1">Our Works</Link></li>
              <li><a href="#" className="hover:text-white transition-all duration-300 inline-block hover:translate-x-1">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-all duration-300 inline-block hover:translate-x-1">Blogs</a></li>
              <li><a href="#" className="hover:text-white transition-all duration-300 inline-block hover:translate-x-1">Clients</a></li>
              <li><Link to="/contact" className="hover:text-white transition-all duration-300 inline-block hover:translate-x-1">Contact</Link></li>
            </ul>
          </FooterSection>

          {/* Column 2: Our Services */}
          <FooterSection title="Our Services" colorClass="text-cyan-400" borderClass="md:border-cyan-400">
            <ul className="flex flex-col gap-3.5 text-[15px] font-medium text-gray-400 mb-4 md:mb-0">
              <li><Link to="/services" className="hover:text-white transition-all duration-300 inline-block hover:translate-x-1">Web Designing & Development</Link></li>
              <li><a href="#" className="hover:text-white transition-all duration-300 inline-block hover:translate-x-1">Digital Marketing</a></li>
              <li><a href="#" className="hover:text-white transition-all duration-300 inline-block hover:translate-x-1">Ecommerce Web Development</a></li>
              <li><a href="#" className="hover:text-white transition-all duration-300 inline-block hover:translate-x-1">SEO Services</a></li>
              <li><a href="#" className="hover:text-white transition-all duration-300 inline-block hover:translate-x-1">Graphics & Branding</a></li>
              <li><a href="#" className="hover:text-white transition-all duration-300 inline-block hover:translate-x-1">Mobile App Development</a></li>
              <li><a href="#" className="hover:text-white transition-all duration-300 inline-block hover:translate-x-1">Social Media Optimization</a></li>
            </ul>
          </FooterSection>

          {/* Column 3: Join Us */}
          <div className="flex flex-col pt-4 md:pt-0">
            <h3 className="text-[15px] md:text-sm font-light md:font-bold md:uppercase md:tracking-widest md:inline-block md:border-b-2 md:pb-2 md:w-max mb-4 md:mb-2 text-yellow-500 md:border-yellow-500">
              Join Us
            </h3>
            <div className="flex flex-row items-center gap-4 mt-1">
              <a href="https://www.facebook.com/profile.php?id=61577380003721" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:-translate-y-1 transition-all duration-300 bg-white/5 hover:bg-[#1877F2] p-3 rounded-full group">
                <Facebook className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              </a>
              <a href="https://www.instagram.com/enem.pvt.ltd?igsh=aGZ2NGc1ODM3aWZ4" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:-translate-y-1 transition-all duration-300 bg-white/5 hover:bg-[#E4405F] p-3 rounded-full group">
                <Instagram className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              </a>
              <a href="https://www.youtube.com/@e_n_e_m?si=qJcn3W7-psF0OWvR" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:-translate-y-1 transition-all duration-300 bg-white/5 hover:bg-[#FF0000] p-3 rounded-full group">
                <Youtube className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:-translate-y-1 transition-all duration-300 bg-white/5 hover:bg-[#0A66C2] p-3 rounded-full group">
                <Linkedin className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-4 pb-0 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-gray-500">
          <p>Copyright © 2026. WebApp Orbis. All Rights Reserved</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <span className="text-gray-700">/</span>
            <a href="#" className="hover:text-white transition-colors">Terms and Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
