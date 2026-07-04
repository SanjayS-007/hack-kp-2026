import { useState } from 'react';
import {
  Sparkles,
  Eye,
  EyeOff,
  CheckSquare,
  Square,
  Video,
  Image as ImageIcon,
  HeartPulse,
  Bot,
  AlertCircle,
  X,
  MapPin,
  ArrowUpDown,
  LayoutGrid,
  Rows3,
  ShieldAlert,
} from 'lucide-react';
import { MEDIA, CAT_META, DEVICES } from '../data/mockData';
import { CANON } from '../data/canon';
import { CatBadge, PageHeader, Badge, useDocumentTitle } from '../components/ui';
import ArtifactInspector, { useInspectorNav } from '../components/inspector/ArtifactInspector';
import { strataTrail } from '../data/inspector';

// deterministic per-tile detail derived from id
function tileDetail(item) {
  const seed = parseInt(item.id.slice(-2), 10);
  return {
    exif: seed % 3 !== 0,
    duration: `0:${(10 + (seed % 40)).toString().padStart(2, '0')}`,
    mac: {
      created: `2026-03-${(9 + (seed % 14)).toString().padStart(2, '0')} 0${seed % 6}:1${seed % 6}`,
      modified: `2026-03-${(10 + (seed % 13)).toString().padStart(2, '0')} 0${(seed + 2) % 6}:2${seed % 6}`,
      accessed: `2026-06-30 14:0${seed % 6}`,
    },
    pose: item.cat === 'A' ? 'keypoints: minor-consistent' : item.cat === 'B' ? 'partial skeleton' : 'no pose lock',
  };
}

function DuotoneField({ item, revealed, explain, large }) {
  const m = CAT_META[item.cat];
  const tint = item.needsReview ? '#38bdf8' : m.color;
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* desaturated slate/navy duotone base — reads as blurred evidence, not candy */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 38% 30%, #334155 0%, #1e293b 55%, #0f172a 100%)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(circle at 70% 78%, #475569 0%, transparent 45%)', opacity: 0.5 }}
      />
      {/* faint per-severity tint (<=12%) */}
      <div className="absolute inset-0" style={{ background: tint, opacity: 0.1, mixBlendMode: 'soft-light' }} />
      {/* blur + grain */}
      <div
        className="absolute inset-0 transition-all duration-300 dot-bg"
        style={{ backdropFilter: revealed ? 'blur(5px)' : `blur(${large ? 16 : 20}px)`, opacity: 0.6 }}
      />
      {/* Grad-CAM heat: off-center blended radials */}
      {explain && (
        <div
          className="pointer-events-none absolute inset-0 animate-fade-in"
          style={{
            background:
              'radial-gradient(circle at 58% 42%, rgba(244,63,94,0.55) 0%, transparent 38%), radial-gradient(circle at 46% 55%, rgba(245,158,11,0.45) 0%, transparent 42%)',
            opacity: 0.85,
            mixBlendMode: 'screen',
          }}
        />
      )}
    </div>
  );
}

function WellbeingBanner() {
  return (
    <div className="card mb-5 flex items-center gap-4 border-emerald-500/25 p-4">
      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-500/15 ring-1 ring-emerald-500/30">
        <HeartPulse className="text-emerald-400" size={22} />
      </div>
      <div className="flex-1">
        <div className="text-sm font-semibold text-emerald-300">Investigator Wellbeing Active</div>
        <div className="text-xs text-ink-mid">
          AI triage reduced human review volume by <span className="font-bold text-emerald-400">{CANON.reviewReduction}%</span>. All media
          blurred-by-default · desaturated · XAI-explained · exposure-minimized.
        </div>
      </div>
      <Badge color="#34d399">BLUR-BY-DEFAULT</Badge>
    </div>
  );
}

