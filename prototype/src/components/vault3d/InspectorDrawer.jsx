import ArtifactInspector from '../inspector/ArtifactInspector';

// Docked right drawer that hosts the universal ArtifactInspector inside the 3D vault.
export default function InspectorDrawer({ item, onClose, onHop, onPivot }) {
  return (
    <div
      className={`no-print pointer-events-none absolute inset-y-0 right-0 z-40 flex w-[360px] max-w-[92vw] flex-col transition-transform duration-300 ${
        item ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="pointer-events-auto m-3 flex min-h-0 flex-1 flex-col">
        {item && <ArtifactInspector item={item} onClose={onClose} onHop={onHop} onPivot={onPivot} />}
      </div>
    </div>
  );
}
