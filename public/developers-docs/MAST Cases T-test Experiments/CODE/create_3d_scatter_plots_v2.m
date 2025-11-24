function create_3d_scatter_plots_v2()
% create_3d_scatter_plots_v2
% Creates 3D scatter plots using actual per-experiment data
% X-axis: HRS parameter values (36 experiments)
% Y-axis: p-values
% Z-axis: timepoints
% One figure per feature, one subplot per parameter = 20 features x 4 parameters = 80 figures

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
    output_dir = '3D_Scatter_Plots_v2';
    if ~exist(output_dir, 'dir')
        mkdir(output_dir);
    end
    
    fprintf('Creating 3D scatter plots using per-experiment data...\n');
    
    % Process each feature
    for feature_idx = 1:length(best_20_features)
        feature_name = best_20_features{feature_idx};
        fprintf('Processing feature %d/%d: %s\n', feature_idx, length(best_20_features), feature_name);
        
        % Process each parameter
        for param_idx = 1:length(param_names)
            param_name = param_names{param_idx};
            
            % Filter data for this feature
            feature_data = data_table(strcmp(data_table.Feature, feature_name), :);
            
            if ~isempty(feature_data)
                % Get data for 3D plot
                param_vals = feature_data.(param_name);
                p_vals = feature_data.P_value;
                timepoint_vals = feature_data.Timepoint;
                
                % Remove NaN values
                valid_idx = ~isnan(param_vals) & ~isnan(p_vals);
                param_vals = param_vals(valid_idx);
                p_vals = p_vals(valid_idx);
                timepoint_vals = timepoint_vals(valid_idx);
                
                if length(param_vals) > 1
                    % Create 3D scatter plot
                    fig = figure('Position', [100, 100, 800, 600]);
                    
                    % Create 3D scatter plot with different colors for each timepoint
                    % Swap axes: Y = Timepoint (depth), Z = p-value (up)
                    scatter3(param_vals, timepoint_vals, p_vals, 60, timepoint_vals, 'filled');
                    
                    % Colorbar for timepoints
                    c = colorbar;
                    c.Label.String = 'Timepoint';
                    c.Ticks = 1:length(timepoints);
                    c.TickLabels = timepoints;
                    
                    % Add significance plane at p = 0.05 (constant Z)
                    hold on;
                    xg = linspace(min(param_vals), max(param_vals), 2);
                    yg = linspace(1, length(timepoints), 2);
                    [Xg, Yg] = meshgrid(xg, yg);
                    Zg = 0.05 * ones(size(Xg));
                    surf(Xg, Yg, Zg, 'FaceAlpha', 0.12, 'EdgeColor', 'none', 'FaceColor', [1 0.6 0.6]);
                    
                    % Formatting
                    xlabel(param_name, 'FontSize', 12);
                    ylabel('Timepoint', 'FontSize', 12);
                    zlabel('p-value', 'FontSize', 12);
                    title(sprintf('%s vs %s', feature_name, param_name), 'FontSize', 14, 'Interpreter', 'none');
                    
                    % Set axis limits
                    xlim([min(param_vals), max(param_vals)]);
                    ylim([0.5, length(timepoints) + 0.5]);
                    zlim([0, max(0.1, max(p_vals) * 1.1)]);
                    
                    % Set z-axis ticks and labels
                    yticks(1:length(timepoints));
                    yticklabels(timepoints);
                    
                    % Add significance annotation
                    n_sig_total = sum(p_vals < 0.05);
                    n_total = length(p_vals);
                    text(0.02, 0.98, sprintf('%d/%d sig. points', n_sig_total, n_total), ...
                        'Units', 'normalized', 'VerticalAlignment', 'top', ...
                        'BackgroundColor', 'white', 'EdgeColor', 'black');
                    
                    % Add trend surface if enough points
                    if length(param_vals) > 6
                        try
                            % Fit a trend surface
                            [X_grid, Y_grid] = meshgrid(linspace(min(param_vals), max(param_vals), 20), ...
                                                       linspace(1, length(timepoints), 20));
                            Z_trend = griddata(param_vals, timepoint_vals, p_vals, X_grid, Y_grid, 'linear');
                            surf(X_grid, Y_grid, Z_trend, 'FaceAlpha', 0.2, 'EdgeColor', 'none', 'FaceColor', 'blue');
                        catch
                            % If griddata fails, just skip the trend surface
                        end
                    end
                    
                    grid on;
                    view(45, 30); % Set viewing angle
                    
                    % Save figure
                    filename = sprintf('%s_vs_%s_3D.png', ...
                        sanitize_filename(feature_name), param_name);
                    saveas(fig, fullfile(output_dir, filename));
                    
                    % Also save as MATLAB figure
                    matlab_filename = sprintf('%s_vs_%s_3D.fig', ...
                        sanitize_filename(feature_name), param_name);
                    saveas(fig, fullfile(output_dir, matlab_filename));
                    
                    close(fig);
                else
                    fprintf('  Warning: Insufficient data for %s vs %s\n', feature_name, param_name);
                end
            else
                fprintf('  Warning: No data found for %s\n', feature_name);
            end
        end
    end
    
    fprintf('\n3D scatter plots completed!\n');
    fprintf('Total figures created: %d\n', length(best_20_features) * length(param_names));
    fprintf('Plots saved in directory: %s\n', output_dir);
end

function sanitized = sanitize_filename(filename)
% Sanitizes filename by removing/replacing invalid characters
    sanitized = regexprep(filename, '[<>:"/\\|?*]', '_');
    sanitized = regexprep(sanitized, '\s+', '_');
end
