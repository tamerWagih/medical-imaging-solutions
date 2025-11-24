// Simple client-side authentication
// Single hardcoded account for developers documentation access

export const DEV_CREDENTIALS = {
  username: "developer",
  password: "dev2025", // Change this to your desired password
};

// Check if user is authenticated
export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  const auth = sessionStorage.getItem("dev_auth");
  return auth === "authenticated";
}

// Authenticate user
export function authenticate(username: string, password: string): boolean {
  if (
    username === DEV_CREDENTIALS.username &&
    password === DEV_CREDENTIALS.password
  ) {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("dev_auth", "authenticated");
    }
    return true;
  }
  return false;
}

// Logout user
export function logout(): void {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem("dev_auth");
  }
}

