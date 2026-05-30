import { useState, useEffect } from 'react';
import api from '../api/axios';
import JobCard from '../components/jobs/JobCard';
import JobFilters from '../components/jobs/JobFilters';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const fetchJobs = async (filters = {}) => {
    try {
      setLoading(true);
      
      // Build query string
      const queryParams = new URLSearchParams();
      if (filters.search) queryParams.append('search', filters.search);
      if (filters.type) queryParams.append('type', filters.type);
      if (filters.category) queryParams.append('category', filters.category);
      
      const res = await api.get(`/jobs?${queryParams.toString()}`);
      setJobs(res.data.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch jobs. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleFilterChange = (filters) => {
    fetchJobs(filters);
  };

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <h1 style={{ marginBottom: '2rem' }}>Browse <span className="gradient-text">Jobs</span></h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '2rem' }}>
        <div className="filters-sidebar">
          <JobFilters onFilterChange={handleFilterChange} />
        </div>
        
        <div className="jobs-list">
          {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
          
          {loading ? (
            <div style={{ textAlign: 'center', padding: '3rem' }}>Loading jobs...</div>
          ) : jobs.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
              <h3>No jobs found</h3>
              <p style={{ color: 'var(--text-light)', marginTop: '0.5rem' }}>Try adjusting your filters.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {jobs.map((job) => (
                <div key={job._id} className="animate-fade-in">
                  <JobCard job={job} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
