import { useMemo, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { SCALE, STRATA_Y } from '../poses';
import { getSpeedMult } from '../../../lib/speed';

const HUE = { img: '#22d3ee', txt: '#818cf8', evt: '#f59e0b' };

// Stratum 2 — Vector Constellation: the RAG showpiece.
// Gentle drift · materialize-from-lake on reveal · Ask-the-Vault retrieval choreography.
export default function Constellation({ data, askActive, askTopk = [], reduced, onCiteReady, onPickPoint }) {
  const groupRef = useRef();
  const baseMat = useRef();
  const reveal = useRef(0); // 0..1 materialize progress
  const cloudDim = useRef(1);
  const flareRefs = useRef([]);
  const askClock = useRef(-1);
  const firedCite = useRef(false);

  const { positions, colors, byId } = useMemo(() => {
    const pts = data?.points || [];
    const pos = new Float32Array(pts.length * 3);
    const col = new Float32Array(pts.length * 3);
    const map = {};
    const c = new THREE.Color();
    pts.forEach((p, i) => {
      pos[i * 3] = p.x * SCALE.constellation;
      pos[i * 3 + 1] = p.y * SCALE.constellation;
      pos[i * 3 + 2] = p.z * SCALE.constellation;
      c.set(HUE[p.m] || '#9fb0c7');
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
      map[p.id] = [pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2]];
    });
    return { positions: pos, colors: col, byId: map };
  }, [data]);

  const flarePts = useMemo(
    () => askTopk.map((id) => byId[id]).filter(Boolean),
    [askTopk, byId],
  );

  // reset choreography clock when a new ask starts
  useEffect(() => {
    if (askActive) {
      askClock.current = 0;
      firedCite.current = false;
      flareRefs.current.forEach((m) => {
        if (m) {
          m.visible = true;
          m.scale.setScalar(0.001);
        }
      });
    } else {
      askClock.current = -1;
    }
  }, [askActive]);

  useFrame((_, delta) => {
    const sp = getSpeedMult();
    // materialize-from-lake: rise + fade in
    if (reveal.current < 1) {
      reveal.current = reduced ? 1 : Math.min(1, reveal.current + delta * sp * 0.7);
      if (groupRef.current) {
        const r = reveal.current;
        groupRef.current.scale.y = 0.05 + 0.95 * r;
        groupRef.current.position.y = STRATA_Y.constellation - (1 - r) * (STRATA_Y.constellation - STRATA_Y.lake) * 0.8;
      }
      if (baseMat.current) baseMat.current.opacity = 0.35 + 0.5 * reveal.current;
    }

    // gentle drift
    if (!reduced && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05 * sp;
    }

    // ask choreography (≈3.5s, speed-aware)
    if (askClock.current >= 0) {
      askClock.current += delta * sp;
      const t = askClock.current;
      // dim base cloud during retrieval, recover after
      const target = t < 3.0 ? 0.28 : 1;
      cloudDim.current += (target - cloudDim.current) * Math.min(1, delta * sp * 4);
      if (baseMat.current) baseMat.current.opacity = (0.35 + 0.5 * reveal.current) * cloudDim.current;

      flareRefs.current.forEach((m, i) => {
        if (!m || !flarePts[i]) return;
        const [bx, by, bz] = flarePts[i];
        if (t < 0.7) {
          // flare white + grow
          const g = Math.min(1, t / 0.5);
          m.scale.setScalar(0.02 + g * 0.16);
          m.position.set(bx, by, bz);
        } else if (t < 2.0) {
          // fly toward the drawer edge (front-right-up), shrinking
          const k = Math.min(1, (t - 0.7) / 1.3);
          const ease = 1 - Math.pow(1 - k, 3);
          m.position.set(bx + ease * (7 - bx), by + ease * (3.2 - by), bz + ease * (6 - bz));
          m.scale.setScalar(0.18 * (1 - ease) + 0.02);
        } else {
          m.visible = false;
        }
      });
      if (t >= 1.9 && !firedCite.current) {
        firedCite.current = true;
        onCiteReady && onCiteReady();
      }
    } else if (baseMat.current && reveal.current >= 1) {
      // idle recover
      cloudDim.current += (1 - cloudDim.current) * Math.min(1, delta * sp * 3);
      baseMat.current.opacity = 0.85 * cloudDim.current;
    }
  });

  return (
    <group ref={groupRef} position={[0, STRATA_Y.constellation, 0]}>
      <points
        onClick={(e) => {
          if (e.index == null || !onPickPoint) return;
          e.stopPropagation();
          const p = data?.points?.[e.index];
          if (p) onPickPoint({ ...p, index: e.index });
        }}
        onPointerOver={(e) => {
          if (e.index == null) return;
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => (document.body.style.cursor = '')}
      >
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={colors.length / 3} array={colors} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial
          ref={baseMat}
          size={0.11}
          vertexColors
          transparent
          opacity={0.85}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* retrieval flares */}
      {flarePts.map((_, i) => (
        <mesh key={i} ref={(el) => (flareRefs.current[i] = el)} visible={false}>
          <sphereGeometry args={[1, 10, 10]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.95} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
      ))}
    </group>
  );
}
