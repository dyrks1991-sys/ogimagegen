# Tasks — OGImageGen

> Version: 0.1.0
> Sprint: 1
> Generated: 2026-07-07
> Total estimated: 18.5h (~2.3 days)

---

## Task Status Key

| Status | Meaning |
|---|---|
| `pending` | Not started |
| `in_progress` | Currently being worked on |
| `done` | Complete, AC verified |
| `blocked` | Waiting on dependency |

---

## Epic: Foundation

| ID | Task | Est | Deps | Status |
|---|---|---|---|---|
| `E1-T1` | Bootstrap project | 0.5h | — | pending |
| `E1-T2` | Set up lib skeleton | 0.5h | E1-T1 | pending |

### E1-T1 — Bootstrap project

**Estimate:** 0.5h  
**Dependencies:** none  
**Description:** Run `node agents/bootstrap.js OGImageGen`. Verify build passes. Confirm projects/ogimagegen/ exists.

### E1-T2 — Set up lib skeleton

**Estimate:** 0.5h  
**Dependencies:** E1-T1  
**Description:** Create src/lib/download.ts, src/lib/templates.ts, src/lib/ogRenderer.ts as empty typed modules.

## Epic: Renderer

| ID | Task | Est | Deps | Status |
|---|---|---|---|---|
| `E2-T1` | templates.ts — 3 templates | 1h | E1-T2 | pending |
| `E2-T2` | ogRenderer.ts — OGConfig type | 0.5h | E2-T1 | pending |
| `E2-T3` | ogRenderer.ts — background layer | 1h | E2-T2 | pending |
| `E2-T4` | ogRenderer.ts — text layers | 2h | E2-T3 | pending |
| `E2-T5` | ogRenderer.ts — watermark | 0.5h | E2-T4 | pending |

### E2-T1 — templates.ts — 3 templates

**Estimate:** 1h  
**Dependencies:** E1-T2  
**Description:** Export TemplateConfig type + TEMPLATES object with dark/light/gradient. Each has: bgColor, textColor, accentColor, gridColor, logoStyle.

### E2-T2 — ogRenderer.ts — OGConfig type

**Estimate:** 0.5h  
**Dependencies:** E2-T1  
**Description:** Export OGConfig interface: { title, description, template, bgColor, accentColor, watermark: boolean }. Export renderOG(canvas, config): void.

### E2-T3 — ogRenderer.ts — background layer

**Estimate:** 1h  
**Dependencies:** E2-T2  
**Description:** Draw: (1) solid bg fillRect, (2) subtle grid lines for dark/gradient, (3) gradient overlay for gradient template.

### E2-T4 — ogRenderer.ts — text layers

**Estimate:** 2h  
**Dependencies:** E2-T3  
**Description:** Draw: title (large, 72px bold, with wrapText at 900px maxWidth, 2-line max), description (32px regular), bottom URL strip. wrapText() helper function included.

### E2-T5 — ogRenderer.ts — watermark

**Estimate:** 0.5h  
**Dependencies:** E2-T4  
**Description:** Small "ogimagegen.vercel.app" text in bottom-right at 18px, low opacity. Conditionally shown based on config.watermark.

## Epic: Controls

| ID | Task | Est | Deps | Status |
|---|---|---|---|---|
| `E3-T1` | TextInputs component | 1h | E1-T1 | pending |
| `E3-T2` | TemplateSelector component | 1.5h | E1-T1 | pending |
| `E3-T3` | ColorPicker component | 1h | E1-T1 | pending |

### E3-T1 — TextInputs component

**Estimate:** 1h  
**Dependencies:** E1-T1  
**Description:** Title input (max 80) + Description input (max 120). Character count shown (e.g. "18/80"). Controlled with onChange callbacks. Gray border → blue focus ring.

### E3-T2 — TemplateSelector component

**Estimate:** 1.5h  
**Dependencies:** E1-T1  
**Description:** 3 template cards in a row, each 90×52px mini-preview (plain divs with bg colors showing the template palette). Selected card gets ring-2 ring-gray-900. emits onSelect(template).

### E3-T3 — ColorPicker component

**Estimate:** 1h  
**Dependencies:** E1-T1  
**Description:** 2 rows: Background + Accent. Each row: colored swatch + <input type="color"> + hex label. On template switch: reset to template defaults. emits onChange callbacks.

## Epic: Preview

| ID | Task | Est | Deps | Status |
|---|---|---|---|---|
| `E4-T1` | CanvasPreview component | 2h | E2-T5, E3-T1, E3-T2, E3-T3 | pending |

