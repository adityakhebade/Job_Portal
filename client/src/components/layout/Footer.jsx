const Footer = () => {
  return (
    <footer className="footer">
      <div className="container" style={{ textAlign: 'center' }}>
        <p style={{ color: 'var(--text-muted)' }}>&copy; {new Date().getFullYear()} MERN Job Portal. All rights reserved.</p>
        <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)', opacity: 0.6 }}>
          Built with React, Node.js, and MongoDB
        </p>
      </div>
    </footer>
  );
};

export default Footer;
