# AEGIS-X — Shot List & Recording Checklist · **STRICT 2:00 cut**
### "Operation Sentinel" · HACK-KP 2026 · practical production guide

> Goal: an exactly **2:00** screen-recording + motion-graphic cut, assembled in a free editor, captioned, exported for submission.
> Prototype runs locally (air-gapped). **Use the production build:** `npm run build` → `npm run preview` → http://localhost:4173.
> **Between every take, append `?reset`** (e.g. `http://localhost:4173/?reset`) — this also clears the created Genesis case. All data fictional.

---

## 1. Screen-Recorder Setup (OBS Studio — free)

| Setting | Value | Why |
|---------|-------|-----|
| Base + Output resolution | 1920×1080 | 16:9 standard |
| FPS | **60** | Smooth Genesis particle conduit, spinners, counters |
| Encoder | x264 / NVENC | Reliable |
| Rate control | CBR, **16–20 Mbps** | Clean for re-encode |
| Recording format | MKV (remux to MP4) | Crash-safe |
| Capture source | **Window Capture** (browser) | No stray notifications |

**Cursor emphasis:** Windows **PowerToys → Mouse utilities** — *Find My Mouse* + *Mouse Highlighter* (click ripple cyan `#22d3ee`). Enlarge cursor size ~2, custom cyan.

**Pre-record hygiene:**
- [ ] Display scaling **100%**; browser zoom **100%**; **F11 full-screen**.
- [ ] Do-Not-Disturb ON; close chat apps; silence phone.
- [ ] Run **production build** (`npm run preview`), not dev server.
- [ ] `http://localhost:4173/?reset` before every take.
- [ ] Reduced-motion OFF (so Genesis particle/pulse animations play).
- [ ] ~2s idle handles head/tail of each clip.

---

## 2. Exact Click-Path (record per-scene; `?reset` between takes)

**Scene 3 — Case Vault → New Case** (`/`)
1. Open on the Vault (Sentinel/Harbor Watch/Night Courier cards + integrity rail).
2. Click **⊕ New Case** → shared-axis slide into Genesis.

**Scene 4 — Genesis: Acquire** (`/genesis`)
1. Select the **Local / Forensic Image** card (`HardDrives` duotone).
2. In the explorer, check all **3 files** (PhoneA_fullfs.ufdr, LaptopB_disk.E01, SSD_C_image.dd).
3. **Drag one file into the dropzone** to trigger the SHA-256 hash-chip seal animation; confirm **WRITE-BLOCKER: ACTIVE**.
4. Click **Begin Ingestion →**. (≈4 clicks total.)

**Scene 5 — Genesis: Process** (auto-run ~8s)
1. Let the 5-stage pipeline auto-play (do not touch). Counter climbs to 480,231; GPU chips flicker; micro-log scrolls; green wash on completion.
2. Record the FULL real run clean — speed-ramps are added in edit (see §4). Do **not** click "Skip".

**Scene 6 — Genesis: Integrity** (auto ~6s)
1. Let the report cards cascade in; the living-architecture path pulses.
2. Hold on the green **custody UNBROKEN** banner ~1s.

**Scene 7 — Genesis: Seal** (~6s)
1. Let the case number settle to **KP-2026-0417**.
2. In the single input, **type "Operation Sentinel"** (the ONLY typing in the whole demo — type cleanly, no backspaces).
3. Click **Seal into Vault** → padlock lock-close + particle burst + toast.
4. Let the new card materialize in the Vault; **click it** → Console Dashboard.

**Scene 8 — Console: Dashboard** (`/`, 5s)
1. Let KPIs read (312 / 14 / 3, 47 min); hold ~3s so the live feed scrolls + ingest ticks. Do NOT open Risk Queue (VO mentions it only).

**Scene 9 — Ask AEGIS · CENTERPIECE** (`/ask`, 15s)
1. Click chip **"Summarize what we know about Subject-B."** (never free-type).
2. **Let the agent-trace drawer populate row-by-row; hold 6–7s on the Cypher + ms timings.**
3. Let the answer stream; wait for citation chips + **ECS badge**.

