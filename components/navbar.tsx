"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
import { Menu, ChevronDown, ChevronRight, User, Search } from "lucide-react";
import { useState } from "react";
import { SearchBar } from "@/components/SearchBar";

const GENRES = [
  { label: "Action", href: "/genre/action" },
  { label: "Adventure", href: "/genre/adventure" },
  { label: "Comedy", href: "/genre/comedy" },
  { label: "Drama", href: "/genre/drama" },
  { label: "Fantasy", href: "/genre/fantasy" },
  { label: "Romance", href: "/genre/romance" },
  { label: "Sci-Fi", href: "/genre/sci-fi" },
];

export function Navbar() {
  const router = useRouter();
  const [mobileGenreOpen, setMobileGenreOpen] = useState(false);

  return (
    <header className="w-full border-b border-border/40 bg-background/80 backdrop-blur sticky top-0 z-50">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        {/* ── LEFT ── */}
        <div className="flex items-center gap-4">
          {/* MOBILE HAMBURGER */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>

              <SheetContent side="left" className="w-72">
                <div className="mt-2 mb-6">
                  <Image
                    src="/logos/Vidary-logo.png"
                    alt="Vidary"
                    width={100}
                    height={32}
                    className="object-contain"
                  />
                </div>

                {/* Mobile SearchBar */}
                <div className="mb-5">
                  <SearchBar />
                </div>

                <nav className="space-y-1">
                  <Link
                    href="/"
                    className="flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent transition-colors"
                  >
                    Beranda
                  </Link>
                  <Link
                    href="/movie"
                    className="flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent transition-colors"
                  >
                    Movie
                  </Link>

                  <button
                    onClick={() => setMobileGenreOpen((v) => !v)}
                    className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium hover:bg-accent transition-colors"
                  >
                    Genre
                    <ChevronRight
                      className={`h-4 w-4 transition-transform duration-200 ${
                        mobileGenreOpen ? "rotate-90" : ""
                      }`}
                    />
                  </button>

                  {mobileGenreOpen && (
                    <div className="ml-3 space-y-1 border-l border-border pl-4">
                      {GENRES.map((g) => (
                        <Link
                          key={g.href}
                          href={g.href}
                          className="block rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
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
          <Link href="/" className="shrink-0">
            <Image
              src="/logos/Vidary-logo.png"
              alt="Vidary"
              width={120}
              height={40}
              className="object-contain"
              priority
            />
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList className="gap-1">
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/"
                    className="px-3 py-2 text-sm font-medium"
                  >
                    Beranda
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/movie"
                    className="px-3 py-2 text-sm font-medium"
                  >
                    Movie
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="gap-1 font-medium"
                      >
                        Genre
                        <ChevronDown className="h-3.5 w-3.5 opacity-60" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-40">
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
          </nav>
        </div>

        {/* ── RIGHT ── */}
        <div className="flex items-center gap-3">
          {/* DESKTOP SEARCH */}
          <div className="hidden md:block">
            <SearchBar />
          </div>

          {/* MOBILE: search icon → /search page */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => router.push("/search")}
            aria-label="Cari anime"
          >
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
