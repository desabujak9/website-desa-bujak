"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import H1 from "@/components/atoms/H1";
import P from "@/components/atoms/P";
import ButtonPrimary from "@/components/atoms/ButtonPrimary";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      router.push("/admin");
    } else {
      alert("Login gagal");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 md:p-10 rounded-xl shadow-md w-full max-w-md space-y-6"
      >
        <div>
          <H1 className="text-center">Login Admin</H1>
          <P className="text-center text-gray-500 mt-2">
            Silakan masuk untuk mengelola konten
          </P>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@desa.com"
              className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="••••••••"
              className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>

        <ButtonPrimary type="submit" className="w-full">
          Login
        </ButtonPrimary>
      </form>
    </main>
  );
}
