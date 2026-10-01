import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, Globe, Smartphone, Database, Sparkles, Zap, Shield, Users, Star, Search, Rocket, MonitorSmartphone, SearchCheck, CodeXml, Headset, Share2, MessageCircle, PhoneCall, LayoutTemplate, TrendingUp, ArrowRight, Folder, Trophy, Eye } from "lucide-react";
import { gsap, ScrollTrigger, RevealLine, useTextReveal, useFadeUp } from "@/lib/anim";
import { MagneticButton } from "@/components/MagneticButton";
import { FaqPro } from "@/components/ui/faq-pro";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { DigitalSolutions } from "@/components/DigitalSolutions";
import MultiOrbitSemiCircle from "@/components/ui/multi-orbit-semi-circle";
import { LogoCloud } from "@/components/ui/logo-cloud-3";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { CheckCircle2 } from "lucide-react";

import dhanaImg from "@/assets/project/dhana.jpeg";
import resortImg from "@/assets/project/resort.jpeg";
import malluImg from "@/assets/project/mallu.jpeg";
import bestImg from "@/assets/project/best.png";
import candleImg from "@/assets/project/candle.png";
import eventImg from "@/assets/project/event.png";
import dhanaPortrait from "@/assets/project/dhana-portrait.jpg";
import resortPortrait from "@/assets/project/resort-portrait.jpg";
import malluPortrait from "@/assets/project/mallu-portrait.jpg";
import bestPortrait from "@/assets/project/best-portrait.jpg";
import eventPortrait from "@/assets/project/event-portrait.jpg";
import aboutShowcase from "@/assets/about-showcase.png";

const deskHeroItems = [
  { type: "image", src: bestImg, alt: "Best Choice Qatar website showcase on laptop and phone" },
  { type: "image", src: dhanaImg, alt: "Denahalaya institute website showcase on laptop and phone" },
  { type: "image", src: eventImg, alt: "Dreamweaver Events website showcase on laptop and phone" },
  { type: "image", src: malluImg, alt: "Mallusmart website showcase on laptop and phone" },
  { type: "image", src: resortImg, alt: "Chandys Hotels and Resorts website showcase on laptop and phone" },
];

const mobileHeroItems = [
  { type: "image", src: bestPortrait, alt: "Best Choice Qatar website showcase on laptop" },
  { type: "image", src: dhanaPortrait, alt: "Denahalaya institute website showcase on laptop" },
  { type: "image", src: eventPortrait, alt: "Dreamweaver Events website showcase on laptop" },
  { type: "image", src: malluPortrait, alt: "Mallusmart website showcase on laptop" },
  { type: "image", src: resortPortrait, alt: "Chandys Hotels and Resorts website showcase on laptop" },
];

const faqs = [
  { q: "How do engagements typically start?", a: "A 30-minute discovery call, followed by a fixed-fee discovery sprint to scope the work in detail." },
  { q: "Do you work with in-house teams?", a: "Yes — we frequently embed with internal product, design or engineering teams." },
  { q: "What about post-launch?", a: "Every project includes a 30-day warranty. Most clients continue on a monthly retainer." },
  { q: "Where are you based?", a: "A distributed team across London, Lisbon and Bengaluru — overlapping hours with EU and US clients." },
];

const featuresList = [
  { icon: MonitorSmartphone, title: "Mobile Friendly Web Designs", desc: "Responsive designs that look perfect on all devices.", color: "text-blue-500", bg: "bg-blue-50", line: "bg-blue-500" },
  { icon: SearchCheck, title: "SEO-Optimized Websites", desc: "Get better visibility and rank higher on Google.", color: "text-green-500", bg: "bg-green-50", line: "bg-green-500" },
  { icon: CodeXml, title: "Lightweight and Fast Loading HTML Pages", desc: "Clean code and optimized performance for a faster website.", color: "text-purple-500", bg: "bg-purple-50", line: "bg-purple-500" },
  { icon: Headset, title: "Unconditional Free Lifetime Support", desc: "We are always here to support your business.", color: "text-orange-400", bg: "bg-orange-50", line: "bg-orange-400" },
  { icon: Share2, title: "Social Media Page Creation and Integration", desc: "Connect your brand with your audience on all social platforms.", color: "text-pink-500", bg: "bg-pink-50", line: "bg-pink-500" },
  { icon: MessageCircle, title: "Direct Enquiry to Your WhatsApp", desc: "Get instant enquiries directly to your WhatsApp.", color: "text-cyan-500", bg: "bg-cyan-50", line: "bg-cyan-500" },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "WebApp Orbis — Web, Mobile & ERP Built Beautifully" },
      { name: "description", content: "A premium digital studio crafting websites, mobile apps and ERP systems for ambitious brands." },
      { property: "og:title", content: "WebApp Orbis — Premium Digital Solutions" },
      { property: "og:description", content: "Web, mobile and ERP solutions crafted for ambitious brands." },
    ],
  }),
  component: Home,
});



