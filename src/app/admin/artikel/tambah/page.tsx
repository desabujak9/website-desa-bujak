"use client";

import { useState } from "react";

export default function TambahArtikelPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState<string[]>([""]);

  const handleSubmit = async () => {
    const res = await fetch("/api/admin/artikel", {
      method: "POST",
      body: JSON.stringify({ title, content }),
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      alert("Artikel berhasil ditambahkan");
    } else {
      alert("Gagal menambahkan artikel");
    }
  };

  return (
    <main className="p-6 max-w-2xl mx-auto space-y-4">
      <h1 className="text-xl font-bold">Tambah Artikel</h1>
      <input
        className="w-full border p-2 rounded"
        placeholder="Judul Artikel"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="w-full border p-2 rounded"
        placeholder="Isi konten (paragraf)"
        value={content.join("\n")}
        onChange={(e) => setContent(e.target.value.split("\n"))}
        rows={10}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handleSubmit}
      >
        Simpan
      </button>
    </main>
  );
}
