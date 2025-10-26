"use client";

import { useState, useEffect, useMemo } from "react";
import "./documentation.css";
import { 
  ChevronDown, 
  ChevronRight, 
  Monitor, 
  Globe, 
  Activity, 
  FileText,
  Menu,
  X,
  Search
} from "lucide-react";

// Documentation structure with TOC integrated
const documentationStructure = {
  radview: {
    title: "RadView",
    icon: Monitor,
    subsections: {
      desktop: {
        title: "Desktop",
        icon: Monitor,
        content: [
          { id: "overview", title: "Overview" },
          { id: "getting-started", title: "Getting Started" },
          { id: "user-interface", title: "User Interface" },
          { id: "scan-module", title: "Scan Module" },
          { id: "preprocessing-module", title: "Preprocessing Module" },
          { id: "feature-extraction-module", title: "Feature Extraction Module" },
          { id: "feature-selection-module", title: "Feature Selection Module" },
          { id: "visualization-module", title: "Visualization Module" },
          { id: "advanced-features", title: "Advanced Features" },
          { id: "troubleshooting", title: "Troubleshooting" },
          { id: "reference", title: "Reference" }
        ]
      },
      cloud: {
        title: "Web/Cloud",
        icon: Globe,
        content: [
          { id: "overview", title: "Overview" },
          { id: "getting-started", title: "Getting Started" },
          { id: "web-interface", title: "Web Interface" },
          { id: "experiments-module", title: "Experiments Module" },
          { id: "datasets-module", title: "Datasets Module" },
          { id: "workflows-module", title: "Workflows Module" },
          { id: "trash-bin-module", title: "Trash Bin Module" },
          { id: "admin-functions", title: "Admin Functions" },
          { id: "pipeline-processing", title: "Pipeline Processing" },
          { id: "scientific-documentation", title: "Scientific Documentation" },
          { id: "troubleshooting", title: "Troubleshooting" },
          { id: "reference", title: "Reference" }
        ]
      }
    }
  },
  hrs: {
    title: "HRS",
    icon: Activity,
    subsections: {
      desktop: {
        title: "Desktop",
        icon: Monitor,
        content: [
          { id: "overview", title: "Overview" },
          { id: "installation", title: "Installation & Setup" },
          { id: "getting-started", title: "Getting Started" },
          { id: "workflow", title: "HRS Workflow" },
          { id: "parameters", title: "Parameter Configuration" },
          { id: "processing-pipeline", title: "Processing Pipeline" },
          { id: "results", title: "Results & Interpretation" },
          { id: "visualization", title: "3D Visualization" },
          { id: "troubleshooting", title: "Troubleshooting" },
          { id: "reference", title: "Reference" }
        ]
      },
      cloud: {
        title: "Cloud",
        icon: Globe,
        content: [
          { id: "overview", title: "Overview" },
          { id: "getting-started", title: "Getting Started" },
          { id: "web-interface", title: "Web Interface" },
          { id: "datasets", title: "Datasets Module" },
          { id: "parameters", title: "HRS Parameters" },
          { id: "processing", title: "HRS Processing" },
          { id: "scientific", title: "Scientific Documentation" },
          { id: "troubleshooting", title: "Troubleshooting" },
          { id: "reference", title: "Reference" }
        ]
      }
    }
  }
};

