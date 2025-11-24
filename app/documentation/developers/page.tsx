"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { 
  FileText, 
  Video, 
  ChevronRight, 
  ChevronDown, 
  LogOut,
  Lock,
  Folder,
  Play,
  Menu,
  X
} from "lucide-react";
import { isAuthenticated, logout } from "@/lib/auth";
import "./developers.css";

// Topic structure
interface Topic {
  id: string;
  title: string;
  htmlFiles?: string[];
  videos?: Array<{
    name: string;
    path: string;
  }>;
  subtopics?: Topic[];
}

// Selected content type
type SelectedContent = 
  | { type: "html"; file: string; topicTitle: string }
  | { type: "video"; video: { name: string; path: string }; topicTitle: string }
  | null;

// Topics structure - All topics from Developers Documentation folder
const topics: Topic[] = [
  {
    id: "getting-started",
    title: "Getting Started",
    htmlFiles: ["/developers-docs/getting-started/intro.html"],
  },
  {
    id: "medical-imaging-solutions-website",
    title: "Medical Imaging Solutions Website",
    htmlFiles: ["/developers-docs/Medical Imaging Solutions Website/DEVELOPER_DOCUMENTATION.html"],
  },
  {
    id: "radview",
    title: "RadView",
    htmlFiles: [
      "/developers-docs/RadView/Developer_Documentation.html",
      "/developers-docs/RadView/AI_Models_Developer_Documentation.html"
    ],
    videos: [
      { name: "RadView Desktop & Cloud", path: "/developers-docs/RadView/RadView_Desktop_Cloud.mp4" }
    ],
  },
  {
    id: "hrs",
    title: "HRS",
    htmlFiles: ["/developers-docs/HRS/HRS_Developer_Documentation.html"],
    videos: [
      { name: "HRS Desktop & Cloud - Part 1", path: "/developers-docs/HRS/HRS_Desktop_Cloud_Part1.mp4" },
      { name: "HRS Desktop & Cloud - Part 2", path: "/developers-docs/HRS/HRS_Desktop_Cloud_part2.mp4" }
    ],
  },
  {
    id: "mim",
    title: "MIM",
    videos: [
      { name: "Download from MIM and HRS Processing", path: "/developers-docs/MIM/Download from MIM and HRS processing.mp4" }
    ],
  },
  {
    id: "mast-cases-t-test",
    title: "MAST Cases T-test Experiments",
    htmlFiles: [
      "/developers-docs/MAST Cases T-test Experiments/Quick_Start_Guide.html",
      "/developers-docs/MAST Cases T-test Experiments/MAST_Cases_T-Test_Experiments_Guide.html"
    ],
    videos: [
      { name: "MAST Cases T-test Experiments", path: "/developers-docs/MAST Cases T-test Experiments/MAST_Cases_T-Test_Experiments.mp4" }
    ]
  }
];

