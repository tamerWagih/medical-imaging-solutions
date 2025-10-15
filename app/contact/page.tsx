import { Mail, MessageCircle, Clock, MapPin } from "lucide-react";
import "./contact.css";

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="contact-hero-container">
          <h1 className="contact-hero-title">Contact Us</h1>
          <p className="contact-hero-subtitle">
            Get in touch with our team for support, inquiries, or collaboration opportunities
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="contact-container">
        {/* Contact Info Card */}
        <section className="contact-info">
          <div className="contact-info-card">
            <div className="contact-info-header">
              <MessageCircle className="contact-info-icon" size={48} />
              <h2 className="contact-info-title">Get In Touch</h2>
            </div>
            
            <div className="contact-details">
              <div className="contact-detail-item">
                <div className="contact-detail-icon-wrapper">
                  <Mail className="contact-detail-icon" size={24} />
                </div>
                <div className="contact-detail-content">
                  <h3 className="contact-detail-label">Email</h3>
                  <a 
                    href="mailto:dev@cstride.com" 
                    className="contact-detail-value"
                  >
                    dev@cstride.com
                  </a>
                  <p className="contact-detail-description">
                    Send us your questions, feedback, or collaboration proposals
                  </p>
                </div>
              </div>

              <div className="contact-detail-item">
                <div className="contact-detail-icon-wrapper">
                  <Clock className="contact-detail-icon" size={24} />
                </div>
                <div className="contact-detail-content">
                  <h3 className="contact-detail-label">Response Time</h3>
                  <p className="contact-detail-value">Within 24 hours</p>
                  <p className="contact-detail-description">
                    We typically respond to all inquiries within one business day
                  </p>
                </div>
              </div>

              <div className="contact-detail-item">
                <div className="contact-detail-icon-wrapper">
                  <MapPin className="contact-detail-icon" size={24} />
                </div>
                <div className="contact-detail-content">
                  <h3 className="contact-detail-label">Global Reach</h3>
                  <p className="contact-detail-value">Worldwide Support</p>
                  <p className="contact-detail-description">
                    Serving healthcare professionals and researchers globally
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What We Can Help With */}
        <section className="contact-help">
          <h2 className="contact-section-title">How We Can Help</h2>
          <div className="contact-help-grid">
            <div className="contact-help-card">
              <h3 className="contact-help-title">Technical Support</h3>
              <p className="contact-help-text">
                Get assistance with RadView Desktop and Cloud platforms, troubleshooting, 
                and technical implementation guidance.
              </p>
            </div>

            <div className="contact-help-card">
              <h3 className="contact-help-title">Product Information</h3>
              <p className="contact-help-text">
                Learn about our medical imaging solutions, features, pricing, 
                and how they can benefit your research or clinical practice.
              </p>
            </div>

            <div className="contact-help-card">
              <h3 className="contact-help-title">Collaboration</h3>
              <p className="contact-help-text">
                Explore partnership opportunities, research collaborations, 
                and custom development projects for your specific needs.
              </p>
            </div>

            <div className="contact-help-card">
              <h3 className="contact-help-title">Training & Education</h3>
              <p className="contact-help-text">
                Request training sessions, documentation, or educational resources 
                to maximize your use of our medical imaging tools.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="contact-cta">
          <div className="contact-cta-card">
            <h2 className="contact-cta-title">Ready to Get Started?</h2>
            <p className="contact-cta-text">
              Whether you're a researcher, clinician, or healthcare institution, 
              we're here to help you leverage the power of advanced medical imaging analysis.
            </p>
            <a 
              href="mailto:dev@cstride.com" 
              className="contact-cta-button"
            >
              <Mail size={20} />
              Send us an Email
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
