import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import {
  ArrowUpRight,
  ArrowLeft,
  Globe,
  Layers,
  Code2,
  PenTool,
  ShoppingCart,
  Settings,
  Briefcase,
  Users,
  GraduationCap,
  Building2,
  Rocket,
  ShoppingBag,
  Check,
  Star,
  Sparkles,
  MonitorSmartphone,
  Zap,
  Shield,
  Search,
  Database,
} from "lucide-react";
import { gsap, ScrollTrigger, useTextReveal, useFadeUp, useCounter } from "@/lib/anim";
import SplitText from "@/components/ui/SplitText";
import { MagneticButton } from "@/components/MagneticButton";
import { FaqPro } from "@/components/ui/faq-pro";
import { LogoCloud } from "@/components/ui/logo-cloud-3";
import { Marquee } from "@/components/ui/marquee";

import eventVideo from "@/assets/project/event.mp4";
import candleVideo from "@/assets/project/candle.mp4";
import resortVideo from "@/assets/project/resort.mp4";
import resortImg from "@/assets/project/resort.jpeg";
import candleImg from "@/assets/project/candle.png";
import eventImg from "@/assets/project/event.png";

export const Route = createFileRoute("/services/web-development")({
  head: () => ({
    meta: [
      { title: "Web Designing & Development — WebApp Orbis" },
      {
        name: "description",
        content:
          "Professional web design & development services. Custom websites, e-commerce, WordPress, web applications & CMS solutions built for business growth.",
      },
      { property: "og:title", content: "Web Designing & Development — WebApp Orbis" },
      {
        property: "og:description",
        content: "Custom web solutions crafted for ambitious brands. From marketing sites to complex web applications.",
      },
    ],
  }),
  component: WebDevelopment,
});

const heroStats = [
  { n: 15, s: "+", label: "Years of Experience" },
  { n: 50, s: "+", label: "Trusted Clients Worldwide" },
  { n: 35, s: "+", label: "Experienced Designers & Developers" },
  { n: 30, s: "+", label: "Days Average Project Duration" },
];

const serviceCards = [
  {
    icon: Building2,
    title: "Corporate website development",
    desc: "We build authoritative, feature-rich corporate platforms that reflect your enterprise values and facilitate seamless communication.",
    color: "#E6F0E2",
    accent: "#2DD4BF",
  },
  {
    icon: Briefcase,
    title: "Business and portfolio websites",
    desc: "Create a stunning first impression with custom business and portfolio websites designed to showcase your best work and convert visitors.",
    color: "#E4ECF7",
    accent: "#818CF8",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce website development",
    desc: "Bespoke online stores that drive sales and deliver exceptional shopping experiences through cutting-edge e-commerce development.",
    color: "#FFC107",
    accent: "#F59E0B",
    featured: true,
  },
  {
    icon: MonitorSmartphone,
    title: "Responsive web design",
    desc: "Every website we build seamlessly adapts across desktops, tablets, and mobile devices, ensuring a perfect experience everywhere.",
    color: "#F1E8F3",
    accent: "#A855F7",
  },
  {
    icon: Code2,
    title: "Custom web application development",
    desc: "We build complex, scalable web applications from scratch, tailored exactly to your unique business operational needs.",
    color: "#FCE7F3",
    accent: "#EC4899",
  },
  {
    icon: Settings,
    title: "Website maintenance and support",
    desc: "Comprehensive ongoing support and maintenance to ensure your website remains fast, secure, and up-to-date at all times.",
    color: "#E0F2FE",
    accent: "#0EA5E9",
  },
  {
    icon: PenTool,
    title: "UI and UX design solutions",
    desc: "User-focused interface and experience design that not only looks visually appealing but drives meaningful user engagement.",
    color: "#FEF3C7",
    accent: "#D97706",
  },
  {
    icon: Search,
    title: "SEO-friendly website structure",
    desc: "Optimized from the ground up for high search visibility, ensuring your site ranks better and attracts organic traffic.",
    color: "#DCFCE7",
    accent: "#16A34A",
  },
];

