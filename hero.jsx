// Hero — bold sport-broadcast headline + cinematic arc-shot animation
function Hero({ layout = 'split' }) {
  return (
    <header className={`hero hero--${layout}`}>
      <div className="hero-bg-grid" aria-hidden="true"></div>
      <div className="hero-inner">
        <div className="hero-content">
          <div className="hero-eyebrow">
            <span className="hero-pulse"></span>
            COMPUTER VISION SCORING SYSTEM
          </div>
          <h1 className="hero-title">
            <span className="hero-title-line">Throw darts.</span>
            <span className="hero-title-line hero-title-line--accent">Not numbers.</span>
          </h1>
          <p className="hero-sub">
            A professional auto-scoring system for any standard bristle board.
            Three calibrated cameras. Pixel-accurate detection. Built and shipped, ready to play.
          </p>
          <div className="hero-cta">
            <a href="#kits" className="btn btn--primary">
              See the kits
              <span className="btn-arrow">→</span>
            </a>
            <a href="#demo" className="btn btn--ghost">Try the demo</a>
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-num">±0.5<span className="hero-stat-unit">mm</span></div>
              <div className="hero-stat-label">Detection accuracy</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-num">3</div>
              <div className="hero-stat-label">High-speed cameras</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-num">&lt;200<span className="hero-stat-unit">ms</span></div>
              <div className="hero-stat-label">Score latency</div>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <HeroImage />
        </div>
      </div>
    </header>
  );
}

// Cinematic hero image — uses install-blade photo with HUD overlay treatment
function HeroImage() {
  return (
    <div className="hero-img-frame">
      <div className="hero-img-letterbox hero-img-letterbox--top"></div>
      <div className="hero-img-letterbox hero-img-letterbox--bottom"></div>

      <div className="hero-img-wrap">
        <img src="images/install-blade.jpg" alt="DartsVision installation — auto-scoring dartboard with monitor" className="hero-img" />
        <div className="hero-img-vignette"></div>
        <div className="hero-img-grade"></div>
      </div>

      {/* HUD chrome */}
      <div className="hero-img-hud">
        <div className="hero-img-hud-tl">
          <span className="hero-img-rec"></span>
          <span>LIVE</span>
          <span className="hero-img-dim">CAM_02</span>
        </div>
        <div className="hero-img-hud-tr hero-img-dim">DARTSVISION · PA</div>
        <div className="hero-img-hud-bl hero-img-dim">SCORING · ACTIVE</div>
        <div className="hero-img-hud-br">
          <span className="hero-img-accent">●</span>
          <span>CAL OK</span>
        </div>
      </div>

      {/* Reticle on board */}
      <div className="hero-img-reticle">
        <div className="hero-img-ret-corner hero-img-ret-corner--tl"></div>
        <div className="hero-img-ret-corner hero-img-ret-corner--tr"></div>
        <div className="hero-img-ret-corner hero-img-ret-corner--bl"></div>
        <div className="hero-img-ret-corner hero-img-ret-corner--br"></div>
        <div className="hero-img-ret-label">BOARD LOCK</div>
      </div>

      {/* Floating score chip */}
      <div className="hero-img-chip">
        <div className="hero-img-chip-label">LAST THROW</div>
        <div className="hero-img-chip-row">
          <span className="hero-img-chip-tag">T20</span>
          <span className="hero-img-chip-pts">60</span>
        </div>
      </div>

      {/* Corner brackets */}
      <div className="hero-img-bracket hero-img-bracket--tl"></div>
      <div className="hero-img-bracket hero-img-bracket--tr"></div>
      <div className="hero-img-bracket hero-img-bracket--bl"></div>
      <div className="hero-img-bracket hero-img-bracket--br"></div>
    </div>
  );
}

Object.assign(window, { HeroImage });

