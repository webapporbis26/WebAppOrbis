import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Mail, Phone, MapPin, ArrowUpRight, Loader2, Headset, MessageSquare, Smartphone } from "lucide-react";
import { useTextReveal, useFadeUp } from "@/lib/anim";
import SplitText from "@/components/ui/SplitText";
import { leadsApi } from "@/lib/admin/api";
import contactIllustration from "@/assets/contact-illustration.png";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — WebApp Orbis" },
      { name: "description", content: "Tell us about your project. We'll reply within one business day." },
      { property: "og:title", content: "Contact — WebApp Orbis" },
      { property: "og:description", content: "Tell us about your project. We'll reply within one business day." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const heroRef = useRef<HTMLDivElement>(null);
  useTextReveal(heroRef, { delay: 0.2 });
  useFadeUp("[data-fade]");
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showWidget, setShowWidget] = useState(true);

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

  return (
    <>
      {/* ============== HERO SECTION (MOCKUP 3) ============== */}
      <section ref={heroRef} className="pt-28 pb-20 sm:pt-28 sm:pb-28 relative overflow-hidden bg-slate-50/10">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-[45vw] h-[45vw] rounded-full bg-primary/5 blur-[120px] -mr-12 -mt-12 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] rounded-full bg-accent/5 blur-[100px] -ml-12 -mb-12 pointer-events-none" />
        </div>

        <div className="mx-auto max-w-7xl px-5 sm:px-8 relative z-10 grid lg:grid-cols-[1.1fr_1fr] items-center gap-12 lg:gap-12">
          <div className="text-left space-y-8">
            <h1 className="text-5xl sm:text-7xl lg:text-[85px] leading-tight tracking-tight text-foreground flex flex-col items-start gap-4">
              <span className="bg-[#FDE047] px-6 py-2.5 font-light leading-none inline-block text-[#1A1A1A] reveal-block-1">
                Get in
              </span>
              <span className="bg-[#FDE047] px-8 py-3.5 font-black leading-none inline-block text-[65px] sm:text-[85px] lg:text-[105px] text-[#1A1A1A] reveal-block-2">
                Touch
              </span>
            </h1>
            <div className="pt-2 leading-[2.2]">
              <span className="bg-[#FDE047] px-3.5 py-2 text-xs sm:text-sm font-extrabold tracking-[0.12em] uppercase text-[#1A1A1A] box-decoration-clone reveal-block-3">
                Contact Inter Smart for the best Web designing & Digital Marketing services
              </span>
            </div>
          </div>

          <div className="relative flex justify-center items-center h-[480px] sm:h-[550px] lg:h-[600px] w-full" data-fade>
            {/* Background Blobs with organic slow drifting */}
            <div className="absolute top-[10%] right-[30%] w-[250px] h-[250px] rounded-full bg-[#E0F2FE] mix-blend-multiply filter blur-[80px] opacity-60 pointer-events-none animate-drift-slow" />
            <div className="absolute top-[20%] right-[5%] w-[300px] h-[300px] rounded-full bg-[#F3E8FF] mix-blend-multiply filter blur-[90px] opacity-70 pointer-events-none animate-drift-slower" />
            <div className="absolute bottom-0 right-[15%] w-[200px] h-[200px] rounded-full bg-[#FEF9C3] mix-blend-multiply filter blur-[70px] opacity-50 pointer-events-none animate-drift-slow" />

            {/* Floating Card 1 - Meet us over email (Top Right) */}
            <div className="absolute top-[5%] right-[5%] sm:right-[10%] animate-float-1">
              <div className="bg-white rounded-[24px] p-7 shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-gray-50 flex flex-col items-start gap-4 hover:-translate-y-2 hover:scale-[1.03] transition-all duration-300 w-44 hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)] cursor-pointer group">
                <div className="w-12 h-12 flex items-center justify-center">
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transformBox: "fill-box" }}>
                    <rect x="8" y="14" width="32" height="22" rx="4" stroke="#1A1A1A" strokeWidth="2.5" fill="white"/>
                    <path d="M8 16L24 27L40 16" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="11" cy="31" r="4.5" fill="#8B5CF6" stroke="white" strokeWidth="1.5" className="mail-dot origin-center transition-all" />
                  </svg>
                </div>
                <div className="text-left font-bold text-[#1A1A1A] leading-tight text-sm tracking-tight">
                  <span className="block text-gray-900">Meet us over</span>
                  <span className="block text-gray-500">email</span>
                </div>
              </div>
            </div>

            {/* Floating Card 2 - 24/7 support (Left Middle) */}
            <div className="absolute top-[28%] left-[5%] sm:left-[10%] animate-float-2">
              <div className="bg-white rounded-[24px] p-7 shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-gray-50 flex flex-col items-start gap-4 hover:-translate-y-2 hover:scale-[1.03] transition-all duration-300 w-44 hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)] cursor-pointer group">
                <div className="w-12 h-12 flex items-center justify-center">
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transformBox: "fill-box" }}>
                    <path d="M10 28C10 20.268 16.268 14 24 14C31.732 14 38 20.268 38 28" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round"/>
                    <rect x="6" y="24" width="6" height="10" rx="3" fill="#EC4899" stroke="#1A1A1A" strokeWidth="2.5" className="headset-earcup origin-center transition-all"/>
                    <rect x="36" y="24" width="6" height="10" rx="3" fill="#EC4899" stroke="#1A1A1A" strokeWidth="2.5" className="headset-earcup origin-center transition-all"/>
                    <path d="M36 31C36 35 32 37 28 37" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round"/>
                    <circle cx="28" cy="37" r="2" fill="#EC4899" />
                  </svg>
                </div>
                <div className="text-left font-bold text-[#1A1A1A] leading-tight text-sm tracking-tight">
                  <span className="block text-gray-900">24/7</span>
                  <span className="block text-gray-500">support</span>
                </div>
              </div>
            </div>

            {/* Floating Card 3 - Online chat support (Bottom Center/Right) */}
            <div className="absolute bottom-[8%] right-[12%] sm:right-[18%] animate-float-3">
              <div className="bg-white rounded-[24px] p-7 shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-gray-50 flex flex-col items-start gap-4 hover:-translate-y-2 hover:scale-[1.03] transition-all duration-300 w-44 hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)] cursor-pointer group">
                <div className="w-12 h-12 flex items-center justify-center">
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transformBox: "fill-box" }}>
                    <path d="M22 34H28L34 39V34H36C39.3137 34 42 31.3137 42 28C42 24.6863 39.3137 22 36 22" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round"/>
                    <rect x="8" y="12" width="26" height="20" rx="6" fill="white" stroke="#1A1A1A" strokeWidth="2.5"/>
                    <path d="M14 32V37L20 32H22" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <line x1="14" y1="19" x2="24" y2="19" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" className="chat-line-1 transition-all" />
                    <line x1="14" y1="25" x2="28" y2="25" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" className="chat-line-2 transition-all" />
                  </svg>
                </div>
                <div className="text-left font-bold text-[#1A1A1A] leading-tight text-sm tracking-tight">
                  <span className="block text-gray-900">Online chat</span>
                  <span className="block text-gray-500">support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============== START OF SOMETHING BEAUTIFUL (MOCKUP 1) ============== */}
      <section className="py-24 bg-white border-b border-border/50" data-fade>
        <div className="mx-auto max-w-7xl px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-12 items-center">
          {/* Left Column: Heading */}
          <div className="text-left">
            <h3 className="text-display text-4xl sm:text-5xl font-light text-foreground/80 tracking-tight leading-none">
              This Could Be
            </h3>
            <h3 className="text-display text-4xl sm:text-5xl font-light text-foreground/80 tracking-tight leading-none mt-2">
              The Start Of
            </h3>
            <h2 className="text-display text-5xl sm:text-6xl font-bold text-foreground tracking-tight leading-none mt-4">
              Something Beautiful
            </h2>
          </div>

          {/* Right Column: Contact Blocks */}
          <div className="space-y-12 text-left">
            {/* Sales Team */}
            <div className="border-b border-border/80 pb-8">
              <p className="text-[13px] font-bold tracking-[0.2em] text-[#EC4899] uppercase mb-4">
                Talk to our sales team today
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-lg sm:text-xl font-medium text-foreground tracking-tight">
                <a href="mailto:info@enempvtltd.com" className="hover:text-primary transition-colors">
                  info@enempvtltd.com
                </a>
                <a href="tel:+918714163018" className="hover:text-primary transition-colors">
                  +91 87141 63018
                </a>
              </div>
            </div>

            {/* HR Team */}
            <div>
              <p className="text-[13px] font-bold tracking-[0.2em] text-[#F59E0B] uppercase mb-4">
                Talk to our hr team today
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-lg sm:text-xl font-medium text-foreground tracking-tight">
                <a href="mailto:hr@enempvtltd.com" className="hover:text-primary transition-colors">
                  hr@enempvtltd.com
                </a>
                <a href="tel:+917736003018" className="hover:text-primary transition-colors">
                  +91 77360 03018
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============== DIGITAL INNOVATIONS SECTION ============== */}
      <section className="py-24 bg-white border-b border-border/30 overflow-hidden" data-fade>
        <div className="mx-auto max-w-7xl px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-12 items-center">
          
          {/* Left Column: Abstract shapes and team count */}
          <div className="relative py-12 flex flex-col items-center justify-center text-center max-w-sm mx-auto w-full">
            {/* Yellow semi-circle flat on left, rounded on right */}
            <div className="absolute left-6 top-[28%] w-8 h-16 rounded-r-full bg-[#FFD600] opacity-90 shadow-sm" />
            
            {/* Purple downward-pointing triangle on top right */}
            <div className="absolute right-12 top-[12%]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 20L2 4H22L12 20Z" fill="#8B5CF6" />
              </svg>
            </div>
            
            {/* Cyan vertical half-circle flat on right, rounded on left */}
            <div className="absolute bottom-4 left-[35%] w-8 h-16 rounded-l-full bg-[#00E5FF] opacity-90 shadow-sm" />
            
            {/* 100+ Text */}
            <span className="text-[100px] sm:text-[120px] font-light leading-none text-[#8B5CF6] tracking-tight relative pr-4 select-none">
              100+
            </span>
            
            {/* Subtext */}
            <p className="text-3xl sm:text-4xl font-light text-[#1A1A1A] tracking-tight leading-tight mt-6 max-w-[260px]">
              Vibrant Team Members
            </p>
          </div>

          {/* Right Column: Step Into The World Title and description */}
          <div className="text-left space-y-8 pt-4 lg:pt-0">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-foreground leading-[1.1] tracking-tight">
              Step Into The World <br />
              <span className="font-extrabold text-[#1A1A1A]">Of Digital Innovations</span>
            </h2>
            <p className="text-base text-gray-500 font-light leading-relaxed max-w-xl">
              At Inter Smart, we recognize and value the unique talents of our employees and work as a family to get things done. We are always in search of team players who possess a positive mindset and passion for work. Check out the current openings with us and apply them to fuel your passion for work.
            </p>
          </div>
        </div>
      </section>

      {/* ============== LET'S GET STARTED NOW ============== */}
      <section id="contact-form" className="relative py-20 sm:py-28 bg-[#f0f7ff] overflow-hidden">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-12 lg:gap-12 items-start">
            
            {/* Left Column */}
            <div className="flex flex-col text-left pt-2">
              <div className="flex items-center mb-12">
                <div className="flex items-center">
                  <span className="text-[55px] leading-none font-light text-[#222] mr-1 border border-[#222] px-2 rounded-sm shadow-sm bg-transparent">D</span>
                  <div className="flex flex-col text-[10px] leading-none font-extrabold text-[#222] mr-3 mt-1 space-y-[2px]">
                    <span>ESIGN</span>
                    <span>EVELOP</span>
                    <span>ELIVER</span>
                  </div>
                </div>
                <span className="text-[55px] leading-none font-bold text-primary mt-1 tracking-wide drop-shadow-sm">SMART</span>
              </div>
              
              <div className="space-y-4 pt-4">
                <a href="mailto:sales@intersmart.in" className="flex items-center gap-3.5 font-bold text-lg text-[#222] hover:text-primary transition-colors">
                  <Mail className="h-6 w-6 shrink-0 stroke-[2.5]" /> sales@intersmart.in
                </a>
                <a href="tel:+919645944322" className="flex items-center gap-3.5 font-bold text-lg text-[#222] hover:text-primary transition-colors">
                  <Smartphone className="h-6 w-6 shrink-0 stroke-[2.5]" /> +91 9645 944 322
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

      {/* ============== MAP SECTION ============== */}
      <section className="pb-28" data-fade>
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="relative rounded-[2rem] border border-border bg-card overflow-hidden shadow-elegant group h-[450px]">
            {/* Map Iframe with modern grayscale & dark mode logic */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3933.204368940869!2d76.52167467579717!3d9.646416078772097!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b07d5f34dbe4edf%3A0x9bcee04788f0616e!2sENEM!5e0!3m2!1sen!2sin!4v1719000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full grayscale opacity-75 dark:opacity-60 dark:invert-[0.9] dark:hue-rotate-180 group-hover:grayscale-0 group-hover:opacity-100 dark:group-hover:opacity-90 dark:group-hover:invert-0 dark:group-hover:hue-rotate-0 transition-all duration-700 ease-in-out"
            />
            
            {/* Floating Location Card */}
            <div className="absolute top-6 left-6 md:top-10 md:left-10 glass-strong p-6 sm:p-8 rounded-[1.5rem] max-w-sm border border-white/60 shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-all duration-500 group-hover:-translate-y-1">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 text-primary rounded-xl shrink-0 mt-0.5">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">ENEM Private Limited</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    Athirampuzha Panchayath, Mannanam, Kottayam, Kerala 686561
                  </p>
                  <a
                    href="https://maps.app.goo.gl/qmxmMZuaoGfePiiAA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors group/link"
                  >
                    Open in Google Maps
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============== FLOATING CHAT WIDGET ============== */}
      {showWidget && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-4 group select-none">
          {/* Speech Bubble Card */}
          <div className="bg-white border border-gray-100 shadow-xl rounded-2xl p-4 max-w-[260px] sm:max-w-xs text-left text-xs font-bold text-[#1A1A1A] relative animate-fade-in md:block hidden">
            <span>HI <span className="animate-wiggle inline-block">👋</span> Welcome to Inter Smart! How can we help you today?</span>
            {/* Close Button inside card */}
            <button 
              onClick={() => setShowWidget(false)}
              className="absolute -top-1.5 -right-1.5 h-4 w-4 bg-white border border-gray-200 shadow-sm rounded-full flex items-center justify-center text-gray-500 hover:text-gray-800 transition-colors text-[8px]"
              aria-label="Dismiss welcome message"
            >
              ✕
            </button>
          </div>

          {/* Yellow Circle Chat Button */}
          <div className="relative flex flex-col items-center">
            <a
              href="#contact-form"
              className="h-16 w-16 bg-[#FBBF24] rounded-full flex items-center justify-center shadow-lg hover:scale-105 hover:bg-yellow-400 transition-all duration-300 relative border-2 border-white animate-bounce-subtle"
            >
              {/* Chat Bubble Icon */}
              <svg className="w-7 h-7 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              
              {/* Notification Badge */}
              <span className="absolute top-1 right-1 h-5 w-5 bg-red-600 rounded-full text-white text-[10px] font-bold flex items-center justify-center border-2 border-white">
                1
              </span>
            </a>
          </div>
        </div>
      )}

      <style>{`
        @keyframes bounceSubtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-8deg); }
          75% { transform: rotate(8deg); }
        }
        .animate-bounce-subtle {
          animation: bounceSubtle 4s ease-in-out infinite;
        }
        .animate-wiggle {
          animation: wiggle 0.5s ease-in-out infinite alternate;
        }

        /* Speech bubble welcome card slide-in fade animation */
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(12px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        /* Hero Text Reveal curtain animations */
        @keyframes revealYellowBlock {
          0% {
            clip-path: inset(0 100% 0 0);
          }
          100% {
            clip-path: inset(0 0 0 0);
          }
        }
        .reveal-block-1 {
          animation: revealYellowBlock 0.8s cubic-bezier(0.76, 0, 0.24, 1) forwards;
        }
        .reveal-block-2 {
          animation: revealYellowBlock 0.8s cubic-bezier(0.76, 0, 0.24, 1) 0.15s forwards;
        }
        .reveal-block-3 {
          animation: revealYellowBlock 0.8s cubic-bezier(0.76, 0, 0.24, 1) 0.3s forwards;
        }

        /* Gentle Floating Info Card animations */
        @keyframes floatCard1 {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(0.8deg); }
        }
        @keyframes floatCard2 {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-18px) rotate(-1.2deg); }
        }
        @keyframes floatCard3 {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(0.6deg); }
        }
        .animate-float-1 {
          animation: floatCard1 6s ease-in-out infinite;
        }
        .animate-float-2 {
          animation: floatCard2 7s ease-in-out infinite;
        }
        .animate-float-3 {
          animation: floatCard3 8s ease-in-out infinite;
        }

        /* SVG Micro-animations */
        @keyframes pulseDot {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(1.4); opacity: 0.8; }
        }
        .group:hover .mail-dot {
          animation: pulseDot 0.8s ease-in-out infinite alternate;
        }

        @keyframes bounceEarcup {
          0% { transform: scale(1); }
          100% { transform: scale(1.15); }
        }
        .group:hover .headset-earcup {
          animation: bounceEarcup 0.5s ease-in-out infinite alternate;
        }

        .group:hover .chat-line-1 {
          transform: translateX(3px);
        }
        .group:hover .chat-line-2 {
          transform: translateX(5px);
        }

        /* Organic Background Blobs movement */
        @keyframes drift {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(20px, -20px) scale(1.08); }
          66% { transform: translate(-15px, 15px) scale(0.95); }
        }
        .animate-drift-slow {
          animation: drift 16s ease-in-out infinite;
        }
        .animate-drift-slower {
          animation: drift 22s ease-in-out infinite alternate;
        }
      `}</style>
    </>
  );
}
