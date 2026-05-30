import { useState } from 'react';

const JobFilters = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    search: '',
    type: '',
    category: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const cleared = { search: '', type: '', category: '' };
    setFilters(cleared);
    onFilterChange(cleared);
  };

  return (
    <div className="card" style={{ position: 'sticky', top: '5rem' }}>
      <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.5rem' }}>Filters</h3>
      
      <div className="form-group">
        <label className="form-label" htmlFor="search">Search</label>
        <input 
          type="text" 
          className="form-control" 
          id="search" 
          name="search"
          placeholder="Keywords..."
          value={filters.search}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="type">Job Type</label>
        <select 
          className="form-control" 
          id="type" 
          name="type"
          value={filters.type}
          onChange={handleChange}
        >
          <option value="">All Types</option>
          <option value="full-time">Full-time</option>
          <option value="part-time">Part-time</option>
          <option value="remote">Remote</option>
          <option value="contract">Contract</option>
          <option value="internship">Internship</option>
        </select>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="category">Category</label>
        <select 
          className="form-control" 
          id="category" 
          name="category"
          value={filters.category}
          onChange={handleChange}
        >
          <option value="">All Categories</option>
          <option value="Engineering">Engineering</option>
          <option value="Design">Design</option>
          <option value="Marketing">Marketing</option>
          <option value="Sales">Sales</option>
          <option value="Product">Product</option>
          <option value="Customer Support">Customer Support</option>
        </select>
      </div>

      <button 
        className="btn btn-outline" 
        style={{ width: '100%', marginTop: '1rem' }}
        onClick={clearFilters}
      >
        Clear Filters
      </button>
    </div>
  );
};

export default JobFilters;
