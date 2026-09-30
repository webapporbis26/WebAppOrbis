import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, Globe, Smartphone, Database, Sparkles, Zap, Shield, Users, Star, Search, Compass, Rocket, MonitorSmartphone, SearchCheck, CodeXml, Headset, Share2, MessageCircle, PhoneCall, LayoutTemplate, Wrench, ChevronLeft, ChevronRight, Laptop, Megaphone, TrendingUp, Check, ArrowRight } from "lucide-react";
import { gsap, ScrollTrigger, RevealLine, useTextReveal, useFadeUp, useCounter, useSerenityText } from "@/lib/anim";
import SplitText from "@/components/ui/SplitText";
import { MagneticButton } from "@/components/MagneticButton";
import { FaqPro } from "@/components/ui/faq-pro";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import MultiOrbitSemiCircle from "@/components/ui/multi-orbit-semi-circle";
import { LogoCloud } from "@/components/ui/logo-cloud-3";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
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
import projectsShowcase from "@/assets/projects-showcase.png";

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

const testimonials = [
  { quote: "WebApp Orbis rebuilt our platform end-to-end and our conversion jumped 38% in the first month.", name: "Maya Chen", role: "Head of Product · Northwind" },
  { quote: "The most polished design and engineering team we've worked with. Period.", name: "Daniel Park", role: "CEO · Atlas Logistics" },
  { quote: "They turned a 2-year ERP roadmap into a 4-month rollout. Effortless to work with.", name: "Sara Iqbal", role: "COO · Helios Retail" },
  { quote: "From discovery to launch every artifact felt premium. Our brand finally has a home.", name: "Tom Reyes", role: "Founder · Pebble" },
];

interface ProjectItem {
  img: string;
  title: string;
  link: string;
}

