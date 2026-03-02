import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | Provident Groups",
  description: "Admin panel for Provident Groups.",
};

export default function AdminPage() {
  return (
    <div className="section-padding">
      <div className="container mx-auto px-4 max-w-2xl text-center">
        <h1 className="font-heading text-3xl font-bold text-primary mb-4">Admin Panel</h1>
        <p className="text-neutral-muted">Coming in Phase 2.</p>
      </div>
    </div>
  );
}
