import { Sidebar as RASidebar, Menu, useGetIdentity, useStore } from 'react-admin';
import { Calendar, Users, MapPin, Mic, LayoutDashboard } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';

export const Sidebar = (props: any) => {
  const location = useLocation();
  const { identity, isLoading } = useGetIdentity();
  
  // Détecte l'état ouvert/fermé depuis le store officiel de React-Admin
  const [open] = useStore('sidebar.open', true);

  const getInitials = (name: string) => {
    if (!name) return 'A';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const getMenuItemSx = (path: string) => {
    const active = isActive(path);
    return {
      marginBottom: '6px',
      borderRadius: '12px',
      padding: open ? '10px 16px' : '10px 0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: open ? 'flex-start' : 'center', // Centre parfaitement l'élément quand fermé
      fontSize: '0.875rem',
      fontWeight: 500,
      width: '100%',
      color: active ? '#ffffff' : '#93c5fd',
      backgroundColor: active ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
      backdropFilter: active ? 'blur(8px)' : 'none',
      border: active ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid transparent',
      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        color: '#ffffff',
        transform: 'translateY(-1px)',
        boxShadow: active 
          ? '0 10px 15px -3px rgba(37, 99, 235, 0.3)' 
          : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        '& .RaMenuItem-icon': {
          color: '#ffffff',
          transform: 'scale(1.05)',
        }
      },
      '&:active': {
        transform: 'translateY(0px) scale(0.98)',
      },
      '& .RaMenuItem-icon': {
        color: active ? '#ffffff' : '#93c5fd',
        minWidth: open ? '32px' : '0px', // Supprime la marge forcée de MUI à gauche
        display: 'flex',
        justifyContent: 'center', // Centre l'icône Lucide à l'intérieur de son propre espace
        alignItems: 'center',
        transition: 'all 0.2s ease',
      }
    };
  };

  const user = {
    fullName: identity?.fullName || 'Administrateur',
    email: identity?.email,
    avatar: identity?.avatar || '',
  };

  return (
    <RASidebar
      {...props}
      sx={{
        '& .MuiDrawer-paper': {
          background: 'linear-gradient(180deg, #1e3a8a 0%, #1e40af 50%, #1d4ed8 100%)',
          color: '#ffffff',
          borderRight: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '10px 0 30px rgba(0, 0, 0, 0.15)',
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          overflowX: 'hidden',
        },
      }}
    >
      {/* Zone Profil Responsive : Reste centrée et s'adapte à la largeur */}
      <div className={`flex flex-col items-center justify-center border-b border-white/10 px-2 transition-all duration-300 ${open ? 'pt-8 pb-6' : 'pt-5 pb-5'}`}>
        <div className="relative group cursor-pointer flex items-center justify-center">
          {/* L'avatar réduit de taille proprement (w-16 à w-10) et reste visible */}
          <Avatar className={`border-2 border-white/30 shadow-lg transition-all duration-300 group-hover:scale-105 ${open ? 'w-16 h-16' : 'w-10 h-10'}`}>
            <AvatarImage src={user.avatar} alt={user.fullName} />
            <AvatarFallback className="bg-white/10 text-white font-semibold">
              {getInitials(user.fullName)}
            </AvatarFallback>
          </Avatar>
          <span className={`absolute bottom-0 right-0 bg-emerald-500 border-2 border-blue-800 rounded-full transition-all duration-300 ${open ? 'w-3.5 h-3.5' : 'w-2.5 h-2.5'}`}></span>
        </div>
        
        {/* Le texte disparaît en douceur uniquement lorsque la sidebar est rétractée */}
        <div className={`flex flex-col items-center transition-all duration-200 overflow-hidden ${open ? 'opacity-100 max-h-20 mt-3' : 'opacity-0 max-h-0 mt-0'}`}>
          <h2 className="font-semibold text-white tracking-wide text-sm whitespace-nowrap">
            {isLoading ? 'Chargement...' : user.fullName}
          </h2>
          <span className="text-xs text-blue-200/80 font-medium whitespace-nowrap">
            {isLoading ? '' : user.email}
          </span>
        </div>
      </div>

      <Menu 
        sx={{ 
          marginTop: '20px', 
          padding: open ? '0 12px' : '0 6px', // Réduit le conteneur pour aligner avec les bords
          transition: 'padding 0.2s ease',
          display: 'flex',
          flexDirection: 'col',
          alignItems: 'center',
          '& .MuiMenuItem-root': {
            minHeight: 'auto',
          }
        }}
      >
        <Menu.Item
          to="/"
          primaryText={open ? "Dashboard" : ""}
          leftIcon={<LayoutDashboard size={20} />}
          sx={getMenuItemSx('/')}
        />
        <Menu.Item
          to="/events"
          primaryText={open ? "Événements" : ""}
          leftIcon={<Calendar size={20} />}
          sx={getMenuItemSx('/events')}
        />
        <Menu.Item
          to="/sessions"
          primaryText={open ? "Sessions" : ""}
          leftIcon={<Mic size={20} />}
          sx={getMenuItemSx('/sessions')}
        />
        <Menu.Item
          to="/rooms"
          primaryText={open ? "Salles" : ""}
          leftIcon={<MapPin size={20} />}
          sx={getMenuItemSx('/rooms')}
        />
        <Menu.Item
          to="/speakers"
          primaryText={open ? "Intervenants" : ""}
          leftIcon={<Users size={20} />}
          sx={getMenuItemSx('/speakers')}
        />
      </Menu>
    </RASidebar>
  );
};
