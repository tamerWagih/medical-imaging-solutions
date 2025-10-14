"use client";

import Link from "next/link";
import { ArrowRight, Download, FileText, Play, CheckCircle, FolderOpen, Settings, Cpu, Filter, Eye, Monitor, Zap, BarChart3 } from "lucide-react";
import { RADVIEW_DESKTOP } from "@/lib/radview-data";

const iconMap = {
  FolderOpen,
  Settings,
  Cpu,
  Filter,
  Eye,
};

const videoData = [
  {
    id: "scan-module",
    title: "Scan Module",
    description: "Import and load medical imaging data in multiple formats",
    video: "/products/radview-desktop/videos/Scan_Module.mp4",
    thumbnail: "/products/radview-desktop/screenshots/Scan.png",
    duration: "2:15"
  },
  {
    id: "preprocessing",
    title: "Preprocessing Module", 
    description: "11 preprocessing modules for image enhancement and preparation",
    video: "/products/radview-desktop/videos/Preprocessing.mp4",
    thumbnail: "/products/radview-desktop/screenshots/Preprocessing.png",
    duration: "3:42"
  },
  {
    id: "feature-extraction",
    title: "Feature Extraction",
    description: "Extract 100+ radiomics features across 13 categories",
    video: "/products/radview-desktop/videos/Feature Extraction.mp4",
    thumbnail: "/products/radview-desktop/screenshots/Feature Extraction.png",
    duration: "4:18"
  },
  {
    id: "feature-selection",
    title: "Feature Selection",
    description: "Advanced feature selection using MRMR, RankSum, and T-Test",
    video: "/products/radview-desktop/videos/Feature selection.mp4",
    thumbnail: "/products/radview-desktop/screenshots/Feature Selection.png",
    duration: "2:56"
  },
  {
    id: "visualization",
    title: "Visualization Module",
    description: "Advanced visualization and analysis tools",
    video: "/products/radview-desktop/videos/Visualization.mp4",
    thumbnail: "/products/radview-desktop/screenshots/Visualization.png",
    duration: "3:24"
  }
];

