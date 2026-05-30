import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo" style={{ textDecoration: 'none' }}>
          <h2 className="gradient-text">MERN Job Portal</h2>
        </Link>
        <div className="nav-links">
          <Link to="/jobs" className="nav-link">Jobs</Link>
          
          {user ? (
            <>
              <Link to={`/${user.role}/dashboard`} className="nav-link">Dashboard</Link>
              <button onClick={handleLogout} className="btn btn-outline">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="btn btn-primary">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
