"use client";

import React from "react";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import Link from "next/link";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import useCurrentUser from "@/hooks/use-current-user";
import { FiArrowRight } from "react-icons/fi";

const navItems = ["Home", "About", "Services", "Contact"];

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const user = useCurrentUser();

  return (
    <header className="sticky top-4 z-50 w-full px-4 sm:px-6 lg:px-8">
      <div className="relative flex max-w-7xl mx-auto items-center justify-between">
        {/* Logo di kanan (desktop only) */}
        <div className="hidden md:block">
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 20 20"
            className="w-8 h-8 md:w-10 md:h-10 transition-colors duration-300"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
        {/* Navigation Menu (centered on desktop) */}
        <NavigationMenu className="hidden md:flex absolute left-1/2 transform -translate-x-1/2">
          <NavigationMenuList className="gap-1 rounded-full bg-background shadow-sm px-2 py-1">
            {navItems.map((item, index) => (
              <NavigationMenuItem key={index}>
                <NavigationMenuLink
                  asChild
                  className="group inline-flex h-9 w-max items-center justify-center rounded-full bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                >
                  <Link href={"#"}>{item}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Foto profil kiri (mobile & desktop) */}
        <div className="flex items-center gap-2">
          {user?.image && (
            <Link href="/dashboard">
              <Image
                src={user.image}
                alt="Profile"
                width={36}
                height={36}
                className="rounded-full object-cover cursor-pointer"
              />
            </Link>
          )}
        </div>

        {/* Hamburger menu (mobile only) */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant={"ghost"}
              size={"icon"}
              className="md:hidden ml-auto"
            >
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side={"right"} className="w-64">
            <nav className="flex flex-col space-y-4 mt-8">
              {navItems.map((item, index) => (
                <Link
                  href={"#"}
                  key={index}
                  className="text-lg font-medium hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </Link>
              ))}
              <Link
                href={user ? "/dashboard" : "/sign-in"}
                className="group/button relative inline-flex items-center justify-center overflow-hidden rounded-md bg-white backdrop-blur-lg px-5 py-2 text-base dark:text-darkBg font-semibold text-shadow-gray-600/50 transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl shadow-gray-600/50 border-2 border-gray-800/20"
              >
                <span className="text-[14px] ">
                  {user ? "Get Started" : "Sign In To Access"}
                </span>
                <FiArrowRight className="ml-2" />
                <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
                  <div className="relative h-full w-10 bg-black/20"></div>
                </div>
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
