// //app/components/Navbar/DesktopNavbar.tsx
// import React from 'react';
// import NavLink from './NavLink';
// import * as m from "@/paraglide/messages"

// const DesktopNavbar: React.FC = () => {
//   const navItems = [
//     { href: '/', label: m.navbar.home(), prefetch: true },
//     { href: '/how-it-works', label: m.navbar.howItWorks(), prefetch: true },
//     { href: '/pricing', label: m.navbar.pricing(), prefetch: true },
//     { href: '/book-creation', label: m.navbar.bookCreation(), prefetch: false },
//     { href: '/library', label: m.navbar.library(), prefetch: false },
//     { href: '/about-us', label: m.navbar.aboutUs(), prefetch: false },
//   ];

//   return (
//     <div className="hidden space-x-4 md:flex">
//       {navItems.map((item) => (
//         <NavLink
//           key={item.href}
//           href={item.href}
//           label={item.label}
//           prefetch={item.prefetch}
//         />
//       ))}
//     </div>
//   );
// };

// export default DesktopNavbar;

import React from "react";

const DesktopNavbar = () => {
	return <div>DesktopNavbar</div>;
};

export default DesktopNavbar;
