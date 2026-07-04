# AEGIS-X — "Case Genesis" Flow Spec (v4)
> Vault-first lifecycle: **Vault → New Case → Acquire → Process → Analyze → Seal → Console**
> Constraint: demo video is 2:00 total — Genesis gets ~25–30s of the cut. Everything auto-runs FAST, with a subtle "Skip →" control. All timings below are real-app timings tuned for recording.
> Build on top of DESIGN-SYSTEM.md tokens (v3). Icons: Lucide for UI chrome, **Phosphor duotone** (`@phosphor-icons/react`, weight="duotone") for the 4 intake modality heroes.

## 0. Routing restructure
- `/` → **Case Vault** (new landing). Sidebar gains "Case Vault" at top (OVERVIEW group).
- `/genesis` → the wizard (4 stages, single route with internal state machine; URL hash per stage for resilience).
- Existing 8 console routes unchanged, but console header shows the active case chip (from vault selection; default Operation Sentinel).
- Op Sentinel pre-seeded in vault as ACTIVE case; a completed case "KP-2026-0311 · Harbor Watch" (CLOSED) and one "KP-2026-0398 · Night Courier" (COURT-READY) as dressing.

## 1. Case Vault (landing)
- Hero strip: "Case Vault" + agency chip + search input (mock) + **"⊕ New Case"** primary CTA (glow hover).
- Case cards (elev-2, hover elev-3): case number mono, name, status chip (ACTIVE cyan / COURT-READY green / CLOSED slate), risk tier dot, mini stats row (files · flagged · devices), last-activity relative time, lock icon watermark. Click Sentinel → console Dashboard.
- Empty right rail: "Vault integrity" card — total cases, storage sealed (WORM), last audit, PQC signature status ✓. Sells the vault concept.

## 2. Genesis Stage 1 — ACQUIRE (target: 8–10s on screen)
Stepper header across top: `01 Acquire → 02 Process → 03 Analyze → 04 Seal` (active step cyan, completed get ✓; connecting line fills as you advance). Subtle "Skip →" ghost button top-right (jumps to next stage instantly; for retakes).

Four modality cards in a 2×2 (or 4-across) grid — each with a **Phosphor duotone hero icon** in a gradient-ring badge, title, one-line description, and "SHA-256 seal at first touch" microcopy. Selecting one expands an inline panel below (260ms spring):

1. **Local / Forensic Image** (`HardDrives` duotone)
   - Mock file explorer: breadcrumb `Evidence Locker ▸ Seizure 2026-06-28`, file rows (`PhoneA_fullfs.ufdr · 812 GB`, `LaptopB_disk.E01 · 1.2 TB`, `SSD_C_image.dd · 410 GB`) with type icons + checkboxes; drag-drop dropzone (dashed border, pulses on hover, drop animation seals a hash chip onto the file row); "Browse…" secondary button; **WRITE-BLOCKER: ACTIVE** green chip.
2. **Network / Remote** (`GlobeHemisphereWest` duotone)
   - URL input with live scheme validation tint; preset chips: `CyberTipline #7714821`, `Warrant return (S3 presigned)`, `Crawl job CR-2216`; Submit → TLS handshake micro-animation (3 dots → lock closes) → source added row.
3. **Live Stream / Field Kit** (`VideoCamera` duotone)
   - Simulated feed panel: animated scanline/noise canvas (CSS/JS generated — NO real webcam), REC dot pulse when started, elapsed timer mono, Start/Stop buttons; "Edge Kit E-KIT-07 · PAIRED ✓" chip; per-segment custody stamps appearing every ~3s below the feed.
4. **Cloud Locker** (`CloudArrowDown` duotone)
   - Provider tiles: Agency MinIO / Cellebrite Cloud / Magnet Locker; click → connect modal mock (spinner 900ms → "Authorized · warrant-scoped" green) → bucket object list with select-all checkbox + total size.

Bottom bar (persistent): selected sources summary chips (e.g., "3 forensic images · 2.4 TB") + **"Begin Ingestion →"** primary CTA (disabled until ≥1 source).
For the demo: presenter selects Local, checks the 3 files, clicks Begin. (~4 clicks.)

