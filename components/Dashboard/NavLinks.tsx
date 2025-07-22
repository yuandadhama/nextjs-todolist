"use client";

import {
  HomeIcon,
  ClockIcon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
            } transition-all duration-300 ease-out text-blue-900 flex h-[48px] grow items-center justify-center gap-2 rounded-t-md p-3  font-medium hover:bg-white border-black md:grow-0  md:w-[160px]`}
          >
            <LinkIcon className="w-5" />
            <p className="text-xs md:text-sm">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
