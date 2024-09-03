//app/components/Navbar/DesktopNavbar.tsx

import Logo from "./Logo";
import NavLink from './Navlink'; // Updated import

const DesktopNavbar: React.FC = () => {
    return (
        <nav className="bg-transparent h-14 w-full">
            <div className="max-w-[1280px] mx-auto h-full px-4 flex items-center justify-between">
                <div>
                    <Logo />
                </div>
                <div>
                    {/* Example of a Link with i18n */}
                    <Link href="/about">
                        About
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default DesktopNavbar;
