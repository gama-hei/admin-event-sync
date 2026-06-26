import { Create, SimpleForm, TextInput, DateTimeInput, required } from 'react-admin';
import { Card, CardContent } from '../../components/ui/card';

export const EventCreate = () => (
  <Card className="shadow-lg border-0 max-w-3xl mx-auto mt-8">
    <CardContent className="p-8">
      <Create
        title="Créer un nouvel événement"
        className="space-y-6"
        redirect="list"
      >
        <SimpleForm
          className="space-y-6"
          defaultValues={{
            startDate: new Date().toISOString().slice(0, 16),
            endDate: new Date(Date.now() + 3600000).toISOString().slice(0, 16),
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-2">
              <TextInput
                source="title"
                label="Titre de l'événement"
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
                validate={[required()]}
              />
            </div>
            <div>
              <DateTimeInput
                source="startDate"
                label="Date et heure de début"
                validate={[required()]}
                fullWidth
              />
            </div>
            <div>
              <DateTimeInput
                source="endDate"
                label="Date et heure de fin"
                validate={[required()]}
                fullWidth
              />
            </div>
            <div className="col-span-2">
              <TextInput
                source="location"
                label="Lieu"
                validate={[required()]}
                fullWidth
              />
            </div>
          </div>
        </SimpleForm>
      </Create>
    </CardContent>
  </Card>
);