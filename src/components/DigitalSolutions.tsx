import { useState } from "react"
import { Laptop, Smartphone, Megaphone, TrendingUp, Check, ArrowRight } from "lucide-react"
import { LeadModal } from "@/components/LeadModal"

const cards = [
  {
    icon: Laptop,
    color: "text-blue-500", bg: "bg-blue-50", num: "text-blue-200",
    accent: "bg-blue-500", check: "bg-blue-500",
    title: "Website Designing & Development",
    desc: "We create responsive and professionally designed websites that enhance brand visibility and improve user experience.",
    bullets: ["Responsive & Modern Design", "Fast Loading & SEO Ready", "Secure & Scalable Solutions"],
    btnText: "text-blue-600", btnBorder: "border-blue-500", btnArrow: "bg-blue-500",
  },
  {
    icon: Smartphone,
    color: "text-rose-500", bg: "bg-rose-50", num: "text-rose-200",
    accent: "bg-rose-500", check: "bg-rose-500",
    title: "Mobile App Development",
    desc: "Our mobile app development services help businesses connect with customers through intuitive and feature-rich applications.",
    bullets: ["Android & iOS App Development", "User-Friendly & Feature Rich", "Scalable & High Performance"],
    btnText: "text-rose-600", btnBorder: "border-rose-500", btnArrow: "bg-rose-500",
  },
  {
    icon: Megaphone,
    color: "text-emerald-500", bg: "bg-emerald-50", num: "text-emerald-200",
    accent: "bg-emerald-500", check: "bg-emerald-500",
    title: "Digital Marketing",
    desc: "Boost your online presence and reach your target audience with data-driven digital marketing campaigns.",
    bullets: ["Social Media Marketing", "Content Creation & Strategy", "Google Ads & Paid Campaigns"],
    btnText: "text-emerald-600", btnBorder: "border-emerald-500", btnArrow: "bg-emerald-500",
  },
  {
    icon: TrendingUp,
    color: "text-orange-400", bg: "bg-orange-50", num: "text-orange-200",
    accent: "bg-orange-400", check: "bg-orange-400",
    title: "SEO Optimization",
    desc: "Improve your search engine rankings and drive organic traffic to your website with advanced SEO strategies.",
    bullets: ["On-Page & Off-Page SEO", "Keyword Research & Strategy", "Improved Search Rankings"],
    btnText: "text-orange-500", btnBorder: "border-orange-400", btnArrow: "bg-orange-400",
  },
]

export function DigitalSolutions() {
  const [leadService, setLeadService] = useState<string | null>(null)

  return (
    <section className="relative py-10 sm:py-14 bg-[#f5f7fa] overflow-hidden">
      {/* Decorative dotted patterns */}
      <div className="absolute left-8 sm:left-16 top-24 opacity-40 pointer-events-none hidden md:block">
        <div className="grid grid-cols-5 gap-2">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-blue-300" />
          ))}
        </div>
      </div>
      <div className="absolute right-8 sm:right-16 top-24 opacity-40 pointer-events-none hidden md:block">
        <div className="grid grid-cols-5 gap-2">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-blue-300" />
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="text-center mb-8 sm:mb-10" data-fade>
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="h-px w-10 sm:w-12 bg-blue-400" />
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.3em] text-blue-500 uppercase">Our Services</span>
            <span className="h-px w-10 sm:w-12 bg-blue-400" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-900 leading-tight tracking-tight mb-4">
            Digital Solutions for <span className="text-blue-600">Your Business</span>
          </h2>
          <p className="text-slate-500 text-[15px] sm:text-lg max-w-3xl mx-auto leading-relaxed">
            From websites to mobile apps and digital marketing, we provide complete digital solutions to help your business grow online.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" data-fade>
          {cards.map((card, i) => (
            <div key={i} className="relative bg-white rounded-3xl p-6 sm:p-7 shadow-[0_4px_24px_rgb(0,0,0,0.04)] hover:shadow-[0_12px_36px_rgb(0,0,0,0.08)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col overflow-hidden">
              {/* Number watermark */}
              <span className={`absolute top-5 right-6 text-2xl font-bold ${card.num} select-none`}>
                {String(i + 1).padStart(2, "0")}
              </span>
              {/* Decorative blob */}
              <div className={`absolute -top-8 -right-8 w-28 h-28 rounded-full ${card.bg} opacity-60 pointer-events-none`} />

              <div className={`relative h-14 w-14 rounded-2xl ${card.bg} flex items-center justify-center mb-5`}>
                <card.icon className={`h-7 w-7 ${card.color}`} strokeWidth={1.75} />
              </div>

              <h4 className="text-lg font-bold text-slate-900 leading-snug mb-2 pr-8">
                {card.title}
              </h4>
              <div className={`w-8 h-[3px] rounded-full ${card.accent} mb-4`} />

              <p className="text-sm text-slate-500 leading-relaxed mb-5">
                {card.desc}
              </p>

              <ul className="space-y-2.5 mb-6">
                {card.bullets.map((b, j) => (
                  <li key={j} className="flex items-center gap-2.5 text-[13px] text-slate-600">
                    <span className={`h-5 w-5 rounded-full ${card.check} flex items-center justify-center flex-shrink-0`}>
                      <Check className="h-3 w-3 text-white" strokeWidth={3} />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => setLeadService(card.title)}
                className={`mt-auto inline-flex items-center justify-between pl-5 pr-1.5 py-1.5 rounded-full border ${card.btnBorder} ${card.btnText} font-semibold text-sm hover:shadow-md transition-all duration-300 group/btn cursor-pointer w-full`}
              >
                Get a Quote
                <span className={`h-8 w-8 rounded-full ${card.btnArrow} flex items-center justify-center text-white ml-3 group-hover/btn:translate-x-0.5 transition-transform`}>
                  <ArrowRight className="h-4 w-4" />
                </span>
              </button>
            </div>
          ))}
        </div>
      </div>
      <LeadModal
        open={leadService !== null}
        service={leadService ?? ""}
        onClose={() => setLeadService(null)}
      />
    </section>
  )
}
