import type React from "react";
import Image from "next/image";
import { Link } from "@/lib/i18n";

interface LogoProps {
	className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "" }) => {
	return (
		<Link href="/" className={`flex items-center ${className} -mt-4`}>
			<Image
				src="/images/logo/logoDesktop.png"
				alt="Imagibook Logo"
				width={60} // Adjust based on your logo's dimensions
				height={20} // Adjust based on your logo's dimensions
				priority
			/>
		</Link>
	);
};

export default Logo;
