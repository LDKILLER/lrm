import React, { useState } from 'react';
import Layout from './Layout';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import {
  Calendar, Clock, Plus, Search, Filter, CheckCircle,
  XCircle, AlertCircle, User, Phone, Edit, Trash2,
  ChevronLeft, ChevronRight, Video, MapPin
} from 'lucide-react';

const AdminAppointments = ({ onLogout, onNavigate }) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedView, setSelectedView] = useState('day');
  const [searchTerm, setSearchTerm] = useState('');

  const appointments = [
    {
      id: 'RDV001',
      patientName: 'Marie Agbodji',
      patientId: 'P001',
      doctorName: 'Dr. Marie Koudessi',
      date: '2025-07-26',
      time: '09:00',
      duration: 30,
      type: 'Consultation de suivi',
      status: 'Confirmé',
      location: 'Cabinet 1',
      phone: '+229 97 12 34 56',
      notes: 'Contrôle traitement TB - 3ème mois',
      isTelemedicine: false
    },
    {
      id: 'RDV002',
      patientName: 'Jean Koffi',
      patientId: 'P002',
      doctorName: 'Dr. Paul Adjovi',
      date: '2025-07-26',
      time: '10:30',
      duration: 45,
      type: 'Première consultation',
      status: 'En attente',
      location: 'Cabinet 2',
      phone: '+229 96 78 90 12',
      notes: 'Suspicion pneumonie',
      isTelemedicine: false
    },
    {
      id: 'RDV003',
      patientName: 'Fatou Diallo',
      patientId: 'P003',
      doctorName: 'Dr. Marie Koudessi',
      date: '2025-07-26',
      time: '14:00',
      duration: 30,
      type: 'Téléconsultation',
      status: 'Confirmé',
      location: 'En ligne',
      phone: '+229 95 45 67 89',
      notes: 'Suivi asthme chronique',
      isTelemedicine: true
    },
    {
      id: 'RDV004',
      patientName: 'Paul Mensah',
      patientId: 'P004',
      doctorName: 'Dr. Jean Dossou',
      date: '2025-07-26',
      time: '15:30',
      duration: 60,
      type: 'Consultation spécialisée',
      status: 'Reporté',
      location: 'Cabinet 3',
      phone: '+229 94 32 10 98',
      notes: 'Évaluation BPCO - Spirométrie',
      isTelemedicine: false
    },
    {
      id: 'RDV005',
      patientName: 'Aïcha Touré',
      patientId: 'P005',
      doctorName: 'Dr. Paul Adjovi',
      date: '2025-07-27',
      time: '08:30',
      duration: 30,
      type: 'Consultation de contrôle',
      status: 'Confirmé',
      location: 'Cabinet 2',
      phone: '+229 93 21 54 87',
      notes: 'Résultats examens radiologiques',
      isTelemedicine: false
    }
  ];

  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
  ];

  const doctors = [
    'Dr. Marie Koudessi',
    'Dr. Paul Adjovi',
    'Dr. Jean Dossou'
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmé': return 'bg-green-100 text-green-800';
      case 'En attente': return 'bg-yellow-100 text-yellow-800';
      case 'Reporté': return 'bg-orange-100 text-orange-800';
      case 'Annulé': return 'bg-red-100 text-red-800';
      case 'Terminé': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Confirmé': return <CheckCircle className="h-4 w-4" />;
      case 'En attente': return <Clock className="h-4 w-4" />;
      case 'Reporté': return <AlertCircle className="h-4 w-4" />;
      case 'Annulé': return <XCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.patientId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = selectedView === 'day' ? appointment.date === selectedDate : true;
    return matchesSearch && matchesDate;
  });

  const getAppointmentsForDate = (date) => {
    return appointments.filter(apt => apt.date === date);
  };

  const updateAppointmentStatus = (appointmentId, newStatus) => {
    // Logique de mise à jour du statut
    console.log(`Mise à jour RDV ${appointmentId} vers ${newStatus}`);
  };

  return (
    <Layout title="Gestion des Rendez-vous" userType="admin" onLogout={onLogout} onNavigate={onNavigate}>
      <div className="space-y-6">
        {/* Barre d'actions */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Rechercher un rendez-vous..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-40"
            />
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filtrer
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Nouveau RDV
            </Button>
          </div>
        </div>

        <Tabs defaultValue="list" className="w-full">
          <TabsList>
            <TabsTrigger value="list">Liste des RDV</TabsTrigger>
            <TabsTrigger value="calendar">Planning</TabsTrigger>
            <TabsTrigger value="statistics">Statistiques</TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="space-y-4">
            {/* Statistiques rapides */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Aujourd'hui</p>
                      <p className="text-2xl font-bold">
                        {getAppointmentsForDate(new Date().toISOString().split('T')[0]).length}
                      </p>
                    </div>
                    <Calendar className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Confirmés</p>
                      <p className="text-2xl font-bold text-green-600">
                        {appointments.filter(a => a.status === 'Confirmé').length}
                      </p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">En attente</p>
                      <p className="text-2xl font-bold text-yellow-600">
                        {appointments.filter(a => a.status === 'En attente').length}
                      </p>
                    </div>
                    <Clock className="h-8 w-8 text-yellow-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Téléconsultations</p>
                      <p className="text-2xl font-bold text-purple-600">
                        {appointments.filter(a => a.isTelemedicine).length}
                      </p>
                    </div>
                    <Video className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Liste des rendez-vous */}
            <div className="space-y-4">
              {filteredAppointments.map((appointment) => (
                <Card key={appointment.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="bg-blue-100 p-3 rounded-full">
                          {appointment.isTelemedicine ? (
                            <Video className="h-6 w-6 text-blue-600" />
                          ) : (
                            <User className="h-6 w-6 text-blue-600" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold">{appointment.patientName}</h3>
                            <Badge variant="outline">{appointment.patientId}</Badge>
                            <Badge className={getStatusColor(appointment.status)}>
                              {getStatusIcon(appointment.status)}
                              <span className="ml-1">{appointment.status}</span>
                            </Badge>
                          </div>
                          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-600">
                            <div>
                              <p className="flex items-center mb-1">
                                <Calendar className="h-4 w-4 mr-2" />
                                {new Date(appointment.date).toLocaleDateString('fr-FR')}
                              </p>
                              <p className="flex items-center">
                                <Clock className="h-4 w-4 mr-2" />
                                {appointment.time} ({appointment.duration} min)
                              </p>
                            </div>
                            <div>
                              <p><strong>Médecin:</strong> {appointment.doctorName}</p>
                              <p className="flex items-center mt-1">
                                <MapPin className="h-4 w-4 mr-2" />
                                {appointment.location}
                              </p>
                            </div>
                            <div>
                              <p><strong>Type:</strong> {appointment.type}</p>
                              <p className="flex items-center mt-1">
                                <Phone className="h-4 w-4 mr-2" />
                                {appointment.phone}
                              </p>
                            </div>
                          </div>
                          {appointment.notes && (
                            <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                              <p className="text-sm text-gray-700">
                                <strong>Notes:</strong> {appointment.notes}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col space-y-2">
                        {appointment.status === 'En attente' && (
                          <>
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => updateAppointmentStatus(appointment.id, 'Confirmé')}
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Confirmer
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateAppointmentStatus(appointment.id, 'Reporté')}
                            >
                              <AlertCircle className="h-4 w-4 mr-2" />
                              Reporter
                            </Button>
                          </>
                        )}
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-2" />
                          Modifier
                        </Button>
                        {appointment.status !== 'Terminé' && (
                          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                            <XCircle className="h-4 w-4 mr-2" />
                            Annuler
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="calendar" className="space-y-6">
            {/* Vue planning */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    Planning du {new Date(selectedDate).toLocaleDateString('fr-FR')}
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      Aujourd'hui
                    </Button>
                    <Button variant="outline" size="sm">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {doctors.map((doctor) => (
                    <div key={doctor} className="space-y-4">
                      <h3 className="font-semibold text-lg text-center p-3 bg-blue-50 rounded-lg">
                        {doctor}
                      </h3>
                      <div className="space-y-2">
                        {timeSlots.map((time) => {
                          const appointment = getAppointmentsForDate(selectedDate).find(
                            apt => apt.time === time && apt.doctorName === doctor
                          );
                          return (
                            <div key={time} className="flex items-center space-x-2">
                              <span className="text-sm font-medium w-16">{time}</span>
                              {appointment ? (
                                <div className={`flex-1 p-2 rounded border-l-4 ${appointment.status === 'Confirmé' ? 'border-green-500 bg-green-50' :
                                    appointment.status === 'En attente' ? 'border-yellow-500 bg-yellow-50' :
                                      'border-gray-500 bg-gray-50'
                                  }`}>
                                  <p className="text-sm font-medium">{appointment.patientName}</p>
                                  <p className="text-xs text-gray-600">{appointment.type}</p>
                                </div>
                              ) : (
                                <div className="flex-1 p-2 border-2 border-dashed border-gray-200 rounded text-center">
                                  <Button variant="ghost" size="sm" className="text-gray-400">
                                    <Plus className="h-4 w-4 mr-1" />
                                    Libre
                                  </Button>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="statistics" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Répartition par Statut</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {['Confirmé', 'En attente', 'Reporté', 'Annulé'].map((status) => {
                      const count = appointments.filter(a => a.status === status).length;
                      const percentage = Math.round((count / appointments.length) * 100);
                      return (
                        <div key={status} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Badge className={getStatusColor(status)} variant="secondary">
                              {status}
                            </Badge>
                            <span className="text-sm">{count} RDV</span>
                          </div>
                          <span className="text-sm font-medium">{percentage}%</span>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Répartition par Médecin</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {doctors.map((doctor) => {
                      const count = appointments.filter(a => a.doctorName === doctor).length;
                      return (
                        <div key={doctor} className="flex items-center justify-between">
                          <span className="text-sm">{doctor}</span>
                          <Badge variant="outline">{count} RDV</Badge>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdminAppointments;

