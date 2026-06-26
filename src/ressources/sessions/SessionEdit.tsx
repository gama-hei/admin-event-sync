// src/resources/sessions/SessionEdit.tsx

import {
  Edit,
  SimpleForm,
  TextInput,
  DateTimeInput,
  ReferenceInput,
  SelectInput,
  ReferenceArrayInput,
  SelectArrayInput,
  NumberInput,
  required,
  useNotify,
  useRedirect,
} from 'react-admin';
import { Card, CardContent } from '../../components/ui/card';

export const SessionEdit = () => {
  const notify = useNotify();
  const redirect = useRedirect();

  const handleSuccess = () => {
    notify('Session mise à jour avec succès !', { type: 'success' });
    redirect('/sessions');
  };

  const handleError = (error: any) => {
    notify(`Erreur : ${error.message}`, { type: 'error' });
  };

  return (
    <Card className="shadow-lg border-0 max-w-4xl mx-auto mt-8">
      <CardContent className="p-8">
        <Edit
          title="Modifier la session"
          mutationOptions={{ onSuccess: handleSuccess, onError: handleError }}
          redirect="list"
        >
          <SimpleForm className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Titre */}
              <div className="col-span-2">
                <TextInput
                  source="title"
                  label="Titre"
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
                <DateTimeInput source="startTime" label="Début" fullWidth />
              </div>
              <div>
                <DateTimeInput source="endTime" label="Fin" fullWidth />
              </div>

              {/* Salle */}
              <div>
                <ReferenceInput source="roomId" reference="rooms" fullWidth>
                  <SelectInput optionText="name" label="Salle" />
                </ReferenceInput>
              </div>

              {/* Capacité */}
              <div>
                <NumberInput
                  source="capacity"
                  label="Capacité"
                  min={0}
                  fullWidth
                />
              </div>

              {/* Intervenants (multi-sélection) */}
              <div className="col-span-2">
                <ReferenceArrayInput
                  source="speakerIds"
                  reference="speakers"
                  label="Intervenants"
                >
                  <SelectArrayInput
                    optionText="fullName"
                    label="Choisir les intervenants"
                  />
                </ReferenceArrayInput>
              </div>
            </div>
          </SimpleForm>
        </Edit>
      </CardContent>
    </Card>
  );
};