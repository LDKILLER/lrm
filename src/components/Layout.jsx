import React from 'react';
import { Button } from '../components/ui/button';
import { Heart, User, Calendar, FileText, Video, BookOpen, MessageCircle, Users, Settings, LogOut } from 'lucide-react';

const Layout = ({ children, title, userType, onLogout, onNavigate }) => {
  const patientMenuItems = [
    { id: 'patient-portal', label: 'Accueil', icon: Heart },
    { id: 'patient-history', label: 'Mon Historique', icon: FileText },
    { id: 'patient-telemedicine', label: 'Télémédecine', icon: Video },
    { id: 'patient-education', label: 'Éducation', icon: BookOpen },
    { id: 'patient-support', label: 'Support', icon: MessageCircle },
  ];

  const adminMenuItems = [
    { id: 'admin-dashboard', label: 'Tableau de Bord', icon: Heart },
    { id: 'admin-patients', label: 'Patients', icon: Users },
    { id: 'admin-appointments', label: 'Rendez-vous', icon: Calendar },
    { id: 'admin-consultations', label: 'Consultations', icon: FileText },
    { id: 'admin-administration', label: 'Administration', icon: Settings },
  ];

  const menuItems = userType === 'patient' ? patientMenuItems : adminMenuItems;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center">
                <Heart className="h-8 w-8 text-blue-600 mr-3" />
                <div>
                  <h1 className="text-xl font-bold text-gray-900">CNHU-PP/C</h1>
                  <p className="text-sm text-gray-600">Centre National de Pneumo-phtisiologie</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                {userType === 'patient' ? 'Jean Dupont' : 'Dr. Marie Koudessi'}
              </span>
              <Button variant="outline" onClick={onLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <nav className="w-64 bg-white shadow-sm min-h-screen">
          <div className="p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => {
                        console.log("🧭 Navigation depuis Layout vers :", item.id);
                        if (onNavigate) {
                          onNavigate(item.id);
                        } else {
                          console.error("onNavigate n'est pas défini");
                        }
                      }}

                      className="w-full flex items-center px-3 py-2 text-left text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-colors"
                    >
                      <Icon className="h-5 w-5 mr-3" />
                      {item.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;

