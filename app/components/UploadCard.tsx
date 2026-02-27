"use client";

import { useCallback, useRef, useState } from "react";

interface UploadCardProps {
  onFileSelected: (file: File) => void;
  disabled?: boolean;
}

export default function UploadCard({ onFileSelected, disabled }: UploadCardProps) {
  const [dragOver, setDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    (file: File) => {
      if (file.type !== "application/pdf") {
        setFileError("Only PDF files are supported. Please choose a .pdf file.");
        return;
      }
      setFileError(null);
      setSelectedFile(file);
      onFileSelected(file);
    },
    [onFileSelected]
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const formatBytes = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="nm-flat p-8 flex flex-col gap-6">
      {/* Card Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 style={{ color: "var(--nm-text)", fontWeight: 700, fontSize: "1.125rem", letterSpacing: "-0.01em" }}>
            Upload Document
          </h2>
          <p style={{ color: "var(--nm-text-secondary)", fontSize: "0.85rem", marginTop: "0.2rem" }}>
            PDF files only · Max 50 MB
          </p>
        </div>
        <div className="nm-badge">
          <svg width="10" height="10" viewBox="0 0 12 12" fill="currentColor">
            <path d="M6 1L7.5 4.5H11L8.25 6.75L9.25 10.5L6 8.25L2.75 10.5L3.75 6.75L1 4.5H4.5L6 1Z" />
          </svg>
          PDF
        </div>
      </div>

      {/* Drop Zone */}
      <div
        className={`nm-dropzone flex flex-col items-center justify-center gap-4 cursor-pointer select-none${dragOver ? " drag-over" : ""}`}
        style={{ minHeight: "200px", padding: "2rem" }}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        onClick={() => !disabled && inputRef.current?.click()}
        role="button"
        tabIndex={0}
        aria-label="Upload PDF – drag and drop or click to browse"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            if (!disabled) inputRef.current?.click();
          }
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          className="sr-only"
          onChange={onInputChange}
          disabled={disabled}
          aria-hidden="true"
        />

        {/* Icon */}
        <div
          className="nm-flat-sm flex items-center justify-center"
          style={{
            width: "64px",
            height: "64px",
            color: dragOver ? "var(--nm-primary)" : "var(--nm-text-muted)",
            transition: "color 0.2s ease",
          }}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
        </div>

        {selectedFile ? (
          <div className="text-center">
            <p style={{ color: "var(--nm-primary)", fontWeight: 600, fontSize: "0.95rem" }}>
              {selectedFile.name}
            </p>
            <p style={{ color: "var(--nm-text-muted)", fontSize: "0.8rem", marginTop: "0.2rem" }}>
              {formatBytes(selectedFile.size)}
            </p>
          </div>
        ) : (
          <div className="text-center">
            <p style={{ color: "var(--nm-text)", fontWeight: 500, fontSize: "0.95rem" }}>
              {dragOver ? "Drop your PDF here" : "Drag & drop your PDF here"}
            </p>
            <p style={{ color: "var(--nm-text-muted)", fontSize: "0.8rem", marginTop: "0.3rem" }}>
              or click to browse files
            </p>
          </div>
        )}
      </div>

      {/* Inline file error */}
      {fileError && (
        <div
          role="alert"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.65rem 0.9rem",
            borderRadius: "var(--nm-radius-sm)",
            background: "rgba(192,57,43,0.08)",
            border: "1px solid rgba(192,57,43,0.25)",
            color: "#c0392b",
            fontSize: "0.82rem",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          {fileError}
        </div>
      )}

      {/* Action */}
      <button
        className="nm-btn-primary w-full flex items-center justify-center gap-2"
        style={{ padding: "0.875rem 1.5rem", fontSize: "0.95rem" }}
        disabled={!selectedFile || disabled}
        onClick={() => selectedFile && onFileSelected(selectedFile)}
        aria-disabled={!selectedFile || disabled}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="5 3 19 12 5 21 5 3" />
        </svg>
        Extract Text
      </button>

      {selectedFile && (
        <button
          className="nm-btn-ghost w-full text-center"
          style={{ padding: "0.6rem 1rem", fontSize: "0.82rem" }}
          onClick={(e) => {
            e.stopPropagation();
            setSelectedFile(null);
            if (inputRef.current) inputRef.current.value = "";
          }}
          disabled={disabled}
        >
          Remove file
        </button>
      )}
    </div>
  );
}
