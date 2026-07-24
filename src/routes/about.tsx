import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { RevealLine, useTextReveal, useFadeUp, gsap, ScrollTrigger } from "@/lib/anim";
import SplitText from "@/components/ui/SplitText";
import { Users, Target, Rocket, Lightbulb, MonitorSmartphone, CodeXml, Mail, Smartphone, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import about from "@/assets/about-team.jpg";
import coffeeCup from "@/assets/coffee-cup.png";
import contactIllustration from "@/assets/contact-illustration.png";
import { leadsApi } from "@/lib/admin/api";



const VisionIcon = (props: any) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M16 24V16H24M40 16H48V24M48 40V48H40M24 48H16V40" stroke="#222" strokeWidth="2.5" strokeLinecap="square"/>
    <circle cx="32" cy="32" r="10" fill="#00D2D3" stroke="#222" strokeWidth="2.5"/>
  </svg>
);

const MissionIcon = (props: any) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="28" cy="36" r="12" fill="#EAE0FE" stroke="#222" strokeWidth="2.5"/>
    <circle cx="28" cy="36" r="4" fill="#fff" stroke="#222" strokeWidth="2.5"/>
    <path d="M48 16L34 30M48 16H36M48 16V28" stroke="#222" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);



export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — WebApp Orbis" },
      { name: "description", content: "A senior studio of designers and engineers crafting digital products with intent." },
      { property: "og:title", content: "About — WebApp Orbis" },
      { property: "og:description", content: "A senior studio of designers and engineers crafting digital products with intent." },
    ],
  }),
  component: About,
});

