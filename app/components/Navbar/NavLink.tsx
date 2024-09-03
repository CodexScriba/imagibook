import React from 'react';
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
      "text-sm font-medium hover:text-primary dark:hover:text-primary-foreground",
      className
    )}
  >
    {label}
  </Link>
);

export default NavLink;
