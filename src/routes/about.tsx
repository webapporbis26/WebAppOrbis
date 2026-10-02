import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { RevealLine, useTextReveal, useFadeUp, gsap, ScrollTrigger } from "@/lib/anim";
import SplitText from "@/components/ui/SplitText";
import { Users, User, Target, Rocket, Lightbulb, MonitorSmartphone, CodeXml, Mail, Smartphone, Loader2, Eye, MessageSquare, Phone, ArrowRight, ChevronDown, Folder, Trophy, TrendingUp } from "lucide-react";
import coffeeCup from "@/assets/coffee-cup.png";
import contactIllustration from "@/assets/contact-illustration.png";
import { leadsApi } from "@/lib/admin/api";
import aboutShowcase from "@/assets/about-showcase.png";
import contact3d from "@/assets/contact-3d.png";
import contactBg from "@/assets/contact-bg.png";



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
      <section className="relative py-20 sm:py-28 bg-white overflow-hidden pt-36">
        {/* Decorative dotted pattern */}
        <div className="absolute right-8 sm:right-16 top-36 opacity-40 pointer-events-none hidden md:block">
          <div className="grid grid-cols-5 gap-2">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-blue-300" />
            ))}
          </div>
        </div>

        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <div className="text-center mb-10 sm:mb-16" data-fade>
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="h-px w-10 sm:w-12 bg-blue-400" />
              <span className="text-[11px] sm:text-xs font-semibold tracking-[0.3em] text-blue-500 uppercase">About Us</span>
              <span className="h-px w-10 sm:w-12 bg-blue-400" />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight tracking-tight mb-4">
              Digital Ideas. <span className="text-blue-600">Powerful Solutions.</span>
            </h1>
            <p className="text-slate-500 text-[16px] sm:text-lg max-w-2xl mx-auto leading-relaxed">
              We create modern websites, mobile applications and digital solutions to help businesses grow and succeed online.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-stretch">
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
              <h3 className="text-3xl sm:text-4xl lg:text-[2.25rem] font-extrabold text-slate-900 leading-tight tracking-tight mb-5">
                Your Trusted Partner in <span className="text-blue-600">Digital Growth</span>
              </h3>
              <p className="text-slate-500 text-[15px] sm:text-base leading-relaxed mb-6">
                We are a professional digital solutions company specialising in website designing and development, mobile app development, and customised ERP software solutions. Our focus is on helping businesses establish a strong digital presence while improving operational efficiency through innovative technology solutions.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-6 py-3 rounded-full transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 mb-10"
              >
                Work With Us
                <ArrowRight className="h-4 w-4" />
              </Link>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
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





      {/* ============== LET'S GET STARTED NOW ============== */}
      <section className="relative py-12 sm:py-16 overflow-hidden"
        style={{ backgroundImage: `url(${contactBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>

        <div className="mx-auto max-w-[1280px] px-5 sm:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] gap-10 lg:gap-12 items-start">

            {/* Left Column */}
            <div data-fade className="pt-2">
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

              <div className="space-y-4">
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
            </div>

            {/* Right Column — Form Card */}
            <div data-fade>
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
                          className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-4 py-3.5 text-[14px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all resize-none" />
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
