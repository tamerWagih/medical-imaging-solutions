function extract_specific_features()
    % Extract specific features (HRS1Volume, HRS6Volume, HRS7/6, ADC_Prostate_Mean, ADC_HRS1_Mean, ADC_HRS6_Mean) from first 4 experiments
    % Creates Excel file with one sheet per experiment
    
    % Select study folder using GUI
    studyFolder = uigetdir('', 'Select Study Folder (Confirmatory, 12m, 24m, or 36m)');
    
    if studyFolder == 0
        disp('No folder selected. Exiting...');
        return;
    end
    
    disp(['Selected study folder: ', studyFolder]);
    disp(' ');
    
    % Number of experiments (only first 4)
    numExperiments = 4;
    
    % Initialize structure to store all experiment results
    allResults = struct();
    
    % Process each experiment
    for expNum = 1:numExperiments
        expFolderName = sprintf('Experiment%03d', expNum);
        expFolder = fullfile(studyFolder, expFolderName);
        
        fprintf('Processing %s...\n', expFolderName);
        
        if ~exist(expFolder, 'dir')
            warning('Experiment folder not found: %s', expFolder);
            % Create empty table for missing experiments
            allResults.(expFolderName) = table();
            continue;
        end
        
        % Extract features for this experiment
        expData = extractExperimentFeatures(expFolder);
        
        if ~isempty(expData)
            fprintf('  Found %d patients in %s\n', height(expData), expFolderName);
            allResults.(expFolderName) = expData;
        else
            fprintf('  No valid data found in %s\n', expFolderName);
            allResults.(expFolderName) = table();
        end
    end
    
    % Save to Excel
    [~, studyName] = fileparts(studyFolder);
    outputFile = fullfile(studyFolder, sprintf('%s_Specific_Features.xlsx', studyName));
    
    disp(' ');
    disp('Writing results to Excel...');
    
    for expNum = 1:numExperiments
        expFolderName = sprintf('Experiment%03d', expNum);
        
        if isfield(allResults, expFolderName) && ~isempty(allResults.(expFolderName))
            writetable(allResults.(expFolderName), outputFile, 'Sheet', expFolderName);
            fprintf('  Written: %s (%d patients)\n', expFolderName, height(allResults.(expFolderName)));
        else
            % Write empty sheet
            emptyTable = table(cell(0,1), [], [], [], [], [], [], ...
                'VariableNames', {'Patient_ID', 'HRS1_Volume', 'HRS6_Volume', 'HRS7_6_Ratio', 'ADC_Prostate_Mean', 'ADC_HRS1_Mean', 'ADC_HRS6_Mean'});
            writetable(emptyTable, outputFile, 'Sheet', expFolderName);
        end
    end
    
    disp(' ');
    disp(['Excel file saved: ', outputFile]);
    disp('Done!');
end

