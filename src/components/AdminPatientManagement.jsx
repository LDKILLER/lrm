import React, { useState } from 'react';
import Layout from './Layout';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import {
  Search, Plus, Filter, Download, Eye, Edit, UserPlus,
  Calendar, FileText, Activity, AlertTriangle, CheckCircle,
  Phone, Mail, MapPin, User
} from 'lucide-react';

const AdminPatientManagement = ({ onLogout, onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedPatient, setSelectedPatient] = useState(null);

  const patients = [
    {
      id: 'P001',
      name: 'Marie Agbodji',
      age: 34,
      gender: 'F',
      phone: '+229 97 12 34 56',
      email: 'marie.agbodji@email.com',
      address: 'Cotonou, Littoral',
      diagnosis: 'Tuberculose pulmonaire',
      status: 'En traitement',
      treatmentStart: '2025-06-15',
      lastVisit: '2025-07-25',
      nextAppointment: '2025-08-15',
      riskLevel: 'Moyen',
      adherence: 95
    },
    {
      id: 'P002',
      name: 'Jean Koffi',
      age: 45,
      gender: 'M',
      phone: '+229 96 78 90 12',
      email: 'jean.koffi@email.com',
      address: 'Porto-Novo, Ouémé',
      diagnosis: 'Pneumonie',
      status: 'Guéri',
      treatmentStart: '2025-05-10',
      lastVisit: '2025-07-20',
      nextAppointment: null,
      riskLevel: 'Faible',
      adherence: 100
    },
    {
      id: 'P003',
      name: 'Fatou Diallo',
      age: 28,
      gender: 'F',
      phone: '+229 95 45 67 89',
      email: 'fatou.diallo@email.com',
      address: 'Parakou, Borgou',
      diagnosis: 'Asthme chronique',
      status: 'Suivi',
      treatmentStart: '2025-01-20',
      lastVisit: '2025-07-18',
      nextAppointment: '2025-08-18',
      riskLevel: 'Élevé',
      adherence: 78
    },
    {
      id: 'P004',
      name: 'Paul Mensah',
      age: 52,
      gender: 'M',
      phone: '+229 94 32 10 98',
      email: 'paul.mensah@email.com',
      address: 'Abomey-Calavi, Atlantique',
      diagnosis: 'BPCO',
      status: 'En traitement',
      treatmentStart: '2025-04-08',
      lastVisit: '2025-07-22',
      nextAppointment: '2025-08-05',
      riskLevel: 'Élevé',
      adherence: 85
    }
  ];

  const recentActivities = [
    {
      id: 1,
      patientId: 'P001',
      patientName: 'Marie Agbodji',
      action: 'Consultation de suivi',
      date: '2025-07-25',
      time: '14:30',
      doctor: 'Dr. Marie Koudessi'
    },
    {
      id: 2,
      patientId: 'P004',
      patientName: 'Paul Mensah',
      action: 'Résultats d\'examens ajoutés',
      date: '2025-07-24',
      time: '11:15',
      doctor: 'Dr. Paul Adjovi'
    },
    {
      id: 3,
      patientId: 'P003',
      patientName: 'Fatou Diallo',
      action: 'Rendez-vous programmé',
      date: '2025-07-23',
      time: '16:45',
      doctor: 'Secrétariat'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'En traitement': return 'bg-blue-100 text-blue-800';
      case 'Guéri': return 'bg-green-100 text-green-800';
      case 'Suivi': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'Faible': return 'bg-green-100 text-green-800';
      case 'Moyen': return 'bg-yellow-100 text-yellow-800';
      case 'Élevé': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAdherenceColor = (adherence) => {
    if (adherence >= 95) return 'text-green-600';
    if (adherence >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || patient.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const openPatientDetails = (patient) => {
    setSelectedPatient(patient);
  };

  return (
    <Layout title="Gestion des Patients" userType="admin" onLogout={onLogout} onNavigate={onNavigate}>
      <div className="space-y-6">
        {/* Barre d'actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Rechercher un patient..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              <option value="all">Tous les statuts</option>
              <option value="En traitement">En traitement</option>
              <option value="Suivi">Suivi</option>
              <option value="Guéri">Guéri</option>
            </select>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Exporter
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <UserPlus className="h-4 w-4 mr-2" />
              Nouveau Patient
            </Button>
          </div>
        </div>

        <Tabs defaultValue="list" className="w-full">
          <TabsList>
            <TabsTrigger value="list">Liste des Patients</TabsTrigger>
            <TabsTrigger value="activities">Activités Récentes</TabsTrigger>
            <TabsTrigger value="statistics">Statistiques</TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="space-y-4">
            {/* Liste des patients */}
            <div className="grid gap-4">
              {filteredPatients.map((patient) => (
                <Card key={patient.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="bg-blue-100 p-3 rounded-full">
                          <User className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold">{patient.name}</h3>
                            <Badge variant="outline">{patient.id}</Badge>
                            <Badge className={getStatusColor(patient.status)}>
                              {patient.status}
                            </Badge>
                          </div>
                          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                            <div>
                              <p><strong>Âge:</strong> {patient.age} ans ({patient.gender})</p>
                              <p className="flex items-center mt-1">
                                <Phone className="h-3 w-3 mr-1" />
                                {patient.phone}
                              </p>
                            </div>
                            <div>
                              <p><strong>Diagnostic:</strong> {patient.diagnosis}</p>
                              <p className="flex items-center mt-1">
                                <MapPin className="h-3 w-3 mr-1" />
                                {patient.address}
                              </p>
                            </div>
                            <div>
                              <p><strong>Début traitement:</strong></p>
                              <p>{new Date(patient.treatmentStart).toLocaleDateString('fr-FR')}</p>
                              <p className="mt-1"><strong>Dernière visite:</strong></p>
                              <p>{new Date(patient.lastVisit).toLocaleDateString('fr-FR')}</p>
                            </div>
                            <div>
                              <div className="flex items-center space-x-2 mb-2">
                                <span className="text-xs font-medium">Observance:</span>
                                <span className={`font-semibold ${getAdherenceColor(patient.adherence)}`}>
                                  {patient.adherence}%
                                </span>
                              </div>
                              <Badge className={getRiskColor(patient.riskLevel)} variant="secondary">
                                Risque {patient.riskLevel}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => openPatientDetails(patient)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Calendar className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    {patient.nextAppointment && (
                      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-800">
                          <strong>Prochain RDV:</strong> {new Date(patient.nextAppointment).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="activities" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="h-5 w-5 mr-2" />
                  Activités Récentes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <div className="bg-green-100 p-2 rounded-full">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{activity.action}</h4>
                        <p className="text-sm text-gray-600">
                          Patient: {activity.patientName} ({activity.patientId})
                        </p>
                        <p className="text-sm text-gray-500">
                          {activity.doctor} • {new Date(activity.date).toLocaleDateString('fr-FR')} à {activity.time}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="statistics" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Patients</p>
                      <p className="text-2xl font-bold">{patients.length}</p>
                    </div>
                    <User className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">En Traitement</p>
                      <p className="text-2xl font-bold text-blue-600">
                        {patients.filter(p => p.status === 'En traitement').length}
                      </p>
                    </div>
                    <Activity className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Guéris</p>
                      <p className="text-2xl font-bold text-green-600">
                        {patients.filter(p => p.status === 'Guéri').length}
                      </p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Risque Élevé</p>
                      <p className="text-2xl font-bold text-red-600">
                        {patients.filter(p => p.riskLevel === 'Élevé').length}
                      </p>
                    </div>
                    <AlertTriangle className="h-8 w-8 text-red-600" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Modal de détails patient (simplifié) */}
        {selectedPatient && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Détails du Patient - {selectedPatient.name}</CardTitle>
                  <Button variant="outline" onClick={() => setSelectedPatient(null)}>
                    ✕
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">Informations Personnelles</h4>
                      <p><strong>ID:</strong> {selectedPatient.id}</p>
                      <p><strong>Âge:</strong> {selectedPatient.age} ans</p>
                      <p><strong>Sexe:</strong> {selectedPatient.gender}</p>
                      <p><strong>Téléphone:</strong> {selectedPatient.phone}</p>
                      <p><strong>Email:</strong> {selectedPatient.email}</p>
                      <p><strong>Adresse:</strong> {selectedPatient.address}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Informations Médicales</h4>
                      <p><strong>Diagnostic:</strong> {selectedPatient.diagnosis}</p>
                      <p><strong>Statut:</strong> {selectedPatient.status}</p>
                      <p><strong>Niveau de risque:</strong> {selectedPatient.riskLevel}</p>
                      <p><strong>Observance:</strong> {selectedPatient.adherence}%</p>
                      <p><strong>Début traitement:</strong> {new Date(selectedPatient.treatmentStart).toLocaleDateString('fr-FR')}</p>
                      <p><strong>Dernière visite:</strong> {new Date(selectedPatient.lastVisit).toLocaleDateString('fr-FR')}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2 pt-4">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Edit className="h-4 w-4 mr-2" />
                      Modifier
                    </Button>
                    <Button variant="outline">
                      <FileText className="h-4 w-4 mr-2" />
                      Dossier Médical
                    </Button>
                    <Button variant="outline">
                      <Calendar className="h-4 w-4 mr-2" />
                      Programmer RDV
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AdminPatientManagement;

