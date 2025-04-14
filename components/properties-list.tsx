"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Edit, Trash2, CheckCircle, XCircle, Eye, MoreHorizontal, MapPin } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock data for properties
const properties = [
  {
    id: 1,
    title: "Modern Apartment in East Legon",
    owner: "Sarah Smith",
    type: "Apartment",
    status: "active",
    price: "₵450,000",
    location: "East Legon, Accra",
    listedDate: "Jan 15, 2025",
  },
  {
    id: 2,
    title: "Luxury Villa with Pool",
    owner: "David Wilson",
    type: "Villa",
    status: "active",
    price: "₵850,000",
    location: "Cantonments, Accra",
    listedDate: "Feb 3, 2025",
  },
  {
    id: 3,
    title: "Cozy Studio for Rent",
    owner: "Emily Brown",
    type: "Studio",
    status: "pending",
    price: "₵1,200/mo",
    location: "Osu, Accra",
    listedDate: "Mar 10, 2025",
  },
  {
    id: 4,
    title: "Commercial Space in Business District",
    owner: "Michael Johnson",
    type: "Commercial",
    status: "active",
    price: "₵2,500/mo",
    location: "Airport City, Accra",
    listedDate: "Jan 22, 2025",
  },
  {
    id: 5,
    title: "Family Home with Garden",
    owner: "Jennifer Adams",
    type: "House",
    status: "inactive",
    price: "₵650,000",
    location: "Adenta, Accra",
    listedDate: "Feb 18, 2025",
  },
]

export function PropertiesList() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredProperties = properties.filter(
    (property) =>
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Properties Management</h3>
          <p className="text-sm text-muted-foreground">Manage property listings and approvals</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search properties..."
              className="pl-9 w-[250px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button>Add Property</Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Property</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Listed Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProperties.map((property) => (
              <TableRow key={property.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{property.title}</div>
                    <div className="text-xs text-muted-foreground flex items-center">
                      <MapPin className="mr-1 h-3 w-3" />
                      {property.location}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{property.owner}</TableCell>
                <TableCell>{property.type}</TableCell>
                <TableCell>{property.price}</TableCell>
                <TableCell>
                  <StatusBadge status={property.status} />
                </TableCell>
                <TableCell>{property.listedDate}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      {property.status === "pending" && (
                        <DropdownMenuItem>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Approve
                        </DropdownMenuItem>
                      )}
                      {property.status === "active" && (
                        <DropdownMenuItem>
                          <XCircle className="mr-2 h-4 w-4" />
                          Deactivate
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  if (status === "active") {
    return (
      <Badge
        variant="outline"
        className="bg-green-100 text-green-800 hover:bg-green-100 hover:text-green-800 dark:bg-green-900 dark:text-green-100"
      >
        Active
      </Badge>
    )
  }

  if (status === "pending") {
    return (
      <Badge
        variant="outline"
        className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 hover:text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
      >
        Pending
      </Badge>
    )
  }

  return (
    <Badge
      variant="outline"
      className="bg-red-100 text-red-800 hover:bg-red-100 hover:text-red-800 dark:bg-red-900 dark:text-red-100"
    >
      Inactive
    </Badge>
  )
}
