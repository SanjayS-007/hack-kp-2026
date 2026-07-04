# AEGIS-X — Premium Design System & Elevation Spec (v2 → v3)
> Chief-architect + design-director directive. Goal: kill every "one-day AI slop" tell;
> ship a **production-grade, elegant, Palantir-meets-Linear** console.
> Audit screenshots: `audit\01…08.png` (before). Do not regress working demo theater.

---

## 0. Rebrand
- App name everywhere: **AEGIS-X** (sidebar wordmark "AEGIS-X" with the X in cyan; browser title "AEGIS-X — Operation Sentinel"; footer "AEGIS-X Evidence Intelligence").

## 1. Design Tokens (create `src/styles/tokens.css` as CSS vars + Tailwind config extension)

### Color — layered depth (replaces flat navy)
```
--bg-root:      #060B18   (page base; add fixed radial vignette: cyan 3% at 20%/0%, indigo 4% at 80%/100%)
--bg-surface-1: #0B1424   (cards)
--bg-surface-2: #101B30   (nested panels, hovers)
--bg-surface-3: #16233C   (popovers, active)
--stroke-subtle: rgba(148,163,184,.08)
--stroke-strong: rgba(148,163,184,.16)
--accent:       #22D3EE   (cyan — primary actions, active nav)
--accent-2:     #818CF8   (indigo — secondary viz)
--risk-a: #F43F5E  --risk-b: #F59E0B  --risk-c: #EAB308  --ok: #34D399  --review: #38BDF8
--text-hi: #E7EDF7  --text-mid: #9FB0C7  --text-low: #64748B (never below this on surfaces)
```
Noise: add a 2% opacity SVG turbulence overlay on `--bg-root` (inline data-URI, offline-safe) — kills the flat look.

### Elevation (3 tiers — currently everything is tier 1)
- `elev-1`: border `--stroke-subtle`, no shadow (list rows, table)
- `elev-2`: border `--stroke-strong` + `0 8px 24px rgba(2,6,17,.45)` (cards)
- `elev-3`: + `0 16px 48px rgba(2,6,17,.6)` + 1px inner highlight `inset 0 1px 0 rgba(255,255,255,.04)` (modals, detail rails, hero verdict)

### Typography (self-hosted, offline — download WOFF2 into `src/assets/fonts/`, @font-face)
- **Inter Variable** — UI. H1 28/700 tracking -0.02em; H2 15/600 uppercase tracking +0.08em for section labels; body 13.5/450.
- **JetBrains Mono** — ALL numerals/IDs/hashes/timestamps, `font-variant-numeric: tabular-nums`.
- KPI numbers: 34/700 mono with `font-feature-settings: "tnum"`; unit suffixes 12/500 `--text-mid`.
- If font download fails (offline env), fall back to system stack BUT still apply tabular-nums + tracking rules.

### Motion (`src/styles/motion.css`)
- Tokens: `--ease-out: cubic-bezier(.16,1,.3,1)`; durations 150ms (hover), 260ms (panel), 420ms (page).
- Page transitions: 420ms fade+6px rise on route change.
- Respect `prefers-reduced-motion: reduce` — disable all nonessential animation.
- Focus: every interactive element gets `focus-visible` ring `2px solid --accent` offset 2px.

## 2. Global Chrome

### Sidebar (premium rework)
- Group nav with section labels: **OVERVIEW** (Dashboard) · **INVESTIGATE** (Visual Triage, Entity Graph, Timeline) · **INTELLIGENCE** (Ask AEGIS, Synthetic Detection) · **ACTION** (Risk Queue, Court Report).
- Active item: 2px cyan left rail + surface-2 fill + icon in accent (not a big pill).
- Each item: right-aligned subtle kbd hint (1…8). Wire actual keyboard shortcuts 1-8 for navigation.
- Bottom block: Investigator card (avatar circle w/ initials "A-2291", role "Lead Investigator", green presence dot) above the Active Case card.
- Add collapsed-width logic NOT required (skip — demo is fixed width).

