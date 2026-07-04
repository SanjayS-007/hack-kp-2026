import { useEffect, useRef, useState } from 'react';
import { HardDrives, GlobeHemisphereWest, VideoCamera, CloudArrowDown } from '@phosphor-icons/react';
import {
  Check,
  Square,
  CheckSquare,
  ArrowRight,
  ShieldCheck,
  Lock,
  UploadCloud,
  FileDigit,
  Circle,
  Loader2,
} from 'lucide-react';
import { LOCAL_FILES, NET_PRESETS, CLOUD_PROVIDERS, CLOUD_BUCKET } from '../../data/mockData';
import { dur } from '../../lib/speed';

const MODALITIES = [
  { id: 'local', title: 'Local / Forensic Image', desc: 'Write-blocked disk images & extractions', Icon: HardDrives, accent: '#22d3ee' },
  { id: 'network', title: 'Network / Remote', desc: 'Warrant returns, CyberTipline, crawl jobs', Icon: GlobeHemisphereWest, accent: '#818cf8' },
  { id: 'live', title: 'Live Stream / Field Kit', desc: 'On-scene capture with custody stamps', Icon: VideoCamera, accent: '#f43f5e' },
  { id: 'cloud', title: 'Cloud Locker', desc: 'Warrant-scoped provider buckets', Icon: CloudArrowDown, accent: '#34d399' },
];

function ModalityCard({ m, active, onClick }) {
  const { Icon } = m;
  return (
    <button
      onClick={onClick}
      className={`card card-hover relative overflow-hidden p-4 text-left ${active ? 'ring-1 ring-cyan-accent' : ''}`}
    >
      <div className="flex items-start gap-3">
        <span
          className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
          style={{ background: `${m.accent}18`, boxShadow: active ? `0 0 16px ${m.accent}55` : 'none', border: `1px solid ${m.accent}44` }}
        >
          <Icon size={26} weight="duotone" color={m.accent} />
        </span>
        <div className="min-w-0">
          <div className="text-sm font-semibold text-white">{m.title}</div>
          <div className="mt-0.5 text-xs text-ink-mid">{m.desc}</div>
          <div className="mt-1.5 flex items-center gap-1 text-[10px] text-ink-low">
            <Lock size={10} /> SHA-256 seal at first touch
          </div>
        </div>
      </div>
    </button>
  );
}

