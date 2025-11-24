function analyze_best_features_simple()
% analyze_best_features_simple
% Reads only the *_Significant sheets from each timepoint summary workbook,
% aggregates their p-values, and selects the 20 features that appear most
% often (ties broken by lowest average and minimum p-values).

    % Define timepoints and their corresponding files
    timepoints = {'Confirmatory', '12m', '24m', '36m'};
    timepoint_files = {'../Confirmatory_Experiment_Summary.xlsx', ...
                      '../12m_Experiment_Summary.xlsx', ...
                      '../24m_Experiment_Summary.xlsx', ...
                      '../36m_Experiment_Summary.xlsx'};

    % Map of feature -> struct('count', occurrences, 'sumP', total p-values, 'minP', minimal p)
    feature_stats = containers.Map('KeyType', 'char', 'ValueType', 'any');

    fprintf('Collecting significant features across all experiments...\n');

    for tp = 1:numel(timepoints)
        file = timepoint_files{tp};
        if ~exist(file, 'file')
            fprintf('Warning: %s not found. Skipping.\n', file);
            continue;
        end

        sheets = sheetnames(file);
        sig_sheets = sheets(endsWith(sheets, '_Significant'));
        fprintf('  %s: %d significant sheets\n', timepoints{tp}, numel(sig_sheets));

        for s = 1:numel(sig_sheets)
            sheet_name = sig_sheets{s};
            try
                T = readtable(file, 'Sheet', sheet_name, 'VariableNamingRule', 'preserve');
                if ~all(ismember({'Feature', 'P_value'}, T.Properties.VariableNames))
                    continue;
                end
            catch ME
                fprintf('    Failed to read %s: %s\n', sheet_name, ME.message);
                continue;
            end

            for row = 1:height(T)
                feature_name = string(T.Feature(row));
                p_val_raw = T.P_value(row);
                if iscell(p_val_raw)
                    p_val_raw = p_val_raw{1};
                end

                if isnumeric(p_val_raw)
                    p_val = p_val_raw;
                elseif ischar(p_val_raw) || isstring(p_val_raw)
                    p_val = str2double(p_val_raw);
                else
                    p_val = NaN;
                end

                if isnan(p_val)
                    continue;
                end

                key = char(feature_name);
                if isKey(feature_stats, key)
                    stats = feature_stats(key);
                    stats.count = stats.count + 1;
                    stats.sumP = stats.sumP + p_val;
                    stats.minP = min(stats.minP, p_val);
                    feature_stats(key) = stats;
                else
                    feature_stats(key) = struct('count', 1, 'sumP', p_val, 'minP', p_val);
                end
            end
        end
    end

    feature_names = keys(feature_stats);
    n = numel(feature_names);
    counts = zeros(n, 1);
    avg_pvalues = zeros(n, 1);
    min_pvalues = zeros(n, 1);

    for i = 1:n
        stats = feature_stats(feature_names{i});
        counts(i) = stats.count;
        avg_pvalues(i) = stats.sumP / stats.count;
        min_pvalues(i) = stats.minP;
    end

    results_table = table(feature_names', counts, avg_pvalues, min_pvalues, ...
                          'VariableNames', {'Feature', 'Count', 'Avg_Pvalue', 'Min_Pvalue'});

    % Sort by count (desc), then average p-value (asc), then min p-value (asc)
    results_table = sortrows(results_table, {'Count', 'Avg_Pvalue', 'Min_Pvalue'}, ...
                                           {'descend', 'ascend', 'ascend'});

    top_20 = results_table(1:min(20, height(results_table)), :);

    fprintf('\n=== TOP 20 FEATURES FROM SIGNIFICANT SHEETS ===\n');
    disp(top_20);

    writetable(results_table, 'Feature_Analysis_Results.xlsx');
    writetable(top_20, 'Top_20_Features.xlsx');

    top_20_features = top_20.Feature;
    if iscell(top_20_features)
        best_20_features = top_20_features; %#ok<NASGU>
    else
        best_20_features = cellstr(top_20_features); %#ok<NASGU>
    end

    save('best_features_data.mat', 'best_20_features', 'top_20', 'results_table');

    fprintf('\nFull results written to Feature_Analysis_Results.xlsx\n');
    fprintf('Top 20 written to Top_20_Features.xlsx\n');
    fprintf('Feature list saved to best_features_data.mat for plotting scripts.\n');
end
