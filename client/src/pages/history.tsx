import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { History } from "lucide-react";
import type { Test as TestType } from "@shared/schema";

export default function HistoryPage() {
  const { data: tests = [], isLoading } = useQuery<TestType[]>({
    queryKey: ["/api/tests"],
  });

  if (isLoading) {
    return (
      <div className="space-y-6" data-testid="history-loading">
        <Card className="hover-lift">
          <CardContent className="pt-6">
            <div className="h-32 bg-muted animate-pulse rounded" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6" data-testid="history-content">
      <Card className="hover-lift">
        <CardContent className="pt-8 pb-8">
          <div className="text-center">
            <History className="w-16 h-16 text-muted-foreground mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-card-foreground mb-2">History Page</h3>
            <p className="text-muted-foreground mb-4">View your bot testing history and analytics</p>
            {tests.length > 0 ? (
              <p className="text-sm text-muted-foreground">
                Found {tests.length} test{tests.length !== 1 ? 's' : ''} in history
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">
                No test history available
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
