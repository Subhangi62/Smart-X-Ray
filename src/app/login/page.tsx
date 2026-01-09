"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Activity, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    
    setLoading(true);
    
    // Simulate login with proper state management
    try {
      // Store user session in localStorage
      localStorage.setItem("user_session", JSON.stringify({
        email,
        username: email.split("@")[0],
        loggedIn: true,
        timestamp: Date.now()
      }));
      
      toast.success("Login successful!");
      
      // Small delay for better UX, then redirect
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 500);
      
    } catch (error) {
      toast.error("Login failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-teal-50 to-cyan-50"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{animationDelay: "2s"}}></div>
        <img 
          src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1920&h=1080&fit=crop" 
          alt="Medical Background" 
          className="absolute inset-0 w-full h-full object-cover opacity-5"
        />
      </div>
      
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg">
              <Activity className="w-8 h-8 text-white" />
            </div>
            <span className="text-2xl font-bold">Smart X-Ray System</span>
          </Link>
        </div>
        
        <Card className="shadow-2xl border-0 backdrop-blur-sm bg-white/90">
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold">Welcome back</CardTitle>
            <CardDescription className="text-base">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="doctor@hospital.com"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full medical-gradient text-white" 
                size="lg"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign in"}
              </Button>
            </form>
            
            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">Don't have an account? </span>
              <Link href="/register" className="text-primary font-medium hover:underline">
                Create account
              </Link>
            </div>
            
            <div className="mt-6 text-center">
              <Link href="/" className="text-sm text-muted-foreground hover:text-primary">
                ← Back to home
              </Link>
            </div>
          </CardContent>
        </Card>
        
        <p className="text-center text-xs text-muted-foreground mt-6">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}