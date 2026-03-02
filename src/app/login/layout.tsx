import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Provident Groups",
  description: "Sign in to your Provident Groups account.",
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
