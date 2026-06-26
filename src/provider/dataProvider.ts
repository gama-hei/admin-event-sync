import { DataProvider, fetchUtils } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';
import { API_BASE_URL } from './config';

const httpClient = (url: string, options: any = {}) => {
  const token = localStorage.getItem('token');
  if (!options.headers) {
    options.headers = new Headers({ 'Content-Type': 'application/json' });
  }
  if (token) {
    options.headers.set('Authorization', `Bearer ${token}`);
  }
  if (options.body && options.body instanceof FormData) {
    options.headers.delete('Content-Type');
  }
  return fetchUtils.fetchJson(url, options);
};

const baseDataProvider = simpleRestProvider(`${API_BASE_URL}/admin`, httpClient);

const dataProvider: DataProvider = {
  ...baseDataProvider,

  getList: async (resource) => {
    const url = `${API_BASE_URL}/admin/${resource}`;
    try {
      const { json } = await httpClient(url, {});
      if (Array.isArray(json)) {
        return {
          data: json,
          total: json.length,
        };
      }
      if (json && Array.isArray(json.data)) {
        return {
          data: json.data,
          total: json.data.length,
        };
      }
      throw new Error('La réponse du serveur ne contient pas de tableau.');
    } catch (error) {
      console.error(`[DataProvider.getList] Erreur pour ${resource} :`, error);
      throw new Error(`Impossible de récupérer la liste des ${resource}.`);
    }
  },

  create: async (resource: string, params: any) => {
    if (resource === 'sessions') {
      const { eventId, ...sessionData } = params.data;

      if (!eventId) {
        throw new Error("L'identifiant de l'événement (eventId) est requis pour créer une session.");
      }

      const url = `${API_BASE_URL}/admin/events/${eventId}/sessions`;
      const options: any = {
        method: 'POST',
        body: JSON.stringify(sessionData),
      };

      try {
        const { json } = await httpClient(url, options);
        return { data: json };
      } catch (error: any) {
        console.error('[DataProvider.create] Erreur lors de la création de la session :', error);
        throw new Error(error.message || 'Impossible de créer la session.');
      }
    }

    return baseDataProvider.create(resource, params);
  },

  update: async (resource: string, params: any) => {
    if (resource === 'sessions' && params.data && params.data.speakerIds) {
      const { speakerIds, ...updateData } = params.data;

      const updateUrl = `${API_BASE_URL}/admin/sessions/${params.id}`;
      const updateOptions: any = {
        method: 'PUT',
        body: JSON.stringify(updateData),
      };

      let updatedSession: any = null;
      try {
        const { json } = await httpClient(updateUrl, updateOptions);
        updatedSession = json;
      } catch (error: any) {
        console.error('[DataProvider.update] Erreur mise à jour session :', error);
        throw new Error(error.message || 'Impossible de mettre à jour la session.');
      }

      if (Array.isArray(speakerIds)) {
        const assignUrl = `${API_BASE_URL}/admin/sessions/${params.id}/speakers`;
        const assignOptions: any = {
          method: 'PATCH',
          body: JSON.stringify({ speakerIds }),
        };
        try {
          const { json } = await httpClient(assignUrl, assignOptions);
          return { data: json };
        } catch (error: any) {
          console.error('[DataProvider.update] Erreur assignation speakers :', error);
          throw new Error(error.message || 'La session a été mise à jour, mais l\'assignation des speakers a échoué.');
        }
      }

      return { data: updatedSession };
    }

    return baseDataProvider.update(resource, params);
  },
};

export default dataProvider;