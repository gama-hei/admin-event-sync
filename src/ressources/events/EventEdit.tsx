import { Edit, SimpleForm, TextInput, DateTimeInput, required } from 'react-admin';
import { Card, CardContent } from '../../components/ui/card';

export const EventEdit = () => (
  <Card className="shadow-lg border-0 max-w-3xl mx-auto mt-8">
    <CardContent className="p-8">
      <Edit title="Modifier l'événement">
        <SimpleForm className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-2">
              <TextInput
                source="title"
                label="Titre"
                validate={[required()]}
                fullWidth
              />
            </div>
            <div className="col-span-2">
              <TextInput
                source="description"
                label="Description"
                multiline
                rows={4}
                fullWidth
              />
            </div>
            <div>
              <DateTimeInput source="startDate" label="Début" fullWidth />
            </div>
            <div>
              <DateTimeInput source="endDate" label="Fin" fullWidth />
            </div>
            <div className="col-span-2">
              <TextInput source="location" label="Lieu" fullWidth />
            </div>
          </div>
        </SimpleForm>
      </Edit>
    </CardContent>
  </Card>
);