import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Bot } from "lucide-react";
import type { Bot as BotType } from "@shared/schema";

export default function BotsPage() {
  const { data: bots = [], isLoading } = useQuery<BotType[]>({
    queryKey: ["/api/bots"],
  });

  if (isLoading) {
    return (
      <div className="space-y-6" data-testid="bots-loading">
        <Card className="hover-lift">
          <CardContent className="pt-6">
            <div className="h-32 bg-muted animate-pulse rounded" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6" data-testid="bots-content">
      <Card className="hover-lift">
        <CardContent className="pt-8 pb-8">
          <div className="text-center">
            <Bot className="w-16 h-16 text-muted-foreground mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-card-foreground mb-2">Bots Management</h3>
            <p className="text-muted-foreground mb-4">Create, configure, and manage your bots</p>
            {bots.length > 0 ? (
              <p className="text-sm text-muted-foreground">
                Managing {bots.length} bot{bots.length !== 1 ? 's' : ''}
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">
                No bots configured yet
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
