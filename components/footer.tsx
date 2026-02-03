import Link from "next/link";
import { Heart, Shield, Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const footerLinks = {
  Product: [
    { name: "Price Search", href: "#search" },
    { name: "Symptom Checker", href: "#symptoms" },
    { name: "Health Dashboard", href: "#dashboard" },
    { name: "Medical Tourism", href: "#tourism" },
    { name: "Mobile App", href: "#" },
  ],
  Resources: [
    { name: "Help Center", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Cost Guides", href: "#" },
    { name: "Insurance FAQ", href: "#" },
    { name: "Provider Network", href: "#" },
  ],
  Company: [
    { name: "About Us", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Press", href: "#" },
    { name: "Partners", href: "#" },
    { name: "Contact", href: "#" },
  ],
  Legal: [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "HIPAA Compliance", href: "#" },
    { name: "Cookie Policy", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      {/* Newsletter Section */}
      <div className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
            <div>
              <h3 className="text-xl font-semibold text-foreground">
                Stay informed about healthcare costs
              </h3>
              <p className="mt-2 text-muted-foreground">
                Get weekly insights on saving money on medical care.
              </p>
            </div>
            <div className="flex w-full max-w-md gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1"
              />
              <Button>
                <Mail className="mr-2 h-4 w-4" />
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-6">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <Heart className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-semibold text-foreground">
                ClearCare
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Empowering patients with transparent healthcare pricing and
              quality information to make informed decisions.
            </p>

            {/* Trust Badges */}
            <div className="mt-6 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm">
                <Shield className="h-4 w-4 text-accent" />
                <span className="text-muted-foreground">HIPAA Compliant</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm">
                <Lock className="h-4 w-4 text-accent" />
                <span className="text-muted-foreground">256-bit Encrypted</span>
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-foreground">{category}</h4>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} ClearCare. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            ClearCare is not a substitute for professional medical advice. Always
            consult with a qualified healthcare provider.
          </p>
        </div>
      </div>
    </footer>
  );
}
