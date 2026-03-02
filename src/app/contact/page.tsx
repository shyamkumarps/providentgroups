"use client";

import { useState, useRef } from "react";
import { getSiteData } from "@/lib/data";
import { useStaggerReveal } from "@/hooks/useStaggerReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Toast, type ToastType } from "@/components/ui/Toast";
import { PageHero } from "@/components/ui/PageHero";

const site = getSiteData();
const { contact } = site;

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  useStaggerReveal(formRef, { childSelector: ".form-field", y: 24, stagger: 0.08 });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      course: formData.get("course") || "",
      message: formData.get("message") || "",
      sourcePage: "contact",
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
        setToast({ message: "Thank you! We'll get back to you soon.", type: "success" });
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

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || contact.whatsapp;
  const mapsEmbedUrl = process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL || contact.mapsEmbedUrl;

  return (
    <div>
      <PageHero title="Contact Us" subtitle="Get in touch for consultations and admission support." />
      <section className="section-padding bg-background relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: "url(/assets/patterns/blob-1.svg)", backgroundSize: "cover" }} aria-hidden />
        <div className="container mx-auto px-4 max-w-6xl relative">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
            <div className="rounded-2xl bg-white p-6 lg:p-8 shadow-xl shadow-primary/5 border border-primary/5 flex flex-col">
              <SectionHeading title="Send a Message" subtitle="Fill in the form and we'll respond shortly." />
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 flex-1 flex flex-col">
                <div className="form-field">
                  <label htmlFor="name" className="block text-sm font-medium text-primary mb-1">Name *</label>
                  <input id="name" name="name" type="text" required className="w-full rounded-xl border border-neutral-muted/30 px-4 py-3 text-primary focus:ring-2 focus:ring-accent outline-none transition-shadow" placeholder="Your name" />
                </div>
                <div className="form-field">
                  <label htmlFor="phone" className="block text-sm font-medium text-primary mb-1">Phone *</label>
                  <input id="phone" name="phone" type="tel" required className="w-full rounded-xl border border-neutral-muted/30 px-4 py-3 text-primary focus:ring-2 focus:ring-accent outline-none transition-shadow" placeholder={contact.phone} />
                </div>
                <div className="form-field">
                  <label htmlFor="email" className="block text-sm font-medium text-primary mb-1">Email *</label>
                  <input id="email" name="email" type="email" required className="w-full rounded-xl border border-neutral-muted/30 px-4 py-3 text-primary focus:ring-2 focus:ring-accent outline-none transition-shadow" placeholder={contact.email} />
                </div>
                <div className="form-field flex-1 min-h-[1rem]">
                  <label htmlFor="message" className="block text-sm font-medium text-primary mb-1">Message *</label>
                  <textarea id="message" name="message" rows={4} required className="w-full rounded-xl border border-neutral-muted/30 px-4 py-3 text-primary focus:ring-2 focus:ring-accent outline-none resize-none transition-shadow" placeholder="How can we help?" />
                </div>
                <div className="form-field">
                <Button type="submit" variant="primary" disabled={loading} className="w-full py-4 mt-2">
                  {loading ? (
                    <>
                      <span className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" aria-hidden />
                      Sending...
                    </>
                  ) : (
                    "Submit"
                  )}
                </Button>
                </div>
              </form>
            </div>
            <div className="rounded-2xl bg-white p-6 lg:p-8 shadow-xl shadow-primary/5 border border-primary/5 flex flex-col">
              <SectionHeading title="Contact Details" />
              <div className="space-y-5 text-neutral-dark flex-1">
                <p>
                  <strong className="text-primary">Address</strong><br />
                  {contact.mapsUrl ? (
                    <a href={contact.mapsUrl} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                      {contact.address}
                    </a>
                  ) : (
                    <span className="text-neutral-muted">{contact.address}</span>
                  )}
                </p>
                <p>
                  <strong className="text-primary">Phone</strong><br />
                  <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="text-accent hover:underline">{contact.phone}</a>
                </p>
                <p>
                  <strong className="text-primary">Email</strong><br />
                  <a href={`mailto:${contact.email}`} className="text-accent hover:underline">{contact.email}</a>
                </p>
                <p>
                  <strong className="text-primary">Hours</strong><br />
                  <span className="text-neutral-muted">{contact.hours}</span>
                </p>
              </div>
              <p className="text-sm text-neutral-muted mt-6 mb-4">Prefer to talk? Reach us directly.</p>
              <div className="flex flex-wrap gap-4">
                <a
                  href={`https://wa.me/${whatsappNumber.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] text-white font-semibold px-5 py-3 shadow-md hover:shadow-xl hover:shadow-[#25D366]/35 transition-all duration-300 ease-out hover:scale-[1.02] active:scale-[0.97] active:shadow-inner focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
                  aria-label="Chat on WhatsApp"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp
                </a>
                <a
                  href={`tel:${contact.phone.replace(/\s/g, "")}`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-primary text-primary font-semibold px-5 py-3 shadow-md hover:shadow-xl hover:shadow-primary/20 hover:bg-primary hover:text-white transition-all duration-300 ease-out hover:scale-[1.02] active:scale-[0.97] active:shadow-inner focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                  aria-label="Call us"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call
                </a>
              </div>
            </div>
          </div>

          {mapsEmbedUrl && (
            <div className="mt-12 lg:mt-16">
              <h2 className="font-heading text-xl font-bold text-primary mb-4">Find us</h2>
              <div className="rounded-2xl overflow-hidden border border-primary/10 shadow-xl bg-primary/5 w-full h-[clamp(320px,50vh,480px)] min-h-[320px]">
                <iframe
                  src={mapsEmbedUrl}
                  title="Our location on Google Maps"
                  className="w-full h-full min-h-[320px] block border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          )}
        </div>
      </section>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
