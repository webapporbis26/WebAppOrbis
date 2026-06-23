import { Link } from "@tanstack/react-router";
import { Facebook, Twitter, Instagram, Linkedin, MessageCircle, Shield, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative bg-[#050505] text-white pt-20 pb-8 px-5 sm:px-12 md:px-20 border-t border-white/10 font-sans">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-8">
          {/* Column 1: Company */}
          <div className="flex flex-col gap-6">
            <h3 className="text-xl font-light text-blue-500 inline-block border-b-[1.5px] border-blue-500 pb-2 w-max mb-2">
              Company
            </h3>
            <ul className="flex flex-col gap-4 text-sm font-light text-gray-300">
              <li><Link to="/" className="text-yellow-500 hover:text-yellow-400 transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/portfolio" className="hover:text-white transition-colors">Our Works</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blogs</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Clients</a></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Column 2: Our Services */}
          <div className="flex flex-col gap-6">
            <h3 className="text-xl font-light text-cyan-400 inline-block border-b-[1.5px] border-cyan-400 pb-2 w-max mb-2">
              Our Services
            </h3>
            <ul className="flex flex-col gap-4 text-sm font-light text-gray-300">
              <li><Link to="/services" className="hover:text-white transition-colors">Web Designing & Development</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Digital Marketing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Ecommerce Web Development</a></li>
              <li><a href="#" className="hover:text-white transition-colors">SEO Services</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Graphics & Branding</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Mobile App Development</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Social Media Optmization</a></li>
            </ul>
          </div>

          {/* Column 3: Join Us */}
          <div className="flex flex-col gap-6">
            <h3 className="text-xl font-light text-yellow-500 inline-block border-b-[1.5px] border-yellow-500 pb-2 w-max mb-2">
              Join Us
            </h3>
            <ul className="flex flex-col gap-5 text-sm font-light text-gray-300">
              <li><a href="https://www.facebook.com/profile.php?id=61577380003721" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 hover:text-white transition-colors"><Facebook className="w-5 h-5 text-white" /> Facebook</a></li>
              <li><a href="https://www.instagram.com/enem.pvt.ltd?igsh=aGZ2NGc1ODM3aWZ4" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 hover:text-white transition-colors"><Instagram className="w-5 h-5 text-white" /> Instagram</a></li>
              <li><a href="https://www.youtube.com/@e_n_e_m?si=qJcn3W7-psF0OWvR" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 hover:text-white transition-colors"><Youtube className="w-5 h-5 text-white" /> YouTube</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-light text-gray-400">
          <p>Copyright © 2026. Enem PVT LTD. All Rights Reserved</p>
          <div className="flex items-center gap-2">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <span>/</span>
            <a href="#" className="hover:text-white transition-colors">Terms and Conditions</a>
          </div>
        </div>
      </div>

      {/* Floating Chat Button */}
      <button className="fixed bottom-6 right-6 w-14 h-14 bg-yellow-500 rounded-full flex items-center justify-center text-black shadow-lg hover:scale-105 transition-transform z-50">
        <MessageCircle className="w-7 h-7 fill-black" />
      </button>
    </footer>
  );
}
