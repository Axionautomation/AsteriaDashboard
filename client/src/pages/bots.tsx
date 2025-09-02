import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  Brain,
  Save,
  Upload
} from "lucide-react";
import type { Bot as BotType } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { insertBotSchema } from "@shared/schema";

type BotTypes = "MCP" | "Webhook" | "Custom OpenAI";

export default function BotsPage() {
  const [showAddBot, setShowAddBot] = useState(false);
  const [selectedBot, setSelectedBot] = useState<BotType | null>(null);
  const [isCreatingBot, setIsCreatingBot] = useState(false);
  
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: bots = [], isLoading } = useQuery<BotType[]>({
    queryKey: ["/api/bots"],
  });

  const createBotMutation = useMutation({
    mutationFn: async (botType: BotTypes) => {
      const botData = {
        name: `New ${botType} Bot`,
        type: botType,
        status: "inactive" as const,
      };
      const response = await apiRequest("POST", "/api/bots", botData);
      return await response.json();
    },
    onSuccess: (newBot) => {
      queryClient.invalidateQueries({ queryKey: ["/api/bots"] });
      setSelectedBot(newBot);
      setShowAddBot(false);
      toast({
        title: "Bot created successfully",
        description: `Your ${newBot.type} bot has been created and is ready to configure.`,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to create bot",
        description: error.message || "An error occurred while creating the bot.",
        variant: "destructive",
      });
    },
  });

  const handleBotTypeSelect = async (botType: BotTypes) => {
    setIsCreatingBot(true);
    try {
      await createBotMutation.mutateAsync(botType);
    } finally {
      setIsCreatingBot(false);
    }
  };

  const handleSelectBot = (bot: BotType) => {
    setSelectedBot(bot);
  };

  const configSchema = insertBotSchema.extend({
    name: z.string().min(1, "Bot name is required"),
    type: z.string().min(1, "Bot type is required"),
    webhookUrl: z.string().url("Valid webhook URL required").optional(),
    apiKey: z.string().min(1, "API key is required").optional(),
    modelName: z.string().min(1, "Model name is required").optional(),
    mcpServerUrl: z.string().url("Valid MCP server URL required").optional(),
  });

  type ConfigFormData = z.infer<typeof configSchema>;

  const form = useForm<ConfigFormData>({
    resolver: zodResolver(configSchema),
    defaultValues: {
      name: selectedBot?.name || "",
      type: selectedBot?.type || "",
      status: selectedBot?.status || "inactive",
    },
  });

  // Reset form when selectedBot changes
  useEffect(() => {
    if (selectedBot) {
      form.reset({
        name: selectedBot.name,
        type: selectedBot.type,
        status: selectedBot.status,
      });
    }
  }, [selectedBot, form]);

  const updateBotMutation = useMutation({
    mutationFn: async (data: ConfigFormData) => {
      if (!selectedBot) return;
      const response = await apiRequest("PATCH", `/api/bots/${selectedBot.id}`, data);
      return await response.json();
    },
    onSuccess: (updatedBot) => {
      queryClient.invalidateQueries({ queryKey: ["/api/bots"] });
      setSelectedBot(updatedBot);
      toast({
        title: "Bot published successfully",
        description: "Your bot configuration has been saved and published.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to publish bot",
        description: error.message || "An error occurred while publishing the bot.",
        variant: "destructive",
      });
    },
  });

  const onPublish = async (data: ConfigFormData) => {
    await updateBotMutation.mutateAsync(data);
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
                <Select onValueChange={handleBotTypeSelect} disabled={isCreatingBot}>
                  <SelectTrigger className="w-full" data-testid="bot-type-select">
                    <SelectValue placeholder={isCreatingBot ? "Creating bot..." : "Select bot type"} />
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
                  disabled={isCreatingBot}
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
              {/* Header with Publish Button */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                    {getBotIcon(selectedBot.type)}
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-card-foreground">{selectedBot.name}</h1>
                    <p className="text-muted-foreground">{selectedBot.type} Bot Configuration</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
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
                    onClick={form.handleSubmit(onPublish)}
                    disabled={updateBotMutation.isPending}
                    className="bg-primary hover:bg-primary/90"
                    data-testid="publish-bot-button"
                  >
                    {updateBotMutation.isPending ? (
                      "Publishing..."
                    ) : (
                      <>
                        <Upload className="w-4 h-4 mr-2" />
                        Publish
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* Configuration Form */}
              <form onSubmit={form.handleSubmit(onPublish)} className="space-y-6">
                {/* Basic Settings */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Settings className="w-5 h-5 mr-2" />
                      Basic Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Bot Name</Label>
                        <Input
                          id="name"
                          {...form.register("name")}
                          placeholder="Enter bot name"
                          data-testid="bot-name-input"
                        />
                        {form.formState.errors.name && (
                          <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="status">Status</Label>
                        <Select 
                          value={form.watch("status")} 
                          onValueChange={(value) => form.setValue("status", value)}
                        >
                          <SelectTrigger data-testid="bot-status-select">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="inactive">Inactive</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="type">Bot Type</Label>
                      <Input
                        id="type"
                        value={selectedBot.type}
                        disabled
                        className="bg-muted"
                        data-testid="bot-type-input"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Type-specific Configuration */}
                {selectedBot.type === "Webhook" && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center">
                        <Webhook className="w-5 h-5 mr-2" />
                        Webhook Configuration
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="webhookUrl">Webhook URL</Label>
                        <Input
                          id="webhookUrl"
                          {...form.register("webhookUrl")}
                          placeholder="https://your-webhook-endpoint.com"
                          data-testid="webhook-url-input"
                        />
                        {form.formState.errors.webhookUrl && (
                          <p className="text-sm text-destructive">{form.formState.errors.webhookUrl.message}</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {selectedBot.type === "Custom OpenAI" && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center">
                        <Brain className="w-5 h-5 mr-2" />
                        OpenAI Configuration
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="apiKey">API Key</Label>
                        <Input
                          id="apiKey"
                          type="password"
                          {...form.register("apiKey")}
                          placeholder="sk-..."
                          data-testid="openai-api-key-input"
                        />
                        {form.formState.errors.apiKey && (
                          <p className="text-sm text-destructive">{form.formState.errors.apiKey.message}</p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="modelName">Model Name</Label>
                        <Select 
                          value={form.watch("modelName") || ""} 
                          onValueChange={(value) => form.setValue("modelName", value)}
                        >
                          <SelectTrigger data-testid="openai-model-select">
                            <SelectValue placeholder="Select model" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="gpt-4">GPT-4</SelectItem>
                            <SelectItem value="gpt-4-turbo">GPT-4 Turbo</SelectItem>
                            <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                          </SelectContent>
                        </Select>
                        {form.formState.errors.modelName && (
                          <p className="text-sm text-destructive">{form.formState.errors.modelName.message}</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {selectedBot.type === "MCP" && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center">
                        <Bot className="w-5 h-5 mr-2" />
                        MCP Configuration
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="mcpServerUrl">MCP Server URL</Label>
                        <Input
                          id="mcpServerUrl"
                          {...form.register("mcpServerUrl")}
                          placeholder="https://your-mcp-server.com"
                          data-testid="mcp-server-url-input"
                        />
                        {form.formState.errors.mcpServerUrl && (
                          <p className="text-sm text-destructive">{form.formState.errors.mcpServerUrl.message}</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </form>
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
    </>
  );
}
