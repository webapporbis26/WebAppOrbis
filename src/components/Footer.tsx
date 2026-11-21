import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative bg-[#151D33] text-white font-sans">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 pt-10 md:pt-12 pb-6">
        <div className="grid gap-10 md:grid-cols-3 md:gap-0">
          {/* Brand */}
          <div className="md:pr-10">
            <Link to="/" className="flex items-center gap-2.5">
              <img src="/logo-w.png" alt="WebApp Orbis" className="h-9 w-auto" />
              <span className="text-xl font-extrabold tracking-tight">WebApp Orbis</span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed mt-4 max-w-xs">
              We build modern websites that help businesses grow online.
            </p>
          </div>

          {/* Company */}
          <div className="md:border-l md:border-white/10 md:pl-10">
            <h3 className="text-sm font-bold mb-4">Company</h3>
            <ul className="flex flex-col gap-3 text-[15px] text-slate-300">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/portfolio" className="hover:text-white transition-colors">Our Works</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Follow Us */}
          <div className="md:border-l md:border-white/10 md:pl-10">
            <h3 className="text-sm font-bold mb-4">Follow Us</h3>
            <div className="flex flex-row items-center gap-3">
              <a href="https://www.facebook.com/profile.php?id=61577380003721" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:-translate-y-1 transition-all duration-300 bg-white/10 hover:bg-[#1877F2] p-3 rounded-full group">
                <Facebook className="w-5 h-5 text-slate-300 group-hover:text-white transition-colors" />
              </a>
              <a href="https://www.instagram.com/enem.pvt.ltd?igsh=aGZ2NGc1ODM3aWZ4" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:-translate-y-1 transition-all duration-300 bg-white/10 hover:bg-[#E4405F] p-3 rounded-full group">
                <Instagram className="w-5 h-5 text-slate-300 group-hover:text-white transition-colors" />
              </a>
              <a href="https://www.youtube.com/@e_n_e_m?si=qJcn3W7-psF0OWvR" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:-translate-y-1 transition-all duration-300 bg-white/10 hover:bg-[#FF0000] p-3 rounded-full group">
                <Youtube className="w-5 h-5 text-slate-300 group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-5 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-slate-400">
          <p>Copyright © 2026. WebApp Orbis. All Rights Reserved.</p>
          <a href="#" className="hover:text-white transition-colors">Terms and Conditions</a>
        </div>
      </div>
    </footer>
  );
}
