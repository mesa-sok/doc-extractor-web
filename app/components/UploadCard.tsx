"use client";

import { useCallback, useRef, useState } from "react";
import { useLocale } from "../context/LocaleContext";
import {
  CloudUploadIcon,
  AlertCircleIcon,
  FileTextIcon,
  PlayIcon,
  TrashIcon,
  StarIcon,
} from "./Icons";

interface UploadCardProps {
  onFileSelected: (file: File) => void;
  disabled?: boolean;
}

export default function UploadCard({ onFileSelected, disabled }: UploadCardProps) {
  const { t } = useLocale();
  const [dragOver, setDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    (file: File) => {
      if (file.type !== "application/pdf") {
        setFileError(t.fileErrorPdf);
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
            {t.uploadTitle}
          </h2>
          <p style={{ color: "var(--nm-text-secondary)", fontSize: "0.85rem", marginTop: "0.2rem" }}>
            {t.uploadSubtitle}
          </p>
        </div>
        <div className="nm-badge">
          <StarIcon size={10} color="currentColor" strokeWidth={0} style={{ fill: "currentColor" }} />
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
        aria-label={t.dropzoneAriaLabel}
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
            width: "72px",
            height: "72px",
            color: dragOver ? "var(--nm-primary)" : "var(--nm-text-muted)",
            transition: "color 0.2s ease",
          }}
        >
          <CloudUploadIcon
            size={36}
            color={dragOver ? "var(--nm-primary)" : "var(--nm-text-muted)"}
            strokeWidth={1.5}
          />
        </div>

        {selectedFile ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
            {/* File icon + name */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.5rem 1rem",
                borderRadius: "var(--nm-radius-sm)",
                background: "rgba(42, 122, 80, 0.08)",
                border: "1px solid rgba(42, 122, 80, 0.2)",
              }}
            >
              <FileTextIcon size={18} color="var(--nm-primary)" strokeWidth={1.75} />
              <p style={{ color: "var(--nm-primary)", fontWeight: 600, fontSize: "0.92rem" }}>
                {selectedFile.name}
              </p>
            </div>
            <p style={{ color: "var(--nm-text-muted)", fontSize: "0.78rem" }}>
              {formatBytes(selectedFile.size)}
            </p>
          </div>
        ) : (
          <div className="text-center">
            <p style={{ color: "var(--nm-text)", fontWeight: 500, fontSize: "0.95rem" }}>
              {dragOver ? t.dropzoneActive : t.dropzonePrompt}
            </p>
            <p style={{ color: "var(--nm-text-muted)", fontSize: "0.8rem", marginTop: "0.3rem" }}>
              {t.dropzoneSub}
            </p>
            {/* Accepted format hint */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.3rem", marginTop: "0.75rem" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.25rem",
                  padding: "0.2rem 0.55rem",
                  borderRadius: "999px",
                  background: "rgba(42, 122, 80, 0.07)",
                  border: "1px solid rgba(42, 122, 80, 0.18)",
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  color: "var(--nm-primary)",
                }}
              >
                <FileTextIcon size={11} color="var(--nm-primary)" strokeWidth={2} />
                .pdf
              </div>
            </div>
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
          <AlertCircleIcon size={14} color="#c0392b" strokeWidth={2} />
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
        <PlayIcon size={18} color="white" strokeWidth={0} style={{ fill: "white" }} />
        {t.extractButton}
      </button>

      {selectedFile && (
        <button
          className="nm-btn-ghost w-full flex items-center justify-center gap-2"
          style={{ padding: "0.6rem 1rem", fontSize: "0.82rem" }}
          onClick={(e) => {
            e.stopPropagation();
            setSelectedFile(null);
            if (inputRef.current) inputRef.current.value = "";
          }}
          disabled={disabled}
        >
          <TrashIcon size={14} color="currentColor" strokeWidth={2} />
          {t.removeFile}
        </button>
      )}
    </div>
  );
}
