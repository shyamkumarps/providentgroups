import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Provident Groups",
  description: "Get in touch with Provident Groups for career guidance and university admissions support.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
