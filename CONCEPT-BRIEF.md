# HACK-KP 2026 — Concept Brief (shared by all fleet agents)

## 🗣️ In plain words
- We're building AEGIS: software that helps police investigate crimes against children, faster and more humanely.
- It reads through seized phones and computers overnight — like a tireless librarian-detective — and flags what matters.
- It blurs disturbing material by default, so human investigators see up to ~90% less of it.
- It spots hidden connections (people, payments, files) a human would miss, and builds a timeline of events.
- Every finding comes with a tamper-proof "wax seal" (digital fingerprint) so it holds up in an Indian court.
- Jargon-free explanations of every term used here: see `LAYMAN-GUIDE.md`.

## Product
**AEGIS** — *AI Evidence & Guardianship Intelligence System*
An AI-powered investigation support platform for authorized child-protection agencies:
ingest → analyze → correlate → prioritize → report. Air-gapped, court-admissible, investigator-wellbeing-first.

## Tagline
"From terabytes to testimony — in hours, not months."

## The 12 Innovation Areas → AEGIS Modules
| # | Area | AEGIS Module | Tech (from deep research) |
|---|------|-------------|---------------------------|
| 1 | Content Analysis | Visual Triage Engine | Hybrid ConvNeXt-Tiny + Swin Transformer; Grad-CAM XAI overlays |
| 2 | Threat Identification | Human-Centric Perception | YOLO-Pose skeletal keypoints, apparent-age distribution estimation (KDE), BKPD |
| 3 | Source Correlation | Entity Graph | GNN (TAGNN) over suspects/victims/hashes/wallets/IPs; cross-case linkage |
| 4 | Contextual Extraction | Context Miner | OCR + NLP/NER on chats, coded-language lexicons, P2P filename taxonomy |
| 5 | Activity Pattern Analysis | Behavior Profiler | Transformer-autoencoder temporal anomaly detection (late-night burst → file-wipe patterns) |
| 6 | Metadata Mapping | Provenance Mapper | EXIF/GPS/device-serial extraction, C2PA manifests, VICS JSON normalization |
| 7 | Synthetic Detection | DeepFake Shield | 3-stream: DINOv2 global texture + facial geometry + frozen-CLIP semantic fusion; defocus-blur optics; A/V sync matrix |
| 8 | Timeline Reconstruction | Chronos Engine | Digital Stratigraphy (FSA + Hierarchical Pattern Mining), multi-device clock alignment |
| 9 | Intelligent Retrieval | Ask AEGIS | Multimodal RAG (ChromaDB + local Llama), agentic orchestration, citation-grounded answers |
| 10 | Automated Reporting | Court-Ready Reports | BSA 2023 §63 certificates, SHA-256 chain of custody, HERAM hallucination scoring (ECS) |
| 11 | Risk Assessment | Lead Prioritizer | Composite severity score (SAP scale A–C), active-abuse escalation queue |
| 12 | Intelligence Fusion | Fusion Center | Air-gapped data lake: CCTNS, CDR/IPDR, blockchain forensics (peel chains, mixers), OSINT |

## Key differentiators (pitch these)
1. **Investigator wellbeing**: AI triage means humans see up to ~90% less traumatic material (blurred-by-default, XAI-explained).
2. **Court-admissible by design**: BSA 2023 / chain-of-custody / hallucination-scored AI output (ECS threshold).
3. **Zero-day + synthetic ready**: goes beyond PhotoDNA hash matching — catches novel and AI-generated content.
4. **Fusion, not silo**: one graph across devices, finances (crypto peel chains), telecom, OSINT.
5. **Sovereign & air-gapped**: local LLMs, Zero Trust, no data leaves the agency.

## Demo storyline (use in prototype, PPT, and video)
"Operation Sentinel" — fictional case #KP-2026-0417:
1. Investigator ingests 3 seized devices (2.4 TB, 480k files) → auto-triage in 47 min.
2. Dashboard: 312 flagged items, 14 high-risk, 3 synthetic-detected, risk queue sorted.
3. Entity graph reveals hidden 3rd suspect via crypto peel-chain + shared hash.
4. Timeline reconstructs grooming → production → distribution across devices.
5. "Ask AEGIS": "Show all communications near Riverside Park in March" → cited answer.
6. One-click court report with §63 certificate + SHA-256 manifest.
7. OUTCOME: victim safeguarded in 72 hours vs typical 9 months.

## Rules for all mock data
- 100% fictional/synthetic. NO real names, NO realistic imagery of minors, NO explicit content.
- Represent flagged media as abstract blurred placeholders / colored tiles with severity badges.
- Suspects: "Subject-A/B/C", victims: "Minor-V1" (never depicted).

## Visual identity
- Dark theme (navy #0A1426 base), accent cyan #22d3ee, alert amber/red for risk tiers.
- Font: Inter / system-ui. Professional law-enforcement console aesthetic ("Palantir-meets-modern-SaaS").
