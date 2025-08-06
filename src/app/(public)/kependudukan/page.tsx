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
import { useEffect, useState } from "react";

const COLORS = ["#2B6CB0", "#48BB78", "#CBD5E0"];

type ChartType = "pie" | "bar" | "line" | "area";

type ChartData = {
  id: string;
  type: ChartType;
  title: string;
  data: { name: string; value: number }[];
};

export default function KependudukanPage() {
  const [charts, setCharts] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharts = async () => {
      try {
        const res = await fetch("/api/chart");
        const json = await res.json();

        // Konversi 'data' dari JSON string ke object jika perlu
        const parsed = json.map((chart: any) => ({
          id: chart.id,
          type: chart.type,
          title: chart.title,
          data:
            typeof chart.data === "string"
              ? JSON.parse(chart.data)
              : chart.data,
        }));

        setCharts(parsed);
      } catch (err) {
        console.error("Failed to load charts", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCharts();
  }, []);

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
            {/* <Legend /> */}
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

        {loading ? (
          <p className="text-center">Memuat data...</p>
        ) : charts.length === 0 ? (
          <p className="text-center text-red-500">Tidak ada data grafik</p>
        ) : (
          charts.map((chart, index) => (
            <div
              key={chart.id}
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
          ))
        )}
      </div>
    </main>
  );
}
