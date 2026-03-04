export type Locale = "en" | "km";

export interface Translations {
  // Dashboard
  pageTitle: string;
  pageTitleHighlight: string;
  pageSubtitle: string;
  footer: string;

  // UploadCard
  uploadTitle: string;
  uploadSubtitle: string;
  dropzoneAriaLabel: string;
  dropzonePrompt: string;
  dropzoneSub: string;
  dropzoneActive: string;
  extractButton: string;
  removeFile: string;
  fileErrorPdf: string;

  // ProcessingCard
  processingTitle: string;
  statusIdle: string;
  statusProcessing: string;
  statusDone: string;
  statusError: string;
  badgeLive: string;
  badgeDone: string;
  badgeError: string;
  progressComplete: (pct: number) => string;
  progressIdle: string;
  pages: string;
  idlePlaceholder: string;
  errorMessage: string;
  pageStatus: string;
  processingPreview: string;

  // PreviewCard
  previewTitle: string;
  wordsExtracted: (count: string) => string;
  previewSubtitle: string;
  copyButton: string;
  copiedButton: string;
  downloadButton: string;
  tabRaw: string;
  tabRich: string;
  emptyStateTitle: string;
  emptyStateSub: string;
  copyAriaLabel: string;
  downloadAriaLabel: string;
  rawPanelLabel: string;
  richPanelLabel: string;
}

export const translations: Record<Locale, Translations> = {
  en: {
    pageTitle: "PDF",
    pageTitleHighlight: "Extractor",
    pageSubtitle:
      "Upload your PDF and extract clean, structured text in seconds.",
    footer: "PDF Extractor · Doc Extractor Web · Built with Next.js",

    uploadTitle: "Upload Document",
    uploadSubtitle: "PDF files only · Max 50 MB",
    dropzoneAriaLabel: "Upload PDF – drag and drop or click to browse",
    dropzonePrompt: "Drag & drop your PDF here",
    dropzoneSub: "or click to browse files",
    dropzoneActive: "Drop your PDF here",
    extractButton: "Extract Text",
    removeFile: "Remove file",
    fileErrorPdf:
      "Only PDF files are supported. Please choose a .pdf file.",

    processingTitle: "Processing",
    statusIdle: "Waiting for upload…",
    statusProcessing: "Extracting text from pages…",
    statusDone: "Extraction complete",
    statusError: "An error occurred",
    badgeLive: "Live",
    badgeDone: "✓ Done",
    badgeError: "✕ Error",
    progressComplete: (pct) => `${pct}% complete`,
    progressIdle: "—",
    pages: "pages",
    idlePlaceholder: "Upload a PDF to begin extraction",
    errorMessage: "Failed to process document. Please try again.",
    pageStatus: "Page processing status",
    processingPreview: "Processing content preview",

    previewTitle: "Extracted Content",
    wordsExtracted: (count) => `${count} words extracted`,
    previewSubtitle: "Preview will appear after extraction",
    copyButton: "Copy",
    copiedButton: "Copied!",
    downloadButton: "Download",
    tabRaw: "Raw Text",
    tabRich: "Rich Preview",
    emptyStateTitle: "No content yet",
    emptyStateSub: "Upload and extract a PDF to see the output here",
    copyAriaLabel: "Copy extracted text to clipboard",
    downloadAriaLabel: "Download extracted text as .txt file",
    rawPanelLabel: "Raw text output",
    richPanelLabel: "Rich formatted preview",
  },

  km: {
    pageTitle: "PDF",
    pageTitleHighlight: "ស្រង់ចេញ",
    pageSubtitle:
      "ផ្ទុកឡើង PDF របស់អ្នក ហើយស្រង់ចេញអក្សរដែលច្បាស់លាស់ ក្នុងពេលប៉ុន្មានវិនាទី។",
    footer: "PDF ស្រង់ចេញ · Doc Extractor Web · បង្កើតដោយ Next.js",

    uploadTitle: "ផ្ទុកឡើងឯកសារ",
    uploadSubtitle: "ឯកសារ PDF តែប៉ុណ្ណោះ · អតិបរមា 50 MB",
    dropzoneAriaLabel: "ផ្ទុក PDF – អូស ហើយដាក់ ឬចុចដើម្បីរកមើល",
    dropzonePrompt: "អូសហើយដាក់ PDF របស់អ្នកនៅទីនេះ",
    dropzoneSub: "ឬចុចដើម្បីរកមើលឯកសារ",
    dropzoneActive: "ដាក់ PDF របស់អ្នកនៅទីនេះ",
    extractButton: "ស្រង់ចេញអក្សរ",
    removeFile: "លុបឯកសារ",
    fileErrorPdf:
      "គាំទ្រតែឯកសារ PDF ប៉ុណ្ណោះ។ សូមជ្រើសរើសឯកសារ .pdf។",

    processingTitle: "កំពុងដំណើរការ",
    statusIdle: "រង់ចាំការផ្ទុកឡើង…",
    statusProcessing: "កំពុងស្រង់ចេញអក្សរពីទំព័រ…",
    statusDone: "ការស្រង់ចេញបានបញ្ចប់",
    statusError: "មានកំហុសបានកើតឡើង",
    badgeLive: "បន្តផ្ទាល់",
    badgeDone: "✓ រួចរាល់",
    badgeError: "✕ កំហុស",
    progressComplete: (pct) => `${pct}% បានបញ្ចប់`,
    progressIdle: "—",
    pages: "ទំព័រ",
    idlePlaceholder: "ផ្ទុកឡើង PDF ដើម្បីចាប់ផ្តើមស្រង់ចេញ",
    errorMessage:
      "បរាជ័យក្នុងការដំណើរការឯកសារ។ សូមព្យាយាមម្តងទៀត។",
    pageStatus: "ស្ថានភាពដំណើរការទំព័រ",
    processingPreview: "មើលជាមុនមាតិកាដំណើរការ",

    previewTitle: "មាតិកាដែលបានស្រង់ចេញ",
    wordsExtracted: (count) => `${count} ពាក្យបានស្រង់ចេញ`,
    previewSubtitle: "មើលជាមុននឹងបង្ហាញបន្ទាប់ពីការស្រង់ចេញ",
    copyButton: "ចម្លង",
    copiedButton: "បានចម្លង!",
    downloadButton: "ទាញយក",
    tabRaw: "អក្សរឆៅ",
    tabRich: "មើលជាមុនស្តោ",
    emptyStateTitle: "មិនទាន់មានមាតិកា",
    emptyStateSub:
      "ផ្ទុកឡើង ហើយស្រង់ចេញ PDF ដើម្បីមើលលទ្ធផលនៅទីនេះ",
    copyAriaLabel: "ចម្លងអក្សរដែលបានស្រង់ចេញទៅ Clipboard",
    downloadAriaLabel: "ទាញយកអក្សរដែលបានស្រង់ចេញជាឯកសារ .txt",
    rawPanelLabel: "លទ្ធផលអក្សរឆៅ",
    richPanelLabel: "មើលជាមុនដែលបានធ្វើទ្រង់ទ្រាយ",
  },
};
