import type { Metadata, Viewport } from "next";
import { Archivo_Black, Inter } from "next/font/google";
import "./globals.css";

const archivoBlack = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-archivo-black",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sabbath - Experiencia Cultural · Vol. 001",
  description: "Una pausa cultural con música, lectura y cine hecho en Colombia. Sabbath conecta cultura local a través de tu postal.",
  keywords: ["Sabbath", "Cultura Local", "Medellín", "Colombia", "Música", "Literatura", "Cine"],
  authors: [{ name: "Sabbath Cultural Experience" }],
};

export const viewport: Viewport = {
  themeColor: "#0B0B0D",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${archivoBlack.variable} ${inter.variable} dark`}>
      <body className="bg-sabbath-bg text-sabbath-white font-sans antialiased min-h-[100dvh] selection:bg-sabbath-red selection:text-white">
        {children}
      </body>
    </html>
  );
}