const processSteps = [
  { icon: PhoneCall, title: "Project Discussion", desc: "We understand your business goals and evaluate the project in detail.", color: "text-blue-500", bg: "bg-blue-50", badge: "bg-blue-100 text-blue-600", line: "bg-blue-500" },
  { icon: LayoutTemplate, title: "Design Preview", desc: "We create design concepts and share preview with suggestions for your feedback.", color: "text-orange-400", bg: "bg-orange-50", badge: "bg-orange-100 text-orange-500", line: "bg-orange-400" },
  { icon: MonitorSmartphone, title: "Website Development", desc: "We design the web pages and convert them into clean, responsive HTML pages.", color: "text-purple-500", bg: "bg-purple-50", badge: "bg-purple-100 text-purple-600", line: "bg-purple-500" },
  { icon: Rocket, title: "Launch & Final Payment", desc: "After your approval, we launch the website and complete the final payment.", color: "text-green-500", bg: "bg-green-50", badge: "bg-green-100 text-green-600", line: "bg-green-500" },
  { icon: Headset, title: "Ongoing Support", desc: "You will receive our continued support and dedicated sales service.", color: "text-pink-500", bg: "bg-pink-50", badge: "bg-pink-100 text-pink-600", line: "bg-pink-500" },
];

interface ProjectItem {
  img: string;
  title: string;
  link: string;
  desc: string;
  badge: string;
  badgeClass: string;
  arrowClass: string;
}

