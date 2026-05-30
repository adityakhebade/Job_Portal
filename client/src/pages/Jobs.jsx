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
      
      const mockJobs = [
        {
          _id: '1',
          title: 'Senior Frontend Developer',
          company: 'TechCorp Inc.',
          location: 'Remote',
          type: 'Full-time',
          category: 'Software Engineering',
          salary: { min: 120000, max: 150000, currency: 'USD' },
          createdAt: new Date().toISOString()
        },
        {
          _id: '2',
          title: 'Backend Node.js Engineer',
          company: 'StartupX',
          location: 'New York, NY',
          type: 'Full-time',
          category: 'Software Engineering',
          salary: { min: 100000, max: 130000, currency: 'USD' },
          createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
        },
        {
          _id: '3',
          title: 'Product Designer (UI/UX)',
          company: 'Creative Solutions',
          location: 'San Francisco, CA',
          type: 'Contract',
          category: 'Design',
          salary: { min: 80000, max: 110000, currency: 'USD' },
          createdAt: new Date(Date.now() - 86400000 * 4).toISOString()
        },
        {
          _id: '4',
          title: 'DevOps Specialist',
          company: 'CloudNet Infrastructure',
          location: 'Remote (Europe)',
          type: 'Full-time',
          category: 'Operations',
          salary: { min: 90000, max: 120000, currency: 'EUR' },
          createdAt: new Date(Date.now() - 86400000 * 5).toISOString()
        }
      ];

      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));

      setJobs(mockJobs);
      setError(null);
    } catch (err) {
      setError('Failed to load mock jobs.');
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
