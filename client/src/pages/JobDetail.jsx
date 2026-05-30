import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Briefcase, DollarSign, Clock, Building, ArrowLeft } from 'lucide-react';
import api from '../api/axios';
import AuthContext from '../context/AuthContext';

const JobDetail = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [coverLetter, setCoverLetter] = useState('');
  const [applying, setApplying] = useState(false);
  const [applySuccess, setApplySuccess] = useState(false);
  const [applyError, setApplyError] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await api.get(`/jobs/${id}`);
        setJob(res.data.data);
      } catch (err) {
        setError('Failed to fetch job details.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchJob();
  }, [id]);

  const handleApply = async (e) => {
    e.preventDefault();
    if (!user) {
      setApplyError('Please login to apply');
      return;
    }
    
    try {
      setApplying(true);
      setApplyError(null);
      await api.post(`/applications/${id}`, { coverLetter });
      setApplySuccess(true);
    } catch (err) {
      setApplyError(err.response?.data?.message || 'Failed to submit application');
    } finally {
      setApplying(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) return <div className="container" style={{ padding: '3rem', textAlign: 'center' }}>Loading job details...</div>;
  if (error) return <div className="container" style={{ padding: '3rem', textAlign: 'center', color: 'red' }}>{error}</div>;
  if (!job) return <div className="container" style={{ padding: '3rem', textAlign: 'center' }}>Job not found.</div>;

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <Link to="/jobs" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', color: 'var(--text-light)', textDecoration: 'none' }}>
        <ArrowLeft size={20} /> Back to Jobs
      </Link>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
        <div className="card animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: 'var(--text-dark)' }}>{job.title}</h1>
            <p style={{ fontSize: '1.25rem', color: 'var(--primary)', fontWeight: '600' }}>
              <Building size={20} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '0.5rem' }} />
              {job.company}
            </p>
          </div>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', padding: '1rem 0', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-light)' }}>
              <MapPin size={20} className="text-primary" /> {job.location}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-light)' }}>
              <Briefcase size={20} /> {job.type}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-light)' }}>
              <DollarSign size={20} /> {job.salary.min.toLocaleString()} - {job.salary.max.toLocaleString()} {job.salary.currency}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-light)' }}>
              <Clock size={20} /> Posted on {formatDate(job.createdAt)}
            </div>
          </div>
          
          <div>
            <h3 style={{ marginBottom: '1rem' }}>Job Description</h3>
            <p style={{ whiteSpace: 'pre-line', lineHeight: '1.6' }}>{job.description}</p>
          </div>
          
          <div>
            <h3 style={{ marginBottom: '1rem' }}>Requirements</h3>
            <p style={{ whiteSpace: 'pre-line', lineHeight: '1.6' }}>{job.requirements}</p>
          </div>
        </div>

        {/* Application Form for Seekers */}
        {(!user || user.role === 'seeker') && (
          <div className="card animate-fade-in" style={{ marginTop: '2rem' }}>
            <h3 style={{ marginBottom: '1.5rem' }}>Apply for this position</h3>
            
            {!user ? (
              <div>
                <p style={{ marginBottom: '1rem' }}>Please log in to apply for this job.</p>
                <Link to="/login" className="btn btn-primary">Log In</Link>
              </div>
            ) : applySuccess ? (
              <div style={{ padding: '1rem', background: '#dcfce3', color: '#166534', borderRadius: '0.5rem', border: '1px solid #bbf7d0' }}>
                Successfully applied! The employer will review your application.
              </div>
            ) : (
              <form onSubmit={handleApply}>
                {applyError && <div style={{ color: 'red', marginBottom: '1rem' }}>{applyError}</div>}
                
                <div className="form-group">
                  <label className="form-label" htmlFor="coverLetter">Cover Letter</label>
                  <textarea 
                    className="form-control" 
                    id="coverLetter" 
                    rows="5"
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    required
                    placeholder="Why are you a good fit for this role?"
                  ></textarea>
                </div>
                
                <p style={{ fontSize: '0.875rem', color: 'var(--text-light)', marginBottom: '1rem' }}>
                  Your profile resume will be attached automatically.
                </p>
                
                <button type="submit" className="btn btn-primary" disabled={applying}>
                  {applying ? 'Submitting...' : 'Submit Application'}
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobDetail;
