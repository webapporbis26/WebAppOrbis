import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, ArrowUpRight, Instagram, Twitter, Linkedin, Github, Mail, Phone, Megaphone, Smartphone, Code2 } from "lucide-react";

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

  return (
    <>
      <header
        className="absolute left-0 right-0 top-0 z-50 py-6"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div
            className="flex items-center justify-between rounded-full bg-transparent px-4 py-2.5 sm:px-6"
          >
            <Link to="/" className="flex items-center gap-2.5">
              <img src={logo.url} alt="WebApp Orbis" className="h-20 sm:h-24 w-auto object-contain" />
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
        {/* Backdrop for closing */}
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity duration-500 backdrop-blur-sm ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />

        {/* Menu Container */}
        <div
          className={`absolute inset-0 w-full flex flex-col md:flex-row transition-transform duration-500 shadow-2xl ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Left Column - Dark Theme */}
          <div className="w-full md:w-[32%] bg-[#121212] text-white flex flex-col h-full overflow-y-auto relative z-10 border-r border-white/10 p-8 md:p-12 pb-24 md:pb-12">
            <Link to="/" className="text-2xl font-bold tracking-[0.2em] mb-12 flex items-center gap-3" onClick={() => setOpen(false)}>
              <img src={logo.url} alt="Logo" className="h-8 w-8 object-contain" />
              INTER SMART
            </Link>

            <nav className="flex flex-col gap-5 mb-16 mt-4">
              <Link to="/" className="text-[13px] font-semibold hover:text-primary transition-colors uppercase tracking-[0.1em]" onClick={() => setOpen(false)}>HOME</Link>
              <Link to="/about" className="text-[13px] font-semibold hover:text-primary transition-colors uppercase tracking-[0.1em]" onClick={() => setOpen(false)}>ABOUT US</Link>
              <Link to="/services" className="text-[13px] font-semibold hover:text-primary transition-colors uppercase tracking-[0.1em]" onClick={() => setOpen(false)}>SERVICES</Link>
              <Link to="/portfolio" className="text-[13px] font-semibold hover:text-primary transition-colors uppercase tracking-[0.1em]" onClick={() => setOpen(false)}>PORTFOLIO</Link>
              <Link to="/contact" className="text-[13px] font-semibold hover:text-primary transition-colors uppercase tracking-[0.1em]" onClick={() => setOpen(false)}>CONTACT</Link>
            </nav>

            <div className="mt-auto pt-8 border-t border-white/10">
              <p className="text-[13px] text-gray-400 mb-5">Talk to our expert today</p>
              <div className="flex flex-col gap-4">
                <a href="mailto:sales@intersmart.in" className="flex items-center gap-3 text-sm hover:text-primary transition-colors underline underline-offset-4">
                  <Mail className="w-4 h-4" />
                  sales@intersmart.in
                </a>
                <a href="tel:+919048444322" className="flex items-center gap-3 text-sm hover:text-primary transition-colors underline underline-offset-4">
                  <Phone className="w-4 h-4" />
                  +91 90-48-444322
                </a>
              </div>
            </div>

            <div className="mt-12">
              <p className="text-[13px] text-gray-400 mb-5">Follow us</p>
              <div className="flex gap-4">
                {socials.map((s, i) => (
                  <a key={i} href={s.href} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors">
                    <s.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Area - Light Theme */}
          <div className="flex-1 bg-white text-black flex flex-col h-full overflow-y-auto relative p-8 md:p-14 lg:p-20">
            {/* Close Button */}
            <div className="absolute top-6 right-6 md:top-10 md:right-10 z-20">
              <button 
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 text-[13px] font-medium tracking-[0.1em] text-gray-500 hover:text-black transition-colors uppercase group"
              >
                CLOSE MENU
                <div className="relative w-10 h-10">
                  <X className="w-10 h-10 absolute inset-0 text-black font-light group-hover:rotate-90 transition-transform duration-300" strokeWidth={1} />
                </div>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 lg:gap-16 mt-20 md:mt-16">
              {/* Column 1 - Development */}
              <div className="flex flex-col">
                <div className="flex flex-col items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-[#48D1CC] rounded-md flex items-center justify-center border-2 border-black">
                    <Code2 className="w-6 h-6 text-black" strokeWidth={2.5} />
                  </div>
                  <h3 className="text-xl font-bold tracking-tight text-black mt-2">Development & Software</h3>
                </div>
                <div className="w-8 h-[3px] bg-[#48D1CC] mb-8 rounded-full"></div>
                <div className="flex flex-col gap-5">
                  <Link to="/services/web-development" className="text-gray-600 hover:text-black transition-colors text-[15px]" onClick={() => setOpen(false)}>Web Development</Link>
                  <Link to="/services/mobile-development" className="text-gray-600 hover:text-black transition-colors text-[15px]" onClick={() => setOpen(false)}>Mobile App Development</Link>
                  <Link to="/services/erp-software" className="text-gray-600 hover:text-black transition-colors text-[15px]" onClick={() => setOpen(false)}>ERP Software Solutions</Link>
                </div>
              </div>

              {/* Column 2 - Marketing */}
              <div className="flex flex-col">
                <div className="flex flex-col items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-[#DDA0DD] rounded-md flex items-center justify-center border-2 border-black -rotate-12">
                     <Megaphone className="w-6 h-6 text-black" strokeWidth={2.5} />
                  </div>
                  <h3 className="text-xl font-bold tracking-tight text-black mt-2">Digital Marketing</h3>
                </div>
                <div className="w-8 h-[3px] bg-[#9370DB] mb-8 rounded-full"></div>
                <div className="flex flex-col gap-5">
                  <Link to="/services/digital-marketing" className="text-gray-600 hover:text-black transition-colors text-[15px]" onClick={() => setOpen(false)}>Digital Marketing Campaigns</Link>
                  <Link to="/services/seo" className="text-gray-600 hover:text-black transition-colors text-[15px]" onClick={() => setOpen(false)}>Search Engine Optimization (SEO)</Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
