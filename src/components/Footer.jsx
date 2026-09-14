function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" id="contact">
      <div className="footer-brand">
        <a className="brand" href="#home">
          <span className="brand-mark">SR</span>
          <span>Screenly</span>
        </a>
        <p>Clearer ideas, one recording at a time.</p>
      </div>
      <div className="footer-links">
        <a href="mailto:hello@screenly.example">Get in touch</a>
        <a href="#features">Features</a>
        <span>{currentYear} Screenly</span>
      </div>
    </footer>
  );
}

export default Footer;