### Top status bar
- Left: AIR-GAPPED · SOVEREIGN · Chain-of-Custody: VERIFIED (keep) + **new chip**: "Enclave Attestation ✓ 0x7f3a…" (Verifiable-compute story).
- Right: live UTC clock (ticking, mono) · session timer · investigator chip.
- Give the bar a bottom hairline + slight glass blur (`backdrop-filter: blur(8px)`, translucent surface).

### Page headers (differentiate!)
- Pattern: eyebrow (11px uppercase module code e.g. "MODULE 01 · CONTENT ANALYSIS") → H1 → one-line description → right-side action cluster.
- Add a per-page 3px accent underline swatch under the H1 (triage=risk-b, graph=accent-2, ask=accent, synthetic=fuchsia-400, queue=risk-a, report=ok, timeline=cyan-300).

## 3. Per-Page Elevation

### 3.1 Dashboard (already strongest — refine)
- KPI cards: add tiny 7-day sparkline (SVG path, 40×16) bottom-right of each; hover lifts to elev-3 with 150ms.
- Donut: add center count-up animation on mount (0→312, 800ms); legend rows get hover-highlight sync with donut segments.
- AI activity feed: entries slide-in from top (260ms), max 8 visible, older fade; tag chips get per-tag hue map (already exists — keep).
- Add a 4th column mini-card stack: "Guardian Network" widget (23 agencies · model v14 · "gradients only — no data leaves premises") and "Edge Kit E-KIT-07" card (scene manifest sealed, 4,112 files pre-triaged) — the E5/E6 story beats.

