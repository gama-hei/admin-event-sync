import { useGetList } from 'react-admin';
import { Calendar, Users, MapPin, Mic, MessageSquare } from 'lucide-react';
import { StatsCard } from './components/StatsCard';
import { EventChart } from './components/EventChart';
import { SessionTrend } from './components/SessionTrend';
import { RecentQuestions } from './components/RecentQuestions';
import { Skeleton } from '../components/ui/skeleton';

// Définition des types locaux (si les DTOs du backend ne sont pas importés)
interface Event {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  location: string;
  sessions?: any[];
}

interface Session {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  eventId: string;
  roomId?: string;
  roomName?: string;
  capacity?: number;
  questions?: Question[];
  speakers?: any[];
}

interface Question {
  id: string;
  content: string;
  authorName?: string;
  upvotes: number;
  sessionId: string;
  createdAt: string;
}

interface Room {
  id: string;
  name: string;
  capacity: number;
  location?: string;
}

interface Speaker {
  id: string;
  fullName: string;
  profilePicture?: string;
  bio?: string;
  externalLinks?: string[];
}

export const Dashboard = () => {
  const { data: events, isLoading: eventsLoading } = useGetList<Event>('events', {
    pagination: { page: 1, perPage: 1000 },
  });
  const { data: sessions, isLoading: sessionsLoading } = useGetList<Session>('sessions', {
    pagination: { page: 1, perPage: 1000 },
  });
  const { data: rooms, isLoading: roomsLoading } = useGetList<Room>('rooms', {
    pagination: { page: 1, perPage: 1000 },
  });
  const { data: speakers, isLoading: speakersLoading } = useGetList<Speaker>('speakers', {
    pagination: { page: 1, perPage: 1000 },
  });

  const isLoading = eventsLoading || sessionsLoading || roomsLoading || speakersLoading;

  const totalEvents = events?.length || 0;
  const totalSessions = sessions?.length || 0;
  const totalRooms = rooms?.length || 0;
  const totalSpeakers = speakers?.length || 0;
  const totalQuestions = sessions?.reduce((acc, s) => acc + (s.questions?.length || 0), 0) || 0;

  const eventSessionData =
    events?.map((e) => ({
      name: e.title.length > 15 ? e.title.slice(0, 15) + '…' : e.title,
      sessions: sessions?.filter((s) => s.eventId === e.id).length || 0,
    })) || [];

  const sessionTrendData = sessions?.reduce((acc, s) => {
    const date = new Date(s.startTime).toLocaleDateString('fr-FR');
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const sessionTrend = Object.entries(sessionTrendData || {}).map(([date, count]) => ({
    date,
    count: count as number,
  }));

  const recentQuestions =
    sessions
      ?.flatMap((s) => (s.questions || []).map((q) => ({ ...q, sessionTitle: s.title })))
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5) || [];

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-80 w-full" />
          <Skeleton className="h-80 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          {new Date().toLocaleDateString('fr-FR', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatsCard title="Événements" value={totalEvents} icon={Calendar} color="blue" />
        <StatsCard title="Sessions" value={totalSessions} icon={Mic} color="purple" />
        <StatsCard title="Salles" value={totalRooms} icon={MapPin} color="green" />
        <StatsCard title="Intervenants" value={totalSpeakers} icon={Users} color="orange" />
        <StatsCard title="Questions" value={totalQuestions} icon={MessageSquare} color="pink" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EventChart data={eventSessionData} />
        <SessionTrend data={sessionTrend} />
      </div>

      <RecentQuestions questions={recentQuestions} />
    </div>
  );
};