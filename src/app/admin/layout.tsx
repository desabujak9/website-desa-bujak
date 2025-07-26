"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
  return <main>{children}</main>;
}
