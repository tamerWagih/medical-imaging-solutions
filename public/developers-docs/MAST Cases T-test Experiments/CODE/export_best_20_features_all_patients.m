function export_best_20_features_all_patients()
% export_best_20_features_all_patients
% Exports the best 20 features for all patients across all timepoints
% Reads the best 20 features from Top_20_Features.xlsx, then extracts
% mast_id, label, and the specific feature columns from Results001.xlsx
% in each timepoint folder. Creates one Excel file with 20 sheets (one per feature).

    fprintf('=== Exporting Best 20 Features for All Patients ===\n');
    
    % Load the best 20 features
    top_20_file = '../Experiment Analysis/Top_20_Features.xlsx';
    if ~exist(top_20_file, 'file')
        error('Top_20_Features.xlsx not found. Please run analyze_best_features_simple first.');
    end
    
    top_20_table = readtable(top_20_file);
    best_features = top_20_table.Feature;
    
    % Convert to cell array if needed
    if isstring(best_features) || ischar(best_features)
        best_features = cellstr(best_features);
    end
    
    fprintf('Loaded %d best features from %s\n', length(best_features), top_20_file);
    disp('Best features:');
    for i = 1:length(best_features)
        fprintf('  %d. %s\n', i, best_features{i});
    end
    
    % Define timepoints and their corresponding folders
    timepoints = {'Confirmatory', '12m', '24m', '36m'};
    timepoint_folders = {'Confirmatory', '12m', '24m', '36m'};
    
    fprintf('\nProcessing %d timepoints: %s\n', length(timepoints), strjoin(timepoints, ', '));
    
    % STEP 1: Collect all unique patients across all timepoints
    fprintf('\n=== STEP 1: Collecting all unique patients ===\n');
    all_patients = [];
    
    for tp_idx = 1:length(timepoints)
        timepoint = timepoints{tp_idx};
        folder = timepoint_folders{tp_idx};
        
        fprintf('Collecting patients from %s timepoint...\n', timepoint);
        
        % Construct path to Results001.xlsx
        results_file = sprintf('../%s/Results001.xlsx', folder);
        
        if ~exist(results_file, 'file')
            fprintf('  Warning: %s not found. Skipping.\n', results_file);
            continue;
        end
        
        try
            % Read the first sheet (ADC) to get patient list
            T = readtable(results_file, 'Sheet', 1, 'VariableNamingRule', 'preserve');
            
            % Keep all rows including p-value summary rows
            % Only remove truly empty mast_id rows
            valid_rows = ~strcmp(string(T.mast_id), '');
            T = T(valid_rows, :);
            
            % Extract mast_id and label
            patient_data = T(:, {'mast_id', 'label'});
            
            % Add timepoint information
            patient_data.Timepoint = repmat({timepoint}, height(patient_data), 1);
            
            % Combine with existing patients
            if isempty(all_patients)
                all_patients = patient_data;
            else
                all_patients = [all_patients; patient_data];
            end
            
            fprintf('  Found %d patients in %s (after removing summary rows)\n', height(patient_data), timepoint);
            
        catch ME
            fprintf('  Error reading %s: %s\n', results_file, ME.message);
            continue;
        end
    end
    
    % Get unique patients (mast_id, label combinations)
    [unique_patients, unique_idx] = unique(all_patients(:, {'mast_id', 'label'}), 'rows');
    
    % Ensure only one p-value row per feature sheet
    p_value_rows = find(strcmp(unique_patients.mast_id, 'p-value'));
    if length(p_value_rows) > 1
        % Keep only the first p-value row
        unique_patients = [unique_patients(1:p_value_rows(1)-1, :); 
                          unique_patients(p_value_rows(1), :);
                          unique_patients(p_value_rows(end)+1:end, :)];
    end
    
    fprintf('\nTotal unique patients across all timepoints: %d\n', height(unique_patients));
    
    % Initialize output file
    output_file = '../Best_20_Features_All_Patients.xlsx';
    
    % Delete existing file if it exists
    if exist(output_file, 'file')
        delete(output_file);
    end
    
    % STEP 2: Process each feature and collect data for all unique patients
    fprintf('\n=== STEP 2: Processing features for all patients ===\n');
    
    for feat_idx = 1:length(best_features)
        feature_name = best_features{feat_idx};
        fprintf('\nProcessing feature %d/%d: %s\n', feat_idx, length(best_features), feature_name);
        
        % Start with the complete patient list
        final_table = unique_patients;
        
        % Initialize columns for each timepoint
        for tp_idx = 1:length(timepoints)
            timepoint = timepoints{tp_idx};
            col_name = sprintf('%s_%s', feature_name, timepoint);
            final_table.(col_name) = NaN(height(final_table), 1);
        end
        
        % Process each timepoint to fill in feature values
        for tp_idx = 1:length(timepoints)
            timepoint = timepoints{tp_idx};
            folder = timepoint_folders{tp_idx};
            
            fprintf('  Processing %s timepoint...\n', timepoint);
            
            % Construct path to Results001.xlsx
            results_file = sprintf('../%s/Results001.xlsx', folder);
            
            if ~exist(results_file, 'file')
                fprintf('    Warning: %s not found. Skipping.\n', results_file);
                continue;
            end
            
            % Determine which sheet to read (ADC or DCE)
            if startsWith(feature_name, 'ADC_')
                sheet_name = 1; % ADC sheet
            elseif startsWith(feature_name, 'DCE_')
                sheet_name = 2; % DCE sheet
            else
                fprintf('    Warning: Cannot determine sheet for feature %s. Skipping.\n', feature_name);
                continue;
            end
            
            try
                % Read the appropriate sheet
                T = readtable(results_file, 'Sheet', sheet_name, 'VariableNamingRule', 'preserve');
                
                % Keep all rows including p-value summary rows
                % Only remove truly empty mast_id rows
                valid_rows = ~strcmp(string(T.mast_id), '');
                T = T(valid_rows, :);
                
                % Check if the feature column exists
                if ~ismember(feature_name, T.Properties.VariableNames)
                    fprintf('    Warning: Feature column %s not found in %s. Skipping.\n', feature_name, results_file);
                    continue;
                end
                
                % Extract mast_id, label, and the feature column
                feature_data = T(:, {'mast_id', 'label', feature_name});
                
                % Match patients and update values
                col_name = sprintf('%s_%s', feature_name, timepoint);
                matched_count = 0;
                
                for i = 1:height(feature_data)
                    % Special handling for p-value rows
                    if strcmp(feature_data.mast_id{i}, 'p-value')
                        % Find p-value row in final_table (should have NaN label)
                        mask = strcmp(final_table.mast_id, 'p-value') & isnan(final_table.label);
                    else
                        % Regular patient matching
                        mask = strcmp(final_table.mast_id, feature_data.mast_id{i}) & ...
                               final_table.label == feature_data.label(i);
                    end
                    
                    if any(mask)
                        final_table.(col_name)(mask) = feature_data.(feature_name)(i);
                        matched_count = matched_count + 1;
                    end
                end
                
                fprintf('    Successfully matched %d patients for %s\n', matched_count, timepoint);
                
            catch ME
                fprintf('    Error reading %s: %s\n', results_file, ME.message);
                continue;
            end
        end
        
        % Write to Excel sheet
        sheet_name = sprintf('Feature_%d_%s', feat_idx, feature_name);
        % Clean sheet name for Excel compatibility
        sheet_name = regexprep(sheet_name, '[^\w\s]', '_');
        sheet_name = regexprep(sheet_name, '\s+', '_');
        
        try
            writetable(final_table, output_file, 'Sheet', sheet_name);
            fprintf('    Written %d patients to sheet: %s\n', height(final_table), sheet_name);
        catch ME
            fprintf('    Error writing sheet %s: %s\n', sheet_name, ME.message);
            continue;
        end
    end
    
    fprintf('\n=== Export Complete ===\n');
    fprintf('Output file: %s\n', output_file);
    
    % Create summary sheet
    try
        summary_data = table((1:length(best_features))', best_features, ...
            'VariableNames', {'Feature_Number', 'Feature_Name'});
        writetable(summary_data, output_file, 'Sheet', 'Summary');
        fprintf('Summary sheet created with %d features\n', length(best_features));
    catch ME
        fprintf('Warning: Could not create summary sheet: %s\n', ME.message);
    end
    
    fprintf('\nExport completed successfully!\n');
end
