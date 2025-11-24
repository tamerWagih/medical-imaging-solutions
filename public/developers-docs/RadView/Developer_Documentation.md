# RadView Developer Documentation

## Complete Developer Guide for Medical Imaging Analysis Application

---

**Version:** 3.4  
**Date:** November 2025  
**Application:** RadView (FeatureViewer)  
**Purpose:** Developer documentation for medical imaging analysis and radiomics feature extraction software

---

## Table of Contents

1. [Introduction](#introduction)
2. [Architecture Overview](#architecture-overview)
3. [Project Structure](#project-structure)
4. [Build System](#build-system)
5. [Core Modules](#core-modules)
6. [Database Schema](#database-schema)
7. [Processing Architecture](#processing-architecture)
8. [API Reference](#api-reference)
9. [Development Guidelines](#development-guidelines)
10. [Testing](#testing)
11. [Deployment](#deployment)
12. [Troubleshooting](#troubleshooting)

---

## Introduction

### Overview

RadView (also known as FeatureViewer) is a comprehensive medical imaging analysis application designed for radiomics feature extraction, preprocessing, feature selection, AI model training, and visualization. The application is built using Qt (C++) and follows a modular architecture pattern.

### Key Technologies

- **Framework**: Qt 6.x (C++)
- **Database**: SQLite
- **Image Processing**: ITK, OpenCV, VTK, ...
- **Build System**: Visual Studio (MSBuild)
- **Architecture**: MVC-like with separate processing executables
- **Cloud Support**: RadViewPipelineDriver for batch/cloud processing

### Application Components

1. **Desktop Application**: Main GUI application (RadView.exe)
2. **Processing Executables**: Separate processes for heavy computation
3. **Pipeline Driver**: Cloud/batch processing system
4. **File Watcher**: C# service for monitoring file changes

---

## Architecture Overview

### High-Level Architecture

RadView follows a **Model-View-Controller (MVC)** pattern with the following layers:

```
┌─────────────────────────────────────────────────────────┐
│                    GUI Layer (Qt)                        │
│  (MainWin, DropAreas, Reports, Visualization Widgets)   │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│              FVController (Mediator)                     │
│  Coordinates communication between GUI and Drivers       │
└────┬──────┬──────┬──────┬──────┬──────┬──────┬──────────┘
     │      │      │      │      │      │      │
┌────▼──┐ ┌─▼───┐ ┌─▼──┐ ┌─▼──┐ ┌─▼──┐ ┌─▼──┐ ┌─▼────┐
│ Scan  │ │Pre- │ │Feat│ │Feat│ │AI  │ │Viz │ │DB    │
│Driver │ │proc │ │ure │ │Sel │ │Mod │ │Drv │ │Driver│
└───────┘ └─────┘ └────┘ └────┘ └────┘ └────┘ └──────┘
     │      │      │      │      │      │      │
┌────▼──────▼──────▼──────▼──────▼──────▼──────▼──────┐
│              SQLite Database                         │
│  (Patients, Studies, Series, Features, Statistics)   │
└──────────────────────────────────────────────────────┘
```

### Processing Architecture

Heavy computational tasks are offloaded to separate executable processes:

```
Main Application
    │
    ├── FeatureWriter.exe      (Feature extraction)
    ├── PreprocessWriter.exe   (Image preprocessing)
    ├── SelectionWriter.exe    (Feature selection)
    ├── ScanWriter.exe         (Image scanning)
    ├── AIModelWriter.exe      (AI model training)
    └── RadViewPipelineWriter.exe (Cloud pipeline)
```

### Design Patterns

1. **Mediator Pattern**: `FVController` mediates between GUI and drivers
2. **Strategy Pattern**: Different feature extraction algorithms
3. **Factory Pattern**: Creation of processing executables
4. **Observer Pattern**: Qt signals/slots for event handling
5. **Repository Pattern**: DatabaseDriver abstracts data access

---

## Project Structure

### Solution Organization

The solution (`FeatureVIewer.sln`) contains the following projects:

#### Core Projects

1. **GUI** (`GUI/GUI.vcxproj`)
   - Main application window and UI components
   - Location: `GUI/`
   - Output: `RadView.exe`

2. **ModuleDrivers** (`ModuleDrivers/ModuleDrivers.vcxproj`)
   - Business logic and core functionality
   - Location: `ModuleDrivers/`
   - Output: `ModuleDrivers.lib`

3. **DataModeler** (`DataModeler/DataModeler.vcxproj`)
   - Data structures and JSON management
   - Location: `DataModeler/`
   - Output: `DataModeler.lib`

#### Processing Executables

4. **FeatureWriter** (`FeatureWriter/FeatureWriter.vcxproj`)
   - Feature extraction processing
   - Output: `FeatureWriter.exe`

5. **PreprocessWriter** (`PreProcessWriter/PreProcessWriter.vcxproj`)
   - Image preprocessing processing
   - Output: `PreprocessWriter.exe`

6. **SelectionWriter** (`SelectionWriter/SelectionWriter.vcxproj`)
   - Feature selection processing
   - Output: `SelectionWriter.exe`

7. **ScanWriter** (`ScanWriter/ScanWriter.vcxproj`)
   - Image scanning processing
   - Output: `ScanWriter.exe`

8. **AIModelWriter** (`AIModelWriter/AIModelWriter.vcxproj`)
   - AI model training processing
   - Output: `AIModelWriter.exe`

#### Pipeline and Cloud

9. **RadViewPipelineDriver** (`RadViewPipelineDriver/RadViewPipelineDriver.vcxproj`)
   - Pipeline processing library
   - Output: `RadViewPipelineDriver.lib`

10. **RadViewPipelineWriter** (`RadViewPipelineWriter/RadViewPipelineWriter.vcxproj`)
    - Pipeline processing executable
    - Output: `RadViewPipelineWriter.exe`

#### Utilities

11. **GitCommands** (`GitCommands/GitCommands.vcxproj`)
    - Git integration utilities

12. **FileWatcher** (`FileWatcher/FileWatcher.csproj`)
    - C# file monitoring service
    - Output: `FileWatcher.exe`

#### Testing

13. **UnitTests** (`UnitTests/UnitTests.vcxproj`)
    - Unit test suite

14. **IntegrationTests** (`IntegrationTests/IntegrationTests.vcxproj`)
    - Integration test suite

### Directory Structure

```
FeatureViewer/
├── GUI/                    # Main application UI
│   ├── MainWin.*          # Main window
│   ├── *DropArea.*        # Drag-and-drop areas
│   ├── *Report.*           # Report dialogs
│   └── Resources/         # UI resources
├── ModuleDrivers/          # Core business logic
│   ├── FVController.*    # Main controller
│   ├── ScanDriver.*       # Image scanning
│   ├── PreprocessingDriver.*
│   ├── FeatureDriver.*    # Feature extraction
│   ├── FeatureSelectionDriver.*
│   ├── AIModelDriver.*    # AI model training
│   ├── VisualizationDriver.*
│   ├── DatabaseDriver.*   # Database operations
│   └── SettingsDriver.*  # Settings management
├── DataModeler/           # Data structures
│   ├── SessionData.*
│   ├── FeatureData.*
│   ├── AIModelData.*
│   └── JsonManager.*
├── FeatureWriter/         # Feature extraction executable
├── PreProcessWriter/      # Preprocessing executable
├── SelectionWriter/       # Feature selection executable
├── ScanWriter/            # Scanning executable
├── AIModelWriter/         # AI model training executable
├── RadViewPipelineDriver/ # Pipeline processing
├── RadViewPipelineWriter/ # Pipeline executable
├── FileWatcher/           # File monitoring service
├── UnitTests/             # Unit tests
├── IntegrationTests/      # Integration tests
├── Data/                  # Test data
├── Documentation/         # Documentation files
└── PreRequisites/         # Required dependencies
```

---

## Build System

### Prerequisites

1. **Visual Studio 2022**
   - C++ Desktop Development workload
   - Windows 10/11 SDK

2. **Qt Framework**
   - Qt 6.x
   - Qt Visual Studio Tools extension

3. **Third-Party Libraries**
   - ITK (Insight Toolkit)
   - OpenCV
   - VTK
   - SQLite

4. **Additional Tools**
   - .NET Framework (for FileWatcher)
   - Git (for GitCommands)

### Build Configuration

#### Debug Configuration
- Optimizations: Disabled
- Runtime Library: Multi-threaded Debug DLL
- Symbols: Full debug information

#### Release Configuration
- Optimizations: Maximum Speed (/O2)
- Runtime Library: Multi-threaded DLL
- Symbols: Minimal

### Building the Solution

1. **Open Solution**
   ```bash
   # Open FeatureVIewer.sln in Visual Studio
   ```

2. **Configure Qt**
   - Set Qt installation path in project properties
   - Ensure Qt version matches project requirements

3. **Set Build Configuration**
   - Select Debug or Release
   - Select platform (x64 recommended)

4. **Build**
   - Build Solution (Ctrl+Shift+B)
   - Or build individual projects

5. **Output Locations**
   - Executables: `x64/Debug/` or `x64/Release/`
   - Libraries: `x64/Debug/` or `x64/Release/`

### Dependencies

Projects have the following dependencies:

```
GUI
  └── ModuleDrivers
      └── DataModeler
      └── (Third-party libraries)

FeatureWriter
  └── ModuleDrivers

PreprocessWriter
  └── ModuleDrivers

SelectionWriter
  └── ModuleDrivers

AIModelWriter
  └── ModuleDrivers

RadViewPipelineWriter
  └── RadViewPipelineDriver
      └── ModuleDrivers
```

### Environment Setup

#### setup_vars.bat
Sets up environment variables for build:
- Qt paths
- ITK paths
- OpenCV paths
- Library paths

---

## Core Modules

### FVController

**Purpose**: Central mediator coordinating all module drivers and GUI communication.

**Location**: `ModuleDrivers/FVController.h`, `ModuleDrivers/FVController.cpp`

**Key Responsibilities**:
- Initialize and manage all drivers
- Coordinate operations between modules
- Handle cross-module communication via signals/slots
- Manage session loading/saving

**Key Methods**:
```cpp
// Driver access
ScanDriver* getScanDriver();
FeatureDriver* getFeatureDriver();
PreprocessingDriver* getPreprocessingDriver();
FeatureSelectionDriver* getSelectionDriver();
AIModelDriver* getAIModelDriver();
VisualizationDriver* getVisualizationDriver();
DatabaseDriver* getDatabaseDriver();

// Operations
void extractFeatures(...);
void extractPreprocess(...);
void applySelection(...);
void prepareAIModelTraining();
void startAIModelProcess(...);
```

### ScanDriver

**Purpose**: Manages medical image loading, scanning, and organization.

**Location**: `ModuleDrivers/ScanDriver.h`, `ModuleDrivers/ScanDriver.cpp`

**Key Responsibilities**:
- Scan directories for medical images (DICOM, MHA, NIfTI)
- Organize images into Patient → Study → Series hierarchy
- Load images from database
- Manage image metadata
- Handle cloud directory scanning

**Key Methods**:
```cpp
int scan(QString dir, bool bLoadFromDB, QString& msg, 
         std::vector<Patient*>& outputPatients, 
         QStringList& Duplication_Warnings);
int loadPatientsFromDatabase(QString& msg, 
                             std::vector<Patient*>& outputPatients, 
                             QStringList& Duplication_Warnings);
bool ScanCloudDirectory(QStringList urlList, const QString& datasetId, 
                       const QString& connectionName = "RadView");
```

**Data Model**:
- `Patient`: Top-level container
- `Study`: Imaging study within patient
- `Series`: Image series within study

### PreprocessingDriver

**Purpose**: Manages image preprocessing operations.

**Location**: `ModuleDrivers/PreprocessingDriver.h`, `ModuleDrivers/PreprocessingDriver.cpp`

**Key Responsibilities**:
- Manage preprocessing pipeline configuration
- Execute preprocessing operations
- Handle preprocessing workflow (drag-and-drop interface)
- Save/load preprocessing definitions

**Supported Preprocessing Modules**:
1. Normalization
2. Histogram Equalization
3. Flipping
4. Scaling
5. Cropping by Size
6. Cropping by Bounding Box
7. Resampling by Size
8. Resampling by Template
9. Anisotropic Diffusion
10. N4 Bias Field Correction
11. Legendre Bias Field Correction
12. Threshold Clipping

**Key Methods**:
```cpp
void extractPreprocess(QVector<QPair<QProcess*, QString>>& process);
void loadAllScannedSeriesPreprocesses();
void updatePreprocessesHashCodes();
```

### FeatureDriver

**Purpose**: Manages radiomics feature extraction.

**Location**: `ModuleDrivers/FeatureDriver.h`, `ModuleDrivers/FeatureDriver.cpp`

**Key Responsibilities**:
- Manage feature extraction configuration
- Execute feature extraction via FeatureWriter.exe
- Calculate summary statistics (23 statistical measures)
- Export features to CSV
- Handle feature metadata

**Feature Categories**:
1. **First-Order Features**: Intensity-based statistics
2. **Second-Order Features**: Texture features (GLCM, GLRLM, GLDM, GLSZM, NGTDM, Collage)
3. **Higher-Order Features**: Advanced filtering (Laws, Tamura, Canny, Sobel, LoG, Gabor)

**Summary Statistics** (23 measures):
- Max, Min, Mean, Median, Mode
- Variance, Standard Deviation, Moment
- Skewness, Entropy, Kurtosis
- Range, Energy, Total Energy
- Percentiles (10th, 90th with different coefficients)
- Interquartile Range, Uniformity
- MAD, RMS, rMAD

**Key Methods**:
```cpp
bool extractFeatures(const QString& defDirPath, const QString& seriesId, 
                     QString outputDirPath, int ProcessId, 
                     bool extractFromPreprocessing, const QString& seriesIds);
QVector<double> getSummaryStats(const QString& featurePath, 
                                const QSet<QString>& requestedStats = QSet<QString>());
bool exportSummaryStatsAsCSV(...);
```

### FeatureSelectionDriver

**Purpose**: Manages feature selection algorithms.

**Location**: `ModuleDrivers/FeatureSelectionDriver.h`, `ModuleDrivers/FeatureSelectionDriver.cpp`

**Key Responsibilities**:
- Manage feature selection configuration
- Execute selection algorithms via SelectionWriter.exe
- Support multiple selection methods
- Export selected features

**Selection Methods**:
1. **MRMR** (Minimum Redundancy Maximum Relevance)
2. **T-Test** (Parametric statistical test)
3. **RankSum** (Wilcoxon Rank-Sum Test)

**Key Methods**:
```cpp
void applySelection(QVector<QPair<QProcess*, QString>>& processes);
```

### AIModelDriver

**Purpose**: Manages AI model training and configuration.

**Location**: `ModuleDrivers/AIModelDriver.h`, `ModuleDrivers/AIModelDriver.cpp`

**Key Responsibilities**:
- Manage AI model definitions
- Build training datasets from selected features
- Execute model training via AIModelWriter.exe
- Support multiple models per training session
- Handle model parameters and feature pools

**Key Methods**:
```cpp
bool trainModel(const QString& seriesIds, const QString& defDirPath, 
                QString outputPath, QString experimentID = "", 
                int processIndex = -1);
csTable buildTrainingDataset(QVector<Series*> series, 
                             std::vector<std::string> selectedFeaturePool, 
                             QString connectionName);
std::vector<CS::AIModel*> loadModelDefsFromIni(const QString& filePath);
void saveModelToIniFile(QSettings* modelDefs);
```

**Training Workflow**:
1. Load model definitions from INI file
2. For each model:
   - Get model's required feature pool
   - Build training dataset with only those features
   - Execute training via backend
   - Save model artifacts

**Model Definition Format** (INI):
```ini
[Model1]
Model_Name=Random Forest Classifier
Model_Type=Classifier
Number_Of_Parameters=3
Parameter0=100
Parameter1=10
Parameter2=42
Selected_Features=Feature1_Stat1,Feature2_Stat2,...
```

### VisualizationDriver

**Purpose**: Manages image visualization and display.

**Location**: `ModuleDrivers/VisualizationDriver.h`, `ModuleDrivers/VisualizationDriver.cpp`

**Key Responsibilities**:
- Multi-planar image display (Axial, Coronal, Sagittal)
- Feature overlay visualization
- Measurement tools (Distance, Area, Angle)
- Mask/ROI drawing and management
- Statistical analysis (Histograms, Box plots, Shape features)
- Window/Level adjustment
- Color map management

**Key Methods**:
```cpp
void loadVisualiztionSettings();
void updateViewersSeriesPointers();
void resetAllViewes();
```

### DatabaseDriver

**Purpose**: Manages database operations and schema.

**Location**: `ModuleDrivers/DatabaseDriver.h`, `ModuleDrivers/DatabaseDriver.cpp`

**Key Responsibilities**:
- Database connection management
- Schema creation and versioning
- Data persistence operations
- Query execution

**Key Methods**:
```cpp
bool createScanningDatabase();
bool connectToDatabase(QString connectionName = "scan");
void disconnectFromDatabase(const QString& connectionName = "scan");
void resetDatabase();
QString getDatabaseVersion();
bool checkDatabaseVersion(const QString& connectionName, 
                         const QString& softwareVersion);
```

### SettingsDriver

**Purpose**: Manages application settings and configuration.

**Location**: `ModuleDrivers/SettingsDriver.h`, `ModuleDrivers/SettingsDriver.cpp`

**Key Responsibilities**:
- Load/save settings from INI files
- Manage user preferences
- Handle default configurations

---

## Database Schema

### Core Tables

#### Version
Stores database version information.
```sql
CREATE TABLE Version (
    Name TEXT PRIMARY KEY  -- Database version string
);
```

#### Patient
Stores patient information.
```sql
CREATE TABLE Patient (
    PK_PatientID INTEGER PRIMARY KEY AUTOINCREMENT,
    PatientID TEXT,
    PatientName TEXT,
    DateOfBirth TEXT,
    Gender TEXT,
    -- Additional fields...
);
```

#### Study
Stores study information linked to patients.
```sql
CREATE TABLE Study (
    PK_StudyID INTEGER PRIMARY KEY AUTOINCREMENT,
    FK_PatientID INTEGER,
    StudyDate TEXT,
    StudyDescription TEXT,
    Label TEXT,  -- For training labels
    FOREIGN KEY (FK_PatientID) REFERENCES Patient(PK_PatientID)
);
```

#### Series
Stores image series information.
```sql
CREATE TABLE Series (
    PK_SeriesID INTEGER PRIMARY KEY AUTOINCREMENT,
    FK_StudyID INTEGER,
    SeriesDescription TEXT,
    Modality TEXT,
    Protocol TEXT,
    NumberOfImages INTEGER,
    ImageDimensions TEXT,
    PixelSpacing TEXT,
    -- Additional fields...
    FOREIGN KEY (FK_StudyID) REFERENCES Study(PK_StudyID)
);
```

#### ImageFile
Stores image file paths and metadata.
```sql
CREATE TABLE ImageFile (
    PK_ImageFileID INTEGER PRIMARY KEY AUTOINCREMENT,
    FK_SeriesID INTEGER,
    FilePath TEXT,
    IsMask INTEGER,  -- 0 = image, 1 = mask
    -- Additional fields...
    FOREIGN KEY (FK_SeriesID) REFERENCES Series(PK_SeriesID)
);
```

#### Features
Stores extracted feature information.
```sql
CREATE TABLE Features (
    PK_FeatureID INTEGER PRIMARY KEY AUTOINCREMENT,
    FK_SeriesID INTEGER,
    FeatureName TEXT,
    FeaturePath TEXT,
    FeatureType TEXT,
    Parameters TEXT,
    HashCode TEXT,
    FOREIGN KEY (FK_SeriesID) REFERENCES Series(PK_SeriesID)
);
```

#### SummarizedFeatures
Stores statistical summaries of features.
```sql
CREATE TABLE SummarizedFeatures (
    PK_SummarizedFeatureID INTEGER PRIMARY KEY AUTOINCREMENT,
    FK_SeriesID INTEGER,
    FeatureName TEXT,
    FeaturePath TEXT,
    Max REAL,
    Min REAL,
    Mean REAL,
    Median REAL,
    -- ... 23 statistical measures
    FOREIGN KEY (FK_SeriesID) REFERENCES Series(PK_SeriesID)
);
```

#### SummaryStatisticsTypes
Defines available statistical measure types.
```sql
CREATE TABLE SummaryStatisticsTypes (
    PK_SummaryStatisticsTypeID INTEGER PRIMARY KEY AUTOINCREMENT,
    SummaryStatisticsNames TEXT
);
```

### Connection Management

The application uses **named database connections** for thread safety:

```cpp
// Main connection
QString connectionName = "scan";

// Thread-specific connections
QString connectionName = "aimodel_" + QString::number((quint64)QThread::currentThread(), 16);
```

Each thread/process should use its own connection name to avoid conflicts.

---

## Processing Architecture

### Process-Based Processing

Heavy computational tasks are executed in separate processes to:
- Prevent UI freezing
- Enable parallel processing
- Improve stability (crashes don't affect main app)
- Allow resource management

### Process Communication

Processes communicate via:
1. **Command-line arguments**: Input parameters
2. **Database**: Shared state and results
3. **File system**: Input/output files
4. **Logging**: Status updates via logger

### FeatureWriter Process

**Purpose**: Extract radiomics features from images.

**Arguments**:
```
databasePath defDirPath outputDirPath seriesId typeOfExtraction currTime
```

**Workflow**:
1. Load feature definitions from INI file
2. Load series data from database
3. Extract features using ITK/OpenCV
4. Calculate summary statistics
5. Save features to disk
6. Update database with results

### PreprocessWriter Process

**Purpose**: Apply preprocessing operations to images.

**Arguments**:
```
databasePath defDirPath outputDirPath seriesId typeOfExtraction currTime
```

**Workflow**:
1. Load preprocessing definitions from INI file
2. Load series data from database
3. Apply preprocessing pipeline
4. Save preprocessed images
5. Update database

### SelectionWriter Process

**Purpose**: Execute feature selection algorithms.

**Arguments**:
```
databasePath defDirPath outputDirPath seriesIds experimentID
```

**Workflow**:
1. Load feature selection configuration
2. Load features from database
3. Build feature matrix
4. Execute selection algorithm (MRMR/T-Test/RankSum)
5. Save selected features
6. Update database

### AIModelWriter Process

**Purpose**: Train AI models.

**Arguments**:
```
databasePath defDirPath outputDirPath seriesIds experimentID processIndex
```

**Workflow**:
1. Load model definitions from INI file
2. Build training dataset from selected features
3. Execute model training (via backend API)
4. Save model artifacts
5. Update database

**Parallel Training**:
- `processIndex = -1`: Train all models sequentially
- `processIndex >= 0`: Train only model at that index (for parallel execution)

### RadViewPipelineWriter Process

**Purpose**: Execute complete processing pipelines (cloud/batch mode).

**Arguments**:
```
experimentID [userID]
```

**Workflow**:
1. Load experiment configuration from database
2. Download data from cloud storage (if applicable)
3. Execute workflow steps:
   - Preprocessing steps
   - Feature extraction steps
   - Summary statistics steps
   - Feature selection steps
4. Upload results to cloud storage
5. Update experiment status

---

## API Reference

### FVController API

#### Driver Access
```cpp
// Get driver instances
ScanDriver* getScanDriver();
FeatureDriver* getFeatureDriver();
PreprocessingDriver* getPreprocessingDriver();
FeatureSelectionDriver* getSelectionDriver();
AIModelDriver* getAIModelDriver();
VisualizationDriver* getVisualizationDriver();
DatabaseDriver* getDatabaseDriver();
SettingsDriver* getSettingsDriver();
```

#### Feature Operations
```cpp
// Extract features
void extractFeatures(QVector<QPair<QProcess*, QString>>& processes, 
                     bool extractFromPreprocess);

// Load features
void loadAllScannedSeriesFeatures();

// Export features
QVector<QPair<QString, int>> exportFeatureAsCSV(QString exportDir);
```

#### Preprocessing Operations
```cpp
// Extract preprocessing
void extractPreprocess(QVector<QPair<QProcess*, QString>>& process);
void extractPreprocess(QPair<QProcess*, QString>& process);

// Load preprocessing
void loadAllScannedSeriesPreprocesses();
```

#### Feature Selection Operations
```cpp
// Apply selection
void applySelection(QVector<QPair<QProcess*, QString>>& processes);
```

#### AI Model Operations
```cpp
// Prepare training
void prepareAIModelTraining();

// Start training process
void startAIModelProcess(QProcess* process, int modelIndex, 
                        const QString& experimentID);
```

#### Data Management
```cpp
// Remove data
void removeSeries(Series* series);
void removeSeriesAndDeleteFromDB(Series* series);
void removeStudy(Study* study);
void removePatient(Patient* patient);
void removeAllPatients();
void resetDatabase();
```

#### Session Management
```cpp
// Load session from JSON
SessionData loadSessionsFromJson(const QString& path, 
                                 bool& patientKeys, 
                                 bool& featureExtractionKeys, 
                                 bool& featureSelectionKeys, 
                                 bool& preprocessingKeys);
```

### DatabaseDriver API

#### Connection Management
```cpp
// Connect/disconnect
bool connectToDatabase(QString connectionName = "scan");
void disconnectFromDatabase(const QString& connectionName = "scan");

// Database operations
bool createScanningDatabase();
void resetDatabase();
QString getDatabaseVersion();
bool checkDatabaseVersion(const QString& connectionName, 
                         const QString& softwareVersion);
```

#### Data Operations
```cpp
// Upload types
void uploadTypesToDB(QStringList modalities, QStringList protocols);

// Get masks
QMap<QString, QStringList> getAllMasksSavedToDatabase();
```

### FeatureDriver API

#### Feature Management
```cpp
// Add/remove features
void appendFeature(Feature* feature);
void appendFeatures(std::vector<Feature*> features);
void removeFeature(const Feature* feature);
void clearAllFeatures();
std::vector<Feature*> getFeatures();
```

#### Feature Extraction
```cpp
// Extract features
bool extractFeatures(const QString& defDirPath, const QString& seriesId, 
                     QString outputDirPath, int ProcessId, 
                     bool extractFromPreprocessing, const QString& seriesIds);

// Cloud extraction
QMap<QString, bool> extractFeatures(const QVector<Filter> filters, 
                                    const QString& seriesId, 
                                    QString outputDirPath, 
                                    QString inputDirPath, 
                                    QString workFlowID, 
                                    const QString stepID, 
                                    QVector<ExtractedFilters>& extractedFilters, 
                                    QString connectionName);
```

#### Summary Statistics
```cpp
// Get statistics
QVector<double> getSummaryStats(const QString& featurePath, 
                                const QSet<QString>& requestedStats = QSet<QString>());
QVector<QVector<double>> getSummaryStatsOnROI(const QString& featurePath, 
                                               QVector<VolumeMaskImagePointer> Masks, 
                                               const QSet<QString>& requestedStats = QSet<QString>());

// Export statistics
bool exportSummaryStatsAsCSV(QString selectedSeriesID, QString sumStatsPath, ...);
```

### AIModelDriver API

#### Model Management
```cpp
// Add/remove models
void appendModel(CS::AIModel* model);
void appendModelData(const QString& name, const QStringList& params, 
                     const QStringList& features);
void removeModel(const CS::AIModel* model);
void removeLastModel();
void clearAllModels();
std::vector<CS::AIModel*> getModels();
QStringList getModelNames();
```

#### Training
```cpp
// Train model
bool trainModel(const QString& seriesIds, const QString& defDirPath, 
                QString outputPath, QString experimentID = "", 
                int processIndex = -1);

// Build training dataset
csTable buildTrainingDataset(QVector<Series*> series, 
                             std::vector<std::string> selectedFeaturePool, 
                             QString connectionName);
```

#### Configuration
```cpp
// Load/save model definitions
std::vector<CS::AIModel*> loadModelDefsFromIni(const QString& filePath);
void saveModelToIniFile(QSettings* modelDefs);
```

---

## Development Guidelines

### Code Style

#### Naming Conventions
- **Classes**: PascalCase (`FeatureDriver`, `AIModelDriver`)
- **Methods**: camelCase (`extractFeatures`, `buildTrainingDataset`)
- **Variables**: camelCase with prefix (`m_vecModels`, `pSeries`)
- **Constants**: UPPER_CASE (`DATABASE_VERSION`)
- **Private members**: `m_` prefix (`m_databaseDriver`)
- **Pointers**: `p` prefix (`pSeries`, `pPatient`)

#### File Organization
- Header files: `.h`
- Implementation files: `.cpp`
- One class per file pair
- Include guards: `#pragma once`

#### Qt Conventions
- Use Qt types: `QString`, `QVector`, `QMap`
- Use Qt signals/slots for events
- Use `Q_OBJECT` macro for classes with signals/slots
- Use `QObject::connect()` for connections

### Error Handling

#### Logging
Use the logger system for all messages:
```cpp
#include "csLogger.h"
using namespace logger;

sendLoggerMessage_std(Info, Non, "Operation started");
sendLoggerMessage_std(Error, Non, "Operation failed: " + errorMessage);
sendLoggerMessage_std(Warning, Non, "Warning message");
```

#### Exception Handling
```cpp
try {
    // Operation
} catch (const std::exception& e) {
    sendLoggerMessage_std(Error, Non, "Exception: " + QString::fromStdString(e.what()));
    return false;
} catch (...) {
    sendLoggerMessage_std(Error, Non, "Unknown exception occurred");
    return false;
}
```

### Database Access

#### Connection Management
Always use named connections for thread safety:
```cpp
QString connectionName = "unique_connection_name";
m_databaseDriver.connectToDatabase(connectionName);
// ... database operations ...
m_databaseDriver.disconnectFromDatabase(connectionName);
```

#### Query Execution
Use prepared statements and check for errors:
```cpp
QSqlQuery query(QSqlDatabase::database(connectionName));
query.prepare("SELECT * FROM Series WHERE FK_StudyID = ?");
query.addBindValue(studyID);
if (!query.exec()) {
    sendLoggerMessage_std(Error, Non, "Query failed: " + query.lastError().text());
    return false;
}
```

### Memory Management

#### Qt Parent-Child
Use Qt's parent-child mechanism for automatic cleanup:
```cpp
QObject* parent = this;
FeatureDriver* driver = new FeatureDriver(parent);  // Auto-deleted when parent is deleted
```

#### Smart Pointers
Consider using smart pointers for complex ownership:
```cpp
std::unique_ptr<Feature> feature = std::make_unique<Feature>(...);
```

### Thread Safety

#### Database Connections
- Each thread must use its own database connection
- Never share connections between threads

#### GUI Updates
- Only update GUI from main thread
- Use signals/slots for cross-thread communication

### Adding New Features

#### 1. Create Driver Class
```cpp
// NewDriver.h
#pragma once
#include <QObject>
class NewDriver : public QObject {
    Q_OBJECT
public:
    NewDriver(QObject* parent = nullptr);
    // Methods...
};
```

#### 2. Add to FVController
```cpp
// FVController.h
#include "NewDriver.h"
class FVController {
    // ...
    NewDriver* m_pNewDriver;
    NewDriver* getNewDriver();
};
```

#### 3. Initialize in FVController
```cpp
// FVController.cpp
m_pNewDriver = new NewDriver(this);
```

#### 4. Add to GUI
- Create UI components in `GUI/`
- Connect to driver via FVController
- Add to MainWin if needed

---

## Testing

### Unit Tests

**Location**: `UnitTests/`

**Structure**:
- Test files: `*_test.cpp`
- Test framework: Google Test

**Running Tests**:
1. Build UnitTests project
2. Run executable
3. Review test results

### Integration Tests

**Location**: `IntegrationTests/`

**Purpose**: Test complete workflows end-to-end.

**Test Data**: `Data/Integration Tests/`

**Running Tests**:
1. Build IntegrationTests project
2. Ensure test data is available
3. Run executable
4. Review results

### Test Data

**Location**: `Data/`

**Structure**:
- `UnitTests/`: Unit test data
- `Integration Tests/`: Integration test data
- `RanorexTests/`: Automated UI test data

---

## Deployment

### Build Requirements

1. **Release Configuration**
   - Build all projects in Release mode
   - Ensure all dependencies are included

2. **Dependencies**
   - Qt DLLs
   - ITK libraries
   - OpenCV libraries
   - SQLite DLL
   - Visual C++ Runtime

### Installation Package

**Location**: `Pack.nsi` (NSIS installer script)

**Components**:
- Main executable (`RadView.exe`)
- Processing executables
- Required DLLs
- Database template
- Documentation

### Cloud Deployment

**Docker Support**:
- `PipelineDockerfile`: Pipeline processing container
- `ScannerDockerfile`: Scanning service container

**Deployment Steps**:
1. Build Docker images
2. Push to container registry
3. Deploy to cloud platform
4. Configure database and storage

---

## Troubleshooting

### Common Build Issues

#### Qt Not Found
**Problem**: Qt paths not configured
**Solution**: 
- Set Qt installation path in project properties
- Run `setup_vars.bat`
- Check Qt version compatibility

#### Missing Dependencies
**Problem**: Third-party libraries not found
**Solution**:
- Verify library paths in project properties
- Check include/library directories
- Ensure DLLs are in PATH or executable directory

#### Linker Errors
**Problem**: Unresolved symbols
**Solution**:
- Check project dependencies
- Verify library order
- Ensure all required libraries are linked

### Runtime Issues

#### Database Errors
**Problem**: Database connection failures
**Solution**:
- Check database file permissions
- Verify database version compatibility
- Check connection name uniqueness (thread safety)

#### Process Execution Failures
**Problem**: Processing executables fail to start
**Solution**:
- Verify executable paths
- Check command-line arguments
- Review process logs
- Ensure required DLLs are present

#### Memory Issues
**Problem**: Out of memory errors
**Solution**:
- Process large datasets in batches
- Close unused features/volumes
- Increase system memory
- Optimize feature extraction parameters

### Debugging

#### Enable Debug Logging
```cpp
// Set log level
logger::setLogLevel(LogLevel::Debug);

// Add detailed logging
sendLoggerMessage_std(Debug, Non, "Variable value: " + QString::number(value));
```

#### Use Debugger
- Set breakpoints in Visual Studio
- Use conditional breakpoints
- Inspect variables and call stack
- Use watch windows

#### Database Inspection
- Use SQLite browser to inspect database
- Check table contents
- Verify foreign key relationships
- Review transaction logs

---

## Additional Resources

### Documentation Files
- `Documentation/RadView_Documentation.md`: User documentation
- `Documentation/RadView_Cloud_Documentation.md`: Cloud documentation
- `Documentation/Policy-Updates.md`: Policy updates

### Code References
- Qt Documentation: https://doc.qt.io/
- ITK Documentation: https://itk.org/Documentation/
- OpenCV Documentation: https://docs.opencv.org/

### Support
- Review existing documentation
- Check code comments
- Examine test cases
- Contact development team

---

**End of Developer Documentation**

_This document provides comprehensive guidance for developers working on the RadView medical imaging analysis application. For additional support or questions, please contact the development team._

