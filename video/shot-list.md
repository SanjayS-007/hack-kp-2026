# AEGIS-X — Shot List & Recording Checklist · **STRICT 2:00 cut (vNEXT)**
### "Operation Sentinel" · HACK-KP 2026 · practical production guide

> Goal: an exactly **2:00** screen-recording + motion-graphic cut, assembled in a free editor, captioned, exported for submission.
> Prototype runs locally (air-gapped). **Use the production build:** `npm run build` → `npm run preview` → **http://localhost:4173**.
> **Record with Demo Mode ON** (`▶ Demo` / `D`) so the **spotlight** marks each click-target, **cursor FX** trails every click, and the **speed slider (0.5×–2×)** paces the Genesis auto-runs for a clean recording.
> **Between every take, append `?reset`** (e.g. `http://localhost:4173/?reset`) — clears the created Genesis case, the joint-investigation bridge, and demo state. All data fictional.

---

## 1. Screen-Recorder Setup (OBS Studio — free)

| Setting | Value | Why |
|---------|-------|-----|
| Base + Output resolution | **1920×1080** | 16:9 standard (1080p) |
| FPS | **60** | Smooth 3D camera flights, particle conduit, spinners, counters |
| Encoder | x264 / NVENC (H.264) | Reliable; NVENC frees CPU for the r3f vault |
| Rate control | CBR, **16–20 Mbps** | Clean master for re-encode |
| Recording format | **MKV** (remux to MP4) | Crash-safe |
| Capture source | **Window Capture** (browser) | No stray notifications; the 3D canvas captures cleanly |
| Color space | Rec.709, full range | Matches the navy/cyan palette |

**Cursor emphasis:** the app's own **Demo Mode cursor FX** (glow dot + click ripples) is the primary highlighter — keep it ON. As backup, Windows **PowerToys → Mouse utilities** (*Find My Mouse* + *Mouse Highlighter*, cyan `#22d3ee`), cursor size ~2.

**Pre-record hygiene:**
- [ ] Display scaling **100%**; browser zoom **100%**; **F11 full-screen** (so the 3D vault fills the frame).
- [ ] Do-Not-Disturb ON; close chat apps; silence phone.
- [ ] Run the **production build** (`npm run preview`), not the dev server (avoids HMR/WebGL hiccups).
- [ ] `http://localhost:4173/?reset` before every take.
- [ ] **Reduced-motion OFF** (so camera *flights* play, not cuts; particles/bloom render).
- [ ] **WebGL available** — confirm the 3D vault loads (not the `?flat` fallback). Use `?flat` only for a safety B-roll take.
- [ ] Start **Demo Mode** (`D`); set **speed slider** to taste per stage (see §4); **cursor FX ON**.
- [ ] ~2s idle handles head/tail of each clip.

---

## 2. Exact Click-Path (record per-scene; `?reset` between takes)

**Scene 3 — Fusion Vault 3D → New Case** (`/`)
1. Land in the **3D Fusion Vault** (P0 overview): three case islands + strata + HUD (integrity chip WORM · PQC ✓).
2. Let the camera drift ~2s over the islands.
3. Click **⊕ New Case** (HUD) → shared-axis slide into Genesis. *(Safety B-roll: `http://localhost:4173/?flat` for the 2D grid.)*

**Scene 4 — Genesis: Acquire** (`/genesis`, stage 01)
1. The **Local / Forensic Image** modality is open (`HardDrives` duotone).
2. **Drag the "Seizure bundle" chip into the dropzone** → SHA-256 hash chip seals onto all **3** rows (PhoneA_fullfs.ufdr, LaptopB_disk.E01, SSD_C_image.dd); confirm **WRITE-BLOCKER: ACTIVE**.
3. Click **Begin Ingestion →**. (≈2–3 clicks total; keep the drag smooth.)

**Scene 5 — Genesis: Process** (stage 02, auto-run ~8s)
1. Let the **5-node** pipeline auto-play (do NOT touch). Counter climbs to **480,231**; GPU chips flicker; micro-log scrolls; green wash on completion; auto-advances.
2. Record the FULL real run clean — speed-ramps are added in edit (see §4). Do **not** click **Skip →**.

**Scene 6 — Genesis: AI Core pass** (stage 02b, auto-run ~7s)
1. Let the **4 lanes light A → B → C → D**; counters spin; the **Verifier Agent (gold)** seals the batch; auto-advances.
2. Record the full run clean (ramp in edit). Do **not** Skip.

