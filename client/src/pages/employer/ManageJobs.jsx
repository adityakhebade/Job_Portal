import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Edit, Trash2, Users, MapPin, Eye, ArrowLeft } from 'lucide-react';
import api from '../../api/axios';
import AuthContext from '../../context/AuthContext';

const ManageJobs = () => {
  const { user } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMyJobs = async () => {
      try {
        // In a real app, you'd probably have an endpoint like GET /api/jobs/my
        // Or you fetch all jobs and filter on the backend. Since the plan doesn't specify GET /api/jobs/my,
        // we could just fetch jobs with a query parameter `employer=${user.id}`
        // For simplicity, let's just fetch jobs and assume the API filters it if we send employer ID (or we filter it on frontend if small scale).
        // Let's assume the API doesn't filter it by default.
        const res = await api.get('/jobs');
        const myJobs = res.data.data.filter(j => j.employer && (j.employer._id === user.id || j.employer === user.id));
        setJobs(myJobs);
      } catch (err) {
        setError('Failed to fetch jobs');
      } finally {
        setLoading(false);
      }
    };
    
    if (user) {
      fetchMyJobs();
    }
  }, [user]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        await api.delete(`/jobs/${id}`);
        setJobs(jobs.filter(job => job._id !== id));
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to delete job');
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric', month: 'short', day: 'numeric'
    });
  };

  if (loading) return <div className="container" style={{ padding: '3rem', textAlign: 'center' }}>Loading your jobs...</div>;

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <Link to="/employer/dashboard" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', color: 'var(--text-light)', textDecoration: 'none' }}>
        <ArrowLeft size={20} /> Back to Dashboard
      </Link>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Manage <span className="gradient-text">Jobs</span></h1>
        <Link to="/employer/post-job" className="btn btn-primary">Post New Job</Link>
      </div>
      
      {error && <div style={{ padding: '1rem', background: '#fee2e2', color: '#b91c1c', borderRadius: '0.5rem', marginBottom: '1.5rem' }}>{error}</div>}
      
      {jobs.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <h3>No jobs posted yet</h3>
          <p style={{ color: 'var(--text-light)', margin: '1rem 0' }}>Create your first job listing to start receiving applications.</p>
          <Link to="/employer/post-job" className="btn btn-primary">Post a Job</Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {jobs.map((job) => (
            <div key={job._id} className="card animate-fade-in" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>
                  <Link to={`/jobs/${job._id}`} style={{ textDecoration: 'none', color: 'var(--text-dark)' }}>
                    {job.title}
                  </Link>
                </h3>
                <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.875rem', color: '#64748b', marginTop: '0.5rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><MapPin size={16} /> {job.location}</span>
                  <span>Posted: {formatDate(job.createdAt)}</span>
                  <span style={{ color: job.isActive ? '#16a34a' : '#ef4444' }}>
                    {job.isActive ? 'Active' : 'Closed'}
                  </span>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Link to={`/employer/jobs/${job._id}/applicants`} className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Users size={16} /> Applicants
                </Link>
                <Link to={`/employer/edit-job/${job._id}`} className="btn" style={{ background: '#e0f2fe', color: '#0369a1' }}>
                  <Edit size={16} />
                </Link>
                <button onClick={() => handleDelete(job._id)} className="btn" style={{ background: '#fee2e2', color: '#b91c1c' }}>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageJobs;
