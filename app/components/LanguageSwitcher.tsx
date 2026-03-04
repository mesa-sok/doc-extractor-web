"use client";

import { useLocale } from "../context/LocaleContext";

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();

  return (
    <div
      className="nm-flat-sm"
      style={{ display: "inline-flex", padding: "4px", gap: "4px" }}
      role="group"
      aria-label="Language selection"
    >
      <button
        className={locale === "en" ? "nm-tab-active" : "nm-btn-ghost"}
        style={{
          padding: "0.4rem 0.85rem",
          fontSize: "0.8rem",
          fontWeight: 600,
          borderRadius: "var(--nm-radius-sm)",
          transition: "all 0.18s ease",
        }}
        onClick={() => setLocale("en")}
        aria-pressed={locale === "en"}
      >
        EN
      </button>
      <button
        className={locale === "km" ? "nm-tab-active" : "nm-btn-ghost"}
        style={{
          padding: "0.4rem 0.85rem",
          fontSize: "0.8rem",
          fontWeight: 600,
          borderRadius: "var(--nm-radius-sm)",
          transition: "all 0.18s ease",
        }}
        onClick={() => setLocale("km")}
        aria-pressed={locale === "km"}
      >
        ភាសាខ្មែរ
      </button>
    </div>
  );
}
