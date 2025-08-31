import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  BarChart3, 
  History, 
  Bot, 
  FlaskConical, 
  Activity, 
  Settings,
  Rocket,
  User,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  isCollapsed: boolean;
  onClose: () => void;
  onToggleCollapse: () => void;
}

const navigationItems = [
  { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
  { href: "/history", label: "History", icon: History },
  { href: "/bots", label: "Bots", icon: Bot },
  { href: "/testing", label: "Testing", icon: FlaskConical },
  { href: "/status", label: "Status", icon: Activity },
  { href: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar({ isOpen, isCollapsed, onClose, onToggleCollapse }: SidebarProps) {
  const [location] = useLocation();
  const isMobile = useIsMobile();

  const handleNavClick = () => {
    if (isMobile) {
      onClose();
    }
  };

  return (
    <aside 
      className={cn(
        "bg-sidebar border-r border-sidebar-border flex flex-col sidebar-transition h-full",
        "md:translate-x-0 md:relative",
        isMobile ? "fixed z-30 w-72" : isCollapsed ? "w-0" : "w-72",
        isMobile && !isOpen ? "-translate-x-full" : "translate-x-0"
      )}
      data-testid="sidebar"
    >
      {/* Sidebar Header */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center justify-between">
          <div className={cn("flex items-center", isCollapsed && !isMobile ? "justify-center" : "space-x-3")}>
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Rocket className="text-primary-foreground w-5 h-5" />
            </div>
            {(!isCollapsed || isMobile) && (
              <div>
                <h1 className="text-xl font-bold text-sidebar-foreground" data-testid="app-title">
                  Asteria
                </h1>
                <p className="text-sm text-muted-foreground">Dashboard v1.0</p>
              </div>
            )}
          </div>
          {!isMobile && (
            <button
              onClick={onToggleCollapse}
              className="p-1 hover:bg-sidebar-accent rounded transition-colors"
              data-testid="sidebar-collapse-toggle"
            >
              {isCollapsed ? (
                <ChevronRight className="w-4 h-4 text-sidebar-foreground" />
              ) : (
                <ChevronLeft className="w-4 h-4 text-sidebar-foreground" />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 space-y-2" data-testid="navigation-menu">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.href || (location === "/" && item.href === "/dashboard");
          
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={handleNavClick}
              className={cn(
                "nav-item flex items-center rounded-lg text-sm font-medium transition-all",
                isCollapsed && !isMobile ? "justify-center px-4 py-3" : "space-x-3 px-4 py-3",
                isActive 
                  ? "active bg-sidebar-primary text-sidebar-primary-foreground" 
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
              data-testid={`nav-${item.label.toLowerCase()}`}
              title={isCollapsed && !isMobile ? item.label : undefined}
            >
              <Icon className="w-5 h-5" />
              {(!isCollapsed || isMobile) && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <div className={cn(
          "flex items-center p-3 bg-sidebar-accent rounded-lg",
          isCollapsed && !isMobile ? "justify-center" : "space-x-3"
        )}>
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <User className="text-primary-foreground w-4 h-4" />
          </div>
          {(!isCollapsed || isMobile) && (
            <div className="flex-1">
              <p className="text-sm font-medium text-sidebar-accent-foreground" data-testid="user-name">
                Admin User
              </p>
              <p className="text-xs text-muted-foreground" data-testid="user-email">
                admin@asteria.dev
              </p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
