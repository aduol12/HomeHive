"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { MapPin, Bed, Bath, Square, Search, SlidersHorizontal, Heart } from 'lucide-react'

interface Property {
  id: number;
  title: string;
  description: string;
  price: number;
  location: string;
  address: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
  ownerId: number;
}

interface SelectOption {
  id: string | number;
  label: string;
  value?: string;
}

async function getProperties(): Promise<Property[]> {
  const res = await fetch('/api/properties')
  if (!res.ok) {
    throw new Error('Failed to fetch properties')
  }
  return res.json()
}

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([])
  
  useEffect(() => {
    getProperties()
      .then(data => setProperties(data))
      .catch(error => console.error('Error fetching properties:', error))
  }, [])

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Properties</h1>
      
      {properties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <div key={property.id} className="border rounded-lg p-4">
              <h2 className="text-xl font-semibold">{property.title}</h2>
              <p className="text-gray-600">{property.address}</p>
              <p className="text-lg font-bold">${property.price.toString()}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No properties found.</p>
      )}
    </div>
  )
}