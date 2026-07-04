import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line, Html } from '@react-three/drei';
import * as THREE from 'three';
import { islandPos, STRATA_Y } from './poses';
import { getSpeedMult } from '../../lib/speed';

const ANCHOR_Y = { S1: STRATA_Y.lake, S2: STRATA_Y.constellation, S3: STRATA_Y.graph };

function bezierPoints(a, mid, b, n = 44) {
  const out = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const it = 1 - t;
    out.push([
      it * it * a[0] + 2 * it * t * mid[0] + t * t * b[0],
      it * it * a[1] + 2 * it * t * mid[1] + t * t * b[1],
      it * it * a[2] + 2 * it * t * mid[2] + t * t * b[2],
    ]);
  }
  return out;
}

function Thread({ thread, reduced, joined, onSelect }) {
  const ref = useRef();
  const y = ANCHOR_Y[thread.anchor] ?? 6;
  const a = islandPos(thread.from.case);
  const b = islandPos(thread.to.case);
  const start = [a[0], a[1] + y, a[2]];
  const end = [b[0], b[1] + y, b[2]];
  const mid = [(a[0] + b[0]) / 2, y + 7, (a[2] + b[2]) / 2 - 3];
  const pts = useMemo(() => bezierPoints(start, mid, end), [thread.id]);

  useFrame((_, delta) => {
    if (reduced || !ref.current?.material) return;
    ref.current.material.dashOffset -= delta * getSpeedMult() * 0.6;
  });

  return (
    <group>
      <Line
        ref={ref}
        points={pts}
        color={thread.color}
        lineWidth={joined ? 3.4 : 2}
        transparent
        opacity={reduced ? 0.6 : 0.9}
        dashed={!reduced}
        dashSize={0.5}
        gapSize={0.35}
        onClick={(e) => {
          e.stopPropagation();
          onSelect && onSelect(thread);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => (document.body.style.cursor = '')}
      />
      {/* persistent luminous joint bridge */}
      {joined && (
        <Line points={pts} color="#e2e8f0" lineWidth={1.2} transparent opacity={0.7} />
      )}
      <Html position={mid} center distanceFactor={22} occlude={false} zIndexRange={[10, 0]}>
        <button
          onClick={() => onSelect && onSelect(thread)}
          className="pointer-events-auto whitespace-nowrap rounded-full border bg-navy-950/85 px-2 py-0.5 text-[10px] font-semibold shadow-elev-3"
          style={{ borderColor: `${thread.color}66`, color: thread.color }}
        >
          {thread.label} · {thread.confLabel}
        </button>
      </Html>
    </group>
  );
}

// Cross-case FusionThreads — animated bezier tubes between strata of different islands.
export default function FusionThreads({ threads = [], reduced, joint, onSelect }) {
  return (
    <group>
      {threads.map((t) => (
        <Thread key={t.id} thread={t} reduced={reduced} joined={joint?.threadId === t.id} onSelect={onSelect} />
      ))}
    </group>
  );
}
