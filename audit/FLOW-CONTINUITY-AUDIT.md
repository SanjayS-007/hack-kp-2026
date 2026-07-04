# AEGIS-X — FLOW-CONTINUITY AUDIT (v5 demo journey)

Mission: "still it has many blocks in demo clicking and flow, and it's not continuous."
Audited both journeys with Playwright (chromium, swiftshader, 1600×900, real element clicks, 1× speed).
Vault rendered in **3D** mode (WebGL via swiftshader OK). Console errors during walk: **0**.

## Guided-demo walk — raw timing (before fix)
| WP | id | result | target-appear | dead-time since prev |
|----|----|--------|--------------|----------------------|
| 0 | new-case | ok | 47ms | 47ms |
| 1 | acquire-bundle | ok | 5ms | 523ms |
| 2 | acquire-begin | ok | 3ms | 516ms |
| 3 | analyze-continue | ok | **15,197ms** | **15,713ms** |
| 4 | seal-name | ok | 4ms | 519ms |
| 5 | seal-button | ok | 5ms | 520ms |
| 6 | open-case | ok | **2,256ms** | 2,757ms |
| 7 | nav-ask | visible; click flaked once | 6ms | 512ms |
| 8 | ask-chip | (downstream of 7 flake) | — | — |
| 15 | fusion-view | **STALL** (never appeared) | — | 6,596ms |
| 17 | compile-report | **STALL + STALL-after-recovery** | — | 6,506ms |
| 18 | report-seal | **STALL** (downstream) | — | 10,037ms |

## Block list

