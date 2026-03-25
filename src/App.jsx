import { useState } from 'react';
import './constellation/tokens.css';
import './App.css';
import SRPFeed from './components/SRPFeed';

export default function App() {
  const [view, setView] = useState('proposed');

  return (
    <div className="app-stage">
      {/* Tabs — outside the device frame */}
      <div className="view-tabs">
        <button
          className={`view-tab ${view === 'proposed' ? 'view-tab--on' : ''}`}
          onClick={() => setView('proposed')}
        >
          Proposed: Taller media
        </button>
        <button
          className={`view-tab ${view === 'current' ? 'view-tab--on' : ''}`}
          onClick={() => setView('current')}
        >
          Current design
        </button>
      </div>

      <div className="device-iphone-17-pro">
        <div className="dynamic-island" />
        <div className="home-indicator" />
        <div className="btn-power" />
        <div className="btn-volume-up" />
        <div className="btn-volume-down" />
        <div className="device-screen">
          {/* Status bar */}
          <div className="status-bar">
            <span className="status-bar__time">9:53</span>
            <div className="status-bar__icons">
              <svg width="16" height="16" viewBox="0 0 24 18" fill="currentColor"><rect x="0" y="10" width="3.5" height="8" rx="1"/><rect x="5" y="7" width="3.5" height="11" rx="1"/><rect x="10" y="4" width="3.5" height="14" rx="1"/><rect x="15" y="1" width="3.5" height="17" rx="1"/></svg>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12.55a11 11 0 0114.08 0M1.42 9a16 16 0 0121.16 0M8.53 16.11a6 6 0 016.95 0M12 20h.01"/></svg>
              <svg width="16" height="14" viewBox="0 0 28 14" fill="currentColor"><rect x="0" y="1" width="22" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/><rect x="2" y="3" width="16" height="8" rx="1"/><rect x="23" y="4.5" width="3" height="5" rx="1"/></svg>
            </div>
          </div>
          <SRPFeed view={view} />
        </div>
      </div>
    </div>
  );
}
