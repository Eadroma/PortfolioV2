"use client";

import { useState } from "react";
import Link from "next/link";
import { Home, FolderOpen, Code, Mail, Menu, X } from "lucide-react";
import { MobileMenu } from "./MobileMenu";
import type { NavLabels } from "@/types/content";

interface NavbarProps {
  nav: NavLabels;
}

const navItems = [
  { href: "/", labelKey: "home" as const, Icon: Home },
  { href: "/projects", labelKey: "projects" as const, Icon: FolderOpen },
  { href: "/skills", labelKey: "skills" as const, Icon: Code },
  { href: "/contact", labelKey: "contact" as const, Icon: Mail },
];

export function Navbar({ nav }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Desktop sidebar */}
      <nav className="hidden md:flex fixed left-0 top-0 h-full w-20 bg-[#1e2124] flex-col items-center py-6 gap-4 z-50">
        {navItems.map(({ href, labelKey, Icon }) => (
          <Link
            key={href}
            href={href}
            className="relative group w-12 h-12 rounded-2xl bg-[#2c2f33] hover:bg-[#5865F2] flex items-center justify-center transition-all"
            aria-label={nav[labelKey]}
          >
            <Icon size={24} className="text-white" />
            <span className="absolute left-full ml-4 px-3 py-2 bg-[#18191c] text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
              {nav[labelKey]}
            </span>
          </Link>
        ))}
      </nav>

      {/* Mobile top bar */}
      <nav className="md:hidden fixed top-0 left-0 right-0 bg-[#1e2124] z-50 px-4 py-3 flex items-center justify-between">
        <span className="text-xl font-bold text-[#5865F2]">Portfolio</span>
        <button
          onClick={() => setMobileOpen((o) => !o)}
          className="w-10 h-10 flex items-center justify-center bg-[#2c2f33] rounded-lg text-white cursor-pointer"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {mobileOpen && (
        <MobileMenu nav={nav} onClose={() => setMobileOpen(false)} />
      )}
    </>
  );
}
