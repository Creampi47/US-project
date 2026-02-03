"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Heart,
  Menu,
  Search,
  User,
  Activity,
  Stethoscope,
  Globe,
  LayoutDashboard,
  Pill,
  Video,
  AlertTriangle,
  Users,
  DollarSign,
  Apple,
  Trophy,
  ChevronDown,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

const navigation = [
  { name: "Price Search", href: "#search", icon: Search },
  { name: "Symptoms", href: "#symptoms", icon: Stethoscope },
  { name: "Telemedicine", href: "#telemedicine", icon: Video },
  { name: "Emergency", href: "#emergency", icon: AlertTriangle },
];

const moreNavigation = [
  { name: "Prescriptions", href: "#prescriptions", icon: Pill },
  { name: "Clinical Trials", href: "#clinical-trials", icon: Activity },
  { name: "Health Records", href: "#records", icon: LayoutDashboard },
  { name: "Medical Tourism", href: "#tourism", icon: Globe },
  { name: "Community", href: "#community", icon: Users },
  { name: "Financial Tools", href: "#financial", icon: DollarSign },
  { name: "Wellness", href: "#wellness", icon: Apple },
  { name: "Rewards", href: "#rewards", icon: Trophy },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Heart className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-semibold tracking-tight text-foreground">
            ClearCare
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          ))}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1 text-muted-foreground"
              >
                More
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>More Features</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {moreNavigation.map((item) => (
                <DropdownMenuItem key={item.name} asChild>
                  <Link href={item.href} className="flex items-center gap-2">
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            className="hidden text-muted-foreground sm:flex"
          >
            <Activity className="mr-2 h-4 w-4" />
            Connect Device
          </Button>
          <Button size="sm" className="hidden sm:flex">
            <User className="mr-2 h-4 w-4" />
            Sign In
          </Button>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="flex flex-col gap-4 pt-4">
                <Link
                  href="/"
                  className="flex items-center gap-2"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                    <Heart className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <span className="text-xl font-semibold">ClearCare</span>
                </Link>
                <nav className="flex flex-col gap-1 pt-4 max-h-[60vh] overflow-y-auto">
                  {[...navigation, ...moreNavigation].map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                    >
                      <item.icon className="h-5 w-5" />
                      {item.name}
                    </Link>
                  ))}
                </nav>
                <div className="flex flex-col gap-2 pt-4">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Activity className="mr-2 h-4 w-4" />
                    Connect Device
                  </Button>
                  <Button className="w-full justify-start">
                    <User className="mr-2 h-4 w-4" />
                    Sign In
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
