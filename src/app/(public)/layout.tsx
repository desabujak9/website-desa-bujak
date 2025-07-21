"use client";
import NavigationBar from "@/components/organisms/NavigationBar";
import "../globals.css";
import Footer from "@/components/organisms/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <NavigationBar />
      {children}
      <Footer />
    </main>
  );
}
