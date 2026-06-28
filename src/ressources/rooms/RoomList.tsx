import {
  List,
  Datagrid,
  TextField,
  NumberField,
  SearchInput,
  EditButton,
  DeleteButton,
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

const RoomFilters = [
  <SearchInput source="name" placeholder="Rechercher par nom..." alwaysOn />,
];

export const RoomList = () => (
  <Card className="shadow-md border-0">
    <CardContent className="p-6">
      <List
        filters={RoomFilters}
        perPage={20}
        sort={{ field: 'name', order: 'ASC' }}
        actions={<ListActions />}
        className="space-y-4"
      >
        <Datagrid
          rowClick="edit"
          className="rounded-lg overflow-hidden border border-gray-200"
        >
          <TextField
            source="name"
            label="Nom de la salle"
            className="font-medium text-gray-900"
          />
          
          <NumberField
            source="capacity"
            label="Capacité"
            className="text-center"
          />
          
          <TextField
            source="location"
            label="Localisation"
            className="text-gray-600"
          />
          
          <EditButton label="" className="text-blue-600 hover:text-blue-800" />
          <DeleteButton label="" className="text-red-600 hover:text-red-800" />
        </Datagrid>
      </List>
    </CardContent>
  </Card>
);