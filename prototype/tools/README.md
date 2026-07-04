# Fusion Vault 3D — mock data generator

Deterministic generator for the react-three-fiber **Fusion Vault** world
(spec: [`../../FUSION-VAULT-3D.md`](../../FUSION-VAULT-3D.md)).
All data is **100% fictional / synthetic** — hackathon prototype only.

## Regenerate

```powershell
cd C:\Users\2504690\hack-kp-2026\prototype
node tools\gen-vault-data.mjs
```

Outputs land in `prototype\public\vault-data\`. Nothing under `src\` is written.

- **Seeded** with `mulberry32` (base seed `20260417`, per-file offsets) → byte-identical
  output every run. Verify:
  ```powershell
  $d='public\vault-data'
  $a=gci $d -Filter *.json | sort Name | Get-FileHash
  node tools\gen-vault-data.mjs | Out-Null
  $b=gci $d -Filter *.json | sort Name | Get-FileHash
  if (Compare-Object $a.Hash $b.Hash) {'FAIL'} else {'PASS'}
  ```
- Combined size budget: **< 600 KB** (currently ~224 KB). The script exits non-zero if exceeded.
- `GRAPH` is extracted from `src/data/mockData.js` by brace-matching the object literal
  (mockData uses a bundler-only extensionless `./canon` import, so it can't be `import`-ed
  directly under Node ESM). Graph nodes/edges therefore stay in sync with the app's canon.

## Files & schemas

### `constellation-0417.json` · `constellation-0398.json` · `constellation-0311.json`
Vector-store point clouds for **Stratum 2** (2000 / 900 / 450 points).
Gaussian-mixture layout of 3 modality clusters in a flattened ellipsoid
(x,z ∈ ±14, y ∈ ±2.5): `img` ≈ 61 %, `txt` ≈ 30 %, `evt` ≈ 9 %.

```jsonc
{
  "caseId": "KP-2026-0417",
  "count": 2000,
  "points": [ { "id": "p0000", "x": -6.7, "y": 0.42, "z": 4.1, "m": "img" }, ... ],
  "topk": {                       // 12 spatially-clustered ids per canned query
    "q1": ["p1322", ...],         // q1..q4 map to the 4 AEGIS_QA scripted questions
    "q2": [...], "q3": [...], "q4": [...]
  }
}
```
- `m` ∈ `img` (cyan) | `txt` (indigo) | `evt` (amber).
- `topk` drives the retrieval choreography (top-k points flare → fly to drawer as citations).
  Anchors: q1/q2 → `txt`, q3 → `img`, q4 → `evt`; each set = the 12 nearest points to a
  seeded anchor, so they cluster plausibly together.

### `graph3d-0417.json`
3D positions for the **Stratum 3** knowledge graph (14 nodes / 16 edges from `GRAPH`).
Computed by a seeded 3D spring relaxation (Fruchterman-Reingold style, 300 iterations),
centered and scaled to bounding radius ≈ 8 with `y` compressed to ±3.

```jsonc
{
  "caseId": "KP-2026-0417",
  "nodes": [ { "id": "Subject-A", "x": -0.97, "y": 0.76, "z": 2.70 }, ... ],
  "edges": [ /* passthrough of GRAPH.links (source,target,type,peel,conf,...) */ ]
}
```

### `lake-blocks.json`
**Stratum 1** evidence-lake blocks — a 12×12 grid (144 blocks) per case, keyed by case id.

```jsonc
{
  "KP-2026-0417": [
    { "i": 0, "j": 0, "batch": "batch #100", "objects": 3460, "sealedAt": "2026-06-28T08:02:02Z" },
    ...
  ],
  "KP-2026-0398": [ ... ],
  "KP-2026-0311": [ ... ]
}
```
- `objects` ∈ 2800–3600. `sealedAt` = staggered fictional UTC custody-seal times
  (~7 min apart + jitter), per-case base offsets.

### `fusion-threads.json`
The 3 cross-case **FusionThreads** (spec §3).

```jsonc
{
  "method": "TAGNN cross-case inference",
  "threads": [
    {
      "id": "FT-01",
      "label": "shared wallet cluster",
      "from": { "case": "KP-2026-0417", "stratum": "S3" },
      "to":   { "case": "KP-2026-0311", "stratum": "S3" },
      "anchor": "S3",
      "conf": 0.91, "confLabel": "0.91",
      "color": "#f59e0b", "colorName": "gold",
      "method": "TAGNN cross-case inference",
      "evidence": [
        { "id": "WAL-0417-77", "type": "wallet", "case": "KP-2026-0417", "desc": "..." },
        { "id": "WAL-0311-12", "type": "wallet", "case": "KP-2026-0311", "desc": "..." }
      ]
    }
    // FT-02 Sentinel.S2 ↔ Courier.S2  coded-lexicon fingerprint · 0.84 · indigo
    // FT-03 Sentinel.S1 ↔ Harbor.S1   identical media hash ×3    · 1.00 · red
  ]
}
```
- Confidence values are never exactly round in the emitted JSON: FT-03 stores
  `conf: 0.999` with `confLabel: "1.00"` for the UI (the spec's "1.00" thread).

## Case ids
| id | name | clouds |
|---|---|---|
| `KP-2026-0417` | Operation Sentinel | 2000 pts, graph3d |
| `KP-2026-0398` | Night Courier | 900 pts |
| `KP-2026-0311` | Harbor Watch | 450 pts |
