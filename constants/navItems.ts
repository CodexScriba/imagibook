import { Home, HelpCircle, DollarSign, BookOpen, Library } from "lucide-react";
import * as m from "@/paraglide/messages";

export const navItems = [
	{ href: "/", label: m.navbar_home, icon: Home, prefetch: true },
	{
		href: "/how-it-works",
		label: m.navbar_howItWorks,
		icon: HelpCircle,
		prefetch: true,
	},
	{
		href: "/pricing",
		label: m.navbar_pricing,
		icon: DollarSign,
		prefetch: true,
	},
	{
		href: "/book-creation",
		label: m.navbar_bookCreation,
		icon: BookOpen,
		prefetch: false,
	},
	{ href: "/library", label: m.navbar_library, icon: Library, prefetch: false },
];
