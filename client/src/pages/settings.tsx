import { Card, CardContent } from "@/components/ui/card";
import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6" data-testid="settings-content">
      <Card className="hover-lift">
        <CardContent className="pt-8 pb-8">
          <div className="text-center">
            <Settings className="w-16 h-16 text-muted-foreground mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-card-foreground mb-2">Settings</h3>
            <p className="text-muted-foreground">Configure your application preferences</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
