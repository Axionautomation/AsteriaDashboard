import { Card, CardContent } from "@/components/ui/card";
import { Activity } from "lucide-react";

export default function StatusPage() {
  return (
    <div className="space-y-6" data-testid="status-content">
      <Card className="hover-lift">
        <CardContent className="pt-8 pb-8">
          <div className="text-center">
            <Activity className="w-16 h-16 text-muted-foreground mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-card-foreground mb-2">System Status</h3>
            <p className="text-muted-foreground">Monitor system health and performance metrics</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
