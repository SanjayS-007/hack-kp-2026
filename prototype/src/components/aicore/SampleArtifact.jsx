// AEGIS-X — mock "sample artifact" panels shown in the engine drawer.
// Simple SVG/CSS only — offline-safe, deterministic. All synthetic.

function Frame({ children, label }) {
  return (
    <div className="rounded-lg border border-white/8 bg-navy-950/60 p-3">
      <div className="mb-2 text-[10px] font-semibold uppercase tracking-label text-ink-low">{label}</div>
      {children}
    </div>
  );
}

function GradCam() {
  return (
    <Frame label="Grad-CAM · attention heat tile">
      <svg viewBox="0 0 200 120" className="w-full rounded">
        <defs>
          <radialGradient id="gc" cx="58%" cy="42%" r="45%">
            <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.95" />
            <stop offset="40%" stopColor="#f59e0b" stopOpacity="0.7" />
            <stop offset="75%" stopColor="#22d3ee" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#0b1424" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="200" height="120" fill="#0b1424" />
        {Array.from({ length: 8 }).map((_, i) => (
          <line key={i} x1={i * 25} y1="0" x2={i * 25} y2="120" stroke="#16233c" strokeWidth="0.5" />
        ))}
        <rect width="200" height="120" fill="url(#gc)" />
        <rect x="88" y="34" width="42" height="42" fill="none" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="4 3" />
      </svg>
    </Frame>
  );
}

function AgeKde() {
  const pts = [];
  for (let x = 0; x <= 100; x++) {
    const y = Math.exp(-Math.pow((x - 40) / 14, 2)) * 90;
    pts.push(`${x * 2},${100 - y}`);
  }
  return (
    <Frame label="Apparent-age KDE · uncertainty band">
      <svg viewBox="0 0 200 110" className="w-full">
        <rect width="200" height="110" fill="#0b1424" />
        <polygon points={`52,100 ${pts.slice(20, 65).join(' ')} 128,100`} fill="#22d3ee" opacity="0.18" />
        <polyline points={pts.join(' ')} fill="none" stroke="#22d3ee" strokeWidth="1.6" />
        <line x1="80" y1="12" x2="80" y2="100" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 2" />
        <text x="84" y="20" fill="#f59e0b" fontSize="8" className="mono">9–12 · p=0.94</text>
        <text x="6" y="106" fill="#64748b" fontSize="7" className="mono">apparent age →</text>
      </svg>
    </Frame>
  );
}

function Pose() {
  const j = {
    head: [100, 20], neck: [100, 34], lsh: [80, 40], rsh: [120, 40],
    lel: [70, 62], rel: [130, 62], lhip: [88, 70], rhip: [112, 70],
    lkn: [84, 96], rkn: [116, 96],
  };
  const bones = [['head', 'neck'], ['neck', 'lsh'], ['neck', 'rsh'], ['lsh', 'lel'], ['rsh', 'rel'], ['neck', 'lhip'], ['neck', 'rhip'], ['lhip', 'lkn'], ['rhip', 'rkn']];
  return (
    <Frame label="YOLO-Pose · keypoint wireframe">
      <svg viewBox="0 0 200 110" className="w-full">
        <rect width="200" height="110" fill="#0b1424" />
        {bones.map(([a, b], i) => (
          <line key={i} x1={j[a][0]} y1={j[a][1]} x2={j[b][0]} y2={j[b][1]} stroke="#818cf8" strokeWidth="1.6" />
        ))}
        {Object.values(j).map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="2.4" fill="#22d3ee" />
        ))}
      </svg>
    </Frame>
  );
}

function Synth() {
  return (
    <Frame label="3-stream synthetic verdict">
      <div className="space-y-1.5">
        {[
          ['C2PA provenance', 'MISSING', '#f59e0b'],
          ['SynthID watermark', 'NOT FOUND', '#f59e0b'],
          ['DINOv2-G forensics', 'GAN fingerprint 97.4%', '#f43f5e'],
        ].map(([k, v, c]) => (
          <div key={k} className="flex items-center justify-between text-[11px]">
            <span className="text-ink-mid">{k}</span>
            <span className="mono font-semibold" style={{ color: c }}>{v}</span>
          </div>
        ))}
        <div className="mt-1 flex items-center justify-between border-t border-white/8 pt-1.5 text-[11px]">
          <span className="font-semibold text-ink-hi">Fused verdict</span>
          <span className="mono font-bold text-rose-400">AI-GENERATED 98.2%</span>
        </div>
      </div>
    </Frame>
  );
}

function Hashlist() {
  return (
    <Frame label="Known-hash prefilter · match log">
      <div className="space-y-1 font-mono text-[10px]">
        {[
          ['a3f9c2e1…', 'MATCH · ProjectVIC', '#34d399'],
          ['b7d4e0a9…', 'MATCH · PhotoDNA', '#34d399'],
          ['9f86d081…', 'NO-MATCH → AI', '#22d3ee'],
          ['4e074085…', 'MATCH · NCMEC', '#34d399'],
        ].map(([h, s, c]) => (
          <div key={h} className="flex items-center justify-between">
            <span className="text-ink-low">{h}</span>
            <span style={{ color: c }}>{s}</span>
          </div>
        ))}
      </div>
    </Frame>
  );
}

