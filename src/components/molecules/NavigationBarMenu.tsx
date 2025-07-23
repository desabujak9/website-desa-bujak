"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";

const navLinks = [
  { label: "Beranda", href: "/" },
  { label: "Tentang Desa", href: "/tentang-desa" },
  { label: "Galeri", href: "/galeri" },
  { label: "Artikel", href: "/artikel" },
];

const dropdownLinks = [
  { label: "Sejarah", href: "/sejarah" },
  { label: "Kependudukan", href: "/kependudukan" },
  { label: "Budaya", href: "/budaya" },
];

export default function NavigationBarMenu() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <>
      {/* Desktop */}
      <ul className="hidden md:flex items-center gap-6 text-sm relative">
        {navLinks.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="relative group hover:text-black transition"
            >
              {link.label}
              <span className="block h-[2px] bg-black scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            </Link>
          </li>
        ))}
        <li className="relative">
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="flex items-center gap-1 hover:text-black transition"
          >
            Informasi
            <ChevronDown
              className={`transition-transform duration-300 ${
                dropdownOpen ? "rotate-180" : "rotate-0"
              }`}
              size={16}
            />
            <span className="block h-[2px] bg-black scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
          </button>

          <div
            className={`absolute top-full mt-2 bg-white shadow-md border rounded z-50 overflow-hidden transition-all duration-300 origin-top
    ${
      dropdownOpen
        ? "scale-100 opacity-100 pointer-events-auto"
        : "scale-95 opacity-0 pointer-events-none"
    }
    right-0 w-48 max-w-[calc(100vw-2rem)]`}
          >
            <ul className="py-2">
              {dropdownLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block px-4 py-2 text-sm hover:bg-gray-100 transition"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </li>
      </ul>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden">
        <button onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-[64px] left-0 right-0 bg-white border-t shadow transition-all duration-300 z-40 ${
          mobileOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="p-4 space-y-2 text-sm">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-2 py-2 hover:text-black"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          <div className="pt-2 border-t">
            <p className="text-gray-600 font-semibold">Informasi</p>
            {dropdownLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-2 py-1 hover:bg-gray-100 rounded"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
