# AEGIS-X — Shot List & Recording Checklist · **STRICT 2:00 cut · v-GOATED**
### "Operation Sentinel" · HACK-KP 2026 · 22-waypoint Demo-Mode capture

> Goal: an exactly **2:00** screen recording + motion-graphic bookends, assembled in a free editor, captioned, exported for submission.
> **Recording method has changed:** you no longer chase a manual click-path. You **start Demo Mode (`D`) and follow the spotlight** through all **22 waypoints** — each real click advances the pointer. The **speed slider** paces the Genesis auto-runs; the **► force-advance** (or `→`) is live-stage insurance if a beat hesitates.
> Prototype runs locally (air-gapped). Use the **production build:** `npm run build` → `npm run preview` → **http://localhost:4173**.
> **Between every take, append `?reset`** (e.g. `http://localhost:4173/?reset`) — clears the created case, the joint-investigation bridge, and demo state. All data fictional.

---

## 1. Screen-Recorder Setup (OBS Studio — free)

| Setting | Value | Why |
|---------|-------|-----|
| Base + Output resolution | **1920×1080** | 16:9 standard (1080p) |
| FPS | **60** | Smooth 3D flights, particle conduit, spinners, counters |
| Encoder | x264 / NVENC (H.264) | Reliable; NVENC frees CPU for the r3f vault |
| Rate control | CBR, **16–20 Mbps** | Clean master for re-encode |
| Recording format | **MKV** (remux to MP4) | Crash-safe |
| Capture source | **Window Capture** (browser) | No stray notifications; the 3D canvas captures cleanly |
| Color space | Rec.709, full range | Matches the navy/cyan palette |

**Cursor emphasis:** Demo Mode's own **spotlight + cursor FX** (glow dot + click ripples) is the primary highlighter — keep it ON. Backup: Windows **PowerToys → Mouse utilities** (cyan `#22d3ee`), cursor size ~2.

**Pre-record hygiene:**
- [ ] Display scaling **100%**; browser zoom **100%**; **F11 full-screen** (the 3D vault fills the frame).
- [ ] Do-Not-Disturb ON; close chat apps; silence phone.
- [ ] Run the **production build** (`npm run preview`), not the dev server (avoids HMR/WebGL hiccups).
- [ ] `http://localhost:4173/?reset` before every take.
- [ ] **Reduced-motion OFF** (so camera *flights* play, not cuts).
- [ ] **WebGL available** — confirm the 3D vault loads (not the `?flat` fallback). Use `?flat` only for a safety B-roll take.
- [ ] Press **`D`** to start Demo Mode; **spotlight ON**, **cursor FX ON**.
- [ ] ~2s idle handles head/tail of each clip.

---

## 2. The recording method: follow the spotlight (22 waypoints)

1. **Start:** land in the 3D vault, press **`D`**. The spotlight rings **WP0 · New Case**.
2. **Follow it:** click the highlighted target. The pointer jumps to the next waypoint. Repeat through **WP21**.
3. **Don't fight the auto-runs:** at **WP2**, Process + AI Core run themselves (~15s). Hands off — just let the counter climb to **480,231**.
4. **Only typing:** at **WP4** type **Operation Sentinel** (clean, no backspaces) — the field-typing advances the pointer.
5. **Live insurance:** if a spotlight target ever hesitates (flaked click, slow remount), tap **►** or press **`→`** to force-advance, and cover with a recovery line (see `presenter-script.md`).
6. You *can* record the full journey in **one continuous take** (best for the "one machine" feel), or per-chapter (see §5 retake boundaries) and assemble.

