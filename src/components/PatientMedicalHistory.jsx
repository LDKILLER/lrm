import React, { useState } from 'react';
import Layout from './Layout';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { FileText, Download, Eye, Calendar, Activity, AlertTriangle, CheckCircle } from 'lucide-react';

const PatientMedicalHistory = ({ onLogout, onNavigate }) => {
  const [selectedDocument, setSelectedDocument] = useState(null);

  const consultations = [
    {
      id: 1,
      date: '2025-07-20',
      doctor: 'Dr. Paul Adjovi',
      type: 'Première consultation',
      diagnosis: 'Tuberculose pulmonaire',
      status: 'Terminé',
      symptoms: ['Toux persistante', 'Fièvre', 'Perte de poids'],
      treatment: 'Traitement antituberculeux - Phase intensive',
      notes: 'Patient présentant des symptômes classiques de TB pulmonaire. Radiographie thoracique montrant des infiltrats apicaux bilatéraux.'
    },
    {
      id: 2,
      date: '2025-06-15',
      doctor: 'Dr. Marie Koudessi',
      type: 'Consultation de suivi',
      diagnosis: 'Suivi tuberculose',
      status: 'Terminé',
      symptoms: ['Amélioration générale', 'Toux diminuée'],
      treatment: 'Poursuite du traitement - Phase de continuation',
      notes: 'Évolution favorable. Patient bien tolérant au traitement. Amélioration radiologique notable.'
    }
  ];

  const examResults = [
    {
      id: 1,
      date: '2025-07-20',
      type: 'Radiographie thoracique',
      result: 'Infiltrats apicaux bilatéraux',
      status: 'Anormal',
      doctor: 'Dr. Paul Adjovi'
    },
    {
      id: 2,
      date: '2025-07-18',
      type: 'Examen microscopique des crachats',
      result: 'BAAR positif',
      status: 'Positif',
      doctor: 'Laboratoire CNHU-PP/C'
    },
    {
      id: 3,
      date: '2025-06-15',
      type: 'Radiographie thoracique de contrôle',
      result: 'Amélioration des lésions',
      status: 'Amélioration',
      doctor: 'Dr. Marie Koudessi'
    }
  ];

  const treatments = [
    {
      id: 1,
      medication: 'Rifampicine',
      dosage: '600mg',
      frequency: '1 fois/jour',
      duration: '6 mois',
      startDate: '2025-07-20',
      status: 'En cours'
    },
    {
      id: 2,
      medication: 'Isoniazide',
      dosage: '300mg',
      frequency: '1 fois/jour',
      duration: '6 mois',
      startDate: '2025-07-20',
      status: 'En cours'
    },
    {
      id: 3,
      medication: 'Ethambutol',
      dosage: '1200mg',
      frequency: '1 fois/jour',
      duration: '2 mois',
      startDate: '2025-07-20',
      status: 'Terminé'
    }
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'terminé': return 'bg-gray-100 text-gray-800';
      case 'en cours': return 'bg-blue-100 text-blue-800';
      case 'positif': return 'bg-red-100 text-red-800';
      case 'anormal': return 'bg-orange-100 text-orange-800';
      case 'amélioration': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout title="Mon Historique Médical" userType="patient" onLogout={onLogout} onNavigate={onNavigate}>
      <Tabs defaultValue="consultations" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="consultations" className="flex items-center">
            <FileText className="h-4 w-4 mr-2" />
            Consultations
          </TabsTrigger>
          <TabsTrigger value="examens" className="flex items-center">
            <Activity className="h-4 w-4 mr-2" />
            Examens
          </TabsTrigger>
          <TabsTrigger value="traitements" className="flex items-center">
            <CheckCircle className="h-4 w-4 mr-2" />
            Traitements
          </TabsTrigger>
        </TabsList>

        <TabsContent value="consultations" className="space-y-4">
          <div className="grid gap-4">
            {consultations.map((consultation) => (
              <Card key={consultation.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{consultation.type}</CardTitle>
                      <p className="text-sm text-gray-600 flex items-center mt-1">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(consultation.date).toLocaleDateString('fr-FR')} - {consultation.doctor}
                      </p>
                    </div>
                    <Badge className={getStatusColor(consultation.status)}>
                      {consultation.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Diagnostic</h4>
                      <p className="text-sm text-gray-700 mb-3">{consultation.diagnosis}</p>

                      <h4 className="font-semibold text-sm mb-2">Symptômes</h4>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {consultation.symptoms.map((symptom, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {symptom}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Traitement prescrit</h4>
                      <p className="text-sm text-gray-700 mb-3">{consultation.treatment}</p>

                      <h4 className="font-semibold text-sm mb-2">Notes du médecin</h4>
                      <p className="text-sm text-gray-600">{consultation.notes}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      Voir détails
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Télécharger
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="examens" className="space-y-4">
          <div className="grid gap-4">
            {examResults.map((exam) => (
              <Card key={exam.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{exam.type}</h3>
                      <p className="text-sm text-gray-600 flex items-center mt-1">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(exam.date).toLocaleDateString('fr-FR')} - {exam.doctor}
                      </p>
                    </div>
                    <Badge className={getStatusColor(exam.status)}>
                      {exam.status}
                    </Badge>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <h4 className="font-semibold text-sm mb-2">Résultat</h4>
                    <p className="text-sm">{exam.result}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      Voir rapport complet
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Télécharger PDF
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="traitements" className="space-y-4">
          <div className="grid gap-4">
            {treatments.map((treatment) => (
              <Card key={treatment.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{treatment.medication}</h3>
                      <p className="text-sm text-gray-600">
                        Débuté le {new Date(treatment.startDate).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                    <Badge className={getStatusColor(treatment.status)}>
                      {treatment.status}
                    </Badge>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-xs font-semibold text-blue-800 mb-1">DOSAGE</p>
                      <p className="text-sm font-medium">{treatment.dosage}</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="text-xs font-semibold text-green-800 mb-1">FRÉQUENCE</p>
                      <p className="text-sm font-medium">{treatment.frequency}</p>
                    </div>
                    <div className="bg-purple-50 p-3 rounded-lg">
                      <p className="text-xs font-semibold text-purple-800 mb-1">DURÉE</p>
                      <p className="text-sm font-medium">{treatment.duration}</p>
                    </div>
                  </div>
                  {treatment.status === 'En cours' && (
                    <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
                      <div className="flex items-center">
                        <AlertTriangle className="h-4 w-4 text-yellow-600 mr-2" />
                        <p className="text-sm text-yellow-800">
                          <strong>Important :</strong> Prenez ce médicament régulièrement selon les instructions.
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default PatientMedicalHistory;