function About() {
  const heroRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showMorePhilosophy, setShowMorePhilosophy] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);

  const scrollContainer = (ref: React.RefObject<HTMLDivElement | null>, direction: "left" | "right") => {
    if (ref.current) {
      const scrollAmount = ref.current.clientWidth * 0.75;
      ref.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const formData = new FormData(e.currentTarget);
      const leadData = {
        company: formData.get("company")?.toString() || "",
        contact: formData.get("name")?.toString() || "",
        email: formData.get("email")?.toString() || "",
        phone: formData.get("phone")?.toString() || "",
        service: formData.get("service")?.toString() || "Website Inquiry",
        source: formData.get("source")?.toString() || "Website",
        budget: formData.get("budget")?.toString() || "",
        notes: formData.get("message")?.toString() || "",
        status: "New"
      };

      await leadsApi.addOrUpdate(leadData);
      setSent(true);
    } catch (error) {
      console.error("Failed to submit lead", error);
      alert("Something went wrong. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  useTextReveal(heroRef, { delay: 0.2 });
  useFadeUp("[data-fade]");



  useEffect(() => {
    const el = imgRef.current;
    if (!el) return;
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top bottom",
      end: "bottom top",
      scrub: 1.4,
      onUpdate: (s) => gsap.set(el, { yPercent: -20 + s.progress * 40, scale: 1.15 }),
    });
    return () => st.kill();
  }, []);

  return (
    <>
      <section ref={heroRef} className="pt-28 pb-10 sm:pt-28 sm:pb-14 relative overflow-hidden" style={{ background: "#f0f2f5" }}>
        <div className="mx-auto max-w-7xl px-5 sm:px-8 relative z-10 grid lg:grid-cols-2 items-center gap-12 lg:gap-8 min-h-[400px]">
          {/* LEFT — text */}
          <div className="text-left" data-fade>
            <p className="text-4xl sm:text-5xl font-light tracking-wide text-[#222] uppercase mb-2">OUR</p>
            <h1 className="text-6xl sm:text-8xl lg:text-[110px] font-black tracking-tight leading-none text-[#111] uppercase mb-8">STORY</h1>
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.3em] text-[#555] max-w-xs leading-relaxed">
              We are truly grateful to you for choosing us as your partner and giving us the opportunity to grow
            </p>
          </div>

          {/* RIGHT — floating stat cards */}
          <div data-fade className="relative flex items-center justify-center h-[380px] sm:h-[420px]">

            {/* Decorative shapes */}
            <div style={{ position:"absolute", top:"10%", left:"8%", width:36, height:36, borderRadius:"50%", background:"#7c5cbf", opacity:0.85 }} />
            <div style={{ position:"absolute", bottom:"14%", right:"6%", width:0, height:0, borderLeft:"14px solid transparent", borderRight:"14px solid transparent", borderTop:"24px solid #2dd4bf", opacity:0.8 }} />
            <div style={{ position:"absolute", top:"55%", left:"3%", width:26, height:26, background:"#f5c842", borderRadius:3 }} />

            {/* Card: 1.5k+ Happy Clients — top right */}
            <div style={{
              position:"absolute", top:"0%", right:"4%",
              background:"#fff", borderRadius:20,
              padding:"20px 28px", minWidth:170,
              boxShadow:"0 12px 40px rgba(0,0,0,0.10)",
            }}>
              <p style={{ fontSize:40, fontWeight:800, color:"#2dd4bf", lineHeight:1, fontFamily:"Space Grotesk,sans-serif" }}>
                50<span style={{ fontSize:28 }}>+</span>
              </p>
              <p style={{ fontSize:11, fontWeight:700, letterSpacing:"0.15em", color:"#888", marginTop:6, textTransform:"uppercase" }}>Happy Clients</p>
            </div>

            {/* Card: 5+ Years of Experience — center, purple */}
            <div style={{
              position:"absolute", top:"20%", left:"18%",
              background:"#7c5cbf", borderRadius:20,
              padding:"28px 32px", minWidth:160,
              boxShadow:"0 12px 40px rgba(124,92,191,0.35)",
              zIndex:10,
            }}>
              <p style={{ fontSize:64, fontWeight:900, color:"#fff", lineHeight:1, fontFamily:"Space Grotesk,sans-serif" }}>5+</p>
              <div style={{ width:32, height:3, background:"rgba(255,255,255,0.5)", margin:"8px 0", borderRadius:4 }} />
            </div>

            {/* Card: Years of Experience — yellow, overlapping */}
            <div style={{
              position:"absolute", top:"40%", left:"42%",
              background:"#f5c842", borderRadius:20,
              padding:"22px 28px", minWidth:160,
              boxShadow:"0 12px 40px rgba(245,200,66,0.30)",
              zIndex:8,
            }}>
              <p style={{ fontSize:15, fontWeight:800, color:"#222", textTransform:"uppercase", letterSpacing:"0.05em", lineHeight:1.3 }}>Years of<br/>Experience</p>
            </div>

            {/* Card: 2.1k+ Successful Projects — bottom left */}
            <div style={{
              position:"absolute", bottom:"2%", left:"10%",
              background:"#fff", borderRadius:20,
              padding:"20px 28px", minWidth:170,
              boxShadow:"0 12px 40px rgba(0,0,0,0.10)",
              zIndex:9,
            }}>
              <p style={{ fontSize:38, fontWeight:800, color:"#7c5cbf", lineHeight:1, fontFamily:"Space Grotesk,sans-serif" }}>
                100<span style={{ fontSize:26 }}>+</span>
              </p>
              <p style={{ fontSize:11, fontWeight:700, letterSpacing:"0.15em", color:"#888", marginTop:6, textTransform:"uppercase" }}>Successful<br/>Projects</p>
            </div>

            {/* Teal half-circle accent */}
            <div style={{
              position:"absolute", bottom:"18%", right:"14%",
              width:50, height:25,
              background:"#2dd4bf",
              borderRadius:"0 0 50px 50px",
              opacity:0.8,
            }} />
          </div>
        </div>
      </section>

      {/* ============== OUR PHILOSOPHY ============== */}
      <section className="relative py-10 sm:py-14 bg-white">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8 grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 lg:gap-12 items-start">
          <div data-fade className="flex flex-col h-full">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&h=450&q=80" 
              alt="Our Philosophy" 
              className="w-full rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)] object-cover mb-8 aspect-[4/3]"
            />
            <div className="sticky top-32">
              <SplitText tag="h2" className="text-5xl sm:text-6xl font-light text-foreground tracking-wide">Our Vision &</SplitText>
              <SplitText tag="h1" className="text-7xl sm:text-[90px] font-black text-foreground uppercase mt-2 tracking-tighter leading-none">PHILOSOPHY</SplitText>
              <p className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] sm:tracking-[0.25em] uppercase mt-10 text-foreground/70 leading-relaxed max-w-[280px]">
                WEBAPP ORBIS - BUILDING DIGITAL FUTURES
              </p>
            </div>
          </div>
          
          <div data-fade className="flex flex-col justify-center pt-8 sm:pt-12">
            <SplitText tag="h2" className="text-3xl sm:text-4xl lg:text-[46px] font-light text-foreground mb-10 sm:mb-12 leading-[1.25]">
              Transforming Ideas Into <br className="hidden lg:block" /> Digital Realities
            </SplitText>
            <div className="space-y-8 text-[14px] sm:text-[15px] text-foreground/70 leading-[1.8] text-justify md:text-left">
              <p>
                At WebApp Orbis, our philosophy centers on the belief that every digital product we create should be a perfect blend of form and function. We don't just write code; we architect solutions that empower businesses to scale, innovate, and thrive in an increasingly digital world.
              </p>
              {showMorePhilosophy && (
                <>
                  <p>
                    We understand that your technology infrastructure is the backbone of your modern enterprise. That's why our approach is deeply collaborative. We embed ourselves within your teams, ensuring that our strategies align perfectly with your long-term business objectives and operational realities.
                  </p>
                  <p>
                    From intuitive user interfaces to robust backend architectures, our commitment to excellence remains unwavering. We leverage cutting-edge technologies to deliver experiences that not only captivate your audience but also drive measurable results and sustainable growth for your brand.
                  </p>
                </>
              )}
              <button 
                onClick={() => setShowMorePhilosophy(!showMorePhilosophy)} 
                className="mt-2 text-xs font-bold uppercase tracking-wider text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1 cursor-pointer select-none"
              >
                {showMorePhilosophy ? "Read Less ↑" : "Read More ↓"}
              </button>
            </div>
          </div>
        </div>
      </section>


      {/* ============== MISSION & VISION ============== */}
      <section className="py-10 sm:py-14 bg-[#f4f6f8]">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8 text-center mb-12 sm:mb-12">
          <SplitText tag="h2" className="text-3xl sm:text-5xl font-light text-[#222] mb-2 tracking-wide">Our Works Define Our</SplitText>
          <SplitText tag="h2" className="text-4xl sm:text-6xl font-bold text-[#111] tracking-tight mb-6">Success Look Through Some</SplitText>
          <p className="text-[#555] text-[15px] sm:text-[17px]">Excellent customer service is our foundation</p>
        </div>

        <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12" data-fade>
            {/* Vision Card */}
            <div className="bg-white p-10 sm:p-14 flex flex-col md:flex-row gap-8 items-start">
              <div className="w-16 h-16 shrink-0 mt-1">
                 <VisionIcon className="w-full h-full" />
              </div>
              <div>
                <h3 className="text-3xl sm:text-[40px] font-light text-[#111] mb-6">Vision</h3>
                <p className="text-[14px] sm:text-[15px] text-[#555] leading-[1.8]">
                  From its very inception Inter Smart has been a growth-focused Web Development company with a vision to deliver real value to its customers everywhere. Our cross-functional, closely-knit team will continue to be united by our joined vision to help clients win big in their industry, be it by building high-converting websites or running successful...
                </p>
              </div>
            </div>

            {/* Mission Card */}
            <div className="bg-white p-10 sm:p-14 flex flex-col md:flex-row gap-8 items-start">
              <div className="w-16 h-16 shrink-0 mt-1">
                 <MissionIcon className="w-full h-full" />
              </div>
              <div>
                <h3 className="text-3xl sm:text-[40px] font-light text-[#111] mb-6">Mission</h3>
                <p className="text-[14px] sm:text-[15px] text-[#555] leading-[1.8]">
                  We have always placed maximum emphasis on engineering new technologies in the digital landscape. Equipped with some of the most experienced and certified industry professionals, our mission is to break new ground and surpass our excellence day in, day out. While carrying out our mission, we will always place our clients at the heart...
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-14 bg-[#fafafa]">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1.2fr] items-start">
          <div className="relative overflow-hidden rounded-2xl aspect-[4/5] shadow-2xl">
            <img
              ref={imgRef}
              src={about}
              alt="Our team"
              loading="lazy"
              className="h-full w-full object-cover will-change-transform"
            />
          </div>
          <div className="space-y-12 pt-10 text-left">
            <div>
              <p data-fade className="text-sm uppercase tracking-[0.3em] text-gray-400 font-medium mb-6">Who we are</p>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-[#1a1a1a] leading-[1.1]">Driving digital <br/><span className="font-bold">transformation.</span></h2>
            </div>
            <div className="space-y-8">
              <p data-fade className="text-xl sm:text-2xl text-gray-600 leading-relaxed font-light">
                We are a professional digital solutions company specialising in website designing and development, 
                mobile app development, and customised ERP software solutions. Our focus is on helping businesses 
                establish a strong digital presence while improving operational efficiency through innovative 
                technology solutions. 
              </p>
              <p data-fade className="text-lg text-gray-500 leading-relaxed">
                With a dedicated team of designers, developers, and technology experts, we create modern platforms 
                that combine functionality, creativity, and performance. Our approach is centred around understanding 
                business objectives and delivering solutions tailored to specific operational requirements.
              </p>
            </div>
          </div>
        </div>
      </section>



      <section className="py-10 sm:py-14 bg-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-12 text-left">
            <p data-fade className="mb-6 text-sm uppercase tracking-[0.3em] text-gray-400 font-medium">What We Do</p>
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-light tracking-tight text-[#1a1a1a]">
              Our Core <span className="font-bold">Services.</span>
            </h2>
          </div>
          <div className="relative group/services">
            {/* Left Scroll Button */}
            <button 
              onClick={() => scrollContainer(servicesRef, 'left')}
              className="absolute -left-3 top-1/2 -translate-y-1/2 z-40 bg-white/95 dark:bg-card/95 hover:bg-white dark:hover:bg-card border border-border/80 shadow-md rounded-full p-2 text-foreground transition-all duration-300 sm:hidden flex items-center justify-center cursor-pointer"
              aria-label="Scroll services left"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {/* Right Scroll Button */}
            <button 
              onClick={() => scrollContainer(servicesRef, 'right')}
              className="absolute -right-3 top-1/2 -translate-y-1/2 z-40 bg-white/95 dark:bg-card/95 hover:bg-white dark:hover:bg-card border border-border/80 shadow-md rounded-full p-2 text-foreground transition-all duration-300 sm:hidden flex items-center justify-center cursor-pointer"
              aria-label="Scroll services right"
            >
              <ChevronRight className="h-4 w-4" />
            </button>

            <div ref={servicesRef} className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 text-left overflow-x-auto sm:overflow-x-visible snap-x snap-mandatory scrollbar-none pb-4 sm:pb-0 -mx-5 px-5 sm:mx-0 sm:px-0">
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
                <div key={i} data-fade className="flex-none w-[85%] sm:w-auto snap-center flex flex-col items-start group">
                  <div className="text-5xl mb-8">{card.emoji}</div>
                  <h4 className="text-display text-xl sm:text-2xl font-bold text-[#1a1a1a] leading-tight mb-3">
                    {card.title}
                  </h4>
                  <div className="w-8 h-1 rounded-full mb-6" style={{ backgroundColor: card.color }} />
                  <p className="text-[15px] text-gray-600 leading-relaxed mb-5 flex-1">
                    {card.desc}
                  </p>
                  <Link
                    to={card.link}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.15em] text-gray-500 hover:text-[#1a1a1a] transition-colors group/link"
                  >
                    View more
                    <span className="text-sm transition-transform group-hover/link:translate-x-0.5">+</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-14 bg-[#fafafa]">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-12">
            <div className="space-y-10 text-left">
              <p data-fade className="text-sm uppercase tracking-[0.3em] text-gray-400 font-medium">Our Approach</p>
              <h2 className="text-4xl sm:text-5xl font-light tracking-tight text-[#1a1a1a] leading-tight">Tailored strategies for <br/><span className="font-bold">unique goals.</span></h2>
              <div className="w-12 h-1 bg-[#1a1a1a]" />
              <div className="space-y-6">
                <p data-fade className="text-xl text-gray-600 leading-relaxed font-light">
                  We believe every business requires unique digital solutions. Our team works closely with clients to 
                  understand their goals, industry requirements, and operational challenges before creating customised 
                  strategies and technology platforms.
                </p>
                <p data-fade className="text-lg text-gray-500 leading-relaxed">
                  From planning and design to development and deployment, we maintain a transparent and 
                  collaborative process to ensure high-quality project delivery.
                </p>
              </div>
            </div>
            
            <div className="space-y-10 text-left" data-fade>
              <p className="text-sm uppercase tracking-[0.3em] text-gray-400 font-medium">Why Businesses Trust Us</p>
              <ul className="space-y-8">
                {[
                  "Experienced development and design team",
                  "Customised business-focused solutions",
                  "Modern and scalable technologies",
                  "SEO-friendly and responsive development",
                  "Reliable technical support and maintenance",
                  "Focus on quality, performance, and security"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-6 border-b border-gray-200 pb-8 last:border-0 last:pb-0">
                    <span className="text-gray-300 font-mono text-xl">0{i+1}</span>
                    <span className="text-xl sm:text-2xl font-medium text-[#1a1a1a] tracking-tight">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============== LET'S GET STARTED NOW ============== */}
      <section className="relative py-10 sm:py-14 bg-[#f0f7ff] overflow-hidden">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-12 lg:gap-12 items-start">
            
            {/* Left Column */}
            <div className="flex flex-col text-left pt-2">
              <div className="flex items-center gap-4 mb-12">
                <img src="/logo.png" alt="WebApp Orbis Logo" className="w-16 h-16 object-contain" />
                <span className="text-4xl md:text-5xl font-black tracking-tighter text-primary drop-shadow-sm">
                  WebApp Orbis
                </span>
              </div>
              
              <div className="space-y-4 pt-4">
                <a href="mailto:info@webapporbis.com" className="flex items-center gap-3.5 font-bold text-lg text-[#222] hover:text-primary transition-colors">
                  <Mail className="h-6 w-6 shrink-0 stroke-[2.5]" /> info@webapporbis.com
                </a>
                <a href="tel:+917736003018" className="flex items-center gap-3.5 font-bold text-lg text-[#222] hover:text-primary transition-colors">
                  <Smartphone className="h-6 w-6 shrink-0 stroke-[2.5]" /> +91 7736 003 018
                </a>
              </div>

              <div className="mt-12 animate-float drop-shadow-xl hidden sm:block w-full max-w-[320px]">
                <img src={contactIllustration} alt="Contact Illustration" className="w-full h-auto object-contain rounded-3xl mix-blend-multiply opacity-90" />
              </div>
            </div>

            {/* Right Column */}
            <div className="text-left relative z-10 flex flex-col justify-center">
              <h2 className="text-3xl sm:text-[40px] font-bold text-primary mb-10 tracking-tight drop-shadow-sm">LET'S GET STARTED NOW!</h2>
              
              <form onSubmit={handleSubmit} className="space-y-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                  <div className="relative">
                    <input type="text" name="name" required placeholder="NAME*" className="w-full bg-transparent border-b border-[#222]/50 text-[#222] placeholder:text-[#222]/80 text-[12px] font-medium tracking-wide py-2 focus:outline-none transition-colors focus:border-primary" />
                  </div>
                  <div className="relative flex items-center border-b border-[#222]/50 focus-within:border-primary transition-colors">
                    <span className="text-[14px] mr-2 text-[#222] select-none cursor-pointer">🇮🇳 ⌄</span>
                    <input type="tel" name="phone" required placeholder="PHONE*" className="w-full bg-transparent text-[#222] placeholder:text-[#222]/80 text-[12px] font-medium tracking-wide py-2 focus:outline-none" />
                  </div>
                </div>

                <div className="relative">
                  <input type="email" name="email" required placeholder="EMAIL*" className="w-full bg-transparent border-b border-[#222]/50 text-[#222] placeholder:text-[#222]/80 text-[12px] font-medium tracking-wide py-2 focus:outline-none transition-colors focus:border-primary" />
                </div>

                <div className="relative">
                  <input type="text" name="message" required placeholder="HOW CAN WE HELP YOU?" className="w-full bg-transparent border-b border-[#222]/50 text-[#222] placeholder:text-[#222]/80 text-[12px] font-medium tracking-wide py-2 focus:outline-none transition-colors focus:border-primary" />
                </div>

                <button type="submit" disabled={sent || submitting} className="bg-primary text-white text-[13px] font-bold px-10 py-3.5 hover:bg-primary/90 transition-colors mt-6 shadow-sm flex items-center justify-center gap-2 select-none uppercase tracking-widest">
                  {sent ? "Message Sent!" : submitting ? "Sending..." : "SUBMIT"}
                  {submitting && <Loader2 className="h-3 w-3 animate-spin" />}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

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
              className="bg-white text-blue-600 hover:bg-blue-50 font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 inline-flex items-center gap-2 text-sm sm:text-base animate-pulse-slow"
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
