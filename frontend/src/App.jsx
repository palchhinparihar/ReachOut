import { Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Logout from './pages/Logout.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

function Dashboard() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">ReachOut Dashboard</h1>
      <Link to="/logout" className="text-blue-600">Logout</Link>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path="*" element={<Login />} />
    </Routes>
  );
}

export default App;
