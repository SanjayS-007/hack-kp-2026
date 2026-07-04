import { Component } from 'react';
import { AlertTriangle } from 'lucide-react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  reset = () => this.setState({ error: null });

  render() {
    if (this.state.error) {
      return (
        <div className="flex min-h-[60vh] items-center justify-center p-6">
          <div className="card-3 max-w-lg p-6 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-risk-a/15 ring-1 ring-risk-a/30">
              <AlertTriangle className="text-risk-a" size={24} />
            </div>
            <h2 className="text-lg font-bold text-white">Module failed to render</h2>
            <p className="mt-1 text-sm text-ink-mid">
              A view-level error was caught by the boundary. The rest of the console is unaffected.
            </p>
            <pre className="mono mt-3 max-h-32 overflow-auto rounded-lg bg-navy-950 p-3 text-left text-[11px] text-risk-b ring-1 ring-navy-700">
              {String(this.state.error?.message || this.state.error)}
            </pre>
            <button
              onClick={this.reset}
              className="mt-4 rounded-lg bg-cyan-accent px-4 py-2 text-sm font-semibold text-navy-950 transition-all hover:shadow-glow"
            >
              Retry
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
