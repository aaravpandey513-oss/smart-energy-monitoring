import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Lightbulb, TrendingDown } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line,
} from "recharts";

const dailyData = [
  { day: "Mon", usage: 32 }, { day: "Tue", usage: 28 },
  { day: "Wed", usage: 35 }, { day: "Thu", usage: 30 },
  { day: "Fri", usage: 42 }, { day: "Sat", usage: 48 },
  { day: "Sun", usage: 38 },
];

const monthlyData = [
  { month: "Jan", usage: 280 }, { month: "Feb", usage: 250 },
  { month: "Mar", usage: 300 }, { month: "Apr", usage: 270 },
  { month: "May", usage: 320 }, { month: "Jun", usage: 380 },
];

const tips = [
  { icon: Lightbulb, text: "Switch to LED Bulbs to save up to 75% on lighting costs." },
  { icon: TrendingDown, text: "Hair Straightener runs 3h more than average — try scheduling it." },
  { icon: Lightbulb, text: "Turn off Table Fan when not in the room to reduce waste." },
];

export default function Reports() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold">Reports</h1>
          <p className="text-muted-foreground">Analyze your energy consumption patterns</p>
        </div>
        <Button className="rounded-xl gap-2 w-fit">
          <Download className="h-4 w-4" /> Download Report
        </Button>
      </div>

      <Tabs defaultValue="weekly" className="space-y-4">
        <TabsList className="rounded-xl">
          <TabsTrigger value="daily" className="rounded-lg">Daily</TabsTrigger>
          <TabsTrigger value="weekly" className="rounded-lg">Weekly</TabsTrigger>
          <TabsTrigger value="monthly" className="rounded-lg">Monthly</TabsTrigger>
        </TabsList>

        <TabsContent value="daily">
          <Card className="rounded-2xl shadow-sm">
            <CardHeader><CardTitle className="text-base">Daily Usage (kWh)</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dailyData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="day" tick={{ fill: "hsl(220,9%,46%)" }} />
                  <YAxis tick={{ fill: "hsl(220,9%,46%)" }} />
                  <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "0.75rem", color: "hsl(var(--foreground))" }} />
                  <Bar dataKey="usage" fill="hsl(224, 76%, 48%)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="weekly">
          <Card className="rounded-2xl shadow-sm">
            <CardHeader><CardTitle className="text-base">Weekly Usage (kWh)</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dailyData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="day" tick={{ fill: "hsl(220,9%,46%)" }} />
                  <YAxis tick={{ fill: "hsl(220,9%,46%)" }} />
                  <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "0.75rem", color: "hsl(var(--foreground))" }} />
                  <Bar dataKey="usage" fill="hsl(160, 60%, 45%)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monthly">
          <Card className="rounded-2xl shadow-sm">
            <CardHeader><CardTitle className="text-base">Monthly Usage (kWh)</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="month" tick={{ fill: "hsl(220,9%,46%)" }} />
                  <YAxis tick={{ fill: "hsl(220,9%,46%)" }} />
                  <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "0.75rem", color: "hsl(var(--foreground))" }} />
                  <Line type="monotone" dataKey="usage" stroke="hsl(224, 76%, 48%)" strokeWidth={2} dot={{ fill: "hsl(224, 76%, 48%)" }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Insights */}
      <Card className="rounded-2xl shadow-sm">
        <CardHeader><CardTitle className="text-base">💡 Energy-Saving Tips</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {tips.map((tip, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-muted/50">
              <tip.icon className="h-5 w-5 text-warning mt-0.5 shrink-0" />
              <p className="text-sm text-muted-foreground">{tip.text}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
