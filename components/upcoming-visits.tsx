import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, X, Check } from "lucide-react"

// Mock data for upcoming visits
const upcomingVisits = [
  {
    id: 1,
    propertyName: "Modern Apartment in East Legon",
    location: "East Legon, Accra",
    date: "April 15, 2025",
    time: "10:00 AM",
    status: "confirmed",
  },
  {
    id: 2,
    propertyName: "Luxury Villa with Pool",
    location: "Cantonments, Accra",
    date: "April 18, 2025",
    time: "2:30 PM",
    status: "pending",
  },
  {
    id: 3,
    propertyName: "Commercial Space in Business District",
    location: "Airport City, Accra",
    date: "April 20, 2025",
    time: "11:00 AM",
    status: "confirmed",
  },
]

export function UpcomingVisits() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Upcoming Visits</h2>
      <div className="grid gap-4">
        {upcomingVisits.map((visit) => (
          <Card key={visit.id}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{visit.propertyName}</CardTitle>
                <Badge status={visit.status} />
              </div>
              <CardDescription className="flex items-center">
                <MapPin className="mr-1 h-3 w-3" />
                {visit.location}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center text-sm">
                  <Calendar className="mr-1 h-4 w-4 text-muted-foreground" />
                  {visit.date}
                </div>
                <div className="flex items-center text-sm">
                  <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                  {visit.time}
                </div>
                <div className="ml-auto flex gap-2">
                  <Button variant="outline" size="sm">
                    Reschedule
                  </Button>
                  <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                    Cancel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

// Badge component for visit status
function Badge({ status }: { status: string }) {
  if (status === "confirmed") {
    return (
      <div className="flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-100">
        <Check className="mr-1 h-3 w-3" />
        Confirmed
      </div>
    )
  }

  if (status === "pending") {
    return (
      <div className="flex items-center rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100">
        <Clock className="mr-1 h-3 w-3" />
        Pending
      </div>
    )
  }

  return (
    <div className="flex items-center rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-100">
      <X className="mr-1 h-3 w-3" />
      Cancelled
    </div>
  )
}
