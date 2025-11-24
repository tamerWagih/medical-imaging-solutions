function check_study_dates()
% check_study_dates
% Checks that study cases have the exact dates as specified in the reference file
% Unzips folders, extracts dates from folder names, and compares with reference
% Cleans up extracted folders and reports correct/incorrect dates

    fprintf('=== Study Date Verification Script ===\n');
    
    % Define paths
    reference_file = '../Needed cases to check.xlsx';
    timepoint_folders = {'Confirmatory', '12m', '24m', '36m'};
    
    % Check if reference file exists
    if ~exist(reference_file, 'file')
        error('Reference file not found: %s', reference_file);
    end
    
    % Read reference data from Excel file
    try
        % Try reading the Excel file with different options
        ref_table = readtable(reference_file, 'ReadVariableNames', true, 'VariableNamingRule', 'preserve');
        
        % Check if we got valid data
        if isempty(ref_table) || width(ref_table) < 2
            error('Excel file appears to be empty or invalid format');
        end
        
        % Display the structure we found
        fprintf('Excel file columns: %s\n', strjoin(ref_table.Properties.VariableNames, ', '));
        fprintf('Excel file size: %d rows x %d columns\n', height(ref_table), width(ref_table));
        
        % Try to identify the correct columns
        col_names = ref_table.Properties.VariableNames;
        
        % Find MAST ID column (should contain MAST IDs)
        mast_id_col = '';
        for i = 1:length(col_names)
            if contains(col_names{i}, 'MAST', 'IgnoreCase', true) || contains(col_names{i}, 'ID', 'IgnoreCase', true)
                mast_id_col = col_names{i};
                break;
            end
        end
        
        if isempty(mast_id_col)
            % Use first column as MAST ID
            mast_id_col = col_names{1};
            fprintf('Using first column as MAST ID: %s\n', mast_id_col);
        end
        
        % Find timepoint columns
        timepoint_cols = {};
        timepoint_names = {'Confirmatory', '12m', '24m', '36m'};
        
        for tp = 1:length(timepoint_names)
            tp_name = timepoint_names{tp};
            for i = 1:length(col_names)
                if strcmpi(col_names{i}, tp_name) || strcmpi(col_names{i}, ['Time_' tp_name])
                    timepoint_cols{tp} = col_names{i};
                    break;
                end
            end
        end
        
        % If not found by name, try by position (assuming columns 3-6 are timepoints)
        if any(cellfun(@isempty, timepoint_cols)) && width(ref_table) >= 6
            fprintf('Using columns by position for timepoints\n');
            for tp = 1:length(timepoint_names)
                if isempty(timepoint_cols{tp}) && (tp+2) <= width(ref_table)
                    timepoint_cols{tp} = col_names{tp+2};
                end
            end
        end
        
        % Display what we found
        fprintf('MAST ID column: %s\n', mast_id_col);
        for tp = 1:length(timepoint_names)
            if ~isempty(timepoint_cols{tp})
                fprintf('Timepoint %s column: %s\n', timepoint_names{tp}, timepoint_cols{tp});
            else
                fprintf('Timepoint %s column: NOT FOUND\n', timepoint_names{tp});
            end
        end
        
        % Create a standardized reference table
        ref_table_standard = table();
        ref_table_standard.MAST_ID = ref_table.(mast_id_col);
        
        % Add timepoint columns
        for tp = 1:length(timepoint_names)
            if ~isempty(timepoint_cols{tp})
                ref_table_standard.(['Time_' timepoint_names{tp}]) = ref_table.(timepoint_cols{tp});
            else
                ref_table_standard.(['Time_' timepoint_names{tp}]) = repmat({''}, height(ref_table), 1);
            end
        end
        
        ref_table = ref_table_standard;
        
    catch ME
        fprintf('Error reading Excel file: %s\n', ME.message);
        fprintf('Please check the file format and column names.\n');
        error('Could not read reference Excel file');
    end
    
    fprintf('Loaded %d reference cases\n', height(ref_table));
    
    % Initialize results
    results = table();
    results.MAST_ID = {};
    results.Timepoint = {};
    results.Expected_Date = {};
    results.Found_Date = {};
    results.Status = {};
    
    % Process each timepoint folder
    for tp_idx = 1:length(timepoint_folders)
        timepoint = timepoint_folders{tp_idx};
        folder_path = sprintf('../%s', timepoint);
        
        fprintf('\n=== Processing %s timepoint ===\n', timepoint);
        
        if ~exist(folder_path, 'dir')
            fprintf('Warning: Folder %s not found. Skipping.\n', folder_path);
            continue;
        end
        
        % Get all zip files in the folder
        zip_files = dir(fullfile(folder_path, '*.zip'));
        fprintf('Found %d zip files in %s\n', length(zip_files), folder_path);
        
        % If no zip files found, check for other archive formats
        if isempty(zip_files)
            rar_files = dir(fullfile(folder_path, '*.rar'));
            fprintf('Found %d rar files in %s\n', length(rar_files), folder_path);
            if ~isempty(rar_files)
                fprintf('Note: RAR files detected but not supported. Please extract manually.\n');
            end
            
            % Check if there are already extracted folders
            extracted_folders = dir(folder_path);
            extracted_folders = extracted_folders([extracted_folders.isdir] & ...
                ~strcmp({extracted_folders.name}, '.') & ~strcmp({extracted_folders.name}, '..'));
            
            if ~isempty(extracted_folders)
                fprintf('Found %d extracted folders in %s\n', length(extracted_folders), folder_path);
                fprintf('Note: This script expects zip files. If you have extracted folders,\n');
                fprintf('please zip them first or modify the script to handle extracted folders.\n');
            end
        end
        
        for zip_idx = 1:length(zip_files)
            zip_file = zip_files(zip_idx);
            zip_path = fullfile(zip_file.folder, zip_file.name);
            
                % Extract MAST ID from zip filename
                [~, zip_name, ~] = fileparts(zip_file.name);
                
                % Extract the MAST ID part (e.g., MAST003 from MAST003_000_AS036)
                mast_id = extract_mast_id_from_filename(zip_name);
                
                % Find corresponding entry in reference table
                ref_idx = find(strcmp(ref_table.MAST_ID, mast_id));
            if isempty(ref_idx)
                fprintf('  Warning: No reference data for %s (extracted MAST ID: %s)\n', zip_name, mast_id);
                continue;
            end
            
            % Get expected date for this timepoint
            if strcmp(timepoint, 'Confirmatory')
                expected_date = ref_table.Time_Confirmatory(ref_idx);
            elseif strcmp(timepoint, '12m')
                expected_date = ref_table.Time_12m(ref_idx);
            elseif strcmp(timepoint, '24m')
                expected_date = ref_table.Time_24m(ref_idx);
            elseif strcmp(timepoint, '36m')
                expected_date = ref_table.Time_36m(ref_idx);
            end
            
            % Convert to string if needed
            if isnumeric(expected_date)
                expected_date = num2str(expected_date);
            elseif isdatetime(expected_date)
                expected_date = datestr(expected_date, 'dd-mm-yy');
            elseif iscell(expected_date)
                expected_date = expected_date{1};
            end
            
            % Skip if no expected date
            if isempty(expected_date) || strcmp(expected_date, '')
                fprintf('  Skipping %s - no expected date for %s\n', zip_name, timepoint);
                continue;
            end
            
            % Convert expected date to month-year format
            expected_month_year = convert_date_to_month_year(expected_date);
            
            fprintf('  Processing %s (expected: %s)\n', zip_name, expected_month_year);
            
            try
                % Create temporary extraction directory
                temp_dir = fullfile(folder_path, 'temp_extraction');
                if exist(temp_dir, 'dir')
                    rmdir(temp_dir, 's');
                end
                mkdir(temp_dir);
                
                % Extract zip file
                unzip(zip_path, temp_dir);
                
                % Look for folder with "__Studies" suffix (handle nested structure)
                studies_folder = find_studies_folder(temp_dir);
                
                if isempty(studies_folder)
                    fprintf('    No __Studies folder found\n');
                    found_date = '';
                    status = 'NO_STUDIES_FOLDER';
                else
                    % Extract date from folder name
                    found_date = extract_date_from_folder(studies_folder);
                    
                    if isempty(found_date)
                        status = 'NO_DATE_FOUND';
                    elseif strcmp(found_date, expected_month_year)
                        status = 'CORRECT';
                        fprintf('    ✓ Date matches: %s\n', found_date);
                    else
                        status = 'INCORRECT';
                        fprintf('    ✗ Date mismatch: found %s, expected %s\n', found_date, expected_month_year);
                    end
                end
                
                % Clean up
                rmdir(temp_dir, 's');
                
            catch ME
                fprintf('    Error processing %s: %s\n', zip_name, ME.message);
                found_date = '';
                status = 'ERROR';
            end
            
            % Store result
            results = [results; {zip_name, timepoint, expected_month_year, found_date, status}];
        end
    end
    
    % Generate summary report
    fprintf('\n=== SUMMARY REPORT ===\n');
    
    % Count results by status
    correct_count = sum(strcmp(results.Status, 'CORRECT'));
    incorrect_count = sum(strcmp(results.Status, 'INCORRECT'));
    error_count = sum(strcmp(results.Status, 'ERROR'));
    no_folder_count = sum(strcmp(results.Status, 'NO_STUDIES_FOLDER'));
    no_date_count = sum(strcmp(results.Status, 'NO_DATE_FOUND'));
    
    fprintf('Total processed: %d\n', height(results));
    fprintf('Correct dates: %d\n', correct_count);
    fprintf('Incorrect dates: %d\n', incorrect_count);
    fprintf('Errors: %d\n', error_count);
    fprintf('No __Studies folder: %d\n', no_folder_count);
    fprintf('No date found: %d\n', no_date_count);
    
    % Show incorrect dates
    if incorrect_count > 0
        fprintf('\n=== INCORRECT DATES ===\n');
        incorrect_rows = results(strcmp(results.Status, 'INCORRECT'), :);
        for i = 1:height(incorrect_rows)
            row = incorrect_rows(i, :);
            fprintf('%s (%s): Expected %s, Found %s\n', ...
                row.MAST_ID{1}, row.Timepoint{1}, row.Expected_Date{1}, row.Found_Date{1});
        end
    end
    
    % Save results to Excel
    output_file = '../Study_Date_Verification_Results.xlsx';
    writetable(results, output_file);
    fprintf('\nResults saved to: %s\n', output_file);
    
    fprintf('\nVerification complete!\n');
