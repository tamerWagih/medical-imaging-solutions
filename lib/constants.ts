// Company Information
export const COMPANY = {
  name: "CStride",
  tagline: "Medical Imaging Solutions",
  description: "Professional-grade medical imaging software designed for researchers, radiologists, and healthcare institutions worldwide.",
  email: "dev@cstride.com",
  phone: "To be provided",
  
  // Address Information
  address: {
    street: "To be provided",
    city: "To be provided",
    state: "To be provided",
    zip: "To be provided",
    country: "To be provided",
  },
  
  // Business Information
  businessHours: "To be provided",
  
  // Department Emails
  departments: {
    general: "dev@cstride.com",
    sales: "To be provided",
    support: "To be provided",
  },
};

// Navigation
export const NAV_ITEMS = [
  { label: "Home", href: "/" },
  {
    label: "Products",
    items: [
      { label: "RadView", href: "/products/radview", description: "Radiomics Analysis Platform" },
      { label: "HRS", href: "/products/hrs", description: "Habitat Risk Scoring" },
    ],
  },
  { label: "Documentation", href: "/documentation" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

// Products Overview (for homepage showcase)
export const PRODUCTS = [
  {
    id: "radview",
    name: "RadView",
    tagline: "Comprehensive Radiomics Analysis Platform",
    description: "Complete radiomics feature extraction and visualization platform available as desktop application and web-based solution with 100+ features across 13 categories.",
    badge: "Desktop & Web",
    href: "/products/radview",
    icon: "Monitor",
    features: [
      "100+ Radiomics Features",
      "11 Preprocessing Modules",
      "Advanced Visualization",
      "Desktop & Web Platforms",
    ],
  },
  {
    id: "hrs",
    name: "HRS",
    tagline: "Habitat Risk Scoring Platform",
    description: "Advanced multi-parametric prostate MRI analysis with automated risk stratification, available as desktop application and web-based solution.",
    badge: "Desktop & Web",
    href: "/products/hrs",
    icon: "Activity",
    features: [
      "Multi-parametric MRI Analysis",
      "Prostate Zone Detection",
      "Advanced NMF Algorithm",
      "Desktop & Web Platforms",
    ],
  },
];

// Testimonials
export const TESTIMONIALS = [
  {
    quote: "RadView has revolutionized our radiomics workflow. The comprehensive feature extraction and visualization tools are unmatched.",
    author: "Dr. Sarah Johnson",
    role: "Chief Radiologist",
    institution: "University Medical Center",
    image: null,
  },
  {
    quote: "HRS provides exceptional accuracy in prostate MRI analysis. The multi-parametric approach has significantly improved our diagnostic confidence.",
    author: "Dr. Michael Chen",
    role: "Urologic Oncologist",
    institution: "Cancer Research Institute",
    image: null,
  },
  {
    quote: "The web-based versions allow our team to collaborate seamlessly across multiple locations. Cloud processing is fast and reliable.",
    author: "Dr. Emily Roberts",
    role: "Research Director",
    institution: "Medical Imaging Lab",
    image: null,
  },
];

// Use Cases
export const USE_CASES = [
  {
    title: "Radiomics Research",
    description: "Extract quantitative features for radiomics studies and machine learning models",
    icon: "Brain",
  },
  {
    title: "Clinical Diagnosis",
    description: "Advanced visualization and measurement tools for clinical imaging analysis",
    icon: "Stethoscope",
  },
  {
    title: "Collaborative Analysis",
    description: "Multi-user access with role-based permissions for team collaboration",
    icon: "Users",
  },
  {
    title: "Quality Assurance",
    description: "Standardized preprocessing pipelines for consistent image quality",
    icon: "CheckCircle",
  },
];

