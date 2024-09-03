'use client'
import { useState, useEffect } from "react";
import MobileNavbar from "./MobileNavbar";
import DesktopNavbar from "./DesktopNavbar";

const Navbar = () => {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkScreenSize = () => {
			setIsMobile(window.innerWidth < 768);
		};

		// Initialize only on the client side to avoid SSR issues
		checkScreenSize();

		// Throttle or debounce the resize event listener to avoid performance issues
		let resizeTimeout: string | number | NodeJS.Timeout | undefined;
		const handleResize = () => {
			clearTimeout(resizeTimeout);
			resizeTimeout = setTimeout(checkScreenSize, 150);
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return <>{isMobile ? <MobileNavbar /> : <DesktopNavbar />}</>;
};

export default Navbar;
