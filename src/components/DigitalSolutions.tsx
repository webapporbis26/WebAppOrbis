import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Globe, Building2, UserRound, ShoppingCart, Smartphone, Code2, Settings,
  Rocket, BarChart3, Bell, Star, Megaphone, Search, Mail, TrendingUp, MapPin,
  FileSearch, ArrowRight, ChevronLeft, ChevronRight, Palette, Layers, Zap,
  ShieldCheck, RefreshCw, Target,
} from "lucide-react";
import { LeadModal } from "@/components/LeadModal";

import resortImg from "@/assets/project/resort.jpeg";
import resortPortrait from "@/assets/project/resort-portrait.jpg";
import bestPortrait from "@/assets/project/best-portrait.jpg";
import malluImg from "@/assets/project/mallu.jpeg";
import eventImg from "@/assets/project/event.png";
import eventPortrait from "@/assets/project/event-portrait.jpg";
import candleImg from "@/assets/project/candle.png";
import dhanaPortrait from "@/assets/project/dhana-portrait.jpg";

type Feature = { icon: any; title: string; desc: string };
type Badge = { icon: any; title: string; desc: string };
type Service = {
  num: string;
  label: string;
  titleA: string;
  titleB: string;
  desc: string;
  features: Feature[];
  techs: string[];
  badges: Badge[];
  laptopImg: string;
  phoneImg: string;
  laptopAlt: string;
  phoneAlt: string;
};

