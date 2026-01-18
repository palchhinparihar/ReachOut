import { Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Logout from './components/Logout.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Navbar from './components/Navbar.jsx';
import Particles from './components/ui/Particles.jsx';
import Dashboard from './pages/Dashboard.jsx'
import ApplicationForm from './pages/ApplicationForm.jsx';
import ApplicationList from './pages/ApplicationList.jsx';
import FollowUp from './pages/FollowUp.jsx';

function App() {
  return (
    <div className="relative min-h-screen">
      <div className="fixed top-0 left-0 w-full h-full -z-10">
        <Particles
          particleColors={['#ffffff', '#ffffff']}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>
      
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/" element={
          <ProtectedRoute>
            <Navbar />
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/form" element={
          <ProtectedRoute>
            <Navbar />
            <ApplicationForm />
          </ProtectedRoute>
        } />
        <Route path="/applications" element={
          <ProtectedRoute>
            <Navbar />
            <ApplicationList />
          </ProtectedRoute>
        } />
        <Route path="/followup" element={
          <ProtectedRoute>
            <Navbar />
            <FollowUp />
          </ProtectedRoute>
        } />
        <Route path="*" element={
          <ProtectedRoute>
            <Login />
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  );
}

export default App;
