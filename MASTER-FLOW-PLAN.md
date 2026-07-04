# AEGIS-X — MASTER FLOW PLAN (v5 target)
> The single source of truth for how EVERY phase chains together.
> Status: PLANNING ONLY — no build until v3 (premium) + v4 (Genesis) land and are audited against this plan.
> Companions: DESIGN-SYSTEM.md (tokens) · GENESIS-FLOW.md (v4 spec) · DEMO-ILLUSION.md (mock laws) · VISION-AEGIS-X.md (story)

---

## 1. Complete Information Architecture (the one true chain)

```
                                   ┌──────────────────────────────────────────────┐
                                   │                CASE VAULT  (/)               │
                                   │  cards: Sentinel(active) + 2 dressing cases  │
                                   │  CTAs: ⊕ New Case · ▶ Demo Mode · open case  │
                                   └───────┬──────────────────────────┬───────────┘
                                           │ ⊕ New Case               │ open case
                                           ▼                          ▼
        ┌──────────────────────── GENESIS WIZARD (/genesis) ─────┐   CONSOLE (9 pages)
        │ 01 ACQUIRE   → 02 PROCESS → 02b AI CORE → 03 ANALYZE   │   ├ Dashboard
        │ (4 modality     (5-stage     (engine-room  (integrity  │   ├ Visual Triage
        │  cards)          pipeline)    pass, 7s)     report)    │   ├ Entity Graph
        │                                                        │   ├ Timeline
        │              04 SEAL (name case → vault ceremony) ─────┼──▶├ Ask AEGIS
        └────────────────────────────────────────────────────────┘   ├ Synthetic Detection
                                                                      ├ AI Core ★NEW page
                                                                      ├ Risk Queue
                                                                      └ Court Report
```

**Nav order (sidebar):** OVERVIEW: Case Vault, Case Dashboard · INVESTIGATE: Visual Triage, Entity Graph, Timeline · INTELLIGENCE: Ask AEGIS, AI Core ★, Synthetic Detection · ACTION: Risk Queue, Court Report. Kbd 0–9.

## 2. Canonical Data Contract (kills cross-phase misalignment)
ONE constants module `src/data/canon.js` (extend mockData.js — do NOT duplicate values anywhere):
```
volume 2.4 TB · files 480,231 · disposed 78.2% (375,541 never seen) · toAI 21.1%
flagged 312 (A41/B88/C183) · highRisk 14 · synthetic 3 · entities 38 · subjects 3
leads 8 · triage 47 min · reduction 91% · report 41/42 grounded · ECS gate ≥ 0.85
case: KP-2026-0417 · devices: DEV-01/02/03 (214,880 / 198,432 / 66,919 files)
```
RULE: every page/phase imports from canon; a judge cross-checking any number across Genesis → Engine Room → Console → Report must find it identical. Add a `canon.test` sanity list in README.

## 3. AI CORE — "Engine Room" (final locked spec)

### 3a. Console page (/aicore) — the deep-dive
Layout: full-bleed observatory canvas + right Model Registry rail.
- **Enclave header strip:** `NVIDIA CC-mode · gpu-01 82% · gpu-02 64% · Attestation ✓ 0x7f3a… · air-gapped`.
- **Router node** (left): artifacts enter; particles colored by modality — cyan image / indigo text / amber event — visibly split into lanes.
- **Lane A · VISUAL:** A1 Known-Hash Prefilter (PhotoDNA+ProjectVIC · "78.2% auto-disposed") → A2 Hybrid Classifier (ConvNeXt-T+Swin-T · 89M params · TensorRT INT8 · v2.4.1 · Grad-CAM) → A3 Human Perception (YOLO-Pose v8.2 + age-KDE · P 0.943/R 0.917) → A4 Synthetic Shield (C2PA→SynthID→DINOv2-G 3-stream · defocus optics).
- **Lane B · LANGUAGE:** B1 OCR (PaddleOCR fork) → B2 NER+coded-lexicon (fine-tuned MiniLM · slang-drift embeddings) → B3 Grooming classifier → B4 Chunk→embed→index (all-MiniLM-L12-v2 → ChromaDB · 4,096-dim).
- **Lane C · TEMPORAL:** C1 Clock-skew/FSA stratigraphy (+00:03:41 corrected) → C2 TAGNN behavior anomaly.
- **Lane D · FUSION (converge):** D1 Entity→KG upsert (Neo4j · 38 entities/91 edges) → D2 TAGNN link-prediction → D3 Composite risk (SAP A–C) → **D4 VERIFIER AGENT (gold node)** — claims in, ✓-sealed claims out, `3 claims re-derived` counter → provenance spine.
- **Engine cards:** duotone icon · name · precise spec chip · live counter/min · utilization ring · 60s sparkline · state glow. Click → elev-3 drawer: 1-line plain-words, spec table, **sample artifact** (Grad-CAM tile / KDE age curve / pose wireframe / cypher snippet / anomaly heatline), quality chips (never round).
- **Model Registry rail:** pinned versions WITH weight SHA-256 per model + "pinned to case KP-2026-0417 — court-reproducible" footer. ★differentiator.
- **Wellbeing meter:** "375,541 files auto-disposed — never seen by a human eye" (heart-pulse).
- **★ TRACE A SPECIMEN:** button "Follow FILE-2291" → canvas dims → one amber particle travels A1→A2→A3→A4→D1→D4 with stamp popovers at each stop (`no-match → Cat-A 96.4% → age 9–12 p.94 → AI-GEN 98.2% → linked Subject-B → sealed ✓`) → ends as court-exhibit chip w/ "view in report" link. 10s, replayable, speed-aware.

