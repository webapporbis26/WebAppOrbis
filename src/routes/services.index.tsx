import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Globe,
  Smartphone,
  Database,
  ArrowUpRight,
  ArrowRight,
  Check,
  Sparkles,
  Search,
  PenTool,
  Code2,
  Rocket,
  LifeBuoy,
  Star,
  ChevronLeft,
  ChevronRight,
  Building2,
  UserRound,
  ShoppingCart,
  Settings,
  Layers,
  Bell,
  Zap,
  ShieldCheck,
  RefreshCw,
  Package,
  Users,
  Calculator,
  BarChart3,
  Eye,
} from "lucide-react";
import { RevealLine, useFadeUp, gsap, ScrollTrigger } from "@/lib/anim";
import SplitText from "@/components/ui/SplitText";
import { LeadModal } from "@/components/LeadModal";
import serviceWeb from "@/assets/service-web.jpg";
import serviceMobile from "@/assets/service-mobile.jpg";
import serviceErp from "@/assets/service-erp.jpg";
import candleSite from "@/assets/chandys-laptop.jpg";
import bestMobile from "@/assets/project/best-portrait.jpg";


export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Services — Web, Mobile & ERP | WebApp Orbis" },
      { name: "description", content: "Website design & development, mobile apps and ERP systems built end-to-end." },
      { property: "og:title", content: "Services — WebApp Orbis" },
      { property: "og:description", content: "Website design & development, mobile apps and ERP systems built end-to-end." },
    ],
  }),
  component: Services,
});

const services = [
  {
    icon: Globe,
    num: "01",
    label: "WEBSITE",
    titleA: "Website",
    titleB: "Design & Development",
    desc: "We create professional websites that combine modern design with advanced functionality. Our websites are developed to deliver fast performance, responsive layouts, and seamless user experiences across desktops, tablets, and mobile devices.",
    image: serviceWeb,
    laptopImg: candleSite,
    phoneImg: bestMobile,
    photoImg: candleSite,
    tag: "Web Platforms",
    badges: [
      { icon: Rocket, title: "Modern Design", desc: "Visually engaging and on-brand websites" },
      { icon: BarChart3, title: "High Performance", desc: "Fast, secure and SEO-friendly" },
      { icon: Smartphone, title: "Fully Responsive", desc: "Perfect experience across all devices" },
    ],
    features: [
      { icon: Building2, title: "Corporate Websites", desc: "Professional websites for growing businesses" },
      { icon: UserRound, title: "Business & Portfolio Websites", desc: "Showcase your brand and work" },
      { icon: ShoppingCart, title: "E-commerce Websites", desc: "Feature-rich online stores" },
      { icon: Smartphone, title: "Responsive Web Design", desc: "Optimised for all devices" },
      { icon: Code2, title: "Custom Web Applications", desc: "Scalable web solutions tailored to your needs" },
      { icon: Settings, title: "Website Maintenance & Support", desc: "Reliable ongoing support and updates" },
    ],
    stack: ["Next.js", "TypeScript", "Tailwind", "Sanity", "Vercel"],
  },
  {
    icon: Smartphone,
    num: "02",
    label: "MOBILE APPS",
    titleA: "Mobile App",
    titleB: "Development",
    desc: "We develop customised mobile applications designed to improve customer accessibility and business operations. Our applications are built with modern technologies to ensure smooth performance, security, and scalability.",
    image: serviceMobile,
    laptopImg: candleSite,
    phoneImg: bestMobile,
    tag: "iOS · Android",
    badges: [
      { icon: Zap, title: "Native Performance", desc: "Buttery-smooth on any device" },
      { icon: Layers, title: "Cross-Platform", desc: "One app for iOS & Android" },
      { icon: ShieldCheck, title: "Secure", desc: "Safe logins, protected data" },
    ],
    features: [
      { icon: Smartphone, title: "Android App Development", desc: "Native-quality Android apps" },
      { icon: Layers, title: "iOS App Development", desc: "Polished iPhone & iPad apps" },
      { icon: RefreshCw, title: "Cross-Platform Apps", desc: "One codebase, both platforms" },
      { icon: ShoppingCart, title: "E-commerce Mobile Apps", desc: "Sell right from the app" },
      { icon: Bell, title: "Push Notifications", desc: "Re-engage users instantly" },
      { icon: ShieldCheck, title: "Secure & Scalable", desc: "Built to grow safely" },
    ],
    stack: ["Swift", "Kotlin", "React Native", "Expo", "Firebase"],
  },
  {
    icon: Database,
    num: "03",
    label: "ENTERPRISE",
    titleA: "ERP Software",
    titleB: "Solutions",
    desc: "Our ERP solutions are designed to simplify and automate business operations through integrated management systems. We develop customised ERP software that improves productivity, workflow efficiency, and data management across departments.",
    image: serviceErp,
    laptopImg: candleSite,
    phoneImg: bestMobile,
    tag: "Enterprise",
    badges: [
      { icon: Settings, title: "Automated Workflows", desc: "Less manual busywork" },
      { icon: BarChart3, title: "Real-time Insights", desc: "Decisions backed by data" },
      { icon: ShieldCheck, title: "Enterprise Secure", desc: "Role-based access control" },
    ],
    features: [
      { icon: Database, title: "Custom ERP Development", desc: "Tailored to your workflow" },
      { icon: Package, title: "Inventory Management", desc: "Stock control made simple" },
      { icon: Users, title: "HR Management", desc: "People ops in one place" },
      { icon: Calculator, title: "Accounting & Finance", desc: "A clear financial picture" },
      { icon: BarChart3, title: "Reports & Analytics", desc: "Real-time business insights" },
      { icon: RefreshCw, title: "Workflow Automation", desc: "Less manual work daily" },
    ],
    stack: ["Node.js", "PostgreSQL", "Redis", "Docker", "AWS"],
  },
]

