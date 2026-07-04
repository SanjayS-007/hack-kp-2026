# AEGIS — Competitive & Pitch Notes (HACK-KP 2026)

*Research synthesis for the pitch deck, demo video, and judge Q&A. All figures cited inline. Last updated 2026-07-04.*

## 🗣️ In plain words
- This is our pitch-prep cheat sheet: who we compete with, our strongest statistics, and rehearsed answers to hard judge questions.
- Competitor takeaway: existing tools each do one job (fingerprint-matching, media sorting, case files) — agencies glue 4–5 together. We fuse it all in one offline, court-ready pipeline.
- Killer stats: 20.5M abuse reports in 2024; AI-generated abuse imagery up ~1,325%; UK police alone have 25,000+ devices backlogged for months.
- The Q&A section pre-answers the tough ones: "how do you train without illegal data?", "what about false positives?", "why trust an AI in court?"
- It also checks the name "AEGIS" for trademark conflicts (verdict: fine for a hackathon, qualify it for a real product).
- Any unfamiliar term is explained simply in `..\LAYMAN-GUIDE.md`.

---

## 1. Competitive Landscape

Real, deployed tools AEGIS competes with / complements. The honest positioning: **incumbents each own one slice** (hashing, media triage, link analysis, or case management). AEGIS's wedge is **unified fusion + court-admissibility + wellbeing + sovereign air-gap in one pipeline**, tuned for Indian law (BSA 2023) and infrastructure (CCTNS).

