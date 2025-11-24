function compute_HRS_features_t_test(rootDir, labelsCsvPath, expNum)
    % Updated: Processes both ADC and DCE images, extracts 10 HRS mask volumes, 10 ratios, and 6 stats for each mask, writes to Excel with two sheets (ADC, DCE), and appends t-test p-values.
    %
    % Usage:
    %   compute_HRS_features_t_test(rootDir, labelsCsvPath, expNum)
    %
    % Inputs:
    %   rootDir        - Path to directory containing MASTxxx folders
    %   labelsCsvPath  - Path to Labels.csv with columns: mast_id,label
    %   expNum         - number of the experiment
    % Example:
    %   compute_HRS_features_t_test("D:\Classification\T-Test Experiments\Confirmatory HRS Output_Experiment001", "D:\Classification\T-Test Experiments\CODE\Labels.csv", "001")
    
    num_HRS = 10;
    stat_names = {'Mean','P10','P25','P50','P75','P90'};
    num_stats = numel(stat_names);
    protocols = {'ADC','DCE'};
    
    labelsTable = readtable(labelsCsvPath);
    labelMap = containers.Map(labelsTable.mast_id, labelsTable.label);
    
    caseDirs = dir(fullfile(rootDir, 'MAST*'));
    isDir = [caseDirs.isdir];
    caseDirs = caseDirs(isDir);
    
    all_results = struct();
    
    for p = 1:numel(protocols)
        protocol = protocols{p};
        all_rows = {};
        for i = 1:length(caseDirs)
            casePath = fullfile(caseDirs(i).folder, caseDirs(i).name);
            mastMatch = regexp(caseDirs(i).name, 'MAST(\d+)', 'tokens');
            if ~isempty(mastMatch)
                mastID = sprintf('M%03d', str2double(mastMatch{1}{1}));
            else
                continue;
            end
            if isKey(labelMap, mastID)
                label = labelMap(mastID);
                if isnan(label)
                    continue; % Skip cases with no label
                end
            else
                continue; % Skip cases with no label
            end
            % Find protocol image
            mriDir = dir(fullfile(casePath, '**', 'Output', 'MRI_Reformatted'));
            if isempty(mriDir)
                continue;
            end
            mriPath = fullfile(mriDir(1).folder, mriDir(1).name);
            imgFile = fullfile(mriPath, [protocol '.mha']);
            if ~exist(imgFile, 'file')
                continue;
            end
            imgInfo = mha_read_header(imgFile);
            imgVol = mha_read_volume(imgInfo);
            % HRS mask features
            hrs_vols = nan(1, num_HRS);
            hrs_stats = nan(num_HRS, num_stats);
            for HRS_number = 1:num_HRS
                hrsFiles = dir(fullfile(casePath, '**', sprintf('HRS_%d.mha', HRS_number)));
                hrsFile = '';
                for hf = 1:length(hrsFiles)
                    if ~contains(hrsFiles(hf).folder, 'Visualization')
                        hrsFile = fullfile(hrsFiles(hf).folder, hrsFiles(hf).name);
                        break;
                    end
                end
                if ~isempty(hrsFile) && exist(hrsFile, 'file')
                    info = mha_read_header(hrsFile);
                    [V, pixelDimensions, ~, ~] = mha_read_volume(info);
                    voxelVolume = prod(pixelDimensions); % mm^3
                    volumeInML = sum(V(:) == 1) * voxelVolume / 1000;
                    hrs_vols(HRS_number) = round(volumeInML,2);
                    % Extract stats from protocol image within mask
                    mask = (V == 1);
                    vals = double(imgVol(mask));
                    vals = vals(~isnan(vals));
                    if isempty(vals)
                        hrs_stats(HRS_number,:) = nan(1,num_stats);
                    else
                        hrs_stats(HRS_number,1) = mean(vals);
                        hrs_stats(HRS_number,2) = prctile(vals,10);
                        hrs_stats(HRS_number,3) = prctile(vals,25);
                        hrs_stats(HRS_number,4) = prctile(vals,50);
                        hrs_stats(HRS_number,5) = prctile(vals,75);
                        hrs_stats(HRS_number,6) = prctile(vals,90);
                    end
                end
            end
            % Ratios (HRS2/HRS1 to HRS10/HRS9, and HRS8/HRS6)
            hrs_ratios = nan(1, num_HRS-1+1);
            for k = 2:num_HRS
                if ~isnan(hrs_vols(k)) && ~isnan(hrs_vols(k-1)) && hrs_vols(k-1) ~= 0
                    hrs_ratios(k-1) = hrs_vols(k) / hrs_vols(k-1);
                else
                    hrs_ratios(k-1) = NaN;
                end
            end
            if ~isnan(hrs_vols(8)) && ~isnan(hrs_vols(6)) && hrs_vols(6) ~= 0
                hrs_ratios(num_HRS) = hrs_vols(8) / hrs_vols(6);
            else
                hrs_ratios(num_HRS) = NaN;
            end
            % Build row
            stats_flat = reshape(hrs_stats',1,[]); % 60 stats
            % Ensure all features are NaN if missing (no empty cells)
            row_data = [ {mastID}, {label}, num2cell(hrs_vols), num2cell(hrs_ratios), num2cell(stats_flat) ];
            for idx = 1:numel(row_data)
                if isempty(row_data{idx})
                    row_data{idx} = NaN;
                end
            end
            all_rows{end+1,1} = row_data;
        end
        % Build table with protocol-prefixed feature names
        ratioNames = [arrayfun(@(n) sprintf('%s_HRS-R%d_%d', protocol, n, n-1), 2:num_HRS, 'UniformOutput', false), {sprintf('%s_HRS-R8_6', protocol)}];
        statNames = {};
        for h = 1:num_HRS
            for s = 1:num_stats
                statNames{end+1} = sprintf('%s_HRS%d_%s', protocol, h, stat_names{s});
            end
        end
        varNames = [{'mast_id','label'}, arrayfun(@(n) sprintf('%s_HRS-V%d', protocol, n), 1:num_HRS, 'UniformOutput', false), ratioNames, statNames];
        T = cell2table(vertcat(all_rows{:}), 'VariableNames', varNames);
        T = sortrows(T, 'mast_id');
        % T-test p-values
        p_row = cell(1, width(T));
        p_row{1} = 'p-value';
        p_row{2} = NaN;
        for i = 3:width(T)
            group0 = T{T.label==0, i};
            group1 = T{T.label==1, i};
            group0 = group0(~isnan(group0));
            group1 = group1(~isnan(group1));
            if ~isempty(group0) && ~isempty(group1)
                [~, p] = ttest2(group0, group1);
                p_row{i} = p;
            else
                p_row{i} = NaN;
            end
        end
        T = [T; p_row];
        all_results.(protocol) = T;
    end
    % Write to Excel
    outputExcelFile = fullfile(rootDir, sprintf('Results%s.xlsx', expNum));
    for p = 1:numel(protocols)
        protocol = protocols{p};
        writetable(all_results.(protocol), outputExcelFile, 'Sheet', protocol);
    end
    fprintf('Done! Results saved to %s\n', outputExcelFile);
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
