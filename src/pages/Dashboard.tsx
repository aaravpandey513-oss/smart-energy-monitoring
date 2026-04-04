import { Zap, DollarSign, Cpu, Power, TrendingDown, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Area, AreaChart,
} from "recharts";

const energyData = [
  { time: "00:00", usage: 2.1 }, { time: "04:00", usage: 1.4 },
  { time: "08:00", usage: 3.8 }, { time: "12:00", usage: 5.2 },
  { time: "16:00", usage: 4.6 }, { time: "20:00", usage: 6.1 },
  { time: "23:59", usage: 3.2 },
];

const applianceData = [
  { name: "AC", usage: 45 }, { name: "Heater", usage: 30 },
  { name: "Fridge", usage: 15 }, { name: "Washer", usage: 8 },
  { name: "Lights", usage: 5 }, { name: "TV", usage: 4 },
];

const statCards = [
  { title: "Total Usage", value: "284 kWh", change: "+12%", icon: Zap, trend: TrendingUp, color: "text-primary" },
  { title: "Est. Cost", value: "$47.20", change: "-5%", icon: DollarSign, trend: TrendingDown, color: "text-success" },
  { title: "Active Devices", value: "12", change: "+2", icon: Cpu, trend: TrendingUp, color: "text-warning" },
];

export default function Dashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Monitor your home energy in real-time</p>
        </div>
        <Button variant="destructive" className="rounded-xl gap-2 w-fit">
          <Power className="h-4 w-4" /> Turn All OFF
        </Button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {statCards.map((stat) => (
          <Card key={stat.title} className="rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <stat.trend className={`h-3 w-3 ${stat.color}`} />
                    <span className={`text-xs font-medium ${stat.color}`}>{stat.change}</span>
                  </div>
                </div>
                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">Energy Usage Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={energyData}>
                <defs>
                  <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(224, 76%, 48%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(224, 76%, 48%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="time" className="text-xs" tick={{ fill: "hsl(220, 9%, 46%)" }} />
                <YAxis className="text-xs" tick={{ fill: "hsl(220, 9%, 46%)" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "0.75rem",
                    color: "hsl(var(--foreground))",
                  }}
                />
                <Area type="monotone" dataKey="usage" stroke="hsl(224, 76%, 48%)" fill="url(#colorUsage)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">Appliance Consumption</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={applianceData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="name" className="text-xs" tick={{ fill: "hsl(220, 9%, 46%)" }} />
                <YAxis className="text-xs" tick={{ fill: "hsl(220, 9%, 46%)" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "0.75rem",
                    color: "hsl(var(--foreground))",
                  }}
                />
                <Bar dataKey="usage" fill="hsl(160, 60%, 45%)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
