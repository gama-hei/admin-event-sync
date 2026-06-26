// src/resources/sessions/SessionCreate.tsx

import {
  Create,
  SimpleForm,
  TextInput,
  DateTimeInput,
  ReferenceInput,
  SelectInput,
  ReferenceArrayInput,
  SelectArrayInput,
  required,
  NumberInput,
  useRedirect,
  useNotify,
} from 'react-admin';
import { Card, CardContent } from '../../components/ui/card';

export const SessionCreate = () => {
  const redirect = useRedirect();
  const notify = useNotify();

  const handleSuccess = () => {
    notify('Session créée avec succès !', { type: 'success' });
    redirect('/sessions');
  };

  const handleError = (error: any) => {
    notify(`Erreur : ${error.message}`, { type: 'error' });
  };

  return (
    <Card className="shadow-lg border-0 max-w-4xl mx-auto mt-8">
      <CardContent className="p-8">
        <Create
          title="Créer une nouvelle session"
          mutationOptions={{ onSuccess: handleSuccess, onError: handleError }}
          redirect="list"
        >
          <SimpleForm className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Événement parent */}
              <div className="col-span-2">
                <ReferenceInput
                  source="eventId"
                  reference="events"
                  fullWidth
                >
                  <SelectInput
                    optionText="title"
                    label="Événement parent"
                    validate={[required('L\'événement est requis')]}
                    className="w-full"
                  />
                </ReferenceInput>
              </div>

              {/* Titre */}
              <div className="col-span-2">
                <TextInput
                  source="title"
                  label="Titre de la session"
                  validate={[required()]}
                  fullWidth
                />
              </div>

              {/* Description */}
              <div className="col-span-2">
                <TextInput
                  source="description"
                  label="Description"
                  multiline
                  rows={3}
                  fullWidth
                />
              </div>

              {/* Horaires */}
              <div>
                <DateTimeInput
                  source="startTime"
                  label="Début"
                  validate={[required()]}
                  fullWidth
                />
              </div>
              <div>
                <DateTimeInput
                  source="endTime"
                  label="Fin"
                  validate={[required()]}
                  fullWidth
                />
              </div>

              {/* Salle */}
              <div>
                <ReferenceInput
                  source="roomId"
                  reference="rooms"
                  fullWidth
                >
                  <SelectInput
                    optionText="name"
                    label="Salle"
                    validate={[required('La salle est requise')]}
                    className="w-full"
                  />
                </ReferenceInput>
              </div>

              {/* Capacité */}
              <div>
                <NumberInput
                  source="capacity"
                  label="Capacité"
                  min={0}
                  fullWidth
                  defaultValue={0}
                />
              </div>

              <div className="col-span-2">
                <ReferenceArrayInput
                  source="speakerIds"
                  reference="speakers"
                  label="Intervenants"
                >
                  <SelectArrayInput
                    optionText="fullName"
                    label="Choisir les intervenants"
                    className="w-full"
                  />
                </ReferenceArrayInput>
              </div>
            </div>
          </SimpleForm>
        </Create>
      </CardContent>
    </Card>
  );
};