**Scene 10 — Entity Graph GNN · MONEY SHOT** (`/graph`, 15s)
1. Click **Entity Graph** — confirmed entities only.
2. Move cursor to **Run GNN Link Prediction**; **pause ~1.5s** (narration silent).
3. Click → let the **1.8s spinner** run (don't move the mouse) → 3 dashed edges (0.89/0.84/0.77) → **Subject-C ignites amber** → toast.
4. Click **Subject-C** → detail panel. Hold 2s.

**Scene 11 — Synthetic Detection** (`/synthetic`, 8s)
1. Click **Re-analyze** → let all 4 stages play → verdict **counts to 98.2% → AI-GENERATED**. Hold 1s.

**Scene 12 — Court Report** (`/report`, 12s)
1. Click **Generate report** → ~2.5s assembly → wait for **"41/42 statements grounded."**
2. Scroll to SHA-256 manifest + **BSA §63** cert + ECS stamp; let the seal stamp on. Hold 2s.

---

## 3. Motion-Graphic Scenes (not screen recording)
Build Scenes **1–2, 13–15** in Canva / Clipchamp / After Effects / DaVinci Fusion:
- [ ] Hook A: device stack + 480,231 counter + "2.4 TB" (S1).
- [ ] Hook B: "9 MONTHS" / "Children can't wait" (S2).
- [ ] Impact: "Safeguarded" banner + 3 stat cards — 91% ↓ / 47 min vs 9 months / Safeguarded (S13).
- [ ] Network: **federation globe** with "gradients only — data never moves" (S14).
- [ ] Close: **AEGIS-X** logo + tagline end card + fictional-data footer (S15).
- Export each 1920×1080, 60fps, alpha where overlaid.

---

## 4. Speed-Ramp & Edit Instructions for the AUTO-RUN Genesis stages
The Genesis auto-run stages are recorded at real speed, then compressed in edit to hit the 30s Genesis budget while feeling kinetic:

- **Process pipeline (S5, real ~8s → cut ~8s with energy):** apply **two speed-ramps**:
  - Ramp 1: after the first stage node lights, ramp **1× → 2.5×** through the middle stages (Hashing → VICS → Metadata) — the counter blurs upward.
  - Ramp 2: as the pipeline nears 100%, ramp **2.5× → 1×** so the **green completion wash lands at normal speed** (satisfying beat).
  - Use *Optical Flow* / frame-blend for smooth ramps; keep the counter legible at the ramp-out.
- **Integrity cascade (S6, if long):** optional single ramp **1× → 1.8×** through the card cascade, back to 1× on the integrity banner.
- **Acquire (S4):** keep at 1× (clicks + the hash-chip seal must read clearly).
- **Seal (S7):** keep the **lock-close at 1×** (payoff beat) — only speed-ramp any dead air before/after.
- **General:** trim each Genesis clip tight; use the shared-axis slide transitions as ramp cover; align the ramp-outs to musical hits.
- If over budget, use each stage's **"Skip →"** control while recording a backup take to shorten a stage further — but the ramped full-run reads better than a hard skip.

---

## 5. Retake Tips
- **Cursor jitter?** Re-take — steadiness sells competence.
- **Animation didn't fire** (hash seal, GNN spinner, counter, assembly)? Reload with `?reset`, re-roll — never fake beyond trimming.
- **Typo in the case name?** Re-take Scene 7 — it's the only text on screen, it must be clean.
- **Accidental raw/un-blurred content:** discard immediately — non-negotiable.
- **Shoot the two hero beats 3–4×** (Ask AEGIS trace, GNN reveal); keep the calmest. Keep the GNN spinner silent in the VO.
- Label clips `S05_process_take2.mkv`, `S10_gnn_take3.mkv`. ~2s handles each.

---

## 6. Assembly Checklist (CapCut / DaVinci Resolve / Clipchamp)

**Timeline**
- [ ] 1920×1080 @ 60fps, Rec.709. Import clips + motion-graphics + VO + music.
- [ ] VO on A1; music on A2 (duck −12 dB under VO). **Automate music near-silent under the S10 spinner.**

**Edit**
- [ ] Order S1→S15; trim to the script time column; **verify total = 2:00 exactly**.
- [ ] Apply Genesis speed-ramps per §4.
- [ ] Transitions: dissolves; whip S2→S3; shared-axis slides across Genesis (S3–S7); radial iris S9→S10; seal wipe S12→S13.
- [ ] Punch-ins: hash-chip seal (S4), padlock (S7), Cypher/ms-timings (S9), Subject-C ignition (S10), verdict counter (S11), "41/42 grounded" + §63 (S12).
- [ ] SFX: hash-seal ticks (S4), riser (S5), lock-close chord (S7), data texture (S9), **discovery sting on Subject-C** (S10), verdict stamp (S11), seal (S12), final chime (S15).

**Captions**
- [ ] Auto-generate from VO, then **proofread every line** against `voiceover-only.txt`.
- [ ] Bottom-center, Inter/system-ui, white on 70% black box, ~42px, max 2 lines.
- [ ] Lower-third at 0:06: "All case data, names, and media are fictional and synthetic."
- [ ] Captions never cover KPI numbers, Cypher, the seal ceremony, verdict stamp, or the toast.

**QA**
- [ ] Watch **muted** — story readable via visuals + captions?
- [ ] Watch **eyes-closed** — VO alone makes sense?
- [ ] **Runtime EXACTLY 2:00.**
- [ ] **No** raw/graphic content; all tiles blurred; Minor-V1 never depicted.
- [ ] Rebrand check: product name is **AEGIS-X** everywhere (except the module label "Ask AEGIS").
- [ ] Fictional-data disclaimers present (0:06 + end card).
- [ ] Audio: peaks ≤ −3 dBFS; VO ~ −16 LUFS integrated.

---

## 7. Export Settings (submission)

| Setting | Value |
|---------|-------|
| Container | **MP4 (H.264)** |
| Resolution | 1920×1080 |
| Frame rate | 60 fps (30 if capped) |
| Bitrate | 12–16 Mbps (VBR 2-pass) / CRF 18 |
| Audio | AAC, 320 kbps, 48 kHz, stereo |
| Loudness | −16 LUFS integrated, true peak ≤ −1 dBTP |
| Captions | Burn-in open captions + sidecar `.srt` if allowed |
| Filename | `AEGIS-X_OperationSentinel_2min_HACKKP2026.mp4` |
| Backup | Keep project file + high-bitrate master |

**Final deliverables:**
- [ ] `AEGIS-X_OperationSentinel_2min_HACKKP2026.mp4`
- [ ] `AEGIS-X_..._captions.srt`
- [ ] `AEGIS-X_..._master.mov`
- [ ] Thumbnail/poster (AEGIS-X logo + tagline).
