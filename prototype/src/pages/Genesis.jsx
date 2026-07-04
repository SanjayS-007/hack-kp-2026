import { useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, X, ShieldCheck } from 'lucide-react';
import Stepper from './genesis/Stepper.jsx';
import Acquire from './genesis/Acquire.jsx';
import Process from './genesis/Process.jsx';
import AiCorePass from './genesis/AiCorePass.jsx';
import Analyze from './genesis/Analyze.jsx';
import Seal from './genesis/Seal.jsx';
import { useDocumentTitle } from '../components/ui';
import { setCreatedCase, setActiveCase } from '../store/caseStore';
import { CANON } from '../data/canon';

const STAGE_HASH = ['#acquire', '#process', '#aicore', '#analyze', '#seal'];
const LAST_STAGE = 4;

export default function Genesis() {
  useDocumentTitle('New Case · Genesis');
  const navigate = useNavigate();
  const [stage, setStage] = useState(0);
  const [prev, setPrev] = useState(null);
  const clearTimer = useRef(0);

  const advance = useCallback(() => {
    setStage((s) => {
      if (s >= LAST_STAGE) return s;
      setPrev(s);
      const next = s + 1;
      window.location.hash = STAGE_HASH[next];
      clearTimeout(clearTimer.current);
      clearTimer.current = setTimeout(() => setPrev(null), 440);
      return next;
    });
  }, []);

  const finalizeSeal = useCallback(
    (name) => {
      const caseName = (name || '').trim() || CANON.caseName;
      const created = {
        id: CANON.caseId,
        name: caseName,
        status: 'ACTIVE',
        sealedAt: Date.now(),
      };
      setCreatedCase(created);
      setActiveCase({ id: created.id, name: created.name, status: 'ACTIVE' });
      navigate('/');
    },
    [navigate],
  );

  const skip = useCallback(() => {
    if (stage >= LAST_STAGE) finalizeSeal(CANON.caseName);
    else advance();
  }, [stage, advance, finalizeSeal]);

  const renderStage = (idx, isExiting) => {
    const props = { onNext: advance, exiting: isExiting };
    switch (idx) {
      case 0:
        return <Acquire {...props} />;
      case 1:
        return <Process {...props} />;
      case 2:
        return <AiCorePass {...props} />;
      case 3:
        return <Analyze {...props} />;
      case 4:
        return <Seal {...props} onSeal={finalizeSeal} />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-40 flex flex-col bg-navy-950">
      {/* subtle vignette + grid */}
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />

      {/* top bar */}
      <div className="relative flex items-center justify-between border-b border-white/5 px-5 py-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-accent to-indigo-500 shadow-glow-sm">
            <ShieldCheck size={17} className="text-navy-950" />
          </div>
          <div>
            <div className="text-sm font-extrabold tracking-tight text-white">
              AEGIS<span className="text-cyan-accent">-X</span>
            </div>
            <div className="text-[9px] uppercase tracking-[0.18em] text-ink-low">Case Genesis</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={skip}
            className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium text-ink-low transition-colors hover:bg-surface-2 hover:text-ink-hi"
          >
            Skip <ChevronRight size={14} />
          </button>
          <button
            onClick={() => navigate('/')}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-low transition-colors hover:bg-surface-2 hover:text-ink-hi"
            title="Exit to Vault"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* stepper */}
      <div className="relative border-b border-white/5">
        <Stepper current={stage} />
      </div>

      {/* stage body — shared-axis slide */}
      <div className="relative min-h-0 flex-1 overflow-hidden">
        {prev !== null && (
          <div className="anim-out-left absolute inset-0 overflow-y-auto">
            <div className="mx-auto max-w-[1200px] p-6">{renderStage(prev, true)}</div>
          </div>
        )}
        <div key={stage} className="anim-in-right absolute inset-0 overflow-y-auto">
          <div className="mx-auto max-w-[1200px] p-6">{renderStage(stage, false)}</div>
        </div>
      </div>
    </div>
  );
}
