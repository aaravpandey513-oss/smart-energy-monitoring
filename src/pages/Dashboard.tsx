import { useState } from "react";
import {
  Zap, DollarSign, Clock, CheckCircle, AlertTriangle, XCircle,
  TrendingUp, Activity, Gauge, RefreshCw,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer,
} from "recharts";

/* ── static data ── */
const energyTimeline = [
  { time: "06:00", bulb: 0.3, straightener: 0.0, fan: 0.1 },
  { time: "08:00", bulb: 0.5, straightener: 1.5, fan: 0.2 },
  { time: "10:00", bulb: 0.4, straightener: 0.0, fan: 0.4 },
  { time: "12:00", bulb: 0.6, straightener: 0.0, fan: 0.5 },
  { time: "14:00", bulb: 0.5, straightener: 1.8, fan: 0.6 },
  { time: "16:00", bulb: 0.7, straightener: 0.0, fan: 0.5 },
  { time: "18:00", bulb: 1.2, straightener: 1.2, fan: 0.3 },
  { time: "20:00", bulb: 1.5, straightener: 0.0, fan: 0.2 },
];

const comparisonData = [
  { name: "Bulb", energy: 5.7 },
  { name: "Hair Straightener", energy: 4.5 },
  { name: "Table Fan", energy: 3.2 },
];

const alerts = [
  { id: 1, type: "warning" as const, message: "Hair Straightener exceeded 1.8 kW threshold", time: "14:02" },
  { id: 2, type: "danger" as const, message: "Hair Straightener fault detected: overheating", time: "12:45" },
  { id: 3, type: "warning" as const, message: "Monthly budget usage at 78%", time: "10:30" },
  { id: 4, type: "danger" as const, message: "Bulb flickering — check wiring", time: "09:15" },
];

const initialDevices = [
  {
    id: "DEV-001", name: "Bulb", status: "normal" as const,
    voltage: 230, current: 0.4, power: 92, energy: 5.7,
    on: true, autoControl: false, costPerHour: 0.01, powerFactor: 0.97,
  },
  {
    id: "DEV-002", name: "Hair Straightener", status: "warning" as const,
    voltage: 225, current: 8.0, power: 1800, energy: 4.5,
    on: true, autoControl: true, costPerHour: 0.23, powerFactor: 0.88,
  },
  {
    id: "DEV-003", name: "Table Fan", status: "normal" as const,
    voltage: 228, current: 0.5, power: 114, energy: 3.2,
    on: true, autoControl: true, costPerHour: 0.01, powerFactor: 0.95,
  },
];

/* ── tooltip style ── */
const tooltipStyle = {
  backgroundColor: "hsl(var(--card))",
  border: "1px solid hsl(var(--border))",
  borderRadius: "0.5rem",
  color: "hsl(var(--foreground))",
  fontSize: "0.75rem",
};

