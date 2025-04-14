import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Quote } from "lucide-react"

// Mock data for testimonials
const testimonials = [
  {
    id: 1,
    quote: "HomeHive made finding my dream apartment incredibly easy. The scheduling feature saved me so much time!",
    name: "Kwame Mensah",
    role: "Property Buyer",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 2,
    quote:
      "As a property owner, I've been able to reach more potential buyers through HomeHive than any other platform.",
    name: "Abena Osei",
    role: "Property Owner",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 3,
    quote: "The investment analysis tools helped me make a confident decision on my first real estate investment.",
    name: "Daniel Agyei",
    role: "Investor",
    avatar: "/placeholder.svg?height=80&width=80",
  },
]

export function Testimonials() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">What Our Users Say</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Hear from people who have found success with HomeHive
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 mt-12">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="relative overflow-hidden">
              <CardContent className="p-6">
                <Quote className="h-8 w-8 text-muted-foreground/50 mb-4" />
                <p className="text-lg">{testimonial.quote}</p>
              </CardContent>
              <CardFooter className="p-6 pt-0 flex items-center space-x-4">
                <div className="relative h-10 w-10 rounded-full overflow-hidden">
                  <Image
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="font-medium">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
