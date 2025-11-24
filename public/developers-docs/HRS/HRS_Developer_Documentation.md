# Habitat Risk Scoring (HRS) - Developer Documentation

**Version 2.0 - Developer Edition**  
**Document Date: November 2025**  
**Advanced Prostate MRI Analysis System - Technical Reference**

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
   - 1.1 [System Architecture](#11-system-architecture)
   - 1.2 [Technology Stack](#12-technology-stack)
   - 1.3 [Component Overview](#13-component-overview)
   - 1.4 [Data Flow](#14-data-flow)

2. [HRSParams C++ Project](#2-hrsparams-c-project)
   - 2.1 [Project Structure](#21-project-structure)
   - 2.2 [Core Classes](#22-core-classes)
   - 2.3 [Module Drivers](#23-module-drivers)
   - 2.4 [Parameter Management](#24-parameter-management)
   - 2.5 [Process Management](#25-process-management)

3. [HRS2 Java Project](#3-hrs2-java-project)
   - 3.1 [Project Structure](#31-project-structure)
   - 3.2 [Core Classes](#32-core-classes)
   - 3.3 [NMF Processing](#33-nmf-processing)
   - 3.4 [Image and Mask Handling](#34-image-and-mask-handling)
   - 3.5 [Matrix Operations](#35-matrix-operations)

4. [Integration and Communication](#4-integration-and-communication)
   - 4.1 [C++ to Java Communication](#41-c-to-java-communication)
   - 4.2 [Data Format Standards](#42-data-format-standards)
   - 4.3 [Parameter Passing](#43-parameter-passing)
   - 4.4 [Error Handling](#44-error-handling)

5. [Pipeline Execution Flow](#5-pipeline-execution-flow)
   - 5.1 [Step 1: Preprocessing](#51-step-1-preprocessing)
   - 5.2 [Step 2: Normalization and Registration](#52-step-2-normalization-and-registration)
   - 5.3 [Step 3: Java Processing](#53-step-3-java-processing)
   - 5.4 [Step 4: Export and Visualization](#54-step-4-export-and-visualization)

6. [Build System and Deployment](#6-build-system-and-deployment)
   - 6.1 [C++ Build Configuration](#61-c-build-configuration)
   - 6.2 [Java Build Configuration](#62-java-build-configuration)
   - 6.3 [Dependencies](#63-dependencies)
   - 6.4 [Deployment Process](#64-deployment-process)

7. [Extension Points](#7-extension-points)
   - 7.1 [Adding New Parameters](#71-adding-new-parameters)
   - 7.2 [Custom Processing Steps](#72-custom-processing-steps)
   - 7.3 [Report Generation](#73-report-generation)
   - 7.4 [Algorithm Modifications](#74-algorithm-modifications)

8. [Code Reference](#8-code-reference)
   - 8.1 [Key Methods and Functions](#81-key-methods-and-functions)
   - 8.2 [Data Structures](#82-data-structures)
   - 8.3 [Constants and Configuration](#83-constants-and-configuration)

---

## 1. Architecture Overview

### 1.1 System Architecture

The HRS system is a hybrid C++/Java application designed for multi-parametric prostate MRI analysis. The architecture follows a modular pipeline pattern with clear separation between:

- **User Interface Layer (C++/Qt)**: `HRSParams` - GUI application for parameter configuration and process management
- **Processing Layer (C++)**: `HRSPipelineDriver` - Orchestrates preprocessing, normalization, and export
- **Analysis Layer (Java)**: `HRS2` - Performs core NMF analysis and habitat risk scoring
- **Report Generation (C++)**: `HRSReportsDriver` - Generates clinical reports and visualizations

```
┌─────────────────────────────────────────────────────────────┐
│                    HRSParams (C++/Qt GUI)                   │
│  - Parameter Configuration                                  │
│  - Case Management                                          │
│  - Process Orchestration                                     │
│  - Progress Monitoring                                      │
└────────────────────┬────────────────────────────────────────┘
                      │
                      │ JSON Parameters
                      │
         ┌────────────┴────────────┐
         │                          │
┌────────▼────────┐      ┌─────────▼──────────┐
│ HRSPipelineDriver│      │ HRSReportsDriver   │
│   (C++ Module)   │      │   (C++ Module)     │
│                  │      │                    │
│ Step 1: Preproc  │      │ Report Generation │
│ Step 2: Norm/Reg │      │ Statistics Export  │
│ Step 3: Java    │      │ Visualization      │
│ Step 4: Export   │      │                    │
└────────┬─────────┘      └────────────────────┘
         │
         │ MHA Files + JSON
         │
┌────────▼─────────┐
│   HRS2 (Java)    │
│                  │
│ - NMF Analysis   │
│ - DCE Processing │
│ - ADC Processing │
│ - T2 Processing  │
│ - HRS Scoring    │
└────────┬─────────┘
         │
         │ MHA Masks
         │
┌────────▼─────────┐
│  Output Files    │
│  - MHA Masks     │
│  - Grid Images   │
│  - Reports       │
└──────────────────┘
```

### 1.2 Technology Stack

**C++ Components:**
- **Framework**: Qt 6.x (GUI, Process Management, JSON)
- **Image Processing**: ITK (Insight Toolkit) for medical image processing
- **Build System**: Visual Studio 2022+ (Windows), CMake (cross-platform)
- **Libraries**: 
  - SimpleITK for image I/O
  - QCustomPlot for graph generation
  - XLSX for Excel report generation
  - Boost for mathematical operations

**Java Components:**
- **JDK**: Java 21
- **Image Processing**: SimpleITK Java bindings
- **NMF Library**: Custom implementation (pnet package)
- **Dependencies**:
  - Apache Commons Math 3.5 (statistics)
  - WEKA (NNLS solver)
  - JSON (20230618) for parameter parsing

**Data Formats:**
- **MHA (MetaImage)**: Primary 3D volume format
- **DICOM**: Input medical imaging format
- **JSON**: Parameter configuration and metadata
- **CSV**: Intermediate data exchange

### 1.3 Component Overview

#### HRSParams (C++ GUI Application)
- **Purpose**: Main user interface for HRS analysis
- **Key Responsibilities**:
  - Parameter configuration and validation
  - Case selection and management
  - Process spawning and monitoring
  - Progress tracking and logging
  - JSON parameter file management

#### HRSPipelineDriver (C++ Processing Module)
- **Purpose**: Orchestrates the 4-step HRS pipeline
- **Key Responsibilities**:
  - DICOM preprocessing and validation
  - Image normalization and registration
  - Java process invocation
  - Output export and visualization

#### HRS2 (Java Analysis Engine)
- **Purpose**: Core analysis engine for habitat risk scoring
- **Key Responsibilities**:
  - Non-negative Matrix Factorization (NMF) for DCE analysis
  - ADC and T2 threshold-based processing
  - Alpha-weighted integration
  - Habitat mask generation

#### HRSReportsDriver (C++ Report Generator)
- **Purpose**: Generates clinical reports and statistics
- **Key Responsibilities**:
  - Statistical analysis and metrics calculation
  - Grid image generation
  - PowerPoint report creation
  - Excel statistics export

### 1.4 Data Flow

**Input Data Flow:**
1. User selects data folder containing ZIP files
2. HRSParams extracts and validates case structure
3. HRSPipelineDriver processes DICOM files
4. Images converted to MHA format for Java processing

**Processing Flow:**
1. **Preprocessing**: DICOM → MHA conversion, protocol identification
2. **Normalization**: T2 normalization, DCE muscle reference
3. **Registration**: Spatial alignment using Elastix
4. **Java Processing**: NMF analysis, mask generation
5. **Export**: MHA masks → Grid images, reports

**Output Data Flow:**
1. Java generates MHA mask files
2. C++ reads masks for visualization
3. Grid images and reports generated
4. Statistics exported to Excel/JSON

---

## 2. HRSParams C++ Project

### 2.1 Project Structure

```
HRSParams/
├── HRSParams/                    # Main GUI application
│   ├── HRSParams.h              # Main window class header
│   ├── HRSParams.cpp            # Main window implementation
│   ├── HRSParams.ui             # Qt Designer UI file
│   ├── HRSParams.qrc            # Resource file
│   ├── main.cpp                 # Application entry point
│   ├── ListItemWithProgressBar.h # Custom list widget item
│   └── csDarkStyle.h            # UI styling
│
├── ModuleDrivers/               # Processing modules
│   ├── HRSPipelineDriver.h      # Pipeline driver header
│   ├── HRSPipelineDriver.cpp    # Pipeline driver implementation
│   ├── HRSPipelineDriver_Step1.cpp  # Step 1: Preprocessing
│   ├── HRSPipelineDriver_Step2.cpp   # Step 2: Normalization
│   ├── HRSPipelineDriver_Step3.cpp   # Step 3: Java invocation
│   ├── HRSPipelineDriver_Step4.cpp   # Step 4: Export
│   ├── HRSReportsDriver.h       # Reports driver header
│   ├── HRSReportsDriver.cpp      # Reports driver implementation
│   └── Utilities.h              # Utility functions
│
├── HRSPipelineWriter/           # Standalone pipeline executable
│   └── main.cpp                 # Pipeline entry point
│
├── HRSReportsWriter/            # Standalone reports executable
│   └── main.cpp                 # Reports entry point
│
└── UnitTests/                   # Unit test suite
    └── ModuleDriversTests.cpp
```

### 2.2 Core Classes

#### HRSParams Class

**Location**: `HRSParams/HRSParams.h`, `HRSParams/HRSParams.cpp`

**Purpose**: Main application window managing user interface, parameter configuration, and process orchestration.

**Key Member Variables:**
```cpp
// Parameter storage
Qt::CheckState m_useDCE, m_useADC, m_useT2;
QString m_numberOfCurves, m_contribution, m_wPercentile;
QString m_highPZADC, m_mediumPZADC, m_lowPZADC;
// ... (see header for complete list)

// Process management
QMap<QString, QProcess*> m_caseProcesses;
QStringList m_caseQueue;
int m_maxConcurrentProcesses;
int m_runningProcesses;

// Case management
QMap<QString, CaseStatus> m_caseStatus;
QMap<QString, QTextEdit*> m_caseTextEdits;
QMap<QString, QFile*> m_logFiles;
```

**Key Methods:**

**Parameter Management:**
- `setHRSParamsValues()`: Updates UI from member variables
- `saveHRSParamsToJson()`: Serializes parameters to JSON
- `loadHRSParamsFromJson()`: Loads parameters from JSON
- `validateHRSParams()`: Validates parameter consistency
- `setDefaultsParams()`: Initializes default values

**Process Management:**
- `startHRSPipelineProcesses()`: Starts processing for selected cases
- `startProcessForCase()`: Spawns individual case process
- `processFinished_slt()`: Handles process completion
- `readProcessOutput_slt()`: Parses process stdout
- `readProcessError_slt()`: Parses process stderr
- `killHRSPipelineProcesses()`: Terminates all processes

**Case Management:**
- `loadData()`: Scans and loads case data
- `scanProcessedCasesForPipeline()`: Identifies processed cases
- `validateCaseHRSParams()`: Validates case-specific parameters
- `updateListWidgetItemColor()`: Updates UI status indicators

**Key Implementation Details:**

1. **Concurrent Processing**: Uses `QProcess` with a queue system to manage multiple concurrent case processing. The `m_maxConcurrentProcesses` is calculated based on system RAM and storage type (SSD vs HDD).

2. **Message Parsing**: Processes output from child processes using a custom logger format:
   ```
   [HH:MM:SS.mmm] [Type] {PatientID} Message
   ```

3. **Parameter Validation**: Real-time validation of:
   - Alpha weights must sum to 1.0 per zone
   - Numeric ranges for thresholds
   - Required protocol availability

4. **State Management**: Maintains original UI state for restoration after processing completes.

#### HRSPipelineDriver Class

**Location**: `ModuleDrivers/HRSPipelineDriver.h`, `ModuleDrivers/HRSPipelineDriver.cpp`

**Purpose**: Orchestrates the complete HRS processing pipeline for one or more patients.

**Key Member Variables:**
```cpp
QStringList m_patientsID;
QString m_jsonFilePath;
QString m_dataPath, m_outputPath;
bool m_useDCE, m_useADC, m_useT2;
bool m_useRegistration, m_checkRegistrationNeed;
QSystemSemaphore* m_javaSemaphore;  // Synchronization for Java processes
QSystemSemaphore* m_normSemaphore;   // Synchronization for normalization
```

**Key Methods:**

**Pipeline Orchestration:**
- `processPatientPipeline()`: Main entry point for desktop pipeline
- `processCloudPipeline()`: Cloud-specific pipeline variant
- `processSinglePatientDesktop()`: Processes single patient
- `executeStep1_Preprocessing()`: Step 1 execution
- `executeStep2_NormalizationAndRegistration()`: Step 2 execution
- `executeStep3_JavaProcessing()`: Step 3 execution
- `executeStep4_Export()`: Step 4 execution

**Step 1 - Preprocessing:**
- `preprocessPatientFiles()`: Main preprocessing function
- `getCasesNamesFromPatient()`: Extracts case names from patient folder
- `processStudyDirs()`: Processes study directories
- `standardizeStudiesAndProtocolsNames()`: Normalizes naming
- `splitDCEDir()`: Splits DCE series into timepoints
- `validateDicomFilesLength()`: Validates DICOM file integrity

**Step 2 - Normalization and Registration:**
- `normalizeStudyT2Series()`: Normalizes T2 images
- `registerStudySeries()`: Registers images to template
- `checkRegistrationNeed()`: Determines if registration is needed
- `registerImageToTemplate()`: Performs image registration
- `zAlignImageToTemplate()`: Z-axis alignment
- `alignImageToTemplate()`: Full 3D alignment

**Step 3 - Java Processing:**
- `callJavaCode()`: Invokes Java HRS2 application
  - Constructs command: `java -jar HRS2.jar <casePath> <jsonPath>`
  - Uses semaphore for concurrent Java process limiting
  - Monitors process output for errors

**Step 4 - Export:**
- `exportStudyOutput()`: Main export function
- `exportHRSMasksAndLabelImages()`: Exports MHA masks
- `ExportHRSQuadrantsGrid()`: Generates grid visualizations
- `exportHRSMetricsTable()`: Exports statistics tables
- `exportQuadrantsGridPPT()`: Creates PowerPoint presentations

**Key Implementation Details:**

1. **Error Handling**: Comprehensive exception handling with detailed logging. Errors are propagated with patient ID context.

2. **Synchronization**: Uses `QSystemSemaphore` to limit concurrent:
   - Java processes (prevents memory exhaustion)
   - Normalization processes (prevents GPU conflicts)

3. **Registration Strategy**: 
   - Checks if registration is needed by comparing spatial properties
   - Uses Elastix for 2D/3D registration
   - Falls back to simple alignment if registration fails

4. **Protocol Detection**: Intelligent DICOM tag reading to identify ADC, DCE, T2, and RT protocols even with non-standard naming.

#### HRSReportsDriver Class

**Location**: `ModuleDrivers/HRSReportsDriver.h`, `ModuleDrivers/HRSReportsDriver.cpp`

**Purpose**: Generates comprehensive clinical reports from processed HRS data.

**Key Data Structures:**
```cpp
struct MaskStats {
    QVector<double> maskAccuracy;
    QVector<QVector<double>> slicesAccuracy;
    QVector<double> maskPrecision;
    QVector<QVector<double>> slicesPrecision;
    QVector<double> maskSensitivity;
    // ...
};

struct CaseStats {
    QString caseName;
    QVector<double> adcMasksAccuracy;
    QVector<double> dceMasksAccuracy;
    QVector<double> hrsMasksAccuracy;
    // ...
};
```

**Key Methods:**

**Report Generation:**
- `exportStudyReports()`: Main report generation entry point
- `exportHRSQuadrantMetricsTables()`: Quadrant-based statistics
- `exportHRSMetricsTables()`: Overall metrics tables
- `exportPatientStats()`: Patient-level statistics
- `exportCasesLesionsReports()`: Lesion comparison reports
- `exportCasesOutputVsBaselineReports()`: Baseline comparison
- `exportHRS2Reports()`: HRS2-specific reports
- `generateHRSVolumeReport()`: Volume analysis reports

**Statistical Analysis:**
- `calculateMasksStats()`: Computes accuracy, precision, sensitivity
- `calculateOverallAUCs()`: Area Under Curve calculations
- `calculatePearsonCorrelation()`: Correlation analysis
- `evaluateMasks()`: Mask evaluation metrics

**Visualization:**
- `createQuadrantsGridsReport()`: Grid image generation
- `overlayLabelOnImage()`: Label overlay on images
- `exportPPTReport()`: PowerPoint report creation

**Key Implementation Details:**

1. **Statistical Methods**: Uses boost::math for Student's t-test and other statistical operations.

2. **Excel Integration**: Uses QXlsx library for Excel file generation with proper formatting.

3. **Image Processing**: Leverages ITK and Qt for image manipulation and overlay generation.

4. **Report Types**: Supports multiple report types:
   - Metrics reports (sensitivity, specificity, PPV, NPV, AUC)
   - Grid reports (quadrant visualizations)
   - Patient stats (correlation analysis)
   - Lesion reports (comparison with ground truth)
   - Volume reports (habitat volume analysis)

### 2.3 Module Drivers

The module driver architecture separates concerns into distinct executable modules:

**HRSPipelineWriter** (`HRSPipelineWriter/main.cpp`):
- Standalone executable for pipeline processing
- Command-line interface: `HRSPipelineWriter.exe <jsonPath> <patientID>`
- Used by HRSParams to spawn individual case processes

**HRSReportsWriter** (`HRSReportsWriter/main.cpp`):
- Standalone executable for report generation
- Command-line interface: `HRSReportsWriter.exe <jsonPath>`
- Processes all cases specified in JSON configuration

### 2.4 Parameter Management

**JSON Structure:**
The parameter JSON file contains all HRS configuration:

```json
{
  "DataPath": "C:/Data",
  "OutputPath": "C:/Output",
  "useDCE": true,
  "useADC": true,
  "useT2": false,
  "curvesNumber": 3,
  "thresholdPercentage": 0.6,
  "zeroShiftPoints": 2,
  "dWwpTZTxt": 90.0,
  "WPercentile": 95.0,
  "NthPercentileSource": "ROI",
  "WashoutLower": 0.5,
  "WashoutUpper": 4.0,
  "nPZAlphaDCE": 0.50,
  "nPZAlphaADC": 0.25,
  "nPZAlphaT2": 0.25,
  "nTZAlphaDCE": 0.20,
  "nTZAlphaADC": 0.40,
  "nTZAlphaT2": 0.40,
  "nADCHighPz": 850,
  "nADCMedPz": 1050,
  "nADCLowPz": 1200,
  "nADCHighTz": 600,
  "nADCMedTz": 750,
  "nADCLowTz": 850,
  "noiseADC": 400,
  "ceilingADC": 1600,
  "volumeCleanThreshold": 0.01,
  "useRegistration": true,
  "checkRegistrationNeed": true
}
```

**Parameter Validation:**
- Alpha weights must sum to 1.0 within each zone (PZ and TZ)
- Threshold values must be in valid ranges
- Required protocols must be present for selected modalities

### 2.5 Process Management

**Concurrent Processing Strategy:**
1. Calculate `m_maxConcurrentProcesses` based on:
   - System RAM (1 case per 8GB RAM)
   - Storage type (SSD allows more concurrent processes)
   - Maximum of 4 concurrent processes

2. Queue Management:
   - Cases added to `m_caseQueue` when "Run" is clicked
   - Processes started sequentially up to `m_maxConcurrentProcesses`
   - When a process finishes, next case from queue is started

3. Process Communication:
   - Uses `QProcess` for subprocess management
   - Captures stdout/stderr for logging
   - Parses logger-formatted messages for UI updates

**Error Handling:**
- Process failures are tracked per case
- Error cases are marked in UI with red color
- Log files are saved to case output directories
- Process tree is killed on cancellation

---

## 3. HRS2 Java Project

### 3.1 Project Structure

```
HRS2/
├── src/
│   ├── launcher/
│   │   └── Launcher.java          # Main entry point
│   │
│   ├── UM/                        # Image and Mask utilities
│   │   ├── UMImage.java          # 3D/4D image wrapper
│   │   ├── UMMask.java           # Mask representation
│   │   ├── UMMaskImage.java      # Mask image operations
│   │   ├── UMMaskOperations.java # Mask set operations
│   │   └── UMPointI.java         # 3D point representation
│   │
│   ├── pnet/                     # NMF implementation
│   │   ├── NMF.java              # Abstract NMF base class
│   │   ├── NMFCostKL.java        # KL divergence NMF
│   │   ├── Matrix.java           # 2D matrix operations
│   │   ├── Matrix3D.java        # 3D matrix operations
│   │   └── MatrixUtilities.java  # Matrix utility functions
│   │
│   ├── nmf/                      # NMF computation
│   │   ├── NMFMatrixesComputation.java  # Main NMF computation
│   │   ├── NMFHelper.java        # NMF helper functions
│   │   ├── Statistics.java       # Statistical operations
│   │   └── GraphingData.java    # Graph visualization
│   │
│   ├── MHA/                      # MHA file I/O
│   │   └── MHAHandler.java       # MHA read/write operations
│   │
│   ├── csv/                      # CSV utilities
│   │   └── CSVHandler.java       # CSV read/write
│   │
│   └── weka/                     # WEKA integration
│       └── classifiers/functions/NNLS.java  # Non-negative least squares
│
└── lib/                          # External dependencies
    ├── simpleitk-2.3.1.jar
    ├── commons-math3-3.5.jar
    ├── weka.jar
    └── json-20230618.jar
```

### 3.2 Core Classes

#### Launcher Class

**Location**: `src/launcher/Launcher.java`

**Purpose**: Main entry point for HRS2 Java processing. Orchestrates the complete analysis workflow.

**Key Static Variables:**
```java
// Parameters (loaded from JSON)
private static boolean useDCE, useADC, useT2;
private static int curvesNumber;
private static float thresholdPercentage;
private static float nPZAlphaDCE, nPZAlphaADC, nPZAlphaT2;
private static float nTZAlphaDCE, nTZAlphaADC, nTZAlphaT2;
// ... (see source for complete list)

// Processing state
private static Matrix nmfPositions;      // NMF voxel positions
private static Matrix hrsDCE;             // DCE risk scores
private static Matrix hrsADC;             // ADC risk scores
private static Matrix hrsT2;              // T2 risk scores
private static float DCEScore;           // Overall DCE score
private static float DCEFeatureSum;       // DCE feature sum
```

**Key Methods:**

**Main Workflow:**
- `main(String[] args)`: Entry point, parses arguments and processes cases
- `runSession()`: Main processing session for a case
- `readArguments(String[] args)`: Parses command-line arguments
- `getUserParams(String[] args)`: Loads parameters from JSON file

**DCE Processing:**
- `createDCEMasks()`: Generates DCE-based habitat masks
  - Calls NMF computation
  - Calculates well-perfused regions
  - Computes DCE score and HRS values
  - Creates 10 DCE masks (DCE 1-10)

**ADC Processing:**
- `createADCMasks()`: Generates ADC-based habitat masks
  - Zone-specific threshold application (PZ vs TZ)
  - Linear interpolation for risk scoring
  - Creates 10 ADC masks (ADC 1-10)

**T2 Processing:**
- `createT2Masks()`: Generates T2-based habitat masks
  - Similar to ADC processing
  - Zone-specific thresholds
  - Creates 10 T2 masks (T2 1-10)

**Integration:**
- `approximateADC()`: Maps ADC mask values to NMF positions
- `approximateT2()`: Maps T2 mask values to NMF positions
- Alpha-weighted combination of DCE, ADC, T2 scores

**Key Implementation Details:**

1. **Argument Parsing**: 
   - Arg 0: Comma-separated case directory paths
   - Arg 1: JSON parameter file path
   - Validates paths and file existence

2. **Error Handling**: 
   - Comprehensive try-catch blocks
   - Logs errors with patient ID context
   - Continues processing remaining cases on failure

3. **Memory Management**: 
   - Processes cases sequentially to manage memory
   - Large 4D DCE images are memory-intensive
   - Consider increasing JVM heap size for large cases

4. **Logging Format**: 
   - Uses format: `[Type]: {PatientID} Message`
   - Types: INFO, ERROR, DEBUG
   - Compatible with C++ logger parser

#### UMImage Class

**Location**: `src/UM/UMImage.java`

**Purpose**: Wrapper for SimpleITK Image objects, providing convenient 3D/4D image operations.

**Key Member Variables:**
```java
public int m_nDimensions;        // 3 or 4
public Image m_image;            // SimpleITK Image (3D)
public List<Image> m_imagesList; // List of 3D images (4D)
public int m_nRows, m_nCols, m_nSlices, m_nTimePoints;
public double[][] m_pixelSize;   // Spacing information
```

**Key Methods:**
- `UMImage(String volImgFolderPath, int nDims)`: Loads MHA image from directory
- `Load3D(String path)`: Loads 3D MHA image
- `Load4D(String path)`: Loads 4D MHA (time series)
- `GetMatrix3D()`: Converts to Matrix3D for processing
- `GetMatrix4DTimePoint(int timePoint)`: Gets specific timepoint
- `GetPixel3D(int row, int col, int slice)`: Pixel accessor
- `GetPixel4D(int row, int col, int slice, int timePoint)`: 4D pixel accessor

**Key Implementation Details:**

1. **MHA Format**: Uses SimpleITK to read MHA (MetaImage) format files. MHA files contain header + raw data.

2. **4D Handling**: 4D images are stored as a list of 3D images, one per timepoint. Each timepoint is in a separate subdirectory.

3. **Coordinate System**: Uses (row, col, slice) indexing, where:
   - row = y-axis (height)
   - col = x-axis (width)
   - slice = z-axis (depth)

#### UMMask Class

**Location**: `src/UM/UMMask.java`

**Purpose**: Represents a binary mask as a set of 3D points. Provides mask operations and volume cleaning.

**Key Member Variables:**
```java
public List<UMPointI> m_points;  // Set of mask points
public int m_nPoints;             // Number of points
public String m_name;             // Mask identifier
public UMImage m_refImage;        // Reference image for dimensions
```

**Key Methods:**
- `UMMask(String name, UMImage refImage)`: Creates empty mask
- `setValue(UMPointI p, boolean b)`: Adds/removes point
- `getBooleanValue(UMPointI p)`: Checks if point is in mask
- `clean(float volumeCleanThreshold)`: Removes small connected components
- `GetAsMask(UMImage refImage)`: Converts to Matrix3D representation
- `Load(String filePath)`: Loads mask from MHA file

**Key Implementation Details:**

1. **Volume Cleaning**: Uses Union-Find algorithm to identify connected components, then filters by volume threshold.

2. **Point Storage**: Stores mask as a list of points rather than full 3D array for memory efficiency with sparse masks.

3. **Coordinate Validation**: All operations validate coordinates against reference image dimensions.

#### NMFMatrixesComputation Class

**Location**: `src/nmf/NMFMatrixesComputation.java`

**Purpose**: Performs Non-negative Matrix Factorization on DCE time series data.

**Key Member Variables:**
```java
public Matrix X;                  // Input matrix (voxels × timepoints)
public Matrix W;                  // Spatial component (voxels × curves)
public Matrix S;                  // Temporal component (curves × timepoints)
public Matrix Xindex;             // Voxel coordinates (voxels × 3)
public List<Integer> Wgroup;     // Group assignment for each voxel
public List<Integer> Srank;       // Rank of each temporal curve
public int CurvesNumber;          // Number of NMF components
public float ThresholdPercentage; // Contribution threshold
```

**Key Methods:**
- `computeWandS()`: Main NMF computation function
  - Extracts DCE time series from prostate mask
  - Applies zero-shifting baseline correction
  - Runs NMF algorithm
  - Groups voxels by dominant curve
  - Ranks temporal curves by washout characteristics

- `runNMF(Matrix X, int R)`: Executes NMF algorithm
  - Initializes W and H matrices
  - Uses NNLS for initial H estimation
  - Iterates KL divergence updates (500 iterations)
  - Returns factorized matrices

**Key Implementation Details:**

1. **NMF Algorithm**: Uses KL divergence cost function with multiplicative updates (Lee & Seung algorithm).

2. **Initialization**: 
   - W initialized with random normal values
   - H initialized using Non-Negative Least Squares (NNLS) solver

3. **Zero Shifting**: Removes baseline signal by subtracting mean of first N timepoints (configurable via `zeroShiftPoints`).

4. **Curve Ranking**: Temporal curves are ranked by their washout characteristics:
   - Fast washout (high rank) = well-perfused
   - Slow/no washout (low rank) = poorly-perfused

5. **Voxel Grouping**: Each voxel is assigned to the curve with highest contribution (above threshold percentage).

### 3.3 NMF Processing

**NMF Algorithm Flow:**

1. **Matrix Construction**:
   ```
   X = [voxel1_time1, voxel1_time2, ..., voxel1_timeT]
       [voxel2_time1, voxel2_time2, ..., voxel2_timeT]
       ...
       [voxelN_time1, voxelN_time2, ..., voxelN_timeT]
   ```
   Dimensions: N voxels × T timepoints

2. **Factorization**:
   ```
   X ≈ W × S
   ```
   - W: N × R (spatial patterns, R = number of curves)
   - S: R × T (temporal patterns)

3. **Interpretation**:
   - Each column of W represents spatial distribution of a perfusion pattern
   - Each row of S represents temporal evolution of a perfusion pattern
   - Well-perfused regions have fast washout (high rank in S)

**NMF Implementation** (`pnet/NMFCostKL.java`):

Uses KL divergence cost function:
```
D(X || W×H) = Σᵢⱼ (Xᵢⱼ log(Xᵢⱼ/(WH)ᵢⱼ) - Xᵢⱼ + (WH)ᵢⱼ)
```

Update rules (multiplicative):
```
Wᵢᵣ ← Wᵢᵣ × (Σⱼ Hᵣⱼ Xᵢⱼ/(WH)ᵢⱼ) / (Σⱼ Hᵣⱼ)
Hᵣⱼ ← Hᵣⱼ × (Σᵢ Wᵢᵣ Xᵢⱼ/(WH)ᵢⱼ) / (Σᵢ Wᵢᵣ)
```

### 3.4 Image and Mask Handling

**MHA File Format:**
- Header: ASCII text with image metadata
- Data: Binary pixel data
- SimpleITK handles reading/writing

**Mask Operations** (`UMMaskOperations.java`):
- `union()`: Combines two masks
- `intersection()`: Finds common points
- `complement()`: Inverts mask
- `clone()`: Creates copy

**Coordinate Systems:**
- Image coordinates: (x, y, z) = (col, row, slice)
- Mask points: Stored as UMPointI(x, y, z)
- Matrix3D: Uses (row, col, slice) indexing

### 3.5 Matrix Operations

**Matrix Class** (`pnet/Matrix.java`):
- 2D matrix with float precision
- Methods: get, set, getRow, getColumn, matrix multiplication
- Memory-efficient storage

**Matrix3D Class** (`pnet/Matrix3D.java`):
- 3D matrix operations
- Methods: get, set, sum, subtract
- Used for image data representation

**MatrixUtilities Class** (`pnet/MatrixUtilities.java`):
- Matrix multiplication
- Element-wise operations
- Random initialization
- Statistical operations

---

## 4. Integration and Communication

### 4.1 C++ to Java Communication

**Invocation Method:**
```cpp
void HRSPipelineDriver::callJavaCode(const QString& patientID, QStringList& studyFolders)
{
    QString javaExe = "java";
    QString jarPath = QDir(m_outputPath).absoluteFilePath("HRS2.jar");
    QString jsonPath = m_jsonFilePath;
    
    for (const QString& studyFolder : studyFolders) {
        QStringList arguments;
        arguments << "-Xmx8g"  // 8GB heap
                  << "-jar" << jarPath
                  << studyFolder
                  << jsonPath;
        
        QProcess javaProcess;
        javaProcess.start(javaExe, arguments);
        javaProcess.waitForFinished(-1);
    }
}
```

**Communication Protocol:**
1. **Parameters**: Passed via JSON file (shared between C++ and Java)
2. **Data**: MHA files in case directories
3. **Output**: MHA mask files written by Java, read by C++
4. **Logging**: Java writes to stdout/stderr, C++ parses and displays

**Synchronization:**
- `QSystemSemaphore` limits concurrent Java processes
- Prevents memory exhaustion on systems with limited RAM
- Default: 1 concurrent Java process (configurable)

### 4.2 Data Format Standards

**MHA (MetaImage) Format:**
- Header contains:
  - ObjectType = Image
  - NDims = 3
  - DimSize = [width, height, depth]
  - ElementSpacing = [x_spacing, y_spacing, z_spacing]
  - ElementType = MET_FLOAT or MET_USHORT
- Data stored as binary after header

**Directory Structure:**
```
CaseFolder/
├── ADC/
│   └── *.mha
├── DCE/
│   ├── t0/
│   │   └── *.mha
│   ├── t1/
│   │   └── *.mha
│   └── ...
├── T2/
│   └── *.mha
├── RT/
│   ├── Prostate.mha
│   └── PZ.mha
└── Output/
    └── HRS_Masks/
        ├── ADC 1.mha
        ├── ADC 2.mha
        ├── DCE 1.mha
        ├── HRS 1.mha
        └── ...
```

**JSON Parameter Format:**
- Shared between C++ and Java
- C++ writes, Java reads
- Must match expected keys (see validation functions)

### 4.3 Parameter Passing

**Parameter Flow:**
1. User configures parameters in HRSParams GUI
2. Parameters saved to JSON file
3. HRSPipelineDriver reads JSON and passes path to Java
4. Java Launcher reads JSON and initializes static variables
5. Processing uses parameter values throughout

**Parameter Validation:**
- C++ validates before saving JSON
- Java validates on load (throws exception if missing keys)
- Both enforce: alpha weights sum to 1.0, valid ranges

### 4.4 Error Handling

**C++ Error Handling:**
- Exceptions caught with patient ID context
- Errors logged to case-specific log files
- UI updated with error status (red color)
- Process continues with remaining cases

**Java Error Handling:**
- Try-catch blocks around main processing
- Errors logged with patient ID prefix
- Exceptions printed to stderr (captured by C++)
- Case marked as failed, processing continues

**Error Propagation:**
```
Java Exception → stderr → C++ QProcess → readProcessError_slt() 
→ appendColoredMessage() → UI update
```

---

## 5. Pipeline Execution Flow

### 5.1 Step 1: Preprocessing

**Purpose**: Prepare DICOM data for processing

**Tasks:**
1. Extract ZIP files to temporary directories
2. Identify and validate required protocols (ADC, DCE, T2, RT)
3. Standardize protocol directory names
4. Split DCE series into timepoint directories
5. Convert DICOM to MHA format
6. Validate file integrity and dimensions

**Key Functions:**
- `preprocessPatientFiles()`: Main preprocessing orchestration
- `getProtocolNameFromDICOMDir()`: Reads DICOM tags to identify protocol
- `splitDCEDir()`: Splits 4D DCE into timepoint series
- `validateDicomFilesLength()`: Checks file completeness

**Output:**
- Standardized directory structure
- MHA format images
- Valid case list

### 5.2 Step 2: Normalization and Registration

**Purpose**: Normalize images and align to template

**Tasks:**
1. **T2 Normalization**:
   - Calculate muscle reference region
   - Normalize T2 signal intensity
   - Save normalized images

2. **DCE Normalization**:
   - Calculate muscle mean time course
   - Save to `muscleMean.txt` for Java processing

3. **Registration** (if enabled):
   - Check if registration needed (spatial mismatch)
   - Register ADC and DCE to T2 template
   - Use Elastix for deformable registration
   - Fallback to rigid alignment if needed

**Key Functions:**
- `normalizeStudyT2Series()`: T2 normalization
- `registerStudySeries()`: Image registration
- `checkRegistrationNeed()`: Registration decision logic
- `registerWithElastix2D()`: Elastix registration wrapper

**Output:**
- Normalized T2 images
- Registered ADC/DCE images
- Muscle reference files

### 5.3 Step 3: Java Processing

**Purpose**: Core HRS analysis computation

**Tasks:**
1. Load images and masks (MHA format)
2. **DCE Processing** (if enabled):
   - Run NMF on DCE time series
   - Identify well-perfused regions
   - Calculate DCE score and HRS values
   - Generate DCE masks (1-10)

3. **ADC Processing** (if enabled):
   - Apply zone-specific thresholds
   - Calculate ADC HRS scores
   - Generate ADC masks (1-10)

4. **T2 Processing** (if enabled):
   - Apply zone-specific thresholds
   - Calculate T2 HRS scores
   - Generate T2 masks (1-10)

5. **Integration**:
   - Alpha-weighted combination
   - Generate final HRS masks (1-10)
   - Volume cleaning (remove small components)

**Key Functions (Java):**
- `runSession()`: Main processing session
- `createDCEMasks()`: DCE analysis
- `createADCMasks()`: ADC analysis
- `createT2Masks()`: T2 analysis

**Output:**
- MHA mask files in `Output/HRS_Masks/`
- DCE graph images
- Processing logs

### 5.4 Step 4: Export and Visualization

**Purpose**: Generate clinical outputs and visualizations

**Tasks:**
1. **Mask Export**:
   - Read Java-generated masks
   - Convert to label images
   - Export as MHA files

2. **Grid Generation**:
   - Create quadrant-based grid images
   - Overlay contours and labels
   - Generate PowerPoint presentations

3. **Statistics Export**:
   - Calculate per-quadrant statistics
   - Export to Excel files
   - Generate ROC analysis

4. **Report Generation**:
   - Create comprehensive reports
   - Generate visualization overlays
   - Export clinical metrics

**Key Functions:**
- `exportStudyOutput()`: Main export function
- `ExportHRSQuadrantsGrid()`: Grid image generation
- `exportHRSMetricsTable()`: Statistics export
- `exportQuadrantsGridPPT()`: PowerPoint generation

**Output:**
- Grid images (PNG)
- PowerPoint presentations (PPTX)
- Excel statistics (XLSX)
- Label images (MHA)
- JSON metadata files

---

## 6. Build System and Deployment

### 6.1 C++ Build Configuration

**Visual Studio Solution:**
- `HRSParams.sln`: Main solution file
- Projects:
  - `HRSParams`: GUI application
  - `HRSPipelineWriter`: Pipeline executable
  - `HRSReportsWriter`: Reports executable
  - `ModuleDrivers`: Shared library
  - `UnitTests`: Test suite

**Build Requirements:**
- Visual Studio 2022 or later
- Qt 6.x (with Qt Designer)
- ITK (Insight Toolkit)
- CMake (for ITK configuration)

**Dependencies:**
- Qt6Core, Qt6Gui, Qt6Widgets
- ITK libraries
- QCustomPlot
- QXlsx

### 6.2 Java Build Configuration

**Project Structure:**
- IntelliJ IDEA project (`.iml` file)
- Maven/Gradle not used (manual dependency management)
- Dependencies in `lib/` directory

**Build Process:**
1. Compile Java sources
2. Create JAR with dependencies
3. Include SimpleITK DLL in resources

**JAR Creation:**
```bash
javac -cp "lib/*" -d out src/**/*.java
jar cvf HRS2.jar -C out . -C lib .
```

**Manifest:**
- Main-Class: `launcher.Launcher`
- Class-Path: Includes all lib JARs

### 6.3 Dependencies

**C++ Dependencies:**
- Qt: GUI framework
- ITK: Image processing
- SimpleITK: Image I/O
- QCustomPlot: Graph generation
- QXlsx: Excel export
- Boost: Mathematical operations

**Java Dependencies:**
- SimpleITK Java: Image I/O (`simpleitk-2.3.1.jar`)
- Apache Commons Math: Statistics (`commons-math3-3.5.jar`)
- WEKA: NNLS solver (`weka.jar`)
- JSON: Parameter parsing (`json-20230618.jar`)
- SimpleITK DLL: Native library (`SimpleITKJava.dll`)

**System Requirements:**
- Windows 10/11 (primary platform)
- 16GB+ RAM recommended
- SSD storage preferred
- Java 21 runtime
- Visual C++ Redistributables

### 6.4 Deployment Process

**Deployment Scripts:**
- `Deploy/Deploy.bat`: Main deployment script
- `Deploy/Pack.nsi`: NSIS installer script

**Deployment Steps:**
1. Build C++ projects (Release configuration)
2. Build Java JAR file
3. Copy executables to `Deploy/PreRequisites/`
4. Copy dependencies (DLLs, JARs)
5. Create installer using NSIS
6. Test installer on clean system

**Deployment Structure:**
```
Deploy/
├── PreRequisites/
│   ├── HRSParams.exe
│   ├── HRSPipelineWriter.exe
│   ├── HRSReportsWriter.exe
│   ├── HRS2.jar
│   ├── SimpleITKJava.dll
│   └── [Qt/ITK DLLs]
└── Pack.nsi
```

---

## 7. Extension Points

### 7.1 Adding New Parameters

**C++ Side:**
1. Add parameter to `HRSParams.h` member variables
2. Add UI control in `HRSParams.ui`
3. Add getter/setter in `HRSParams.cpp`
4. Update `writeHRSParamsToJson()` and `readHRSParamsFromJson()`
5. Add validation in `validateHRSParams()`

**Java Side:**
1. Add static variable in `Launcher.java`
2. Read from JSON in `readUserParamsFromJSONFile()`
3. Use in processing functions

**Example:**
```cpp
// HRSParams.h
QString m_newParameter;

// HRSParams.cpp
void HRSParams::writeHRSParamsToJson() {
    json["newParameter"] = m_newParameter;
}
```

```java
// Launcher.java
private static float newParameter;

private static void readUserParamsFromJSONFile(String filePath) {
    newParameter = (float) jsonObj.getDouble("newParameter");
}
```

### 7.2 Custom Processing Steps

**Adding New Pipeline Step:**
1. Create new step function in `HRSPipelineDriver`
2. Add to `processPatientPipeline()` sequence
3. Update step numbering if inserting

**Example:**
```cpp
bool HRSPipelineDriver::executeStep5_CustomProcessing(const QString& patientID) {
    // Custom processing logic
    return true;
}

bool HRSPipelineDriver::processPatientPipeline() {
    // ...
    executeStep5_CustomProcessing(patientID);
    // ...
}
```

### 7.3 Report Generation

**Adding New Report Type:**
1. Add checkbox in `HRSParams.ui` for report type
2. Add member variable and JSON key
3. Implement report function in `HRSReportsDriver`
4. Call from `exportStudyReports()`

**Example:**
```cpp
void HRSReportsDriver::exportCustomReport(QStringList casesDirPaths) {
    // Custom report generation
}

bool HRSReportsDriver::exportStudyReports() {
    if (m_exportCustomReport) {
        exportCustomReport(m_studyFolders);
    }
}
```

### 7.4 Algorithm Modifications

**Modifying NMF Algorithm:**
- Edit `pnet/NMFCostKL.java` for cost function changes
- Modify `nmf/NMFMatrixesComputation.java` for computation changes
- Update iteration count or convergence criteria

**Modifying HRS Scoring:**
- Edit scoring functions in `Launcher.java`:
  - `createDCEMasks()`: DCE scoring
  - `createADCMasks()`: ADC scoring
  - `createT2Masks()`: T2 scoring
  - Alpha weighting combination

**Modifying Registration:**
- Edit `HRSPipelineDriver_Step2.cpp`:
  - `registerImageToTemplate()`: Registration method
  - `checkRegistrationNeed()`: Registration decision
  - Registration parameters

---

## 8. Code Reference

### 8.1 Key Methods and Functions

**HRSParams Class:**
- `HRSParams::startHRSPipelineProcesses()`: Starts processing
- `HRSParams::processFinished_slt()`: Handles completion
- `HRSParams::saveHRSParamsToJson()`: Saves configuration
- `HRSParams::validateHRSParams()`: Validates parameters

**HRSPipelineDriver Class:**
- `HRSPipelineDriver::processPatientPipeline()`: Main pipeline
- `HRSPipelineDriver::executeStep1_Preprocessing()`: Step 1
- `HRSPipelineDriver::executeStep2_NormalizationAndRegistration()`: Step 2
- `HRSPipelineDriver::executeStep3_JavaProcessing()`: Step 3
- `HRSPipelineDriver::executeStep4_Export()`: Step 4

**Launcher Class (Java):**
- `Launcher::main()`: Entry point
- `Launcher::runSession()`: Processing session
- `Launcher::createDCEMasks()`: DCE analysis
- `Launcher::createADCMasks()`: ADC analysis
- `Launcher::createT2Masks()`: T2 analysis

**NMFMatrixesComputation Class:**
- `NMFMatrixesComputation::computeWandS()`: NMF computation
- `NMFMatrixesComputation::runNMF()`: NMF algorithm

### 8.2 Data Structures

**C++:**
- `VolumeImagePointer`: ITK 3D image (float)
- `VolumeMaskImagePointer`: ITK 3D mask (unsigned char)
- `RGBVolumePointer`: ITK 3D RGB image
- `QStringList`: Qt string list
- `QMap<QString, T>`: Qt associative array

**Java:**
- `Matrix`: 2D float matrix
- `Matrix3D`: 3D float matrix
- `UMImage`: Image wrapper
- `UMMask`: Mask representation
- `List<UMMask>`: Mask collection

### 8.3 Constants and Configuration

**Processing Constants:**
- `MAX_CONCURRENT_PATIENTS = 4`: Maximum parallel patients
- `WINDOWS_PATH_LIMIT = 260`: Windows path length limit
- `targetDCEMasksWithValues = 10`: Target DCE masks with data

**Default Parameters:**
- `curvesNumber = 3`: Default NMF curves
- `thresholdPercentage = 0.6`: Default contribution threshold
- `volumeCleanThreshold = 0.01`: Default volume cleaning (mL)

**File Paths:**
- Log files: `%AppData%/HRSPipeline v2.0/logs/`
- Parameter file: `%AppData%/HRSPipeline v2.0/HRSParams.json`
- Output: User-specified output path

---

## Appendix A: Common Issues and Solutions

### Issue: Java Out of Memory
**Solution**: Increase JVM heap size in `callJavaCode()`:
```cpp
arguments << "-Xmx16g"  // Increase from 8g to 16g
```

### Issue: Process Hangs
**Solution**: Check semaphore acquisition, ensure Java process completes:
```cpp
if (!m_javaSemaphore->acquire()) {
    // Handle timeout
}
```

### Issue: Registration Fails
**Solution**: Check Elastix installation, verify image dimensions match:
```cpp
bool checkRegistrationNeed(...) {
    // Verify spatial properties match
}
```

### Issue: MHA File Not Found
**Solution**: Verify directory structure, check file permissions:
```java
File mhaFile = new File(path);
if (!mhaFile.exists()) {
    throw new IOException("MHA file not found: " + path);
}
```

---

## Appendix B: Performance Optimization

### Memory Optimization
- Process cases sequentially to limit memory usage
- Use semaphores to limit concurrent processes
- Clean up temporary files after processing

### Processing Speed
- Use SSD storage for faster I/O
- Enable parallel processing (multiple cases)
- Optimize NMF iterations (reduce if acceptable)

### I/O Optimization
- Batch MHA file operations
- Cache frequently accessed images
- Use memory-mapped files for large images

---

*End of Developer Documentation*

*For user documentation, see `HRS_Documentation.md`*

