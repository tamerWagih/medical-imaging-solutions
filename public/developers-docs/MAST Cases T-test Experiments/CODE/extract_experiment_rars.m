function extract_experiment_rars()
    % Extract RAR files from Experiment001 to Experiment036 folders in parallel
    % Uses GUI to select root folder
    
    % Find WinRAR/UnRAR executable
    unrarPath = findUnRAR();
    if isempty(unrarPath)
        error(['WinRAR or UnRAR not found. Please install WinRAR from: https://www.win-rar.com/download.html', newline, ...
               'Or manually specify the path to UnRAR.exe in the script.']);
    end
    
    disp(['Using UnRAR from: ', unrarPath]);
    disp(' ');
    
    % Select root folder using GUI
    rootFolder = uigetdir('', 'Select Root Folder Containing Experiment Folders');
    
    if rootFolder == 0
        disp('No folder selected. Exiting...');
        return;
    end
    
    disp(['Selected root folder: ', rootFolder]);
    
    % Number of experiments
    numExperiments = 36;
    
    % Prepare experiment folder names
    experimentFolders = cell(numExperiments, 1);
    for i = 1:numExperiments
        experimentFolders{i} = fullfile(rootFolder, sprintf('Experiment%03d', i));
    end
    
    % Check if folders exist and find RAR files
    disp('Checking experiment folders...');
    rarFiles = cell(numExperiments, 1);
    validExperiments = true(numExperiments, 1);
    
    for i = 1:numExperiments
        expFolder = experimentFolders{i};
        
        if ~exist(expFolder, 'dir')
            warning('Folder does not exist: %s', expFolder);
            validExperiments(i) = false;
            continue;
        end
        
        % Find RAR files in the folder
        rarList = dir(fullfile(expFolder, '*.rar'));
        
        if isempty(rarList)
            warning('No RAR file found in: %s', expFolder);
            validExperiments(i) = false;
            continue;
        end
        
        if length(rarList) > 1
            warning('Multiple RAR files found in %s. Using the first one: %s', ...
                expFolder, rarList(1).name);
        end
        
        rarFiles{i} = fullfile(expFolder, rarList(1).name);
        disp(['Found: ', rarList(1).name, ' in Experiment', sprintf('%03d', i)]);
    end
    
    % Filter to valid experiments only
    validFolders = experimentFolders(validExperiments);
    validRarFiles = rarFiles(validExperiments);
    
    disp(' ');
    disp(['Total valid experiments found: ', num2str(sum(validExperiments)), ' / ', num2str(numExperiments)]);
    disp(' ');
    disp('Starting parallel extraction...');
    
    % Start parallel pool if not already running
    poolobj = gcp('nocreate');
    if isempty(poolobj)
        parpool;
    end
    
    % Extract RAR files in parallel
    parfor i = 1:length(validRarFiles)
        extractSingleRAR(validRarFiles{i}, validFolders{i}, unrarPath);
    end
    
    disp(' ');
    disp('All extractions completed!');
end

function extractSingleRAR(rarFile, destFolder, unrarPath)
    % Extract a single RAR file with overwrite
    
    try
        % Get experiment name for display
        [~, expName] = fileparts(destFolder);
        
        fprintf('Extracting: %s ...\n', expName);
        
        % Use unrar command with overwrite option
        % -o+ means overwrite all files without prompting
        % -inul suppresses messages (optional, removed for debugging)
        
        % Only quote the unrarPath if it contains spaces (full path)
        if contains(unrarPath, ' ')
            cmd = sprintf('"%s" x -o+ "%s" "%s\\"', unrarPath, rarFile, destFolder);
        else
            cmd = sprintf('%s x -o+ "%s" "%s\\"', unrarPath, rarFile, destFolder);
        end
        
        [status, cmdout] = system(cmd);
        
        if status == 0
            fprintf('Successfully extracted: %s\n', expName);
        else
            warning('Failed to extract %s. Status: %d, Output: %s', expName, status, cmdout);
        end
        
    catch ME
        warning('Error extracting %s: %s', rarFile, ME.message);
    end
end

function unrarPath = findUnRAR()
    % Find UnRAR or WinRAR executable on the system
    
    % Common installation paths for WinRAR on Windows
    possiblePaths = {
        'C:\Program Files\WinRAR\UnRAR.exe',
        'C:\Program Files\WinRAR\WinRAR.exe',
        'C:\Program Files (x86)\WinRAR\UnRAR.exe',
        'C:\Program Files (x86)\WinRAR\WinRAR.exe',
    };
    
    % Try to find it using where command first (most reliable)
    [status, result] = system('where unrar 2>nul');
    if status == 0 && ~isempty(strtrim(result)) && ~contains(result, 'not recognized')
        lines = strsplit(strtrim(result), newline);
        unrarPath = strtrim(lines{1});
        return;
    end
    
    [status, result] = system('where winrar 2>nul');
    if status == 0 && ~isempty(strtrim(result)) && ~contains(result, 'not recognized')
        lines = strsplit(strtrim(result), newline);
        unrarPath = strtrim(lines{1});
        return;
    end
    
    % Check common installation paths
    for i = 1:length(possiblePaths)
        if exist(possiblePaths{i}, 'file')
            unrarPath = possiblePaths{i};
            return;
        end
    end
    
    % Last resort: check if unrar responds (but verify output)
    [status, result] = system('unrar 2>&1');
    if status ~= 1 || ~contains(result, 'not recognized')
        % If it doesn't say "not recognized", it might be available
        if contains(result, 'UNRAR') || contains(result, 'Usage')
            unrarPath = 'unrar';
            return;
        end
    end
    
    % Not found
    unrarPath = '';
end

