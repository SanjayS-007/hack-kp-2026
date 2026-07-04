import { useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import { AEGIS_QA } from '../data/mockData';
import { PageHeader, useDocumentTitle } from '../components/ui';
import { AskConversation, LiveStepper } from '../components/ask/AskConversation';

export default function AskAegis() {
  useDocumentTitle('Ask AEGIS');
  const [progress, setProgress] = useState(null);
  const [asked, setAsked] = useState(0);
  const [ecsSum, setEcsSum] = useState(0);
  const avgEcs = asked ? (ecsSum / asked).toFixed(2) : '—';

  return (
    <>
      <PageHeader
        eyebrow="MODULE 09 · INTELLIGENT RETRIEVAL"
        title="Ask AEGIS-X"
        subtitle="Multimodal RAG · local Llama · agentic orchestration · HERAM hallucination-scored"
        accent="#22d3ee"
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
        <div className="card lg:col-span-3">
          <AskConversation
            variant="page"
            onProgress={setProgress}
            emptyHint="Ask a question about Operation Sentinel. Every answer is planned, graph- and vector-retrieved, vision-checked, and citation-grounded with an ECS admissibility score."
            onAnswered={(idx, qa) => {
              setAsked((a) => a + 1);
              setEcsSum((s) => s + qa.ecs);
            }}
          />
        </div>

        <div className="space-y-4">
          <LiveStepper progress={progress} />
          <div className="card p-4">
            <div className="text-[11px] font-semibold uppercase tracking-label text-ink-low">Session</div>
            <div className="mt-2 flex items-center justify-between text-xs">
              <span className="text-ink-mid">Queries answered</span>
              <span className="mono font-bold text-white">{asked}/{AEGIS_QA.length}</span>
            </div>
            <div className="mt-1 flex items-center justify-between text-xs">
              <span className="text-ink-mid">Avg. ECS</span>
              <span className="mono font-bold text-emerald-400">{avgEcs}</span>
            </div>
            <div className="mt-1 flex items-center justify-between text-xs">
              <span className="text-ink-mid">Admissibility gate</span>
              <span className="mono font-bold text-cyan-accent">≥ 0.85</span>
            </div>
            <div className="mt-3 flex items-center gap-1.5 rounded-lg bg-surface-2/60 px-2.5 py-2 text-[11px] text-ink-mid">
              <ShieldCheck size={13} className="text-emerald-400" /> Air-gapped local inference — no data leaves the
              enclave.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
