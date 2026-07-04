# AEGIS-X — Operation Sentinel (HACK-KP 2026 Prototype)

**AEGIS-X** — *AI Evidence & Guardianship Intelligence System*
A high-fidelity **mock** demo of an AI-powered child-protection investigation console.
Case **KP-2026-0417 · "Operation Sentinel"**.

> ⚠️ **100% fictional / synthetic data.** No real names, no real imagery, no explicit content.
> All flagged media are abstract **desaturated duotone** placeholders. Built for a hackathon demo only.

*"From terabytes to testimony — in hours, not months."*

---

## Stack
- **Vite + React 19**
- **TailwindCSS v3** — premium design system (layered-depth navy `#060B18`→`#16233C`, cyan `#22d3ee` + indigo `#818cf8` accents, 3-tier elevation, noise/vignette)
- **three · @react-three/fiber · @react-three/drei · @react-three/postprocessing** — the Fusion Vault 3D world (code-split / lazy)
- **Self-hosted fonts** (`@fontsource-variable/inter` + `@fontsource/jetbrains-mono`, tabular numerals) — fully offline
- **recharts** · **react-router-dom** · **lucide-react**
- Entity graph = **hand-rolled SVG force-directed layout** with glyph nodes, curved edges, zoom/fit controls

## Run

```powershell
cd C:\Users\2504690\hack-kp-2026\prototype
npm install          # first time only
npm run dev          # dev server -> http://localhost:5173
```

Production build / preview (recommended for the demo — no dev-server hiccups):

```powershell
npm run build        # outputs dist/  (verified: builds clean, 0 console errors)
npm run preview      # serve the production build -> http://localhost:4173
```

Requires Node 18+ (developed on Node v24). **Offline-safe** — all fonts/assets bundled, zero runtime network calls.

### Keyboard & presenter rails
- **Keys `0`–`9`** jump between modules (Case Vault…Court Report). Full `focus-visible` ring nav; `prefers-reduced-motion` honored.
- **`▶ Demo` / `D`** — start the presenter-driven Demo Mode (spotlight + cursor FX + speed HUD).
- **`?reset`** — append to any URL (e.g. `http://localhost:4173/?reset`) to hard-clear all
  session state between demo takes.
- The demo is **deterministic theater**: click the suggested-prompt chips / buttons, never free-type.
- If asked "is this live AI?": *"The console is fully working software; inference is simulated for
  this demo — the models and architecture are specified and research-validated, integration is our
  roadmap."*

---

## Pages (left sidebar)
| # | Route | Module | Highlight |
|---|-------|--------|-----------|
| 0 | `/` | **Case Vault** | Case-lifecycle landing · pre-seeded cases · "⊕ New Case" → Genesis · vault integrity (WORM/PQC) |
| — | `/genesis` | **Case Genesis** | 4-stage intake wizard: Acquire → Process → Analyze → Seal (shared-axis slides) |
| 1 | `/dashboard` | **Case Dashboard** | KPI cards + sparklines, count-up risk donut, per-device ingest, live AI feed, Guardian/Edge cards |
| 2 | `/triage` | **Visual Triage** | Desaturated duotone tiles, Cat A/B/C badges, Grad-CAM, detail rail, 91% wellbeing banner |
| 3 | `/graph` | **Entity Graph** | Glyph-node force graph, zoom/fit controls, GNN link-prediction reveal of hidden Subject-C |
| 4 | `/timeline` | **Chronos** | Phase-band swimlanes, real date axis, clock-skew callout, event detail rail + cross-links |
| 5 | `/ask` | **Ask AEGIS** | RAG chat, agent-trace drawer (Cypher + ms), streamed answers, citations + ECS badge, live stepper |
| 6 | `/aicore` | **AI Core** | Engine-room observatory: modality router → 4 lanes (Visual/Language/Temporal/Fusion), live engines, model registry (weight SHA-256), Verifier Agent, ★ Trace-a-Specimen |
| 7 | `/synthetic` | **DeepFake Shield** | Re-analyze pipeline, 3-stream verdict, defocus/A-V maps, provenance + model-fingerprint cards |
| 8 | `/queue` | **Risk Queue** | Composite-score table, detail drawer breakdown, live SLA countdowns, active-abuse escalation |
| 9 | `/report` | **Court Report** | Paper artifact, TOC scrollspy, SHA-256 manifest, §63 cert, proof-tree, print CSS |

