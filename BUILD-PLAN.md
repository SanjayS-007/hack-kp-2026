# AEGIS — Detailed Build & Delivery Plan (HACK-KP 2026)
> Chief-architect execution plan. No code has been built yet — this is the blueprint.
> Companion doc: `ARCHITECTURE.md` (solution design) · `CONCEPT-BRIEF.md` (shared concept)

---

## 🗣️ In plain words
- This is our to-do list and schedule for the hackathon: what we're building, in what order, and who owns what.
- Five deliverables: a clickable demo app, a slide deck, a short video, a research pack, and the submission write-up.
- The demo app gets built screen by screen so it's always presentable, even half-finished.
- The video plan is research-backed: keep it under 3 minutes, show the app live, save the "wow" for the graph reveal.
- There's also a risk list (what could go wrong) and the exact story we'll tell judges.
- Unfamiliar terms? All explained simply in `LAYMAN-GUIDE.md`.

## 0. Deliverables & Definition of Done

| Deliverable | Definition of done | Owner (fleet agent) |
|---|---|---|
| D1 Prototype web app | 8 views, coherent synthetic case, `npm run build` clean, demo click-path documented | proto-builder |
| D2 Pitch deck (PPTX) | 13 slides, dark theme, diagrams as native shapes, re-runnable `build_deck.py` | deck-builder |
| D3 Demo video (3–4 min → target **2:30–3:00 final cut**) | 1080p60, voiceover, captions, uploaded per hackathon rules | you + video-writer scripts |
| D4 Research pack | competitor table, killer stats, judge Q&A | research-synth |
| D5 Submission text | Devpost-style writeup reusing brief + impact numbers | main thread (fast) |

---

## 1. Phased Plan

### Phase 1 — Foundation (½ day) ✅ mostly done
- [x] Deep-research docs downloaded & mined
- [x] Concept brief (product name, 12-module mapping, storyline, safety rules)
- [x] Architecture blueprint (`ARCHITECTURE.md`)
- [ ] Lock final branding (pending research-synth name-conflict check on "AEGIS")

### Phase 2 — Prototype build (1–1.5 days)
Build order chosen so the app is demoable at every checkpoint:
1. **Scaffold + design system** — Vite+React+Tailwind, dark navy theme, sidebar shell, top status bar ("AIR-GAPPED • Chain-of-Custody: VERIFIED"). *(2 h)*
2. **`mockData.js` single source of truth** — one coherent case: 3 devices, Subjects A/B/C, Minor-V1, 12 media hashes, 6 wallets, ~40 timeline events, 4 scripted Q&As. Every page reads from it → the case feels real. *(2 h)*
3. **Case Dashboard** — KPI cards, risk donut, ingest progress, AI activity ticker. *(3 h)*
4. **Visual Triage** — blurred-placeholder grid (CSS gradients only — safety rule), severity badges, Grad-CAM toggle overlay, wellbeing banner. *(3 h)*
5. **Entity Graph** — force layout, click→detail panel, highlighted peel-chain path to Subject-C. **This is the wow moment — budget extra polish.** *(4 h)*
6. **Timeline Studio** — multi-track (per device + financial + network), phase color-coding, clock-skew callout. *(3 h)*
7. **Ask AEGIS** — typewriter chat, citations, ECS badges. *(2 h)*
8. **Synthetic Detection + Risk Queue + Court Report** — verdict cards / SLA table / §63 certificate preview. *(4 h)*
9. **Polish pass** — transitions, hover states, empty-state handling, demo click-path README. *(2 h)*

### Phase 3 — Deck (½ day, parallel with Phase 2)
13-slide plan already specced in the deck-builder prompt (problem → 12-area fit → architecture → AI deep-dive → deepfake shield → admissibility → demo walkthrough → impact → differentiators → roadmap/ethics → close).

### Phase 4 — Video production (1 day, after prototype freeze)
See §2 below — full workflow.

### Phase 5 — Dry run & submission (½ day)
- Rehearse pitch against judge Q&A pack; timing check; upload; backup copies.

**Dependencies:** D3 depends on D1 (screen recording). D2/D4 independent. Critical path = prototype → video.

---

## 2. Video Production Plan (research-backed)

### 2.1 Findings from research (what wins)
- **Sweet spot 2–3 min**; judges drop off after 3. Target 2:45.
- Structure that scores: Hook (10s) → Problem (20s) → Solution (30s) → **Live demo 45–75s (the bulk)** → Tech/uniqueness (30s) → Impact + close (15s).
- Top mistakes to avoid: slideware instead of live demo, jargon, muddy audio, no value prop, >3 min.
- "Show, don't tell" — narrate while clicking; happy path only; one wow moment (our entity-graph reveal).

