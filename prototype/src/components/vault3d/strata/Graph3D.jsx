import { useMemo, useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Line } from '@react-three/drei';
import { SCALE, STRATA_Y } from '../poses';
import { GRAPH, GRAPH_GROUP_META } from '../../../data/mockData';
import { getSpeedMult } from '../../../lib/speed';

// Stratum 3 — Knowledge Graph (hybrid): collapsed disc → expand-in-place 3D layout.
export default function Graph3D({ data, expanded, reduced, onExpand, onOpenExplorer, onPickNode }) {
  const groupRef = useRef();
  const prog = useRef(0); // 0 collapsed → 1 expanded

  const nodeMeta = useMemo(() => {
    const m = {};
    GRAPH.nodes.forEach((n) => (m[n.id] = n));
    return m;
  }, []);

  const nodes = useMemo(
    () =>
      (data?.nodes || []).map((n) => {
        const meta = nodeMeta[n.id] || {};
        const g = GRAPH_GROUP_META[meta.group] || { color: '#9fb0c7' };
        return {
          id: n.id,
          x: n.x * SCALE.graph,
          y: n.y * SCALE.graph,
          z: n.z * SCALE.graph,
          color: g.color,
          group: meta.group,
          hidden: meta.hidden,
        };
      }),
    [data, nodeMeta],
  );

  const posById = useMemo(() => Object.fromEntries(nodes.map((n) => [n.id, n])), [nodes]);

  const edges = useMemo(
    () =>
      (data?.edges || [])
        .map((e) => {
          const a = posById[e.source];
          const b = posById[e.target];
          if (!a || !b) return null;
          return { a, b, peel: e.peel, predicted: e.predicted };
        })
        .filter(Boolean),
    [data, posById],
  );

  useEffect(() => {
    if (reduced) prog.current = expanded ? 1 : 0;
  }, [expanded, reduced]);

  useFrame((_, delta) => {
    const sp = getSpeedMult();
    const target = expanded ? 1 : 0;
    if (reduced) prog.current = target;
    else prog.current += (target - prog.current) * Math.min(1, delta * sp * 3);
    if (groupRef.current && expanded && !reduced) groupRef.current.rotation.y += delta * 0.06 * sp;
    if (groupRef.current && !expanded) groupRef.current.rotation.y = 0;
  });

  const lift = (n) => n.y * prog.current;

  return (
    <group ref={groupRef} position={[0, STRATA_Y.graph, 0]}>
      {/* collapsed disc teaser (fades as it expands) */}
      {!expanded && (
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          onClick={(e) => {
            e.stopPropagation();
            onExpand && onExpand();
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={() => (document.body.style.cursor = '')}
        >
          <circleGeometry args={[4.6, 40]} />
          <meshBasicMaterial color="#0d1b30" transparent opacity={0.55} />
        </mesh>
      )}

      {/* edges */}
      {expanded &&
        edges.map((e, i) => (
          <Line
            key={i}
            points={[
              [e.a.x, lift(e.a), e.a.z],
              [e.b.x, lift(e.b), e.b.z],
            ]}
            color={e.peel ? '#f59e0b' : '#2b3f57'}
            lineWidth={e.peel ? 1.6 : 0.8}
            transparent
            opacity={e.peel ? 0.9 : 0.5}
            dashed={e.predicted}
            dashSize={0.3}
            gapSize={0.2}
          />
        ))}

      {/* nodes */}
      {nodes.map((n) => (
        <mesh
          key={n.id}
          position={[n.x, expanded ? lift(n) : 0.02, n.z]}
          onClick={(e) => {
            if (!expanded) return;
            e.stopPropagation();
            onPickNode && onPickNode(n.id);
          }}
          onPointerOver={(e) => {
            if (!expanded) return;
            e.stopPropagation();
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={() => (document.body.style.cursor = '')}
        >
          <sphereGeometry args={[n.group === 'subject' ? 0.34 : 0.24, 14, 14]} />
          <meshStandardMaterial
            color={n.color}
            emissive={n.color}
            emissiveIntensity={n.hidden ? 0.9 : 0.45}
            metalness={0.2}
            roughness={0.4}
            transparent
            opacity={expanded ? 1 : 0.5}
          />
        </mesh>
      ))}

      {/* escape hatch → full 2D explorer */}
      {expanded && (
        <Html position={[4.4, 3.2, 0]} distanceFactor={16}>
          <button
            onClick={() => onOpenExplorer && onOpenExplorer()}
            className="pointer-events-auto whitespace-nowrap rounded-md border border-cyan-accent/40 bg-navy-950/95 px-2 py-1 text-[10px] font-semibold text-cyan-accent shadow-elev-3 hover:bg-cyan-accent/10"
          >
            Open full explorer ↗
          </button>
        </Html>
      )}
    </group>
  );
}
