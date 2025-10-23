// HRS (Habitat Risk Scoring) Data Constants
export const HRS_DATA = {
  // Basic Information
  name: "HRS - Habitat Risk Scoring",
  tagline: "Advanced Multi-Parametric Prostate MRI Analysis",
  description: "Revolutionary multi-parametric prostate MRI analysis platform that provides comprehensive assessment of tumor spatial heterogeneity and habitat characterization.",
  version: "2.0",
  releaseDate: "October 2025",

  // Key Features
  features: [
    {
      title: "Multi-Parametric Analysis",
      description: "Comprehensive analysis of ADC, DCE, and T2-weighted MRI sequences for complete prostate assessment",
      icon: "Layers"
    },
    {
      title: "Zone-Specific Scoring",
      description: "Separate analysis for peripheral zone (PZ) and transition zone (TZ) with customizable thresholds",
      icon: "Target"
    },
    {
      title: "Advanced NMF Algorithm",
      description: "Non-negative Matrix Factorization for sophisticated perfusion assessment and analysis",
      icon: "Brain"
    },
    {
      title: "Automated Workflow",
      description: "Automated image alignment, registration, and artifact reduction for streamlined analysis",
      icon: "CheckCircle"
    },
    {
      title: "Comprehensive Reporting",
      description: "Detailed risk assessment reports with visualization and quantitative measurements",
      icon: "BarChart3"
    },
    {
      title: "Clinical Validation",
      description: "Clinically validated algorithms for reliable and accurate prostate cancer risk assessment",
      icon: "Activity"
    }
  ],

  // Scientific Validation
  validation: {
    correlations: "r=0.423-0.771",
    aucValues: "0.852-0.952",
    studies: "Peer-reviewed publications in Frontiers in Oncology and Scientific Reports",
    clinicalUtility: "Superior diagnostic performance for prostate cancer detection and risk stratification"
  },

  // Analysis Components
  components: [
    {
      name: "Dynamic Contrast Enhancement (DCE)",
      description: "Temporal dynamics analysis using Non-negative Matrix Factorization (NMF) for perfusion habitat identification",
      parameters: [
        "Number of Curves: 3",
        "Contribution %: 60",
        "Wwp % in TZ: 90",
        "W Percentile: 95"
      ]
    },
    {
      name: "Apparent Diffusion Coefficient (ADC)",
      description: "Zone-specific diffusion analysis with validated thresholds for PZ and TZ",
      parameters: [
        "ADC High PZ: 850",
        "ADC Medium PZ: 1050", 
        "ADC Low PZ: 1200",
        "ADC High TZ: 600",
        "ADC Medium TZ: 750",
        "ADC Low TZ: 850"
      ]
    },
    {
      name: "T2-Weighted Imaging",
      description: "High-resolution anatomical characterization and tissue composition assessment",
      parameters: [
        "T2 High PZ: 850",
        "T2 Medium PZ: 1050",
        "T2 Low PZ: 1200",
        "T2 High TZ: 600",
        "T2 Medium TZ: 750",
        "T2 Low TZ: 850"
      ]
    },
    {
      name: "Alpha Weighting Integration",
      description: "Multi-modal integration with zone-specific weights for comprehensive risk scoring",
      parameters: [
        "Alpha DCE PZ: 0.50",
        "Alpha ADC PZ: 0.25",
        "Alpha T2 PZ: 0.25",
        "Alpha DCE TZ: 0.20",
        "Alpha ADC TZ: 0.40",
        "Alpha T2 TZ: 0.40"
      ]
    }
  ],

  // Workflow Steps
  workflow: [
    {
      step: 1,
      title: "Data Preparation",
      description: "Upload prostate MRI datasets with DCE, ADC, T2 sequences and RT structure files for comprehensive analysis",
      icon: "FileText"
    },
    {
      step: 2,
      title: "Image Alignment",
      description: "Automated registration and alignment of multi-parametric sequences with artifact reduction and quality control",
      icon: "Layers"
    },
    {
      step: 3,
      title: "Zone-Specific Analysis",
      description: "Separate analysis for peripheral zone (PZ) and transition zone (TZ) with validated thresholds for each zone",
      icon: "Target"
    },
    {
      step: 4,
      title: "Habitat Risk Scoring",
      description: "Advanced NMF decomposition of DCE data combined with ADC and T2 analysis to identify distinct tumor habitats",
      icon: "Brain"
    },
    {
      step: 5,
      title: "Risk Stratification",
      description: "Generate comprehensive habitat risk maps with spatial heterogeneity analysis and clinical interpretation guidelines",
      icon: "BarChart3"
    },
    {
      step: 6,
      title: "Clinical Reports",
      description: "Export detailed reports with risk grids, statistical analysis, and 3D Slicer-compatible visualization files",
      icon: "CheckCircle"
    }
  ],

  // Platform Comparison
  platforms: [
    {
      name: "HRS Desktop",
      type: "Desktop",
      description: "Full-featured Windows application with maximum performance and offline capabilities",
      icon: "Monitor",
      features: [
        "Windows 10/11 native application",
        "Maximum processing power",
        "Offline analysis capability",
        "Local data storage & HIPAA compliance",
        "Full feature set with advanced NMF"
      ],
      requirements: {
        os: "Windows 10/11 (64-bit)",
        ram: "8GB minimum, 16GB recommended",
        storage: "50GB minimum, 100GB SSD recommended",
        graphics: "DirectX 11 compatible, dedicated GPU recommended"
      }
    },
    {
      name: "HRS Web",
      type: "Web",
      description: "Browser-based platform for collaborative analysis with cloud processing and accessibility",
      icon: "Globe",
      features: [
        "Access from any browser",
        "Cloud-based processing",
        "Collaborative features",
        "Multi-user access control",
        "Secure cloud storage"
      ],
      requirements: {
        browser: "Chrome 90+, Firefox 88+, Safari 14+, Edge 90+",
        connection: "Stable broadband connection",
        resolution: "1280x720 minimum, 1920x1080 recommended",
        javascript: "Must be enabled"
      }
    }
  ],

  // Data Requirements
  dataRequirements: {
    formats: ["DICOM (.dcm)", "NIfTI (.nii, .nii.gz)", "MHA (.mha, .mhd)"],
    requiredSeries: [
      "ADC (Apparent Diffusion Coefficient)",
      "DCE (Dynamic Contrast Enhancement)",
      "T2 (T2-weighted imaging)",
      "RT Structure (Required)"
    ],
    folderStructure: {
      patient: "PatientID.zip",
      study: "Study_001",
      series: ["ADC_Series", "DCE_Series", "T2_Series", "RT"],
      files: "*.dcm files in each series folder"
    }
  },

  // Output Formats
  outputFormats: {
    images: ["PNG", "MHA", "DCM", "NII"],
    reports: ["PDF", "PPTX", "XLSX"],
    data: ["CSV", "JSON", "MHA", "NII"],
    visualization: ["CTBL (3D Slicer)", "MHA (3D volumes)"]
  },

  // Clinical Interpretation
  riskInterpretation: [
    {
      range: "0.0 - 0.3",
      level: "Low Risk",
      interpretation: "Low suspicion for significant prostate cancer",
      action: "Routine follow-up"
    },
    {
      range: "0.3 - 0.6", 
      level: "Intermediate Risk",
      interpretation: "Moderate suspicion requiring evaluation",
      action: "Additional imaging or biopsy consideration"
    },
    {
      range: "0.6 - 1.0",
      level: "High Risk", 
      interpretation: "High suspicion for significant prostate cancer",
      action: "Targeted intervention recommended"
    }
  ]
};

