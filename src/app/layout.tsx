import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Desafío Técnico - Tree Component - Araneo Agustin",
  description:
    "Una aplicación creada con Next.js para el desafío técnico de Tree component",
  keywords: [
    "Next.js",
    "Desafío Técnico",
    "React",
    "Componentes",
    "SEO",
    "Tree component",
  ].join(", "),
  authors: [{ name: "Araneo Agustin", url: "https://araneo.com.ar" }],
  openGraph: {
    title: "Desafío Técnico - Tree Component - Araneo Agustin",
    description:
      "Una aplicación moderna construida con Next.js, optimizada para rendimiento y SEO.",
    url: "https://araneo.com.ar",
    type: "website",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-[family-name:var(--font-geist-sans)]`}
      >
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
