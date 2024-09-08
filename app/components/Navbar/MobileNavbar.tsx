'use client';
import type React from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Logo from "./Logo";
import LanguageSwitcher from "./LanguageSwitcher";
import AuthButton from "./AuthButton";
import { navItems } from "@/constants/navItems";

const MobileNavbar: React.FC = () => {
  const { theme, setTheme } = useTheme(); // Retained for potential future theme use

  return (
    <nav className="md:hidden bg-transparent text-foreground">
      <div className="flex justify-between items-center h-16 w-full px-4 sm:px-6">
        <Logo />
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-foreground">
              <Menu />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col h-full">
              <Logo className="mb-6" />
              <div className="space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    prefetch={item.prefetch}
                    className="flex items-center space-x-2 text-lg"
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label()}</span>
                  </Link>
                ))}
              </div>
              <div className="mt-auto space-y-4">
                <LanguageSwitcher />
                <AuthButton />
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default MobileNavbar;
