import { Target, Rocket, Heart, Users, Award, Globe } from "lucide-react";
import "./about.css";

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-container">
          <h1 className="about-hero-title">About Us</h1>
          <p className="about-hero-subtitle">
            Transforming medical imaging into actionable insights for better patient outcomes
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="about-container">
        {/* Introduction */}
        <section className="about-intro">
          <div className="about-intro-card">
            <p className="about-intro-text">
              We are dedicated to advancing healthcare through innovative medical imaging solutions. 
              Our team of experts combines cutting-edge technology with deep clinical understanding 
              to create tools that empower healthcare professionals and researchers worldwide.
            </p>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="about-vision-mission">
          <div className="about-vm-grid">
            {/* Vision */}
            <div className="about-vm-card vision-card">
              <div className="about-vm-icon-wrapper">
                <Target className="about-vm-icon" size={48} />
              </div>
              <h2 className="about-vm-title">Our Vision</h2>
              <p className="about-vm-text">
                A world where every patient benefits from the most advanced medical imaging 
                analysis, regardless of location or resources.
              </p>
            </div>

            {/* Mission */}
            <div className="about-vm-card mission-card">
              <div className="about-vm-icon-wrapper">
                <Rocket className="about-vm-icon" size={48} />
              </div>
              <h2 className="about-vm-title">Our Mission</h2>
              <p className="about-vm-text">
                We create intuitive, powerful medical imaging software that democratizes access 
                to advanced radiomics analysis, supporting clinicians and researchers in their 
                pursuit of better patient care and medical breakthroughs.
              </p>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="about-values">
          <h2 className="about-section-title">Our Values</h2>
          <div className="about-values-grid">
            <div className="about-value-card">
              <div className="about-value-icon-wrapper">
                <Heart size={32} />
              </div>
              <h3 className="about-value-title">Patient-Centric</h3>
              <p className="about-value-text">
                Every decision we make is guided by our commitment to improving patient outcomes 
                and advancing healthcare quality.
              </p>
            </div>

            <div className="about-value-card">
              <div className="about-value-icon-wrapper">
                <Award size={32} />
              </div>
              <h3 className="about-value-title">Scientific Excellence</h3>
              <p className="about-value-text">
                We maintain the highest standards of scientific rigor and validation in all 
                our software solutions.
              </p>
            </div>

            <div className="about-value-card">
              <div className="about-value-icon-wrapper">
                <Globe size={32} />
              </div>
              <h3 className="about-value-title">Accessibility</h3>
              <p className="about-value-text">
                Advanced medical imaging tools should be available to healthcare professionals 
                everywhere, breaking down barriers to innovation.
              </p>
            </div>

            <div className="about-value-card">
              <div className="about-value-icon-wrapper">
                <Users size={32} />
              </div>
              <h3 className="about-value-title">Collaboration</h3>
              <p className="about-value-text">
                We believe in the power of partnership, working closely with clinicians, 
                researchers, and institutions to drive medical progress.
              </p>
            </div>
          </div>
        </section>

        {/* Impact Statement */}
        <section className="about-impact">
          <div className="about-impact-card">
            <h2 className="about-impact-title">Making a Difference</h2>
            <p className="about-impact-text">
              Through our RadView and HRS platforms, we're helping healthcare professionals 
              worldwide make more informed decisions, conduct groundbreaking research, and 
              ultimately save lives. Our commitment to innovation and excellence drives us 
              to continuously push the boundaries of what's possible in medical imaging analysis.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
