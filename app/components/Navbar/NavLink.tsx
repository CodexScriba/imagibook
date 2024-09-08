import type React from 'react';
import { Link } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

interface NavLinkProps {
  href: string;
  label: string;
  icon?: LucideIcon;
  className?: string;
  prefetch?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ href, label, icon: Icon, className, prefetch = false }) => (
  <Link
    href={href}
    prefetch={prefetch}
    className={cn(
      "text-base font-medium text-gray-500 hover:text-primary dark:hover:text-primary-foreground mt-2 flex items-center",
      className
    )}
  >
    {Icon && <Icon className="w-5 h-5 mr-2" />}
    {label}
  </Link>
);

export default NavLink;