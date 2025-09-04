import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle, 
  Zap, 
  Shield, 
  Bell, 
  ArrowRight, 
  Users, 
  Star,
  Github,
  BarChart3,
  Workflow,
  AlertTriangle,
  Bot
} from "lucide-react";

export default function Landing() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  return (
    <div className="asteria-landing min-h-screen">
      {/* Sticky Navigation */}
      <nav className="asteria-nav fixed top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold asteria-gradient-text">Asteria</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-sm font-medium hover:text-orange-500 transition-colors" data-testid="nav-home">Home</a>
            <a href="#how-it-works" className="text-sm font-medium hover:text-orange-500 transition-colors" data-testid="nav-how-it-works">How It Works</a>
            <a href="#plans" className="text-sm font-medium hover:text-orange-500 transition-colors" data-testid="nav-plans">Plans</a>
            <a href="#about" className="text-sm font-medium hover:text-orange-500 transition-colors" data-testid="nav-about">About</a>
          </div>
          
          <div className="flex items-center space-x-4">
            <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" className="text-sm font-medium" data-testid="button-login">
                  Log In
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Welcome Back</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Enter your email" data-testid="input-login-email" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" placeholder="Enter your password" data-testid="input-login-password" />
                  </div>
                  <Link href="/dashboard">
                    <Button className="w-full asteria-btn-primary" data-testid="button-login-submit">
                      Sign In
                    </Button>
                  </Link>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" className="flex-1" data-testid="button-login-google">
                      <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      Google
                    </Button>
                    <Button variant="outline" className="flex-1" data-testid="button-login-github">
                      <Github className="w-4 h-4 mr-2" />
                      GitHub
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={isSignupOpen} onOpenChange={setIsSignupOpen}>
              <DialogTrigger asChild>
                <Button className="asteria-btn-primary text-sm font-medium" data-testid="button-signup">
                  Sign Up
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Start Your Free Trial</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input id="signup-email" type="email" placeholder="Enter your email" data-testid="input-signup-email" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input id="signup-password" type="password" placeholder="Create a password" data-testid="input-signup-password" />
                  </div>
                  <Link href="/dashboard">
                    <Button className="w-full asteria-btn-primary" data-testid="button-signup-submit">
                      Create Account
                    </Button>
                  </Link>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" className="flex-1" data-testid="button-signup-google">
                      <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      Google
                    </Button>
                    <Button variant="outline" className="flex-1" data-testid="button-signup-github">
                      <Github className="w-4 h-4 mr-2" />
                      GitHub
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-24 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="asteria-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Predictable AI Monitoring for{" "}
              <span className="asteria-gradient-text">No-Code Workflows</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
              Asteria ensures your n8n and API automations run flawlessly. Monitor latency, 
              detect failures, and get real-time alerts — all without writing code.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Dialog open={isSignupOpen} onOpenChange={setIsSignupOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" className="asteria-btn-primary text-lg px-8 py-4" data-testid="button-hero-trial">
                    Start Free Trial
                  </Button>
                </DialogTrigger>
              </Dialog>
              <Button size="lg" variant="outline" className="asteria-btn-secondary text-lg px-8 py-4" data-testid="button-hero-plans">
                See Plans
              </Button>
            </div>
          </div>
          
          <div className="mt-16 asteria-float">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-4xl mx-auto border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold">99.9% Uptime</p>
                    <p className="text-sm text-gray-600">Reliable monitoring</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Zap className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold">Real-time Alerts</p>
                    <p className="text-sm text-gray-600">Instant notifications</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-semibold">Advanced Analytics</p>
                    <p className="text-sm text-gray-600">Deep insights</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get your workflows monitored in three simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="asteria-card p-8 text-center group" data-testid="step-connect">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Workflow className="w-10 h-10 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4">1. Connect</h3>
              <p className="text-gray-600 leading-relaxed">
                Link your n8n workflows or API endpoints. Our platform integrates seamlessly 
                with your existing automation tools.
              </p>
            </div>
            
            <div className="asteria-card p-8 text-center group" data-testid="step-monitor">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Shield className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4">2. Monitor</h3>
              <p className="text-gray-600 leading-relaxed">
                Asteria automatically analyzes every workflow run, tracking performance, 
                latency, and detecting potential issues.
              </p>
            </div>
            
            <div className="asteria-card p-8 text-center group" data-testid="step-alerts">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Bell className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4">3. Get Alerts</h3>
              <p className="text-gray-600 leading-relaxed">
                Receive real-time notifications for errors, latency spikes, or unexpected 
                outputs through your preferred channels.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="asteria-card p-6" data-testid="feature-latency">
              <CardContent>
                <div className="flex items-center space-x-3 mb-3">
                  <Zap className="w-6 h-6 text-orange-600" />
                  <h4 className="font-semibold">Latency Monitoring</h4>
                </div>
                <p className="text-gray-600 text-sm">Track response times and identify performance bottlenecks</p>
              </CardContent>
            </Card>
            
            <Card className="asteria-card p-6" data-testid="feature-diagnostics">
              <CardContent>
                <div className="flex items-center space-x-3 mb-3">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                  <h4 className="font-semibold">Failure Diagnostics</h4>
                </div>
                <p className="text-gray-600 text-sm">Get detailed insights into why your workflows fail</p>
              </CardContent>
            </Card>
            
            <Card className="asteria-card p-6" data-testid="feature-output">
              <CardContent>
                <div className="flex items-center space-x-3 mb-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <h4 className="font-semibold">Output Detection</h4>
                </div>
                <p className="text-gray-600 text-sm">Monitor for unexpected or missing outputs from your workflows</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Plans and Pricing Section */}
      <section id="plans" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Plans & Pricing</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the perfect plan for your monitoring needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="asteria-card p-8 relative" data-testid="plan-starter">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-2">Starter</h3>
                <div className="mb-6">
                  <span className="text-5xl font-bold">$10</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <div className="text-center mb-6">
                  <span className="text-3xl font-bold text-orange-600">100</span>
                  <p className="text-gray-600">workflow runs</p>
                </div>
                <ul className="space-y-3 mb-8 text-left">
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Basic monitoring</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Email alerts</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Dashboard access</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>7-day data retention</span>
                  </li>
                </ul>
                <Button className="w-full asteria-btn-primary" data-testid="button-choose-starter">
                  Choose Plan
                </Button>
              </div>
            </div>
            
            <div className="asteria-card p-8 relative border-2 border-orange-500" data-testid="plan-growth">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-orange-500 text-white px-4 py-1">Most Popular</Badge>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-2">Growth</h3>
                <div className="mb-6">
                  <span className="text-5xl font-bold">$100</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <div className="text-center mb-6">
                  <span className="text-3xl font-bold text-orange-600">1,000</span>
                  <p className="text-gray-600">workflow runs</p>
                </div>
                <ul className="space-y-3 mb-8 text-left">
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Advanced monitoring</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Multi-channel alerts</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Advanced analytics</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>30-day data retention</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Priority support</span>
                  </li>
                </ul>
                <Button className="w-full asteria-btn-primary" data-testid="button-choose-growth">
                  Choose Plan
                </Button>
              </div>
            </div>
            
            <div className="asteria-card p-8 relative" data-testid="plan-pro">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-2">Pro</h3>
                <div className="mb-6">
                  <span className="text-5xl font-bold">$500</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <div className="text-center mb-6">
                  <span className="text-3xl font-bold text-orange-600">10,000</span>
                  <p className="text-gray-600">workflow runs</p>
                </div>
                <ul className="space-y-3 mb-8 text-left">
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Enterprise monitoring</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Custom integrations</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Advanced reporting</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Unlimited data retention</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>24/7 support</span>
                  </li>
                </ul>
                <Button className="w-full asteria-btn-primary" data-testid="button-choose-pro">
                  Choose Plan
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">About Asteria</h2>
            <p className="text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Asteria makes AI monitoring scalable and reliable. Built for teams that need 
              peace of mind when automating with no-code tools.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div className="text-center opacity-60 hover:opacity-100 transition-opacity" data-testid="integration-n8n">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <Workflow className="w-12 h-12 mx-auto text-gray-600" />
                <p className="mt-2 font-semibold">n8n</p>
              </div>
            </div>
            <div className="text-center opacity-60 hover:opacity-100 transition-opacity" data-testid="integration-zapier">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <Zap className="w-12 h-12 mx-auto text-gray-600" />
                <p className="mt-2 font-semibold">Zapier</p>
              </div>
            </div>
            <div className="text-center opacity-60 hover:opacity-100 transition-opacity" data-testid="integration-api">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <BarChart3 className="w-12 h-12 mx-auto text-gray-600" />
                <p className="mt-2 font-semibold">REST API</p>
              </div>
            </div>
            <div className="text-center opacity-60 hover:opacity-100 transition-opacity" data-testid="integration-webhooks">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <Bell className="w-12 h-12 mx-auto text-gray-600" />
                <p className="mt-2 font-semibold">Webhooks</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-12 shadow-lg mb-16">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold mb-4">What Our Customers Say</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center" data-testid="testimonial-1">
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">
                  "Asteria saved us hours of debugging. We now catch issues before they affect our customers."
                </p>
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-semibold">Sarah Chen</p>
                    <p className="text-sm text-gray-600">CTO, TechFlow</p>
                  </div>
                </div>
              </div>
              
              <div className="text-center" data-testid="testimonial-2">
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">
                  "The real-time alerts are a game-changer. We're more confident in our automations than ever."
                </p>
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-semibold">Michael Rodriguez</p>
                    <p className="text-sm text-gray-600">Head of Operations, GrowthCo</p>
                  </div>
                </div>
              </div>
              
              <div className="text-center" data-testid="testimonial-3">
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">
                  "Setup took minutes, not hours. The insights we get are invaluable for our workflow optimization."
                </p>
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-semibold">Emma Thompson</p>
                    <p className="text-sm text-gray-600">Product Manager, InnovateLabs</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-6">Ready to stop guessing and start knowing?</h3>
            <Dialog open={isSignupOpen} onOpenChange={setIsSignupOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="asteria-btn-primary text-xl px-12 py-4" data-testid="button-final-signup">
                  Sign Up Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </DialogTrigger>
            </Dialog>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-bold">Asteria</span>
              </div>
              <p className="text-gray-400">
                Predictable AI monitoring for no-code workflows.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors" data-testid="footer-features">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors" data-testid="footer-pricing">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors" data-testid="footer-integrations">Integrations</a></li>
                <li><a href="#" className="hover:text-white transition-colors" data-testid="footer-api">API</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors" data-testid="footer-docs">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors" data-testid="footer-help">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors" data-testid="footer-contact">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors" data-testid="footer-status">Status</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors" data-testid="footer-privacy">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors" data-testid="footer-terms">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors" data-testid="footer-security">Security</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-400">© 2024 Asteria. All rights reserved.</p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors" data-testid="footer-twitter">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors" data-testid="footer-linkedin">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors" data-testid="footer-github">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}