### Waypoint → on-screen cheat sheet
| WP | id | Click target | What lands | Speed |
|----|----|-------------|-----------|-------|
| 0 | new-case | ⊕ New Case | Genesis intake opens | 1× |
| 1 | acquire-bundle | drag seizure bundle | SHA-256 hash seals onto 3 drives | **1×** (seal must read) |
| 2 | acquire-begin | Begin Ingestion | Process + AI Core **auto-run ~15s** → 480,231 | record 1×, **ramp 2× in edit** |
| 3 | analyze-continue | Create Case Vault | custody UNBROKEN banner | 1× |
| 4 | seal-name | name field → type "Operation Sentinel" | only typing in the demo | 1× |
| 5 | seal-button | Seal into Vault | padlock lock-close | 1× |
| 6 | open-case | Open the sealed case | island rises → enter console | **1×** (payoff) |
| 7 | nav-ask | Ask AEGIS | ask panel | 1× |
| 8 | ask-chip | Ask about Subject-B | **agent trace ~5.6s** + citations | 1× (let it run) |
| 9 | nav-graph | Entity Graph | confirmed knowledge graph | 1× |
| 10 | graph-gnn | Run GNN Link Prediction | ~1.8s spinner → **Subject-C** amber | **1× · HERO · SILENCE** |
| 11 | nav-synthetic | Synthetic Detection | DeepFake Shield | 1× |
| 12 | synthetic-reanalyze | Re-analyze | 3-stream verdict **98.2%** | 1× (punch verdict) |
| 13 | nav-report | Court Report | report scaffold | 1× |
| 14 | report-generate | Generate report | **41/42 grounded**, 1 struck red | 1× |
| 15 | return-vault | case chip | pull back to 3D vault | 1× |
| 16 | fusion-view | Fusion View | islands + gold threads | 1× |
| 17 | fusion-thread | gold thread | shared wallet **0.91** | 1× |
| 18 | propose-joint | Propose joint investigation | **JOINT-2026-0091** banner | 1× |
| 19 | nav-crown | Rise to the Crown | Risk Proof opens (composite 97) | 1× |
| 20 | compile-report | Compile Case Report | **strata dive** → citations land | **1× · HERO · SILENCE** |
| 21 | report-seal | Sign & Seal | watermark dissolves → **gem GREEN** | 1× (settle on closed chain) |

---

## 3. Motion-Graphic bookends (not screen recording)
Build the Hook and Impact/Close in Canva / Clipchamp / DaVinci Fusion:
- [ ] **Hook (0:00–0:08):** device stack + lone lamp + bleeding calendar; counter toward half a million; "9 MONTHS → **47 MIN**"; **AEGIS-X** title bloom; fictional-data lower-third.
- [ ] **Impact (1:54–1:57):** "Safeguarded" banner + stat cards — 91% ↓ exposure · 375,541 never seen · 47 min vs 9 months.
- [ ] **Network + Close (1:57–2:00):** federation globe ("gradients only — data never moves") → **AEGIS-X** logo + tagline end card + fictional-data footer.
- Export each 1920×1080, 60fps, alpha where overlaid.

---

## 4. Speed-slider guidance per chapter
The Genesis auto-runs are the only stretch that needs pacing. Everything else stays 1× and follows the spotlight in real time.

- **Genesis auto-run (WP2, Process + AI Core, ~15s):** record at **~0.75×–1×** on the slider so counters and lane-lights read clearly; then **speed-ramp 1×→2× in edit** across the middle, ramping **back to 1× on the green completion wash** and the Verifier gold-node seal. Do NOT record at 2× — it looks jittery; ramp in post.
- **Acquire seal (WP1):** **1×** — the drag-drop + hash-chip seal must read.
- **Seal + island rise (WP5–WP6):** **1×** — payoff beats; only trim dead air.
- **Ask agent trace (WP8, ~5.6s):** **1×** — let the reasoning rows tick; do not ramp.
- **GNN reveal (WP10) — HERO:** **1×**, never ramp. Hold the cursor on the button ~1.5s, click, hands off through the spinner.
- **Compile strata dive (WP20) — HERO:** **1×**, never ramp. If slightly long, trim the top of the climb, never the strata pass.
- **All console beats (WP7, 9, 11–14) and vault beats (WP15–19, 21):** **1×**, real-time spotlight.

---

## 5. Per-chapter retake boundaries
Record the whole journey in one take if you can; otherwise split on these clean seams (each ends on a settled frame — edit-friendly). `?reset` before re-rolling any chapter that created state.

| Take | Chapter | Waypoints | Clean out-point |
|------|---------|-----------|-----------------|
| T1 | Genesis | WP0–WP6 | island risen / console entered |
| T2 | Ask | WP7–WP8 | answer streamed with citations |
| T3 | Hidden suspect | WP9–WP10 | Subject-C ignited (**hero — shoot 3–4×**) |
| T4 | Synthetic | WP11–WP12 | 98.2% verdict stamped |
| T5 | Court report | WP13–WP14 | 41/42 footer settled |
| T6 | Fusion vault | WP15–WP18 | JOINT-2026-0091 banner |
| T7 | Crown & dive | WP19–WP20 | report landed (**hero — shoot 3–4×**) |
| T8 | Seal & close | WP21 | crown gem GREEN, held ~2s |

