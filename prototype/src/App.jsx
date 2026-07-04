import { lazy, Suspense, useEffect, useMemo } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import VaultFlat from './pages/VaultFlat.jsx';
import Genesis from './pages/Genesis.jsx';
import Dashboard from './pages/Dashboard.jsx';
import VisualTriage from './pages/VisualTriage.jsx';
import EntityGraph from './pages/EntityGraph.jsx';
import Timeline from './pages/Timeline.jsx';
import AskAegis from './pages/AskAegis.jsx';
import AiCore from './pages/AiCore.jsx';
import SyntheticDetection from './pages/SyntheticDetection.jsx';
import RiskQueue from './pages/RiskQueue.jsx';
import CourtReport from './pages/CourtReport.jsx';
import DemoMode from './components/DemoMode.jsx';
import { clearCaseStore } from './store/caseStore.js';
import { clearDemo, getDemo } from './store/demoStore.js';
import { setSpeedMult } from './lib/speed.js';
import { hasWebGL } from './lib/webgl.js';

// Code-split the entire 3D world so console routes stay fast.
const Vault3D = lazy(() => import('./components/vault3d/Vault3D.jsx'));

function VaultBoot() {
  return (
    <div className="fixed inset-0 z-0 flex items-center justify-center bg-[#04070f]">
      <div className="flex items-center gap-2 text-sm text-ink-mid">
        <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-accent" /> Loading Fusion Vault…
      </div>
    </div>
  );
}

export default function App() {
  const location = useLocation();

  // Flat vault when ?flat is present OR WebGL is unavailable.
  const flatVault = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return params.has('flat') || !hasWebGL();
  }, []);

  // Re-apply persisted demo speed on boot (the CSS var resets to 1 on reload).
  useEffect(() => {
    setSpeedMult(getDemo().speed);
  }, []);

  // ?reset — hard-clear all session state between demo takes (Presenter Safety Rail)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has('reset')) {
      try {
        clearCaseStore();
        clearDemo();
        sessionStorage.clear();
        localStorage.clear();
      } catch {
        /* storage unavailable — ignore */
      }
      // Preserve any other params (e.g. ?flat) — only strip ?reset.
      params.delete('reset');
      const qs = params.toString();
      window.location.replace(window.location.pathname + (qs ? `?${qs}` : ''));
    }
  }, []);

  // Genesis wizard runs full-screen (immersive, no console chrome)
  if (location.pathname === '/genesis') {
    return (
      <ErrorBoundary>
        <Genesis />
        <DemoMode />
      </ErrorBoundary>
    );
  }

  // 3D Fusion Vault is the landing — full-screen with its own 2D HUD (no console chrome).
  if (location.pathname === '/' && !flatVault) {
    return (
      <ErrorBoundary>
        <Suspense fallback={<VaultBoot />}>
          <Vault3D />
        </Suspense>
        <DemoMode />
      </ErrorBoundary>
    );
  }

  return (
    <Layout>
      <ErrorBoundary key={location.pathname}>
        <div key={location.pathname} className="page-enter">
          <Routes location={location}>
            <Route path="/" element={<VaultFlat />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/triage" element={<VisualTriage />} />
            <Route path="/graph" element={<EntityGraph />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/ask" element={<AskAegis />} />
            <Route path="/aicore" element={<AiCore />} />
            <Route path="/synthetic" element={<SyntheticDetection />} />
            <Route path="/queue" element={<RiskQueue />} />
            <Route path="/report" element={<CourtReport />} />
          </Routes>
        </div>
      </ErrorBoundary>
      <DemoMode />
    </Layout>
  );
}