// Content data for each section
const contentData = {
  "radview-desktop-overview": {
    title: "Overview",
    content: `
      <div class="info-box">
        <p><strong>Version:</strong> 3.4<br />
        <strong>Date:</strong> July 2025<br />
        <strong>Application:</strong> RadView Desktop<br />
        <strong>Purpose:</strong> Medical imaging analysis and radiomics feature extraction</p>
      </div>

      <p>RadView is a comprehensive medical imaging analysis software designed for radiomics feature extraction and visualization. The application allows users to scan patient images, process them through various preprocessing techniques, extract radiomics features, and visualize the results with advanced imaging capabilities.</p>
      
      <h3>Key Features</h3>
      <ul>
        <li><strong>Multi-format Support</strong>: DICOM, MHA, NIfTI, TIFF</li>
        <li><strong>Comprehensive Preprocessing</strong>: 11 different preprocessing modules</li>
        <li><strong>Extensive Feature Extraction</strong>: 100+ radiomics features across 13 categories</li>
        <li><strong>Advanced Visualization</strong>: Multi-planar views, color maps, measurements</li>
        <li><strong>Data Management</strong>: Database for patient/study/series management</li>
        <li><strong>Export Capabilities</strong>: CSV, MHA, NIfTI, PDF reports</li>
      </ul>

      <h3>System Requirements</h3>
      
      <h4>Minimum Requirements</h4>
      <ul>
        <li><strong>Operating System</strong>: Windows 10 (64-bit)</li>
        <li><strong>Memory</strong>: 8GB RAM</li>
        <li><strong>Storage</strong>: 2GB free space</li>
        <li><strong>Graphics</strong>: DirectX 11 compatible graphics card</li>
      </ul>

      <h4>Recommended Requirements</h4>
      <ul>
        <li><strong>Operating System</strong>: Windows 11 (64-bit)</li>
        <li><strong>Memory</strong>: 16GB RAM or more</li>
        <li><strong>Storage</strong>: 10GB free space</li>
        <li><strong>Graphics</strong>: Dedicated graphics card</li>
      </ul>
    `
  },
  "radview-desktop-getting-started": {
    title: "Getting Started",
    content: `
      <h3>Installation</h3>
      <ol>
        <li>Download the RadView installer from the official website</li>
        <li>Run the installer as administrator</li>
        <li>Follow the installation wizard</li>
        <li>Launch RadView from the desktop shortcut</li>
      </ol>

      <h3>First Launch</h3>
      <ol>
        <li>Enter your license key when prompted</li>
        <li>The application will initialize the database</li>
        <li>You'll see the main interface with five tabs</li>
      </ol>

      <h3>Quick Start Workflow</h3>
      <ol>
        <li><strong>Scan Module</strong>: Import your medical images</li>
        <li><strong>Preprocessing Module</strong>: Enhance and prepare images</li>
        <li><strong>Feature Extraction Module</strong>: Extract radiomics features</li>
        <li><strong>Feature Selection Module</strong>: Select relevant features</li>
        <li><strong>Visualization Module</strong>: View and analyze results</li>
      </ol>
    `
  },
  "radview-desktop-user-interface": {
    title: "User Interface",
    content: `
      <p>RadView features a modular interface designed for efficient medical image analysis workflow.</p>
      
      <h3>Main Layout</h3>
      <ul>
        <li><strong>Module Tabs</strong>: Five main modules accessible via tabs</li>
        <li><strong>Tool Panels</strong>: Module-specific tools and options</li>
        <li><strong>Status Bar</strong>: Application status and progress information</li>
        <li><strong>Menu Bar</strong>: File operations, settings, and help</li>
      </ul>

      <h3>Navigation</h3>
      <ul>
        <li><strong>Tab Navigation</strong>: Click tabs to switch between modules</li>
        <li><strong>Tool Access</strong>: Use tool panels for module-specific functions</li>
        <li><strong>Progress Tracking</strong>: Monitor processing status in real-time</li>
      </ul>
    `
  },
  "radview-desktop-scan-module": {
    title: "Scan Module",
    content: `
      <p>The Scan module is your entry point for loading and managing medical images.</p>
      
      <h3>Overview</h3>
      <p>The Scan module allows you to:</p>
      <ul>
        <li>Load medical images from various formats</li>
        <li>Organize patients, studies, and series</li>
        <li>Manage image metadata</li>
        <li>Send images to other modules</li>
      </ul>

      <h3>Supported Formats</h3>
      <ul>
        <li><strong>DICOM</strong>: Standard medical imaging format</li>
        <li><strong>MHA</strong>: MetaImage format</li>
        <li><strong>NIfTI</strong>: Neuroimaging format</li>
      </ul>

      <h3>Loading Images</h3>
      
      <h4>Method 1: Scan Directory</h4>
      <ol>
        <li>Click the <strong>"Scan Directory"</strong> button</li>
        <li>Select a folder containing medical images</li>
        <li>The application will automatically detect and load images</li>
        <li>Images are organized by Patient → Study → Series hierarchy</li>
      </ol>

      <h4>Method 2: Load from Database</h4>
      <ol>
        <li>Check the <strong>"Load from Database"</strong> checkbox</li>
        <li>Previously scanned images will be loaded from the database</li>
        <li>Useful for continuing previous sessions</li>
      </ol>

      <h3>Image Organization</h3>
      
      <h4>Patient Level</h4>
      <ul>
        <li><strong>Patient ID</strong>: Unique identifier</li>
        <li><strong>Patient Name</strong>: Display name</li>
        <li><strong>Date of Birth</strong>: Patient information</li>
        <li><strong>Gender</strong>: Patient demographics</li>
      </ul>

      <h4>Study Level</h4>
      <ul>
        <li><strong>Study Date</strong>: When the study was performed</li>
        <li><strong>Study Description</strong>: Type of examination</li>
      </ul>

      <h4>Series Level</h4>
      <ul>
        <li><strong>Series Description</strong>: Specific series information</li>
        <li><strong>Modality</strong>: Imaging modality (CT, MRI, etc.)</li>
        <li><strong>Protocol</strong>: Imaging protocol/sequence type (e.g., T1, T2, FLAIR, DWI, etc.)</li>
        <li><strong>Number of Images</strong>: Count of images in series</li>
        <li><strong>Image Dimensions</strong>: Width × Height × Slices</li>
        <li><strong>Pixel Spacing</strong>: Physical dimensions of pixels</li>
      </ul>

      <h3>Protocol Management</h3>
      
      <h4>Understanding Protocols</h4>
      <p>Protocols in RadView represent the specific imaging sequence or acquisition protocol used for each series. This is particularly important for:</p>
      <ul>
        <li><strong>MRI Sequences</strong>: T1-weighted, T2-weighted, FLAIR, DWI, etc.</li>
        <li><strong>CT Protocols</strong>: Contrast-enhanced, non-contrast, arterial phase, etc.</li>
        <li><strong>Custom Protocols</strong>: User-defined imaging protocols</li>
      </ul>

      <h4>Protocol Assignment</h4>
      <ol>
        <li><strong>Automatic Detection</strong>: RadView automatically detects protocols from DICOM metadata</li>
        <li><strong>Manual Assignment</strong>: Right-click on series to assign or change protocols</li>
        <li><strong>Protocol Settings</strong>: Configure available protocols in Settings menu</li>
      </ol>

      <h3>Image Management</h3>
      
      <h4>Viewing Images</h4>
      <ol>
        <li>Right-click on a series</li>
        <li>Select <strong>"Send to Viewer"</strong> from context menu</li>
        <li>Image opens in the Visualization module</li>
      </ol>

      <h4>Deleting Images</h4>
      <ol>
        <li>Right-click on patient/study/series</li>
        <li>Select <strong>"Delete"</strong> from context menu</li>
        <li>Confirm deletion in the dialog</li>
      </ol>

      <h4>Batch Operations</h4>
      <ul>
        <li><strong>Select All</strong>: Select all items in a list</li>
        <li><strong>Delete All</strong>: Remove all items at once</li>
      </ul>

      <h3>Database Management</h3>
      
      <h4>Reset Database</h4>
      <ol>
        <li>Go to <strong>Data</strong> menu</li>
        <li>Select <strong>"Reset Database"</strong></li>
        <li>Confirm to clear all data</li>
      </ol>

      <h4>Database Information</h4>
      <ul>
        <li><strong>Location</strong>: Stored in application data folder</li>
        <li><strong>Format</strong>: SQLite database</li>
        <li><strong>Backup</strong>: Regular backups recommended</li>
      </ul>
    `
  },
  "radview-desktop-preprocessing-module": {
    title: "Preprocessing Module",
    content: `
      <p>The Preprocessing module provides 11 different algorithms for image enhancement and preparation before feature extraction.</p>
      
      <h3>Available Algorithms</h3>
      
      <h4>1. Normalization</h4>
      <p><strong>Purpose</strong>: Standardize intensity values to a common range</p>
      <p><strong>Use Case</strong>: Ensures consistent intensity ranges across different scanners and protocols</p>
      
      <h4>2. Histogram Equalization</h4>
      <p><strong>Purpose</strong>: Enhance image contrast using histogram equalization</p>
      <p><strong>Use Case</strong>: Improves image contrast and visibility of anatomical structures</p>
      
      <h4>3. Flipping</h4>
      <p><strong>Purpose</strong>: Flip image along specified axis (horizontal, vertical, both)</p>
      <p><strong>Use Case</strong>: Correct image orientation or create augmented datasets</p>
      
      <h4>4. Scaling</h4>
      <p><strong>Purpose</strong>: Rescale intensity ranges by a scaling factor</p>
      <p><strong>Use Case</strong>: Standardize intensity ranges or create multi-scale analysis</p>
      
      <h4>5. Cropping</h4>
      <p><strong>Purpose</strong>: Extract region of interest from image</p>
      <p><strong>Parameters</strong>: Start coordinates (X, Y) and size (Width, Height)</p>
      <p><strong>Use Case</strong>: Focus analysis on specific anatomical regions</p>
      
      <h4>6. Resampling</h4>
      <p><strong>Purpose</strong>: Change image resolution and spacing</p>
      <p><strong>Parameters</strong>: New spacing values (X, Y, Z)</p>
      <p><strong>Use Case</strong>: Standardize image resolution across datasets</p>
      
      <h4>7. Resampling by Template</h4>
      <p><strong>Purpose</strong>: Resample image to match template dimensions</p>
      <p><strong>Use Case</strong>: Match reference image dimensions for comparative analysis</p>
      
      <h4>8. Anisotropic Diffusion</h4>
      <p><strong>Purpose</strong>: Reduce noise while preserving edges</p>
      <p><strong>Use Case</strong>: Denoise images for better feature extraction</p>
      
      <h4>9. N4 Bias Field Correction</h4>
      <p><strong>Purpose</strong>: Correct intensity inhomogeneities in MRI images</p>
      <p><strong>Parameters</strong>: Resolution levels, iterations, histogram bins, shrink factor</p>
      <p><strong>Use Case</strong>: Correct MRI intensity bias field</p>
      
      <h4>10. Legendre Bias Field Correction</h4>
      <p><strong>Purpose</strong>: Alternative bias field correction method</p>
      <p><strong>Parameters</strong>: Bias degree, slice iterations, volume iterations</p>
      <p><strong>Use Case</strong>: Correct intensity variations in medical images</p>
      
      <h4>11. Threshold Clipping</h4>
      <p><strong>Purpose</strong>: Clip values above or below threshold</p>
      <p><strong>Parameters</strong>: Threshold value, direction (below/above), replacement (NaN/threshold)</p>
      <p><strong>Use Case</strong>: Remove background or noise from images</p>
    `
  },
  "radview-desktop-feature-extraction-module": {
    title: "Feature Extraction Module",
    content: `
      <p>The Feature Extraction module calculates comprehensive radiomics features from medical images across 13 categories.</p>
      
      <h3>Overview</h3>
      <p>Feature extraction analyzes image properties to quantify texture characteristics, shape properties, intensity distributions, and spatial relationships in medical images.</p>

      <h3>Feature Categories</h3>
      
      <h4>First-Order Features</h4>
      <p><strong>Purpose</strong>: Statistical measures of intensity values without considering spatial relationships</p>
      <ul>
        <li><strong>Intensity</strong>: Returns the original intensity values</li>
        <li><strong>Mean</strong>: Average intensity value</li>
        <li><strong>Standard Deviation</strong>: Intensity variability</li>
        <li><strong>Median</strong>: Middle intensity value</li>
        <li><strong>Range</strong>: Intensity range</li>
        <li><strong>Gradient Magnitude</strong>: Edge strength</li>
      </ul>
      
      <h4>Second-Order Features</h4>
      <p><strong>Purpose</strong>: Texture features based on spatial relationships between pixels</p>
      
      <h5>Haralick Features (GLCM) - 25 subtypes</h5>
      <ul>
        <li><strong>Entropy</strong>: Measures randomness or disorder in image texture</li>
        <li><strong>Energy</strong>: Measures uniformity or angular second moment</li>
        <li><strong>Contrast</strong>: Measures local intensity variation and edge strength</li>
        <li><strong>Inverse Difference Moment</strong>: Measures local homogeneity</li>
        <li><strong>Correlation</strong>: Measures linear dependency between pixel pairs</li>
        <li>... and 20 additional Haralick features</li>
      </ul>
      
      <h5>GLRLM Features - 16 subtypes</h5>
      <p>Gray-level run-length matrix features for texture analysis</p>
      
      <h5>GLDM Features - 14 subtypes</h5>
      <p>Gray-level dependence matrix features</p>
      
      <h5>GLSZM Features - 16 subtypes</h5>
      <p>Gray-level size zone matrix features</p>
      
      <h5>NGTDM Features - 5 subtypes</h5>
      <p>Neighborhood gray-tone difference matrix features</p>
      
      <h4>Higher-Order Features</h4>
      
      <h5>Laws Features - 34 subtypes</h5>
      <p>Texture energy measures using Laws' kernels</p>
      
      <h5>Tamura Features - 6 subtypes</h5>
      <p>Texture characteristics including contrast, coarseness, directionality</p>
      
      <h5>Advanced Filtering Features</h5>
      <ul>
        <li><strong>Canny</strong>: Edge detection using Canny algorithm</li>
        <li><strong>Sobel</strong>: Gradient detection using Sobel operator</li>
        <li><strong>LoG</strong>: Laplacian of Gaussian edge detection</li>
        <li><strong>Gabor</strong>: Gabor filtering for texture analysis</li>
      </ul>
    `
  },
  "radview-desktop-feature-selection-module": {
    title: "Feature Selection Module",
    content: `
      <p>The Feature Selection module helps identify the most relevant features for your analysis using statistical methods.</p>
      
      <h3>Overview</h3>
      <p>Feature selection is crucial for reducing dimensionality, improving model performance, identifying key biomarkers, and reducing computational cost.</p>

      <h3>Selection Methods</h3>
      
      <h4>1. MRMR (Minimum Redundancy Maximum Relevance)</h4>
      <p><strong>Purpose</strong>: Select features that maximize relevance to the target while minimizing redundancy among features</p>
      <p><strong>Algorithm</strong>:</p>
      <ul>
        <li>Uses mutual information to measure feature relevance to labels</li>
        <li>Minimizes redundancy between selected features</li>
        <li>Implements both difference (MI - redundancy) and quotient (MI / redundancy) criteria</li>
      </ul>
      <p><strong>Parameters</strong>: Number of features to select (default: 1, range: 1-65536)</p>
      <p><strong>Use Case</strong>: Best for identifying non-redundant, highly relevant features</p>
      
      <h4>2. RankSum (Wilcoxon Rank-Sum Test)</h4>
      <p><strong>Purpose</strong>: Select features based on statistical significance using non-parametric rank-sum test</p>
      <p><strong>Algorithm</strong>:</p>
      <ul>
        <li>Performs Wilcoxon rank-sum test between feature values and labels</li>
        <li>Calculates p-values for each feature</li>
        <li>Selects features with highest p-values (most significant)</li>
      </ul>
      <p><strong>Parameters</strong>: Number of features to select (default: 1, range: 1-65536)</p>
      <p><strong>Use Case</strong>: Best for non-parametric feature selection when data doesn't follow normal distribution</p>
      
      <h4>3. T-Test</h4>
      <p><strong>Purpose</strong>: Select features based on statistical significance using parametric t-test</p>
      <p><strong>Algorithm</strong>:</p>
      <ul>
        <li>Performs two-sample t-test between feature values and labels</li>
        <li>Calculates p-values for each feature</li>
        <li>Selects features with highest p-values (most significant)</li>
        <li>Supports equal/unequal variance assumptions</li>
      </ul>
      <p><strong>Parameters</strong>: Number of features to select (default: 1, range: 1-65536)</p>
      <p><strong>Use Case</strong>: Best for parametric feature selection when data follows normal distribution</p>
    `
  },
  "radview-desktop-visualization-module": {
    title: "Visualization Module",
    content: `
      <p>The Visualization module provides advanced imaging and analysis capabilities with comprehensive measurement, annotation, and statistical tools.</p>
      
      <h3>Overview</h3>
      <p>The Visualization module offers:</p>
      <ul>
        <li><strong>Multi-planar image display</strong> (Axial, Coronal, Sagittal)</li>
        <li><strong>Feature visualization</strong> with color mapping</li>
        <li><strong>Measurement tools</strong> (Distance, Area, Angle)</li>
        <li><strong>Annotation capabilities</strong> (Mask drawing, ROI creation)</li>
        <li><strong>Statistical analysis</strong> (Histograms, Box plots, Shape features)</li>
        <li><strong>Export functionality</strong> (Multiple formats)</li>
        <li><strong>Connected viewers</strong> for synchronized analysis</li>
      </ul>

      <h3>Display Modes</h3>
      
      <h4>Multi-Planar Views</h4>
      <p><strong>Anatomical Views:</strong></p>
      <ul>
        <li><strong>Axial View</strong>: Horizontal slices (top-down)</li>
        <li><strong>Coronal View</strong>: Frontal slices (front-to-back)</li>
        <li><strong>Sagittal View</strong>: Side slices (left-to-right)</li>
      </ul>

      <p><strong>Navigation Controls:</strong></p>
      <ul>
        <li><strong>Slice Slider</strong>: Navigate through volume slices</li>
        <li><strong>Mouse Wheel</strong>: Zoom in/out</li>
        <li><strong>Click and Drag</strong>: Pan across image</li>
        <li><strong>Anatomical Orientation</strong>: Switch between views using dropdown</li>
      </ul>

      <p><strong>3D Human Model:</strong> Interactive STL model shows current viewing orientation</p>

      <h4>Viewer Layout Settings</h4>
      <p><strong>Purpose:</strong> Configure the number and arrangement of visualization viewers</p>
      <p><strong>Location:</strong> Setting → Options → Visualization → Viewers Layout</p>

      <p><strong>Available Layouts:</strong></p>
      <ul>
        <li><strong>2x1</strong>: Two viewers arranged horizontally (default)</li>
        <li><strong>3x1</strong>: Three viewers arranged horizontally</li>
        <li><strong>2x2</strong>: Four viewers arranged in a 2x2 grid</li>
      </ul>

      <h4>Window/Level Adjustment</h4>
      <p><strong>Purpose:</strong> Optimize image contrast and brightness for better visualization</p>
      <p><strong>Methods:</strong></p>
      <ul>
        <li><strong>Mouse Interaction</strong>: Click and drag directly on image</li>
        <li><strong>Heat Map Slider</strong>: Adjust intensity range with dual-handle slider</li>
        <li><strong>Value Input</strong>: Enter specific window/level values in text fields</li>
        <li><strong>Reset Button</strong>: Restore original window/level settings</li>
      </ul>

      <h3>Feature Visualization</h3>
      
      <h4>Color Maps</h4>
      <p><strong>Available Maps:</strong></p>
      <ul>
        <li><strong>JET</strong>: Rainbow color map (default)</li>
        <li><strong>Parula</strong>: Perceptually uniform color map</li>
        <li><strong>V L04</strong>: Linear color map</li>
        <li><strong>D01A</strong>: Diverging color map</li>
        <li><strong>CBL1</strong>: Custom color map</li>
      </ul>

      <h3>Measurement Tools</h3>
      
      <h4>1. Distance Measurement (Line)</h4>
      <p><strong>Method:</strong></p>
      <ol>
        <li>Enable <strong>"Measure Line"</strong> mode</li>
        <li>Click start point on image</li>
        <li>Drag to end point</li>
        <li>Release to complete measurement</li>
      </ol>

      <h4>2. Area Measurement (Rectangle)</h4>
      <p><strong>Method:</strong></p>
      <ol>
        <li>Enable <strong>"Measure Rectangle"</strong> mode</li>
        <li>Click and drag to create rectangle</li>
        <li>Release to complete measurement</li>
      </ol>

      <h4>3. Angle Measurement</h4>
      <p><strong>Method:</strong></p>
      <ol>
        <li>Enable <strong>"Measure Angle"</strong> mode</li>
        <li>Click first point (vertex)</li>
        <li>Drag to second point and click</li>
        <li>Drag to third point and click</li>
      </ol>

      <h4>4. Shape Features</h4>
      <p><strong>Purpose:</strong> Calculate geometric properties of ROIs automatically</p>
      <p><strong>Features:</strong></p>
      <ul>
        <li><strong>Centroid</strong>: Center of mass coordinates</li>
        <li><strong>Bounding Box</strong>: Minimum enclosing rectangle dimensions</li>
        <li><strong>Elongation</strong>: Aspect ratio of bounding box</li>
        <li><strong>Volume</strong>: 3D volume calculation</li>
        <li><strong>Area</strong>: 2D area calculation</li>
        <li><strong>Perimeter</strong>: Boundary length</li>
        <li><strong>Sphericity</strong>: Roundness measure</li>
        <li><strong>Surface Area</strong>: 3D surface area</li>
      </ul>

      <h3>Annotation Tools</h3>
      
      <h4>Mask Drawing (Scribbling)</h4>
      <p><strong>Method:</strong></p>
      <ol>
        <li>Enable <strong>"Start Annotation"</strong> mode</li>
        <li>Select drawing color from color picker</li>
        <li>Draw on image with mouse (freehand)</li>
        <li>Switch between drawing and erasing modes</li>
        <li>Save mask for feature extraction</li>
      </ol>

      <p><strong>Features:</strong></p>
      <ul>
        <li><strong>Color-coded Masks</strong>: Each mask has unique color</li>
        <li><strong>Brush Size</strong>: Adjustable drawing brush</li>
        <li><strong>Erase Mode</strong>: Remove parts of existing masks</li>
        <li><strong>Undo/Redo</strong>: Step-by-step mask editing</li>
        <li><strong>Multi-slice Drawing</strong>: Draw across multiple slices</li>
      </ul>

      <h3>Statistical Analysis</h3>
      
      <h4>ROI Control</h4>
      <p><strong>Purpose:</strong> Control whether statistics are calculated for entire image or ROI only</p>
      <p><strong>ROI Checkbox:</strong></p>
      <ul>
        <li><strong>Unchecked</strong>: Statistics calculated for entire image/volume</li>
        <li><strong>Checked</strong>: Statistics calculated only within drawn ROI/mask regions</li>
      </ul>

      <h4>Histogram Display</h4>
      <p><strong>Purpose:</strong> Show intensity distribution of selected regions</p>
      <ol>
        <li>Select image or feature volume</li>
        <li>Enable <strong>"Histogram"</strong> radio button</li>
        <li>Toggle <strong>ROI checkbox</strong> to control calculation scope</li>
        <li>View intensity distribution chart</li>
      </ol>

      <h4>Box Plot Analysis</h4>
      <p><strong>Purpose:</strong> Compare feature distributions across different groups</p>
      <ol>
        <li>Features appear automatically after feature extraction</li>
        <li>Enable <strong>"Box Plot"</strong> radio button</li>
        <li>Toggle <strong>ROI checkbox</strong> to control calculation scope</li>
        <li>View feature distributions as box plots</li>
      </ol>

      <h3>Advanced Features</h3>
      
      <h4>Viewer Connection</h4>
      <p><strong>Purpose:</strong> Synchronize multiple viewers for coordinated analysis</p>
      <p><strong>Synchronized Operations:</strong></p>
      <ul>
        <li><strong>Slice Navigation</strong>: Moving slice slider updates all connected viewers</li>
        <li><strong>Anatomical View Changes</strong>: Switching views updates all viewers</li>
        <li><strong>Window/Level Adjustments</strong>: Changes propagate to connected viewers</li>
        <li><strong>ROI State</strong>: ROI visibility synchronized across viewers</li>
      </ul>

      <h4>Export Functionality</h4>
      <p><strong>Export Formats:</strong></p>
      <ul>
        <li><strong>Images</strong>: PNG (screenshots), MHA, DCM, NII</li>
        <li><strong>Masks</strong>: MHA, DCM, NII formats</li>
        <li><strong>Features</strong>: MHA, NII formats</li>
      </ul>

      <h4>Image Flipping</h4>
      <p><strong>Purpose:</strong> Correct anatomical orientation for analysis</p>
      <p><strong>Flipping Options:</strong></p>
      <ul>
        <li><strong>Anterior-Posterior</strong>: Flip along A-P axis</li>
        <li><strong>Right-Left</strong>: Flip along R-L axis</li>
        <li><strong>Inferior-Superior</strong>: Flip along I-S axis</li>
        <li><strong>Reset Orientation</strong>: Restore original orientation</li>
      </ul>
    `
  },
  "radview-desktop-advanced-features": {
    title: "Advanced Features",
    content: `
      <p>RadView includes advanced features for professional medical imaging analysis workflows.</p>
      
      <h3>Batch Processing</h3>
      <ul>
        <li><strong>Multiple Patient Processing</strong>: Process multiple patients simultaneously</li>
        <li><strong>Automated Workflow Execution</strong>: Hands-off processing of complete workflows</li>
        <li><strong>Progress Monitoring</strong>: Real-time progress tracking and error handling</li>
        <li><strong>Queue Management</strong>: Organize and prioritize processing jobs</li>
      </ul>
      
      <h3>Database Integration</h3>
      <ul>
        <li><strong>Patient Data Management</strong>: Comprehensive patient information storage</li>
        <li><strong>Study and Series Organization</strong>: Hierarchical data organization</li>
        <li><strong>Metadata Extraction</strong>: Automatic extraction and storage of DICOM metadata</li>
        <li><strong>Search and Filter</strong>: Advanced search capabilities across patient data</li>
      </ul>
      
      <h3>Export Options</h3>
      <ul>
        <li><strong>CSV Export</strong>: Feature data and statistics in spreadsheet format</li>
        <li><strong>MHA Export</strong>: Processed image volumes in MHA format</li>
        <li><strong>NIfTI Export</strong>: Standard neuroimaging format for compatibility</li>
        <li><strong>PDF Reports</strong>: Comprehensive analysis reports with visualizations</li>
        <li><strong>DICOM Export</strong>: Export processed images in DICOM format</li>
      </ul>
      
      <h3>Advanced Analysis</h3>
      <ul>
        <li><strong>Statistical Analysis</strong>: Built-in statistical tools for feature analysis</li>
        <li><strong>Correlation Analysis</strong>: Feature correlation and dependency analysis</li>
        <li><strong>Quality Control</strong>: Image quality assessment and validation</li>
        <li><strong>Reproducibility Tools</strong>: Ensure consistent and reproducible results</li>
      </ul>
    `
  },
  "radview-desktop-troubleshooting": {
    title: "Troubleshooting",
    content: `
      <p>Common issues and solutions for RadView Desktop application.</p>
      
      <h3>Installation Issues</h3>
      
      <h4>Installation Fails</h4>
      <ul>
        <li><strong>Issue</strong>: Installer fails to run or crashes</li>
        <li><strong>Solution</strong>: Run installer as administrator, check system requirements</li>
      </ul>
      
      <h4>License Key Issues</h4>
      <ul>
        <li><strong>Issue</strong>: License key not accepted</li>
        <li><strong>Solution</strong>: Verify license key format, contact support if expired</li>
      </ul>
      
      <h3>Performance Issues</h3>
      
      <h4>Slow Processing</h4>
      <ul>
        <li><strong>Issue</strong>: Feature extraction or processing is slow</li>
        <li><strong>Solution</strong>: Check available RAM, close other applications, reduce image size</li>
      </ul>
      
      <h4>Memory Errors</h4>
      <ul>
        <li><strong>Issue</strong>: Application crashes with memory errors</li>
        <li><strong>Solution</strong>: Increase virtual memory, process smaller datasets</li>
      </ul>
      
      <h3>Data Issues</h3>
      
      <h4>Import Problems</h4>
      <ul>
        <li><strong>Issue</strong>: Files not importing correctly</li>
        <li><strong>Solution</strong>: Check file format compatibility, verify file integrity</li>
      </ul>
      
      <h4>Database Issues</h4>
      <ul>
        <li><strong>Issue</strong>: Database errors or corruption</li>
        <li><strong>Solution</strong>: Rebuild database, restore from backup</li>
      </ul>
    `
  },
  "radview-desktop-reference": {
    title: "Reference",
    content: `
      <p>Technical reference information for RadView Desktop.</p>
      
      <h3>File Formats</h3>
      
      <h4>Supported Input Formats</h4>
      <ul>
        <li><strong>DICOM</strong>: .dcm, .dicom files</li>
        <li><strong>MHA</strong>: .mha, .mhd files</li>
        <li><strong>NIfTI</strong>: .nii, .nii.gz files</li>
        <li><strong>TIFF</strong>: .tiff, .tif files</li>
      </ul>
      
      <h4>Supported Output Formats</h4>
      <ul>
        <li><strong>CSV</strong>: Feature data and statistics</li>
        <li><strong>MHA</strong>: Image volumes</li>
        <li><strong>NIfTI</strong>: Image volumes</li>
        <li><strong>PDF</strong>: Reports and documentation</li>
        <li><strong>DICOM</strong>: Processed images</li>
      </ul>
      
      <h3>System Requirements</h3>
      <ul>
        <li><strong>Operating System</strong>: Windows 10/11 (64-bit)</li>
        <li><strong>Memory</strong>: 8GB RAM minimum, 16GB recommended</li>
        <li><strong>Storage</strong>: 2GB free space minimum</li>
        <li><strong>Graphics</strong>: DirectX 11 compatible graphics card</li>
        <li><strong>Display</strong>: 1280x720 minimum resolution</li>
      </ul>
    `
  },
  // RadView Cloud content
  "radview-cloud-overview": {
    title: "Overview",
    content: `
      <p>RadView Cloud is a comprehensive web-based medical imaging analysis platform designed for radiomics feature extraction and visualization. The cloud application provides the same powerful capabilities as the desktop version while offering enhanced collaboration, scalability, and accessibility through modern web technologies.</p>
      
      <h3>Key Features</h3>
      <div class="feature-grid">
        <div class="feature-card">
          <h4>Multi-format Support</h4>
          <p>DICOM, MHA, NIfTI, TIFF</p>
        </div>
        <div class="feature-card">
          <h4>Comprehensive Preprocessing</h4>
          <p>12 different preprocessing modules</p>
        </div>
        <div class="feature-card">
          <h4>Extensive Feature Extraction</h4>
          <p>100+ radiomics features across 13 categories</p>
        </div>
        <div class="feature-card">
          <h4>Cloud Data Management</h4>
          <p>Secure patient/study/series management</p>
        </div>
        <div class="feature-card">
          <h4>Real-time Collaboration</h4>
          <p>Share projects and results with team members</p>
        </div>
      </div>

      <h3>Cloud Advantages</h3>
      <ul>
        <li><strong>Accessibility</strong>: Access from any device with a modern web browser</li>
        <li><strong>Collaboration</strong>: Share projects and results with team members</li>
        <li><strong>Scalability</strong>: Process large datasets using cloud computing resources</li>
        <li><strong>Security</strong>: Enterprise-grade security and compliance</li>
        <li><strong>Updates</strong>: Automatic updates without manual installation</li>
      </ul>
    `
  },
  "radview-cloud-getting-started": {
    title: "Getting Started",
    content: `
      <h3>System Requirements</h3>
      <ul>
        <li><strong>Web Browser</strong>: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+</li>
        <li><strong>Internet Connection</strong>: Stable broadband connection recommended</li>
        <li><strong>Screen Resolution</strong>: Minimum 1280x720, recommended 1920x1080</li>
        <li><strong>JavaScript</strong>: Must be enabled</li>
      </ul>

      <h3>Account Setup</h3>
      <p>To access RadView Cloud, you need to contact support to obtain a license. The account creation process is handled through our support team to ensure proper licensing and security.</p>
      
      <div class="highlight">
        <strong>Note:</strong> Account creation is currently handled by contacting support for a license. This ensures proper licensing and security compliance.
      </div>

      <h3>First Login</h3>
      <ol>
        <li>Navigate to the RadView Cloud login page</li>
        <li>Enter your email address and password provided by support</li>
        <li>Click "Sign In" to access the application</li>
        <li>You will be redirected to the Experiments page (home page)</li>
      </ol>
    `
  },
  "radview-cloud-web-interface": {
    title: "Web Interface",
    content: `
      <p>The RadView Cloud interface is designed for intuitive navigation and efficient workflow management. The main interface consists of several key modules accessible through the navigation menu.</p>

      <h3>Navigation Structure</h3>
      <ul>
        <li><strong>Experiments</strong>: Main workspace for creating and managing analysis experiments</li>
        <li><strong>Datasets</strong>: Data management and organization</li>
        <li><strong>Workflows</strong>: Pipeline configuration and step management</li>
        <li><strong>Trash Bin</strong>: Deleted items management</li>
        <li><strong>Admin Functions</strong>: User and system management (admin users only)</li>
      </ul>
    `
  },
  "radview-cloud-experiments-module": {
    title: "Experiments Module",
    content: `
      <p>The Experiments module is the main workspace where users create, manage, and execute radiomics analysis experiments. This is the default landing page after login.</p>

      <h3>Creating a New Experiment</h3>
      <ol>
        <li>Click the "Add Experiment" button</li>
        <li>Enter a descriptive name for your experiment</li>
        <li>Select a dataset from your available datasets</li>
        <li>Choose a workflow for processing</li>
        <li>Click "Create" to save the experiment</li>
      </ol>

      <h3>Experiment Management</h3>
      <p>Each experiment in the experiments table displays:</p>
      <ul>
        <li><strong>Name</strong>: Experiment identifier</li>
        <li><strong>Dataset</strong>: Associated dataset</li>
        <li><strong>Workflow</strong>: Processing pipeline</li>
        <li><strong>Status</strong>: Current processing state</li>
        <li><strong>Lock Status</strong>: Indicates if experiment is locked by another user or system</li>
        <li><strong>Created Date</strong>: When the experiment was created</li>
      </ul>

      <h3>Experiment Actions</h3>
      <ul>
        <li><strong>Start Processing</strong>: Begin the RadView pipeline execution</li>
        <li><strong>Edit</strong>: Modify experiment parameters</li>
        <li><strong>Delete</strong>: Remove experiment (moves to trash bin)</li>
        <li><strong>Share</strong>: Share with other users as duplicate or read-only</li>
      </ul>
    `
  },
  // Add more cloud sections as needed...
  "radview-cloud-datasets-module": {
    title: "Datasets Module",
    content: `
      <p>The Datasets module provides comprehensive data management capabilities with a two-table structure for organizing patient data and datasets.</p>

      <h3>Dataset Structure</h3>
      <p>The interface consists of two main table groups:</p>
      
      <h4>Right Table Group - User Datasets</h4>
      <ul>
        <li>Displays datasets owned by the current user</li>
        <li>Datasets can be added by name only</li>
        <li>Each dataset can contain multiple patients, studies, and series</li>
      </ul>

      <h4>Left Table Group - Data Hierarchy</h4>
      <p>Four interconnected tables for data organization:</p>
      <ul>
        <li><strong>Patients</strong>: Top-level patient records</li>
        <li><strong>Studies</strong>: Medical studies associated with patients</li>
        <li><strong>Series</strong>: Image series within studies</li>
        <li><strong>Masks</strong>: Segmentation masks for regions of interest</li>
      </ul>

      <h3>File Upload</h3>
      <p>Two upload methods are available:</p>
      
      <h4>ZIP File Upload</h4>
      <ul>
        <li>Upload patient data as compressed ZIP files</li>
        <li>Supports multiple ZIP files simultaneously</li>
        <li>Each ZIP file represents one patient</li>
      </ul>

      <h4>Folder Upload</h4>
      <ul>
        <li>Upload entire patient folders</li>
        <li>Maintains original folder structure</li>
        <li>Supports batch upload of multiple patients</li>
      </ul>
    `
  },
  "radview-cloud-workflows-module": {
    title: "Workflows Module",
    content: `
      <p>The Workflows module allows users to create, configure, and manage processing pipelines for radiomics analysis.</p>

      <h3>Workflow Management</h3>
      <ul>
        <li><strong>Create</strong>: Add new workflows with custom names</li>
        <li><strong>Rename</strong>: Modify workflow names</li>
        <li><strong>Delete</strong>: Remove workflows (moves to trash bin)</li>
        <li><strong>Share</strong>: Share workflows with other users</li>
      </ul>

      <h3>Workflow Sharing Options</h3>
      <ul>
        <li><strong>Duplicate</strong>: Create a copy for the recipient</li>
        <li><strong>Read-Only</strong>: Recipient can view but not modify</li>
        <li><strong>Full Access</strong>: Recipient has complete control (when both duplicate and read-only are disabled)</li>
      </ul>

      <h3>Step Configuration</h3>
      <p>When clicking on a workflow, a modal opens for adding step filters:</p>
      
      <h4>Step Types</h4>
      <ul>
        <li><strong>Preprocessing Steps</strong>: Image enhancement and preparation</li>
        <li><strong>Feature Extraction Steps</strong>: Radiomics feature calculation</li>
      </ul>

      <h4>Step Management</h4>
      <ul>
        <li>Add new processing steps</li>
        <li>Delete existing steps</li>
        <li>Reorder steps in the pipeline</li>
      </ul>

      <h3>Filter Configuration</h3>
      <p>Clicking on any step opens another modal for adding filters:</p>
      <ul>
        <li>Configure specific parameters for each step</li>
        <li>Add multiple filters per step</li>
        <li>Delete individual filters</li>
      </ul>

      <h3>Required Steps</h3>
      <div class="highlight">
        <strong>Important:</strong> Every workflow must end with two mandatory steps:
        <ol>
          <li><strong>Summary Statistics Step</strong>: Calculates statistical measures</li>
          <li><strong>Feature Selection Step</strong>: Identifies relevant features</li>
        </ol>
      </div>
    `
  },
  "radview-cloud-trash-bin-module": {
    title: "Trash Bin Module",
    content: `
      <p>The Trash Bin module manages deleted items and provides recovery options for accidentally deleted content.</p>

      <h3>Trash Bin Contents</h3>
      <p>The trash bin contains:</p>
      <ul>
        <li><strong>Deleted Experiments</strong>: Experiments that have been removed</li>
        <li><strong>Deleted Workflows</strong>: Processing pipelines that have been removed</li>
        <li><strong>Deleted Datasets</strong>: Data collections that have been removed</li>
      </ul>

      <h3>Trash Bin Actions</h3>
      <ul>
        <li><strong>Restore</strong>: Recover deleted items to their original location</li>
        <li><strong>Delete Permanently</strong>: Permanently remove items from the system</li>
        <li><strong>View Details</strong>: See information about deleted items</li>
      </ul>

      <div class="highlight">
        <strong>Note:</strong> Items in the trash bin are automatically purged after 30 days to maintain system performance and storage efficiency.
      </div>
    `
  },
  "radview-cloud-admin-functions": {
    title: "Admin Functions",
    content: `
      <p>Admin functions are available to users with administrative privileges and provide system management capabilities.</p>

      <h3>User Management</h3>
      <p>Administrators can add and remove users from the system.</p>

      <h4>Create User Modal</h4>
      <p>When adding a new user, the following fields are required:</p>
      <ul>
        <li><strong>User Name</strong>: Unique identifier for the user</li>
        <li><strong>Email</strong>: User's email address for login</li>
        <li><strong>Password</strong>: Initial password for the user</li>
        <li><strong>Phone Number</strong>: Contact information</li>
        <li><strong>License End Date</strong>: When the user's access expires</li>
      </ul>

      <h3>User Roles and Permissions</h3>
      <p>RadView Cloud implements a comprehensive role-based access control (RBAC) system with six distinct user roles:</p>

      <div class="feature-grid">
        <div class="feature-card">
          <h4>Main Admin</h4>
          <p><strong>Description:</strong> System administrator with full control</p>
          <ul>
            <li>Full system access and configuration</li>
            <li>Create, modify, and delete all users</li>
            <li>Access to all data and experiments</li>
            <li>System monitoring and maintenance</li>
          </ul>
        </div>

        <div class="feature-card">
          <h4>Facility Admin</h4>
          <p><strong>Description:</strong> Facility-level administrator</p>
          <ul>
            <li>Manage users within their facility</li>
            <li>Access to facility-specific data</li>
            <li>Create and manage workflows</li>
            <li>Data export and reporting</li>
          </ul>
        </div>

        <div class="feature-card">
          <h4>Developer</h4>
          <p><strong>Description:</strong> Technical user for development</p>
          <ul>
            <li>Full access to all features and data</li>
            <li>Create and modify complex workflows</li>
            <li>API access for integration</li>
            <li>Debugging tools</li>
          </ul>
        </div>

        <div class="feature-card">
          <h4>Tester</h4>
          <p><strong>Description:</strong> Quality assurance user</p>
          <ul>
            <li>Access to test datasets</li>
            <li>Create test experiments</li>
            <li>Report bugs and issues</li>
            <li>Validate new features</li>
          </ul>
        </div>

        <div class="feature-card">
          <h4>User</h4>
          <p><strong>Description:</strong> Standard end user</p>
          <ul>
            <li>Create and manage personal experiments</li>
            <li>Upload and organize datasets</li>
            <li>Use predefined workflows</li>
            <li>Share experiments</li>
          </ul>
        </div>

        <div class="feature-card">
          <h4>Viewer</h4>
          <p><strong>Description:</strong> Read-only access user</p>
          <ul>
            <li>View shared experiments and results</li>
            <li>Access read-only workflows</li>
            <li>Download reports</li>
            <li>No modification rights</li>
          </ul>
        </div>
      </div>
    `
  },
  "radview-cloud-pipeline-processing": {
    title: "Pipeline Processing",
    content: `
      <p>RadView Cloud uses a sophisticated pipeline processing system that executes workflows in a structured, sequential manner.</p>

      <h3>Processing Flow</h3>
      <ol>
        <li><strong>Experiment Initialization</strong>: System validates experiment parameters</li>
        <li><strong>Data Preparation</strong>: Selected datasets are prepared for processing</li>
        <li><strong>Preprocessing Execution</strong>: Image enhancement and preparation steps</li>
        <li><strong>Feature Extraction</strong>: Radiomics feature calculation</li>
        <li><strong>Statistical Analysis</strong>: Summary statistics computation</li>
        <li><strong>Feature Selection</strong>: Relevant feature identification</li>
        <li><strong>Results Generation</strong>: Final output and visualization</li>
      </ol>

      <h3>Processing Status</h3>
      <p>Experiments display real-time processing status:</p>
      <ul>
        <li><strong>Queued</strong>: Waiting to start processing</li>
        <li><strong>Running</strong>: Currently being processed</li>
        <li><strong>Completed</strong>: Successfully finished</li>
        <li><strong>Failed</strong>: Processing encountered an error</li>
        <li><strong>Cancelled</strong>: Processing was stopped by user</li>
      </ul>

      <h3>Resource Management</h3>
      <ul>
        <li><strong>Queue Management</strong>: Automatic queuing of multiple experiments</li>
        <li><strong>Resource Allocation</strong>: Dynamic allocation of cloud computing resources</li>
        <li><strong>Progress Tracking</strong>: Real-time progress updates</li>
        <li><strong>Error Handling</strong>: Comprehensive error reporting and recovery</li>
      </ul>
    `
  },
  "radview-cloud-scientific-documentation": {
    title: "Scientific Documentation",
    content: `
      <p>This section provides detailed scientific documentation for the preprocessing, feature extraction, statistics, and selection modules in RadView Cloud.</p>

      <h3>Preprocessing Module</h3>
      <p>The Preprocessing module provides 12 different image enhancement and preparation techniques to optimize images for feature extraction.</p>

      <h4>Available Preprocessing Algorithms</h4>
      
      <div class="feature-grid">
        <div class="feature-card">
          <h4>1. Normalization</h4>
          <p><strong>Purpose:</strong> Normalize image intensity values to standard range</p>
          <p><strong>Use Case:</strong> Standardize intensity ranges across different images</p>
        </div>

        <div class="feature-card">
          <h4>2. Histogram Equalization</h4>
          <p><strong>Purpose:</strong> Enhance image contrast using histogram equalization</p>
          <p><strong>Use Case:</strong> Improve image contrast and visibility</p>
        </div>

        <div class="feature-card">
          <h4>3. Flipping</h4>
          <p><strong>Purpose:</strong> Flip image along specified axis</p>
          <p><strong>Parameters:</strong> Direction (Horizontal, Vertical, Both)</p>
          <p><strong>Use Case:</strong> Correct image orientation</p>
        </div>

        <div class="feature-card">
          <h4>4. Scaling</h4>
          <p><strong>Purpose:</strong> Resize image by scaling factor</p>
          <p><strong>Parameters:</strong> Scale Factor (default: 1.0)</p>
          <p><strong>Use Case:</strong> Standardize image sizes</p>
        </div>

        <div class="feature-card">
          <h4>5. Cropping</h4>
          <p><strong>Purpose:</strong> Extract region of interest from image</p>
          <p><strong>Parameters:</strong> Start X, Start Y, Size X, Size Y</p>
          <p><strong>Use Case:</strong> Focus analysis on specific regions</p>
        </div>

        <div class="feature-card">
          <h4>6. Resampling</h4>
          <p><strong>Purpose:</strong> Change image resolution and spacing</p>
          <p><strong>Parameters:</strong> Spacing X, Y, Z (default: 1.0)</p>
          <p><strong>Use Case:</strong> Standardize image resolution</p>
        </div>

        <div class="feature-card">
          <h4>7. Resampling by Template</h4>
          <p><strong>Purpose:</strong> Resample image to match template dimensions</p>
          <p><strong>Use Case:</strong> Match reference image dimensions</p>
        </div>

        <div class="feature-card">
          <h4>8. Anisotropic Diffusion</h4>
          <p><strong>Purpose:</strong> Reduce noise while preserving edges</p>
          <p><strong>Use Case:</strong> Denoise images for better feature extraction</p>
        </div>

        <div class="feature-card">
          <h4>9. N4 Bias Field Correction</h4>
          <p><strong>Purpose:</strong> Correct intensity inhomogeneities</p>
          <p><strong>Parameters:</strong> Resolutions (1), Iterations (50,40,30), Bins (128), Shrink Factor (4)</p>
          <p><strong>Use Case:</strong> Correct MRI intensity bias</p>
        </div>

        <div class="feature-card">
          <h4>10. Legendre Bias Field Correction</h4>
          <p><strong>Purpose:</strong> Alternative bias field correction method</p>
          <p><strong>Parameters:</strong> Bias Degree (3), Slice/Volume Iterations (100)</p>
          <p><strong>Use Case:</strong> Correct intensity variations</p>
        </div>

        <div class="feature-card">
          <h4>11. Threshold Clipping</h4>
          <p><strong>Purpose:</strong> Clip values above/below threshold</p>
          <p><strong>Parameters:</strong> Threshold (0), Direction (Below/Above), Replacement (NaN/Threshold)</p>
          <p><strong>Use Case:</strong> Remove background or noise</p>
        </div>
      </div>

      <h3>Feature Extraction Module</h3>
      <p>The Feature Extraction module calculates radiomics features from medical images to quantify texture characteristics, shape properties, intensity distributions, and spatial relationships.</p>

      <h4>Summarized Features</h4>
      <p><strong>Purpose:</strong> Automatically calculate 23 statistical measures for every extracted feature</p>
      <div class="info-box">
        <p><strong>23 Statistical Measures:</strong></p>
        <p>Max, Min, Mean, Median, Mode, Variance, Standard Deviation, Moment, Skewness, Entropy, Kurtosis, Range, Energy, Total Energy, 10th Percentile (C1), 90th Percentile (C1), 10th Percentile (C0.5), 90th Percentile (C0.5), Interquartile Range, Uniformity, Mean Absolute Deviation (MAD), Root Mean Squared (RMS), Robust Mean Absolute Deviation (rMAD)</p>
      </div>

      <h4>Feature Categories</h4>
      
      <h5>First-Order Features</h5>
      <p><strong>Purpose:</strong> Statistical measures of intensity values without considering spatial relationships</p>
      <ul>
        <li><strong>Intensity</strong>: Original intensity values</li>
        <li><strong>Mean</strong>: Average intensity value</li>
        <li><strong>Standard Deviation</strong>: Intensity variability</li>
        <li><strong>Median</strong>: Middle intensity value</li>
        <li><strong>Range</strong>: Intensity range</li>
        <li><strong>Gradient Magnitude</strong>: Edge strength</li>
      </ul>

      <h5>Second-Order Features</h5>
      <p><strong>Purpose:</strong> Texture features based on spatial relationships</p>
      
      <div class="feature-grid">
        <div class="feature-card">
          <h4>Haralick Features (GLCM)</h4>
          <p><strong>Features:</strong> 25 subtypes including Entropy, Energy, Contrast, Correlation, etc.</p>
          <p><strong>Parameters:</strong> Bins (8), Radius (1)</p>
        </div>

        <div class="feature-card">
          <h4>GLRLM Features</h4>
          <p><strong>Features:</strong> 16 subtypes including Short/Long Run Emphasis, Gray Level Non-Uniformity, etc.</p>
          <p><strong>Parameters:</strong> Radius (2)</p>
        </div>

        <div class="feature-card">
          <h4>GLDM Features</h4>
          <p><strong>Features:</strong> 14 subtypes including Small/Large Dependence Emphasis, etc.</p>
          <p><strong>Parameters:</strong> Radius (2)</p>
        </div>

        <div class="feature-card">
          <h4>GLSZM Features</h4>
          <p><strong>Features:</strong> 16 subtypes including Small/Large Area Emphasis, Zone Percentage, etc.</p>
          <p><strong>Parameters:</strong> Radius (2)</p>
        </div>

        <div class="feature-card">
          <h4>NGTDM Features</h4>
          <p><strong>Features:</strong> 5 subtypes including Contrast, Coarseness, Busyness, Complexity, Strength</p>
          <p><strong>Parameters:</strong> Radius (2), Distances (1)</p>
        </div>

        <div class="feature-card">
          <h4>Collage Features</h4>
          <p><strong>Features:</strong> 13 subtypes based on GLCM orientation images</p>
          <p><strong>Parameters:</strong> Bins (8), Radius (2), Offset X (0), Offset Y (1)</p>
        </div>
      </div>

      <h5>Higher-Order Features</h5>
      
      <div class="feature-grid">
        <div class="feature-card">
          <h4>Laws Features</h4>
          <p><strong>Features:</strong> 34 subtypes using Laws' texture energy measures</p>
          <p><strong>Kernels:</strong> 3x3 and 5x5 combinations (L, E, S, W, R)</p>
        </div>

        <div class="feature-card">
          <h4>Tamura Features</h4>
          <p><strong>Features:</strong> 6 subtypes including Contrast, Coarseness, Directionality, Line Likeness, Roughness, Regularity</p>
          <p><strong>Parameters:</strong> Radius (2), Bins (16), Threshold (4), Kmax (2), Delta (1)</p>
        </div>

        <div class="feature-card">
          <h4>Canny Feature</h4>
          <p><strong>Purpose:</strong> Edge detection using Canny algorithm</p>
        </div>

        <div class="feature-card">
          <h4>Sobel Feature</h4>
          <p><strong>Purpose:</strong> Gradient detection using Sobel operator</p>
          <p><strong>Parameters:</strong> Radius (2), Direction (Horizontal/Vertical)</p>
        </div>

        <div class="feature-card">
          <h4>LoG Feature</h4>
          <p><strong>Purpose:</strong> Laplacian of Gaussian edge detection</p>
          <p><strong>Parameters:</strong> Sigma (2.0)</p>
        </div>

        <div class="feature-card">
          <h4>Gabor Feature</h4>
          <p><strong>Purpose:</strong> Gabor filtering for texture analysis</p>
          <p><strong>Parameters:</strong> Wavelength (2), Orientation (0-359°)</p>
        </div>
      </div>

      <h3>Feature Selection Module</h3>
      <p>The Feature Selection module identifies the most relevant features using three statistical methods:</p>

      <div class="feature-grid">
        <div class="feature-card">
          <h4>MRMR</h4>
          <p><strong>Minimum Redundancy Maximum Relevance</strong></p>
          <p>Uses mutual information to select non-redundant, highly relevant features</p>
        </div>

        <div class="feature-card">
          <h4>RankSum</h4>
          <p><strong>Wilcoxon Rank-Sum Test</strong></p>
          <p>Non-parametric test for feature significance</p>
        </div>

        <div class="feature-card">
          <h4>T-Test</h4>
          <p><strong>Parametric T-Test</strong></p>
          <p>Statistical significance test for normally distributed data</p>
        </div>
      </div>
    `
  },
  "radview-cloud-troubleshooting": {
    title: "Troubleshooting",
    content: `
      <h3>Common Issues</h3>
      
      <h4>Login Problems</h4>
      <ul>
        <li><strong>Invalid Credentials</strong>: Verify email and password with administrator</li>
        <li><strong>Account Locked</strong>: Contact support to unlock account</li>
        <li><strong>License Expired</strong>: Contact support for license renewal</li>
      </ul>

      <h4>Processing Issues</h4>
      <ul>
        <li><strong>Experiments Stuck</strong>: Check system status and restart if necessary</li>
        <li><strong>Memory Errors</strong>: Reduce dataset size or contact support</li>
        <li><strong>Timeout Errors</strong>: Check network connection and try again</li>
      </ul>

      <h4>Data Issues</h4>
      <ul>
        <li><strong>Upload Failures</strong>: Check file format and size limits</li>
        <li><strong>Corrupted Files</strong>: Re-upload files and verify integrity</li>
        <li><strong>Missing Data</strong>: Check trash bin for accidentally deleted items</li>
      </ul>

      <h3>Performance Optimization</h3>
      <ul>
        <li><strong>Browser Cache</strong>: Clear cache and cookies regularly</li>
        <li><strong>Network Speed</strong>: Use stable, high-speed internet connection</li>
        <li><strong>Concurrent Users</strong>: Avoid peak usage times for large operations</li>
      </ul>
    `
  },
  "radview-cloud-reference": {
    title: "Reference",
    content: `
      <h3>Browser Requirements</h3>
      <h4>Supported Browsers</h4>
      <ul>
        <li><strong>Chrome</strong>: Version 90+ (recommended)</li>
        <li><strong>Firefox</strong>: Version 88+</li>
        <li><strong>Safari</strong>: Version 14+</li>
        <li><strong>Edge</strong>: Version 90+</li>
      </ul>

      <h4>Browser Settings</h4>
      <ul>
        <li><strong>JavaScript</strong>: Must be enabled</li>
        <li><strong>Cookies</strong>: Required for session management</li>
      </ul>

      <h3>File Formats</h3>
      <h4>Supported Input Formats</h4>
      <ul>
        <li><strong>DICOM</strong>: .dcm, .dicom</li>
        <li><strong>MHA</strong>: .mha, .mhd</li>
        <li><strong>NIfTI</strong>: .nii, .nii.gz</li>
        <li><strong>TIFF</strong>: .tiff, .tif</li>
      </ul>

      <h4>Supported Output Formats</h4>
      <ul>
        <li><strong>CSV</strong>: Feature data and statistics</li>
        <li><strong>MHA</strong>: Image volumes</li>
        <li><strong>NIfTI</strong>: Image volumes</li>
        <li><strong>PDF</strong>: Reports and documentation</li>
        <li><strong>JSON</strong>: Sessions and configurations</li>
      </ul>

      <h3>Security</h3>
      <h4>Data Protection</h4>
      <ul>
        <li><strong>Encryption</strong>: AES-256 encryption</li>
        <li><strong>Transmission</strong>: TLS 1.3 for data in transit</li>
        <li><strong>Storage</strong>: Encrypted cloud storage</li>
        <li><strong>Access</strong>: Role-based access control</li>
      </ul>

      <h3>Version Information</h3>
      <div class="info-box">
        <p><strong>Version:</strong> 3.4 Cloud<br />
        <strong>Date:</strong> July 2025<br />
        <strong>Platform:</strong> Web-Based Medical Imaging Analysis</p>
      </div>
    `
  },

  // HRS Desktop Content
  "hrs-desktop-overview": {
    title: "HRS Desktop - Overview",
    content: `
      <div class="info-box">
        <p><strong>Version:</strong> 2.0 Complete Edition<br />
        <strong>Date:</strong> October 2025<br />
        <strong>Application:</strong> HRS Desktop<br />
        <strong>Purpose:</strong> Advanced Prostate MRI Analysis System for Habitat Risk Scoring</p>
      </div>

      <h3>HRS Technology Overview</h3>
      <p>Habitat Risk Scoring (HRS) is an advanced prostate MRI analysis system that provides comprehensive assessment of tumor spatial heterogeneity and habitat characterization through sophisticated multi-parametric imaging analysis.</p>
      
      <p>HRS represents a revolutionary approach to prostate cancer risk assessment that leverages multi-parametric MRI to identify and characterize distinct tumor habitats within prostate tissue. The system integrates four complementary analysis components to provide unprecedented insights into tumor heterogeneity, aggressiveness, and risk stratification.</p>

      <div class="feature-grid">
        <div class="feature-card">
          <h4>Dynamic Contrast Enhancement (DCE) Analysis</h4>
          <p>DCE analysis examines temporal dynamics of tissue perfusion patterns using Non-negative Matrix Factorization (NMF). The methodology decomposes DCE time series into spatial and temporal components, enabling identification of distinct perfusion habitats that reflect tumor vascular characteristics, including well-perfused, poorly-perfused, and intermediate regions that indicate spatial heterogeneity.</p>
        </div>
        <div class="feature-card">
          <h4>Apparent Diffusion Coefficient (ADC) Analysis</h4>
          <p>ADC analysis quantifies tissue diffusion characteristics with zone-specific thresholds optimized for Peripheral Zone (PZ) and Transition Zone (TZ). This approach identifies regions of restricted diffusion that are highly suspicious for malignancy, revealing cellular density patterns and microstructural properties that define distinct tumor habitats within prostate tissue.</p>
        </div>
        <div class="feature-card">
          <h4>T2-Weighted Imaging Analysis</h4>
          <p>T2 analysis provides high-resolution anatomical characterization and tissue composition assessment. This approach evaluates signal intensity patterns and spatial distribution to identify suspicious regions and provide anatomical context for functional findings, supporting accurate zone delineation and habitat localization.</p>
        </div>
        <div class="feature-card">
          <h4>Alpha Weighting Integration</h4>
          <p>Alpha weighting provides a mathematical framework for combining DCE, ADC, and T2 analyses into a unified habitat-based risk score. This integration accounts for the relative importance of different imaging features and enables zone-specific customization to optimize diagnostic performance for both peripheral and transition zones.</p>
        </div>
      </div>

      <h3>Scientific Foundations</h3>
      <p>The scientific foundations of HRS are built upon extensive research in tumor biology, spatial heterogeneity analysis, multi-parametric MRI, and clinical validation studies. The methodology has been validated through peer-reviewed publications and demonstrates superior performance in characterizing tumor habitats and predicting prostate cancer aggressiveness.</p>

      <div class="highlight">
        <h4>Research Validation</h4>
        <p>HRS methodology has been extensively validated through controlled clinical studies, including landmark research published in Frontiers in Oncology and Scientific Reports. These studies demonstrate:</p>
        <ul>
          <li>Strong correlations between HRS scores and clinical outcomes (r=0.423-0.771)</li>
          <li>Superior diagnostic performance with AUC values of 0.852-0.952</li>
          <li>Validated zone-specific thresholds optimized across multiple patient cohorts</li>
          <li>Demonstrated clinical utility in prostate cancer detection and characterization</li>
          <li>Improved prediction of tumor aggressiveness through spatial heterogeneity assessment</li>
        </ul>
      </div>

      <h3>System Requirements</h3>
      <h4>Minimum Requirements</h4>
      <ul>
        <li><strong>Operating System:</strong> Windows 10 (64-bit)</li>
        <li><strong>Memory:</strong> 8GB RAM</li>
        <li><strong>Storage:</strong> 5GB free space</li>
        <li><strong>Java:</strong> JDK 8 or higher</li>
        <li><strong>Graphics:</strong> DirectX 11 compatible graphics card</li>
      </ul>

      <h4>Recommended Requirements</h4>
      <ul>
        <li><strong>Operating System:</strong> Windows 11 (64-bit)</li>
        <li><strong>Memory:</strong> 16GB RAM or more</li>
        <li><strong>Storage:</strong> 20GB free space</li>
        <li><strong>Java:</strong> JDK 11 or higher</li>
        <li><strong>Graphics:</strong> Dedicated graphics card with 4GB VRAM</li>
        <li><strong>3D Slicer:</strong> Version 4.10 or higher for visualization</li>
      </ul>
    `
  },

  "hrs-desktop-installation": {
    title: "HRS Desktop - Installation & Setup",
    content: `
      <h3>Pre-Installation Requirements</h3>
      <p>Before beginning the installation, ensure that you have administrative privileges on your computer. If JDK has not been installed previously, you must install it during this installation process to ensure that HRS functions correctly.</p>

      <h3>Installation Steps</h3>
      
      <div class="step-container">
        <h4>Step 1: Start the Installer</h4>
        <ul>
          <li>Locate the HRSPipeline installer file on your computer</li>
          <li>Double-click the installer file to begin the installation process</li>
        </ul>
      </div>

      <div class="step-container">
        <h4>Step 2: Welcome Page</h4>
        <ul>
          <li>A welcome page will appear</li>
          <li>Click the Next button to proceed</li>
        </ul>
      </div>

      <div class="step-container">
        <h4>Step 3: License Agreement</h4>
        <ul>
          <li>Read the license agreement that appears</li>
          <li>Click on I Agree to accept the terms and continue</li>
        </ul>
      </div>

      <div class="step-container">
        <h4>Step 4: Choose Install Location</h4>
        <ul>
          <li>A page will appear allowing you to choose the installation location</li>
          <li>You can change the location by clicking the Browse button</li>
          <li>After selecting the desired installation location, click Next to proceed</li>
        </ul>
      </div>

      <div class="step-container">
        <h4>Step 5: Select Components</h4>
        <p>You can choose which components to install. The following components are available:</p>
        <ul>
          <li><strong>HRSPipeline (mandatory):</strong> This component is checked by default and must be installed</li>
          <li><strong>JDK:</strong> Installs the Java Development Kit</li>
          <li><strong>3D Slicer:</strong> Installs 3D Slicer, needed to visualize the HRS output</li>
          <li><strong>Sample Data:</strong> Add a sample data folder with 2 sample studies to your desktop</li>
        </ul>
        <p>The components from 2 to 4 are optional. However, if you haven't installed components 2 before, you should install it to ensure the application runs normally.</p>
        <p>After making your selections, click Install to proceed.</p>
      </div>

      <div class="step-container">
        <h4>Step 6: Installation Process</h4>
        <ul>
          <li>An installation page will appear</li>
          <li>Wait until the installation completes. This process may take some time</li>
        </ul>
      </div>

      <div class="step-container">
        <h4>Step 7: Completion</h4>
        <ul>
          <li>Once the installation is completed, a completion page will appear</li>
          <li>Click Finish to close the installer</li>
        </ul>
      </div>

      <h3>Post-Installation</h3>
      <p>Upon completing the installation, the following shortcuts will appear on your desktop:</p>
      <ul>
        <li><strong>HRSPipeline:</strong> Shortcut to start the HRSPipeline application</li>
        <li><strong>Slicer Shortcut:</strong> Shortcut for 3D Slicer (if installed)</li>
        <li><strong>HRSPipeline Sample Data:</strong> Shortcut to the sample data folder (if the Sample Data component was installed)</li>
      </ul>

      <h3>Starting the Application</h3>
      <p>To start HRSPipeline:</p>
      <ol>
        <li>Double-click the HRSPipeline shortcut on your desktop</li>
        <li>The application will take a few moments to start</li>
      </ol>
    `
  },

  "hrs-desktop-getting-started": {
    title: "HRS Desktop - Getting Started",
    content: `
      <h3>Application Interface</h3>
      <p>The HRSPipeline 2.0 interface provides an intuitive workflow for Habitat Risk Scoring analysis. The main interface displays multiple sections including DCE, ADC, T2, and Other parameters. Use the <strong>Data Folder</strong> button to select the directory containing the case files you wish to process and the <strong>Output Folder</strong> button to specify where the results will be saved.</p>

      <h3>Data Requirements and Organization</h3>
      <p>Before processing, it's crucial to ensure that all case files and directories are properly organized. Follow these guidelines to maintain a structured approach:</p>

      <div class="highlight">
        <h4>Case Submission Format</h4>
        <ul>
          <li>Each case must be submitted in a ZIP file named after the patient's ID (e.g., 12345678.zip)</li>
        </ul>

        <h4>ZIP File Structure</h4>
        <ul>
          <li>Upon extracting the ZIP file, you'll find a structured organization within</li>
          <li>The extracted folder will contain the patient's main folder</li>
        </ul>

        <h4>Main Folder Structure</h4>
        <ul>
          <li>Inside the main folder, you'll find a studies folder</li>
          <li>Each study folder within the studies folder is designated for a specific series</li>
        </ul>

        <h4>Study Folder Contents</h4>
        <ul>
          <li>These study folders will hold the necessary series required for processing</li>
          <li>The essential series that must be present in these folders include:
            <ul>
              <li>ADC (Apparent Diffusion Coefficient)</li>
              <li>DCE (Dynamic Contrast Enhanced)</li>
              <li>T2 weighted image (T2WI)</li>
              <li>RT folder contains the RT struct file</li>
            </ul>
          </li>
        </ul>
      </div>

      <h3>Basic Workflow</h3>
      <p>The basic HRS workflow consists of six main steps:</p>
      <ol>
        <li><strong>Launch HRSPipeline 2.0</strong> - Start the application and configure data/output folders</li>
        <li><strong>Select Cases for Processing</strong> - Choose the cases you want to analyze</li>
        <li><strong>Configure HRS Parameters</strong> - Set up analysis parameters for DCE, ADC, and T2</li>
        <li><strong>Processing</strong> - Execute the habitat risk scoring analysis</li>
        <li><strong>Export Reports</strong> - Generate comprehensive analysis reports</li>
        <li><strong>Visualization</strong> - Use 3D Slicer for advanced visualization of results</li>
      </ol>

      <h3>Sample Data Usage</h3>
      <p>If chosen during installation, a 'sample data' folder containing 2 example cases is included for testing and demonstration purposes. Use this sample data to:</p>
      <ul>
        <li>Familiarize yourself with the application interface</li>
        <li>Test parameter configurations</li>
        <li>Validate system functionality</li>
        <li>Practice the complete workflow before processing your own data</li>
      </ul>
    `
  },

  "hrs-desktop-workflow": {
    title: "HRS Desktop - Workflow",
    content: `
      <h3>HRS Workflow Overview</h3>
      <p>This section provides an overview of the workflow involved in conducting Habitat Risk Scoring (HRS) using HRSPipeline 2.0. It outlines the key steps from launching the application to visualizing the results, including optional customization steps.</p>

      <div class="step-container">
        <h4>Step 1: Launching HRSPipeline 2.0</h4>
        <ol>
          <li>Double-click the 'HRSPipeline 2.0' icon on your desktop to start the application</li>
          <li>Upon launch, the application's main interface will appear, displaying multiple sections such as DCE, ADC, T2, and Other. Use the <strong>Data Folder</strong> button to select the directory containing the case files you wish to process and the <strong>Output Folder</strong> button to specify where the results will be saved</li>
        </ol>
      </div>

      <div class="step-container">
        <h4>Step 2: Selecting Cases for Processing</h4>
        <h5>Select Cases:</h5>
        <ol>
          <li>Click on Data Folder button</li>
          <li>Navigate through your folders in the directory dialog</li>
          <li>Select the directory containing your cases</li>
          <li>Select the cases you want to process from the displayed list in the pipeline tab</li>
        </ol>
        
        <h5>Sample Data:</h5>
        <ul>
          <li>If chosen while installation, a 'sample data' folder containing 2 example cases is included for testing and demonstration purposes</li>
        </ul>
      </div>

      <div class="step-container">
        <h4>Step 3: Configuring HRS Parameters</h4>
        <ol>
          <li>After selecting your cases, set the desired parameters for processing your cases</li>
          <li>Click 'Run' to start the process. These parameters will be saved and automatically applied for future sessions</li>
        </ol>
        <p>For additional information regarding parameters and their configuration, please refer to the Parameter Configuration section.</p>
      </div>

      <div class="step-container">
        <h4>Step 4: Processing</h4>
        <ol>
          <li>The application will initiate processing of the selected cases</li>
          <li>During processing, progress updates and log statements will appear in the application's text area to indicate the status. Additionally, a progress bar for each selected case will show its individual processing status, and an overall progress bar will update to reflect the cumulative progress for all cases</li>
          <li>Upon completion, an 'Output' folder will be generated in each case directory, containing all the processed data. The contents of the Output folder may vary based on the HRS parameters selected at the start</li>
        </ol>

        <h5>Output Folder Contents:</h5>
        <ul>
          <li><strong>HRS_Graphs:</strong> Contains all exported graphs for DCE series</li>
          <li><strong>HRS_Label_Images:</strong> Contains all label images for output masks. The label images contain the risk score from 1 to 10 and from 6 to 10</li>
          <li><strong>HRS_Masks:</strong> A folder that contains output ADC masks, DCE, T2, and HRS masks</li>
          <li><strong>HRS_Settings:</strong> Contains the used HRS parameters JSON file used in processing and color table file that could be used in 3D-Slicer to visualize the output</li>
          <li><strong>Lesion:</strong> Holds all lesion masks if available from the input RT file and its label volume image</li>
          <li><strong>MRI_Reformatted:</strong> Contains input volume images such as ADC, the highest contrast DCE, and T2, along with Prostate, PZ, and GM/Muscle masks</li>
          <li><strong>RT_Masks:</strong> Contains all other RT file extracted masks</li>
        </ul>
      </div>

      <div class="step-container">
        <h4>Step 5: Export Reports</h4>
        <p>After preprocessing is complete, move to the <strong>Reports</strong> tab to generate the desired reports for the processed cases. Follow these steps:</p>

        <h5>Select Cases:</h5>
        <ul>
          <li>From the provided list, select the specific cases you want to generate reports for</li>
          <li>Only the selected cases will be included in the report generation process</li>
        </ul>

        <h5>Select the Reports to Generate:</h5>
        <ul>
          <li>Begin by selecting the types of reports you want to generate by checking the corresponding boxes</li>
          <li>The options include:
            <ul>
              <li>Generate DCE Graphs</li>
              <li>Generate Metrics Reports</li>
              <li>Generate Patient Stats</li>
              <li>Generate Grid Report</li>
              <li>Generate Output-vs-Baseline Reports</li>
              <li>Generate Output-vs-Lesions Reports</li>
              <li>Generate Baseline-vs-Lesions Reports</li>
              <li>Generate HRS2 Reports</li>
            </ul>
          </li>
        </ul>

        <h5>Verify the Output Folder:</h5>
        <ul>
          <li>Ensure that the <strong>Output Folder</strong> path is correctly set</li>
          <li>This is the location where the generated reports will be saved</li>
        </ul>

        <h5>Generate Reports:</h5>
        <ul>
          <li>After selecting the cases and verifying the output folder, click the <strong>Generate Reports</strong> button</li>
          <li>The reports for the selected cases will be created and saved in the output folder</li>
        </ul>
      </div>

      <div class="step-container">
        <h4>Step 6: Visualization</h4>
        <p>This guide outlines how to utilize 3D-Slicer, a versatile imaging software, for the effective visualization of medical imaging data from various cases. Users will proceed to load the main volume images along with any associated mask or label volumes using the Data module in 3D-Slicer. Once loaded, the Jet color map can be applied to the label volumes, enabling clear and detailed visualization of the scanned areas, which is crucial for analysis and diagnosis.</p>

        <p>For efficient visualization of HRS data using the Jet color map in 3D Slicer, users can follow one of the following three cases:</p>

        <ol>
          <li><strong>If 3D Slicer was installed concurrently with HRSPipeline 2.0 during installation:</strong>
            <ul>
              <li>Navigate to the 3D Visualization section for detailed steps</li>
            </ul>
          </li>
          <li><strong>If 3D Slicer was already installed and user did not choose to install it while installing HRSPipeline 2.0:</strong>
            <ul>
              <li>Navigate to the 3D Visualization section for detailed steps</li>
            </ul>
          </li>
          <li><strong>If users intend to create a custom color map within 3D Slicer:</strong>
            <ul>
              <li>Navigate to the 3D Visualization section for detailed steps</li>
            </ul>
          </li>
        </ol>
      </div>
    `
  },

  "hrs-desktop-parameters": {
    title: "HRS Desktop - Parameter Configuration",
    content: `
      <h3>Complete Parameter Configuration</h3>
      <p>Habitat Risk Scoring analysis is controlled by numerous parameters that optimize performance for different data types, patient populations, and clinical applications. This section provides complete documentation of ALL HRS parameters with their scientific basis, default values, and optimization strategies.</p>

      <h3>DCE Parameters - Complete Reference</h3>
      <p>Dynamic Contrast Enhancement parameters control temporal dynamics analysis and perfusion habitat identification. These parameters are based on extensive research validation with default values optimized for prostate MRI analysis.</p>

      <div class="highlight">
        <table style="width: 100%; border-collapse: collapse; margin: 10px 0;">
          <thead>
            <tr style="background-color: #3b82f6; color: white;">
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Parameter</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Default</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">Use DCE</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Enabled</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Activates the inclusion of DCE time points in the HRS algorithm</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">Number of Curves</td>
              <td style="border: 1px solid #ddd; padding: 8px;">3</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Number of components or basis functions used in NMF to decompose the dataset, representing distinct temporal dynamic patterns in DCE-MRI data</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">Contribution %</td>
              <td style="border: 1px solid #ddd; padding: 8px;">60</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Minimum ratio of a component's value to the total sum in NMF matrix required for significant group classification</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">Wwp % in TZ</td>
              <td style="border: 1px solid #ddd; padding: 8px;">90</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Threshold percentage of well-perfused areas within the transition zone (TZ) required to influence analysis decisions</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">W Percentile</td>
              <td style="border: 1px solid #ddd; padding: 8px;">95</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Percentile value used to determine the cutoff point for well-perfused regions in the analysis</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">W Calculation</td>
              <td style="border: 1px solid #ddd; padding: 8px;">ROI</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Calculate percentile based on the entire dataset (Whole) or well-perfused regions within the ROI (ROI)</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">Baseline Shift</td>
              <td style="border: 1px solid #ddd; padding: 8px;">2</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Number of initial data points used to calculate a baseline shift</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">Curves Ignore Last</td>
              <td style="border: 1px solid #ddd; padding: 8px;">0</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Number of points removed from the tail of the data curve during analysis</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">WashOut Upper</td>
              <td style="border: 1px solid #ddd; padding: 8px;">4.0</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Upper threshold for the DCE score calculation</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">WashOut Lower</td>
              <td style="border: 1px solid #ddd; padding: 8px;">0.5</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Lower limit for the DCE score calculation</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>ADC Parameters - Zone-Specific Configuration</h3>
      <p>ADC parameters control zone-specific diffusion analysis and habitat identification with thresholds optimized for peripheral zone (PZ) and transition zone (TZ) characteristics. These thresholds identify distinct diffusion habitats that reflect tumor cellular density and microstructure.</p>

      <div class="highlight">
        <table style="width: 100%; border-collapse: collapse; margin: 10px 0;">
          <thead>
            <tr style="background-color: #3b82f6; color: white;">
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Parameter</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Default</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Zone</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">Use ADC</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Enabled</td>
              <td style="border: 1px solid #ddd; padding: 8px;">All</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Activates the inclusion of ADC in the HRS algorithm</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">ADC High PZ</td>
              <td style="border: 1px solid #ddd; padding: 8px;">850</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Peripheral Zone</td>
              <td style="border: 1px solid #ddd; padding: 8px;">High threshold for ADC values in the peripheral zone, used as a cut-off to distinguish between higher and intermediate diffusion levels</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">ADC Medium PZ</td>
              <td style="border: 1px solid #ddd; padding: 8px;">1050</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Peripheral Zone</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Medium ADC threshold for the peripheral zone, marking the boundary between moderate and low diffusion levels</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">ADC Low PZ</td>
              <td style="border: 1px solid #ddd; padding: 8px;">1200</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Peripheral Zone</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Low ADC threshold for the peripheral zone, identifying the lower limit of diffusion</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">ADC High TZ</td>
              <td style="border: 1px solid #ddd; padding: 8px;">600</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Transition Zone</td>
              <td style="border: 1px solid #ddd; padding: 8px;">High threshold for ADC values in the transition zone, used to differentiate higher diffusion levels from intermediate ones</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">ADC Medium TZ</td>
              <td style="border: 1px solid #ddd; padding: 8px;">750</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Transition Zone</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Medium ADC threshold for the transition zone, serving as a demarcation between moderate and low diffusion levels</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">ADC Low TZ</td>
              <td style="border: 1px solid #ddd; padding: 8px;">850</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Transition Zone</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Low ADC threshold for the transition zone, setting the lower boundary for diffusion</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">Noise ADC</td>
              <td style="border: 1px solid #ddd; padding: 8px;">400</td>
              <td style="border: 1px solid #ddd; padding: 8px;">All</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Noise threshold for ADC values, below which measurements are considered as noise</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">Ceiling ADC</td>
              <td style="border: 1px solid #ddd; padding: 8px;">1600</td>
              <td style="border: 1px solid #ddd; padding: 8px;">All</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Maximum reliable ADC value, beyond which data may not accurately reflect tissue properties</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>T2 Parameters - Relaxometry Settings</h3>
      <p>T2 parameters control T2-weighted imaging analysis with zone-specific thresholds for anatomical characterization and tissue composition assessment.</p>

      <div class="highlight">
        <table style="width: 100%; border-collapse: collapse; margin: 10px 0;">
          <thead>
            <tr style="background-color: #3b82f6; color: white;">
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Parameter</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Default</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Zone</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">Use T2</td>
              <td style="border: 1px solid #ddd; padding: 8px;"><strong>Disabled</strong></td>
              <td style="border: 1px solid #ddd; padding: 8px;">All</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Activates the inclusion of T2 in the HRS algorithm</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">T2 High PZ</td>
              <td style="border: 1px solid #ddd; padding: 8px;">850</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Peripheral Zone</td>
              <td style="border: 1px solid #ddd; padding: 8px;">High threshold for T2 values in the peripheral zone, used to differentiate between high and intermediate diffusion levels</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">T2 Medium PZ</td>
              <td style="border: 1px solid #ddd; padding: 8px;">1050</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Peripheral Zone</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Medium threshold for T2 values in the peripheral zone, marking the transition between moderate and lower diffusion levels</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">T2 Low PZ</td>
              <td style="border: 1px solid #ddd; padding: 8px;">1200</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Peripheral Zone</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Low threshold for T2 values in the peripheral zone, identifying regions with significantly reduced diffusion levels</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">T2 High TZ</td>
              <td style="border: 1px solid #ddd; padding: 8px;">600</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Transition Zone</td>
              <td style="border: 1px solid #ddd; padding: 8px;">High threshold for T2 values in the transition zone, distinguishing higher diffusion from intermediate diffusion levels</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">T2 Medium TZ</td>
              <td style="border: 1px solid #ddd; padding: 8px;">750</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Transition Zone</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Medium threshold for T2 values in the transition zone, used to identify areas with moderate diffusion levels</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">T2 Low TZ</td>
              <td style="border: 1px solid #ddd; padding: 8px;">850</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Transition Zone</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Low threshold for T2 values in the transition zone, detects regions with low diffusion levels</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">Noise T2</td>
              <td style="border: 1px solid #ddd; padding: 8px;">400</td>
              <td style="border: 1px solid #ddd; padding: 8px;">All</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Lower limit for T2 values considered reliable, values below this threshold are deemed noise</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">Ceiling T2</td>
              <td style="border: 1px solid #ddd; padding: 8px;">1600</td>
              <td style="border: 1px solid #ddd; padding: 8px;">All</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Upper limit for T2 values considered in the analysis</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>Alpha Weighting Parameters</h3>
      <p>Alpha weighting parameters control multi-modal integration to generate habitat-based risk scores. Zone-specific weights optimize the contribution of each imaging modality and must sum to 1.0 within each zone.</p>

      <div class="highlight">
        <table style="width: 100%; border-collapse: collapse; margin: 10px 0;">
          <thead>
            <tr style="background-color: #3b82f6; color: white;">
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Parameter</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Default</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Zone</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">Alpha DCE PZ</td>
              <td style="border: 1px solid #ddd; padding: 8px;">0.50</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Peripheral Zone</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Weighting factor for DCE in peripheral zone, setting the contribution of PZ-specific DCE metrics in the overall assessment</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">Alpha ADC PZ</td>
              <td style="border: 1px solid #ddd; padding: 8px;">0.25</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Peripheral Zone</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Weighting factor for ADC in peripheral zone, setting the contribution of PZ-specific ADC metrics in the overall assessment</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">Alpha T2 PZ</td>
              <td style="border: 1px solid #ddd; padding: 8px;">0.25</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Peripheral Zone</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Weighting factor for T2 in peripheral zone, setting the contribution of PZ-specific T2 metrics in the overall assessment</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">Alpha DCE TZ</td>
              <td style="border: 1px solid #ddd; padding: 8px;">0.20</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Transition Zone</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Weighting factor for DCE in transition zone, setting the contribution of TZ-specific DCE metrics in the overall assessment</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">Alpha ADC TZ</td>
              <td style="border: 1px solid #ddd; padding: 8px;">0.40</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Transition Zone</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Weighting factor for ADC in transition zone, setting the contribution of TZ-specific ADC metrics in the overall assessment</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">Alpha T2 TZ</td>
              <td style="border: 1px solid #ddd; padding: 8px;">0.40</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Transition Zone</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Weighting factor for T2 in transition zone, setting the contribution of TZ-specific T2 metrics in the overall assessment</td>
            </tr>
          </tbody>
        </table>
        <p><strong>Note:</strong> Weights must sum to 1.0 within each zone (PZ weights: 0.50 + 0.25 + 0.25 = 1.0; TZ weights: 0.20 + 0.40 + 0.40 = 1.0)</p>
      </div>

      <h3>Processing Control Parameters</h3>
      <p>Processing control parameters manage data handling, quality control, and output generation.</p>

      <div class="highlight">
        <table style="width: 100%; border-collapse: collapse; margin: 10px 0;">
          <thead>
            <tr style="background-color: #3b82f6; color: white;">
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Parameter</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Default</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Range</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">Volume Clean</td>
              <td style="border: 1px solid #ddd; padding: 8px;">0.01 ml</td>
              <td style="border: 1px solid #ddd; padding: 8px;">0.001-1.0 ml</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Minimum volume threshold for connected components</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">Use Registration</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Enabled</td>
              <td style="border: 1px solid #ddd; padding: 8px;">On/Off</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Apply registration on selected protocols</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">Check Registration Need</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Enabled</td>
              <td style="border: 1px solid #ddd; padding: 8px;">On/Off</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Check if registration is needed before applying</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">Register DCE to Previous</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Disabled</td>
              <td style="border: 1px solid #ddd; padding: 8px;">On/Off</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Register DCE to previous timepoint</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">PZ Grid Display</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Enabled</td>
              <td style="border: 1px solid #ddd; padding: 8px;">On/Off</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Add PZ contour to grid images</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">Lesion Grid Display</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Enabled</td>
              <td style="border: 1px solid #ddd; padding: 8px;">On/Off</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Add lesion masks to grid images</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">Quadrant Lines</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Enabled</td>
              <td style="border: 1px solid #ddd; padding: 8px;">On/Off</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Add quadrant lines to grid images</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">HRS Output 1-10</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Enabled</td>
              <td style="border: 1px solid #ddd; padding: 8px;">On/Off</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Generate full risk score range</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">HRS Output 6-10</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Enabled</td>
              <td style="border: 1px solid #ddd; padding: 8px;">On/Off</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Generate high-risk focused output</td>
            </tr>
          </tbody>
        </table>
      </div>
    `
  },

  "hrs-desktop-processing-pipeline": {
    title: "HRS Desktop - Processing Pipeline",
    content: `
      <h3>HRS Processing Pipeline Overview</h3>
      <p>This section provides detailed documentation of the Habitat Risk Scoring processing pipeline, covering each step of the analysis workflow from parameter configuration through final output generation.</p>

      <div class="step-container">
        <h4>Step 0: Setting HRS Parameters</h4>
        <p>Before processing begins, users will configure specific parameters for the HRS process using the main HRS interface. The interface allows users to adjust settings for DCE, ADC, T2, and other options, including grid and registration preferences. These parameters ensure the application tailors the processing according to the needs of each case. Once configured, users can proceed by selecting the <strong>Run</strong> button.</p>
      </div>

      <div class="step-container">
        <h4>Step 1: Unzipping and Cleaning Up Cases</h4>
        <p>This step involves preparing the case files for processing by performing the following sub-steps:</p>

        <h5>Extraction:</h5>
        <ul>
          <li>Each case usually comes in a compressed zip file format. The application will extract these files to access the data contained within.</li>
        </ul>

        <h5>Cleanup:</h5>
        <ul>
          <li>After extraction, the application identifies and removes any unnecessary directories or files that are not needed for the analysis. This cleanup process helps in focusing on the relevant data, enhancing the efficiency of subsequent steps.</li>
        </ul>

        <h5>Selection and Simplification:</h5>
        <ul>
          <li>From the remaining files, only the essential series for analysis are kept: ADC (Apparent Diffusion Coefficient), DCE (Dynamic Contrast Enhanced), T2, and RT files.</li>
          <li>The names of these folders are often lengthy and complex, making them difficult to work with. The application simplifies these names to more manageable forms, ensuring clarity and ease of access.</li>
        </ul>

        <h5>Organization of DCE Files:</h5>
        <ul>
          <li>DCE files, in particular, are sorted into separate time points. This organization is crucial for the dynamic analysis of contrast enhancement over time, which is a key component of many studies involving HRS data.</li>
        </ul>
      </div>

      <div class="step-container">
        <h4>Step 2: Alignment and Registration</h4>
        <p>This step consists of a series of operations aimed at aligning and enhancing the images for accurate HRS analysis.</p>

        <h5>2.1 Alignment</h5>
        <p>The alignment process involves several key operations:</p>

        <h6>Initialization:</h6>
        <p>The algorithm begins by extracting spatial information from both the input and template images, including image size, image position patient, and pixel spacing.</p>

        <h6>Alignment over Z Dimension:</h6>
        <p>It finds the corresponding range of slices in the input image that aligns with the template's Z dimension. This step includes identifying the start and end indices for alignment and adjusting for any slices that fall outside the template's range.</p>

        <h6>Alignment over X, and Y Dimensions:</h6>
        <p>After aligning the Z dimension, the algorithm calculates scale factors for the X and Y dimensions based on the pixel spacing of the input and template images. It computes the physical translation needed to align the centers of the input and template images and applies these adjustments, translating and rescaling each slice of the input image to fit the template perfectly.</p>

        <h5>2.2 Artifact Reduction</h5>
        <ul>
          <li>For each DCE time point slice, it calculates the mean with the corresponding slices from a specified number of previous time points (e.g., the previous 2 time points).</li>
          <li><strong>Dynamic Averaging:</strong> Utilizes a user-specified number of previous time points for averaging, enhancing flexibility and adaptability to different datasets.</li>
          <li>The operation dynamically adapts to the available number of previous images.</li>
        </ul>

        <h5>2.3 Registration</h5>
        <p><strong>Triage Step:</strong></p>
        <ul>
          <li><strong>Similarity Calculation:</strong> The algorithm computes similarity scores between the moving and fixed image slices using the <strong>Jaccard Index</strong>, a statistic used for gauging the similarity and diversity of sample sets. This is done for both the direct and inverse binary representations of the images.</li>
          <li><strong>Decision Making:</strong> After calculating similarity scores for all slices within the specified range, the algorithm determines the need for registration by comparing the maximum similarity scores against predefined thresholds. If the maximum scores (both direct and inverse) fall below the threshold, it concludes that registration is necessary to align the moving image with the fixed image more accurately.</li>
        </ul>
      </div>

      <div class="step-container">
        <h4>Step 3: Core Analysis Algorithm</h4>
        <p>The core analysis of the Habitat Risk Scoring (HRS) is a multi-stage process that starts with the preparation and loading of the case-specific data required for detailed assessment, Process ADC, DCE, T2, and HRS.</p>

        <h5>3.1 Reading and Loading Case Files</h5>
        <p>This initial step involves the following tasks to ensure that all necessary data is ready for the subsequent analysis stages:</p>

        <h6>Case File Loading:</h6>
        <p>For each case, the algorithm proceeds to load the required files. It identifies and reports the beginning of the loading process for a given case, with output statements indicating the progress.</p>

        <h6>Image and Contour Initialization:</h6>
        <p>The algorithm initializes objects for each image series (ADC, DCE, T2) and contours (Prostate, PZ, Muscle/GM) by reading the corresponding files from the case directory.</p>

        <h6>File Loading Completion:</h6>
        <p>Upon successful loading of all files, the algorithm reports completion before proceeding to run the actual analysis session for the loaded data.</p>

        <h5>3.2 ADC Analysis</h5>
        <p>This sub-step performs the analysis and processing of the ADC images, which involves the following tasks:</p>

        <h6>Error Checking:</h6>
        <p>The images are first subjected to error checks to validate their suitability for analysis.</p>

        <h6>Contour Creation and Analysis:</h6>
        <p>ADC contours are created by mapping prostate and PZ contours onto the ADC images. The algorithm generates a three-dimensional matrix representation for each contour, aiding in the distinction between prostate zones (PZ and Tz).</p>

        <h6>HRS Scoring:</h6>
        <p>For each voxel within the ADC images, an HRS score is computed based on its ADC value and location within the prostate zones. This score is scaled according to predefined thresholds that differentiate between various regions of interest, such as high, medium, and low ADC areas within the PZ and TZ.</p>

        <div class="highlight">
          <h6>Zone-Specific ADC Thresholds:</h6>
          <ul>
            <li><strong>High ADC Values:</strong>
              <ul>
                <li>Peripheral Zone (PZ): below 850 units</li>
                <li>Transition Zone (TZ): below 600 units</li>
              </ul>
            </li>
            <li><strong>Medium ADC Values:</strong>
              <ul>
                <li>PZ: 850 to 1050 units</li>
                <li>TZ: 600 to 750 units</li>
              </ul>
            </li>
            <li><strong>Low ADC Values:</strong>
              <ul>
                <li>PZ: above 1050 up to 1200 units</li>
                <li>TZ: 750 to 850 units</li>
              </ul>
            </li>
          </ul>
        </div>

        <h5>3.3 DCE Analysis</h5>
        <p>This step focuses on the analysis of Dynamic Contrast Enhanced (DCE) MRI images following the initialization and ADC processing:</p>

        <h6>Initialization:</h6>
        <p>The algorithm begins by setting up necessary parameters and structures for analysis, including the number of curves to analyze, threshold percentages for significant perfusion, and points for zero shifting to standardize baseline measurements.</p>

        <h6>Non-negative Matrix Factorization (NMF):</h6>
        <p>The algorithm employs NMF to decompose the DCE MRI data into matrices representing spatial (W) and temporal (S) components. This decomposition aids in identifying patterns of perfusion across the prostate region.</p>

        <h6>Perfusion Analysis:</h6>
        <p>It identifies well-perfused areas within the prostate by analyzing the spatial components (W) derived from NMF, enabling a detailed analysis of how contrast agent flows through the prostate tissue over time.</p>

        <h6>Integration with Anatomical Zones:</h6>
        <p>The algorithm distinguishes between well-perfused areas within the peripheral zone (PZ) and the transition zone (TZ) of the prostate. This differentiation is key to understanding the spatial distribution of perfusion relative to prostate anatomy.</p>

        <h5>3.4 T2 Analysis</h5>
        <p>This sub-step performs the analysis and processing of the T2 images, following the same methodology as ADC analysis but with T2-specific thresholds and characteristics.</p>

        <h5>3.5 HRS Analysis</h5>
        <p>The final phase in the core analysis algorithm incorporates a comprehensive evaluation combining DCE and ADC only or DCE, ADC, and T2 data to generate a holistic HRS score and detailed risk contours.</p>

        <h6>DCE and ADC Integration:</h6>
        <p>When both ADC and DCE analyses are employed, the algorithm initiates a process to approximate ADC values from DCE data. This involves translating DCE perfusion findings into ADC-equivalent contours to provide a unified analysis base.</p>

        <h6>Volumetric Cleaning:</h6>
        <p>The algorithm performs a volumetric cleaning operation on the ADC and DCE contours based on a predefined volume threshold. This step removes small, disconnected areas that are unlikely to contribute meaningful data, thereby refining the analysis focus.</p>

        <h6>Anatomical Zone Integration:</h6>
        <p>It integrates spatial data regarding the prostate's anatomical zones—specifically, the peripheral zone (PZ) and transition zone (TZ)—to tailor the analysis further.</p>

        <h6>HRS Calculation:</h6>
        <p>A final HRS value is calculated for each point, integrating the refined ADC and DCE data. This computation considers the anatomical location of each voxel (PZ or TZ) and applies different weighting (alpha values) to ADC and DCE data accordingly.</p>
      </div>

      <div class="step-container">
        <h4>Step 4: Exporting HRS Output</h4>
        <p>The culmination of the Habitat Risk Scoring (HRS) process involves the preparation and export of all pertinent output files for visualization. This final step ensures that users can effectively interpret the analysis results using visualization tools, such as 3D-Slicer, by providing a complete set of data that highlights the areas of interest within the prostate.</p>

        <ol>
          <li><strong>HRS Masks:</strong> Include all refined HRS contours and masks generated in Step 3. These files represent the core findings of the HRS analysis, delineating areas of varying risk levels within the prostate.</li>
          <li><strong>RT Masks:</strong> Extract and include necessary masks from the RT file that are relevant to the analysis. These may include anatomical landmarks or regions of interest that were identified in the RT like Prostate, PZ, Muscle, and Lesion masks.</li>
          <li><strong>Image Data:</strong> Align and include the aligned input ADC, the highest contrast DCE, and, T2-weighted MRI images.</li>
        </ol>
      </div>

      <div class="step-container">
        <h4>Step 5: Exporting Reports</h4>
        <p>After the processing is complete, the user can select the desired reports from the available options, such as DCE Graphs, Metrics, or HRS2 Reports, and then click the <strong>Generate Reports</strong> button to create the selected reports for the processed cases, which will be saved in the specified output folder.</p>

        <div class="highlight">
          <h5>Report Parameters:</h5>
          <table style="width: 100%; border-collapse: collapse; margin: 10px 0;">
            <thead>
              <tr style="background-color: #3b82f6; color: white;">
                <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Parameter</th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="border: 1px solid #ddd; padding: 8px;">Generate DCE Graphs</td>
                <td style="border: 1px solid #ddd; padding: 8px;">Generates all cases' DCE graphs. When checked, there will be a folder with DCE graphs for all cases.</td>
              </tr>
              <tr>
                <td style="border: 1px solid #ddd; padding: 8px;">Generate Metrics Reports</td>
                <td style="border: 1px solid #ddd; padding: 8px;">Generates all cases' HRS Metrics reports as Excel files.</td>
              </tr>
              <tr>
                <td style="border: 1px solid #ddd; padding: 8px;">Generate Patient Stats</td>
                <td style="border: 1px solid #ddd; padding: 8px;">Generates patient statistics for correlation of HRS2 output or RT baseline to lesions.</td>
              </tr>
              <tr>
                <td style="border: 1px solid #ddd; padding: 8px;">Generate Grid Report</td>
                <td style="border: 1px solid #ddd; padding: 8px;">Generates all cases' HRS Grid and Quadrant Grid reports each in one PPT file.</td>
              </tr>
              <tr>
                <td style="border: 1px solid #ddd; padding: 8px;">Generate Output-vs-Baseline Reports</td>
                <td style="border: 1px solid #ddd; padding: 8px;">Generates reports to compare output data with RT file baseline data.</td>
              </tr>
              <tr>
                <td style="border: 1px solid #ddd; padding: 8px;">Generate Output-vs-Lesions Reports</td>
                <td style="border: 1px solid #ddd; padding: 8px;">Generates reports to compare output data with lesion data.</td>
              </tr>
              <tr>
                <td style="border: 1px solid #ddd; padding: 8px;">Generate Baseline-vs-Lesions Reports</td>
                <td style="border: 1px solid #ddd; padding: 8px;">Export reports comparing RT file baseline data with lesion data.</td>
              </tr>
              <tr>
                <td style="border: 1px solid #ddd; padding: 8px;">Generate HRS2 Reports</td>
                <td style="border: 1px solid #ddd; padding: 8px;">Generate HRS2 reports: When selected, the system will produce HRS2 PPT reports.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `
  },

  "hrs-desktop-results": {
    title: "HRS Desktop - Results & Interpretation",
    content: `
      <h3>Results and Interpretation Overview</h3>
      <p>Habitat Risk Scoring analysis generates comprehensive output that provides detailed insights into tumor spatial heterogeneity and habitat characterization. This section covers complete output interpretation and visualization procedures.</p>

      <h3>Output Structure and Organization</h3>
      <p>HRS processing generates comprehensive, well-organized output in structured folders for efficient habitat analysis and clinical interpretation.</p>

      <div class="highlight">
        <h4>Complete Output Directory Structure</h4>
        
        <h5>Folders:</h5>
        <ul>
          <li><strong>HRS_Graphs/</strong> - DCE temporal curves, parameter distributions, and quality control plots</li>
          <li><strong>HRS_Label_Images/</strong> - Risk score label images and zone-specific risk maps</li>
          <li><strong>HRS_Masks/</strong> - Zone-specific ADC, DCE, and T2 analysis masks</li>
          <li><strong>HRS_Settings/</strong> - Parameter configurations, processing logs, and visualization files</li>
          <li><strong>Lesion/</strong> - Lesion-specific analysis and masks</li>
          <li><strong>MRI_Reformatted/</strong> - Processed and aligned MRI volumes</li>
          <li><strong>RT_Masks/</strong> - RT structure masks and region definitions</li>
        </ul>

        <h5>Files (Direct in Output folder):</h5>
        <ul>
          <li><strong>Grid Images:</strong> [PatientID]_[Study]_1-10_Grid.png - Complete risk spectrum grid visualization</li>
          <li><strong>Grid Presentations:</strong> [PatientID]_[Study]_1-10_Grid.pptx - PowerPoint presentation of risk grids</li>
          <li><strong>High-Risk Grid Images:</strong> [PatientID]_[Study]_6-10_Grid.png - High-risk focused grid visualization</li>
          <li><strong>High-Risk Grid Presentations:</strong> [PatientID]_[Study]_6-10_Grid.pptx - PowerPoint presentation of high-risk grids</li>
          <li><strong>Excel Statistics Files:</strong>
            <ul>
              <li>[PatientID]_[Study]_HRS_Quadrants_GS6-10.xlsx - Quadrant-based statistics for Gleason scores 6-10</li>
              <li>[PatientID]_[Study]_HRS_ROC_Pixel_Based_GS6-10.xlsx - ROC analysis for pixel-based classification</li>
              <li>[PatientID]_[Study]_HRSStatistics_PerObject.xlsx - Per-object statistical analysis</li>
              <li>[PatientID]_[Study]_HRSStatistics_PerQuadrant.xlsx - Per-quadrant statistical analysis</li>
            </ul>
          </li>
        </ul>
      </div>

      <h3>File Format Specifications</h3>
      <ul>
        <li><strong>MHA (MetaImage):</strong> Primary 3D volume format compatible with 3D Slicer</li>
        <li><strong>PNG:</strong> High-quality 2D visualizations and analysis graphs</li>
        <li><strong>PPTX:</strong> PowerPoint presentations for clinical reporting and visualization</li>
        <li><strong>XLSX:</strong> Excel spreadsheets containing statistical analysis and quantitative results</li>
        <li><strong>JSON:</strong> Parameter configurations and processing metadata</li>
        <li><strong>TXT:</strong> Processing logs and detailed analysis information</li>
        <li><strong>CTBL:</strong> 3D Slicer color table files for consistent visualization</li>
      </ul>

      <h3>HRS Scoring and Risk Stratification</h3>
      <p>The HRS system generates comprehensive risk scores that provide quantitative assessment of tumor habitat characteristics and spatial heterogeneity.</p>

      <div class="highlight">
        <h4>HRS Score Interpretation Guidelines</h4>
        <table style="width: 100%; border-collapse: collapse; margin: 10px 0;">
          <thead>
            <tr style="background-color: #3b82f6; color: white;">
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">HRS Score Range</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Risk Level</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Clinical Interpretation</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Recommended Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">0.0 - 0.3</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Low Risk</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Low suspicion for significant prostate cancer</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Routine follow-up</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">0.3 - 0.6</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Intermediate Risk</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Moderate suspicion requiring evaluation</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Additional imaging or biopsy consideration</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">0.6 - 1.0</td>
              <td style="border: 1px solid #ddd; padding: 8px;">High Risk</td>
              <td style="border: 1px solid #ddd; padding: 8px;">High suspicion for significant prostate cancer</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Targeted intervention recommended</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>Visualization and Report Generation</h3>
      <p>HRS results can be visualized using multiple approaches to provide comprehensive clinical assessment:</p>

      <h4>Grid Visualization</h4>
      <ul>
        <li><strong>Complete Risk Spectrum (1-10):</strong> Shows full range of habitat risk scores across prostate tissue</li>
        <li><strong>High-Risk Focus (6-10):</strong> Concentrates on clinically significant high-risk areas</li>
        <li><strong>Quadrant Analysis:</strong> Provides spatial reference for risk distribution</li>
        <li><strong>Zone-Specific Analysis:</strong> Separates peripheral zone and transition zone assessments</li>
      </ul>

      <h4>Statistical Reports</h4>
      <ul>
        <li><strong>Per-Object Statistics:</strong> Quantitative analysis of individual habitat regions</li>
        <li><strong>Per-Quadrant Statistics:</strong> Spatial distribution analysis across prostate quadrants</li>
        <li><strong>ROC Analysis:</strong> Performance metrics for diagnostic accuracy</li>
        <li><strong>Correlation Analysis:</strong> Relationships between HRS scores and clinical outcomes</li>
      </ul>

      <h3>Clinical Interpretation Guidelines</h3>
      <p>When interpreting HRS results, consider the following clinical guidelines:</p>

      <h4>Multi-Modal Integration</h4>
      <ul>
        <li><strong>DCE Analysis:</strong> Assess perfusion patterns and vascular characteristics</li>
        <li><strong>ADC Analysis:</strong> Evaluate diffusion restrictions and cellular density</li>
        <li><strong>T2 Analysis:</strong> Consider anatomical context and tissue composition</li>
        <li><strong>Alpha Weighting:</strong> Understand the contribution of each modality to final scores</li>
      </ul>

      <h4>Zone-Specific Considerations</h4>
      <ul>
        <li><strong>Peripheral Zone:</strong> Higher baseline ADC values, different threshold interpretations</li>
        <li><strong>Transition Zone:</strong> Lower baseline ADC values, BPH considerations</li>
        <li><strong>Anatomical Correlation:</strong> Relate functional findings to prostate anatomy</li>
      </ul>

      <h4>Quality Control</h4>
      <ul>
        <li><strong>Registration Quality:</strong> Verify proper alignment of imaging series</li>
        <li><strong>Parameter Validation:</strong> Confirm appropriate parameter settings</li>
        <li><strong>Artifact Assessment:</strong> Check for motion or other imaging artifacts</li>
        <li><strong>Signal Quality:</strong> Ensure adequate signal-to-noise ratio</li>
      </ul>
    `
  },

  "hrs-desktop-visualization": {
    title: "HRS Desktop - 3D Visualization",
    content: `
      <h3>3D Visualization Guide</h3>
      <p>This section provides comprehensive guidance for visualizing HRS results using 3D Slicer, including loading volume images and configuring color maps for optimal habitat risk visualization.</p>

      <div class="step-container">
        <h4>Loading MHA Volume Images into 3D Slicer</h4>
        <p>To visualize medical imaging data efficiently in 3D-Slicer, follow these steps to load MHA volume images:</p>

        <h5>Step 1: Open 3D-Slicer</h5>
        <ul>
          <li>Launch the 3D-Slicer application</li>
        </ul>

        <h5>Step 2: Load Volume Images</h5>
        <ul>
          <li>Navigate to the <strong>Data</strong> module by selecting <strong>Data</strong> from the modules menu</li>
          <li>Click on the <strong>Add Data</strong> button to bring up the file dialog</li>
          <li>Browse to the case output folder that contains the MHA volume files</li>
          <li>Select the necessary files, including both the main volume image and any associated mask or label volumes</li>
          <li>Enable the 'Show Options' checkbox in the 'Add data into the scene' window</li>
          <li>For any mask or label images, tick the <strong>LabelMap</strong> checkbox and select the Jet lookup table as the color map to ensure proper visualization</li>
          <li>Click <strong>Ok</strong> to load the images into the Slicer workspace, where they will be ready for analysis</li>
        </ul>
      </div>

      <div class="step-container">
        <h4>Loading Custom Jet Color Map</h4>
        <p>A Jet lookup table file is provided and available in the Output folder of every processed case under the name 'Jet.ctbl'. Alternatively, users can also load a custom Jet lookup table file they have created.</p>

        <h5>Step 1: Load the Lookup Table File</h5>
        <ul>
          <li>Navigate to the <strong>Data</strong> module by clicking on <strong>Data</strong> in the modules menu</li>
          <li>Click on the <strong>Add Data</strong> button to open the file dialog</li>
          <li>Browse to the location of the 'Jet.ctbl' file in the Output folder of the processed case</li>
          <li>Select the 'Jet.ctbl' file and click <strong>Ok</strong> to load it into the application</li>
        </ul>

        <h5>Step 2: Load Volume Images with Jet Color Map</h5>
        <ul>
          <li>Navigate to the <strong>Data</strong> module by selecting <strong>Data</strong> from the modules menu</li>
          <li>Click on the <strong>Add Data</strong> button to bring up the file dialog</li>
          <li>Browse to the case output folder that contains the MHA volume files</li>
          <li>Select the necessary files, including both the main volume image and any associated mask or label volumes</li>
          <li>Enable the 'Show Options' checkbox in the 'Add data into the scene' window</li>
          <li>For any mask or label images, tick the <strong>LabelMap</strong> checkbox and select the Jet lookup table as the color map to ensure proper visualization</li>
          <li>Click <strong>Ok</strong> to load the images into the Slicer workspace</li>
        </ul>
      </div>

      <div class="step-container">
        <h4>Creating Custom Jet Color Map</h4>
        <p>If you do not already have a pre-made Jet color map file, you can create one directly in 3D-Slicer by following these steps:</p>

        <h5>Step 1: Open 3D-Slicer</h5>
        <ul>
          <li>Launch the 3D-Slicer application</li>
        </ul>

        <h5>Step 2: Access the Colors Module</h5>
        <ul>
          <li>Use the 'Find Module' icon to search for the "Colors" module and switch to it</li>
        </ul>

        <h5>Step 3: Create a New Lookup Table</h5>
        <ul>
          <li>In the Colors module, click the 'Copy' icon to create a new lookup table</li>
          <li>Rename this new table to "Jet" and confirm by clicking 'OK'</li>
        </ul>

        <h5>Step 4: Configure the Lookup Table</h5>
        <ul>
          <li>Set the number of colors to 11</li>
          <li>Adjust the scalar range from 0 to 10</li>
        </ul>

        <h5>Step 5: Update the Colors</h5>
        <p>Double-click on each color cell to open the color picker and set the RGB values for each index as follows:</p>
        <div class="highlight">
          <ul>
            <li>0: RGB(0, 0, 0) - Black</li>
            <li>1: RGB(0, 0, 255) - Blue</li>
            <li>2: RGB(0, 85, 255) - Light Blue</li>
            <li>3: RGB(0, 170, 255) - Cyan</li>
            <li>4: RGB(0, 255, 255) - Aqua</li>
            <li>5: RGB(85, 255, 170) - Green</li>
            <li>6: RGB(170, 255, 85) - Yellow-Green</li>
            <li>7: RGB(255, 255, 0) - Yellow</li>
            <li>8: RGB(255, 170, 0) - Orange</li>
            <li>9: RGB(255, 85, 0) - Red-Orange</li>
            <li>10: RGB(255, 0, 0) - Red</li>
          </ul>
        </div>

        <h5>Step 6: Save the Lookup Table</h5>
        <ul>
          <li>Once all entries are set, use 'File' > 'Save Data' to export this lookup table to a file for future use</li>
        </ul>
      </div>

      <h3>Visualization Best Practices</h3>
      <p>For optimal HRS visualization in 3D Slicer, consider the following best practices:</p>

      <h4>Color Map Selection</h4>
      <ul>
        <li><strong>Jet Color Map:</strong> Provides intuitive visualization with blue (low risk) to red (high risk) progression</li>
        <li><strong>Consistent Application:</strong> Use the same color map across all cases for comparison</li>
        <li><strong>Threshold Adjustment:</strong> Adjust color map thresholds to highlight specific risk ranges</li>
      </ul>

      <h4>Multi-Planar Views</h4>
      <ul>
        <li><strong>Axial View:</strong> Primary view for prostate cross-sectional analysis</li>
        <li><strong>Sagittal View:</strong> Useful for anterior-posterior assessment</li>
        <li><strong>Coronal View:</strong> Provides superior-inferior perspective</li>
      </ul>

      <h4>Volume Rendering</h4>
      <ul>
        <li><strong>3D Volume Rendering:</strong> Provides comprehensive spatial understanding</li>
        <li><strong>Transparency Adjustment:</strong> Balance between volume visibility and underlying anatomy</li>
        <li><strong>Threshold Optimization:</strong> Adjust rendering thresholds to highlight relevant structures</li>
      </ul>

      <h4>Measurement Tools</h4>
      <ul>
        <li><strong>Distance Measurements:</strong> Quantify spatial relationships</li>
        <li><strong>Volume Calculations:</strong> Assess habitat volumes</li>
        <li><strong>ROI Analysis:</strong> Focus on specific regions of interest</li>
      </ul>
    `
  },

  "hrs-desktop-troubleshooting": {
    title: "HRS Desktop - Troubleshooting",
    content: `
      <h3>Troubleshooting and Support</h3>
      <p>For additional support or information, please refer to the HRS User Guide or contact our support team.</p>

      <h3>Common Issues and Solutions</h3>

      <div class="step-container">
        <h4>Installation Issues</h4>
        <h5>Problem: Installation fails or application won't start</h5>
        <ul>
          <li><strong>Solution:</strong> Ensure you have administrative privileges on your computer</li>
          <li><strong>Solution:</strong> Install JDK during the installation process if not previously installed</li>
          <li><strong>Solution:</strong> Check system requirements and ensure compatibility</li>
          <li><strong>Solution:</strong> Disable antivirus software temporarily during installation</li>
        </ul>

        <h5>Problem: Java-related errors</h5>
        <ul>
          <li><strong>Solution:</strong> Install JDK 8 or higher</li>
          <li><strong>Solution:</strong> Set JAVA_HOME environment variable correctly</li>
          <li><strong>Solution:</strong> Update Java to the latest version</li>
        </ul>
      </div>

      <div class="step-container">
        <h4>Data Organization Issues</h4>
        <h5>Problem: Cases not loading or processing fails</h5>
        <ul>
          <li><strong>Solution:</strong> Verify proper folder structure and file formats</li>
          <li><strong>Solution:</strong> Ensure all required series are present (ADC, DCE, T2, RT)</li>
          <li><strong>Solution:</strong> Check DICOM format compliance</li>
          <li><strong>Solution:</strong> Validate ZIP file integrity</li>
        </ul>

        <h5>Problem: Missing RT structure files</h5>
        <ul>
          <li><strong>Solution:</strong> Ensure RT folder and RT_Structure.dcm file are present</li>
          <li><strong>Solution:</strong> Verify RT structure file format and content</li>
          <li><strong>Solution:</strong> Check that RT file contains required contour definitions</li>
        </ul>
      </div>

      <div class="step-container">
        <h4>Parameter Configuration Issues</h4>
        <h5>Problem: Parameter validation errors</h5>
        <ul>
          <li><strong>Solution:</strong> Check alpha weighting constraints (must sum to 1.0 within each zone)</li>
          <li><strong>Solution:</strong> Verify parameter ranges are within acceptable limits</li>
          <li><strong>Solution:</strong> Use default parameters as starting point</li>
        </ul>

        <h5>Problem: Processing fails with parameter errors</h5>
        <ul>
          <li><strong>Solution:</strong> Reset parameters to default values</li>
          <li><strong>Solution:</strong> Check zone-specific threshold configurations</li>
          <li><strong>Solution:</strong> Verify DCE parameter settings</li>
        </ul>
      </div>

      <div class="step-container">
        <h4>Processing Errors</h4>
        <h5>Problem: Processing stops or fails unexpectedly</h5>
        <ul>
          <li><strong>Solution:</strong> Review log files for specific error messages</li>
          <li><strong>Solution:</strong> Validate input data integrity</li>
          <li><strong>Solution:</strong> Check available system memory</li>
          <li><strong>Solution:</strong> Ensure sufficient disk space for output</li>
        </ul>

        <h5>Problem: Registration failures</h5>
        <ul>
          <li><strong>Solution:</strong> Check image quality and resolution</li>
          <li><strong>Solution:</strong> Verify proper image alignment</li>
          <li><strong>Solution:</strong> Adjust registration parameters</li>
        </ul>
      </div>

      <div class="step-container">
        <h4>Visualization Problems</h4>
        <h5>Problem: 3D Slicer won't load images</h5>
        <ul>
          <li><strong>Solution:</strong> Confirm 3D Slicer installation and version compatibility</li>
          <li><strong>Solution:</strong> Check color map configuration</li>
          <li><strong>Solution:</strong> Verify file format compatibility (MHA files)</li>
        </ul>

        <h5>Problem: Color maps not displaying correctly</h5>
        <ul>
          <li><strong>Solution:</strong> Load the provided Jet.ctbl color table file</li>
          <li><strong>Solution:</strong> Create custom color map following the provided steps</li>
          <li><strong>Solution:</strong> Check color map scalar range settings</li>
        </ul>
      </div>

      <h3>Performance Optimization</h3>
      <p>To optimize HRS performance and reduce processing time:</p>

      <h4>System Optimization</h4>
      <ul>
        <li><strong>Memory:</strong> Ensure adequate RAM (16GB recommended)</li>
        <li><strong>Storage:</strong> Use SSD storage for faster data access</li>
        <li><strong>Processing:</strong> Close unnecessary applications during processing</li>
        <li><strong>Network:</strong> Use local storage for data processing</li>
      </ul>

      <h4>Parameter Optimization</h4>
      <ul>
        <li><strong>Volume Clean:</strong> Adjust volume cleaning threshold for your data</li>
        <li><strong>Registration:</strong> Use registration only when necessary</li>
        <li><strong>Quality vs Speed:</strong> Balance processing quality with time requirements</li>
      </ul>

      <h3>Getting Additional Help</h3>
      <p>If you continue to experience issues:</p>

      <h4>Documentation Resources</h4>
      <ul>
        <li>Review the complete HRS User Guide</li>
        <li>Check the parameter reference tables</li>
        <li>Consult the scientific documentation</li>
      </ul>

      <h4>Support Channels</h4>
      <ul>
        <li><strong>Technical Support:</strong> Contact our support team for technical assistance</li>
        <li><strong>User Community:</strong> Join user forums for peer support</li>
        <li><strong>Training:</strong> Consider additional training sessions</li>
      </ul>

      <h4>Information to Provide</h4>
      <p>When contacting support, please provide:</p>
      <ul>
        <li>System specifications and operating system</li>
        <li>HRS version and installation details</li>
        <li>Error messages and log files</li>
        <li>Steps to reproduce the issue</li>
        <li>Sample data characteristics (if applicable)</li>
      </ul>
    `
  },

  "hrs-desktop-reference": {
    title: "HRS Desktop - Reference",
    content: `
      <h3>Reference Information</h3>
      <p>This section provides comprehensive reference information for HRS Desktop, including system requirements, file formats, and scientific references.</p>

      <h3>System Requirements</h3>
      
      <h4>Minimum Requirements</h4>
      <ul>
        <li><strong>Operating System:</strong> Windows 10 (64-bit)</li>
        <li><strong>Memory:</strong> 8GB RAM</li>
        <li><strong>Storage:</strong> 5GB free space</li>
        <li><strong>Java:</strong> JDK 8 or higher</li>
        <li><strong>Graphics:</strong> DirectX 11 compatible graphics card</li>
      </ul>

      <h4>Recommended Requirements</h4>
      <ul>
        <li><strong>Operating System:</strong> Windows 11 (64-bit)</li>
        <li><strong>Memory:</strong> 16GB RAM or more</li>
        <li><strong>Storage:</strong> 20GB free space</li>
        <li><strong>Java:</strong> JDK 11 or higher</li>
        <li><strong>Graphics:</strong> Dedicated graphics card with 4GB VRAM</li>
        <li><strong>3D Slicer:</strong> Version 4.10 or higher for visualization</li>
      </ul>

      <h3>File Formats</h3>
      
      <h4>Supported Input Formats</h4>
      <ul>
        <li><strong>DICOM:</strong> .dcm, .dicom (primary format for prostate MRI)</li>
        <li><strong>ZIP:</strong> Compressed case files containing DICOM data</li>
      </ul>

      <h4>Supported Output Formats</h4>
      <ul>
        <li><strong>MHA (MetaImage):</strong> Primary 3D volume format compatible with 3D Slicer</li>
        <li><strong>PNG:</strong> High-quality 2D visualizations and analysis graphs</li>
        <li><strong>PPTX:</strong> PowerPoint presentations for clinical reporting and visualization</li>
        <li><strong>XLSX:</strong> Excel spreadsheets containing statistical analysis and quantitative results</li>
        <li><strong>JSON:</strong> Parameter configurations and processing metadata</li>
        <li><strong>TXT:</strong> Processing logs and detailed analysis information</li>
        <li><strong>CTBL:</strong> 3D Slicer color table files for consistent visualization</li>
      </ul>

      <h3>Data Structure Requirements</h3>
      
      <h4>Required Case Structure</h4>
      <div class="highlight">
        <p><strong>Case Format:</strong> ZIP file named with patient/case ID (e.g., PatientID_12345.zip)</p>
        <p><strong>ZIP File Structure:</strong> Extracted folder contains patient's main directory</p>
        <p><strong>Directory Hierarchy:</strong> Main folder → studies folder → series-specific folders</p>
        <p><strong>Required Series:</strong> ADC, DCE, T2, and RT structure files (required)</p>
      </div>

      <h4>Visual Folder Structure</h4>
      <div style="background: linear-gradient(135deg, #fef3c7 0%, #fbbf24 100%); border: 2px solid #f59e0b; border-radius: 12px; padding: 20px; margin: 20px 0; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <div style="background: #ffffff; border-radius: 8px; padding: 16px; color: #1f2937; border: 1px solid #e5e7eb; font-family: 'Courier New', monospace; font-size: 14px; line-height: 1.8; overflow-x: auto;">
          <pre style="margin: 0; color: #1f2937; background: #ffffff !important;">📦 PatientID.zip
└── 📁 PatientMainFolder/
    └── 📁 studies/
        ├── 📁 ADC_Series/
        │   └── 📄 *.dcm files (ADC images)
        ├── 📁 DCE_Series/
        │   └── 📄 *.dcm files (DCE timepoints)
        ├── 📁 T2_Series/
        │   └── 📄 *.dcm files (T2 images)
        └── 📁 RT/
            └── 📄 RT_Structure.dcm (Required)</pre>
        </div>
        <div style="background: #fef3c7; border: 2px solid #f59e0b; border-radius: 8px; padding: 12px; margin-top: 12px; display: flex; align-items: center; gap: 8px;">
          <span style="font-size: 18px;">⚠️</span>
          <span style="color: #92400e; font-weight: 600;">
            <strong>Important:</strong> RT folder and RT_Structure.dcm file are <strong style="color: #dc2626;">required</strong> for HRS analysis.
          </span>
        </div>
      </div>

      <h3>Security and Compliance</h3>
      
      <h4>Data Security</h4>
      <ul>
        <li><strong>Local Processing:</strong> All data processing occurs locally on your system</li>
        <li><strong>No Network Transmission:</strong> Patient data remains on your local system</li>
        <li><strong>Encryption:</strong> Supports encrypted data storage</li>
        <li><strong>Access Control:</strong> Local system access controls apply</li>
      </ul>

      <h4>Compliance</h4>
      <ul>
        <li><strong>HIPAA:</strong> Designed to support HIPAA compliance requirements</li>
        <li><strong>Data Privacy:</strong> No automatic data collection or transmission</li>
        <li><strong>Audit Trail:</strong> Comprehensive logging of processing activities</li>
      </ul>

      <h3>Scientific References</h3>
      <p>HRS methodology is based on extensive scientific research and validation studies:</p>

      <div class="highlight">
        <h4>Key Research Publications</h4>
        <ol>
          <li>Stoyanova, R., Chinea, F., Kwon, D., Reis, I. M., Tschudi, Y., Parra, N. A., Breto, A. L., Padgett, K. R., Dal Pra, A., Abramowitz, M. C., Kryvenko, O. N., Punnen, S., & Pollack, A. (2018). An Automated Multiparametric MRI Quantitative Imaging Prostate Habitat Risk Scoring System for Defining External Beam Radiation Therapy Boost Volumes. <em>International journal of radiation oncology, biology, physics</em>, <em>102</em>(4), 821–829. https://doi.org/10.1016/j.ijrobp.2018.06.003</li>
          
          <li>Parra, N. A., Pollack, A., Chinea, F. M., Abramowitz, M. C., Marples, B., Munera, F., Castillo, R., Kryvenko, O. N., Punnen, S., & Stoyanova, R. (2017). Automatic Detection and Quantitative DCE-MRI Scoring of Prostate Cancer Aggressiveness. <em>Frontiers in oncology</em>, 7, 259. https://doi.org/10.3389/fonc.2017.00259</li>
          
          <li>Tschudi, Y., Pollack, A., Punnen, S. <em>et al.</em> Automatic Detection of Prostate Tumor Habitats using Diffusion MRI. <em>Sci Rep</em> <strong>8</strong>, 16801 (2018). https://doi.org/10.1038/s41598-018-34916-4</li>
        </ol>
      </div>

      <h3>Version Information</h3>
      <div class="info-box">
        <p><strong>Version:</strong> 2.0 Complete Edition<br />
        <strong>Date:</strong> October 2025<br />
        <strong>Application:</strong> HRS Desktop<br />
        <strong>Purpose:</strong> Advanced Prostate MRI Analysis System for Habitat Risk Scoring</p>
      </div>

      <h3>Support and Contact</h3>
      <p>For technical support, training, or additional information:</p>
      <ul>
        <li><strong>Technical Support:</strong> Contact our support team for assistance with installation, configuration, and troubleshooting</li>
        <li><strong>Training:</strong> Available training sessions for users and administrators</li>
        <li><strong>Documentation:</strong> Complete user guides and technical documentation available</li>
        <li><strong>Updates:</strong> Regular updates and improvements based on user feedback</li>
      </ul>
    `
  },

  // HRS Cloud Content
  "hrs-cloud-overview": {
    title: "HRS Cloud - Overview",
    content: `
      <div class="info-box">
        <p><strong>Version:</strong> 2.0 Cloud<br />
        <strong>Date:</strong> October 2025<br />
        <strong>Application:</strong> HRS Cloud<br />
        <strong>Purpose:</strong> Web-Based Habitat Risk Scoring Platform for Prostate MRI Analysis</p>
      </div>

      <h3>HRS Cloud Technology Overview</h3>
      <p>HRS Cloud is a comprehensive web-based Habitat Risk Scoring platform designed for multi-parametric prostate MRI analysis and tumor habitat characterization. The cloud application provides the same powerful HRS capabilities as the desktop version while offering enhanced accessibility, scalability, and collaboration through modern web technologies.</p>

      <div class="feature-grid">
        <div class="feature-card">
          <h4>Habitat-Based Analysis</h4>
          <p>Multi-parametric MRI characterization of tumor habitats with spatial heterogeneity assessment and risk stratification</p>
        </div>
        <div class="feature-card">
          <h4>Multi-modal Integration</h4>
          <p>DCE, ADC, T2-weighted imaging with Alpha Weighting for comprehensive prostate cancer assessment</p>
        </div>
        <div class="feature-card">
          <h4>Zone-Specific Processing</h4>
          <p>Peripheral Zone (PZ) and Transition Zone (TZ) analysis with optimized thresholds for each anatomical region</p>
        </div>
        <div class="feature-card">
          <h4>Advanced Features</h4>
          <p>NMF decomposition, habitat risk stratification, and cloud-based processing capabilities</p>
        </div>
      </div>

      <h3>Cloud Advantages</h3>
      <ul>
        <li><strong>Accessibility:</strong> Access from any device with a modern web browser</li>
        <li><strong>Collaboration:</strong> Share datasets and results with team members</li>
        <li><strong>Scalability:</strong> Process large datasets using cloud computing resources</li>
        <li><strong>Security:</strong> Enterprise-grade security and compliance</li>
        <li><strong>Updates:</strong> Automatic updates without manual installation</li>
        <li><strong>Simplicity:</strong> Streamlined workflow - just upload data and configure HRS parameters</li>
      </ul>

      <h3>System Requirements</h3>
      <ul>
        <li><strong>Web Browser:</strong> Chrome 90+, Firefox 88+, Safari 14+, Edge 90+</li>
        <li><strong>Internet Connection:</strong> Stable broadband connection recommended</li>
        <li><strong>Screen Resolution:</strong> Minimum 1280x720, recommended 1920x1080</li>
        <li><strong>JavaScript:</strong> Must be enabled</li>
      </ul>
    `
  },

  "hrs-cloud-getting-started": {
    title: "HRS Cloud - Getting Started",
    content: `
      <h3>Account Setup</h3>
      <p>To access HRS Cloud, you need to contact support to obtain a license. The account creation process is handled through our support team to ensure proper licensing and security.</p>

      <div class="highlight">
        <p><strong>Note:</strong> Account creation is currently handled by contacting support for a license. This ensures proper licensing and security compliance.</p>
      </div>

      <h3>First Login</h3>
      <ol>
        <li>Navigate to the HRS Cloud login page</li>
        <li>Enter your email address and password provided by support</li>
        <li>Click "Sign In" to access the application</li>
        <li>You will be redirected to the main HRS Cloud dashboard</li>
      </ol>

      <h3>Web Interface Overview</h3>
      <p>The HRS Cloud interface is designed for intuitive navigation and efficient habitat risk scoring workflow. The main interface consists of two key modules accessible through the navigation menu.</p>

      <h4>Navigation Structure</h4>
      <ul>
        <li><strong>Datasets:</strong> Patient-level data management for prostate MRI analysis</li>
        <li><strong>HRS Parameters:</strong> Configure Habitat Risk Scoring parameters (DCE, ADC, T2, Alpha Weighting)</li>
      </ul>

      <h3>Simplified Workflow</h3>
      <ol>
        <li><strong>Upload Data:</strong> Upload your prostate MRI datasets (DCE, ADC, T2 series)</li>
        <li><strong>Set Parameters:</strong> Configure Habitat Risk Scoring parameters for your specific use case</li>
        <li><strong>Run Analysis:</strong> Start HRS processing and monitor progress in real-time</li>
        <li><strong>View Results:</strong> Access habitat risk maps, statistics, and comprehensive reports</li>
      </ol>
    `
  },

  "hrs-cloud-web-interface": {
    title: "HRS Cloud - Web Interface",
    content: `
      <h3>Web Interface Overview</h3>
      <p>The HRS Cloud interface provides an intuitive, streamlined workflow for habitat risk scoring analysis through a modern web-based platform.</p>

      <h3>Navigation Structure</h3>
      <ul>
        <li><strong>Datasets:</strong> Patient-level data management for prostate MRI analysis</li>
        <li><strong>HRS Parameters:</strong> Configure Habitat Risk Scoring parameters (DCE, ADC, T2, Alpha Weighting)</li>
      </ul>

      <h3>Detailed Workflow Steps</h3>

      <div class="step-container">
        <h4>Step 1: Data Upload and Organization</h4>
        
        <h5>Data Structure Requirements:</h5>
        <p>Each case must be organized according to specific HRS requirements:</p>

        <h6>Required Data Structure:</h6>
        <ul>
          <li>Case Format: ZIP file named with patient/case ID (e.g., PatientID_12345.zip)</li>
          <li>ZIP File Structure: Extracted folder contains patient's main directory</li>
          <li>Directory Hierarchy: Main folder → studies folder → series-specific folders</li>
          <li>Required Series: ADC, DCE, T2, and RT structure files (required)</li>
        </ul>

        <div style="background: linear-gradient(135deg, #fef3c7 0%, #fbbf24 100%); border: 2px solid #f59e0b; border-radius: 12px; padding: 20px; margin: 20px 0; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <h6 style="color: #92400e; margin-top: 0; font-size: 16px; font-weight: 600;">Visual Folder Structure:</h6>
          <div style="background: #ffffff; border-radius: 8px; padding: 16px; color: #1f2937; border: 1px solid #e5e7eb; font-family: 'Courier New', monospace; font-size: 14px; line-height: 1.8; overflow-x: auto;">
            <pre style="margin: 0; color: #1f2937; background: #ffffff !important;">📦 PatientID.zip
└── 📁 PatientMainFolder/
    └── 📁 studies/
        ├── 📁 ADC_Series/
        │   └── 📄 *.dcm files (ADC images)
        ├── 📁 DCE_Series/
        │   └── 📄 *.dcm files (DCE timepoints)
        ├── 📁 T2_Series/
        │   └── 📄 *.dcm files (T2 images)
        └── 📁 RT/
            └── 📄 RT_Structure.dcm (Required)</pre>
          </div>
          <div style="background: #fef3c7; border: 2px solid #f59e0b; border-radius: 8px; padding: 12px; margin-top: 12px; display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 18px;">⚠️</span>
            <span style="color: #92400e; font-weight: 600;">
              <strong>Important:</strong> RT folder and RT_Structure.dcm file are <strong style="color: #dc2626;">required</strong> for HRS analysis.
            </span>
          </div>
        </div>
      </div>

      <div class="step-container">
        <h4>Step 2: Parameter Configuration</h4>
        <p>Configure Habitat Risk Scoring parameters through the web interface:</p>

        <h5>DCE Parameters:</h5>
        <ul>
          <li>Number of Curves: Typically 3 components for NMF decomposition</li>
          <li>Contribution Percentage: Minimum 60% for significant classification</li>
          <li>Wwp % in TZ: 90% threshold for well-perfused areas in transition zone</li>
          <li>W Percentile: 95th percentile for well-perfused region selection</li>
          <li>Baseline Shift: 2 initial data points for baseline calculation</li>
          <li>WashOut Upper/Lower: 4.0/0.5 thresholds for DCE score calculation</li>
        </ul>

        <h5>ADC Parameters:</h5>
        <ul>
          <li>Zone-specific thresholds for Peripheral Zone (PZ) and Transition Zone (TZ)</li>
          <li>PZ thresholds: High <850, Medium 850-1050, Low >1050</li>
          <li>TZ thresholds: High <600, Medium 600-750, Low >750</li>
          <li>Noise threshold: 400, Ceiling: 1600</li>
        </ul>

        <h5>T2 Parameters:</h5>
        <ul>
          <li>Similar zone-specific structure as ADC</li>
          <li>Typically disabled by default</li>
          <li>Same threshold structure as ADC for consistency</li>
        </ul>

        <h5>Alpha Weighting Parameters:</h5>
        <ul>
          <li>Must sum to 1.0 within each zone</li>
          <li>PZ: DCE=0.50, ADC=0.25, T2=0.25</li>
          <li>TZ: DCE=0.20, ADC=0.40, T2=0.40</li>
        </ul>
      </div>

      <div class="step-container">
        <h4>Step 3: Processing Execution</h4>
        
        <h5>Processing Flow:</h5>
        <ol>
          <li><strong>Data Validation:</strong> System validates uploaded prostate MRI datasets</li>
          <li><strong>Parameter Validation:</strong> Confirms HRS parameter settings</li>
          <li><strong>DCE Processing:</strong> Dynamic contrast enhancement analysis with NMF</li>
          <li><strong>ADC Processing:</strong> Zone-specific diffusion analysis</li>
          <li><strong>T2 Processing:</strong> Anatomical and signal intensity analysis</li>
          <li><strong>Alpha Integration:</strong> Multi-modal component integration</li>
          <li><strong>HRS Computation:</strong> Final HRS score calculation</li>
          <li><strong>Results Generation:</strong> Risk maps and comprehensive reports</li>
        </ol>

        <h5>Processing Status Indicators:</h5>
        <ul>
          <li><strong>Queued:</strong> Waiting to start processing</li>
          <li><strong>Running:</strong> Currently being processed</li>
          <li><strong>Completed:</strong> Successfully finished</li>
          <li><strong>Failed:</strong> Processing encountered an error</li>
          <li><strong>Cancelled:</strong> Processing was stopped by user</li>
        </ul>
      </div>

      <div class="step-container">
        <h4>Step 4: Results Access and Visualization</h4>
        
        <h5>Output Structure:</h5>
        <ul>
          <li><strong>HRS_Graphs/:</strong> DCE temporal curves and quality control plots</li>
          <li><strong>HRS_Label_Images/:</strong> Risk score label images and zone-specific risk maps</li>
          <li><strong>HRS_Masks/:</strong> Zone-specific ADC, DCE, and T2 analysis masks</li>
          <li><strong>HRS_Settings/:</strong> Parameter configurations and processing logs</li>
          <li><strong>Lesion/:</strong> Lesion-specific analysis and masks</li>
          <li><strong>MRI_Reformatted/:</strong> Processed and aligned MRI volumes</li>
          <li><strong>RT_Masks/:</strong> RT structure masks and region definitions</li>
        </ul>

        <h5>File Formats:</h5>
        <ul>
          <li><strong>MHA (MetaImage):</strong> Primary 3D volume format</li>
          <li><strong>PNG:</strong> High-quality 2D visualizations</li>
          <li><strong>PPTX:</strong> PowerPoint presentations for clinical reporting</li>
          <li><strong>XLSX:</strong> Excel spreadsheets with statistical analysis</li>
          <li><strong>JSON:</strong> Parameter configurations and metadata</li>
        </ul>
      </div>
    `
  },

  "hrs-cloud-datasets": {
    title: "HRS Cloud - Datasets Module",
    content: `
      <h3>Datasets Module Overview</h3>
      <p>The Datasets module provides simple data management capabilities for prostate MRI analysis with a streamlined patient-level organization.</p>

      <h3>Dataset Structure</h3>
      <p>The interface consists of a simple patient-based organization system:</p>

      <h4>Patient-Level Organization</h4>
      <p>Simple patient-based data management:</p>
      <ul>
        <li><strong>Patients:</strong> Patient records with complete prostate MRI datasets (DCE, ADC, T2 series, and RT structure file with mask definitions)</li>
      </ul>

      <h3>Data Selection</h3>
      <p>Users can select patients for HRS processing:</p>
      <ul>
        <li>Select individual patients for analysis</li>
        <li>Selected patients will be processed in HRS analysis</li>
        <li>Selection state is maintained across sessions</li>
      </ul>

      <h3>File Upload</h3>
      <p>Two upload methods are available for prostate MRI datasets:</p>

      <h4>ZIP File Upload</h4>
      <ul>
        <li>Upload patient data as compressed ZIP files</li>
        <li>Supports multiple ZIP files simultaneously</li>
        <li>Each ZIP file represents one patient with complete prostate MRI data</li>
      </ul>

      <h4>Folder Upload</h4>
      <ul>
        <li>Upload entire patient folders</li>
        <li>Maintains original folder structure</li>
        <li>Supports batch upload of multiple patients</li>
      </ul>

      <h3>How to Organize Your Data</h3>
      <p>Follow these simple steps to organize your patient data:</p>

      <div class="step-container">
        <h4>Step 1: Create Patient Folder</h4>
        <p>📁 <strong>PatientName</strong> - Main folder with patient identifier</p>
      </div>

      <div class="step-container">
        <h4>Step 2: Add Study Folder(s)</h4>
        <p>📁 <strong>Study_001</strong> - Inside patient folder, create study folder (you may add multiple studies as needed: Study_001, Study_002, etc.)</p>
      </div>

      <div class="step-container">
        <h4>Step 3: Create Series and RT Folders</h4>
        <ul>
          <li>📁 <strong>ADC_Series</strong> - Apparent Diffusion Coefficient images</li>
          <li>📁 <strong>DCE_Series</strong> - Dynamic Contrast Enhanced series (multiple timepoints)</li>
          <li>📁 <strong>T2_Series</strong> - T2-weighted anatomical images</li>
          <li>📁 <strong>RT</strong> - <strong>Required</strong> folder for RT structure file</li>
        </ul>
      </div>

      <div class="step-container">
        <h4>Step 4: Add DICOM Files and RT Structure</h4>
        <ul>
          <li>📄 <strong>*.dcm files</strong> - Put DICOM files in each series folder</li>
          <li>📄 <strong>RT_Structure.dcm</strong> - <strong>Required</strong> RT Structure Set file in RT folder (DICOM RTSTRUCT file containing contour masks for regions of interest)</li>
        </ul>
      </div>

      <h3>Visual Folder Structure</h3>
      <div style="background: linear-gradient(135deg, #fef3c7 0%, #fbbf24 100%); border: 2px solid #f59e0b; border-radius: 12px; padding: 20px; margin: 20px 0; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <div style="background: #ffffff; border-radius: 8px; padding: 16px; color: #1f2937; border: 1px solid #e5e7eb; font-family: 'Courier New', monospace; font-size: 14px; line-height: 1.8; overflow-x: auto;">
          <pre style="margin: 0; color: #1f2937; background: #ffffff !important;">📦 PatientName.zip
└── 📁 PatientName/
    └── 📁 Study_001/
        ├── 📁 ADC_Series/
        │   └── 📄 *.dcm files (ADC images)
        ├── 📁 DCE_Series/
        │   └── 📄 *.dcm files (DCE timepoints)
        ├── 📁 T2_Series/
        │   └── 📄 *.dcm files (T2 images)
        └── 📁 RT/
            └── 📄 RT_Structure.dcm (Required)</pre>
        </div>
        <div style="background: #fef3c7; border: 2px solid #f59e0b; border-radius: 8px; padding: 12px; margin-top: 12px; display: flex; align-items: center; gap: 8px;">
          <span style="font-size: 18px;">⚠️</span>
          <span style="color: #92400e; font-weight: 600;">
            <strong>Important:</strong> RT folder and RT_Structure.dcm file are <strong style="color: #dc2626;">required</strong> for HRS analysis.
          </span>
        </div>
      </div>

      <h3>Data Organization Table</h3>
      <div class="highlight">
        <table style="width: 100%; border-collapse: collapse; margin: 10px 0;">
          <thead>
            <tr style="background-color: #3b82f6; color: white;">
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Level</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Folder Name</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Contains</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Example</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;"><strong>1. Patient</strong></td>
              <td style="border: 1px solid #ddd; padding: 8px;">PatientName</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Study folders (one or more)</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Patient_001</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;"><strong>2. Study</strong></td>
              <td style="border: 1px solid #ddd; padding: 8px;">Study_001, Study_002, ...</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Series folders + RT folder</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Study_001</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;"><strong>3. Series/RT</strong></td>
              <td style="border: 1px solid #ddd; padding: 8px;">ADC_Series, DCE_Series, T2_Series, RT</td>
              <td style="border: 1px solid #ddd; padding: 8px;">DICOM files</td>
              <td style="border: 1px solid #ddd; padding: 8px;">ADC_Series</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;"><strong>4. Files</strong></td>
              <td style="border: 1px solid #ddd; padding: 8px;">*.dcm</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Medical images & RT structure</td>
              <td style="border: 1px solid #ddd; padding: 8px;">image001.dcm</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="highlight">
        <p><strong>Final ZIP:</strong> PatientName.zip → PatientName → Study_001 → [ADC_Series, DCE_Series, T2_Series, RT] → *.dcm files</p>
        <p><strong>Note:</strong> You may include multiple studies per patient (Study_001, Study_002, etc.) as needed</p>
        <p><strong>⚠️ Important:</strong> RT folder and RT_Structure.dcm file are <strong>required</strong> for HRS analysis</p>
      </div>
    `
  },

  "hrs-cloud-parameters": {
    title: "HRS Cloud - HRS Parameters",
    content: `
      <h3>HRS Parameters Module Overview</h3>
      <p>The HRS Parameters module allows users to configure all aspects of Habitat Risk Scoring analysis through an intuitive web interface.</p>

      <h3>Parameter Categories</h3>
      <p>Habitat Risk Scoring parameters are organized into four main categories:</p>

      <h3>DCE Parameters</h3>
      <p>Configure Dynamic Contrast Enhancement analysis settings:</p>

      <div class="highlight">
        <table style="width: 100%; border-collapse: collapse; margin: 10px 0;">
          <thead>
            <tr style="background-color: #3b82f6; color: white;">
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Parameter</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Default</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">Use DCE</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Enabled</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Activates the inclusion of DCE time points in the HRS algorithm</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">Number of Curves</td>
              <td style="border: 1px solid #ddd; padding: 8px;">3</td>
              <td style="border: 1px solid #ddd; padding: 8px;">NMF components for temporal decomposition</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">Contribution %</td>
              <td style="border: 1px solid #ddd; padding: 8px;">60</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Minimum significance threshold for NMF</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">Wwp % in TZ</td>
              <td style="border: 1px solid #ddd; padding: 8px;">90</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Well-perfused threshold in transition zone</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">W Percentile</td>
              <td style="border: 1px solid #ddd; padding: 8px;">95</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Percentile for well-perfused selection</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">W Calculation</td>
              <td style="border: 1px solid #ddd; padding: 8px;">ROI</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Percentile calculation method (ROI or Whole)</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">Baseline Shift</td>
              <td style="border: 1px solid #ddd; padding: 8px;">2</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Initial data points for baseline calculation</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">Curves Ignore Last</td>
              <td style="border: 1px solid #ddd; padding: 8px;">0</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Points removed from curve tail</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">WashOut Upper</td>
              <td style="border: 1px solid #ddd; padding: 8px;">4.0</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Upper threshold for DCE scoring</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">WashOut Lower</td>
              <td style="border: 1px solid #ddd; padding: 8px;">0.5</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Lower threshold for DCE scoring</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>ADC Parameters</h3>
      <p>Configure zone-specific ADC thresholds:</p>

      <div class="highlight">
        <table style="width: 100%; border-collapse: collapse; margin: 10px 0;">
          <thead>
            <tr style="background-color: #3b82f6; color: white;">
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Parameter</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Default</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Zone</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">Use ADC</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Enabled</td>
              <td style="border: 1px solid #ddd; padding: 8px;">All zones</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Activates ADC in HRS algorithm</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">ADC High PZ</td>
              <td style="border: 1px solid #ddd; padding: 8px;">850</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Peripheral Zone</td>
              <td style="border: 1px solid #ddd; padding: 8px;">High threshold for PZ ADC values</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">ADC Medium PZ</td>
              <td style="border: 1px solid #ddd; padding: 8px;">1050</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Peripheral Zone</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Medium threshold for PZ ADC values</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">ADC Low PZ</td>
              <td style="border: 1px solid #ddd; padding: 8px;">1200</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Peripheral Zone</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Low threshold for PZ ADC values</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">ADC High TZ</td>
              <td style="border: 1px solid #ddd; padding: 8px;">600</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Transition Zone</td>
              <td style="border: 1px solid #ddd; padding: 8px;">High threshold for TZ ADC values</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">ADC Medium TZ</td>
              <td style="border: 1px solid #ddd; padding: 8px;">750</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Transition Zone</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Medium threshold for TZ ADC values</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">ADC Low TZ</td>
              <td style="border: 1px solid #ddd; padding: 8px;">850</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Transition Zone</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Low threshold for TZ ADC values</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">Noise ADC</td>
              <td style="border: 1px solid #ddd; padding: 8px;">400</td>
              <td style="border: 1px solid #ddd; padding: 8px;">All zones</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Noise threshold for ADC values</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">Ceiling ADC</td>
              <td style="border: 1px solid #ddd; padding: 8px;">1600</td>
              <td style="border: 1px solid #ddd; padding: 8px;">All zones</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Maximum reliable ADC value</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>T2 Parameters</h3>
      <p>Configure T2-weighted imaging analysis settings:</p>

      <div class="highlight">
        <table style="width: 100%; border-collapse: collapse; margin: 10px 0;">
          <thead>
            <tr style="background-color: #3b82f6; color: white;">
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Parameter</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Default</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Zone</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">Use T2</td>
              <td style="border: 1px solid #ddd; padding: 8px;"><strong>Disabled</strong></td>
              <td style="border: 1px solid #ddd; padding: 8px;">All zones</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Activates T2 in HRS algorithm</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">T2 High PZ</td>
              <td style="border: 1px solid #ddd; padding: 8px;">850</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Peripheral Zone</td>
              <td style="border: 1px solid #ddd; padding: 8px;">High threshold for PZ T2 values</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">T2 Medium PZ</td>
              <td style="border: 1px solid #ddd; padding: 8px;">1050</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Peripheral Zone</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Medium threshold for PZ T2 values</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">T2 Low PZ</td>
              <td style="border: 1px solid #ddd; padding: 8px;">1200</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Peripheral Zone</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Low threshold for PZ T2 values</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">T2 High TZ</td>
              <td style="border: 1px solid #ddd; padding: 8px;">600</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Transition Zone</td>
              <td style="border: 1px solid #ddd; padding: 8px;">High threshold for TZ T2 values</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">T2 Medium TZ</td>
              <td style="border: 1px solid #ddd; padding: 8px;">750</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Transition Zone</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Medium threshold for TZ T2 values</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">T2 Low TZ</td>
              <td style="border: 1px solid #ddd; padding: 8px;">850</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Transition Zone</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Low threshold for TZ T2 values</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">Noise T2</td>
              <td style="border: 1px solid #ddd; padding: 8px;">400</td>
              <td style="border: 1px solid #ddd; padding: 8px;">All zones</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Lower limit for reliable T2 values</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">Ceiling T2</td>
              <td style="border: 1px solid #ddd; padding: 8px;">1600</td>
              <td style="border: 1px solid #ddd; padding: 8px;">All zones</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Upper limit for T2 analysis</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>Alpha Weighting Parameters</h3>
      <p>Configure multi-modal integration weights (weights must sum to 1.0 within each zone):</p>

      <div class="highlight">
        <table style="width: 100%; border-collapse: collapse; margin: 10px 0;">
          <thead>
            <tr style="background-color: #3b82f6; color: white;">
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Parameter</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Default</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Zone</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">Alpha DCE PZ</td>
              <td style="border: 1px solid #ddd; padding: 8px;">0.50</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Peripheral Zone</td>
              <td style="border: 1px solid #ddd; padding: 8px;">DCE weighting factor for PZ</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">Alpha ADC PZ</td>
              <td style="border: 1px solid #ddd; padding: 8px;">0.25</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Peripheral Zone</td>
              <td style="border: 1px solid #ddd; padding: 8px;">ADC weighting factor for PZ</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">Alpha T2 PZ</td>
              <td style="border: 1px solid #ddd; padding: 8px;">0.25</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Peripheral Zone</td>
              <td style="border: 1px solid #ddd; padding: 8px;">T2 weighting factor for PZ</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">Alpha DCE TZ</td>
              <td style="border: 1px solid #ddd; padding: 8px;">0.20</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Transition Zone</td>
              <td style="border: 1px solid #ddd; padding: 8px;">DCE weighting factor for TZ</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">Alpha ADC TZ</td>
              <td style="border: 1px solid #ddd; padding: 8px;">0.40</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Transition Zone</td>
              <td style="border: 1px solid #ddd; padding: 8px;">ADC weighting factor for TZ</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">Alpha T2 TZ</td>
              <td style="border: 1px solid #ddd; padding: 8px;">0.40</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Transition Zone</td>
              <td style="border: 1px solid #ddd; padding: 8px;">T2 weighting factor for TZ</td>
            </tr>
          </tbody>
        </table>
        <p><strong>Note:</strong> Weights must sum to 1.0 within each zone (PZ weights: 0.50 + 0.25 + 0.25 = 1.0; TZ weights: 0.20 + 0.40 + 0.40 = 1.0)</p>
      </div>

      <h3>Processing Control Parameters</h3>
      <p>Configure data handling, quality control, and output generation:</p>

      <div class="highlight">
        <table style="width: 100%; border-collapse: collapse; margin: 10px 0;">
          <thead>
            <tr style="background-color: #3b82f6; color: white;">
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Parameter</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Default</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">Volume Clean</td>
              <td style="border: 1px solid #ddd; padding: 8px;">0.01 ml</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Minimum volume threshold for connected components</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">Use Registration</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Enabled</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Apply registration on selected protocols</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">Check Registration Need</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Enabled</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Check if registration is needed before applying</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">Register DCE to Previous</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Disabled</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Register DCE to previous timepoint</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">PZ Grid Display</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Enabled</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Add PZ contour to grid images</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">Lesion Grid Display</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Enabled</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Add lesion masks to grid images</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">Quadrant Lines</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Enabled</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Add quadrant lines to grid images</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">HRS Output 1-10</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Enabled</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Generate full risk score range</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">HRS Output 6-10</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Enabled</td>
              <td style="border: 1px solid #ddd; padding: 8px;">Generate high-risk focused output</td>
            </tr>
          </tbody>
        </table>
      </div>
    `
  },

  "hrs-cloud-processing": {
    title: "HRS Cloud - HRS Processing",
    content: `
      <h3>HRS Processing Overview</h3>
      <p>HRS Cloud uses a streamlined processing system that executes Habitat Risk Scoring analysis in a structured, sequential manner.</p>

      <h3>Processing Flow</h3>
      <ol>
        <li><strong>Data Validation:</strong> System validates uploaded prostate MRI datasets</li>
        <li><strong>Parameter Validation:</strong> Confirms HRS parameter settings</li>
        <li><strong>DCE Processing:</strong> Dynamic contrast enhancement analysis with NMF</li>
        <li><strong>ADC Processing:</strong> Zone-specific diffusion analysis</li>
        <li><strong>T2 Processing:</strong> Anatomical and signal intensity analysis</li>
        <li><strong>Alpha Integration:</strong> Multi-modal component integration</li>
        <li><strong>HRS Computation:</strong> Final HRS score calculation</li>
        <li><strong>Results Generation:</strong> Risk maps and comprehensive reports</li>
      </ol>

      <h3>Processing Status</h3>
      <p>Real-time processing status indicators:</p>
      <ul>
        <li><strong>Queued:</strong> Waiting to start processing</li>
        <li><strong>Running:</strong> Currently being processed</li>
        <li><strong>Completed:</strong> Successfully finished</li>
        <li><strong>Failed:</strong> Processing encountered an error</li>
        <li><strong>Cancelled:</strong> Processing was stopped by user</li>
      </ul>

      <h3>Resource Management</h3>
      <ul>
        <li><strong>Automatic Scaling:</strong> Dynamic allocation of cloud computing resources</li>
        <li><strong>Progress Tracking:</strong> Real-time progress updates for each HRS component</li>
        <li><strong>Error Handling:</strong> Comprehensive error reporting and recovery</li>
        <li><strong>Result Storage:</strong> Secure cloud storage for all HRS results</li>
      </ul>

      <h3>Cloud-Specific Processing Pipeline</h3>
      <p>HRS Cloud implements the same scientific algorithms as the desktop version but with cloud-optimized processing:</p>

      <div class="step-container">
        <h4>Step 1: Data Preparation and Upload</h4>
        
        <h5>Data Validation:</h5>
        <ul>
          <li>Automatic validation of uploaded prostate MRI datasets</li>
          <li>Verification of required series (ADC, DCE, T2, RT structure)</li>
          <li>Quality checks for DICOM format compliance</li>
          <li>Spatial resolution and orientation validation</li>
        </ul>

        <h5>Cloud Storage:</h5>
        <ul>
          <li>Secure encrypted storage of patient data</li>
          <li>Automatic backup and redundancy</li>
          <li>Compliance with healthcare data standards</li>
        </ul>
      </div>

      <div class="step-container">
        <h4>Step 2: Image Processing and Alignment</h4>
        
        <h5>Automatic Alignment:</h5>
        <ul>
          <li>Cloud-based image registration and alignment</li>
          <li>Multi-resolution processing for optimal performance</li>
          <li>Automatic artifact reduction and noise filtering</li>
          <li>Spatial normalization across all imaging series</li>
        </ul>

        <h5>Registration Process:</h5>
        <ul>
          <li>Elastix-based registration algorithms</li>
          <li>Similarity and Affine transforms for different modalities</li>
          <li>Multi-resolution strategy for computational efficiency</li>
          <li>Automatic quality assessment and validation</li>
        </ul>
      </div>

      <div class="step-container">
        <h4>Step 3: Core HRS Analysis</h4>
        
        <h5>Parallel Processing:</h5>
        <ul>
          <li>Distributed computing for faster analysis</li>
          <li>Simultaneous processing of multiple cases</li>
          <li>Optimized resource allocation based on case complexity</li>
          <li>Real-time progress monitoring</li>
        </ul>

        <h5>Algorithm Execution:</h5>
        <ul>
          <li>Same scientific algorithms as desktop version</li>
          <li>NMF decomposition for DCE analysis</li>
          <li>Zone-specific threshold application for ADC and T2</li>
          <li>Alpha weighting integration for final HRS scores</li>
        </ul>
      </div>

      <div class="step-container">
        <h4>Step 4: Results Generation and Storage</h4>
        
        <h5>Output Generation:</h5>
        <ul>
          <li>Comprehensive result package creation</li>
          <li>Multiple format support (MHA, PNG, PPTX, XLSX)</li>
          <li>Automatic report generation</li>
          <li>Quality control validation</li>
        </ul>

        <h5>Cloud Storage and Access:</h5>
        <ul>
          <li>Secure result storage with encryption</li>
          <li>Role-based access control</li>
          <li>Automatic result archiving</li>
          <li>Download and sharing capabilities</li>
        </ul>
      </div>
    `
  },

  "hrs-cloud-scientific": {
    title: "HRS Cloud - Scientific Documentation",
    content: `
      <h3>Scientific Documentation Overview</h3>
      <p>This section provides detailed scientific documentation for the Habitat Risk Scoring components and methodologies implemented in HRS Cloud.</p>

      <h3>HRS Scientific Foundation</h3>
      <p>HRS (Habitat Risk Scoring) is a comprehensive multi-parametric MRI analysis approach that integrates Dynamic Contrast Enhancement (DCE), Apparent Diffusion Coefficient (ADC), and T2-weighted imaging to characterize tumor habitats and assess prostate cancer risk through spatial heterogeneity analysis.</p>

      <h3>Research Validation</h3>
      <div class="highlight">
        <h4>Clinical Validation</h4>
        <p>HRS methodology has been extensively validated through controlled clinical studies published in peer-reviewed journals, demonstrating:</p>
        <ul>
          <li>Strong correlations with clinical outcomes (r=0.423-0.771)</li>
          <li>Superior diagnostic performance (AUC=0.852-0.952)</li>
          <li>Validated zone-specific thresholds across multiple patient cohorts</li>
          <li>Clinical utility across diverse prostate imaging applications</li>
        </ul>
      </div>

      <h3>DCE Analysis Module</h3>
      <p>The DCE Analysis module provides Dynamic Contrast Enhancement analysis using Non-negative Matrix Factorization (NMF) for temporal dynamics characterization and habitat identification within prostate tissue.</p>

      <h4>NMF Decomposition</h4>
      <p><strong>Purpose:</strong> Decompose temporal enhancement patterns into distinct habitat components representing spatial heterogeneity</p>

      <h5>Algorithm:</h5>
      <p>Non-negative Matrix Factorization separates the DCE time series into basis functions representing different perfusion habitats in prostate tissue</p>

      <h5>Clinical Significance:</h5>
      <p>Identifies distinct tumor habitats based on perfusion characteristics, including well-perfused, poorly-perfused, and intermediate regions that reflect tumor heterogeneity</p>

      <div style="background: linear-gradient(135deg, #dbeafe 0%, #3b82f6 100%); border: 2px solid #2563eb; border-radius: 12px; padding: 20px; margin: 20px 0; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <h5 style="color: #1e40af; margin-top: 0; font-size: 16px; font-weight: 600;">Mathematical Foundation:</h5>
        <div style="background: #ffffff; border-radius: 8px; padding: 16px; color: #0f172a; border: 1px solid #e5e7eb; font-family: 'Courier New', monospace; font-size: 14px; line-height: 1.8; overflow-x: auto;">
          <pre style="margin: 0; color: #0f172a; background: #ffffff !important;">DCE Matrix Factorization:
X ≈ WH

Where:
- X: Original DCE time series matrix (voxels × time points)
- W: Basis matrix (voxels × components)  
- H: Coefficient matrix (components × time points)
- Components represent distinct enhancement patterns</pre>
        </div>
      </div>

      <h4>Perfusion Analysis</h4>
      <p><strong>Purpose:</strong> Quantify prostate tissue perfusion characteristics using validated thresholds</p>

      <h5>Process:</h5>
      <ul>
        <li>Calculate enhancement curve characteristics for each voxel</li>
        <li>Apply zone-specific thresholds for well-perfused tissue identification</li>
        <li>Generate perfusion maps with statistical validation</li>
      </ul>

      <h4>Temporal Dynamics</h4>
      <p><strong>Purpose:</strong> Analyze enhancement curve characteristics including wash-in and wash-out patterns</p>

      <h5>Metrics:</h5>
      <ul>
        <li><strong>Peak Enhancement:</strong> Maximum signal intensity increase</li>
        <li><strong>Time to Peak:</strong> Time point of maximum enhancement</li>
        <li><strong>Wash-out Rate:</strong> Signal decay characteristics</li>
        <li><strong>Area Under Curve:</strong> Total enhancement over time</li>
      </ul>

      <h3>ADC Analysis Module</h3>
      <p>The ADC Analysis module calculates Apparent Diffusion Coefficient features with zone-specific thresholds to identify distinct diffusion habitats within prostate tissue for risk stratification.</p>

      <h4>Zone-Specific Methodology</h4>
      <p><strong>Scientific Rationale:</strong> Different prostate zones (Peripheral Zone and Transition Zone) have distinct tissue characteristics requiring zone-specific analysis thresholds validated through clinical studies. Habitat Risk Scoring leverages these differences to identify high-risk tumor habitats based on restricted diffusion patterns.</p>

      <div class="highlight">
        <h5>Peripheral Zone Analysis</h5>
        <p><strong>Tissue Characteristics:</strong> Higher baseline ADC values due to glandular tissue composition</p>
        
        <h6>Validated Thresholds:</h6>
        <ul>
          <li><strong>High Risk (<850 ×10⁻⁶ mm²/s):</strong> Highly suspicious for malignancy</li>
          <li><strong>Medium Risk (850-1050 ×10⁻⁶ mm²/s):</strong> Intermediate suspicion</li>
          <li><strong>Low Risk (>1050 ×10⁻⁶ mm²/s):</strong> Low suspicion for malignancy</li>
        </ul>

        <h5>Transition Zone Analysis</h5>
        <p><strong>Tissue Characteristics:</strong> Lower baseline ADC values due to stromal tissue and BPH (Benign Prostatic Hyperplasia) changes</p>
        
        <h6>Validated Thresholds:</h6>
        <ul>
          <li><strong>High Risk (<600 ×10⁻⁶ mm²/s):</strong> Highly suspicious for malignancy</li>
          <li><strong>Medium Risk (600-750 ×10⁻⁶ mm²/s):</strong> Intermediate suspicion</li>
          <li><strong>Low Risk (>750 ×10⁻⁶ mm²/s):</strong> Low suspicion for malignancy</li>
        </ul>
      </div>

      <h3>T2 Analysis Module</h3>
      <p>The T2 Analysis module processes T2-weighted images for anatomical correlation and tissue characterization in the prostate.</p>

      <h4>T2 Signal Analysis</h4>
      <p><strong>Purpose:</strong> Analyze T2 signal characteristics for anatomical correlation and prostate tissue characterization</p>

      <h5>Components:</h5>
      <ul>
        <li><strong>Signal Intensity Analysis:</strong> Quantitative T2 signal measurement</li>
        <li><strong>Spatial Resolution:</strong> High-resolution anatomical detail</li>
        <li><strong>Contrast Optimization:</strong> Enhanced tissue differentiation</li>
      </ul>

      <h3>Alpha Weighting Module</h3>
      <p>The Alpha Weighting module integrates DCE, ADC, and T2 components using validated weighting strategies to generate comprehensive habitat-based risk scores.</p>

      <h4>Multi-Modal Integration Theory</h4>
      <p><strong>Scientific Rationale:</strong> Each imaging modality provides complementary information about distinct tumor habitat characteristics. Optimal integration of these multi-parametric features enables comprehensive assessment of spatial heterogeneity and tumor aggressiveness.</p>

      <h5>Component Contributions:</h5>
      <ul>
        <li><strong>DCE Component:</strong> Perfusion and vascular characteristics of prostate tissue</li>
        <li><strong>ADC Component:</strong> Cellular density and tissue microstructure</li>
        <li><strong>T2 Component:</strong> Anatomical detail and tissue composition</li>
      </ul>

      <h3>HRS Integration and Results</h3>
      <p>The final HRS integration combines all analysis components to generate comprehensive habitat-based risk scores and spatial heterogeneity maps.</p>

      <h4>HRS Score Integration</h4>
      <p>The final Habitat Risk Scoring analysis integrates DCE, ADC, and T2 components using alpha weighting parameters to generate comprehensive risk assessment results that reflect tumor habitat characteristics and spatial heterogeneity.</p>

      <h4>Output Generation</h4>
      <p><strong>Comprehensive Results Package:</strong></p>
      <ul>
        <li><strong>Habitat Risk Maps:</strong> Pixel-wise habitat characterization with color-coded risk visualization</li>
        <li><strong>Zone-Specific Analysis:</strong> Separate habitat analysis for peripheral and transition zones</li>
        <li><strong>Spatial Heterogeneity Metrics:</strong> Quantitative assessment of tumor habitat diversity</li>
        <li><strong>Statistical Summaries:</strong> Habitat distribution and population statistics</li>
        <li><strong>Quality Metrics:</strong> Analysis quality indicators and validation measures</li>
        <li><strong>Clinical Reports:</strong> Structured habitat-based risk reports for clinical interpretation</li>
      </ul>
    `
  },

  "hrs-cloud-troubleshooting": {
    title: "HRS Cloud - Troubleshooting",
    content: `
      <h3>Troubleshooting Overview</h3>
      <p>This section provides solutions for common issues encountered when using HRS Cloud.</p>

      <h3>Common Issues</h3>

      <div class="step-container">
        <h4>Login Problems</h4>
        <ul>
          <li><strong>Invalid Credentials:</strong> Verify email and password with administrator</li>
          <li><strong>Account Locked:</strong> Contact support to unlock account</li>
          <li><strong>License Expired:</strong> Contact support for license renewal</li>
        </ul>
      </div>

      <div class="step-container">
        <h4>Data Upload Issues</h4>
        <ul>
          <li><strong>Upload Failures:</strong> Check DICOM format and prostate MRI data structure</li>
          <li><strong>Corrupted Files:</strong> Re-upload files and verify integrity</li>
          <li><strong>Missing Series:</strong> Ensure DCE, ADC, and T2 series are present</li>
          <li><strong>File Size Limits:</strong> Check maximum file size restrictions</li>
        </ul>
      </div>

      <div class="step-container">
        <h4>HRS Processing Issues</h4>
        <ul>
          <li><strong>Processing Failures:</strong> Check system status and parameter validity</li>
          <li><strong>Memory Errors:</strong> Reduce dataset size or contact support</li>
          <li><strong>Timeout Errors:</strong> Check network connection and try again</li>
          <li><strong>DCE Processing Failures:</strong> Verify temporal series completeness</li>
          <li><strong>ADC Threshold Errors:</strong> Check zone-specific parameter ranges</li>
          <li><strong>Parameter Validation Errors:</strong> Ensure alpha weights sum to 1.0</li>
        </ul>
      </div>

      <h3>Performance Optimization</h3>
      <ul>
        <li><strong>Browser Cache:</strong> Clear cache and cookies regularly</li>
        <li><strong>Network Speed:</strong> Use stable, high-speed internet connection</li>
        <li><strong>Dataset Size:</strong> Consider processing large datasets in batches</li>
        <li><strong>Parameter Optimization:</strong> Use validated parameter presets for optimal performance</li>
      </ul>

      <h3>Getting Additional Help</h3>
      <p>If you continue to experience issues:</p>

      <h4>Support Channels</h4>
      <ul>
        <li><strong>Technical Support:</strong> Contact our support team for technical assistance</li>
        <li><strong>User Community:</strong> Join user forums for peer support</li>
        <li><strong>Training:</strong> Consider additional training sessions</li>
      </ul>

      <h4>Information to Provide</h4>
      <p>When contacting support, please provide:</p>
      <ul>
        <li>Browser type and version</li>
        <li>Error messages and screenshots</li>
        <li>Steps to reproduce the issue</li>
        <li>Dataset characteristics (if applicable)</li>
        <li>Network environment details</li>
      </ul>
    `
  },

  "hrs-cloud-reference": {
    title: "HRS Cloud - Reference",
    content: `
      <h3>Reference Information</h3>
      <p>This section provides comprehensive reference information for HRS Cloud, including browser requirements, file formats, and security information.</p>

      <h3>Browser Requirements</h3>
      
      <h4>Supported Browsers</h4>
      <ul>
        <li><strong>Chrome:</strong> Version 90+ (recommended)</li>
        <li><strong>Firefox:</strong> Version 88+</li>
        <li><strong>Safari:</strong> Version 14+</li>
        <li><strong>Edge:</strong> Version 90+</li>
      </ul>

      <h4>Browser Settings</h4>
      <ul>
        <li><strong>JavaScript:</strong> Must be enabled</li>
        <li><strong>Cookies:</strong> Required for session management</li>
      </ul>

      <h3>File Formats</h3>
      
      <h4>Supported Input Formats</h4>
      <ul>
        <li><strong>DICOM:</strong> .dcm, .dicom (primary format for prostate MRI)</li>
        <li><strong>NIfTI:</strong> .nii, .nii.gz</li>
        <li><strong>MHA:</strong> .mha, .mhd</li>
      </ul>

      <h4>Supported Output Formats</h4>
      <ul>
        <li><strong>CSV:</strong> HRS metrics and statistics</li>
        <li><strong>NIfTI:</strong> Risk stratification volumes</li>
        <li><strong>PDF:</strong> HRS analysis reports</li>
        <li><strong>JSON:</strong> HRS sessions and configurations</li>
      </ul>

      <h3>Security</h3>
      
      <h4>Data Protection</h4>
      <ul>
        <li><strong>Encryption:</strong> AES-256 encryption for patient data</li>
        <li><strong>Transmission:</strong> TLS 1.3 for data in transit</li>
        <li><strong>Storage:</strong> Encrypted cloud storage for prostate imaging data</li>
        <li><strong>Access:</strong> Role-based access control for HRS results</li>
      </ul>

      <h3>Version Information</h3>
      <div class="info-box">
        <p><strong>Version:</strong> 2.0 Cloud<br />
        <strong>Date:</strong> October 2025<br />
        <strong>Platform:</strong> Web-Based Habitat Risk Scoring Platform</p>
      </div>

      <h3>Support and Contact</h3>
      <p>For technical support, training, or additional information:</p>
      <ul>
        <li><strong>Technical Support:</strong> Contact our support team for assistance with configuration and troubleshooting</li>
        <li><strong>Training:</strong> Available training sessions for users and administrators</li>
        <li><strong>Documentation:</strong> Complete user guides and technical documentation available</li>
        <li><strong>Updates:</strong> Regular updates and improvements based on user feedback</li>
      </ul>
    `
  }
};

