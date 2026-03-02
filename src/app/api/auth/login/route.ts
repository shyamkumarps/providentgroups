import { NextRequest, NextResponse } from "next/server";

interface LoginBody {
  email?: string;
  password?: string;
}

function validate(body: LoginBody): string | null {
  if (!body.email || typeof body.email !== "string" || body.email.trim().length === 0) {
    return "Email is required.";
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(body.email)) {
    return "Invalid email format.";
  }
  if (!body.password || typeof body.password !== "string" || body.password.length === 0) {
    return "Password is required.";
  }
  return null;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as LoginBody;
    const error = validate(body);
    if (error) {
      return NextResponse.json({ ok: false, error }, { status: 400 });
    }
    // Stub: no real DB or password check yet. Phase 2: add user lookup, password verify, session/JWT.
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Server error." }, { status: 500 });
  }
}
