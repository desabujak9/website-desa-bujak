"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import ButtonPrimary from "@/components/atoms/ButtonPrimary";
import ButtonTetiary from "@/components/atoms/ButtonTetiary";
import H1 from "@/components/atoms/H1";
import H2 from "@/components/atoms/H2";
import H3 from "@/components/atoms/H3";
import P from "@/components/atoms/P";

type Artikel = {
  id: string;
  title: string;
  thumbnail: string;
  createdAt: string;
  content: { paragraphs: string[] }[];
};

export default function AdminArtikelPage() {
  const [artikelList, setArtikelList] = useState<Artikel[]>([]);
  const [selected, setSelected] = useState<Artikel | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const [title, setTitle] = useState("");
  const [paragraphs, setParagraphs] = useState<string[]>([""]);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchArtikel = async () => {
    const res = await fetch("/api/admin/artikel");
    const data = await res.json();
    setArtikelList(data);
  };

  useEffect(() => {
    fetchArtikel();
  }, []);

  const openForm = (artikel?: Artikel) => {
    if (artikel) {
      setSelected(artikel);
      setTitle(artikel.title);
      setParagraphs(artikel.content[0]?.paragraphs || [""]);
      setPreview(artikel.thumbnail);
    } else {
      setSelected(null);
      setTitle("");
      setParagraphs([""]);
      setPreview(null);
    }
    setShowForm(true);
  };

  const handleSubmit = async () => {
    setLoading(true);
    let imageUrl = preview || "";

    if (thumbnail) {
      const formData = new FormData();
      formData.append("file", thumbnail);
      formData.append("upload_preset", "ml_default");
      const upload = await fetch(
        "https://api.cloudinary.com/v1_1/dwhflzq6u/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await upload.json();
      imageUrl = data.secure_url;
    }

    const method = selected ? "PUT" : "POST";
    const body = JSON.stringify({
      ...(selected ? { id: selected.id } : {}),
      title,
      content: paragraphs,
      image: imageUrl,
    });

    await fetch("/api/admin/artikel", {
      method,
      headers: { "Content-Type": "application/json" },
      body,
    });

    setShowForm(false);
    fetchArtikel();
    setLoading(false);
  };

  const handleDelete = async () => {
    if (!selected) return;
    await fetch(`/api/admin/artikel?id=${selected.id}`, { method: "DELETE" });
    setShowDelete(false);
    fetchArtikel();
  };

  return (
    <main className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <H1>Manajemen Artikel</H1>
        <ButtonPrimary onClick={() => openForm()}>
          + Tambah Artikel
        </ButtonPrimary>
      </div>

      <ul className="space-y-4">
        {artikelList.map((a) => (
          <li key={a.id} className="border rounded p-4 flex justify-between">
            <div>
              <H3>{a.title}</H3>
              <P className="text-gray-500">
                {new Date(a.createdAt).toLocaleString()}
              </P>
            </div>
            <div className="flex gap-2">
              <ButtonTetiary>
                <span onClick={() => openForm(a)}>Edit</span>
              </ButtonTetiary>
              <ButtonTetiary>
                <span
                  onClick={() => {
                    setSelected(a);
                    setShowDelete(true);
                  }}
                  className="text-red-600"
                >
                  Hapus
                </span>
              </ButtonTetiary>
            </div>
          </li>
        ))}
      </ul>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded max-w-xl w-full relative">
            <H2 className="mb-4">
              {selected ? "Edit Artikel" : "Tambah Artikel"}
            </H2>
            <label className="block mb-2">
              Judul:
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border p-2 mt-1 rounded"
              />
            </label>

            <label className="block mb-2">
              Thumbnail:
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setThumbnail(file);
                    setPreview(URL.createObjectURL(file));
                  }
                }}
              />
              {preview && (
                <div className="relative w-48 h-32 mt-2">
                  <Image
                    src={preview}
                    alt="Preview"
                    fill
                    className="object-cover rounded"
                  />
                </div>
              )}
            </label>

            <label className="block mb-2">
              Paragraf:
              {paragraphs.map((p, i) => (
                <textarea
                  key={i}
                  value={p}
                  onChange={(e) => {
                    const copy = [...paragraphs];
                    copy[i] = e.target.value;
                    setParagraphs(copy);
                  }}
                  className="w-full border p-2 rounded mb-2"
                  rows={3}
                />
              ))}
              <ButtonTetiary>
                <span onClick={() => setParagraphs([...paragraphs, ""])}>
                  + Tambah Paragraf
                </span>
              </ButtonTetiary>
            </label>

            <div className="flex justify-end gap-2 mt-4">
              <ButtonTetiary>
                <span onClick={() => setShowForm(false)}>Batal</span>
              </ButtonTetiary>
              <ButtonPrimary onClick={handleSubmit}>
                {loading ? "Menyimpan..." : "Simpan"}
              </ButtonPrimary>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