end

function month_year = convert_date_to_month_year(date_str)
% Convert DD-MM-YY format to MM-YYYY format
    if isempty(date_str) || strcmp(date_str, '')
        month_year = '';
        return;
    end
    
    try
        % Parse DD-MM-YY format
        parts = split(date_str, '-');
        if length(parts) >= 3
            day = str2double(parts{1});
            month = str2double(parts{2});
            year = str2double(parts{3});
            
            % Convert 2-digit year to 4-digit (assuming 2000s)
            if year < 50
                year = 2000 + year;
            else
                year = 1900 + year;
            end
            
            month_year = sprintf('%02d-%d', month, year);
        else
            month_year = '';
        end
    catch
        month_year = '';
    end
end

function studies_folder = find_studies_folder(root_dir)
% Find folder with "__Studies" suffix (handles nested structure)
    studies_folder = '';
    
    try
        % First, check direct subdirectories
        dirs = dir(root_dir);
        dirs = dirs([dirs.isdir] & ~strcmp({dirs.name}, '.') & ~strcmp({dirs.name}, '..'));
        
        for i = 1:length(dirs)
            dir_name = dirs(i).name;
            if endsWith(dir_name, '__Studies')
                studies_folder = fullfile(root_dir, dir_name);
                return;
            end
        end
        
        % If not found directly, check one level deeper (for nested zip structure)
        for i = 1:length(dirs)
            inner_dir = fullfile(root_dir, dirs(i).name);
            inner_dirs = dir(inner_dir);
            inner_dirs = inner_dirs([inner_dirs.isdir] & ~strcmp({inner_dirs.name}, '.') & ~strcmp({inner_dirs.name}, '..'));
            
            for j = 1:length(inner_dirs)
                inner_dir_name = inner_dirs(j).name;
                if endsWith(inner_dir_name, '__Studies')
                    studies_folder = fullfile(inner_dir, inner_dir_name);
                    return;
                end
            end
        end
    catch
        studies_folder = '';
    end