Keys **`0`–`9`** jump between modules. Every console page shows an **active-case chip** (click → back to Vault).
All pages share one coherent dataset (`src/data/mockData.js`, deriving all case numbers from `src/data/canon.js`)
— the same subjects, devices, hashes and wallets recur everywhere, so the case feels real end-to-end.

> **Canonical numbers** (`src/data/canon.js`) are the single source of truth: 2.4 TB · 480,231 files ·
> 78.2% auto-disposed (375,541 never seen) · 21.1% to AI · 312 flagged (A41/B88/C183) · 14 high-risk · 3 synthetic ·
> 38 entities / 91 edges · 47 min triage · 91% reduction · ECS gate ≥ 0.85 · KP-2026-0417 ·
> DEV-01/02/03 (214,880 / 198,432 / 66,919). Every page imports from here — zero cross-phase drift.

---

## Case Genesis wizard (`/genesis`)
Vault-first lifecycle: **Vault → New Case → Acquire → Process → AI Core → Analyze → Seal → Console**. Runs FAST for the
2-minute demo cut, with a subtle **Skip →** on every stage and shared-axis slide transitions (feels like one machine).
- **Acquire** — 4 intake modalities (Local / Network / Live Stream / Cloud) with Phosphor duotone heroes. Local mock
  explorer + **mouse drag-drop** ("Seizure bundle" → dropzone seals SHA-256 onto every file) + write-blocker chip.
- **Process** — 5-node pipeline (Carving → Hashing → VICS → Metadata → AI Queue) auto-runs in ~8s with flowing
  particles, ticking counters, GPU chips, and a scrolling ingest log, then auto-advances.
- **AI Core** — the engine-room pass (~7s, skippable): the 4 inference lanes light **A → B → C → D**, counters spin,
  the **Verifier Agent** seals the batch, then auto-advances. Reuses the `/aicore` observatory in `compact` mode.
- **Analyze** — integrity banner, 4 stat cards, file-type donut, hash breakdown, and the **living architecture** panel
  (a light pulse traverses Sources → Ingest → AI Core → Fusion → Console).
- **Seal** — case number **slot-machines to KP-2026-0417**, prefilled metadata, one **Case name** input (the only
  typing in the demo), **Seal into Vault** lock-close ceremony → the new card materializes in the Vault.

## AI Core — "Engine Room" (`/aicore`)
A living observatory of the on-enclave inference pipeline. Enclave header (`NVIDIA CC-mode · gpu-01 82% · gpu-02 64% ·
Attestation ✓ · air-gapped`) → **modality router** → **Lane A Visual** (Known-Hash Prefilter → Hybrid Classifier →
Human Perception → Synthetic Shield) · **Lane B Language** (OCR/NER → Chunk→Embed) · **Lane C Temporal** (Clock-skew
stratigraphy → TAGNN anomaly) → **Lane D Fusion** (KG upsert → link-predict → composite risk → **Verifier Agent**,
the gold node). Click any engine for a drawer (plain-words line, spec table, mock sample artifact, never-round quality
chips). Right rail: **Model Registry** with per-model weight SHA-256, "pinned to KP-2026-0417 — court-reproducible".
Wellbeing meter: "375,541 files auto-disposed — never seen by a human eye". **★ Trace a Specimen** (Follow FILE-2291)
sends a single amber particle A1→A2→A3→A4→D1→D4 with stamp popovers, ending as a court-exhibit chip. Speed-aware.

