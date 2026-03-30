"use client";

import Link from "next/link";
import { Home, FolderOpen, Code, Mail } from "lucide-react";
import type { NavLabels } from "@/types/content";

interface MobileMenuProps {
  nav: NavLabels;
  onClose: () => void;
}

const navItems = [
  { href: "/", labelKey: "home" as const, Icon: Home },
  { href: "/projects", labelKey: "projects" as const, Icon: FolderOpen },
  { href: "/skills", labelKey: "skills" as const, Icon: Code },
  { href: "/contact", labelKey: "contact" as const, Icon: Mail },
];

export function MobileMenu({ nav, onClose }: MobileMenuProps) {
  return (
    <div className="md:hidden fixed inset-0 bg-[#1e2124] z-40 pt-16">
      <div className="flex flex-col gap-2 p-4">
        {navItems.map(({ href, labelKey, Icon }) => (
          <Link
            key={href}
            href={href}
            onClick={onClose}
            className="flex items-center gap-4 px-4 py-3 rounded-lg bg-[#2c2f33] hover:bg-[#5865F2] transition-colors"
          >
            <Icon size={24} />
            <span>{nav[labelKey]}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
