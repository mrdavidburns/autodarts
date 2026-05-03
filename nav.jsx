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
      <div className="nav-actions">
        <a
          href="https://www.facebook.com/groups/1962594431341774"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-social"
          aria-label="Join the DartsVision Facebook group"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
          </svg>
        </a>
        <a href="#contact" className="nav-cta">
          Order kit
          <span className="nav-cta-arrow">→</span>
        </a>
      </div>
    </nav>
  );
}

Object.assign(window, { Logo, Nav });
