"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HrsDocumentationPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/documentation?only=hrs&section=hrs-desktop-overview");
  }, [router]);

  return (
    <div style={{ padding: "2rem" }}>
      <h2 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>HRS Documentation</h2>
      <p>Redirecting to HRS documentation…</p>
    </div>
  );
}