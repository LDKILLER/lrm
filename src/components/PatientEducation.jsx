import React, { useState } from 'react';
import Layout from './Layout';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { BookOpen, Play, Download, CheckCircle, Clock, Star, Award } from 'lucide-react';

const PatientEducation = ({ onLogout, onNavigate }) => {
  const [completedModules, setCompletedModules] = useState([1, 3]);

  const educationModules = [
    {
      id: 1,
      title: 'Comprendre la Tuberculose',
      description: 'Apprenez les bases sur la tuberculose, ses causes et ses symptômes',
      duration: '15 min',
      type: 'Vidéo + Quiz',
      progress: 100,
      completed: true,
      difficulty: 'Débutant',
      topics: ['Définition', 'Transmission', 'Symptômes', 'Diagnostic']
    },
    {
      id: 2,
      title: 'Prendre ses Médicaments Correctement',
      description: 'Guide pratique pour une prise optimale de votre traitement antituberculeux',
      duration: '20 min',
      type: 'Guide interactif',
      progress: 45,
      completed: false,
      difficulty: 'Intermédiaire',
      topics: ['Posologie', 'Horaires', 'Effets secondaires', 'Interactions']
    },
    {
      id: 3,
      title: 'Alimentation et Tuberculose',
      description: 'Conseils nutritionnels pour renforcer votre système immunitaire',
      duration: '12 min',
      type: 'Article + Recettes',
      progress: 100,
      completed: true,
      difficulty: 'Débutant',
      topics: ['Nutrition', 'Aliments recommandés', 'Recettes', 'Suppléments']
    },
    {
      id: 4,
      title: 'Prévenir la Transmission',
      description: 'Protégez vos proches et votre communauté',
      duration: '18 min',
      type: 'Simulation interactive',
      progress: 0,
      completed: false,
      difficulty: 'Intermédiaire',
      topics: ['Mesures d\'hygiène', 'Isolement', 'Port du masque', 'Ventilation']
    },
    {
      id: 5,
      title: 'Gérer les Effets Secondaires',
      description: 'Reconnaître et gérer les effets indésirables du traitement',
      duration: '25 min',
      type: 'Vidéo + Cas pratiques',
      progress: 0,
      completed: false,
      difficulty: 'Avancé',
      topics: ['Identification', 'Gestion', 'Quand consulter', 'Alternatives']
    }
  ];

  const achievements = [
    { id: 1, title: 'Premier pas', description: 'Premier module terminé', earned: true },
    { id: 2, title: 'Étudiant assidu', description: '3 modules terminés', earned: false },
    { id: 3, title: 'Expert patient', description: 'Tous les modules terminés', earned: false }
  ];

  const resources = [
    {
      id: 1,
      title: 'Guide du Patient Tuberculeux',
      type: 'PDF',
      size: '2.3 MB',
      downloads: 1250
    },
    {
      id: 2,
      title: 'Calendrier de Prise de Médicaments',
      type: 'PDF',
      size: '0.8 MB',
      downloads: 890
    },
    {
      id: 3,
      title: 'Recettes Nutritives pour la TB',
      type: 'PDF',
      size: '1.5 MB',
      downloads: 670
    }
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Débutant': return 'bg-green-100 text-green-800';
      case 'Intermédiaire': return 'bg-yellow-100 text-yellow-800';
      case 'Avancé': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const startModule = (moduleId) => {
    // Logique pour démarrer un module
    console.log(`Démarrage du module ${moduleId}`);
  };

  const overallProgress = Math.round((completedModules.length / educationModules.length) * 100);

  return (
    <Layout title="Éducation Thérapeutique" userType="patient" onLogout={onLogout} onNavigate={onNavigate}>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Contenu principal */}
        <div className="lg:col-span-3 space-y-6">
          {/* Progression générale */}
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Votre Progression</h2>
                  <p className="text-gray-600">Continuez votre apprentissage pour mieux gérer votre santé</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-blue-600">{overallProgress}%</div>
                  <p className="text-sm text-gray-600">{completedModules.length}/{educationModules.length} modules</p>
                </div>
              </div>
              <Progress value={overallProgress} className="h-3" />
            </CardContent>
          </Card>

          {/* Modules d'éducation */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Modules d'Apprentissage</h3>
            {educationModules.map((module) => (
              <Card key={module.id} className={`hover:shadow-md transition-shadow ${module.completed ? 'bg-green-50 border-green-200' : ''}`}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <h4 className="text-lg font-semibold mr-3">{module.title}</h4>
                        {module.completed && (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        )}
                      </div>
                      <p className="text-gray-600 mb-3">{module.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {module.duration}
                        </span>
                        <span>{module.type}</span>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge className={getDifficultyColor(module.difficulty)}>
                          {module.difficulty}
                        </Badge>
                        {module.topics.map((topic, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      {module.completed ? (
                        <Button variant="outline" onClick={() => startModule(module.id)}>
                          <BookOpen className="h-4 w-4 mr-2" />
                          Revoir
                        </Button>
                      ) : (
                        <Button onClick={() => startModule(module.id)} className="bg-blue-600 hover:bg-blue-700">
                          <Play className="h-4 w-4 mr-2" />
                          {module.progress > 0 ? 'Continuer' : 'Commencer'}
                        </Button>
                      )}
                    </div>
                  </div>
                  {!module.completed && module.progress > 0 && (
                    <div>
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Progression</span>
                        <span>{module.progress}%</span>
                      </div>
                      <Progress value={module.progress} className="h-2" />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Ressources téléchargeables */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Download className="h-5 w-5 mr-2" />
                Ressources Téléchargeables
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {resources.map((resource) => (
                  <div key={resource.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="bg-red-100 p-2 rounded">
                        <Download className="h-5 w-5 text-red-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">{resource.title}</h4>
                        <p className="text-sm text-gray-600">{resource.type} • {resource.size}</p>
                        <p className="text-xs text-gray-500">{resource.downloads} téléchargements</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Récompenses */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Award className="h-5 w-5 mr-2" />
                Récompenses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className={`p-3 rounded-lg border ${achievement.earned
                      ? 'bg-yellow-50 border-yellow-200'
                      : 'bg-gray-50 border-gray-200'
                    }`}>
                    <div className="flex items-center mb-2">
                      <Star className={`h-4 w-4 mr-2 ${achievement.earned ? 'text-yellow-500' : 'text-gray-400'
                        }`} />
                      <h4 className={`font-medium text-sm ${achievement.earned ? 'text-yellow-800' : 'text-gray-600'
                        }`}>
                        {achievement.title}
                      </h4>
                    </div>
                    <p className={`text-xs ${achievement.earned ? 'text-yellow-700' : 'text-gray-500'
                      }`}>
                      {achievement.description}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Prochaine session */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Prochaine Session</h3>
              <p className="text-sm text-blue-800 mb-3">
                Séance d'éducation thérapeutique de groupe
              </p>
              <div className="text-sm text-blue-700 mb-3">
                <p><strong>Date :</strong> 5 août 2025</p>
                <p><strong>Heure :</strong> 14h00</p>
                <p><strong>Lieu :</strong> Salle de conférence</p>
              </div>
              <Button variant="outline" size="sm" className="w-full border-blue-300 text-blue-700 hover:bg-blue-100">
                S'inscrire
              </Button>
            </CardContent>
          </Card>

          {/* Contact éducateur */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">Besoin d'aide ?</h3>
              <p className="text-sm text-gray-600 mb-3">
                Contactez votre éducateur thérapeutique pour toute question.
              </p>
              <Button variant="outline" size="sm" className="w-full">
                Contacter l'éducateur
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default PatientEducation;

