import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Area } from 'recharts';

interface SessionTrendProps {
  data: { date: string; count: number }[];
}

export const SessionTrend = ({ data }: SessionTrendProps) => {
  if (data.length === 0) {
    return (
      <Card className="shadow-md border-0 animate-fadeInUp">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Tendance des sessions</CardTitle>
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
        <CardTitle className="text-lg font-semibold">📈 Tendance des sessions</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
            <XAxis dataKey="date" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip cursor={{ stroke: 'rgba(0,0,0,0.1)' }} />
            <Area type="monotone" dataKey="count" stroke="#7C3AED" fill="url(#gradient)" strokeWidth={0} />
            <Line type="monotone" dataKey="count" stroke="#7C3AED" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 8 }} />
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7C3AED" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#7C3AED" stopOpacity={0} />
              </linearGradient>
            </defs>
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};