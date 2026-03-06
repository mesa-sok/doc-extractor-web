"use client";

import { useState } from "react";
import DOMPurify from "dompurify";
import { useLocale } from "../context/LocaleContext";
import {
  FileTextIcon,
  CheckIcon,
  CopyIcon,
  DownloadIcon,
  AlignLeftIcon,
  LayoutIcon,
  ZapIcon,
} from "./Icons";

type Tab = "raw" | "rich";

interface PreviewCardProps {
  rawText: string;
  richHtml: string;
  isReady: boolean;
}

export default function PreviewCard({ rawText, richHtml, isReady }: PreviewCardProps) {
  const { t } = useLocale();
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
            {t.previewTitle}
          </h2>
          <p style={{ color: "var(--nm-text-secondary)", fontSize: "0.85rem", marginTop: "0.2rem", display: "flex", alignItems: "center", gap: "0.35rem" }}>
            {isReady && <ZapIcon size={12} color="var(--nm-accent)" strokeWidth={0} style={{ fill: "var(--nm-accent)" }} />}
            {isReady
              ? t.wordsExtracted(rawText.split(/\s+/).filter(Boolean).length.toLocaleString())
              : t.previewSubtitle}
          </p>
        </div>

        {/* Actions */}
        {isReady && (
          <div style={{ display: "flex", gap: "0.625rem" }}>
            <button
              className="nm-btn-ghost"
              style={{ padding: "0.55rem 1rem", fontSize: "0.82rem", display: "flex", alignItems: "center", gap: "0.4rem" }}
              onClick={handleCopy}
              aria-label={t.copyAriaLabel}
            >
              {copied ? (
                <>
                  <CheckIcon size={14} color="var(--nm-primary)" strokeWidth={2.5} />
                  {t.copiedButton}
                </>
              ) : (
                <>
                  <CopyIcon size={14} color="currentColor" strokeWidth={2} />
                  {t.copyButton}
                </>
              )}
            </button>

            <button
              className="nm-btn-ghost"
              style={{ padding: "0.55rem 1rem", fontSize: "0.82rem", display: "flex", alignItems: "center", gap: "0.4rem" }}
              onClick={handleDownload}
              aria-label={t.downloadAriaLabel}
            >
              <DownloadIcon size={14} color="currentColor" strokeWidth={2} />
              {t.downloadButton}
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
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
            }}
            onClick={() => setActiveTab(tab)}
          >
            {tab === "raw" ? (
              <>
                <AlignLeftIcon size={13} color="currentColor" strokeWidth={2} />
                {t.tabRaw}
              </>
            ) : (
              <>
                <LayoutIcon size={13} color="currentColor" strokeWidth={2} />
                {t.tabRich}
              </>
            )}
          </button>
        ))}
      </div>

      {/* Content panel */}
      <div
        id={`panel-${activeTab}`}
        role="tabpanel"
        aria-label={activeTab === "raw" ? t.rawPanelLabel : t.richPanelLabel}
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
              gap: "1.25rem",
            }}
          >
            {/* Stack of overlapping icons to suggest document layers */}
            <div style={{ position: "relative", width: "64px", height: "72px" }}>
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: "50%",
                  transform: "translateX(-50%) rotate(-6deg)",
                  opacity: 0.3,
                }}
              >
                <FileTextIcon size={52} color="var(--nm-text-muted)" strokeWidth={1} />
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: "50%",
                  transform: "translateX(-50%) rotate(3deg)",
                  opacity: 0.55,
                }}
              >
                <FileTextIcon size={52} color="var(--nm-text-muted)" strokeWidth={1} />
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              >
                <FileTextIcon size={52} color="var(--nm-text-muted)" strokeWidth={1} />
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <p style={{ color: "var(--nm-text-secondary)", fontWeight: 500, fontSize: "0.95rem" }}>
                {t.emptyStateTitle}
              </p>
              <p style={{ color: "var(--nm-text-muted)", fontSize: "0.82rem", marginTop: "0.3rem" }}>
                {t.emptyStateSub}
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
