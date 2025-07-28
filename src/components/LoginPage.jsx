import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Heart, User, Shield } from 'lucide-react';

const LoginPage = ({ onLogin }) => {
  const [userType, setUserType] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (userType && email && password) {
      onLogin(userType);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-600 rounded-full">
              <Heart className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">CNHU-PP/C</h1>
          <p className="text-gray-600 mt-2">Centre National de Pneumo-phtisiologie</p>
          <p className="text-sm text-gray-500 mt-1">Système de Gestion Numérique</p>
        </div>

        {/* Login Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Connexion</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="userType">Type d'utilisateur</Label>
                <Select value={userType} onValueChange={setUserType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir votre profil" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="patient">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2" />
                        Patient
                      </div>
                    </SelectItem>
                    <SelectItem value="admin">
                      <div className="flex items-center">
                        <Shield className="h-4 w-4 mr-2" />
                        Personnel Médical/Administratif
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre.email@exemple.com"
                  required
                />
              </div>

              <div>
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                Se connecter
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Première connexion ?{' '}
                <a href="#" className="text-blue-600 hover:underline">
                  Contactez l'administration
                </a>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Demo Instructions */}
        <Card className="mt-6 bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <h3 className="font-semibold text-blue-900 mb-2">Aperçu de démonstration</h3>
            <p className="text-sm text-blue-800 mb-3">
              Choisissez un type d'utilisateur et utilisez n'importe quel email/mot de passe pour explorer l'interface :
            </p>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• <strong>Patient</strong> : Portail de prise de RDV et consultation des résultats</li>
              <li>• <strong>Personnel</strong> : Tableau de bord administratif avec statistiques</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;

