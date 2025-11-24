function create_experiment_summary()
% create_experiment_summary
% Reads all experiment ResultsXXX.xlsx files and creates a summary Excel file
% with p-values for all features (ADC and DCE combined) in a single sheet per experiment.
% Adds two empty columns and a column listing the most significant features (p < 0.05, sorted).
%
% Usage:
%   create_experiment_summary()
%
% Output:
%   Experiment_Summary.xlsx with one sheet per experiment

    % Use GUI to select root directory
    rootDir = uigetdir('', 'Select root directory containing experiment folders');
    if rootDir == 0
        fprintf('No directory selected. Exiting.\n');
        return;
    end
    
    % Find all experiment folders
    expDirs = dir(fullfile(rootDir, 'Experiment*'));
    expDirs = expDirs([expDirs.isdir]);
    
    if isempty(expDirs)
        fprintf('No experiment folders found in %s\n', rootDir);
        return;
    end
    
    % Create output Excel file
    outputFile = fullfile(rootDir, 'Experiment_Summary.xlsx');
    
    fprintf('Processing %d experiment folders...\n', length(expDirs));
    
    % Process each experiment
    for i = 1:length(expDirs)
        expName = expDirs(i).name;
        
        % Extract experiment number from folder name
        expMatch = regexp(expName, 'Experiment(\d+)', 'tokens');
        if ~isempty(expMatch)
            expNum = str2double(expMatch{1}{1});
            expNumStr = sprintf('%03d', expNum); % Format as 3-digit string (001, 002, etc.)
            xlsxFile = fullfile(rootDir, expName, sprintf('Results%s.xlsx', expNumStr));
        else
            fprintf('Could not extract experiment number from %s\n', expName);
            continue;
        end
        
        if exist(xlsxFile, 'file')
            try
                % Read both ADC and DCE sheets
                T_ADC = readtable(xlsxFile, 'Sheet', 'ADC', 'VariableNamingRule', 'preserve');
                T_DCE = readtable(xlsxFile, 'Sheet', 'DCE', 'VariableNamingRule', 'preserve');
                % Get feature names from 3rd column onward
                featureNames_ADC = T_ADC.Properties.VariableNames(3:end);
                featureNames_DCE = T_DCE.Properties.VariableNames(3:end);
                % Robustly extract p-values from last row for each feature
                p_ADC = extract_pvals_from_last_row(T_ADC, 3);
                p_DCE = extract_pvals_from_last_row(T_DCE, 3);
                % Combine
                allFeatures = [featureNames_ADC, featureNames_DCE];
                allP = [p_ADC, p_DCE];
                % Build summary table (no empty columns)
                summaryTable = table(allFeatures', allP', 'VariableNames', {'Feature', 'P_value'});
                % Find significant features (p < 0.05)
                p_numeric = allP;
                sigIdx = find(p_numeric < 0.05 & ~isnan(p_numeric));
                [sortedP, sortIdx] = sort(p_numeric(sigIdx));
                sigFeatures = allFeatures(sigIdx(sortIdx));
                % Create table for sorted significant features and their p-values
                sigTable = table(sigFeatures', sortedP', 'VariableNames', {'Feature', 'P_value'});
                % Write summary table to Excel sheet
                writetable(summaryTable, outputFile, 'Sheet', expName);
                % Write sorted significant features table to a new sheet
                writetable(sigTable, outputFile, 'Sheet', [expName '_Significant']);
                fprintf('Processed: %s (Results%s.xlsx)\n', expName, expNumStr);
            catch ME
                fprintf('Error processing %s: %s\n', expName, ME.message);
            end
        else
            fprintf('Results%s.xlsx not found in %s\n', expNumStr, expName);
        end
    end
    
    fprintf('\nSummary created: %s\n', outputFile);
    fprintf('Each sheet includes all features (ADC and DCE), p-values, two empty columns, and significant features (p < 0.05, sorted).\n');
end 

function pvals = extract_pvals_from_last_row(T, startCol)
    % Extracts p-values from the last row of table T, starting from column startCol
    n = width(T) - (startCol-1);
    pvals = nan(1, n);
    for j = 1:n
        col = T{:, j+startCol-1};
        val = col(end);
        if iscell(val)
            val = val{1};
        end
        if isnumeric(val) && isscalar(val)
            pvals(j) = val;
        elseif ischar(val) || isstring(val)
            numVal = str2double(val);
            if ~isnan(numVal)
                pvals(j) = numVal;
            end
        end
        % else leave as NaN
    end
end 