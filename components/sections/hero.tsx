"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle, Play } from "lucide-react";
import { COMPANY } from "@/lib/constants";

export function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          {/* Left Column - Text */}
          <div className="hero-text">
            <div className="hero-badge">
              <CheckCircle size={16} />
              <span>{COMPANY.tagline}</span>
            </div>
            
            <h1 className="hero-title">
              {COMPANY.name}{" "}
              <span className="hero-title-gradient">Medical Imaging Platform</span>
            </h1>
            
            <p className="hero-description">
              Two specialized platforms: RadView for comprehensive radiomics feature extraction, and HRS for prostate cancer Habitat Risk Scoring. 
              Each available as desktop and web-based solutions for medical professionals, researchers, and healthcare institutions.
            </p>

            <div className="hero-buttons">
              <Link href="/contact" className="hero-button primary">
                Get Started
                <ArrowRight size={20} />
              </Link>
              <Link href="/products/radview#demo" className="hero-button secondary">
                <Play size={20} />
                View Demo
              </Link>
            </div>

            {/* Stats */}
            <div className="hero-stats">
              <div className="hero-stat">
                <div className="hero-stat-number">100+</div>
                <div className="hero-stat-label">Radiomics Features</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-number">11</div>
                <div className="hero-stat-label">Preprocessing Modules</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-number">24/7</div>
                <div className="hero-stat-label">Expert Support</div>
              </div>
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="hero-visual">
            <div className="hero-visual-card" onClick={() => window.location.href = '/products/radview#demo'}>
              <div className="hero-visual-placeholder">
                <div className="hero-visual-play">
                  <Play size={48} />
                </div>
                <div className="hero-visual-text">
                  <p className="hero-visual-title">Watch Product Demo</p>
                  <p className="hero-visual-subtitle">See our solutions in action</p>
                </div>
              </div>
            </div>

            {/* Floating Badges */}
            <div className="hero-floating-badge hero-floating-badge-1">
              <div className="hero-floating-badge-icon">
                <CheckCircle size={24} />
              </div>
              <div className="hero-floating-badge-text">
                <div className="hero-floating-badge-title">Multi-Format Support</div>
                <div className="hero-floating-badge-subtitle">All imaging formats</div>
              </div>
            </div>

            <div className="hero-floating-badge hero-floating-badge-2">
              <div className="hero-floating-badge-icon emoji">
                🔬
              </div>
              <div className="hero-floating-badge-text">
                <div className="hero-floating-badge-title">Advanced Analysis</div>
                <div className="hero-floating-badge-subtitle">Clinical precision</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
