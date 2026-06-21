import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import {
  ArrowUpRight,
  TrendingUp,
  BarChart3,
  Search,
  Share2,
  Megaphone,
  Target,
  PenTool,
  Magnet,
  Briefcase,
  Wallet,
  ShoppingBag,
  GraduationCap,
  Building2,
  Rocket,
  Code2,
  Database,
  Shield,
} from "lucide-react";
import { gsap, ScrollTrigger, useTextReveal, useFadeUp } from "@/lib/anim";
import SplitText from "@/components/ui/SplitText";
import { LogoCloud } from "@/components/ui/logo-cloud-3";
import { Marquee } from "@/components/ui/marquee";
import { MagneticButton } from "@/components/MagneticButton";

import caseStudyImg from "@/assets/portfolio-4.jpg";

export const Route = createFileRoute("/services/digital-marketing")({
  head: () => ({
    meta: [
      { title: "Digital Marketing Strategy & Services — WebApp Orbis" },
      {
        name: "description",
        content: "Results-driven digital marketing agency. We build strategies to increase visibility, generate quality leads, and deliver measurable ROI.",
      },
    ],
  }),
  component: DigitalMarketing,
});

const services = [
  {
    icon: Search,
    title: "Search Engine Optimization(SEO)",
    desc: "Boost your search rankings and attract more interested visitors with our SEO strategies. We focus on technical SEO, on-page improvements, and building your website's authority to help your business show up on Google and get steady leads.",
  },
  {
    icon: Share2,
    title: "Social Media Marketing",
    desc: "Grow your brand and reach your audience on Instagram, Facebook, LinkedIn, and other social media platforms. Our social media plans use creative content and proven campaigns to help you reach more people, boost engagement, and drive results.",
  },
  {
    icon: BarChart3,
    title: "Search Engine Marketing",
    desc: "Generate instant traffic and qualified leads with our Google Ads campaigns. From keyword research to ad optimization, we ensure maximum ROI through continuous testing and performance tracking.",
  },
  {
    icon: Target,
    title: "Performance Marketing",
    desc: "Connect with your audience when it matters most using targeted ads on Google, Meta, and other platforms. We work to turn clicks into real customers by focusing on what increases conversions.",
  },
  {
    icon: PenTool,
    title: "Branding & Creative Services",
    desc: "Build a brand identity that sets you apart in your field. Whether you need a new logo or a full digital branding package, we'll help you create a strong, consistent presence wherever your customers find you.",
  },
  {
    icon: Magnet,
    title: "Lead Generation",
    desc: "Attract and convert your ideal customers with strategies customized just for you. We use landing page optimization, paid ads, and smart funnel tactics to help you get more leads and increase conversions.",
  },
];

const industries = [
  {
    icon: Briefcase,
    title: "B2B",
    desc: "Drive qualified leads and build long-term client relationships with targeted B2B digital marketing strategies. We focus on LinkedIn marketing, SEO, and lead-nurturing campaigns to help you connect with decision-makers and generate measurable business growth.",
    bg: "#FFC107", // Yellow
    text: "#1a1a1a",
  },
  {
    icon: Wallet,
    title: "B2C",
    desc: "As a leading digital marketing company, we help B2C brands increase visibility, attract the right audience, and drive conversions. Our tactics focus on social media marketing, paid ads, and customer engagement to increase brand awareness and loyalty.",
    bg: "#8c8c8c", // Grey
    text: "white",
  },
  {
    icon: ShoppingBag,
    title: "E-COMMERCE",
    desc: "Grow your online store with performance-driven e-commerce marketing strategies. We combine SEO, Google Ads, and conversion optimization to increase traffic, reduce cart abandonment, and turn visitors into paying customers.",
    bg: "#FFC107", // Yellow
    text: "#1a1a1a",
  },
  {
    icon: GraduationCap,
    title: "EDUCATION",
    desc: "Stand out in a competitive education sector with customized digital marketing. We help institutions generate qualified leads using targeted campaigns, SEO, and social media, driving stronger lead generation and admissions.",
    bg: "#8c8c8c", // Grey
    text: "white",
  },
  {
    icon: Building2,
    title: "ENTERPRISE",
    desc: "Scale your business with advanced digital marketing solutions built for enterprises. From multi-channel campaigns to data-driven performance marketing, we help large organizations optimize their online visibility and maximize ROI.",
    bg: "#FFC107", // Yellow
    text: "#1a1a1a",
  },
  {
    icon: Rocket,
    title: "STARTUPS",
    desc: "Launch and scale your startup with cost-effective digital marketing strategies designed for rapid growth. We help you build brand awareness, attract your ideal audience, and generate early-stage leads through SEO, paid ads, and performance marketing.",
    bg: "#8c8c8c", // Grey
    text: "white",
  },
];

