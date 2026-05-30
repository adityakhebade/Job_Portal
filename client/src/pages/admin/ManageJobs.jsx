import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Trash2, Building, MapPin } from 'lucide-react';
import api from '../../api/axios';

const AdminManageJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get('/admin/jobs');
        setJobs(res.data.data);
      } catch (err) {
        setError('Failed to fetch jobs');
      } finally {
        setLoading(false);
      }
    };
    
    fetchJobs();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        await api.delete(`/admin/jobs/${id}`);
        setJobs(jobs.filter(job => job._id !== id));
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to delete job');
      }
    }
  };

  if (loading) return <div className="container" style={{ padding: '3rem', textAlign: 'center' }}>Loading jobs...</div>;

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <Link to="/admin/dashboard" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', color: 'var(--text-light)', textDecoration: 'none' }}>
        <ArrowLeft size={20} /> Back to Dashboard
      </Link>
      
      <div style={{ marginBottom: '2rem' }}>
        <h1>Manage <span className="gradient-text">All Jobs</span></h1>
        <p style={{ color: 'var(--text-light)', marginTop: '0.5rem' }}>Total jobs: {jobs.length}</p>
      </div>
      
      {error && <div style={{ padding: '1rem', background: '#fee2e2', color: '#b91c1c', borderRadius: '0.5rem', marginBottom: '1.5rem' }}>{error}</div>}
      
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid var(--border-light)' }}>
                <th style={{ padding: '1rem', fontWeight: '600', color: 'var(--text-light)' }}>Job Details</th>
                <th style={{ padding: '1rem', fontWeight: '600', color: 'var(--text-light)' }}>Employer</th>
                <th style={{ padding: '1rem', fontWeight: '600', color: 'var(--text-light)' }}>Status</th>
                <th style={{ padding: '1rem', fontWeight: '600', color: 'var(--text-light)', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job._id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ fontWeight: '500', marginBottom: '0.25rem' }}>
                      <Link to={`/jobs/${job._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        {job.title}
                      </Link>
                    </div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-light)', display: 'flex', gap: '1rem' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><MapPin size={12} /> {job.location}</span>
                      <span>{job.type}</span>
                    </div>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Building size={16} color="#64748b" />
                      <div>
                        <div style={{ fontWeight: '500', fontSize: '0.875rem' }}>{job.employer?.company || job.company}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>{job.employer?.name}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ 
                      background: job.isActive ? '#dcfce3' : '#f1f5f9', 
                      color: job.isActive ? '#166534' : '#475569', 
                      padding: '0.25rem 0.75rem', 
                      borderRadius: '9999px',
                      fontSize: '0.75rem',
                      fontWeight: '600'
                    }}>
                      {job.isActive ? 'Active' : 'Closed'}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'right' }}>
                    <button 
                      onClick={() => handleDelete(job._id)} 
                      className="btn" 
                      style={{ background: '#fee2e2', color: '#b91c1c', padding: '0.5rem' }}
                      title="Delete job"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              
              {jobs.length === 0 && (
                <tr>
                  <td colSpan="4" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-light)' }}>
                    No jobs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminManageJobs;
