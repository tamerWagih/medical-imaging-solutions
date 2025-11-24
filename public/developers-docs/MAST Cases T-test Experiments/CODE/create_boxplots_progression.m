function create_boxplots_progression()
% create_boxplots_progression
% Creates boxplots comparing the best 20 features between progressors and non-progressors
% across all 4 timepoints (Confirmatory, 12m, 24m, 36m)
%
% Requirements:
% - Multiple boxplots per figure
% - Statistical tests (t-tests) for significance
% - Save boxplots as images
% - Create summary table with significant differences

    fprintf('=== Creating Boxplots for Progression Analysis ===\n');
    
    % Load the exported feature data
    feature_file = '../Best_20_Features_All_Patients.xlsx';
    if ~exist(feature_file, 'file')
        error('Feature data file not found: %s\nPlease run export_best_20_features_all_patients first.', feature_file);
    end
    
    % Get list of sheets (features)
    [~, sheet_names] = xlsfinfo(feature_file);
    % Remove 'Summary' sheet if present
    feature_sheets = sheet_names(~strcmp(sheet_names, 'Summary'));
    
    fprintf('Found %d feature sheets in %s\n', length(feature_sheets), feature_file);
    
    % Define timepoints
    timepoints = {'Confirmatory', '12m', '24m', '36m'};
    
    % Initialize results for summary table
    summary_results = [];
    
    % Create output directory for figures
    output_dir = '../Boxplots_Progression_Analysis';
    if ~exist(output_dir, 'dir')
        mkdir(output_dir);
    end
    
    % Process each feature
    for feat_idx = 1:length(feature_sheets)
        sheet_name = feature_sheets{feat_idx};
        fprintf('\nProcessing feature %d/%d: %s\n', feat_idx, length(feature_sheets), sheet_name);
        
        try
            % Read feature data
            feature_data = readtable(feature_file, 'Sheet', sheet_name, 'VariableNamingRule', 'preserve');
            
            % Extract feature name from sheet name (remove 'Feature_X_' prefix)
            feature_name = regexprep(sheet_name, '^Feature_\d+_', '');
            
            % Process each timepoint - create separate figure for each
            for tp_idx = 1:length(timepoints)
                timepoint = timepoints{tp_idx};
                
                % Create individual figure for this feature-timepoint combination
                fig = figure('Position', [100, 100, 800, 600]);
                
                % Find the correct column for this timepoint
                col_names = feature_data.Properties.VariableNames;
                col_name = '';
                
                % Look for columns that contain the feature name and timepoint
                % Handle both underscore and hyphen formats in feature names
                % Handle both space and underscore formats in timepoint names
                for j = 1:length(col_names)
                    col = col_names{j};
                    
                    % Check if column contains feature name (handle both underscore and hyphen formats)
                    % Also handle the specific case where HRS_R becomes HRS-R in column names
                    % And handle HRS_V becomes HRS-V in column names
                    feature_name_hyphen = strrep(feature_name, '_', '-');
                    feature_name_hrs_r_fix = strrep(feature_name, 'HRS_R', 'HRS-R');
                    feature_name_hrs_v_fix = strrep(feature_name, 'HRS_V', 'HRS-V');
                    
                    feature_match = contains(col, feature_name, 'IgnoreCase', true) || ...
                                   contains(col, feature_name_hyphen, 'IgnoreCase', true) || ...
                                   contains(col, feature_name_hrs_r_fix, 'IgnoreCase', true) || ...
                                   contains(col, feature_name_hrs_v_fix, 'IgnoreCase', true);
                    
                    % Check if column contains timepoint
                    timepoint_match = contains(col, timepoint, 'IgnoreCase', true) || ...
                                     contains(col, strrep(timepoint, ' ', '_'), 'IgnoreCase', true);
                    
                    if feature_match && timepoint_match
                        col_name = col;
                        break;
                    end
                end
                
                if isempty(col_name)
                    fprintf('  Warning: No column found for %s %s. Skipping.\n', feature_name, timepoint);
                    continue;
                end
                
                % Extract data for this timepoint
                values = feature_data.(col_name);
                labels = feature_data.label;
                
                % Remove NaN values and corresponding labels
                valid_idx = ~isnan(values) & ~isnan(labels);
                values = values(valid_idx);
                labels = labels(valid_idx);
                
                if length(unique(labels)) < 2
                    fprintf('  Warning: Only one group found for %s %s. Skipping.\n', feature_name, timepoint);
                    continue;
                end
                
                % Separate data by progression status
                non_progressors = values(labels == 0);
                progressors = values(labels == 1);
                
                % Prepare data for boxplot
                boxplot_data = [non_progressors; progressors];
                group_labels = [repmat({'Non-Progressors'}, length(non_progressors), 1); ...
                               repmat({'Progressors'}, length(progressors), 1)];
                
                % Create boxplot
                boxplot(boxplot_data, group_labels);
                title(sprintf('%s Timepoint', timepoint), 'FontSize', 12, 'FontWeight', 'bold');
                ylabel('Feature Value', 'FontSize', 10);
                grid on;
                
                % Perform t-test
                [h, p_value] = ttest2(non_progressors, progressors);
                
                % Add statistical annotation
                if p_value < 0.001
                    sig_text = 'p < 0.001';
                elseif p_value < 0.01
                    sig_text = 'p < 0.01';
                elseif p_value < 0.05
                    sig_text = 'p < 0.05';
                else
                    sig_text = sprintf('p = %.3f', p_value);
                end
                
                % Add title with feature name, timepoint, and p-value (replace underscores with spaces)
                title_str = sprintf('%s %s Boxplot (p = %.3f)', feature_name, timepoint, p_value);
                title_str = strrep(title_str, '_', ' '); % Replace all underscores with spaces
                title(title_str, 'FontSize', 14, 'FontWeight', 'bold');
                
                % Store results for summary
                summary_results = [summary_results; ...
                    {feature_name, timepoint, length(non_progressors), length(progressors), ...
                     mean(non_progressors), mean(progressors), ...
                     std(non_progressors), std(progressors), ...
                     p_value, h}];
                
                fprintf('  %s: Non-Progressors=%d, Progressors=%d, p=%.4f\n', ...
                        timepoint, length(non_progressors), length(progressors), p_value);
                
                % Save individual figure in both PNG and MATLAB fig formats
                png_filename = sprintf('%s/Feature_%02d_%s_%s_Boxplot.png', ...
                                      output_dir, feat_idx, feature_name, timepoint);
                fig_filename = sprintf('%s/Feature_%02d_%s_%s_Boxplot.fig', ...
                                      output_dir, feat_idx, feature_name, timepoint);
                
                saveas(fig, png_filename);
                saveas(fig, fig_filename);
                fprintf('    Saved figures: %s and %s\n', png_filename, fig_filename);
                
                % Close figure to free memory
                close(fig);
            end
            
        catch ME
            fprintf('  Error processing feature %s: %s\n', sheet_name, ME.message);
            continue;
        end
    end
    
    % Create summary table
    fprintf('\n=== Creating Summary Table ===\n');
    
    if ~isempty(summary_results)
        summary_table = cell2table(summary_results, ...
            'VariableNames', {'Feature_Name', 'Timepoint', 'N_NonProgressors', 'N_Progressors', ...
                             'Mean_NonProgressors', 'Mean_Progressors', ...
                             'Std_NonProgressors', 'Std_Progressors', ...
                             'P_Value', 'Significant'});
        
        % Sort by p-value (most significant first)
        summary_table = sortrows(summary_table, 'P_Value');
        
        % Save summary table
        summary_file = sprintf('%s/Boxplot_Summary_Results.xlsx', output_dir);
        writetable(summary_table, summary_file);
        fprintf('Summary table saved: %s\n', summary_file);
        
        % Display most significant results
        fprintf('\n=== Most Significant Results (p < 0.05) ===\n');
        significant_results = summary_table(summary_table.P_Value < 0.05, :);
        
        if ~isempty(significant_results)
            fprintf('Found %d significant differences:\n', height(significant_results));
            for i = 1:min(10, height(significant_results)) % Show top 10
                row = significant_results(i, :);
                fprintf('  %s (%s): p = %.4f, Non-Progressors=%.3f±%.3f, Progressors=%.3f±%.3f\n', ...
                        row.Feature_Name{1}, row.Timepoint{1}, row.P_Value, ...
                        row.Mean_NonProgressors, row.Std_NonProgressors, ...
                        row.Mean_Progressors, row.Std_Progressors);
            end
        else
            fprintf('No significant differences found (p < 0.05)\n');
        end
        
        % Display summary statistics
        fprintf('\n=== Summary Statistics ===\n');
        fprintf('Total comparisons: %d\n', height(summary_table));
        fprintf('Significant (p < 0.05): %d (%.1f%%)\n', ...
                sum(summary_table.P_Value < 0.05), ...
                100 * sum(summary_table.P_Value < 0.05) / height(summary_table));
        fprintf('Highly significant (p < 0.01): %d (%.1f%%)\n', ...
                sum(summary_table.P_Value < 0.01), ...
                100 * sum(summary_table.P_Value < 0.01) / height(summary_table));
        fprintf('Very highly significant (p < 0.001): %d (%.1f%%)\n', ...
                sum(summary_table.P_Value < 0.001), ...
                100 * sum(summary_table.P_Value < 0.001) / height(summary_table));
    else
        fprintf('No results to summarize.\n');
    end
    
    fprintf('\n=== Boxplot Analysis Complete ===\n');
    fprintf('Output directory: %s\n', output_dir);
    fprintf('Total figures saved: %d (20 features × 4 timepoints)\n', length(feature_sheets) * length(timepoints));
    fprintf('Summary table: Boxplot_Summary_Results.xlsx\n');
end
