import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>

      {/* Profile */}
      <Card className="rounded-2xl shadow-sm">
        <CardHeader><CardTitle className="text-base">Profile</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xl font-bold">
              JD
            </div>
            <div>
              <p className="font-semibold">John Doe</p>
              <p className="text-sm text-muted-foreground">john@example.com</p>
            </div>
          </div>
          <Separator />
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input defaultValue="John Doe" className="rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input defaultValue="john@example.com" className="rounded-xl" />
            </div>
          </div>
          <Button className="rounded-xl">Save Changes</Button>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card className="rounded-2xl shadow-sm">
        <CardHeader><CardTitle className="text-base">Notifications</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {[
            { label: "High usage alerts", desc: "Get notified when usage exceeds threshold", default: true },
            { label: "Device offline alerts", desc: "Notifications when devices go offline", default: true },
            { label: "Weekly reports", desc: "Receive weekly energy summary via email", default: false },
            { label: "Firmware updates", desc: "Alerts for available device updates", default: true },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
              <Switch defaultChecked={item.default} />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Device Preferences */}
      <Card className="rounded-2xl shadow-sm">
        <CardHeader><CardTitle className="text-base">Device Preferences</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Monthly Energy Budget ($)</Label>
            <Input type="number" defaultValue="50" className="rounded-xl" />
          </div>
          <div className="space-y-2">
            <Label>Auto-off idle time (minutes)</Label>
            <Input type="number" defaultValue="30" className="rounded-xl" />
          </div>
          <Button className="rounded-xl">Update Preferences</Button>
        </CardContent>
      </Card>
    </div>
  );
}
