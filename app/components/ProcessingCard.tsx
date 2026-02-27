"use client";

type ProcessingStatus = "idle" | "processing" | "done" | "error";

interface ProcessingCardProps {
  status: ProcessingStatus;
  progress: number;
  pagesProcessed: number;
  totalPages: number;
}

function SkeletonLine({ width = "100%", height = "0.75rem" }: { width?: string; height?: string }) {
  return (
    <div
      className="nm-skeleton"
      style={{ width, height, marginBottom: "0.5rem" }}
      aria-hidden="true"
    />
  );
}

function SkeletonBlock() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <SkeletonLine width="90%" height="0.7rem" />
      <SkeletonLine width="75%" height="0.7rem" />
      <SkeletonLine width="85%" height="0.7rem" />
      <SkeletonLine width="60%" height="0.7rem" />
    </div>
  );
}

export default function ProcessingCard({
  status,
  progress,
  pagesProcessed,
  totalPages,
}: ProcessingCardProps) {
  const isIdle = status === "idle";
  const isProcessing = status === "processing";
  const isDone = status === "done";
  const isError = status === "error";

  return (
    <div className="nm-flat p-8 flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 style={{ color: "var(--nm-text)", fontWeight: 700, fontSize: "1.125rem", letterSpacing: "-0.01em" }}>
            Processing
          </h2>
          <p style={{ color: "var(--nm-text-secondary)", fontSize: "0.85rem", marginTop: "0.2rem" }}>
            {isIdle && "Waiting for upload…"}
            {isProcessing && "Extracting text from pages…"}
            {isDone && "Extraction complete"}
            {isError && "An error occurred"}
          </p>
        </div>

        {/* Status badge */}
        {isProcessing && (
          <div className="nm-badge nm-badge-gold">
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "var(--nm-accent)",
                display: "inline-block",
                animation: "pulse-dot 1.2s ease-in-out infinite",
              }}
            />
            Live
          </div>
        )}
        {isDone && (
          <div className="nm-badge" style={{ color: "var(--nm-primary)" }}>
            ✓ Done
          </div>
        )}
        {isError && (
          <div className="nm-badge" style={{ color: "#c0392b", borderColor: "rgba(192,57,43,0.3)", background: "rgba(192,57,43,0.08)" }}>
            ✕ Error
          </div>
        )}
      </div>

      {/* Progress Section */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {/* Progress bar track */}
        <div className="nm-progress-track" style={{ height: "12px" }}>
          <div
            className={isProcessing || isDone ? "nm-progress-fill" : ""}
            style={{
              height: "100%",
              width: `${isIdle ? 0 : progress}%`,
              background:
                isIdle
                  ? "transparent"
                  : isError
                  ? "linear-gradient(90deg,#c0392b,#e74c3c)"
                  : undefined,
              transition: "width 0.4s cubic-bezier(0.4,0,0.2,1)",
              borderRadius: "999px",
              boxShadow: isProcessing || isDone
                ? "0 0 10px rgba(42, 122, 80, 0.4)"
                : isError
                ? "0 0 8px rgba(192,57,43,0.3)"
                : "none",
            }}
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Processing progress: ${progress}%`}
          />
        </div>

        {/* Stats row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ color: "var(--nm-text-muted)", fontSize: "0.8rem" }}>
            {isIdle ? "—" : `${progress.toFixed(0)}% complete`}
          </span>
          {(isProcessing || isDone) && totalPages > 0 && (
            <span style={{ color: "var(--nm-text-secondary)", fontSize: "0.8rem", fontWeight: 500 }}>
              <span style={{ color: "var(--nm-primary)", fontWeight: 700 }}>{pagesProcessed}</span>
              {" / "}
              <span>{totalPages}</span>
              {" pages"}
            </span>
          )}
        </div>
      </div>

      {/* Pages grid – neumorphic indicators */}
      {(isProcessing || isDone) && totalPages > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(auto-fill, minmax(28px, 1fr))`,
            gap: "6px",
          }}
          aria-label="Page processing status"
        >
          {Array.from({ length: Math.min(totalPages, 30) }).map((_, i) => {
            const processed = i < pagesProcessed;
            return (
              <div
                key={i}
                title={`Page ${i + 1}${processed ? " – done" : ""}`}
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "6px",
                  background: processed
                    ? "linear-gradient(135deg, var(--nm-primary), #3da870)"
                    : "var(--nm-bg)",
                  boxShadow: processed
                    ? "2px 2px 5px rgba(0,0,0,0.15), -1px -1px 3px rgba(255,255,255,0.5)"
                    : "inset 2px 2px 5px var(--nm-shadow-dark), inset -2px -2px 5px var(--nm-shadow-light)",
                  transition: "background 0.3s ease, box-shadow 0.3s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.55rem",
                  fontWeight: 700,
                  color: processed ? "rgba(255,255,255,0.9)" : "var(--nm-text-muted)",
                }}
              >
                {i + 1}
              </div>
            );
          })}
          {totalPages > 30 && (
            <div
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "6px",
                background: "var(--nm-bg)",
                boxShadow: "inset 2px 2px 5px var(--nm-shadow-dark), inset -2px -2px 5px var(--nm-shadow-light)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.55rem",
                color: "var(--nm-text-muted)",
              }}
            >
              +{totalPages - 30}
            </div>
          )}
        </div>
      )}

      {/* Skeleton Loader – shown while processing content is loading */}
      {isProcessing && (
        <div
          className="nm-pressed"
          style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "1rem" }}
          aria-label="Processing content preview"
        >
          <SkeletonBlock />
          <SkeletonBlock />
        </div>
      )}

      {/* Idle placeholder */}
      {isIdle && (
        <div
          className="nm-pressed"
          style={{
            padding: "1.5rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.75rem",
            minHeight: "120px",
          }}
        >
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--nm-text-muted)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <p style={{ color: "var(--nm-text-muted)", fontSize: "0.85rem", textAlign: "center" }}>
            Upload a PDF to begin extraction
          </p>
        </div>
      )}

      {/* Error state */}
      {isError && (
        <div
          className="nm-pressed"
          style={{
            padding: "1.25rem",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            borderLeft: "3px solid #c0392b",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c0392b" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <p style={{ color: "#c0392b", fontSize: "0.85rem" }}>
            Failed to process document. Please try again.
          </p>
        </div>
      )}
    </div>
  );
}
