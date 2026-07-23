import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, Globe, Smartphone, Database, Sparkles, Zap, Shield, Users, Star, Search, Compass, Rocket, MonitorSmartphone, SearchCheck, CodeXml, Headset, Share2, MessageCircle, PhoneCall, LayoutTemplate, Wrench, ChevronLeft, ChevronRight } from "lucide-react";
import { gsap, ScrollTrigger, RevealLine, useTextReveal, useFadeUp, useCounter, useSerenityText } from "@/lib/anim";
import SplitText from "@/components/ui/SplitText";
import { MagneticButton } from "@/components/MagneticButton";
import { FaqPro } from "@/components/ui/faq-pro";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import MultiOrbitSemiCircle from "@/components/ui/multi-orbit-semi-circle";
import { LogoCloud } from "@/components/ui/logo-cloud-3";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CheckCircle2 } from "lucide-react";

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




const deskHeroItems = [
  { type: "image", src: bestImg },
  { type: "image", src: candleImg },
  { type: "image", src: dhanaImg },
  { type: "image", src: eventImg },
  { type: "image", src: malluImg },
  { type: "image", src: resortImg },
];

const mobileHeroItems = [
  { type: "image", src: bestImg },
  { type: "image", src: candleImg },
  { type: "image", src: dhanaImg },
  { type: "image", src: eventImg },
  { type: "image", src: malluImg },
  { type: "image", src: resortImg },
];

const faqs = [
  { q: "How do engagements typically start?", a: "A 30-minute discovery call, followed by a fixed-fee discovery sprint to scope the work in detail." },
  { q: "Do you work with in-house teams?", a: "Yes — we frequently embed with internal product, design or engineering teams." },
  { q: "What about post-launch?", a: "Every project includes a 30-day warranty. Most clients continue on a monthly retainer." },
  { q: "Where are you based?", a: "A distributed team across London, Lisbon and Bengaluru — overlapping hours with EU and US clients." },
];