export default function DevelopersDocumentationPage() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [expandedTopics, setExpandedTopics] = useState<Set<string>>(new Set());
  const [selectedContent, setSelectedContent] = useState<SelectedContent>(null);
  const [htmlContent, setHtmlContent] = useState<string>("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check authentication
    if (!isAuthenticated()) {
      router.push("/documentation/developers/login");
      return;
    }
    setAuthenticated(true);
  }, [router]);

  useEffect(() => {
    // Scroll to top when content changes
    if (selectedContent && contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [selectedContent]);

  const handleLogout = () => {
    logout();
    router.push("/documentation/developers/login");
  };

  const toggleTopic = (topicId: string) => {
    const newExpanded = new Set(expandedTopics);
    if (newExpanded.has(topicId)) {
      newExpanded.delete(topicId);
    } else {
      newExpanded.add(topicId);
    }
    setExpandedTopics(newExpanded);
  };

  const loadHtmlFile = async (file: string, topicTitle: string) => {
    try {
      const response = await fetch(file);
      if (response.ok) {
        const content = await response.text();
        setHtmlContent(content);
        setSelectedContent({ type: "html", file, topicTitle });
        setSidebarOpen(false); // Close sidebar on mobile after selection
      } else {
        setHtmlContent(`<p>Content file not found: ${file}</p>`);
        setSelectedContent({ type: "html", file, topicTitle });
        setSidebarOpen(false);
      }
    } catch (error) {
      setHtmlContent(`<p>Error loading content: ${file}</p>`);
      setSelectedContent({ type: "html", file, topicTitle });
      setSidebarOpen(false);
    }
  };

  const loadVideo = (video: { name: string; path: string }, topicTitle: string) => {
    setHtmlContent(""); // Clear HTML content when loading video
    setSelectedContent({ type: "video", video, topicTitle });
    setSidebarOpen(false); // Close sidebar on mobile after selection
  };

  const renderTopic = (topic: Topic, level: number = 0) => {
    const hasContent = (topic.htmlFiles && topic.htmlFiles.length > 0) || 
                      (topic.videos && topic.videos.length > 0) ||
                      (topic.subtopics && topic.subtopics.length > 0);
    const isExpanded = expandedTopics.has(topic.id);
    const hasSubtopic = topic.subtopics && topic.subtopics.length > 0;

    return (
      <div key={topic.id} className="dev-topic-item">
        <div
          className="dev-topic-header"
          style={{ paddingLeft: `${level * 1.5}rem` }}
          onClick={() => {
            if (hasContent) {
              toggleTopic(topic.id);
            }
          }}
        >
          <div className="dev-topic-header-left">
            {hasContent ? (
              <button
                className="dev-topic-toggle"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleTopic(topic.id);
                }}
              >
                {isExpanded ? (
                  <ChevronDown size={18} />
                ) : (
                  <ChevronRight size={18} />
                )}
              </button>
            ) : (
              <div className="dev-topic-toggle-placeholder" />
            )}
            <Folder size={18} className="dev-topic-icon" />
            <span className="dev-topic-title">{topic.title}</span>
          </div>
          <div className="dev-topic-badges">
            {topic.htmlFiles && topic.htmlFiles.length > 0 && (
              <span className="dev-topic-badge">
                <FileText size={14} />
                {topic.htmlFiles.length}
              </span>
            )}
            {topic.videos && topic.videos.length > 0 && (
              <span className="dev-topic-badge">
                <Video size={14} />
                {topic.videos.length}
              </span>
            )}
          </div>
        </div>
        
        {/* Expanded content list */}
        {isExpanded && hasContent && (
          <div className="dev-topic-content-list" style={{ paddingLeft: `${(level + 1) * 1.5}rem` }}>
            {/* HTML Files */}
            {topic.htmlFiles && topic.htmlFiles.map((file, index) => {
              const fileName = file.split("/").pop() || file;
              const isSelected = selectedContent?.type === "html" && selectedContent.file === file;
              return (
                <div
                  key={`html-${index}`}
                  className={`dev-content-item ${isSelected ? "selected" : ""}`}
                  onClick={() => loadHtmlFile(file, topic.title)}
                >
                  <FileText size={16} className="dev-content-icon" />
                  <span className="dev-content-name">{fileName}</span>
                </div>
              );
            })}
            
            {/* Videos */}
            {topic.videos && topic.videos.map((video, index) => {
              const isSelected = selectedContent?.type === "video" && selectedContent.video.path === video.path;
              return (
                <div
                  key={`video-${index}`}
                  className={`dev-content-item ${isSelected ? "selected" : ""}`}
                  onClick={() => loadVideo(video, topic.title)}
                >
                  <Video size={16} className="dev-content-icon" />
                  <span className="dev-content-name">{video.name}</span>
                </div>
              );
            })}
            
            {/* Subtopics */}
            {hasSubtopic && topic.subtopics!.map((subtopic) => renderTopic(subtopic, level + 1))}
          </div>
        )}
      </div>
    );
  };

  if (!authenticated) {
    return null; // Will redirect
  }

  return (
    <div className="dev-docs-container">
      {/* Header */}
      <div className="dev-docs-header">
        <div className="dev-docs-header-content">
          <div>
            <h1 className="dev-docs-title">
              <Lock size={24} />
              Developer Documentation
            </h1>
            <p className="dev-docs-subtitle">
              Technical documentation and guides for developers
            </p>
          </div>
          <button onClick={handleLogout} className="dev-docs-logout">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>

      <div className="dev-docs-layout">
        {/* Mobile Sidebar Toggle */}
        <button 
          className="dev-docs-sidebar-toggle"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle sidebar"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Sidebar Overlay for Mobile */}
        {sidebarOpen && (
          <div 
            className="dev-docs-sidebar-overlay"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar - Topics */}
        <aside className={`dev-docs-sidebar ${sidebarOpen ? "open" : ""}`}>
          <div className="dev-docs-sidebar-header">
            <h2 className="dev-docs-sidebar-title">Topics</h2>
            <button 
              className="dev-docs-sidebar-close"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close sidebar"
            >
              <X size={20} />
            </button>
          </div>
          <div className="dev-docs-topics">
            {topics.map((topic) => renderTopic(topic))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="dev-docs-content" ref={contentRef}>
          {selectedContent ? (
            <div className="dev-docs-viewer">
              <div className="dev-docs-viewer-header">
                <h2 className="dev-docs-viewer-title">{selectedContent.topicTitle}</h2>
                {selectedContent.type === "video" && (
                  <h3 className="dev-docs-viewer-subtitle">{selectedContent.video.name}</h3>
                )}
              </div>

              {/* HTML Content */}
              {selectedContent.type === "html" && htmlContent && (
                <div className="dev-docs-html-content">
                  <div
                    dangerouslySetInnerHTML={{ __html: htmlContent }}
                    className="dev-docs-html-wrapper"
                  />
                </div>
              )}

              {/* Video Content */}
              {selectedContent.type === "video" && (
                <div className="dev-docs-video-viewer">
                  <video
                    key={selectedContent.video.path} // Force re-render when video changes
                    controls
                    className="dev-docs-video-player-full"
                    preload="metadata"
                  >
                    <source src={selectedContent.video.path} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}
            </div>
          ) : (
            <div className="dev-docs-empty">
              <FileText size={48} className="dev-docs-empty-icon" />
              <h3 className="dev-docs-empty-title">Select Content</h3>
              <p className="dev-docs-empty-text">
                Expand a topic from the sidebar and click on a document or video to view it
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
