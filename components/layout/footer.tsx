import { COMPANY } from "@/lib/constants";
import { Mail, Activity } from "lucide-react";

export function Footer() {
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
              <form className="medical-footer-form">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="medical-footer-input"
                />
                <button type="submit" className="medical-footer-button">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="medical-footer-bottom">
          <p className="medical-footer-copyright">
            © {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
          </p>
          <div className="medical-footer-contact">
            <div className="medical-footer-contact-icon">
              <Mail size={16} />
            </div>
            <a
              href="mailto:dev@cstride.com"
              className="medical-footer-contact-link"
            >
              dev@cstride.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}