**Scene 7 — Genesis: Analyze** (stage 03, auto ~4s)
1. Let the report cards cascade; the **living-architecture** path pulses once.
2. Hold on the green **custody UNBROKEN** banner ~1s. Click **Create Case Vault** (advance to Seal).

**Scene 8 — Genesis: Seal → island rises** (stage 04, ~8s)
1. Let the case number settle to **KP-2026-0417**.
2. In the single input, **type "Operation Sentinel"** (the ONLY typing in the whole demo — clean, no backspaces).
3. Click **Seal into Vault** → padlock lock-close + particle burst + toast.
4. **Stay recording** — the flow cuts to the 3D vault where the **new island RISES from the void**; let it assemble ~2s.

**Scene 9 — Strata focus** (`/`, ~3s)
1. The camera flies to the new **Operation Sentinel** island (pose **P1**); the **Ask-the-Vault** drawer is docked. Let it settle.

**Scene 10 — Ask-the-Vault probe · HERO** (`/`, ~7s)
1. In the Ask-the-Vault drawer, click the chip **"Summarize what we know about Subject-B."** (never free-type).
2. **Do not move the mouse** — the camera flies to **P3**; the **probe ray → radial pulse → top-12 points flare white → citations fly to the drawer** (~3.5s). Let the answer stream with the **ECS** badge.

**Scene 11 — Fusion threads → joint investigation** (`/`, ~7s)
1. Trigger **Fusion View** (HUD toggle) or scroll-out → camera pulls to **P0**; other islands rise.
2. Click the **gold thread** (Sentinel ↔ Harbor Watch, **0.91 shared wallet**) → evidence-pair panel.
3. Click **"Propose joint investigation"** → confirm → **JOINT-2026-0091** banner + luminous bridge. Hold 1s.

**Scene 12 — Crown risk dial → proof chips** (`/`, ~5s)
1. Camera to the **Crown** (P5). Click the **risk dial** → **Risk Proof panel** (composite 97).
2. Click across the **4 proof chips** (content/behavior/network/recency) — each flashes its stratum evidence. Keep it brisk.

**Scene 13 — Compile dive begins** (`/`, ~3s)
1. Click **"Compile Case Report"** → HUD fades; camera climbs and begins the **vertical dive**. **Keep recording continuously into Scene 14.**

**Scene 14 — Dive lands · report assembles · SILENCE** (`/report`, ~5s)
1. The dive falls S4→S3→S2→S1; **9 citation chips stream** and land into the assembling **Court Report**.
2. Let sections cascade **§1→§11**; **§63** stamps; ECS footer **41/42 grounded · 1 excluded**. **Hold ~2s (VO silent).**

**Scene 15 — Proof tree · E-114** (`/report`, ~4s)
1. The **E-114 proof-tree** accordion auto-opens (or click it): `Claim → POCSO §14/§15 → Evidence ID → SHA-256 ✓ → XAI ref`. Slow push-in.

**Scene 16 — §63 cert · Sign & Seal** (`/report`, ~5s)
1. Scroll to **Appendix C — ECS audit**; rest 1s on the **red-struck** excluded statement (`0.71 < 0.85`).
2. Scroll to **BSA 2023 §63** dual-part cert. Click **Sign & Seal** → signature type-in animation.

**Scene 17 — Chain closes · gem GREEN** (`/report` → `/`, ~6s)
1. Watch the **DRAFT** watermark **dissolve**; toast `Report sealed · hash anchored`.
2. Cut/return to the vault Crown — the **status gem flips GREEN**. Hold on the closed-chain frame ~2s.

**Scene 18 — Depth: Triage Grad-CAM** (`/triage`, ~4s)
1. Glide across the **duotone** tiles; toggle **Grad-CAM** on one; rest on the **91% wellbeing** banner. Badges/overlay only.

**Scene 19 — Depth: agent trace** (`/ask`, ~4s)
1. Click chip **"Summarize what we know about Subject-B."**; let the **agent-trace drawer** tick (Plan → **Cypher** → Vector → Vision → **Verifier** → ECS). Quick push on the Cypher + ms timings.

