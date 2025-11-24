function run_pvalue_analysis()
% run_pvalue_analysis
% Master script for significant-sheet based analysis:
% 1. Identify best 20 features by significant-sheet frequency
% 2. Create 2D scatter plots (64 figures)
% 3. Create 3D scatter plots (80 figures)

    fprintf('=== MAST Cases T-Test Analysis: Significant Sheet Approach ===\n\n');
    
    % Step 1: Analyze and identify best features
    fprintf('Step 1: Collecting significant features and finding the top 20...\n');
    try
        analyze_best_features();
        fprintf('\x2713 Best features analysis completed.\n\n');
    catch ME
        fprintf('\xd7 Error in feature analysis: %s\n', ME.message);
        return;
    end
    
    % Step 2: Extract per-experiment data (for detailed plotting)
    fprintf('Step 2: Extracting detailed per-experiment data...\n');
    try
        extract_per_experiment_data_v2();
        fprintf('\x2713 Per-experiment data extraction completed.\n\n');
    catch ME
        fprintf('\xd7 Error in data extraction: %s\n', ME.message);
        fprintf('Continuing with plotting using summary data...\n\n');
    end
    
    % Step 3: Create 2D scatter plots
    fprintf('Step 3: Creating 2D scatter plots...\n');
    try
        create_2d_scatter_plots_v2();
        fprintf('\x2713 2D scatter plots completed.\n\n');
    catch ME
        fprintf('\xd7 Error in 2D plots: %s\n', ME.message);
    end
    
    % Step 4: Create 3D scatter plots
    fprintf('Step 4: Creating 3D scatter plots...\n');
    try
        create_3d_scatter_plots_v2();
        fprintf('\x2713 3D scatter plots completed.\n\n');
    catch ME
        fprintf('\xd7 Error in 3D plots: %s\n', ME.message);
    end
    
    fprintf('=== Significant Sheet Analysis Pipeline Completed ===\n');
    fprintf('Results Summary:\n');
    fprintf('  - 20 top features identified from significant sheets\n');
    fprintf('  - 2D plots: 4 timepoints × 4 parameters × 4 figures = 64 total\n');
    fprintf('  - 3D plots: 20 features × 4 parameters = 80 total\n\n');
    
    fprintf('Key Files Generated:\n');
    fprintf('  - Top_20_Features.xlsx (the selected features with statistics)\n');
    fprintf('  - Feature_Analysis_Results.xlsx (all significant features ranked)\n');
    fprintf('  - best_features_data.mat (data for plotting scripts)\n');
    fprintf('  - 2D_Scatter_Plots_v2/ (64 figures)\n');
    fprintf('  - 3D_Scatter_Plots_v2/ (80 figures)\n\n');
end
