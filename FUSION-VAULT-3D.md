# AEGIS-X — FUSION VAULT 3D Spec (v6) — "The Intelligence Fusion Layer, Visible"
> The Vault becomes one continuous 3D world: **artifact → strata stack → case island → whole vault → report**.
> LOCKED DECISIONS: true 3D (react-three-fiber) · Ask-drawer reuse w/ constellation retrieval · one-world camera pull-back for cross-case fusion · hybrid graph (3D expand + 2D escape hatch) · cinematic strata→report dive.
> PLANNING ONLY — build order decided after v3/v4 audit (MASTER-FLOW-PLAN §7).

---

## 0. Tech foundation
- **Stack:** `three` + `@react-three/fiber` + `@react-three/drei` (OrbitControls, Instances, Line2, Html, CameraControls). NO physics engine needed. Postprocessing: `@react-three/postprocessing` bloom ONLY (cheap, sells the neon-forensic look).
- **Perf budget:** ≤ 60k instanced vertices; point cloud via `THREE.Points`/InstancedMesh (2,000 pts trivial); target 60fps on iGPU; `dpr={[1,1.5]}` clamp.
- **Fallback:** WebGL feature-detect on mount → if fail or `?flat` param → 2.5D CSS isometric fallback (simplified, same info). Reduced-motion: camera cuts instead of flights, no bloom pulse.
- **Speed:** all animation durations run through the global `dur(ms)` helper → Demo-Mode speed slider controls the 3D world too.
- **Aesthetic:** low-poly premium — dark void `#04070F`, fog, thin emissive edges (cyan/indigo), soft bloom, NO textures (all shader/vertex colors) = crisp + tiny bundle.

## 1. Scene graph & world layout
```
<VaultWorld>
 ├─ <Void> fog, star-dust particles (300, slow drift), ground grid (fades at radius)
 ├─ <CaseIsland caseId> ×N (Sentinel + Harbor Watch + Night Courier + user-created)
 │   ├─ <Stratum1_Lake>   bed of instanced file-blocks (12×12 grid, beveled cubes)
 │   ├─ <Stratum2_Vector> constellation point-cloud (2,000 pts, 3 cluster hues)
 │   ├─ <Stratum3_Graph>  entity nodes (spheres w/ glyph sprites) + edge lines
 │   ├─ <Stratum4_Crown>  risk dial torus + lead pins + report status gem
 │   └─ <IslandLabel>     Html billboard: case no., name, status chip
 ├─ <FusionThreads>       arcing bezier tubes between islands (GNN links)
 └─ <CameraRig>           CameraControls with named poses + flight choreography
```

