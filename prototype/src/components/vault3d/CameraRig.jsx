import { useEffect, useRef } from 'react';
import { CameraControls } from '@react-three/drei';
import { poseFor } from './poses';
import { dur } from '../../lib/speed';

// Damped, bounded camera with named-pose flights (900ms×speed; cuts under reduced-motion).
export default function CameraRig({ pose, focus, reduced, controlsRef }) {
  const ref = useRef();

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    if (controlsRef) controlsRef.current = c;
    c.minDistance = 5;
    c.maxDistance = 96;
    c.maxPolarAngle = Math.PI * 0.49;
    c.minPolarAngle = Math.PI * 0.06;
    c.dollySpeed = 0.6;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const p = poseFor(pose, focus);
    c.smoothTime = reduced ? 0.001 : dur(900) / 1000;
    c.setLookAt(
      p.position[0],
      p.position[1],
      p.position[2],
      p.target[0],
      p.target[1],
      p.target[2],
      !reduced,
    );
  }, [pose, focus, reduced]);

  return <CameraControls ref={ref} makeDefault />;
}
