import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react"

interface Testimonial {
  name: string
  category: string
  initial: string
  avatarBg: string
  quoteColor: string
  text: string
  team: string
  teamRole: string
}

const testimonials: Testimonial[] = [
  {
    name: "Dream Weaver Events",
    category: "Event Management",
    initial: "DW",
    avatarBg: "bg-violet-600",
    quoteColor: "text-violet-200",
    text: "Working with WebApp Orbis was a positive experience for our business. They helped us create a professional website that showcases our event services in a clear and attractive way. The team was responsive, flexible with our requirements, and provided good support throughout the project.",
    team: "Team Dream Weaver",
    teamRole: "Event Management",
  },
  {
    name: "Best Choice Qatar",
    category: "Portable Cabins · Qatar",
    initial: "B",
    avatarBg: "bg-blue-600",
    quoteColor: "text-blue-200",
    text: "WebApp Orbis has supported us with website development and ongoing digital and SEO requirements. Their team has been consistent in understanding our business goals and working on improvements based on our requirements. We appreciate their technical support, communication, and continued involvement in our online growth.",
    team: "Best Choice Team",
    teamRole: "Qatar",
  },
  {
    name: "Mallu's Mart",
    category: "E-commerce · Kerala",
    initial: "M",
    avatarBg: "bg-green-600",
    quoteColor: "text-green-200",
    text: "WebApp Orbis developed our e-commerce platform with the features we needed to manage products, customers, categories, and online sales. The team was attentive to our requirements and worked with us through different stages of the project. Their technical support and willingness to make improvements have been valuable to us.",
    team: "Mallu's Mart Team",
    teamRole: "Kerala",
  },
  {
    name: "Chandys Hotels & Resorts",
    category: "Hospitality · Munnar",
    initial: "C",
    avatarBg: "bg-amber-600",
    quoteColor: "text-amber-200",
    text: "WebApp Orbis has been a reliable technology partner for our hotel and resort websites. Their team understood our requirements well and delivered a professional, user-friendly website that represents our properties effectively. They were responsive throughout the development and support process, and we appreciate their continued assistance.",
    team: "Chandys Team",
    teamRole: "Hospitality",
  },
  {
    name: "Nazareth Candles",
    category: "E-commerce · Candles",
    initial: "N",
    avatarBg: "bg-orange-500",
    quoteColor: "text-orange-200",
    text: "WebApp Orbis helped us build and manage our online presence with a website that suits our candle business and its different requirements. We particularly appreciated their willingness to understand our ideas and develop features according to our needs. The team has been supportive and responsive whenever we needed changes or assistance.",
    team: "Nazareth Team",
    teamRole: "E-commerce",
  },
  {
    name: "Denehalaya, Punnapra",
    category: "Psycho-Spiritual Institute",
    initial: "D",
    avatarBg: "bg-emerald-600",
    quoteColor: "text-emerald-200",
    text: "We had a smooth experience working with WebApp Orbis for our website development. The team was easy to communicate with, understood our requirements, and created a clean and professional online presence for us. Their support and attention to our requirements made the overall process comfortable.",
    team: "Denehalaya Team",
    teamRole: "Punnapra",
  },
]

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-[0_4px_24px_rgb(0,0,0,0.05)] border border-slate-100 h-full flex flex-col relative overflow-hidden">
      <Quote className={`absolute top-6 right-6 h-10 w-10 ${t.quoteColor} fill-current`} />
      <div className="flex items-center gap-3.5 mb-5">
        <div className={`h-12 w-12 sm:h-14 sm:w-14 rounded-full ${t.avatarBg} flex items-center justify-center flex-shrink-0`}>
          <span className="text-white font-bold text-lg sm:text-xl">{t.initial}</span>
        </div>
        <div>
          <h4 className="text-[15px] sm:text-base font-bold text-slate-900 leading-tight">{t.name}</h4>
          <p className="text-[13px] text-slate-500 mt-0.5">{t.category}</p>
        </div>
      </div>

      <div className="flex gap-4 flex-1">
        <div className="flex-1 flex flex-col">
          <p className="text-[13px] sm:text-sm text-slate-600 leading-relaxed flex-1">
            &ldquo;{t.text}&rdquo;
          </p>
          <div className="flex gap-1 mt-4 mb-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-4 w-4 text-amber-400 fill-amber-400" />
            ))}
          </div>
          <p className="text-sm font-bold text-slate-900">{t.team}</p>
          <p className="text-[13px] text-slate-500">{t.teamRole}</p>
        </div>
      </div>
    </div>
  )
}

export const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0)
  const [perView, setPerView] = useState(3)

  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setPerView(1)
      else if (window.innerWidth < 1024) setPerView(2)
      else setPerView(3)
    }
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  const maxIndex = Math.max(0, testimonials.length - perView)

  const goTo = useCallback((i: number) => {
    setCurrent(Math.max(0, Math.min(i, maxIndex)))
  }, [maxIndex])

  const next = useCallback(() => {
    setCurrent((p) => (p >= maxIndex ? 0 : p + 1))
  }, [maxIndex])

  const prev = useCallback(() => {
    setCurrent((p) => (p <= 0 ? maxIndex : p - 1))
  }, [maxIndex])

  useEffect(() => {
    const id = setInterval(next, 6000)
    return () => clearInterval(id)
  }, [next])

  useEffect(() => {
    goTo(current)
  }, [perView]) // eslint-disable-line react-hooks/exhaustive-deps

  const pages = maxIndex + 1

  return (
    <section className="relative py-10 sm:py-14 bg-[#f5f7fa] overflow-hidden">
      <div className="absolute left-8 sm:left-16 top-24 opacity-40 pointer-events-none hidden md:block">
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
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.3em] text-blue-500 uppercase">Testimonials</span>
            <span className="h-px w-10 sm:w-12 bg-blue-400" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-900 leading-tight tracking-tight mb-4">
            What our <span className="text-blue-600">clients say</span>
          </h2>
          <p className="text-slate-500 text-[15px] sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Real feedback from businesses we&apos;ve helped grow with professional websites and digital solutions.
          </p>
        </div>

        <div className="overflow-hidden" data-fade>
          <div
            className="flex gap-5 sm:gap-6 transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${current * (100 / perView)}%)` }}
          >
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="flex-shrink-0"
                style={{ width: `calc(${100 / perView}% - ${(perView - 1) * 24 / perView}px)` }}
              >
                <TestimonialCard t={t} />
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 mt-8" data-fade>
          <button
            onClick={prev}
            aria-label="Previous testimonials"
            className="h-11 w-11 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex gap-2">
            {Array.from({ length: pages }).map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to page ${i + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === current ? "w-6 bg-blue-600" : "w-2.5 bg-slate-300 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>
          <button
            onClick={next}
            aria-label="Next testimonials"
            className="h-11 w-11 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  )
}
