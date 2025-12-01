import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from "./context/AuthContext";

import Home from './pages/home/Home';
import AdminDashboard from './pages/admin/Dashboard';
import HospitalDashboard from './pages/hospital/Dashboard';
import StudentDashboard from './pages/student/Dashboard';
import DoctorDashboard from './pages/doctor/Dashboard';

function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/hospital/dashboard" element={<HospitalDashboard />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

/*
function App() {
  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h1>🚀 Frontend fonctionne !</h1>
      <p>Si vous voyez ce message, React fonctionne.</p>
    </div>
  );
}

export default App;
import Home from './pages/home/Home';

function App() {
  return <Home />;
}

export default App;*/