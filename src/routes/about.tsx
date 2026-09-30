import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { RevealLine, useTextReveal, useFadeUp, gsap, ScrollTrigger } from "@/lib/anim";
import SplitText from "@/components/ui/SplitText";
import { Users, Target, Rocket, Lightbulb, MonitorSmartphone, CodeXml, Mail, Smartphone, Loader2 } from "lucide-react";
import coffeeCup from "@/assets/coffee-cup.png";
import contactIllustration from "@/assets/contact-illustration.png";
import { leadsApi } from "@/lib/admin/api";
import { DigitalSolutions } from "@/components/DigitalSolutions";
import aboutHero from "@/assets/about-hero.png";



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
  
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showMorePhilosophy, setShowMorePhilosophy] = useState(false);

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



  return (
    <>
      <section ref={heroRef} className="relative overflow-hidden pt-24 sm:pt-28 bg-[#f0f2f5]">
        {/* Desktop: fixed aspect ratio matching Figma composition */}
        <div className="relative hidden lg:block w-full" style={{ aspectRatio: "1680 / 936" }}>
          <img
            src={aboutHero}
            alt="WebApp Orbis team collaborating"
            className="absolute inset-0 w-full h-full"
          />
          {/* LEFT — text */}
          <div className="absolute left-[4%] top-[26%] max-w-[30%]" data-fade>
            <p className="text-[48px] font-light tracking-wide text-[#222] uppercase mb-1">OUR</p>
            <h1 className="text-[104px] font-black tracking-tight leading-none text-[#111] uppercase mb-7">STORY</h1>
            <p className="text-[13px] font-semibold uppercase tracking-[0.28em] text-[#555] max-w-[300px] leading-[2]">
              We are truly grateful to you for choosing us as your partner and giving us the opportunity to grow
            </p>
          </div>

          {/* Card: 5+ — purple */}
          <div data-fade className="absolute bg-[#7c5cbf] rounded-[22px] shadow-[0_16px_45px_rgba(124,92,191,0.35)] flex flex-col items-center justify-center"
               style={{ left: "33.5%", top: "18%", width: "9.5%", height: "16.5%" }}>
            <p className="text-[56px] font-black text-white leading-none">5+</p>
            <div className="w-9 h-[3px] bg-white/60 mt-2 rounded-sm" />
          </div>

          {/* Card: YEARS OF EXPERIENCE — yellow */}
          <div data-fade className="absolute bg-[#f5c842] rounded-[22px] shadow-[0_16px_45px_rgba(245,200,66,0.30)] flex items-center justify-center"
               style={{ left: "42.5%", top: "26%", width: "9.5%", height: "10%" }}>
            <p className="text-[15px] font-extrabold text-[#222] uppercase tracking-wider leading-snug text-center">Years of<br/>Experience</p>
          </div>

          {/* Card: 50+ HAPPY CLIENTS — white */}
          <div data-fade className="absolute bg-white rounded-[22px] shadow-[0_16px_45px_rgba(0,0,0,0.10)] flex flex-col items-center justify-center"
               style={{ left: "76%", top: "14%", width: "14%", height: "14%" }}>
            <p className="text-[54px] font-extrabold text-[#2dd4bf] leading-none">50+</p>
            <p className="text-[12px] font-bold tracking-[0.18em] text-[#888] mt-2 uppercase">Happy Clients</p>
          </div>

          {/* Card: 100+ SUCCESSFUL PROJECTS — white */}
          <div data-fade className="absolute bg-white rounded-[22px] shadow-[0_16px_45px_rgba(0,0,0,0.10)] flex flex-col items-center justify-center"
               style={{ left: "30.5%", top: "46%", width: "10%", height: "14%" }}>
            <p className="text-[44px] font-extrabold text-[#7c5cbf] leading-none">100+</p>
            <p className="text-[11px] font-bold tracking-[0.14em] text-[#888] mt-2 uppercase text-center leading-relaxed">Successful<br/>Projects</p>
          </div>
        </div>

        {/* Mobile/tablet: image top, text + stat grid below */}
        <div className="lg:hidden">
          <div className="relative w-full" style={{ aspectRatio: "1680 / 936" }}>
            <img
              src={aboutHero}
              alt="WebApp Orbis team collaborating"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="px-5 py-10">
            <p className="text-4xl font-light tracking-wide text-[#222] uppercase mb-2">OUR</p>
            <h1 className="text-6xl sm:text-7xl font-black tracking-tight leading-none text-[#111] uppercase mb-6">STORY</h1>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#555] leading-relaxed mb-8 max-w-sm">
              We are truly grateful to you for choosing us as your partner and giving us the opportunity to grow
            </p>
            <div className="grid grid-cols-2 gap-3 max-w-md">
              <div className="bg-[#7c5cbf] rounded-2xl p-4 shadow-lg">
                <p className="text-3xl font-black text-white leading-none">5+</p>
                <p className="text-[10px] font-bold tracking-[0.12em] text-white/80 mt-1 uppercase">Years of Experience</p>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-lg">
                <p className="text-3xl font-extrabold text-[#2dd4bf] leading-none">50+</p>
                <p className="text-[10px] font-bold tracking-[0.12em] text-[#888] mt-1 uppercase">Happy Clients</p>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-lg col-span-2">
                <p className="text-3xl font-extrabold text-[#7c5cbf] leading-none">100+</p>
                <p className="text-[10px] font-bold tracking-[0.12em] text-[#888] mt-1 uppercase">Successful Projects</p>
              </div>
            </div>
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
              className="w-full rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)] object-cover aspect-[4/3] sticky top-32"
            />
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

            <DigitalSolutions />





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
