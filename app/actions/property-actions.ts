'use server'

import { revalidatePath } from 'next/cache'
import prisma from '@/lib/prisma'

interface PropertyFormData {
  ownerId: number
  title: string
  description: string
  price: number
  propertyType: string
  listingType: string
  bedrooms: number
  bathrooms: number
  area: number
  address: string
  city: string
  neighborhood: string
  yearBuilt: number
  amenities: string[]
  images: { url: string; isPrimary: boolean }[]
}

export async function createProperty(data: PropertyFormData) {
  try {
    const property = await prisma.property.create({
      data: {
        ownerId: data.ownerId,
        title: data.title,
        description: data.description,
        price: data.price,
        propertyType: data.propertyType,
        listingType: data.listingType,
        bedrooms: data.bedrooms,
        bathrooms: data.bathrooms,
        area: data.area,
        address: data.address,
        city: data.city,
        neighborhood: data.neighborhood,
        yearBuilt: data.yearBuilt,
        status: 'pending',
        amenities: {
          create: data.amenities.map(amenity => ({
            amenity
          }))
        },
        images: {
          create: data.images.map(image => ({
            imageUrl: image.url,
            isPrimary: image.isPrimary
          }))
        }
      }
    })

    revalidatePath('/dashboard/my-properties')
    revalidatePath('/properties')
    
    return { success: true, property }
  } catch (error) {
    console.error('Error creating property:', error)
    return { success: false, error: 'Failed to create property' }
  }
}

export async function scheduleVisit(userId: number, propertyId: number, visitDate: Date, visitTime: string, notes?: string) {
  try {
    // Convert time string to Date object for the time portion
    const [hours, minutes] = visitTime.split(':').map(Number)
    const timeDate = new Date()
    timeDate.setHours(hours, minutes, 0, 0)
    
    const visit = await prisma.propertyVisit.create({
      data: {
        userId,
        propertyId,
        visitDate,
        visitTime: timeDate,
        notes,
        status: 'pending'
      }
    })
    
    revalidatePath('/dashboard/visits')
    
    return { success: true, visit }
  } catch (error) {
    console.error('Error scheduling visit:', error)
    return { success: false, error: 'Failed to schedule visit' }
  }
}