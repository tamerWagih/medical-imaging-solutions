export default function Loading() {
  const placeholders = Array.from({ length: 9 });
  return (
    <section className="products-section" aria-busy="true" aria-live="polite">
      <div className="products-container">
        <div className="products-header">
          <h2 className="products-title">
            Research <span className="products-title-gradient">Papers</span>
          </h2>
          <p className="products-subtitle">Loading publications…</p>
        </div>

        <div className="research-grid">
          {placeholders.map((_, idx) => (
            <div key={idx} className="product-card radview-module-card" aria-label={`Loading card ${idx + 1}`}>
              <div className="product-card-header">
                <div className="product-card-icon-wrapper">
                  <div className="product-card-icon skeleton-block" />
                </div>
                <span className="product-card-badge skeleton-block" style={{ width: '90px', height: '24px' }} />
              </div>
              <div className="skeleton-block" style={{ width: '60%', height: '28px', marginBottom: '12px' }} />
              <div className="skeleton-block" style={{ width: '40%', height: '20px', marginBottom: '12px' }} />
              <div className="skeleton-block" style={{ width: '100%', height: '48px', marginBottom: '16px' }} />
              <div className="skeleton-block" style={{ width: '100%', height: '16px', marginBottom: '8px' }} />
              <div className="skeleton-block" style={{ width: '90%', height: '16px', marginBottom: '8px' }} />
              <div className="skeleton-block" style={{ width: '80%', height: '16px', marginBottom: '16px' }} />
              <div className="skeleton-block" style={{ width: '160px', height: '44px' }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}