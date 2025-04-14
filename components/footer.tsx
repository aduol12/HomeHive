import Link from "next/link"
import { Home, Mail, Phone, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container px-4 py-12 md:px-6 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Home className="h-6 w-6" />
              <span className="font-bold text-xl">HomeHive</span>
            </div>
            <p className="text-muted-foreground">Finding your perfect home in Ghana has never been easier.</p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/properties" className="text-muted-foreground hover:text-foreground">
                  Properties
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-foreground">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Property Types</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/properties?type=apartment" className="text-muted-foreground hover:text-foreground">
                  Apartments
                </Link>
              </li>
              <li>
                <Link href="/properties?type=house" className="text-muted-foreground hover:text-foreground">
                  Houses
                </Link>
              </li>
              <li>
                <Link href="/properties?type=land" className="text-muted-foreground hover:text-foreground">
                  Land
                </Link>
              </li>
              <li>
                <Link href="/properties?type=commercial" className="text-muted-foreground hover:text-foreground">
                  Commercial
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-start space-x-2">
                <Mail className="h-5 w-5 mt-0.5 text-muted-foreground" />
                <span className="text-muted-foreground">info@homehive.com</span>
              </li>
              <li className="flex items-start space-x-2">
                <Phone className="h-5 w-5 mt-0.5 text-muted-foreground" />
                <span className="text-muted-foreground">+233 20 123 4567</span>
              </li>
              <li className="flex items-start space-x-2">
                <Home className="h-5 w-5 mt-0.5 text-muted-foreground" />
                <span className="text-muted-foreground">123 Independence Avenue, Accra, Ghana</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t pt-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} HomeHive. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
