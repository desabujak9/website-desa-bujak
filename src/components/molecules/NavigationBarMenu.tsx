import { useState, useRef, useEffect } from "react";
import ButtonTetiary from "../atoms/ButtonTetiary";
import Link from "next/link";

function DropdownInformation() {
  const [isOpen, setIsOpen] = useState(false);
  const [alignRight, setAlignRight] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const windowWidth = window.innerWidth;
      const spaceRight = windowWidth - rect.left;

      // Kalau jarak dari kiri ke kanan layar kurang dari 200px, geser ke kiri
      setAlignRight(spaceRight < 200);
    }
  }, [isOpen]);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      className="relative inline-block text-[14px] md:text-[16px] cursor-pointer"
    >
      {/* Trigger */}
      <div className="flex items-center gap-[6px]">
        Informasi
        <div
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          ▼
        </div>
      </div>

      {/* Underline */}
      <div
        className={`h-[1px] bg-black transition-all ${
          isOpen ? "w-full" : "w-0"
        }`}
      />

      {/* Dropdown Menu */}
      {isOpen && (
        <ul
          className={`absolute z-10 bg-white border rounded shadow text-sm w-40 
          ${alignRight ? "right-0" : "left-0"}`}
        >
          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
            Kependudukan
          </li>
          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
            Sejarah
          </li>
          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Budaya</li>
        </ul>
      )}
    </div>
  );
}

export default function NavigationBarMenu() {
  return (
    <ul className="flex items-center gap-[12px] text-[12px] md:text-[16px]">
      <li>
        <Link href={"/"}>
          <ButtonTetiary>Beranda</ButtonTetiary>
        </Link>
      </li>
      <li>
        <DropdownInformation />
      </li>
      <li>
        <ButtonTetiary>Galeri</ButtonTetiary>
      </li>
      <li>
        <ButtonTetiary>Artikel</ButtonTetiary>
      </li>
    </ul>
  );
}
