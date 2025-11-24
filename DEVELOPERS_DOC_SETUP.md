# Developers Documentation Setup Guide

## Overview

The Developers Documentation section is a password-protected area accessible from the Documentation dropdown menu. It allows you to organize and display technical documentation with HTML files and videos.

## Default Login Credentials

- **Username**: `developer`
- **Password**: `dev2025`

**To change the password**, edit `lib/auth.ts`:
```typescript
export const DEV_CREDENTIALS = {
  username: "developer",
  password: "your-new-password", // Change this
};
```

## Adding Documentation Topics

### Step 1: Create Folder Structure

Create a folder in `public/developers-docs/` for each topic:

```
public/developers-docs/
├── getting-started/
│   ├── intro.html
│   └── setup.mp4 (optional video)
├── architecture/
│   ├── overview.html
│   └── frontend/
│       └── structure.html
└── api-reference/
    ├── endpoints.html
    └── overview.mp4
```

### Step 2: Add HTML Files

Create HTML files with your documentation content. Example:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>My Topic</title>
</head>
<body>
    <h1>Topic Title</h1>
    <p>Your content here...</p>
    <h2>Code Example</h2>
    <pre><code>const example = "code";</code></pre>
</body>
</html>
```

### Step 3: Add Videos (Optional)

Place video files (MP4 recommended) in the topic folder:
- `public/developers-docs/topic-name/video.mp4`

### Step 4: Update Topics Configuration

Edit `app/documentation/developers/page.tsx` and add your topic to the `topics` array:

```typescript
const topics: Topic[] = [
  {
    id: "getting-started",
    title: "Getting Started",
    htmlFiles: ["/developers-docs/getting-started/intro.html"],
    videos: [
      { name: "Setup Guide", path: "/developers-docs/getting-started/setup.mp4" }
    ]
  },
  {
    id: "my-new-topic",
    title: "My New Topic",
    htmlFiles: [
      "/developers-docs/my-new-topic/intro.html",
      "/developers-docs/my-new-topic/advanced.html"
    ],
    videos: [
      { name: "Tutorial Video", path: "/developers-docs/my-new-topic/tutorial.mp4" }
    ],
    subtopics: [
      {
        id: "subtopic",
        title: "Subtopic",
        htmlFiles: ["/developers-docs/my-new-topic/subtopic/file.html"]
      }
    ]
  }
];
```

## Features

### HTML Content Display
- HTML files are loaded and displayed in the main content area
- Supports multiple HTML files per topic
- Click on different HTML files to switch content
- Styled automatically with the documentation viewer styles

### Video Support
- Videos are displayed with HTML5 video player
- Supports multiple videos per topic
- Each video has a name/label
- Videos are loaded from the `public/developers-docs/` folder

### Hierarchical Topics
- Support for subtopics (nested topics)
- Expandable/collapsible topic tree
- Visual indicators for topics with content

### Authentication
- Simple client-side authentication
- Session-based (cleared on browser close)
- Single hardcoded account (no backend required)
- Automatic redirect to login if not authenticated

## File Paths

All file paths are relative to the `public` folder:

- HTML files: `/developers-docs/topic-name/file.html`
- Videos: `/developers-docs/topic-name/video.mp4`

## Styling

HTML content is automatically styled with:
- Custom CSS variables from the theme
- Responsive design
- Code block styling
- Proper typography

You can use standard HTML elements in your documentation files.

## Security Notes

⚠️ **Important**: This is a client-side only authentication system. It's suitable for:
- Internal developer documentation
- Basic access control
- Non-sensitive information

**Not suitable for**:
- Production systems with sensitive data
- Public-facing applications
- Compliance requirements (HIPAA, etc.)

For production use, implement proper backend authentication.

## Troubleshooting

### Content Not Loading
- Check file paths are correct (relative to `public/` folder)
- Verify files exist in the correct location
- Check browser console for errors
- Ensure file paths start with `/developers-docs/`

### Videos Not Playing
- Verify video format is MP4 (H.264 codec recommended)
- Check file paths are correct
- Ensure videos are in the `public/developers-docs/` folder
- Check browser console for errors

### Login Not Working
- Clear browser session storage
- Check credentials in `lib/auth.ts`
- Verify you're using the correct username/password
- Check browser console for errors

## Example Topic Structure

```
public/developers-docs/
└── getting-started/
    ├── intro.html              # Main documentation
    ├── installation.html       # Additional HTML file
    ├── setup.mp4               # Video tutorial
    └── advanced/
        └── configuration.html  # Subtopic HTML file
```

Corresponding configuration:

```typescript
{
  id: "getting-started",
  title: "Getting Started",
  htmlFiles: [
    "/developers-docs/getting-started/intro.html",
    "/developers-docs/getting-started/installation.html"
  ],
  videos: [
    { name: "Setup Tutorial", path: "/developers-docs/getting-started/setup.mp4" }
  ],
  subtopics: [
    {
      id: "advanced",
      title: "Advanced Configuration",
      htmlFiles: ["/developers-docs/getting-started/advanced/configuration.html"]
    }
  ]
}
```

## Next Steps

1. Change the default password in `lib/auth.ts`
2. Create your topic folders in `public/developers-docs/`
3. Add HTML files and videos
4. Update the `topics` array in `app/documentation/developers/page.tsx`
5. Test the login and content display
6. Share credentials with your development team

