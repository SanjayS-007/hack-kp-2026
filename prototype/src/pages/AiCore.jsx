import { Cpu, FileLock2 } from 'lucide-react';
import Observatory from '../components/aicore/Observatory';
import { PageHeader, useDocumentTitle } from '../components/ui';
import { MODEL_REGISTRY } from '../data/aicore';
import { CANON } from '../data/canon';

export default function AiCore() {
  useDocumentTitle('AI Core · Engine Room');
  return (
    <>
      <PageHeader
        eyebrow="MODULE 05 · AI CORE ENGINE ROOM"
        title="AI Core"
        subtitle="A living observatory of the on-enclave inference pipeline — every model, every claim, court-reproducible."
        accent="#22d3ee"
      />
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1fr_300px]">
        {/* observatory canvas */}
        <div className="min-w-0">
          <Observatory />
        </div>

        {/* Model Registry rail */}
        <div className="card-3 h-fit p-4">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
            <Cpu size={16} className="text-cyan-accent" /> Model Registry
          </div>
          <div className="space-y-2">
            {MODEL_REGISTRY.map((m) => (
              <div key={m.name} className="rounded-lg border border-white/8 bg-surface-1/50 p-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-ink-hi">{m.name}</span>
                  <span className="mono rounded bg-cyan-accent/10 px-1.5 text-[10px] text-cyan-accent">{m.version}</span>
                </div>
                <div className="mono mt-1 flex items-center gap-1 text-[10px] text-ink-low">
                  <FileLock2 size={11} /> sha256:{m.sha}
                </div>
                <div className="mono mt-0.5 text-[10px] text-ink-mid">{m.metric}</div>
              </div>
            ))}
          </div>
          <div className="mt-3 rounded-lg bg-surface-2/60 p-2.5 text-[10px] text-ink-mid">
            <span className="font-semibold text-cyan-accent">Pinned to case {CANON.caseId}</span> — every weight hash is
            frozen at analysis time. Court-reproducible: re-run the exact models on the sealed corpus and reproduce
            every finding.
          </div>
        </div>
      </div>
    </>
  );
}
