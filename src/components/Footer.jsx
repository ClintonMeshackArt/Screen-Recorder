function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <p>© {currentYear} Clinton Meshack k. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
