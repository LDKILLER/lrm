import React, { useState } from 'react';
import LoginPage from './components/LoginPage';
import PatientPortal from './components/PatientPortal';
import PatientMedicalHistory from './components/PatientMedicalHistory';
import PatientTelemedicine from './components/PatientTelemedicine';
import PatientEducation from './components/PatientEducation';
import PatientSupport from './components/PatientSupport';
import AdminDashboard from './components/AdminDashboard';
import AdminPatientManagement from './components/AdminPatientManagement';
import AdminAppointments from './components/AdminAppointments';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('login');

  const handleLogin = (userType, email) => {
    setCurrentUser({ type: userType, email });
    if (userType === 'patient') {
      setCurrentPage('patient-portal');
    } else {
      setCurrentPage('admin-dashboard');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('login');
  };

  const handleNavigation = (page) => {
    console.log(page)
    setCurrentPage(page);
  };

  if (currentPage === 'login') {
    return <LoginPage onLogin={handleLogin} />;
  }

  // Pages Patient
  if (currentUser?.type === 'patient') {
    switch (currentPage) {
      case 'patient-portal':
        return <PatientPortal onLogout={handleLogout} onNavigate={handleNavigation} />;
      case 'patient-history':
        return <PatientMedicalHistory onLogout={handleLogout} onNavigate={handleNavigation} />;
      case 'patient-telemedicine':
        return <PatientTelemedicine onLogout={handleLogout} onNavigate={handleNavigation} />;
      case 'patient-education':
        return <PatientEducation onLogout={handleLogout} onNavigate={handleNavigation} />;
      case 'patient-support':
        return <PatientSupport onLogout={handleLogout} onNavigate={handleNavigation} />;
      default:
        return <PatientPortal onLogout={handleLogout} onNavigate={handleNavigation} />;
    }
  }

  // Pages Admin
  if (currentUser?.type === 'admin') {
    switch (currentPage) {
      case 'admin-dashboard':
        return <AdminDashboard onLogout={handleLogout} onNavigate={handleNavigation} />;
      case 'admin-patients':
        return <AdminPatientManagement onLogout={handleLogout} onNavigate={handleNavigation} />;
      case 'admin-appointments':
        return <AdminAppointments onLogout={handleLogout} onNavigate={handleNavigation} />;
      default:
        return <AdminDashboard onLogout={handleLogout} onNavigate={handleNavigation} />;
    }
  }

  return <LoginPage onLogin={handleLogin} />;
}

export default App;