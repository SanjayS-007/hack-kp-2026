import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Clock,
  Info,
  Smartphone,
  Laptop,
  HardDrive,
  Bitcoin,
  Wifi,
  ArrowUpRight,
  X,
} from 'lucide-react';
import {
  TIMELINE_TRACKS,
  TIMELINE_PHASES,
  TIMELINE_DAYS,
  TIMELINE_START,
  TIMELINE_BANDS,
  TRACK_META,
} from '../data/mockData';
import { PageHeader, Badge, useDocumentTitle } from '../components/ui';
import ArtifactInspector, { useInspectorNav } from '../components/inspector/ArtifactInspector';
import { eventInspector } from '../data/inspector';

const TRACK_ICONS = { Smartphone, Laptop, HardDrive, Bitcoin, Wifi };
const SKEW = { 'DEV-02': '+00:03:41', 'DEV-03': '-00:01:12' };

function dayDate(day) {
  const base = new Date(TIMELINE_START + 'T00:00:00Z');
  base.setUTCDate(base.getUTCDate() + (day - 1));
  return base.toLocaleDateString('en-US', { month: 'short', day: '2-digit', timeZone: 'UTC' });
}

export default function Timeline() {
  useDocumentTitle('Timeline');
  const navigate = useNavigate();
  const { onHop, onPivot } = useInspectorNav();
  const [zoom, setZoom] = useState(1.1);
  const [hover, setHover] = useState(null);
  const [sel, setSel] = useState(null);

  const dayW = 42 * zoom;
  const width = TIMELINE_DAYS * dayW;
  const selEvent = sel ? TIMELINE_TRACKS.flatMap((t) => t.events.map((e) => ({ ...e, track: t }))).find((e) => `${e.track.id}-${e.time}` === sel) : null;

  return (
    <>
      <PageHeader
        eyebrow="MODULE 08 · TIMELINE RECONSTRUCTION"
        title="Chronos — Timeline Reconstruction"
        subtitle="Digital Stratigraphy · multi-device clock alignment · phase reconstruction (March 2026)"
        accent="#67e8f9"
        actions={<Badge color="#22d3ee">MULTI-DEVICE ALIGNED</Badge>}
      />

      {/* clock-skew callout */}
      <div className="card mb-4 flex items-center gap-3 border-cyan-accent/25 p-3">
        <Clock className="text-cyan-accent" size={20} />
        <div className="flex-1 text-xs text-ink-mid">
          <span className="font-semibold text-cyan-accent">Clock-skew correction applied.</span> DEV-02 drifted{' '}
          <span className="mono text-white">+00:03:41</span>, SSD-C <span className="mono text-white">-00:01:12</span>.
          All events normalized to UTC — cross-device ordering is forensically sound.
        </div>
      </div>

      {/* phase legend + zoom */}
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-3">
          {Object.entries(TIMELINE_PHASES).map(([k, p]) => (
            <span key={k} className="flex items-center gap-1.5 text-xs text-ink-mid">
              <span className="h-2.5 w-2.5 rounded-sm" style={{ background: p.color }} /> {p.label}
            </span>
          ))}
        </div>
        <label className="flex items-center gap-2 text-xs text-ink-low">
          Zoom
          <input
            type="range"
            min="0.7"
            max="2.2"
            step="0.1"
            value={zoom}
            onChange={(e) => setZoom(+e.target.value)}
            className="h-1 w-40 cursor-pointer accent-cyan-accent"
          />
          <span className="mono w-9 text-white">{Math.round(zoom * 100)}%</span>
        </label>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <div style={{ width: width + 168, minWidth: '100%' }}>
            {/* phase band strip */}
            <div className="flex border-b border-white/5">
              <div className="flex w-[168px] shrink-0 items-center border-r border-white/5 px-3 text-[10px] font-semibold uppercase tracking-label text-ink-low">
                Phase
              </div>
              <div className="relative h-11" style={{ width }}>
                {TIMELINE_BANDS.map((b) => {
                  const p = TIMELINE_PHASES[b.phase];
                  const left = (b.from - 1) * dayW;
                  const w = (b.to - b.from + 1) * dayW;
                  return (
                    <div
                      key={b.phase}
                      className="absolute flex h-3 items-center rounded px-2 text-[9px] font-semibold uppercase tracking-wide"
                      style={{
                        left,
                        width: w,
                        top: 3 + b.row * 12,
                        background: `${p.color}22`,
                        color: p.color,
                        border: `1px solid ${p.color}44`,
                      }}
                    >
                      {p.label}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* date axis */}
            <div className="flex border-b border-white/5 bg-navy-950/40">
              <div className="w-[168px] shrink-0 border-r border-white/5 px-3 py-2 text-[10px] font-semibold uppercase tracking-label text-ink-low">
                Track
              </div>
              <div className="relative flex" style={{ width }}>
                {Array.from({ length: TIMELINE_DAYS }).map((_, d) => (
                  <div
                    key={d}
                    className="shrink-0 border-r border-white/5 py-2 text-center"
                    style={{ width: dayW }}
                  >
                    {(d % 2 === 0 || dayW > 60) && (
                      <span className="mono text-[9px] text-ink-low">{dayDate(d + 1)}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* swimlanes */}
            {TIMELINE_TRACKS.map((track) => {
              const meta = TRACK_META[track.id] || {};
              const Icon = TRACK_ICONS[meta.icon] || Smartphone;
              return (
                <div key={track.id} className="flex border-b border-white/5 last:border-0 hover:bg-surface-2/20">
                  <div className="flex w-[168px] shrink-0 items-center gap-2 border-r border-white/5 px-3 py-4">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-surface-2 text-ink-mid">
                      <Icon size={14} />
                    </span>
                    <div className="min-w-0">
                      <div className="truncate text-xs font-semibold text-ink-hi">{track.label}</div>
                      <div className="flex items-center gap-1 text-[10px] text-ink-low">
                        <span>{track.events.length} events</span>
                        {SKEW[track.id] && (
                          <span className="mono rounded bg-cyan-accent/10 px-1 text-cyan-accent">{SKEW[track.id]}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="relative py-4" style={{ width, height: 56 }}>
                    {/* day hairlines */}
                    {Array.from({ length: TIMELINE_DAYS }).map((_, d) => (
                      <div key={d} className="absolute top-0 h-full border-r border-white/5" style={{ left: d * dayW, width: dayW }} />
                    ))}
                    <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-white/5" />
                    {track.events.map((ev, i) => {
                      const phase = TIMELINE_PHASES[ev.phase];
                      const left = (ev.day - 1) * dayW + dayW / 2;
                      const key = `${track.id}-${ev.time}`;
                      const isHover = hover === key;
                      const isSel = sel === key;
                      return (
                        <button
                          key={i}
                          onMouseEnter={() => setHover(key)}
                          onMouseLeave={() => setHover(null)}
                          onClick={() => setSel(key)}
                          className="group absolute top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
                          style={{ left }}
                        >
                          <span
                            className={`block h-3 w-3 rounded-full ring-2 transition-transform group-hover:scale-125 ${
                              isSel ? 'ring-white' : 'ring-navy-950'
                            }`}
                            style={{ background: phase.color, boxShadow: `0 0 10px ${phase.color}aa` }}
                          />
                          {isHover && (
                            <div className="card-3 absolute bottom-6 left-1/2 z-30 w-52 -translate-x-1/2 p-2.5 text-left">
                              <div className="flex items-center gap-1.5">
                                <span className="h-2 w-2 rounded-full" style={{ background: phase.color }} />
                                <span className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: phase.color }}>
                                  {phase.label}
                                </span>
                              </div>
                              <div className="mt-1 text-xs font-medium text-white">{ev.label}</div>
                              <div className="mono mt-0.5 text-[10px] text-ink-low">{ev.time}</div>
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* event detail rail (fills the page) */}
      <div className="mt-4">
        {selEvent ? (
          <ArtifactInspector
            item={eventInspector(selEvent, selEvent.track.label)}
            onClose={() => setSel(null)}
            onHop={onHop}
            onPivot={onPivot}
          />
        ) : (
          <div className="card flex items-center gap-2 p-4 text-xs text-ink-low">
            <Info size={14} /> Hover a node for a preview, or click it to pin full detail and cross-link to Triage,
            Graph, or Ask AEGIS. Narrative reconstructs{' '}
            <span className="text-yellow-400">grooming</span> → <span className="text-orange-400">production</span> →{' '}
            <span className="text-red-400">distribution</span>.
          </div>
        )}
      </div>
    </>
  );
}
