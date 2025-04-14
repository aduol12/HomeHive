import Link from "next/link"
import { Home } from "lucide-react"

export function MainNav() {
  return (
    <div className="flex items-center space-x-4 lg:space-x-6">
      <Link href="/" className="flex items-center space-x-2">
        <Home className="h-6 w-6" />
        <span className="font-bold text-xl">HomeHive</span>
      </Link>
      <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
        <Link href="/properties" className="text-sm font-medium transition-colors hover:text-primary">
          Properties
        </Link>
        <Link href="/about" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
          About
        </Link>
        <Link
          href="/contact"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Contact
        </Link>
      </nav>
    </div>
  )
}
