"use client";

import { FileType, Layers, Sparkles, BarChart3, Eye, Download } from "lucide-react";

const features = [
  {
    icon: FileType,
    title: "Multi-Format Support",
    description: "Both platforms support DICOM, MHA, NIfTI, and TIFF - all major medical imaging formats",
  },
  {
    icon: Sparkles,
    title: "RadView Platform",
    description: "Comprehensive radiomics analysis with 100+ features across 13 categories and 23 statistical measures per feature",
  },
  {
    icon: Layers,
    title: "HRS Platform",
    description: "Specialized prostate cancer Habitat Risk Scoring with advanced ADC, DCE, and T2-weighted MRI analysis",
  },
  {
    icon: BarChart3,
    title: "Advanced Processing",
    description: "RadView offers 11 preprocessing modules; HRS provides automated alignment, registration, and artifact reduction",
  },
  {
    icon: Eye,
    title: "Powerful Visualization",
    description: "Multi-planar views, customizable color maps, ROI analysis, and detailed risk contours in both platforms",
  },
  {
    icon: Download,
    title: "Flexible Exports",
    description: "Export to CSV, MHA, NIfTI formats with comprehensive PDF reports from either platform",
  },
];

export function Features() {
  return (
    <section className="features-section">
      <div className="features-container">
        <div className="features-header">
          <h2 className="features-title">Powerful Features</h2>
          <p className="features-subtitle">
            Everything you need for comprehensive medical imaging analysis
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon-wrapper">
                <div className="feature-icon">
                  <feature.icon size={28} />
                </div>
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
