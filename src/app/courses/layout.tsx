import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Courses | Provident Groups",
  description: "Explore courses we support—Nursing, Engineering, Management, Medical, Pharmacy, and more.",
};

export default function CoursesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