function DigitalMarketing() {
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
      gsap.utils.toArray<HTMLElement>("[data-ind-card]").forEach((el, i) => {
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
      {/* HEADER BANNER */}
      <section ref={heroRef} className="mx-auto max-w-[1400px] px-5 sm:px-8 mb-24">
        <div className="bg-[#FFC107] py-20 px-8 rounded-lg text-center flex flex-col items-center justify-center min-h-[350px]">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1a1a1a] max-w-4xl leading-tight tracking-tight mb-10">
            Get a Custom Digital Marketing Strategy for Your Business
          </h1>
          <Link
            to="/contact"
            className="bg-white text-[#1a1a1a] font-bold text-sm tracking-wider uppercase px-8 py-4 hover:bg-[#1a1a1a] hover:text-white transition-colors"
          >
            GET MY FREE STRATEGY
          </Link>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="mx-auto max-w-6xl px-5 sm:px-8 mb-32">
        <div className="text-center mb-16">
          <p className="text-3xl md:text-4xl font-light text-[#1a1a1a] mb-2">
            Why Choose WebApp Orbis for
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-8">
            Digital Marketing
          </h2>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Partner with a results-driven digital marketing agency that focuses on real growth. Our strategies are built to increase visibility, generate quality leads, and generate measurable ROI for your business.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 mt-20" data-fade>
          <div className="flex gap-6 items-start">
            <div className="shrink-0 mt-1">
              <Megaphone className="w-12 h-12 text-[#1a1a1a]" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-[#1a1a1a] mb-4">Strong Brand Building</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                Served 500+ brands across B2B, B2C, education, and e-commerce in 15+ years. From logo to LinkedIn, we build brands that your audience recognises and trusts across every channel.
              </p>
            </div>
          </div>
          <div className="flex gap-6 items-start">
            <div className="shrink-0 mt-1">
              <BarChart3 className="w-12 h-12 text-[#1a1a1a]" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-[#1a1a1a] mb-4">Transparent & Real-Time Reporting</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                Our team will share daily campaign reports, and weekly keyword rankings will be updated. A review meeting will be held once a month based on the monthly report to evaluate performance, analyze setbacks, and strategize for further improvement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE SECTION */}
      <Marquee text="✦ STRATEGIZE ✦ OPTIMIZE ✦ ENGAGE ✦ CONVERT ✦ SCALE " speed={25} />

      {/* TECH STACK BENTO GRID */}
      <section className="bg-white py-32 border-y border-gray-100 mb-20">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <div className="text-center mb-16" data-fade>
            <h2 className="text-4xl md:text-5xl font-light text-[#1a1a1a] mb-6">
              Our Marketing <span className="font-bold">Tech Stack</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We empower our campaigns with cutting-edge tools to track performance, understand audiences, and maximize conversions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto" data-fade>
            {/* Advertising Bento */}
            <div className="md:col-span-2 bg-[#f4f7ff] rounded-3xl p-10 flex flex-col justify-between group overflow-hidden relative">
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-[#1a1a1a] mb-4">Ad Platforms & Programmatic</h3>
                <p className="text-gray-600 mb-8 max-w-md">Precision targeting across the internet's most powerful advertising networks.</p>
                <div className="flex flex-wrap gap-3">
                  {['Google Ads', 'Meta Ads', 'LinkedIn Campaign Manager', 'TikTok Ads'].map(tech => (
                    <span key={tech} className="px-4 py-2 bg-white rounded-full text-sm font-semibold text-[#0055FF] shadow-sm border border-blue-100">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                <Megaphone className="w-64 h-64 text-[#0055FF]" />
              </div>
            </div>

            {/* Automation Bento */}
            <div className="bg-[#1a1a1a] rounded-3xl p-10 flex flex-col justify-between group overflow-hidden relative text-white">
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4">Marketing Automation</h3>
                <p className="text-gray-400 mb-8 text-sm">Scale your outreach without losing the personal touch.</p>
                <div className="flex flex-wrap gap-2">
                  {['HubSpot', 'Mailchimp', 'ActiveCampaign'].map(tech => (
                    <span key={tech} className="px-3 py-1.5 bg-white/10 rounded-full text-xs font-semibold text-white">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="absolute right-0 bottom-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                <Rocket className="w-32 h-32" />
              </div>
            </div>

            {/* Analytics Bento */}
            <div className="bg-[#FFC107] rounded-3xl p-10 flex flex-col justify-between group overflow-hidden relative">
              <div className="relative z-10">
                <h3 className="text-2xl font-black text-[#1a1a1a] mb-4">Data Analytics</h3>
                <p className="text-[#1a1a1a] mb-8 text-sm font-medium">Turn raw data into actionable growth strategies.</p>
                <div className="flex flex-wrap gap-2">
                  {['Google Analytics', 'Mixpanel', 'Looker Studio'].map(tech => (
                    <span key={tech} className="px-3 py-1.5 bg-[#1a1a1a] rounded-full text-xs font-bold text-[#FFC107]">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="absolute -right-5 -bottom-5 opacity-10 group-hover:scale-110 transition-transform duration-500">
                <BarChart3 className="w-40 h-40 text-[#1a1a1a]" />
              </div>
            </div>

            {/* Social Bento */}
            <div className="md:col-span-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-10 flex items-center justify-between group overflow-hidden relative text-white">
              <div className="relative z-10 max-w-lg">
                <h3 className="text-2xl font-bold mb-4">Social Media Management</h3>
                <p className="text-blue-100 text-sm">We use enterprise-grade social listening and scheduling tools like Hootsuite and Sprout Social to monitor brand sentiment and maintain a consistent, engaging online presence.</p>
              </div>
              <div className="relative z-10 hidden md:block">
                <Share2 className="w-20 h-20 text-blue-200 group-hover:text-white transition-colors duration-500" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LOGO CLOUD */}
      <section className="bg-white py-20 border-y border-gray-100 mb-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
            <h3 className="text-2xl md:text-3xl font-light text-gray-800">
              Trusted by clients worldwide. Start your<br/>
              <span className="font-medium">growth journey today.</span>
            </h3>
            <Link to="/portfolio" className="text-sm font-bold uppercase tracking-wider text-[#A855F7] border border-[#A855F7] px-6 py-3 hover:bg-[#A855F7] hover:text-white transition-colors">
              SEE WHAT CLIENTS SAY
            </Link>
          </div>
          <LogoCloud />
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="mx-auto max-w-[1400px] px-5 sm:px-8 mb-32">
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

      {/* INDUSTRIES GRID */}
      <section className="mx-auto max-w-[1400px] px-5 sm:px-8 mb-32">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((ind, i) => {
            const Icon = ind.icon;
            return (
              <div
                key={i}
                data-ind-card
                className="p-10 flex flex-col"
                style={{ backgroundColor: ind.bg, color: ind.text }}
              >
                <div className="flex items-center gap-4 mb-8">
                  <Icon className="w-10 h-10" strokeWidth={1.5} />
                  <h3 className="text-xl font-bold tracking-wide">{ind.title}</h3>
                </div>
                <p className="text-sm leading-relaxed" style={{ opacity: 0.9 }}>
                  {ind.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* PROVEN RESULTS */}
      <section className="bg-white py-32 border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div data-fade>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#1a1a1a] leading-tight mb-8">
                Proven Results That<br/>
                <span className="font-bold">Drive Growth</span>
              </h2>
              <p className="text-lg text-gray-600 mb-12 max-w-md">
                When you partner with WebApp Orbis, we take care of the heavy lifting, so you can enjoy more website traffic, leads, and revenue.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/portfolio" className="bg-[#0EA5E9] text-white text-sm font-bold uppercase tracking-wider px-8 py-4 hover:bg-[#0284C7] transition-colors">
                  VIEW CASE STUDIES
                </Link>
                <Link to="/services" className="bg-[#A855F7] text-white text-sm font-bold uppercase tracking-wider px-8 py-4 hover:bg-[#9333EA] transition-colors">
                  VIEW DM PORTFOLIO
                </Link>
              </div>
            </div>

            <div data-fade className="bg-white border border-gray-100 shadow-xl p-6 md:p-10 rounded-xl relative overflow-hidden">
              <div className="aspect-[2/1] relative mb-8 overflow-hidden rounded-lg">
                {/* Mockup for the case study image */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 flex items-center p-8">
                  <div className="text-white">
                    <h3 className="text-5xl font-black italic mb-2">#1 Ranking</h3>
                    <p className="text-xl font-medium">On Google Search Results</p>
                  </div>
                </div>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-8 leading-tight">
                SEO SUCCESS: 4.49M IMPRESSIONS, 34.9K CLICKS, TOP 5 RANKINGS
              </h3>
              
              <div className="flex justify-between items-center border-y border-gray-200 py-4 mb-8">
                <div>
                  <span className="bg-[#FFC107] text-[#1a1a1a] text-xs font-bold uppercase tracking-wider px-2 py-1 mr-4">SERVICES</span>
                  <span className="font-semibold text-gray-800">Search Engine Optimization(SEO)</span>
                </div>
                <div className="text-right">
                  <span className="bg-gray-600 text-white text-xs font-bold uppercase tracking-wider px-2 py-1 mr-4">CLIENT</span>
                  <span className="font-semibold text-gray-800">Hilker Consulting</span>
                </div>
              </div>
              
              <p className="text-gray-600 text-sm leading-relaxed">
                Hilker Consulting hired WebApp Orbis to strengthen its organic search visibility in the competitive market. Starting from a baseline of just 17,000 impressions, we developed and executed a comprehensive SEO strategy covering technical optimization, content development, and authority building. Within 8 months, monthly impressions reached 4.49 million, and the site generated 34,900 clicks. Multiple target keywords reached the Top 5 on Google, driving 52,000 users to the site and consistently strong engagement metrics.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
