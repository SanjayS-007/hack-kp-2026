import { MessageSquareText, X, Database } from 'lucide-react';
import { AskConversation } from '../ask/AskConversation';
import { CANON } from '../../data/canon';

// Docked right drawer inside the 3D vault — mounts the SAME AskConversation engine.
// onAsk(i) bubbles up so the vault can run the constellation retrieval choreography.
export default function AskVaultDrawer({ open, onClose, onAsk, onAnswered }) {
  return (
    <div
      className={`no-print pointer-events-none absolute inset-y-0 right-0 z-30 flex w-[380px] max-w-[92vw] flex-col transition-transform duration-300 ${
        open ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="card-3 pointer-events-auto m-3 flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl">
        <div className="flex items-center justify-between border-b border-white/8 px-3 py-2.5">
          <div className="flex items-center gap-2 text-sm font-semibold text-white">
            <MessageSquareText size={15} className="text-cyan-accent" /> Ask the Vault
          </div>
          <button onClick={onClose} className="flex h-7 w-7 items-center justify-center rounded-md text-ink-low hover:bg-surface-2 hover:text-ink-hi">
            <X size={15} />
          </button>
        </div>

        <div className="min-h-0 flex-1">
          <AskConversation
            variant="drawer"
            onAsk={onAsk}
            onAnswered={onAnswered}
            emptyHint="Retrieval runs live on the Vector Constellation — watch the point-cloud flare and citations fly."
          />
        </div>

        <div className="flex items-center gap-1.5 border-t border-white/8 px-3 py-2 text-[10px] text-ink-low">
          <Database size={11} className="text-cyan-accent" />
          <span className="mono">ChromaDB · {CANON.filesTotal.toLocaleString()} embeddings · all-MiniLM-L12-v2 · 384-dim · HNSW</span>
        </div>
      </div>
    </div>
  );
}
