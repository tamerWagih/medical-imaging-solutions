# AI Models Developer Documentation

## Table of Contents

1. [Overview](#overview)
2. [System Architecture](#system-architecture)
3. [Code Structure](#code-structure)
4. [Training Workflow](#training-workflow)
5. [Supported Models](#supported-models)
6. [GUI Components](#gui-components)
7. [Backend Implementation](#backend-implementation)
8. [Data Flow](#data-flow)
9. [Testing](#testing)
10. [Integration Points](#integration-points)
11. [Future Development](#future-development)

---

## Overview

The AI Models system in FeatureViewer enables users to train machine and deep learning models on radiomics features extracted from medical images. The system supports multiple model types including classifiers, regressors, and deep learning models.

### Key Features

- **Multiple Model Types**: Classification, Regression, and Deep Learning models
- **Parallel Training**: Multiple models can be trained concurrently
- **Feature Selection Integration**: Uses selected features from the feature selection module
- **Problem-Based Model Selection**: Models are recommended based on the selected problem type
- **Parameter Configuration**: Each model has configurable hyperparameters
- **Training Artifacts**: Saves model files, metrics, and training summaries

### System Components

1. **GUI Layer** (FeatureViewer): User interface for model selection, configuration, and training
2. **Driver Layer** (FeatureViewer): Orchestrates training workflow and process management
3. **Backend Layer** (CSMain): Core model training implementations
4. **Data Layer**: Database integration for features and series management

---

## System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    GUI Layer (FeatureViewer)                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ MainWin      │  │ AIModelDrop   │  │ AIModelItem  │     │
│  │ _AIModels    │  │ Area          │  │              │     │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘     │
│         │                  │                  │              │
└─────────┼──────────────────┼──────────────────┼──────────────┘
          │                  │                  │
          ▼                  ▼                  ▼
┌─────────────────────────────────────────────────────────────┐
│              Driver Layer (FeatureViewer)                    │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              AIModelDriver                            │   │
│  │  - trainModel()                                       │   │
│  │  - buildTrainingDataset()                            │   │
│  │  - loadModelDefsFromIni()                           │   │
│  └──────────────────┬───────────────────────────────────┘   │
│                     │                                        │
│  ┌──────────────────▼───────────────────────────────────┐   │
│  │          AIModelWriter.exe (Process)                 │   │
│  │  Standalone executable for parallel training         │   │
│  └──────────────────┬───────────────────────────────────┘   │
└─────────────────────┼────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│            Backend Layer (CSMain/Radiomics/AI)              │
│  ┌──────────────────────────────────────────────────────┐ │
│  │         csAIModelFeatures.hxx                          │ │
│  │  - ExecuteAIModel()                                    │ │
│  │  - Model registry and routing                          │ │
│  └──────────────────┬─────────────────────────────────────┘ │
│                     │                                        │
│  ┌──────────────────▼───────────────────────────────────┐   │
│  │         Individual Model Implementations              │   │
│  │  - TrainLinearRegression()                            │   │
│  │  - TrainRandomForestClassifier() (stub)              │   │
│  │  - TrainXGBoostClassifier() (stub)                    │   │
│  │  - ... (other models)                                 │   │
│  └───────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## Code Structure

### FeatureViewer Project

#### ModuleDrivers/

**AIModelDriver.h / AIModelDriver.cpp**
- Main driver class for AI model training orchestration
- Key responsibilities:
  - Loading model definitions from INI files
  - Building training datasets from selected series
  - Managing model collections
  - Coordinating with backend training functions

**Key Methods:**
```cpp
bool trainModel(const QString& seriesIds, const QString& defDirPath, 
                QString outputPath, QString experimentID = "", 
                int processIndex = -1);
```
- Main training entry point
- `processIndex`: -1 trains all models, >=0 trains specific model index
- Creates training dataset, loads model definitions, executes training

```cpp
csTable buildTrainingDataset(QVector<Series*> series, 
                             std::vector<std::string> selectedFeaturePool, 
                             QString connectionName);
```
- Builds feature matrix from selected series
- Handles multiple masks per series
- Returns `csTable` with features and labels

```cpp
std::vector<CS::AIModel*> loadModelDefsFromIni(const QString& filePath);
```
- Parses INI file with model definitions
- Creates `AIModel` objects for each model
- Format: `AIModelDefs.ini`

#### GUI/

**MainWin_AIModels.cpp**
- Main UI controller for AI Models tab
- Key functions:
  - `initializeAIModels()`: Sets up AI Models tab
  - `populateAIProblems()`: Loads problems from database
  - `populateAIModels()`: Shows available models for selected problem
  - `on_runAIModelButton_clicked()`: Starts training workflow
  - `validateAIModels()`: Checks for duplicate models
  - `validateAIModelFeaturesPool()`: Ensures all models have features

**FVAIModelItem.h / FVAIModelItem.cpp**
- Graphics item representing a dropped AI model
- Stores:
  - Model name and type
  - Problem type
  - Parameters
  - Selected features pool
  - Settings dialog reference

**AIModelDropArea.h / AIModelDropArea.cpp**
- Drop area for AI model items
- Handles drag-and-drop operations
- Manages context menu actions (Clear, Remove, Settings, Save, Load)
- Validates model compatibility with problem type

**AIModelReport.h / AIModelReport.cpp**
- Report generation for training results
- Tracks training duration and metrics

#### DataModeler/

**AIModelData.h**
- Data structure for serializing AI models to JSON
- Contains: name, position, parameters, model type
- Note: Feature pool and problem type are reconstructed at runtime

#### AIModelWriter/

**AIModelWriter.cpp**
- Standalone executable for parallel model training
- Command-line arguments:
  ```
  AIModelWriter.exe [databasePath] [seriesIDs] [modelDefDirPath] 
                    [outputDirPath] [experimentID] [processIndex]
  ```
- Runs in separate process for parallelization

### CSMain Project

#### Radiomics/AI/

**csAIModelFeatures.hxx**
- Core backend implementation for AI model training
- Key functions:

```cpp
AIModelTrainingArtifacts ExecuteAIModel(
    AIModelName modelName,
    AIModelSubtypeName modelSubtype,
    AIModelParamSList paramStrVals,
    AIModelTrainingRequest baseRequest);
```
- Main entry point for model training
- Normalizes model names
- Validates parameters
- Routes to appropriate training function

**Model Registry:**
- `GetSupportedAIModelNames()`: Returns list of supported models
- `GetAIModelParamNamesAndTypes()`: Returns parameter definitions
- `GetAIModelType()`: Returns model type (Classification/Regression/DeepLearning)
- `ResolveTrainingFunction()`: Maps model name to training function

**Model Name Normalization:**
- Handles aliases (e.g., "RF" → "RandomForestClassifier")
- Case-insensitive matching
- Removes spaces and special characters

**csLinearRegression.hxx**
- Fully implemented Linear Regression model
- Uses QR decomposition for numerical stability
- Calculates metrics: R², MSE, RMSE, MAE
- Saves model coefficients and metrics to file

**csAIModelTypes.h**
- Type definitions for AI model system
- Key types:
  - `AIModelName`: Model identifier string
  - `AIModelTrainingRequest`: Input structure for training
  - `AIModelTrainingArtifacts`: Output structure with results
  - `AIModelParamCollectionType`: Typed parameter collection

#### Scanner/Core/

**csAIModel.h / csAIModel.cpp**
- Data class representing an AI model
- Properties:
  - Model name and type
  - Parameters
  - Feature pool
  - Output directory
  - Model file path
  - Training status

#### GUI/Qt/

**csAIModelSettingsGUI.h / csAIModelSettingsGUI.cpp**
- Settings dialog for configuring model parameters
- Features:
  - Dynamic parameter UI generation
  - Feature pool management
  - Feature removal from training set
  - Parameter validation

**Key Methods:**
```cpp
QVector<QStringList> CollectModelParameters();
```
- Collects parameter values from UI
- Format: [DialogTitle, ModelType, Param1, Param2, ...]

```cpp
void setSelectedFeaturePool(const QStringList& selectedFeatures);
QStringList getSelectedFeaturesForTraining() const;
```
- Manages feature pool for model
- Supports removing features from training

---

## Training Workflow

### Step-by-Step Process

1. **User Selection**
   - User selects problem type from dropdown
   - Available models are shown based on problem type
   - User drags models to drop area

2. **Model Configuration**
   - User double-clicks model item to open settings
   - Configures hyperparameters
   - Optionally removes features from training set
   - Settings are saved to model item

3. **Validation**
   - System validates:
     - No duplicate models (same name + parameters)
     - All models have non-empty feature pools
     - Series are selected
     - No other processes running

4. **Preparation**
   - Models are collected from drop area
   - Model definitions saved to `AIModelDefs.ini`
   - Training dataset built from selected series
   - Output directory created with timestamp

5. **Parallel Training**
   - Queue of model indices created
   - Worker processes spawned (up to `MaxNumberOfExtactionProcess`)
   - Each process trains one model at a time
   - Processes are reused for next model in queue

6. **Training Execution** (per model)
   - `AIModelWriter.exe` launched with:
     - Database path
     - Series IDs
     - Model definition file path
     - Output directory
     - Experiment ID
     - Process index (which model to train)
   
   - `AIModelDriver::trainModel()`:
     - Loads series from database
     - Loads model definitions from INI
     - Gets selected features pool
     - Builds training dataset
     - Filters features for model (if model has specific feature pool)
     - Calls `CS::ExecuteAIModel()`
     - Saves training summary

7. **Backend Training** (`CS::ExecuteAIModel()`)
   - Normalizes model name
   - Validates parameters
   - Routes to model-specific training function
   - Returns training artifacts

8. **Progress Tracking**
   - Progress messages sent via logger
   - Model completion identified by identifier string
   - Progress bar updated
   - Model items turn green on completion

9. **Finalization**
   - All models complete
   - Training report generated
   - UI re-enabled
   - Results available in output directory

### Training Dataset Structure

The training dataset (`csTable`) contains:
- **denseMat**: Eigen matrix (samples × features)
- **colNames**: Feature names
- **rowNames**: Sample identifiers (Patient_Study_Series)
- **m_labels**: Target values (from study labels)

### Model Definition File Format

**AIModelDefs.ini:**
```ini
Number_Of_Models=2

[Model1]
Model_Name=RandomForestClassifier
Model_Type=Classifier
Number_Of_Parameters=3
Parameter0=100
Parameter1=10
Parameter2=42
Selected_Features=feature1,feature2,feature3

[Model2]
Model_Name=LinearRegression
Model_Type=Regression
Number_Of_Parameters=1
Parameter0=true
Selected_Features=
```

---

## Supported Models

### Classification Models

1. **Random Forest Classifier**
   - Parameters:
     - Number of Trees (int, default: 100, range: 10-1000)
     - Max Depth (int, default: 10, range: 1-100)
     - Random State (int, default: 42, range: 0-999999)
   - Status: Stub (not implemented)

2. **XGBoost Classifier**
   - Parameters:
     - Number of Estimators (int, default: 100, range: 10-1000)
     - Max Depth (int, default: 6, range: 1-20)
     - Learning Rate (double, default: 0.1, range: 0.001-1.0)
   - Status: Stub (not implemented)

3. **Support Vector Classifier (SVM)**
   - Parameters:
     - Kernel (combo: rbf, linear, poly, sigmoid, default: rbf)
     - Regularization (double, default: 1.0, range: 0.001-1000.0)
     - Gamma (combo: scale, auto, default: scale)
   - Status: Stub (not implemented)

4. **Logistic Regression**
   - Parameters:
     - Regularization (double, default: 1.0, range: 0.001-1000.0)
     - Penalty (combo: l2, l1, elasticnet, default: l2)
     - Solver (combo: lbfgs, liblinear, newton-cg, sag, saga, default: lbfgs)
   - Status: Stub (not implemented)

5. **Neural Network Classifier**
   - Parameters:
     - Hidden Layer Sizes (string, default: "100,50")
     - Regularization (double, default: 0.01, range: 0.0001-10.0)
     - Max Iterations (int, default: 1000, range: 10-10000)
   - Status: Stub (not implemented)

6. **CNN Classifier**
   - Parameters:
     - Epochs (int, default: 50, range: 1-1000)
     - Batch Size (int, default: 32, range: 1-1024)
     - Learning Rate (double, default: 0.001, range: 0.0001-1.0)
   - Status: Stub (not implemented)

7. **ResNet Classifier**
   - Parameters: Same as CNN Classifier
   - Status: Stub (not implemented)

### Regression Models

1. **Random Forest Regressor**
   - Parameters: Same as Random Forest Classifier
   - Status: Stub (not implemented)

2. **XGBoost Regressor**
   - Parameters: Same as XGBoost Classifier
   - Status: Stub (not implemented)

3. **Support Vector Regressor (SVR)**
   - Parameters: Same as Support Vector Classifier
   - Status: Stub (not implemented)

4. **Linear Regression** ✅ **IMPLEMENTED**
   - Parameters:
     - Fit Intercept (bool, default: true)
   - Implementation: `csLinearRegression.hxx`
   - Uses QR decomposition
   - Metrics: R², MSE, RMSE, MAE
   - Saves coefficients and model file

5. **Cox Regression**
   - Parameters:
     - Regularization (double, default: 0.1, range: 0.0-10.0)
   - Status: Stub (not implemented)

6. **Neural Network Regressor**
   - Parameters: Same as Neural Network Classifier
   - Status: Stub (not implemented)

7. **CNN Regressor**
   - Parameters: Same as CNN Classifier
   - Status: Stub (not implemented)

8. **ResNet Regressor**
   - Parameters: Same as CNN Classifier
   - Status: Stub (not implemented)

### Model Name Aliases

The system supports multiple aliases for model names:
- "RF" → "RandomForestClassifier"
- "SVM" → "SupportVectorClassifier"
- "XGB" → "XGBoostClassifier"
- "LR" → "LogisticRegression"
- "CNN" → "CNNClassifier"
- "ResNet" → "ResNetClassifier"
- And many more...

---

## GUI Components

### MainWin_AIModels Tab

**Problem Selection:**
- Dropdown populated from database (`getAIProblems()`)
- Problem types determine available models
- Examples: "Tumor Classification", "Survival Prediction", "Treatment Response Prediction"

**Model Palette:**
- Draggable model labels
- Models shown/hidden based on problem type
- Models include: Random Forest, SVM, XGBoost, Logistic Regression, Linear Regression, Cox Regression, Neural Networks, CNN, ResNet

**Drop Area:**
- Visual canvas for dropped models
- Context menu: Clear, Remove, Settings, Save, Load
- Validates model compatibility with problem type
- Shows processing state during training

**Model Items:**
- Visual representation of configured model
- Color themes:
  - Default: Blue
  - Processing: Yellow
  - Complete: Green
  - Error/Duplicate: Red
- Double-click opens settings dialog

**Settings Dialog:**
- Dynamic parameter UI based on model type
- Feature pool list with removal capability
- Parameter validation
- Model information display

**Training Controls:**
- "Run AI Model" button: Starts training
- Progress bar: Shows training progress
- Cancel button: Stops training
- Results text area: Shows training status

### Data Flow in GUI

1. **Model Drop:**
   ```
   User drags model → AIModelDropArea::dropEvent() 
   → Creates FVAIModelItem → Emits modelDropped signal
   → MainWin::slot_AIModelDropped() → Registers with AIModelDriver
   ```

2. **Settings Edit:**
   ```
   Double-click model → AIModelDropArea::mouseDoubleClickEvent()
   → Opens csAIModelSettingsGUI → User edits parameters
   → CollectModelParameters() → Updates FVAIModelItem
   → Emits modelUpdated signal
   ```

3. **Training Start:**
   ```
   Click "Run AI Model" → MainWin::on_runAIModelButton_clicked()
   → Validates models → Collects model data → Prepares INI file
   → Spawns AIModelWriter.exe processes → Training begins
   ```

4. **Progress Updates:**
   ```
   AIModelWriter.exe → Logger messages → Process output parsing
   → MainWin::slot_AIModelProcess_readyReadStandardOutput()
   → Updates progress bar → Changes model item color
   ```

---

## Backend Implementation

### Training Function Signature

All training functions follow this signature:
```cpp
AIModelTrainingArtifacts TrainModelName(const AIModelTrainingRequest& request);
```

### Training Request Structure

```cpp
struct AIModelTrainingRequest {
    AIModelName modelName;
    AIModelSubtypeName subtypeName;
    AIModelParamCollectionType parameters;  // (ints, doubles, strings, bools)
    EigenMatrixTypeD featureMatrix;          // Samples × Features
    EigenLabelVector labels;                 // Target values
    std::vector<std::string> featureNames;   // Feature identifiers
    std::vector<std::string> excludedFeatureNames;
    std::string outputDirectory;             // Where to save results
    std::map<std::string, std::string> metadata;
};
```

### Training Artifacts Structure

```cpp
struct AIModelTrainingArtifacts {
    bool success;                                    // Training success flag
    std::string modelFilePath;                       // Path to saved model
    std::map<std::string, double> metrics;          // Evaluation metrics
    std::map<std::string, std::string> metadata;    // Additional metadata
    std::vector<std::string> generatedFiles;       // All output files
    std::vector<std::string> warnings;              // Warning messages
};
```

### Parameter Parsing

Parameters are parsed from strings based on type descriptors:
- **int**: Parsed with `atoi()`
- **double**: Parsed with `atof()`
- **bool**: Parsed from "true"/"false" or "1"/"0"
- **string**: Used as-is
- **combo**: Selected from dropdown options

### Linear Regression Implementation Details

**Location:** `D:\MAIN\CSMain\Radiomics\AI\csLinearRegression.hxx`

**Algorithm:**
1. Validates input data (non-empty, matching dimensions)
2. Extracts `fitIntercept` parameter
3. Converts labels to `Eigen::VectorXd`
4. Prepares feature matrix X (adds intercept column if needed)
5. Checks for rank deficiency
6. Solves using QR decomposition: `X.householderQr().solve(y)`
7. Calculates predictions: `X * coefficients`
8. Computes metrics:
   - R² = 1 - (SS_res / SS_tot)
   - MSE = mean squared error
   - RMSE = sqrt(MSE)
   - MAE = mean absolute error
9. Saves model to text file and coefficients to binary file

**Edge Cases Handled:**
- Rank deficiency warning
- Constant target values (R² = 0 or 1)
- Empty feature matrix
- Dimension mismatches

### Stub Implementations

Most models currently return `CreateNotImplementedArtifacts()`:
- Sets `success = false`
- Adds warning message
- Returns empty artifacts

To implement a new model:
1. Create training function in `csAIModelFeatures.hxx` or separate file
2. Replace stub with actual implementation
3. Follow `TrainLinearRegression` pattern
4. Save model file and metrics
5. Return populated `AIModelTrainingArtifacts`

---

## Data Flow

### Training Data Flow

```
Database (scan.db)
    ↓
Series → getSummarizedFeaturesFromDatabase()
    ↓
Feature Vectors (per series/mask)
    ↓
buildTrainingDataset() → Aggregate across series
    ↓
csTable {
    denseMat: EigenMatrix (samples × features)
    colNames: feature names
    rowNames: sample IDs
    m_labels: target values
}
    ↓
filterFeaturesForModel() → Filter by model feature pool
    ↓
AIModelTrainingRequest {
    featureMatrix: filtered matrix
    labels: target values
    featureNames: filtered names
    ...
}
    ↓
CS::ExecuteAIModel() → Route to training function
    ↓
Model-specific training → Train model
    ↓
AIModelTrainingArtifacts {
    modelFilePath: path to saved model
    metrics: evaluation metrics
    ...
}
    ↓
Save training summary → Output directory
```

### Feature Pool Flow

```
Feature Selection Module
    ↓
Selected Features → Database (SelectedFeatures table)
    ↓
csSeriesController::getSelectedFeaturesPool()
    ↓
AIModelDriver::buildTrainingDataset()
    ↓
Model-specific feature pool (if specified)
    ↓
filterFeaturesForModel()
    ↓
Training with filtered features
```

### Model Configuration Flow

```
User drops model → FVAIModelItem created
    ↓
User opens settings → csAIModelSettingsGUI
    ↓
User configures parameters → CollectModelParameters()
    ↓
Parameters stored in FVAIModelItem
    ↓
User clicks "Run AI Model" → Models collected
    ↓
AIModelDriver::appendModelData() → Register models
    ↓
Save to AIModelDefs.ini → Loaded by AIModelWriter.exe
    ↓
Parameters parsed → Passed to training function
```

---

## Testing

### Unit Tests

**Location:** `UnitTests/ModuleDriversTests.cpp`

Currently tests feature extraction, not AI models. To add AI model tests:

1. **Test Training Dataset Building:**
   ```cpp
   TEST(AIModelDriver, BuildTrainingDataset) {
       // Create mock series
       // Call buildTrainingDataset()
       // Verify csTable structure
       // Check feature matrix dimensions
       // Verify labels match
   }
   ```

2. **Test Model Loading:**
   ```cpp
   TEST(AIModelDriver, LoadModelDefsFromIni) {
       // Create test INI file
       // Call loadModelDefsFromIni()
       // Verify models loaded correctly
       // Check parameters parsed
   }
   ```

3. **Test Linear Regression:**
   ```cpp
   TEST(LinearRegression, BasicTraining) {
       // Create test data
       // Call TrainLinearRegression()
       // Verify success
       // Check metrics are reasonable
       // Verify model file created
   }
   ```

### Integration Tests

**Location:** `IntegrationTests/`

Should test:
- End-to-end training workflow
- Parallel process execution
- Model file generation
- Progress reporting
- Error handling

### Test Data

**Location:** `Data/UnitTests/`

Use existing test images and masks for:
- Feature extraction validation
- Training dataset creation
- Model training verification

---

## Integration Points

### Database Integration

**Tables Used:**
- `Series`: Source of feature data
- `SelectedFeatures`: Selected features pool
- `SummarizedFeatures`: Feature statistics
- `Studies`: Source of labels (via `getLabel()`)

**Database Driver:**
- `DatabaseDriver`: Connection management
- `csSeriesController`: Series and feature retrieval
- Thread-safe connections per process

### Feature Selection Integration

**Dependency:**
- AI Models require feature selection to be completed first
- Uses `getSelectedFeaturesPool()` to get available features
- Validates feature pool is non-empty before training

**Feature Filtering:**
- Models can specify subset of selected features
- `filterFeaturesForModel()` filters training data
- If no features match, uses full feature set

### Preprocessing Integration

**Indirect Dependency:**
- Features depend on preprocessing
- AI Models use preprocessed features
- No direct coupling to preprocessing module

### Settings Integration

**Settings Driver:**
- `AIModelOutputPath`: Where to save training results
- `MaxNumberOfExtactionProcess`: Parallel process limit
- Settings persisted across sessions

### Logger Integration

**Logger Usage:**
- All training steps logged
- Progress messages sent via logger
- Error and warning messages
- Duration tracking for reports

**Message Format:**
```
[MessageType] [SubType] [Message]
Data =ModelName#DurationMs
```

---

## Future Development

### Planned Implementations

1. **Complete Model Implementations:**
   - Random Forest (Classifier & Regressor)
   - XGBoost (Classifier & Regressor)
   - SVM (Classifier & Regressor)
   - Logistic Regression
   - Neural Networks
   - CNN & ResNet

2. **Model Evaluation:**
   - Cross-validation support
   - Train/test split
   - Confusion matrices
   - ROC curves
   - Feature importance

3. **Model Inference:**
   - Load trained models
   - Predict on new data
   - Batch prediction
   - Prediction visualization

4. **Model Management:**
   - Model versioning
   - Model comparison
   - Model selection based on metrics
   - Model export/import

5. **Advanced Features:**
   - Hyperparameter tuning
   - Ensemble methods
   - AutoML capabilities
   - Model interpretability

### Implementation Guidelines

**Adding a New Model:**

1. **Update Type Definitions** (`csAIModelTypes.h`):
   - Add model name to supported list (if new type)

2. **Update Model Registry** (`csAIModelFeatures.hxx`):
   - Add to `GetSupportedAIModelNames()`
   - Add parameter definitions in `GetAIModelParamNamesAndTypes()`
   - Add alias in `NormalizeAIModelName()`
   - Add training function declaration
   - Add to `ResolveTrainingFunction()`

3. **Implement Training Function:**
   - Create function: `TrainModelName()`
   - Validate input data
   - Parse parameters
   - Train model
   - Calculate metrics
   - Save model file
   - Return artifacts

4. **Update GUI** (if needed):
   - Add model label to UI
   - Update `populateAIModels()` mapping
   - Add icon/text mappings

5. **Test:**
   - Unit tests for training function
   - Integration tests for full workflow
   - Verify metrics are reasonable

**Example Implementation Template:**

```cpp
static AIModelTrainingArtifacts TrainNewModel(const AIModelTrainingRequest& request)
{
    AIModelTrainingArtifacts artifacts;
    artifacts.success = false;

    try
    {
        // 1. Validate input
        if (request.featureMatrix.rows() == 0 || request.labels.size() == 0)
        {
            artifacts.warnings.push_back("Empty input data.");
            return artifacts;
        }

        // 2. Parse parameters
        const auto& paramInts = std::get<0>(request.parameters);
        const auto& paramDoubles = std::get<1>(request.parameters);
        // ... extract parameters

        // 3. Train model
        // ... model-specific training code

        // 4. Calculate metrics
        // ... evaluation code

        // 5. Save model
        std::string modelFilePath = request.outputDirectory + "/model_file.ext";
        // ... save model code
        artifacts.modelFilePath = modelFilePath;
        artifacts.generatedFiles.push_back(modelFilePath);

        // 6. Set success and metrics
        artifacts.success = true;
        artifacts.metrics["Metric1"] = value1;
        // ... more metrics
    }
    catch (const std::exception& e)
    {
        artifacts.warnings.push_back("Exception: " + std::string(e.what()));
        artifacts.success = false;
    }

    return artifacts;
}
```

---

## Appendix

### File Locations Summary

**FeatureViewer:**
- `ModuleDrivers/AIModelDriver.h/cpp`
- `GUI/MainWin_AIModels.cpp`
- `GUI/FVAIModelItem.h/cpp`
- `GUI/AIModelDropArea.h/cpp`
- `GUI/AIModelReport.h/cpp`
- `DataModeler/AIModelData.h`
- `AIModelWriter/AIModelWriter.cpp`

**CSMain:**
- `Radiomics/AI/csAIModelFeatures.hxx`
- `Radiomics/AI/csLinearRegression.hxx`
- `Scanner/Core/csAIModel.h/cpp`
- `GUI/Qt/csAIModelSettingsGUI.h/cpp`
- `Common/Core/csAIModelTypes.h`

### Key Dependencies

- **Qt**: GUI framework
- **Eigen**: Matrix operations
- **ITK**: Image processing (for features)
- **SQLite**: Database
- **CSMain Libraries**: Core functionality

### Configuration Files

- `AIModelDefs.ini`: Model definitions for training
- `scan.db`: Database with features and series
- Settings: Stored in application data directory

### Output Structure

```
OutputDirectory/
└── AI Models/
    └── Run_YYYY-MM-DD_hh-mm-ss ap[_ExperimentID]/
        ├── ModelName1/
        │   ├── training_summary.txt
        │   ├── model_file.ext
        │   └── [other artifacts]
        ├── ModelName2/
        │   └── ...
        └── ...
```

---

## Revision History

- **2025-11-18**: Initial documentation created
- Documented current implementation state
- Included Linear Regression as reference implementation
- Noted stub implementations for other models

---

**End of Documentation**

