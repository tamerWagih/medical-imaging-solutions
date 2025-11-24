function create_2d_scatter_plots_v2()
% create_2d_scatter_plots_v2
% Creates 2D scatter plots using actual per-experiment data
% X-axis: HRS parameter values (36 experiments)
% Y-axis: p-values
% 4 timepoints × 4 parameters × 4 feature-sets (5 features each) = 64 figures total

    % Load the per-experiment data
    if ~exist('per_experiment_data.mat', 'file')
        fprintf('Error: per_experiment_data.mat not found. Run extract_per_experiment_data() first.\n');
        return;
    end
    
    load('per_experiment_data.mat');
    
    % Load best features data
    if ~exist('best_features_data.mat', 'file')
        fprintf('Error: best_features_data.mat not found. Run analyze_best_features() first.\n');
        return;
    end
    
    load('best_features_data.mat');
    
    % Define timepoints
    timepoints = {'Confirmatory', '12m', '24m', '36m'};
    
    % Create output directory for plots
    output_dir = '2D_Scatter_Plots_v2';
    if ~exist(output_dir, 'dir')
        mkdir(output_dir);
    end
    
    fprintf('Creating 2D scatter plots using per-experiment data...\n');
    
    % Process each timepoint
    for tp = 1:length(timepoints)
        fprintf('Processing %s timepoint...\n', timepoints{tp});
        
        % Filter data for this timepoint
        tp_data = data_table(data_table.Timepoint == tp, :);
        
        % Process each parameter
        for param_idx = 1:length(param_names)
            param_name = param_names{param_idx};
            
            % Create 4 figures (every 5 features per figure)
            for fig_idx = 1:4
                feature_start = (fig_idx - 1) * 5 + 1;
                feature_end = min(fig_idx * 5, length(best_20_features));
                features_in_fig = best_20_features(feature_start:feature_end);
                
                % Create figure and one shared axes (overlay 5 features)
                fig = figure('Position', [100, 100, 1200, 500]);
                ax = axes(fig);
                hold(ax, 'on');
                colors = lines(length(features_in_fig));

                leg_entries = strings(0);
                for fidx = 1:length(features_in_fig)
                    feature_name = features_in_fig{fidx};

                    % Filter data for this feature and timepoint
                    feature_data = tp_data(strcmp(tp_data.Feature, feature_name), :);
                    if isempty(feature_data)
                        continue;
                    end

                    % Get parameter values and p-values
                    param_vals = feature_data.(param_name);
                    p_vals = feature_data.P_value;

                    % Remove NaN values
                    valid_idx = ~isnan(param_vals) & ~isnan(p_vals);
                    param_vals = param_vals(valid_idx);
                    p_vals = p_vals(valid_idx);

                    if isempty(param_vals)
                        continue;
                    end

                    scatter(ax, param_vals, p_vals, 50, colors(fidx, :), 'filled', 'MarkerFaceAlpha', 0.7, ...
                           'DisplayName', feature_name);

                    % Track legend entry with sig count
                    n_sig = sum(p_vals < 0.05);
                    leg_entries(end+1) = sprintf('%s (%d/%d sig)', feature_name, n_sig, numel(p_vals)); %#ok<AGROW>
                end

                % Significance threshold
                yline(ax, 0.05, 'r--', 'LineWidth', 2);

                % Formatting (shared)
                xlabel(ax, param_name, 'FontSize', 12);
                ylabel(ax, 'p-value', 'FontSize', 12);
                title(ax, sprintf('%s Timepoint - %s (Features %d-%d)', ...
                    timepoints{tp}, param_name, feature_start, feature_end), 'FontSize', 14, 'Interpreter', 'none');
                set(ax, 'FontSize', 11);
                grid(ax, 'on');
                ylim(ax, [0, max(0.1, max(ylim(ax)))]);

                if ~isempty(leg_entries)
                    legend(ax, leg_entries, 'Location', 'northwest', 'Interpreter', 'none');
                end
                
                % Save figure
                filename = sprintf('%s_%s_Features_%d_%d.png', ...
                    timepoints{tp}, param_name, feature_start, feature_end);
                saveas(fig, fullfile(output_dir, filename));
                
                % Also save as MATLAB figure
                matlab_filename = sprintf('%s_%s_Features_%d_%d.fig', ...
                    timepoints{tp}, param_name, feature_start, feature_end);
                saveas(fig, fullfile(output_dir, matlab_filename));
                
                close(fig);
            end
        end
    end
    
    fprintf('\n2D scatter plots completed!\n');
    fprintf('Total figures created: %d\n', length(timepoints) * length(param_names) * 4);
    fprintf('Plots saved in directory: %s\n', output_dir);
end
