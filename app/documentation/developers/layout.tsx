"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";

export default function DevelopersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Only protect the main developers page, not the login page
    if (pathname === "/documentation/developers" && !isAuthenticated()) {
      router.push("/documentation/developers/login");
    }
  }, [pathname, router]);

  return <>{children}</>;
}

