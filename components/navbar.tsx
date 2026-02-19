"use client";

import Image from "next/image";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Search, User, Menu, ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

/* =======================
   NAV CONFIG
======================= */
const GENRES = [
  { label: "Action", href: "/genre/action" },
  { label: "Drama", href: "/genre/drama" },
];

export function Navbar() {
  const [mobileGenreOpen, setMobileGenreOpen] = useState(false);

  return (
    <header className="w-full border-b border-border/40 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        {/* LEFT */}
        <div className="flex items-center gap-4">
          {/* MOBILE: HAMBURGER */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>

              <SheetContent side="left" className="w-72">
                <nav className="mt-6 space-y-2">
                  {/* Main links */}
                  <Link
                    href="/"
                    className="flex items-center rounded-md px-2 py-2 text-sm font-medium hover:bg-accent"
                  >
                    Beranda
                  </Link>

                  <Link
                    href="/movie"
                    className="flex items-center rounded-md px-2 py-2 text-sm font-medium hover:bg-accent"
                  >
                    Movie
                  </Link>

                  {/* GENRE DROPDOWN (MOBILE) */}
                  <button
                    onClick={() => setMobileGenreOpen((v) => !v)}
                    className="flex w-full items-center justify-between rounded-md px-2 py-2 text-sm font-medium hover:bg-accent"
                  >
                    Genre
                    <ChevronRight
                      className={`h-4 w-4 transition-transform ${
                        mobileGenreOpen ? "rotate-90" : ""
                      }`}
                    />
                  </button>

                  {mobileGenreOpen && (
                    <div className="ml-4 space-y-1 border-l pl-4">
                      {GENRES.map((g) => (
                        <Link
                          key={g.href}
                          href={g.href}
                          className="block rounded-md px-2 py-1 text-sm hover:bg-accent"
                        >
                          {g.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          {/* LOGO */}
          <Image
            src="/logos/Vidary-logo.png"
            alt="Vidary"
            width={120}
            height={40}
            className="object-contain"
            priority
          />

          {/* DESKTOP NAV */}
          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList className="gap-2">
                <NavigationMenuItem>
                  <NavigationMenuLink href="/" className="px-3 py-2">
                    Beranda
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink href="/movie" className="px-3 py-2">
                    Movie
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="flex items-center gap-1 px-3 py-2"
                      >
                        Genre
                        <ChevronDown className="h-4 w-4 opacity-60" />
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="start">
                      {GENRES.map((g) => (
                        <DropdownMenuItem key={g.href} asChild>
                          <Link href={g.href}>{g.label}</Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-2">
          {/* SEARCH */}
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>

          <ModeToggle />

          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
