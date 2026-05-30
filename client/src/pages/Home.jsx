import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container" style={{ padding: '4rem 0' }}>
      <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }} className="animate-fade-in">
        <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', lineHeight: 1.2 }}>
          Find Your Dream Job with <br/><span className="gradient-text">MERN Job Portal</span>
        </h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-light)', marginBottom: '2.5rem', opacity: 0.9 }}>
          Connect with top employers and discover opportunities that match your skills. Join thousands of professionals accelerating their careers.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link to="/jobs" className="btn btn-primary" style={{ padding: '0.8rem 2rem', fontSize: '1.1rem' }}>
            Browse Jobs
          </Link>
          <Link to="/register" className="btn btn-outline" style={{ padding: '0.8rem 2rem', fontSize: '1.1rem' }}>
            Post a Job
          </Link>
        </div>
      </div>

      <div style={{ marginTop: '5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
        <div className="card" style={{ textAlign: 'center' }}>
          <h3 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>10k+</h3>
          <p>Active Jobs</p>
        </div>
        <div className="card" style={{ textAlign: 'center' }}>
          <h3 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: 'var(--secondary)' }}>5k+</h3>
          <p>Companies</p>
        </div>
        <div className="card" style={{ textAlign: 'center' }}>
          <h3 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: 'var(--primary-dark)' }}>50k+</h3>
          <p>Job Seekers</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