function LocalPanel({ sel, setSel, sealed, setSealed }) {
  const [drag, setDrag] = useState(false);
  const toggle = (id) => setSel((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  const onDrop = (e) => {
    e.preventDefault();
    setDrag(false);
    setSealed(true);
    setSel(LOCAL_FILES.map((f) => f.id));
  };
  return (
    <div className="animate-fade-in">
      <div className="mb-2 flex items-center justify-between">
        <div className="mono text-xs text-ink-mid">
          Evidence Locker <span className="text-ink-low">▸</span> Seizure 2026-06-28
        </div>
        <span className="badge bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/30">
          <ShieldCheck size={11} /> WRITE-BLOCKER: ACTIVE
        </span>
      </div>

      <div className="space-y-1.5">
        {LOCAL_FILES.map((f) => {
          const on = sel.includes(f.id);
          return (
            <div
              key={f.id}
              className={`flex items-center gap-3 rounded-lg border px-3 py-2 transition-colors ${
                on ? 'border-cyan-accent/40 bg-surface-2/60' : 'border-white/5 bg-surface-1/50'
              }`}
            >
              <button onClick={() => toggle(f.id)} className={on ? 'text-cyan-accent' : 'text-ink-low'}>
                {on ? <CheckSquare size={16} /> : <Square size={16} />}
              </button>
              <FileDigit size={16} className="text-ink-low" />
              <span className="mono flex-1 text-sm text-ink-hi">{f.name}</span>
              <span className="mono text-xs text-ink-mid">{f.size}</span>
              {sealed && (
                <span className="badge animate-fade-in bg-emerald-500/15 text-emerald-300">
                  <Lock size={10} /> sha256 ✓
                </span>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-3 flex items-center gap-3">
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDrag(true);
          }}
          onDragLeave={() => setDrag(false)}
          onDrop={onDrop}
          className={`flex flex-1 items-center justify-center gap-2 rounded-lg border-2 border-dashed py-4 text-xs transition-all ${
            drag ? 'border-cyan-accent bg-cyan-accent/10 text-cyan-accent' : 'border-white/10 text-ink-low'
          }`}
        >
          <UploadCloud size={16} /> Drop seizure bundle to seal &amp; ingest
        </div>
        <div
          draggable
          onDragStart={(e) => e.dataTransfer.setData('text/plain', 'bundle')}
          data-demo="acquire-bundle"
          className="flex cursor-grab items-center gap-2 rounded-lg bg-surface-2 px-3 py-2 text-xs font-medium text-ink-hi active:cursor-grabbing"
          title="Drag me into the dropzone"
        >
          <FileDigit size={14} className="text-cyan-accent" /> Seizure bundle
        </div>
        <button className="rounded-lg bg-surface-2 px-3 py-2 text-xs font-medium text-ink-mid hover:text-ink-hi">Browse…</button>
      </div>
    </div>
  );
}

function NetworkPanel({ sources, setSources }) {
  const [url, setUrl] = useState('');
  const [phase, setPhase] = useState('idle'); // idle | handshake | done
  const timers = useRef([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const valid = /^https?:\/\/|^s3:\/\//i.test(url);
  const submit = () => {
    if (phase === 'handshake') return;
    setPhase('handshake');
    timers.current.push(
      setTimeout(() => {
        setPhase('done');
        setSources((s) => [...s, url || 'Warrant return (S3 presigned)']);
        setUrl('');
        timers.current.push(setTimeout(() => setPhase('idle'), dur(400)));
      }, dur(1200)),
    );
  };
  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-2">
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https:// or s3:// warrant-return URL"
          className={`flex-1 rounded-lg border bg-navy-950/60 px-3 py-2 text-sm text-ink-hi outline-none transition-colors ${
            url ? (valid ? 'border-emerald-500/40' : 'border-rose-500/40') : 'border-white/8'
          }`}
        />
        <button
          onClick={submit}
          disabled={phase === 'handshake'}
          className="flex items-center gap-1.5 rounded-lg bg-cyan-accent px-3 py-2 text-xs font-semibold text-navy-950 disabled:opacity-60"
        >
          {phase === 'handshake' ? (
            <>
              <span className="flex gap-0.5">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-navy-950" />
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-navy-950" style={{ animationDelay: '150ms' }} />
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-navy-950" style={{ animationDelay: '300ms' }} />
              </span>
              TLS…
            </>
          ) : (
            <>
              <Lock size={13} /> Submit
            </>
          )}
        </button>
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        {NET_PRESETS.map((p) => (
          <button
            key={p}
            onClick={() => setUrl(p)}
            className="rounded-full border border-white/8 bg-surface-2/60 px-3 py-1 text-xs text-ink-mid hover:border-cyan-accent/40 hover:text-cyan-accent"
          >
            {p}
          </button>
        ))}
      </div>
      {sources.length > 0 && (
        <div className="mt-3 space-y-1.5">
          {sources.map((s, i) => (
            <div key={i} className="flex animate-fade-in items-center gap-2 rounded-lg bg-surface-2/50 px-3 py-2 text-xs">
              <Lock size={12} className="text-emerald-400" />
              <span className="mono flex-1 text-ink-hi">{s}</span>
              <span className="badge bg-emerald-500/15 text-emerald-300">TLS 1.3 · sealed</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function NoiseCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf;
    let scan = 0;
    const draw = () => {
      const w = (c.width = c.clientWidth);
      const h = (c.height = c.clientHeight);
      const img = ctx.createImageData(w, h);
      for (let i = 0; i < img.data.length; i += 4) {
        const v = 20 + Math.random() * 60;
        img.data[i] = v * 0.3;
        img.data[i + 1] = v * 0.7;
        img.data[i + 2] = v;
        img.data[i + 3] = 255;
      }
      ctx.putImageData(img, 0, 0);
      scan = (scan + 3) % h;
      ctx.fillStyle = 'rgba(34,211,238,0.18)';
      ctx.fillRect(0, scan, w, 2);
      if (!reduce) raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);
  return <canvas ref={ref} className="h-full w-full" />;
}

function LivePanel({ on, setOn, segs, setSegs }) {
  const [elapsed, setElapsed] = useState(0);
  useEffect(() => {
    if (!on) return;
    const t = setInterval(() => setElapsed((e) => e + 1), 1000);
    const s = setInterval(() => setSegs((x) => [`SEG-${(x.length + 1).toString().padStart(3, '0')} · custody stamped`, ...x].slice(0, 4)), 3000);
    return () => {
      clearInterval(t);
      clearInterval(s);
    };
  }, [on, setSegs]);
  const mm = Math.floor(elapsed / 60).toString().padStart(2, '0');
  const ss = (elapsed % 60).toString().padStart(2, '0');
  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between">
        <span className="badge bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/30">Edge Kit E-KIT-07 · PAIRED ✓</span>
        <div className="flex items-center gap-2">
          {on && (
            <span className="flex items-center gap-1.5 text-xs text-rose-400">
              <Circle size={9} className="animate-pulse fill-rose-500 text-rose-500" /> REC <span className="mono">{mm}:{ss}</span>
            </span>
          )}
          <button
            onClick={() => setOn((v) => !v)}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${on ? 'bg-rose-500/15 text-rose-300' : 'bg-cyan-accent text-navy-950'}`}
          >
            {on ? 'Stop' : 'Start capture'}
          </button>
        </div>
      </div>
      <div className="mt-2 h-40 overflow-hidden rounded-lg border border-white/8 bg-navy-950">
        {on ? <NoiseCanvas /> : <div className="flex h-full items-center justify-center text-xs text-ink-low">Feed idle — press Start capture</div>}
      </div>
      {segs.length > 0 && (
        <div className="mt-2 space-y-1">
          {segs.map((s, i) => (
            <div key={s + i} className="flex animate-slide-in-top items-center gap-2 text-[11px] text-ink-mid">
              <Lock size={10} className="text-emerald-400" /> <span className="mono">{s}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function CloudPanel({ connected, setConnected, sel, setSel }) {
  const [modal, setModal] = useState(null); // provider being connected
  const [busy, setBusy] = useState(false);
  const connectTimer = useRef(0);
  useEffect(() => () => clearTimeout(connectTimer.current), []);
  const connect = (p) => {
    setModal(p);
    setBusy(true);
    connectTimer.current = setTimeout(() => {
      setBusy(false);
      setConnected(p.id);
      setModal(null);
    }, dur(900));
  };
  const allSel = sel.length === CLOUD_BUCKET.length;
  return (
    <div className="animate-fade-in">
      <div className="grid grid-cols-3 gap-2">
        {CLOUD_PROVIDERS.map((p) => (
          <button
            key={p.id}
            onClick={() => connect(p)}
            className={`rounded-lg border p-3 text-left text-xs transition-colors ${
              connected === p.id ? 'border-emerald-500/40 bg-emerald-500/10' : 'border-white/8 bg-surface-1/50 hover:border-cyan-accent/40'
            }`}
          >
            <div className="font-semibold text-ink-hi">{p.name}</div>
            <div className="text-ink-low">{p.note}</div>
            {connected === p.id && <div className="mt-1 flex items-center gap-1 text-emerald-400"><Check size={11} /> connected</div>}
          </button>
        ))}
      </div>

      {modal && (
        <div className="mt-3 flex items-center gap-2 rounded-lg border border-cyan-accent/30 bg-cyan-accent/5 px-3 py-2 text-xs">
          {busy ? (
            <>
              <Loader2 size={14} className="animate-spin text-cyan-accent" /> Authorizing {modal.name}…
            </>
          ) : null}
        </div>
      )}

      {connected && (
        <div className="mt-3">
          <div className="mb-1.5 flex items-center justify-between">
            <span className="badge bg-emerald-500/15 text-emerald-300">Authorized · warrant-scoped</span>
            <button
              onClick={() => setSel(allSel ? [] : CLOUD_BUCKET.map((_, i) => i))}
              className="flex items-center gap-1.5 text-xs text-ink-mid hover:text-cyan-accent"
            >
              {allSel ? <CheckSquare size={14} className="text-cyan-accent" /> : <Square size={14} />} Select all
            </button>
          </div>
          <div className="space-y-1">
            {CLOUD_BUCKET.map((o, i) => {
              const on = sel.includes(i);
              return (
                <button
                  key={o.name}
                  onClick={() => setSel((s) => (s.includes(i) ? s.filter((x) => x !== i) : [...s, i]))}
                  className="flex w-full items-center gap-2 rounded-lg bg-surface-2/50 px-3 py-1.5 text-xs"
                >
                  {on ? <CheckSquare size={14} className="text-cyan-accent" /> : <Square size={14} className="text-ink-low" />}
                  <span className="mono flex-1 text-left text-ink-hi">{o.name}</span>
                  <span className="mono text-ink-mid">{o.size}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Acquire({ onNext }) {
  const [active, setActive] = useState('local');
  const [localSel, setLocalSel] = useState([]);
  const [sealed, setSealed] = useState(false);
  const [netSources, setNetSources] = useState([]);
  const [liveOn, setLiveOn] = useState(false);
  const [liveSegs, setLiveSegs] = useState([]);
  const [cloudConn, setCloudConn] = useState(null);
  const [cloudSel, setCloudSel] = useState([]);

  const chips = [];
  if (localSel.length) chips.push(`${localSel.length} forensic image${localSel.length > 1 ? 's' : ''} · 2.4 TB`);
  if (netSources.length) chips.push(`${netSources.length} remote source${netSources.length > 1 ? 's' : ''}`);
  if (liveOn || liveSegs.length) chips.push(`live capture · ${liveSegs.length} segments`);
  if (cloudSel.length) chips.push(`${cloudSel.length} cloud object${cloudSel.length > 1 ? 's' : ''}`);
  const canBegin = chips.length > 0;

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-xl font-bold text-white">Acquire evidence sources</h2>
        <p className="text-sm text-ink-mid">Every source is hash-sealed the moment it is touched. Select one or more intake modalities.</p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {MODALITIES.map((m) => (
          <ModalityCard key={m.id} m={m} active={active === m.id} onClick={() => setActive(m.id)} />
        ))}
      </div>

      <div className="card-3 mt-4 p-4">
        {active === 'local' && <LocalPanel sel={localSel} setSel={setLocalSel} sealed={sealed} setSealed={setSealed} />}
        {active === 'network' && <NetworkPanel sources={netSources} setSources={setNetSources} />}
        {active === 'live' && <LivePanel on={liveOn} setOn={setLiveOn} segs={liveSegs} setSegs={setLiveSegs} />}
        {active === 'cloud' && <CloudPanel connected={cloudConn} setConnected={setCloudConn} sel={cloudSel} setSel={setCloudSel} />}
      </div>

      {/* persistent bottom bar */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/5 bg-surface-1/60 p-3">
        <div className="flex flex-wrap items-center gap-2">
          {chips.length ? (
            chips.map((c) => (
              <span key={c} className="badge bg-cyan-accent/10 text-cyan-accent">
                {c}
              </span>
            ))
          ) : (
            <span className="text-xs text-ink-low">Select at least one source to continue</span>
          )}
        </div>
        <button
          onClick={onNext}
          disabled={!canBegin}
          data-demo="acquire-begin"
          className="flex items-center gap-2 rounded-lg bg-cyan-accent px-4 py-2.5 text-sm font-bold text-navy-950 transition-all hover:shadow-glow disabled:opacity-40"
        >
          Begin Ingestion <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
