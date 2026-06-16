import {
  List,
  SearchInput,
  FilterButton,
  CreateButton,
  TopToolbar,
  useListContext,
  EditButton,
  DeleteButton,
} from 'react-admin';
import { Card, CardContent } from '../../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { ExternalLink, User } from 'lucide-react';

interface Speaker {
  id: string;
  fullName: string;
  profilePicture?: string;
  bio?: string;
  externalLinks?: string[];
}

interface SpeakerCardProps {
  record: Speaker;
}

const SpeakerCard = ({ record }: SpeakerCardProps) => {
  const { fullName, profilePicture, bio, externalLinks } = record;

  const getInitials = (name: string) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card className="group relative bg-white/80 backdrop-blur-sm border-0 shadow-md hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden hover:-translate-y-1">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <CardContent className="p-6 relative">
        <div className="flex flex-col items-center text-center">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-indigo-400/20 blur-xl group-hover:blur-2xl transition-all duration-500" />
            <Avatar className="w-24 h-24 border-2 border-white shadow-xl ring-2 ring-indigo-100 group-hover:ring-indigo-300 transition-all duration-300">
              <AvatarImage src={profilePicture} alt={fullName} />
              <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-xl font-bold">
                {getInitials(fullName)}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full p-1 border-2 border-white shadow-sm">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            </div>
          </div>

          {/* Nom */}
          <h3 className="mt-4 text-lg font-semibold text-gray-900 group-hover:text-indigo-700 transition-colors duration-200">
            {fullName}
          </h3>

          <p className="text-sm text-gray-500 mt-1 line-clamp-2 min-h-[2.5rem]">
            {bio || 'Aucune biographie'}
          </p>

          {externalLinks && externalLinks.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2 justify-center">
              {externalLinks.map((link: string, index: number) => (
                <a
                  key={index}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-medium text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-3 py-1 rounded-full transition-all duration-200 hover:scale-105"
                >
                  <ExternalLink className="w-3 h-3" />
                  {new URL(link).hostname.replace('www.', '')}
                </a>
              ))}
            </div>
          )}

          <div className="mt-5 flex items-center gap-2 border-t border-gray-100/80 pt-4 w-full justify-center">
            <EditButton
              record={record}
              label=""
              className="text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 rounded-full p-2.5 transition-all duration-200 hover:scale-110"
            />
            <DeleteButton
              record={record}
              label=""
              className="text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 rounded-full p-2.5 transition-all duration-200 hover:scale-110"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const SpeakerGrid = () => {
  const { data, isLoading, total } = useListContext<Speaker>();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
        {[...Array(8)].map((_, i) => (
          <Card key={i} className="shadow-md border-0 animate-pulse">
            <CardContent className="p-6">
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-gray-200" />
                <div className="mt-4 h-5 w-32 bg-gray-200 rounded" />
                <div className="mt-2 h-4 w-48 bg-gray-200 rounded" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (total === 0 || !data || data.length === 0) {
    return (
      <div className="text-center py-16">
        <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 text-lg">Aucun intervenant trouvé</p>
        <p className="text-gray-400 text-sm">Commencez par en créer un !</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
      {data.map((record) => (
        <SpeakerCard key={record.id} record={record} />
      ))}
    </div>
  );
};

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
  <Card className="shadow-lg border-0 bg-gray-50/50 backdrop-blur-sm">
    <CardContent className="p-6">
      <List<Speaker>
        filters={SpeakerFilters}
        perPage={20}
        sort={{ field: 'fullName', order: 'ASC' }}
        actions={<ListActions />}
        component="div"
        className="space-y-4"
      >
        <SpeakerGrid />
      </List>
    </CardContent>
  </Card>
);