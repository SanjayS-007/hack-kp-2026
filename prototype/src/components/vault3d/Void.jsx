import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { getSpeedMult } from '../../lib/speed';

// The void: fog, slow-drifting star-dust, and a ground grid that fades at the horizon.
export default function Void({ reduced }) {
  const dustRef = useRef();

  const { positions } = useMemo(() => {
    const N = 300;
    const pos = new Float32Array(N * 3);
    let seed = 20260417;
    const rnd = () => {
      seed |= 0;
      seed = (seed + 0x6d2b79f5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
    for (let i = 0; i < N; i++) {
      pos[i * 3] = (rnd() - 0.5) * 120;
      pos[i * 3 + 1] = rnd() * 40 - 4;
      pos[i * 3 + 2] = (rnd() - 0.5) * 120;
    }
    return { positions: pos };
  }, []);

  useFrame((_, delta) => {
    if (reduced || !dustRef.current) return;
    dustRef.current.rotation.y += delta * 0.01 * getSpeedMult();
  });

  return (
    <group>
      <color attach="background" args={['#04070f']} />
      <fog attach="fog" args={['#04070f', 34, 96]} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[10, 20, 8]} intensity={0.5} color="#9fb8ff" />
      <pointLight position={[0, 14, 6]} intensity={0.6} color="#22d3ee" distance={80} />

      {/* star-dust */}
      <points ref={dustRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.08} color="#93a4c8" transparent opacity={0.55} sizeAttenuation depthWrite={false} />
      </points>

      {/* fading ground grid */}
      <gridHelper args={[160, 80, '#12203a', '#0c1526']} position={[0, -4.01, 0]} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -4, 0]}>
        <circleGeometry args={[70, 48]} />
        <meshBasicMaterial color="#04070f" transparent opacity={0.72} />
      </mesh>
    </group>
  );
}