// Cinematic arc-shot — angled perspective, slow-mo dart arc, vision tracking overlay
function CinematicArcShot() {
  // Phases:
  // 0: idle/setup (camera HUD live, board steady) ~1.4s
  // 1: dart 1 in flight ~1.6s
  // 2: dart 1 landed, score 1 ~0.9s
  // 3: dart 2 in flight ~1.4s
  // 4: dart 2 landed, score 2 ~0.9s
  // 5: dart 3 in flight ~1.4s
  // 6: dart 3 landed, score 3 ~1.2s
  // 7: total reveal ~2.4s
  // 8: reset fade ~0.6s
  const [phase, setPhase] = useState(0);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const durations = [1400, 1600, 900, 1400, 900, 1400, 1200, 2400, 600];
    const t = setTimeout(() => {
      const next = (phase + 1) % durations.length;
      setPhase(next);
      if (next === 0) setCycle((c) => c + 1);
    }, durations[phase]);
    return () => clearTimeout(t);
  }, [phase]);

  // Three throws — T20, T20, T20 = 180. Targets in board-local coords
  // The board is rendered with a 3D tilt; targets are in the original 2D plane and inherit the transform.
  const throws = [
    { tx: -8, ty: -82, label: 'T20', score: 60 },   // upper triple-20
    { tx: -14, ty: -78, label: 'T20', score: 60 },
    { tx: -2, ty: -85, label: 'T20', score: 60 },
  ];

  const dartIndex = phase === 1 ? 0 : phase === 3 ? 1 : phase === 5 ? 2 : -1;
  const inFlight = dartIndex !== -1;
  const landedCount = phase >= 7 ? 3 : phase >= 6 ? 3 : phase >= 5 ? 2 : phase >= 4 ? 2 : phase >= 3 ? 1 : phase >= 2 ? 1 : 0;
  const showTotal = phase === 7;
  const fadingReset = phase === 8;

  return (
    <div className={`cas ${fadingReset ? 'cas--fading' : ''}`}>
      {/* Cinematic letterbox */}
      <div className="cas-letterbox cas-letterbox--top"></div>
      <div className="cas-letterbox cas-letterbox--bottom"></div>

      {/* HUD chrome */}
      <div className="cas-hud">
        <div className="cas-hud-tl">
          <span className="cas-rec-dot"></span>
          <span>REC</span>
          <span className="cas-mono cas-dim">CAM_02 · 240FPS</span>
        </div>
        <div className="cas-hud-tr cas-mono cas-dim">
          T+<TimeCode phase={phase} />
        </div>
        <div className="cas-hud-bl cas-mono cas-dim">
          <span>{phaseLabel(phase)}</span>
        </div>
        <div className="cas-hud-br cas-mono cas-dim">
          <span>VEL </span><span className="cas-accent">{velocity(phase)}</span><span> m/s</span>
        </div>
      </div>

      {/* Scene */}
      <div className="cas-scene" key={cycle}>
        {/* Background haze */}
        <div className="cas-haze"></div>
        {/* Vignette */}
        <div className="cas-vignette"></div>

        {/* Tilted board */}
        <div className="cas-stage">
          <div className="cas-board">
            <BoardArt />
            {/* Light ring glow */}
            <div className="cas-ring-glow"></div>
            {/* Camera markers */}
            {[0, 120, 240].map((d) => (
              <div key={d} className="cas-cam-led" style={{ transform: `rotate(${d}deg) translateY(-220px)` }}>
                <div className="cas-cam-led-dot"></div>
              </div>
            ))}

            {/* Landed darts (persistent through cycle) */}
            {throws.slice(0, landedCount).map((t, i) => (
              <div
                key={`landed-${cycle}-${i}`}
                className="cas-dart-landed"
                style={{
                  left: `calc(50% + ${t.tx}px)`,
                  top: `calc(50% + ${t.ty}px)`,
                  '--landed-delay': `${i * 0.03}s`,
                }}
              >
                <div className="cas-dart-shaft"></div>
                <div className="cas-dart-flight"></div>
              </div>
            ))}

            {/* Score callouts on landed darts */}
            {throws.slice(0, landedCount).map((t, i) => (
              <div
                key={`call-${cycle}-${i}`}
                className={`cas-callout cas-callout--${i}`}
                style={{
                  left: `calc(50% + ${t.tx}px)`,
                  top: `calc(50% + ${t.ty}px)`,
                }}
              >
                <div className="cas-callout-line"></div>
                <div className="cas-callout-card">
                  <div className="cas-callout-label">{t.label}</div>
                  <div className="cas-callout-pts">{t.score}</div>
                </div>
              </div>
            ))}

            {/* Impact ring on most recent landed dart */}
            {landedCount > 0 && (phase === 2 || phase === 4 || phase === 6) && (
              <div
                key={`impact-${cycle}-${landedCount}`}
                className="cas-impact"
                style={{
                  left: `calc(50% + ${throws[landedCount - 1].tx}px)`,
                  top: `calc(50% + ${throws[landedCount - 1].ty}px)`,
                }}
              ></div>
            )}
          </div>

          {/* In-flight dart (overlays the whole stage, in front of board) */}
          {inFlight && (
            <FlyingDart
              key={`flight-${cycle}-${dartIndex}`}
              target={throws[dartIndex]}
            />
          )}

          {/* Tracking reticle that follows in-flight dart */}
          {inFlight && (
            <TrackingReticle key={`reticle-${cycle}-${dartIndex}`} target={throws[dartIndex]} />
          )}
        </div>

        {/* Side telemetry strip */}
        <div className="cas-telemetry">
          <TelemetryRow label="DART" value={dartIndex !== -1 ? `0${dartIndex + 1}/03` : landedCount > 0 ? `0${landedCount}/03` : '00/03'} />
          <TelemetryRow label="LOCK" value={inFlight ? 'TRACKING' : landedCount > 0 ? 'SCORED' : 'STANDBY'} active={inFlight} />
          <TelemetryRow label="SEG" value={landedCount > 0 && !inFlight ? throws[landedCount - 1].label : '—'} />
          <TelemetryRow label="PTS" value={String(landedCount * 60).padStart(3, '0')} bright />
        </div>

        {/* Total reveal overlay */}
        <div className={`cas-total ${showTotal ? 'cas-total--show' : ''}`}>
          <div className="cas-total-label">VISIT</div>
          <div className="cas-total-num">180</div>
          <div className="cas-total-tag">MAXIMUM</div>
        </div>
      </div>
    </div>
  );
}

