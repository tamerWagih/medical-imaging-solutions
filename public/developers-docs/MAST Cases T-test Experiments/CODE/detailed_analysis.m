function detailed_analysis()
    % Detailed analysis of the Excel file structure and identical values
    
    excelFile = 'C:\Users\tamer\Desktop\Mast Cases TTest experiments\Specific 4 features for all patients\Combined_Mast_All_Studies_Features.xlsx';
    
    % Read one sheet to understand structure
    data = readtable(excelFile, 'Sheet', 'HRS1_Volume', 'Range', 'A1:Y5', 'VariableNamingRule', 'preserve');
    
    fprintf('=== EXCEL FILE STRUCTURE ANALYSIS ===\n');
    fprintf('Column names (first 25):\n');
    for i = 1:min(25, width(data))
        fprintf('  %d: %s\n', i, data.Properties.VariableNames{i});
    end
    
    % Read full data with preserved names
    data = readtable(excelFile, 'Sheet', 'HRS1_Volume', 'VariableNamingRule', 'preserve');
    
    fprintf('\n=== DETAILED IDENTICAL VALUES ANALYSIS ===\n');
    
    % Analyze each column
    for i = 2:width(data) % Skip Patient_ID
        colName = data.Properties.VariableNames{i};
        colData = data{:, i};
        
        % Remove NaN values
        validData = colData(~isnan(colData));
        
        if isempty(validData)
            fprintf('Column %d (%s): All NaN values\n', i, colName);
        elseif length(unique(validData)) == 1
            fprintf('Column %d (%s): ALL IDENTICAL = %.4f\n', i, colName, validData(1));
        else
            uniqueVals = unique(validData);
            if length(uniqueVals) <= 10
                fprintf('Column %d (%s): %d unique values: %s\n', i, colName, length(uniqueVals), mat2str(uniqueVals));
            else
                fprintf('Column %d (%s): %d unique values (range: %.4f to %.4f)\n', i, colName, length(uniqueVals), min(validData), max(validData));
            end
        end
    end
    
    % Check for identical values across experiments
    fprintf('\n=== CROSS-EXPERIMENT IDENTICAL VALUES ===\n');
    
    % Find experiment columns
    exp1Cols = find(contains(data.Properties.VariableNames, 'Exp001'));
    exp2Cols = find(contains(data.Properties.VariableNames, 'Exp002'));
    exp3Cols = find(contains(data.Properties.VariableNames, 'Exp003'));
    exp4Cols = find(contains(data.Properties.VariableNames, 'Exp004'));
    
    experiments = {exp1Cols, exp2Cols, exp3Cols, exp4Cols};
    expNames = {'Exp001', 'Exp002', 'Exp003', 'Exp004'};
    
    for expIdx = 1:4
        if ~isempty(experiments{expIdx})
            expCols = experiments{expIdx};
            fprintf('\n%s (%d columns):\n', expNames{expIdx}, length(expCols));
            
            for colIdx = 1:length(expCols)
                colNum = expCols(colIdx);
                colName = data.Properties.VariableNames{colNum};
                colData = data{:, colNum};
                
                validData = colData(~isnan(colData));
                
                if isempty(validData)
                    fprintf('  %s: All NaN\n', colName);
                elseif length(unique(validData)) == 1
                    fprintf('  %s: ALL IDENTICAL = %.4f\n', colName, validData(1));
                else
                    uniqueVals = unique(validData);
                    if length(uniqueVals) <= 5
                        fprintf('  %s: %d unique values: %s\n', colName, length(uniqueVals), mat2str(uniqueVals));
                    end
                end
            end
        end
    end
    
    % Check if experiments are identical to each other
    fprintf('\n=== EXPERIMENT-TO-EXPERIMENT COMPARISON ===\n');
    
    if length(exp1Cols) == 1 && length(exp2Cols) == 1 && length(exp3Cols) == 1 && length(exp4Cols) == 1
        exp1Data = data{:, exp1Cols(1)};
        exp2Data = data{:, exp2Cols(1)};
        exp3Data = data{:, exp3Cols(1)};
        exp4Data = data{:, exp4Cols(1)};
        
        % Compare experiments
        comparisons = {
            {'Exp001', 'Exp002', exp1Data, exp2Data},
            {'Exp001', 'Exp003', exp1Data, exp3Data},
            {'Exp001', 'Exp004', exp1Data, exp4Data},
            {'Exp002', 'Exp003', exp2Data, exp3Data},
            {'Exp002', 'Exp004', exp2Data, exp4Data},
            {'Exp003', 'Exp004', exp3Data, exp4Data}
        };
        
        for compIdx = 1:length(comparisons)
            exp1Name = comparisons{compIdx}{1};
            exp2Name = comparisons{compIdx}{2};
            data1 = comparisons{compIdx}{3};
            data2 = comparisons{compIdx}{4};
            
            % Remove NaN and compare
            validMask = ~isnan(data1) & ~isnan(data2);
            valid1 = data1(validMask);
            valid2 = data2(validMask);
            
            if isempty(valid1)
                fprintf('%s vs %s: No valid data to compare\n', exp1Name, exp2Name);
            elseif all(valid1 == valid2)
                fprintf('%s vs %s: IDENTICAL\n', exp1Name, exp2Name);
            else
                fprintf('%s vs %s: DIFFERENT\n', exp1Name, exp2Name);
            end
        end
    end
end
