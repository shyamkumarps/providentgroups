"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { getSiteData } from "@/lib/data";
import { useGsapReveal } from "@/hooks/useGsapReveal";
import { Button } from "@/components/ui/Button";
import { Toast, type ToastType } from "@/components/ui/Toast";

const site = getSiteData();

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  useGsapReveal(cardRef);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.ok) {
        setToast({ message: "Login successful.", type: "success" });
        form.reset();
      } else {
        setToast({ message: data.error || "Invalid credentials.", type: "error" });
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
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-center">Login</h1>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container mx-auto px-4 flex justify-center">
          <div
            ref={cardRef}
            className="w-full max-w-md rounded-2xl bg-white shadow-xl border border-white/20 p-8 md:p-10"
          >
            <h2 className="font-heading text-2xl font-bold text-primary mb-6">
              Welcome to {site.brand.name}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-primary mb-1">
                  Email *
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
                <label htmlFor="password" className="block text-sm font-medium text-primary mb-1">
                  Password *
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="w-full rounded-xl border border-neutral-muted/30 px-4 py-3 text-primary focus:ring-2 focus:ring-accent focus:border-accent outline-none"
                  placeholder="••••••••"
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
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </form>
            <p className="mt-6 text-center text-neutral-muted text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="font-semibold text-accent hover:underline">
                Sign up
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
