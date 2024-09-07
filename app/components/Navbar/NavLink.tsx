import type React from 'react';
import { Link } from '@/lib/i18n';
import { cn } from '@/lib/utils';

interface NavLinkProps {
  href: string;
  label: string;
  className?: string;
  prefetch?: boolean;  // Add prefetch as an optional prop
}

const NavLink: React.FC<NavLinkProps> = ({ href, label, className, prefetch = false }) => (
  <Link
    href={href}
    prefetch={prefetch}
    className={cn(
      "mt-6 text-base font-medium text-gray-500 hover:text-primary dark:hover:text-primary-foreground",
      className
    )}
  >
    {label}
  </Link>
);

export default NavLink;
