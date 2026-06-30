import { Card, CardContent } from '../../components/ui/card';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  color: 'blue' | 'purple' | 'green' | 'orange' | 'pink' | 'indigo';
  delay?: number;
}

const colorConfig = {
  blue: {
    bg: 'bg-gradient-to-br from-blue-500 to-blue-600',
    iconBg: 'bg-blue-100 text-blue-600',
    glow: 'hover:shadow-blue-500/25',
  },
  purple: {
    bg: 'bg-gradient-to-br from-purple-500 to-purple-600',
    iconBg: 'bg-purple-100 text-purple-600',
    glow: 'hover:shadow-purple-500/25',
  },
  green: {
    bg: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
    iconBg: 'bg-emerald-100 text-emerald-600',
    glow: 'hover:shadow-emerald-500/25',
  },
  orange: {
    bg: 'bg-gradient-to-br from-orange-500 to-orange-600',
    iconBg: 'bg-orange-100 text-orange-600',
    glow: 'hover:shadow-orange-500/25',
  },
  pink: {
    bg: 'bg-gradient-to-br from-pink-500 to-pink-600',
    iconBg: 'bg-pink-100 text-pink-600',
    glow: 'hover:shadow-pink-500/25',
  },
  indigo: {
    bg: 'bg-gradient-to-br from-indigo-500 to-indigo-600',
    iconBg: 'bg-indigo-100 text-indigo-600',
    glow: 'hover:shadow-indigo-500/25',
  },
};

export const StatsCard = ({ title, value, icon: Icon, color, delay = 0 }: StatsCardProps) => {
  const config = colorConfig[color];
  return (
    <Card
      className={`shadow-md border-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${config.glow} animate-fadeInUp`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
          </div>
          <div className={`p-3 rounded-full ${config.iconBg} transition-transform duration-300 hover:scale-110`}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
        <div className="mt-2 h-1 w-full rounded-full bg-gray-100 overflow-hidden">
          <div className={`h-full w-full ${config.bg} rounded-full transition-all duration-1000 ease-in-out`} style={{ width: `${Math.min(value, 100)}%` }} />
        </div>
      </CardContent>
    </Card>
  );
};