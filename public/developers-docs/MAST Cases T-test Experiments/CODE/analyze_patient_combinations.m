function analyze_patient_combinations()
    % Analyze MAST patient combinations across 4 studies
    % Creates an Excel sheet showing which patients appear in which studies
    
    % Select root folder using GUI
    rootFolder = uigetdir('', 'Select Root Folder Containing Study Folders');
    
    if rootFolder == 0
        disp('No folder selected. Exiting...');
        return;
    end
    
    disp(['Selected root folder: ', rootFolder]);
    disp(' ');
    
    % Define study names
    studies = {'Confirmatory', '12m', '24m', '36m'};
    numStudies = length(studies);
    
    % Initialize storage for patient IDs per study
    patientsPerStudy = cell(numStudies, 1);
    
    % Process each study
    for i = 1:numStudies
        studyName = studies{i};
        dataFolder = fullfile(rootFolder, studyName, 'DATA');
        
        fprintf('Processing %s study...\n', studyName);
        
        if ~exist(dataFolder, 'dir')
            warning('DATA folder not found: %s', dataFolder);
            patientsPerStudy{i} = {};
            continue;
        end
        
        % Find all ZIP files in DATA folder
        zipFiles = dir(fullfile(dataFolder, 'MAST*.zip'));
        
        if isempty(zipFiles)
            warning('No MAST*.zip files found in: %s', dataFolder);
            patientsPerStudy{i} = {};
            continue;
        end
        
        % Extract patient IDs (MASTxxx format)
        patientIDs = cell(length(zipFiles), 1);
        for j = 1:length(zipFiles)
            filename = zipFiles(j).name;
            % Extract MASTxxx pattern (MAST followed by digits)
            tokens = regexp(filename, '(MAST\d+)', 'tokens', 'once');
            if ~isempty(tokens)
                patientIDs{j} = tokens{1};
            else
                warning('Could not extract MAST ID from: %s', filename);
                patientIDs{j} = '';
            end
        end
        
        % Remove empty entries and get unique IDs
        patientIDs = patientIDs(~cellfun(@isempty, patientIDs));
        patientIDs = unique(patientIDs);
        
        patientsPerStudy{i} = patientIDs;
        fprintf('  Found %d unique patients in %s\n', length(patientIDs), studyName);
    end
    
    disp(' ');
    disp('Creating patient combination table...');
    
    % Get all unique patient IDs across all studies
    allPatients = {};
    for i = 1:numStudies
        allPatients = [allPatients; patientsPerStudy{i}];
    end
    allPatients = unique(allPatients);
    allPatients = sort(allPatients);
    
    numPatients = length(allPatients);
    fprintf('Total unique patients across all studies: %d\n', numPatients);
    disp(' ');
    
    % Create presence matrix (1 if patient in study, 0 otherwise)
    presenceMatrix = zeros(numPatients, numStudies);
    
    for i = 1:numStudies
        for j = 1:numPatients
            if ismember(allPatients{j}, patientsPerStudy{i})
                presenceMatrix(j, i) = 1;
            end
        end
    end
    
    % Create table
    resultTable = table(allPatients, ...
        presenceMatrix(:,1), ...
        presenceMatrix(:,2), ...
        presenceMatrix(:,3), ...
        presenceMatrix(:,4), ...
        'VariableNames', {'Patient_ID', 'Confirmatory', '12m', '24m', '36m'});
    
    % Add a column for total number of studies per patient
    resultTable.Total_Studies = sum(presenceMatrix, 2);
    
    % Display summary statistics
    disp('=== Summary Statistics ===');
    fprintf('Patients in Confirmatory: %d\n', sum(presenceMatrix(:,1)));
    fprintf('Patients in 12m: %d\n', sum(presenceMatrix(:,2)));
    fprintf('Patients in 24m: %d\n', sum(presenceMatrix(:,3)));
    fprintf('Patients in 36m: %d\n', sum(presenceMatrix(:,4)));
    disp(' ');
    
    % Find common combinations
    disp('=== Patient Distribution by Number of Studies ===');
    for k = 1:4
        numPatientsInKStudies = sum(resultTable.Total_Studies == k);
        fprintf('Patients in exactly %d study(ies): %d\n', k, numPatientsInKStudies);
    end
    disp(' ');
    
    % Find patients in all 4 studies
    patientsInAll = allPatients(resultTable.Total_Studies == 4);
    fprintf('Patients in ALL 4 studies: %d\n', length(patientsInAll));
    if ~isempty(patientsInAll)
        disp('  List:');
        for k = 1:length(patientsInAll)
            fprintf('    %s\n', patientsInAll{k});
        end
    end
    disp(' ');
    
    % Save to Excel
    outputFile = fullfile(rootFolder, 'Patient_Combination_Analysis.xlsx');
    
    try
        % Write main table
        writetable(resultTable, outputFile, 'Sheet', 'Patient Combinations');
        
        % Create summary sheet
        summaryData = {
            'Study', 'Patient Count';
            'Confirmatory', sum(presenceMatrix(:,1));
            '12m', sum(presenceMatrix(:,2));
            '24m', sum(presenceMatrix(:,3));
            '36m', sum(presenceMatrix(:,4));
            '', '';
            'Total Unique Patients', numPatients;
            '', '';
            'Distribution', '';
            'In 1 study only', sum(resultTable.Total_Studies == 1);
            'In 2 studies', sum(resultTable.Total_Studies == 2);
            'In 3 studies', sum(resultTable.Total_Studies == 3);
            'In all 4 studies', sum(resultTable.Total_Studies == 4);
        };
        
        writecell(summaryData, outputFile, 'Sheet', 'Summary');
        
        % Create detailed combination analysis
        disp('Creating detailed combination analysis...');
        [uniqueCombinations, ~, idx] = unique(presenceMatrix, 'rows');
        numCombinations = size(uniqueCombinations, 1);
        
        combinationData = cell(numCombinations + 1, 6);
        combinationData(1,:) = {'Confirmatory', '12m', '24m', '36m', 'Count', 'Patients'};
        
        for k = 1:numCombinations
            combo = uniqueCombinations(k,:);
            patientsInCombo = allPatients(idx == k);
            combinationData{k+1, 1} = combo(1);
            combinationData{k+1, 2} = combo(2);
            combinationData{k+1, 3} = combo(3);
            combinationData{k+1, 4} = combo(4);
            combinationData{k+1, 5} = length(patientsInCombo);
            combinationData{k+1, 6} = strjoin(patientsInCombo, ', ');
        end
        
        writecell(combinationData, outputFile, 'Sheet', 'Combinations Detail');
        
        disp(['Excel file saved: ', outputFile]);
        disp(' ');
        disp('=== Excel Contents ===');
        disp('Sheet 1: Patient Combinations - Full list with presence indicators');
        disp('Sheet 2: Summary - Statistics and counts');
        disp('Sheet 3: Combinations Detail - All unique study combinations');
        
    catch ME
        warning('Error writing to Excel: %s', ME.message);
        disp('Displaying first 10 rows of the table instead:');
        disp(resultTable(1:min(10, height(resultTable)), :));
    end
    
    disp(' ');
    disp('Analysis complete!');
end