### Camera poses (named, deterministic — recordable)
| Pose | Where | Used |
|---|---|---|
| `P0 vault-overview` | high 3/4 orbit, all islands visible | Vault home (Fusion View) |
| `P1 case-focus` | one island fills frame, slight orbit idle | Case detail |
| `P2 stratum-lake` | low skim across the block bed | Stratum 1 inspect |
| `P3 stratum-vector` | inside the constellation (pts surround camera) | Ask-the-Vault |
| `P4 stratum-graph` | graph lifted, orbit 30° | Graph expand |
| `P5 crown` | top-down on risk dial | Risk proofs |
| `P6 report-dive` | vertical dive through all strata → fade to report page | Compile transition |
Flights: eased quaternion+position lerp 900ms×speed; every pose reachable by click OR breadcrumb — no free-fly required (OrbitControls damped, bounded, so presenter can't get lost; double-click = re-frame).

## 2. Stratum specs (deep)

### S1 — Evidence Lake (bedrock)
- Instanced beveled cubes (~144 visible blocks each representing a batch), emissive seal-glyph on top face (shader decal). New case: ONLY this layer exists.
- Idle: rare block "heartbeat" glint (custody audit tick). Hover block → Html chip: `batch #212 · 3,340 objects · sha256 ✓ · ML-DSA ✓`. Click → Artifact Inspector (batch view).
- HUD chip: `480,231 objects · WORM · 0 mutations since seal`.

### S2 — Vector Constellation (the RAG showpiece)
- 2,000 points, precomputed UMAP-like layout (generate offline: 3 gaussian-mixture clusters + noise, stored as JSON — deterministic every run). Hues: cyan=images, indigo=chats/text, amber=events. Gentle per-point sine drift (vertex shader).
- Materializes AFTER AI Core pass: points stream up out of the Lake blocks (500ms staggered, 2s total) — "evidence becoming meaning".
- **Retrieval choreography (Ask-the-Vault):** query submitted → probe: a bright ray from the drawer anchor into the cloud → radial pulse → top-k (12) points flare white → k points detach and fly to the drawer edge, becoming the citation chips in the answer (Html portals) → dimmed cloud recovers. 3.5s total, speed-aware. THE demo moment for RAG.
- Hover any point → nearest-neighbor lines (k=5) light up + snippet tooltip.
- Side HUD: `ChromaDB · 480,231 embeddings · all-MiniLM-L12-v2 · 384-dim · HNSW`.

### S3 — Knowledge Graph (hybrid)
- Collapsed state: flat disc with faint node-lights (teaser). Click stratum → **expand-in-place**: nodes lift to a 3D force layout (precomputed 3D positions, spring-settle animation), glyph sprites (person/wallet/phone/hash), edges as emissive lines; orbit enabled.
- Node click → Artifact Inspector (entity mode) + connected edges highlight; peel-chain path renders gold.
- **Escape hatch button** (Html, top-right of stratum): "Open full explorer ↗" → deep-links to 2D Entity Graph page with `?from=vault` breadcrumb ("← back to Vault 3D").
- HUD: `Neo4j · 38 entities · 91 edges · TAGNN embeddings pinned`.

### S4 — Intelligence Crown
- Torus risk-dial (arc fill = composite score, color by tier) + floating lead-pins (8, height = priority) + report-status gem (grey=none / amber=draft / green=sealed).
- Click dial → **Risk Proof panel** (Html side card, elev-3): composite stacked bar `content 38 · behavior 24 · network 21 · recency 14 = 97`; each segment is a **proof chip** → clicking opens the evidence: Grad-CAM tile (S2 point flashes), anomaly window (mini heatline), graph path (S3 edges glow), recency (timeline chip). Every number traceable → provenance spine ON the vault.
- Crown appears LAST in the strata assembly = "intelligence complete".

## 3. Cross-case Fusion View (the killer)
- Entry: "Fusion View" toggle in vault HUD or scroll-out from a case → camera flies to `P0`; other islands **rise from the void** (800ms staggered, dust burst).
- **FusionThreads:** animated bezier tubes with flowing dash texture between strata of DIFFERENT islands: Sentinel.S3 ↔ HarborWatch.S3 `shared wallet cluster · 0.91` (gold) · Sentinel.S2 ↔ NightCourier.S2 `coded-lexicon fingerprint · 0.84` (indigo) · Sentinel.S1 ↔ HarborWatch.S1 `identical media hash ×3 · 1.00` (red).
- Click thread → evidence-pair panel: both cases' artifacts side-by-side + confidence + method chip (`TAGNN cross-case inference`) + **"Propose joint investigation"** → confirm → a persistent luminous bridge links the islands + banner `JOINT-2026-0091 proposed · pending supervisor approval` (sessionStorage). Serial-network discovery, visible.
- Guard-rail label (bottom): `Cross-case correlation within this agency's sovereign vault. Inter-agency: model-level federation only — data never moves.` (protects the federated story from judge traps).

## 4. Universal Artifact Inspector (connective tissue)
One drawer component, four modes (file / batch / entity / event), SAME everywhere (3D vault, triage, graph, timeline, report):
- Header: ID mono + type icon + seal status. Body: blurred preview (files), metadata table, **Strata Trail**: `Lake ✓ 11:42 → Vectorized ✓ 12:03 → Graph-linked ✓ 12:17 → Cited in report ✓` (each hop timestamped, clickable → flies camera/navigates to that stratum/page).
- Pivot actions: View in Timeline · Show in Graph · Find similar (fires S2 nearest-neighbor if in 3D) · Add to Report.
- This replaces per-page ad-hoc detail panels incrementally (v3 rails adapt to mount it).

## 5. Report Compile — the cinematic exit (auto-move)
Trigger: "Compile Case Report" (crown panel or risk proof panel).
1. HUD fades; camera climbs above crown then **dives vertically** through S4→S3→S2→S1 (600ms per layer, each layer's key artifacts flash as it passes).
2. During the dive, 8–10 citation chips (Html sprites) detach from strata and stream toward screen bottom.
3. Hard cut to Court Report page where the streamed chips "land" into the sections as the existing assembly animation runs (sections appear in order, chips slot into citations) → §63 stamps → `41/42 grounded`.
4. One continuous 4.5s story: *intelligence flows up the strata into a court document* (well, down the dive, up the abstraction — narration says "distilled into testimony").
- Report page gains a slim "strata provenance" footer per section: which stratum each citation came from.

## 6. Vault Home restructure (v4 amendment)
- Vault landing (route `/`) IS the 3D world at `P0` with a 2D HUD overlay: search, case list mini-rail (click = camera flight to island), `⊕ New Case`, `▶ Demo`, Fusion View toggle, vault-integrity chip.
- v4's 2D card grid becomes the **fallback layout** (`?flat` / no-WebGL) — nothing thrown away.
- Genesis Seal ceremony ends with the new island **rising in the 3D world** (replaces card materialize) → chef's-kiss continuity.

## 7. Integration contract (no-ruin rules)
1. All numbers from `canon.js`; thread confidences/case stats added to canon.
2. Ask-the-Vault mounts the SAME AskAegis engine components (chips, trace, ECS) in the drawer — zero forked chat logic; constellation choreography is a wrapper.
3. 2D Entity Graph page stays source-of-truth for graph deep-work; 3D graph is presentation (same GRAPH data import).
4. Demo-Mode waypoints extend INTO the 3D world (spotlight = 3D outline glow + HUD caption); speed slider drives all flights.
5. `?reset` restores pristine vault (created case, joint-investigation bridge cleared).
6. v2/v3 theater untouched; report page keeps its standalone Generate for direct visits.
7. Bundle: three+r3f+drei ≈ +600KB gz — acceptable local demo; code-split the 3D world (`lazy()`) so console routes stay fast.

## 8. Demo choreography (fusion chapter ≈ 22s of the 2:00 cut)
| t | Beat | Camera |
|---|---|---|
| 0–4s | Case island, strata assembled (post-Genesis continuity) | P1 |
| 4–10s | Ask-the-Vault: probe → flare → citations fly | P3 |
| 10–16s | Pull back: islands rise, threads arc, click gold thread | P0 |
| 16–20s | Risk dial → proof chips flash | P5 |
| 20–22s+ | "Compile Case Report" dive → report assembly | P6 |

## 9. Open items (deliberately deferred to post-audit iteration)
- Exact constellation JSON generation script (offline, seeded RNG).
- Whether Timeline gets a vault pivot ("View in Timeline" lands scoped).
- Sound design (subtle whooshes) — probably skip; video adds its own audio.
- Joint-investigation follow-through page — banner-only for now.
