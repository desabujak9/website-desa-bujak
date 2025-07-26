// src/app/admin/dashboard/page.tsx

"use client";

import H1 from "@/components/atoms/H1";
import P from "@/components/atoms/P";
import Separator from "@/components/atoms/Separator";
import DashboardGrid from "@/components/organisms/DashboardGrid";
export default function DashboardPage() {
  return (
    <main className="p-6 space-y-10 min-h-screen bg-gray-50">
      <div className="space-y-2">
        <H1 className="text-gray-800">Selamat Datang, Admin!</H1>
        <P className="text-gray-600 text-[14px] md:text-[16px]">
          Silakan pilih halaman yang ingin Anda kelola.
        </P>
      </div>

      <Separator className="bg-gray-300" />

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-700">Navigasi</h2>
        <DashboardGrid />
      </section>
    </main>
  );
}
