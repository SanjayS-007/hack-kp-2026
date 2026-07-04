import { useRef } from 'react';
import Observatory from '../../components/aicore/Observatory';

export default function AiCorePass({ onNext }) {
  const advanced = useRef(false);
  const done = () => {
    if (advanced.current) return;
    advanced.current = true;
    onNext();
  };
  return (
    <div>
      <div className="mb-4">
        <h2 className="text-xl font-bold text-white">AI Core — engine-room pass</h2>
        <p className="text-sm text-ink-mid">
          Unknown artifacts flow through the on-enclave inference lanes — visual, language, temporal — converging in
          fusion, then sealed by the Verifier Agent.
        </p>
      </div>
      <div className="card p-4">
        <Observatory compact onComplete={done} />
      </div>
    </div>
  );
}
