//app/components/Navbar/DesktopNavbar.tsx
import type React from "react";
import NavLink from "./NavLink";
import * as m from "@/paraglide/messages";
import Logo from "./Logo";
import LanguageSwitcher from "./LanguageSwitcher";

const DesktopNavbar: React.FC = () => {
	const navItems = [
		{ href: "/", label: m.navbarHome, prefetch: true },
		{ href: "/how-it-works", label: m.navbarHowItWorks, prefetch: true },
		{ href: "/pricing", label: m.navbarPricing, prefetch: true },
		{ href: "/book-creation", label: m.navbarBookCreation, prefetch: false },
		{ href: "/library", label: m.navbarLibrary, prefetch: false },
		{ href: "/about-us", label: m.navbarAboutUs, prefetch: false },
	];

	return (
		<div className="hidden space-x-4 md:flex">
			<Logo />
			{navItems.map((item) => (
				<NavLink
					key={item.href}
					href={item.href}
					label={item.label()}
					prefetch={item.prefetch}
				/>
			))}
			<LanguageSwitcher />
		</div>
	);
};

export default DesktopNavbar;
