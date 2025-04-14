import { Search, Home, Calendar, BarChart } from "lucide-react"

export function HowItWorks() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">How HomeHive Works</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Simple steps to find your perfect property or list your real estate
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 mt-12">
          <div className="flex flex-col items-center space-y-2 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Search className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold">Search</h3>
            <p className="text-muted-foreground">Browse our extensive catalog of properties with advanced filters</p>
          </div>
          <div className="flex flex-col items-center space-y-2 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Home className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold">Discover</h3>
            <p className="text-muted-foreground">Explore detailed listings with photos, maps, and neighborhood info</p>
          </div>
          <div className="flex flex-col items-center space-y-2 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Calendar className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold">Schedule</h3>
            <p className="text-muted-foreground">Book property viewings directly through our platform</p>
          </div>
          <div className="flex flex-col items-center space-y-2 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <BarChart className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold">Analyze</h3>
            <p className="text-muted-foreground">Make informed decisions with our investment analysis tools</p>
          </div>
        </div>
      </div>
    </section>
  )
}
