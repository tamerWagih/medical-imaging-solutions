function combine_study_features()
    % Combine features from 4 studies into a single Excel file
    % 4 sheets (one per feature), each with first 4 experiments from each study
    % 17 columns: Patient_ID + 4 experiments × 4 studies
    
    % Select root folder using GUI
    rootFolder = uigetdir('', 'Select Root Folder Containing Study Feature Files');
    
    if rootFolder == 0
        disp('No folder selected. Exiting...');
        return;
    end
    
    disp(['Selected root folder: ', rootFolder]);
    disp(' ');
    
    % Define studies and features
    studies = {'Confirmatory', '12m', '24m', '36m'};
    features = {'HRS1_Volume', 'HRS6_Volume', 'HRS7_6_Ratio', 'ADC_Prostate_Mean', 'ADC_HRS1_Mean', 'ADC_HRS6_Mean'};
    featureSheetNames = {'HRS1_Volume', 'HRS6_Volume', 'HRS7_6_Ratio', 'ADC_Prostate_Mean', 'ADC_HRS1_Mean', 'ADC_HRS6_Mean'};
    
    % Experiment parameters (abbreviated)
    expParams = {
        'WU=4, PZ=850/1050/1200',      % EXP001
        'WU=2.5, PZ=850/1050/1200',    % EXP002
        'WU=3, PZ=850/1050/1200',      % EXP003
        'WU=3.5, PZ=850/1050/1200'     % EXP004
    };
    
    numStudies = length(studies);
    numExperimentsToUse = 4; % Only first 4 experiments
    
    % Find Excel files for each study
    studyFiles = cell(numStudies, 1);
    for i = 1:numStudies
        pattern = fullfile(rootFolder, sprintf('%s_Specific_Features.xlsx', studies{i}));
        if exist(pattern, 'file')
            studyFiles{i} = pattern;
            fprintf('Found: %s\n', studies{i});
        else
            error('Could not find Excel file for %s study. Expected: %s', studies{i}, pattern);
        end
    end
    
    disp(' ');
    disp('Loading data from all studies and experiments...');
    
    % Load all data: [study][experiment]
    allData = cell(numStudies, numExperimentsToUse);
    
    for studyIdx = 1:numStudies
        for expNum = 1:numExperimentsToUse
            expName = sprintf('Experiment%03d', expNum);
            
            try
                data = readtable(studyFiles{studyIdx}, 'Sheet', expName);
                allData{studyIdx, expNum} = data;
                fprintf('  Loaded %s - %s (%d patients)\n', studies{studyIdx}, expName, height(data));
            catch ME
                warning('Could not read %s from %s: %s', expName, studies{studyIdx}, ME.message);
                allData{studyIdx, expNum} = createEmptyStudyTable();
            end
        end
    end
    
    
    disp(' ');
    disp('Creating feature sheets...');
    
    % Output file
    outputFile = fullfile(rootFolder, 'Combined_Mast_All_Studies_Features.xlsx');
    
    % Delete existing file if it exists
    if exist(outputFile, 'file')
        delete(outputFile);
    end
    
    % Process each feature
    for featIdx = 1:length(features)
        featureName = features{featIdx};
        sheetName = featureSheetNames{featIdx};
        
        fprintf('Processing feature: %s...\n', featureName);
        
        % Create combined table for this feature
        % All features now come from *_Specific_Features.xlsx files
        combinedTable = combineFeatureData(allData, studies, featureName, numExperimentsToUse);
        
        % Write to Excel with merged headers
        writeFeatureSheet(outputFile, sheetName, combinedTable, studies, numExperimentsToUse, expParams);
        
        fprintf('  Written: %s (%d patients)\n', sheetName, height(combinedTable));
    end
    
    disp(' ');
    disp(['Combined Excel file saved: ', outputFile]);
    disp(' ');
    disp('=== File Structure ===');
    disp('6 sheets (one per feature):');
    disp('  - HRS1_Volume');
    disp('  - HRS6_Volume');
    disp('  - HRS7_6_Ratio');
    disp('  - ADC_Prostate_Mean');
    disp('  - ADC_HRS1_Mean');
    disp('  - ADC_HRS6_Mean');
    disp(' ');
    disp('17 columns per sheet with two-row headers:');
    disp('  Row 1 (merged): Patient_ID | Exp001 (WU=4, PZ=850/1050/1200) | Exp002 (WU=2.5, PZ=850/1050/1200) | ...');
    disp('  Row 2: | Feature_Conf | Feature_12m | Feature_24m | Feature_36m | (repeated 4 times)');
    disp(' ');
    disp('Example for HRS1_Volume sheet:');
    disp('  Row 2: | HRS1_Volume_Confirmatory | HRS1_Volume_12m | HRS1_Volume_24m | HRS1_Volume_36m | ...');
    disp(' ');
    disp('Column names format: FeatureName_StudyName_ExpNumber');
    disp('  Example: HRS1_Volume_Confirmatory_Exp001, HRS1_Volume_12m_Exp001, etc.');
    disp(' ');
    disp('Data sources:');
    disp('  - All features: from *_Specific_Features.xlsx files (first 4 experiments only)');
    disp('  - Features: HRS1_Volume, HRS6_Volume, HRS7_6_Ratio, ADC_Prostate_Mean, ADC_HRS1_Mean, ADC_HRS6_Mean');
    disp(' ');
    disp('Done!');
