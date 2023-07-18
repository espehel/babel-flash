'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props {
  children: React.ReactNode;
  href: string;
  className?: string;
  exact?: boolean;
}
export default function HeaderNavItem({ children, href, className, exact = false }: Props) {
  const pathname = usePathname();
  const isActive = exact ? href === pathname : pathname.includes(href);
  const classes = isActive
    ? 'block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 '
    : 'block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 ';
  return (
    <li>
      <Link
        href={href}
        className={classes.concat(className)}
        aria-current={isActive ? 'page' : undefined}
      >
        {children}
      </Link>
    </li>
  );
}
