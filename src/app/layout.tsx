import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "NaturePure Cleaning | Chemical-Free House Cleaning in Hobart",
  description: "NaturePure Cleaning - Professional chemical-free house cleaning service in Hobart and surrounding areas. Safe for your family, pets, and the environment.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