const featuresList = [
  { icon: MonitorSmartphone, title: "Mobile Friendly Web Designs", desc: "Flawless experience across all devices and screen sizes." },
  { icon: SearchCheck, title: "SEO-Optimized Websites", desc: "Built with best practices to rank higher on search engines." },
  { icon: CodeXml, title: "Lightweight and Fast Loading HTML Pages", desc: "Optimized code for blazing fast performance." },
  { icon: Headset, title: "Unconditional Free Lifetime Support", desc: "We're here to help you, anytime you need us." },
  { icon: Share2, title: "Social Media Page Creation and Integration", desc: "Seamlessly connect your website with social channels." },
  { icon: MessageCircle, title: "Direct Enquiry to Your WhatsApp", desc: "Get leads instantly delivered to your WhatsApp." },
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
  { icon: PhoneCall, title: "Project will be evaluated in detail" },
  { icon: LayoutTemplate, title: "Web Design preview & suggestions" },
  { icon: MonitorSmartphone, title: "Designing of web pages & html conversion" },
  { icon: Rocket, title: "Launch the website & final payment" },
  { icon: Wrench, title: "You will get a after service" },
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
      className="group block flex-none w-[85%] md:w-auto snap-center"
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
            preload="none"
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

  const featuresRef = useRef<HTMLDivElement>(null);
  const worksRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);

  const scrollContainer = (ref: React.RefObject<HTMLDivElement | null>, direction: "left" | "right") => {
    if (ref.current) {
      const scrollAmount = ref.current.clientWidth * 0.75;
      ref.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

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
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-6 text-black">
              Build Smarter Digital Experiences for Modern Businesses
            </h1>
            <div className="flex flex-wrap items-center gap-2">
              <MagneticButton
                as="a"
                href="/contact"
                className="group gap-2 rounded-[14px] px-7 py-4 text-base font-medium text-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.03] active:scale-95"
                {...({ style: { background: "var(--grad-primary)" } } as any)}
              >
                Start a project
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </MagneticButton>
              <MagneticButton
                as="a"
                href="/portfolio"
                className="group gap-2 rounded-[14px] border border-white/30 px-7 py-4 text-base font-medium text-white hover:bg-white hover:text-black transition-all duration-300 hover:scale-[1.03] active:scale-95"
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

      {/* ============== COMPREHENSIVE ABOUT US ============== */}
      <section className="relative py-6 sm:py-8 bg-muted/30">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="text-center max-w-3xl mx-auto mb-2">
            <SplitText tag="h2" className="text-display text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.1]">
              A studio built around <span className="gradient-text">craft, clarity and care.</span>
            </SplitText>
          </div>

          <Tabs defaultValue="story" className="w-full">
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 max-w-3xl mx-auto -mt-3 mb-4 h-auto rounded-full bg-background border border-border/50 p-1">
              <TabsTrigger value="story" className="rounded-full py-3 text-base font-medium">Our Story</TabsTrigger>
              <TabsTrigger value="services" className="rounded-full py-3 text-base font-medium">What We Do</TabsTrigger>
              <TabsTrigger value="approach" className="rounded-full py-3 text-base font-medium">Our Approach</TabsTrigger>
            </TabsList>

            <TabsContent value="story" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                <div className="space-y-8" data-fade>
                  <div>
                    <h3 className="text-3xl font-semibold mb-6 text-foreground flex items-center gap-4">
                      <span className="relative flex h-8 w-1.5 overflow-hidden rounded-full bg-primary/20"><span className="absolute inset-x-0 bottom-0 top-1/2 bg-primary"></span></span>
                      About Us
                    </h3>
                    <div className="space-y-4 text-[17px] text-foreground/75 leading-relaxed">
                      <p>
                        We are a professional digital solutions company specialising in website designing and development, mobile app development, and customised ERP software solutions. Our focus is on helping businesses establish a strong digital presence while improving operational efficiency through innovative technology solutions.
                      </p>
                      <p>
                        With a dedicated team of designers, developers, and technology experts, we create modern platforms that combine functionality, creativity, and performance. Our approach is centred around understanding business objectives and delivering solutions tailored to specific operational requirements.
                      </p>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6 pt-2">
                    <div className="relative overflow-hidden bg-white/60 backdrop-blur-xl p-7 rounded-[1.5rem] border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 transition-transform duration-300">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
                      <h4 className="text-[19px] font-semibold mb-3 text-foreground flex items-center gap-2">
                        <Compass className="w-5 h-5 text-primary" /> Our Vision
                      </h4>
                      <p className="text-foreground/70 text-sm leading-relaxed">To empower businesses with reliable digital technologies that improve customer engagement, simplify operations, and support long-term business growth.</p>
                    </div>
                    <div className="relative overflow-hidden bg-white/60 backdrop-blur-xl p-7 rounded-[1.5rem] border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 transition-transform duration-300">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
                      <h4 className="text-[19px] font-semibold mb-3 text-foreground flex items-center gap-2">
                        <Rocket className="w-5 h-5 text-primary" /> Our Mission
                      </h4>
                      <p className="text-foreground/70 text-sm leading-relaxed">To provide high-quality digital solutions through innovative design, advanced development practices, and customer-focused strategies. We aim to help businesses adapt to the evolving digital landscape with scalable and efficient technology services.</p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6" data-fade>
                  {[
                    { n: 100, s: "+", l: "Projects shipped" },
                    { n: 50, s: "+", l: "Happy clients" },
                    { n: 5, s: "+", l: "Years of experience" },
                    { n: 98, s: "%", l: "Client retention" },
                  ].map((c, i) => (
                    <CounterCard key={i} n={c.n} s={c.s} l={c.l} />
                  ))}
                  </div>
                </div>
            </TabsContent>

            <TabsContent value="services" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
              <Carousel opts={{ loop: true, breakpoints: { '(min-width: 768px)': { active: false } } }} className="w-full" data-fade>
              <CarouselContent className="-ml-5 md:ml-0 flex md:grid md:grid-cols-3 gap-8 md:gap-8 mb-4 md:mb-0">
                <CarouselItem className="pl-5 md:pl-0 basis-[85%] md:basis-auto">
                  <div className="group relative overflow-hidden bg-gradient-to-b from-white to-white/40 backdrop-blur-2xl p-10 rounded-[2.5rem] border border-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)] hover:border-primary/30 hover:-translate-y-2 transition-all duration-500 h-full">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none group-hover:bg-primary/20 transition-colors duration-500" />
                  <div className="h-16 w-16 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center mb-8 border border-primary/10 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500">
                    <Globe className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-5 text-foreground leading-tight">Website Designing &<br/>Development</h3>
                  <p className="text-foreground/70 text-[16px] leading-[1.8] relative z-10">
                    We create responsive and professionally designed websites that enhance brand visibility and improve user experience. Our websites are developed with modern technologies to ensure speed, security, and seamless functionality across all devices.
                  </p>
                  </div>
                </CarouselItem>
                <CarouselItem className="pl-5 md:pl-0 basis-[85%] md:basis-auto">
                  <div className="group relative overflow-hidden bg-gradient-to-b from-white to-white/40 backdrop-blur-2xl p-10 rounded-[2.5rem] border border-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)] hover:border-primary/30 hover:-translate-y-2 transition-all duration-500 h-full">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none group-hover:bg-primary/20 transition-colors duration-500" />
                  <div className="h-16 w-16 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center mb-8 border border-primary/10 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                    <Smartphone className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-5 text-foreground leading-tight">Mobile App<br/>Development</h3>
                  <p className="text-foreground/70 text-[16px] leading-[1.8] relative z-10">
                    Our mobile app development services help businesses connect with customers through intuitive and feature-rich applications. We develop customised Android and iOS applications focused on usability, performance, and long-term scalability.
                  </p>
                  </div>
                </CarouselItem>
                <CarouselItem className="pl-5 md:pl-0 basis-[85%] md:basis-auto">
                  <div className="group relative overflow-hidden bg-gradient-to-b from-white to-white/40 backdrop-blur-2xl p-10 rounded-[2.5rem] border border-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)] hover:border-primary/30 hover:-translate-y-2 transition-all duration-500 h-full">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none group-hover:bg-primary/20 transition-colors duration-500" />
                  <div className="h-16 w-16 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center mb-8 border border-primary/10 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500">
                    <Database className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-5 text-foreground leading-tight">ERP Software<br/>Solutions</h3>
                  <p className="text-foreground/70 text-[16px] leading-[1.8] relative z-10">
                    We develop customised ERP systems that streamline daily business operations and improve workflow management. Our ERP solutions help organisations manage multiple departments efficiently through integrated and automated systems.
                  </p>
                  </div>
                </CarouselItem>
              </CarouselContent>
            </Carousel>
            </TabsContent>

            <TabsContent value="approach" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-12 items-center" data-fade>
                <div className="order-2 lg:order-1 relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/0 rounded-[3rem] blur-2xl transition-all duration-500 group-hover:blur-3xl group-hover:opacity-70 opacity-50" />
                  <div className="relative bg-white/90 backdrop-blur-3xl p-10 sm:p-14 rounded-[3rem] border border-white shadow-[0_8px_40px_rgb(0,0,0,0.08)] overflow-hidden">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-3xl -mr-12 -mt-12 pointer-events-none" />
                    <h3 className="text-[28px] sm:text-[32px] font-bold mb-10 text-foreground tracking-tight">Why Businesses Trust Us</h3>
                    <ul className="space-y-6">
                      {[
                        "Experienced development and design team",
                        "Customised business-focused solutions",
                        "Modern and scalable technologies",
                        "SEO-friendly and responsive development",
                        "Reliable technical support and maintenance",
                        "Focus on quality, performance, and security"
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-5 text-[16px] sm:text-[17px] text-foreground/80 group/item hover:translate-x-2 transition-transform duration-300">
                          <div className="relative flex items-center justify-center shrink-0 mt-0.5">
                            <div className="absolute inset-0 bg-primary/20 rounded-full blur-md opacity-0 group-hover/item:opacity-100 transition-opacity duration-300" />
                            <CheckCircle2 className="h-6 w-6 text-primary relative z-10" />
                          </div>
                          <span className="font-medium group-hover/item:text-foreground transition-colors duration-300">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="order-1 lg:order-2 space-y-8 lg:pl-4">
                  <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold uppercase tracking-widest">
                    <Sparkles className="w-4 h-4" /> The Process
                  </div>
                  <h3 className="text-4xl sm:text-5xl font-bold text-foreground leading-[1.1] tracking-tight">Our Approach</h3>
                  <div className="space-y-6 text-[17px] sm:text-[18px] text-foreground/75 leading-relaxed">
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

      {/* ============== FEATURES STRIP ============== */}
      <section className="relative z-30 mt-6 sm:mt-8 mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-6 text-center" data-fade>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-foreground leading-tight">
            Love Our Design? Let's Create Your <span style={{ color: "var(--color-primary, #e11d48)" }}>Dream Website</span>.
          </h2>
          <p className="mt-2 text-blue-600 font-semibold text-base sm:text-lg">
            Talk to Web Design Experts today.
          </p>
        </div>
        <div className="relative group/features">
          {/* Left Scroll Button */}
          <button 
            onClick={() => scrollContainer(featuresRef, 'left')}
            className="absolute -left-3 top-1/2 -translate-y-1/2 z-40 bg-white/95 dark:bg-card/95 hover:bg-white dark:hover:bg-card border border-border/80 shadow-md rounded-full p-2 text-foreground transition-all duration-300 sm:hidden flex items-center justify-center cursor-pointer"
            aria-label="Scroll features left"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {/* Right Scroll Button */}
          <button 
            onClick={() => scrollContainer(featuresRef, 'right')}
            className="absolute -right-3 top-1/2 -translate-y-1/2 z-40 bg-white/95 dark:bg-card/95 hover:bg-white dark:hover:bg-card border border-border/80 shadow-md rounded-full p-2 text-foreground transition-all duration-300 sm:hidden flex items-center justify-center cursor-pointer"
            aria-label="Scroll features right"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          <Carousel opts={{ loop: true, breakpoints: { '(min-width: 640px)': { active: false } } }} className="w-full" data-fade>
            <CarouselContent className="py-4 px-4 sm:px-8 flex -ml-5 sm:ml-0 sm:flex-wrap justify-between items-start gap-6 bg-white/50 backdrop-blur-md rounded-2xl border border-border/30 shadow-sm pb-4 sm:pb-0" ref={featuresRef}>
            {featuresList.map((f, i) => (
              <CarouselItem key={i} className="pl-5 sm:pl-0 basis-auto">
                <div className="relative flex-none w-[50%] sm:w-1/3 lg:flex-1 flex flex-col items-center text-center px-2 group cursor-default snap-center">
                  <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-full flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform duration-300 mb-4 bg-blue-600/10">
                    <f.icon className="h-7 w-7 sm:h-8 sm:w-8 stroke-[1.5]" />
                  </div>
                  <h4 className="text-xs sm:text-sm font-semibold text-foreground/80 leading-snug max-w-[140px] transition-all duration-300 group-hover:-translate-y-1">
                    {f.title}
                  </h4>
                  
                  {/* Animated Tooltip */}
                  <div className="absolute top-[100%] left-1/2 -translate-x-1/2 mt-2 w-[160px] sm:w-[200px] bg-foreground text-background text-[11px] sm:text-xs p-3 rounded-xl shadow-xl opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none z-50">
                    <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 border-4 border-transparent border-b-foreground" />
                    {f.desc}
                  </div>
                </div>
              </CarouselItem>
            ))}
            </CarouselContent>
          </Carousel>
        </div>
      </section>

      {/* ============== DIGITAL SOLUTIONS ============== */}
      <section className="relative py-10 sm:py-14 bg-[#f5f7fa]">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="text-center mb-8 sm:mb-10" data-fade>
            <h2 className="text-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground leading-tight tracking-tight">
              <span className="font-light">Digital Solutions for your</span> <span className="font-bold">Business Growth</span>
            </h2>
          </div>

          <Carousel opts={{ loop: true, breakpoints: { '(min-width: 640px)': { active: false } } }} className="w-full">
            <CarouselContent className="flex -ml-5 sm:ml-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 pb-4 sm:pb-0">
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
                emoji: "📈",
                color: "#818CF8",
                title: "Digital Marketing",
                desc: "Boost your online presence and reach your target audience with data-driven marketing campaigns. We leverage social media, content marketing, and paid advertising to drive measurable growth and conversions.",
                link: "/services/digital-marketing",
              },
              {
                emoji: "🎯",
                color: "#FBBF24",
                title: "SEO Optimization",
                desc: "Improve your search engine rankings and drive organic traffic to your website. We implement advanced on-page and off-page SEO strategies to ensure your business stands out in search results.",
                link: "/services/seo",
              },
            ].map((card, i) => (
              <CarouselItem key={i} className="pl-5 sm:pl-0 basis-[85%] sm:basis-auto" data-fade>
                <div className="flex flex-col items-start bg-white p-5 sm:p-6 rounded-[14px] border border-border/40 shadow-[0_4px_20px_rgb(0,0,0,0.02)] hover:shadow-[0_12px_30px_rgb(0,0,0,0.05)] hover:border-primary/20 hover:-translate-y-1 transition-all duration-300 group h-full">
                  <div className="text-2xl sm:text-3xl mb-3">{card.emoji}</div>
                  <h4 className="text-base sm:text-lg font-bold text-foreground leading-snug mb-2">
                    {card.title}
                  </h4>
                  <div className="w-6 h-0.5 rounded-full mb-3" style={{ backgroundColor: card.color }} />
                  <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed mb-4 flex-1">
                    {card.desc}
                  </p>
                  <Link
                    to={card.link}
                    className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-[0.12em] text-foreground/60 hover:text-foreground transition-all duration-300 group/link hover:translate-x-0.5"
                  >
                    View more
                    <span className="text-sm transition-transform group-hover/link:translate-x-0.5">+</span>
                  </Link>
                </div>
              </CarouselItem>
            ))}
            </CarouselContent>
          </Carousel>
        </div>
      </section>

      {/* ============== OUR WORKS ============== */}
      <section ref={serenityRef} className="relative py-10 sm:py-14 bg-background">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <div className="text-center max-w-4xl mx-auto mb-12">
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

          <div className="relative group/works">
            {/* Left Scroll Button */}
            <button 
              onClick={() => scrollContainer(worksRef, 'left')}
              className="absolute -left-3 top-1/2 -translate-y-1/2 z-40 bg-white/95 dark:bg-card/95 hover:bg-white dark:hover:bg-card border border-border/80 shadow-md rounded-full p-2 text-foreground transition-all duration-300 md:hidden flex items-center justify-center cursor-pointer"
              aria-label="Scroll works left"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {/* Right Scroll Button */}
            <button 
              onClick={() => scrollContainer(worksRef, 'right')}
              className="absolute -right-3 top-1/2 -translate-y-1/2 z-40 bg-white/95 dark:bg-card/95 hover:bg-white dark:hover:bg-card border border-border/80 shadow-md rounded-full p-2 text-foreground transition-all duration-300 md:hidden flex items-center justify-center cursor-pointer"
              aria-label="Scroll works right"
            >
              <ChevronRight className="h-4 w-4" />
            </button>

            <div ref={worksRef} className="flex -mx-5 px-5 md:mx-0 md:px-0 md:grid md:grid-cols-3 gap-8 sm:gap-10 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory scrollbar-none pb-4 md:pb-0">
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
          <div className="text-center mb-12 sm:mb-12" data-fade>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-light text-foreground mb-6 leading-tight">
              Our <span className="text-[#DC2626] font-medium">Website Design Process</span>
            </h2>
            <p className="text-foreground/70 text-[15px] sm:text-lg max-w-3xl mx-auto">
              We offer free consultations to understand your business goals and create a tailored website design strategy.
            </p>
          </div>

          <div className="relative group/process">
            {/* Left Scroll Button */}
            <button 
              onClick={() => scrollContainer(processRef, 'left')}
              className="absolute -left-3 top-1/3 -translate-y-1/2 z-40 bg-white/95 dark:bg-card/95 hover:bg-white dark:hover:bg-card border border-border/80 shadow-md rounded-full p-2 text-foreground transition-all duration-300 md:hidden flex items-center justify-center cursor-pointer"
              aria-label="Scroll process left"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {/* Right Scroll Button */}
            <button 
              onClick={() => scrollContainer(processRef, 'right')}
              className="absolute -right-3 top-1/3 -translate-y-1/2 z-40 bg-white/95 dark:bg-card/95 hover:bg-white dark:hover:bg-card border border-border/80 shadow-md rounded-full p-2 text-foreground transition-all duration-300 md:hidden flex items-center justify-center cursor-pointer"
              aria-label="Scroll process right"
            >
              <ChevronRight className="h-4 w-4" />
            </button>

            <div ref={processRef} className="flex overflow-x-auto md:flex-nowrap md:justify-center gap-6 snap-x snap-mandatory scrollbar-none pb-4 -mx-5 px-5 md:mx-0 md:px-0">
              {processSteps.map((step, i) => (
                <div key={i} data-fade className="flex-none w-[45%] md:w-1/5 flex flex-col items-center text-center group cursor-default snap-center">
                  <div className="h-20 w-20 sm:h-28 sm:w-28 rounded-full flex items-center justify-center mb-6 sm:mb-8 transition-transform duration-500 group-hover:-translate-y-2">
                    <step.icon className="h-10 w-10 sm:h-14 sm:w-14 text-[#2DD4BF] transition-transform duration-500 group-hover:scale-110" strokeWidth={1.5} />
                  </div>
                  <h4 className="text-[14px] sm:text-[16px] text-foreground/80 font-medium leading-snug px-2 max-w-[200px]">
                    {step.title}
                  </h4>
                </div>
              ))}
            </div>
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

function CounterCard({ n, s, l }: { n: number; s: string; l: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useCounter(ref, n, s);
  return (
    <div data-fade className="rounded-[2rem] border border-white bg-white/70 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 sm:p-10 transition-transform duration-300 hover:-translate-y-1">
      <p className="text-display text-5xl sm:text-6xl text-[#0066FF] tracking-tight font-medium">
        <span ref={ref}>0{s}</span>
      </p>
      <p className="mt-4 text-[15px] font-medium text-foreground/60 tracking-wide">{l}</p>
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
        <img
          src={item.src}
          alt=""
          className="h-full w-full object-cover"
        />
      )}
    </div>
  );
}
