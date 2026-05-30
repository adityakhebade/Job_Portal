import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ position: 'relative', overflow: 'hidden', padding: '6rem 0', minHeight: 'calc(100vh - 5rem)', display: 'flex', alignItems: 'center' }}>
      {/* Decorative Orbs */}
      <div className="bg-orb bg-orb-1"></div>
      <div className="bg-orb bg-orb-2"></div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }} className="animate-fade-in">
          <h1 style={{ fontSize: '4.5rem', marginBottom: '1.5rem', lineHeight: 1.1 }}>
            Shape Your Future with <br/>
            <span className="gradient-text">MERN Job Portal</span>
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', marginBottom: '3rem', lineHeight: 1.6, maxWidth: '600px', margin: '0 auto 3rem auto' }}>
            Connect with industry-leading employers and discover opportunities that elevate your career. Join thousands of professionals worldwide.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
            <Link to="/jobs" className="btn btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
              Explore Jobs
            </Link>
            <Link to="/register" className="btn btn-outline" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
              Hire Talent
            </Link>
          </div>
        </div>

        <div style={{ marginTop: '7rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem' }}>
          <div className="glass-card animate-fade-in" style={{ textAlign: 'center', animationDelay: '0.2s' }}>
            <h3 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', className: 'gradient-text', color: 'var(--primary)' }}>10k+</h3>
            <p style={{ color: 'var(--text-muted)', fontWeight: 500, letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.9rem' }}>Active Opportunities</p>
          </div>
          <div className="glass-card animate-fade-in" style={{ textAlign: 'center', animationDelay: '0.4s' }}>
            <h3 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', className: 'gradient-text-alt', color: 'var(--secondary)' }}>5k+</h3>
            <p style={{ color: 'var(--text-muted)', fontWeight: 500, letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.9rem' }}>Top Companies</p>
          </div>
          <div className="glass-card animate-fade-in" style={{ textAlign: 'center', animationDelay: '0.6s' }}>
            <h3 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: 'var(--accent)' }}>50k+</h3>
            <p style={{ color: 'var(--text-muted)', fontWeight: 500, letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.9rem' }}>Successful Placements</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
