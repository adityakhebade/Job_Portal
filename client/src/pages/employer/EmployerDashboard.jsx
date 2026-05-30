import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { Briefcase, Users, PlusCircle } from 'lucide-react';

const EmployerDashboard = () => {
  const { user } = useContext(AuthContext);
  
  const [formData, setFormData] = useState({
    name: user.name || '',
    companyName: user.company?.name || '',
    companyWebsite: user.company?.website || '',
    companyDescription: user.company?.description || ''
  });
  
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState('');

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setUpdating(true);
      setMessage('');
      setMessage('Company profile update functionality will be implemented in a future update.');
    } catch (err) {
      setMessage('Error updating profile');
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <h1 style={{ marginBottom: '2rem' }}>Employer <span className="gradient-text">Dashboard</span></h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <Link to="/employer/manage-jobs" className="card animate-fade-in" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: '#e0e7ff', padding: '1rem', borderRadius: '0.5rem', color: '#4f46e5' }}>
            <Briefcase size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>Manage Jobs</h3>
            <p style={{ color: 'var(--text-light)', fontSize: '0.875rem' }}>View and edit postings</p>
          </div>
        </Link>
        
        <Link to="/employer/post-job" className="card animate-fade-in" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '1rem', animationDelay: '0.1s' }}>
          <div style={{ background: '#dcfce3', padding: '1rem', borderRadius: '0.5rem', color: '#166534' }}>
            <PlusCircle size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>Post a Job</h3>
            <p style={{ color: 'var(--text-light)', fontSize: '0.875rem' }}>Create a new listing</p>
          </div>
        </Link>
      </div>
      
      <div className="card animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <h2 style={{ marginBottom: '1.5rem' }}>Company Profile</h2>
        
        {message && (
          <div style={{ padding: '1rem', background: '#e0f2fe', color: '#0369a1', borderRadius: '0.5rem', marginBottom: '1.5rem' }}>
            {message}
          </div>
        )}
        
        <form onSubmit={onSubmit} style={{ display: 'grid', gap: '1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" htmlFor="name">Contact Person</label>
              <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={onChange} />
            </div>
            
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" htmlFor="companyName">Company Name</label>
              <input type="text" className="form-control" id="companyName" name="companyName" value={formData.companyName} onChange={onChange} />
            </div>
          </div>
          
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" htmlFor="companyWebsite">Website URL</label>
            <input type="url" className="form-control" id="companyWebsite" name="companyWebsite" value={formData.companyWebsite} onChange={onChange} placeholder="https://example.com" />
          </div>
          
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" htmlFor="companyDescription">Company Description</label>
            <textarea className="form-control" id="companyDescription" name="companyDescription" rows="4" value={formData.companyDescription} onChange={onChange}></textarea>
          </div>
          
          <button type="submit" className="btn btn-primary" style={{ justifySelf: 'start' }} disabled={updating}>
            {updating ? 'Saving...' : 'Save Profile'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmployerDashboard;
