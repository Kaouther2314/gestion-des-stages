import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from "./context/AuthContext";

// Import des composants de pages
import Home from './pages/home/Home';

import AdminDashboard from './pages/admin/Dashboard';
import HospitalDashboard from './pages/hospital/Dashboard';
import HospitalProfile from './pages/hospital/Profile';
import HospitalRequests from './pages/hospital/HospitalRequests'; // Ajoutez cette importation
import StudentDashboard from './pages/student/Dashboard';
import StudentProfile from './pages/student/Profile';
import DoctorDashboard from './pages/doctor/Dashboard';

// Import du ProtectedRoute
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <Routes>
          {/* Routes publiques */}
          <Route path="/" element={<Home />} />
         
          {/* Routes protégées - Admin */}
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* Routes protégées - Hospital */}
          <Route 
            path="/hospital/dashboard" 
            element={
              <ProtectedRoute role="hospital">
                <HospitalDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/hospital/profile" 
            element={
              <ProtectedRoute role="hospital">
                <HospitalProfile />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/hospital/requests" 
            element={
              <ProtectedRoute role="hospital">
                <HospitalRequests />
              </ProtectedRoute>
            } 
          />
          
          {/* Routes protégées - Student */}
          <Route 
            path="/student/dashboard" 
            element={
              <ProtectedRoute role="student">
                <StudentDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/student/profile" 
            element={
              <ProtectedRoute role="student">
                <StudentProfile />
              </ProtectedRoute>
            } 
          />
          
          {/* Routes protégées - Doctor */}
          <Route 
            path="/doctor/dashboard" 
            element={
              <ProtectedRoute role="doctor">
                <DoctorDashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* Route 404 */}
          <Route path="*" element={<div>Page non trouvée</div>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;