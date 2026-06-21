import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { RevealLine, useTextReveal, useFadeUp, gsap, ScrollTrigger } from "@/lib/anim";
import SplitText from "@/components/ui/SplitText";
import about from "@/assets/about-team.jpg";
import businessAnalysis from "@/assets/Business Analysis.svg";

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
      <section ref={heroRef} className="pt-32 pb-20 sm:pt-40 sm:pb-32 relative overflow-hidden bg-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 relative z-10 grid lg:grid-cols-[1.2fr_1fr] items-center gap-12 lg:gap-8">
          <div className="text-left">
            <p className="mb-6 text-sm uppercase tracking-[0.4em] text-gray-400 font-medium">About Us</p>
            <SplitText tag="h1" className="text-5xl sm:text-6xl lg:text-[72px] xl:text-[80px] font-black tracking-tighter leading-[1.05] text-[#1a1a1a]">
              Professional digital<br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-800">solutions</span> company<br className="hidden lg:block" />
              empowering<br className="hidden lg:block" /> businesses.
            </SplitText>
          </div>
          <div data-fade className="flex justify-center lg:justify-end items-center relative">
            <img 
              src={businessAnalysis} 
              alt="Business Analysis" 
              className="w-full max-w-[500px] lg:max-w-[600px] object-contain drop-shadow-2xl"
              style={{ animation: "floatSVG 6s ease-in-out infinite" }}
            />
          </div>
        </div>
        <style>{`
          @keyframes floatSVG {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-25px); }
            100% { transform: translateY(0px); }
          }
        `}</style>
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
          <div className="space-y-12 pt-10">
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
        <div className="mx-auto grid max-w-7xl gap-20 px-5 sm:px-8 md:grid-cols-2">
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
          <div className="mb-20">
            <p data-fade className="mb-6 text-sm uppercase tracking-[0.3em] text-gray-400 font-medium">What We Do</p>
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-light tracking-tight text-[#1a1a1a]">
              Our Core <span className="font-bold">Services.</span>
            </h2>
          </div>
          <div className="grid gap-x-12 gap-y-16 md:grid-cols-3">
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
            <div className="space-y-10">
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
            
            <div className="space-y-10" data-fade>
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
