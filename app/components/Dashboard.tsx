"use client";

import { useCallback, useState } from "react";
import UploadCard from "./UploadCard";
import ProcessingCard from "./ProcessingCard";
import PreviewCard from "./PreviewCard";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLocale } from "../context/LocaleContext";

type Status = "idle" | "processing" | "done" | "error";

const DEMO_TEXT = `Document Title: Annual Report 2024

Executive Summary

This document provides a comprehensive overview of the organization's performance
during the fiscal year 2024. Key highlights include record revenue growth, expanded
market presence, and significant investment in research and development.

Financial Performance

Total revenue for FY2024 reached $4.2 billion, representing a 23% increase over the
prior year. Operating margins improved to 18.5%, driven by efficiency initiatives and
favorable pricing conditions across core business segments.

Key Metrics
- Revenue: $4.2B (+23% YoY)
- Operating Income: $777M (+31% YoY)
- Net Income: $542M (+28% YoY)
- Earnings Per Share: $3.84 (+26% YoY)

Strategic Initiatives

The organization successfully launched three major product lines, entered two new
geographic markets, and completed the integration of the XYZ Corporation acquisition.
These initiatives position the company for continued growth in 2025 and beyond.

Outlook

Looking ahead, the company anticipates continued strong demand driven by macroeconomic
tailwinds and product innovation. Guidance for FY2025 projects revenue between $5.0B
and $5.3B, with operating margins expected to expand by 50–100 basis points.`;

const DEMO_HTML = `
<h1>Document Title: Annual Report 2024</h1>
<h2>Executive Summary</h2>
<p>This document provides a comprehensive overview of the organization's performance during the fiscal year 2024. Key highlights include <strong>record revenue growth</strong>, expanded market presence, and significant investment in research and development.</p>
<h2>Financial Performance</h2>
<p>Total revenue for FY2024 reached <strong>$4.2 billion</strong>, representing a <strong>23% increase</strong> over the prior year. Operating margins improved to <strong>18.5%</strong>, driven by efficiency initiatives and favorable pricing conditions across core business segments.</p>
<h3>Key Metrics</h3>
<ul>
  <li>Revenue: <strong>$4.2B</strong> (+23% YoY)</li>
  <li>Operating Income: <strong>$777M</strong> (+31% YoY)</li>
  <li>Net Income: <strong>$542M</strong> (+28% YoY)</li>
  <li>Earnings Per Share: <strong>$3.84</strong> (+26% YoY)</li>
</ul>
<h2>Strategic Initiatives</h2>
<p>The organization successfully launched three major product lines, entered two new geographic markets, and completed the integration of the <em>XYZ Corporation</em> acquisition. These initiatives position the company for continued growth in 2025 and beyond.</p>
<h2>Outlook</h2>
<blockquote>Looking ahead, the company anticipates continued strong demand driven by macroeconomic tailwinds and product innovation.</blockquote>
<p>Guidance for FY2025 projects revenue between <strong>$5.0B and $5.3B</strong>, with operating margins expected to expand by 50–100 basis points.</p>
<hr />
<p><em>This report was automatically extracted and formatted by PDF Extractor.</em></p>
`;

const TOTAL_PAGES = 12;

export default function Dashboard() {
  const { t } = useLocale();
  const [status, setStatus] = useState<Status>("idle");
  const [progress, setProgress] = useState(0);
  const [pagesProcessed, setPagesProcessed] = useState(0);
  const [rawText, setRawText] = useState("");
  const [richHtml, setRichHtml] = useState("");

  const simulateExtraction = useCallback(() => {
    setStatus("processing");
    setProgress(0);
    setPagesProcessed(0);
    setRawText("");
    setRichHtml("");

    const pageInterval = setInterval(() => {
      setPagesProcessed((prev) => {
        const next = prev + 1;
        setProgress((next / TOTAL_PAGES) * 100);
        if (next >= TOTAL_PAGES) {
          clearInterval(pageInterval);
          setTimeout(() => {
            setStatus("done");
            setRawText(DEMO_TEXT);
            setRichHtml(DEMO_HTML);
          }, 400);
        }
        return next;
      });
    }, 300);
  }, []);

  const handleFileSelected = useCallback(
    (_file: File) => {
      if (status !== "processing") {
        simulateExtraction();
      }
    },
    [status, simulateExtraction]
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--nm-bg)",
        padding: "2rem 1.5rem 4rem",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* ── Header ────────────────────────────────────────── */}
        <header style={{ marginBottom: "2.75rem", textAlign: "center" }}>
          {/* Language switcher – top right */}
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1rem" }}>
            <LanguageSwitcher />
          </div>

          {/* Logo mark */}
          <div
            className="nm-flat"
            style={{
              width: "64px",
              height: "64px",
              margin: "0 auto 1.25rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(145deg, #2d8556, #226543)",
              boxShadow:
                "6px 6px 14px var(--nm-shadow-dark), -6px -6px 14px var(--nm-shadow-light)",
            }}
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
          </div>

          <h1
            style={{
              fontSize: "2rem",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "var(--nm-text)",
              marginBottom: "0.5rem",
            }}
          >
            {t.pageTitle}{" "}
            <span style={{ color: "var(--nm-primary)" }}>{t.pageTitleHighlight}</span>
          </h1>
          <p
            style={{
              color: "var(--nm-text-secondary)",
              fontSize: "1rem",
              maxWidth: "380px",
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            {t.pageSubtitle}
          </p>

          {/* Accent bar */}
          <div
            style={{
              width: "48px",
              height: "3px",
              background: "linear-gradient(90deg, var(--nm-primary), var(--nm-accent-light))",
              borderRadius: "2px",
              margin: "1.25rem auto 0",
            }}
          />
        </header>

        {/* ── Cards Grid ───────────────────────────────────── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "1.75rem",
            marginBottom: "1.75rem",
            alignItems: "start",
          }}
        >
          <UploadCard
            onFileSelected={handleFileSelected}
            disabled={status === "processing"}
          />
          <ProcessingCard
            status={status}
            progress={progress}
            pagesProcessed={pagesProcessed}
            totalPages={TOTAL_PAGES}
          />
        </div>

        {/* Preview – full width */}
        <PreviewCard
          rawText={rawText}
          richHtml={richHtml}
          isReady={status === "done"}
        />

        {/* Footer */}
        <footer
          style={{
            marginTop: "3rem",
            textAlign: "center",
            color: "var(--nm-text-muted)",
            fontSize: "0.78rem",
          }}
        >
          {t.footer}
        </footer>
      </div>
    </div>
  );
}
