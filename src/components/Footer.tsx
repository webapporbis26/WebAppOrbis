import { Link } from "@tanstack/react-router";
import { Facebook, Twitter, Instagram, Linkedin, MessageCircle, Shield, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative bg-[#050505] text-white pt-24 pb-12 px-5 sm:px-8 border-t border-white/10 font-sans">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-y-12 gap-x-6 md:gap-16">
          {/* Column 1: Company */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-bold text-blue-500 uppercase tracking-widest inline-block border-b-2 border-blue-500 pb-2 w-max mb-2">
              Company
            </h3>
            <ul className="flex flex-col gap-3.5 text-[15px] font-medium text-gray-400">
              <li><Link to="/" className="text-yellow-500 hover:text-yellow-400 transition-all duration-300 inline-block hover:translate-x-1">Home</Link></li>
              <li><Link to="/about" className="hover:text-white transition-all duration-300 inline-block hover:translate-x-1">About Us</Link></li>
              <li><Link to="/portfolio" className="hover:text-white transition-all duration-300 inline-block hover:translate-x-1">Our Works</Link></li>
              <li><a href="#" className="hover:text-white transition-all duration-300 inline-block hover:translate-x-1">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-all duration-300 inline-block hover:translate-x-1">Blogs</a></li>
              <li><a href="#" className="hover:text-white transition-all duration-300 inline-block hover:translate-x-1">Clients</a></li>
              <li><Link to="/contact" className="hover:text-white transition-all duration-300 inline-block hover:translate-x-1">Contact</Link></li>
            </ul>
          </div>

          {/* Column 2: Our Services */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-widest inline-block border-b-2 border-cyan-400 pb-2 w-max mb-2">
              Our Services
            </h3>
            <ul className="flex flex-col gap-3.5 text-[15px] font-medium text-gray-400">
              <li><Link to="/services" className="hover:text-white transition-all duration-300 inline-block hover:translate-x-1">Web Designing & Development</Link></li>
              <li><a href="#" className="hover:text-white transition-all duration-300 inline-block hover:translate-x-1">Digital Marketing</a></li>
              <li><a href="#" className="hover:text-white transition-all duration-300 inline-block hover:translate-x-1">Ecommerce Web Development</a></li>
              <li><a href="#" className="hover:text-white transition-all duration-300 inline-block hover:translate-x-1">SEO Services</a></li>
              <li><a href="#" className="hover:text-white transition-all duration-300 inline-block hover:translate-x-1">Graphics & Branding</a></li>
              <li><a href="#" className="hover:text-white transition-all duration-300 inline-block hover:translate-x-1">Mobile App Development</a></li>
              <li><a href="#" className="hover:text-white transition-all duration-300 inline-block hover:translate-x-1">Social Media Optimization</a></li>
            </ul>
          </div>

          {/* Column 3: Join Us */}
          <div className="flex flex-col gap-4 col-span-2 md:col-span-1">
            <h3 className="text-sm font-bold text-yellow-500 uppercase tracking-widest inline-block border-b-2 border-yellow-500 pb-2 w-max mb-2">
              Join Us
            </h3>
            <ul className="flex flex-col gap-4 text-[15px] font-medium text-gray-400">
              <li><a href="https://www.facebook.com/profile.php?id=61577380003721" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-white transition-all duration-300 hover:translate-x-1"><Facebook className="w-5 h-5 text-gray-400 hover:text-white transition-colors" /> Facebook</a></li>
              <li><a href="https://www.instagram.com/enem.pvt.ltd?igsh=aGZ2NGc1ODM3aWZ4" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-white transition-all duration-300 hover:translate-x-1"><Instagram className="w-5 h-5 text-gray-400 hover:text-white transition-colors" /> Instagram</a></li>
              <li><a href="https://www.youtube.com/@e_n_e_m?si=qJcn3W7-psF0OWvR" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-white transition-all duration-300 hover:translate-x-1"><Youtube className="w-5 h-5 text-gray-400 hover:text-white transition-colors" /> YouTube</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-gray-500">
          <p>Copyright © 2026. Enem PVT LTD. All Rights Reserved</p>
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
