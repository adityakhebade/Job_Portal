import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, User, Mail, FileText, CheckCircle, XCircle } from 'lucide-react';
import api from '../../api/axios';

const Applicants = () => {
  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const [appRes, jobRes] = await Promise.all([
          api.get(`/applications/job/${jobId}`),
          api.get(`/jobs/${jobId}`)
        ]);
        setApplications(appRes.data.data);
        setJob(jobRes.data.data);
      } catch (err) {
        setError('Failed to fetch applicants');
      } finally {
        setLoading(false);
      }
    };
    
    fetchApplicants();
  }, [jobId]);

  const handleStatusChange = async (id, status) => {
    try {
      await api.put(`/applications/${id}/status`, { status });
      setApplications(applications.map(app => 
        app._id === id ? { ...app, status } : app
      ));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update status');
    }
  };

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

  if (loading) return <div className="container" style={{ padding: '3rem', textAlign: 'center' }}>Loading applicants...</div>;

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <Link to="/employer/manage-jobs" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', color: 'var(--text-light)', textDecoration: 'none' }}>
        <ArrowLeft size={20} /> Back to Manage Jobs
      </Link>
      
      <div style={{ marginBottom: '2rem' }}>
        <h1>Applicants for <span className="gradient-text">{job?.title}</span></h1>
        <p style={{ color: 'var(--text-light)', marginTop: '0.5rem' }}>Total applications: {applications.length}</p>
      </div>
      
      {error && <div style={{ padding: '1rem', background: '#fee2e2', color: '#b91c1c', borderRadius: '0.5rem', marginBottom: '1.5rem' }}>{error}</div>}
      
      {applications.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <h3>No applicants yet</h3>
          <p style={{ color: 'var(--text-light)', marginTop: '0.5rem' }}>Check back later to see new applications.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {applications.map((app) => (
            <div key={app._id} className="card animate-fade-in" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <User size={24} color="#64748b" />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.25rem' }}>{app.seeker?.name}</h3>
                    <div style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem', color: '#64748b', marginTop: '0.25rem' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Mail size={14} /> {app.seeker?.email}</span>
                      <span>Applied: {new Date(app.appliedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
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
              
              <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}>
                <h4 style={{ marginBottom: '0.5rem', fontSize: '1rem' }}>Cover Letter</h4>
                <p style={{ fontSize: '0.9rem', lineHeight: '1.5', whiteSpace: 'pre-line' }}>{app.coverLetter}</p>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <button className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <FileText size={16} /> View Resume
                  </button>
                </div>
                
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.875rem', color: '#64748b', marginRight: '0.5rem' }}>Update Status:</span>
                  <select 
                    className="form-control" 
                    style={{ width: 'auto', padding: '0.5rem' }}
                    value={app.status}
                    onChange={(e) => handleStatusChange(app._id, e.target.value)}
                  >
                    <option value="pending">Pending</option>
                    <option value="reviewed">Reviewed</option>
                    <option value="shortlisted">Shortlisted</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Applicants;
