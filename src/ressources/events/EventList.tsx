import {
  List,
  Datagrid,
  TextField,
  DateField,
  SearchInput,
  EditButton,
  ShowButton,
  DeleteButton,
  TextInput,
} from 'react-admin';
import { Card, CardContent } from '../../components/ui/card';

const EventFilters = [
  <SearchInput source="title" placeholder="Rechercher par titre..." alwaysOn />,
  <TextInput source="location" label="Lieu" />,
];

export const EventList = () => (
  <Card className="shadow-md border-0">
    <CardContent className="p-6">
      <List
        filters={EventFilters}
        perPage={20}
        sort={{ field: 'startDate', order: 'DESC' }}
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
          <TextField
            source="location"
            label="Lieu"
            className="text-gray-600"
          />
          <DateField
            source="startDate"
            label="Début"
            showTime
            className="text-gray-700"
          />
          <DateField
            source="endDate"
            label="Fin"
            showTime
            className="text-gray-700"
          />
          <EditButton label="" className="text-blue-600 hover:text-blue-800" />
          <ShowButton label="" className="text-green-600 hover:text-green-800" />
          <DeleteButton label="" className="text-red-600 hover:text-red-800" />
        </Datagrid>
      </List>
    </CardContent>
  </Card>
);