function expData = extractExperimentFeatures(expFolder)
    % Extract HRS1Volume, HRS6Volume, HRS7/6, ADC_Prostate_Mean, ADC_HRS1_Mean, ADC_HRS6_Mean for all patients in one experiment
    
    % Find all MAST patient folders
    caseDirs = dir(fullfile(expFolder, 'MAST*'));
    isDir = [caseDirs.isdir];
    caseDirs = caseDirs(isDir);
    
    if isempty(caseDirs)
        expData = table();
        return;
    end
    
    % Initialize storage
    patientIDs = cell(length(caseDirs), 1);
    hrs1_vols = nan(length(caseDirs), 1);
    hrs6_vols = nan(length(caseDirs), 1);
    hrs7_6_ratios = nan(length(caseDirs), 1);
    adc_prostate_means = nan(length(caseDirs), 1);
    adc_hrs1_means = nan(length(caseDirs), 1);
    adc_hrs6_means = nan(length(caseDirs), 1);
    
    validCount = 0;
    
    for i = 1:length(caseDirs)
        casePath = fullfile(caseDirs(i).folder, caseDirs(i).name);
        
        % Extract MAST ID
        mastMatch = regexp(caseDirs(i).name, 'MAST(\d+)', 'tokens');
        if isempty(mastMatch)
            continue;
        end
        mastID = sprintf('MAST%03d', str2double(mastMatch{1}{1}));
        
        % Extract features
        [hrs1_vol, hrs6_vol, hrs7_6_ratio, adc_prostate_mean, adc_hrs1_mean, adc_hrs6_mean] = extractPatientFeatures(casePath);
        
        % Store results
        validCount = validCount + 1;
        patientIDs{validCount} = mastID;
        hrs1_vols(validCount) = hrs1_vol;
        hrs6_vols(validCount) = hrs6_vol;
        hrs7_6_ratios(validCount) = hrs7_6_ratio;
        adc_prostate_means(validCount) = adc_prostate_mean;
        adc_hrs1_means(validCount) = adc_hrs1_mean;
        adc_hrs6_means(validCount) = adc_hrs6_mean;
    end
    
    % Trim to valid entries
    patientIDs = patientIDs(1:validCount);
    hrs1_vols = hrs1_vols(1:validCount);
    hrs6_vols = hrs6_vols(1:validCount);
    hrs7_6_ratios = hrs7_6_ratios(1:validCount);
    adc_prostate_means = adc_prostate_means(1:validCount);
    adc_hrs1_means = adc_hrs1_means(1:validCount);
    adc_hrs6_means = adc_hrs6_means(1:validCount);
    
    % Create table
    expData = table(patientIDs, hrs1_vols, hrs6_vols, hrs7_6_ratios, adc_prostate_means, adc_hrs1_means, adc_hrs6_means, ...
        'VariableNames', {'Patient_ID', 'HRS1_Volume', 'HRS6_Volume', 'HRS7_6_Ratio', 'ADC_Prostate_Mean', 'ADC_HRS1_Mean', 'ADC_HRS6_Mean'});
    
    % Sort by patient ID
    expData = sortrows(expData, 'Patient_ID');
end

function [hrs1_vol, hrs6_vol, hrs7_6_ratio, adc_prostate_mean, adc_hrs1_mean, adc_hrs6_mean] = extractPatientFeatures(casePath)
    % Extract the 6 specific features for a single patient
    
    % Initialize outputs
    hrs1_vol = NaN;
    hrs6_vol = NaN;
    hrs7_6_ratio = NaN;
    adc_prostate_mean = NaN;
    adc_hrs1_mean = NaN;
    adc_hrs6_mean = NaN;
    
    % Find MRI_Reformatted directory
    mriDir = dir(fullfile(casePath, '**', 'Output', 'MRI_Reformatted'));
    if isempty(mriDir)
        return;
    end
    mriPath = fullfile(mriDir(1).folder, mriDir(1).name);
    
    % Check if ADC image exists
    adcFile = fullfile(mriPath, 'ADC.mha');
    if ~exist(adcFile, 'file')
        return;
    end
    
    % Read ADC image
    try
        adcInfo = mha_read_header(adcFile);
        adcVol = mha_read_volume(adcInfo);
    catch
        return;
    end
    
    % Extract HRS1 volume
    hrs1_file = findHRSFile(casePath, 1);
    if ~isempty(hrs1_file)
        try
            info = mha_read_header(hrs1_file);
            [V, pixelDimensions, ~, ~] = mha_read_volume(info);
            voxelVolume = prod(pixelDimensions); % mm^3
            hrs1_vol = round(sum(V(:) == 1) * voxelVolume / 1000, 2); % mL
        catch
            % Keep as NaN
        end
    end
    
    % Extract ADC mean within Prostate mask
    prostate_file = findProstateFile(casePath);
    if ~isempty(prostate_file)
        try
            info = mha_read_header(prostate_file);
            [V, ~, ~, ~] = mha_read_volume(info);
            mask = (V == 1);
            vals = double(adcVol(mask));
            vals = vals(~isnan(vals));
            if ~isempty(vals)
                adc_prostate_mean = mean(vals);
            end
        catch
            % Keep as NaN
        end
    end
    
    % Extract ADC mean within HRS1 mask
    hrs1_file = findHRSFile(casePath, 1);
    if ~isempty(hrs1_file)
        try
            info = mha_read_header(hrs1_file);
            [V, ~, ~, ~] = mha_read_volume(info);
            mask = (V == 1);
            vals = double(adcVol(mask));
            vals = vals(~isnan(vals));
            if ~isempty(vals)
                adc_hrs1_mean = mean(vals);
            end
        catch
            % Keep as NaN
        end
    end
    
    % Extract HRS6 volume
    hrs6_file = findHRSFile(casePath, 6);
    if ~isempty(hrs6_file)
        try
            info = mha_read_header(hrs6_file);
            [V, pixelDimensions, ~, ~] = mha_read_volume(info);
            voxelVolume = prod(pixelDimensions); % mm^3
            hrs6_vol = round(sum(V(:) == 1) * voxelVolume / 1000, 2); % mL
            
            % Extract ADC mean within HRS6 mask
            mask = (V == 1);
            vals = double(adcVol(mask));
            vals = vals(~isnan(vals));
            if ~isempty(vals)
                adc_hrs6_mean = mean(vals);
            end
        catch
            % Keep as NaN
        end
    end
    
    % Extract HRS7 volume and calculate ratio
    hrs7_file = findHRSFile(casePath, 7);
    if ~isempty(hrs7_file)
        try
            info = mha_read_header(hrs7_file);
            [V, pixelDimensions, ~, ~] = mha_read_volume(info);
            voxelVolume = prod(pixelDimensions); % mm^3
            hrs7_vol = round(sum(V(:) == 1) * voxelVolume / 1000, 2); % mL
            
            % Calculate HRS7/HRS6 ratio
            if ~isnan(hrs6_vol) && hrs6_vol ~= 0
                hrs7_6_ratio = hrs7_vol / hrs6_vol;
            end
        catch
            % Keep as NaN
        end
    end
