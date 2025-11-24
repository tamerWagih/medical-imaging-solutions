function generate_analysis_ppt()
% generate_analysis_ppt
% Builds an analysis PowerPoint with overview slides and one slide per plot
% Requires Windows + PowerPoint installed (uses COM automation)

    ppt_name = fullfile('..', 'MAST_Cases_T-Test_Results.pptx');
    plots2d_dir = fullfile('2D_Scatter_Plots_v2');
    plots3d_dir = fullfile('3D_Scatter_Plots_v2');

    if ~exist(plots2d_dir,'dir') || ~exist(plots3d_dir,'dir')
        fprintf('Error: Plot directories not found. Run run_pvalue_analysis() first.\n');
        return;
    end

    % Gather images
    imgs2d = sort_nat(list_pngs(plots2d_dir));
    imgs3d = sort_nat(list_pngs(plots3d_dir));

    % Open PowerPoint
    try
        ppt = actxserver('PowerPoint.Application');
    catch ME
        fprintf('Could not start PowerPoint: %s\n', ME.message);
        return;
    end
    ppt.Visible = 1;
    pres = ppt.Presentations.Add;

    % Title slide
    add_title_slide(pres, 'MAST Cases T‑Test Analysis', datestr(now, 'yyyy-mm-dd'));

    % Overview slide - methodology
    overview_text = [ ...
        'What we did:\n\n', ...
        '• Screened all candidate features at each time point using two‑sample t‑tests (p<0.05 = significant).\n', ...
        '• Ranked features by how often they were significant across experiments.\n', ...
        '• Broke ties using lower average and minimum p‑values.\n', ...
        '• Selected the top 20 features for detailed review.\n\n', ...
        'Visualisations:\n', ...
        '• 2D: For each time point and HRS parameter we overlay 5 features per figure (X = parameter value, Y = p‑value).\n', ...
        '• 3D: For each feature and HRS parameter we add a time‑point axis (X = parameter, Y = time point, Z = p‑value) and a p=0.05 reference plane.' ...
    ];
    add_bulleted_slide(pres, 'Analysis summary', overview_text);

    % Overview slide - outputs
    outputs_text = [ ...
        'Deliverables:\n\n', ...
        '• Shortlist: the 20 most informative features.\n', ...
        '• Figures: 64 two‑dimensional plots (per time point × parameter) and 80 three‑dimensional plots (per feature × parameter).\n' ...
    ];
    add_bulleted_slide(pres, 'Deliverables', outputs_text);

    % Optional: list top 20 features
    try
        s = load('best_features_data.mat');
        if isfield(s,'best_20_features')
            best_list = s.best_20_features(:);
            txt = strjoin(cellstr(best_list), '\n');
            add_bulleted_slide(pres, 'Best 20 Features', txt);
        end
    catch
        % ignore
    end

    % Add 2D images
    for i = 1:numel(imgs2d)
        [~, fname, ext] = fileparts(imgs2d{i}); %#ok<ASGLU>
        niceTitle = make_title_2d(fname);
        add_image_slide(pres, niceTitle, fullfile(plots2d_dir, [fname ext]));
    end

    % Add 3D images
    for i = 1:numel(imgs3d)
        [~, fname, ext] = fileparts(imgs3d{i}); %#ok<ASGLU>
        niceTitle = make_title_3d(fname);
        add_image_slide(pres, niceTitle, fullfile(plots3d_dir, [fname ext]));
    end

    % Save
    pres.SaveAs(ppt_name);
    fprintf('PowerPoint saved: %s\n', ppt_name);
    % Leave PowerPoint open for review

end

function files = list_pngs(dirpath)
    d = dir(fullfile(dirpath, '*.png'));
    files = arrayfun(@(x) fullfile(dirpath, x.name), d, 'UniformOutput', false);
end

