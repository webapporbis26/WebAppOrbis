import { cn } from "@/lib/utils"
import { TestimonialCard, TestimonialAuthor } from "@/components/ui/testimonial-card"
import { useEffect, useRef } from "react"

interface TestimonialsSectionProps {
  title: string
  description: string
  testimonials: Array<{
    author: TestimonialAuthor
    text: string
    href?: string
  }>
  className?: string
}

export function TestimonialsSection({ 
  title,
  description,
  testimonials,
  className 
}: TestimonialsSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
        // If reached the end, scroll back to start
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" })
        } else {
          // Scroll by one card width approximately
          scrollRef.current.scrollBy({ left: clientWidth > 768 ? 400 : clientWidth * 0.85, behavior: "smooth" })
        }
      }
    }, 3500)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <section className={cn(
      "bg-background text-foreground",
      "py-10 sm:py-14 px-0",
      className
    )}>
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 text-center sm:gap-12">
        <div className="flex flex-col items-center gap-4 px-4 sm:gap-8">
          <h2 className="max-w-[720px] text-3xl font-semibold leading-tight sm:text-5xl sm:leading-tight">
            {title}
          </h2>
          <p className="text-md max-w-[600px] font-medium text-muted-foreground sm:text-xl">
            {description}
          </p>
        </div>

        <div className="relative w-full group/testimonials mt-4">
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto gap-4 md:gap-6 snap-x snap-mandatory scrollbar-none pb-4 px-5 sm:px-8 w-full"
          >
            {testimonials.map((testimonial, i) => (
              <div key={i} className="flex-none w-[85%] md:w-[350px] lg:w-[400px] snap-center text-left">
                <TestimonialCard {...testimonial} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
