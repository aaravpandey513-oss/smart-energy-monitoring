import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AirVent, Refrigerator, Tv, WashingMachine, Lightbulb, Fan,
  Heater, Speaker, Search, Power,
} from "lucide-react";

const initialDevices = [
  { id: 1, name: "Living Room AC", icon: AirVent, on: true, power: "1.2 kW", room: "Living Room" },
  { id: 2, name: "Kitchen Fridge", icon: Refrigerator, on: true, power: "0.15 kW", room: "Kitchen" },
  { id: 3, name: "Bedroom TV", icon: Tv, on: false, power: "0 kW", room: "Bedroom" },
  { id: 4, name: "Washing Machine", icon: WashingMachine, on: true, power: "0.5 kW", room: "Laundry" },
  { id: 5, name: "Hallway Lights", icon: Lightbulb, on: true, power: "0.06 kW", room: "Hallway" },
  { id: 6, name: "Office Fan", icon: Fan, on: false, power: "0 kW", room: "Office" },
  { id: 7, name: "Water Heater", icon: Heater, on: true, power: "2.0 kW", room: "Bathroom" },
  { id: 8, name: "Smart Speaker", icon: Speaker, on: true, power: "0.01 kW", room: "Living Room" },
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