function ProjectCard({ c }: { c: ProjectItem }) {
  return (
    <a 
      href={c.link} 
      target="_blank" 
      rel="noopener noreferrer" 
      data-fade 
      className="group block flex-none w-[85%] md:w-auto snap-center"
    >
      <div className="relative w-full aspect-video overflow-hidden bg-muted">
        <img
          src={c.img}
          alt={c.title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-all duration-700 group-hover:scale-105 z-10"
        />
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
  const [showMoreAbout, setShowMoreAbout] = useState(false);

  useTextReveal(heroRef, { stagger: 0.14, delay: 0.4 });
  useSerenityText(serenityRef);
  useFadeUp("[data-fade]");

  const worksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (worksRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = worksRef.current;
        if (scrollWidth > clientWidth + 10) {
          if (scrollLeft + clientWidth >= scrollWidth - 10) {
            worksRef.current.scrollTo({ left: 0, behavior: "smooth" });
          } else {
            worksRef.current.scrollBy({ left: clientWidth * 0.85, behavior: "smooth" });
          }
        }
      }
    }, 3500);
    return () => clearInterval(interval);
  }, []);

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
                      {[
                        "We are a professional digital solutions company specialising in website designing and development, mobile app development, and customised ERP software solutions. Our focus is on helping businesses establish a strong digital presence while improving operational efficiency through innovative technology solutions.",
                        "With a dedicated team of designers, developers, and technology experts, we create modern platforms that combine functionality, creativity, and performance. Our approach is centred around understanding business objectives and delivering solutions tailored to specific operational requirements.",
                        "Our expertise extends across multiple domains, ensuring that we deliver robust and scalable solutions for startups, SMBs, and large enterprises. We take pride in our agile development methodology which guarantees timely delivery without compromising on quality.",
                        "In an ever-evolving digital landscape, staying ahead of the curve is paramount. We continuously invest in research and development to bring you the latest technological advancements, ensuring your business remains competitive and future-proof.",
                        "Customer satisfaction is at the core of everything we do. We believe in building long-lasting partnerships with our clients by offering unparalleled support, transparent communication, and a commitment to excellence.",
                        "From initial concept and strategy to deployment and ongoing maintenance, our comprehensive suite of services covers every aspect of your digital journey. We are here to transform your ideas into successful digital realities.",
                        "Let us help you navigate the complexities of the digital world. Together, we can build a strong foundation for your business and achieve remarkable growth in today's dynamic market."
                      ].slice(0, showMoreAbout ? undefined : 2).map((text, i) => (
                        <p key={i}>{text}</p>
                      ))}
                      <button 
                        onClick={() => setShowMoreAbout(!showMoreAbout)} 
                        className="mt-2 text-xs font-bold uppercase tracking-wider text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1 cursor-pointer select-none"
                      >
                        {showMoreAbout ? "Read Less ↑" : "Read More ↓"}
                      </button>
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
                  {/* Completed projects showcase */}
                  <Link to="/portfolio" className="col-span-2 group relative overflow-hidden rounded-[1.5rem] border border-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_16px_40px_rgb(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1 block">
                    <img
                      src={projectsShowcase}
                      alt="Our completed projects - Denahalaya, Chandy's, BestChoice, Dream Weaver, Mallu's Mart"
                      className="w-full h-64 sm:h-72 object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-4 right-4 h-10 w-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-900 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                      <ArrowUpRight className="h-5 w-5" />
                    </div>
                  </Link>
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

      {/* ============== DIGITAL SOLUTIONS ============== */}
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

        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="text-center mb-8 sm:mb-10" data-fade>
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="h-px w-10 sm:w-12 bg-blue-400" />
              <span className="text-[11px] sm:text-xs font-semibold tracking-[0.3em] text-blue-500 uppercase">Our Services</span>
              <span className="h-px w-10 sm:w-12 bg-blue-400" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-900 leading-tight tracking-tight mb-4">
              Digital Solutions for <span className="text-blue-600">Your Business</span>
            </h2>
            <p className="text-slate-500 text-[15px] sm:text-lg max-w-3xl mx-auto leading-relaxed">
              From websites to mobile apps and digital marketing, we provide complete digital solutions to help your business grow online.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" data-fade>
            {[
              {
                icon: Laptop,
                color: "text-blue-500", bg: "bg-blue-50", num: "text-blue-200",
                accent: "bg-blue-500", check: "bg-blue-500",
                title: "Website Designing & Development",
                desc: "We create responsive and professionally designed websites that enhance brand visibility and improve user experience.",
                bullets: ["Responsive & Modern Design", "Fast Loading & SEO Ready", "Secure & Scalable Solutions"],
                link: "/services/web-development",
                btnText: "text-blue-600", btnBorder: "border-blue-500", btnArrow: "bg-blue-500",
              },
              {
                icon: Smartphone,
                color: "text-rose-500", bg: "bg-rose-50", num: "text-rose-200",
                accent: "bg-rose-500", check: "bg-rose-500",
                title: "Mobile App Development",
                desc: "Our mobile app development services help businesses connect with customers through intuitive and feature-rich applications.",
                bullets: ["Android & iOS App Development", "User-Friendly & Feature Rich", "Scalable & High Performance"],
                link: "/services/mobile-development",
                btnText: "text-rose-600", btnBorder: "border-rose-500", btnArrow: "bg-rose-500",
              },
              {
                icon: Megaphone,
                color: "text-emerald-500", bg: "bg-emerald-50", num: "text-emerald-200",
                accent: "bg-emerald-500", check: "bg-emerald-500",
                title: "Digital Marketing",
                desc: "Boost your online presence and reach your target audience with data-driven digital marketing campaigns.",
                bullets: ["Social Media Marketing", "Content Creation & Strategy", "Google Ads & Paid Campaigns"],
                link: "/services/digital-marketing",
                btnText: "text-emerald-600", btnBorder: "border-emerald-500", btnArrow: "bg-emerald-500",
              },
              {
                icon: TrendingUp,
                color: "text-orange-400", bg: "bg-orange-50", num: "text-orange-200",
                accent: "bg-orange-400", check: "bg-orange-400",
                title: "SEO Optimization",
                desc: "Improve your search engine rankings and drive organic traffic to your website with advanced SEO strategies.",
                bullets: ["On-Page & Off-Page SEO", "Keyword Research & Strategy", "Improved Search Rankings"],
                link: "/services/seo",
                btnText: "text-orange-500", btnBorder: "border-orange-400", btnArrow: "bg-orange-400",
              },
            ].map((card, i) => (
              <div key={i} className="relative bg-white rounded-3xl p-6 sm:p-7 shadow-[0_4px_24px_rgb(0,0,0,0.04)] hover:shadow-[0_12px_36px_rgb(0,0,0,0.08)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col overflow-hidden">
                {/* Number watermark */}
                <span className={`absolute top-5 right-6 text-2xl font-bold ${card.num} select-none`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                {/* Decorative blob */}
                <div className={`absolute -top-8 -right-8 w-28 h-28 rounded-full ${card.bg} opacity-60 pointer-events-none`} />

                <div className={`relative h-14 w-14 rounded-2xl ${card.bg} flex items-center justify-center mb-5`}>
                  <card.icon className={`h-7 w-7 ${card.color}`} strokeWidth={1.75} />
                </div>

                <h4 className="text-lg font-bold text-slate-900 leading-snug mb-2 pr-8">
                  {card.title}
                </h4>
                <div className={`w-8 h-[3px] rounded-full ${card.accent} mb-4`} />

                <p className="text-sm text-slate-500 leading-relaxed mb-5">
                  {card.desc}
                </p>

                <ul className="space-y-2.5 mb-6">
                  {card.bullets.map((b, j) => (
                    <li key={j} className="flex items-center gap-2.5 text-[13px] text-slate-600">
                      <span className={`h-5 w-5 rounded-full ${card.check} flex items-center justify-center flex-shrink-0`}>
                        <Check className="h-3 w-3 text-white" strokeWidth={3} />
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>

                <Link
                  to={card.link}
                  className={`mt-auto inline-flex items-center justify-between pl-5 pr-1.5 py-1.5 rounded-full border ${card.btnBorder} ${card.btnText} font-semibold text-sm hover:shadow-md transition-all duration-300 group/btn`}
                >
                  View More
                  <span className={`h-8 w-8 rounded-full ${card.btnArrow} flex items-center justify-center text-white ml-3 group-hover/btn:translate-x-0.5 transition-transform`}>
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </div>
            ))}
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
            Love Our Design?<br />
            Let's Create Your <span className="text-blue-600">Dream Website.</span>
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
                { type: "image" as const, src: "", img: eventImg, title: "Dreamweaver Events", link: "https://dreamweaverevents.co.in" },
                { type: "image" as const, src: "", img: candleImg, title: "Nazareth Candles", link: "https://nazarethcandles.com" },
                { type: "image" as const, src: "", img: resortImg, title: "Chandys Hotels & Resorts", link: "https://chandyshotelsandresorts.com" },
                { type: "image" as const, src: "", img: malluImg, title: "Mallusmart", link: "https://mallusmart.com" },
                { type: "image" as const, src: "", img: dhanaImg, title: "Denahalaya Punnapra", link: "https://denahalayapunnapra.com" },
                { type: "image" as const, src: "", img: bestImg, title: "Best Choice Qatar", link: "https://bestchoiceqatar.net" },
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
          <div className="text-center mb-10 sm:mb-12" data-fade>
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="h-px w-12 sm:w-16 bg-blue-300" />
              <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-blue-500 uppercase">Our Process</span>
              <span className="h-px w-12 sm:w-16 bg-blue-300" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold tracking-tight text-slate-900 leading-tight mb-4">
              Our <span className="text-blue-600">Website Design Process</span>
            </h2>
            <p className="text-slate-500 text-[15px] sm:text-lg max-w-3xl mx-auto">
              We offer free consultations to understand your business goals and create a tailored website design strategy.
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
