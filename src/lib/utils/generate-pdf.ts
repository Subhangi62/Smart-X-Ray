import { jsPDF } from "jspdf";

interface ScanData {
  id: number;
  patientName: string;
  firstName?: string | null;
  lastName?: string | null;
  age?: number | null;
  address?: string | null;
  contactNumber?: string | null;
  patientEmail?: string | null;
  scanImageUrl: string;
  prediction: string;
  confidence: number;
  status: string;
  details: string;
  scoresJson: string;
  aiModel: string;
  processingTime: number;
  imageQuality: string;
  dataset: string;
  scanDate: string;
  entropy?: number;
  modelAccuracy?: number;
}

// Helper function to convert image URL to base64
async function getImageBase64(url: string): Promise<string> {
  try {
    console.log("Fetching image from URL:", url);
    const response = await fetch(url, {
      mode: 'cors',
      cache: 'no-cache'
    });
    
    if (!response.ok) {
      console.error("Failed to fetch image:", response.status, response.statusText);
      return "";
    }
    
    const blob = await response.blob();
    console.log("Image blob received, size:", blob.size);
    
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log("Image converted to base64 successfully");
        resolve(reader.result as string);
      };
      reader.onerror = (error) => {
        console.error("FileReader error:", error);
        reject(error);
      };
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error("Error loading image:", error);
    return "";
  }
}

