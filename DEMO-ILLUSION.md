# AEGIS — Deep-Mock Illusion Playbook (Wizard-of-Oz Demo Spec)
> How every "AI" moment in the demo is 100% scripted yet indistinguishable from a live production system.
> Golden rule: **the illusion lives in latency, uncertainty, and provenance** — real AI is never instant, never 100% confident, and always cites.

---

## 🗣️ In plain words
- Our demo app is real software, but the "AI brain" behind it is scripted — like the man behind the curtain in the Wizard of Oz.
- This document is the stage-direction manual: how to make scripted answers *feel* like a live AI.
- The three tricks: fake "thinking" pauses, confidence scores that are never 100%, and every answer citing its sources.
- The presenter only clicks pre-set question buttons, so every answer is rehearsed and perfect.
- If a judge asks "is this live AI?" we answer honestly: real console, simulated AI, models are the roadmap.
- Terms like "Wizard-of-Oz demo" or "ECS" are explained in `LAYMAN-GUIDE.md`.

## 1. The 7 Laws of a Convincing Fake AI

| # | Law | Implementation |
|---|-----|----------------|
| 1 | **Nothing is instant** | Every "AI" action shows staged latency: skeleton shimmer → streaming tokens → result. Query answers stream at ~30–60 tokens/s with a 500–900 ms "thinking" delay. Triage shows a live progress bar with fluctuating throughput (e.g., "12,412 files/min"). |
| 2 | **Never 100% confident** | All verdicts show calibrated-looking confidences: 87.4%, 98.2%, 93.1% — never 100%, never round numbers. Include uncertainty bands ("apparent age 9–12, p=0.94"). |
| 3 | **Always cite** | Every generated sentence carries superscript citation chips → clicking opens the (mock) source artifact: chat excerpt, EXIF panel, ledger row. Judges click one; it must resolve. |
| 4 | **Show the work** | "Agent trace" drawer: expandable step list — `Plan → Graph query (Cypher shown) → Vector search (top-k shown) → Vision check → Synthesize → HERAM validation (ECS 0.97)`. Each step has millisecond timings. |
| 5 | **Imperfection sells** | Include 1–2 deliberate low-confidence items in the triage queue marked "NEEDS HUMAN REVIEW (conf. 61.7%)" — a system that flags its own doubt reads as real. |
| 6 | **Live-system ambience** | Background ticker of system events ("Worker gpu-02: batch 1,204 complete", "Graph upsert: 17 edges"), a status bar with fake uptime/queue depth, timestamps that are *relative to demo time* (computed at page load, never hardcoded dates that go stale). |
| 7 | **Deterministic theater** | The demo is a fixed click-path. Every scripted query has ONE perfect canned answer. Free-typing is disabled subtly: query box has 4 "suggested prompts" chips — the presenter clicks chips, never types. |

---

## 2. Mock Mechanics per Surface

### 2.1 Ask AEGIS (the centerpiece fake)
- **Scripted exchanges** stored as JSON: `{query, thinking_steps[], answer_markdown, citations[], ecs, latency_profile}`.
- Playback engine: on chip-click → 700 ms "Planning…" → agent-trace steps appear one-by-one (300–800 ms each) → answer streams word-by-word → citation chips pop in → ECS badge stamps last with a micro-animation.
- 4 exchanges, escalating wow:
  1. "Summarize what we know about Subject-B" → dossier with 6 citations.
  2. "Show all communications referencing Riverside Park in March" → 3 chat excerpts + map thumbnail + timeline jump-link.
  3. "Is there any financial link between Subject-A and unknown parties?" → **reveals Subject-C via peel-chain**, graph deep-link (the wow).
  4. "Draft the §63 evidence certificate for exhibit E-114" → generated certificate preview, ECS 0.98, "1 sentence excluded below threshold" note (Law 5).

### 2.2 Visual Triage
- Ingest page opens mid-run: progress at 73%, ETA counting down *in real time* (JS interval), per-device lanes advancing at different rates.
- Verdict grid: staggered card entrance (30 ms cascade) as if results are landing from a queue.
- Grad-CAM toggle: pre-baked radial-gradient heat overlays positioned per-tile — looks like model attention.

### 2.3 Entity Graph
- Force layout runs live (genuinely real physics = free realism).
- "Run link prediction" button → 1.8 s spinner → 3 dashed edges animate in with confidence labels (0.89, 0.84, 0.77) → Subject-C node pulses amber → toast: "1 new entity promoted to suspect — review required".

### 2.4 Synthetic Detection
- "Re-analyze" button replays a 4-stage pipeline animation (Texture → Geometry → Semantics → A/V sync), each stage filling a per-stream score bar, then the fused verdict counts up to 98.2%.

### 2.5 Court Report
- "Generate report" → 2.5 s document-assembly animation (sections appearing in order) → §63 certificate with real SHA-256 hashes (genuinely computed from the mock files — cheap authenticity) → "HERAM validation: 41/42 statements grounded".

---

## 3. Data Coherence Contract (what makes or breaks the illusion)
Single `mockData.js` truth: the SAME hashes, names, timestamps, wallets appear across Dashboard, Triage, Graph, Timeline, Chat citations, and the final report. A judge who cross-checks exhibit E-114 in three views must find it consistent everywhere. Checklist:
- [ ] Every citation chip resolves to a real mock artifact
- [ ] Timeline events match chat-excerpt timestamps
- [ ] Report evidence table = flagged items in triage (counts match: 312/14/3)
- [ ] Subject-C's wallet appears in ledger view AND graph AND answer #3

## 4. Presenter Safety Rails
- Demo runs from `npm run preview` (built bundle — no dev-server hiccups); offline-safe (no external fonts/CDNs).
- A hidden `?reset` param restores initial state between takes.
- If asked "is this live AI?": *"The console is fully working software; inference is simulated for this demo — the models and architecture are specified and research-validated, integration is our roadmap."* Honest, and protects credibility.
