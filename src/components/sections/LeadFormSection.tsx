"use client";

import { useState, useRef } from "react";
import { gsap } from "gsap";
import { useStaggerReveal } from "@/hooks/useStaggerReveal";
import { useSvgDraw } from "@/hooks/useSvgDraw";
import { getCourses } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Toast, type ToastType } from "@/components/ui/Toast";
import { CustomSelect } from "@/components/ui/CustomSelect";

const courses = getCourses();
const courseOptions = courses.map((c) => ({ value: c.title, label: c.title }));

export function LeadFormSection() {
  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState("");
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const formContainerRef = useRef<HTMLDivElement>(null);
  const linesDrawRef = useRef<HTMLDivElement>(null);

  useStaggerReveal(formRef, { childSelector: ".form-field", y: 24, stagger: 0.08 });
  useSvgDraw(linesDrawRef, { start: "top 80%", end: "top 30%", scrub: 1 });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      course: formData.get("course"),
      message: formData.get("message") || "",
      sourcePage: "home",
    };
    setLoading(true);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.ok) {
        setToast({ message: "Thank you! We'll contact you soon.", type: "success" });
        form.reset();
        setCourse("");
        if (formContainerRef.current) {
          gsap.fromTo(
            formContainerRef.current,
            { scale: 1 },
            { scale: 1.01, duration: 0.15, yoyo: true, repeat: 1, ease: "power2.out" }
          );
        }
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
    <section className="section-padding bg-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-30" style={{ background: "radial-gradient(circle at 50% 30%, rgba(15,118,110,0.08) 0%, transparent 60%)" }} aria-hidden />
      <div className="absolute inset-0 noise-overlay pointer-events-none" aria-hidden />
      <div className="container mx-auto px-4 max-w-2xl relative">
        <SectionHeading
          title="Speak with Our Consultants Today!"
          subtitle="Fill in your details and we'll get back to you shortly."
        />
        <div ref={formContainerRef} className="relative rounded-3xl border border-primary/10 bg-white/95 shadow-card p-5 md:p-7 overflow-visible">
          <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none" aria-hidden>
            <div className="absolute inset-0 noise-overlay" aria-hidden />
            <div className="absolute -top-6 -left-6 w-28 h-28 rounded-full bg-accent/6 blur-2xl" aria-hidden />
            <div
              ref={linesDrawRef}
              className="absolute -right-10 top-12 h-[68%] w-[55%] text-primary/10 hidden lg:block z-[1]"
              aria-hidden
            >
              <svg viewBox="0 0 600 400" className="w-full h-full object-contain" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
                <path d="M20 300l170-120 130 90 130-140 120 110" />
                <path d="M70 120h120v100h120v-80h120v140" />
              </svg>
            </div>
          </div>
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 relative z-10">
          <div className="form-field">
            <label htmlFor="name" className="block text-sm font-medium text-primary mb-1">Name *</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="w-full rounded-xl border border-neutral-muted/30 bg-white px-4 py-3 text-primary focus:ring-2 focus:ring-accent focus:border-accent focus:shadow-[0_0_0_3px_rgba(249,115,22,0.15)] outline-none transition-shadow duration-200"
              placeholder="Your name"
            />
          </div>
          <div className="form-field">
            <label htmlFor="phone" className="block text-sm font-medium text-primary mb-1">Phone *</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              className="w-full rounded-xl border border-neutral-muted/30 bg-white px-4 py-3 text-primary focus:ring-2 focus:ring-accent focus:border-accent focus:shadow-[0_0_0_3px_rgba(249,115,22,0.15)] outline-none transition-shadow duration-200"
              placeholder="+91 98765 43210"
            />
          </div>
          <div className="form-field">
            <label htmlFor="email" className="block text-sm font-medium text-primary mb-1">Email *</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full rounded-xl border border-neutral-muted/30 bg-white px-4 py-3 text-primary focus:ring-2 focus:ring-accent focus:border-accent focus:shadow-[0_0_0_3px_rgba(249,115,22,0.15)] outline-none transition-shadow duration-200"
              placeholder="you@example.com"
            />
          </div>
          <div className="form-field relative z-20">
            <label htmlFor="course" className="block text-sm font-medium text-primary mb-1">Interested Course</label>
            <CustomSelect
              id="course"
              name="course"
              value={course}
              onChange={setCourse}
              options={courseOptions}
              placeholder="Select a course"
              aria-label="Interested course"
            />
          </div>
          <div className="form-field">
            <label htmlFor="message" className="block text-sm font-medium text-primary mb-1">Message</label>
            <textarea
              id="message"
              name="message"
              rows={3}
              className="w-full rounded-xl border border-neutral-muted/30 bg-white px-4 py-3 text-primary focus:ring-2 focus:ring-accent focus:border-accent focus:shadow-[0_0_0_3px_rgba(249,115,22,0.15)] outline-none resize-none transition-shadow duration-200"
              placeholder="Any specific questions?"
            />
          </div>
          <div className="form-field">
          <Button
            type="submit"
            disabled={loading}
            className="w-full py-4 hover:shadow-[0_4px_20px_rgba(249,115,22,0.4)]"
          >
            {loading ? (
              <>
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Sending...
              </>
            ) : (
              "Submit"
            )}
          </Button>
          </div>
          </form>
        </div>
      </div>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </section>
  );
}
