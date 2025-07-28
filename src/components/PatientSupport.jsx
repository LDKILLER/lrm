import React, { useState } from 'react';
import Layout from './Layout';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Users, MessageSquare, Phone, Mail, Heart, HelpCircle, Send, ThumbsUp, Reply } from 'lucide-react';

const PatientSupport = ({ onLogout, onNavigate }) => {
  const [newPost, setNewPost] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('general');

  const supportContacts = [
    {
      name: 'Urgences Médicales',
      phone: '+229 21 30 01 00',
      available: '24h/24',
      type: 'emergency'
    },
    {
      name: 'Infirmière Coordinatrice',
      phone: '+229 97 12 34 56',
      email: 'coordinatrice@cnhu-ppc.bj',
      available: '8h-17h',
      type: 'coordinator'
    },
    {
      name: 'Service Social',
      phone: '+229 96 78 90 12',
      email: 'social@cnhu-ppc.bj',
      available: '8h-16h',
      type: 'social'
    },
    {
      name: 'Pharmacie Hospitalière',
      phone: '+229 95 45 67 89',
      available: '7h-19h',
      type: 'pharmacy'
    }
  ];

  const communityPosts = [
    {
      id: 1,
      author: 'Marie A.',
      avatar: 'MA',
      time: '2h',
      category: 'Témoignage',
      title: 'Mon parcours de guérison',
      content: 'Après 6 mois de traitement, je suis enfin guérie ! Je voulais partager mon expérience pour encourager ceux qui commencent leur traitement. La régularité dans la prise des médicaments est vraiment la clé.',
      likes: 12,
      replies: 5,
      liked: false
    },
    {
      id: 2,
      author: 'Jean K.',
      avatar: 'JK',
      time: '5h',
      category: 'Question',
      title: 'Effets secondaires du traitement',
      content: 'Bonjour, je suis au 2ème mois de traitement et j\'ai des nausées le matin. Est-ce normal ? Comment gérez-vous cela ?',
      likes: 8,
      replies: 12,
      liked: true
    },
    {
      id: 3,
      author: 'Fatou D.',
      avatar: 'FD',
      time: '1j',
      category: 'Conseil',
      title: 'Alimentation pendant le traitement',
      content: 'Je partage quelques recettes qui m\'ont aidée à maintenir mon appétit pendant le traitement. N\'hésitez pas à demander si vous voulez les détails !',
      likes: 15,
      replies: 8,
      liked: false
    }
  ];

  const faqItems = [
    {
      question: 'Que faire si j\'oublie de prendre mes médicaments ?',
      answer: 'Prenez votre dose dès que vous vous en souvenez, sauf s\'il est presque temps pour la dose suivante. Ne doublez jamais la dose. Contactez votre médecin si vous oubliez fréquemment.'
    },
    {
      question: 'Puis-je arrêter le traitement si je me sens mieux ?',
      answer: 'Non, il est crucial de terminer tout le traitement même si vous vous sentez mieux. L\'arrêt prématuré peut entraîner une résistance aux médicaments et une rechute.'
    },
    {
      question: 'Comment savoir si le traitement fonctionne ?',
      answer: 'Votre médecin évaluera l\'efficacité par des examens réguliers (radiographies, analyses de crachats). Une amélioration des symptômes est aussi un bon signe.'
    },
    {
      question: 'Puis-je contaminer ma famille ?',
      answer: 'Après 2-3 semaines de traitement correct, vous n\'êtes généralement plus contagieux. Respectez les mesures d\'hygiène recommandées par votre médecin.'
    }
  ];

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Témoignage': return 'bg-green-100 text-green-800';
      case 'Question': return 'bg-blue-100 text-blue-800';
      case 'Conseil': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getContactIcon = (type) => {
    switch (type) {
      case 'emergency': return '🚨';
      case 'coordinator': return '👩‍⚕️';
      case 'social': return '🤝';
      case 'pharmacy': return '💊';
      default: return '📞';
    }
  };

  const submitPost = () => {
    if (newPost.trim()) {
      // Logique de soumission
      setNewPost('');
    }
  };

  return (
    <Layout title="Support et Communauté" userType="patient" onLogout={onLogout} onNavigate={onNavigate}>
      <Tabs defaultValue="community" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="community" className="flex items-center">
            <Users className="h-4 w-4 mr-2" />
            Communauté
          </TabsTrigger>
          <TabsTrigger value="support" className="flex items-center">
            <Phone className="h-4 w-4 mr-2" />
            Contacts
          </TabsTrigger>
          <TabsTrigger value="faq" className="flex items-center">
            <HelpCircle className="h-4 w-4 mr-2" />
            FAQ
          </TabsTrigger>
        </TabsList>

        <TabsContent value="community" className="space-y-6">
          {/* Créer un nouveau post */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="h-5 w-5 mr-2" />
                Partager avec la Communauté
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex space-x-2">
                  <Button
                    variant={selectedCategory === 'general' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory('general')}
                  >
                    Général
                  </Button>
                  <Button
                    variant={selectedCategory === 'question' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory('question')}
                  >
                    Question
                  </Button>
                  <Button
                    variant={selectedCategory === 'temoignage' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory('temoignage')}
                  >
                    Témoignage
                  </Button>
                </div>
                <Textarea
                  placeholder="Partagez votre expérience, posez une question ou donnez des conseils..."
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  rows={4}
                />
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-600">
                    Votre message sera modéré avant publication
                  </p>
                  <Button onClick={submitPost} className="bg-blue-600 hover:bg-blue-700">
                    <Send className="h-4 w-4 mr-2" />
                    Publier
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Posts de la communauté */}
          <div className="space-y-4">
            {communityPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-semibold text-sm">
                      {post.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-semibold">{post.author}</h4>
                        <Badge className={getCategoryColor(post.category)} variant="secondary">
                          {post.category}
                        </Badge>
                        <span className="text-sm text-gray-500">• {post.time}</span>
                      </div>
                      <h3 className="font-medium mb-2">{post.title}</h3>
                      <p className="text-gray-700 mb-4">{post.content}</p>
                      <div className="flex items-center space-x-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`flex items-center ${post.liked ? 'text-red-600' : 'text-gray-600'}`}
                        >
                          <Heart className={`h-4 w-4 mr-1 ${post.liked ? 'fill-current' : ''}`} />
                          {post.likes}
                        </Button>
                        <Button variant="ghost" size="sm" className="flex items-center text-gray-600">
                          <Reply className="h-4 w-4 mr-1" />
                          {post.replies} réponses
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="support" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {supportContacts.map((contact, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="text-3xl">{getContactIcon(contact.type)}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">{contact.name}</h3>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2" />
                          <span>{contact.phone}</span>
                        </div>
                        {contact.email && (
                          <div className="flex items-center">
                            <Mail className="h-4 w-4 mr-2" />
                            <span>{contact.email}</span>
                          </div>
                        )}
                        <div className="flex items-center">
                          <Badge variant="outline" className="text-xs">
                            {contact.available}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex space-x-2 mt-4">
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          <Phone className="h-4 w-4 mr-2" />
                          Appeler
                        </Button>
                        {contact.email && (
                          <Button variant="outline" size="sm">
                            <Mail className="h-4 w-4 mr-2" />
                            Email
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Formulaire de contact */}
          <Card>
            <CardHeader>
              <CardTitle>Envoyer un Message</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Sujet</label>
                  <Input placeholder="Objet de votre message" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Priorité</label>
                  <select className="w-full p-2 border rounded-md">
                    <option>Normale</option>
                    <option>Urgente</option>
                    <option>Très urgente</option>
                  </select>
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium mb-2">Message</label>
                <Textarea placeholder="Décrivez votre situation..." rows={6} />
              </div>
              <Button className="mt-4 bg-blue-600 hover:bg-blue-700">
                <Send className="h-4 w-4 mr-2" />
                Envoyer le Message
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="faq" className="space-y-4">
          {faqItems.map((item, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-3 flex items-start">
                  <HelpCircle className="h-5 w-5 mr-2 mt-0.5 text-blue-600" />
                  {item.question}
                </h3>
                <p className="text-gray-700 leading-relaxed pl-7">{item.answer}</p>
              </CardContent>
            </Card>
          ))}

          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-6 text-center">
              <h3 className="font-semibold text-blue-900 mb-2">Vous ne trouvez pas votre réponse ?</h3>
              <p className="text-blue-800 mb-4">
                Notre équipe est là pour vous aider. N'hésitez pas à nous contacter.
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Poser une Question
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default PatientSupport;

