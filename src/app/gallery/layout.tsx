import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery | Provident Groups",
  description: "Photos and videos from Provident Groups—education consultancy and admissions support.",
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
