import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import {
  Search,
  BarChart,
  Settings,
  MapPin,
  Target,
  Key,
  Globe2,
  Code2,
  Database,
  Rocket,
  Shield,
} from "lucide-react";
import { gsap, useTextReveal, useFadeUp } from "@/lib/anim";
import { LogoCloud } from "@/components/ui/logo-cloud-3";
import { Marquee } from "@/components/ui/marquee";

import case1 from "@/assets/portfolio-1.jpg";
import case2 from "@/assets/portfolio-2.jpg";
import case3 from "@/assets/portfolio-3.jpg";

export const Route = createFileRoute("/services/seo")({
  head: () => ({
    meta: [
      { title: "SEO Company — Rank Higher & Grow Faster | WebApp Orbis" },
      {
        name: "description",
        content: "Expert SEO services designed to increase visibility, drive qualified traffic, and maximize conversions.",
      },
    ],
  }),
  component: SEOPage,
});

const services = [
  {
    icon: Globe2,
    title: "On page SEO & Off Page SEO",
    desc: "From comprehensive SEO audit to backlink building and mobile speed, our certified SEO analysts will cover every aspect of on page and off page SEO to help your website rank on Google's first page.",
  },
  {
    icon: BarChart,
    title: "Website Audits & Reporting",
    desc: "In addition to one-on-one consultation, our team will be sending you easy-to-follow website audits and reporting to help you keep track of the progress we're making with SEO campaigns.",
  },
  {
    icon: Settings,
    title: "Technical SEO",
    desc: "Well versed in the practical workings of technical SEO, our analysts go out of their way to make sure that organic campaigns are on track to achieve desired results.",
  },
  {
    icon: MapPin,
    title: "Local SEO",
    desc: "Tapping into competitor analysis and keyword research, our professionals devise the perfect local SEO strategy to rank locally and make your business more discoverable to local searchers.",
  },
  {
    icon: Target,
    title: "Competitor Analysis",
    desc: "Performing a competitor research forms the foundation of every SEO project we undertake. With great attention to detail, we strategize and execute roadmaps for outranking competitors.",
  },
  {
    icon: Key,
    title: "Keyword Research & Planning",
    desc: "Your SEO campaigns are only as good as the efforts that have gone into keyword research. We identify not just low-hanging fruits but keywords that will generate sales for your business.",
  },
];

const portfolioItems = [
  {
    title: "DR JASNAS CLINIC",
    subtitle: "HEALTHCARE",
    img: case1,
  },
  {
    title: "FUSION FLOORS",
    subtitle: "UAE",
    img: case2,
  },
  {
    title: "SCHOOL OF AYURVEDHA",
    subtitle: "EDUCATION",
    img: case3,
  },
];

function SEOPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  useTextReveal(heroRef, { stagger: 0.1, delay: 0.2 });
  useFadeUp("[data-fade]");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-service-card]").forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            delay: i * 0.1,
            scrollTrigger: { trigger: el, start: "top 85%" },
          }
        );
      });
      gsap.utils.toArray<HTMLElement>("[data-port-card]").forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            delay: i * 0.1,
            scrollTrigger: { trigger: el, start: "top 85%" },
          }
        );
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-[#FAFAFA] min-h-screen pt-32 pb-20">
      {/* HERO SECTION */}
      <section ref={heroRef} className="mx-auto max-w-[1400px] px-5 sm:px-8 mb-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#1a1a1a] leading-tight mb-6">
              SEO Company –<br/>
              <span className="font-medium">Rank Higher & Grow Faster</span>
            </h1>
            <h2 className="text-lg font-bold text-[#1a1a1a] mb-4 uppercase tracking-wide">
              EXPERT SEO SERVICES DESIGNED TO INCREASE VISIBILITY, DRIVE QUALIFIED TRAFFIC, AND MAXIMIZE CONVERSIONS.
            </h2>
            <p className="text-gray-600 text-[15px] leading-relaxed mb-10 max-w-xl">
              Looking for a trusted SEO company? Our strategies go beyond keywords — we optimize for Google's latest algorithms, Core Web Vitals, voice search, and AI-driven ranking factors. From local SEO that puts your business on the map to advanced content and link-building strategies, we deliver measurable growth with full transparency. Partner with us to stay ahead of competitors and thrive in the ever-changing digital landscape.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <span className="font-bold text-[#1a1a1a] text-lg">See How We Improve Your Rankings</span>
              <Link
                to="/contact"
                className="text-[#9333EA] font-medium text-sm tracking-wide uppercase px-8 py-4 border border-[#9333EA] hover:bg-[#9333EA] hover:text-white transition-colors"
              >
                GET A FREE SEO AUDIT
              </Link>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 h-full min-h-[400px]">
            <div className="bg-[#FFC107] p-8 flex flex-col justify-center transition-transform hover:-translate-y-1">
              <h3 className="text-4xl md:text-5xl font-black text-[#1a1a1a] mb-2">15<span className="text-2xl">+</span></h3>
              <p className="text-[#1a1a1a] font-medium text-sm">Years of Experience</p>
            </div>
            <div className="bg-[#8c8c8c] p-8 flex flex-col justify-center transition-transform hover:-translate-y-1">
              <h3 className="text-4xl md:text-5xl font-black text-white mb-2">1500<span className="text-2xl">+</span></h3>
              <p className="text-white font-medium text-sm">Trusted Clients Worldwide</p>
            </div>
            <div className="bg-[#8c8c8c] p-8 flex flex-col justify-center transition-transform hover:-translate-y-1">
              <h3 className="text-4xl md:text-5xl font-black text-white mb-2">15<span className="text-2xl">+</span></h3>
              <p className="text-white font-medium text-sm">SEO Experts</p>
            </div>
            <div className="bg-[#FFC107] p-8 flex flex-col justify-center transition-transform hover:-translate-y-1">
              <h3 className="text-4xl md:text-5xl font-black text-[#1a1a1a] mb-2">150<span className="text-2xl">+</span></h3>
              <p className="text-[#1a1a1a] font-medium text-sm">Successful SEO Projects</p>
            </div>
          </div>
        </div>
      </section>

      {/* TOOLS / PARTNERS LOGOS */}
      <section className="bg-white py-12 border-y border-gray-100 mb-24">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <LogoCloud />
        </div>
      </section>

      {/* ABOUT SEO SECTION */}
      <section className="mx-auto max-w-[1400px] px-5 sm:px-8 mb-32">
        <h2 className="text-3xl md:text-4xl font-light text-[#1a1a1a] text-center mb-16" data-fade>
          WebApp Orbis - <span className="font-medium">SEO Company</span>
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div data-fade className="space-y-6 text-gray-600 leading-relaxed text-[15px]">
            <p>
              Our SEO (Search Engine Optimization) services: It's pretty obvious that very few people enter your website address manually on their browser and specifically go online to visit your site – unless your website is so popular like Facebook, Google or Twitter. Internet users punch in a keyword, a clue of what they are searching on search engines and explore websites that get listed out on the search result pages.
            </p>
            <p>
              In other words, major share of visitors landing up on websites go through search engines and there comes the role of SEO services. Our professionally well known SEO Company uses its expertise to provide exceptional services and create a unique online identity for your enterprise.
            </p>
            <p>
              WebApp Orbis is a reputed Web Development company capable of offering result-oriented on page and off page SEO services for every sort of business. Our experts provide best SEO services that can help you elevate the ranking of your company websites on search engines by applying proven tactical methodologies.
            </p>
            <p>
              The aim of our SEO company is not just to increase traffic onto your site rather we aim to attract most potential audience to paddle the growth of your business. Professionally trained SEO experts are capable of providing your online entity with maximum visibility.
            </p>
          </div>
          
          <div data-fade className="relative flex justify-center items-center p-8 bg-[#f4f7ff] rounded-2xl min-h-[400px]">
            {/* Abstract SEO Illustration */}
            <div className="relative text-center">
              <div className="text-[120px] md:text-[180px] font-black leading-none text-white tracking-tighter" style={{ textShadow: "4px 4px 0 #0055FF, 8px 8px 0 rgba(0,85,255,0.2)" }}>
                SEO
              </div>
              <div className="absolute -top-10 -right-10 bg-[#FFC107] text-[#1a1a1a] font-bold text-sm px-4 py-2 rounded-full shadow-lg transform rotate-12 flex items-center gap-2">
                <BarChart className="w-4 h-4" /> ANALYSIS
              </div>
              <div className="absolute -bottom-5 -left-5 bg-[#0055FF] text-white font-bold text-sm px-4 py-2 rounded-full shadow-lg transform -rotate-6 flex items-center gap-2">
                <Target className="w-4 h-4" /> RANK #1
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE SECTION */}
      <Marquee text="✦ RANK HIGHER ✦ DRIVE TRAFFIC ✦ MAXIMIZE ROI ✦ CONVERT LEADS " speed={25} />

      {/* TECH STACK BENTO GRID */}
      <section className="bg-white py-32 border-b border-gray-100">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <div className="text-center mb-16" data-fade>
            <h2 className="text-4xl md:text-5xl font-light text-[#1a1a1a] mb-6">
              Our SEO <span className="font-bold">Tech Stack</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We leverage industry-leading tools and proprietary tech to analyze, optimize, and dominate search results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto" data-fade>
            {/* Analytics Bento */}
            <div className="md:col-span-2 bg-[#f4f7ff] rounded-3xl p-10 flex flex-col justify-between group overflow-hidden relative">
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-[#1a1a1a] mb-4">Analytics & Tracking</h3>
                <p className="text-gray-600 mb-8 max-w-md">Data-driven insights to monitor rankings, traffic flow, and user behavior in real-time.</p>
                <div className="flex flex-wrap gap-3">
                  {['Google Analytics 4', 'Search Console', 'Looker Studio', 'Hotjar', 'Tag Manager'].map(tech => (
                    <span key={tech} className="px-4 py-2 bg-white rounded-full text-sm font-semibold text-[#0055FF] shadow-sm border border-blue-100">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                <BarChart className="w-64 h-64 text-[#0055FF]" />
              </div>
            </div>

            {/* Keyword Tools Bento */}
            <div className="bg-[#1a1a1a] rounded-3xl p-10 flex flex-col justify-between group overflow-hidden relative text-white">
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4">Keyword Intelligence</h3>
                <p className="text-gray-400 mb-8 text-sm">Discovering high-intent, low-competition opportunities.</p>
                <div className="flex flex-wrap gap-2">
                  {['Ahrefs', 'SEMrush', 'Moz', 'Keywords Everywhere'].map(tech => (
                    <span key={tech} className="px-3 py-1.5 bg-white/10 rounded-full text-xs font-semibold text-white">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="absolute right-0 bottom-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                <Key className="w-32 h-32" />
              </div>
            </div>

            {/* Technical SEO Bento */}
            <div className="bg-[#FFC107] rounded-3xl p-10 flex flex-col justify-between group overflow-hidden relative">
              <div className="relative z-10">
                <h3 className="text-2xl font-black text-[#1a1a1a] mb-4">Technical SEO</h3>
                <p className="text-[#1a1a1a] mb-8 text-sm font-medium">Deep crawling and Core Web Vitals optimization.</p>
                <div className="flex flex-wrap gap-2">
                  {['Screaming Frog', 'Lighthouse', 'PageSpeed Insights'].map(tech => (
                    <span key={tech} className="px-3 py-1.5 bg-[#1a1a1a] rounded-full text-xs font-bold text-[#FFC107]">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="absolute -right-5 -bottom-5 opacity-10 group-hover:scale-110 transition-transform duration-500">
                <Settings className="w-40 h-40 text-[#1a1a1a]" />
              </div>
            </div>

            {/* AI Bento */}
            <div className="md:col-span-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-10 flex items-center justify-between group overflow-hidden relative text-white">
              <div className="relative z-10 max-w-lg">
                <h3 className="text-2xl font-bold mb-4">AI-Powered Content Optimization</h3>
                <p className="text-blue-100 text-sm">We utilize advanced NLP and AI-driven content tools like SurferSEO and Clearscope to ensure your content perfectly aligns with search intent and outranks competitors.</p>
              </div>
              <div className="relative z-10 hidden md:block">
                <Rocket className="w-20 h-20 text-blue-200 group-hover:text-white transition-colors duration-500" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="mx-auto max-w-[1400px] px-5 sm:px-8 mb-32 pt-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <div
                key={i}
                data-service-card
                className="bg-white p-10 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group"
              >
                <div className="mb-8">
                  <Icon className="w-12 h-12 text-[#1a1a1a]" strokeWidth={1.2} />
                </div>
                <h3 className="text-xl font-bold text-[#1a1a1a] mb-4 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {service.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* WHY ARE WE THE BEST */}
      <section className="bg-white py-24 border-t border-gray-100 mb-20">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-[#1a1a1a] text-center mb-16" data-fade>
            Why Are We the <span className="font-medium">Best SEO Company?</span>
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div data-fade className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100">
              {/* Placeholder for the laptop working image */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center p-8">
                 <div className="w-full h-full bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col">
                    <div className="h-8 bg-gray-100 border-b flex items-center px-4 gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                    <div className="flex-1 p-6 flex flex-col gap-4">
                       <div className="h-8 w-1/3 bg-gray-200 rounded"></div>
                       <div className="flex-1 bg-blue-50/50 rounded border border-blue-100 flex items-end p-4 gap-2">
                          {[40, 65, 45, 80, 55, 90, 75, 100].map((h, i) => (
                            <div key={i} className="flex-1 bg-blue-500 rounded-t" style={{ height: `${h}%` }}></div>
                          ))}
                       </div>
                    </div>
                 </div>
              </div>
            </div>
            
            <div data-fade className="space-y-10">
              <p className="text-gray-600 leading-relaxed text-[15px]">
                WebApp Orbis is dedicated to helping our clients succeed by using personalized strategies. Our goal is to help your business grow steadily and rank high in traditional and AI-optimized search results.
              </p>
              
              <div>
                <h3 className="text-2xl font-bold text-[#1a1a1a] mb-3">14+ Years of Proven Expertise</h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  We've been working in SEO for over 14 years, so we understand how it keeps changing. Our team stays on top of updates and industry trends to make sure your business gets the best, lasting strategies.
                </p>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-[#1a1a1a] mb-3">A Legacy of 1500+ Trusted Clients</h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  We collaborated with local businesses and companies from various industries worldwide. Our 1500+ clients show we can adapt and help grow your business with customized SEO solutions, no matter your industry.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-[#1a1a1a] mb-3">Powered by 15+ Dedicated SEO Experts</h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  Our team consists of passionate SEO specialists, content creators, and technical experts who work together to ensure your website achieves and maintains top search engine rankings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section className="mx-auto max-w-[1400px] px-5 sm:px-8 mb-10">
        <div className="text-center mb-16" data-fade>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-[#1a1a1a] mb-4">
            Our Works Define Our <span className="font-bold">Success Look Through Some</span>
          </h2>
          <p className="text-xl text-gray-600">
            Excellent customer service is our foundation
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {portfolioItems.map((item, i) => (
            <div key={i} data-port-card className="group cursor-pointer">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 mb-6">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500"></div>
              </div>
              <h3 className="text-lg font-bold text-[#1a1a1a] uppercase tracking-wide group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              {item.subtitle && (
                <p className="text-sm text-gray-500 uppercase tracking-wider mt-1">
                  {item.subtitle}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
