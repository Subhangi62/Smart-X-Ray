"use client";

import Link from "next/link";
import { Activity, Shield, Zap, BarChart3, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-teal-50 to-white"></div>
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{animationDelay: "2s"}}></div>
          <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{animationDelay: "4s"}}></div>
        </div>
        
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-block px-4 py-2 bg-blue-100 rounded-full text-blue-700 text-sm font-medium">
                AI-Powered Medical Diagnostics
              </div>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Smart X-Ray <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600">Interpretation System</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                AI-powered diagnosis for early detection of respiratory illnesses including pneumonia, tuberculosis, and COVID-19.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/login">
                  <Button size="lg" variant="outline">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="lg" variant="ghost">
                    Register
                  </Button>
                </Link>
              </div>
              
              <div className="flex gap-8 pt-4">
                <div>
                  <div className="text-3xl font-bold text-blue-600">98%</div>
                  <div className="text-sm text-muted-foreground">Accuracy</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-teal-600">10K+</div>
                  <div className="text-sm text-muted-foreground">Scans Analyzed</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-cyan-600">24/7</div>
                  <div className="text-sm text-muted-foreground">Available</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative animate-float">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-teal-500 rounded-2xl blur-2xl opacity-20"></div>
                <img 
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/4ceeeb7b-a618-469e-beda-20eff648cec2/generated_images/professional-medical-chest-x-ray-radiogr-262ea45c-20251028065724.jpg" 
                  alt="X-Ray Scan" 
                  className="relative rounded-2xl shadow-2xl animate-pulse-glow"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose Our System?</h2>
            <p className="text-xl text-muted-foreground">Advanced AI algorithms with transfer learning for accurate respiratory illness detection</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-blue-500 transition-all hover:shadow-xl">
              <CardContent className="pt-6">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                  <Zap className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Multiple Algorithms</h3>
                <p className="text-muted-foreground">
                  Choose from ResNet50, DenseNet121, or InceptionResNetV2 with transfer learning and entropy-based confidence scoring.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-2 hover:border-teal-500 transition-all hover:shadow-xl">
              <CardContent className="pt-6">
                <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center mb-4">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Highly Accurate</h3>
                <p className="text-muted-foreground">
                  92-96% accuracy rate with transfer learning from ImageNet to medical imaging datasets.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-2 hover:border-cyan-500 transition-all hover:shadow-xl">
              <CardContent className="pt-6">
                <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center mb-4">
                  <BarChart3 className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Detailed Analysis</h3>
                <p className="text-muted-foreground">
                  Comprehensive results with Shannon entropy calculations, confidence scores, and downloadable PDF reports.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-teal-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground">Simple 3-step process for AI-powered diagnosis</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3">Upload X-Ray</h3>
              <p className="text-muted-foreground">
                Upload a chest X-ray image in JPEG or PNG format from your device.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3">AI Analysis</h3>
              <p className="text-muted-foreground">
                Our advanced AI model analyzes the image for signs of respiratory illness.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-cyan-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3">Get Results</h3>
              <p className="text-muted-foreground">
                Receive detailed diagnosis with confidence scores and downloadable reports.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Detectable Conditions */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Detectable Conditions</h2>
            <p className="text-xl text-muted-foreground">Our AI can identify various respiratory conditions</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-l-4 border-l-blue-500">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Pneumonia</h3>
                    <p className="text-sm text-muted-foreground">
                      Detects bacterial and viral pneumonia patterns in lung X-rays with high precision.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-teal-500">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-teal-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold mb-2">COVID-19</h3>
                    <p className="text-sm text-muted-foreground">
                      Identifies COVID-19 related lung abnormalities and ground-glass opacities.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-cyan-500">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-cyan-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Tuberculosis</h3>
                    <p className="text-sm text-muted-foreground">
                      Recognizes TB patterns including cavitations and infiltrates in chest radiographs.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-green-500">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Normal/Healthy</h3>
                    <p className="text-sm text-muted-foreground">
                      Validates healthy lung patterns and provides peace of mind with clear results.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-600 to-teal-600 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of healthcare professionals using our AI-powered diagnostic system.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" variant="secondary" className="text-blue-600">
                Create Free Account
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}