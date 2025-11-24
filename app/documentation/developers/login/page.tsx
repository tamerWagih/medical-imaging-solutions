"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Lock, User, AlertCircle } from "lucide-react";
import { authenticate, isAuthenticated } from "@/lib/auth";
import "./login.css";

export default function DeveloperLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Redirect if already authenticated
    if (isAuthenticated()) {
      router.push("/documentation/developers");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate small delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 300));

    if (authenticate(username, password)) {
      router.push("/documentation/developers");
    } else {
      setError("Invalid username or password");
      setIsLoading(false);
    }
  };

  return (
    <div className="dev-login-container">
      <div className="dev-login-card">
        <div className="dev-login-header">
          <div className="dev-login-icon">
            <Lock size={32} />
          </div>
          <h1 className="dev-login-title">Developer Access</h1>
          <p className="dev-login-subtitle">
            Enter your credentials to access developer documentation
          </p>
        </div>

        <form onSubmit={handleSubmit} className="dev-login-form">
          {error && (
            <div className="dev-login-error">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          <div className="dev-login-field">
            <label htmlFor="username" className="dev-login-label">
              <User size={18} />
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="dev-login-input"
              placeholder="Enter username"
              required
              autoFocus
              disabled={isLoading}
            />
          </div>

          <div className="dev-login-field">
            <label htmlFor="password" className="dev-login-label">
              <Lock size={18} />
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="dev-login-input"
              placeholder="Enter password"
              required
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            className="dev-login-button"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="dev-login-footer">
          <p className="dev-login-footer-text">
            Restricted access for developers only
          </p>
        </div>
      </div>
    </div>
  );
}

