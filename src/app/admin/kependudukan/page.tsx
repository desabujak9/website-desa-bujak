// 4. app/admin/kependudukan/page.tsx
"use client";

import { useEffect, useState } from "react";
import { createChart, deleteChart, getCharts } from "./action";
// import { createChart, deleteChart, getCharts } from "./actions";

type ChartType = "pie" | "bar" | "line" | "area";

export default function AdminKependudukanPage() {
  const [charts, setCharts] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [type, setType] = useState<ChartType>("pie");
  const [rawData, setRawData] = useState("");

  useEffect(() => {
    (async () => {
      const res = await getCharts();
      setCharts(res);
    })();
  }, []);

  const handleCreate = async () => {
    try {
      const parsedData = JSON.parse(rawData);
      await createChart({ title, type, data: parsedData });
      location.reload();
    } catch (e) {
      alert(
        "Format data tidak valid. Harus array objek dengan name dan value."
      );
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Hapus grafik ini?")) {
      await deleteChart(id);
      location.reload();
    }
  };

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Kelola Grafik Kependudukan</h1>

      <div className="bg-white shadow p-4 rounded mb-6">
        <h2 className="font-semibold mb-2">Tambah Grafik</h2>
        <input
          type="text"
          placeholder="Judul Grafik"
          className="w-full border p-2 mb-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select
          className="w-full border p-2 mb-2"
          value={type}
          onChange={(e) => setType(e.target.value as ChartType)}
        >
          <option value="pie">Pie</option>
          <option value="bar">Bar</option>
          <option value="line">Line</option>
          <option value="area">Area</option>
        </select>
        <textarea
          placeholder='Contoh: [{"name":"A","value":100},{"name":"B","value":200}]'
          className="w-full border p-2 mb-2 h-32"
          value={rawData}
          onChange={(e) => setRawData(e.target.value)}
        />
        <button
          onClick={handleCreate}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Tambah
        </button>
      </div>

      <div className="space-y-4">
        {charts.map((chart) => (
          <div
            key={chart.id}
            className="border p-4 rounded bg-gray-50 flex justify-between items-start"
          >
            <div>
              <p className="font-semibold">{chart.title}</p>
              <p className="text-sm text-gray-600">Tipe: {chart.type}</p>
            </div>
            <button
              onClick={() => handleDelete(chart.id)}
              className="text-red-600 hover:underline"
            >
              Hapus
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
