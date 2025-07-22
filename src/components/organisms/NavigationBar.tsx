"use client";

import DisplayLogo from "../molecules/DisplayLogo";
import NavigationBarMenu from "../molecules/NavigationBarMenu";
import { useEffect, useState } from "react";

export default function NavigationBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`w-full sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        <DisplayLogo />
        <NavigationBarMenu />
      </div>
    </header>
  );
}