function ProjectCard({ c }: { c: ProjectItem }) {
  return (
    <div data-fade className="group bg-white rounded-3xl p-3 sm:p-4 shadow-[0_4px_24px_rgb(0,0,0,0.04)] hover:shadow-[0_12px_36px_rgb(0,0,0,0.08)] hover:-translate-y-1.5 transition-all duration-300">
      <a href={c.link} target="_blank" rel="noopener noreferrer" className="block relative overflow-hidden rounded-2xl">
        <img
          src={c.img}
          alt={c.title}
          loading="lazy"
          className="w-full aspect-[16/10] object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className={`absolute top-3 left-3 sm:top-4 sm:left-4 text-[11px] sm:text-xs font-semibold px-3 py-1.5 rounded-full ${c.badgeClass}`}>
          {c.badge}
        </span>
      </a>
      <div className="px-2 sm:px-3 pt-4 pb-2">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 uppercase tracking-wide leading-snug">
              {c.title}
            </h3>
            <p className="text-[13px] sm:text-sm text-slate-500 mt-1.5 leading-relaxed">
              {c.desc}
            </p>
          </div>
          <a
            href={c.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${c.title}`}
            className={`flex-shrink-0 h-10 w-10 rounded-full ${c.arrowClass} flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5`}
          >
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <a
          href={c.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 mt-3 transition-colors"
        >
          View Project
          <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
}

function Home() {
  const heroRef = useRef<HTMLDivElement>(null);

  useTextReveal(heroRef, { stagger: 0.14, delay: 0.4 });
  useFadeUp("[data-fade]");


  // Hero content pin + zoom-out as we leave
  useEffect(() => {
    if (!heroRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to("[data-hero-content]", {
        scale: 0.7,
        opacity: 0,
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "bottom 90%",
          end: "bottom 30%",
          scrub: 1.4,
        },
      });
    });
    return () => ctx.revert();
  }, []);



  // Pinned section heading: scale + cross-fade as user scrolls through
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-pin-heading]").forEach((el) => {
        gsap.to(el, {
          scale: 1.25,
          letterSpacing: "-0.06em",
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 70%",
            end: "bottom 20%",
            scrub: 1.6,
          },
        });
      });
    });
    return () => ctx.revert();
  }, []);




  return (
    <>
      {/* ============== HERO ============== */}
      <section
        ref={heroRef}
        className="relative flex min-h-[100dvh] items-end pb-12 sm:pb-16 overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <HeroMedia />
        </div>

        <div data-hero-content className="relative z-20 mx-auto w-full max-w-7xl px-5 sm:px-8 text-white will-change-transform">
          <div className="max-w-3xl">

            <div className="hidden lg:flex flex-nowrap items-center gap-2 sm:gap-3">
              <MagneticButton
                as="a"
                href="/contact"
                className="group gap-2 rounded-[14px] px-5 py-3 text-sm sm:px-7 sm:py-4 sm:text-base font-medium text-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.03] active:scale-95 whitespace-nowrap"
                {...({ style: { background: "var(--grad-primary)" } } as any)}
              >
                Start a project
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </MagneticButton>
              <MagneticButton
                as="a"
                href="/portfolio"
                className="group gap-2 rounded-[14px] border border-white/50 bg-black/25 px-5 py-3 text-sm sm:px-7 sm:py-4 sm:text-base font-medium text-white backdrop-blur-md hover:bg-white hover:text-black transition-all duration-300 hover:scale-[1.03] active:scale-95 whitespace-nowrap"
              >
                See our work
                <ArrowUpRight className="h-4 w-4" />
              </MagneticButton>
            </div>
          </div>



        </div>
      </section>

      {/* ============== ABOUT US ============== */}
      <section className="relative py-10 sm:py-14 bg-white overflow-hidden">
        {/* Decorative dotted pattern */}
        <div className="absolute right-8 sm:right-16 top-28 opacity-40 pointer-events-none hidden md:block">
          <div className="grid grid-cols-5 gap-2">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-blue-300" />
            ))}
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="text-center mb-8 sm:mb-10" data-fade>
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="h-px w-10 sm:w-12 bg-blue-400" />
              <span className="text-[11px] sm:text-xs font-semibold tracking-[0.3em] text-blue-500 uppercase">About Us</span>
              <span className="h-px w-10 sm:w-12 bg-blue-400" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-900 leading-tight tracking-tight mb-4">
              Digital Ideas. <span className="text-blue-600">Powerful Solutions.</span>
            </h2>
            <p className="text-slate-500 text-[15px] sm:text-lg max-w-2xl mx-auto leading-relaxed">
              We create modern websites, mobile applications and digital solutions to help businesses grow and succeed online.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            {/* Left: showcase image */}
            <div className="relative rounded-[2rem] overflow-hidden shadow-[0_12px_40px_rgb(0,0,0,0.08)] border border-slate-100" data-fade>
              <img
                src={aboutShowcase}
                alt="Our completed projects - BestChoice, Chandy's, Dream Weaver, Mallu's Mart, Denahalaya"
                className="w-full h-auto object-cover lg:absolute lg:inset-0 lg:h-full"
              />
            </div>

            {/* Right: content */}
            <div data-fade>
              <div className="flex items-center gap-3 mb-3">
                <span className="h-px w-8 bg-blue-400" />
                <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-blue-500 uppercase">About WebApp Orbis</span>
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-[2rem] font-extrabold text-slate-900 leading-tight tracking-tight mb-4">
                Your Trusted Partner in <span className="text-blue-600">Digital Growth</span>
              </h3>
              <p className="text-slate-500 text-[15px] sm:text-base leading-relaxed mb-6">
                We are a professional digital solutions company specialising in website designing and development, mobile app development, and customised ERP software solutions. Our focus is on helping businesses establish a strong digital presence while improving operational efficiency through innovative technology solutions.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-6 py-3 rounded-full transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 mb-8"
              >
                Read More
                <ArrowRight className="h-4 w-4" />
              </Link>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
                {[
                  { icon: Folder, n: "100+", l: "Projects shipped", color: "text-blue-500", bg: "bg-blue-50" },
                  { icon: Users, n: "50+", l: "Happy clients", color: "text-emerald-500", bg: "bg-emerald-50" },
                  { icon: Trophy, n: "5+", l: "Years of experience", color: "text-amber-500", bg: "bg-amber-50" },
                  { icon: TrendingUp, n: "98%", l: "Client retention", color: "text-purple-500", bg: "bg-purple-50" },
                ].map((s, i) => (
                  <div key={i} className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgb(0,0,0,0.04)] p-4 sm:p-5 text-center hover:shadow-[0_8px_24px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300">
                    <div className={`h-10 w-10 rounded-full ${s.bg} flex items-center justify-center mx-auto mb-2`}>
                      <s.icon className={`h-5 w-5 ${s.color}`} strokeWidth={1.75} />
                    </div>
                    <p className="text-xl sm:text-2xl font-extrabold text-blue-600 leading-tight">{s.n}</p>
                    <p className="text-[11px] sm:text-xs text-slate-500 mt-1 leading-snug">{s.l}</p>
                  </div>
                ))}
              </div>

              {/* Vision / Mission */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgb(0,0,0,0.04)] p-5 hover:shadow-[0_8px_24px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <div className="h-9 w-9 rounded-full bg-blue-50 flex items-center justify-center">
                      <Eye className="h-4.5 w-4.5 text-blue-500" strokeWidth={1.75} />
                    </div>
                    <h4 className="text-[15px] font-bold text-slate-900">Our Vision</h4>
                  </div>
                  <p className="text-[13px] text-slate-500 leading-relaxed">
                    To empower businesses with reliable digital technologies that improve customer engagement, simplify operations, and support long-term business growth.
                  </p>
                </div>
                <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgb(0,0,0,0.04)] p-5 hover:shadow-[0_8px_24px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <div className="h-9 w-9 rounded-full bg-rose-50 flex items-center justify-center">
                      <Rocket className="h-4.5 w-4.5 text-rose-500" strokeWidth={1.75} />
                    </div>
                    <h4 className="text-[15px] font-bold text-slate-900">Our Mission</h4>
                  </div>
                  <p className="text-[13px] text-slate-500 leading-relaxed">
                    To provide high-quality digital solutions through innovative design, advanced development practices, and customer-focused strategies.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ============== FEATURES STRIP ============== */}
      <section className="relative z-30 mt-6 sm:mt-8 mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-8 sm:mb-10 text-center" data-fade>
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="h-px w-12 sm:w-16 bg-blue-300" />
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-blue-500 uppercase">Our Expert Services</span>
            <span className="h-px w-12 sm:w-16 bg-blue-300" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-extrabold tracking-tight text-slate-900 leading-tight">
            Let's create a website that<br />
            <span className="text-blue-600">represents your brand and attracts customers.</span>
          </h2>
          <p className="mt-3 text-slate-500 text-base sm:text-lg">
            Talk to Web Design Experts today.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5" data-fade>
          {featuresList.map((f, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_16px_rgb(0,0,0,0.04)] p-5 sm:p-6 flex flex-col items-center text-center hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`h-16 w-16 sm:h-[4.5rem] sm:w-[4.5rem] rounded-full ${f.bg} flex items-center justify-center mb-4`}>
                <f.icon className={`h-8 w-8 ${f.color}`} strokeWidth={1.5} />
              </div>
              <h4 className="text-[13px] sm:text-sm font-bold text-slate-900 leading-snug mb-2">
                {f.title}
              </h4>
              <div className={`h-[3px] w-8 rounded-full ${f.line} mb-3`} />
              <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ============== OUR WORKS ============== */}
      <section className="relative py-10 sm:py-14 bg-[#f5f7fa] overflow-hidden">
        {/* Decorative dotted patterns */}
        <div className="absolute left-8 sm:left-16 top-24 opacity-40 pointer-events-none hidden md:block">
          <div className="grid grid-cols-5 gap-2">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-blue-300" />
            ))}
          </div>
        </div>
        <div className="absolute right-8 sm:right-16 top-24 opacity-40 pointer-events-none hidden md:block">
          <div className="grid grid-cols-5 gap-2">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-blue-300" />
            ))}
          </div>
        </div>

        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <div className="text-center mb-8 sm:mb-10" data-fade>
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="h-px w-10 sm:w-12 bg-blue-400" />
              <span className="text-[11px] sm:text-xs font-semibold tracking-[0.3em] text-blue-500 uppercase">Our Portfolio</span>
              <span className="h-px w-10 sm:w-12 bg-blue-400" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-900 leading-tight tracking-tight mb-4">
              Websites We&apos;ve Built for <span className="text-blue-600">Growing Brands</span>
            </h2>
            <p className="text-slate-500 text-[15px] sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Explore a selection of websites and digital experiences created for our clients.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {[
              {
                img: eventImg, title: "Dreamweaver Events", link: "https://dreamweaverevents.co.in",
                desc: "A modern and elegant website for a premium event management company.",
                badge: "Website Design & Development", badgeClass: "bg-blue-100 text-blue-700", arrowClass: "bg-blue-50 text-blue-600",
              },
              {
                img: candleImg, title: "Nazareth Candles", link: "https://nazarethcandles.com",
                desc: "A feature-rich website with masterclass registration and resource management.",
                badge: "Website Design & Development", badgeClass: "bg-emerald-100 text-emerald-700", arrowClass: "bg-emerald-50 text-emerald-600",
              },
              {
                img: resortImg, title: "Chandys Hotels & Resorts", link: "https://chandyshotelsandresorts.com",
                desc: "A premium website showcasing their resorts with elegant design and booking integration.",
                badge: "Website Design & Development", badgeClass: "bg-amber-100 text-amber-800", arrowClass: "bg-amber-50 text-amber-600",
              },
              {
                img: bestImg, title: "Bestchoice Qatar", link: "https://bestchoiceqatar.net",
                desc: "A product-focused website with SEO for portable cabins and industrial solutions.",
                badge: "Website Design, Development & SEO", badgeClass: "bg-purple-100 text-purple-700", arrowClass: "bg-purple-50 text-purple-600",
              },
              {
                img: malluImg, title: "Mallusmart", link: "https://mallusmart.com",
                desc: "An eCommerce platform to support Kerala homepreneurs with a modern shopping experience.",
                badge: "eCommerce Website", badgeClass: "bg-rose-100 text-rose-700", arrowClass: "bg-rose-50 text-rose-600",
              },
              {
                img: dhanaImg, title: "Denahalaya Punnapra", link: "https://denahalayapunnapra.com",
                desc: "A serene website for a psycho-spiritual institute with program details and outreach.",
                badge: "Website Design & Development", badgeClass: "bg-blue-100 text-blue-700", arrowClass: "bg-blue-50 text-blue-600",
              },
            ].map((c, i) => (
              <ProjectCard key={i} c={c} />
            ))}
          </div>
        </div>
      </section>

      {/* ============== CLIENTS / BRANDS ============== */}
      <section className="relative py-10 sm:py-14 bg-muted/10 border-t border-b border-border/50">
        <LogoCloud
          title={
            <>
              Brands That Trust <span className="font-bold text-primary">WebApp Orbis</span>
            </>
          }
          subtitle="Trusted by 50+ businesses worldwide to deliver digital solutions that perform."
          limit={15}
        />
      </section>

      {/* ============== TECHNOLOGIES WE USED ============== */}
      <MultiOrbitSemiCircle />

      {/* ============== OUR WEBSITE DESIGN PROCESS ============== */}
      <section className="relative py-10 sm:py-14 bg-white">
        <div className="mx-auto max-w-[90rem] px-5 sm:px-8">
          <div className="text-center mb-10 sm:mb-12" data-fade>
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="h-px w-12 sm:w-16 bg-blue-300" />
              <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-blue-500 uppercase">Our Process</span>
              <span className="h-px w-12 sm:w-16 bg-blue-300" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold tracking-tight text-slate-900 leading-tight mb-4">
              Our <span className="text-blue-600">Website Development Process</span>
            </h2>
            <p className="text-slate-500 text-[15px] sm:text-lg max-w-3xl mx-auto">
              From the initial idea to the final launch, we follow a clear and streamlined process to create a website that fits your business.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 sm:gap-4 lg:gap-5" data-fade>
            {processSteps.map((step, i) => (
              <div key={i} className="relative">
                <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_16px_rgb(0,0,0,0.04)] p-6 sm:p-5 flex flex-col items-center text-center h-full hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300">
                  <div className="w-full flex justify-start mb-2">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${step.badge}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className={`h-16 w-16 sm:h-[4.5rem] sm:w-[4.5rem] rounded-full ${step.bg} flex items-center justify-center mb-4`}>
                    <step.icon className={`h-8 w-8 ${step.color}`} strokeWidth={1.5} />
                  </div>
                  <h4 className="text-[15px] sm:text-base font-bold text-slate-900 leading-snug mb-2">
                    {step.title}
                  </h4>
                  <div className={`h-[3px] w-8 rounded-full ${step.line} mb-3`} />
                  <p className="text-[12px] sm:text-[13px] text-slate-500 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
                {i < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 -right-4 z-10 text-blue-300">
                    <svg width="28" height="16" viewBox="0 0 28 16" fill="none" className="opacity-60">
                      <path d="M1 8 H22 M18 3 L23 8 L18 13" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============== TESTIMONIALS ============== */}
      <TestimonialsSection />

      {/* ============== CTA BANNER ============== */}
      <section className="relative py-14 sm:py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_50%)] pointer-events-none" />
        <div className="mx-auto max-w-5xl px-5 sm:px-8 relative z-10 text-center">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
            Love Our Design? Let's Create Your Dream Website.
          </h2>
          <p className="text-blue-100 text-base sm:text-xl font-medium max-w-2xl mx-auto mb-8">
            Talk to Web Design Experts today. Let's collaborate to build a digital presence that stands out.
          </p>
          <div className="flex justify-center">
            <Link
              to="/contact"
              className="bg-white text-blue-600 hover:bg-blue-50 font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 inline-flex items-center gap-2 text-sm sm:text-base"
            >
              Get a Free Quote
              <span className="text-lg">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function HeroMedia() {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 1024 : false
  );
  const [currentIndex, setCurrentIndex] = useState(0);

  // Preload all hero images on mount to avoid black flash
  useEffect(() => {
    [...deskHeroItems, ...mobileHeroItems].forEach((item) => {
      if (item.type === "image") {
        const img = new Image();
        img.src = item.src;
      }
    });
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const items = isMobile ? mobileHeroItems : deskHeroItems;

  useEffect(() => {
    setCurrentIndex(0);
  }, [isMobile]);

  useEffect(() => {
    const currentItem = items[currentIndex];
    let timer: NodeJS.Timeout;

    if (currentItem.type === "image") {
      timer = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % items.length);
      }, 4000);
    } else {
      timer = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % items.length);
      }, 15000); // fallback
    }

    return () => clearTimeout(timer);
  }, [currentIndex, items]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
      {items.map((item, idx) => {
        const isActive = idx === currentIndex;
        return (
          <HeroMediaItem 
            key={item.src} 
            item={item} 
            isActive={isActive} 
            onNext={() => setCurrentIndex((prev) => (prev + 1) % items.length)} 
          />
        );
      })}
      {/* Readability scrims: keep CTA buttons, scroll cue and navbar legible on every slide */}
      <div className="pointer-events-none absolute inset-0 z-20 bg-black/10" />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-28 bg-gradient-to-b from-black/55 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[45%] bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
    </div>
  );
}

function HeroMediaItem({ item, isActive, onNext }: { item: any, isActive: boolean, onNext: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (item.type === "video" && videoRef.current) {
      videoRef.current.muted = true;
      if (isActive) {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch((err) => {
            console.warn("Autoplay blocked:", err);
          });
        }
      } else {
        videoRef.current.pause();
      }
    }
  }, [isActive, item.type, item.src]);

  return (
    <div
      className={`absolute inset-0 transition-opacity duration-1000 ${isActive ? "opacity-100 z-10" : "opacity-0 z-0"}`}
    >
      {item.type === "video" ? (
        <video
          ref={videoRef}
          src={item.src}
          muted
          playsInline
          autoPlay
          loop
          className="h-full w-full object-cover"
        />
      ) : (
        <>
          {/* Mobile (<lg): dedicated portrait crop, full-bleed cover — no letterboxing */}
          <img
            src={item.src}
            alt={item.alt || ""}
            loading={isActive ? "eager" : "lazy"}
            {...(isActive ? { fetchPriority: "high" } : {})}
            className="absolute inset-0 h-full w-full object-cover lg:hidden"
          />
          {/* Desktop: classic full-bleed cover */}
          <img
            src={item.src}
            alt={item.alt || ""}
            loading={isActive ? "eager" : "lazy"}
            {...(isActive ? { fetchPriority: "high" } : {})}
            className="absolute inset-0 hidden h-full w-full object-cover lg:block"
          />
        </>
      )}
    </div>
  );
}
