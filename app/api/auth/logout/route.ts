import { NextResponse } from "next/server";

// Logout endpoint - clears authentication cookie

export async function POST() {
  const response = NextResponse.json({ success: true });
  
  // Clear the authentication cookie
  response.cookies.set("dev_auth", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 0, // Expire immediately
    path: "/",
  });

  return response;
}

