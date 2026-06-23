import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { RevealLine, useTextReveal, useFadeUp, gsap, ScrollTrigger } from "@/lib/anim";
import about from "@/assets/about-team.jpg";

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
  const imgRef = useRef<HTMLImageElement>(null);
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
      <section ref={heroRef} className="pt-32 pb-20 sm:pt-40 sm:pb-32 relative overflow-hidden" style={{ background: "#f0f2f5" }}>
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
                1.5<span style={{ fontSize:28 }}>k+</span>
              </p>
              <p style={{ fontSize:11, fontWeight:700, letterSpacing:"0.15em", color:"#888", marginTop:6, textTransform:"uppercase" }}>Happy Clients</p>
            </div>

            {/* Card: 14+ Years of Experience — center, purple */}
            <div style={{
              position:"absolute", top:"20%", left:"18%",
              background:"#7c5cbf", borderRadius:20,
              padding:"28px 32px", minWidth:160,
              boxShadow:"0 12px 40px rgba(124,92,191,0.35)",
              zIndex:10,
            }}>
              <p style={{ fontSize:64, fontWeight:900, color:"#fff", lineHeight:1, fontFamily:"Space Grotesk,sans-serif" }}>14</p>
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
                2.1<span style={{ fontSize:26 }}>k+</span>
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

      <section className="py-24 sm:py-32 bg-[#fafafa]">
        <div className="mx-auto grid max-w-7xl gap-20 px-5 sm:px-8 lg:grid-cols-[1fr_1.2fr] items-start">
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

      <section className="py-32 sm:py-48 bg-[#1a1a1a] text-white selection:bg-white selection:text-black">
        <div className="mx-auto grid max-w-7xl gap-20 px-5 sm:px-8 md:grid-cols-2 text-left">
          {[
            { t: "Our Vision", d: "Our vision is to empower businesses with reliable digital technologies that improve customer engagement, simplify operations, and support long-term business growth." },
            { t: "Our Mission", d: "Our mission is to provide high-quality digital solutions through innovative design, advanced development practices, and customer-focused strategies. We aim to help businesses adapt to the evolving digital landscape with scalable and efficient technology services." },
          ].map((b) => (
            <div key={b.t} data-fade className="flex flex-col border-t border-white/20 pt-10">
              <p className="text-sm uppercase tracking-[0.3em] text-gray-400 font-medium mb-10">{b.t}</p>
              <h3 className="text-3xl sm:text-4xl lg:text-5xl leading-tight font-light text-white">{b.d}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="py-32 sm:py-40 bg-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-20 text-left">
            <p data-fade className="mb-6 text-sm uppercase tracking-[0.3em] text-gray-400 font-medium">What We Do</p>
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-light tracking-tight text-[#1a1a1a]">
              Our Core <span className="font-bold">Services.</span>
            </h2>
          </div>
          <div className="grid gap-x-12 gap-y-16 md:grid-cols-3 text-left">
            {[
              {
                t: "Website Designing & Development",
                d: "We create responsive and professionally designed websites that enhance brand visibility and improve user experience. Our websites are developed with modern technologies to ensure speed, security, and seamless functionality across all devices."
              },
              {
                t: "Mobile App Development",
                d: "Our mobile app development services help businesses connect with customers through intuitive and feature-rich applications. We develop customised Android and iOS applications focused on usability, performance, and long-term scalability."
              },
              {
                t: "ERP Software Solutions",
                d: "We develop customised ERP systems that streamline daily business operations and improve workflow management. Our ERP solutions help organisations manage multiple departments efficiently through integrated and automated systems."
              }
            ].map((s, i) => (
              <div key={s.t} data-fade className="group relative pt-8 border-t border-gray-200 hover:border-[#1a1a1a] transition-colors duration-500">
                <span className="absolute top-8 right-0 text-gray-200 font-mono text-4xl group-hover:text-gray-100 transition-colors pointer-events-none -z-10">0{i+1}</span>
                <h3 className="text-2xl font-bold mb-6 text-[#1a1a1a] pr-12">{s.t}</h3>
                <p className="text-gray-600 text-base leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 sm:py-40 bg-[#fafafa]">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid lg:grid-cols-2 gap-20 lg:gap-32">
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
    </>
  );
}