| Tool | Who uses it | Strengths | Gaps AEGIS fills |
|---|---|---|---|
| **Thorn Safer** ([safer.io](https://safer.io/solutions/)) | Platforms/ESPs, some LE via partners | 138.7M+ known CSAM hashes; AI classifier for *novel* CSAM; text/grooming classifier | Detection-only API — no fusion graph, no timeline, no court report, no crypto/telecom correlation |
| **Griffeye Analyze** (Magnet) ([magnetforensics.com](https://www.magnetforensics.com/products/magnet-griffeye/)) | LE media-review units worldwide | High-volume image/video triage, dedup, VICS, "Brain" auto-categorize, embeds Thorn classifier, NCMEC victim linkage | Media-centric only; weak on chat NLP, finances, deepfake forensics, BSA §63 reporting |
| **Cellebrite Pathfinder / Inseyets** ([cellebrite.com](https://cellebrite.com/en/products/pathfinder/)) | Police, federal agencies (device extraction leader) | Best-in-class extraction; AI link analysis across people/events/locations; audio transcription, multi-language | Closed/cloud-leaning, US-centric, costly; not air-gapped-first; no hallucination-scored AI output for Indian courts; deepfake detection limited |
| **Magnet AXIOM** ([magnetforensics.com](https://www.magnetforensics.com/blog/thorns-csam-image-classifier-now-integrated-with-magnet-axiom/)) | LE + corporate forensics | Cross-source (computer/mobile/cloud) artifact correlation; Magnet.AI chat classifier; Thorn integration | Evidence-processing suite, not a proactive fusion center; no crypto peel-chain, no synthetic-media forensics module |
| **Hubstream** ([hubstream.io](https://www.hubstream.io/)) | NCMEC, ICAC task forces, NGOs | Enterprise case management, workflow, tip triage at scale | Process/workflow layer — no detection, no AI triage, no timeline reconstruction |
| **Project VIC + VICS** ([projectvic.org](https://www.projectvic.org/)) | Global LE data-sharing standard | Shared hash ecosystem + JSON schema for interoperability without moving illicit media | A *standard*, not a platform — AEGIS ingests/exports VICS but adds the analytics layer on top |
| **Microsoft PhotoDNA** ([microsoft.com](https://www.microsoft.com/en-us/photodna)) | Platforms, NCMEC, LE | Robust perceptual hash: matches resized/cropped/re-compressed known images | Blind to zero-day + AI-generated CSAM by design; AEGIS adds semantic + synthetic detection beyond hashing |
| **Semantics21 (S21) LASERi / SPECTRUM** ([semantics21.com](https://www.semantics21.com/)) | UK/EU police, CAID users | Fast on-scene triage; CAID + Project VIC + PhotoDNA matching; wellbeing-aware review | Strong triage but not a full fusion/graph/timeline/court-report stack; UK-CAID centric vs India CCTNS |
| **NCMEC CyberTipline tech** ([missingkids.org](https://www.missingkids.org/gethelpnow/cybertipline)) | US clearinghouse; feeds global LE | Ingests 20M+ platform reports/yr, bundling + prioritization | Reporting/clearinghouse pipeline, not an investigator's on-prem analysis tool |

**One-line takeaway for the deck:** *"Agencies today stitch 4–5 vendors together. AEGIS is the first sovereign, air-gapped platform that fuses triage → correlation → timeline → court report in one wellbeing-first pipeline."*

---

## 2. Killer Stats for the Pitch (with sources)

- **20.5M CyberTipline reports in 2024** (down from 36.2M in 2023 due to Meta "bundling"; ~**29.2M** individual incidents when un-bundled) — the crime isn't shrinking, detection is. ([NCMEC](https://www.missingkids.org/gethelpnow/cybertipline/cybertiplinedata), [Thorn](https://www.thorn.org/blog/what-the-2024-ncmec-cybertipline-report-says-about-child-safety/))
- **Generative-AI-related reports to NCMEC up ~1,325%** in 2024. ([NCMEC / Thorn](https://www.thorn.org/blog/what-the-2024-ncmec-cybertipline-report-says-about-child-safety/))
- **AI-generated CSAM reports to the IWF up 380%** in 2024 (245 actionable reports containing **7,644 images**; **~92% photo-realistic** — indistinguishable even to trained analysts; **39% Category A**, the most severe). ([IWF via Sky News](https://news.sky.com/story/ai-generated-child-abuse-images-increasing-at-chilling-rate-as-watchdog-warns-it-is-now-becoming-hard-to-spot-13235706), [gov.uk](https://www.gov.uk/government/news/new-law-to-tackle-ai-child-abuse-images-at-source-as-reports-more-than-double)) — *this is the "PhotoDNA is not enough" slide.*
- **Forensic backlog: 25,000+ devices** waiting in UK forces alone; delays commonly **6–18 months**; some serious-offence devices wait **over a year** to even begin exam. ([HMICFRS](https://hmicfrs.justiceinspectorates.gov.uk/news/news-feed/police-forces-overwhelmed-and-ineffective-when-it-comes-to-digital-forensics/), [Police Professional](https://policeprofessional.com/news/forces-overwhelmed-by-digital-forensics-with-backlog-of-25000-devices-waiting-to-be-examined/)) — *AEGIS: "47 minutes, not 9 months."*
- **Investigator wellbeing:** ~**10–40% of CSAM investigators** show significant PTSD / secondary-traumatic-stress symptoms; restricted-viewing and rotation are recognized mitigations. (Forensic Science International: Digital Investigation literature; see also [Thorn wellbeing resources](https://www.thorn.org/)) — *AEGIS blur-by-default = up to ~90% less traumatic exposure.*
- **Digital forensics market: USD 12.94B (2025) → USD 22.81B (2030), 12.0% CAGR** — a systemic, funded need to automate. (MarketsandMarkets, cited in team deep research; corroborated by [Mordor Intelligence](https://www.mordorintelligence.com/industry-reports/digital-forensics-market))
- Context anchor: **97% of all CSA imagery victims in 2024 were female**; Category A (most severe) is rising — underscores urgency and the victim-safeguarding mission. ([IWF](https://safeline.org.uk/news/ai-generated-images-of-child-sexual-abuse-are-becoming-more-realistic/))

---

## 3. Judge Q&A Prep — 10 Hard Questions + Strong Answers

1. **"How do you train the models without illicit data?"**
   We never touch real CSAM. Three legal paths: (a) **transfer learning** from benign human-centric tasks (pose, apparent-age on public datasets), (b) **synthetic/proxy data** and adult-domain bridging via Body-Keypoint-Part representations, and (c) **restricted, ethically-governed datasets** accessed only inside authorized agencies (Project VIC/CAID hash spaces — hashes, not images). The platform *deploys* inside the agency; sensitive fine-tuning happens on their side under their legal authority.

2. **"False positives ruin lives — how do you handle them?"**
   AEGIS is **decision-support, never decision-maker.** Every flag is **human-in-the-loop** with **Grad-CAM/XAI overlays** showing *why*. We surface a calibrated confidence + an **Evidence Confidence Score (ECS)** threshold; low-confidence items are queued for review, not auto-actioned. No arrest or charge ever rests on an AI verdict alone — it prioritizes what a trained human then confirms.

3. **"What's your legal/privacy basis?"**
   Deployed **only inside authorized child-protection agencies**, **air-gapped** (no data leaves the agency, local LLMs, Zero-Trust). Operates on **lawfully seized, warrant-scoped** evidence. Outputs are structured for **BSA 2023 §63** electronic-evidence certification with **SHA-256 chain of custody**. We process, we don't surveil — no open-internet scraping of citizens.

4. **"How is this different from Cellebrite?"**
   Cellebrite excels at **extraction and link analysis** but is a closed, US-centric, cloud-leaning suite. AEGIS is **sovereign and air-gapped by design**, **fuses** media + chat + crypto + telecom + OSINT into one graph, adds **synthetic-media forensics** and **hallucination-scored, court-ready Indian-law reporting**. We can *ingest* Cellebrite/AXIOM extractions (VICS) — we're the analysis brain on top, not a rip-and-replace.

5. **"Deepfake / AI-CSAM is an arms race — how do you keep up?"**
   Our DeepFake Shield is **multi-signal** (DINOv2 texture + facial-geometry consistency + frozen-CLIP semantic fusion + optical defocus-blur + A/V-sync analysis), not a single fragile classifier. We also verify **C2PA provenance manifests**. It's built to be **retrainable and modular** so new generator artifacts can be added — and detection is *triage*, always confirmed by a human, so a miss degrades gracefully.

6. **"Model bias across ethnicities and ages?"**
   Real risk we address explicitly: **apparent-age is modeled as a probability distribution (KDE label-distribution learning), not a hard regression**, reducing brittle age cutoffs. We recommend **stratified evaluation across skin tone/ethnicity/age** on agency data, publish per-cohort error rates, and keep humans in the loop precisely because edge cases (borderline age) are where bias bites. XAI overlays let reviewers catch spurious cues.

7. **"What's the deployment cost for an agency?"**
   Designed for **commodity on-prem / edge hardware** — efficient backbones (ConvNeXt-Tiny, Swin, local Llama via quantization) run without cloud GPU bills or per-seat SaaS. Open-source core stack means **no per-image licensing** like some incumbents. Main cost is a one-time secure server + integration — far below stitching 4–5 commercial vendors.

8. **"Why would a court trust an AI verdict?"**
   It **doesn't have to** — AEGIS produces **evidence, not verdicts**. Every AI output is (a) **explainable** (Grad-CAM/XAI shows the pixels), (b) **traceable** (SHA-256 chain of custody, immutable audit log), (c) **hallucination-scored** (HERAM/ECS flags any AI-generated narrative below threshold), and (d) **certifiable** under BSA 2023 §63. The human investigator and prosecutor remain the legal authors; AEGIS shows its work.

9. **"Isn't this just PhotoDNA with extra steps?"**
   PhotoDNA only matches **known** images by hash and is **blind to zero-day and AI-generated CSAM** — exactly the content that grew 380% last year. AEGIS adds **semantic understanding** (novel content), **synthetic detection**, and **cross-source fusion** (finances, telecom, timeline) that hashing fundamentally cannot do. Hashing is one input to AEGIS, not the ceiling.

10. **"How do you prove it actually saves investigators from trauma?"**
    **Blur-by-default** triage means humans review a **prioritized ~10% instead of 100%**, and see abstracted/XAI-explained representations first. This mirrors recognized **restricted-viewing** practice that agencies already use to cut exposure. We can instrument the metric directly: % of files auto-cleared vs human-reviewed per case, demonstrable in the demo.

---

## 4. Hackathon Winning Angles (video / pitch)

- **Lead with the human cost, responsibly.** Open on the *investigator* and the *victim clock* — "9 months of backlog is 9 months a child stays in harm." Emotional but never exploitative: use abstract blurred tiles + "Minor-V1", never depicted. Judges remember mission, not architecture.
- **Own "wellbeing" as a unique axis.** Almost no competitor pitch centers **investigator PTSD (10–40%)**. Make "up to ~90% less traumatic exposure" a headline stat — it's differentiated, humane, and memorable.
- **Court-admissibility is your moat.** Others detect; few make it *stick in an Indian courtroom*. **BSA 2023 §63 certificate + SHA-256 chain of custody + hallucination-scored AI (ECS)** = the thing that turns a flag into a conviction. This is hard to copy and directly relevant to judges.
- **India-specific compliance = home advantage.** Emphasize **BSA 2023 / BNSS**, **CCTNS integration**, Dial-112 / VAAHAN fusion, and **data sovereignty / air-gap** (data never leaves the country or the agency). For a Kerala/India police-adjacent hackathon ("hack-kp"), local fit beats a generic global tool.
- **Show, don't tell — the "47 minutes vs 9 months" demo.** Run the *Operation Sentinel* storyline live: ingest → 47-min triage → hidden 3rd suspect via crypto peel-chain → one-click court report. A single end-to-end wow-moment ("terabytes to testimony") outperforms feature lists.

---

## 5. Name / Branding Check — "AEGIS"

**Verdict: usable but crowded — proceed with a qualifier, not "AEGIS" bare.**

Multiple live "AEGIS" trademarks exist in software/tech (e.g., Story LLP Software's AI legal-analysis mark reg. 2025; AEGIS.net Inc. software testing since 2019; plus Hologic/Microban in medical/antimicrobial). **None is specifically registered for law-enforcement forensics/policing**, so there's no direct head-on conflict — but "legal AI software" overlaps uncomfortably close. ([Trademarkia](https://www.trademarkia.com/aegis-98873458), [Justia](https://trademarks.justia.com/988/73/aegis-98873458.html), [USPTO report](https://uspto.report/TM/87639241)) Note also "Aegis" is a common defense/security brand generally — good vibe, low distinctiveness.

**Recommendation:** For a hackathon, "AEGIS" is fine (it's an internal codename + the acronym *AI Evidence & Guardianship Intelligence System* is strong). For any real product, **qualify it** to clear space and aid trademark distinctiveness.

**Alternates if you want a cleaner mark:**
1. **AEGIS-KP** / **Project AEGIS** — keeps equity, adds distinctiveness and the Kerala-Police / hackathon tie-in.
2. **SENTINEL** or **PRAHARI** (प्रहरी, "sentinel/guardian" in Hindi) — mission-evocative, India-rooted, strong for a police audience.
3. **RAKSHA** (रक्षा, "protection") or **KAVACH** (कवच, "shield/armor") — the literal Sanskrit equivalent of "aegis," culturally resonant and far less trademark-crowded in the LE-software space.

---

*Sources are linked inline. Volume stats reflect 2024 reporting years (NCMEC/IWF), market data 2025→2030 projection, backlog/wellbeing figures from UK LE inspectorate + forensic-psychology literature. Verify latest figures before final submission if 2025 reports have since published.*
