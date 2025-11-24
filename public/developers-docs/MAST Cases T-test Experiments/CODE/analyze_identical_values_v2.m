function analyze_identical_values_v2()
    % Analyze the Combined_Mast_All_Studies_Features.xlsx file to find identical values
    
    % File path
    excelFile = 'C:\Users\tamer\Desktop\Mast Cases TTest experiments\Specific 4 features for all patients\Combined_Mast_All_Studies_Features.xlsx';
    
    if ~exist(excelFile, 'file')
        error('Excel file not found: %s', excelFile);
    end
    
    % Get sheet names
    [~, sheets] = xlsfinfo(excelFile);
    fprintf('Found %d sheets: %s\n', length(sheets), strjoin(sheets, ', '));
    
    % Features to analyze
    features = {'HRS1_Volume', 'HRS6_Volume', 'HRS7_6_Ratio', 'ADC_Prostate_Mean', 'ADC_HRS1_Mean', 'ADC_HRS6_Mean'};
    
    fprintf('\n=== IDENTICAL VALUES ANALYSIS ===\n');
    
    for featIdx = 1:length(features)
        featureName = features{featIdx};
        fprintf('\n--- %s ---\n', featureName);
        
        try
            % Read the sheet with headers
            data = readtable(excelFile, 'Sheet', featureName, 'Range', 'A1:Y1000');
            
            if isempty(data)
                fprintf('  No data found in sheet\n');
                continue;
            end
            
            fprintf('  Data size: %d rows x %d columns\n', height(data), width(data));
            fprintf('  Column names: %s\n', strjoin(data.Properties.VariableNames, ', '));
            
            % Find Patient_ID column
            patientIDCol = find(strcmp(data.Properties.VariableNames, 'Patient_ID'));
            if isempty(patientIDCol)
                % Try to find first column with patient data
                patientIDCol = 1;
                fprintf('  Warning: Patient_ID column not found, using first column\n');
            end
            
            % Get data columns (excluding Patient_ID)
            dataCols = setdiff(1:width(data), patientIDCol);
            
            % Analyze each data column
            identicalCount = 0;
            totalCols = length(dataCols);
            
            for colIdx = 1:length(dataCols)
                colNum = dataCols(colIdx);
                colName = data.Properties.VariableNames{colNum};
                colData = data{:, colNum};
                
                % Remove NaN values for analysis
                validData = colData(~isnan(colData));
                
                if isempty(validData)
                    fprintf('  %s: All NaN values\n', colName);
                    identicalCount = identicalCount + 1;
                elseif length(unique(validData)) == 1
                    fprintf('  %s: ALL IDENTICAL = %.4f\n', colName, validData(1));
                    identicalCount = identicalCount + 1;
                else
                    % Check for high percentage of identical values
                    uniqueVals = unique(validData);
                    if length(uniqueVals) <= 5
                        fprintf('  %s: Only %d unique values: %s\n', colName, length(uniqueVals), mat2str(uniqueVals));
                    end
                end
            end
            
            fprintf('  Summary: %d/%d columns have identical values\n', identicalCount, totalCols);
            
        catch ME
            fprintf('  Error reading sheet: %s\n', ME.message);
        end
    end
    
    % Cross-experiment comparison
    fprintf('\n=== CROSS-EXPERIMENT COMPARISON ===\n');
    
    for featIdx = 1:length(features)
        featureName = features{featIdx};
        fprintf('\n--- %s Cross-Experiment Analysis ---\n', featureName);
        
        try
            data = readtable(excelFile, 'Sheet', featureName, 'Range', 'A1:Y1000');
            
            if isempty(data)
                continue;
            end
            
            colNames = data.Properties.VariableNames;
            
            % Group columns by experiment
            exp1Cols = find(contains(colNames, 'Exp001'));
            exp2Cols = find(contains(colNames, 'Exp002'));
            exp3Cols = find(contains(colNames, 'Exp003'));
            exp4Cols = find(contains(colNames, 'Exp004'));
            
            % Compare experiments
            experiments = {exp1Cols, exp2Cols, exp3Cols, exp4Cols};
            expNames = {'Exp001', 'Exp002', 'Exp003', 'Exp004'};
            
            for expIdx = 1:4
                if ~isempty(experiments{expIdx})
                    expCols = experiments{expIdx};
                    fprintf('  %s: %d columns\n', expNames{expIdx}, length(expCols));
                    
                    % Check if all columns in this experiment are identical
                    if length(expCols) > 1
                        allIdentical = true;
                        for i = 1:length(expCols)
                            for j = i+1:length(expCols)
                                col1 = data{:, expCols(i)};
                                col2 = data{:, expCols(j)};
                                
                                % Remove NaN and compare
                                validMask = ~isnan(col1) & ~isnan(col2);
                                valid1 = col1(validMask);
                                valid2 = col2(validMask);
                                
                                if ~isempty(valid1) && ~all(valid1 == valid2)
                                    allIdentical = false;
                                    break;
                                end
                            end
                            if ~allIdentical
                                break;
                            end
                        end
                        
                        if allIdentical
                            fprintf('    ALL COLUMNS IDENTICAL within %s\n', expNames{expIdx});
                        end
                    end
                end
            end
            
        catch ME
            fprintf('  Error in cross-experiment analysis: %s\n', ME.message);
        end
    end
    
    % Patient-level analysis
    fprintf('\n=== PATIENT-LEVEL ANALYSIS ===\n');
    
    for featIdx = 1:length(features)
        featureName = features{featIdx};
        fprintf('\n--- %s Patient Analysis ---\n', featureName);
        
        try
            data = readtable(excelFile, 'Sheet', featureName, 'Range', 'A1:Y1000');
            
            if isempty(data)
                continue;
            end
            
            % Find Patient_ID column
            patientIDCol = find(strcmp(data.Properties.VariableNames, 'Patient_ID'));
            if isempty(patientIDCol)
                patientIDCol = 1;
            end
            
            % Get data columns (excluding Patient_ID)
            dataCols = setdiff(1:width(data), patientIDCol);
            
            % Check each patient
            identicalPatients = 0;
            totalPatients = height(data);
            
            for patIdx = 1:totalPatients
                patientData = data{patIdx, dataCols}; % All data columns
                
                % Remove NaN values
                validData = patientData(~isnan(patientData));
                
                if length(unique(validData)) == 1 && ~isempty(validData)
                    patientID = data{patIdx, patientIDCol};
                    fprintf('  Patient %s: ALL VALUES IDENTICAL = %.4f\n', string(patientID), validData(1));
                    identicalPatients = identicalPatients + 1;
                end
            end
            
            fprintf('  Summary: %d/%d patients have identical values across all experiments\n', identicalPatients, totalPatients);
            
        catch ME
            fprintf('  Error in patient analysis: %s\n', ME.message);
        end
    end
    
    fprintf('\n=== ANALYSIS COMPLETE ===\n');
end