### 2.2 Toolchain (all free, Windows-friendly)
| Step | Tool | Notes |
|---|---|---|
| Screen record | **OBS Studio** | 1080p60, crop to app window, enable cursor; PointerFocus for cursor halo |
| Voiceover | **Microsoft Edge TTS (free) / Play.ht / Azure Neural TTS** | or record human VO w/ phone mic + Audacity noise reduction; ElevenLabs free tier if quality needed |
| B-roll (hook) | **Runway ML / Pika free credits** | 2–3 abstract clips (data streams, network nodes) for the 10-s hook — nothing depicting children |
| Edit | **CapCut desktop** (fast + auto-captions) → optional DaVinci Resolve polish | auto-captions mandatory (judges often watch muted) |
| Music | YouTube Audio Library / Pixabay | tense-but-hopeful underscore, −18 dB under VO |
| Export | 1080p H.264, ≤ platform limit | also 720p backup |

### 2.3 Shot sequence (maps to prototype click-path)
| Time | Scene | Screen |
|---|---|---|
| 0:00–0:10 | Hook: stat card + b-roll ("One case. 2.4 terabytes. 480,000 files.") | title card |
| 0:10–0:30 | Problem: manual review months, investigator trauma, AI-generated content invisible to hash tools | kinetic text |
| 0:30–0:50 | Solution intro: AEGIS pipeline diagram (from deck slide 4) | deck slide |
| 0:50–1:10 | Dashboard: ingest → 47-min triage, KPIs | live app |
| 1:10–1:30 | Visual Triage: blurred grid, Grad-CAM explain, "91% less exposure" banner | live app |
| 1:30–1:55 | **WOW: Entity Graph** — click wallet → peel-chain path lights up → hidden Subject-C | live app |
| 1:55–2:10 | Timeline: grooming→production→distribution phases align across devices | live app |
| 2:10–2:25 | Ask AEGIS: typed query → cited answer, ECS badge | live app |
| 2:25–2:35 | Court Report: §63 certificate + SHA-256 manifest, one click | live app |
| 2:35–2:45 | Impact + close: "72 hours, not 9 months. Every hour saved is a child protected sooner." | title card |

*(video-writer agent is producing the full script/storyboard/shot-list/voiceover files in `video\` — consistent with this plan.)*

### 2.4 Recording quality checklist
- 125% browser zoom so UI text is legible at 1080p; hide bookmarks bar; clean desktop.
- Rehearse the click-path twice before recording; record each scene as a separate OBS take (easier retakes).
- Slow, deliberate cursor movement; 1-s hold after each click before narration lands.
- Never let real OS notifications appear (Focus Assist ON).

---

## 3. Risk Register

| Risk | Likelihood | Mitigation |
|---|---|---|
| Scope creep on prototype (12 modules = too much) | High | 8 views only; graph + triage get the polish budget; rest are "good enough" |
| Video runs long | High | Script to 2:45 max; cut Tech-deep-dive before cutting demo |
| Sensitive-topic missteps (imagery/tone) | Medium | Safety rules in brief: abstract placeholders only, no sensationalism, fictional data disclaimer in video |
| "AEGIS" name conflict | Low | research-synth checking; fallbacks ready (e.g., "SENTINEL-KP", "GUARDIAN LENS") |
| Judges ask "is the AI real?" | Certain | Honest framing: working console + research-validated architecture; mocked inference clearly stated as roadmap |
| Tailwind/em>dependency snags on corporate laptop | Medium | Pin Tailwind v3, npm registry access verified; fallback plain CSS |

---

## 4. Judge-Facing Narrative Spine (memorize)
1. **Problem:** evidence volume broke manual forensics; hash matching is blind to new + AI-generated content; reviewing it breaks people.
2. **Insight:** triage, correlation and reporting are the bottlenecks — not detection alone.
3. **Solution:** one air-gapped platform: semantic triage → fusion graph → prioritized leads → court-ready output.
4. **Proof:** live console demo on a realistic fictional case; architecture backed by current research (hybrid ViT, M-RAG, GNN, stratigraphy, 3-stream deepfake forensics).
5. **Moat:** court-admissibility engineering (BSA 2023 §63, ECS-gated generation) + investigator-wellbeing design.
6. **Ask/close:** pilot with a state cyber cell; every hour saved is a child protected sooner.