## Demo Mode (presenter-driven)
"**▶ Demo**" ghost button in the Vault hero (+ **`D`** hotkey) starts a ~15-waypoint guided journey. A pulsing
**spotlight** halo + dim scrim + caption bubble marks the next click-target; the presenter's **real click** advances the
pointer (nothing auto-navigates between phases). A **cursor FX** layer trails the real pointer with a glow dot + click
ripples. A floating **HUD** (bottom-center) shows `waypoint x/15`, a **speed slider 0.5×–2×** that writes the global
`--speed-mult` CSS var live (JS timers use a `dur(ms)` helper), pause/resume, and exit. Keys: **Space** pause, **[** / **]**
speed, **Esc** exit. State is `sessionStorage`-backed; `?reset` clears it. Hidden from print.

## Fusion Vault 3D (`/`, v6a)
The Vault landing IS a **react-three-fiber** world (code-split, lazy-loaded — console routes never pay for it). A dark
void with fog + star-dust holds three **CaseIslands**; each is a vertical **strata stack**: **S1 Evidence Lake** (instanced
sealed-batch blocks, hover for hash chip) → **S2 Vector Constellation** (2,000-point cloud, modality-hued, materialize-from-lake)
→ **S3 Knowledge Graph** (collapsed disc → expand-in-place 3D layout, "Open full explorer ↗" deep-links to `/graph?from=vault`)
→ **S4 Intelligence Crown** (risk dial + lead pins + report gem). A **CameraRig** flies between named poses
(P0 overview · P1 case · P2 lake · P3 constellation · P4 graph · P5 crown), damped/bounded, double-click to re-frame.
**Ask-the-Vault** is a docked drawer mounting the *same* `AskConversation` engine as `/ask`; on query the camera flies to
P3, the top-k constellation points flare white and fly to the drawer as citation chips. A 2D **HUD** overlay carries search,
case mini-rail (click = camera flight), ⊕ New Case, ▶ Demo, stratum breadcrumbs, and the vault-integrity chip.
- **Fallback:** `?flat` or no-WebGL renders the original 2D card grid (`VaultFlat`) unchanged.
- Reduced-motion: camera **cuts** instead of flights, no bloom, static points. All numbers from `canon.js`; Demo Mode
  waypoints and `?reset` work in both 3D and `?flat` modes. Genesis seal → the new island **rises from the void**.
- Prebuilt deterministic datasets live in `public/vault-data/` (generator: `tools/gen-vault-data.mjs`).

---

## Suggested demo-video click-path (~2 min, vault-first)
1. **Case Vault (3D)** — land in the Fusion Vault world; point at the three case islands + strata. Click **⊕ New Case** *(or **▶ Demo**)*. *(Append `?flat` for the 2D grid fallback.)*
2. **Genesis · Acquire** — the **Local** modality is open; **drag the "Seizure bundle" chip into the dropzone** (seals SHA-256 onto all 3 forensic images) → **Begin Ingestion**.
3. **Genesis · Process** — watch the 5-node pipeline auto-run (~8s): counters tick to 480,231, GPUs flicker, log scrolls; it auto-advances.
4. **Genesis · AI Core** — the engine-room pass auto-runs (~7s): the 4 inference lanes light **A → B → C → D**, counters spin, the **Verifier Agent** seals the batch; it auto-advances.
5. **Genesis · Analyze** — one glance: "480,231 / 480,231 sealed · chain of custody UNBROKEN", stat cards, and the **living architecture** pulse. Click **Create Case Vault**.
6. **Genesis · Seal** — the number **slot-machines to KP-2026-0417**; type **Operation Sentinel** and click **Seal into Vault** (lock ceremony).
7. **Case Vault** — the **Operation Sentinel** card materializes with **"Sealed just now"**. Click it → console **Dashboard**.
8. **Case Dashboard** — KPIs: *480,231 files triaged in 47 min, 312 flagged, 14 high-risk, 3 synthetic.* Live feed, ticking ingest, count-up donut.
9. **Visual Triage** — green **"AI reduced human review by 91%"** banner; toggle **Grad-CAM**; open the **Needs Review** filter (self-flagged 61.7% / 64.3%).
10. **AI Core** *(differentiator)* — the observatory: router → 4 lanes → **Verifier Agent** (gold). Open an engine drawer (spec + sample artifact), then **Trace a Specimen — Follow FILE-2291** → amber particle A1→A2→A3→A4→D1→D4 → court-exhibit chip.
11. **Ask AEGIS** *(centerpiece)* — click *"Summarize what we know about Subject-B"*: the **agent trace** (Cypher + ms) plays, answer streams, citations + **ECS** stamp; then *"Is there any financial link…"* **reveals Subject-C**.
12. **Entity Graph** — **Run GNN Link Prediction** → spinner → 3 dashed edges (0.89/0.84/0.77) + **Subject-C pulses** + toast.
11. **Synthetic → Risk Queue → Court Report** — Re-analyze verdict 98.2%; SLA-escalated lead; **Generate report** → paper §63 cert + "HERAM 41/42".
12. **Close:** *"Victim safeguarded in 72 hours vs a typical 9 months."* Use `?reset` before the next take.