const industries = [
  {
    icon: Briefcase,
    title: "B2B",
    desc: "We have developed websites satisfying every essential requirement for B2B companies.",
    bg: "#1a1a1a",
    text: "white",
  },
  {
    icon: Users,
    title: "B2C",
    desc: "As a leading Web Designing company, we help Business-to-consumer to create eye catching Web Designs to meet their requirements.",
    bg: "#6B7280",
    text: "white",
  },
  {
    icon: ShoppingBag,
    title: "E-COMMERCE",
    desc: "We have completed many milestones in Ecommerce. Our Development team created several E-commerce websites that guarantee every customer's easy shopping experience.",
    bg: "#FFC107",
    text: "#1a1a1a",
  },
  {
    icon: GraduationCap,
    title: "EDUCATION",
    desc: "We have delivered quality websites in the Educational Sectors making their management more easy, simple, fast and secure.",
    bg: "#818CF8",
    text: "white",
  },
  {
    icon: Building2,
    title: "ENTERPRISE",
    desc: "Whether your enterprise is small or large, we have the right services you need to connect with modern consumers and become a recognised brand.",
    bg: "#6B7280",
    text: "white",
  },
  {
    icon: Rocket,
    title: "STARTUPS",
    desc: "We have developed and delivered affordable Web Designs for startups that help them establish a strong digital presence from day one.",
    bg: "#FFC107",
    text: "#1a1a1a",
  },
];

const webFaqs = [
  {
    q: "What types of websites do you build?",
    a: "We build everything from marketing websites and landing pages to complex web applications, e-commerce stores, WordPress sites, and custom CMS platforms. Every project is tailored to your specific business needs.",
  },
  {
    q: "How long does it take to build a website?",
    a: "A typical project takes 3–8 weeks depending on complexity. Simple marketing sites can be ready in 2–3 weeks, while complex web applications may take 8–12 weeks.",
  },
  {
    q: "Do you provide ongoing support after launch?",
    a: "Every project includes a 30-day warranty. Most clients continue on a monthly retainer for ongoing maintenance, updates, and support.",
  },
  {
    q: "Will my website be mobile-friendly and SEO optimized?",
    a: "Absolutely. Every website we build is fully responsive across all devices and optimized for search engines from the ground up — fast loading, semantic HTML, and proper meta structures.",
  },
  {
    q: "Can you redesign my existing website?",
    a: "Yes, we frequently work on website redesigns. We'll audit your current site, identify improvements, and build a modern platform that better serves your business goals.",
  },
];

const portfolioItems = [
  { type: "video" as const, src: eventVideo, img: eventImg, title: "Dreamweaver Events", link: "https://dreamweaverevents.co.in" },
  { type: "video" as const, src: candleVideo, img: candleImg, title: "Nazareth Candles", link: "https://nazarethcandles.com" },
  { type: "video" as const, src: resortVideo, img: resortImg, title: "Chandys Hotels & Resorts", link: "https://chandyshotelsandresorts.com" },
];

function StatCard({ n, s, label }: { n: number; s: string; label: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useCounter(ref, n, s);
  return (
    <div data-fade className="rounded-2xl p-6 sm:p-8 text-white" style={{ background: "var(--grad-primary)" }}>
      <p className="text-display text-4xl sm:text-5xl lg:text-6xl">
        <span ref={ref}>
          0{s}
        </span>
      </p>
      <p className="mt-3 text-sm sm:text-base text-white/80 font-medium">{label}</p>
    </div>
  );
}

function ProjectCard({ c }: { c: (typeof portfolioItems)[0] }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = true;
  }, []);

  return (
    <a
      href={c.link}
      target="_blank"
      rel="noopener noreferrer"
      data-fade
      className="group block"
      onMouseEnter={() => {
        if (videoRef.current) {
          videoRef.current.muted = true;
          videoRef.current.play().catch(() => {});
        }
      }}
      onMouseLeave={() => videoRef.current?.pause()}
    >
      <div className="relative w-full aspect-video overflow-hidden rounded-2xl bg-muted">
        <img
          src={c.img}
          alt={c.title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:opacity-0 z-10"
        />
        {c.type === "video" && (
          <video
            ref={videoRef}
            src={c.src}
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 z-0"
          />
        )}
      </div>
      <div className="mt-4 sm:mt-5 text-left">
        <h3 className="text-base sm:text-lg font-medium text-foreground uppercase tracking-wide group-hover:text-primary transition-colors">
          {c.title}
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1 uppercase tracking-wider">
          Website Design & Development
        </p>
      </div>
    </a>
  );
}

