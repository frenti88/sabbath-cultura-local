import React, { Suspense } from "react";
import { Metadata } from "next";
import { AudioProvider } from "@/context/AudioContext";
import { edition001 } from "@/content/editions/001";
import { AppShell } from "@/components/spotify/AppShell";

export const metadata: Metadata = {
  title: "Sabbath — Tu pausa suena local · Edición 001",
  description:
    "Una pausa cultural con música, lectura y cine hecho en Colombia. Sabbath Cultura Local Vol. 001.",
  openGraph: {
    title: "Sabbath — Tu pausa suena local",
    description: "Música, literatura y cine independiente desde Medellín.",
    type: "website",
  },
};

export default function Home() {
  return (
    <AudioProvider edition={edition001}>
      <Suspense fallback={<div className="min-h-screen bg-[#101010]" />}>
        <AppShell edition={edition001} />
      </Suspense>
    </AudioProvider>
  );
}