### The 7 Laws of the illusion (implemented)
Nothing is instant (staged latency everywhere) · never 100% confident (calibrated decimals, uncertainty) ·
always cite (resolvable citation chips) · show the work (agent-trace drawer + Cypher) · imperfection sells
(self-flagged review items + excluded sentence) · live-system ambience (rolling feed, relative time, ticking
ingest) · deterministic theater (chip/button-driven, one canned answer each).

---

## Project structure
```
src/
  data/canon.js            # canonical numbers — single source of truth (zero drift)
  data/mockData.js         # synthetic dataset (derives numbers from canon.js)
  data/aicore.js           # AI Core lanes/engines + model registry + trace stops
  data/demoWaypoints.js    # Demo Mode guided-journey waypoints
  lib/speed.js             # global speed engine: --speed-mult + dur(ms) helper
  lib/webgl.js             # WebGL feature detect (3D vault → flat fallback)
  store/caseStore.js       # sessionStorage-backed active/created case (Genesis)
  store/demoStore.js       # sessionStorage-backed demo state {on,waypoint,speed,cursorFx,paused}
  components/
    Layout.jsx             # status bar + grouped sidebar + active-case chip
    DemoMode.jsx           # spotlight + cursor FX + speed HUD overlay
    ask/AskConversation.jsx    # shared RAG chat engine (used by /ask AND Ask-the-Vault)
    aicore/Observatory.jsx # engine-room canvas (full + compact) + trace + drawer
    aicore/SampleArtifact.jsx  # mock SVG/CSS artifacts for engine drawers
    vault3d/               # Fusion Vault 3D world (lazy-loaded, r3f)
      Vault3D.jsx  VaultWorld.jsx  VaultHud.jsx  AskVaultDrawer.jsx
      CaseIsland.jsx  CameraRig.jsx  Void.jsx  poses.js
      strata/  Lake.jsx  Constellation.jsx  Graph3D.jsx  Crown.jsx
    ui.jsx                 # KpiCard, badges, PageHeader, sparkline, doc-title hook
    ErrorBoundary.jsx      # styled per-route fallback
  pages/
    VaultFlat.jsx  Genesis.jsx  AiCore.jsx
    genesis/  Stepper.jsx  Acquire.jsx  Process.jsx  AiCorePass.jsx  Analyze.jsx  Seal.jsx
    Dashboard.jsx  VisualTriage.jsx  EntityGraph.jsx  Timeline.jsx
    AskAegis.jsx   SyntheticDetection.jsx  RiskQueue.jsx  CourtReport.jsx
  styles/  tokens.css  motion.css
public/vault-data/         # precomputed deterministic 3D datasets (constellations, graph3d, lake, threads)
```

Top status bar (all pages): **AIR-GAPPED • SOVEREIGN • Chain-of-Custody: VERIFIED • Enclave Attestation ✓**.