end

function emptyTable = createEmptyStudyTable()
    % Create an empty table with proper structure
    emptyTable = table(cell(0,1), [], [], [], [], [], [], ...
        'VariableNames', {'Patient_ID', 'HRS1_Volume', 'HRS6_Volume', 'HRS7_6_Ratio', 'ADC_Prostate_Mean', 'ADC_HRS1_Mean', 'ADC_HRS6_Mean'});
end

function combinedTable = combineFeatureData(allData, studies, featureName, numExperiments)
    % Combine data for a specific feature across all studies and experiments
    % allData: [numStudies x numExperiments] cell array of tables
    
    numStudies = length(studies);
    
    % Get all unique patient IDs across all studies and experiments
    allPatients = {};
    for studyIdx = 1:numStudies
        for expIdx = 1:numExperiments
            data = allData{studyIdx, expIdx};
            if ~isempty(data) && height(data) > 0
                allPatients = [allPatients; data.Patient_ID];
            end
        end
    end
    
    allPatients = unique(allPatients);
    allPatients = sort(allPatients);
    
    if isempty(allPatients)
        % No patients found - create empty table
        combinedTable = table();
        return;
    end
    
    numPatients = length(allPatients);
    
    % Initialize combined data
    % 1 (Patient_ID) + numStudies * numExperiments = 1 + 16 = 17 columns
    combinedData = cell(numPatients, 1 + numStudies * numExperiments);
    
    % Fill in patient IDs
    combinedData(:, 1) = allPatients;
    
    % Fill in feature values from each study and experiment
    for studyIdx = 1:numStudies
        for expIdx = 1:numExperiments
            data = allData{studyIdx, expIdx};
            
            % Column offset: 1 (Patient_ID) + (studyIdx-1)*numExperiments + (expIdx-1)
            colIdx = 1 + (studyIdx - 1) * numExperiments + expIdx;
            
            for patIdx = 1:numPatients
                patientID = allPatients{patIdx};
                
                % Find patient in this experiment's data
                if ~isempty(data) && height(data) > 0
                    rowIdx = find(strcmp(data.Patient_ID, patientID));
                    
                    if ~isempty(rowIdx)
                        % Patient found - extract the specific feature
                        combinedData{patIdx, colIdx} = data.(featureName)(rowIdx(1));
                    else
                        % Patient not found - fill with NaN
                        combinedData{patIdx, colIdx} = NaN;
                    end
                else
                    % No data - fill with NaN
                    combinedData{patIdx, colIdx} = NaN;
                end
            end
        end
    end
    
    % Create variable names
    % Format: FeatureName_StudyName_ExpNumber
    varNames = {'Patient_ID'};
    for expIdx = 1:numExperiments
        for studyIdx = 1:numStudies
            % Column order: Exp001 (Confirmatory, 12m, 24m, 36m), Exp002 (Confirmatory, 12m, 24m, 36m), etc.
            colIdx = 1 + (expIdx - 1) * numStudies + studyIdx;
            varNames{colIdx} = sprintf('%s_%s_Exp%03d', featureName, studies{studyIdx}, expIdx);
        end
    end
    
    % Reorganize data to match new column order
    reorganizedData = cell(numPatients, 1 + numStudies * numExperiments);
    reorganizedData(:, 1) = combinedData(:, 1); % Patient IDs
    
    for expIdx = 1:numExperiments
        for studyIdx = 1:numStudies
            % Old position: 1 + (studyIdx-1)*numExperiments + expIdx
            oldColIdx = 1 + (studyIdx - 1) * numExperiments + expIdx;
            % New position: 1 + (expIdx-1)*numStudies + studyIdx
            newColIdx = 1 + (expIdx - 1) * numStudies + studyIdx;
            reorganizedData(:, newColIdx) = combinedData(:, oldColIdx);
        end
    end
    
    % Create table with reorganized data
    combinedTable = cell2table(reorganizedData, 'VariableNames', varNames);
end

