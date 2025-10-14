"use client";

import Link from "next/link";
import { Home, ArrowLeft, Search, FileText, Mail } from "lucide-react";

export default function NotFound() {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        {/* Error Icon */}
        <div className="error-icon">
          <Search size={80} />
        </div>

        {/* Error Number */}
        <h1 className="error-number">404</h1>

        {/* Error Title */}
        <h2 className="error-title">Page Not Found</h2>

        {/* Error Description */}
        <p className="error-description">
          Sorry, we couldn't find the page you're looking for. The page might have been moved, deleted, or doesn't exist.
        </p>

        {/* Action Buttons */}
        <div className="error-actions">
          <Link href="/">
            <button className="error-button error-button-primary">
              <Home size={20} />
              Go Home
            </button>
          </Link>
          <button 
            onClick={() => window.history.back()}
            className="error-button error-button-secondary"
          >
            <ArrowLeft size={20} />
            Go Back
          </button>
        </div>

        {/* Helpful Links */}
        <div className="helpful-links">
          <h3 className="helpful-links-title">Maybe you're looking for:</h3>
          <div className="helpful-links-grid">
            <Link href="/products/radview" className="helpful-link">
              <div className="helpful-link-icon">
                <Search size={24} />
              </div>
              <div className="helpful-link-content">
                <span className="helpful-link-title">RadView Desktop</span>
                <span className="helpful-link-description">Advanced medical imaging software</span>
              </div>
            </Link>
            
            <Link href="/products" className="helpful-link">
              <div className="helpful-link-icon">
                <FileText size={24} />
              </div>
              <div className="helpful-link-content">
                <span className="helpful-link-title">All Products</span>
                <span className="helpful-link-description">Browse our complete product suite</span>
              </div>
            </Link>
            
            <Link href="/documentation" className="helpful-link">
              <div className="helpful-link-icon">
                <FileText size={24} />
              </div>
              <div className="helpful-link-content">
                <span className="helpful-link-title">Documentation</span>
                <span className="helpful-link-description">User guides and API references</span>
              </div>
            </Link>
            
            <Link href="/contact" className="helpful-link">
              <div className="helpful-link-icon">
                <Mail size={24} />
              </div>
              <div className="helpful-link-content">
                <span className="helpful-link-title">Contact Support</span>
                <span className="helpful-link-description">Get help from our team</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}