import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, Briefcase, FileText, Activity } from 'lucide-react';
import api from '../../api/axios';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/admin/stats');
        setStats(res.data.data);
      } catch (err) {
        setError('Failed to fetch dashboard statistics');
      } finally {
        setLoading(false);
      }
    };
    
    fetchStats();
  }, []);

  if (loading) return <div className="container" style={{ padding: '3rem', textAlign: 'center' }}>Loading dashboard...</div>;

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <h1 style={{ marginBottom: '2rem' }}>Admin <span className="gradient-text">Dashboard</span></h1>
      
      {error && <div style={{ padding: '1rem', background: '#fee2e2', color: '#b91c1c', borderRadius: '0.5rem', marginBottom: '1.5rem' }}>{error}</div>}
      
      {stats && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          <div className="card animate-fade-in" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ background: '#e0e7ff', padding: '1rem', borderRadius: '0.5rem', color: '#4f46e5' }}>
              <Users size={32} />
            </div>
            <div>
              <p style={{ color: 'var(--text-light)', fontSize: '0.875rem', fontWeight: '500', textTransform: 'uppercase' }}>Total Users</p>
              <h2 style={{ fontSize: '2rem', marginTop: '0.25rem' }}>{stats.users.total}</h2>
            </div>
          </div>
          
          <div className="card animate-fade-in" style={{ animationDelay: '0.1s', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ background: '#dbeafe', padding: '1rem', borderRadius: '0.5rem', color: '#2563eb' }}>
              <Briefcase size={32} />
            </div>
            <div>
              <p style={{ color: 'var(--text-light)', fontSize: '0.875rem', fontWeight: '500', textTransform: 'uppercase' }}>Total Jobs</p>
              <h2 style={{ fontSize: '2rem', marginTop: '0.25rem' }}>{stats.jobs.total}</h2>
            </div>
          </div>
          
          <div className="card animate-fade-in" style={{ animationDelay: '0.2s', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ background: '#dcfce3', padding: '1rem', borderRadius: '0.5rem', color: '#166534' }}>
              <FileText size={32} />
            </div>
            <div>
              <p style={{ color: 'var(--text-light)', fontSize: '0.875rem', fontWeight: '500', textTransform: 'uppercase' }}>Applications</p>
              <h2 style={{ fontSize: '2rem', marginTop: '0.25rem' }}>{stats.applications}</h2>
            </div>
          </div>
          
          <div className="card animate-fade-in" style={{ animationDelay: '0.3s', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ background: '#fef3c7', padding: '1rem', borderRadius: '0.5rem', color: '#d97706' }}>
              <Activity size={32} />
            </div>
            <div>
              <p style={{ color: 'var(--text-light)', fontSize: '0.875rem', fontWeight: '500', textTransform: 'uppercase' }}>Active Jobs</p>
              <h2 style={{ fontSize: '2rem', marginTop: '0.25rem' }}>{stats.jobs.active}</h2>
            </div>
          </div>
        </div>
      )}
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div className="card animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <h2 style={{ marginBottom: '1.5rem' }}>Quick Actions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Link to="/admin/users" className="btn btn-outline" style={{ display: 'flex', justifyContent: 'center' }}>
              Manage Users
            </Link>
            <Link to="/admin/jobs" className="btn btn-outline" style={{ display: 'flex', justifyContent: 'center' }}>
              Manage Jobs
            </Link>
          </div>
        </div>
        
        <div className="card animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <h2 style={{ marginBottom: '1.5rem' }}>System Status</h2>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <li style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1rem', borderBottom: '1px solid var(--border-light)' }}>
              <span>Database Connection</span>
              <span style={{ color: '#16a34a', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: '8px', height: '8px', background: '#16a34a', borderRadius: '50%', display: 'inline-block' }}></span> Connected
              </span>
            </li>
            <li style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1rem', borderBottom: '1px solid var(--border-light)' }}>
              <span>API Status</span>
              <span style={{ color: '#16a34a', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: '8px', height: '8px', background: '#16a34a', borderRadius: '50%', display: 'inline-block' }}></span> Online
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
