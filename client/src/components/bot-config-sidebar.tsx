import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X, Save, Bot, Webhook, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertBotSchema } from "@shared/schema";

type BotTypes = "MCP" | "Webhook" | "Custom OpenAI";

interface BotConfigSidebarProps {
  isOpen: boolean;
  botType: BotTypes | null;
  onClose: () => void;
}

const configSchema = insertBotSchema.extend({
  name: z.string().min(1, "Bot name is required"),
  type: z.string().min(1, "Bot type is required"),
  // Additional fields for different bot types
  webhookUrl: z.string().url("Valid webhook URL required").optional(),
  apiKey: z.string().min(1, "API key is required").optional(),
  modelName: z.string().min(1, "Model name is required").optional(),
  mcpServerUrl: z.string().url("Valid MCP server URL required").optional(),
});

type ConfigFormData = z.infer<typeof configSchema>;

export default function BotConfigSidebar({ isOpen, botType, onClose }: BotConfigSidebarProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<ConfigFormData>({
    resolver: zodResolver(configSchema),
    defaultValues: {
      name: "",
      type: botType || "",
      status: "inactive",
    },
  });

  const createBotMutation = useMutation({
    mutationFn: async (data: ConfigFormData) => {
      const botData = {
        name: data.name,
        type: data.type,
        status: data.status,
      };
      return apiRequest("/api/bots", {
        method: "POST",
        body: JSON.stringify(botData),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/bots"] });
      toast({
        title: "Bot created successfully",
        description: `Your ${botType} bot has been configured and is ready to use.`,
      });
      handleClose();
    },
    onError: (error: any) => {
      toast({
        title: "Failed to create bot",
        description: error.message || "An error occurred while creating the bot.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = async (data: ConfigFormData) => {
    setIsSubmitting(true);
    try {
      await createBotMutation.mutateAsync(data);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const getBotIcon = () => {
    switch (botType) {
      case "MCP": return <Bot className="w-5 h-5" />;
      case "Webhook": return <Webhook className="w-5 h-5" />;
      case "Custom OpenAI": return <Brain className="w-5 h-5" />;
      default: return <Bot className="w-5 h-5" />;
    }
  };

  const getBotDescription = () => {
    switch (botType) {
      case "MCP": return "Configure Model Context Protocol integration for enhanced AI capabilities";
      case "Webhook": return "Set up webhook endpoints for real-time event processing";
      case "Custom OpenAI": return "Configure custom OpenAI model integration with specific parameters";
      default: return "Configure your bot settings";
    }
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={handleClose}
          data-testid="config-sidebar-overlay"
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed right-0 top-0 h-full w-96 bg-card border-l border-border z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
        data-testid="bot-config-sidebar"
      >
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                {getBotIcon()}
              </div>
              <div>
                <h2 className="text-lg font-semibold text-card-foreground">
                  Configure {botType} Bot
                </h2>
                <p className="text-sm text-muted-foreground">
                  Set up your new bot
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              data-testid="close-config-sidebar"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Description */}
          <div className="p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">
              {getBotDescription()}
            </p>
          </div>

          {/* Configuration Form */}
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Basic Settings */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-card-foreground">Basic Settings</h3>
              
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
                <Label htmlFor="type">Bot Type</Label>
                <Input
                  id="type"
                  value={botType || ""}
                  disabled
                  className="bg-muted"
                  data-testid="bot-type-input"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Initial Status</Label>
                <Select defaultValue="inactive" onValueChange={(value) => form.setValue("status", value)}>
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

            {/* Type-specific Configuration */}
            {botType === "Webhook" && (
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-card-foreground">Webhook Configuration</h3>
                
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
              </div>
            )}

            {botType === "Custom OpenAI" && (
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-card-foreground">OpenAI Configuration</h3>
                
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
                  <Select onValueChange={(value) => form.setValue("modelName", value)}>
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
              </div>
            )}

            {botType === "MCP" && (
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-card-foreground">MCP Configuration</h3>
                
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
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-end space-x-2 pt-6 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={isSubmitting}
                data-testid="cancel-config-button"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-primary hover:bg-primary/90"
                data-testid="save-config-button"
              >
                {isSubmitting ? (
                  "Creating..."
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Create Bot
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}