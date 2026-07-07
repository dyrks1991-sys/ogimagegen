# Technical Specification — OGImageGen

> Version: 0.1.0
> Status: Approved
> Date: 2026-07-07

---

## Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | Next.js 14 (static export, output: 'export') | Same pipeline as QuickQR — zero new infra |
| Language | TypeScript 5 (strict mode) | Strict mode, consistent with all DevOS projects |
| Styling | Tailwind CSS 3 | Utility-first, mobile-first, design system consistent |
| State | React useState — single-page linear state | Sufficient for single-page linear state machine |
| Deployment | Vercel (static export) | Proven by QuickQR deploy |

---

## Architecture

```
Browser
  └── Next.js 14 static export
        └── page.tsx (state owner)
              ├── DropZone         ← File input
              ├── FormatSelector   ← Output format
              ├── QualitySlider    ← Compression level
              ├── ImagePreview     ← Before/after display
              ├── CompressionStats ← Size delta
              └── DownloadButton   ← Output
```

**No backend. No API. No database. No auth.**
All computation happens in the user's browser.

---

## Folder Structure

```
projects/ogimagegen/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout, metadata, Inter font
│   │   ├── page.tsx            # Main tool page — state owner
│   │   └── globals.css         # Tailwind + CSS variables
│   ├── components/
│   │   ├── TextInputs.tsx
│   │   ├── TemplateSelector.tsx
│   │   ├── ColorPicker.tsx
│   │   ├── CanvasPreview.tsx
│   │   └── DownloadButton.tsx
│   └── lib/
│       ├── ogRenderer.ts
│       ├── templates.ts
│       └── download.ts
├── public/
│   ├── favicon.svg
│   ├── favicon-32.png
│   ├── apple-touch-icon.png
│   ├── og.png
│   ├── robots.txt
│   └── sitemap.xml
├── scripts/
│   ├── generate-og.js
│   └── generate-icons.js
├── PRD.md
├── TECH_SPEC.md
├── UI_PLAN.md
├── TASKS.md
├── ROADMAP.md
├── CHECKLIST.md
├── DECISIONS.md
├── README.md
├── STATUS.md
├── CHANGELOG.md
├── package.json
├── next.config.js
├── tsconfig.json
├── tailwind.config.js
└── .gitignore
```

---

## Component Specifications

| Component | File | Responsibility |
|---|---|---|
| `TextInputs` | `src/components/TextInputs.tsx` | Title (max 80) + description (max 120) controlled inputs. Character count display. Emits onChange for each field. |
| `TemplateSelector` | `src/components/TemplateSelector.tsx` | 3 template cards with mini-preview thumbnails. Dark, Light, Gradient. Controlled selection — emits onSelect(template). |
| `ColorPicker` | `src/components/ColorPicker.tsx` | Background + accent color pickers (<input type="color">). Shows hex value. Resets to template defaults when template changes. |
| `CanvasPreview` | `src/components/CanvasPreview.tsx` | Renders a <canvas> at 1200×630 scaled down (CSS transform) for display. Calls renderOG() from ogRenderer.ts on every config change via useEffect. |
| `DownloadButton` | `src/components/DownloadButton.tsx` | Calls canvas.toBlob("image/png") → downloadBlob(). Always enabled. Shows "Download PNG" label. |

---

## Library Modules

| Module | File | Responsibility |
|---|---|---|
| — | `src/lib/ogRenderer.ts` | Core Canvas 2D rendering engine. renderOG(canvas, config): void. Handles bg, grid, logo, title, description, tags, watermark. Text wrapping included. |
| — | `src/lib/templates.ts` | Template registry: { dark, light, gradient }. Each entry has bgColor, textColor, accentColor, secondaryColor, logoStyle. |
| — | `src/lib/download.ts` | generateFilename(ext): og-YYYYMMDD-HHMMSS.png. downloadBlob(blob, filename). (Adapted from ImageCompress pattern.) |

---

## State Design

All state lives in `src/app/page.tsx`. Components are stateless — they receive props and call callbacks.

| State | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | `'Your Project Name'` | OG image title — pre-populated so canvas is never blank |
| `description` | `string` | `'The best tool for developers.'` | OG image description — optional tagline |
| `template` | `'dark' | 'light' | 'gradient'` | `'dark'` | Active template — controls color scheme and layout constants |
| `bgColor` | `string` | `'#111827'` | Background color hex — initialized from template, user-overridable |
| `accentColor` | `string` | `'#ffffff'` | Accent / text color hex — used for title and decorative elements |
| `canvasRef` | `RefObject<HTMLCanvasElement>` | `useRef(null)` | Ref to the <canvas> element in CanvasPreview — used by DownloadButton.toBlob() |

---

## Data Flow

```
User drops file
  → selectedFile ← File
  → originalUrl  ← URL.createObjectURL(file)
  → useEffect [selectedFile, outputFormat, quality]
      → compress(file, { format, quality })
      → compressedBlob ← Blob
      → compressedUrl  ← URL.createObjectURL(blob)
  → ImagePreview renders both URLs
  → DownloadButton: downloadBlob(compressedBlob, generateFilename(format))
```

---

## No Backend Required

| Concern | Resolution |
|---|---|
| Storage | None — files never leave the browser |
| Auth | None — no accounts |
| API | None — Canvas API + Web Worker |
| GDPR | Trivially compliant — zero data retention |
| Hosting | Vercel free tier, static CDN |

---

## Performance Targets

| Metric | Target | How |
|---|---|---|
| First Load JS | < 100 KB | Static export, no unnecessary deps |
| Compression time (2MB JPEG) | < 2 000ms | browser-image-compression Web Worker |
| Preview update after slider | < 300ms | Debounce + Web Worker |
| Lighthouse Performance | ≥ 90 | Static export + no blocking resources |

---

*Generated by DevOS Planner Agent v1 — 2026-07-07*
