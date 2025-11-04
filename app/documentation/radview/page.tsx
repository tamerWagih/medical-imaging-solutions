"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RadViewDocumentationPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/documentation?only=radview&section=radview-desktop-overview");
  }, [router]);

  return (
    <div style={{ padding: "2rem" }}>
      <h2 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>RadView Documentation</h2>
      <p>Redirecting to RadView documentation…</p>
    </div>
  );
}