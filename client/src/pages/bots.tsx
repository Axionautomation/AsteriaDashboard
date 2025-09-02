import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Bot, 
  Plus, 
  Settings, 
  Activity, 
  Calendar,
  ChevronRight
} from "lucide-react";
import type { Bot as BotType } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import BotConfigSidebar from "@/components/bot-config-sidebar";

type BotTypes = "MCP" | "Webhook" | "Custom OpenAI";

export default function BotsPage() {
  const [showAddBot, setShowAddBot] = useState(false);
  const [selectedBotType, setSelectedBotType] = useState<BotTypes | null>(null);
  const [showConfigSidebar, setShowConfigSidebar] = useState(false);
  const queryClient = useQueryClient();

  const { data: bots = [], isLoading } = useQuery<BotType[]>({
    queryKey: ["/api/bots"],
  });

  const handleBotTypeSelect = (botType: BotTypes) => {
    setSelectedBotType(botType);
    setShowConfigSidebar(true);
    setShowAddBot(false);
  };

  const handleCloseSidebar = () => {
    setShowConfigSidebar(false);
    setSelectedBotType(null);
  };

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
    <>
      <div className="space-y-6" data-testid="bots-content">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-card-foreground">Bot Management</h1>
            <p className="text-muted-foreground">Create, configure, and manage your bots</p>
          </div>
          <div className="space-x-2">
            {!showAddBot ? (
              <Button 
                onClick={() => setShowAddBot(true)}
                className="bg-primary hover:bg-primary/90"
                data-testid="add-bot-button"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Bot
              </Button>
            ) : (
              <div className="flex items-center space-x-2">
                <Select onValueChange={handleBotTypeSelect}>
                  <SelectTrigger className="w-48" data-testid="bot-type-select">
                    <SelectValue placeholder="Select bot type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MCP">MCP</SelectItem>
                    <SelectItem value="Webhook">Webhook</SelectItem>
                    <SelectItem value="Custom OpenAI">Custom OpenAI</SelectItem>
                  </SelectContent>
                </Select>
                <Button 
                  variant="outline" 
                  onClick={() => setShowAddBot(false)}
                  data-testid="cancel-add-bot"
                >
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Bots Grid */}
        {bots.length === 0 ? (
          <Card className="hover-lift">
            <CardContent className="pt-8 pb-8">
              <div className="text-center">
                <Bot className="w-16 h-16 text-muted-foreground mb-4 mx-auto" />
                <h3 className="text-xl font-semibold text-card-foreground mb-2">No bots configured yet</h3>
                <p className="text-muted-foreground mb-4">Get started by creating your first bot</p>
                <Button 
                  onClick={() => setShowAddBot(true)}
                  className="bg-primary hover:bg-primary/90"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Bot
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bots.map((bot) => (
              <Card key={bot.id} className="hover-lift" data-testid={`bot-card-${bot.id}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold flex items-center">
                      <Bot className="w-5 h-5 mr-2 text-primary" />
                      {bot.name}
                    </CardTitle>
                    <Badge 
                      variant={bot.status === 'active' ? 'default' : 'secondary'}
                      className={`text-xs ${
                        bot.status === 'active' ? 'bg-chart-2/10 text-chart-2' :
                        bot.status === 'warning' ? 'bg-chart-3/10 text-chart-3' :
                        'bg-secondary/10 text-secondary'
                      }`}
                    >
                      {bot.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Activity className="w-4 h-4 mr-2" />
                    Type: {bot.type}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-2" />
                    Created: {bot.createdAt ? new Date(bot.createdAt).toLocaleDateString() : 'Unknown'}
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex items-center"
                      data-testid={`configure-bot-${bot.id}`}
                    >
                      <Settings className="w-4 h-4 mr-1" />
                      Configure
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="flex items-center text-muted-foreground hover:text-primary"
                      data-testid={`view-bot-${bot.id}`}
                    >
                      View Details
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Configuration Sidebar */}
      <BotConfigSidebar
        isOpen={showConfigSidebar}
        botType={selectedBotType}
        onClose={handleCloseSidebar}
      />
    </>
  );
}