end

function hrsFile = findHRSFile(casePath, hrs_number)
    % Find HRS mask file (excluding Visualization folders)
    
    hrsFiles = dir(fullfile(casePath, '**', sprintf('HRS_%d.mha', hrs_number)));
    hrsFile = '';
    
    for i = 1:length(hrsFiles)
        if ~contains(hrsFiles(i).folder, 'Visualization')
            hrsFile = fullfile(hrsFiles(i).folder, hrsFiles(i).name);
            return;
        end
    end
end

function prostateFile = findProstateFile(casePath)
    % Find Prostate mask file (excluding Visualization folders)
    
    prostateFiles = dir(fullfile(casePath, '**', 'Prostate.mha'));
    prostateFile = '';
    
    for i = 1:length(prostateFiles)
        if ~contains(prostateFiles(i).folder, 'Visualization')
            prostateFile = fullfile(prostateFiles(i).folder, prostateFiles(i).name);
            return;
        end
    end
end

function info = mha_read_header(filename)
    if(exist('filename','var')==0)
        [filename, pathname] = uigetfile('*.mha', 'Read mha-file');
        filename = [pathname filename];
    end
    
    fid=fopen(filename,'rb');
    if(fid<0)
        fprintf('could not open file %s\n',filename);
        return
    end
    
    info.Filename=filename;
    info.Format='MHA';
    info.CompressedData='false';
    readelementdatafile=false;
    while(~readelementdatafile)
        str=fgetl(fid);
        s=find(str=='=',1,'first');
        if(~isempty(s))
            type=str(1:s-1); 
            data=str(s+1:end);
            while(type(end)==' '); type=type(1:end-1); end
            while(data(1)==' '); data=data(2:end); end
        else
            type=''; data=str;
        end
        
        switch(lower(type))
            case 'ndims'
                info.NumberOfDimensions=sscanf(data, '%d')';
            case 'dimsize'
                info.Dimensions=sscanf(data, '%d')';
            case 'elementspacing'
                info.PixelDimensions=sscanf(data, '%lf')';
            case 'elementsize'
                info.ElementSize=sscanf(data, '%lf')';
                if(~isfield(info,'PixelDimensions'))
                    info.PixelDimensions=info.ElementSize;
                end
            case 'elementbyteordermsb'
                info.ByteOrder=lower(data);
            case 'anatomicalorientation'
                info.AnatomicalOrientation=data;
            case 'centerofrotation'
                info.CenterOfRotation=sscanf(data, '%lf')';
            case 'offset'
                info.Offset=sscanf(data, '%lf')';
            case 'binarydata'
                info.BinaryData=lower(data);
            case 'compresseddatasize'
                info.CompressedDataSize=sscanf(data, '%d')';
            case 'objecttype'
                info.ObjectType=lower(data);
            case 'transformmatrix'
                info.TransformMatrix=sscanf(data, '%lf')';
            case 'compresseddata'
                info.CompressedData=lower(data);
            case 'binarydatabyteordermsb'
                info.ByteOrder=lower(data);
            case 'elementdatafile'
                info.DataFile=data;
                readelementdatafile=true;
            case 'elementtype'
                info.DataType=lower(data(5:end));
            case 'headersize'
                val=sscanf(data, '%d')';
                if(val(1)>0), info.HeaderSize=val(1); end
            case 'nrrd_kinds[0]'
                info.NRRD_kinds0=lower(data);
            case 'nrrd_kinds[1]'
                info.NRRD_kinds1=lower(data);
            case 'nrrd_kinds[2]'
                info.NRRD_kinds2=lower(data);
            case 'nrrd_space'
                info.NRRD_space=lower(data);
            otherwise
                info.(type)=data;
        end
    end
    
    switch(info.DataType)
        case 'char', info.BitDepth=8;
        case 'uchar', info.BitDepth=8;
        case 'short', info.BitDepth=16;
        case 'ushort', info.BitDepth=16;
        case 'int', info.BitDepth=32;
        case 'uint', info.BitDepth=32;
        case 'float', info.BitDepth=32;
        case 'double', info.BitDepth=64;
        otherwise, info.BitDepth=0;
    end
    if(~isfield(info,'HeaderSize'))
        info.HeaderSize=ftell(fid);
    end
    fclose(fid);
