import { useState } from "react";

function Hero() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="hero" id="home">
      <nav className="navbar" aria-label="Main navigation">
        <a className="brand" href="#home" onClick={closeMenu}>
          <span className="brand-mark">SR</span>
          <span>Screenly</span>
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="main-menu"
          onClick={() => setMenuOpen((isOpen) => !isOpen)}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
        <div className={`nav-menu${menuOpen ? " is-open" : ""}`} id="main-menu">
          <a href="#home" onClick={closeMenu}>
            Home
          </a>
          <a href="#features" onClick={closeMenu}>
            Features
          </a>
          <a href="#about" onClick={closeMenu}>
            About
          </a>
          <a href="#contact" onClick={closeMenu}>
            Contact
          </a>
          <a className="nav-cta" href="#recorder" onClick={closeMenu}>
            Open recorder
          </a>
        </div>
      </nav>

      <div className="hero-inner">
        <div className="hero-copy">
          <p className="eyebrow">Private, simple, browser-based</p>
          <h1>Make your screen easy to understand.</h1>
          <p className="hero-description">
            Record walkthroughs, lessons, demos, and ideas directly from your
            browser. No installs, no account, no clutter.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#recorder">
              Start recording
            </a>
            <a className="text-link" href="#features">
              See how it works <span aria-hidden="true">-&gt;</span>
            </a>
          </div>
          <div className="hero-proof">
            <span className="status-dot" aria-hidden="true" />
            <span>Ready when you are</span>
            <span className="proof-divider" aria-hidden="true" />
            <span>Works on modern desktop and mobile browsers</span>
          </div>
        </div>
        <div className="hero-visual" aria-label="Screen recorder preview">
          <div className="preview-window">
            <div className="preview-bar">
              <span className="window-dots">
                <i />
                <i />
                <i />
              </span>
              <span className="preview-label">screenly / recording</span>
              <span className="live-pill">
                <span /> LIVE
              </span>
            </div>
            <div className="preview-stage">
              <div className="preview-grid" />
              <div className="preview-message">
                <span className="preview-icon">REC</span>
                <strong>Your next idea starts here</strong>
                <span>Capture it clearly.</span>
              </div>
            </div>
            <div className="preview-footer">
              <span>00:00:00</span>
              <span className="preview-wave">||||| |||| |||||</span>
              <span className="preview-stop" />
            </div>
          </div>
        </div>
      </div>
      <div className="hero-ticker" aria-hidden="true">
        <span>SCREEN CAPTURE / SCREEN CAPTURE / SCREEN CAPTURE /</span>
      </div>
    </header>
  );
}

export default Hero;