export default function RadViewPage() {
  return (
    <div className="radview-page">
      {/* Hero Section - Same styling as homepage */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-text">
              <div className="hero-badge">
                <Monitor size={16} />
                <span>Version {RADVIEW_DESKTOP.version} • Desktop Application</span>
              </div>
              
              <h1 className="hero-title">
                {RADVIEW_DESKTOP.hero.name}
              </h1>
              
              <p className="hero-description">
                {RADVIEW_DESKTOP.hero.description}
              </p>

              <div className="hero-buttons">
                <Link href="#demo" className="hero-button primary">
                  <Play size={20} />
                  Watch Demo Videos
                </Link>
                <Link href="/contact" className="hero-button secondary">
                  <Download size={20} />
                  Request Demo
                </Link>
              </div>

              {/* Stats */}
              <div className="hero-stats">
                <div className="hero-stat">
                  <div className="hero-stat-number">100+</div>
                  <div className="hero-stat-label">Radiomics Features</div>
                </div>
                <div className="hero-stat">
                  <div className="hero-stat-number">5</div>
                  <div className="hero-stat-label">Analysis Modules</div>
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
                    <Zap size={48} />
                  </div>
                  <div className="hero-visual-text">
                    <p className="hero-visual-title">Advanced Radiomics Platform</p>
                    <p className="hero-visual-subtitle">Professional medical imaging analysis</p>
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
                  <div className="hero-floating-badge-subtitle">DICOM, MHA, NIfTI</div>
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

      {/* Key Features - Same styling as homepage features */}
      <section className="features-section">
        <div className="features-container">
          <div className="features-header">
            <h2 className="features-title">Key Features</h2>
            <p className="features-subtitle">
              Everything you need for comprehensive radiomics analysis
            </p>
          </div>

          <div className="features-grid">
            {RADVIEW_DESKTOP.overview.keyFeatures.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon-wrapper">
                  <div className="feature-icon">
                    <CheckCircle size={28} />
                  </div>
                </div>
                <h3 className="feature-title">Radiomics Analysis</h3>
                <p className="feature-description">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Videos Section */}
      <section id="demo" className="features-section">
        <div className="features-container">
          <div className="features-header">
            <h2 className="features-title">
              Watch <span className="features-title-gradient">RadView in Action</span>
            </h2>
            <p className="features-subtitle">
              See how each module works with real medical imaging data
            </p>
          </div>

          <div className="features-grid">
            {videoData.map((video, index) => (
              <div key={video.id} className="feature-card radview-demo-card">
                <div className="radview-demo-video-container">
                  <video 
                    controls 
                    poster={video.thumbnail}
                    className="radview-demo-video"
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
                <div className="radview-demo-duration">
                  <Play size={16} />
                  <span>{video.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Five Modules - Same styling as product showcase */}
      <section className="products-section">
        <div className="products-container">
          <div className="products-header">
            <h2 className="products-title">
              Five Powerful <span className="products-title-gradient">Modules</span>
            </h2>
            <p className="products-subtitle">
              Complete workflow from data loading to visualization
            </p>
          </div>

          <div className="products-grid">
            {RADVIEW_DESKTOP.modules.map((module, index) => {
              const Icon = iconMap[module.icon as keyof typeof iconMap];

              return (
                <div key={module.id} className="product-card radview-module-card">
                  <div className="product-card-header">
                    <div className="product-card-icon-wrapper">
                      <div className="product-card-icon">
                        <Icon size={32} />
                      </div>
                    </div>
                    <span className="product-card-badge">Module {index + 1}</span>
                  </div>
                  <h3 className="product-card-title">{module.title}</h3>
                  <p className="product-card-tagline">Professional Analysis</p>
                  <p className="product-card-description">{module.description}</p>
                  
                  <ul className="product-card-features">
                    {module.features.map((feature, idx) => (
                      <li key={idx} className="product-card-feature">
                        <span className="product-card-feature-dot" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link href="#demo" className="product-card-button">
                    <Play size={16} />
                    Watch Demo
                    <ArrowRight size={16} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Workflow - Same styling as why choose us */}
      <section className="why-choose-section">
        <div className="why-choose-container">
          <div className="why-choose-header">
            <h2 className="why-choose-title">
              Complete Analysis <span className="why-choose-highlight">Workflow</span>
            </h2>
            <p className="why-choose-subtitle">
              Streamlined 5-step process for medical imaging analysis
            </p>
          </div>

          <div className="why-choose-grid">
            {RADVIEW_DESKTOP.workflow.steps.map((step, index) => (
              <div key={index} className="why-choose-card radview-workflow-card">
                <span className="why-choose-card-badge">Step {step.step}</span>
                <div className="why-choose-card-icon-wrapper">
                  <div className="why-choose-card-icon">
                    <BarChart3 size={32} />
                  </div>
                </div>
                <h3 className="why-choose-card-title">{step.module}</h3>
                <p className="why-choose-card-description">
                  <strong>{step.action}</strong><br />
                  {step.outcome}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* System Requirements */}
      <section className="features-section">
        <div className="features-container">
          <div className="features-header">
            <h2 className="features-title">System Requirements</h2>
            <p className="features-subtitle">
              Ensure your system meets these requirements for optimal performance
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card radview-requirements-card">
              <div className="feature-icon-wrapper">
                <div className="feature-icon">
                  <Settings size={28} />
                </div>
              </div>
              <h3 className="feature-title">Minimum Requirements</h3>
              <div className="radview-requirements-content">
                <div className="radview-requirements-item">
                  <strong>OS:</strong> {RADVIEW_DESKTOP.systemRequirements.minimum.os}
                </div>
                <div className="radview-requirements-item">
                  <strong>RAM:</strong> {RADVIEW_DESKTOP.systemRequirements.minimum.ram}
                </div>
                <div className="radview-requirements-item">
                  <strong>Storage:</strong> {RADVIEW_DESKTOP.systemRequirements.minimum.storage}
                </div>
                <div className="radview-requirements-item">
                  <strong>Graphics:</strong> {RADVIEW_DESKTOP.systemRequirements.minimum.graphics}
                </div>
              </div>
            </div>

            <div className="feature-card radview-requirements-card radview-requirements-card-recommended">
              <div className="feature-icon-wrapper">
                <div className="feature-icon">
                  <CheckCircle size={28} />
                </div>
              </div>
              <h3 className="feature-title">Recommended</h3>
              <div className="radview-requirements-content">
                <div className="radview-requirements-item">
                  <strong>OS:</strong> {RADVIEW_DESKTOP.systemRequirements.recommended.os}
                </div>
                <div className="radview-requirements-item">
                  <strong>RAM:</strong> {RADVIEW_DESKTOP.systemRequirements.recommended.ram}
                </div>
                <div className="radview-requirements-item">
                  <strong>Storage:</strong> {RADVIEW_DESKTOP.systemRequirements.recommended.storage}
                </div>
                <div className="radview-requirements-item">
                  <strong>Graphics:</strong> {RADVIEW_DESKTOP.systemRequirements.recommended.graphics}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA - Same styling as why choose us CTA */}
      <section className="why-choose-section">
        <div className="why-choose-container">
          <div className="why-choose-cta">
            <div className="why-choose-cta-content">
              <h3 className="why-choose-cta-title">
                Ready to Get Started with RadView?
              </h3>
              <p className="why-choose-cta-description">
                Request a demo or contact our team to learn more about RadView Desktop
              </p>
              <div className="why-choose-cta-buttons">
                <Link href="/contact" className="why-choose-cta-button primary">
                  Request Demo
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </Link>
                <Link href="/documentation" className="why-choose-cta-button secondary">
                  <FileText size={20} />
                  View Documentation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}