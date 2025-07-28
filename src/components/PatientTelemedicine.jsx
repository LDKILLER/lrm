import React, { useState } from 'react';
import Layout from './Layout';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';
import { Video, MessageCircle, Phone, Send, Camera, Mic, MicOff, VideoOff, Clock, CheckCircle2 } from 'lucide-react';

const PatientTelemedicine = ({ onLogout, onNavigate }) => {
  const [message, setMessage] = useState('');
  const [isVideoCall, setIsVideoCall] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  const upcomingConsultations = [
    {
      id: 1,
      doctor: 'Dr. Marie Koudessi',
      date: '2025-08-02',
      time: '14:00',
      type: 'Consultation de suivi TB',
      status: 'Confirmé'
    },
    {
      id: 2,
      doctor: 'Dr. Paul Adjovi',
      date: '2025-08-10',
      time: '10:30',
      type: 'Contrôle radiologique',
      status: 'En attente'
    }
  ];

  const messages = [
    {
      id: 1,
      sender: 'Dr. Marie Koudessi',
      message: 'Bonjour Jean, comment vous sentez-vous aujourd\'hui ? Avez-vous pris vos médicaments ce matin ?',
      time: '10:30',
      isDoctor: true
    },
    {
      id: 2,
      sender: 'Vous',
      message: 'Bonjour Docteur, je me sens mieux. Oui j\'ai pris tous mes médicaments comme prescrit.',
      time: '10:35',
      isDoctor: false
    },
    {
      id: 3,
      sender: 'Dr. Marie Koudessi',
      message: 'Parfait ! Continuez ainsi. N\'hésitez pas si vous avez des questions.',
      time: '10:37',
      isDoctor: true
    }
  ];

  const healthData = [
    { date: '2025-07-26', temperature: '36.8°C', weight: '72kg', symptoms: 'Aucun' },
    { date: '2025-07-25', temperature: '37.1°C', weight: '71.8kg', symptoms: 'Légère fatigue' },
    { date: '2025-07-24', temperature: '36.9°C', weight: '71.5kg', symptoms: 'Aucun' }
  ];

  const startVideoCall = () => {
    setIsVideoCall(true);
  };

  const endVideoCall = () => {
    setIsVideoCall(false);
    setIsMuted(false);
    setIsVideoOff(false);
  };

  const sendMessage = () => {
    if (message.trim()) {
      // Logique d'envoi de message
      setMessage('');
    }
  };

  return (
    <Layout title="Télémédecine" userType="patient" onLogout={onLogout} onNavigate={onNavigate}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Consultations vidéo à venir */}
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Video className="h-5 w-5 mr-2" />
                Consultations Vidéo à Venir
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingConsultations.map((consultation) => (
                  <div key={consultation.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="bg-blue-100 p-3 rounded-full">
                        <Video className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{consultation.type}</h3>
                        <p className="text-sm text-gray-600">{consultation.doctor}</p>
                        <p className="text-sm text-gray-500 flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {new Date(consultation.date).toLocaleDateString('fr-FR')} à {consultation.time}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={consultation.status === 'Confirmé' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                        {consultation.status}
                      </Badge>
                      <Button onClick={startVideoCall} className="bg-blue-600 hover:bg-blue-700">
                        <Video className="h-4 w-4 mr-2" />
                        Rejoindre
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Interface de vidéoconférence */}
          {isVideoCall && (
            <Card className="mb-6 bg-gray-900 text-white">
              <CardContent className="p-6">
                <div className="aspect-video bg-gray-800 rounded-lg mb-4 flex items-center justify-center">
                  <div className="text-center">
                    <Video className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-300">Consultation vidéo avec Dr. Marie Koudessi</p>
                    <p className="text-sm text-gray-400">En cours - 05:23</p>
                  </div>
                </div>
                <div className="flex justify-center space-x-4">
                  <Button
                    variant={isMuted ? "destructive" : "secondary"}
                    size="lg"
                    onClick={() => setIsMuted(!isMuted)}
                    className="rounded-full"
                  >
                    {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                  </Button>
                  <Button
                    variant={isVideoOff ? "destructive" : "secondary"}
                    size="lg"
                    onClick={() => setIsVideoOff(!isVideoOff)}
                    className="rounded-full"
                  >
                    {isVideoOff ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
                  </Button>
                  <Button
                    variant="destructive"
                    size="lg"
                    onClick={endVideoCall}
                    className="rounded-full"
                  >
                    <Phone className="h-5 w-5 rotate-135" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Messagerie sécurisée */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageCircle className="h-5 w-5 mr-2" />
                Messagerie Sécurisée
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 overflow-y-auto mb-4 space-y-3">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.isDoctor ? 'justify-start' : 'justify-end'}`}>
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${msg.isDoctor
                        ? 'bg-gray-100 text-gray-900'
                        : 'bg-blue-600 text-white'
                      }`}>
                      <p className="text-sm">{msg.message}</p>
                      <p className={`text-xs mt-1 ${msg.isDoctor ? 'text-gray-500' : 'text-blue-100'}`}>
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex space-x-2">
                <Input
                  placeholder="Tapez votre message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  className="flex-1"
                />
                <Button onClick={sendMessage} className="bg-blue-600 hover:bg-blue-700">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Suivi des données de santé */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Suivi Quotidien</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Température (°C)</label>
                  <Input type="number" step="0.1" placeholder="36.5" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Poids (kg)</label>
                  <Input type="number" step="0.1" placeholder="70.0" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Symptômes</label>
                  <Textarea placeholder="Décrivez vos symptômes..." rows={3} />
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Enregistrer
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Historique Récent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {healthData.map((data, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium">{new Date(data.date).toLocaleDateString('fr-FR')}</p>
                    <div className="text-xs text-gray-600 mt-1 space-y-1">
                      <p>Température: {data.temperature}</p>
                      <p>Poids: {data.weight}</p>
                      <p>Symptômes: {data.symptoms}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Rappel Important</h3>
              <p className="text-sm text-blue-800 mb-3">
                N'oubliez pas de prendre vos médicaments quotidiennement et de remplir votre suivi.
              </p>
              <Button variant="outline" size="sm" className="w-full border-blue-300 text-blue-700 hover:bg-blue-100">
                Voir mon traitement
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default PatientTelemedicine;

