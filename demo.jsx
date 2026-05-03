// Interactive scoring demo — user clicks the board, system "detects" hit and updates score
function DemoSection() {
  const [score, setScore] = useState(501);
  const [history, setHistory] = useState([]);
  const [throws, setThrows] = useState([]); // current visit darts
  const [lastHit, setLastHit] = useState(null);
  const [detecting, setDetecting] = useState(false);

  const onHit = (hit) => {
    if (throws.length >= 3 || detecting) return;
    setDetecting(true);
    setLastHit({ ...hit, ts: Date.now() });
    setTimeout(() => {
      setThrows((prev) => [...prev, hit]);
      setScore((prev) => Math.max(0, prev - hit.score));
      setDetecting(false);
    }, 600);
  };

  const nextTurn = () => {
    if (throws.length === 0) return;
    setHistory((prev) => [
      { darts: throws, total: throws.reduce((a, b) => a + b.score, 0) },
      ...prev,
    ].slice(0, 4));
    setThrows([]);
  };

  const reset = () => {
    setScore(501);
    setHistory([]);
    setThrows([]);
    setLastHit(null);
  };

  return (
    <section className="demo" id="demo">
      <div className="container">
        <div className="section-head">
          <div className="section-eyebrow">02 / LIVE DEMO</div>
          <h2 className="section-title">
            Throw a dart.<br />
            <span className="accent">Watch it score itself.</span>
          </h2>
          <p className="section-sub">
            Tap anywhere on the board. The system simulates the real detection pipeline —
            cameras converge on the impact, segment is identified, score is logged.
          </p>
        </div>

        <div className="demo-grid">
          <div className="demo-board-wrap">
            <InteractiveBoard onHit={onHit} lastHit={lastHit} detecting={detecting} disabled={throws.length >= 3} />
            <div className="demo-board-hint">
              {throws.length >= 3 ? 'Visit complete — tap NEXT TURN' : detecting ? 'Detecting…' : 'Tap the board to throw'}
            </div>
          </div>

          <div className="demo-panel">
            <div className="demo-panel-head">
              <div className="demo-panel-title">501 — SINGLE PLAYER</div>
              <div className="demo-panel-status">
                <span className="demo-status-dot"></span>
                LIVE
              </div>
            </div>

            <div className="demo-score">
              <div className="demo-score-num">{score}</div>
              <div className="demo-score-label">REMAINING</div>
            </div>

            <div className="demo-throws">
              {[0, 1, 2].map((i) => {
                const t = throws[i];
                const isLast = t && i === throws.length - 1;
                return (
                  <div key={i} className={`demo-throw ${t ? 'demo-throw--filled' : ''} ${isLast ? 'demo-throw--last' : ''}`}>
                    <div className="demo-throw-label">{t ? t.label : '—'}</div>
                    <div className="demo-throw-score">{t ? t.score : '·'}</div>
                  </div>
                );
              })}
            </div>

            <div className="demo-actions">
              <button className="btn btn--ghost btn--sm" onClick={() => {
                if (throws.length === 0) return;
                const last = throws[throws.length - 1];
                setThrows(throws.slice(0, -1));
                setScore(score + last.score);
              }} disabled={throws.length === 0}>
                ← Undo
              </button>
              <button className="btn btn--primary btn--sm" onClick={nextTurn} disabled={throws.length === 0}>
                Next turn →
              </button>
            </div>

            <div className="demo-history">
              <div className="demo-history-label">PREVIOUS VISITS</div>
              {history.length === 0 ? (
                <div className="demo-history-empty">No turns yet</div>
              ) : (
                history.map((h, i) => (
                  <div key={i} className="demo-history-row">
                    <div className="demo-history-darts">
                      {h.darts.map((d, j) => <span key={j}>{d.label}</span>)}
                    </div>
                    <div className="demo-history-total">{h.total}</div>
                  </div>
                ))
              )}
            </div>

            <button className="demo-reset" onClick={reset}>RESET GAME</button>
          </div>
        </div>
      </div>
    </section>
  );
}

