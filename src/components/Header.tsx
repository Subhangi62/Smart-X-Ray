"use client";

import Link from "next/link";
import { Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  
  const isActive = (path: string) => pathname === path;
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg group-hover:scale-110 transition-transform">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Smart X-Ray System</h1>
              <p className="text-xs text-muted-foreground">AI-Powered Diagnostics</p>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              href="/" 
              className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/') ? 'text-primary' : 'text-muted-foreground'}`}
            >
              Home
            </Link>
            <Link 
              href="/dashboard" 
              className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/dashboard') ? 'text-primary' : 'text-muted-foreground'}`}
            >
              Dashboard
            </Link>
            <Link 
              href="/about" 
              className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/about') ? 'text-primary' : 'text-muted-foreground'}`}
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/contact') ? 'text-primary' : 'text-muted-foreground'}`}
            >
              Contact
            </Link>
          </nav>
          
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm" className="medical-gradient text-white">
                Register
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
