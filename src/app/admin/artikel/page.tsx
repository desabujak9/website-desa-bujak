"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

type Artikel = {
  id: string;
  title: string;
  thumbnail?: string;
  createdAt: string;
};

export default function AdminArtikelListPage() {
  const [data, setData] = useState<Artikel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/artikel")
      .then((res) => res.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manajemen Artikel</h1>
        <Link
          href="/admin/artikel/tambah"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Tambah Artikel
        </Link>
      </div>

      {loading ? (
        <p>Memuat...</p>
      ) : (
        <ul className="space-y-4">
          {data.map((a) => (
            <li
              key={a.id}
              className="p-4 border rounded flex justify-between items-center"
            >
              <div>
                <h2 className="font-semibold">{a.title}</h2>
                <p className="text-sm text-gray-500">
                  {new Date(a.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="flex gap-2">
                <Link
                  href={`/admin/artikel/edit?id=${a.id}`}
                  className="text-blue-600"
                >
                  Edit
                </Link>
                <Link
                  href={`/admin/artikel/hapus?id=${a.id}`}
                  className="text-red-600"
                >
                  Hapus
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
