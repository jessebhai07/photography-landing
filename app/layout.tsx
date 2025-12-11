import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LUMOS",
  description: "A random photographer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
