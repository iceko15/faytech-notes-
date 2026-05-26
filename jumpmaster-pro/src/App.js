import React, { useState, useMemo } from 'react';
import { JUMPMASTER_DATA } from './data/jumpmaster_data';

const Dashboard = () => (
  <div className="title-section">
    <h1>Jumpmaster Study Pro</h1>
    <p style={{ color: 'var(--accent-gold)' }}>Master the Course. Earn Your Wings.</p>
    <div className="grid-3" style={{ marginTop: '3rem' }}>
      <div className="card">
        <h3>Nomenclature</h3>
        <p>{JUMPMASTER_DATA.nomenclature.length} items to master</p>
      </div>
      <div className="card">
        <h3>Deficiencies</h3>
        <p>{JUMPMASTER_DATA.deficiencies.length} major/minor violations</p>
      </div>
      <div className="card">
        <h3>CARP Rules</h3>
        <p>Interactive lab and logic</p>
      </div>
    </div>
  </div>
);

const Flashcards = () => {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  
  const item = JUMPMASTER_DATA.nomenclature[index];

  const next = () => {
    setFlipped(false);
    setIndex((index + 1) % JUMPMASTER_DATA.nomenclature.length);
  };

  const prev = () => {
    setFlipped(false);
    setIndex((index - 1 + JUMPMASTER_DATA.nomenclature.length) % JUMPMASTER_DATA.nomenclature.length);
  };

  return (
    <div className="flashcards-view">
      <h2>Nomenclature Flashcards</h2>
      <div className="flashcard-container" onClick={() => setFlipped(!flipped)}>
        <div className={`flashcard ${flipped ? 'flipped' : ''}`}>
          <div className="flashcard-front">
            <span style={{ color: 'var(--accent-gold)', marginBottom: '1rem' }}>Page {item.page}</span>
            <h2 style={{ fontSize: '2rem' }}>{item.name}</h2>
            <p style={{ color: 'var(--text-muted)' }}>Click to reveal specs</p>
          </div>
          <div className="flashcard-back">
            <h3>{item.name} Specs</h3>
            <div className="spec-list">
              {item.specs.map((spec, i) => (
                <div key={i} className="spec-item">
                  <span className="spec-label">{spec.label}:</span>
                  <span>{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <button onClick={prev} style={btnStyle}>PREV</button>
        <button onClick={next} style={{...btnStyle, backgroundColor: 'var(--accent-gold)', color: 'black'}}>NEXT</button>
      </div>
    </div>
  );
};

const DeficiencyGrid = () => (
  <div className="deficiency-view">
    <h2>JMPI Deficiency List</h2>
    <div className="grid-3">
      {JUMPMASTER_DATA.deficiencies.map((def, i) => (
        <div key={i} className="card" style={{ borderLeft: `4px solid ${def.major ? 'var(--danger-red)' : 'var(--accent-gold)'}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <small style={{ color: 'var(--text-muted)' }}>{def.category}</small>
            <span style={{ color: def.major ? 'var(--danger-red)' : 'var(--accent-gold)' }}>-{def.points} pts</span>
          </div>
          <h4 style={{ margin: 0 }}>{def.name}</h4>
          <p style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>{def.major ? 'MAJOR DEFICIENCY' : 'MINOR DEFICIENCY'}</p>
        </div>
      ))}
    </div>
  </div>
);

const CarpLab = () => {
  const [aircraft, setAircraft] = useState('c130');
  const [isNight, setIsNight] = useState(false);
  const [jumpers, setJumpers] = useState(1);
  const [altitude, setAltitude] = useState(1000);

  const results = useMemo(() => {
    let width = 600;
    let length = 600;

    if (isNight) {
      width += 100;
      length += 100;
    }

    if (altitude > 1000) {
      const extra = Math.floor((altitude - 1000) / 100) * 30;
      width += extra;
      length += extra;
    }

    if (jumpers > 1) {
      length += (jumpers - 1) * 75;
    }

    return { width, length };
  }, [aircraft, isNight, jumpers, altitude]);

  return (
    <div className="carp-lab">
      <h2>CARP Calculator</h2>
      <div className="card" style={{ maxWidth: '600px' }}>
        <div className="input-group">
          <label>Aircraft Type</label>
          <select value={aircraft} onChange={e => setAircraft(e.target.value)}>
            <option value="c130">C-130 Hercules</option>
            <option value="c17">C-17 Globemaster III</option>
          </select>
        </div>
        <div className="input-group">
          <label>Time of Day</label>
          <select value={isNight} onChange={e => setIsNight(e.target.value === 'true')}>
            <option value="false">Day (0601-1759)</option>
            <option value="true">Night (1800-0600)</option>
          </select>
        </div>
        <div className="input-group">
          <label>Number of Jumpers</label>
          <input type="number" value={jumpers} onChange={e => setJumpers(parseInt(e.target.value))} />
        </div>
        <div className="input-group">
          <label>Drop Altitude (ft AGL)</label>
          <input type="number" value={altitude} onChange={e => setAltitude(parseInt(e.target.value))} />
        </div>
        
        <div className="result-box">
          <h4>Required Drop Zone Size:</h4>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--accent-gold)' }}>
            {results.width} yards (W) x {results.length} yards (L)
          </p>
          <small style={{ color: 'var(--text-muted)' }}>*Based on standard CARP additions (N, A, 1, A)</small>
        </div>
      </div>
    </div>
  );
};

const btnStyle = {
  padding: '0.75rem 2rem',
  margin: '0 0.5rem',
  borderRadius: '8px',
  border: 'none',
  cursor: 'pointer',
  fontWeight: 'bold',
  backgroundColor: 'var(--secondary-charcoal)',
  color: 'white'
};

const App = () => {
  const [view, setView] = useState('dashboard');

  const renderView = () => {
    switch(view) {
      case 'dashboard': return <Dashboard />;
      case 'flashcards': return <Flashcards />;
      case 'deficiencies': return <DeficiencyGrid />;
      case 'carp': return <CarpLab />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="app-container">
      <div className="sidebar">
        <div className="sidebar-title">JM Study Pro</div>
        <div className={`nav-item ${view === 'dashboard' ? 'active' : ''}`} onClick={() => setView('dashboard')}>Dashboard</div>
        <div className={`nav-item ${view === 'flashcards' ? 'active' : ''}`} onClick={() => setView('flashcards')}>Nomenclature</div>
        <div className={`nav-item ${view === 'deficiencies' ? 'active' : ''}`} onClick={() => setView('deficiencies')}>Deficiencies</div>
        <div className={`nav-item ${view === 'carp' ? 'active' : ''}`} onClick={() => setView('carp')}>CARP Lab</div>
      </div>
      <div className="main-content">
        {renderView()}
      </div>
    </div>
  );
};

export default App;
