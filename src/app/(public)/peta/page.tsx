"use client";

import dynamic from "next/dynamic";

const MapSection = dynamic(() => import("@/components/organisms/Map"), {
  ssr: false,
});

export default function PetaPage() {
  return (
    <main className="min-h-screen">
      <MapSection />
    </main>
  );
}