const services: Service[] = [
  {
    num: "01",
    label: "WEBSITE",
    titleA: "Website",
    titleB: "Design & Development",
    desc: "We create professional websites that combine modern design with advanced functionality. Our websites are built to deliver fast performance, responsive layouts, and seamless user experiences across desktops, tablets, and mobile devices.",
    features: [
      { icon: Building2, title: "Corporate Websites", desc: "Professional websites for growing businesses" },
      { icon: UserRound, title: "Business & Portfolio Websites", desc: "Showcase your brand and work" },
      { icon: ShoppingCart, title: "E-commerce Websites", desc: "Feature-rich online stores" },
      { icon: Smartphone, title: "Responsive Web Design", desc: "Optimised for all devices" },
      { icon: Code2, title: "Custom Web Applications", desc: "Scalable web solutions tailored to your needs" },
      { icon: Settings, title: "Website Maintenance & Support", desc: "Reliable ongoing support and updates" },
    ],
    techs: ["React", "Next.js", ".NET", "Tailwind CSS", "SQL Server"],
    badges: [
      { icon: Rocket, title: "Modern Design", desc: "Visually engaging and on-brand websites" },
      { icon: BarChart3, title: "High Performance", desc: "Fast, secure and SEO-friendly" },
      { icon: Smartphone, title: "Fully Responsive", desc: "Perfect experience across all devices" },
    ],
    laptopImg: resortImg,
    phoneImg: resortPortrait,
    laptopAlt: "Chandy's Hotels and Resorts website on laptop",
    phoneAlt: "Resort website on mobile phone",
  },
  {
    num: "02",
    label: "MOBILE APPS",
    titleA: "Mobile App",
    titleB: "Design & Development",
    desc: "We build intuitive, high-performance mobile apps for Android and iOS that your customers will love to use every single day — from idea and design to launch and beyond.",
    features: [
      { icon: Smartphone, title: "Android App Development", desc: "Native and cross-platform Android apps" },
      { icon: Layers, title: "iOS App Development", desc: "Polished apps for iPhone and iPad" },
      { icon: Palette, title: "UI/UX Design", desc: "Intuitive interfaces users love" },
      { icon: Bell, title: "Push Notifications", desc: "Re-engage your users anytime" },
      { icon: Zap, title: "High Performance", desc: "Fast, smooth and battery-friendly" },
      { icon: RefreshCw, title: "Maintenance & Updates", desc: "Keep your app running smoothly" },
    ],
    techs: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase"],
    badges: [
      { icon: Smartphone, title: "Native Feel", desc: "Smooth, platform-perfect experience" },
      { icon: Zap, title: "Fast & Light", desc: "Optimised for speed and battery" },
      { icon: ShieldCheck, title: "Secure", desc: "Safe logins and protected data" },
    ],
    laptopImg: malluImg,
    phoneImg: bestPortrait,
    laptopAlt: "Mobile app dashboard on laptop",
    phoneAlt: "Mobile app on phone",
  },
  {
    num: "03",
    label: "MARKETING",
    titleA: "Digital",
    titleB: "Marketing",
    desc: "Data-driven marketing campaigns that grow your brand, drive quality traffic, and turn clicks into customers — across every channel that matters for your business.",
    features: [
      { icon: Megaphone, title: "Social Media Marketing", desc: "Build your brand on every platform" },
      { icon: Search, title: "Search Engine Marketing", desc: "Get found on Google instantly" },
      { icon: Target, title: "Content Marketing", desc: "Stories that attract and sell" },
      { icon: Mail, title: "Email Marketing", desc: "Campaigns that convert" },
      { icon: BarChart3, title: "Analytics & Reporting", desc: "Know exactly what's working" },
      { icon: Star, title: "Brand Strategy", desc: "Positioning that stands out" },
    ],
    techs: ["Google Ads", "Meta Ads", "Analytics", "Mailchimp", "Canva"],
    badges: [
      { icon: Target, title: "Targeted Reach", desc: "Right audience, right message" },
      { icon: TrendingUp, title: "Growing ROI", desc: "Campaigns tuned for returns" },
      { icon: BarChart3, title: "Clear Reports", desc: "Transparent monthly insights" },
    ],
    laptopImg: eventImg,
    phoneImg: eventPortrait,
    laptopAlt: "Marketing campaign dashboard on laptop",
    phoneAlt: "Social campaign on phone",
  },
  {
    num: "04",
    label: "SEO",
    titleA: "SEO",
    titleB: "Optimization",
    desc: "Climb the search rankings and get discovered by customers who are already looking for what you offer — with white-hat SEO that delivers lasting results.",
    features: [
      { icon: FileSearch, title: "On-Page SEO", desc: "Optimise every page perfectly" },
      { icon: Globe, title: "Off-Page SEO", desc: "Build authority and backlinks" },
      { icon: Search, title: "Keyword Research", desc: "Target what actually matters" },
      { icon: Zap, title: "Technical SEO", desc: "Fast, crawlable websites" },
      { icon: MapPin, title: "Local SEO", desc: "Win customers nearby" },
      { icon: BarChart3, title: "Audits & Reports", desc: "Clear monthly progress" },
    ],
    techs: ["SEMrush", "Ahrefs", "Search Console", "Screaming Frog"],
    badges: [
      { icon: TrendingUp, title: "Higher Rankings", desc: "Climb to page one of Google" },
      { icon: Search, title: "More Traffic", desc: "Qualified organic visitors" },
      { icon: ShieldCheck, title: "White-Hat Only", desc: "Safe, lasting techniques" },
    ],
    laptopImg: candleImg,
    phoneImg: dhanaPortrait,
    laptopAlt: "SEO analytics dashboard on laptop",
    phoneAlt: "Search results on phone",
  },
];

