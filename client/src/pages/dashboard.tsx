import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bot, FlaskConical, CheckCircle, Gauge, TrendingUp, ArrowRight, RefreshCw } from "lucide-react";
import type { Bot as BotType, Test as TestType } from "@shared/schema";

export default function Dashboard() {
  const { data: bots = [], isLoading: botsLoading } = useQuery<BotType[]>({
    queryKey: ["/api/bots"],
  });

  const { data: tests = [], isLoading: testsLoading } = useQuery<TestType[]>({
    queryKey: ["/api/tests"],
  });

  // Calculate stats
  const activeBots = bots.filter(bot => bot.status === "active").length;
  const totalTests = tests.length;
  const successfulTests = tests.filter(test => test.result === "success").length;
  const successRate = totalTests > 0 ? (successfulTests / totalTests * 100) : 0;

  // Get recent activity
  const recentTests = tests
    .sort((a, b) => new Date(b.date!).getTime() - new Date(a.date!).getTime())
    .slice(0, 3);

  const recentBots = bots.slice(0, 4);

  if (botsLoading || testsLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="hover-lift">
              <CardContent className="pt-6">
                <div className="h-20 bg-muted animate-pulse rounded" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6" data-testid="dashboard-content">
      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover-lift" data-testid="stat-active-bots">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Bots</p>
                <p className="text-2xl font-bold text-card-foreground">{activeBots}</p>
              </div>
              <div className="w-12 h-12 bg-chart-1/10 rounded-lg flex items-center justify-center">
                <Bot className="text-chart-1 w-6 h-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-sm text-chart-2">+{((activeBots / bots.length) * 100).toFixed(1)}%</span>
              <span className="text-sm text-muted-foreground ml-1">of total bots</span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift" data-testid="stat-total-tests">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Tests</p>
                <p className="text-2xl font-bold text-card-foreground">{totalTests.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-chart-2/10 rounded-lg flex items-center justify-center">
                <FlaskConical className="text-chart-2 w-6 h-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="w-4 h-4 text-chart-2 mr-1" />
              <span className="text-sm text-chart-2">Active testing</span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift" data-testid="stat-success-rate">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Success Rate</p>
                <p className="text-2xl font-bold text-card-foreground">{successRate.toFixed(1)}%</p>
              </div>
              <div className="w-12 h-12 bg-chart-2/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="text-chart-2 w-6 h-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-sm text-chart-2">{successfulTests}/{totalTests}</span>
              <span className="text-sm text-muted-foreground ml-1">successful tests</span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift" data-testid="stat-avg-response">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">System Status</p>
                <p className="text-2xl font-bold text-card-foreground">Online</p>
              </div>
              <div className="w-12 h-12 bg-chart-2/10 rounded-lg flex items-center justify-center">
                <Gauge className="text-chart-2 w-6 h-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <div className="w-2 h-2 bg-chart-2 rounded-full mr-2" />
              <span className="text-sm text-chart-2">All systems operational</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Chart */}
        <Card className="hover-lift" data-testid="performance-chart">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-card-foreground">Bot Performance</h3>
              <Button variant="ghost" size="sm" className="text-sm text-muted-foreground hover:text-primary">
                Last 7 days
              </Button>
            </div>
            <div className="chart-container h-64 rounded-lg border border-border flex items-center justify-center">
              <div className="text-center">
                <Bot className="w-12 h-12 text-muted-foreground mb-2 mx-auto" />
                <p className="text-muted-foreground font-medium">Performance Chart</p>
                <p className="text-sm text-muted-foreground">Chart visualization ready for implementation</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Test Results Distribution */}
        <Card className="hover-lift" data-testid="test-results-chart">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-card-foreground">Test Results</h3>
              <Button variant="ghost" size="sm" className="text-sm text-muted-foreground hover:text-primary">
                All Tests
              </Button>
            </div>
            <div className="chart-container h-64 rounded-lg border border-border flex items-center justify-center">
              <div className="text-center">
                <FlaskConical className="w-12 h-12 text-muted-foreground mb-2 mx-auto" />
                <p className="text-muted-foreground font-medium">Results Distribution</p>
                <p className="text-sm text-muted-foreground">Chart visualization ready for implementation</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity & Bot Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2 hover-lift" data-testid="recent-activity">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-card-foreground">Recent Activity</h3>
              <Button variant="ghost" size="sm" className="text-sm text-primary hover:text-primary/80">
                View All <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            <div className="space-y-4">
              {recentTests.length === 0 ? (
                <div className="text-center py-8">
                  <FlaskConical className="w-12 h-12 text-muted-foreground mb-2 mx-auto" />
                  <p className="text-muted-foreground">No recent test activity</p>
                  <p className="text-sm text-muted-foreground">Start running tests to see activity here</p>
                </div>
              ) : (
                recentTests.map((test) => (
                  <div 
                    key={test.id} 
                    className="flex items-center space-x-4 p-3 hover:bg-muted/50 rounded-lg transition-colors"
                    data-testid={`activity-${test.id}`}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      test.result === 'success' ? 'bg-chart-2/10' : 'bg-destructive/10'
                    }`}>
                      {test.result === 'success' ? 
                        <CheckCircle className="text-chart-2 w-5 h-5" /> :
                        <Bot className="text-destructive w-5 h-5" />
                      }
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-card-foreground">
                        Test {test.result === 'success' ? 'completed successfully' : 'failed'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Bot {test.botId} • {new Date(test.date!).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Bot Status */}
        <Card className="hover-lift" data-testid="bot-status">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-card-foreground">Bot Status</h3>
              <RefreshCw className="w-4 h-4 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
            </div>
            <div className="space-y-4">
              {recentBots.length === 0 ? (
                <div className="text-center py-8">
                  <Bot className="w-12 h-12 text-muted-foreground mb-2 mx-auto" />
                  <p className="text-muted-foreground">No bots found</p>
                  <p className="text-sm text-muted-foreground">Create your first bot to get started</p>
                </div>
              ) : (
                recentBots.map((bot) => (
                  <div 
                    key={bot.id} 
                    className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-lg transition-colors"
                    data-testid={`bot-status-${bot.id}`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${
                        bot.status === 'active' ? 'bg-chart-2' : 
                        bot.status === 'warning' ? 'bg-chart-3' : 'bg-secondary'
                      }`} />
                      <span className="text-sm font-medium text-card-foreground">{bot.name}</span>
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
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
