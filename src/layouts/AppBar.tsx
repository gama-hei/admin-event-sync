import { AppBar as RAAppBar, useGetIdentity, useLogout, useGetList } from 'react-admin';
import { Bell, LogOut, User, Settings, MessageSquare } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import { Badge } from '../components/ui/badge';
import { Skeleton } from '../components/ui/skeleton';

const NotificationsMenu = () => {
  const { data: sessions, isLoading } = useGetList('sessions', {
    pagination: { page: 1, perPage: 100 },
    sort: { field: 'startTime', order: 'DESC' },
  });

  const allQuestions =
    sessions?.flatMap((s) =>
      (s.questions || []).map((q: any) => ({ ...q, sessionTitle: s.title }))
    ) || [];

  const sortedQuestions = [...allQuestions].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const unreadCount = sortedQuestions.length;
  const recentQuestions = sortedQuestions.slice(0, 5);

  if (isLoading) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-full hover:bg-white/10 hover:scale-105 transition-all duration-200 active:scale-95">
            <Bell className="h-5 w-5 text-white" strokeWidth={2} />
            <Skeleton className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full" />
          </Button>
        </DropdownMenuTrigger>
      </DropdownMenu>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative h-9 w-9 rounded-full hover:bg-white/10 hover:scale-105 transition-all duration-200 active:scale-95"
        >
          <Bell className="h-5 w-5 text-white" strokeWidth={2} />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-red-600 text-[10px] font-medium text-white ring-2 ring-blue-800 shadow-sm">
              {unreadCount > 99 ? '99+' : unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-80 p-2 rounded-2xl border-0 bg-white/95 backdrop-blur-xl shadow-2xl shadow-blue-900/20"
        align="end"
        sideOffset={12}
        forceMount
      >
        <DropdownMenuLabel className="px-4 py-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-900">Notifications</span>
            {unreadCount > 0 && (
              <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-0">
                {unreadCount} non lue{unreadCount > 1 ? 's' : ''}
              </Badge>
            )}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="mx-2 bg-gray-100" />
        {recentQuestions.length === 0 ? (
          <div className="px-4 py-6 text-center">
            <MessageSquare className="h-8 w-8 text-gray-300 mx-auto mb-2" />
            <p className="text-sm text-gray-500">Aucune question récente</p>
          </div>
        ) : (
          <div className="max-h-72 overflow-y-auto">
            {recentQuestions.map((q) => (
              <DropdownMenuItem
                key={q.id}
                className="flex flex-col items-start gap-1 px-4 py-3 rounded-xl hover:bg-blue-50 cursor-pointer transition-colors"
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-sm font-medium text-gray-900">
                    {q.authorName || 'Anonyme'}
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(q.createdAt).toLocaleDateString('fr-FR')}
                  </span>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">{q.content}</p>
                <span className="text-xs text-blue-600 font-medium">
                  {q.sessionTitle || 'Session inconnue'}
                </span>
              </DropdownMenuItem>
            ))}
          </div>
        )}
        <DropdownMenuSeparator className="mx-2 bg-gray-100" />
        <div className="px-1">
          <DropdownMenuItem className="cursor-pointer rounded-xl px-3 py-2.5 text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors">
            Voir toutes les notifications
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// Composant pour le menu utilisateur (inchangé)
const CustomUserMenu = () => {
  const logout = useLogout();
  const { identity } = useGetIdentity();

  const user = {
    name: identity?.fullName || 'Organisateur',
    email: identity?.email || 'organisateur@eventsync.com',
    avatar: '',
  };

  const getInitials = (name: string) =>
    name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-10 w-10 rounded-full p-0 transition-transform hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2"
        >
          <Avatar className="h-9 w-9 border-2 border-white/30 shadow-lg ring-1 ring-blue-400/50">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-700 text-white font-semibold">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-72 p-2 rounded-2xl border-0 bg-white/95 backdrop-blur-xl shadow-2xl shadow-blue-900/20"
        align="end"
        sideOffset={12}
        forceMount
      >
        <DropdownMenuLabel className="p-4 pb-2">
          <div className="flex items-center gap-4">
            <Avatar className="h-14 w-14 border-2 border-blue-200 shadow-md">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-700 text-white text-lg font-semibold">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
              <Badge className="mt-1 bg-blue-50 text-blue-700 border-0 text-[10px] font-medium px-2 py-0">
                Administrateur
              </Badge>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="mx-2 bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        <div className="px-1">
          <DropdownMenuItem className="cursor-pointer rounded-xl px-3 py-2.5 text-sm font-medium hover:bg-blue-50 hover:text-blue-700 transition-colors">
            <User className="mr-3 h-4 w-4 text-blue-500" />
            Mon profil
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer rounded-xl px-3 py-2.5 text-sm font-medium hover:bg-blue-50 hover:text-blue-700 transition-colors">
            <Settings className="mr-3 h-4 w-4 text-blue-500" />
            Paramètres
          </DropdownMenuItem>
        </div>
        <DropdownMenuSeparator className="mx-2 bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        <div className="px-1">
          <DropdownMenuItem
            onClick={() => logout()}
            className="cursor-pointer rounded-xl px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
          >
            <LogOut className="mr-3 h-4 w-4" />
            Déconnexion
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// AppBar principal
export const AppBar = (props: any) => (
  <RAAppBar
    {...props}
    userMenu={false}
    sx={{
      '& .MuiToolbar-root': {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: '24px',
        paddingRight: '24px',
      },
      '& #react-admin-title': {
        display: 'none',
      },
    }}
    className="bg-gradient-to-r from-blue-800 via-blue-700 to-blue-800 text-white shadow-xl shadow-blue-900/20 border-b border-blue-700/50"
    toolbar={
      <div className="flex-1 flex items-center justify-between w-full">
        <div className="flex items-center gap-2 md:gap-3 group">
          <span className="text-xl md:text-2xl font-extrabold tracking-tight text-white drop-shadow-sm hidden sm:block">
            EventSync
          </span>
        </div>

        <div className="flex items-center gap-1 md:gap-2">
          <NotificationsMenu />
          <div className="w-px h-7 bg-gradient-to-b from-transparent via-white/20 to-transparent mx-1" />
          <CustomUserMenu />
        </div>
      </div>
    }
  />
);