// HRS Parameters Reference
export const HRS_PARAMETERS = {
  dce: [
    { parameter: "Use DCE", default: "Enabled", description: "Activates DCE time points in HRS algorithm" },
    { parameter: "Number of Curves", default: "3", description: "NMF components for temporal decomposition" },
    { parameter: "Contribution %", default: "60", description: "Minimum significance threshold for NMF" },
    { parameter: "Wwp % in TZ", default: "90", description: "Well-perfused threshold in transition zone" },
    { parameter: "W Percentile", default: "95", description: "Percentile for well-perfused selection" },
    { parameter: "W Calculation", default: "ROI", description: "Percentile calculation method (ROI or Whole)" },
    { parameter: "Baseline Shift", default: "2", description: "Initial data points for baseline calculation" },
    { parameter: "Curves Ignore Last", default: "0", description: "Points removed from curve tail" },
    { parameter: "WashOut Upper", default: "4.0", description: "Upper threshold for DCE scoring" },
    { parameter: "WashOut Lower", default: "0.5", description: "Lower threshold for DCE scoring" }
  ],
  adc: [
    { parameter: "Use ADC", default: "Enabled", zone: "All", description: "Activates ADC in HRS algorithm" },
    { parameter: "ADC High PZ", default: "850", zone: "Peripheral Zone", description: "High threshold for PZ ADC values" },
    { parameter: "ADC Medium PZ", default: "1050", zone: "Peripheral Zone", description: "Medium threshold for PZ ADC values" },
    { parameter: "ADC Low PZ", default: "1200", zone: "Peripheral Zone", description: "Low threshold for PZ ADC values" },
    { parameter: "ADC High TZ", default: "600", zone: "Transition Zone", description: "High threshold for TZ ADC values" },
    { parameter: "ADC Medium TZ", default: "750", zone: "Transition Zone", description: "Medium threshold for TZ ADC values" },
    { parameter: "ADC Low TZ", default: "850", zone: "Transition Zone", description: "Low threshold for TZ ADC values" },
    { parameter: "Noise ADC", default: "400", zone: "All", description: "Noise threshold for ADC values" },
    { parameter: "Ceiling ADC", default: "1600", zone: "All", description: "Maximum reliable ADC value" }
  ],
  t2: [
    { parameter: "Use T2", default: "Disabled", zone: "All", description: "Activates T2 in HRS algorithm" },
    { parameter: "T2 High PZ", default: "850", zone: "Peripheral Zone", description: "High threshold for PZ T2 values" },
    { parameter: "T2 Medium PZ", default: "1050", zone: "Peripheral Zone", description: "Medium threshold for PZ T2 values" },
    { parameter: "T2 Low PZ", default: "1200", zone: "Peripheral Zone", description: "Low threshold for PZ T2 values" },
    { parameter: "T2 High TZ", default: "600", zone: "Transition Zone", description: "High threshold for TZ T2 values" },
    { parameter: "T2 Medium TZ", default: "750", zone: "Transition Zone", description: "Medium threshold for TZ T2 values" },
    { parameter: "T2 Low TZ", default: "850", zone: "Transition Zone", description: "Low threshold for TZ T2 values" },
    { parameter: "Noise T2", default: "400", zone: "All", description: "Noise threshold for T2 values" },
    { parameter: "Ceiling T2", default: "1600", zone: "All", description: "Maximum reliable T2 value" }
  ],
  alpha: [
    { parameter: "Alpha DCE PZ", default: "0.50", zone: "Peripheral Zone", description: "DCE weighting in PZ" },
    { parameter: "Alpha ADC PZ", default: "0.25", zone: "Peripheral Zone", description: "ADC weighting in PZ" },
    { parameter: "Alpha T2 PZ", default: "0.25", zone: "Peripheral Zone", description: "T2 weighting in PZ" },
    { parameter: "Alpha DCE TZ", default: "0.20", zone: "Transition Zone", description: "DCE weighting in TZ" },
    { parameter: "Alpha ADC TZ", default: "0.40", zone: "Transition Zone", description: "ADC weighting in TZ" },
    { parameter: "Alpha T2 TZ", default: "0.40", zone: "Transition Zone", description: "T2 weighting in TZ" }
  ]
};
