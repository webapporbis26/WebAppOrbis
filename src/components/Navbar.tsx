import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, ArrowUpRight, Instagram, Twitter, Linkedin, Github, Mail, Phone, ArrowRight, Facebook, Youtube } from "lucide-react";
import Particles from "./Particles";

const logo = { url: "/logo.png" };

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/contact", label: "Contact" },
] as const;

const socials = [
  { href: "https://instagram.com", label: "Instagram", icon: Instagram },
  { href: "https://twitter.com", label: "Twitter", icon: Twitter },
  { href: "https://linkedin.com", label: "LinkedIn", icon: Linkedin },
  { href: "https://github.com", label: "GitHub", icon: Github },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header
        className="absolute left-0 right-0 top-0 z-50 py-0"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div
            className="flex items-center justify-between rounded-full bg-transparent px-4 py-2.5 sm:px-6"
          >
            <Link to="/" className="flex items-center gap-2.5">
              <img src={logo.url} alt="WebApp Orbis" className="h-28 sm:h-36 w-auto object-contain" />
            </Link>

            <div className="flex items-center gap-8">
              <nav className="hidden items-center gap-10 md:flex">
                {links.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    className="text-lg font-medium transition-colors hover:text-primary"
                    activeProps={{ className: "text-lg font-medium text-primary" }}
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>

              <button
                aria-label="Menu"
                className="grid h-12 w-12 place-items-center transition-transform hover:scale-105"
                onClick={() => setOpen(true)}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="9" x2="21" y2="9"></line>
                  <line x1="3" y1="15" x2="21" y2="15"></line>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Full-screen mega menu */}
      <div
        className={`fixed inset-0 z-[60] flex ${open ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity duration-500 backdrop-blur-sm ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />

        {/* Menu Container */}
        <div
          className={`absolute inset-0 w-full bg-white flex flex-col lg:flex-row transition-transform duration-500 shadow-2xl overflow-hidden ${
            open ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <Particles />

          {/* Close Button */}
          <div className="absolute top-5 right-5 sm:top-8 sm:right-8 z-50">
            <button
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 text-[12px] font-semibold tracking-[0.1em] text-gray-500 hover:text-black transition-colors uppercase group bg-white/90 backdrop-blur-md px-4 py-2 rounded-full border border-gray-200 shadow-sm hover:shadow-md"
            >
              CLOSE MENU
              <X className="w-4 h-4 text-black group-hover:rotate-90 transition-transform duration-300" strokeWidth={2} />
            </button>
          </div>

          {/* Left Column — Navigation Links */}
          <div className="w-full lg:w-[50%] xl:w-[45%] flex flex-col h-full relative z-10 px-10 sm:px-16 lg:px-20 xl:px-24 lg:border-r border-gray-100 pt-24 lg:pt-20 pb-8">
            {/* Spacer top */}
            <div className="flex-1 flex flex-col justify-start lg:justify-center">
              <nav className="flex flex-col">
                {[
                  { to: "/", label: "Home" },
                  { to: "/about", label: "About Us" },
                  { to: "/services", label: "Services" },
                  { to: "/portfolio", label: "Portfolio" },
                  { to: "/contact", label: "Contact Us" },
                ].map((link, i) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="text-[clamp(1.75rem,3.5vw,3rem)] font-light text-gray-400 hover:text-black transition-colors duration-200 group border-b border-gray-100 last:border-0 py-3 sm:py-4 flex items-center gap-3"
                    onClick={() => setOpen(false)}
                  >
                    <span className="text-xs font-mono text-gray-300 group-hover:text-[#2DD4BF] transition-colors w-5 shrink-0">0{i + 1}</span>
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Socials pinned to bottom */}
            <div className="flex flex-row gap-5 items-center pt-5 border-t border-gray-100">
              <a href="https://www.instagram.com/enem.pvt.ltd?igsh=aGZ2NGc1ODM3aWZ4" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:-translate-y-1 transition-all duration-300 bg-gray-100/80 hover:bg-[#E4405F] p-3 rounded-full group">
                <Instagram className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61577380003721" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:-translate-y-1 transition-all duration-300 bg-gray-100/80 hover:bg-[#1877F2] p-3 rounded-full group">
                <Facebook className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" />
              </a>
              <a href="https://www.youtube.com/@e_n_e_m?si=qJcn3W7-psF0OWvR" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:-translate-y-1 transition-all duration-300 bg-gray-100/80 hover:bg-[#FF0000] p-3 rounded-full group">
                <Youtube className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          {/* Right Column — About & Stats (large screens only) */}
          <div className="hidden lg:flex flex-1 text-black flex-col justify-center h-full relative z-10 px-16 xl:px-24">
            <div className="max-w-xl">
              <h2 className="text-5xl xl:text-6xl font-light mb-6">About Us</h2>
              <p className="text-gray-500 text-base xl:text-lg leading-relaxed mb-10">
                We are a professional digital solutions company specialising in website designing and development, mobile app development, and customised ERP software solutions. With a focus on innovation and performance, we help businesses establish a strong digital presence.
              </p>

              <div className="grid grid-cols-2 gap-y-8 gap-x-8 mb-10">
                {[
                  { n: "50+", l: "Happy clients" },
                  { n: "100+", l: "Projects shipped" },
                  { n: "5+", l: "Years of experience" },
                  { n: "98%", l: "Client retention" },
                ].map((s) => (
                  <div key={s.l}>
                    <div className="text-4xl xl:text-5xl font-light mb-1 text-[#2DD4BF]">{s.n}</div>
                    <p className="text-gray-900 font-medium text-sm xl:text-base">{s.l}</p>
                  </div>
                ))}
              </div>

              <Link
                to="/about"
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-3 bg-[#2DD4BF] hover:bg-[#26b8a5] text-white px-6 py-3 rounded-full font-medium transition-colors group shadow-lg shadow-[#2DD4BF]/20"
              >
                More about Us
                <span className="bg-white rounded-full p-1 group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-4 h-4 text-[#2DD4BF]" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
