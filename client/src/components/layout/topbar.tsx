import { useLocation } from "wouter";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu, Bell, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TopBarProps {
  onSidebarToggle: () => void;
}

const pageTitles = {
  "/": "Dashboard",
  "/dashboard": "Dashboard", 
  "/history": "History",
  "/bots": "Bots Management",
  "/testing": "Testing Environment",
  "/status": "System Status",
  "/settings": "Settings",
};

const pageDescriptions = {
  "/": "Monitor your bot performance and analytics",
  "/dashboard": "Monitor your bot performance and analytics",
  "/history": "View your bot testing history and analytics",
  "/bots": "Create, configure, and manage your bots",
  "/testing": "Run tests and monitor bot performance", 
  "/status": "Monitor system health and performance metrics",
  "/settings": "Configure your application preferences",
};

export default function TopBar({ onSidebarToggle }: TopBarProps) {
  const [location] = useLocation();
  const isMobile = useIsMobile();

  const title = pageTitles[location as keyof typeof pageTitles] || "Dashboard";
  const description = pageDescriptions[location as keyof typeof pageDescriptions] || "Monitor your bot performance and analytics";

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6" data-testid="topbar">
      <div className="flex items-center space-x-4">
        {isMobile && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onSidebarToggle}
            className="text-foreground hover:text-primary transition-colors"
            data-testid="sidebar-toggle"
          >
            <Menu className="w-5 h-5" />
          </Button>
        )}
        <div>
          <h2 className="text-lg font-semibold text-card-foreground" data-testid="page-title">
            {title}
          </h2>
          <p className="text-sm text-muted-foreground" data-testid="page-description">
            {description}
          </p>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <Button 
          variant="ghost" 
          size="sm"
          className="p-2 text-muted-foreground hover:text-primary transition-colors"
          data-testid="notifications-button"
        >
          <Bell className="w-5 h-5" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm"
          className="p-2 text-muted-foreground hover:text-primary transition-colors"
          data-testid="search-button"
        >
          <Search className="w-5 h-5" />
        </Button>
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center" data-testid="user-avatar">
          <User className="text-primary-foreground w-4 h-4" />
        </div>
      </div>
    </header>
  );
}
