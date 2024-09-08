'use client'
import { useState, useEffect } from "react";
import MobileNavbar from "./MobileNavbar";
import DesktopNavbar from "./DesktopNavbar";

const Navbar = () => {
	const [isMobile, setIsMobile] = useState<boolean | null>(null);

	useEffect(() => {
		const checkScreenSize = () => {
			setIsMobile(window.innerWidth < 768);
		};

		// Initialize on the client side
		checkScreenSize();

		// Debounce the resize event listener
		const handleResize = () => {
			const timeoutId = setTimeout(checkScreenSize, 150);
			return () => clearTimeout(timeoutId);
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	if (isMobile === null) {
		return null; // or a loading spinner
	}

	return isMobile ? <MobileNavbar /> : <DesktopNavbar />;
};

export default Navbar;