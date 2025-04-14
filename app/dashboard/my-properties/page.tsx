import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, Edit, Trash2, Eye, MapPin, Bed, Bath, Square } from "lucide-react"

// Mock data for owner's properties
const myProperties = [
  {
    id: 1,
    title: "Modern Apartment in East Legon",
    price: "₵450,000",
    type: "For Sale",
    status: "active",
    location: "East Legon, Accra",
    bedrooms: 3,
    bathrooms: 2,
    area: "120 m²",
    image: "/placeholder.svg?height=200&width=300",
    views: 245,
    saves: 12,
  },
  {
    id: 2,
    title: "Luxury Villa with Pool",
    price: "₵850,000",
    type: "For Sale",
    status: "pending",
    location: "Cantonments, Accra",
    bedrooms: 5,
    bathrooms: 4,
    area: "350 m²",
    image: "/placeholder.svg?height=200&width=300",
    views: 187,
    saves: 8,
  },
  {
    id: 3,
    title: "Commercial Space in Business District",
    price: "₵2,500/mo",
    type: "For Rent",
    status: "active",
    location: "Airport City, Accra",
    bedrooms: 0,
    bathrooms: 2,
    area: "150 m²",
    image: "/placeholder.svg?height=200&width=300",
    views: 120,
    saves: 5,
  },
]

export default function MyPropertiesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">My Properties</h2>
          <p className="text-muted-foreground">Manage your property listings</p>
        </div>
        <Link href="/dashboard/my-properties/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Property
          </Button>
        </Link>
      </div>

      <div className="grid gap-6">
        {myProperties.map((property) => (
          <Card key={property.id} className="overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="relative h-[200px] w-full md:w-[300px]">
                <Image src={property.image || "/placeholder.svg"} alt={property.title} fill className="object-cover" />
                <StatusBadge status={property.status} className="absolute top-2 right-2" />
              </div>
              <div className="flex flex-1 flex-col">
                <CardHeader>
                  <CardTitle>{property.title}</CardTitle>
                  <CardDescription className="flex items-center">
                    <MapPin className="mr-1 h-3 w-3" />
                    {property.location}
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">{property.price}</div>
                    <Badge variant="outline">{property.type}</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
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
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div>{property.views} views</div>
                    <div>{property.saves} saves</div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex space-x-2">
                    <Link href={`/properties/${property.id}`}>
                      <Button variant="outline" size="sm">
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </Button>
                    </Link>
                    <Link href={`/dashboard/my-properties/${property.id}/edit`}>
                      <Button variant="outline" size="sm">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                    </Link>
                  </div>
                  <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </CardFooter>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

function StatusBadge({ status, className }: { status: string; className?: string }) {
  if (status === "active") {
    return <Badge className={`bg-green-500 hover:bg-green-600 ${className}`}>Active</Badge>
  }

  if (status === "pending") {
    return <Badge className={`bg-yellow-500 hover:bg-yellow-600 ${className}`}>Pending Approval</Badge>
  }

  return <Badge className={`bg-red-500 hover:bg-red-600 ${className}`}>Inactive</Badge>
}
