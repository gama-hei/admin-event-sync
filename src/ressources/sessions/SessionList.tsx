import {
  List,
  Datagrid,
  TextField,
  DateField,
  ReferenceField,
  SearchInput,
  EditButton,
  DeleteButton,
  NumberField,
  FilterButton,
  CreateButton,
  TopToolbar,
} from 'react-admin';
import { Card, CardContent } from '../../components/ui/card';

const ListActions = () => (
  <TopToolbar>
    <FilterButton />
    <CreateButton />
  </TopToolbar>
);

const SessionFilters = [
  <SearchInput source="title" placeholder="Rechercher par titre..." alwaysOn />,
];

export const SessionList = () => (
  <Card className="shadow-md border-0">
    <CardContent className="p-6">
      <List
        filters={SessionFilters}
        perPage={20}
        sort={{ field: 'startTime', order: 'ASC' }}
        actions={<ListActions />}
        className="space-y-4"
      >
        <Datagrid
          rowClick="show"
          className="rounded-lg overflow-hidden border border-gray-200"
        >
          <TextField
            source="title"
            label="Titre"
            className="font-medium text-gray-900"
          />
          
          <ReferenceField
            source="eventId"
            reference="events"
            label="Événement"
            link="show"
          >
            <TextField source="title" className="text-indigo-600 hover:text-indigo-800" />
          </ReferenceField>
          
          <ReferenceField
            source="roomId"
            reference="rooms"
            label="Salle"
            link="show"
          >
            <TextField source="name" />
          </ReferenceField>
          
          <DateField
            source="startTime"
            label="Début"
            showTime
            className="text-gray-700"
          />
          
          <DateField
            source="endTime"
            label="Fin"
            showTime
            className="text-gray-700"
          />
          
          <NumberField
            source="capacity"
            label="Capacité"
            className="text-center"
          />
          
          <EditButton label="" className="text-blue-600 hover:text-blue-800" />
          <DeleteButton label="" className="text-red-600 hover:text-red-800" />
        </Datagrid>
      </List>
    </CardContent>
  </Card>
);