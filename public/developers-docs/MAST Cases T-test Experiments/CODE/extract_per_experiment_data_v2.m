function extract_per_experiment_data_v2()
% extract_per_experiment_data_v2
% Extracts per-experiment p-values from individual Results###.xlsx files
% This creates a comprehensive dataset for plotting

    % Define timepoints and their summary workbooks (root-level)
    timepoints = {'Confirmatory', '12m', '24m', '36m'};
    timepoint_files = {'../Confirmatory_Experiment_Summary.xlsx', ...
                      '../12m_Experiment_Summary.xlsx', ...
                      '../24m_Experiment_Summary.xlsx', ...
                      '../36m_Experiment_Summary.xlsx'};
    
    % Load experiment plan
    exp_plan = readtable('../Experiment_Plan.csv');
    
    % Initialize storage
    all_feature_names = {};
    all_experiments = [];
    all_timepoints = [];
    all_parameters = [];
    all_pvalues = [];
    feature_whitelist = [];
    
    fprintf('Extracting per-experiment data from root summary workbooks...\n');

    % If available, load the best 20 features to filter extraction
    try
        if exist('best_features_data.mat','file')
            s = load('best_features_data.mat');
            if isfield(s, 'best_20_features')
                feature_whitelist = string(s.best_20_features(:));
                fprintf('Filtering to %d best features...\n', numel(feature_whitelist));
            end
        end
    catch
        % proceed without filter
    end
    
    % Process each timepoint
    for tp = 1:length(timepoints)
        tp_name = timepoints{tp};
        tp_file = timepoint_files{tp};

        fprintf('Processing %s timepoint...\n', tp_name);

        if ~exist(tp_file, 'file')
            fprintf('Warning: Summary file %s not found, skipping...\n', tp_file);
            continue;
        end

        try
            sheets = sheetnames(tp_file);
        catch ME
            fprintf('  Error reading sheets from %s: %s\n', tp_file, ME.message);
            continue;
        end

        % Use only per-experiment sheets, skip "_Significant" sheets
        exp_sheets = sheets(startsWith(sheets, 'Experiment'));
        exp_sheets = exp_sheets(~endsWith(exp_sheets, '_Significant'));

        for s = 1:numel(exp_sheets)
            sheet_name = exp_sheets{s};

            % Parse experiment number
            m = regexp(sheet_name, 'Experiment(\d+)', 'tokens', 'once');
            if isempty(m)
                continue;
            end
            exp_num = str2double(m{1});

            try
                T = readtable(tp_file, 'Sheet', sheet_name, 'VariableNamingRule', 'preserve');
            catch ME
                fprintf('    Error reading sheet %s: %s\n', sheet_name, ME.message);
                continue;
            end

            % Expect columns: Feature, P_value (combined ADC/DCE list)
            if ~all(ismember({'Feature','P_value'}, T.Properties.VariableNames))
                % If structure differs, try to infer like in earlier pipeline
                fprintf('    Warning: sheet %s missing expected columns; skipping.\n', sheet_name);
                continue;
            end

            features = T.Feature;
            pvals = T.P_value;

            % Coerce values
            if ~iscell(features)
                features = cellstr(string(features));
            end
            if ~isnumeric(pvals)
                pvals = cellfun(@(x) str2double(string(x)), num2cell(pvals));
            end

            % Apply whitelist filter if present
            if ~isempty(feature_whitelist)
                keep = ismember(string(features), feature_whitelist);
                features = features(keep);
                pvals    = pvals(keep);
            end

            % Parameter values from plan by experiment id (robust to column naming)
            exp_id = sprintf('EXP%03d', exp_num);
            exp_col = exp_plan.('Experiment');
            exp_col = string(exp_col);
            row_mask = (exp_col == string(exp_id));
            if ~any(row_mask)
                row_idx = exp_num; % fallback to numeric row index
            else
                row_idx = find(row_mask, 1, 'first');
            end

            % Resolve possible column name variants
            plan_vars = exp_plan.Properties.VariableNames;
            col_WashOut = 'WashOutUpper';
            col_PZ_H = ''; col_PZ_M = ''; col_PZ_L = '';
            if any(strcmp(plan_vars, 'ADCPZHigh')),   col_PZ_H = 'ADCPZHigh'; end
            if any(strcmp(plan_vars, 'ADC_PZ_High')), col_PZ_H = 'ADC_PZ_High'; end
            if any(strcmp(plan_vars, 'ADCPZMedium')), col_PZ_M = 'ADCPZMedium'; end
            if any(strcmp(plan_vars, 'ADC_PZ_Medium')), col_PZ_M = 'ADC_PZ_Medium'; end
            if any(strcmp(plan_vars, 'ADCPZLow')),    col_PZ_L = 'ADCPZLow'; end
            if any(strcmp(plan_vars, 'ADC_PZ_Low')),  col_PZ_L = 'ADC_PZ_Low'; end

            if isempty(col_PZ_H) || isempty(col_PZ_M) || isempty(col_PZ_L)
                error('Experiment_Plan.csv is missing expected ADC PZ columns. Found: %s', strjoin(plan_vars, ', '));
            end

            param_values = [exp_plan.(col_WashOut)(row_idx), ...
                            exp_plan.(col_PZ_H)(row_idx), ...
                            exp_plan.(col_PZ_M)(row_idx), ...
                            exp_plan.(col_PZ_L)(row_idx)];

            all_feature_names = [all_feature_names, features'];
            all_experiments   = [all_experiments,   repmat(exp_num, 1, numel(features))];
            all_timepoints    = [all_timepoints,    repmat(tp,      1, numel(features))];
            all_pvalues       = [all_pvalues,       pvals'];
            all_parameters    = [all_parameters;    repmat(param_values, numel(features), 1)];
        end
    end
    
    % Create comprehensive table (normalized column names)
    param_names = {'WashOutUpper', 'ADCPZHigh', 'ADCPZMedium', 'ADCPZLow'};
    
    data_table = table(all_feature_names', all_experiments', all_timepoints', ...
                      all_parameters(:,1), all_parameters(:,2), all_parameters(:,3), all_parameters(:,4), ...
                      all_pvalues', ...
                      'VariableNames', {'Feature', 'Experiment', 'Timepoint', param_names{:}, 'P_value'});
    
    % Save comprehensive data
    writetable(data_table, 'Per_Experiment_Data.xlsx');
    save('per_experiment_data.mat', 'data_table', 'timepoints', 'param_names');
    
    fprintf('\nPer-experiment data extraction completed!\n');
    fprintf('Data saved to Per_Experiment_Data.xlsx and per_experiment_data.mat\n');
    fprintf('Total records: %d\n', height(data_table));
    
    % Display summary statistics
    fprintf('\nSummary by timepoint:\n');
    for tp = 1:length(timepoints)
        tp_data = data_table(data_table.Timepoint == tp, :);
        n_sig = sum(tp_data.P_value < 0.05);
        fprintf('  %s: %d experiments, %d significant features\n', ...
            timepoints{tp}, length(unique(tp_data.Experiment)), n_sig);
    end
end

function p_values = extract_pvalues_from_table(T)
% Extracts p-values from the last row of a results table
    
    p_values = [];
    
    % Get data from last row (p-value row)
    last_row = T{end, 3:end}; % Skip mast_id and label columns
    
    % Convert to numeric if needed
    for i = 1:length(last_row)
        val = last_row{i};
        if iscell(val)
            val = val{1};
        end
        
        if isnumeric(val) && isscalar(val)
            p_values(i) = val;
        elseif ischar(val) || isstring(val)
            num_val = str2double(val);
            if ~isnan(num_val)
                p_values(i) = num_val;
            else
                p_values(i) = NaN;
            end
        else
            p_values(i) = NaN;
        end
    end
end