function phaseLabel(p) {
  if (p === 0) return 'STANDBY';
  if (p === 1 || p === 3 || p === 5) return 'TRACKING ▸';
  if (p === 2 || p === 4 || p === 6) return 'SCORED';
  if (p === 7) return 'VISIT COMPLETE';
  return 'RESET';
}
function velocity(p) {
  if (p === 1 || p === 3 || p === 5) return '24.3';
  if (p === 2 || p === 4 || p === 6) return '00.0';
  return '00.0';
}
function TimeCode({ phase }) {
  // Just a fake monotonic readout that resets per cycle
  const [t, setT] = useState(0);
  useEffect(() => {
    const start = Date.now();
    const id = setInterval(() => setT(Date.now() - start), 80);
    return () => clearInterval(id);
  }, []);
  const ms = String(Math.floor(t / 10) % 100).padStart(2, '0');
  const s = String(Math.floor(t / 1000) % 60).padStart(2, '0');
  return <span>00:{s}.{ms}</span>;
}

function TelemetryRow({ label, value, active, bright }) {
  return (
    <div className={`cas-tel-row ${active ? 'cas-tel-row--active' : ''} ${bright ? 'cas-tel-row--bright' : ''}`}>
      <div className="cas-tel-label">{label}</div>
      <div className="cas-tel-value">{value}</div>
    </div>
  );
}

