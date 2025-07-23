// src/app/admin/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function checkLogin() {
      const res = await fetch("/api/auth/me");
      if (!res.ok) {
        router.push("/login");
      } else {
        setLoading(false);
      }
    }

    checkLogin();
  }, []);

  if (loading) return <p>Memuat...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Halaman Admin</h1>
      <p>Ini hanya bisa diakses setelah login.</p>
    </div>
  );
}
