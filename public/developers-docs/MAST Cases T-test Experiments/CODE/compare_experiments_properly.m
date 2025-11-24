function compare_experiments_properly()
    % Compare same study across different experiments to find identical values
    
    excelFile = 'C:\Users\tamer\Desktop\Mast Cases TTest experiments\Specific 4 features for all patients\Combined_Mast_All_Studies_Features.xlsx';
    
    % Features to analyze
    features = {'HRS1_Volume', 'HRS6_Volume', 'HRS7_6_Ratio', 'ADC_Prostate_Mean', 'ADC_HRS1_Mean', 'ADC_HRS6_Mean'};
    studies = {'Confirmatory', '12m', '24m', '36m'};
    experiments = {'Exp001', 'Exp002', 'Exp003', 'Exp004'};
    
    fprintf('=== EXPERIMENT COMPARISON ANALYSIS ===\n');
    fprintf('Comparing same study across different experiments\n\n');
    
    for featIdx = 1:length(features)
        featureName = features{featIdx};
        fprintf('--- %s ---\n', featureName);
        
        try
            % Read the sheet
            data = readtable(excelFile, 'Sheet', featureName, 'VariableNamingRule', 'preserve');
            
            if isempty(data)
                fprintf('  No data found\n');
                continue;
            end
            
            % For each study, compare across experiments
            for studyIdx = 1:length(studies)
                studyName = studies{studyIdx};
                fprintf('\n  %s Study:\n', studyName);
                
                % Find columns for this study across all experiments
                studyCols = [];
                for expIdx = 1:length(experiments)
                    expName = experiments{expIdx};
                    % Look for columns containing both study name and experiment
                    colNames = data.Properties.VariableNames;
                    for colIdx = 1:length(colNames)
                        colName = colNames{colIdx};
                        if contains(colName, studyName) && contains(colName, expName)
                            studyCols(end+1) = colIdx;
                            break;
                        end
                    end
                end
                
                if length(studyCols) ~= 4
                    fprintf('    Warning: Found %d columns instead of 4\n', length(studyCols));
                    continue;
                end
                
                % Compare each experiment pair
                identicalPairs = 0;
                totalPairs = 0;
                
                for i = 1:length(studyCols)
                    for j = i+1:length(studyCols)
                        totalPairs = totalPairs + 1;
                        col1 = studyCols(i);
                        col2 = studyCols(j);
                        
                        exp1Name = experiments{i};
                        exp2Name = experiments{j};
                        
                        data1 = data{:, col1};
                        data2 = data{:, col2};
                        
                        % Remove NaN values
                        validMask = ~isnan(data1) & ~isnan(data2);
                        valid1 = data1(validMask);
                        valid2 = data2(validMask);
                        
                        if isempty(valid1)
                            fprintf('    %s vs %s: No valid data\n', exp1Name, exp2Name);
                        elseif all(valid1 == valid2)
                            fprintf('    %s vs %s: IDENTICAL (%.4f)\n', exp1Name, exp2Name, valid1(1));
                            identicalPairs = identicalPairs + 1;
                        else
                            % Check how many values are identical
                            identicalCount = sum(valid1 == valid2);
                            identicalPercent = (identicalCount / length(valid1)) * 100;
                            
                            if identicalPercent > 90
                                fprintf('    %s vs %s: %.1f%% identical (%d/%d)\n', exp1Name, exp2Name, identicalPercent, identicalCount, length(valid1));
                            else
                                fprintf('    %s vs %s: DIFFERENT (%.1f%% identical)\n', exp1Name, exp2Name, identicalPercent);
                            end
                        end
                    end
                end
                
                fprintf('    Summary: %d/%d experiment pairs are identical\n', identicalPairs, totalPairs);
            end
            
        catch ME
            fprintf('  Error: %s\n', ME.message);
        end
    end
    
    % Patient-level analysis
    fprintf('\n\n=== PATIENT-LEVEL IDENTICAL VALUES ===\n');
    
    for featIdx = 1:length(features)
        featureName = features{featIdx};
        fprintf('\n--- %s Patient Analysis ---\n', featureName);
        
        try
            data = readtable(excelFile, 'Sheet', featureName, 'VariableNamingRule', 'preserve');
            
            if isempty(data)
                continue;
            end
            
            % For each study, find patients with identical values across experiments
            for studyIdx = 1:length(studies)
                studyName = studies{studyIdx};
                
                % Find columns for this study
                studyCols = [];
                for expIdx = 1:length(experiments)
                    expName = experiments{expIdx};
                    colNames = data.Properties.VariableNames;
                    for colIdx = 1:length(colNames)
                        colName = colNames{colIdx};
                        if contains(colName, studyName) && contains(colName, expName)
                            studyCols(end+1) = colIdx;
                            break;
                        end
                    end
                end
                
                if length(studyCols) ~= 4
                    continue;
                end
                
                % Check each patient
                identicalPatients = 0;
                totalPatients = height(data);
                
                for patIdx = 1:totalPatients
                    patientData = data{patIdx, studyCols};
                    
                    % Remove NaN values
                    validData = patientData(~isnan(patientData));
                    
                    if length(unique(validData)) == 1 && ~isempty(validData)
                        patientID = data{patIdx, 1}; % Patient_ID column
                        fprintf('  %s - %s: ALL IDENTICAL = %.4f\n', studyName, string(patientID), validData(1));
                        identicalPatients = identicalPatients + 1;
                    end
                end
                
                if identicalPatients > 0
                    fprintf('  %s: %d/%d patients have identical values across experiments\n', studyName, identicalPatients, totalPatients);
                end
            end
            
        catch ME
            fprintf('  Error: %s\n', ME.message);
        end
    end
    
    fprintf('\n=== ANALYSIS COMPLETE ===\n');
end
