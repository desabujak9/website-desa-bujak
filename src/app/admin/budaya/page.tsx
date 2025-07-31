"use client";

import { useEffect, useState } from "react";
import imageCompression from "browser-image-compression";
import Image from "next/image";

type ContentBlock = {
  title: string;
  paragraphs: string[];
  image?: string;
};

type Section = {
  content: ContentBlock;
  items: any[];
  hasTopBorder: boolean;
};

export default function BudayaEditorAdminPage() {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/page-content?page=budaya")
      .then((res) => res.json())
      .then((data) => {
        setSections(data.data || []);
        setLoading(false);
      })
      .catch(() => {
        alert("Gagal memuat data.");
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/page-content?page=budaya", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: sections }),
      });

      if (res.ok) {
        alert("Berhasil disimpan!");
      } else {
        alert("Gagal menyimpan perubahan.");
      }
    } catch (error) {
      alert("Terjadi kesalahan saat menyimpan.");
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (file: File, index: number) => {
    try {
      const compressed = await imageCompression(file, {
        maxSizeMB: 1,
        maxWidthOrHeight: 1280,
      });

      const formData = new FormData();
      formData.append("file", compressed);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload gagal");

      const data = await res.json();
      const updated = [...sections];
      updated[index].content.image = data.secure_url;
      setSections(updated);
    } catch (err) {
      alert("Gagal mengunggah gambar.");
    }
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData("sectionIndex", index.toString());
  };

  const handleDrop = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    const fromIndex = parseInt(e.dataTransfer.getData("sectionIndex"));
    if (fromIndex === index) return;

    const updated = [...sections];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(index, 0, moved);
    setSections(updated);
  };

  return (
    <main className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold mb-4">Editor Halaman Beranda</h1>

      <button
        onClick={() =>
          setSections([
            ...sections,
            {
              content: { title: "", paragraphs: [], image: "" },
              items: [],
              hasTopBorder: true,
            },
          ])
        }
        className="text-sm text-blue-600"
      >
        + Tambah Section
      </button>

      {loading && <p>Loading...</p>}

      {!loading &&
        sections.map((section, i) => (
          <div
            key={i}
            draggable
            onDragStart={(e) => handleDragStart(e, i)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, i)}
            className="border-2 border-dashed p-4 rounded bg-white space-y-4"
          >
            <input
              value={section.content.title}
              onChange={(e) => {
                const updated = [...sections];
                updated[i].content.title = e.target.value;
                setSections(updated);
              }}
              placeholder="Judul"
              className="w-full px-3 py-2 border rounded"
            />

            {(section.content.paragraphs || []).map((para, idx) => (
              <textarea
                key={idx}
                value={para}
                onChange={(e) => {
                  const updated = [...sections];
                  updated[i].content.paragraphs[idx] = e.target.value;
                  setSections(updated);
                }}
                placeholder={`Paragraf ${idx + 1}`}
                className="w-full px-3 py-2 border rounded"
              />
            ))}

            <button
              type="button"
              onClick={() => {
                const updated = [...sections];
                updated[i].content.paragraphs.push("");
                setSections(updated);
              }}
              className="text-sm text-blue-600"
            >
              + Tambah Paragraf
            </button>

            <div className="space-y-2">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleImageUpload(file, i);
                }}
              />
              {section.content.image && (
                <Image
                  width={100}
                  height={100}
                  src={section.content.image}
                  alt="preview"
                  className="w-full max-w-md rounded aspect-[4/3] object-cover"
                />
              )}
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={section.hasTopBorder}
                onChange={(e) => {
                  const updated = [...sections];
                  updated[i].hasTopBorder = e.target.checked;
                  setSections(updated);
                }}
              />
              <label>Tampilkan garis atas</label>
            </div>

            <button
              type="button"
              onClick={() => {
                const updated = [...sections];
                updated.splice(i, 1);
                setSections(updated);
              }}
              className="text-sm text-red-600"
            >
              Hapus Section
            </button>
          </div>
        ))}

      <button
        onClick={handleSave}
        disabled={saving}
        className="bg-black text-white px-4 py-2 rounded mt-6 disabled:opacity-50"
      >
        {saving ? "Menyimpan..." : "Simpan Semua Perubahan"}
      </button>
    </main>
  );
}