**Scene 20 — Depth: GNN reveal · MONEY SHOT · SILENCE** (`/graph`, ~8s)
1. Click **Entity Graph** — confirmed entities only.
2. Move cursor to **Run GNN Link Prediction**; **pause ~1.5s** (narration silent).
3. Click → let the **~1.8s spinner** run (don't move the mouse) → **3 dashed edges** (0.89/0.84/0.77) → **Subject-C ignites amber** → toast.
4. Click **Subject-C** → detail panel. Hold 1–2s.

**Scene 21 — Depth: synthetic verdict** (`/synthetic`, ~4s)
1. Click **Re-analyze** → let the **3-stream** pipeline + A/V matrix play → verdict **counts to 98.2% → AI-GENERATED**. Hold 1s.

**Scene 22 — Depth: AI Core wellbeing + Trace-a-Specimen** (`/aicore`, ~5s)
1. Wide on the observatory; punch on the **Verifier Agent (gold node)**; rest on the wellbeing meter **"375,541 files auto-disposed — never seen by a human eye"**.
2. Click **★ Trace a Specimen — Follow FILE-2291** → amber particle A1→A2→A3→A4→D1→D4 → court-exhibit chip.

---

## 3. Motion-Graphic Scenes (not screen recording)
Build Scenes **1–2, 23–25** in Canva / Clipchamp / DaVinci Fusion / After Effects:
- [ ] Hook A: device stack + **480,231** counter + "2.4 TB" (S1).
- [ ] Hook B: "9 MONTHS" → "→ **47 MIN**" + AEGIS-X title card (S2).
- [ ] Impact: "Safeguarded" banner + 3 stat cards — 91% ↓ / 47 min vs 9 months / Safeguarded (S23).
- [ ] Network: **federation globe** with "gradients only — data never moves" (S24).
- [ ] Close: **AEGIS-X** logo + tagline end card + fictional-data footer (S25).
- Export each 1920×1080, 60fps, alpha where overlaid.

---

## 4. Speed-Ramp & Edit Instructions for the AUTO-RUN Genesis stages
The Genesis auto-runs are recorded at real speed (use **Demo Mode's speed slider** to pre-pace them cleanly), then compressed in edit to hit the **27s Genesis budget** while staying kinetic.

- **Recording pace (Demo Mode speed slider 0.5×–2×):** for a *steady, legible* capture set the slider to **~0.75×–1×** on Process/AI-Core so counters and lane-lights read clearly on camera; then do the time-compression in edit (below). Avoid recording at 2× — it looks jittery; ramp in post instead.
- **Process pipeline (S5, real ~8s → cut ~4s):** apply **two speed-ramps**:
  - Ramp 1: after the first stage node lights, ramp **1× → 2.5×** through the middle stages (Hashing → VICS → Metadata) — the counter blurs upward.
  - Ramp 2: as the pipeline nears 100%, ramp **2.5× → 1×** so the **green completion wash lands at normal speed** (satisfying beat).
  - Use *Optical Flow* / frame-blend for smooth ramps; keep the counter legible at the ramp-out.
- **AI Core pass (S6, real ~7s → cut ~5s):** single ramp **1× → 2×** across the A→B→C→D lane-lighting, **ramp back to 1× on the Verifier gold-node seal** (the confident beat). Keep the gold node crisp.
- **Analyze cascade (S7, if long):** optional single ramp **1× → 1.8×** through the card cascade, back to 1× on the integrity banner.
- **Acquire (S4):** keep at **1×** (the drag-drop + hash-chip seal must read clearly).
- **Seal (S8):** keep the **lock-close AND the island-rise at 1×** (payoff beats) — only speed-ramp any dead air.
- **Compile-Report dive (S13–S14):** keep at **1×** — it's a hero beat; do not ramp. If the record is slightly long, trim the top of the climb, never the strata pass.
- **General:** trim each Genesis clip tight; use the shared-axis slides / camera flights as ramp cover; align ramp-outs to musical hits.
- If a stage is still over budget, use its **Skip →** control on a backup take — but the ramped full-run reads better than a hard skip.

---

## 5. Retake Tips
- **Cursor jitter?** Re-take — steadiness sells competence. Demo Mode cursor FX makes clicks legible; don't fight it.
- **Camera flight didn't play** (rendered a cut)? Reduced-motion is ON, or you're in `?flat` — disable reduced-motion / confirm WebGL, reload with `?reset`.
- **Animation didn't fire** (hash seal, probe/citations, GNN spinner, counters, dive, gem flip)? Reload `?reset`, re-roll — never fake beyond trimming.
- **Typo in the case name?** Re-take Scene 8 — it's the only text on screen, it must be clean.
- **Accidental raw/un-blurred content:** discard immediately — non-negotiable. Tiles must stay desaturated duotone.
- **Shoot the three hero beats 3–4×** (Ask-the-Vault probe S10, Compile-dive S14, GNN reveal S20); keep the calmest. Keep **S14 and S20 silent** in the VO.
- Label clips `S05_process_take2.mkv`, `S14_dive_take3.mkv`, `S20_gnn_take3.mkv`. ~2s handles each.

---

## 6. Assembly Checklist (CapCut / DaVinci Resolve / Clipchamp)

**Timeline**
- [ ] 1920×1080 @ 60fps, Rec.709. Import clips + motion-graphics + VO + music.
- [ ] VO on A1; music on A2 (duck −12 dB under VO). **Automate music near-silent under the S14 report dive AND the S20 GNN spinner.**

**Edit**
- [ ] Order S1→S25; trim to the script time column; **verify total = 2:00 exactly** (Hook 8 · Genesis 27 · Fusion 25 · Report 20 · Depth 25 · Close 15).
- [ ] Apply Genesis speed-ramps per §4 (Process S5, AI Core S6). Keep S13–S14 dive at 1×.
- [ ] Transitions: dissolves; whip S2→S3; shared-axis slides across Genesis (S3–S8); **continuous camera** S8→S9→…→S14 (island-rise → strata → dive → report — do not hard-cut the dive); hard cuts across the depth flash (S18–S22); cross-dissolve S22→S23.
- [ ] Punch-ins: hash-chip seal (S4), Verifier gold node (S6), padlock + island-rise (S8), citations-land + ECS (S10), JOINT-2026-0091 banner (S11), proof chips (S12), E-114 proof tree (S15), red-struck ECS line + §63 (S16), **gem flip GREEN** (S17), Cypher (S19), **Subject-C ignition** (S20), verdict counter (S21), wellbeing meter (S22).
- [ ] SFX: hash-seal ticks (S4), riser (S5), Verifier tick (S6), lock-close chord + island-rise swell (S8), citation chimes (S10), bridge-tie (S11), paper-settle whoosh (S14), pen-stroke (S16), seal + gem chime (S17), **discovery sting on Subject-C** (S20), verdict stamp (S21), final chime (S25).

**Captions**
- [ ] Auto-generate from VO, then **proofread every line** against `voiceover-only.txt`.
- [ ] Bottom-center, Inter/system-ui, white on 70% black box, ~42px, max 2 lines.
- [ ] Lower-third at 0:04: "All case data, names, and media are fictional and synthetic."
- [ ] Captions never cover KPI numbers, the Cypher, the strata dive, the seal ceremony, the verdict stamp, or the JOINT/gem toasts.
- [ ] Keep the **two silence beats caption-light** — a single on-screen label ("Distilling into testimony" / "Running link prediction…") is enough; let the visuals breathe.

**QA**
- [ ] Watch **muted** — story readable via visuals + captions?
- [ ] Watch **eyes-closed** — VO alone makes sense?
- [ ] **Runtime EXACTLY 2:00.**
- [ ] **No** raw/graphic content; all tiles desaturated duotone; **Minor-V1 never depicted** (labeled node only).
- [ ] Rebrand check: product name is **AEGIS-X** everywhere (module label "Ask AEGIS" is fine).
- [ ] Fictional-data disclaimers present (0:04 lower-third + end card).
- [ ] The **federation line** closes the film verbatim: *"…and every deployment makes every other agency stronger — without a single file leaving home."*
- [ ] Audio: peaks ≤ −3 dBFS; VO ~ −16 LUFS integrated.

---

## 7. Export Settings (submission)

| Setting | Value |
|---------|-------|
| Container | **MP4 (H.264)** |
| Resolution | **1920×1080 (1080p)** |
| Frame rate | **60 fps** (30 if capped) |
| Bitrate | 12–16 Mbps (VBR 2-pass) / CRF 18 |
| Audio | AAC, 320 kbps, 48 kHz, stereo |
| Loudness | −16 LUFS integrated, true peak ≤ −1 dBTP |
| Captions | Burn-in open captions + sidecar `.srt` if allowed |
| Filename | `AEGIS-X_OperationSentinel_2min_HACKKP2026.mp4` |
| Backup | Keep project file + high-bitrate MKV/MOV master |

**Final deliverables:**
- [ ] `AEGIS-X_OperationSentinel_2min_HACKKP2026.mp4`
- [ ] `AEGIS-X_..._captions.srt`
- [ ] `AEGIS-X_..._master.mov` (or MKV)
- [ ] Thumbnail/poster (AEGIS-X logo + tagline + a 3D-vault frame).