// Board art — angled, "real-looking" rendering. Still SVG, but more atmospheric
function BoardArt() {
  const cx = 200, cy = 200, r = 175;
  const segments = [20, 1, 18, 4, 13, 6, 10, 15, 2, 17, 3, 19, 7, 16, 8, 11, 14, 9, 12, 5];
  const segAngle = 360 / 20;
  const startAngle = -90 - segAngle / 2;

  const arcPath = (innerR, outerR, startDeg, endDeg) => {
    const s1 = polar2(cx, cy, outerR, startDeg);
    const e1 = polar2(cx, cy, outerR, endDeg);
    const s2 = polar2(cx, cy, innerR, endDeg);
    const e2 = polar2(cx, cy, innerR, startDeg);
    return `M ${s1.x} ${s1.y} A ${outerR} ${outerR} 0 0 1 ${e1.x} ${e1.y} L ${s2.x} ${s2.y} A ${innerR} ${innerR} 0 0 0 ${e2.x} ${e2.y} Z`;
  };

  return (
    <svg className="cas-board-svg" viewBox="0 0 400 400">
      <defs>
        <radialGradient id="casBoardSurface" cx="50%" cy="48%" r="55%">
          <stop offset="0%" stopColor="#1f1f1f" />
          <stop offset="60%" stopColor="#0c0c0c" />
          <stop offset="100%" stopColor="#050505" />
        </radialGradient>
        <radialGradient id="casBoardLight" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="oklch(0.95 0.01 260)" stopOpacity="0.18" />
          <stop offset="60%" stopColor="oklch(0.95 0.01 260)" stopOpacity="0" />
        </radialGradient>
        <filter id="casShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="6" />
          <feOffset dx="0" dy="6" result="off" />
          <feComponentTransfer><feFuncA type="linear" slope="0.6" /></feComponentTransfer>
          <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Surround / wall ring */}
      <circle cx={cx} cy={cy} r={r + 22} fill="#0a0a0a" stroke="#1c1c1c" strokeWidth="1" />

      {/* Board surface */}
      <g filter="url(#casShadow)">
        <circle cx={cx} cy={cy} r={r} fill="url(#casBoardSurface)" />
      </g>

      {/* Segments */}
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
              x={polar2(cx, cy, r * 1.1, s + segAngle / 2).x}
              y={polar2(cx, cy, r * 1.1, s + segAngle / 2).y}
              fontSize="14"
              fontFamily="Archivo, sans-serif"
              fontWeight="800"
              fill="#d6d3c8"
              textAnchor="middle"
              dominantBaseline="middle"
              style={{ fontStretch: '75%' }}
            >
              {num}
            </text>
          </g>
        );
      })}

      {/* Spider wires */}
      {Array.from({ length: 20 }).map((_, i) => {
        const a = startAngle + i * segAngle;
        const p1 = polar2(cx, cy, r * 0.18, a);
        const p2 = polar2(cx, cy, r * 1.0, a);
        return <line key={i} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke="#7a7a7a" strokeWidth="0.6" opacity="0.6" />;
      })}
      {[0.18, 0.59, 0.62, 0.95, 1.0].map((mr, i) => (
        <circle key={i} cx={cx} cy={cy} r={r * mr} fill="none" stroke="#7a7a7a" strokeWidth="0.6" opacity="0.6" />
      ))}

      {/* Bull */}
      <circle cx={cx} cy={cy} r={r * 0.07} fill="oklch(0.74 0.18 145)" />
      <circle cx={cx} cy={cy} r={r * 0.03} fill="oklch(0.55 0.22 25)" />

      {/* Light ring highlight (top) */}
      <circle cx={cx} cy={cy} r={r} fill="url(#casBoardLight)" />
    </svg>
  );
}
function polar2(cx, cy, r, deg) {
  const rad = deg * Math.PI / 180;
  return { x: cx + Math.cos(rad) * r, y: cy + Math.sin(rad) * r };
}

// Dart that flies in from off-screen, scaling up, motion-blurred
function FlyingDart({ target }) {
  return (
    <div className="cas-flight" style={{ '--tx': `${target.tx}px`, '--ty': `${target.ty}px` }}>
      {/* Trail */}
      <div className="cas-flight-trail"></div>
      {/* Dart silhouette (perpendicular to flight path, gets bigger as it approaches) */}
      <div className="cas-flight-dart">
        <div className="cas-flight-tip"></div>
        <div className="cas-flight-shaft"></div>
        <div className="cas-flight-flight"></div>
      </div>
    </div>
  );
}

// Reticle that locks onto in-flight dart
function TrackingReticle({ target }) {
  return (
    <div className="cas-reticle" style={{ '--tx': `${target.tx}px`, '--ty': `${target.ty}px` }}>
      <div className="cas-reticle-corner cas-reticle-corner--tl"></div>
      <div className="cas-reticle-corner cas-reticle-corner--tr"></div>
      <div className="cas-reticle-corner cas-reticle-corner--bl"></div>
      <div className="cas-reticle-corner cas-reticle-corner--br"></div>
      <div className="cas-reticle-label">LOCK</div>
    </div>
  );
}

Object.assign(window, { Hero, CinematicArcShot });
