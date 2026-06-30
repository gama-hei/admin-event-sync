import { AuthProvider } from 'react-admin';
import { API_BASE_URL, TOKEN_EXPIRY } from './config';

const authProvider: AuthProvider = {
  login: async ({ username, password }) => {
    try {
      const email = username?.trim();
      const pwd = password?.trim();

      if (!email || !pwd) {
        throw new Error('Veuillez saisir votre email et votre mot de passe.');
      }

      const response = await fetch(`${API_BASE_URL}/auth/organizer/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: pwd }),
      });

      if (!response.ok) {
        let errorMessage = 'Identifiants invalides.';
        try {
          const errorData = await response.json();
          if (errorData.error) {
            errorMessage = errorData.error;
          } else if (errorData.message) {
            errorMessage = errorData.message;
          }
        } catch (_) {
        }
        throw new Error(errorMessage || `Erreur ${response.status} lors de la connexion.`);
      }

      const data = await response.json();

      if (!data.token || !data.organizerId) {
        throw new Error('La réponse du serveur est incomplète. Contactez l\'administrateur.');
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('tokenTimestamp', Date.now().toString());
      localStorage.setItem('organizer', JSON.stringify({
        id: data.organizerId,
        fullName: data.fullName || 'Organisateur',
        email: data.email || '',
      }));

      return Promise.resolve();
    } catch (error: any) {
      console.error('[AuthProvider.login] Erreur :', error);
      throw new Error(error.message || 'Impossible de se connecter au serveur. Vérifiez votre réseau.');
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenTimestamp');
    localStorage.removeItem('organizer');
    return Promise.resolve();
  },

  checkError: ({ status, data }) => {
    if (status === 401 || status === 403) {
      localStorage.removeItem('token');
      localStorage.removeItem('tokenTimestamp');
      localStorage.removeItem('organizer');
      const message = (data && data.message) || 'Session expirée ou non autorisée. Veuillez vous reconnecter.';
      return Promise.reject(new Error(message));
    }
    return Promise.resolve();
  },

  checkAuth: () => {
    const token = localStorage.getItem('token');
    if (!token) {
      return Promise.reject(new Error('Veuillez vous connecter pour accéder à cette page.'));
    }
    const timestamp = localStorage.getItem('tokenTimestamp');
    if (timestamp) {
      const elapsed = Date.now() - parseInt(timestamp, 10);
      if (elapsed > TOKEN_EXPIRY) {
        localStorage.removeItem('token');
        localStorage.removeItem('tokenTimestamp');
        localStorage.removeItem('organizer');
        return Promise.reject(new Error('Votre session a expiré. Veuillez vous reconnecter.'));
      }
    }

    return Promise.resolve();
  },

  getPermissions: () => {
    return Promise.resolve('admin');
  },

  getIdentity: () => {
    const organizerRaw = localStorage.getItem('organizer');
    if (!organizerRaw) {
      return Promise.reject(new Error('Aucune information utilisateur trouvée.'));
    }

    try {
      const organizer = JSON.parse(organizerRaw);
      if (!organizer.id || !organizer.fullName) {
        throw new Error('Données utilisateur incomplètes.');
      }
      return Promise.resolve({
        id: organizer.id,
        fullName: organizer.fullName,
        email: organizer.email || '',
      });
    } catch (error) {
      console.error('[AuthProvider.getIdentity] Erreur de parsing :', error);
      localStorage.removeItem('organizer');
      return Promise.reject(new Error('Données de session corrompues.'));
    }
  },
};

export default authProvider;