function MediaTile({ item, selected, onSelect, onOpen, index, compact }) {
  const [explain, setExplain] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const review = item.needsReview;
  const m = CAT_META[item.cat];
  const topColor = review ? '#38bdf8' : m.color;
  const barColor = topColor;
  const d = tileDetail(item);

  return (
    <div
      className={`card card-hover group relative animate-fade-in cursor-pointer overflow-hidden ${
        selected ? 'ring-2 ring-cyan-accent' : ''
      }`}
      style={{ animationDelay: `${index * 30}ms`, animationFillMode: 'backwards' }}
      onClick={() => onOpen(item.id)}
    >
      {/* 3px severity top border */}
      <div className="h-[3px] w-full" style={{ background: topColor, boxShadow: `0 0 8px ${topColor}88` }} />

      <div className={`relative ${compact ? 'aspect-[4/3]' : 'aspect-square'} overflow-hidden`}>
        <DuotoneField item={item} revealed={revealed} explain={explain} />

        {explain && (
          <span className="badge absolute left-2 top-2 z-10 bg-navy-950/80 text-cyan-accent ring-1 ring-cyan-accent/40">
            XAI
          </span>
        )}

        {/* top-left controls (hide when XAI tag occupies) */}
        {!explain && (
          <div className="absolute left-2 top-2 z-10 flex items-center gap-1.5">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelect(item.id);
              }}
              className={`flex h-6 w-6 items-center justify-center rounded ${
                selected ? 'bg-cyan-accent text-navy-950' : 'bg-navy-950/70 text-ink-mid'
              }`}
              aria-label="Select tile"
            >
              {selected ? <CheckSquare size={13} /> : <Square size={13} />}
            </button>
            <span className="badge bg-navy-950/70 text-ink-mid">
              {item.type === 'video' ? <Video size={11} /> : <ImageIcon size={11} />}
              {item.type === 'video' && <span className="mono ml-0.5">{d.duration}</span>}
            </span>
          </div>
        )}

        <div className="absolute right-2 top-2 z-10">
          {review ? (
            <span className="badge bg-sky-500/20 text-sky-200 ring-1 ring-sky-400/50">
              <AlertCircle size={11} /> Review
            </span>
          ) : (
            <CatBadge cat={item.cat} />
          )}
        </div>

        {/* bottom-left flags */}
        <div className="absolute bottom-9 left-2 z-10 flex items-center gap-1.5">
          {item.synthetic && (
            <span className="badge bg-fuchsia-500/25 text-fuchsia-200 ring-1 ring-fuchsia-400/40">
              <Bot size={11} /> Synthetic
            </span>
          )}
          {d.exif && (
            <span className="flex items-center gap-1 rounded bg-navy-950/70 px-1.5 py-0.5 text-[10px] text-emerald-300">
              <MapPin size={9} /> EXIF
            </span>
          )}
        </div>
        {review && (
          <div className="absolute inset-x-2 bottom-9 z-10">
            <span className="badge w-full justify-center bg-sky-950/85 text-sky-200 ring-1 ring-sky-500/40">
              NEEDS HUMAN REVIEW
            </span>
          </div>
        )}

        {/* confidence footer */}
        <div className="absolute inset-x-0 bottom-0 z-10 bg-navy-950/85 px-2 py-1.5 backdrop-blur-sm">
          <div className="flex items-center justify-between text-[10px]">
            <span className="mono text-ink-low">{item.id}</span>
            <span className="mono font-bold" style={{ color: barColor }}>
              {item.confidence.toFixed(1)}%
            </span>
          </div>
          <div className="mt-1 h-1 overflow-hidden rounded-full bg-navy-700">
            <div className="h-full rounded-full" style={{ width: `${item.confidence}%`, background: barColor }} />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-1 p-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setExplain((v) => !v);
          }}
          className={`flex flex-1 items-center justify-center gap-1 rounded-md px-2 py-1.5 text-[11px] font-medium transition-all ${
            explain
              ? 'bg-cyan-accent/15 text-cyan-accent ring-1 ring-cyan-accent/40'
              : 'bg-surface-2 text-ink-mid hover:text-ink-hi'
          }`}
        >
          <Sparkles size={12} /> Grad-CAM
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setRevealed((v) => !v);
          }}
          className="flex items-center justify-center rounded-md bg-surface-2 px-2 py-1.5 text-ink-mid hover:text-ink-hi"
          title="Reduce blur (supervisor only)"
        >
          {revealed ? <EyeOff size={12} /> : <Eye size={12} />}
        </button>
      </div>
    </div>
  );
}

function DetailRail({ item, onClose }) {
  const m = CAT_META[item.cat];
  const d = tileDetail(item);
  const dev = DEVICES.find((x) => x.id === item.device);
  const topColor = item.needsReview ? '#38bdf8' : m.color;
  const rows = [
    ['Media ID', item.id],
    ['Cluster', item.cluster],
    ['Device', `${item.device} · ${dev?.label || ''}`],
    ['Type', item.type],
    ['Apparent age', item.apparentAge],
    ['Pose analysis', d.pose],
    ['Created (MAC)', d.mac.created],
    ['Modified (MAC)', d.mac.modified],
    ['Accessed (MAC)', d.mac.accessed],
  ];
  const { onHop, onPivot } = useInspectorNav();
  const insp = {
    mode: 'file',
    id: item.id,
    title: 'Media artifact',
    sealed: true,
    accent: topColor,
    confidence: item.confidence,
    meta: [...rows.slice(1), ['SHA-256', item.hash]],
    trail: strataTrail({ cited: item.cat === 'A' }),
    similar: true,
  };
  return (
    <div className="sticky top-2 w-80 shrink-0 animate-fade-in self-start">
      <ArtifactInspector
        item={insp}
        preview={<DuotoneField item={item} revealed={false} explain={false} large />}
        onClose={onClose}
        onHop={onHop}
        onPivot={onPivot}
        extra={
          <button className="w-full rounded-lg bg-risk-a/15 px-3 py-2 text-xs font-semibold text-rose-300 ring-1 ring-rose-500/30 hover:bg-risk-a/25">
            Escalate to Risk Queue
          </button>
        }
      />
    </div>
  );
}

