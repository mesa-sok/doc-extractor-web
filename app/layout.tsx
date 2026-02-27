import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PDF Extractor – Doc Extractor Web",
  description:
    "Extract text from PDF documents with a clean, premium neumorphic interface.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
