import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-background to-muted">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Find Your Dream Home with HomeHive
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Discover the perfect property for your needs. Whether you're looking to buy, rent, or invest, HomeHive
                has you covered with the best listings in Ghana.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/register">
                <Button size="lg" className="w-full">
                  Get Started
                </Button>
              </Link>
              <Link href="/properties">
                <Button size="lg" variant="outline" className="w-full">
                  Browse Properties
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="w-full max-w-md space-y-2 bg-background p-4 rounded-lg shadow-lg">
              <div className="text-lg font-semibold">Quick Search</div>
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <label htmlFor="location" className="text-sm font-medium leading-none">
                      Location
                    </label>
                    <Input id="location" placeholder="Accra, Ghana" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="property-type" className="text-sm font-medium leading-none">
                      Property Type
                    </label>
                    <select
                      id="property-type"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="">Any</option>
                      <option value="apartment">Apartment</option>
                      <option value="house">House</option>
                      <option value="land">Land</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <label htmlFor="min-price" className="text-sm font-medium leading-none">
                      Min Price
                    </label>
                    <Input id="min-price" placeholder="₵0" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="max-price" className="text-sm font-medium leading-none">
                      Max Price
                    </label>
                    <Input id="max-price" placeholder="₵1,000,000" />
                  </div>
                </div>
                <Button className="w-full">
                  <Search className="mr-2 h-4 w-4" />
                  Search Properties
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
