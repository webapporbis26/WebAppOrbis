import { TestimonialsSection as MarqueeTestimonialsSection } from "@/components/ui/testimonials-with-marquee"

const avatar = (initial: string, bg: string) =>
  `data:image/svg+xml;utf8,` +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96"><rect width="96" height="96" rx="48" fill="${bg}"/><text x="48" y="60" font-family="Arial, sans-serif" font-size="38" font-weight="bold" fill="white" text-anchor="middle">${initial}</text></svg>`
  )

const testimonials = [
  {
    author: {
      name: "Chandys Hotels & Resorts",
      handle: "Hospitality · Munnar",
      avatar: avatar("C", "#B45309")
    },
    text: "WebApp Orbis has been a reliable technology partner for our hotel and resort websites. Their team understood our requirements well and delivered a professional, user-friendly website that represents our properties effectively. They were responsive throughout the development and support process, and we appreciate their continued assistance."
  },
  {
    author: {
      name: "Denehalaya, Punnapra",
      handle: "Psycho-Spiritual Institute",
      avatar: avatar("D", "#059669")
    },
    text: "We had a smooth experience working with WebApp Orbis for our website development. The team was easy to communicate with, understood our requirements, and created a clean and professional online presence for us. Their support and attention to our requirements made the overall process comfortable."
  },
  {
    author: {
      name: "Nazareth Candles",
      handle: "E-commerce · Candles",
      avatar: avatar("N", "#EA580C")
    },
    text: "WebApp Orbis helped us build and manage our online presence with a website that suits our candle business and its different requirements. We particularly appreciated their willingness to understand our ideas and develop features according to our needs. The team has been supportive and responsive whenever we needed changes or assistance."
  },
  {
    author: {
      name: "Dream Weaver Events",
      handle: "Event Management",
      avatar: avatar("D", "#7C3AED")
    },
    text: "Working with WebApp Orbis was a positive experience for our business. They helped us create a professional website that showcases our event services in a clear and attractive way. The team was responsive, flexible with our requirements, and provided good support throughout the project."
  },
  {
    author: {
      name: "Best Choice Qatar",
      handle: "Portable Cabins · Qatar",
      avatar: avatar("B", "#2563EB")
    },
    text: "WebApp Orbis has supported us with website development and ongoing digital and SEO requirements. Their team has been consistent in understanding our business goals and working on improvements based on our requirements. We appreciate their technical support, communication, and continued involvement in our online growth."
  },
  {
    author: {
      name: "MalluSmart",
      handle: "E-commerce · Kerala",
      avatar: avatar("M", "#16A34A")
    },
    text: "WebApp Orbis developed our e-commerce platform with the features we needed to manage products, customers, categories, and online sales. The team was attentive to our requirements and worked with us through different stages of the project. Their technical support and willingness to make improvements have been valuable to us."
  }
]

export const TestimonialsSection = () => {
  return (
    <MarqueeTestimonialsSection
      title="What our clients say"
      description="Real feedback from businesses we've helped grow with professional websites and digital solutions."
      testimonials={testimonials}
    />
  )
}