end

function [V, pixelDimensions, offset, orientation] = mha_read_volume(info)
    if(~isstruct(info))
        info=mha_read_header(info); 
    end
    
    switch(lower(info.DataFile))
        case 'local'
        otherwise
        % Seperate file
        info.Filename=fullfile(fileparts(info.Filename),info.DataFile);
    end
            
    % Open file
    switch(info.ByteOrder(1))
        case ('true')
            fid=fopen(info.Filename','rb','ieee-be');
        otherwise
            fid=fopen(info.Filename,'rb','ieee-le');
    end
    
    switch(lower(info.DataFile))
        case 'local'
            % Skip header
            fseek(fid,info.HeaderSize,'bof');
        otherwise
            fseek(fid,0,'bof');
    end
    
    datasize=prod(info.Dimensions)*info.BitDepth/8;
    
    switch(info.CompressedData(1))
        case 'f'
            % Read the Data
            switch(info.DataType)
                case 'char'
                     V = int8(fread(fid,datasize,'char')); 
                case 'uchar'
                    V = uint8(fread(fid,datasize,'uchar')); 
                case 'short'
                    V = int16(fread(fid,datasize,'short')); 
                case 'ushort'
                    V = uint16(fread(fid,datasize,'ushort')); 
                case 'int'
                     V = int32(fread(fid,datasize,'int')); 
                case 'uint'
                     V = uint32(fread(fid,datasize,'uint')); 
                case 'float'
                     V = single(fread(fid,datasize,'float'));   
                case 'double'
                    V = double(fread(fid,datasize,'double'));
            end
        case 't'
            switch(info.DataType)
                case 'char', DataType='int8';
                case 'uchar', DataType='uint8';
                case 'short', DataType='int16';
                case 'ushort', DataType='uint16';
                case 'int', DataType='int32';
                case 'uint', DataType='uint32';
                case 'float', DataType='single';
                case 'double', DataType='double';
            end
            Z  = fread(fid,inf,'uchar=>uint8');
            V = zlib_decompress(Z,DataType);
    
    end
    fclose(fid);
    V = reshape(V,info.Dimensions);
    pixelDimensions = info.PixelDimensions;
    offset = info.Offset;
    orientation = info.TransformMatrix;
end

function M = zlib_decompress(Z,DataType)
    import com.mathworks.mlwidgets.io.InterruptibleStreamCopier
    a=java.io.ByteArrayInputStream(Z);
    b=java.util.zip.InflaterInputStream(a);
    isc = InterruptibleStreamCopier.getInterruptibleStreamCopier;
    c = java.io.ByteArrayOutputStream;
    isc.copyStream(b,c);
    M=typecast(c.toByteArray,DataType);
end

