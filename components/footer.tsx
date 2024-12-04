import Link from "next/link"
import { Facebook, Twitter, Instagram, GitlabIcon as GitHub } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About NRLIT</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              NRLIT is your one-stop shop for digital products, offering a wide range of tools for streaming, learning, creativity, and more.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary">About Us</Link></li>
              <li><Link href="/contact" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary">Contact</Link></li>
              <li><Link href="/faq" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary">FAQ</Link></li>
              <li><Link href="/terms" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary">Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li><Link href="/categories/streaming" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary">Streaming</Link></li>
              <li><Link href="/categories/learning" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary">Learning</Link></li>
              <li><Link href="/categories/creativity" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary">Creativity</Link></li>
              <li><Link href="/categories/utility" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary">Utility</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary"><Facebook className="h-6 w-6" /></a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary"><Twitter className="h-6 w-6" /></a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary"><Instagram className="h-6 w-6" /></a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary"><GitHub className="h-6 w-6" /></a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            © 2024 NRLIT. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

