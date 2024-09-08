// app/config/navItems.ts

import { Home, HelpCircle, DollarSign, BookOpen, Library, Users } from "lucide-react";
import * as m from "@/paraglide/messages";

export const navItems = [
  { href: "/", label: m.navbarHome, icon: Home, prefetch: true },
  { href: "/how-it-works", label: m.navbarHowItWorks, icon: HelpCircle, prefetch: true },
  { href: "/pricing", label: m.navbarPricing, icon: DollarSign, prefetch: true },
  { href: "/book-creation", label: m.navbarBookCreation, icon: BookOpen, prefetch: false },
  { href: "/library", label: m.navbarLibrary, icon: Library, prefetch: false },
];