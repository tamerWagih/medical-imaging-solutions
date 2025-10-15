"use client";

import { useState, useEffect } from "react";
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
          { id: "getting-started", title: "Getting Started" },
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
  // HRS placeholders
  "hrs-desktop-overview": {
    title: "HRS Desktop Overview",
    content: `<p>HRS Desktop documentation coming soon...</p>`
  },
  "hrs-desktop-getting-started": {
    title: "HRS Desktop Getting Started",
    content: `<p>HRS Desktop getting started guide coming soon...</p>`
  },
  "hrs-desktop-troubleshooting": {
    title: "HRS Desktop Troubleshooting",
    content: `<p>HRS Desktop troubleshooting guide coming soon...</p>`
  },
  "hrs-desktop-reference": {
    title: "HRS Desktop Reference",
    content: `<p>HRS Desktop reference coming soon...</p>`
  },
  "hrs-cloud-overview": {
    title: "HRS Cloud Overview",
    content: `<p>HRS Cloud documentation coming soon...</p>`
  },
  "hrs-cloud-getting-started": {
    title: "HRS Cloud Getting Started",
    content: `<p>HRS Cloud getting started guide coming soon...</p>`
  },
  "hrs-cloud-troubleshooting": {
    title: "HRS Cloud Troubleshooting",
    content: `<p>HRS Cloud troubleshooting guide coming soon...</p>`
  },
  "hrs-cloud-reference": {
    title: "HRS Cloud Reference",
    content: `<p>HRS Cloud reference coming soon...</p>`
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

  const handleContentClick = (sectionKey: string, contentId: string) => {
    const fullId = `${sectionKey}-${contentId}`;
    setActiveSection(fullId);
    setSidebarOpen(false); // Close mobile sidebar
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
        <div className="docs-search-icon">
          <Search size={20} />
        </div>
      </div>

      <div className="docs-container">
        {/* Left Sidebar - Integrated Navigation with TOC */}
        <aside className={`docs-main-sidebar ${sidebarOpen ? 'docs-sidebar-open' : ''}`}>
          <div className="docs-sidebar-header">
            <h2 className="docs-sidebar-title">Documentation</h2>
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