function InteractiveBoard({ onHit, lastHit, detecting, disabled }) {
  const cx = 200, cy = 200, r = 180;
  const segments = [20, 1, 18, 4, 13, 6, 10, 15, 2, 17, 3, 19, 7, 16, 8, 11, 14, 9, 12, 5];
  const segAngle = 360 / 20;
  const startAngle = -90 - segAngle / 2;
  const polar = (cx, cy, r, deg) => {
    const rad = deg * Math.PI / 180;
    return { x: cx + Math.cos(rad) * r, y: cy + Math.sin(rad) * r };
  };
  const arcPath = (innerR, outerR, startDeg, endDeg) => {
    const s1 = polar(cx, cy, outerR, startDeg);
    const e1 = polar(cx, cy, outerR, endDeg);
    const s2 = polar(cx, cy, innerR, endDeg);
    const e2 = polar(cx, cy, innerR, startDeg);
    return `M ${s1.x} ${s1.y} A ${outerR} ${outerR} 0 0 1 ${e1.x} ${e1.y} L ${s2.x} ${s2.y} A ${innerR} ${innerR} 0 0 0 ${e2.x} ${e2.y} Z`;
  };

  const handleClick = (e) => {
    if (disabled || detecting) return;
    const svg = e.currentTarget;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX; pt.y = e.clientY;
    const loc = pt.matrixTransform(svg.getScreenCTM().inverse());
    const dx = loc.x - cx;
    const dy = loc.y - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist > r) return;

    let score = 0, label = 'MISS';
    const angle = (Math.atan2(dy, dx) * 180 / Math.PI + 90 + 360 + 9) % 360;
    const segIdx = Math.floor(angle / 18);
    const num = segments[segIdx];

    const ratio = dist / r;
    if (ratio < 0.04) { score = 50; label = 'BULL'; }
    else if (ratio < 0.10) { score = 25; label = '25'; }
    else if (ratio < 0.59) { score = num; label = `S${num}`; }
    else if (ratio < 0.62) { score = num * 3; label = `T${num}`; }
    else if (ratio < 0.95) { score = num; label = `S${num}`; }
    else if (ratio <= 1.0) { score = num * 2; label = `D${num}`; }

    onHit({ x: loc.x, y: loc.y, score, label });
  };

  return (
    <div className={`iboard ${detecting ? 'iboard--detecting' : ''} ${disabled ? 'iboard--disabled' : ''}`}>
      <svg viewBox="0 0 400 400" onClick={handleClick} className="iboard-svg">
        <defs>
          <radialGradient id="iboardSurface" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1a1a1a" />
            <stop offset="100%" stopColor="#0a0a0a" />
          </radialGradient>
          <radialGradient id="iboardGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="oklch(0.85 0.21 145)" stopOpacity="0.2" />
            <stop offset="80%" stopColor="oklch(0.85 0.21 145)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx={cx} cy={cy} r={r + 18} fill="url(#iboardGlow)" />
        <circle cx={cx} cy={cy} r={r + 8} fill="none" stroke="oklch(0.85 0.21 145)" strokeWidth="2" opacity="0.6" />
        <circle cx={cx} cy={cy} r={r} fill="#0a0a0a" />
        {segments.map((num, i) => {
          const s = startAngle + i * segAngle;
          const e = s + segAngle;
          const isAlt = i % 2 === 0;
          const baseFill = isAlt ? '#0e0e0e' : '#dccfb1';
          const tripFill = isAlt ? 'oklch(0.50 0.20 25)' : 'oklch(0.74 0.18 145)';
          return (
            <g key={i}>
              <path d={arcPath(r * 0.62, r * 0.95, s, e)} fill={baseFill} />
              <path d={arcPath(r * 0.95, r * 1.0, s, e)} fill={tripFill} />
              <path d={arcPath(r * 0.18, r * 0.59, s, e)} fill={baseFill} />
              <path d={arcPath(r * 0.59, r * 0.62, s, e)} fill={tripFill} />
              <text
                x={polar(cx, cy, r * 1.08, s + segAngle / 2).x}
                y={polar(cx, cy, r * 1.08, s + segAngle / 2).y}
                fontSize="13" fontFamily="Archivo, sans-serif" fontWeight="800"
                fill="#d6d3c8" textAnchor="middle" dominantBaseline="middle"
              >{num}</text>
            </g>
          );
        })}
        {Array.from({ length: 20 }).map((_, i) => {
          const a = startAngle + i * segAngle;
          const p1 = polar(cx, cy, r * 0.18, a);
          const p2 = polar(cx, cy, r * 1.0, a);
          return <line key={i} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke="#7a7a7a" strokeWidth="0.6" opacity="0.6" />;
        })}
        {[0.18, 0.59, 0.62, 0.95, 1.0].map((mr, i) => (
          <circle key={i} cx={cx} cy={cy} r={r * mr} fill="none" stroke="#7a7a7a" strokeWidth="0.6" opacity="0.6" />
        ))}
        <circle cx={cx} cy={cy} r={r * 0.07} fill="oklch(0.74 0.18 145)" />
        <circle cx={cx} cy={cy} r={r * 0.03} fill="oklch(0.55 0.22 25)" />

        {/* Detection reticle on last hit */}
        {lastHit && detecting && (
          <g className="reticle">
            <circle cx={lastHit.x} cy={lastHit.y} r="22" fill="none" stroke="oklch(0.85 0.21 145)" strokeWidth="1.5" />
            <circle cx={lastHit.x} cy={lastHit.y} r="40" fill="none" stroke="oklch(0.85 0.21 145)" strokeWidth="1" opacity="0.5" />
            <line x1={lastHit.x - 30} y1={lastHit.y} x2={lastHit.x - 14} y2={lastHit.y} stroke="oklch(0.85 0.21 145)" strokeWidth="1.5" />
            <line x1={lastHit.x + 14} y1={lastHit.y} x2={lastHit.x + 30} y2={lastHit.y} stroke="oklch(0.85 0.21 145)" strokeWidth="1.5" />
            <line x1={lastHit.x} y1={lastHit.y - 30} x2={lastHit.x} y2={lastHit.y - 14} stroke="oklch(0.85 0.21 145)" strokeWidth="1.5" />
            <line x1={lastHit.x} y1={lastHit.y + 14} x2={lastHit.x} y2={lastHit.y + 30} stroke="oklch(0.85 0.21 145)" strokeWidth="1.5" />
          </g>
        )}

        {/* Persistent dart at last hit */}
        {lastHit && !detecting && (
          <g className="iboard-dart" transform={`translate(${lastHit.x}, ${lastHit.y}) rotate(35)`}>
            <line x1="0" y1="0" x2="-26" y2="0" stroke="#d6d2c4" strokeWidth="1.8" strokeLinecap="round" />
            <polygon points="0,0 -3,-2 -3,2" fill="oklch(0.85 0.21 145)" />
            <rect x="-30" y="-3" width="6" height="6" fill="oklch(0.85 0.21 145)" />
          </g>
        )}
      </svg>
    </div>
  );
}

Object.assign(window, { DemoSection, InteractiveBoard });
