"use client";

import Link from "next/link";
import { ArrowRight, Download, FileText, Play, CheckCircle, Monitor, Globe, Zap, BarChart3, Activity, Brain, Target, Layers } from "lucide-react";

const videoData = [
  {
    id: "hrs-desktop-demo",
    title: "HRS Desktop Demo",
    description: "Complete walkthrough of HRS Desktop application with multi-parametric prostate MRI analysis",
    video: "/products/hrs-desktop/videos/HRS_Desktop.mp4",
    thumbnail: null, // No thumbnail available
    duration: "5:30"
  },
  {
    id: "hrs-cloud-demo",
    title: "HRS Cloud Demo",
    description: "Web-based HRS platform demonstration with cloud processing and collaborative features",
    video: "/products/hrs-cloud/videos/HRS_Cloud.mp4",
    thumbnail: null, // No thumbnail available
    duration: "4:15"
  }
];

export default function HRSPage() {
  return (
    <div className="hrs-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-text">
              <div className="hero-badge">
                <Activity size={16} />
                <span>Prostate MRI Analysis • Desktop & Web</span>
              </div>
              
              <h1 className="hero-title">
                HRS - Habitat Risk Scoring
              </h1>
              
              <p className="hero-description">
                Advanced multi-parametric prostate MRI analysis platform with automated risk stratification. Available as both a powerful desktop application and a flexible web-based solution for comprehensive prostate cancer assessment.
              </p>

              <div className="hero-buttons">
                <Link href="#demo" className="hero-button primary">
                  <Play size={20} />
                  Watch Demo Video
                </Link>
                <Link href="/contact" className="hero-button secondary">
                  <Download size={20} />
                  Request Demo
                </Link>
              </div>

              {/* Stats */}
              <div className="hero-stats">
                <div className="hero-stat">
                  <div className="hero-stat-number">3</div>
                  <div className="hero-stat-label">MRI Sequences</div>
                </div>
                <div className="hero-stat">
                  <div className="hero-stat-number">2</div>
                  <div className="hero-stat-label">Prostate Zones</div>
                </div>
                <div className="hero-stat">
                  <div className="hero-stat-number">24/7</div>
                  <div className="hero-stat-label">Expert Support</div>
                </div>
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-visual-card">
                <div className="hero-visual-placeholder">
                  <div className="hero-visual-play">
                    <Activity size={48} />
                  </div>
                  <div className="hero-visual-text">
                    <p className="hero-visual-title">Prostate MRI Analysis</p>
                    <p className="hero-visual-subtitle">Clinical precision for cancer assessment</p>
                  </div>
                </div>
              </div>

              {/* Floating Badges */}
              <div className="hero-floating-badge hero-floating-badge-1">
                <div className="hero-floating-badge-icon">
                  <Brain size={24} />
                </div>
                <div className="hero-floating-badge-text">
                  <div className="hero-floating-badge-title">Multi-Parametric</div>
                  <div className="hero-floating-badge-subtitle">ADC, DCE, T2</div>
                </div>
              </div>

              <div className="hero-floating-badge hero-floating-badge-2">
                <div className="hero-floating-badge-icon emoji">
                  🎯
                </div>
                <div className="hero-floating-badge-text">
                  <div className="hero-floating-badge-title">Risk Scoring</div>
                  <div className="hero-floating-badge-subtitle">Automated analysis</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="features-section">
        <div className="features-container">
          <div className="features-header">
            <h2 className="features-title">Key Features</h2>
            <p className="features-subtitle">
              Comprehensive prostate MRI analysis with advanced habitat risk scoring
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <div className="feature-icon">
                  <Layers size={28} />
                </div>
              </div>
              <h3 className="feature-title">Multi-Parametric Analysis</h3>
              <p className="feature-description">
                Comprehensive analysis of ADC, DCE, and T2-weighted MRI sequences for complete prostate assessment
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <div className="feature-icon">
                  <Target size={28} />
                </div>
              </div>
              <h3 className="feature-title">Zone-Specific Scoring</h3>
              <p className="feature-description">
                Separate analysis for peripheral zone (PZ) and transition zone (TZ) with customizable thresholds
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <div className="feature-icon">
                  <Brain size={28} />
                </div>
              </div>
              <h3 className="feature-title">Advanced NMF Algorithm</h3>
              <p className="feature-description">
                Non-negative Matrix Factorization for sophisticated perfusion assessment and analysis
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <div className="feature-icon">
                  <CheckCircle size={28} />
                </div>
              </div>
              <h3 className="feature-title">Automated Workflow</h3>
              <p className="feature-description">
                Automated image alignment, registration, and artifact reduction for streamlined analysis
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <div className="feature-icon">
                  <BarChart3 size={28} />
                </div>
              </div>
              <h3 className="feature-title">Comprehensive Reporting</h3>
              <p className="feature-description">
                Detailed risk assessment reports with visualization and quantitative measurements
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <div className="feature-icon">
                  <Activity size={28} />
                </div>
              </div>
              <h3 className="feature-title">Clinical Validation</h3>
              <p className="feature-description">
                Clinically validated algorithms for reliable and accurate prostate cancer risk assessment
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Comparison - Desktop vs Web */}
      <section id="platforms" className="why-choose-section">
        <div className="why-choose-container">
          <div className="why-choose-header">
            <h2 className="why-choose-title">
              Choose Your <span className="why-choose-highlight">Platform</span>
            </h2>
            <p className="why-choose-subtitle">
              HRS is available as both a powerful desktop application and a flexible web-based platform
            </p>
          </div>

          <div className="features-grid" style={{ maxWidth: '900px', margin: '0 auto' }}>
            {/* Desktop Platform */}
            <div className="feature-card" style={{ border: '2px solid rgba(59, 130, 246, 0.3)' }}>
              <div className="feature-icon-wrapper">
                <div className="feature-icon">
                  <Monitor size={32} />
                </div>
              </div>
              <h3 className="feature-title">HRS Desktop</h3>
              <p className="feature-description">
                Full-featured Windows application with maximum performance and offline capabilities
              </p>
              <ul className="product-card-features">
                <li className="product-card-feature">
                  <span className="product-card-feature-dot" />
                  Windows 10/11 native application
                </li>
                <li className="product-card-feature">
                  <span className="product-card-feature-dot" />
                  Maximum processing power
                </li>
                <li className="product-card-feature">
                  <span className="product-card-feature-dot" />
                  Offline analysis capability
                </li>
                <li className="product-card-feature">
                  <span className="product-card-feature-dot" />
                  Local data storage & HIPAA compliance
                </li>
                <li className="product-card-feature">
                  <span className="product-card-feature-dot" />
                  Full feature set with advanced NMF
                </li>
              </ul>
              <Link href="/contact" className="product-card-button" style={{ marginTop: 'auto' }}>
                Request Desktop Version
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Web Platform */}
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <div className="feature-icon">
                  <Globe size={32} />
                </div>
              </div>
              <h3 className="feature-title">HRS Web</h3>
              <p className="feature-description">
                Browser-based platform for collaborative analysis with cloud processing and accessibility
              </p>
              <ul className="product-card-features">
                <li className="product-card-feature">
                  <span className="product-card-feature-dot" />
                  Access from any browser
                </li>
                <li className="product-card-feature">
                  <span className="product-card-feature-dot" />
                  Cloud-based processing
                </li>
                <li className="product-card-feature">
                  <span className="product-card-feature-dot" />
                  Collaborative features
                </li>
                <li className="product-card-feature">
                  <span className="product-card-feature-dot" />
                  Multi-user access control
                </li>
                <li className="product-card-feature">
                  <span className="product-card-feature-dot" />
                  Secure cloud storage
                </li>
              </ul>
              <Link href="/contact" className="product-card-button" style={{ marginTop: 'auto' }}>
                Request Web Access
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Analysis Workflow */}
      <section className="why-choose-section">
        <div className="why-choose-container">
          <div className="why-choose-header">
            <h2 className="why-choose-title">
              Complete Analysis <span className="why-choose-highlight">Workflow</span>
            </h2>
            <p className="why-choose-subtitle">
              Streamlined process for multi-parametric prostate MRI analysis
            </p>
          </div>

          <div className="why-choose-grid">
            <div className="why-choose-card">
              <span className="why-choose-card-badge">Step 1</span>
              <div className="why-choose-card-icon-wrapper">
                <div className="why-choose-card-icon">
                  <FileText size={32} />
                </div>
              </div>
              <h3 className="why-choose-card-title">Data Import</h3>
              <p className="why-choose-card-description">
                Load multi-parametric MRI sequences (ADC, DCE, T2) with automatic format detection and validation
              </p>
            </div>

            <div className="why-choose-card">
              <span className="why-choose-card-badge">Step 2</span>
              <div className="why-choose-card-icon-wrapper">
                <div className="why-choose-card-icon">
                  <Layers size={32} />
                </div>
              </div>
              <h3 className="why-choose-card-title">Image Processing</h3>
              <p className="why-choose-card-description">
                Automated alignment, registration, and artifact reduction for optimal image quality
              </p>
            </div>

            <div className="why-choose-card">
              <span className="why-choose-card-badge">Step 3</span>
              <div className="why-choose-card-icon-wrapper">
                <div className="why-choose-card-icon">
                  <Target size={32} />
                </div>
              </div>
              <h3 className="why-choose-card-title">Zone Segmentation</h3>
              <p className="why-choose-card-description">
                Automatic or manual segmentation of peripheral zone (PZ) and transition zone (TZ)
              </p>
            </div>

            <div className="why-choose-card">
              <span className="why-choose-card-badge">Step 4</span>
              <div className="why-choose-card-icon-wrapper">
                <div className="why-choose-card-icon">
                  <Brain size={32} />
                </div>
              </div>
              <h3 className="why-choose-card-title">HRS Analysis</h3>
              <p className="why-choose-card-description">
                Advanced NMF algorithm analyzes perfusion patterns and calculates habitat risk scores
              </p>
            </div>

            <div className="why-choose-card">
              <span className="why-choose-card-badge">Step 5</span>
              <div className="why-choose-card-icon-wrapper">
                <div className="why-choose-card-icon">
                  <BarChart3 size={32} />
                </div>
              </div>
              <h3 className="why-choose-card-title">Report Generation</h3>
              <p className="why-choose-card-description">
                Comprehensive risk assessment reports with visualizations and quantitative measurements
              </p>
            </div>

            <div className="why-choose-card">
              <span className="why-choose-card-badge">Step 6</span>
              <div className="why-choose-card-icon-wrapper">
                <div className="why-choose-card-icon">
                  <CheckCircle size={32} />
                </div>
              </div>
              <h3 className="why-choose-card-title">Export & Share</h3>
              <p className="why-choose-card-description">
                Export results in multiple formats and share with clinical teams securely
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Videos Section */}
      <section id="demo" className="features-section">
        <div className="features-container">
          <div className="features-header">
            <h2 className="features-title">
              Watch <span className="features-title-gradient">HRS in Action</span>
            </h2>
            <p className="features-subtitle">
              See how HRS works with real prostate MRI data
            </p>
          </div>

          <div className="features-grid">
            {videoData.map((video, index) => (
              <div key={video.id} className="feature-card hrs-demo-card">
                <div className="hrs-demo-video-container">
                  <video 
                    controls 
                    poster={video.thumbnail || undefined}
                    className="hrs-demo-video"
                    preload="metadata"
                  >
                    <source src={video.video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                
                <div className="feature-icon-wrapper">
                  <div className="feature-icon">
                    <Play size={28} />
                  </div>
                </div>
                <h3 className="feature-title">{video.title}</h3>
                <p className="feature-description">{video.description}</p>
                <div className="hrs-demo-duration">
                  <Play size={16} />
                  <span>{video.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="why-choose-section">
        <div className="why-choose-container">
          <div className="why-choose-cta">
            <div className="why-choose-cta-content">
              <h3 className="why-choose-cta-title">
                Ready to Get Started with HRS?
              </h3>
              <p className="why-choose-cta-description">
                Request a demo or contact our team to learn more about HRS Desktop and Web platforms
              </p>
              <div className="why-choose-cta-buttons">
                <div className="why-choose-cta-button-wrapper">
                  <Link href="/contact" className="why-choose-cta-button primary">
                    Request Demo
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </Link>
                </div>
                <div className="why-choose-cta-button-wrapper">
                  <Link href="/documentation" className="why-choose-cta-button secondary">
                    <FileText size={20} />
                    View Documentation
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

