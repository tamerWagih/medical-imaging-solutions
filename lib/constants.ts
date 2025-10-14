// Company Information
export const COMPANY = {
  name: "Medical Imaging Solutions",
  tagline: "Advanced Software for Medical Image Analysis",
  description: "Professional-grade medical imaging software designed for researchers, radiologists, and healthcare institutions worldwide.",
  email: "contact@medimaging.com",
  phone: "+1 (555) 123-4567",
};

// Navigation
export const NAV_ITEMS = [
  { label: "Home", href: "/" },
  {
    label: "Products",
    items: [
      { label: "RadView Desktop", href: "/products/radview" },
      { label: "RadView Web", href: "/products/radview-web" },
      { label: "HRS Desktop", href: "/products/hrs" },
      { label: "HRS Web", href: "/products/hrs-web" },
    ],
  },
  { label: "Documentation", href: "/documentation" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

// Products Overview (for homepage showcase)
export const PRODUCTS = [
  {
    id: "radview-desktop",
    name: "RadView Desktop",
    tagline: "Comprehensive Radiomics Analysis",
    description: "Desktop application for radiomics feature extraction and visualization with 100+ features across 13 categories.",
    badge: "Desktop",
    href: "/products/radview",
    icon: "Monitor",
    features: [
      "100+ Radiomics Features",
      "11 Preprocessing Modules",
      "Advanced Visualization",
      "Multi-format Support",
    ],
  },
  {
    id: "radview-web",
    name: "RadView Web",
    tagline: "Cloud-Based Radiomics Platform",
    description: "Web-based platform for collaborative radiomics analysis with real-time sharing and cloud processing.",
    badge: "Web Platform",
    href: "/products/radview-web",
    icon: "Globe",
    features: [
      "Collaborative Analysis",
      "Role-Based Access Control",
      "Cloud Processing",
      "Workflow Management",
    ],
  },
  {
    id: "hrs-desktop",
    name: "HRS Desktop",
    tagline: "Prostate MRI Analysis Suite",
    description: "Advanced desktop application for multi-parametric prostate MRI analysis with automated risk stratification.",
    badge: "Desktop",
    href: "/products/hrs",
    icon: "Microscope",
    features: [
      "Multi-parametric MRI",
      "Prostate Zone Detection",
      "Advanced NMF Algorithm",
      "Automated Reporting",
    ],
  },
  {
    id: "hrs-web",
    name: "HRS Web",
    tagline: "Cloud Prostate MRI Analysis",
    description: "Web-based platform for prostate MRI analysis with the same powerful features as the desktop version.",
    badge: "Web Platform",
    href: "/products/hrs-web",
    icon: "Activity",
    features: [
      "Browser-Based Access",
      "Same Powerful Analysis",
      "Cloud Processing",
      "Collaborative Sharing",
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

