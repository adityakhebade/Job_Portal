import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';
import { Building, MapPin, Calendar, Clock, ArrowLeft } from 'lucide-react';

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await api.get('/applications/my');
        setApplications(res.data.data);
      } catch (err) {
        setError('Failed to fetch applications');
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return { bg: '#fef3c7', text: '#d97706' };
      case 'reviewed': return { bg: '#e0f2fe', text: '#0284c7' };
      case 'shortlisted': return { bg: '#dcfce3', text: '#166534' };
      case 'accepted': return { bg: '#dcfce3', text: '#166534' };
      case 'rejected': return { bg: '#fee2e2', text: '#b91c1c' };
      default: return { bg: '#f1f5f9', text: '#475569' };
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric', month: 'short', day: 'numeric'
    });
  };

  if (loading) return <div className="container" style={{ padding: '3rem', textAlign: 'center' }}>Loading applications...</div>;

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <Link to="/seeker/dashboard" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', color: 'var(--text-light)', textDecoration: 'none' }}>
        <ArrowLeft size={20} /> Back to Dashboard
      </Link>

      <h1 style={{ marginBottom: '2rem' }}>My <span className="gradient-text">Applications</span></h1>

      {error && <div style={{ padding: '1rem', background: '#fee2e2', color: '#b91c1c', borderRadius: '0.5rem', marginBottom: '1.5rem' }}>{error}</div>}

      {applications.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <h3>No applications yet</h3>
          <p style={{ color: 'var(--text-light)', margin: '1rem 0' }}>You haven't applied to any jobs.</p>
          <Link to="/jobs" className="btn btn-primary">Browse Jobs</Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {applications.map((app) => (
            <div key={app._id} className="card animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>
                    <Link to={`/jobs/${app.job._id}`} style={{ textDecoration: 'none', color: 'var(--text-dark)' }}>
                      {app.job.title}
                    </Link>
                  </h3>
                  <p style={{ color: 'var(--primary)', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Building size={16} /> {app.job.company}
                  </p>
                </div>
                <span style={{ 
                  background: getStatusColor(app.status).bg, 
                  color: getStatusColor(app.status).text, 
                  padding: '0.25rem 0.75rem', 
                  borderRadius: '9999px',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  textTransform: 'capitalize'
                }}>
                  {app.status}
                </span>
              </div>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', fontSize: '0.875rem', color: '#64748b' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <MapPin size={16} /> {app.job.location}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Calendar size={16} /> Applied: {formatDate(app.appliedAt)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyApplications;
