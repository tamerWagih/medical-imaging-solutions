"use client";

import Link from "next/link";
import { Monitor, Globe, Microscope, Activity, ArrowRight } from "lucide-react";
import { PRODUCTS } from "@/lib/constants";

const iconMap = {
  Monitor,
  Globe,
  Microscope,
  Activity,
};

export function ProductShowcase() {
  return (
    <section className="products-section">
      <div className="products-container">
        <div className="products-header">
          <h2 className="products-title">
            Our <span className="products-title-gradient">Product Suite</span>
          </h2>
          <p className="products-subtitle">
            Two specialized platforms, each available as desktop application and web solution
          </p>
        </div>

        <div className="products-grid">
          {PRODUCTS.map((product) => {
            const Icon = iconMap[product.icon as keyof typeof iconMap];
            
            return (
              <div key={product.id} className="product-card">
                <div className="product-card-header">
                  <div className="product-card-icon-wrapper">
                    <div className="product-card-icon">
                      <Icon size={32} />
                    </div>
                  </div>
                  <div className="product-card-badge hybrid">
                    {product.badge}
                  </div>
                </div>
                
                <h3 className="product-card-title">{product.name}</h3>
                <p className="product-card-tagline">{product.tagline}</p>
                <p className="product-card-description">{product.description}</p>
                
                <ul className="product-card-features">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="product-card-feature">
                      <span className="product-card-feature-dot"></span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link href={product.href} className="product-card-button">
                  Learn More
                  <ArrowRight size={18} />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
