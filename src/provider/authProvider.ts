import { AuthProvider } from 'react-admin';
import { API_BASE_URL } from './config';

const authProvider: AuthProvider = {
  
  login: async ({ username, password }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/organizer/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: username, password }),
      });

      if (!response.ok) {
        try {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Identifiants ou mot de passe incorrects.');
        } catch (jsonError) {
          throw new Error(`Erreur serveur (${response.status}). Veuillez réessayer plus tard.`);
        }
      }

      const data = await response.json();
      
      if (data && data.token && data.organizer) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('organizer', JSON.stringify(data.organizer));
        return Promise.resolve();
      } else {
        throw new Error("La réponse du serveur est incomplète.");
      }

    } catch (networkError: any) {
      console.error("Erreur lors de la tentative de connexion :", networkError);
      throw new Error(networkError.message || "Impossible de joindre le serveur.");
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('organizer');
    return Promise.resolve();
  },

  checkError: ({ status }) => {
    if (status === 401 || status === 403) {
      localStorage.removeItem('token');
      localStorage.removeItem('organizer');
      return Promise.reject(new Error('Session expirée.'));
    } else {
      return Promise.resolve();
    }
  },

  checkAuth: () => {
    const token = localStorage.getItem('token');
    
    if (token) {
      return Promise.resolve();
    } else {
      return Promise.reject(new Error('Aucun jeton de session trouvé. Veuillez vous connecter.'));
    }
  },

  getPermissions: () => {
    return Promise.resolve('admin');
  },

  getIdentity: () => {
    const organizerRawData = localStorage.getItem('organizer');
    
    if (!organizerRawData) {
      return Promise.reject(new Error('Aucune donnée utilisateur trouvée.'));
    }

    try {
      const organizer = JSON.parse(organizerRawData);
      
      if (organizer && organizer.id && organizer.fullName) {
        return Promise.resolve({
          id: organizer.id,
          fullName: organizer.fullName,
          email: organizer.email || '',
        });
      } else {
        throw new Error("Les données de l'organisateur sont incomplètes.");
      }
    } catch (parseError) {
      console.error("Erreur de lecture des données utilisateur stockées :", parseError);
      localStorage.removeItem('organizer');
      return Promise.reject(new Error('Données de session corrompues.'));
    }
  },
};

export default authProvider;