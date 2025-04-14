"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Bed, Bath, Square } from 'lucide-react'

interface PropertyImage {
  id: number
  imageUrl: string
  isPrimary: boolean
}

interface Property {
  id: number
  title: string
  price: number
  listingType: string
  location: string
  city: string
  neighborhood: string
  bedrooms: number | null
  bathrooms: number | null
  area: number | null
  images: PropertyImage[]
}

export function FeaturedProperties() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProperties() {
      try {
        const response = await fetch('/api/properties')
        const data = await response.json()
        setProperties(data.properties.slice(0, 3)) // Get first 3 properties
      } catch (error) {
        console.error('Error fetching properties:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProperties()
  }, [])

  if (loading) {
    return (
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Featured Properties</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Loading properties...
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Featured Properties</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Explore our handpicked selection of premium properties across Ghana
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
          {properties.map((property) => {
            const primaryImage = property.images.find(img => img.isPrimary) || property.images[0]
            const imageUrl = primaryImage?.imageUrl || "/placeholder.svg?height=300&width=400"
            const location = property.neighborhood ? `${property.neighborhood}, ${property.city}` : property.city
            const listingType = property.listingType === 'sale' ? 'For Sale' : 'For Rent'
            
            return (
              <Link href={`/properties/${property.id}`} key={property.id} className="group">
                <Card className="overflow-hidden transition-all hover:shadow-lg">
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={imageUrl || "/placeholder.svg"}
                      alt={property.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                    <Badge className="absolute top-2 right-2">{listingType}</Badge>
                  </div>
                  <CardHeader className="p-4">
                    <CardTitle className="line-clamp-1">{property.title}</CardTitle>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="mr-1 h-4 w-4" />
                      {location}
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="text-xl font-bold">₵{property.price.toLocaleString()}</div>
                    <div className="mt-2 flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <Bed className="mr-1 h-4 w-4" />
                        {property.bedrooms || 0} Beds
                      </div>
                      <div className="flex items-center">
                        <Bath className="mr-1 h-4 w-4" />
                        {property.bathrooms || 0} Baths
                      </div>
                      <div className="flex items-center">
                        <Square className="mr-1 h-4 w-4" />
                        {property.area || 0} m²
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
        <div className="flex justify-center mt-8">
          <Link href="/properties">
            <Badge variant="outline" className="text-base py-2 px-4">
              View All Properties
            </Badge>
          </Link>
        </div>
      </div>
    </section>
  )
}