"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Upload, Plus, Minus } from "lucide-react"

export default function NewPropertyPage() {
  const router = useRouter()
  const [images, setImages] = useState<string[]>([])
  const [amenities, setAmenities] = useState<string[]>([""])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, we would handle form submission here
    // For now, just redirect to the dashboard
    router.push("/dashboard/my-properties")
  }

  const handleAddAmenity = () => {
    setAmenities([...amenities, ""])
  }

  const handleRemoveAmenity = (index: number) => {
    const newAmenities = [...amenities]
    newAmenities.splice(index, 1)
    setAmenities(newAmenities)
  }

  const handleAmenityChange = (index: number, value: string) => {
    const newAmenities = [...amenities]
    newAmenities[index] = value
    setAmenities(newAmenities)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Add New Property</h2>
        <p className="text-muted-foreground">Fill in the details below to list your property on HomeHive</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Provide the basic details about your property</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Property Title</Label>
              <Input id="title" placeholder="e.g. Modern Apartment in East Legon" required />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="type">Property Type</Label>
                <Select>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="villa">Villa</SelectItem>
                    <SelectItem value="land">Land</SelectItem>
                    <SelectItem value="commercial">Commercial</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Listing Status</Label>
                <Select>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sale">For Sale</SelectItem>
                    <SelectItem value="rent">For Rent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="price">Price (₵)</Label>
                <Input id="price" type="number" placeholder="e.g. 450000" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="area">Area (m²)</Label>
                <Input id="area" type="number" placeholder="e.g. 120" required />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="bedrooms">Bedrooms</Label>
                <Input id="bedrooms" type="number" placeholder="e.g. 3" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bathrooms">Bathrooms</Label>
                <Input id="bathrooms" type="number" placeholder="e.g. 2" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="garages">Garages</Label>
                <Input id="garages" type="number" placeholder="e.g. 1" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your property in detail..."
                className="min-h-[150px]"
                required
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Location</CardTitle>
            <CardDescription>Provide the location details of your property</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <div className="flex space-x-2">
                <Input id="address" placeholder="Start typing address..." className="flex-1" required />
                <Button type="button" variant="outline" size="icon">
                  <MapPin className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">Use the map pin to select the exact location</p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" placeholder="e.g. Accra" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="neighborhood">Neighborhood</Label>
                <Input id="neighborhood" placeholder="e.g. East Legon" required />
              </div>
            </div>

            <div className="h-[200px] rounded-md border border-input bg-muted flex items-center justify-center">
              <div className="text-muted-foreground flex flex-col items-center">
                <MapPin className="h-8 w-8 mb-2" />
                <p>Map will be displayed here</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Amenities</CardTitle>
            <CardDescription>List the amenities and features of your property</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {amenities.map((amenity, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Input
                  value={amenity}
                  onChange={(e) => handleAmenityChange(index, e.target.value)}
                  placeholder="e.g. Swimming Pool, Air Conditioning, etc."
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => handleRemoveAmenity(index)}
                  disabled={amenities.length === 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
              </div>
            ))}

            <Button type="button" variant="outline" size="sm" className="mt-2" onClick={handleAddAmenity}>
              <Plus className="h-4 w-4 mr-2" />
              Add Amenity
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Images</CardTitle>
            <CardDescription>Upload images of your property (minimum 3 recommended)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              <div className="relative aspect-square rounded-md border border-dashed border-input bg-muted hover:bg-accent/40 transition-colors flex flex-col items-center justify-center cursor-pointer">
                <Upload className="h-8 w-8 mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Click to upload</p>
                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" multiple />
              </div>

              {/* Placeholder for uploaded images */}
              {[1, 2, 3].map((_, index) => (
                <div
                  key={index}
                  className="relative aspect-square rounded-md border border-input bg-muted flex items-center justify-center"
                >
                  <p className="text-sm text-muted-foreground">Image preview</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit">Create Listing</Button>
        </div>
      </form>
    </div>
  )
}