### 3b. Genesis pass (stage 02b, ~7s, skippable)
Compressed same visual: 4 lanes as slim rows, engines light A→B→C→D in sequence w/ counters spinning; Verifier flash ends the pass → auto-advance to Analyze. Reuses the same components (props: `compact`).

## 4. DEMO MODE — presenter-driven guided journey
Entry: "▶ Demo" ghost button in Vault hero (+ `D` hotkey).
- **Guided path (9 waypoints):** Vault → New Case → Acquire(local, 3 files) → Begin Ingestion → [Process auto] → [AI Core pass auto] → Analyze → Seal(name input) → Vault card → open case → Dashboard → Ask (chip) → Graph (GNN) → Synthetic → Report (generate). Presenter clicks; nothing auto-navigates BETWEEN phases.
- **Spotlight:** the next click-target gets a soft pulsing halo ring + dim-others scrim (target stays 100%); caption bubble anchored to it ("Next: Begin Ingestion"). Clicking advances the waypoint pointer.
- **Real cursor tracking:** custom cursor layer — a trailing glow dot follows the REAL pointer (mousemove, 60ms lag) + click ripple rings. Makes every recorded click legible. Toggleable.
- **Demo HUD** (floating pill, bottom-center, elev-3): waypoint `4/15` · **speed slider 0.5×–2×** · pause/resume · exit ✕. Keyboard: Space=pause, [ / ]=speed, Esc=exit.
- **Speed engine:** ALL animation durations read a global CSS var `--speed-mult` (JS timers multiply too, via a `dur(ms)` helper). Slider writes the var → whole app slows/accelerates live. This is itself a wow ("watch — I control time").
- Demo state in the same store; `?reset` clears; HUD hidden from print.

## 5. Cross-Phase Continuity Contract (the "chains work crtly" rules)
1. **One store** `src/state/caseStore.js` (sessionStorage-backed): `{ activeCase, vaultCases[], genesisStage, demo: {on, waypoint, speed, cursorFx} }`. Every phase reads/writes ONLY through it.
2. **Shared-axis transitions everywhere:** wizard stages AND route changes: enter-from-right/exit-left 420ms×speed. The app must feel like one continuous machine.
3. **Numbers:** only from canon.js (§2).
4. **Case chip:** console header always shows active case (from store); Vault click sets it; Genesis seal sets it.
5. **Sidebar state:** during /genesis the sidebar is hidden (full-bleed wizard) — chrome returns on console. Vault shows sidebar.
6. **?reset:** clears store + storage → lands on Vault pristine. Single reset path, tested.
7. **Reduced-motion:** every new animation honors it (spotlight becomes static outline; particles become gradients).
8. **No regressions:** v2 theater (agent trace, GNN reveal, Re-analyze, Generate, tickers) must still work INSIDE this chain.

## 6. Phase-by-Phase Deliverable Matrix (final target state)
| # | Phase | Route | Key theater | Built in |
|---|---|---|---|---|
| 0 | Case Vault | / | vault grid, integrity rail, Demo entry | v4 (+v5 demo entry) |
| 1 | Acquire | /genesis#acquire | 4 modalities, explorer, seal chips | v4 |
| 2 | Process | /genesis#process | 5-stage pipeline, particles, 8s | v4 |
| 2b | **AI Core pass** | /genesis#aicore | 4 lanes light up, 7s | **v5** |
| 3 | Analyze | /genesis#analyze | integrity report + living architecture | v4 |
| 4 | Seal | /genesis#seal | number mint, name input, lock ceremony | v4 |
| 5 | Console ×8 | /dashboard… | existing v2/v3 theater | v2/v3 |
| 5b | **AI Core page** | /aicore | observatory + registry + Trace-a-Specimen | **v5** |
| 6 | **Demo Mode** | overlay | spotlight, cursor FX, speed HUD | **v5** |

## 6b. FUSION VAULT 3D (v6) — see FUSION-VAULT-3D.md
The Vault becomes one continuous react-three-fiber world: strata stacks per case (Evidence Lake → Vector Constellation → Knowledge Graph → Intelligence Crown), Ask-the-Vault RAG retrieval animated on the constellation, cross-case GNN fusion threads between islands, risk-proof chips, universal Artifact Inspector, cinematic strata→report dive. v4's 2D vault grid becomes the no-WebGL/`?flat` fallback. LOCKED with user 2026-07-04.

## 7. Execution Protocol (agreed with user)
1. ⏸ WAIT: v3 (premium elevation) + v4 (Genesis) complete — proto-builder pipeline.
2. 🔍 AUDIT: full Playwright screenshot pass of every route; verify v3 checklist + v4 acceptance; diff against THIS plan + FUSION-VAULT-3D.md; list misalignments (expected: route/nav conflicts, canon drift, transition inconsistencies, stage numbering w/o 02b, vault-grid vs 3D-world divergence).
3. 📋 RECONCILE: write the misalignment fix-list; get user sign-off.
4. 🔨 BUILD (iterative, NOT one dispatch): v5a AI Core page+pass → v5b Demo Mode → v6a Vault 3D world (strata + constellation + Ask drawer) → v6b Fusion threads + risk proofs + Inspector → v6c report dive — each step audited before the next.
5. ✅ VERIFY: rebuild audit, canon cross-check, 2:00 dry-run click-path.
