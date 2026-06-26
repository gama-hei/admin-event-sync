// src/resources/speakers/SpeakerCreate.tsx

import {
  Create,
  SimpleForm,
  TextInput,
  required,
  useNotify,
  useRedirect,
  ArrayInput,
  SimpleFormIterator,
} from 'react-admin';
import { Card, CardContent } from '../../components/ui/card';

export const SpeakerCreate = () => {
  const notify = useNotify();
  const redirect = useRedirect();

  const handleSuccess = () => {
    notify('Intervenant créé avec succès !', { type: 'success' });
    redirect('/speakers');
  };

  const handleError = (error: any) => {
    notify(`Erreur : ${error.message}`, { type: 'error' });
  };

  return (
    <Card className="shadow-lg border-0 max-w-3xl mx-auto mt-8">
      <CardContent className="p-8">
        <Create
          title="Créer un nouvel intervenant"
          mutationOptions={{ onSuccess: handleSuccess, onError: handleError }}
          redirect="list"
        >
          <SimpleForm className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {/* Nom complet */}
              <TextInput
                source="fullName"
                label="Nom complet"
                validate={[required()]}
                fullWidth
              />

              {/* Photo de profil (URL) */}
              <TextInput
                source="profilePicture"
                label="URL de la photo de profil"
                fullWidth
                helperText="Exemple : https://example.com/photo.jpg"
              />

              <TextInput
                source="bio"
                label="Biographie"
                multiline
                rows={4}
                validate={[required()]}
                fullWidth
              />

              <ArrayInput source="externalLinks" label="Liens externes">
                <SimpleFormIterator
                  addButton={<button className="text-indigo-600 hover:text-indigo-800">Ajouter un lien</button>}
                  removeButton={<button className="text-red-600 hover:text-red-800">Supprimer</button>}
                >
                  <TextInput
                    source="."
                    label="URL du lien"
                    fullWidth
                    helperText="Exemple : https://linkedin.com/in/username"
                  />
                </SimpleFormIterator>
              </ArrayInput>
            </div>
          </SimpleForm>
        </Create>
      </CardContent>
    </Card>
  );
};