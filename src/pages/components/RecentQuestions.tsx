import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Avatar, AvatarFallback } from '../../components/ui/avatar';
import { MessageSquare, ThumbsUp, Sparkles } from 'lucide-react';

interface Question {
  id: string;
  content: string;
  authorName?: string;
  upvotes: number;
  sessionTitle?: string;
  createdAt: string;
}

interface RecentQuestionsProps {
  questions: Question[];
}

export const RecentQuestions = ({ questions }: RecentQuestionsProps) => {
  const getInitials = (name?: string) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <Card className="shadow-md border-0 hover:shadow-xl transition-shadow duration-300 animate-fadeInUp">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-yellow-500" />
          Questions récentes
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {questions.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-6">Aucune question pour le moment</p>
        ) : (
          questions.map((q, index) => (
            <div
              key={q.id}
              className="flex items-start gap-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-transparent transition-all duration-200 border border-transparent hover:border-indigo-100 animate-slideInLeft"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <Avatar className="h-8 w-8 border-2 border-indigo-100">
                <AvatarFallback className="bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-700 text-xs font-semibold">
                  {getInitials(q.authorName)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-gray-900">{q.authorName || 'Anonyme'}</p>
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Sparkles className="h-3 w-3" />
                    {new Date(q.createdAt).toLocaleDateString('fr-FR')}
                  </span>
                </div>
                <p className="text-sm text-gray-700 truncate">{q.content}</p>
                <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                  <span className="flex items-center gap-1 bg-red-50 px-2 py-0.5 rounded-full text-red-600">
                    <ThumbsUp className="h-3 w-3" />
                    {q.upvotes || 0}
                  </span>
                  <span className="flex items-center gap-1 bg-blue-50 px-2 py-0.5 rounded-full text-blue-600">
                    <MessageSquare className="h-3 w-3" />
                    {q.sessionTitle || 'Session inconnue'}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};