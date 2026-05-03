// Navigation + brand mark
function Logo({ size = 22 }) {
  return (
    <a href="#top" className="logo" aria-label="DartsVision">
      <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
        <circle cx="16" cy="16" r="14" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="16" cy="16" r="9" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="16" cy="16" r="3.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="16" cy="16" r="1.4" fill="var(--accent)" />
        <line x1="0" y1="16" x2="6" y2="16" stroke="currentColor" strokeWidth="1.4" />
        <line x1="26" y1="16" x2="32" y2="16" stroke="currentColor" strokeWidth="1.4" />
        <line x1="16" y1="0" x2="16" y2="6" stroke="currentColor" strokeWidth="1.4" />
        <line x1="16" y1="26" x2="16" y2="32" stroke="currentColor" strokeWidth="1.4" />
      </svg>
      <span className="logo-word">DartsVision</span>
    </a>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`} id="top">
      <Logo />
      <div className="nav-links">
        <a href="#how">How it works</a>
        <a href="#demo">Demo</a>
        <a href="#kits">Kits</a>
        <a href="#gallery">Gallery</a>
        <a href="#faq">FAQ</a>
      </div>
      <a href="#contact" className="nav-cta">
        Order kit
        <span className="nav-cta-arrow">→</span>
      </a>
    </nav>
  );
}

Object.assign(window, { Logo, Nav });
