import type { Metadata } from "next";
import "./globals.scss";

export const metadata: Metadata = {
  title: "Luna NYC Electric Dashboard",
  description: "Dashboard Web Application for Light Installation Buisness",
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