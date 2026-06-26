import {
  Show,
  SimpleShowLayout,
  TextField,
  DateField,
  ReferenceManyField,
  Datagrid,
  EditButton,
  DeleteButton,
} from 'react-admin';
import { Card, CardContent } from '../../components/ui/card';

export const EventShow = () => (
  <Card className="shadow-lg border-0 max-w-4xl mx-auto mt-8">
    <CardContent className="p-8">
      <Show title="Détails de l'événement">
        <SimpleShowLayout className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-500">Titre</label>
              <TextField source="title" className="text-lg font-semibold" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-500">Lieu</label>
              <TextField source="location" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-500">Début</label>
              <DateField source="startDate" showTime />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-500">Fin</label>
              <DateField source="endDate" showTime />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-500">Description</label>
            <TextField source="description" className="whitespace-pre-wrap" />
          </div>
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Sessions</h3>
            <ReferenceManyField reference="sessions" target="eventId">
              <Datagrid>
                <TextField source="title" label="Titre" />
                <DateField source="startTime" label="Début" showTime />
                <DateField source="endTime" label="Fin" showTime />
                <TextField source="roomName" label="Salle" />
                <EditButton label="" />
                <DeleteButton label="" />
              </Datagrid>
            </ReferenceManyField>
          </div>
        </SimpleShowLayout>
      </Show>
    </CardContent>
  </Card>
);