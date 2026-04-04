import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, Info, Zap, Cpu } from "lucide-react";

const alerts = [
  { id: 1, type: "warning", icon: AlertTriangle, title: "High energy usage detected", desc: "Hair Straightener consumed 40% more energy than usual today.", time: "2 hours ago" },
  { id: 2, type: "danger", icon: Zap, title: "Power surge warning", desc: "A sudden spike was detected on the Bulb circuit.", time: "5 hours ago" },
  { id: 3, type: "info", icon: Cpu, title: "Device offline", desc: "Table Fan went offline.", time: "1 day ago" },
  { id: 4, type: "warning", icon: AlertTriangle, title: "Monthly budget exceeded", desc: "You've exceeded your energy budget by $12.50.", time: "2 days ago" },
  { id: 5, type: "info", icon: Info, title: "Firmware update available", desc: "Table Fan has a new firmware update ready.", time: "3 days ago" },
];

const typeStyles: Record<string, string> = {
  warning: "bg-warning/10 text-warning",
  danger: "bg-destructive/10 text-destructive",
  info: "bg-primary/10 text-primary",
};

export default function Alerts() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold">Alerts</h1>
        <p className="text-muted-foreground">{alerts.length} notifications</p>
      </div>

      <div className="space-y-3">
        {alerts.map((alert) => (
          <Card key={alert.id} className="rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex items-start gap-4">
              <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${typeStyles[alert.type]}`}>
                <alert.icon className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm">{alert.title}</h3>
                <p className="text-sm text-muted-foreground mt-0.5">{alert.desc}</p>
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap">{alert.time}</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
