import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Mail, Phone, MapPin, Globe, Facebook, Instagram, Linkedin, Twitter, Github, Send, Loader2, MessageSquare } from "lucide-react";
import { useTextReveal, useFadeUp } from "@/lib/anim";
import SplitText from "@/components/ui/SplitText";
import { leadsApi } from "@/lib/admin/api";

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const formData = new FormData(e.currentTarget);
      const leadData = {
        company: "",
        contact: formData.get("name")?.toString() || "",
        email: formData.get("email")?.toString() || "",
        phone: formData.get("phone")?.toString() || "",
        service: formData.get("subject")?.toString() || "General Inquiry",
        source: "Website Contact Form",
        budget: "",
        notes: formData.get("message")?.toString() || "",
        status: "New"
      };

      await leadsApi.addOrUpdate(leadData);
      setSent(true);
      
      // WhatsApp redirection
      const whatsappText = encodeURIComponent(
        `*New Website Lead*\n\n*Name:* ${leadData.contact}\n*Email:* ${leadData.email}\n*Phone:* ${leadData.phone}\n*Subject:* ${leadData.service}\n*Message:* ${leadData.notes}`
      );
      window.open(`https://wa.me/917736003018?text=${whatsappText}`, "_blank");
    } catch (error) {
      console.error("Failed to submit lead", error);
      alert("Something went wrong. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-50/50 pt-28 pb-10 sm:pb-14">
      {/* Decorative Background Patterns */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Top-Right Blue Flow */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-blue-500/10 blur-[120px]" />
        {/* Left-Middle Blue Flow */}
        <div className="absolute top-1/3 -left-40 w-[500px] h-[500px] rounded-full bg-blue-400/5 blur-[100px]" />
        
        {/* Dots Grid Pattern Left */}
        <div className="absolute top-36 left-12 opacity-25 hidden lg:block">
          <div className="grid grid-cols-5 gap-3">
            {Array.from({ length: 25 }).map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-blue-600/60" />
            ))}
          </div>
        </div>
        
        {/* Dots Grid Pattern Right */}
        <div className="absolute top-80 right-16 opacity-25 hidden lg:block">
          <div className="grid grid-cols-5 gap-3">
            {Array.from({ length: 25 }).map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-blue-600/60" />
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8 relative z-10">
        
        {/* ============== HERO HEADER ============== */}
        <div ref={heroRef} className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-5 py-1.5 mb-5 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Contact Us</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-bold text-slate-900 leading-tight tracking-tight mb-4">
            Get in <span className="text-blue-600">Touch</span>
          </h1>

          {/* Subtitle */}
          <p className="text-slate-500 text-[15px] sm:text-base leading-relaxed max-w-xl mx-auto mb-6">
            Have a project in mind? We'd love to hear from you. Fill out the form below or reach us directly.
          </p>

          {/* Underline Indicator */}
          <div className="flex items-center justify-center gap-1.5">
            <div className="w-20 h-1 rounded-full bg-blue-600" />
            <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
          </div>
        </div>

        {/* ============== TWO COLUMN CONTENT ============== */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-stretch mb-10 sm:mb-14">
          
          {/* LEFT: Let's Connect Card */}
          <div data-fade className="lg:col-span-5 bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2rem] p-8 sm:p-10 flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex items-center gap-4 border-b border-slate-50 pb-6 mb-8">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shadow-sm shrink-0">
                  <MessageSquare className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Let's Connect</h3>
                  <div className="w-8 h-[2px] bg-blue-600/40 mt-1" />
                </div>
              </div>

              {/* Contact Details List */}
              <div className="space-y-6">
                {/* Office */}
                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-blue-50/50 flex items-center justify-center text-blue-600 shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    <MapPin className="w-4 h-4 stroke-[2.2]" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Office</span>
                    <span className="text-[14px] font-semibold text-slate-700 leading-relaxed">
                      Athirampuzha Panchayath, Mannanam, Kottayam, Kerala 686561
                    </span>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-blue-50/50 flex items-center justify-center text-blue-600 shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    <Phone className="w-4 h-4 stroke-[2.2]" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Phone</span>
                    <a href="tel:+917736003018" className="text-[14px] font-semibold text-slate-700 hover:text-blue-600 transition-colors">
                      +91 7736 003 018
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-blue-50/50 flex items-center justify-center text-blue-600 shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    <Mail className="w-4 h-4 stroke-[2.2]" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Email</span>
                    <a href="mailto:info@webapporbis.com" className="text-[14px] font-semibold text-slate-700 hover:text-blue-600 transition-colors">
                      info@webapporbis.com
                    </a>
                  </div>
                </div>

                {/* Website */}
                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-blue-50/50 flex items-center justify-center text-blue-600 shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    <Globe className="w-4 h-4 stroke-[2.2]" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Website</span>
                    <a href="https://www.webapporbis.com" target="_blank" rel="noopener noreferrer" className="text-[14px] font-semibold text-slate-700 hover:text-blue-600 transition-colors">
                      www.webapporbis.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="border-t border-slate-50 pt-8 mt-10">
              <span className="block text-center text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Follow Us</span>
              <div className="flex justify-center items-center gap-4">
                {[
                  { icon: Facebook, href: "https://facebook.com" },
                  { icon: Instagram, href: "https://instagram.com" },
                  { icon: Linkedin, href: "https://linkedin.com" },
                  { icon: Twitter, href: "https://twitter.com" },
                  { icon: Github, href: "https://github.com" },
                ].map((social, idx) => (
                  <a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-slate-100 hover:border-blue-600/20 hover:bg-blue-50 text-slate-400 hover:text-blue-600 flex items-center justify-center transition-all duration-300 shadow-sm"
                  >
                    <social.icon className="w-4 h-4 stroke-[2]" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Send us a Message Card */}
          <div data-fade className="lg:col-span-7 bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-[2rem] p-8 sm:p-10 flex flex-col justify-between">
            {/* Header */}
            <div className="flex items-center gap-4 border-b border-slate-50 pb-6 mb-8">
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shadow-sm shrink-0">
                <Send className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Send us a Message</h3>
                <div className="w-8 h-[2px] bg-blue-600/40 mt-1" />
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Your Name"
                    className="w-full bg-slate-50/50 border border-slate-100 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
                  />
                </div>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Your Email"
                    className="w-full bg-slate-50/50 border border-slate-100 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
                  />
                </div>
              </div>

              <div className="relative">
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="Phone Number"
                  className="w-full bg-slate-50/50 border border-slate-100 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
                />
              </div>

              <div className="relative">
                <input
                  type="text"
                  name="subject"
                  required
                  placeholder="Subject"
                  className="w-full bg-slate-50/50 border border-slate-100 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
                />
              </div>

              <div className="relative">
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder="Your Message"
                  className="w-full bg-slate-50/50 border border-slate-100 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={sent || submitting}
                className="w-full bg-blue-600 text-white rounded-xl py-3.5 px-6 font-bold text-sm flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/10 uppercase tracking-wider cursor-pointer"
              >
                {sent ? (
                  "Message Sent!"
                ) : submitting ? (
                  <>
                    <span>Sending...</span>
                    <Loader2 className="w-4 h-4 animate-spin" />
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* ============== MAP SECTION ============== */}
        <div data-fade className="relative rounded-[2rem] border border-slate-100 bg-white overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.02)] h-[400px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3933.204368940869!2d76.52167467579717!3d9.646416078772097!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b07d5f34dbe4edf%3A0x9bcee04788f0616e!2sENEM!5e0!3m2!1sen!2sin!4v1719000000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 w-full h-full grayscale opacity-80 hover:grayscale-0 transition-all duration-700 ease-in-out"
          />
          
          {/* Floating Location Marker Indicator */}
          <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur px-5 py-3.5 rounded-2xl shadow-lg border border-slate-100 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white shrink-0 shadow-md shadow-blue-600/20">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <span className="block text-xs font-bold text-slate-800">ENEM Private Limited</span>
              <span className="block text-[10px] font-medium text-slate-400">Mannanam, Kottayam, Kerala</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
