import {
  Show,
  SimpleShowLayout,
  TextField,
  ImageField,
  ReferenceManyField,
  Datagrid,
  DateField,
  EditButton,
  DeleteButton,
  FunctionField,
} from 'react-admin';
import { Card, CardContent } from '../../components/ui/card';
import { Avatar, AvatarFallback } from '../../components/ui/avatar';
import { ExternalLink, Users } from 'lucide-react';

export const SpeakerShow = () => {
  return (
    <Card className="shadow-2xl border-0 max-w-4xl mx-auto mt-8 bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden">
      <CardContent className="p-8">
        <Show
          title=" "
          component="div"
          className="space-y-6"
        >
          <SimpleShowLayout className="space-y-8">
            <div className="flex flex-col md:flex-row items-center gap-6 p-6 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 rounded-2xl">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-indigo-400/20 blur-2xl" />
                <Avatar className="w-32 h-32 border-4 border-white shadow-2xl ring-2 ring-indigo-200">
                  <ImageField source="profilePicture" className="w-32 h-32 object-cover rounded-full" />
                  <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-3xl font-bold">
                    <TextField source="fullName" />
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold text-gray-900">
                  <TextField source="fullName" />
                </h1>
                <p className="text-gray-500 mt-1">
                  <TextField source="bio" className="line-clamp-2" />
                </p>
                <div className="flex flex-wrap gap-2 mt-3 justify-center md:justify-start">
                  <FunctionField
                    source="externalLinks"
                    label="Liens"
                    render={(record: any) => {
                      const links = record?.externalLinks || [];
                      return links.map((link: string) => (
                        <a
                          key={link}
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-medium text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-3 py-1 rounded-full transition-all"
                        >
                          <ExternalLink className="w-3 h-3" />
                          {new URL(link).hostname.replace('www.', '')}
                        </a>
                      ));
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="prose max-w-none">
              <h3 className="text-lg font-semibold text-gray-900">Biographie</h3>
              <div className="bg-gray-50/50 rounded-xl p-4 border border-gray-100">
                <TextField source="bio" className="text-gray-700 whitespace-pre-wrap" />
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-indigo-500" />
                Sessions
              </h3>
              <ReferenceManyField reference="sessions" target="speakerIds" className="mt-4">
                <Datagrid
                  className="rounded-xl overflow-hidden border border-gray-200"
                  rowStyle={(record) => ({
                    backgroundColor: record.live ? '#f0fdf4' : 'transparent',
                  })}
                >
                  <TextField source="title" label="Titre" className="font-medium" />
                  <DateField source="startTime" label="Début" showTime />
                  <DateField source="endTime" label="Fin" showTime />
                  <TextField source="roomName" label="Salle" />
                  <EditButton label="" className="text-blue-600" />
                  <DeleteButton label="" className="text-red-600" />
                </Datagrid>
              </ReferenceManyField>
            </div>
          </SimpleShowLayout>
        </Show>
      </CardContent>
    </Card>
  );
};