import { Card, CardContent } from "@/components/ui/card";
import { FlaskConical } from "lucide-react";

export default function TestingPage() {
  return (
    <div className="space-y-6" data-testid="testing-content">
      <Card className="hover-lift">
        <CardContent className="pt-8 pb-8">
          <div className="text-center">
            <FlaskConical className="w-16 h-16 text-muted-foreground mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-card-foreground mb-2">Testing Environment</h3>
            <p className="text-muted-foreground">Run tests and monitor bot performance</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
