"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import H1 from "@/components/atoms/H1";

type GalleryItem = {
  id: string;
  src: string;
  alt: string;
};

export default function GaleriPage() {
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [erroredImages, setErroredImages] = useState<Set<string>>(new Set());
  const [modalImage, setModalImage] = useState<GalleryItem | null>(null);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    async function fetchImages() {
      try {
        const mockImages: GalleryItem[] = [
          {
            id: "1",
            src: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
            alt: "Pemandangan 1",
          },
          {
            id: "2",
            src: "https://res.cloudinary.com/demo/image/upload/non_existent.jpg",
            alt: "Pemandangan 2",
          },
          {
            id: "3",
            src: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
            alt: "Pemandangan 3",
          },
        ];

        setImages(mockImages);
      } catch (error) {
        console.error("Gagal memuat gambar:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchImages();
  }, []);

  const handleError = (id: string) => {
    setErroredImages((prev) => new Set(prev).add(id));
  };

  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.25, 3));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.25, 1));

  return (
    <main className="min-h-screen px-4 py-8">
      <div className="flex items-center flex-col p-6">
        <H1>Galeri</H1>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="w-full aspect-[3/2] bg-gray-200 animate-pulse rounded-xl"
            />
          ))}
        </div>
      ) : images.length === 0 ? (
        <p className="text-center py-6 text-gray-500">Belum ada gambar.</p>
      ) : (
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
          {images.map((img) => (
            <div
              key={img.id}
              className="rounded-xl overflow-hidden shadow-md w-full aspect-[3/2] relative group cursor-pointer"
              onClick={() => {
                setModalImage(img);
                setZoom(1);
              }}
            >
              {erroredImages.has(img.id) ? (
                <div className="flex items-center justify-center w-full h-full bg-gray-100 text-gray-400 text-sm">
                  Gambar gagal dimuat
                </div>
              ) : (
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  onError={() => handleError(img.id)}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              )}
            </div>
          ))}
        </section>
      )}

      {/* MODAL */}
      {modalImage && (
        <div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setModalImage(null)}
        >
          <div
            className="relative max-w-4xl w-full max-h-full overflow-hidden bg-white rounded-xl p-2 transition-all duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={modalImage.src}
              alt={modalImage.alt}
              width={1200}
              height={800}
              className="mx-auto object-contain transition-transform duration-300"
              style={{ transform: `scale(${zoom})` }}
            />
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={handleZoomOut}
                className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 text-sm"
              >
                Zoom Out
              </button>
              <button
                onClick={handleZoomIn}
                className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 text-sm"
              >
                Zoom In
              </button>
              <button
                onClick={() => {
                  setZoom(1);
                  setModalImage(null);
                }}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 text-sm"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
