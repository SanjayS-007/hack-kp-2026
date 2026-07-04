# AEGIS-X — COURT REPORT Spec (data + look) & FINAL-CUT Plan (video + deck)
> Planning only. The report is the terminus of every chain: Genesis custody → AI Core verdicts →
> Fusion strata → **document a court can trust**. It must look like a legal artifact, not a web page.

---

# PART A — THE REPORT

## A1. Design language — "the paper artifact"
| Property | Spec |
|---|---|
| Canvas | Near-white paper `#F6F7FA`, text ink `#16233C`, inside the dark app (elev-3 floating sheet, 820px, subtle page shadow + 1px cool border) |
| Typography | Doc headings: Georgia/serif stack, small-caps section numbers; body 13px/1.65 serif; ALL hashes/IDs/timestamps: JetBrains Mono 11px |
| Official chrome | Header band: agency emblem placeholder (shield outline), "DIGITAL EVIDENCE ANALYSIS REPORT", case no. mono, classification strip `RESTRICTED // CHILD PROTECTION` top+bottom of every page |
| Watermark | Diagonal `DRAFT — PENDING SIGNATURE` 8% opacity until "signed" in demo; removed on final stamp |
| Page furniture | Page numbers `Page 3 of 14`, footer: generated-by line `AEGIS-X v2.4.1 · models pinned · SHA-256 manifest attached`, left mini-TOC rail (scrollspy, dark side) |
| Print | `@media print`: chrome hidden, paper full-bleed, page-break rules per section, Export PDF = window.print() |

## A2. Document structure & data (canon-fed, every number traceable)
1. **Cover** — case KP-2026-0417 "Operation Sentinel" · requesting officer · unit · date (live) · report ID `RPT-0417-001` · QR placeholder (verification stub).
2. **Executive Summary** (auto-generated tone, 5 sentences) — 3 subjects, 1 identified minor victim-reference (never named/depicted), 312 flagged artifacts, cross-case linkage to 2 prior cases, ECS footer `41/42 statements grounded · 1 excluded (0.71 < 0.85)`.
3. **Seizure & Chain of Custody** — table of DEV-01/02/03: seizure time, location, officer, write-blocker, first-touch SHA-256 seal time, ML-DSA counter-signature; custody event log (8 rows, mono timestamps); Edge-Kit E-KIT-07 scene manifest reference.
4. **Methodology** (the trust section) — one paragraph per engine used + **Model Registry table**: model, version, weights-SHA-256 (short), validation P/R — "pinned to this case, reproducible on demand"; enclave attestation block `NVIDIA CC · measurement 0x7f3a…` .
5. **Findings — Content Analysis** — evidence table (12 key exhibits): exhibit ID, type, category A/B/C, confidence (never round), device origin, hash; per-exhibit **proof tree accordion**: `Claim → POCSO §14/§15 element → Evidence ID → SHA-256 ✓ → XAI ref (Grad-CAM)`.
6. **Findings — Entity Network** — embedded static render of the graph (peel-chain gold path), narrative of Subject-C discovery: method chip `TAGNN link-prediction 0.89 — verified by re-derivation`, wallet table (3 wallets, mixer hops).
7. **Findings — Timeline** — condensed stratigraphy strip (grooming→production→distribution phase bands), 10 pivotal events w/ device + skew-corrected UTC, clock-drift disclosure note (transparency = credibility).
8. **Findings — Synthetic Media** — 3 files: 3-stream scores table, C2PA absence note, verdict `AI-GENERATED 98.2%`, legal note (synthetic still actionable; changes victim-ID workflow).
9. **Risk Assessment & Leads** — composite breakdown bar per lead (top 3), SLA/escalation record, cross-case fusion disclosure: `JOINT-2026-0091 proposed (shared wallet cluster 0.91 — Harbor Watch)`.
10. **BSA 2023 §63 Certificate** — dual-part boxed forms: Part A (source device identification: IMEI/serials/extraction env auto-filled) + Part B (hash attestation) + signature blocks (investigator / SHO / expert) with date lines.
11. **Appendices** — A: full hash manifest (virtualized table, 24 shown of 312 + "download manifest" mock); B: Model Registry (full); C: **ECS audit log** — the 42 generated statements each with score, the 1 excluded shown struck in red with reason; D: glossary (from LAYMAN-GUIDE, 10 terms).

## A3. Interactive theater (in-app, before print)
- **Assembly**: existing generate animation upgraded — sections appear in order (§1→§11 fast cascade), citations that streamed from the vault dive (v6c) slot into §5/§6 visibly.
- **Strata provenance footer** per findings section: tiny 4-dot strip showing which stratum each citation came from (Lake/Vector/Graph/Crown) — hover names it.
- **Proof-tree accordions**: closed by default; demo opens ONE (exhibit E-114) — the provenance-spine money shot in document form.
- **Sign & Seal**: button → signature lines fill (typed name animation) → DRAFT watermark dissolves → status gem in vault crown flips green → toast `Report sealed · hash anchored to custody chain`. Chain closes: the vault shows the report exists.
- **ECS gate visible**: §2 footer chip + appendix C — honesty as theater.

## A4. Report role in judges' Q&A
The report page is the answer station for: "how is this admissible?" (§10 + §4), "how do we trust AI text?" (appendix C), "can the defence reproduce this?" (§4 registry), "what about the synthetic images?" (§8).

---

# PART B — FINAL CUT (video ∪ deck, the last two dishes)

## B1. Final video choreography (2:00, vNEXT — rewrite AFTER build lands)
| t | Chapter | Beats (all speed-slider assisted) |
|---|---|---|
| 0:00–0:08 | Hook | black → stat pulse (2.4TB · 9 months → 47 min) → title card |
| 0:08–0:35 | **Genesis** | Vault 3D overview (2s) → New Case → local acquire drag-drop seal (5s) → pipeline speed-ramp (4s) → AI Core lanes light (5s) → integrity glance (3s) → name + seal ceremony, island rises (6s) |
| 0:35–1:00 | **Fusion Vault** | strata focus (3s) → Ask-the-Vault probe→citations fly (7s) → pull-back, islands + gold thread click (7s) → risk dial proof chips (5s) → "Compile Report" dive begins (3s) |
| 1:00–1:20 | **Console proof** | dive lands in report assembling (5s) → proof-tree open E-114 (4s) → §63 cert + sign & seal (5s) → vault crown flips green (3s) — chain visibly CLOSED |
| 1:20–1:45 | **Depth flash** | 4 rapid console cuts (2-3s each): Triage Grad-CAM → Entity Graph GNN reveal (keep the silence beat, shortened) → Synthetic verdict → wellbeing meter on AI Core page |
| 1:45–2:00 | Close | impact numbers → federation line → tagline end card |
Rules: max 2 sentences narration per chapter; captions always; GNN reveal keeps ≥1.5s silence; every chapter ends on a settled frame (edit-friendly).

## B2. Deck sync (rewrite AFTER build lands)
- Slide 9 (Demo) rebuilt with 6 real screenshots: Vault 3D · Genesis pipeline · AI Core observatory · constellation retrieval · fusion threads · sealed report.
- New slide after 13 (Provenance Spine): **"The Report Is The Product"** — report cover screenshot + 3 callouts (§63 auto-cert, ECS audit, model registry).
- AI Core slide 6 upgraded with engine-room screenshot + Trace-a-Specimen mention.

## B3. Dependency ladder (unchanged protocol)
v3 ✅→ v4 → AUDIT → v5a AI Core → v5b Demo Mode → v6a/b/c Vault 3D → **report upgrade (A3)** → video re-record + deck refresh (B1/B2) → submission.
