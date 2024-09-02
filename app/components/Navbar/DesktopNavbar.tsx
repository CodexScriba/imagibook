import Logo from "./Logo"

const DesktopNavbar: React.FC = () => {
    return (
        <nav className="bg-transparent h-14 w-full">
            <div className="max-w-[1280] mx-auto h-full px-4 flex items-center justify between">
                <div>
                    <Logo/>
                </div>

            </div>
        </nav>
    )
}