export async function generatePDFReport(scanData: ScanData): Promise<void> {
  console.log("=== PDF GENERATION STARTED ===");
  console.log("Patient:", scanData.patientName);
  
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  let yPosition = 20;

  try {
    // Header - Title
    doc.setFontSize(22);
    doc.setTextColor(37, 99, 235);
    doc.text("Smart X-Ray Interpretation System", pageWidth / 2, yPosition, { align: "center" });
    
    yPosition += 10;
    doc.setFontSize(16);
    doc.text("Medical Diagnostic Report", pageWidth / 2, yPosition, { align: "center" });
    
    yPosition += 5;
    doc.setDrawColor(37, 99, 235);
    doc.setLineWidth(0.5);
    doc.line(20, yPosition, pageWidth - 20, yPosition);
    yPosition += 10;

    // Patient Information Section
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.setFont(undefined, "bold");
    doc.text("Patient Information", 20, yPosition);
    yPosition += 8;
    
    doc.setFontSize(11);
    doc.setFont(undefined, "normal");
    
    const patientInfo = [
      { label: "Name:", value: scanData.patientName },
      { label: "Age:", value: scanData.age ? `${scanData.age} years` : "Not provided" },
      { label: "Contact:", value: scanData.contactNumber || "Not provided" },
      { label: "Email:", value: scanData.patientEmail || "Not provided" },
      { label: "Address:", value: scanData.address || "Not provided" }
    ];

    patientInfo.forEach(info => {
      doc.setFont(undefined, "bold");
      doc.text(info.label, 20, yPosition);
      doc.setFont(undefined, "normal");
      doc.text(info.value, 50, yPosition);
      yPosition += 6;
    });
    yPosition += 5;

    // Scan Information Section
    doc.setFontSize(14);
    doc.setFont(undefined, "bold");
    doc.text("Scan Information", 20, yPosition);
    yPosition += 8;
    
    doc.setFontSize(11);
    doc.setFont(undefined, "normal");
    
    const scanInfo = [
      { label: "Scan ID:", value: `XR-${new Date(scanData.scanDate).getFullYear()}-${String(new Date(scanData.scanDate).getMonth() + 1).padStart(2, '0')}${String(new Date(scanData.scanDate).getDate()).padStart(2, '0')}-${scanData.id}` },
      { label: "Scan Date:", value: new Date(scanData.scanDate).toLocaleString() },
      { label: "AI Model:", value: scanData.aiModel },
      { label: "Processing Time:", value: `${scanData.processingTime.toFixed(2)} seconds` },
      { label: "Image Quality:", value: scanData.imageQuality },
      { label: "Dataset:", value: scanData.dataset }
    ];

    scanInfo.forEach(info => {
      doc.setFont(undefined, "bold");
      doc.text(info.label, 20, yPosition);
      doc.setFont(undefined, "normal");
      const lines = doc.splitTextToSize(info.value, pageWidth - 70);
      doc.text(lines, 60, yPosition);
      yPosition += 6 * lines.length;
    });
    yPosition += 5;

    // Diagnosis Section
    doc.setFontSize(14);
    doc.setFont(undefined, "bold");
    doc.text("Diagnosis Result", 20, yPosition);
    yPosition += 8;
    
    doc.setFontSize(12);
    const statusColor = scanData.status === "success" ? [34, 197, 94] : [249, 115, 22];
    doc.setFillColor(statusColor[0], statusColor[1], statusColor[2]);
    doc.roundedRect(20, yPosition - 4, 40, 8, 2, 2, "F");
    doc.setTextColor(255, 255, 255);
    doc.text(scanData.prediction, 40, yPosition + 1, { align: "center" });
    
    doc.setTextColor(0, 0, 0);
    doc.setFont(undefined, "bold");
    doc.text(`Confidence: ${scanData.confidence}%`, 70, yPosition + 1);
    yPosition += 12;

    doc.setFontSize(11);
    doc.setFont(undefined, "normal");
    const detailLines = doc.splitTextToSize(scanData.details, pageWidth - 40);
    doc.text(detailLines, 20, yPosition);
    yPosition += 6 * detailLines.length + 5;

    // Confidence Scores Section
    if (yPosition > pageHeight - 80) {
      doc.addPage();
      yPosition = 20;
    }

    doc.setFontSize(14);
    doc.setFont(undefined, "bold");
    doc.text("Confidence Scores", 20, yPosition);
    yPosition += 8;
    
    doc.setFontSize(11);
    const scores = JSON.parse(scanData.scoresJson);
    const scoreLabels = {
      covid19: "COVID-19",
      tb: "Tuberculosis (TB)",
      pneumonia: "Pneumonia",
      normal: "Normal",
      emphysema: "Emphysema",
      lungCancer: "Lung Cancer"
    };

    Object.entries(scores).forEach(([key, value]) => {
      const label = scoreLabels[key as keyof typeof scoreLabels];
      const score = Number(value);
      
      doc.setFont(undefined, "normal");
      doc.text(`${label}:`, 20, yPosition);
      doc.text(`${score.toFixed(2)}%`, 80, yPosition);
      
      const barWidth = 80;
      const barHeight = 4;
      const filledWidth = (score / 100) * barWidth;
      
      doc.setDrawColor(200, 200, 200);
      doc.setLineWidth(0.5);
      doc.rect(100, yPosition - 3, barWidth, barHeight);
      
      let barColor = [34, 197, 94];
      if (key === 'covid19' && score > 50) barColor = [239, 68, 68];
      if (key === 'tb' && score > 50) barColor = [168, 85, 247];
      if (key === 'pneumonia' && score > 50) barColor = [249, 115, 22];
      if (key === 'emphysema' && score > 50) barColor = [234, 179, 8];
      if (key === 'lungCancer' && score > 50) barColor = [220, 38, 38];
      
      doc.setFillColor(barColor[0], barColor[1], barColor[2]);
      doc.rect(100, yPosition - 3, filledWidth, barHeight, "F");
      yPosition += 8;
    });
    yPosition += 10;

    // X-Ray Image Section
    if (yPosition > pageHeight - 100) {
      doc.addPage();
      yPosition = 20;
    }

    doc.setFontSize(14);
    doc.setFont(undefined, "bold");
    doc.text("Chest X-Ray Image", 20, yPosition);
    yPosition += 8;
    
    // Try to load and embed the X-ray image
    try {
      console.log("Loading X-ray image for PDF...");
      const imageLoadPromise = getImageBase64(scanData.scanImageUrl);
      const timeoutPromise = new Promise<string>((_, reject) => 
        setTimeout(() => reject(new Error("Image load timeout")), 10000)
      );
      
      const imageData = await Promise.race([imageLoadPromise, timeoutPromise]);
      
      if (imageData && imageData.length > 100) {
        const imgWidth = 120;
        const imgHeight = 120;
        const xPos = (pageWidth - imgWidth) / 2;
        
        doc.setDrawColor(37, 99, 235);
        doc.setLineWidth(1);
        doc.rect(xPos - 2, yPosition - 2, imgWidth + 4, imgHeight + 4);
        doc.addImage(imageData, "JPEG", xPos, yPosition, imgWidth, imgHeight);
        console.log("✓ X-ray image embedded successfully");
        yPosition += imgHeight + 10;
      } else {
        throw new Error("Invalid image data");
      }
    } catch (imageError) {
      console.warn("Could not embed X-ray image:", imageError);
      doc.setFontSize(10);
      doc.setTextColor(128, 128, 128);
      doc.text("X-ray image preview not available in PDF", pageWidth / 2, yPosition, { align: "center" });
      doc.text("(View full image on the website)", pageWidth / 2, yPosition + 5, { align: "center" });
      yPosition += 15;
      doc.setTextColor(0, 0, 0);
    }

    // AI Model Details
    if (yPosition > pageHeight - 50) {
      doc.addPage();
      yPosition = 20;
    }

    doc.setFontSize(14);
    doc.setFont(undefined, "bold");
    doc.text("AI Model Details", 20, yPosition);
    yPosition += 8;
    
    doc.setFontSize(11);
    doc.setFont(undefined, "normal");
    
    if (scanData.entropy) {
      doc.text(`Shannon Entropy (H): ${scanData.entropy}`, 20, yPosition);
      yPosition += 6;
      doc.setFontSize(9);
      doc.setTextColor(100, 100, 100);
      doc.text("(Lower entropy indicates higher confidence in the primary diagnosis)", 20, yPosition);
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(11);
      yPosition += 8;
    }
    
    if (scanData.modelAccuracy) {
      doc.text(`Model Accuracy: ${(scanData.modelAccuracy * 100).toFixed(0)}%`, 20, yPosition);
      yPosition += 6;
    }
    
    doc.text("Transfer Learning: ImageNet → Medical Datasets", 20, yPosition);
    yPosition += 10;

    // Recommendations
    if (yPosition > pageHeight - 50) {
      doc.addPage();
      yPosition = 20;
    }

    doc.setFontSize(14);
    doc.setFont(undefined, "bold");
    doc.text("Clinical Recommendations", 20, yPosition);
    yPosition += 8;
    
    doc.setFontSize(10);
    doc.setFont(undefined, "normal");
    
    const recommendations = scanData.status === "success" 
      ? [
          "• Maintain regular health checkups",
          "• Continue preventive care measures",
          "• Schedule annual chest X-ray screening",
          "• Follow up with primary care physician as needed"
        ]
      : [
          "• Consult with a pulmonologist immediately",
          "• Consider follow-up imaging in 2-3 weeks",
          "• Complete blood count and cultures recommended",
          "• Monitor symptoms closely",
          "• Seek immediate care if symptoms worsen"
        ];
    
    recommendations.forEach(rec => {
      doc.text(rec, 20, yPosition);
      yPosition += 6;
    });
    yPosition += 5;

    // Medical Disclaimer
    if (yPosition > pageHeight - 40) {
      doc.addPage();
      yPosition = 20;
    }

    doc.setFillColor(254, 243, 199);
    doc.roundedRect(15, yPosition - 5, pageWidth - 30, 35, 2, 2, "F");
    
    doc.setFontSize(10);
    doc.setFont(undefined, "bold");
    doc.setTextColor(146, 64, 14);
    doc.text("⚠ Medical Disclaimer", 20, yPosition);
    yPosition += 6;
    
    doc.setFont(undefined, "normal");
    doc.setFontSize(9);
    const disclaimerText = "This AI-assisted analysis is for research and educational purposes only. It should not be used as the sole basis for medical diagnosis or treatment decisions. Always consult with qualified healthcare professionals and radiologists for proper medical evaluation and diagnosis.";
    const disclaimerLines = doc.splitTextToSize(disclaimerText, pageWidth - 50);
    doc.text(disclaimerLines, 20, yPosition);
    yPosition += 30;

    // Footer
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.text("Smart X-Ray Interpretation System | AI-Powered Medical Diagnostics", pageWidth / 2, pageHeight - 10, { align: "center" });
    doc.text(`Report Generated: ${new Date().toLocaleString()}`, pageWidth / 2, pageHeight - 5, { align: "center" });

    console.log("=== PDF CONTENT CREATED SUCCESSFULLY ===");
  } catch (contentError) {
    console.error("Error creating PDF content:", contentError);
    throw new Error(`Failed to create PDF content: ${contentError}`);
  }

  // ALWAYS save the PDF, even if there were image loading issues
  try {
    const fileName = `Medical_Report_${scanData.patientName.replace(/\s+/g, '_')}_${Date.now()}.pdf`;
    console.log("Initiating PDF download:", fileName);
    
    // Save the PDF - this triggers the browser download
    doc.save(fileName);
    
    console.log("=== PDF DOWNLOAD TRIGGERED SUCCESSFULLY ===");
    console.log("Check your browser's Downloads folder for:", fileName);
  } catch (saveError) {
    console.error("Error saving PDF:", saveError);
    throw new Error(`Failed to save PDF: ${saveError}`);
  }
}