export default function Dashboard() {
  const [devices, setDevices] = useState(initialDevices);

  const totalPower = devices.reduce((s, d) => s + (d.on ? d.power : 0), 0);
  const totalCost = devices.reduce((s, d) => s + (d.on ? d.costPerHour : 0), 0);
  const totalRuntime = devices.filter((d) => d.on).length * 8.5;
  const budgetUsed = 78;

  const toggleDevice = (id: string) =>
    setDevices((prev) => prev.map((d) => (d.id === id ? { ...d, on: !d.on } : d)));

  const toggleAuto = (id: string) =>
    setDevices((prev) => prev.map((d) => (d.id === id ? { ...d, autoControl: !d.autoControl } : d)));

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Energy Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Real-time monitoring & control for 3 devices</p>
      </div>

      {/* ── 1. Summary Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Power", value: `${totalPower.toLocaleString()} W`, icon: Zap, accent: "text-primary" },
          { label: "Cost Today", value: `$${(totalCost * 8.5).toFixed(2)}`, icon: DollarSign, accent: "text-success" },
          { label: "Total Runtime", value: `${totalRuntime.toFixed(1)} hrs`, icon: Clock, accent: "text-muted-foreground" },
          { label: "System Status", value: "Normal", icon: CheckCircle, accent: "text-success" },
        ].map((s) => (
          <Card key={s.label} className="shadow-sm hover:shadow transition-shadow">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                <s.icon className={`h-5 w-5 ${s.accent}`} />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground truncate">{s.label}</p>
                <p className="text-lg font-bold text-foreground leading-tight">{s.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ── 2. Device Cards ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {devices.map((device) => (
          <Card key={device.id} className="shadow-sm hover:shadow transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-sm font-semibold">{device.name}</CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">{device.id}</p>
                </div>
                <Badge
                  variant={device.status === "normal" ? "secondary" : "outline"}
                  className={
                    device.status === "warning"
                      ? "border-warning text-warning bg-warning/10"
                      : "bg-success/10 text-success border-success"
                  }
                >
                  {device.status === "normal" ? "Normal" : "Warning"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Metrics */}
              <div className="grid grid-cols-2 gap-3">
                <Metric label="Voltage" value={`${device.voltage} V`} />
                <Metric label="Current" value={`${device.current} A`} />
                <div className="col-span-2 bg-primary/5 rounded-lg p-3 text-center">
                  <p className="text-xs text-muted-foreground">Power</p>
                  <p className="text-2xl font-bold text-primary">{device.on ? `${device.power} W` : "0 W"}</p>
                </div>
                <Metric label="Energy Today" value={`${device.energy} kWh`} />
                <Metric label="Power Factor" value={device.powerFactor.toFixed(2)} />
              </div>

              {/* Controls */}
              <div className="border-t pt-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Power</span>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-medium ${device.on ? "text-success" : "text-muted-foreground"}`}>
                      {device.on ? "Running" : "OFF"}
                    </span>
                    <Switch checked={device.on} onCheckedChange={() => toggleDevice(device.id)} />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Auto Control</span>
                  <Switch checked={device.autoControl} onCheckedChange={() => toggleAuto(device.id)} />
                </div>
              </div>

              {/* Insights */}
              <div className="border-t pt-3 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Cost / hr</span>
                  <span className="font-medium text-foreground">${device.on ? device.costPerHour.toFixed(2) : "0.00"}</span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Budget Used</span>
                    <span className="font-medium text-foreground">{budgetUsed}%</span>
                  </div>
                  <Progress value={budgetUsed} className="h-1.5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ── 3. Charts ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Energy Over Time (kWh)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={energyTimeline}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="time" tick={{ fontSize: 11, fill: "hsl(220,9%,46%)" }} />
                <YAxis tick={{ fontSize: 11, fill: "hsl(220,9%,46%)" }} />
                <Tooltip contentStyle={tooltipStyle} />
                <Line type="monotone" dataKey="bulb" stroke="hsl(224,76%,48%)" strokeWidth={2} dot={false} name="Bulb" />
                <Line type="monotone" dataKey="straightener" stroke="hsl(142,71%,45%)" strokeWidth={2} dot={false} name="Hair Straightener" />
                <Line type="monotone" dataKey="fan" stroke="hsl(38,92%,50%)" strokeWidth={2} dot={false} name="Table Fan" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Device Comparison (kWh Today)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={comparisonData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: "hsl(220,9%,46%)" }} />
                <YAxis tick={{ fontSize: 11, fill: "hsl(220,9%,46%)" }} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="energy" fill="hsl(224,76%,48%)" radius={[4, 4, 0, 0]} barSize={48} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* ── 4. Insights Summary + Alerts ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Insights */}
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">System Insights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <InsightRow icon={DollarSign} label="Avg Cost / hr" value={`$${(totalCost / 3).toFixed(2)}`} />
            <InsightRow icon={Gauge} label="Avg Power Factor" value="0.92" />
            <InsightRow icon={Activity} label="Peak Power" value="2,006 W" />
            <InsightRow icon={RefreshCw} label="Data Refresh" value="5 sec" />
            <div className="pt-2 space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Monthly Budget</span>
                <span className="font-medium text-foreground">{budgetUsed}%</span>
              </div>
              <Progress value={budgetUsed} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Alerts */}
        <Card className="shadow-sm lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Recent Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {alerts.map((a) => (
                <div key={a.id} className="flex items-start gap-3 p-2.5 rounded-lg bg-muted/50">
                  {a.type === "warning" ? (
                    <AlertTriangle className="h-4 w-4 text-warning shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground">{a.message}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{a.time}</p>
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      a.type === "warning"
                        ? "border-warning text-warning text-xs"
                        : "border-destructive text-destructive text-xs"
                    }
                  >
                    {a.type === "warning" ? "Warning" : "Fault"}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

/* ── small helpers ── */
function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-muted/50 rounded-lg p-2.5 text-center">
      <p className="text-[10px] text-muted-foreground uppercase tracking-wide">{label}</p>
      <p className="text-sm font-semibold text-foreground mt-0.5">{value}</p>
    </div>
  );
}

function InsightRow({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Icon className="h-3.5 w-3.5 text-muted-foreground" />
        <span className="text-xs text-muted-foreground">{label}</span>
      </div>
      <span className="text-xs font-semibold text-foreground">{value}</span>
    </div>
  );
}
