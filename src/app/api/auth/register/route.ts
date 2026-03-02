import { NextRequest, NextResponse } from "next/server";

interface RegisterBody {
  name?: string;
  email?: string;
  phone?: string;
  parentPhone?: string;
  location?: string;
  courseSelected?: string;
  qualification?: string;
  institution?: string;
  message?: string;
}

function validate(body: RegisterBody): string | null {
  if (!body.name || typeof body.name !== "string" || body.name.trim().length === 0) {
    return "Name is required.";
  }
  if (!body.email || typeof body.email !== "string" || body.email.trim().length === 0) {
    return "Email is required.";
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(body.email)) {
    return "Invalid email format.";
  }
  if (!body.phone || typeof body.phone !== "string" || body.phone.trim().length === 0) {
    return "Phone is required.";
  }
  return null;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as RegisterBody;
    const error = validate(body);
    if (error) {
      return NextResponse.json({ ok: false, error }, { status: 400 });
    }

    const payload = {
      name: String(body.name).trim(),
      email: String(body.email).trim(),
      phone: String(body.phone).trim(),
      parentPhone: body.parentPhone ? String(body.parentPhone).trim() : "",
      location: body.location ? String(body.location).trim() : "",
      courseSelected: body.courseSelected ? String(body.courseSelected).trim() : "",
      qualification: body.qualification ? String(body.qualification).trim() : "",
      institution: body.institution ? String(body.institution).trim() : "",
      message: body.message ? String(body.message).trim() : "",
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
          subject: `New registration: ${payload.name} - ${payload.courseSelected || "No course"}`,
          text: `Name: ${payload.name}\nEmail: ${payload.email}\nPhone: ${payload.phone}\nParent Phone: ${payload.parentPhone || "—"}\nLocation: ${payload.location || "—"}\nCourse: ${payload.courseSelected || "—"}\nQualification: ${payload.qualification || "—"}\nInstitution: ${payload.institution || "—"}\nMessage: ${payload.message || "—"}`,
        });
      } catch (emailErr) {
        console.error("Resend error:", emailErr);
      }
    } else {
      console.log("[Register]", payload);
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Server error." }, { status: 500 });
  }
}
