import type React from "react";
import NavLink from "./NavLink";
import * as m from "@/paraglide/messages";
import Logo from "./Logo";
import LanguageSwitcher from "./LanguageSwitcher";
import AuthButton from "./AuthButton";

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
		<nav className="hidden md:flex items-center justify-between max-w-screen-2xl mx-auto px-4">
			<div className="flex-shrink-0">
				<Logo />
			</div>
			<div className="flex space-x-6 justify-center flex-grow">
				{navItems.map((item) => (
					<NavLink
						key={item.href}
						href={item.href}
						label={item.label()}
						prefetch={item.prefetch}
					/>
				))}
			</div>
			<div className="flex space-x-4">
				<LanguageSwitcher />
				<AuthButton />
			</div>
		</nav>
	);
};

export default DesktopNavbar;