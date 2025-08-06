// components/organisms/DashboardGrid.tsx
import AdminNavCard from "@/components/molecules/AdminNavCard";

const navItems = [
  {
    title: "Beranda",
    description: "Edit konten halaman beranda",
    href: "/admin/beranda",
  },
  {
    title: "Tentang Desa",
    description: "Edit konten halaman tentang desa",
    href: "/admin/tentang-desa",
  },
  {
    title: "Sejarah",
    description: "Edit konten halaman sejarah",
    href: "/admin/sejarah",
  },
  {
    title: "Kependudukan",
    description: "Edit data dan infografis kependudukan",
    href: "/admin/kependudukan",
  },
  {
    title: "Kebudayaan",
    description: "Kelola informasi kebudayaan desa",
    href: "/admin/budaya",
  },
  {
    title: "Galeri",
    description: "Hubungkan data dengan tampilan peta",
    href: "/admin/galeri",
  },
  {
    title: "Artikel",
    description: "Edit konten halaman artikel",
    href: "/admin/artikel",
  },
];

export default function DashboardGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {navItems.map((item) => (
        <AdminNavCard key={item.href} {...item} />
      ))}
    </div>
  );
}
