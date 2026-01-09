"use client";

import Link from "next/link";
import { Activity, Mail, Github, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-blue-50 to-teal-50 border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold">Smart X-Ray System</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4 max-w-md">
              AI-powered diagnosis system for early detection of respiratory illnesses including pneumonia, tuberculosis, and COVID-19.
            </p>
            <div className="flex gap-3">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-white rounded-lg hover:bg-primary hover:text-white transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-white rounded-lg hover:bg-primary hover:text-white transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="mailto:info@smartxray.com"
                className="p-2 bg-white rounded-lg hover:bg-primary hover:text-white transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">About</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">HIPAA Compliance</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© 2024 Smart X-Ray Interpretation System. All rights reserved.</p>
          <p className="mt-1">For research and educational purposes only. Not intended for clinical diagnosis.</p>
        </div>
      </div>
    </footer>
  );
}
