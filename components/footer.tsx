import Link from "next/link";
import { Facebook, Github, Instagram, Linkedin, Youtube } from "lucide-react";
import { PWAInstallButton } from "@/app/components/InstallButton";

export function Footer() {
  return (
    <footer className="bg-secondary">
      <div className="container mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About NRLIT</h3>
            <p className="text-sm text-muted-foreground">
              NRLIT is your one-stop shop for digital products, offering a wide
              range of tools for streaming, learning, creativity, and more.
            </p>
            <div className="mt-4">
              <PWAInstallButton />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/return-refunds"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-service"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/categories/streaming"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Streaming
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/learning"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Learning
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/creativity"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Creativity
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/utility"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Utility
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/service"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Service
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/others"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Others
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/nrlitbd"
                target="_blank"
                aria-label="Facebook"
                className="text-muted-foreground hover:text-primary"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="https://www.instagram.com/nrlitbd"
                target="_blank"
                aria-label="Instagram"
                className="text-muted-foreground hover:text-primary"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="https://www.linkedin.com/company/nrlit"
                target="_blank"
                aria-label="Linkedin"
                className="text-muted-foreground hover:text-primary"
              >
                <Linkedin className="h-6 w-6" />
              </a>

              <a
                href="https://github.com/nrlit"
                target="_blank"
                aria-label="Github"
                className="text-muted-foreground hover:text-primary"
              >
                <Github className="h-6 w-6" />
              </a>
              <a
                href="https://www.youtube.com/@NRLIT"
                target="_blank"
                aria-label="Youtube"
                className="text-muted-foreground hover:text-primary"
              >
                <Youtube className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-muted">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} NRLIT Store. All rights reserved. Created by NRLIT.
          </p>
        </div>
      </div>
    </footer>
  );
}
