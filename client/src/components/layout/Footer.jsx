const Footer = () => {
  return (
    <footer className="footer">
      <div className="container" style={{ textAlign: 'center' }}>
        <p>&copy; {new Date().getFullYear()} MERN Job Portal. All rights reserved.</p>
        <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: 'var(--text-light)', opacity: 0.8 }}>
          Built with React, Node.js, and MongoDB
        </p>
      </div>
    </footer>
  );
};

export default Footer;
