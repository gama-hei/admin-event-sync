import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell } from 'recharts';

interface EventChartProps {
  data: { name: string; sessions: number }[];
}

const COLORS = ['#4F46E5', '#7C3AED', '#EC4899', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#EF4444'];

export const EventChart = ({ data }: EventChartProps) => {
  if (data.length === 0) {
    return (
      <Card className="shadow-md border-0 animate-fadeInUp">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Sessions par événement</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 text-sm">Aucune donnée disponible</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-md border-0 hover:shadow-xl transition-shadow duration-300 animate-fadeInUp">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">📊 Sessions par événement</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data}>
            <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip cursor={{ fill: 'rgba(0,0,0,0.05)' }} />
            <Bar dataKey="sessions" radius={[6, 6, 0, 0]}>
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};