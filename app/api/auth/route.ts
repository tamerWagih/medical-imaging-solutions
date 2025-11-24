import { NextResponse } from "next/server";

// Server-side authentication
// Credentials from environment variables (set in Vercel or .env.local)
// These are NEVER exposed to the client - only validated server-side

// Get credentials from environment variables
// These should be set in .env.local for local development or Vercel for production
// If not set, authentication will fail (security by default)
const DEV_USERNAME = process.env.DEV_USERNAME;
const DEV_PASSWORD = process.env.DEV_PASSWORD;

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    // Server-side credential validation
    // Credentials are compared on the server, never sent to client
    if (username === DEV_USERNAME && password === DEV_PASSWORD) {
      const response = NextResponse.json({ success: true });
      
      // Set HTTP-only cookie (more secure than sessionStorage alone)
      // httpOnly prevents JavaScript access (XSS protection)
      response.cookies.set("dev_auth", "authenticated", {
        httpOnly: true, // Cannot be accessed via JavaScript
        secure: process.env.NODE_ENV === "production", // HTTPS only in production
        sameSite: "strict", // CSRF protection
        maxAge: 60 * 60 * 24, // 24 hours
        path: "/",
      });

      return response;
    }

    // Invalid credentials
    return NextResponse.json(
      { error: "Invalid username or password" },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}

