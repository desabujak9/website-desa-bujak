"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function EditArtikelPage() {
  const params = useSearchParams();
  const id = params.get("id");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState<string[]>([]);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/admin/artikel?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTitle(data.title);
        setContent(
          data.content.map((c: { paragraphs: string[] }) => c.paragraphs).flat()
        );
      });
  }, [id]);

  const handleUpdate = async () => {
    await fetch("/api/admin/artikel", {
      method: "PUT",
      body: JSON.stringify({ id, title, content }),
      headers: { "Content-Type": "application/json" },
    });
    alert("Berhasil diperbarui");
  };

  return (
    <main className="p-6 max-w-2xl mx-auto space-y-4">
      <h1 className="text-xl font-bold">Edit Artikel</h1>
      <input
        className="w-full border p-2 rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="w-full border p-2 rounded"
        value={content.join("\n")}
        onChange={(e) => setContent(e.target.value.split("\n"))}
        rows={10}
      />
      <button
        className="bg-green-600 text-white px-4 py-2 rounded"
        onClick={handleUpdate}
      >
        Simpan Perubahan
      </button>
    </main>
  );
}
