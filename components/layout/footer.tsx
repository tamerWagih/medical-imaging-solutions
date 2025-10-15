"use client";

import { COMPANY } from "@/lib/constants";
import { Activity } from "lucide-react";
import { useState } from "react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setMessage("Please enter your email address");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    try {
      // Simulate API call - replace with actual newsletter subscription logic
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMessage("Thank you for subscribing! We'll keep you updated.");
      setEmail("");
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <footer className="medical-footer">
      <div className="medical-footer-container">
        <div className="medical-footer-grid">
          {/* Company Info */}
          <div className="medical-footer-company">
            <div className="medical-footer-logo">
              <div className="medical-footer-logo-icon">
                <Activity size={28} />
              </div>
              <span className="medical-footer-logo-text">
                {COMPANY.name}
              </span>
            </div>
            <p className="medical-footer-description">
              {COMPANY.description}
            </p>
          </div>

          {/* Quick Links */}
          <div className="medical-footer-section">
            <h3 className="medical-footer-title">Quick Links</h3>
            <div className="medical-footer-links">
              <a href="/" className="medical-footer-link">Home</a>
              <a href="/products" className="medical-footer-link">Products</a>
              <a href="/about" className="medical-footer-link">About</a>
              <a href="/contact" className="medical-footer-link">Contact</a>
            </div>
          </div>

          {/* Newsletter */}
          <div className="medical-footer-section">
            <h3 className="medical-footer-title">Stay Updated</h3>
            <div className="medical-footer-newsletter">
              <p className="medical-footer-newsletter-text">
                Get the latest updates on our medical imaging solutions.
              </p>
              <form className="medical-footer-form" onSubmit={handleSubmit}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="medical-footer-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                />
                <button 
                  type="submit" 
                  className="medical-footer-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Subscribing..." : "Subscribe"}
                </button>
              </form>
              {message && (
                <p className={`medical-footer-message ${message.includes("Thank you") ? "success" : "error"}`}>
                  {message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="medical-footer-bottom">
          <p className="medical-footer-copyright">
            © {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}