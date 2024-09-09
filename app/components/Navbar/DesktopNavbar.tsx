import type React from "react";
import NavLink from "./NavLink";
import { navItems } from "@/constants/navItems";
import Logo from "./Logo";
import LanguageSwitcher from "./LanguageSwitcher";
import AuthButton from "./AuthButton";

const DesktopNavbar: React.FC = () => {
	return (
		<nav className="hidden md:flex items-center justify-between max-w-screen-2xl mx-auto px-4 mt-5">
			<div className="flex-shrink-0">
				<Logo />
			</div>
			<div className="flex space-x-8 justify-center flex-grow">
				{navItems.map((item) => (
					<NavLink
						key={item.href}
						href={item.href}
						label={item.label()}
						icon={item.icon}
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