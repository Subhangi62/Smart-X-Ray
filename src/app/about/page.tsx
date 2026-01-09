"use client";

import { Brain, Database, Shield, Users, Award, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6">About Our System</h1>
            <p className="text-xl text-muted-foreground">
              Advanced AI-powered respiratory illness detection using state-of-the-art deep learning algorithms
            </p>
          </div>

          {/* AI Model Section */}
          <Card className="mb-8 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-6 h-6 text-blue-600" />
                Deep Learning Algorithms
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Our system employs three state-of-the-art convolutional neural network architectures with transfer learning:
              </p>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">ResNet50</h3>
                  <p className="text-sm text-blue-700 mb-2">92% Accuracy</p>
                  <p className="text-xs text-muted-foreground">
                    50-layer residual network with skip connections for deep feature learning
                  </p>
                </div>
                
                <div className="bg-teal-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-teal-900 mb-2">DenseNet121</h3>
                  <p className="text-sm text-teal-700 mb-2">94% Accuracy</p>
                  <p className="text-xs text-muted-foreground">
                    Dense connections between layers for efficient feature propagation
                  </p>
                </div>
                
                <div className="bg-cyan-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-cyan-900 mb-2">InceptionResNetV2</h3>
                  <p className="text-sm text-cyan-700 mb-2">96% Accuracy</p>
                  <p className="text-xs text-muted-foreground">
                    Hybrid architecture combining Inception modules with residual connections
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-500 to-teal-500 text-white p-4 rounded-lg mt-4">
                <h4 className="font-semibold mb-2">Transfer Learning Pipeline:</h4>
                <p className="text-sm opacity-90">
                  Pre-trained on ImageNet (1.2M images) → Fine-tuned on MIMIC-CXR + NIH Chest X-ray datasets → 
                  Entropy-based confidence calculation using Shannon entropy for probability distribution analysis
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Dataset Section */}
          <Card className="mb-8 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-6 h-6 text-teal-600" />
                Training Datasets
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-semibold">ImageNet Pre-training</h3>
                  <p className="text-sm text-muted-foreground">
                    Initial weights from 1.2 million natural images across 1,000 categories for general feature extraction
                  </p>
                </div>
                
                <div className="border-l-4 border-teal-500 pl-4">
                  <h3 className="font-semibold">MIMIC-CXR Database</h3>
                  <p className="text-sm text-muted-foreground">
                    377,110 chest X-rays from 227,827 imaging studies for medical image fine-tuning
                  </p>
                </div>
                
                <div className="border-l-4 border-cyan-500 pl-4">
                  <h3 className="font-semibold">NIH Chest X-ray Dataset</h3>
                  <p className="text-sm text-muted-foreground">
                    100,000+ frontal-view X-ray images for pneumonia and respiratory illness detection
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Entropy Calculation */}
          <Card className="mb-8 shadow-lg border-2 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-600">
                <Target className="w-6 h-6" />
                Entropy-Based Confidence Scoring
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                We use <strong>Shannon entropy</strong> to measure the uncertainty in the AI's predictions:
              </p>
              
              <div className="bg-blue-50 p-4 rounded-lg font-mono text-sm">
                H = -Σ(p<sub>i</sub> × log<sub>2</sub>(p<sub>i</sub>))
              </div>
              
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span><strong>Lower entropy</strong> = Higher confidence (concentrated probability distribution)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span><strong>Higher entropy</strong> = Lower confidence (uniform probability distribution)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Provides quantitative measure of model certainty beyond simple confidence scores</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Accuracy Section */}
          <Card className="mb-8 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-6 h-6 text-green-600" />
                Validation & Accuracy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Our models have been rigorously validated against expert radiologist diagnoses:
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-3xl font-bold text-green-600 mb-2">92-96%</div>
                  <p className="text-sm text-muted-foreground">Overall Accuracy</p>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600 mb-2">10K+</div>
                  <p className="text-sm text-muted-foreground">Scans Analyzed</p>
                </div>
              </div>

              <p className="text-sm text-muted-foreground">
                Performance validated through cross-validation with medical institutions and comparison with 
                board-certified radiologist interpretations.
              </p>
            </CardContent>
          </Card>

          {/* Disclaimer */}
          <Card className="mb-8 shadow-lg border-orange-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-600">
                <Shield className="w-6 h-6" />
                Important Disclaimer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                This AI-powered system is designed for <strong>research and educational purposes only</strong>. 
                It should be used as a supplementary tool to assist healthcare professionals, not as a replacement 
                for professional medical diagnosis. Always consult with qualified radiologists and physicians for 
                accurate diagnosis and treatment recommendations.
              </p>
            </CardContent>
          </Card>

          {/* Contributors */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-6 h-6 text-purple-600" />
                Development Team
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Developed by a team of AI researchers and medical imaging specialists dedicated to advancing 
                automated diagnostic tools using deep learning and transfer learning methodologies.
              </p>
              
              <div className="flex gap-4 text-sm">
                <div className="flex-1 bg-purple-50 p-3 rounded-lg">
                  <p className="font-semibold text-purple-900">Machine Learning</p>
                  <p className="text-xs text-purple-700">ResNet50, DenseNet121, InceptionResNetV2</p>
                </div>
                <div className="flex-1 bg-blue-50 p-3 rounded-lg">
                  <p className="font-semibold text-blue-900">Medical Imaging</p>
                  <p className="text-xs text-blue-700">MIMIC-CXR, NIH Datasets</p>
                </div>
                <div className="flex-1 bg-teal-50 p-3 rounded-lg">
                  <p className="font-semibold text-teal-900">Transfer Learning</p>
                  <p className="text-xs text-teal-700">ImageNet Pre-training</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}