import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Bed, Bath, Square, Heart } from "lucide-react"

// Mock data for recent properties
const recentProperties = [
  {
    id: 1,
    title: "Modern Apartment in East Legon",
    price: "₵450,000",
    type: "For Sale",
    location: "East Legon, Accra",
    bedrooms: 3,
    bathrooms: 2,
    area: "120 m²",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    title: "Luxury Villa with Pool",
    price: "₵850,000",
    type: "For Sale",
    location: "Cantonments, Accra",
    bedrooms: 5,
    bathrooms: 4,
    area: "350 m²",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    title: "Cozy Studio for Rent",
    price: "₵1,200/mo",
    type: "For Rent",
    location: "Osu, Accra",
    bedrooms: 1,
    bathrooms: 1,
    area: "45 m²",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 4,
    title: "Commercial Space in Business District",
    price: "₵2,500/mo",
    type: "For Rent",
    location: "Airport City, Accra",
    bedrooms: 0,
    bathrooms: 2,
    area: "150 m²",
    image: "/placeholder.svg?height=200&width=300",
  },
]

export function RecentProperties() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Recent Properties</h2>
        <Link href="/properties">
          <Button variant="outline">View All</Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {recentProperties.map((property) => (
          <Card key={property.id} className="overflow-hidden">
            <div className="relative">
              <Image
                src={property.image || "/placeholder.svg"}
                alt={property.title}
                width={300}
                height={200}
                className="h-[200px] w-full object-cover"
              />
              <Badge className="absolute top-2 right-2">{property.type}</Badge>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 left-2 h-8 w-8 rounded-full bg-white/80 text-rose-500 hover:bg-white hover:text-rose-600"
              >
                <Heart className="h-4 w-4" />
                <span className="sr-only">Save property</span>
              </Button>
            </div>
            <CardHeader className="p-4">
              <CardTitle className="line-clamp-1 text-lg">{property.title}</CardTitle>
              <CardDescription className="flex items-center">
                <MapPin className="mr-1 h-3 w-3" />
                {property.location}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-xl font-bold">{property.price}</div>
              <div className="mt-2 flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <Bed className="mr-1 h-4 w-4" />
                  {property.bedrooms} {property.bedrooms === 1 ? "Bed" : "Beds"}
                </div>
                <div className="flex items-center">
                  <Bath className="mr-1 h-4 w-4" />
                  {property.bathrooms} {property.bathrooms === 1 ? "Bath" : "Baths"}
                </div>
                <div className="flex items-center">
                  <Square className="mr-1 h-4 w-4" />
                  {property.area}
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Link href={`/properties/${property.id}`} className="w-full">
                <Button variant="outline" className="w-full">
                  View Details
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
