"use client";

import { useState } from "react";
import DOMPurify from "dompurify";

type Tab = "raw" | "rich";

interface PreviewCardProps {
  rawText: string;
  richHtml: string;
  isReady: boolean;
}

export default function PreviewCard({ rawText, richHtml, isReady }: PreviewCardProps) {
  const [activeTab, setActiveTab] = useState<Tab>("raw");
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!rawText) return;
    await navigator.clipboard.writeText(rawText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!rawText) return;
    const blob = new Blob([rawText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "extracted-text.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="nm-flat p-8 flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 style={{ color: "var(--nm-text)", fontWeight: 700, fontSize: "1.125rem", letterSpacing: "-0.01em" }}>
            Extracted Content
          </h2>
          <p style={{ color: "var(--nm-text-secondary)", fontSize: "0.85rem", marginTop: "0.2rem" }}>
            {isReady
              ? `${rawText.split(/\s+/).filter(Boolean).length.toLocaleString()} words extracted`
              : "Preview will appear after extraction"}
          </p>
        </div>

        {/* Actions */}
        {isReady && (
          <div style={{ display: "flex", gap: "0.625rem" }}>
            <button
              className="nm-btn-ghost"
              style={{ padding: "0.55rem 1rem", fontSize: "0.82rem", display: "flex", alignItems: "center", gap: "0.4rem" }}
              onClick={handleCopy}
              aria-label="Copy extracted text to clipboard"
            >
              {copied ? (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--nm-primary)" strokeWidth="2.5" strokeLinecap="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                  Copy
                </>
              )}
            </button>

            <button
              className="nm-btn-ghost"
              style={{ padding: "0.55rem 1rem", fontSize: "0.82rem", display: "flex", alignItems: "center", gap: "0.4rem" }}
              onClick={handleDownload}
              aria-label="Download extracted text as .txt file"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download
            </button>
          </div>
        )}
      </div>

      {/* Tab switcher */}
      <div
        className="nm-flat-sm"
        style={{ display: "inline-flex", padding: "4px", gap: "4px", alignSelf: "flex-start" }}
        role="tablist"
        aria-label="Preview format"
      >
        {(["raw", "rich"] as Tab[]).map((tab) => (
          <button
            key={tab}
            role="tab"
            aria-selected={activeTab === tab}
            aria-controls={`panel-${tab}`}
            className={activeTab === tab ? "nm-tab-active" : "nm-btn-ghost"}
            style={{
              padding: "0.45rem 1.1rem",
              fontSize: "0.82rem",
              fontWeight: 500,
              borderRadius: "var(--nm-radius-sm)",
              transition: "all 0.18s ease",
            }}
            onClick={() => setActiveTab(tab)}
          >
            {tab === "raw" ? "Raw Text" : "Rich Preview"}
          </button>
        ))}
      </div>

      {/* Content panel */}
      <div
        id={`panel-${activeTab}`}
        role="tabpanel"
        aria-label={activeTab === "raw" ? "Raw text output" : "Rich formatted preview"}
      >
        {!isReady ? (
          /* Empty state */
          <div
            className="nm-pressed"
            style={{
              minHeight: "280px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
            }}
          >
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--nm-text-muted)"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            <div style={{ textAlign: "center" }}>
              <p style={{ color: "var(--nm-text-secondary)", fontWeight: 500, fontSize: "0.95rem" }}>
                No content yet
              </p>
              <p style={{ color: "var(--nm-text-muted)", fontSize: "0.82rem", marginTop: "0.3rem" }}>
                Upload and extract a PDF to see the output here
              </p>
            </div>
          </div>
        ) : activeTab === "raw" ? (
          /* Raw Text */
          <div className="nm-pressed nm-scroll" style={{ maxHeight: "400px", overflowY: "auto" }}>
            <pre
              style={{
                fontFamily: "ui-monospace, 'SF Mono', 'Cascadia Code', Consolas, monospace",
                fontSize: "0.82rem",
                lineHeight: "1.7",
                color: "var(--nm-text)",
                padding: "1.25rem",
                margin: 0,
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
              }}
            >
              {rawText}
            </pre>
          </div>
        ) : (
          /* Rich Preview */
          <div
            className="nm-pressed nm-scroll"
            style={{ maxHeight: "400px", overflowY: "auto", padding: "1.5rem" }}
          >
            <div
              className="rich-content"
              style={{
                color: "var(--nm-text)",
                fontSize: "0.9rem",
                lineHeight: "1.8",
              }}
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(richHtml) }}
            />
          </div>
        )}
      </div>

      {/* Rich content typography is defined in globals.css */}
    </div>
  );
}
