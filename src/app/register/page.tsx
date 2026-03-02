"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { getSiteData, getCourses } from "@/lib/data";
import { useGsapReveal } from "@/hooks/useGsapReveal";
import { Button } from "@/components/ui/Button";
import { Toast, type ToastType } from "@/components/ui/Toast";

const site = getSiteData();
const courses = getCourses();

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  useGsapReveal(cardRef);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      parentPhone: formData.get("parentPhone") || "",
      location: formData.get("location") || "",
      courseSelected: formData.get("courseSelected") || "",
      qualification: formData.get("qualification") || "",
      institution: formData.get("institution") || "",
      message: formData.get("message") || "",
    };
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.ok) {
        setToast({ message: "Registration submitted successfully.", type: "success" });
        form.reset();
      } else {
        setToast({ message: data.error || "Something went wrong.", type: "error" });
      }
    } catch {
      setToast({ message: "Network error. Please try again.", type: "error" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <section className="relative -mt-16 pt-24 pb-20 md:pt-32 md:pb-28 bg-primary text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/assets/hero.svg" alt="" fill className="object-cover opacity-50" />
          <div className="absolute inset-0 bg-primary/80" />
        </div>
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-center">Register</h1>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container mx-auto px-4 flex justify-center">
          <div
            ref={cardRef}
            className="w-full max-w-[480px] rounded-2xl bg-white shadow-xl border border-white/20 p-8 md:p-10"
          >
            <h2 className="font-heading text-2xl font-bold text-primary mb-6">Register Now</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-primary mb-1">
                  Name *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full rounded-xl border border-neutral-muted/30 px-4 py-3 text-primary focus:ring-2 focus:ring-accent focus:border-accent outline-none"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-primary mb-1">
                  E-mail *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full rounded-xl border border-neutral-muted/30 px-4 py-3 text-primary focus:ring-2 focus:ring-accent focus:border-accent outline-none"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-primary mb-1">
                  Phone *
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  className="w-full rounded-xl border border-neutral-muted/30 px-4 py-3 text-primary focus:ring-2 focus:ring-accent focus:border-accent outline-none"
                  placeholder="+91 98765 43210"
                />
              </div>
              <div>
                <label htmlFor="parentPhone" className="block text-sm font-medium text-primary mb-1">
                  Parent Phone
                </label>
                <input
                  id="parentPhone"
                  name="parentPhone"
                  type="tel"
                  className="w-full rounded-xl border border-neutral-muted/30 px-4 py-3 text-primary focus:ring-2 focus:ring-accent focus:border-accent outline-none"
                  placeholder="+91 98765 43210"
                />
              </div>
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-primary mb-1">
                  Location
                </label>
                <input
                  id="location"
                  name="location"
                  type="text"
                  className="w-full rounded-xl border border-neutral-muted/30 px-4 py-3 text-primary focus:ring-2 focus:ring-accent focus:border-accent outline-none"
                  placeholder="City, State"
                />
              </div>
              <div>
                <label htmlFor="courseSelected" className="block text-sm font-medium text-primary mb-1">
                  Course Selected
                </label>
                <select
                  id="courseSelected"
                  name="courseSelected"
                  className="w-full rounded-xl border border-neutral-muted/30 px-4 py-3 text-primary focus:ring-2 focus:ring-accent focus:border-accent outline-none bg-white"
                >
                  <option value="">Select a course</option>
                  {courses.map((c) => (
                    <option key={c.slug} value={c.title}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="qualification" className="block text-sm font-medium text-primary mb-1">
                  Qualification
                </label>
                <input
                  id="qualification"
                  name="qualification"
                  type="text"
                  className="w-full rounded-xl border border-neutral-muted/30 px-4 py-3 text-primary focus:ring-2 focus:ring-accent focus:border-accent outline-none"
                  placeholder="e.g. 12th, B.Sc"
                />
              </div>
              <div>
                <label htmlFor="institution" className="block text-sm font-medium text-primary mb-1">
                  Institution
                </label>
                <input
                  id="institution"
                  name="institution"
                  type="text"
                  className="w-full rounded-xl border border-neutral-muted/30 px-4 py-3 text-primary focus:ring-2 focus:ring-accent focus:border-accent outline-none"
                  placeholder="Current or last institution"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-primary mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  className="w-full rounded-xl border border-neutral-muted/30 px-4 py-3 text-primary focus:ring-2 focus:ring-accent focus:border-accent outline-none resize-none"
                  placeholder="Any additional details"
                />
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Register"
                )}
              </Button>
            </form>
            <p className="mt-6 text-center text-neutral-muted text-sm">
              Already have an account?{" "}
              <Link href="/login" className="font-semibold text-accent hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </section>
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
    </div>
  );
}
