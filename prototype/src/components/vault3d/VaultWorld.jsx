import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import Void from './Void';
import CaseIsland from './CaseIsland';
import CameraRig from './CameraRig';
import FusionThreads from './FusionThreads';
import { poseFor } from './poses';

// The react-three-fiber world: void + case islands + fusion threads + camera rig + bloom.
export default function VaultWorld({
  cases,
  datasets,
  view,
  createdId,
  reduced,
  reportStatus,
  fusionThreads,
  fusionActive,
  joint,
  onSelectThread,
  onSelect,
  onExpandGraph,
  onOpenExplorer,
  onOpenProofs,
  onCiteReady,
  onPickBatch,
  onPickPoint,
  onPickNode,
}) {
  const controlsRef = useRef();

  // Island billboards only make sense at the vault overview + case-focus poses.
  // At any stratum pose (lake/constellation/graph/crown) or during the compile dive
  // they overlap the camera view, so fade them out.
  const labelsVisible = view.pose === 'P0' || view.pose === 'P1';

  const reframe = () => {
    const c = controlsRef.current;
    if (!c) return;
    const p = poseFor(view.pose, view.focus);
    c.setLookAt(p.position[0], p.position[1], p.position[2], p.target[0], p.target[1], p.target[2], !reduced);
  };

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 30, 46], fov: 50, near: 0.1, far: 400 }}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      raycaster={{ params: { Points: { threshold: 0.35 } } }}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener('webglcontextlost', (e) => {
          e.preventDefault();
          window.location.reload();
        });
      }}
      onDoubleClick={reframe}
      frameloop="always"
    >
      <Void reduced={reduced} />

      {cases.map((c) => (
        <CaseIsland
          key={c.id}
          caseInfo={c}
          datasets={datasets[c.id] || {}}
          focused={view.focus === c.id}
          expandedGraph={view.expandedGraph}
          askActive={view.askActive && view.focus === c.id}
          askTopk={view.focus === c.id ? view.askTopk : []}
          reduced={reduced}
          fresh={createdId === c.id}
          reportStatus={reportStatus}
          showLabel={labelsVisible}
          onSelect={onSelect}
          onExpandGraph={onExpandGraph}
          onOpenExplorer={onOpenExplorer}
          onOpenProofs={onOpenProofs}
          onCiteReady={onCiteReady}
          onPickBatch={onPickBatch}
          onPickPoint={onPickPoint}
          onPickNode={onPickNode}
        />
      ))}

      {fusionActive && <FusionThreads threads={fusionThreads} reduced={reduced} joint={joint} onSelect={onSelectThread} />}

      <CameraRig pose={view.pose} focus={view.focus} reduced={reduced} controlsRef={controlsRef} />

      {!reduced && (
        <EffectComposer disableNormalPass>
          <Bloom intensity={0.7} luminanceThreshold={0.35} luminanceSmoothing={0.9} mipmapBlur radius={0.6} />
        </EffectComposer>
      )}
    </Canvas>
  );
}
