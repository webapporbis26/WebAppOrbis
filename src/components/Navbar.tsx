import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, ArrowUpRight, Instagram, Twitter, Linkedin, Github, Mail } from "lucide-react";

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

      {/* Full-screen menu */}
      <div
        className={`fixed inset-0 z-[60] ${open ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        <div
          className={`absolute inset-0 bg-background transition-opacity duration-500 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />
        {/* animated background */}
        <div
          className={`pointer-events-none absolute inset-0 overflow-hidden transition-opacity duration-700 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        >
          <span
            className="blob"
            style={{
              width: 520,
              height: 520,
              background: "var(--grad-blob-1)",
              top: "-10%",
              left: "-8%",
              animation: "blob-float 18s ease-in-out infinite",
            }}
          />
          <span
            className="blob"
            style={{
              width: 600,
              height: 600,
              background: "var(--grad-blob-2)",
              bottom: "-15%",
              right: "-10%",
              animation: "blob-float 22s ease-in-out infinite reverse",
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div
          className={`relative flex h-full flex-col px-6 py-6 transition-all duration-500 sm:px-10 ${
            open ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
          }`}
        >
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
              <img src={logo.url} alt="WebApp Orbis" className="h-9 w-9 object-contain" />
              <span className="text-display text-lg font-semibold tracking-tight">WebApp <span className="text-primary">Orbis</span></span>
            </Link>
            <button
              aria-label="Close menu"
              className="grid h-10 w-10 place-items-center rounded-full glass"
              onClick={() => setOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex flex-1 flex-col items-center justify-center gap-2 sm:gap-3 md:gap-4">
            {links.map((l, i) => (
              <Link
                key={l.to}
                to={l.to}
                className="text-display text-4xl font-semibold tracking-tight transition-colors hover:gradient-text sm:text-5xl md:text-6xl lg:text-7xl"
                style={{
                  transitionDelay: `${i * 60}ms`,
                  opacity: open ? 1 : 0,
                  transform: open ? "translateY(0)" : "translateY(20px)",
                  transition: "all 0.6s cubic-bezier(0.65,0,0.35,1)",
                }}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col-reverse items-start justify-between gap-6 border-t border-border/60 pt-6 sm:flex-row sm:items-center">
            <a
              href="mailto:hello@weborbis.com"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <Mail className="h-4 w-4" />
              hello@weborbis.com
            </a>
            <div className="flex items-center gap-3">
              {socials.map((s, i) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-full glass transition-all hover:-translate-y-0.5 hover:shadow-elegant"
                  style={{
                    transitionDelay: `${i * 80 + 200}ms`,
                    opacity: open ? 1 : 0,
                    transform: open ? "translateY(0)" : "translateY(10px)",
                    transition: "all 0.5s cubic-bezier(0.65,0,0.35,1)",
                  }}
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:shadow-elegant"
              style={{ background: "var(--grad-primary)" }}
              onClick={() => setOpen(false)}
            >
              Start a project <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
