"use client";

import { useSearchParams, useRouter } from "next/navigation";

export default function HapusArtikelPage() {
  const router = useRouter();
  const params = useSearchParams();
  const id = params.get("id");

  const handleDelete = async () => {
    await fetch(`/api/admin/artikel?id=${id}`, {
      method: "DELETE",
    });
    router.push("/admin/artikel");
  };

  return (
    <main className="p-6 max-w-md mx-auto space-y-4">
      <h1 className="text-xl font-bold">Hapus Artikel</h1>
      <p>Apakah Anda yakin ingin menghapus artikel ini?</p>
      <div className="flex gap-4">
        <button
          className="bg-red-600 text-white px-4 py-2 rounded"
          onClick={handleDelete}
        >
          Hapus
        </button>
        <button
          className="bg-gray-300 px-4 py-2 rounded"
          onClick={() => router.push("/admin/artikel")}
        >
          Batal
        </button>
      </div>
    </main>
  );
}
