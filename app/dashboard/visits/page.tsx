'use client'

import { useEffect, useState } from 'react'
import { PropertyVisit } from '@prisma/client'
import { Dialog, DialogContent, DialogTitle } from '@mui/material'

interface VisitWithRelations extends PropertyVisit {
  property: {
    id: number
    title: string
    address: string
  }
  user: {
    id: number
    name: string
    email: string
  }
}

export default function VisitsPage() {
  const [visits, setVisits] = useState<VisitWithRelations[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchVisits = async () => {
      try {
        const response = await fetch('/api/visits')
        console.log('API Response:', response)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        console.log('Parsed Data:', data)
        
        if (!data) {
          console.warn('No data received from API')
          setVisits([])
          return
        }
        
        if (!Array.isArray(data)) {
          console.warn('Received data is not an array:', data)
          setVisits([])
          return
        }
        
        const visitsArray = Array.isArray(data) ? data : []
        setVisits(visitsArray.slice(0, 5))
      } catch (error: unknown) {
        console.error('Error fetching visits:', error)
        if (error instanceof Error) {
          console.error('Error details:', {
            message: error.message,
            stack: error.stack
          })
        }
        setVisits([])
      } finally {
        setLoading(false)
      }
    }

    fetchVisits()
  }, [])

  if (loading) return <div className="p-6">Loading...</div>
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Property Visits</h1>
      <div className="grid gap-4">
        {visits.map((visit) => (
          <div key={visit.id} className="border p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="font-semibold text-lg">{visit.property.title}</h2>
                <p className="text-gray-600">{visit.property.address}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${
                visit.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                visit.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {visit.status}
              </span>
            </div>
            <div className="mt-4">
              <p><span className="font-medium">Visitor:</span> {visit.user.name}</p>
              <p><span className="font-medium">Date:</span> {new Date(visit.visitDate).toLocaleDateString()}</p>
              <p><span className="font-medium">Time:</span> {new Date(visit.visitTime).toLocaleTimeString()}</p>
              {visit.notes && (
                <p className="mt-2"><span className="font-medium">Notes:</span> {visit.notes}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 