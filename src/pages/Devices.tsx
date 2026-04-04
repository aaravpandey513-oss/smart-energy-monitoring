import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lightbulb, Fan, Flame, Search, Power } from "lucide-react";

const initialDevices = [
  { id: 1, name: "Bulb", icon: Lightbulb, on: true, power: "0.09 kW", room: "Room 1" },
  { id: 2, name: "Hair Straightener", icon: Flame, on: true, power: "1.8 kW", room: "Room 2" },
  { id: 3, name: "Table Fan", icon: Fan, on: true, power: "0.11 kW", room: "Room 3" },
];

export default function Devices() {
  const [devices, setDevices] = useState(initialDevices);
  const [search, setSearch] = useState("");

  const toggleDevice = (id: number) => {
    setDevices((prev) =>
      prev.map((d) => (d.id === id ? { ...d, on: !d.on } : d))
    );
  };

  const filtered = devices.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold">Devices</h1>
          <p className="text-muted-foreground">{devices.filter((d) => d.on).length} of {devices.length} devices active</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search devices..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 rounded-xl bg-muted/50 border-none w-56"
            />
          </div>
          <Button
            variant="destructive"
            className="rounded-xl gap-2"
            onClick={() => setDevices((prev) => prev.map((d) => ({ ...d, on: false })))}
          >
            <Power className="h-4 w-4" /> All OFF
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((device) => (
          <Card
            key={device.id}
            className={`rounded-2xl shadow-sm hover:shadow-md transition-all ${
              device.on ? "border-primary/30" : "opacity-70"
            }`}
          >
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div className={`h-11 w-11 rounded-2xl flex items-center justify-center ${
                  device.on ? "bg-primary/10" : "bg-muted"
                }`}>
                  <device.icon className={`h-5 w-5 ${device.on ? "text-primary" : "text-muted-foreground"}`} />
                </div>
                <Switch
                  checked={device.on}
                  onCheckedChange={() => toggleDevice(device.id)}
                />
              </div>
              <h3 className="font-semibold text-sm">{device.name}</h3>
              <p className="text-xs text-muted-foreground mt-1">{device.room}</p>
              <div className="flex items-center gap-2 mt-3">
                <span className={`h-2 w-2 rounded-full ${device.on ? "bg-success animate-pulse-glow" : "bg-muted-foreground"}`} />
                <span className="text-xs text-muted-foreground">
                  {device.on ? `Active · ${device.power}` : "Inactive"}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