end

function date_str = extract_date_from_folder(folder_path)
% Extract date (month-year) from folder name before "__Studies" suffix
    date_str = '';
    
    try
        [~, folder_name, ~] = fileparts(folder_path);
        
        % Remove "__Studies" suffix
        base_name = strrep(folder_name, '__Studies', '');
        
        % Look for date pattern in the folder name
        % Common patterns: MM-YYYY, MM-YY, MMM-YYYY, etc.
        
        % Try YYYY-MM pattern (most common)
        pattern = '(\d{4})-(\d{1,2})';
        matches = regexp(base_name, pattern, 'tokens');
        if ~isempty(matches)
            year = str2double(matches{1}{1});
            month = str2double(matches{1}{2});
            date_str = sprintf('%02d-%d', month, year);
            return;
        end
        
        % Try MM-YYYY pattern
        pattern = '(\d{1,2})-(\d{4})';
        matches = regexp(base_name, pattern, 'tokens');
        if ~isempty(matches)
            month = str2double(matches{1}{1});
            year = str2double(matches{1}{2});
            date_str = sprintf('%02d-%d', month, year);
            return;
        end
        
        % Try MM-YY pattern
        pattern = '(\d{1,2})-(\d{2})';
        matches = regexp(base_name, pattern, 'tokens');
        if ~isempty(matches)
            month = str2double(matches{1}{1});
            year = str2double(matches{1}{2});
            % Convert 2-digit year to 4-digit
            if year < 50
                year = 2000 + year;
            else
                year = 1900 + year;
            end
            date_str = sprintf('%02d-%d', month, year);
            return;
        end
        
        % Try other patterns if needed
        % Add more patterns here as needed
        
    catch
        date_str = '';
    end
end

function mast_id = extract_mast_id_from_filename(filename)
% Extract MAST ID from filename (e.g., MAST003 from MAST003_000_AS036)
    mast_id = '';
    
    try
        % Look for MAST followed by digits pattern
        pattern = '(MAST\d+)';
        matches = regexp(filename, pattern, 'tokens');
        if ~isempty(matches)
            mast_id = matches{1}{1};
        end
    catch
        mast_id = '';
    end
end