const testimonials = [
  {
    quote: "They rebuilt our platform in 9 weeks and doubled our checkout conversion. Genuinely the best agency we've worked with.",
    name: "Amelia Crane",
    role: "Head of Product, Lumen Goods",
  },
  {
    quote: "An ERP that our team actually enjoys using. The level of craft in the workflows is unreal.",
    name: "Mateo Rivera",
    role: "COO, Northwind Logistics",
  },
  {
    quote: "Our App Store rating jumped from 3.4 to 4.8 after the rewrite. Worth every dollar.",
    name: "Priya Shah",
    role: "Founder, Quill Health",
  },
];


function ServiceVisual({ s }: { s: (typeof services)[number] }) {
  const B0 = s.badges[0].icon;
  const B1 = s.badges[1].icon;
  const B2 = s.badges[2].icon;

  // Photo mode: clean image, no mockups/badges (user-supplied photo)
  if ((s as any).photoImg) {
    return (
      <div className="relative w-full aspect-[16/10]">
        <div className="absolute inset-0 rounded-[2rem] overflow-hidden shadow-[0_24px_60px_rgb(0,0,0,0.12)]">
          <img
            src={(s as any).photoImg}
            alt={s.titleA + " " + s.titleB}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full min-h-[400px] sm:min-h-[480px]">
      {/* Soft background */}
      <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-[#eaf3ff] via-[#f4f9ff] to-[#e8f1ff] overflow-hidden">
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-blue-100/70 blur-2xl" />
        <div className="absolute -bottom-20 -left-12 w-72 h-72 rounded-full bg-indigo-100/60 blur-2xl" />
        <div className="absolute top-6 left-6 grid grid-cols-4 gap-2 opacity-60">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-blue-300" />
          ))}
        </div>
      </div>

      {/* Tag pill */}
      <span className="absolute top-5 left-1/2 -translate-x-1/2 z-10 rounded-full bg-white/85 backdrop-blur px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-700 shadow-sm whitespace-nowrap">
        {s.tag}
      </span>

      {/* Laptop */}
      <div className="absolute left-1/2 -translate-x-[38%] top-[16%] w-[80%]">
        <div className="bg-slate-900 rounded-t-2xl p-[6px] pb-0 shadow-[0_24px_60px_rgb(0,0,0,0.18)]">
          <div className="rounded-t-xl overflow-hidden bg-white">
            <img src={s.laptopImg} alt={s.titleA + " " + s.titleB} className="w-full aspect-[16/10] object-cover object-top" loading="lazy" />
          </div>
        </div>
        <div className="h-[10px] bg-gradient-to-b from-slate-300 to-slate-400 rounded-b-lg mx-[-8%]" />
        <div className="h-[6px] w-[18%] mx-auto bg-slate-300/80 rounded-b-md" />
      </div>

      {/* Phone */}
      <div className="absolute left-[4%] bottom-[4%] w-[24%] min-w-[108px]">
        <div className="bg-slate-900 rounded-[1.8rem] p-[6px] shadow-[0_20px_50px_rgb(0,0,0,0.22)]">
          <div className="rounded-[1.4rem] overflow-hidden relative bg-white">
            <img src={s.phoneImg} alt={s.titleA + " mobile view"} className="w-full aspect-[9/18.5] object-cover object-top" loading="lazy" />
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[38%] h-[16px] bg-slate-900 rounded-full" />
          </div>
        </div>
      </div>

      {/* Floating badges */}
      <div className="absolute top-[16%] left-[1%] bg-white rounded-2xl shadow-[0_12px_32px_rgb(0,0,0,0.10)] px-3.5 py-2.5 flex items-start gap-2.5 max-w-[190px]">
        <span className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
          <B0 className="h-4 w-4 text-blue-500" strokeWidth={2} />
        </span>
        <span>
          <span className="block text-xs font-bold text-slate-900 leading-tight">{s.badges[0].title}</span>
          <span className="block text-[10px] text-slate-500 leading-snug mt-0.5">{s.badges[0].desc}</span>
        </span>
      </div>
      <div className="absolute top-[20%] right-[1%] bg-white rounded-2xl shadow-[0_12px_32px_rgb(0,0,0,0.10)] px-3.5 py-2.5 flex items-start gap-2.5 max-w-[190px]">
        <span className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
          <B1 className="h-4 w-4 text-blue-500" strokeWidth={2} />
        </span>
        <span>
          <span className="block text-xs font-bold text-slate-900 leading-tight">{s.badges[1].title}</span>
          <span className="block text-[10px] text-slate-500 leading-snug mt-0.5">{s.badges[1].desc}</span>
        </span>
      </div>
      <div className="absolute bottom-[3%] right-[8%] bg-white rounded-2xl shadow-[0_12px_32px_rgb(0,0,0,0.10)] px-3.5 py-2.5 flex items-start gap-2.5 max-w-[200px]">
        <span className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
          <B2 className="h-4 w-4 text-blue-500" strokeWidth={2} />
        </span>
        <span>
          <span className="block text-xs font-bold text-slate-900 leading-tight">{s.badges[2].title}</span>
          <span className="block text-[10px] text-slate-500 leading-snug mt-0.5">{s.badges[2].desc}</span>
        </span>
      </div>
    </div>
  );
}

