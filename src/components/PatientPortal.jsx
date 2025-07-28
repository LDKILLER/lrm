import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Calendar, Clock, FileText, User, Phone, Mail, MapPin } from 'lucide-react';

const PatientPortal = ({ onLogout, onNavigate }) => {

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');

  const appointments = [
    {
      date: '2025-08-15',
      time: '09:00',
      doctor: 'Dr. Marie Koudessi',
      type: 'Consultation de suivi',
      status: 'Confirmé'
    },
    {
      date: '2025-07-20',
      time: '14:30',
      doctor: 'Dr. Paul Adjovi',
      type: 'Première consultation',
      status: 'Terminé'
    }
  ];

  const medicalReports = [
    {
      date: '2025-07-20',
      type: 'Compte-rendu de consultation',
      doctor: 'Dr. Paul Adjovi',
      summary: 'Suivi tuberculose pulmonaire - Évolution favorable'
    },
    {
      date: '2025-06-15',
      type: 'Résultats d\'examens',
      doctor: 'Dr. Marie Koudessi',
      summary: 'Radiographie thoracique - Amélioration des lésions'
    }
  ];

  return (
    <Layout title="Accueil" userType="patient" onLogout={onLogout} onNavigate={onNavigate}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Informations du patient */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="h-5 w-5 mr-2" />
              Mes Informations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-gray-500" />
              <span className="text-sm">Jean Dupont</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-gray-500" />
              <span className="text-sm">+229 97 12 34 56</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-gray-500" />
              <span className="text-sm">jean.dupont@email.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span className="text-sm">Cotonou, Bénin</span>
            </div>
            <Button variant="outline" className="w-full mt-4">
              Modifier mes informations
            </Button>
          </CardContent>
        </Card>

        {/* Prise de rendez-vous */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Prendre un Rendez-vous
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="doctor">Médecin</Label>
                <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir un médecin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="koudessi">Dr. Marie Koudessi - Pneumologue</SelectItem>
                    <SelectItem value="adjovi">Dr. Paul Adjovi - Phtisiologue</SelectItem>
                    <SelectItem value="dossou">Dr. Jean Dossou - Pneumologue</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="date">Date</Label>
                <Input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div>
                <Label htmlFor="time">Heure</Label>
                <Select value={selectedTime} onValueChange={setSelectedTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir l'heure" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="08:00">08:00</SelectItem>
                    <SelectItem value="09:00">09:00</SelectItem>
                    <SelectItem value="10:00">10:00</SelectItem>
                    <SelectItem value="14:00">14:00</SelectItem>
                    <SelectItem value="15:00">15:00</SelectItem>
                    <SelectItem value="16:00">16:00</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button className="w-full mt-4">
              Confirmer le rendez-vous
            </Button>
          </CardContent>
        </Card>

        {/* Mes rendez-vous */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Mes Rendez-vous
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {appointments.map((appointment, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <div className="text-lg font-semibold">{new Date(appointment.date).getDate()}</div>
                      <div className="text-sm text-gray-500">
                        {new Date(appointment.date).toLocaleDateString('fr-FR', { month: 'short' })}
                      </div>
                    </div>
                    <div>
                      <p className="font-medium">{appointment.type}</p>
                      <p className="text-sm text-gray-600">{appointment.doctor}</p>
                      <p className="text-sm text-gray-500">{appointment.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${appointment.status === 'Confirmé'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                      }`}>
                      {appointment.status}
                    </span>
                    {appointment.status === 'Confirmé' && (
                      <Button variant="outline" size="sm">
                        Modifier
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Mes comptes-rendus */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Mes Comptes-rendus et Résultats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {medicalReports.map((report, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-4">
                    <FileText className="h-8 w-8 text-blue-600" />
                    <div>
                      <p className="font-medium">{report.type}</p>
                      <p className="text-sm text-gray-600">{report.doctor}</p>
                      <p className="text-sm text-gray-500">{report.summary}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">
                      {new Date(report.date).toLocaleDateString('fr-FR')}
                    </span>
                    <Button variant="outline" size="sm">
                      Télécharger
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default PatientPortal;