function out = sort_nat(paths)
    [~, names, exts] = cellfun(@fileparts, paths, 'UniformOutput', false);
    try
        tokens = regexp(names, '(\d+)', 'match');
        nums = cellfun(@(t) sscanf(strjoin(t,''), '%d'), tokens, 'UniformOutput', false);
    catch
        nums = cellfun(@(t) 0, names, 'UniformOutput', false);
    end
    nums = cellfun(@double, nums);
    [~, idx] = sortrows([nums(:) (1:numel(nums)).']); %#ok<NASGU>
    [~, idx] = sort(names); %#ok overwrite simple sort if natural fails
    out = paths(idx);
end

function add_title_slide(pres, titleText, subtitleText)
    layout = get_layout(pres, 1); % Title
    slide = pres.Slides.AddSlide(pres.Slides.Count+1, layout);
    slide.Shapes.Title.TextFrame.TextRange.Text = titleText;
    slide.Shapes.Item(2).TextFrame.TextRange.Text = subtitleText;
end

function add_bulleted_slide(pres, titleText, bodyText)
    layout = get_layout(pres, 2); % Title and Content
    slide = pres.Slides.AddSlide(pres.Slides.Count+1, layout);
    slide.Shapes.Title.TextFrame.TextRange.Text = titleText;
    tr = slide.Shapes.Item(2).TextFrame.TextRange;
    tr.Text = bodyText;
    % Make bulleted if supported; ignore if not available on this Office build
    try
        tr.ParagraphFormat.Bullet.Type = 1; % Unnumbered bullets
    catch
        % leave as plain text with line breaks
    end
end

function add_image_slide(pres, titleText, imagePath)
    layout = get_layout(pres, 12); % Blank
    slide = pres.Slides.AddSlide(pres.Slides.Count+1, layout);
    % Title box
    tb = slide.Shapes.AddTextbox(1, 30, 20, 800, 40); % msoTextOrientationHorizontal
    tb.TextFrame.TextRange.Text = titleText;
    tb.TextFrame.TextRange.Font.Size = 24;
    % Picture
    try
        slide.Shapes.AddPicture(imagePath, 0, 1, 30, 70, 860, 485);
    catch
        % fallback size
        slide.Shapes.AddPicture(imagePath, 0, 1, 50, 100, 800, 450);
    end
end

function layout = get_layout(pres, layoutIndex)
    % Access the SlideMaster custom layout by index, robust to Office versions
    % Common indices: 1=Title, 2=Title and Content, 12=Blank (varies)
    try
        layout = pres.SlideMaster.CustomLayouts.Item(layoutIndex);
    catch
        % Fallback: use first layout available
        layout = pres.SlideMaster.CustomLayouts.Item(1);
    end
end

function titleText = make_title_2d(fname)
    % Expected: Timepoint_Param_Features_a_b
    titleText = ['2D Plot: ' strrep(fname, '_', ' ')];
    tokens = regexp(fname, '^(Confirmatory|12m|24m|36m)_([^_]+)_Features_(\d+)_(\d+)$', 'tokens', 'once');
    if ~isempty(tokens)
        tp = tokens{1}; rawParam = tokens{2}; a = tokens{3}; b = tokens{4};
        titleText = sprintf('%s   %s  |  Features %s–%s', tp, human_param(rawParam), a, b);
    end
end

function titleText = make_title_3d(fname)
    % Expected: Feature_vs_Param_3D
    titleText = ['3D Plot: ' strrep(fname, '_', ' ')];
    tokens = regexp(fname, '^(.+)_vs_([^_]+)_3D$', 'tokens', 'once');
    if ~isempty(tokens)
        feat = strrep(tokens{1}, '_', ' ');
        rawParam = tokens{2};
        titleText = sprintf('%s  vs  %s (3D)', feat, human_param(rawParam));
    end
end

function p = human_param(raw)
    switch raw
        case {'WashOutUpper'}
            p = 'Wash-out upper';
        case {'ADCPZHigh','ADC_PZ_High'}
            p = 'ADC PZ High';
        case {'ADCPZMedium','ADC_PZ_Medium'}
            p = 'ADC PZ Medium';
        case {'ADCPZLow','ADC_PZ_Low'}
            p = 'ADC PZ Low';
        otherwise
            p = strrep(raw, '_', ' ');
    end
end
