import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import Lake from './strata/Lake';
import Constellation from './strata/Constellation';
import Graph3D from './strata/Graph3D';
import Crown from './strata/Crown';
import { islandPos, STRATA_Y } from './poses';
import { getSpeedMult } from '../../lib/speed';

const STATUS_COLOR = {
  ACTIVE: '#22d3ee',
  'COURT-READY': '#34d399',
  CLOSED: '#64748b',
};

// One CaseIsland = the strata stack + billboard label for a single case.
export default function CaseIsland({
  caseInfo,
  datasets,
  focused,
  expandedGraph,
  askActive,
  askTopk,
  reduced,
  fresh,
  reportStatus,
  showLabel = true,
  onSelect,
  onExpandGraph,
  onOpenExplorer,
  onOpenProofs,
  onCiteReady,
  onPickBatch,
  onPickPoint,
  onPickNode,
}) {
  const groupRef = useRef();
  const rise = useRef(fresh ? 0 : 1); // 0..1 island-rise progress
  const [ix, iy, iz] = islandPos(caseInfo.id);

  useEffect(() => {
    if (reduced) rise.current = 1;
  }, [reduced]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    if (rise.current < 1) {
      rise.current = reduced ? 1 : Math.min(1, rise.current + delta * getSpeedMult() * 0.9);
      const eased = 1 - Math.pow(1 - rise.current, 3);
      groupRef.current.position.y = iy + (1 - eased) * -22;
    } else {
      groupRef.current.position.y = iy;
    }
  });

  const statusColor = STATUS_COLOR[caseInfo.status] || '#64748b';

  return (
    <group ref={groupRef} position={[ix, iy, iz]}>
      {/* base plinth */}
      <mesh position={[0, -0.3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[6.4, 44]} />
        <meshStandardMaterial color="#0a1220" emissive={caseInfo.tier} emissiveIntensity={0.05} metalness={0.4} roughness={0.7} />
      </mesh>

      {/* pick target (click empty island → focus) */}
      <mesh
        position={[0, 4, 0]}
        visible={false}
        onClick={(e) => {
          e.stopPropagation();
          onSelect && onSelect(caseInfo.id);
        }}
      >
        <cylinderGeometry args={[6, 6, 18, 12]} />
      </mesh>

      <Lake blocks={datasets.lake} tier={caseInfo.tier} reduced={reduced} onPickBatch={(b) => (onPickBatch ? onPickBatch(caseInfo.id, b) : onSelect && onSelect(caseInfo.id))} />

      {datasets.constellation && (
        <Constellation
          data={datasets.constellation}
          askActive={askActive}
          askTopk={askTopk}
          reduced={reduced}
          onCiteReady={onCiteReady}
          onPickPoint={(p) => onPickPoint && onPickPoint(caseInfo.id, p)}
        />
      )}

      {datasets.graph3d && (
        <Graph3D
          data={datasets.graph3d}
          expanded={focused && expandedGraph}
          reduced={reduced}
          onExpand={() => onExpandGraph && onExpandGraph(caseInfo.id)}
          onOpenExplorer={onOpenExplorer}
          onPickNode={(id) => onPickNode && onPickNode(caseInfo.id, id)}
        />
      )}

      <Crown score={97} reportStatus={reportStatus} reduced={reduced} onOpenProofs={() => onOpenProofs && onOpenProofs(caseInfo.id)} />

      {/* billboard label — only shown at vault-overview (P0) + case-focus (P1) */}
      <Html position={[0, STRATA_Y.crown + 2.6, 0]} center distanceFactor={20} occlude={false} zIndexRange={[10, 0]}>
        <div
          className="transition-opacity duration-300"
          style={{ opacity: showLabel ? 1 : 0, pointerEvents: showLabel ? 'auto' : 'none' }}
        >
          <button
            onClick={() => onSelect && onSelect(caseInfo.id)}
            className={`pointer-events-auto flex flex-col items-center whitespace-nowrap rounded-lg border bg-navy-950/85 px-3 py-1.5 shadow-elev-3 transition-all ${
              focused ? 'border-cyan-accent/60' : 'border-white/10 hover:border-cyan-accent/40'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full" style={{ background: caseInfo.tier, boxShadow: `0 0 8px ${caseInfo.tier}` }} />
              <span className="mono text-xs font-bold text-cyan-accent">{caseInfo.id}</span>
              <span className="badge" style={{ background: `${statusColor}1a`, color: statusColor }}>{caseInfo.status}</span>
            </div>
            <div className="text-sm font-bold text-white">{caseInfo.name}</div>
            {fresh && <div className="text-[9px] font-semibold uppercase tracking-label text-cyan-accent">Sealed just now</div>}
          </button>
        </div>
      </Html>
    </group>
  );
}
