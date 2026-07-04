import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { STRATA_Y } from '../poses';
import { RISK_QUEUE } from '../../../data/mockData';
import { getSpeedMult } from '../../../lib/speed';

const GEM = { none: '#64748b', draft: '#f59e0b', sealed: '#34d399' };

// Stratum 4 — Intelligence Crown: risk dial + lead pins + report-status gem.
export default function Crown({ score = 97, reportStatus = 'none', reduced, onOpenProofs, leads = RISK_QUEUE }) {
  const dialRef = useRef();
  const gemRef = useRef();

  const tier = score >= 90 ? '#f43f5e' : score >= 75 ? '#f59e0b' : '#22d3ee';
  const arc = (score / 100) * Math.PI * 2;

  const pins = useMemo(() => {
    const top = leads.slice(0, 8);
    return top.map((l, i) => {
      const a = (i / 8) * Math.PI * 2;
      return { a, x: Math.cos(a) * 1.7, z: Math.sin(a) * 1.7, h: 0.4 + (l.score / 100) * 1.6, cat: l.cat };
    });
  }, [leads]);

  useFrame((_, delta) => {
    const sp = getSpeedMult();
    if (!reduced && dialRef.current) dialRef.current.rotation.z += delta * 0.15 * sp;
    if (!reduced && gemRef.current) gemRef.current.rotation.y += delta * 0.6 * sp;
  });

  return (
    <group position={[0, STRATA_Y.crown, 0]}>
      {/* faint full ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.1, 0.09, 12, 60]} />
        <meshStandardMaterial color="#16233c" emissive="#16233c" emissiveIntensity={0.3} />
      </mesh>
      {/* arc-fill dial (click → proofs) */}
      <mesh
        ref={dialRef}
        rotation={[Math.PI / 2, 0, 0]}
        onClick={(e) => {
          e.stopPropagation();
          onOpenProofs && onOpenProofs();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => (document.body.style.cursor = '')}
      >
        <torusGeometry args={[2.1, 0.14, 14, 80, arc]} />
        <meshStandardMaterial color={tier} emissive={tier} emissiveIntensity={0.8} toneMapped={false} />
      </mesh>

      {/* lead pins */}
      {pins.map((p, i) => (
        <mesh key={i} position={[p.x, p.h / 2, p.z]}>
          <cylinderGeometry args={[0.05, 0.05, p.h, 8]} />
          <meshStandardMaterial
            color={p.cat === 'A' ? '#f43f5e' : p.cat === 'B' ? '#f59e0b' : '#eab308'}
            emissive={p.cat === 'A' ? '#f43f5e' : p.cat === 'B' ? '#f59e0b' : '#eab308'}
            emissiveIntensity={0.7}
          />
        </mesh>
      ))}

      {/* report-status gem */}
      <mesh ref={gemRef} position={[0, 1.1, 0]}>
        <octahedronGeometry args={[0.4, 0]} />
        <meshStandardMaterial
          color={GEM[reportStatus] || GEM.none}
          emissive={GEM[reportStatus] || GEM.none}
          emissiveIntensity={0.8}
          metalness={0.5}
          roughness={0.2}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}
