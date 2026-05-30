import { Link } from 'react-router-dom';
import { MapPin, Briefcase, DollarSign, Clock } from 'lucide-react';

const JobCard = ({ job }) => {
  const { _id, title, company, location, type, salary, category, createdAt } = job;

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>
            <Link to={`/jobs/${_id}`} style={{ textDecoration: 'none', color: 'var(--text-light)' }}>
              {title}
            </Link>
          </h3>
          <p style={{ color: 'var(--primary)', fontWeight: '500' }}>{company}</p>
        </div>
        <span style={{ 
          background: 'rgba(139, 92, 246, 0.1)', 
          color: 'var(--primary)', 
          padding: '0.25rem 0.75rem', 
          borderRadius: '9999px',
          fontSize: '0.75rem',
          fontWeight: '600'
        }}>
          {category}
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '1.5rem', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#64748b' }}>
          <MapPin size={16} /> {location}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#64748b' }}>
          <Briefcase size={16} /> {type}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#64748b' }}>
          <DollarSign size={16} /> {salary.min.toLocaleString()} - {salary.max.toLocaleString()} {salary.currency}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#64748b' }}>
          <Clock size={16} /> {formatDate(createdAt)}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
        <Link to={`/jobs/${_id}`} className="btn btn-outline" style={{ width: '100%', textAlign: 'center' }}>
          View Details
        </Link>
      </div>
    </div>
  );
};

export default JobCard;
