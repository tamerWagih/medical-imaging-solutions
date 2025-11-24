// Authentication using API route with environment variables
// Credentials are stored server-side only (in Vercel environment variables or .env.local)
// This is more secure than hardcoded credentials

// Authenticate user via API (credentials validated server-side)
export async function authenticate(username: string, password: string): Promise<boolean> {
  try {
    const response = await fetch("/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      // Set sessionStorage for client-side checks
      if (typeof window !== "undefined") {
        sessionStorage.setItem("dev_auth", "authenticated");
      }
      return true;
    }
    return false;
  } catch (error) {
    console.error("Authentication error:", error);
    return false;
  }
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  const auth = sessionStorage.getItem("dev_auth");
  return auth === "authenticated";
}

// Logout user
export async function logout(): Promise<void> {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem("dev_auth");
    
    // Clear server-side cookie
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (error) {
      // If API fails, at least clear sessionStorage
      console.error("Logout error:", error);
    }
  }
}

