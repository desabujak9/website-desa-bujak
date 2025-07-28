// =====================
// File: app/admin/galeri/page.tsx
// =====================

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Item = {
  id: string;
  src: string;
  alt: string;
};

export default function AdminGaleriPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [newImage, setNewImage] = useState<{ alt: string; file: File | null }>({
    alt: "",
    file: null,
  });
  const [adding, setAdding] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  async function fetchImages() {
    try {
      const res = await fetch("/api/galeri");
      const data = await res.json();
      setItems(data);
    } catch (err) {
      console.error("Gagal mengambil data galeri.");
    } finally {
      setLoading(false);
    }
  }

  async function handleAdd() {
    if (!newImage.file) return;
    setAdding(true);
    setMessage(null);

    try {
      const formData = new FormData();
      formData.append("file", newImage.file);
      formData.append("upload_preset", "ml_default");

      const cloudinaryRes = await fetch(
        "https://api.cloudinary.com/v1_1/dwhflzq6u/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const cloudinaryData = await cloudinaryRes.json();
      const compressedUrl = cloudinaryData.secure_url.replace(
        "/upload/",
        "/upload/q_auto,f_auto/"
      );

      const res = await fetch("/api/galeri", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ src: compressedUrl, alt: newImage.alt }),
      });

      if (!res.ok) throw new Error("Gagal menambahkan gambar.");

      setMessage({ type: "success", text: "Gambar berhasil ditambahkan!" });
      setNewImage({ alt: "", file: null });
      fetchImages();
    } catch (error) {
      console.error(error);
      setMessage({ type: "error", text: "Gagal menambahkan gambar." });
    } finally {
      setAdding(false);
    }
  }

  async function handleDelete(id: string) {
    try {
      const res = await fetch(`/api/galeri?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Gagal menghapus gambar.");
      setMessage({ type: "success", text: "Gambar berhasil dihapus." });
      fetchImages();
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Gagal menghapus gambar." });
    }
  }

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Galeri</h1>

      {message && (
        <div
          className={`mb-4 px-4 py-2 rounded ${
            message.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="bg-white shadow p-4 mb-6 rounded space-y-2">
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setNewImage((prev) => ({
              ...prev,
              file: e.target.files ? e.target.files[0] : null,
            }))
          }
        />
        <input
          type="text"
          placeholder="Alt"
          value={newImage.alt}
          onChange={(e) => setNewImage({ ...newImage, alt: e.target.value })}
          className="border p-2 w-full rounded"
        />
        <button
          onClick={handleAdd}
          disabled={adding}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {adding ? "Menambahkan..." : "Tambah Gambar"}
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="relative border rounded shadow p-2 bg-white"
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={300}
                height={200}
                className="rounded mb-2 object-cover w-full h-[150px]"
              />
              <button
                onClick={() => handleDelete(item.id)}
                className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