export default function VisualTriage() {
  useDocumentTitle('Triage');
  const [filter, setFilter] = useState('ALL');
  const [selected, setSelected] = useState([]);
  const [openId, setOpenId] = useState(null);
  const [sort, setSort] = useState('conf-desc');
  const [compact, setCompact] = useState(false);

  const toggle = (id) => setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  let shown = MEDIA.filter((mm) =>
    filter === 'ALL' ? true : filter === 'REVIEW' ? mm.needsReview : mm.cat === filter && !mm.needsReview,
  );
  shown = [...shown].sort((a, b) => {
    if (sort === 'conf-desc') return b.confidence - a.confidence;
    if (sort === 'conf-asc') return a.confidence - b.confidence;
    return a.cat.localeCompare(b.cat) || b.confidence - a.confidence;
  });

  const counts = {
    ALL: MEDIA.length,
    A: MEDIA.filter((mm) => mm.cat === 'A' && !mm.needsReview).length,
    B: MEDIA.filter((mm) => mm.cat === 'B' && !mm.needsReview).length,
    C: MEDIA.filter((mm) => mm.cat === 'C' && !mm.needsReview).length,
    REVIEW: MEDIA.filter((mm) => mm.needsReview).length,
  };
  const FILTERS = ['ALL', 'A', 'B', 'C', 'REVIEW'];
  const label = (f) => (f === 'ALL' ? 'All' : f === 'REVIEW' ? 'Review' : `Cat ${f}`);
  const openItem = openId ? MEDIA.find((x) => x.id === openId) : null;

  return (
    <>
      <PageHeader
        eyebrow="MODULE 01 · CONTENT ANALYSIS"
        title="Visual Triage Engine"
        subtitle="Hybrid ConvNeXt + Swin Transformer · Grad-CAM explainability · blurred-by-default"
        accent="#f59e0b"
        actions={
          <span className="flex items-center gap-2 text-sm text-ink-mid">
            <ShieldAlert size={16} className="text-risk-b" /> {CANON.flagged} flagged ·{' '}
            <span className="mono text-white">{shown.length}</span> shown
          </span>
        }
      />

      <WellbeingBanner />

      {/* toolbar */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex rounded-lg bg-surface-2 p-1">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${
                filter === f
                  ? f === 'REVIEW'
                    ? 'bg-surface-3 text-sky-300 shadow-elev-2'
                    : 'bg-surface-3 text-cyan-accent shadow-elev-2'
                  : 'text-ink-mid hover:text-ink-hi'
              }`}
            >
              {label(f)} <span className="mono ml-1 text-ink-low">{counts[f]}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <label className="flex items-center gap-1.5 rounded-lg bg-surface-2 px-2.5 py-1.5 text-xs text-ink-mid">
            <ArrowUpDown size={13} className="text-ink-low" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="cursor-pointer bg-transparent text-xs text-ink-hi outline-none"
            >
              <option className="bg-navy-900" value="conf-desc">Confidence ↓</option>
              <option className="bg-navy-900" value="conf-asc">Confidence ↑</option>
              <option className="bg-navy-900" value="cat">Category</option>
            </select>
          </label>
          <div className="inline-flex rounded-lg bg-surface-2 p-1">
            <button
              onClick={() => setCompact(false)}
              className={`rounded-md p-1.5 ${!compact ? 'bg-surface-3 text-cyan-accent' : 'text-ink-low'}`}
              title="Comfortable"
            >
              <LayoutGrid size={14} />
            </button>
            <button
              onClick={() => setCompact(true)}
              className={`rounded-md p-1.5 ${compact ? 'bg-surface-3 text-cyan-accent' : 'text-ink-low'}`}
              title="Compact"
            >
              <Rows3 size={14} />
            </button>
          </div>
          <div
            className={`flex items-center gap-2 transition-opacity ${
              selected.length ? 'opacity-100' : 'pointer-events-none opacity-40'
            }`}
          >
            <span className="mono text-xs text-ink-mid">{selected.length} sel</span>
            <button className="rounded-lg bg-risk-a/15 px-3 py-1.5 text-xs font-semibold text-rose-300 ring-1 ring-rose-500/30 hover:bg-risk-a/25">
              Escalate
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <div
          key={filter + sort + compact}
          className={`grid flex-1 gap-3 ${
            compact
              ? 'grid-cols-3 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-7'
              : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5'
          }`}
        >
          {shown.map((item, i) => (
            <MediaTile
              key={item.id}
              item={item}
              index={i}
              compact={compact}
              selected={selected.includes(item.id)}
              onSelect={toggle}
              onOpen={setOpenId}
            />
          ))}
        </div>

        {openItem && <DetailRail item={openItem} onClose={() => setOpenId(null)} />}
      </div>
    </>
  );
}
