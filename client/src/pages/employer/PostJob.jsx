import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import api from '../../api/axios';

const PostJob = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requirements: '',
    location: '',
    type: 'full-time',
    category: '',
    minSalary: '',
    maxSalary: '',
    currency: 'USD'
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      
      const jobData = {
        title: formData.title,
        description: formData.description,
        requirements: formData.requirements,
        location: formData.location,
        type: formData.type,
        category: formData.category,
        salary: {
          min: Number(formData.minSalary),
          max: Number(formData.maxSalary),
          currency: formData.currency
        }
      };
      
      await api.post('/jobs', jobData);
      navigate('/employer/manage-jobs');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to post job');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <Link to="/employer/dashboard" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', color: 'var(--text-light)', textDecoration: 'none' }}>
        <ArrowLeft size={20} /> Back to Dashboard
      </Link>
      
      <div className="card animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ marginBottom: '1.5rem', color: 'var(--text-dark)' }}>Post a <span className="gradient-text">New Job</span></h1>
        
        {error && <div style={{ padding: '1rem', background: '#fee2e2', color: '#b91c1c', borderRadius: '0.5rem', marginBottom: '1.5rem' }}>{error}</div>}
        
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="title">Job Title</label>
            <input type="text" className="form-control" id="title" name="title" value={formData.title} onChange={onChange} required />
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="category">Category</label>
              <select className="form-control" id="category" name="category" value={formData.category} onChange={onChange} required>
                <option value="">Select Category</option>
                <option value="Engineering">Engineering</option>
                <option value="Design">Design</option>
                <option value="Marketing">Marketing</option>
                <option value="Sales">Sales</option>
                <option value="Product">Product</option>
                <option value="Customer Support">Customer Support</option>
              </select>
            </div>
            
            <div className="form-group">
              <label className="form-label" htmlFor="type">Job Type</label>
              <select className="form-control" id="type" name="type" value={formData.type} onChange={onChange} required>
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="remote">Remote</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
              </select>
            </div>
          </div>
          
          <div className="form-group">
            <label className="form-label" htmlFor="location">Location</label>
            <input type="text" className="form-control" id="location" name="location" value={formData.location} onChange={onChange} required placeholder="e.g. New York, NY or Remote" />
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="minSalary">Min Salary</label>
              <input type="number" className="form-control" id="minSalary" name="minSalary" value={formData.minSalary} onChange={onChange} required />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="maxSalary">Max Salary</label>
              <input type="number" className="form-control" id="maxSalary" name="maxSalary" value={formData.maxSalary} onChange={onChange} required />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="currency">Currency</label>
              <select className="form-control" id="currency" name="currency" value={formData.currency} onChange={onChange}>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="INR">INR</option>
              </select>
            </div>
          </div>
          
          <div className="form-group">
            <label className="form-label" htmlFor="description">Job Description</label>
            <textarea className="form-control" id="description" name="description" rows="5" value={formData.description} onChange={onChange} required></textarea>
          </div>
          
          <div className="form-group">
            <label className="form-label" htmlFor="requirements">Requirements</label>
            <textarea className="form-control" id="requirements" name="requirements" rows="5" value={formData.requirements} onChange={onChange} required placeholder="List the skills, experience, and qualifications needed"></textarea>
          </div>
          
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem', fontSize: '1.1rem' }} disabled={loading}>
            {loading ? 'Posting...' : 'Post Job'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
