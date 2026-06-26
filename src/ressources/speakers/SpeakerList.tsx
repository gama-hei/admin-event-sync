import {
  List,
  Datagrid,
  TextField,
  ImageField,
  SearchInput,
  EditButton,
  DeleteButton,
  FilterButton,
  CreateButton,
  TopToolbar,
  ArrayField,
  SingleFieldList,
  ChipField,
} from 'react-admin';
import { Card, CardContent } from '../../components/ui/card';

const ListActions = () => (
  <TopToolbar>
    <FilterButton />
    <CreateButton />
  </TopToolbar>
);

const SpeakerFilters = [
  <SearchInput source="fullName" placeholder="Rechercher par nom..." alwaysOn />,
];

export const SpeakerList = () => (
  <Card className="shadow-md border-0">
    <CardContent className="p-6">
      <List
        filters={SpeakerFilters}
        perPage={20}
        sort={{ field: 'fullName', order: 'ASC' }}
        actions={<ListActions />}
        className="space-y-4"
      >
        <Datagrid
          rowClick="edit"
          className="rounded-lg overflow-hidden border border-gray-200"
        >
          <ImageField
            source="profilePicture"
            label="Photo"
            className="w-12 h-12 rounded-full object-cover"
            sx={{
              '& img': {
                width: 48,
                height: 48,
                borderRadius: '50%',
                objectFit: 'cover',
              },
            }}
          />
          
          <TextField
            source="fullName"
            label="Nom complet"
            className="font-medium text-gray-900"
          />
          
          <TextField
            source="bio"
            label="Biographie"
            className="text-gray-600 max-w-xs truncate"
          />
          
          <ArrayField source="externalLinks" label="Liens">
            <SingleFieldList>
              <ChipField source="." className="bg-indigo-100 text-indigo-800" />
            </SingleFieldList>
          </ArrayField>
          
          <EditButton label="" className="text-blue-600 hover:text-blue-800" />
          <DeleteButton label="" className="text-red-600 hover:text-red-800" />
        </Datagrid>
      </List>
    </CardContent>
  </Card>
);