import { useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Instances, Instance, Html } from '@react-three/drei';
import { SCALE, STRATA_Y } from '../poses';
import { getSpeedMult } from '../../../lib/speed';

// Stratum 1 — Evidence Lake: bed of instanced blocks (one per sealed batch).
export default function Lake({ blocks = [], tier = '#22d3ee', reduced, onPickBatch }) {
  const [hover, setHover] = useState(-1);
  const glint = useRef(0);
  const groupRef = useRef();

  const layout = useMemo(() => {
    const s = SCALE.lakeSpacing;
    return blocks.map((b) => ({
      ...b,
      px: (b.i - 5.5) * s,
      pz: (b.j - 5.5) * s,
      h: 0.35 + (b.objects % 200) / 700,
    }));
  }, [blocks]);

  useFrame((_, delta) => {
    if (reduced) return;
    glint.current += delta * getSpeedMult();
  });

  const heartbeatIdx = reduced ? -1 : Math.floor(glint.current * 0.7) % Math.max(1, layout.length);
  const hb = layout[heartbeatIdx];

  return (
    <group ref={groupRef} position={[0, STRATA_Y.lake, 0]}>
      <Instances limit={200} range={layout.length}>
        <boxGeometry args={[SCALE.lakeSpacing * 0.82, 0.5, SCALE.lakeSpacing * 0.82]} />
        <meshStandardMaterial
          color="#0c1830"
          emissive={tier}
          emissiveIntensity={0.14}
          metalness={0.3}
          roughness={0.55}
        />
        {layout.map((b, idx) => (
          <Instance
            key={b.i * 12 + b.j}
            position={[b.px, b.h / 2, b.pz]}
            scale={[1, b.h * 2, 1]}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHover(idx);
            }}
            onPointerOut={() => setHover(-1)}
            onClick={(e) => {
              e.stopPropagation();
              onPickBatch && onPickBatch(b);
            }}
          />
        ))}
      </Instances>

      {/* custody heartbeat glint */}
      {hb && !reduced && (
        <mesh position={[hb.px, hb.h + 0.2, hb.pz]}>
          <sphereGeometry args={[0.09, 8, 8]} />
          <meshBasicMaterial color="#34d399" transparent opacity={0.8} />
        </mesh>
      )}

      {/* hover chip */}
      {hover >= 0 && layout[hover] && (
        <Html position={[layout[hover].px, layout[hover].h + 0.7, layout[hover].pz]} center distanceFactor={16} zIndexRange={[10, 0]}>
          <div className="pointer-events-none whitespace-nowrap rounded-md border border-cyan-accent/40 bg-navy-950/95 px-2 py-1 text-[10px] text-ink-hi shadow-elev-3">
            <span className="mono font-semibold text-cyan-accent">{layout[hover].batch}</span>
            <span className="text-ink-mid"> · {layout[hover].objects.toLocaleString()} objects · sha256 ✓ · ML-DSA ✓</span>
          </div>
        </Html>
      )}
    </group>
  );
}
