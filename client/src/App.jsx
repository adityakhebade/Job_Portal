import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ProtectedRoute from './components/layout/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Jobs from './pages/Jobs';
import JobDetail from './pages/JobDetail';
import SeekerDashboard from './pages/seeker/SeekerDashboard';
import MyApplications from './pages/seeker/MyApplications';
import EmployerDashboard from './pages/employer/EmployerDashboard';
import PostJob from './pages/employer/PostJob';
import ManageJobs from './pages/employer/ManageJobs';
import Applicants from './pages/employer/Applicants';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageUsers from './pages/admin/ManageUsers';
import AdminManageJobs from './pages/admin/ManageJobs';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/jobs/:id" element={<JobDetail />} />
              
              {/* Seeker Routes */}
              <Route path="/seeker/dashboard" element={
                <ProtectedRoute allowedRoles={['seeker']}>
                  <SeekerDashboard />
                </ProtectedRoute>
              } />
              <Route path="/seeker/applications" element={
                <ProtectedRoute allowedRoles={['seeker']}>
                  <MyApplications />
                </ProtectedRoute>
              } />
              
              {/* Employer Routes */}
              <Route path="/employer/dashboard" element={
                <ProtectedRoute allowedRoles={['employer']}>
                  <EmployerDashboard />
                </ProtectedRoute>
              } />
              <Route path="/employer/post-job" element={
                <ProtectedRoute allowedRoles={['employer']}>
                  <PostJob />
                </ProtectedRoute>
              } />
              <Route path="/employer/manage-jobs" element={
                <ProtectedRoute allowedRoles={['employer']}>
                  <ManageJobs />
                </ProtectedRoute>
              } />
              <Route path="/employer/jobs/:jobId/applicants" element={
                <ProtectedRoute allowedRoles={['employer']}>
                  <Applicants />
                </ProtectedRoute>
              } />
              
              {/* Admin Routes */}
              <Route path="/admin/dashboard" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="/admin/users" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <ManageUsers />
                </ProtectedRoute>
              } />
              <Route path="/admin/jobs" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminManageJobs />
                </ProtectedRoute>
              } />
              
              {/* Other routes will be added later */}
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
