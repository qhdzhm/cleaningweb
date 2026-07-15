import type { Metadata } from "next";
import AdminShell from "./AdminShell";

// Server component purely so this can be exported: the admin panel must never
// be indexed. robots.txt asks crawlers not to fetch /admin; this makes sure the
// pages stay out of the index even if something links to them.
export const metadata: Metadata = {
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminShell>{children}</AdminShell>;
}
