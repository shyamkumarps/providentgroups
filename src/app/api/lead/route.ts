import { NextRequest, NextResponse } from "next/server";

interface LeadBody {
  name?: string;
  phone?: string;
  email?: string;
  course?: string;
  message?: string;
  sourcePage?: string;
}

function validate(body: LeadBody): string | null {
  if (!body.name || typeof body.name !== "string" || body.name.trim().length === 0) {
    return "Name is required.";
  }
  if (!body.phone || typeof body.phone !== "string" || body.phone.trim().length === 0) {
    return "Phone is required.";
  }
  if (!body.email || typeof body.email !== "string" || body.email.trim().length === 0) {
    return "Email is required.";
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(body.email)) {
    return "Invalid email format.";
  }
  return null;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as LeadBody;
    const error = validate(body);
    if (error) {
      return NextResponse.json({ ok: false, error }, { status: 400 });
    }

    const payload = {
      name: String(body.name).trim(),
      phone: String(body.phone).trim(),
      email: String(body.email).trim(),
      course: body.course ? String(body.course).trim() : "",
      message: body.message ? String(body.message).trim() : "",
      sourcePage: body.sourcePage ? String(body.sourcePage).trim() : "unknown",
    };

    const resendKey = process.env.RESEND_API_KEY;
    const leadEmailTo = process.env.LEAD_EMAIL_TO;

    if (resendKey && leadEmailTo) {
      try {
        const { Resend } = await import("resend");
        const resend = new Resend(resendKey);
        await resend.emails.send({
          from: "Provident Groups <onboarding@resend.dev>",
          to: leadEmailTo,
          subject: `New lead: ${payload.name} - ${payload.course || "No course"}`,
          text: `Name: ${payload.name}\nPhone: ${payload.phone}\nEmail: ${payload.email}\nCourse: ${payload.course || "—"}\nMessage: ${payload.message || "—"}\nSource: ${payload.sourcePage}`,
        });
      } catch (emailErr) {
        console.error("Resend error:", emailErr);
      }
    } else {
      console.log("[Lead]", payload);
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Server error." }, { status: 500 });
  }
}