function WebDevelopment() {
  const heroRef = useRef<HTMLDivElement>(null);
  useTextReveal(heroRef, { stagger: 0.12, delay: 0.3 });
  useFadeUp("[data-fade]");

  // Service cards stagger reveal
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-service-card]").forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 80, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "expo.out",
            delay: i * 0.1,
            scrollTrigger: { trigger: el, start: "top 85%" },
          }
        );
      });

      // Industry cards reveal
      gsap.utils.toArray<HTMLElement>("[data-industry-card]").forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 60, opacity: 0, rotateX: 8 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.9,
            ease: "expo.out",
            delay: i * 0.08,
            scrollTrigger: { trigger: el, start: "top 85%" },
          }
        );
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* ============== HERO ============== */}
      <section ref={heroRef} className="relative pt-28 sm:pt-28 pb-20 overflow-hidden">
        {/* Background decorative elements */}
        <div
          aria-hidden
          className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full blur-[120px] opacity-20"
          style={{ background: "var(--grad-primary)" }}
        />
        <div
          aria-hidden
          className="absolute -bottom-20 -left-20 h-[400px] w-[400px] rounded-full blur-[100px] opacity-15"
          style={{ background: "oklch(0.72 0.16 230)" }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
          <Link
            to="/services"
            className="mb-10 inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> All Services
          </Link>

          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-12 items-start">
            {/* Left: Title */}
            <div>
              <p className="mb-4 text-xs uppercase tracking-[0.3em] text-muted-foreground inline-flex items-center gap-2">
                <Sparkles className="h-3 w-3" /> Our Expertise
              </p>
              <SplitText tag="h1" className="text-hero">
                Web Designing &{" "}
                <span className="gradient-text">Development</span>
              </SplitText>
              <p data-fade className="mt-8 max-w-xl text-lg text-muted-foreground leading-relaxed">
                We create professional websites that combine modern design with advanced functionality. Our websites are developed to deliver fast performance, responsive layouts, and seamless user experiences across desktops, tablets, and mobile devices.
              </p>
              <p data-fade className="mt-4 max-w-xl text-base text-muted-foreground font-medium">
                Our goal is to build websites that not only look visually appealing but also improve user engagement and business conversions.
              </p>
              <div data-fade className="mt-10 flex flex-wrap items-center gap-4">
                <MagneticButton
                  as="a"
                  href="/contact"
                  className="group gap-2 rounded-full px-7 py-4 text-base font-medium text-white shadow-elegant"
                  {...({ style: { background: "var(--grad-primary)" } } as any)}
                >
                  Book a Free Demo
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </MagneticButton>
                <MagneticButton
                  as="a"
                  href="/portfolio"
                  className="group gap-2 rounded-full border border-border px-7 py-4 text-base font-medium text-foreground hover:bg-foreground hover:text-background transition-colors"
                >
                  View Our Work
                  <ArrowUpRight className="h-4 w-4" />
                </MagneticButton>
              </div>
            </div>

            {/* Right: Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {heroStats.map((stat, i) => (
                <StatCard key={i} n={stat.n} s={stat.s} label={stat.label} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============== DELIVERED CLASS - SERVICES GRID ============== */}
      <section className="relative py-24 sm:py-28 bg-[#f5f7fa]">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="text-center mb-12 sm:mb-12">
            <p data-fade className="mb-4 text-xs uppercase tracking-[0.3em] text-muted-foreground">
              What We Deliver
            </p>
            <SplitText tag="h2" className="text-display text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.15]">
              We Have Delivered Class,{" "}
              <span className="gradient-text">Let's Scroll Through Some</span>
            </SplitText>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  data-service-card
                  className="group relative rounded-2xl p-8 sm:p-10 transition-all duration-500 hover:-translate-y-2 hover:shadow-elegant overflow-hidden"
                  style={{
                    backgroundColor: card.featured ? card.color : card.color,
                  }}
                >
                  {/* Subtle gradient overlay on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                    style={{
                      background: card.featured
                        ? "linear-gradient(135deg, rgba(255,193,7,0.15), rgba(245,158,11,0.05))"
                        : `linear-gradient(135deg, ${card.accent}15, transparent)`,
                    }}
                  />
                  <div className="relative z-10">
                    <div
                      className="h-16 w-16 rounded-2xl flex items-center justify-center mb-8 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
                      style={{
                        backgroundColor: card.featured ? "rgba(255,255,255,0.3)" : `${card.accent}15`,
                        color: card.featured ? "#1a1a1a" : card.accent,
                      }}
                    >
                      <Icon className="h-8 w-8" strokeWidth={1.5} />
                    </div>
                    <h3
                      className="text-xl sm:text-2xl font-bold mb-4 leading-tight"
                      style={{ color: card.featured ? "#1a1a1a" : "var(--foreground)" }}
                    >
                      {card.title}
                    </h3>
                    <p
                      className="text-[15px] leading-relaxed"
                      style={{
                        color: card.featured ? "rgba(26,26,26,0.8)" : "var(--foreground)",
                        opacity: card.featured ? 1 : 0.7,
                      }}
                    >
                      {card.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============== WHY CHOOSE US FEATURES ============== */}
      <section className="relative py-24 sm:py-28 bg-background">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div data-fade>
              <p className="mb-4 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                Why Choose Us
              </p>
              <SplitText tag="h2" className="text-display text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.1]">
                Building Websites That{" "}
                <span className="gradient-text">Drive Real Results</span>
              </SplitText>
              <p className="mt-8 text-lg text-foreground/70 leading-relaxed max-w-xl">
                Your website is your strongest business asset, serving as your online presence, which is essential for success in today's digital market. We build high-performance websites that attract visitors and convert them into customers.
              </p>
              <div className="mt-10">
                <MagneticButton
                  as="a"
                  href="/contact"
                  className="group gap-2 rounded-full px-7 py-4 text-base font-medium text-white shadow-elegant"
                  {...({ style: { background: "var(--grad-primary)" } } as any)}
                >
                  Get Started
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </MagneticButton>
              </div>
            </div>

            <div data-fade className="grid gap-5">
              {[
                { icon: MonitorSmartphone, title: "Mobile Friendly Designs", desc: "Every website adapts perfectly across all screen sizes and devices." },
                { icon: Search, title: "SEO-Optimized", desc: "Built with search engines in mind — semantic HTML, fast loading, proper structure." },
                { icon: Zap, title: "Lightning Fast Performance", desc: "Sub-second load times. Optimized assets. 90+ Lighthouse scores guaranteed." },
                { icon: Shield, title: "Secure & Scalable", desc: "Enterprise-grade security with architecture that scales as your traffic grows." },
              ].map((feature, i) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={i}
                    className="group flex gap-5 items-start p-6 rounded-2xl border border-border/40 bg-card transition-all duration-400 hover:-translate-y-1 hover:shadow-soft hover:border-primary/20"
                  >
                    <div className="shrink-0 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-500 group-hover:bg-primary group-hover:text-white">
                      <Icon className="h-6 w-6" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-1">{feature.title}</h3>
                      <p className="text-sm text-foreground/60 leading-relaxed">{feature.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ============== INDUSTRIES WE SERVE ============== */}
      <section className="relative py-24 sm:py-28 bg-muted/30">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="text-center mb-12 sm:mb-12">
            <p data-fade className="mb-4 text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Industries We Serve
            </p>
            <SplitText tag="h2" className="text-display text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.15]">
              Serving Excellent Solutions{" "}
              <span className="gradient-text">For All Industries</span>
            </SplitText>
            <p data-fade className="mt-6 text-lg text-foreground/70 max-w-2xl mx-auto">
              Want to grow your business with the latest, trendy web designs that drive traffic? Join us for a remarkable web experience.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {industries.map((ind) => {
              const Icon = ind.icon;
              return (
                <div
                  key={ind.title}
                  data-industry-card
                  className="group relative rounded-2xl p-8 sm:p-10 transition-all duration-500 hover:-translate-y-2 hover:shadow-elegant overflow-hidden min-h-[220px] flex flex-col justify-end"
                  style={{ backgroundColor: ind.bg, color: ind.text }}
                >
                  <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                    <Icon className="h-20 w-20" strokeWidth={0.8} />
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <Icon className="h-6 w-6" strokeWidth={1.5} />
                      <h3 className="text-xl font-bold tracking-wide">{ind.title}</h3>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ opacity: 0.8 }}>
                      {ind.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============== SATISFACTION BANNER ============== */}
      <section className="relative py-20 sm:py-24 bg-foreground text-background overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 opacity-10"
          style={{ background: "var(--grad-primary)" }}
        />
        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="flex items-center gap-8" data-fade>
              <div className="shrink-0 flex h-20 w-20 items-center justify-center rounded-2xl" style={{ background: "var(--grad-primary)" }}>
                <Star className="h-10 w-10 text-white fill-white" />
              </div>
              <div>
                <p className="text-4xl sm:text-5xl font-bold">
                  99<span className="text-primary">%</span>
                </p>
                <p className="mt-2 text-lg text-background/80 max-w-md">
                  of our customers are extremely satisfied with their{" "}
                  <strong className="text-background">Web Designing & Development</strong> services.
                </p>
              </div>
            </div>
            <div data-fade>
              <MagneticButton
                as="a"
                href="/portfolio"
                className="group gap-2 rounded-full border border-background/30 px-7 py-4 text-base font-medium text-background hover:bg-background hover:text-foreground transition-colors"
              >
                View Case Studies
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>

      {/* ============== TRUSTED PARTNERS ============== */}
      <section className="relative py-20 bg-background">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
          <div className="text-center mb-12" data-fade>
            <h2 className="text-display text-3xl sm:text-4xl font-normal">
              Our Trusted <span className="gradient-text">Partners</span>
            </h2>
          </div>
        </div>
        <LogoCloud />
      </section>

      {/* MARQUEE SECTION */}
      <Marquee text="✦ INNOVATE ✦ DESIGN ✦ ARCHITECT ✦ DEPLOY ✦ SCALE " speed={25} />

      {/* TECH STACK BENTO GRID */}
      <section className="bg-white py-28 border-b border-gray-100">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <div className="text-center mb-12" data-fade>
            <h2 className="text-4xl md:text-5xl font-light text-[#1a1a1a] mb-6">
              Our Modern <span className="font-bold">Tech Stack</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We leverage the latest and most powerful technologies to build blazing-fast, scalable, and secure web applications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto" data-fade>
            {/* Frontend Bento */}
            <div className="md:col-span-2 bg-[#f4f7ff] rounded-3xl p-10 flex flex-col justify-between group overflow-hidden relative">
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-[#1a1a1a] mb-4">Frontend Excellence</h3>
                <p className="text-gray-600 mb-8 max-w-md">We build interactive, dynamic, and beautiful user interfaces using modern JavaScript frameworks.</p>
                <div className="flex flex-wrap gap-3">
                  {['React.js', 'Next.js', 'Vue.js', 'TypeScript', 'TailwindCSS'].map(tech => (
                    <span key={tech} className="px-4 py-2 bg-white rounded-full text-sm font-semibold text-[#0055FF] shadow-sm border border-blue-100">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                <Code2 className="w-64 h-64 text-[#0055FF]" />
              </div>
            </div>

            {/* Backend Bento */}
            <div className="bg-[#1a1a1a] rounded-3xl p-10 flex flex-col justify-between group overflow-hidden relative text-white">
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4">Backend Power</h3>
                <p className="text-gray-400 mb-8 text-sm">Robust APIs and secure server architecture.</p>
                <div className="flex flex-wrap gap-2">
                  {['Node.js', 'Python', 'Go', 'GraphQL'].map(tech => (
                    <span key={tech} className="px-3 py-1.5 bg-white/10 rounded-full text-xs font-semibold text-white">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="absolute right-0 bottom-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                <Database className="w-32 h-32" />
              </div>
            </div>

            {/* Cloud & DevOps Bento */}
            <div className="bg-[#FFC107] rounded-3xl p-10 flex flex-col justify-between group overflow-hidden relative">
              <div className="relative z-10">
                <h3 className="text-2xl font-black text-[#1a1a1a] mb-4">Cloud & DevOps</h3>
                <p className="text-[#1a1a1a] mb-8 text-sm font-medium">Scalable infrastructure that never sleeps.</p>
                <div className="flex flex-wrap gap-2">
                  {['AWS', 'Google Cloud', 'Docker', 'Vercel'].map(tech => (
                    <span key={tech} className="px-3 py-1.5 bg-[#1a1a1a] rounded-full text-xs font-bold text-[#FFC107]">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="absolute -right-5 -bottom-5 opacity-10 group-hover:scale-110 transition-transform duration-500">
                <Rocket className="w-40 h-40 text-[#1a1a1a]" />
              </div>
            </div>

            {/* Security Bento */}
            <div className="md:col-span-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-10 flex items-center justify-between group overflow-hidden relative text-white">
              <div className="relative z-10 max-w-lg">
                <h3 className="text-2xl font-bold mb-4">Enterprise-Grade Security</h3>
                <p className="text-blue-100 text-sm">We implement industry-leading security practices, data encryption, and regular vulnerability audits to ensure your web application is protected against modern threats.</p>
              </div>
              <div className="relative z-10 hidden md:block">
                <Shield className="w-20 h-20 text-blue-200 group-hover:text-white transition-colors duration-500" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============== PORTFOLIO ============== */}
      <section className="mx-auto max-w-[1400px] px-5 sm:px-8 mb-12 pt-20">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p data-fade className="mb-4 text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Our Work
            </p>
            <SplitText tag="h2" className="text-display text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.15]">
              Our Works Define Our{" "}
              <span className="gradient-text">Success</span>
            </SplitText>
            <p data-fade className="text-[17px] text-foreground/80 mt-4">
              Excellent customer service is our foundation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
            {portfolioItems.map((c, i) => (
              <ProjectCard key={i} c={c} />
            ))}
          </div>

          <div className="mt-12 flex justify-center" data-fade>
            <MagneticButton
              as="a"
              href="/portfolio"
              className="group gap-2 rounded-full px-8 py-4 text-base font-medium text-white shadow-elegant"
              {...({ style: { background: "var(--grad-primary)" } } as any)}
            >
              View all works
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* ============== TECH STACK ============== */}
      <section className="relative py-20 sm:py-24 bg-background border-t border-border/40">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="text-center mb-12" data-fade>
            <h2 className="text-display text-3xl sm:text-4xl font-normal">
              Technologies We <span className="gradient-text">Use</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6" data-fade>
            {[
              { name: "React", color: "#61DAFB" },
              { name: "Next.js", color: "#000000" },
              { name: "Angular", color: "#DD0031" },
              { name: "Node.js", color: "#339933" },
              { name: "TypeScript", color: "#3178C6" },
              { name: "Python", color: "#3776AB" },
              { name: "WordPress", color: "#21759B" },
              { name: "Shopify", color: "#7AB55C" },
              { name: "MongoDB", color: "#47A248" },
              { name: "PostgreSQL", color: "#4169E1" },
              { name: "AWS", color: "#FF9900" },
              { name: "Figma", color: "#F24E1E" },
            ].map((tech) => (
              <div
                key={tech.name}
                className="group flex items-center justify-center gap-3 rounded-2xl border border-border/40 bg-card p-5 transition-all duration-400 hover:-translate-y-1 hover:shadow-soft hover:border-primary/20"
              >
                <div className="h-3 w-3 rounded-full shrink-0" style={{ backgroundColor: tech.color }} />
                <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============== FAQ ============== */}
      <section className="py-28 border-t border-border bg-background">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 grid gap-12 md:grid-cols-[1fr_1.5fr]">
          <div>
            <p data-fade className="mb-4 text-xs uppercase tracking-[0.3em] text-muted-foreground">
              FAQ
            </p>
            <SplitText tag="h2" className="text-display text-4xl sm:text-5xl leading-[1.05]">
              Common questions about web development.
            </SplitText>
          </div>
          <div data-fade className="w-full">
            <FaqPro
              items={webFaqs.map((f, i) => ({ id: String(i), question: f.q, answer: f.a }))}
              defaultOpenFirst
              searchPlaceholder="Search questions..."
            />
          </div>
        </div>
      </section>

      {/* ============== CTA ============== */}
      <section className="py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div
            className="rounded-3xl p-12 sm:p-20 text-primary-foreground relative overflow-hidden"
            style={{ background: "var(--grad-primary)" }}
          >
            <div
              aria-hidden
              className="absolute -top-20 -right-20 h-[300px] w-[300px] rounded-full blur-[100px] opacity-30 bg-white"
            />
            <SplitText tag="h2" className="text-display text-4xl sm:text-6xl max-w-3xl leading-[1]">
              Let's build your dream website together.
            </SplitText>
            <p className="mt-6 text-lg text-white/80 max-w-xl">
              Transform your online presence with a website that not only looks stunning but drives real business results.
            </p>
            <Link
              to="/contact"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-background px-7 py-4 text-base font-medium text-foreground transition-transform hover:scale-105"
            >
              Start Your Project <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
