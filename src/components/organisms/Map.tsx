"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { Feature, FeatureCollection, Geometry } from "geojson";
import type { LeafletMouseEvent, Layer } from "leaflet";
import H1 from "@/components/atoms/H1";

export default function MapSection({
  hasTopBorder = false,
}: {
  hasTopBorder?: boolean;
}) {
  const [geojsonData, setGeojsonData] = useState<FeatureCollection | null>(
    null
  );

  useEffect(() => {
    fetch("/Batas_Desa_Bujak_Line.geojson")
      .then((res) => res.json())
      .then((data) => setGeojsonData(data));
  }, []);

  const geojsonStyle = {
    fillColor: "#2B6CB0",
    weight: 2,
    opacity: 1,
    color: "#2B6CB0",
    fillOpacity: 0.3,
  };

  const onEachFeature = (feature: Feature<Geometry, any>, layer: Layer) => {
    const name = feature.properties?.name ?? "Tanpa nama";
    layer.on({
      mouseover: (e: LeafletMouseEvent) => {
        e.target.setStyle({ weight: 5, color: "#666", fillOpacity: 0.7 });
      },
      mouseout: (e: LeafletMouseEvent) => {
        e.target.setStyle(geojsonStyle);
      },
      click: () => {
        alert(`Wilayah diklik: ${name}`);
      },
    });
  };

  return (
    <section
      className={`w-full px-6 md:px-24 py-12 md:py-20 ${
        hasTopBorder ? "border-t border-gray-300" : ""
      }`}
    >
      <div className="flex flex-col gap-12 max-w-4xl mx-auto items-center">
        <H1 className="text-2xl md:text-3xl text-center">
          Peta Interaktif Desa Bujak
        </H1>

        <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg z-0">
          <MapContainer
            center={[-8.6392, 116.3303]}
            zoom={14}
            className=""
            scrollWheelZoom={true}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {geojsonData && (
              <GeoJSON
                data={geojsonData}
                onEachFeature={onEachFeature}
                style={() => geojsonStyle}
              />
            )}
          </MapContainer>
        </div>
      </div>
    </section>
  );
}
