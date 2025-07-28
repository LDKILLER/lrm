import React from 'react';
import Layout from './Layout';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Users, Calendar, FileText, Activity, TrendingUp, AlertCircle } from 'lucide-react';

const AdminDashboard = ({ onLogout, onNavigate }) => {
  // Données simulées pour les graphiques
  const monthlyConsultations = [
    { month: 'Jan', consultations: 245, tuberculose: 45, pneumonie: 78 },
    { month: 'Fév', consultations: 289, tuberculose: 52, pneumonie: 89 },
    { month: 'Mar', consultations: 312, tuberculose: 48, pneumonie: 95 },
    { month: 'Avr', consultations: 298, tuberculose: 41, pneumonie: 87 },
    { month: 'Mai', consultations: 334, tuberculose: 55, pneumonie: 102 },
    { month: 'Jun', consultations: 356, tuberculose: 49, pneumonie: 98 },
  ];

  const diseaseDistribution = [
    { name: 'Tuberculose', value: 35, color: '#ef4444' },
    { name: 'Pneumonie', value: 28, color: '#3b82f6' },
    { name: 'Asthme', value: 20, color: '#10b981' },
    { name: 'BPCO', value: 12, color: '#f59e0b' },
    { name: 'Autres', value: 5, color: '#6b7280' },
  ];

  const kpiData = [
    {
      title: 'Patients Actifs',
      value: '1,247',
      change: '+12%',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Consultations ce mois',
      value: '356',
      change: '+8%',
      icon: Calendar,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Taux de guérison TB',
      value: '87%',
      change: '+3%',
      icon: Activity,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Rendez-vous en attente',
      value: '23',
      change: '-5%',
      icon: AlertCircle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ];

  const recentPatients = [
    { name: 'Marie Agbodji', condition: 'Tuberculose pulmonaire', lastVisit: '2025-07-25', status: 'Suivi' },
    { name: 'Jean Koffi', condition: 'Pneumonie', lastVisit: '2025-07-24', status: 'Traitement' },
    { name: 'Fatou Diallo', condition: 'Asthme', lastVisit: '2025-07-23', status: 'Contrôle' },
    { name: 'Paul Mensah', condition: 'BPCO', lastVisit: '2025-07-22', status: 'Suivi' },
  ];

  return (
    <Layout title="Tableau de Bord Administratif" userType="admin" onLogout={onLogout} onNavigate={onNavigate}>
      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpiData.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
                    <p className={`text-sm ${kpi.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {kpi.change} vs mois dernier
                    </p>
                  </div>
                  <div className={`p-3 rounded-full ${kpi.bgColor}`}>
                    <Icon className={`h-6 w-6 ${kpi.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Graphique des consultations mensuelles */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Évolution des Consultations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyConsultations}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="consultations" fill="#3b82f6" name="Total" />
                <Bar dataKey="tuberculose" fill="#ef4444" name="Tuberculose" />
                <Bar dataKey="pneumonie" fill="#10b981" name="Pneumonie" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Répartition des maladies */}
        <Card>
          <CardHeader>
            <CardTitle>Répartition des Pathologies</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={diseaseDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {diseaseDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Patients récents et alertes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Patients récents */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Patients Récents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPatients.map((patient, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{patient.name}</p>
                    <p className="text-sm text-gray-600">{patient.condition}</p>
                    <p className="text-xs text-gray-500">Dernière visite: {patient.lastVisit}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${patient.status === 'Traitement'
                      ? 'bg-red-100 text-red-800'
                      : patient.status === 'Suivi'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                    {patient.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Alertes et notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              Alertes et Notifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-red-800">Stock faible</p>
                  <p className="text-xs text-red-600">Rifampicine: 15 unités restantes</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-yellow-800">Rendez-vous en retard</p>
                  <p className="text-xs text-yellow-600">3 patients n'ont pas honoré leur RDV</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <FileText className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-800">Rapport mensuel</p>
                  <p className="text-xs text-blue-600">Rapport de juin disponible pour téléchargement</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AdminDashboard;