## 3. Genesis Stage 2 — PROCESS (auto-run, 8s total, skippable)
Full-width pipeline visualization: 5 stage-nodes connected by a conduit:
`Carving → Hashing → VICS Normalize → Metadata Extract → AI Triage Queue`
- Each node: Phosphor duotone icon, name, live per-stage counter (files/s ticking), state ring (idle → active pulsing cyan → done green ✓). Stages complete sequentially (~1.4s each), slight overlap.
- Conduit: animated particle dots flowing left→right (CSS keyframes, density increases while active; reduced-motion → static gradient).
- Below: overall progress bar (0→100% over 8s, eased, with shimmering head), big mono counter `480,231 files`, throughput sparkline building live, ETA counting down, and a 3-row scrolling micro-log (`sha256 sealed batch #212`, `EXIF extracted: 4,112`, `known-hash match: dedupe 78%`).
- GPU worker chips: `gpu-01 ▮▮▮▮▯ 82%`, `gpu-02 ▮▮▮▯▯ 64%` with subtle activity flicker.
- On completion: whole pipeline flashes a soft green wash → auto-advance (600ms) to Stage 3.

## 4. Genesis Stage 3 — ANALYZE (one glance, 6–8s, skippable)
"Ingestion & Integrity Report" — a results dashboard that assembles with staggered card entrances (80ms cascade):
- **Integrity banner** (full width, green): "480,231 / 480,231 artifacts sealed · SHA-256 + ML-DSA (PQC) · chain of custody UNBROKEN ✓".
- Row of 4 stat cards: Known-hash matched (78.2% · auto-disposed, no human view) / Unknown → AI triage (21.1%) / Synthetic-flagged (3 files) / Metadata completeness (94.6%).
- **File-type donut** (images/videos/chat DBs/docs/system) + **hash-match breakdown bar** + **EXIF/GPS density strip** (mini heat ribbon across a timeline).
- **Living architecture panel** (the wow): compact horizontal recreation of the HLD — `Sources → Ingest/VICS → AI Core → Fusion Graph → Console` as connected node-chips with a light-pulse traveling through the path on loop; the active case's numbers annotate each layer (2.4 TB in → 480k normalized → 312 flagged → 38 entities). Label: "Your evidence just traversed this."
- Bottom bar: **"Create Case Vault →"** primary CTA.

## 5. Genesis Stage 4 — SEAL (the payoff, ~6s)
Centered ceremony card (elev-3):
- Auto-minted case number counting/slot-machine settling to **KP-2026-0417** (mono, large).
- Prefilled metadata grid (read-only, subtle): devices 3 · volume 2.4 TB · files 480,231 · flagged 312 · jurisdiction Regional Cyber Division · investigator #A-2291 · opened <live UTC> · seal SHA-256+ML-DSA.
- ONE input, focused, large: **"Case name"** placeholder "e.g. Operation Sentinel" (presenter types it — the only typing in the whole demo).
- **"Seal into Vault"** button → lock-close animation (Phosphor `Vault`/padlock duotone: shackle drops, ring flashes cyan→green, subtle particle burst; reduced-motion → simple check) → toast "Case sealed · custody chain anchored" → auto-navigate to Vault where the new card materializes with a settle animation → clicking it opens the console (Sentinel data).
- Persist created case in sessionStorage so Vault shows it until `?reset`.

## 6. Console integration
- Sidebar top gains "Case Vault" item; console pages get an active-case chip in the header (case number + name, click → back to vault).
- `?reset` also clears the created case.

## 7. Acceptance checklist
- [ ] All four modalities interactive per spec; explorer drag-drop works with mouse
- [ ] Auto-run timings: Process ≤8s, Analyze cards ≤2s assembly; Skip works at every stage
- [ ] Phosphor duotone installed offline (`@phosphor-icons/react`), heroes look bespoke (gradient ring + glow + duotone)
- [ ] Stepper projection/continuity: every stage transition is a shared-axis slide (enter from right, exit left, 420ms) — feels like ONE continuous machine, not page swaps
- [ ] No real webcam/getUserMedia; no external network calls; all fictional
- [ ] v3 design tokens respected; build passes; no console errors; reduced-motion safe
- [ ] Demo click count Stage 1→4: ≤6 clicks + one text input
