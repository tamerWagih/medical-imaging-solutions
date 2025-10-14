"use client";

import Link from "next/link";
import { CheckCircle, Zap, Shield, Users, Award, Cpu } from "lucide-react";

const reasons = [
  {
    icon: Zap,
    title: "Two Specialized Platforms",
    description: "RadView for advanced radiomics feature extraction, and HRS for prostate cancer risk assessment - each purpose-built for specific clinical needs.",
    highlight: "Specialized"
  },
  {
    icon: Cpu,
    title: "RadView Excellence",
    description: "Industry-leading radiomics platform with 100+ features across 13 categories, 11 preprocessing modules, and 23 statistical measures per feature.",
    highlight: "Comprehensive"
  },
  {
    icon: Shield,
    title: "HRS Clinical Precision",
    description: "Dedicated prostate cancer platform with sophisticated ADC, DCE, and T2 analysis, NMF perfusion assessment, and zone-specific risk scoring.",
    highlight: "Clinical Grade"
  },
  {
    icon: Award,
    title: "Desktop & Web Options",
    description: "Every platform available in both desktop and web versions - choose the deployment that fits your workflow and infrastructure.",
    highlight: "Flexible"
  },
  {
    icon: Users,
    title: "Professional Visualization",
    description: "Both platforms feature multi-planar views, customizable color maps, advanced ROI tools, and 3D-Slicer integration capabilities.",
    highlight: "Advanced"
  },
  {
    icon: CheckCircle,
    title: "Clinically Validated",
    description: "Both platforms independently validated and used by leading medical institutions worldwide for research and clinical applications.",
    highlight: "Proven"
  }
];

export function WhyChooseUs() {
  return (
    <section className="why-choose-section">
      <div className="why-choose-container">
        {/* Header */}
        <div className="why-choose-header">
          <h2 className="why-choose-title">
            Why Choose <span className="why-choose-highlight">Our Solutions</span>
          </h2>
          <p className="why-choose-subtitle">
            Two specialized platforms designed for excellence: RadView for radiomics and HRS for prostate cancer assessment
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="why-choose-grid">
          {reasons.map((reason, index) => (
            <div key={index} className="why-choose-card">
              <div className="why-choose-card-badge">{reason.highlight}</div>
              <div className="why-choose-card-icon-wrapper">
                <div className="why-choose-card-icon">
                  <reason.icon size={28} />
                </div>
              </div>
              <h3 className="why-choose-card-title">{reason.title}</h3>
              <p className="why-choose-card-description">{reason.description}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="why-choose-cta">
          <div className="why-choose-cta-content">
            <h3 className="why-choose-cta-title">
              Ready to Transform Your Medical Imaging Workflow?
            </h3>
            <p className="why-choose-cta-description">
              Join leading medical institutions worldwide. Choose RadView for radiomics analysis or HRS for prostate cancer assessment - or both.
            </p>
            <div className="why-choose-cta-buttons">
              <Link href="/products/radview" className="why-choose-cta-button primary">
                Explore RadView
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
              <Link href="/contact" className="why-choose-cta-button secondary">
                Request Demo
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

