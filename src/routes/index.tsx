import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, Globe, Smartphone, Database, Sparkles, Zap, Shield, Users, Star, Search, Compass, Rocket, MonitorSmartphone, SearchCheck, CodeXml, Headset, Share2, MessageCircle } from "lucide-react";
import { gsap, ScrollTrigger, RevealLine, useTextReveal, useFadeUp, useCounter, useSerenityText } from "@/lib/anim";
import SplitText from "@/components/ui/SplitText";
import { MagneticButton } from "@/components/MagneticButton";
import { FaqPro } from "@/components/ui/faq-pro";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import MultiOrbitSemiCircle from "@/components/ui/multi-orbit-semi-circle";
import { LogoCloud } from "@/components/ui/logo-cloud-3";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CheckCircle2 } from "lucide-react";

import heroVideo from "@/assets/ido-video.mp4";

import eventVideo from "@/assets/project/event.mp4";
import candleVideo from "@/assets/project/candle.mp4";
import resortVideo from "@/assets/project/resort.mp4";
import malluVideo from "@/assets/project/mallu.mp4";
import dhnaVideo from "@/assets/project/dhna.mp4";
import dhanaImg from "@/assets/project/dhana.jpeg";
import resortImg from "@/assets/project/resort.jpeg";
import malluImg from "@/assets/project/mallu.jpeg";
import bestVideo from "@/assets/project/best.mp4";
import bestImg from "@/assets/project/best.png";
import candleImg from "@/assets/project/candle.png";
import eventImg from "@/assets/project/event.png";

import p1 from "@/assets/portfolio-1.jpg";
import p2 from "@/assets/portfolio-2.jpg";
import p3 from "@/assets/portfolio-3.jpg";
import p4 from "@/assets/portfolio-4.jpg";
import p5 from "@/assets/portfolio-5.jpg";
import p6 from "@/assets/portfolio-6.jpg";


const deskHeroItems = [
  { type: "video", src: heroVideo },
];

const mobileHeroItems = [
  { type: "video", src: heroVideo },
];

const faqs = [
  { q: "How do engagements typically start?", a: "A 30-minute discovery call, followed by a fixed-fee discovery sprint to scope the work in detail." },
  { q: "Do you work with in-house teams?", a: "Yes — we frequently embed with internal product, design or engineering teams." },
  { q: "What about post-launch?", a: "Every project includes a 30-day warranty. Most clients continue on a monthly retainer." },
  { q: "Where are you based?", a: "A distributed team across London, Lisbon and Bengaluru — overlapping hours with EU and US clients." },
];

const featuresList = [
  { icon: MonitorSmartphone, title: "Mobile Friendly Web Designs" },
  { icon: SearchCheck, title: "SEO-Optimized Websites" },
  { icon: CodeXml, title: "Lightweight and Fast Loading HTML Pages" },
  { icon: Headset, title: "Unconditional Free Lifetime Support" },
  { icon: Share2, title: "Social Media Page Creation and Integration" },
  { icon: MessageCircle, title: "Direct Enquiry to Your WhatsApp" },
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



const features = [
  { icon: Sparkles, title: "Crafted with intent", desc: "Every pixel, transition and interaction has a reason." },
  { icon: Zap, title: "Performance first", desc: "Sub-second loads. 100/100 Lighthouse is the baseline." },
  { icon: Shield, title: "Built to scale", desc: "Architecture that holds up at 10x your current traffic." },
  { icon: Users, title: "Partners, not vendors", desc: "We embed with your team and ship like one of you." },
];

const testimonials = [
  { quote: "WebApp Orbis rebuilt our platform end-to-end and our conversion jumped 38% in the first month.", name: "Maya Chen", role: "Head of Product · Northwind" },
  { quote: "The most polished design and engineering team we've worked with. Period.", name: "Daniel Park", role: "CEO · Atlas Logistics" },
  { quote: "They turned a 2-year ERP roadmap into a 4-month rollout. Effortless to work with.", name: "Sara Iqbal", role: "COO · Helios Retail" },
  { quote: "From discovery to launch every artifact felt premium. Our brand finally has a home.", name: "Tom Reyes", role: "Founder · Pebble" },
];

interface ProjectItem {
  type: "video" | "image";
  src: string;
  img: string;
  title: string;
  link: string;
}

function ProjectCard({ c }: { c: ProjectItem }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
    }
  }, []);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch((err) => {
        console.warn("Hover play was prevented:", err);
      });
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <a 
      href={c.link} 
      target="_blank" 
      rel="noopener noreferrer" 
      data-fade 
      className="group block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative w-full aspect-video overflow-hidden bg-muted">
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
      <div className="mt-4 sm:mt-5 text-left transition-transform duration-500">
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