**Note:** WP2, WP8, WP15, WP16 create/reset state — always `?reset` before re-rolling their chapter.

---

## 6. Retake tips
- **Cursor jitter?** Re-take — steadiness sells competence. The spotlight makes clicks legible; don't fight it.
- **Camera flight rendered a cut?** Reduced-motion is ON, or you're in `?flat` — disable reduced-motion / confirm WebGL, reload `?reset`.
- **Animation didn't fire** (hash seal, agent trace, GNN spinner, dive, gem flip)? Reload `?reset`, re-roll — never fake beyond trimming.
- **Spotlight stuck / click flaked?** Tap **►** or `→` to force-advance and keep rolling (better than freezing on stage).
- **Typo in the case name (WP4)?** Re-take Genesis — it's the only text on screen, it must be clean.
- **Accidental raw/un-blurred content:** discard immediately — non-negotiable. Tiles must stay desaturated duotone.
- **Shoot the two hero beats 3–4×** (GNN reveal WP10, Compile dive WP20); keep the calmest — and keep both **silent** in the VO.
- Label clips `T1_genesis_take2.mkv`, `T3_gnn_take3.mkv`, `T7_dive_take3.mkv`. ~2s handles each.

---

## 7. Assembly Checklist (CapCut / DaVinci Resolve / Clipchamp)

**Timeline**
- [ ] 1920×1080 @ 60fps, Rec.709. Import clips + motion-graphics + VO + music.
- [ ] VO on A1; music on A2 (duck −12 dB under VO). **Automate music near-silent under the WP10 GNN spinner AND the WP20 strata dive.**

**Edit**
- [ ] Order: Hook gfx → T1–T8 → Impact/Close gfx; trim to the script time column; **verify total = 2:00 exactly**.
- [ ] Apply the single Genesis speed-ramp on WP2 (§4). Keep both hero beats at 1×.
- [ ] Transitions: whip Hook→vault; **continuous camera** WP0→WP6 (Genesis is one shared-axis flow); real-time cuts across the console tour (WP7–WP14); continuous dive WP19→WP20→WP21 (crown → dive → seal — do not hard-cut the dive); cross-dissolve into the Impact gfx.
- [ ] Punch-ins: hash-chip seal (WP1), 480,231 counter + Verifier seal (WP2), padlock + island rise (WP6), citations land (WP8), **Subject-C ignition (WP10)**, verdict counter (WP12), red-struck line (WP14), JOINT banner (WP18), **strata dive (WP20)**, **gem flip GREEN (WP21)**.
- [ ] SFX: hash ticks (WP1), riser + completion wash (WP2), lock-close + island swell (WP6), citation chimes (WP8), **discovery sting on Subject-C (WP10)**, verdict stamp (WP12), bridge-tie (WP18), paper-settle whoosh (WP20), seal + gem chime (WP21), final chime (Close).

**Captions**
- [ ] Auto-generate from VO, then **proofread every line** against `voiceover-only.txt`.
- [ ] Bottom-center, Inter/system-ui, white on 70% black box, ~42px, max 2 lines.
- [ ] Lower-third at 0:05: "All case data, names, and media are fictional and synthetic."
- [ ] Captions never cover KPI numbers, the strata dive, the seal ceremony, the verdict stamp, or the JOINT/gem toasts.
- [ ] Keep the **two silence beats caption-light** — one label each ("Running link prediction…" / "Compiling case report…") — let the visuals breathe.

**QA**
- [ ] Watch **muted** — story readable via visuals + captions?
- [ ] Watch **eyes-closed** — VO alone makes sense?
- [ ] **Runtime EXACTLY 2:00.**
- [ ] **No** raw/graphic content; all tiles desaturated duotone; victim never depicted (labelled node only).
- [ ] Product name **AEGIS-X** everywhere (module label "Ask AEGIS" is fine).
- [ ] Fictional-data disclaimers present (0:05 lower-third + end card).
- [ ] The **federation line** closes the film verbatim: *"…every deployment makes every agency stronger — without a single file leaving home."*
- [ ] Audio: peaks ≤ −3 dBFS; VO ~ −16 LUFS integrated.

---

## 8. Export Settings (submission)

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