### E4-T1 — CanvasPreview component

**Estimate:** 2h  
**Dependencies:** E2-T5, E3-T1, E3-T2, E3-T3  
**Description:** <canvas width={1200} height={630} ref={canvasRef}> scaled via CSS (width: 100%, aspect-ratio 1200/630). useEffect calls renderOG(canvas, config) on every config change. Pass canvasRef up to parent via prop.

## Epic: Download

| ID | Task | Est | Deps | Status |
|---|---|---|---|---|
| `E5-T1` | download.ts lib | 0.5h | E1-T2 | pending |
| `E5-T2` | DownloadButton component | 0.5h | E4-T1, E5-T1 | pending |

### E5-T1 — download.ts lib

**Estimate:** 0.5h  
**Dependencies:** E1-T2  
**Description:** generateFilename(): "og-YYYYMMDD-HHMMSS.png". downloadBlob(blob, filename): create anchor, click, revoke. Adapted from ImageCompress pattern.

### E5-T2 — DownloadButton component

**Estimate:** 0.5h  
**Dependencies:** E4-T1, E5-T1  
**Description:** Button always enabled. On click: canvasRef.current.toBlob("image/png") → downloadBlob(blob, generateFilename()). Primary style (dark bg, white text).

## Epic: Integration

| ID | Task | Est | Deps | Status |
|---|---|---|---|---|
| `E6-T1` | Wire all in page.tsx | 2h | E3-T1, E3-T2, E3-T3, E4-T1, E5-T2 | pending |
| `E6-T2` | SEO + metadata | 1h | E6-T1 | pending |
| `E6-T3` | analytics.ts stubs | 0.5h | E6-T1 | pending |

### E6-T1 — Wire all in page.tsx

**Estimate:** 2h  
**Dependencies:** E3-T1, E3-T2, E3-T3, E4-T1, E5-T2  
**Description:** State: title, description, template, bgColor, accentColor. Desktop: 2-col (controls left, preview right). Mobile: stacked (preview first, then controls). Pass canvasRef down to CanvasPreview and DownloadButton.

### E6-T2 — SEO + metadata

**Estimate:** 1h  
**Dependencies:** E6-T1  
**Description:** layout.tsx: Inter font, title="OGImageGen — Free OG Image Generator", description, og:image, twitter:card, JSON-LD WebApplication, canonical URL. favicon.svg + favicon-32.png.

### E6-T3 — analytics.ts stubs

**Estimate:** 0.5h  
**Dependencies:** E6-T1  
**Description:** Copy analytics.ts pattern from ImageCompress. trackEvent("template_selected"), trackEvent("color_changed"), trackEvent("download"). No-op stubs.

## Epic: Quality

| ID | Task | Est | Deps | Status |
|---|---|---|---|---|
| `E7-T1` | Responsive layout polish | 1h | E6-T1 | pending |
| `E7-T2` | Text overflow edge cases | 0.5h | E2-T4 | pending |

### E7-T1 — Responsive layout polish

**Estimate:** 1h  
**Dependencies:** E6-T1  
**Description:** Mobile-first. Preview full-width on mobile (scaled). Controls below. Desktop: left/right split. Test at 390px and 1280px.

### E7-T2 — Text overflow edge cases

**Estimate:** 0.5h  
**Dependencies:** E2-T4  
**Description:** Test: 80-char title wraps correctly, 120-char description truncates at 2 lines. Emoji in title renders. All-caps title OK.

## Epic: Deploy

| ID | Task | Est | Deps | Status |
|---|---|---|---|---|
| `E8-T1` | GitHub + Vercel deploy | 0.5h | E7-T1, E7-T2 | pending |
| `E8-T2` | Production smoke test | 0.5h | E8-T1 | pending |

### E8-T1 — GitHub + Vercel deploy

**Estimate:** 0.5h  
**Dependencies:** E7-T1, E7-T2  
**Description:** git push to dyrks1991-sys/ogimagegen. vercel --prod --yes. Extract production URL. Verify HTTP 200.

### E8-T2 — Production smoke test

**Estimate:** 0.5h  
**Dependencies:** E8-T1  
**Description:** On production URL: enter title, pick Gradient template, change accent color, download PNG, verify dimensions are 1200×630. Update STATUS.md.

---

## Completion Criteria

Sprint 1 is done when:
- All tasks above are `done`
- Production URL returns HTTP 200
- Lighthouse Performance ≥ 90
- At least one real image compressed and downloaded successfully

---

*Generated by DevOS Planner Agent v1 — 2026-07-07*