function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const serenityRef = useRef<HTMLElement>(null);
  useTextReveal(heroRef, { stagger: 0.14, delay: 0.4 });
  useSerenityText(serenityRef);
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
        className="relative flex min-h-[100dvh] items-center pt-40 pb-20 lg:pt-32 overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <HeroMedia />
        </div>

        <div data-hero-content className="relative z-20 mx-auto w-full max-w-7xl px-5 sm:px-8 text-white will-change-transform">
          <div className="max-w-3xl mt-20">
            <h1 className="text-display text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-bold leading-[1.05] tracking-tight mb-6">
              Build Smarter Digital Experiences for Modern Businesses
            </h1>
            <p className="text-lg sm:text-xl text-white/90 leading-relaxed mb-4">
              Transform your business with professional website designing and development, mobile app development, and customised ERP solutions tailored to your operational needs. We create modern digital platforms that improve customer engagement, streamline business processes, and support long-term growth.
            </p>
            <p className="text-lg sm:text-xl text-white/90 leading-relaxed mb-10">
              From responsive business websites to advanced enterprise systems, our solutions are designed to deliver performance, functionality, and seamless user experiences across every device.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <MagneticButton
                as="a"
                href="/contact"
                className="group gap-2 rounded-full px-7 py-4 text-base font-medium text-white shadow-elegant"
                {...({ style: { background: "var(--grad-primary)" } } as any)}
              >
                Start a project
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </MagneticButton>
              <MagneticButton
                as="a"
                href="/portfolio"
                className="group gap-2 rounded-full border border-white/30 px-7 py-4 text-base font-medium text-white hover:bg-white hover:text-black transition-colors"
              >
                See our work
                <ArrowUpRight className="h-4 w-4" />
              </MagneticButton>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/70 z-20">
          <span>Scroll</span>
          <ArrowDown className="h-4 w-4 animate-bounce" />
        </div>
      </section>

      {/* ============== DIGITAL SOLUTIONS ============== */}
      <section className="relative py-24 sm:py-32 bg-[#f5f7fa]">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="text-center mb-16 sm:mb-20" data-fade>
            <h2 className="text-display text-3xl sm:text-4xl lg:text-[2.75rem] font-light text-foreground leading-[1.2] tracking-tight">
              Digital Solutions for your
            </h2>
            <h3 className="text-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-foreground leading-[1.2] tracking-tight">
              Business Growth
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
            {[
              {
                emoji: "💻",
                color: "#2DD4BF",
                title: "Website Designing & Development",
                desc: "We create responsive and professionally designed websites that enhance brand visibility and improve user experience. Our websites are developed with modern technologies to ensure speed, security, and seamless functionality across all devices.",
                link: "/services/web-development",
              },
              {
                emoji: "📱",
                color: "#F472B6",
                title: "Mobile App Development",
                desc: "Our mobile app development services help businesses connect with customers through intuitive and feature-rich applications. We develop customised Android and iOS applications focused on usability, performance, and long-term scalability.",
                link: "/services/mobile-development",
              },
              {
                emoji: "⚙️",
                color: "#FBBF24",
                title: "ERP Solutions",
                desc: "We develop customised ERP systems that streamline daily business operations and improve workflow management. Our ERP solutions help organisations manage multiple departments efficiently through integrated and automated systems.",
                link: "/services/erp-software",
              },
            ].map((card, i) => (
              <div key={i} data-fade className="flex flex-col items-start group">
                <div className="text-5xl mb-8">{card.emoji}</div>
                <h4 className="text-display text-xl sm:text-2xl font-bold text-foreground leading-tight mb-3">
                  {card.title}
                </h4>
                <div className="w-8 h-1 rounded-full mb-6" style={{ backgroundColor: card.color }} />
                <p className="text-[15px] text-foreground/70 leading-relaxed mb-8 flex-1">
                  {card.desc}
                </p>
                <Link
                  to={card.link}
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.15em] text-foreground/60 hover:text-foreground transition-colors group/link"
                >
                  View more
                  <span className="text-sm transition-transform group-hover/link:translate-x-0.5">+</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============== WHY CHOOSE US ============== */}
      <section className="relative py-24 sm:py-32 bg-background border-b border-border/40 overflow-hidden">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Left side: Bullets */}
            <div className="space-y-8" data-fade>
              <h2 className="text-3xl sm:text-4xl font-medium tracking-tight">Why Choose Us</h2>
              <ul className="space-y-5">
                {[
                  "Professional and responsive designs",
                  "SEO-friendly development approach",
                  "User-focused interface and experience",
                  "Scalable and secure solutions",
                  "Fast-loading and mobile-optimised platforms",
                  "Dedicated technical support and maintenance",
                  "Customised solutions for every business requirement"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-lg text-foreground/80">
                    <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Right side: Grow Your Business Digitally */}
            <div className="space-y-6" data-fade>
              <h3 className="text-3xl sm:text-4xl font-medium tracking-tight mb-8">Grow Your Business Digitally</h3>
              <p className="text-lg text-foreground/75 leading-relaxed">
                We combine creativity, technology, and strategy to deliver digital solutions that help businesses strengthen their online presence and improve operational performance.
              </p>
              <p className="text-lg text-foreground/75 leading-relaxed">
                Whether you need a professional website, a powerful mobile application, or a complete ERP system, we deliver solutions that support your business growth efficiently.
              </p>
            </div>
          </div>
        </div>
      </section>



      {/* ============== COMPREHENSIVE ABOUT US ============== */}
      <section className="relative py-32 sm:py-40 bg-muted/30">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-16 text-center max-w-3xl mx-auto">
            <p data-fade className="mb-4 text-xs uppercase tracking-[0.3em] text-muted-foreground">About · 02</p>
            <SplitText tag="h2" className="text-display text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.1]">
              A studio built around <span className="gradient-text">craft, clarity and care.</span>
            </SplitText>
          </div>

          <Tabs defaultValue="story" className="w-full">
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 max-w-3xl mx-auto mb-16 h-auto rounded-full bg-background border border-border/50 p-1">
              <TabsTrigger value="story" className="rounded-full py-3 text-base font-medium">Our Story</TabsTrigger>
              <TabsTrigger value="services" className="rounded-full py-3 text-base font-medium">What We Do</TabsTrigger>
              <TabsTrigger value="approach" className="rounded-full py-3 text-base font-medium">Our Approach</TabsTrigger>
            </TabsList>

            <TabsContent value="story" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                <div className="space-y-10" data-fade>
                  <div>
                    <h3 className="text-3xl font-semibold mb-6 text-foreground">About Us</h3>
                    <div className="space-y-4 text-lg text-foreground/75 leading-relaxed">
                      <p>
                        We are a professional digital solutions company specialising in website designing and development, mobile app development, and customised ERP software solutions. Our focus is on helping businesses establish a strong digital presence while improving operational efficiency through innovative technology solutions.
                      </p>
                      <p>
                        With a dedicated team of designers, developers, and technology experts, we create modern platforms that combine functionality, creativity, and performance. Our approach is centred around understanding business objectives and delivering solutions tailored to specific operational requirements.
                      </p>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="glass p-6 rounded-2xl border border-border/30">
                      <h4 className="text-xl font-semibold mb-3 text-primary">Our Vision</h4>
                      <p className="text-foreground/70 text-sm leading-relaxed">To empower businesses with reliable digital technologies that improve customer engagement, simplify operations, and support long-term business growth.</p>
                    </div>
                    <div className="glass p-6 rounded-2xl border border-border/30">
                      <h4 className="text-xl font-semibold mb-3 text-primary">Our Mission</h4>
                      <p className="text-foreground/70 text-sm leading-relaxed">To provide high-quality digital solutions through innovative design, advanced development practices, and customer-focused strategies.</p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6" data-fade>
                  {[
                    { n: 120, s: "+", l: "Projects shipped" },
                    { n: 38, s: "", l: "Countries reached" },
                    { n: 14, s: "", l: "Industry awards" },
                    { n: 98, s: "%", l: "Client retention" },
                  ].map((c, i) => (
                    <CounterCard key={i} n={c.n} s={c.s} l={c.l} />
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="services" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
              <div className="grid md:grid-cols-3 gap-8" data-fade>
                <div className="glass p-8 rounded-[2rem] border border-border/30 transition-transform hover:-translate-y-2">
                  <div className="h-16 w-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-8">
                    <Globe className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 text-foreground">Website Designing & Development</h3>
                  <p className="text-foreground/75 leading-relaxed text-base">
                    We create responsive and professionally designed websites that enhance brand visibility and improve user experience. Our websites are developed with modern technologies to ensure speed, security, and seamless functionality across all devices.
                  </p>
                </div>
                <div className="glass p-8 rounded-[2rem] border border-border/30 transition-transform hover:-translate-y-2">
                  <div className="h-16 w-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-8">
                    <Smartphone className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 text-foreground">Mobile App Development</h3>
                  <p className="text-foreground/75 leading-relaxed text-base">
                    Our mobile app development services help businesses connect with customers through intuitive and feature-rich applications. We develop customised Android and iOS applications focused on usability, performance, and long-term scalability.
                  </p>
                </div>
                <div className="glass p-8 rounded-[2rem] border border-border/30 transition-transform hover:-translate-y-2">
                  <div className="h-16 w-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-8">
                    <Database className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 text-foreground">ERP Software Solutions</h3>
                  <p className="text-foreground/75 leading-relaxed text-base">
                    We develop customised ERP systems that streamline daily business operations and improve workflow management. Our ERP solutions help organisations manage multiple departments efficiently through integrated and automated systems.
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="approach" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
              <div className="grid lg:grid-cols-2 gap-16 items-center" data-fade>
                <div className="order-2 lg:order-1 glass p-10 sm:p-12 rounded-[2.5rem] border border-border/30">
                  <h3 className="text-3xl font-semibold mb-8 text-foreground">Why Businesses Trust Us</h3>
                  <ul className="space-y-6">
                    {[
                      "Experienced development and design team",
                      "Customised business-focused solutions",
                      "Modern and scalable technologies",
                      "SEO-friendly and responsive development",
                      "Reliable technical support and maintenance",
                      "Focus on quality, performance, and security"
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-4 text-lg text-foreground/80">
                        <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="order-1 lg:order-2 space-y-8">
                  <h3 className="text-4xl font-semibold text-foreground">Our Approach</h3>
                  <div className="space-y-6 text-lg text-foreground/75 leading-relaxed">
                    <p>
                      We believe every business requires unique digital solutions. Our team works closely with clients to understand their goals, industry requirements, and operational challenges before creating customised strategies and technology platforms.
                    </p>
                    <p>
                      From planning and design to development and deployment, we maintain a transparent and collaborative process to ensure high-quality project delivery.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* ============== OUR WORKS ============== */}
      <section ref={serenityRef} className="relative py-20 sm:py-28 bg-background">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <div className="text-center max-w-4xl mx-auto mb-14">
            <h3 className="text-[28px] sm:text-[34px] font-light text-foreground mb-2 flex justify-center flex-wrap gap-x-2">
              {["Our", "Works", "Define", "Our", "Success"].map((w, i) => (
                <span key={i} className="serenity-word inline-block">{w}</span>
              ))}
            </h3>
            <h2 className="text-[40px] sm:text-[52px] font-thin text-foreground mb-5 tracking-wide leading-tight flex justify-center flex-wrap gap-x-[0.25em]">
              {["Journey", "Through", "Our", "Diverse", "Creations"].map((w, i) => (
                <span key={i} className="serenity-word inline-block hover:text-foreground/70 transition-colors duration-300">{w}</span>
              ))}
            </h2>
            <p data-fade className="text-[17px] text-foreground/80 mt-4">
              Take a look at how we help brands transform their digital presence through strategic design, development, and innovation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
            {[
              { type: "video" as const, src: eventVideo, img: eventImg, title: "Dreamweaver Events", link: "https://dreamweaverevents.co.in" },
              { type: "video" as const, src: candleVideo, img: candleImg, title: "Nazareth Candles", link: "https://nazarethcandles.com" },
              { type: "video" as const, src: resortVideo, img: resortImg, title: "Chandys Hotels & Resorts", link: "https://chandyshotelsandresorts.com" },
              { type: "video" as const, src: malluVideo, img: malluImg, title: "Mallusmart", link: "https://mallusmart.com" },
              { type: "video" as const, src: dhnaVideo, img: dhanaImg, title: "Denahalaya Punnapra", link: "https://denahalayapunnapra.com" },
              { type: "video" as const, src: bestVideo, img: bestImg, title: "Best Choice Qatar", link: "https://bestchoiceqatar.net" },
            ].map((c, i) => (
              <ProjectCard key={i} c={c} />
            ))}
          </div>

          <div className="mt-16 flex justify-center" data-fade>
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

      {/* ============== CLIENTS / BRANDS ============== */}
      <section className="relative py-20 bg-background">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-[1.2fr_2fr] gap-10 lg:gap-20 items-start mb-16" data-fade>
            <div>
              <h2 className="text-display text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.1] text-foreground tracking-tight">
                Top-notch<br />
                <span className="text-[#F59E0B] lowercase">clients</span>
              </h2>
            </div>
            <div className="space-y-6 pt-1 lg:pt-3">
              <p className="text-lg sm:text-xl text-foreground/75 leading-relaxed max-w-xl font-light">
                We partner with brands who share our values, and who want to shake things up for the greater good.
              </p>
              <div>
                <a 
                  href="/about" 
                  className="inline-flex items-center gap-2 text-sm font-bold text-foreground hover:text-foreground/70 transition-colors group"
                >
                  <span className="border-b border-foreground/30 group-hover:border-foreground transition-colors pb-0.5">about</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <LogoCloud />
      </section>

      {/* ============== TECHNOLOGIES WE USED ============== */}
      <MultiOrbitSemiCircle />

      {/* ============== LET'S TALK IDEAS ============== */}
      <section className="relative py-24 sm:py-32 bg-white">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8 grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-16 lg:gap-24 items-start">
          <div data-fade className="flex flex-col">
            <div className="w-12 h-40 bg-[#FFC107] mb-8" />
            <SplitText tag="h2" className="text-4xl sm:text-5xl font-light text-foreground tracking-wide">Let's Talk</SplitText>
            <SplitText tag="h1" className="text-6xl sm:text-7xl lg:text-8xl font-black text-foreground uppercase mt-2 tracking-tight">IDEAS</SplitText>
            <p className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] sm:tracking-[0.25em] uppercase mt-8 text-foreground/70 leading-relaxed max-w-[280px]">
              Kerala's Leading Web Design Agency For Business Growth
            </p>
          </div>
          
          <div data-fade className="flex flex-col justify-center pt-2 sm:pt-4">
            <SplitText tag="h2" className="text-3xl sm:text-4xl lg:text-[42px] font-light text-foreground mb-8 sm:mb-10 leading-[1.2]">
              Complete Web Solutions That<br className="hidden sm:block" /> Drive Results
            </SplitText>
            <div className="space-y-6 text-[15px] sm:text-base text-foreground/70 leading-[1.8]">
              <p>
                Your website is your strongest business asset, serving as your online presence, which is essential for success in today's digital market. Inter Smart builds high-performance websites through its design and development process, creating websites that attract visitors and keep them engaged until they convert. As a trusted website design & development company in Kochi, Kerala, we focus on building websites that support real business growth.
              </p>
              <p>
                We build search engine-friendly websites tailored to your business needs through our web design services, which combine strategic planning with UI/UX design and modern web development techniques.
              </p>
              <p>
                Beyond design and development, our web solutions deliver results through two main functions: generating high-quality leads, enhancing customer engagement, and supporting businesses during their online growth process. Our team develops websites that will scale with your company.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* ============== WHY CHOOSE US ============== */}
      <section className="relative py-32 sm:py-40">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-16">
            <p data-fade className="mb-4 text-xs uppercase tracking-[0.3em] text-muted-foreground">Why us · 04</p>
            <SplitText tag="h2" className="text-section max-w-3xl">
              The difference is in <span className="gradient-text">the details.</span>
            </SplitText>
          </div>
          <div className="grid gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <div
                key={f.title}
                data-fade
                className="group relative bg-card p-8 transition-colors hover:bg-muted"
              >
                <f.icon className="h-7 w-7 text-primary transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6" />
                <h3 className="text-display mt-8 text-xl">{f.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============== TESTIMONIALS ============== */}
      <TestimonialsSection />
      {/* ============== FAQ ============== */}
      <section className="py-28 border-t border-border bg-background">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 grid gap-12 md:grid-cols-[1fr_1.5fr]">
          <div>
            <p data-fade className="mb-4 text-xs uppercase tracking-[0.3em] text-muted-foreground">
              FAQ
            </p>
            <SplitText tag="h2" className="text-display text-4xl sm:text-5xl leading-[1.05]">
              The usual questions, answered.
            </SplitText>
          </div>
          <div data-fade className="w-full">
            <FaqPro 
              items={faqs.map((f, i) => ({ id: String(i), question: f.q, answer: f.a }))} 
              defaultOpenFirst 
              searchPlaceholder="Search questions..." 
            />
          </div>
        </div>
      </section>
    </>
  );
}

function CounterCard({ n, s, l }: { n: number; s: string; l: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useCounter(ref, n, s);
  return (
    <div data-fade className="rounded-3xl border border-border bg-card p-8">
      <p className="text-display text-5xl gradient-text">
        <span ref={ref}>0{s}</span>
      </p>
      <p className="mt-3 text-sm text-muted-foreground">{l}</p>
    </div>
  );
}

function HeroMedia() {
  const [isMobile, setIsMobile] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

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
            console.warn("Safari/Chrome blocked autoplay:", err);
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
        <img
          src={item.src}
          alt=""
          className="h-full w-full object-cover"
        />
      )}
    </div>
  );
}
