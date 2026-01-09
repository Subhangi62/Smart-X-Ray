"use client";

import { useState } from "react";
import { Mail, MapPin, Phone, Send, Github, Linkedin, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toast } from "sonner";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrors({});
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        // Handle validation errors
        if (result.details) {
          const errorMap: Record<string, string> = {};
          result.details.forEach(({ field, message }: { field: string; message: string }) => {
            errorMap[field] = message;
          });
          setErrors(errorMap);
          toast.error("Please fix the errors in the form");
        } else {
          toast.error(result.error || "Failed to send message");
        }
        return;
      }

      // Success
      toast.success("Thank you! Your message has been sent to our team successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      <Header />
      
      <main className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-4">Get In Touch</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Have questions about our AI diagnostic system? We'd love to hear from you.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="w-6 h-6" />
                    Send us a Message
                  </CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll respond within 24 hours
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          type="text"
                          placeholder="Dr. John Doe"
                          value={formData.name}
                          onChange={(e) => {
                            setFormData({ ...formData, name: e.target.value });
                            if (errors.name) setErrors({ ...errors, name: "" });
                          }}
                          required
                          disabled={submitting}
                          className={errors.name ? "border-red-500" : ""}
                        />
                        {errors.name && (
                          <p className="text-sm text-red-500">{errors.name}</p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@hospital.com"
                          value={formData.email}
                          onChange={(e) => {
                            setFormData({ ...formData, email: e.target.value });
                            if (errors.email) setErrors({ ...errors, email: "" });
                          }}
                          required
                          disabled={submitting}
                          className={errors.email ? "border-red-500" : ""}
                        />
                        {errors.email && (
                          <p className="text-sm text-red-500">{errors.email}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        type="text"
                        placeholder="How can we help you?"
                        value={formData.subject}
                        onChange={(e) => {
                          setFormData({ ...formData, subject: e.target.value });
                          if (errors.subject) setErrors({ ...errors, subject: "" });
                        }}
                        required
                        disabled={submitting}
                        className={errors.subject ? "border-red-500" : ""}
                      />
                      {errors.subject && (
                        <p className="text-sm text-red-500">{errors.subject}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us more about your inquiry..."
                        rows={6}
                        value={formData.message}
                        onChange={(e) => {
                          setFormData({ ...formData, message: e.target.value });
                          if (errors.message) setErrors({ ...errors, message: "" });
                        }}
                        required
                        disabled={submitting}
                        className={errors.message ? "border-red-500" : ""}
                      />
                      {errors.message && (
                        <p className="text-sm text-red-500">{errors.message}</p>
                      )}
                    </div>
                    
                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full medical-gradient text-white"
                      disabled={submitting}
                    >
                      {submitting ? (
                        "Sending..."
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Mail className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">Email</p>
                      <a href="mailto:udithmayannagowda@gmail.com" className="text-sm text-muted-foreground hover:text-primary block">
                        udithmayannagowda@gmail.com
                      </a>
                      <a href="mailto:shivanisughnanamurthy5@gmail.com" className="text-sm text-muted-foreground hover:text-primary block">
                        shivanisughnanamurthy5@gmail.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-teal-100 rounded-lg">
                      <Phone className="w-5 h-5 text-teal-600" />
                    </div>
                    <div>
                      <p className="font-medium">Phone</p>
                      <a href="tel:+919513248434" className="text-sm text-muted-foreground hover:text-primary block">
                        +91 9513248434
                      </a>
                      <a href="tel:+919900666633" className="text-sm text-muted-foreground hover:text-primary block">
                        +91 9900666633
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-cyan-100 rounded-lg">
                      <MapPin className="w-5 h-5 text-cyan-600" />
                    </div>
                    <div>
                      <p className="font-medium">Address</p>
                      <p className="text-sm text-muted-foreground">
                        NO 578 Smart Xray centre<br />
                        80 feet road<br />
                        Bangalore-560091<br />
                        India
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg bg-gradient-to-br from-blue-600 to-teal-600 text-white">
                <CardHeader>
                  <CardTitle className="text-white">AI System Availability</CardTitle>
                  <CardDescription className="text-blue-100">
                    Our automated diagnostic system is always available
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center py-6">
                    <div className="text-center">
                      <div className="text-5xl font-bold mb-2">24/7</div>
                      <p className="text-lg">Open 24 Hours</p>
                      <p className="text-sm text-blue-100 mt-2">
                        AI-powered diagnosis available anytime
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg bg-gradient-to-br from-blue-600 to-teal-600 text-white">
                <CardHeader>
                  <CardTitle className="text-white">Connect With Us</CardTitle>
                  <CardDescription className="text-blue-100">
                    Follow our research and updates
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-3">
                    <a 
                      href="https://github.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-3 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                    >
                      <Github className="w-6 h-6" />
                    </a>
                    <a 
                      href="https://linkedin.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-3 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                    >
                      <Linkedin className="w-6 h-6" />
                    </a>
                    <a 
                      href="mailto:udithmayannagowda@gmail.com"
                      className="p-3 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                    >
                      <Mail className="w-6 h-6" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Additional Information */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <Card className="shadow-lg text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">General Inquiries</h3>
                <p className="text-sm text-muted-foreground">
                  Questions about our system, features, or pricing
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Research Collaboration</h3>
                <p className="text-sm text-muted-foreground">
                  Partner with us on medical AI research projects
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Headset className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Technical Support</h3>
                <p className="text-sm text-muted-foreground">
                  Help with technical issues or system integration
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

function Users({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );
}

function Headset({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
    </svg>
  );
}