function Ner() {
  const toks = [
    ['meet me by the', null], ['riverside', 'CODE'], ['after', null], ['Subject-A', 'PER'], ['near', null], ['Riverside Park', 'LOC'],
  ];
  return (
    <Frame label="NER + coded-lexicon tagging">
      <div className="flex flex-wrap gap-1 text-[11px]">
        {toks.map(([t, tag], i) =>
          tag ? (
            <span key={i} className="rounded bg-indigo-500/20 px-1.5 py-0.5 text-indigo-200">
              {t}<span className="ml-1 text-[8px] text-indigo-400">{tag}</span>
            </span>
          ) : (
            <span key={i} className="px-0.5 py-0.5 text-ink-mid">{t}</span>
          ),
        )}
      </div>
    </Frame>
  );
}

function Embed() {
  return (
    <Frame label="Vector index · 384-dim projection">
      <svg viewBox="0 0 200 100" className="w-full">
        <rect width="200" height="100" fill="#0b1424" />
        {Array.from({ length: 46 }).map((_, i) => {
          const x = 20 + ((i * 37) % 160);
          const y = 14 + ((i * 53) % 74);
          return <circle key={i} cx={x} cy={y} r="2" fill="#818cf8" opacity={0.4 + ((i % 5) / 8)} />;
        })}
        <circle cx="120" cy="46" r="14" fill="none" stroke="#22d3ee" strokeWidth="1" strokeDasharray="3 2" />
        <text x="136" y="44" fill="#22d3ee" fontSize="7" className="mono">top-k</text>
      </svg>
    </Frame>
  );
}

function Heatline() {
  return (
    <Frame label="Temporal anomaly heatline">
      <svg viewBox="0 0 200 44" className="w-full">
        <rect width="200" height="44" fill="#0b1424" />
        {Array.from({ length: 40 }).map((_, i) => {
          const hot = i === 26 || i === 27 || i === 12;
          const h = hot ? 34 : 6 + ((i * 13) % 14);
          return <rect key={i} x={i * 5} y={44 - h} width="4" height={h} fill={hot ? '#f43f5e' : '#f59e0b'} opacity={hot ? 0.95 : 0.4} />;
        })}
        <text x="120" y="12" fill="#f43f5e" fontSize="7" className="mono">late-night burst</text>
      </svg>
    </Frame>
  );
}

function Cypher() {
  return (
    <Frame label="Neo4j upsert · Cypher">
      <pre className="whitespace-pre-wrap font-mono text-[10px] leading-relaxed text-cyan-accent/90">{`MERGE (s:Subject {id:'Subject-B'})
MERGE (f:File {id:'FILE-2291'})
MERGE (s)-[:LINKED {conf:0.84}]->(f)
RETURN s, f  // 38 nodes / 91 edges`}</pre>
    </Frame>
  );
}

function LinkPred() {
  return (
    <Frame label="TAGNN link-prediction · candidates">
      <div className="space-y-1 font-mono text-[10px]">
        {[
          ['Mixer → Subject-C', '0.89'],
          ['Hash-1 → Subject-C', '0.84'],
          ['Subject-C → Wallet-1', '0.77'],
        ].map(([e, c]) => (
          <div key={e} className="flex items-center justify-between">
            <span className="text-ink-mid">{e}</span>
            <span className="text-amber-300">{c}</span>
          </div>
        ))}
      </div>
    </Frame>
  );
}

function Risk() {
  const bars = [['severity', 38, '#f43f5e'], ['anomaly', 24, '#f59e0b'], ['centrality', 21, '#818cf8'], ['recency', 14, '#22d3ee']];
  return (
    <Frame label="Composite risk · factor breakdown">
      <div className="space-y-1.5">
        {bars.map(([k, v, c]) => (
          <div key={k} className="flex items-center gap-2 text-[10px]">
            <span className="w-16 text-ink-mid">{k}</span>
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface-2">
              <div className="h-full rounded-full" style={{ width: `${v}%`, background: c }} />
            </div>
            <span className="mono w-6 text-right text-ink-low">{v}</span>
          </div>
        ))}
      </div>
    </Frame>
  );
}

function Verify() {
  return (
    <Frame label="Verifier · claim re-derivation">
      <div className="space-y-1.5 text-[10px]">
        {[
          ['claim re-derived from EV-001', '✓ 0.94'],
          ['claim re-derived from EV-003', '✓ 0.91'],
          ['claim re-derived from EV-005', '✓ 0.98'],
          ['statement below gate (0.71)', '✕ excluded'],
        ].map(([k, v], i) => (
          <div key={k} className="flex items-center justify-between">
            <span className="text-ink-mid">{k}</span>
            <span className={`mono font-semibold ${i === 3 ? 'text-ink-low' : 'text-emerald-400'}`}>{v}</span>
          </div>
        ))}
      </div>
    </Frame>
  );
}

const MAP = {
  hashlist: Hashlist,
  gradcam: GradCam,
  agekde: AgeKde,
  pose: Pose,
  synth: Synth,
  ner: Ner,
  embed: Embed,
  heatline: Heatline,
  cypher: Cypher,
  linkpred: LinkPred,
  risk: Risk,
  verify: Verify,
};

export default function SampleArtifact({ kind }) {
  const C = MAP[kind] || Hashlist;
  return <C />;
}
