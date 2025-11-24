# Developers Documentation Structure

This folder contains the developer documentation topics. Each topic can have HTML files and video files.

## Folder Structure

```
public/developers-docs/
├── topic-name/
│   ├── index.html          (Main documentation file)
│   ├── section1.html       (Additional HTML files)
│   ├── video1.mp4          (Video files)
│   └── video2.mp4
├── another-topic/
│   ├── intro.html
│   └── tutorial.mp4
└── ...
```

## How to Add Topics

1. Create a folder for your topic in `public/developers-docs/`
2. Add HTML files with your documentation content
3. Add video files (MP4 format recommended)
4. Update the `topics` array in `app/documentation/developers/page.tsx`

## Example Topic Configuration

```typescript
{
  id: "my-topic",
  title: "My Topic",
  htmlFiles: [
    "/developers-docs/my-topic/index.html",
    "/developers-docs/my-topic/advanced.html"
  ],
  videos: [
    { name: "Introduction Video", path: "/developers-docs/my-topic/intro.mp4" }
  ],
  subtopics: [
    {
      id: "subtopic",
      title: "Subtopic",
      htmlFiles: ["/developers-docs/my-topic/subtopic.html"]
    }
  ]
}
```

## HTML File Guidelines

- Use standard HTML5
- Styles will be inherited from the documentation viewer
- Use semantic HTML elements
- Code blocks should use `<pre><code>` tags
- Images should use relative paths or absolute paths from `/public`

## Video Guidelines

- Recommended format: MP4 (H.264 codec)
- Keep file sizes reasonable for web delivery
- Use descriptive names for videos
- Videos will be displayed with HTML5 video player controls

