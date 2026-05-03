// Marquee, How It Works, Features, Kits, Gallery, Testimonials, Specs, FAQ, Contact, Footer

function Marquee() {
  const items = ['COMPUTER VISION', 'PIXEL ACCURATE', 'PLUG & PLAY', 'BROADCAST GRADE', 'YOUR BOARD, SMARTER', 'BUILT TO ORDER'];
  const seq = [...items, ...items, ...items];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {seq.map((t, i) => (
          <span key={i} className="marquee-item">
            <span className="marquee-dot">●</span>{t}
          </span>
        ))}
      </div>
    </div>
  );
}

function HowItWorks() {
  const steps = [
    {
      num: '01',
      title: 'Mount the ring',
      body: 'A custom 3D-printed light ring fits around your existing bristle board. Shadowless, calibrated illumination for flawless camera capture.',
    },
    {
      num: '02',
      title: 'Plug in the brain',
      body: 'A pre-configured mini PC boots straight into the scoring software. HDMI to any TV or monitor, and you are live.',
    },
    {
      num: '03',
      title: 'Throw',
      body: 'Three high-speed cameras triangulate every impact. Score appears on screen in under 200ms. Undo, next-player, and game modes are all built-in.',
    },
  ];
  return (
    <section className="how" id="how">
      <div className="container">
        <div className="section-head">
          <div className="section-eyebrow">01 / HOW IT WORKS</div>
          <h2 className="section-title">
            Three steps.<br />
            <span className="accent">Then you play.</span>
          </h2>
        </div>
        <div className="how-grid">
          {steps.map((s) => (
            <div key={s.num} className="how-card">
              <div className="how-num">{s.num}</div>
              <div className="how-bar"></div>
              <h3 className="how-title">{s.title}</h3>
              <p className="how-body">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  const features = [
    {
      title: 'Use your own board',
      body: 'Compatible with any standard 18″ bristle dartboard. No proprietary surface, no compromise on feel.',
      stat: 'ANY BOARD',
    },
    {
      title: 'Triangulated detection',
      body: 'Three calibrated cameras converge on every impact, eliminating angle blind spots and parallax error.',
      stat: '3 CAMERAS',
    },
    {
      title: 'Real game modes',
      body: '501, Cricket, Around-the-Clock, Bermuda, and dozens more — single player, doubles, online matchmaking.',
      stat: '20+ MODES',
    },
    {
      title: 'Pre-flashed and tested',
      body: 'Every kit ships built. Plug in HDMI and power, and you are scoring inside two minutes.',
      stat: 'PLUG & PLAY',
    },
    {
      title: 'Online play',
      body: 'Match against players worldwide through the open AutoDarts network. Tournaments, leaderboards, the whole thing.',
      stat: 'ONLINE',
    },
    {
      title: 'Built by hand',
      body: 'Every kit is assembled, calibrated, and stress-tested in Pennsylvania before it ships to your door.',
      stat: 'MADE IN PA',
    },
  ];
  return (
    <section className="features" id="features">
      <div className="container">
        <div className="section-head">
          <div className="section-eyebrow">03 / FEATURES</div>
          <h2 className="section-title">
            Everything you need.<br />
            <span className="accent">Nothing you do not.</span>
          </h2>
        </div>
        <div className="features-grid">
          {features.map((f, i) => (
            <div key={i} className="feature-card">
              <div className="feature-stat">{f.stat}</div>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-body">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function KitsSection() {
  const [selected, setSelected] = useState('premium');

  const kits = {
    basic: {
      name: 'Basic',
      price: 400,
      tag: 'Bring your own board',
      desc: 'Everything you need to make your existing setup smart.',
      includes: [
        '3D-printed light ring with diffuser',
        '3× high-speed cameras with custom mounts',
        'Mini PC, pre-flashed and configured',
        'Dartboard surround',
        'All cabling and PSU',
      ],
      excludes: ['Dartboard', 'Display', 'Keyboard'],
    },
    premium: {
      name: 'Premium',
      price: 750,
      tag: 'Complete setup',
      desc: 'A full, ready-to-mount station — board, display, and all.',
      includes: [
        'Pro-grade Corona Vision light ring',
        'Tournament-grade bristle dartboard',
        'Dartboard surround',
        '3D-printed camera arms',
        '3× high-speed cameras',
        'Wireless keyboard with touchpad',
        '24″ smart display',
        'Mini PC, pre-flashed and configured',
      ],
      excludes: [],
    },
  };

  const k = kits[selected];

  return (
    <section className="kits" id="kits">
      <div className="container">
        <div className="section-head">
          <div className="section-eyebrow">04 / THE KITS</div>
          <h2 className="section-title">
            Pick your level.<br />
            <span className="accent">We build the rest.</span>
          </h2>
          <p className="section-sub">
            Two configurations. Both arrive assembled, calibrated, and tested.
            Optional on-site installation available within Pennsylvania for $50.
          </p>
        </div>

        <div className="kits-toggle">
          {Object.keys(kits).map((key) => (
            <button
              key={key}
              onClick={() => setSelected(key)}
              className={`kits-toggle-btn ${selected === key ? 'kits-toggle-btn--active' : ''}`}
            >
              {kits[key].name}
              <span className="kits-toggle-price">${kits[key].price}</span>
            </button>
          ))}
        </div>

        <div className="kit-card">
          <div className="kit-card-head">
            <div>
              <div className="kit-card-tag">{k.tag}</div>
              <div className="kit-card-name">{k.name} Kit</div>
              <div className="kit-card-desc">{k.desc}</div>
            </div>
            <div className="kit-card-price">
              <div className="kit-card-price-currency">$</div>
              <div className="kit-card-price-num">{k.price}</div>
            </div>
          </div>

          <div className="kit-card-body">
            <div className="kit-card-col">
              <div className="kit-card-col-label">INCLUDED</div>
              <ul className="kit-list">
                {k.includes.map((x, i) => (
                  <li key={i}><span className="kit-check">+</span>{x}</li>
                ))}
              </ul>
            </div>
            {k.excludes.length > 0 && (
              <div className="kit-card-col kit-card-col--excl">
                <div className="kit-card-col-label">NOT INCLUDED</div>
                <ul className="kit-list">
                  {k.excludes.map((x, i) => (
                    <li key={i}><span className="kit-x">—</span>{x}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="kit-card-foot">
            <a href={`mailto:sales@dartsvision.com?subject=${k.name}%20Kit%20Inquiry`} className="btn btn--primary">
              Order {k.name} Kit
              <span className="btn-arrow">→</span>
            </a>
            <a href="#contact" className="btn btn--ghost">Ask a question</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const shots = [
    { src: 'images/install-blade.jpg', label: 'Cabinet install with ambient lighting', tag: 'CABINET' },
    { src: 'images/install-basement.jpg', label: 'Basement setup with portrait monitor', tag: 'BASEMENT' },
    { src: 'images/install-viper.jpg', label: 'Floor-stand setup, surround mounted', tag: 'FREESTANDING' },
    { src: 'images/install-arcade.jpg', label: 'Game room install alongside arcade', tag: 'GAME ROOM' },
  ];
  return (
    <section className="gallery" id="gallery">
      <div className="container">
        <div className="section-head">
          <div className="section-eyebrow">05 / IN THE WILD</div>
          <h2 className="section-title">
            Real installs.<br />
            <span className="accent">Real customers.</span>
          </h2>
        </div>
      </div>
      <div className="gallery-grid">
        {shots.map((s, i) => (
          <figure key={i} className="gallery-item">
            <div className="gallery-img-wrap">
              <img src={s.src} alt={s.label} loading="lazy" />
              <div className="gallery-overlay"></div>
            </div>
            <figcaption className="gallery-caption">
              <span className="gallery-tag">{s.tag}</span>
              <span className="gallery-label">{s.label}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  const quotes = [
    {
      body: 'The best darting investment I have made. Setup was a breeze and it feels like playing in a real tournament every night.',
      name: 'Mark T.',
      role: 'League player',
    },
    {
      body: 'My friends are blown away every time. The scoring is flawless and we can just focus on the throw. Worth every dollar.',
      name: 'Sarah P.',
      role: 'Home user',
    },
    {
      body: 'Plugged in, calibrated itself, and we were on a 501 inside two minutes. The build quality is genuinely impressive.',
      name: 'Dan R.',
      role: 'Pub owner',
    },
  ];
  return (
    <section className="testimonials">
      <div className="container">
        <div className="section-head">
          <div className="section-eyebrow">06 / WORD OF MOUTH</div>
          <h2 className="section-title">
            From the people<br />
            <span className="accent">already throwing.</span>
          </h2>
        </div>
        <div className="testimonials-grid">
          {quotes.map((q, i) => (
            <figure key={i} className="t-card">
              <blockquote className="t-body">"{q.body}"</blockquote>
              <figcaption className="t-cite">
                <div className="t-name">{q.name}</div>
                <div className="t-role">{q.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Specs() {
  const rows = [
    ['Cameras', '3x 70 degree fixed focus, 30fps'],
    ['Detection accuracy', '±0.5mm at the segment boundary'],
    ['Score latency', '< 200ms from impact to display'],
    ['Compute', 'Mini PC, x86 — Linux, AutoDarts OS'],
    ['Power', 'Single 110V outlet, < 60W typical'],
    ['Display output', 'HDMI 1.4 — any TV or monitor'],
    ['Network', 'Wi-Fi 6 / Gigabit Ethernet'],
    ['Calibration', 'Auto on boot, manual recalibration in software'],
    ['Game modes', '501 / 301 / Cricket / ATC / Bermuda / Shanghai / + more'],
    ['Online play', 'Yes — open matchmaking network'],
  ];
  return (
    <section className="specs" id="specs">
      <div className="container">
        <div className="section-head">
          <div className="section-eyebrow">07 / SPECS</div>
          <h2 className="section-title">
            The technical<br />
            <span className="accent">small print.</span>
          </h2>
        </div>
        <div className="specs-table">
          {rows.map(([k, v], i) => (
            <div key={i} className="specs-row">
              <div className="specs-key">{k}</div>
              <div className="specs-val">{v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const items = [
    {
      q: 'Will it work with my existing dartboard?',
      a: 'Yes — any standard 17.5" - 18″ bristle dartboard fits inside the light ring. We do not require a proprietary or electronic board.',
    },
    {
      q: 'How long does setup take?',
      a: 'About 15 minutes. Mount the ring around your board, connect the mini PC to your TV, plug in power. The system auto-calibrates on first boot.',
    },
    {
      q: 'Does it need internet?',
      a: 'For initial setup and online play, yes. For local games, the system runs entirely offline once configured.',
    },
    {
      q: 'What about software updates?',
      a: 'The system pulls updates from the open-source AutoDarts project. Updates are optional and never forced.',
    },
    {
      q: 'Is on-site installation available?',
      a: 'Yes — within Pennsylvania, we offer professional installation for $50 on either kit. We mount the ring, calibrate the cameras, and walk you through the software.',
    },
    {
      q: 'What is your return policy?',
      a: 'If your kit arrives damaged or fails calibration, we will replace components or refund within 30 days. Reach out and we will sort it.',
    },
  ];
  const [open, setOpen] = useState(0);
  return (
    <section className="faq" id="faq">
      <div className="container">
        <div className="section-head">
          <div className="section-eyebrow">08 / FAQ</div>
          <h2 className="section-title">
            Common<br />
            <span className="accent">questions.</span>
          </h2>
        </div>
        <div className="faq-list">
          {items.map((it, i) => (
            <div key={i} className={`faq-item ${open === i ? 'faq-item--open' : ''}`}>
              <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)}>
                <span className="faq-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="faq-q-text">{it.q}</span>
                <span className="faq-toggle">{open === i ? '−' : '+'}</span>
              </button>
              <div className="faq-a">
                <p>{it.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="container">
        <div className="contact-grid">
          <div className="contact-left">
            <div className="section-eyebrow">09 / GET IN TOUCH</div>
            <h2 className="contact-title">
              Ready to<br />
              <span className="accent">upgrade your game?</span>
            </h2>
            <p className="contact-sub">
              Kits ship from Pennsylvania, fully assembled and tested.
              Reach out with questions, custom requests, or to place an order.
            </p>
            <div className="contact-cta">
              <a href="mailto:sales@dartsvision.com?subject=Kit%20Inquiry" className="btn btn--primary btn--lg">
                Email sales
                <span className="btn-arrow">→</span>
              </a>
            </div>
          </div>
          <div className="contact-right">
            <a href="mailto:sales@dartsvision.com" className="contact-card">
              <div className="contact-card-label">EMAIL</div>
              <div className="contact-card-value">sales@dartsvision.com</div>
              <div className="contact-card-arrow">→</div>
            </a>
            <a href="tel:484-469-0299" className="contact-card">
              <div className="contact-card-label">PHONE</div>
              <div className="contact-card-value">484 · 469 · 0299</div>
              <div className="contact-card-arrow">→</div>
            </a>
            <div className="contact-card contact-card--static">
              <div className="contact-card-label">SHIPS FROM</div>
              <div className="contact-card-value">Pennsylvania, USA</div>
            </div>
            <div className="contact-card contact-card--static">
              <div className="contact-card-label">LEAD TIME</div>
              <div className="contact-card-value">2–3 weeks, built to order</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-row">
          <Logo />
          <div className="footer-links">
            <a href="#how">How it works</a>
            <a href="#kits">Kits</a>
            <a href="#specs">Specs</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
        <div className="footer-fine">
          <div>© 2026 DartsVision. Built in Pennsylvania.</div>
          <div>Powered by the open-source AutoDarts project. Independently operated.</div>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, {
  Marquee, HowItWorks, Features, KitsSection, Gallery,
  Testimonials, Specs, FAQ, Contact, Footer,
});
