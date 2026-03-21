import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export async function exportPdf(element) {
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: null,
  });

  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;

  // Heading
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(18);
  pdf.setTextColor(11, 45, 113); // EPAM dark blue #0B2D71
  pdf.text('ROI Analysis Report', margin, 20);

  // Date
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(12);
  pdf.setTextColor(120, 120, 120);
  pdf.text(new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }), margin, 28);

  // Image from canvas
  const imgData = canvas.toDataURL('image/png');
  const imgHeight = (canvas.height * contentWidth) / canvas.width;
  pdf.addImage(imgData, 'PNG', margin, 35, contentWidth, imgHeight);

  pdf.save('roi-report.pdf');
}
