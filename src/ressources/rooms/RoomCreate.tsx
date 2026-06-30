// src/resources/rooms/RoomCreate.tsx

import {
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  required,
  useNotify,
  useRedirect,
} from 'react-admin';
import { Card, CardContent } from '../../components/ui/card';

export const RoomCreate = () => {
  const notify = useNotify();
  const redirect = useRedirect();

  const handleSuccess = () => {
    notify('Salle créée avec succès !', { type: 'success' });
    redirect('/rooms');
  };

  const handleError = (error: any) => {
    notify(`Erreur : ${error.message}`, { type: 'error' });
  };

  return (
    <Card className="shadow-lg border-0 max-w-3xl mx-auto mt-8">
      <CardContent className="p-8">
        <Create
          title="Créer une nouvelle salle"
          mutationOptions={{ onSuccess: handleSuccess, onError: handleError }}
          redirect="list"
        >
          <SimpleForm className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-2">
                <TextInput
                  source="name"
                  label="Nom de la salle"
                  validate={[required()]}
                  fullWidth
                />
              </div>

              <div>
                <NumberInput
                  source="capacity"
                  label="Capacité"
                  validate={[required()]}
                  min={1}
                  fullWidth
                />
              </div>

              <div>
                <TextInput
                  source="location"
                  label="Localisation"
                  fullWidth
                />
              </div>
            </div>
          </SimpleForm>
        </Create>
      </CardContent>
    </Card>
  );
};