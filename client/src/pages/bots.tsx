import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
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
import { cn } from "@/lib/utils";
import { 
  Bot, 
  Plus, 
  Settings, 
  Activity, 
  Calendar,
  ChevronRight,
  Webhook,
  Brain
} from "lucide-react";
import type { Bot as BotType } from "@shared/schema";
import BotConfigSidebar from "@/components/bot-config-sidebar";

type BotTypes = "MCP" | "Webhook" | "Custom OpenAI";

export default function BotsPage() {
  const [showAddBot, setShowAddBot] = useState(false);
  const [selectedBotType, setSelectedBotType] = useState<BotTypes | null>(null);
  const [showConfigSidebar, setShowConfigSidebar] = useState(false);
  const [selectedBot, setSelectedBot] = useState<BotType | null>(null);

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

  const handleSelectBot = (bot: BotType) => {
    setSelectedBot(bot);
  };

  const getBotIcon = (type: string) => {
    switch (type) {
      case "MCP": return <Bot className="w-4 h-4" />;
      case "Webhook": return <Webhook className="w-4 h-4" />;
      case "Custom OpenAI": return <Brain className="w-4 h-4" />;
      default: return <Bot className="w-4 h-4" />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-full" data-testid="bots-loading">
        <div className="w-80 border-r border-border bg-card">
          <div className="p-6">
            <div className="h-32 bg-muted animate-pulse rounded" />
          </div>
        </div>
        <div className="flex-1 p-6">
          <div className="h-32 bg-muted animate-pulse rounded" />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex h-full" data-testid="bots-content">
        {/* Bot List Sidebar */}
        <div className="w-80 border-r border-border bg-card flex flex-col">
          {/* Add Bot Section */}
          <div className="p-6 border-b border-border">
            {!showAddBot ? (
              <Button 
                onClick={() => setShowAddBot(true)}
                className="w-full bg-primary hover:bg-primary/90"
                data-testid="add-bot-button"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Bot
              </Button>
            ) : (
              <div className="space-y-3">
                <Select onValueChange={handleBotTypeSelect}>
                  <SelectTrigger className="w-full" data-testid="bot-type-select">
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
                  className="w-full"
                  data-testid="cancel-add-bot"
                >
                  Cancel
                </Button>
              </div>
            )}
          </div>

          {/* Bot List */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4">
              <h3 className="text-sm font-medium text-muted-foreground mb-3 px-2">
                Your Bots ({bots.length})
              </h3>
              <div className="space-y-2">
                {bots.map((bot) => (
                  <button
                    key={bot.id}
                    onClick={() => handleSelectBot(bot)}
                    className={cn(
                      "w-full text-left p-3 rounded-lg border transition-colors",
                      selectedBot?.id === bot.id 
                        ? "bg-primary/10 border-primary/20" 
                        : "bg-card border-border hover:bg-muted/50"
                    )}
                    data-testid={`bot-item-${bot.id}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="text-primary">
                          {getBotIcon(bot.type)}
                        </div>
                        <span className="font-medium text-card-foreground text-sm">
                          {bot.name}
                        </span>
                      </div>
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
                    <div className="text-xs text-muted-foreground">
                      {bot.type} • {bot.createdAt ? new Date(bot.createdAt).toLocaleDateString() : 'Unknown'}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 bg-background">
          {selectedBot ? (
            <div className="p-6">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                      {getBotIcon(selectedBot.type)}
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold text-card-foreground">{selectedBot.name}</h1>
                      <p className="text-muted-foreground">{selectedBot.type} Bot</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge 
                      variant={selectedBot.status === 'active' ? 'default' : 'secondary'}
                      className={`${
                        selectedBot.status === 'active' ? 'bg-chart-2/10 text-chart-2' :
                        selectedBot.status === 'warning' ? 'bg-chart-3/10 text-chart-3' :
                        'bg-secondary/10 text-secondary'
                      }`}
                    >
                      {selectedBot.status}
                    </Badge>
                    <Button 
                      variant="outline"
                      data-testid={`configure-selected-bot`}
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Configure
                    </Button>
                  </div>
                </div>
              </div>

              {/* Bot Details Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Activity className="w-5 h-5 mr-2" />
                      Bot Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Name</label>
                      <p className="text-card-foreground">{selectedBot.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Type</label>
                      <p className="text-card-foreground">{selectedBot.type}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Status</label>
                      <p className="text-card-foreground capitalize">{selectedBot.status}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Created</label>
                      <p className="text-card-foreground">
                        {selectedBot.createdAt ? new Date(selectedBot.createdAt).toLocaleDateString() : 'Unknown'}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Settings className="w-5 h-5 mr-2" />
                      Configuration
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground text-sm">
                      Bot configuration details will be displayed here based on the bot type and settings.
                    </p>
                    <Button className="w-full" variant="outline">
                      <Settings className="w-4 h-4 mr-2" />
                      Edit Configuration
                    </Button>
                  </CardContent>
                </Card>

                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Calendar className="w-5 h-5 mr-2" />
                      Activity & Logs
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <Activity className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No recent activity to display</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Bot activity and logs will appear here once the bot starts running.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <Bot className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-card-foreground mb-2">No bot selected</h3>
                <p className="text-muted-foreground mb-6">
                  {bots.length === 0 
                    ? "Create your first bot to get started" 
                    : "Select a bot from the sidebar to view its details and configuration"
                  }
                </p>
                {bots.length === 0 && (
                  <Button 
                    onClick={() => setShowAddBot(true)}
                    className="bg-primary hover:bg-primary/90"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create Your First Bot
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
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
