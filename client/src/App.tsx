import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import MainLayout from "@/components/layout/main-layout";
import Dashboard from "@/pages/dashboard";
import History from "@/pages/history";
import Bots from "@/pages/bots";
import Testing from "@/pages/testing";
import Status from "@/pages/status";
import Settings from "@/pages/settings";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/history" component={History} />
      <Route path="/bots" component={Bots} />
      <Route path="/testing" component={Testing} />
      <Route path="/status" component={Status} />
      <Route path="/settings" component={Settings} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <MainLayout>
          <Router />
        </MainLayout>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