function Services() {
  const cardsRef = useRef<HTMLDivElement>(null);
  const [leadService, setLeadService] = useState<string | null>(null);

  useFadeUp("[data-fade]");

  // Parallax on service card images
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: -12, scale: 1.15 },
          {
            yPercent: 12,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          }
        );
      });

      // Horizontal marquee for stack chips
      gsap.utils.toArray<HTMLElement>("[data-marquee]").forEach((el) => {
        gsap.to(el, {
          xPercent: -50,
          ease: "none",
          duration: 25,
          repeat: -1,
        });
      });
    }, cardsRef);
    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <>
      {/* Service cards — Figma style showcase */}
      <section ref={cardsRef} className="pt-36 pb-10">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 space-y-10">
          {services.map((s, i) => (
            <div
              key={s.titleA}
              data-fade
              className="grid gap-8 lg:gap-12 items-center rounded-[2rem] overflow-hidden py-8 px-5 sm:p-10 lg:p-12 md:grid-cols-2"
            >
              {/* Visual — always left */}
              <div>
                <ServiceVisual s={s} />
              </div>

              {/* Content — always right */}
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-sm font-semibold text-slate-500">{s.num}</span>
                  <span className="h-11 w-11 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center shadow-[0_8px_20px_rgb(37,99,235,0.3)]">
                    <s.icon className="h-5 w-5 text-white" strokeWidth={1.75} />
                  </span>
                  <span className="text-sm font-semibold tracking-[0.2em] text-blue-500 uppercase">
                    / {s.label}
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold tracking-tight leading-[1.1] mb-4">
                  <span className="text-slate-900">{s.titleA}</span>{" "}
                  <span className="text-blue-600">{s.titleB}</span>
                </h2>

                <p className="text-slate-500 text-[15px] leading-relaxed mb-7">
                  {s.desc}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5 mb-7">
                  {s.features.map((f, j) => (
                    <div key={j} className="flex items-start gap-3">
                      <span className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                        <f.icon className="h-[18px] w-[18px] text-blue-500" strokeWidth={1.75} />
                      </span>
                      <span>
                        <span className="block text-sm font-bold text-slate-900 leading-snug">{f.title}</span>
                        <span className="block text-xs text-slate-500 mt-0.5">{f.desc}</span>
                      </span>
                    </div>
                  ))}
                </div>

                <p className="text-[11px] font-semibold tracking-[0.25em] text-slate-400 uppercase mb-3">
                  Technologies we use
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {s.stack.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-slate-200 px-4 py-1.5 text-[13px] text-slate-600 bg-white"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3 sm:gap-4 flex-nowrap overflow-x-auto pb-1">
                  <button
                    onClick={() => setLeadService(`${s.titleA} ${s.titleB}`)}
                    className="inline-flex flex-shrink-0 items-center gap-2.5 pl-6 pr-2 py-2 rounded-full bg-gradient-to-r from-blue-700 to-blue-500 text-white font-semibold text-[15px] shadow-[0_10px_24px_rgb(37,99,235,0.35)] hover:shadow-[0_14px_32px_rgb(37,99,235,0.45)] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                  >
                    Get a Quote
                    <span className="h-9 w-9 rounded-full bg-white/20 flex items-center justify-center">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </button>
                  <Link
                    to="/portfolio"
                    className="inline-flex flex-shrink-0 items-center gap-2 px-6 py-3 rounded-full border-[1.5px] border-blue-500 text-blue-600 font-semibold text-[15px] hover:bg-blue-50 transition-all duration-300"
                  >
                    <Eye className="h-4 w-4" />
                    View Our Work
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <LeadModal
        open={leadService !== null}
        service={leadService ?? ""}
        onClose={() => setLeadService(null)}
      />

      {/* CTA */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div
            className="rounded-3xl p-12 sm:p-20 text-primary-foreground relative overflow-hidden"
            style={{ background: "var(--grad-primary)" }}
          >
            <SplitText tag="h2" className="text-display text-4xl sm:text-6xl max-w-3xl leading-[1]">
              Ready to start something<br /> people will talk about?
            </SplitText>
            <Link
              to="/contact"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-background px-7 py-4 text-base font-medium text-foreground transition-transform hover:scale-105"
            >
              Book a discovery call <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
