"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { MapPin, Bed, Bath, Square, Heart, Share2, Phone, Mail, Check } from 'lucide-react'

interface PropertyImage {
  id: number
  imageUrl: string
  isPrimary: boolean
}

interface PropertyAmenity {
  id: number
  amenity: string
}

interface PropertyOwner {
  id: number
  name: string
  email: string
  phone: string | null
  profileImage: string | null
}

interface Property {
  id: number
  title: string
  description: string | null
  price: number
  propertyType: string
  listingType: string
  status: string
  bedrooms: number | null
  bathrooms: number | null
  area: number | null
  address: string
  city: string
  neighborhood: string | null
  yearBuilt: number | null
  images: PropertyImage[]
  amenities: PropertyAmenity[]
  owner: PropertyOwner
}

export default function PropertyDetailPage({ params }: { params: { id: string } }) {
  const [property, setProperty] = useState<Property | null>(null)
  const [loading, setLoading] = useState(true)
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedImage, setSelectedImage] = useState(0)

  useEffect(() => {
    async function fetchProperty() {
      try {
        setLoading(true)
        const response = await fetch(`/api/properties/${params.id}`)
        
        if (!response.ok) {
          throw new Error('Property not found')
        }
        
        const data = await response.json()
        setProperty(data.property)
      } catch (error) {
        console.error('Error fetching property:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProperty()
  }, [params.id])

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center">
            <MainNav />
            <div className="ml-auto flex items-center space-x-4">
              <Link href="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/register">
                <Button>Register</Button>
              </Link>
            </div>
          </div>
        </header>
        <main className="flex-1 container py-12">
          <div className="text-center">
            <p className="text-muted-foreground">Loading property details...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!property) {
    return (
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center">
            <MainNav />
            <div className="ml-auto flex items-center space-x-4">
              <Link href="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/register">
                <Button>Register</Button>
              </Link>
            </div>
          </div>
        </header>
        <main className="flex-1 container py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Property Not Found</h1>
            <p className="text-muted-foreground mb-6">The property you're looking for doesn't exist or has been removed.</p>
            <Link href="/properties">
              <Button>Browse Properties</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const listingType = property.listingType === 'sale' ? 'For Sale' : 'For Rent'
  const location = property.neighborhood ? `${property.neighborhood}, ${property.city}` : property.city

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <MainNav />
          <div className="ml-auto flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/register">
              <Button>Register</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-8">
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold">{property.title}</h1>
                <div className="flex items-center mt-1 text-muted-foreground">
                  <MapPin className="mr-1 h-4 w-4" />
                  {location}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Heart className="mr-2 h-4 w-4" />
                  Save
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-8">
              {/* Property Images */}
              <div className="space-y-4">
                <div className="relative aspect-video overflow-hidden rounded-lg">
                  <Image
                    src={property.images[selectedImage]?.imageUrl || "/placeholder.svg?height=500&width=800"}
                    alt={property.title}
                    fill
                    className="object-cover"
                  />
                  <Badge className="absolute top-4 right-4">{listingType}</Badge>
                </div>
                <div className="grid grid-cols-4 gap-4">
                  {property.images.map((image, index) => (
                    <div
                      key={image.id}
                      className={`relative aspect-video cursor-pointer overflow-hidden rounded-md ${
                        selectedImage === index ? "ring-2 ring-primary" : ""
                      }`}
                      onClick={() => setSelectedImage(index)}
                    >
                      <Image
                        src={image.imageUrl || "/placeholder.svg"}
                        alt={`${property.title} - Image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Property Details */}
              <Tabs defaultValue="details">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="amenities">Amenities</TabsTrigger>
                  <TabsTrigger value="location">Location</TabsTrigger>
                </TabsList>
                <TabsContent value="details" className="space-y-6 pt-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Property Description</h3>
                    <p className="text-muted-foreground">{property.description}</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Property Details</h3>
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                      <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground">Property ID</span>
                        <span className="font-medium">{property.id}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground">Price</span>
                        <span className="font-medium">₵{property.price.toLocaleString()}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground">Property Type</span>
                        <span className="font-medium">{property.propertyType}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground">Status</span>
                        <span className="font-medium">{listingType}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground">Area</span>
                        <span className="font-medium">{property.area} m²</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground">Bedrooms</span>
                        <span className="font-medium">{property.bedrooms}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground">Bathrooms</span>
                        <span className="font-medium">{property.bathrooms}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground">Year Built</span>
                        <span className="font-medium">{property.yearBuilt || 'N/A'}</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="amenities" className="pt-4">
                  <h3 className="text-xl font-semibold mb-4">Amenities & Features</h3>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
                    {property.amenities.map((amenity) => (
                      <div key={amenity.id} className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        <span>{amenity.amenity}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="location" className="pt-4">
                  <h3 className="text-xl font-semibold mb-4">Location</h3>
                  <div className="aspect-video rounded-md border bg-muted flex items-center justify-center">
                    <div className="text-muted-foreground flex flex-col items-center">
                      <MapPin className="h-8 w-8 mb-2" />
                      <p>Map will be displayed here</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Address</h4>
                    <p className="text-muted-foreground">
                      {property.address}, {location}
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div className="space-y-6">
              {/* Price Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-3xl font-bold">₵{property.price.toLocaleString()}</CardTitle>
                  <CardDescription>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center">
                        <Bed className="mr-1 h-4 w-4" />
                        {property.bedrooms} Beds
                      </div>
                      <div className="flex items-center">
                        <Bath className="mr-1 h-4 w-4" />
                        {property.bathrooms} Baths
                      </div>
                      <div className="flex items-center">
                        <Square className="mr-1 h-4 w-4" />
                        {property.area} m²
                      </div>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full">Schedule a Visit</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Schedule a Visit</DialogTitle>
                        <DialogDescription>Select a date and time to visit this property</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            className="rounded-md border mx-auto"
                          />
                        </div>
                        <div className="grid gap-2">
                          <label htmlFor="time" className="text-sm font-medium">
                            Preferred Time
                          </label>
                          <select
                            id="time"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <option value="09:00">9:00 AM</option>
                            <option value="10:00">10:00 AM</option>
                            <option value="11:00">11:00 AM</option>
                            <option value="12:00">12:00 PM</option>
                            <option value="13:00">1:00 PM</option>
                            <option value="14:00">2:00 PM</option>
                            <option value="15:00">3:00 PM</option>
                            <option value="16:00">4:00 PM</option>
                            <option value="17:00">5:00 PM</option>
                          </select>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Confirm Visit</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>

              {/* Owner Card */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Property Owner</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4">
                    <div className="relative h-12 w-12 rounded-full overflow-hidden">
                      <Image
                        src={property.owner.profileImage || "/placeholder.svg?height=80&width=80"}
                        alt={property.owner.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-medium">{property.owner.name}</div>
                      <div className="text-sm text-muted-foreground">Property Owner</div>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center">
                      <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{property.owner.phone || 'Not provided'}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{property.owner.email}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Contact Owner
                  </Button>
                </CardFooter>
              </Card>

              {/* Investment Analysis Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Investment Analysis</CardTitle>
                  <CardDescription>Analyze this property as an investment</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Estimated ROI</span>
                    <span className="font-medium">8.5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Rental Yield</span>
                    <span className="font-medium">7.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Appreciation (5yr)</span>
                    <span className="font-medium">22%</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href="/dashboard/investment" className="w-full">
                    <Button variant="outline" className="w-full">
                      Full Analysis
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}