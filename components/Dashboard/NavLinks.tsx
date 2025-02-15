"use client";

import {
  HomeIcon,
  ClockIcon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: "Overview", href: "/dashboard/overview", icon: HomeIcon },
  {
    name: "To-Dos",
    href: "/dashboard/todos",
    icon: ClipboardDocumentCheckIcon,
  },
  { name: "History", href: "/dashboard/history", icon: ClockIcon },
];

export default function NavLinks() {
  const pathName = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={`${
              pathName == link.href ? "border-b-0 bg-white" : "bg-gray-400"
            }  flex h-[48px] grow items-center justify-center gap-2 rounded-t-md p-3 text-sm font-medium hover:bg-white border-black `}
          >
            <LinkIcon className="w-5" />
            <p className="text-xs">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