function DeviceVisual({ service }: { service: Service }) {
  const Badge0Icon = service.badges[0].icon;
  const Badge1Icon = service.badges[1].icon;
  const Badge2Icon = service.badges[2].icon;
  return (
    <div className="relative w-full h-[420px] sm:h-[480px] lg:h-[540px]">
      {/* Soft background blob */}
      <div className="absolute inset-4 sm:inset-6 rounded-[2.5rem] bg-gradient-to-br from-[#eaf3ff] via-[#f4f9ff] to-[#e8f1ff] overflow-hidden">
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-blue-100/70 blur-2xl" />
        <div className="absolute -bottom-24 -left-16 w-80 h-80 rounded-full bg-indigo-100/60 blur-2xl" />
        {/* dotted pattern */}
        <div className="absolute top-8 left-8 grid grid-cols-4 gap-2 opacity-60">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-blue-300" />
          ))}
        </div>
        {/* soft leaf blobs */}
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-emerald-100/70 rounded-full blur-xl" />
      </div>

      {/* Laptop */}
      <div className="absolute left-1/2 -translate-x-[38%] top-[16%] w-[74%]">
        <div className="bg-slate-900 rounded-t-2xl p-[6px] pb-0 shadow-[0_24px_60px_rgb(0,0,0,0.18)]">
          <div className="rounded-t-xl overflow-hidden bg-white">
            <img
              src={service.laptopImg}
              alt={service.laptopAlt}
              className="w-full aspect-[16/10] object-cover object-top"
              loading="lazy"
            />
          </div>
        </div>
        <div className="h-[10px] bg-gradient-to-b from-slate-300 to-slate-400 rounded-b-lg mx-[-8%]" />
        <div className="h-[6px] w-[18%] mx-auto bg-slate-300/80 rounded-b-md" />
      </div>

      {/* Phone */}
      <div className="absolute left-[4%] bottom-[6%] w-[24%] min-w-[110px]">
        <div className="bg-slate-900 rounded-[1.8rem] p-[6px] shadow-[0_20px_50px_rgb(0,0,0,0.22)]">
          <div className="rounded-[1.4rem] overflow-hidden relative bg-white">
            <img
              src={service.phoneImg}
              alt={service.phoneAlt}
              className="w-full aspect-[9/18.5] object-cover object-top"
              loading="lazy"
            />
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[38%] h-[18px] bg-slate-900 rounded-full" />
          </div>
        </div>
      </div>

      {/* Floating badges */}
      <div className="absolute top-[6%] left-[2%] bg-white rounded-2xl shadow-[0_12px_32px_rgb(0,0,0,0.10)] px-4 py-3 flex items-start gap-3 max-w-[210px]">
        <span className="h-9 w-9 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
          <Badge0Icon className="h-4.5 w-4.5 text-blue-500" strokeWidth={2} />
        </span>
        <span>
          <span className="block text-[13px] font-bold text-slate-900 leading-tight">{service.badges[0].title}</span>
          <span className="block text-[11px] text-slate-500 leading-snug mt-0.5">{service.badges[0].desc}</span>
        </span>
      </div>

      <div className="absolute top-[10%] right-[1%] bg-white rounded-2xl shadow-[0_12px_32px_rgb(0,0,0,0.10)] px-4 py-3 flex items-start gap-3 max-w-[210px]">
        <span className="h-9 w-9 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
          <Badge1Icon className="h-4.5 w-4.5 text-blue-500" strokeWidth={2} />
        </span>
        <span>
          <span className="block text-[13px] font-bold text-slate-900 leading-tight">{service.badges[1].title}</span>
          <span className="block text-[11px] text-slate-500 leading-snug mt-0.5">{service.badges[1].desc}</span>
        </span>
      </div>

      <div className="absolute bottom-[4%] right-[10%] bg-white rounded-2xl shadow-[0_12px_32px_rgb(0,0,0,0.10)] px-4 py-3 flex items-start gap-3 max-w-[220px]">
        <span className="h-9 w-9 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
          <Badge2Icon className="h-4.5 w-4.5 text-blue-500" strokeWidth={2} />
        </span>
        <span>
          <span className="block text-[13px] font-bold text-slate-900 leading-tight">{service.badges[2].title}</span>
          <span className="block text-[11px] text-slate-500 leading-snug mt-0.5">{service.badges[2].desc}</span>
        </span>
      </div>

      {/* Decorative curved arrow */}
      <svg className="absolute top-[4%] left-[38%] w-16 h-10 text-blue-400 hidden sm:block" viewBox="0 0 64 40" fill="none">
        <path d="M4 36 C 24 36, 30 8, 58 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M50 4 L58 10 L51 17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export function DigitalSolutions() {
  const [active, setActive] = useState(0);
  const [leadOpen, setLeadOpen] = useState(false);
  const service = services[active];

  const go = (dir: number) =>
    setActive((i) => (i + dir + services.length) % services.length);

  return (
    <section className="relative py-12 sm:py-16 bg-white overflow-hidden">
      <div className="mx-auto max-w-[90rem] px-5 sm:px-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8" data-fade>
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="h-px w-10 sm:w-12 bg-blue-400" />
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.3em] text-blue-500 uppercase">Our Services</span>
            <span className="h-px w-10 sm:w-12 bg-blue-400" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-900 leading-tight tracking-tight mb-6">
            Digital Solutions for <span className="text-blue-600">Your Business</span>
          </h2>
          {/* Service tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            {services.map((s, i) => (
              <button
                key={s.num}
                onClick={() => setActive(i)}
                className={`px-4 sm:px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 border ${
                  i === active
                    ? "bg-blue-600 border-blue-600 text-white shadow-[0_8px_20px_rgb(37,99,235,0.3)]"
                    : "bg-white border-slate-200 text-slate-600 hover:border-blue-400 hover:text-blue-600"
                }`}
              >
                <span className="mr-1.5 opacity-70">{s.num}</span> {s.label.charAt(0) + s.label.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Showcase panel */}
        <div className="relative" data-fade key={active}>
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left visual */}
            <DeviceVisual service={service} />

            {/* Right content */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="h-11 w-11 rounded-full bg-blue-50 flex items-center justify-center">
                  <Globe className="h-5 w-5 text-blue-500" strokeWidth={1.75} />
                </span>
                <span className="text-sm font-semibold tracking-[0.2em] text-blue-500 uppercase">
                  {service.num} / {service.label}
                </span>
              </div>

              <h3 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.05] mb-5">
                <span className="text-slate-900">{service.titleA}</span>{" "}
                <span className="text-blue-600">{service.titleB}</span>
              </h3>

              <p className="text-slate-500 text-[15px] sm:text-base leading-relaxed mb-8 max-w-xl">
                {service.desc}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 mb-8">
                {service.features.map((f, i) => (
                  <div key={i} className="flex items-start gap-3.5">
                    <span className="h-11 w-11 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                      <f.icon className="h-5 w-5 text-blue-500" strokeWidth={1.75} />
                    </span>
                    <span>
                      <span className="block text-[15px] font-bold text-slate-900 leading-snug">{f.title}</span>
                      <span className="block text-[13px] text-slate-500 mt-0.5">{f.desc}</span>
                    </span>
                  </div>
                ))}
              </div>

              <p className="text-[11px] font-semibold tracking-[0.25em] text-slate-400 uppercase mb-3">
                Technologies we use
              </p>
              <div className="flex flex-wrap gap-2.5 mb-8">
                {service.techs.map((t) => (
                  <span
                    key={t}
                    className="px-4 py-2 rounded-full border border-slate-200 text-[13px] font-medium text-slate-600 bg-white"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => setLeadOpen(true)}
                  className="inline-flex items-center gap-2.5 pl-6 pr-2 py-2 rounded-full bg-gradient-to-r from-blue-700 to-blue-500 text-white font-semibold text-[15px] shadow-[0_10px_24px_rgb(37,99,235,0.35)] hover:shadow-[0_14px_32px_rgb(37,99,235,0.45)] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                >
                  Get a Quote
                  <span className="h-9 w-9 rounded-full bg-white/20 flex items-center justify-center">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </button>
                <Link
                  to="/portfolio"
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full border-[1.5px] border-blue-500 text-blue-600 font-semibold text-[15px] hover:bg-blue-50 transition-all duration-300"
                >
                  <Search className="h-4 w-4" />
                  View Our Work
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Arrows + dots */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={() => go(-1)}
              aria-label="Previous service"
              className="h-11 w-11 rounded-full border border-slate-200 grid place-items-center text-slate-600 hover:border-blue-500 hover:text-blue-600 transition"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-2">
              {services.map((s, i) => (
                <button
                  key={s.num}
                  onClick={() => setActive(i)}
                  aria-label={`Go to ${s.label}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === active ? "w-8 bg-blue-600" : "w-2 bg-slate-300 hover:bg-slate-400"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => go(1)}
              aria-label="Next service"
              className="h-11 w-11 rounded-full border border-slate-200 grid place-items-center text-slate-600 hover:border-blue-500 hover:text-blue-600 transition"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <LeadModal
        open={leadOpen}
        service={service.titleA + " " + service.titleB}
        onClose={() => setLeadOpen(false)}
      />
    </section>
  );
}
