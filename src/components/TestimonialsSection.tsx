import { TestimonialsSection as MarqueeTestimonialsSection } from "@/components/ui/testimonials-with-marquee"

const testimonials = [
  {
    author: {
      name: "Briana Patton",
      handle: "@brianapatton",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face"
    },
    text: "This ERP revolutionized our operations, streamlining finance and inventory. The cloud platform keeps us productive remotely.",
    href: "https://twitter.com/brianapatton"
  },
  {
    author: {
      name: "Bilal Ahmed",
      handle: "@bilalahmed",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    text: "Implementing this ERP was smooth and quick. The customizable, user-friendly interface made team training effortless.",
    href: "https://twitter.com/bilalahmed"
  },
  {
    author: {
      name: "Saman Malik",
      handle: "@samanm",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
    },
    text: "The support team is exceptional, guiding us through setup and providing ongoing assistance, ensuring complete satisfaction."
  },
  {
    author: {
      name: "Omar Raza",
      handle: "@omarceo",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
    },
    text: "This ERP's seamless integration enhanced our business operations and efficiency. Highly recommend for intuitive workflow."
  },
  {
    author: {
      name: "Zainab Hussain",
      handle: "@zainabh",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
    },
    text: "Its robust features and quick support have transformed our workflow, making us significantly more efficient."
  },
  {
    author: {
      name: "Farhan Siddiqui",
      handle: "@farhans",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face"
    },
    text: "Our business functions improved with a user-friendly design and positive customer feedback."
  }
]

export const TestimonialsSection = () => {
  return (
    <MarqueeTestimonialsSection
      title="What our users say"
      description="Discover why leaders and teams love working with us to scale their business operations and digital presence."
      testimonials={testimonials}
    />
  )
}
