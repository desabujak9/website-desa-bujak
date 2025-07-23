"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts";
import { useState } from "react";

const COLORS = ["#2B6CB0", "#48BB78", "#CBD5E0"];

type ChartType = "pie" | "bar" | "line" | "area";

type ChartData = {
  type: ChartType;
  title: string;
  data: { name: string; value: number }[];
};

export default function KependudukanPage() {
  const [charts] = useState<ChartData[]>([
    {
      type: "pie",
      title: "Komposisi Berdasarkan Jenis Kelamin",
      data: [
        { name: "Laki-laki", value: 5530 },
        { name: "Perempuan", value: 5349 },
      ],
    },
    {
      type: "pie",
      title: "Struktur Usia Penduduk",
      data: [
        { name: "Usia Produktif (15–64 tahun)", value: 7191 },
        { name: "Usia Muda (0–14 tahun)", value: 3142 },
        { name: "Lansia (65+)", value: 547 },
      ],
    },
    {
      type: "bar",
      title: "Jumlah Penduduk per Dusun (2024)",
      data: [
        { name: "Montong Belok", value: 974 },
        { name: "Lekong Madi", value: 490 },
        { name: "Tenteh Lauk", value: 397 },
        { name: "Baren Untung", value: 578 },
        { name: "Batu Lumbuk", value: 835 },
        { name: "Bujak", value: 724 },
        { name: "Kebun Belek", value: 607 },
        { name: "Racem", value: 664 },
        { name: "Gunung Amuk", value: 932 },
        { name: "Gunung Mujur", value: 448 },
        { name: "Bajur", value: 602 },
        { name: "Montong Paok", value: 397 },
        { name: "Montong Geri", value: 358 },
        { name: "Ting Petuk", value: 509 },
        { name: "Gunung Petuk", value: 634 },
        { name: "Sape", value: 290 },
        { name: "Colok", value: 648 },
        { name: "Dasan Lekong", value: 512 },
        { name: "Bantun", value: 280 },
      ],
    },
    {
      type: "line",
      title: "Tren Migrasi Tahunan (Contoh Data)",
      data: [
        { name: "2019", value: 120 },
        { name: "2020", value: 180 },
        { name: "2021", value: 200 },
        { name: "2022", value: 240 },
        { name: "2023", value: 210 },
      ],
    },
    {
      type: "area",
      title: "Pertumbuhan Penduduk (Contoh Data)",
      data: [
        { name: "2019", value: 9800 },
        { name: "2020", value: 10200 },
        { name: "2021", value: 10600 },
        { name: "2022", value: 10950 },
        { name: "2023", value: 10879 },
      ],
    },
  ]);

  const renderChart = (chart: ChartData) => {
    switch (chart.type) {
      case "pie":
        return (
          <PieChart>
            <Pie
              data={chart.data}
              cx="50%"
              cy="50%"
              outerRadius={80}
              dataKey="value"
              label={({ name, percent }) =>
                percent !== undefined
                  ? `${name}: ${(percent * 100).toFixed(1)}%`
                  : name
              }
            >
              {chart.data.map((_, i) => (
                <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        );

      case "bar":
        return (
          <BarChart
            data={chart.data}
            margin={{ top: 20, right: 30, left: 20, bottom: 100 }}
          >
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#2B6CB0" />
            <XAxis
              dataKey="name"
              angle={-45}
              textAnchor="end"
              interval={0}
              height={120}
              tick={{ fontSize: 12 }}
            />
            <YAxis allowDecimals={false} />
          </BarChart>
        );

      case "line":
        return (
          <LineChart
            data={chart.data}
            margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#2B6CB0"
              strokeWidth={2}
            />
          </LineChart>
        );

      case "area":
        return (
          <AreaChart
            data={chart.data}
            margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#48BB78"
              fill="#C6F6D5"
            />
          </AreaChart>
        );

      default:
        return <p>Chart tipe "{chart.type}" belum didukung.</p>;
    }
  };

  return (
    <main className="min-h-screen py-12 px-4 md:px-10 lg:px-20 bg-white text-gray-800">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Data Kependudukan Desa Bujak
        </h1>

        {charts.map((chart, index) => (
          <div
            key={index}
            className="bg-gray-50 rounded-xl shadow p-6 w-full mt-10"
          >
            <h2 className="text-lg font-semibold mb-4 text-center">
              {chart.title}
            </h2>
            <ResponsiveContainer
              width="100%"
              height={chart.type === "bar" ? 400 : 250}
            >
              {renderChart(chart)}
            </ResponsiveContainer>
          </div>
        ))}
      </div>
    </main>
  );
}