### 3.2 Visual Triage (biggest fix — kill the loud gradients)
- Replace saturated multicolor gradients with **desaturated duotone slate/navy blur fields** (e.g. subtle radial mixes of #1E293B/#334155 with a faint per-severity tint ≤12%): tiles must read as "blurred evidence", not candy.
- Severity now communicated by: 3px top border in severity color + badge + confidence bar (keep).
- Tile chrome: file-type icon + duration chip for videos, EXIF-present dot, hash short-code mono.
- Grad-CAM overlay: refine to an off-center radial heat (two blended radial-gradients, red-amber, 40% opacity) + "XAI" corner tag when active.
- Add right-side detail rail (opens on tile click, elev-3): larger blurred field, full metadata table (hash, device, MAC times, apparent-age band, pose flags), action buttons. This fills the page and adds pro depth.
- Toolbar: segmented filter control (not loose chip buttons), sort dropdown (Confidence ↓), view density toggle, results count mono.

### 3.3 Entity Graph
- Canvas: dot-grid background inside panel; nodes get type-glyph icons (person/phone/wallet/IP/hash/laptop — lucide, 12px white) inside circles; selected node = white 2px ring + soft glow; edges curved (quadratic) with dash-flow animation on the peel-chain after reveal; edge hover shows label chip.
- Controls cluster (bottom-right floating, elev-3): zoom in/out, fit, re-run physics; legend moves to a collapsible floating chip row (top-left inside canvas).
- Detail rail (right): keep, but add mini "connection list" with per-edge type icons + timestamps and a "Focus path" button that dims all but the selected path.
- GNN reveal: keep behavior; upgrade toast to a slide-in elev-3 card with amber icon, title, "Review entity →" link that selects Subject-C.

### 3.4 Timeline (full redesign — currently weakest)
- Structure: full-height layout. Top: phase band strip (Grooming/Production/Distribution as translucent colored spans with labels). Middle: 5 swimlanes with sticky left labels (device icon + name + event count). Events = rounded flag markers (not bare dots): 8px dot + on-hover expanding label card (elev-3 popover w/ time, description, evidence link).
- Real time axis: "Mar 02 … Mar 28" date labels (mono, 10px) with vertical hairlines; NOT raw 1-24 numbers.
- Bottom rail: event detail panel — click an event → panel fills with full detail + "open in Triage/Graph" cross-links (fills the dead space).
- Clock-skew callout: keep as slim banner; add small "+00:03:41" mono chips ON the affected lanes.
- Brush/zoom: simple range slider under axis that scales the window (cheap but looks pro).

### 3.5 Ask AEGIS
- Empty state: replace with a "mission control" welcome — orb icon with slow pulse, 2-line intro, and the 4 suggested queries as elegant cards (icon + query + expected artifact tag e.g. "→ dossier", "→ graph path") in a 2×2 grid.
- Chat: user bubble → subtle surface-2, right; AEGIS answer → NO bubble, full-width block with cyan left rail, structured (headline sentence bold, then paragraphs), citations as inline superscript chips [1][2] AND a "Sources (4)" footer strip; ECS stamp animated (draws a small ring).
- Agent trace: keep the drawer; polish rows with per-step icons, mono ms timings right-aligned, connect steps with a 1px vertical line; Cypher snippet gets a mini code block w/ syntax tint.
- Answer for query 3 must embed a **mini graph-path visual** (Subject-A → wallet → Subject-C inline SVG chips-and-arrows) per GraphRAG story.
- Right sidebar: pipeline card becomes a live stepper that actually lights up in sync with the trace steps during answering (reuse state).

### 3.6 Synthetic Detection
- Keep layout; add bottom row to fill page: "Provenance Verdict" card (C2PA manifest: MISSING → 'absence of provenance is itself a signal' + SynthID watermark scan: NOT FOUND) + "Model Fingerprint" card (nearest generator family: 'latent-diffusion v2 class, cosine 0.87') — E6 Synthetic Shield v2 beats.
- Verdict ring: add subtle animated conic sweep while "Re-analyze" runs.
- File tabs: convert to segmented control with per-file verdict chip.

### 3.7 Risk Queue
- Rows: 3px left border in severity color; hover raises to surface-2; row click opens detail drawer (right, elev-3) with composite-score breakdown (stacked horizontal bar: content 38 + behavior 24 + network 21 + recency 14 = 97) — sells the "composite" claim.
- SLA countdowns: keep ticking; escalated row gets soft red pulsing left edge (2s loop, reduced-motion aware).
- Add header strip above table: 3 summary chips (1 escalation · 2 in review · 3 queued) + "Auto-prioritized by AEGIS-X · last recompute 00:12 ago".

### 3.8 Court Report
- Empty state: keep but add a 3-step mini-stepper preview (Summary → Manifest → §63 Certificate) so the page isn't bare.
- Generated document: render as a **paper artifact** — near-white surface (#F4F6FA, text #1E293B) inside the dark app, serif headings (Georgia stack) for the document only, official layout: header w/ emblem placeholder + case number, numbered sections, evidence table (mono hashes), signature blocks, §63 Part A/B boxes with a "DRAFT — PENDING SIGNATURE" watermark diagonal.
- Add left mini-TOC rail (sections, scrollspy). Add proof-tree accordion per finding (Claim → POCSO element → Evidence ID → SHA-256 ✓) — the provenance-spine moat, visible.
- Print stylesheet: `@media print` — hide chrome, paper fills page (Export PDF = window.print()).

## 4. Production-Readiness Checklist (must all pass)
- [ ] `npm run build` zero errors; oxlint clean or justified
- [ ] No console errors/warnings on any route (check DevTools)
- [ ] Contrast: no text below `--text-low` on surfaces; run a spot check on chips/labels
- [ ] `focus-visible` rings everywhere; full keyboard nav (tab through sidebar + 1-8 shortcuts)
- [ ] `prefers-reduced-motion` honored
- [ ] Favicon (shield glyph SVG) + per-route document.title ("Triage · AEGIS-X" etc.)
- [ ] Error boundary wrapping routes (styled fallback card)
- [ ] All fonts/assets local — zero network calls at runtime (verify Network tab offline)
- [ ] `?reset` still works; all v2 demo theater (trace, GNN reveal, re-analyze, generate) intact
- [ ] Timestamps still relative/live; no stale dates