export default function DocumentationPage() {
  const [activeSection, setActiveSection] = useState<string>("radview-desktop-overview");
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    radview: true,
    hrs: false
  });
  const [expandedSubsections, setExpandedSubsections] = useState<Record<string, boolean>>({
    "radview-desktop": true,
    "radview-cloud": false,
    "hrs-desktop": false,
    "hrs-cloud": false
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const toggleSubsection = (subsectionKey: string) => {
    setExpandedSubsections(prev => ({
      ...prev,
      [subsectionKey]: !prev[subsectionKey]
    }));
  };

  const getCurrentContent = () => {
    return contentData[activeSection as keyof typeof contentData] || { title: "Not Found", content: "<p>Content not found.</p>" };
  };

  // Search functionality
  const searchContent = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    const results: any[] = [];
    const query = searchQuery.toLowerCase();
    
    // Search through all content
    Object.entries(contentData).forEach(([key, content]) => {
      const title = content.title.toLowerCase();
      const contentText = content.content.toLowerCase();
      
      if (title.includes(query) || contentText.includes(query)) {
        results.push({
          id: key,
          title: content.title,
          content: content.content,
          section: key.split('-')[0],
          subsection: key.split('-').slice(1).join('-'),
          matchType: title.includes(query) ? 'title' : 'content'
        });
      }
    });
    
    return results;
  }, [searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSearchResults(searchContent);
  };

  const handleSearchResultClick = (result: any) => {
    console.log('Search result clicked:', result);
    
    // Extract section and subsection from the result ID
    const [sectionKey, ...subsectionParts] = result.id.split('-');
    const subsectionKey = subsectionParts.join('-');
    
    console.log('Section key:', sectionKey, 'Subsection key:', subsectionKey);
    
    // Expand the main section if it's not already expanded
    setExpandedSections(prev => {
      const newSections = {
        ...prev,
        [sectionKey]: true
      };
      console.log('Updated sections:', newSections);
      return newSections;
    });
    
    // Expand the subsection if it's not already expanded
    setExpandedSubsections(prev => {
      const newSubsections = {
        ...prev,
        [subsectionKey]: true
      };
      console.log('Updated subsections:', newSubsections);
      return newSubsections;
    });
    
    // Set the active section
    setActiveSection(result.id);
    console.log('Set active section to:', result.id);
    
    // Close search and sidebar
    setIsSearchOpen(false);
    setSearchQuery("");
    setSearchResults([]);
    setSidebarOpen(false);
  };

  const handleContentClick = (sectionKey: string, contentId: string) => {
    const fullId = `${sectionKey}-${contentId}`;
    setActiveSection(fullId);
    setSidebarOpen(false); // Close mobile sidebar
    
    // Scroll to top of the page when switching sections
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="docs-mobile-header">
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="docs-mobile-menu-button"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <h1 className="docs-mobile-title">Documentation</h1>
        <div className="docs-search-icon" onClick={() => setIsSearchOpen(!isSearchOpen)}>
          <Search size={20} />
        </div>
      </div>

      {/* Search Overlay */}
      {isSearchOpen && (
        <div 
          className="docs-search-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsSearchOpen(false);
            }
          }}
        >
          <div className="docs-search-container">
            <div className="docs-search-header">
              <h3>Search Documentation</h3>
              <button 
                className="docs-search-close"
                onClick={() => setIsSearchOpen(false)}
              >
                <X size={20} />
              </button>
            </div>
            <div className="docs-search-input-container">
              <Search size={20} className="docs-search-input-icon" />
              <input
                type="text"
                placeholder="Search documentation..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="docs-search-input"
                autoFocus
              />
            </div>
            {searchResults.length > 0 && (
              <div className="docs-search-results">
                {searchResults.map((result, index) => (
                  <div
                    key={index}
                    className="docs-search-result"
                    onClick={() => handleSearchResultClick(result)}
                  >
                    <div className="docs-search-result-title">
                      {result.title}
                    </div>
                    <div className="docs-search-result-section">
                      {result.section} - {result.subsection}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {searchQuery && searchResults.length === 0 && (
              <div className="docs-search-no-results">
                No results found for "{searchQuery}"
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="docs-mobile-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="docs-container">
        {/* Left Sidebar - Integrated Navigation with TOC */}
        <aside className={`docs-main-sidebar ${sidebarOpen ? 'docs-sidebar-open' : ''}`}>
          <div className="docs-sidebar-header">
            <h2 className="docs-sidebar-title">Documentation</h2>
            <div className="docs-search-icon" onClick={() => setIsSearchOpen(!isSearchOpen)}>
              <Search size={20} />
            </div>
          </div>
          
          <nav className="docs-nav">
            {Object.entries(documentationStructure).map(([sectionKey, section]) => {
              const isExpanded = expandedSections[sectionKey];
              const Icon = section.icon;
              
              return (
                <div key={sectionKey} className="docs-nav-section">
                  <button
                    onClick={() => toggleSection(sectionKey)}
                    className="docs-nav-section-button"
                  >
                    <Icon size={20} />
                    <span>{section.title}</span>
                    {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </button>
                  
                  {isExpanded && (
                    <div className="docs-nav-subsection">
                      {Object.entries(section.subsections).map(([subKey, subsection]) => {
                        const SubIcon = subsection.icon;
                        const subsectionKey = `${sectionKey}-${subKey}`;
                        const isSubsectionExpanded = expandedSubsections[subsectionKey];
                        
                        return (
                          <div key={subKey} className="docs-subsection-container">
                            <button
                              onClick={() => toggleSubsection(subsectionKey)}
                              className="docs-nav-subsection-button"
                            >
                              <SubIcon size={16} />
                              <span>{subsection.title}</span>
                              {isSubsectionExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                            </button>
                            
                            {isSubsectionExpanded && (
                              <div className="docs-toc-container">
                                {subsection.content.map((contentItem) => {
                                  const fullId = `${sectionKey}-${subKey}-${contentItem.id}`;
                                  const isActive = activeSection === fullId;
                                  
                                  return (
                                    <button
                                      key={contentItem.id}
                                      onClick={() => handleContentClick(`${sectionKey}-${subKey}`, contentItem.id)}
                                      className={`docs-toc-item ${isActive ? 'docs-toc-item-active' : ''}`}
                                    >
                                      {contentItem.title}
                                    </button>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="docs-main">
          <div className="docs-content">
            <div className="docs-content-header">
              <h1 className="docs-content-title">{getCurrentContent().title}</h1>
            </div>
            <div 
              className="docs-content-body"
              dangerouslySetInnerHTML={{ __html: getCurrentContent().content }}
            />
          </div>
        </main>
      </div>
    </>
  );
}