function writeFeatureSheet(outputFile, sheetName, dataTable, studies, numExperiments, expParams)
    % Write feature sheet to Excel with two-row merged headers
    % Row 1: Experiment numbers (merged across 4 studies each)
    % Row 2: FeatureName_StudyName under each experiment
    
    if isempty(dataTable) || height(dataTable) == 0
        % Write empty table
        writetable(dataTable, outputFile, 'Sheet', sheetName);
        return;
    end
    
    numStudies = length(studies);
    
    % First, write the data table (will be row 3 onwards)
    writetable(dataTable, outputFile, 'Sheet', sheetName, 'Range', 'A3');
    
    % Create two header rows
    % Row 1: Experiment numbers (with empty cells to be merged)
    headerRow1 = cell(1, width(dataTable));
    headerRow1{1} = 'Patient_ID';
    
    for expIdx = 1:numExperiments
        % First column of this experiment group
        colIdx = 1 + (expIdx - 1) * numStudies + 1;
        headerRow1{colIdx} = sprintf('Exp%03d (%s)', expIdx, expParams{expIdx});
        % Leave other columns empty (they will be merged)
        for i = 1:(numStudies-1)
            headerRow1{colIdx + i} = '';
        end
    end
    
    % Row 2: FeatureName_StudyName (repeated under each experiment)
    headerRow2 = cell(1, width(dataTable));
    headerRow2{1} = '';  % Empty under Patient_ID
    
    for expIdx = 1:numExperiments
        for studyIdx = 1:numStudies
            colIdx = 1 + (expIdx - 1) * numStudies + studyIdx;
            headerRow2{colIdx} = sprintf('%s_%s', sheetName, studies{studyIdx});
        end
    end
    
    % Write both header rows
    writecell(headerRow1, outputFile, 'Sheet', sheetName, 'Range', 'A1');
    writecell(headerRow2, outputFile, 'Sheet', sheetName, 'Range', 'A2');
    
    % Use Excel COM to merge cells and format
    try
        Excel = actxserver('Excel.Application');
        Excel.Visible = false;
        
        % Get absolute path
        if ~isAbsolutePath(outputFile)
            absPath = fullfile(pwd, outputFile);
        else
            absPath = outputFile;
        end
        
        Workbook = Excel.Workbooks.Open(absPath);
        Sheet = Workbook.Sheets.Item(sheetName);
        
        % Merge Patient_ID cell vertically (rows 1-2)
        Sheet.Range('A1:A2').Merge;
        Sheet.Range('A1:A2').VerticalAlignment = -4108; % xlCenter
        Sheet.Range('A1:A2').HorizontalAlignment = -4108; % xlCenter
        Sheet.Range('A1:A2').Font.Bold = true;
        
        % Merge cells for each experiment (row 1 only)
        for expIdx = 1:numExperiments
            startCol = 1 + (expIdx - 1) * numStudies + 1; % +1 for Patient_ID column
            endCol = startCol + numStudies - 1;
            
            % Convert column numbers to Excel letters
            startColLetter = columnNumberToLetter(startCol);
            endColLetter = columnNumberToLetter(endCol);
            
            % Merge range in row 1
            mergeRange = sprintf('%s1:%s1', startColLetter, endColLetter);
            Sheet.Range(mergeRange).Merge;
            Sheet.Range(mergeRange).HorizontalAlignment = -4108; % xlCenter
            Sheet.Range(mergeRange).Font.Bold = true;
        end
        
        % Format row 2 (study names)
        headerRow2Range = sprintf('B2:%s2', columnNumberToLetter(width(dataTable)));
        Sheet.Range(headerRow2Range).HorizontalAlignment = -4108; % xlCenter
        Sheet.Range(headerRow2Range).Font.Bold = true;
        
        % Save and close
        Workbook.Save;
        Workbook.Close;
        Excel.Quit;
        delete(Excel);
        
    catch e
        error('Could not create merged headers: %s', e.message);
        % Clean up Excel if it was opened
        try
            if exist('Workbook', 'var')
                Workbook.Close(false);
            end
            if exist('Excel', 'var')
                Excel.Quit;
                delete(Excel);
            end
        catch
        end
    end
end

function letter = columnNumberToLetter(colNum)
    % Convert column number to Excel column letter (e.g., 1->A, 27->AA)
    letter = '';
    while colNum > 0
        modulo = mod(colNum - 1, 26);
        letter = [char(65 + modulo), letter];
        colNum = floor((colNum - modulo) / 26);
    end
end

function isAbs = isAbsolutePath(path)
    % Check if path is absolute
    if ispc
        % Windows: starts with drive letter like C:\
        isAbs = length(path) >= 3 && path(2) == ':' && (path(3) == '\' || path(3) == '/');
    else
        % Unix: starts with /
        isAbs = ~isempty(path) && path(1) == '/';
    end
end