| # | Where | Block type | Severity | Root cause (file:line) | Fix plan |
|---|-------|-----------|----------|------------------------|----------|
| 1 | Guided WP15 `fusion-view` (after report-generate) | **stall / backtrack** | **CRITICAL** | Waypoint jumps to a Vault-only target while presenter is on `/report`; no "return to Vault" waypoint. `demoWaypoints.js:22`; report case-chip has no `data-demo` (`Layout.jsx:41-52`) | Insert `return-vault` waypoint targeting the case-chip; add `data-demo="return-vault"` to the chip. |
| 2 | Guided WP17 `compile-report` (after fusion-thread) | **stall** | **CRITICAL** | `compile-report` lives inside the Risk-Proof panel that only renders when `proofsOpen`, reached by flying to Crown P5; no waypoints for propose-joint / focus / crown. `demoWaypoints.js:23-24`; `VaultHud.jsx:208-249`; proofs auto-open only on P5 (`Vault3D.jsx:114-116`) | Insert `propose-joint` + `nav-crown` waypoints; `proposeJoint` focuses the primary case so the Crown breadcrumb is reachable; add `data-demo="nav-crown"` to the crown breadcrumb. |
| 3 | Guided WP18 `report-seal` | **stall (downstream)** | High | Chain break upstream (#1,#2) means compile never runs; seal also disabled until report `generated` (`CourtReport.jsx:342`) | Fixing #1/#2 restores reach; seal target already visible, enables after fromCompile auto-generate. |
| 4 | Guided — missing `propose-joint` beat | **unclear / dead-end** | Medium | Narrative "thread → joint → Crown" but no waypoint for the joint button (`EvidencePairPanel.jsx:50-56`) | Add `propose-joint` waypoint (see #2). |
| 5 | Demo HUD — no force-advance control | **stall insurance** | **High** | `DemoMode.jsx:159-216` HUD lacks a "next waypoint" button; a single flaked/again-not-actionable click freezes the pointer (observed: pointer stuck at WP7 for rest of run) | Add a ► "next waypoint" button that force-advances live on stage. |
| 6 | Guided WP3 `analyze-continue` | **long dead-time** | Medium | 15.2s of Process+AI-Core auto-run behind a dim "waiting…" scrim with only a tiny top pill (`DemoMode.jsx:110-118`; auto-run `Process.jsx:37`, `AiCorePass.jsx`) | Reassuring "auto-running" waiting panel that shows the beat + note; keep pipeline visible. |
| 7 | Vault→Console transition (open-case / Enter Console) | **hard-cut + latency** | Medium | Lazy 3D world unmounts, console mounts with only `pageEnter` fade; 3D refetches all JSON on next mount (`Vault3D.jsx:58-82`); 2.3s open-case gap; transient click instability | Module-cache 3D datasets (instant remount, no "Materializing…"); trim bootstrap delay. |
| 8 | Console→Vault return (case chip) | **hard-cut** | Medium | `navigate('/')` remounts lazy 3D with "Materializing Fusion Vault…" + full refetch (`Vault3D.jsx:58-82`) | Same module-cache fix removes the loader/blank on return. |
| 9 | Manual finale — Compile discoverability | **missing affordance** | Medium | Reaching Compile needs a non-obvious 5-step path with no "next" cue after each beat (`VaultHud.jsx`) | Guided waypoints cover it; keep Compile button glowing; proofs auto-open on Crown. |
| 10 | Manual — after report Sign & Seal | **dead-end** | Medium | Only a toast fires; no CTA to close the loop back to the (now-green) vault gem (`CourtReport.jsx:295-306`) | Add a pulsing "Return to Vault" CTA after seal. |
| 11 | Guided WP4 `seal-name` | **unclear** | Low | Clicking the name input advances the pointer to the Seal button before the presenter types; the "type the case name" beat is skipped (`DemoMode.jsx:257-259`) | Advance this waypoint on `input` (value present), not on click. |
| 12 | Vault search box | **dead-click** | Low | Decorative input with no handler (`VaultHud.jsx:60-63`) | Low priority; leave as ambient (out of journey path). |

Legend severity: CRITICAL = presenter freezes mid-demo; High = stage risk; Medium = jarring; Low = cosmetic.

---

## POST-FIX VERIFICATION (all re-run with Playwright, 1× speed)

### Fixes applied
| # | Fix | Files |
|---|-----|-------|
| 1 | Airtight 22-waypoint chain: inserted `return-vault`, `propose-joint`, `nav-crown`; input-advance + waitEnabled flags | `demoWaypoints.js` |
| 2 | `data-demo="return-vault"` on the console case-chip | `Layout.jsx` |
| 3 | `data-demo="nav-crown"` on the Crown breadcrumb; **lift breadcrumbs + stratum chip clear of the Demo HUD while a demo runs** (they collided at bottom-center) | `VaultHud.jsx` |
| 4 | `proposeJoint` focuses the primary case so the Crown breadcrumb is reachable | `Vault3D.jsx` |
| 5 | Module-cache the 3D datasets → instant vault remount (kills "Materializing…" blank on console→vault / seal→vault); trimmed bootstrap flight to 150ms | `Vault3D.jsx` |
| 6 | Demo HUD **► force-advance button** + `ArrowRight` hotkey (live-stage insurance) | `DemoMode.jsx` |
| 7 | `advanceOn:'input'` — the name-field waypoint advances on typing, not a stray click; richer "waiting" panel | `DemoMode.jsx` |
| 8 | Compile→report resilience: persist compile intent in `sessionStorage` (survives the WebGL-teardown reload) + removed a StrictMode-fatal ref-guard that wiped the generation timers | `Vault3D.jsx`, `CourtReport.jsx` |
| 9 | Pulsing **"Return to Vault"** CTA after Sign & Seal (manual dead-end) + `.cta-pulse` keyframes | `CourtReport.jsx`, `motion.css` |

### Guided demo — final per-waypoint timing (0 stalls, 0 console errors, report sealed)
| WP | id | status | target-appear |
|----|----|--------|--------------|
| 0 | new-case | ok | (initial vault boot) |
| 1 | acquire-bundle | ok | 5ms |
| 2 | acquire-begin | ok | 6ms |
| 3 | analyze-continue | ok | 15,254ms (Process+AI-Core auto-run) |
| 4 | seal-name | ok | 8ms |
| 5 | seal-button | ok | 3ms |
| 6 | open-case | ok | ~8s (seal ceremony + 3D re-materialize; swiftshader) |
| 7 | nav-ask | ok | 24ms |
| 8 | ask-chip | ok | 5,619ms (agent trace) |
| 9 | nav-graph | ok | 5ms |
| 10 | graph-gnn | ok | 23ms |
| 11 | nav-synthetic | ok | 9ms |
| 12 | synthetic-reanalyze | ok | 36ms |
| 13 | nav-report | ok | 6ms |
| 14 | report-generate | ok | 4ms |
| 15 | return-vault | ok | 325ms |
| 16 | fusion-view | ok | 5ms |
| 17 | fusion-thread | ok | 1,354ms |
| 18 | propose-joint | ok | 6ms |
| 19 | nav-crown | ok | 836ms |
| 20 | compile-report | ok | 512ms |
| 21 | report-seal | ok | 3,269ms |
| — | **final** | **waypoint 22/22 · stalls 0 · consoleErrors 0 · reportSealed=1** | |

### Manual journey — every CTA leads to the next affordance
All beats `ok`: New Case → Genesis(5) → Seal → Open Case → Dashboard → Triage/Ask/Graph-GNN/Synthetic/AI-Core →
case-chip→Vault → Fusion View → thread → Propose Joint → Crown → Compile (dive) → Report → **Sign & Seal** →
**Return to Vault** CTA → Vault (crown gem green). `reportSealed=1`, **console errors 0**.

### Build / route sweep
- `npm run build` → clean (exit 0).
- 12-route console sweep (`/ /?flat /genesis /dashboard /triage /graph /timeline /ask /aicore /synthetic /queue /report`) → **0 errors**.

