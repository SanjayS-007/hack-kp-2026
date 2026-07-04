// Fusion Vault 3D — island layout + named camera poses (deterministic, recordable).
// Islands sit on a gentle arc in the void. Strata stack vertically within each island.

export const ISLAND_POSITIONS = {
  'KP-2026-0417': [0, 0, 0], // Operation Sentinel (primary)
  'KP-2026-0398': [-26, 0, -4], // Night Courier
  'KP-2026-0311': [26, 0, -4], // Harbor Watch
};

// Vertical offsets of each stratum within an island (local Y).
export const STRATA_Y = {
  lake: 0,
  constellation: 6,
  graph: 11,
  crown: 15.5,
};

// Per-stratum scale factors to fit the source datasets into an island footprint.
export const SCALE = {
  constellation: 0.42, // constellation JSON x,z ∈ ±14 → ±5.9
  graph: 0.55, // graph3d radius ≈ 8 → ≈ 4.4
  lakeSpacing: 0.62, // 12-block grid → ~7 wide
};

export function islandPos(caseId) {
  return ISLAND_POSITIONS[caseId] || [0, 0, -28];
}

// Build a camera pose {position:[x,y,z], target:[x,y,z]} for a named pose + focused island.
export function poseFor(name, caseId) {
  const [ix, iy, iz] = islandPos(caseId || 'KP-2026-0417');
  const P = {
    P0: { position: [0, 30, 46], target: [0, 6, -6] }, // vault-overview (absolute)
    P1: { position: [ix + 0, iy + 10, iz + 26], target: [ix, iy + 7, iz] }, // case-focus
    P2: { position: [ix + 0, iy + 3.5, iz + 15], target: [ix, iy + 0.5, iz] }, // lake skim
    P3: { position: [ix + 0.5, iy + 6, iz + 8.5], target: [ix, iy + 6, iz - 1.5] }, // inside constellation
    P4: { position: [ix + 11, iy + 13, iz + 17], target: [ix, iy + 11, iz] }, // graph orbit
    P5: { position: [ix + 0, iy + 26, iz + 0.01], target: [ix, iy + 15.5, iz] }, // crown top-down
    P6a: { position: [ix + 0, iy + 42, iz + 3], target: [ix, iy + 15.5, iz] }, // climb above crown
    P6b: { position: [ix + 0, iy + 9, iz + 8], target: [ix, iy + 1.5, iz] }, // dive down through strata
  };
  return P[name] || P.P0;
}

// Ordered list for HUD stratum breadcrumbs.
export const STRATA_POSES = [
  { key: 'lake', pose: 'P2', label: 'Evidence Lake' },
  { key: 'constellation', pose: 'P3', label: 'Vector Constellation' },
  { key: 'graph', pose: 'P4', label: 'Knowledge Graph' },
  { key: 'crown', pose: 'P5', label: 'Intelligence Crown' },
];
