import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { RevealLine, useTextReveal, useFadeUp, gsap, ScrollTrigger } from "@/lib/anim";
import SplitText from "@/components/ui/SplitText";
import { Users, User, Target, Rocket, Lightbulb, MonitorSmartphone, CodeXml, Mail, Smartphone, Loader2, Eye, MessageSquare, Phone, ArrowRight, ChevronDown } from "lucide-react";
import coffeeCup from "@/assets/coffee-cup.png";
import contactIllustration from "@/assets/contact-illustration.png";
import { leadsApi } from "@/lib/admin/api";
import { DigitalSolutions } from "@/components/DigitalSolutions";
import aboutHero from "@/assets/about-hero.png";
import visionBulb from "@/assets/vision-bulb.png";
import missionTarget from "@/assets/mission-target.png";
import contact3d from "@/assets/contact-3d.png";



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
      <section ref={heroRef} className="relative overflow-hidden bg-[#f0f2f5]">
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
          <div className="px-5 pt-28 pb-10">
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
      <section className="py-10 sm:py-14 bg-white">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8" data-fade>
            {/* Vision Card */}
            <div className="relative overflow-hidden rounded-[28px] p-8 sm:p-10"
                 style={{ background: "linear-gradient(135deg, #f0fdfa 0%, #e6f9f5 50%, #d9f5ef 100%)" }}>
              {/* Decorative circles */}
              <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-teal-200/30 pointer-events-none" />
              <div className="absolute right-24 top-10 w-8 h-8 rounded-full bg-teal-200/50 pointer-events-none" />
              <div className="absolute right-10 bottom-8 w-40 h-40 rounded-full border-[3px] border-teal-200/40 pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center gap-5 mb-7">
                  <div className="w-[72px] h-[72px] bg-white rounded-[20px] shadow-[0_8px_24px_rgba(45,212,191,0.18)] flex items-center justify-center shrink-0">
                    <Eye className="w-9 h-9 text-teal-500" strokeWidth={1.8} />
                  </div>
                  <div>
                    <h3 className="text-4xl sm:text-[42px] font-extrabold text-slate-900 tracking-tight">Vision</h3>
                    <div className="w-14 h-[3px] bg-teal-400 rounded-full mt-2" />
                  </div>
                </div>
                <div className="flex gap-6 items-end">
                  <p className="flex-1 text-[14px] sm:text-[15px] text-slate-600 leading-[1.85]">
                    From its very inception Inter Smart has been a growth-focused Web Development company with a vision to deliver real value to its customers everywhere. Our cross-functional, closely-knit team will continue to be united by our joined vision to help clients win big in their industry, be it by building high-converting websites or running successful...
                  </p>
                  <img src={visionBulb} alt="Vision" className="w-32 sm:w-40 shrink-0 -mb-4 -mr-2 select-none" />
                </div>
              </div>
            </div>

            {/* Mission Card */}
            <div className="relative overflow-hidden rounded-[28px] p-8 sm:p-10"
                 style={{ background: "linear-gradient(135deg, #faf5ff 0%, #f3e8ff 50%, #ede0fd 100%)" }}>
              {/* Decorative elements */}
              <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-purple-200/30 pointer-events-none" />
              <div className="absolute right-16 top-14 flex gap-1.5 pointer-events-none">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full bg-purple-300/60" style={{ opacity: 1 - (i % 4) * 0.22 }} />
                ))}
              </div>
              <div className="absolute right-10 bottom-8 w-40 h-40 rounded-full border-[3px] border-purple-200/40 pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center gap-5 mb-7">
                  <div className="w-[72px] h-[72px] bg-white rounded-[20px] shadow-[0_8px_24px_rgba(139,92,246,0.18)] flex items-center justify-center shrink-0">
                    <Target className="w-9 h-9 text-violet-600" strokeWidth={1.8} />
                  </div>
                  <div>
                    <h3 className="text-4xl sm:text-[42px] font-extrabold text-slate-900 tracking-tight">Mission</h3>
                    <div className="w-14 h-[3px] bg-violet-500 rounded-full mt-2" />
                  </div>
                </div>
                <div className="flex gap-6 items-end">
                  <p className="flex-1 text-[14px] sm:text-[15px] text-slate-600 leading-[1.85]">
                    We have always placed maximum emphasis on engineering new technologies in the digital landscape. Equipped with some of the most experienced and certified industry professionals, our mission is to break new ground and surpass our excellence day in, day out. While carrying out our mission, we will always place our clients at the heart...
                  </p>
                  <img src={missionTarget} alt="Mission" className="w-32 sm:w-40 shrink-0 -mb-4 -mr-2 select-none" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

            <DigitalSolutions />





      {/* ============== LET'S GET STARTED NOW ============== */}
      <section className="relative py-12 sm:py-16 bg-[#f8fbff] overflow-hidden">
        {/* Background decorations */}
        <div className="absolute -left-28 -bottom-28 w-96 h-96 rounded-full bg-blue-100/70 pointer-events-none" />
        <div className="absolute -right-24 -top-24 w-[420px] h-[420px] rounded-full bg-blue-100/60 pointer-events-none" />

        <div className="mx-auto max-w-[1280px] px-5 sm:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-8 items-start">

            {/* Left Column */}
            <div data-fade className="relative">
              <div className="flex items-center gap-3 mb-8">
                <img src="/logo.png" alt="WebApp Orbis" className="w-12 h-12 object-contain" />
                <div>
                  <p className="text-[26px] font-extrabold tracking-tight text-slate-900 leading-none">
                    WebApp <span className="text-blue-600">Orbis</span>
                  </p>
                  <p className="text-[9px] font-semibold tracking-[0.32em] text-slate-400 mt-1.5">IDEAS • WEBSITES • GROWTH</p>
                </div>
              </div>

              <h2 className="text-[44px] sm:text-[54px] font-extrabold text-slate-900 tracking-tight leading-[1.08] mb-5">
                Let's Build<br />
                <span className="text-blue-600">Something Great</span><br />
                <span className="relative inline-block">
                  Together
                  <svg className="absolute -bottom-1.5 left-0 w-full" viewBox="0 0 200 12" fill="none" preserveAspectRatio="none">
                    <path d="M2 9C60 3 140 3 198 8" stroke="#bfdbfe" strokeWidth="5" strokeLinecap="round" />
                  </svg>
                </span>
              </h2>
              <p className="text-slate-500 text-[15px] leading-[1.7] max-w-[420px] mb-8">
                Have a project in mind? We'd love to hear from you. Get in touch and let's turn your ideas into powerful web solutions.
              </p>

              <div className="space-y-4 mb-6">
                <a href="mailto:info@webapporbis.com" className="flex items-center gap-4 group w-fit">
                  <span className="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center shrink-0 group-hover:bg-blue-200 transition-colors">
                    <Mail className="w-[18px] h-[18px] text-blue-600" />
                  </span>
                  <span>
                    <span className="block text-[12px] text-slate-500">Email Us</span>
                    <span className="block text-[15px] font-bold text-slate-900 group-hover:text-blue-600 transition-colors">info@webapporbis.com</span>
                  </span>
                </a>
                <a href="tel:+917736003018" className="flex items-center gap-4 group w-fit">
                  <span className="w-11 h-11 rounded-full bg-green-100 flex items-center justify-center shrink-0 group-hover:bg-green-200 transition-colors">
                    <Phone className="w-[18px] h-[18px] text-green-600" />
                  </span>
                  <span>
                    <span className="block text-[12px] text-slate-500">Call Us</span>
                    <span className="block text-[15px] font-bold text-slate-900 group-hover:text-blue-600 transition-colors">+91 7736 003 018</span>
                  </span>
                </a>
              </div>

              {/* Illustration - positioned like Figma: wide, extending toward center */}
              <div className="relative mt-6 -mr-24 sm:-mr-32 lg:-mr-40">
                {/* Blue blob platform */}
                <div className="absolute left-[5%] right-[5%] bottom-0 top-[30%] bg-gradient-to-b from-blue-100/90 to-blue-50/60 rounded-[48px] pointer-events-none" />
                {/* Dotted decoration */}
                <div className="absolute left-[8%] top-[15%] grid grid-cols-5 gap-2 opacity-50 pointer-events-none">
                  {Array.from({ length: 15 }).map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-blue-300" />
                  ))}
                </div>
                {/* Curved arrow */}
                <svg className="absolute right-[12%] top-0 w-14 h-14 text-blue-400 pointer-events-none" viewBox="0 0 64 64" fill="none">
                  <path d="M10 50C22 32 38 22 54 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="5 5" />
                  <path d="M46 10L54 14L50 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <img src={contact3d} alt="Get in touch" className="relative w-full h-auto select-none" />
              </div>
            </div>

            {/* Right Column — Form Card */}
            <div data-fade className="lg:pt-4">
              <div className="bg-white rounded-[24px] shadow-[0_24px_70px_rgba(37,99,235,0.12)] p-7 sm:p-10 relative overflow-hidden">
                <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-blue-50 pointer-events-none" />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[11px] font-bold tracking-[0.28em] text-blue-600 uppercase">Get in Touch</span>
                    <span className="h-[2px] w-14 bg-blue-200 rounded-full" />
                  </div>
                  <h3 className="text-[32px] sm:text-[40px] font-extrabold text-slate-900 tracking-tight leading-tight mb-2">
                    Let's Get <span className="text-blue-600">Started Now!</span>
                  </h3>
                  <p className="text-slate-500 text-[13.5px] mb-7">
                    Fill out the form below and our team will get back to you shortly.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[12.5px] font-bold text-slate-800 mb-1.5">Name*</label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-[17px] h-[17px] text-slate-400" />
                          <input type="text" name="name" required placeholder="Your full name"
                            className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-4 py-3.5 text-[14px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[12.5px] font-bold text-slate-800 mb-1.5">Phone*</label>
                        <div className="relative flex items-center bg-white border border-slate-200 rounded-xl focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all overflow-hidden">
                          <span className="flex items-center gap-1 pl-4 pr-2 py-3.5 text-[15px] select-none shrink-0">
                            🇮🇳
                            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                          </span>
                          <span className="w-px h-6 bg-slate-200 shrink-0" />
                          <Phone className="w-[16px] h-[16px] text-slate-400 ml-3 shrink-0" />
                          <input type="tel" name="phone" required placeholder="Your phone number"
                            className="w-full py-3.5 pl-2 pr-4 text-[14px] text-slate-900 placeholder:text-slate-400 focus:outline-none bg-transparent" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[12.5px] font-bold text-slate-800 mb-1.5">Email*</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-[17px] h-[17px] text-slate-400" />
                        <input type="email" name="email" required placeholder="Your email address"
                          className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-4 py-3.5 text-[14px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[12.5px] font-bold text-slate-800 mb-1.5">How can we help you?</label>
                      <div className="relative">
                        <MessageSquare className="absolute left-4 top-3.5 w-[17px] h-[17px] text-slate-400" />
                        <textarea name="message" required rows={4} placeholder="Tell us about your project..."
                          className="w-full bg-slate-50/70 border border-slate-200/80 rounded-[18px] pl-11 pr-4 py-3 text-[13.5px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all resize-none" />
                      </div>
                    </div>

                    <button type="submit" disabled={sent || submitting}
                      className="w-full bg-gradient-to-r from-[#2f7bff] to-[#1f5eff] hover:from-[#1f5eff] hover:to-[#1748d6] text-white font-bold text-[13px] tracking-[0.22em] uppercase py-[15px] rounded-full shadow-[0_12px_32px_rgba(47,123,255,0.35)] hover:shadow-[0_16px_40px_rgba(47,123,255,0.45)] transition-all flex items-center justify-center gap-3 disabled:opacity-70 cursor-pointer">
                      {sent ? "Message Sent!" : submitting ? "Sending..." : "Submit"}
                      {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
                    </button>
                  </form>
                </div>
              </div>
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
