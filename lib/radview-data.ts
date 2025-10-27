// RadView Desktop - Complete Product Information from Documentation
export const RADVIEW_DESKTOP = {
  version: "3.4",
  releaseDate: "July 2025",
  
  hero: {
    name: "RadView Desktop",
    tagline: "Comprehensive Medical Imaging Analysis Software",
    description: "Professional-grade desktop application for radiomics feature extraction, advanced preprocessing, and medical image visualization. Designed for researchers, radiologists, and healthcare institutions.",
  },

  overview: {
    keyFeatures: [
      "Multi-format Support: DICOM, MHA, NIfTI",
      "11 Comprehensive Preprocessing Modules",
      "100+ Radiomics Features Across 13 Categories",
      "Advanced Visualization with Multi-planar Views",
      "Comprehensive ROI Analysis and Mask Drawing",
      "Export to CSV, MHA, NIfTI, PDF Reports",
      "AI Model Training and Prediction with Multiple Algorithms",
    ],
    supportedFormats: {
      input: ["DICOM (.dcm, .dicom)", "MHA (.mha, .mhd)", "NIfTI (.nii, .nii.gz)"],
      output: ["CSV (Feature data)", "MHA (Image volumes)", "NIfTI (Image volumes)", "PDF (Reports)", "JSON (Sessions)"],
    },
  },

  systemRequirements: {
    minimum: {
      os: "Windows 10 (64-bit)",
      ram: "8GB",
      storage: "2GB free space",
      graphics: "DirectX 11 compatible",
    },
    recommended: {
      os: "Windows 11 (64-bit)",
      ram: "16GB or more",
      storage: "10GB free space",
      graphics: "Dedicated graphics card",
    },
  },

  modules: [
    {
      id: "scan",
      title: "Scan Module",
      description: "Entry point for loading and managing medical images with hierarchical organization",
      icon: "FolderOpen",
      screenshot: "/products/radview-desktop/screenshots/Scan.png",
      video: "/products/radview-desktop/videos/Scan_Module.mp4",
      features: [
        "Load medical images from DICOM, MHA, NIfTI formats",
        "Hierarchical organization: Patient → Study → Series",
        "Automatic protocol detection from DICOM metadata",
        "Database management for session persistence",
        "Batch operations for efficient workflow",
      ],
    },
    {
      id: "preprocessing",
      title: "Preprocessing Module",
      description: "Comprehensive image enhancement and preparation with 11 specialized modules",
      icon: "Settings",
      screenshot: "/products/radview-desktop/screenshots/Preprocessing.png",
      video: "/products/radview-desktop/videos/Preprocessing.mp4",
      features: [
        "11 preprocessing modules for image enhancement",
        "Visual workflow builder with drag-and-drop",
        "Configurable parameters for each module",
        "Save and load preprocessing pipelines (JSON)",
        "Support for two-input modules (e.g., Resampling by Template)",
      ],
      preprocessingModules: [
        "Normalization", "Histogram Equalization", "Flipping", "Scaling",
        "Cropping by Size", "Cropping by Bounding Box", "Resampling by Size",
        "Resampling by Template", "Anisotropic Diffusion",
        "N4 Bias Field Correction", "Legendre Bias Field Correction",
      ],
    },
    {
      id: "feature-extraction",
      title: "Feature Extraction Module",
      description: "Extract 100+ radiomics features across 13 categories with automatic statistical summarization",
      icon: "Cpu",
      screenshot: "/products/radview-desktop/screenshots/Feature Extraction.png",
      video: "/products/radview-desktop/videos/Feature Extraction.mp4",
      features: [
        "100+ radiomics features across 13 categories",
        "Automatic generation of 23 statistical measures",
        "First-order, second-order, and higher-order features",
        "Configurable parameters for each feature type",
        "Save and load feature definitions (JSON)",
      ],
      featureCategories: [
        "First-Order Features (6 types)",
        "Haralick Features - GLCM (25 types)",
        "GLRLM Features (16 types)",
        "GLDM Features (14 types)",
        "GLSZM Features (16 types)",
        "NGTDM Features (5 types)",
        "Collage Features (13 types)",
        "Laws Features (34 types)",
        "Tamura Features (6 types)",
        "Canny, Sobel, LoG, Gabor Features",
      ],
    },
    {
      id: "feature-selection",
      title: "Feature Selection Module",
      description: "Identify the most relevant features using statistical methods",
      icon: "Filter",
      screenshot: "/products/radview-desktop/screenshots/Feature Selection.png",
      video: "/products/radview-desktop/videos/Feature selection.mp4",
      features: [
        "Three statistical selection methods",
        "MRMR (Minimum Redundancy Maximum Relevance)",
        "RankSum (Wilcoxon Rank-Sum Test)",
        "T-Test for parametric selection",
        "Cross-validation support",
      ],
    },
    {
      id: "visualization",
      title: "Visualization Module",
      description: "Advanced imaging with multi-planar views, measurements, annotations, and statistical analysis",
      icon: "Eye",
      screenshot: "/products/radview-desktop/screenshots/Visualization.png",
      video: "/products/radview-desktop/videos/Visualization.mp4",
      features: [
        "Multi-planar display (Axial, Coronal, Sagittal)",
        "5 color maps: JET, Parula, V L04, D01A, CBL1",
        "Measurement tools (Distance, Area, Angle)",
        "Mask drawing and ROI creation",
        "Statistical analysis (Histograms, Box plots)",
        "Shape features calculation (Volume and Slice-based)",
      ],
    },
    {
      id: "ai-model",
      title: "AI Model Module",
      description: "Machine learning model training and prediction using extracted radiomics features",
      icon: "Brain",
      screenshot: "/products/radview-desktop/screenshots/AI_Model.png",
      video: "/products/radview-desktop/videos/AI_Model.mp4",
      features: [
        "Multiple machine learning algorithms (Random Forest, SVM, XGBoost, Neural Networks, CNN, ResNet)",
        "Support for Classification, Regression, and Survival Analysis problems",
        "Configurable model parameters for each algorithm type",
        "Selected features integration from Feature Selection module",
        "Save and load trained model configurations",
      ],
      comingSoon: true,
    },
  ],

  workflow: {
    title: "Complete RadView Workflow",
    steps: [
      {
        step: 1,
        module: "Scan",
        action: "Load your medical images (DICOM, MHA, NIfTI)",
        outcome: "Images organized by Patient → Study → Series",
      },
      {
        step: 2,
        module: "Preprocessing",
        action: "Apply preprocessing pipeline (Normalization, Bias Correction, Resampling)",
        outcome: "Standardized, enhanced images ready for analysis",
      },
      {
        step: 3,
        module: "Feature Extraction",
        action: "Extract radiomics features across 13 categories",
        outcome: "100+ features with 23 statistical measures automatically calculated",
      },
      {
        step: 4,
        module: "Feature Selection",
        action: "Apply MRMR, RankSum, or T-Test selection",
        outcome: "Most relevant features identified for your analysis",
      },
      {
        step: 5,
        module: "Visualization",
        action: "Visualize images, features, create ROIs, analyze statistics",
        outcome: "Comprehensive visual analysis with measurements and exports",
      },
      {
        step: 6,
        module: "AI Model",
        action: "Train and evaluate AI models for prediction tasks",
        outcome: "Trained models for classification, regression, or survival analysis with performance metrics",
      },
    ],
  },

  useCases: [
    {
      title: "Radiomics Research",
      description: "Extract quantitative features for radiomics studies and machine learning models",
      icon: "Brain",
    },
    {
      title: "Clinical Imaging Analysis",
      description: "Analyze medical images with advanced visualization and measurement tools",
      icon: "Stethoscope",
    },
    {
      title: "Image Processing Development",
      description: "Test and validate preprocessing algorithms with visual feedback",
      icon: "Code",
    },
    {
      title: "Feature Selection Studies",
      description: "Identify the most relevant biomarkers for your research",
      icon: "Target",
    },
  ],
};

