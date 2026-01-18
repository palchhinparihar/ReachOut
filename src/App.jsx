import { Routes, Route } from 'react-router-dom';
// components
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Navbar from './components/Navbar.jsx';
import About from './components/About.jsx';
import Logout from './components/Logout.jsx';
import LiquidEther from './components/ui/LiquidEther.jsx';
import Footer from './components/Footer.jsx';

// resources
import CoverLetterHelp from './components/resources/CoverLetterHelp.jsx';
import ResumeTips from './components/resources/ResumeTips.jsx';
import InterviewPrep from './components/resources/InterviewPrep.jsx';

// pages
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Dashboard from './pages/Dashboard.jsx'
import ApplicationForm from './pages/ApplicationForm.jsx';
import ApplicationList from './pages/ApplicationList.jsx';
import FollowUp from './pages/FollowUp.jsx';

function App() {
  return (
    <div className="relative min-h-screen">
      <div className="fixed top-0 left-0 w-full h-full -z-10">
        <LiquidEther
          enabledWaves={['top', 'middle', 'bottom']}
          // Array - specify line count per wave; Number - same count for all waves
          lineCount={[10, 15, 20]}
          // Array - specify line distance per wave; Number - same distance for all waves
          lineDistance={[8, 6, 4]}
          bendRadius={5.0}
          bendStrength={-0.5}
          interactive={true}
          parallax={true}
        />
      </div>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/logout" element={<Logout />} />

        <Route path="/resources/">
          <Route path="cover-letter-help" element={
            <ProtectedRoute>
              <Navbar />
              <CoverLetterHelp />
              <Footer />
            </ProtectedRoute>
          } />

          <Route path="resume-tips" element={
            <ProtectedRoute>
              <Navbar />
              <ResumeTips />
              <Footer />
            </ProtectedRoute>
          } />

          <Route path="interview-prep" element={
            <ProtectedRoute>
              <Navbar />
              <InterviewPrep />
              <Footer />
            </ProtectedRoute>
          } />
        </Route>

        <Route path="/about" element={
          <ProtectedRoute>
            <Navbar />
            <About />
            <Footer />
          </ProtectedRoute>
        } />

        <Route path="/" element={
          <ProtectedRoute>
            <Navbar />
            <Dashboard />
            <Footer />
          </ProtectedRoute>
        } />
        <Route path="/form" element={
          <ProtectedRoute>
            <Navbar />
            <ApplicationForm />
            <Footer />
          </ProtectedRoute>
        } />
        <Route path="/applications" element={
          <ProtectedRoute>
            <Navbar />
            <ApplicationList />
            <Footer />
          </ProtectedRoute>
        } />
        <Route path="/followup" element={
          <ProtectedRoute>
            <Navbar />
            <FollowUp />
            <Footer />
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
