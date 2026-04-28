import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

const doc = new PDFDocument({
  size: 'A4',
  margin: 40,
});

const outputPath = path.join(process.cwd(), 'Vitalix-Care-Presentation.pdf');
const stream = fs.createWriteStream(outputPath);

doc.pipe(stream);

// Color scheme
const colors = {
  primary: '#6366f1',      // Indigo
  secondary: '#14b8a6',    // Teal
  accent: '#f59e0b',       // Amber
  dark: '#1e293b',         // Slate-900
  light: '#f1f5f9',        // Slate-100
  error: '#ef4444',        // Red
};

// Helper functions
function addTitle(text, isMain = false) {
  if (isMain) {
    doc.fontSize(48).font('Helvetica-Bold').fillColor(colors.primary).text(text, { align: 'center' });
  } else {
    doc.fontSize(32).font('Helvetica-Bold').fillColor(colors.primary).text(text);
  }
}

function addSubtitle(text) {
  doc.fontSize(18).font('Helvetica').fillColor(colors.dark).text(text, { align: 'center' });
}

function addBodyText(text, size = 12) {
  doc.fontSize(size).font('Helvetica').fillColor(colors.dark).text(text, { align: 'left', lineGap: 8 });
}

function addBulletPoint(text) {
  doc.fontSize(12).font('Helvetica').fillColor(colors.dark);
  doc.text('• ' + text, { lineGap: 6 });
}

function addPageBreak() {
  doc.addPage();
}

function addSlideHeader(bgColor = colors.primary) {
  doc.rect(0, 0, doc.page.width, 100).fill(bgColor);
  doc.fillColor('white');
}

function addFooter(pageNumber) {
  doc.fontSize(10).font('Helvetica').fillColor(colors.light);
  doc.text(`Vitalix Care - Healthcare Management Platform | Page ${pageNumber}`, 40, doc.page.height - 30, { align: 'center' });
}

let pageNum = 1;

// SLIDE 1: Title Slide
doc.rect(0, 0, doc.page.width, doc.page.height).fill(colors.primary);
doc.fontSize(56).font('Helvetica-Bold').fillColor('white').text('VITALIX CARE', { align: 'center', lineGap: 20 }, 200);
doc.fontSize(24).font('Helvetica').fillColor('#d1d5db').text('AI-Powered Healthcare Management Platform', { align: 'center' });
doc.fontSize(14).font('Helvetica').fillColor('#9ca3af').text('Accelerated Emergency Response & Crisis Coordination', { align: 'center' }, 100);
doc.fontSize(12).font('Helvetica').fillColor('#6b7280').text('Google Solution Challenge 2026', { align: 'center' }, 100);
addFooter(pageNum++);

// SLIDE 2: Problem Statement
addPageBreak();
addSlideHeader();
doc.fontSize(36).font('Helvetica-Bold').fillColor('white').text('The Problem', 40, 30);
addFooter(pageNum++);

doc.fillColor(colors.dark);
doc.fontSize(14).font('Helvetica-Bold').text('Healthcare Accessibility Crisis:', 40, 130, { lineGap: 10 });
addBulletPoint('Emergency response coordination between patients, families, and providers is fragmented');
addBulletPoint('Patients lack real-time access to medical information during crises');
addBulletPoint('Families struggle to coordinate care for multiple dependents');
addBulletPoint('Healthcare providers need instant communication channels for rapid response');
addBulletPoint('No unified platform for crisis management and resource allocation');

// SLIDE 3: Solution Overview
addPageBreak();
addSlideHeader(colors.secondary);
doc.fontSize(36).font('Helvetica-Bold').fillColor('white').text('Our Solution', 40, 30);
addFooter(pageNum++);

doc.fillColor(colors.dark);
doc.fontSize(14).font('Helvetica-Bold').text('Vitalix Care Platform:', 40, 130, { lineGap: 10 });
addBulletPoint('Unified portal for patients, families, and healthcare providers');
addBulletPoint('Real-time emergency alert system with location sharing');
addBulletPoint('Instant telehealth and secure chat with care teams');
addBulletPoint('Comprehensive health records and appointment management');
addBulletPoint('Crisis-responsive design prioritizing emergency coordination');

// SLIDE 4: Key Features Overview
addPageBreak();
addSlideHeader();
doc.fontSize(36).font('Helvetica-Bold').fillColor('white').text('Key Features', 40, 30);
addFooter(pageNum++);

doc.fillColor(colors.dark);
const features = [
  { title: 'Patient Portal', desc: 'Health monitoring, appointments, medications, medical records access' },
  { title: 'Family Portal', desc: 'Caregiver interface for managing multiple family members' },
  { title: 'Emergency Alerts', desc: 'Instant crisis activation with location sharing and emergency contacts' },
  { title: 'Telehealth', desc: 'Multi-step appointment scheduling with video consultation support' },
  { title: 'Secure Chat', desc: 'Real-time communication with nursing staff and care teams' },
  { title: 'Resource Directory', desc: 'Hospital finder and medical resources at your fingertips' },
];

let yPosition = 130;
features.forEach((feature, i) => {
  if (i === 3) {
    addPageBreak();
    addSlideHeader();
    doc.fontSize(36).font('Helvetica-Bold').fillColor('white').text('Key Features (Continued)', 40, 30);
    yPosition = 130;
  }
  
  doc.fontSize(12).font('Helvetica-Bold').fillColor(colors.primary).text(feature.title, 40, yPosition);
  doc.fontSize(11).font('Helvetica').fillColor(colors.dark).text(feature.desc, 40, yPosition + 20, { width: 500 });
  yPosition += 70;
});
addFooter(pageNum++);

// SLIDE 5: Product Demo - Patient Portal
addPageBreak();
addSlideHeader(colors.accent);
doc.fontSize(36).font('Helvetica-Bold').fillColor('white').text('Patient Portal', 40, 30);
addFooter(pageNum++);

doc.fillColor(colors.dark);
doc.fontSize(13).font('Helvetica-Bold').text('Dashboard & Quick Access:', 40, 130);
addBulletPoint('Real-time health monitoring with alerts');
addBulletPoint('Appointment scheduling with calendar view');
addBulletPoint('Medication management and tracking');
addBulletPoint('Medical reports and lab results');
addBulletPoint('Direct access to care team via chat');
addBulletPoint('Emergency alert activation');

// SLIDE 6: Product Demo - Family Portal
addPageBreak();
addSlideHeader(colors.accent);
doc.fontSize(36).font('Helvetica-Bold').fillColor('white').text('Family Portal', 40, 30);
addFooter(pageNum++);

doc.fillColor(colors.dark);
doc.fontSize(13).font('Helvetica-Bold').text('Caregiver Features:', 40, 130);
addBulletPoint('Manage multiple family members profiles');
addBulletPoint('View family health summaries and alerts');
addBulletPoint('Coordinate appointments and medication schedules');
addBulletPoint('Emergency response coordination');
addBulletPoint('Direct communication with healthcare providers');
addBulletPoint('Billing and insurance management');

// SLIDE 7: Emergency Response System
addPageBreak();
addSlideHeader(colors.error);
doc.fontSize(36).font('Helvetica-Bold').fillColor('white').text('Crisis Response System', 40, 30);
addFooter(pageNum++);

doc.fillColor(colors.dark);
doc.fontSize(13).font('Helvetica-Bold').text('Emergency Alert Features:', 40, 130);
addBulletPoint('One-click emergency activation');
addBulletPoint('Automatic location sharing with responders');
addBulletPoint('Instant notification to care team and family');
addBulletPoint('Emergency contact prioritization');
addBulletPoint('Real-time crisis coordination interface');
addBulletPoint('Compliance with emergency response protocols');

// SLIDE 8: Technical Architecture
addPageBreak();
addSlideHeader();
doc.fontSize(36).font('Helvetica-Bold').fillColor('white').text('Technical Stack', 40, 30);
addFooter(pageNum++);

doc.fillColor(colors.dark);
const techStack = [
  { category: 'Frontend', tech: 'React, TypeScript, Tailwind CSS v4, Motion/React' },
  { category: 'Backend', tech: 'Next.js API Routes, Node.js' },
  { category: 'Visualization', tech: 'Recharts for health analytics' },
  { category: 'Icons & UI', tech: 'Lucide React icons, Material Design 3' },
  { category: 'Animations', tech: 'Motion/React for smooth transitions' },
  { category: 'Deployment', tech: 'Vercel with automatic CI/CD pipeline' },
];

yPosition = 130;
techStack.forEach((item) => {
  doc.fontSize(11).font('Helvetica-Bold').fillColor(colors.primary).text(item.category + ':', 40, yPosition);
  doc.fontSize(11).font('Helvetica').fillColor(colors.dark).text(item.tech, 150, yPosition);
  yPosition += 35;
});

// SLIDE 9: Social Impact
addPageBreak();
addSlideHeader(colors.secondary);
doc.fontSize(36).font('Helvetica-Bold').fillColor('white').text('Social Impact', 40, 30);
addFooter(pageNum++);

doc.fillColor(colors.dark);
doc.fontSize(13).font('Helvetica-Bold').text('Addressing Healthcare Equity:', 40, 130);
addBulletPoint('Improves emergency response time for underserved communities');
addBulletPoint('Reduces healthcare disparities through unified access');
addBulletPoint('Empowers patients with medical information transparency');
addBulletPoint('Supports family caregivers in crisis coordination');
addBulletPoint('Promotes preventive care and wellness monitoring');
addBulletPoint('Compliant with HIPAA and healthcare regulations');

// SLIDE 10: Scalability & Future
addPageBreak();
addSlideHeader(colors.primary);
doc.fontSize(36).font('Helvetica-Bold').fillColor('white').text('Scalability & Vision', 40, 30);
addFooter(pageNum++);

doc.fillColor(colors.dark);
doc.fontSize(13).font('Helvetica-Bold').text('Future Roadmap:', 40, 130);
addBulletPoint('Integration with hospital management systems');
addBulletPoint('AI-powered health predictions and recommendations');
addBulletPoint('Multi-language support for global healthcare');
addBulletPoint('Mobile app for iOS and Android');
addBulletPoint('Advanced analytics for healthcare providers');
addBulletPoint('Integration with insurance and billing systems');

// SLIDE 11: Deployment & Stats
addPageBreak();
addSlideHeader();
doc.fontSize(36).font('Helvetica-Bold').fillColor('white').text('Deployment & Status', 40, 30);
addFooter(pageNum++);

doc.fillColor(colors.dark);
doc.fontSize(13).font('Helvetica-Bold').text('Production Ready:', 40, 130);
addBulletPoint('✓ Deployed on Vercel with zero downtime');
addBulletPoint('✓ Automatic CI/CD pipeline from GitHub');
addBulletPoint('✓ Responsive design (mobile, tablet, desktop)');
addBulletPoint('✓ All buttons and navigation fully functional');
addBulletPoint('✓ Real-time modals and interactive features');
addBulletPoint('✓ Performance optimized with Vercel edge network');

doc.fontSize(13).font('Helvetica-Bold').fillColor(colors.secondary).text('Live URL:', 40, 360);
doc.fontSize(11).font('Helvetica').fillColor(colors.dark).text('https://vitalix-care-8o6b.vercel.app', 40, 385);

// SLIDE 12: Call to Action
addPageBreak();
addSlideHeader(colors.secondary);
doc.fontSize(48).font('Helvetica-Bold').fillColor('white').text('Thank You', 40, 150);
doc.fontSize(20).font('Helvetica').fillColor('white').text('Vitalix Care: Healthcare for Everyone', { align: 'center' }, 300);

doc.fontSize(14).font('Helvetica').fillColor('white').text('GitHub:', 40, 400);
doc.fontSize(12).font('Helvetica').fillColor('#d1d5db').text('https://github.com/kangarooccean/Vitalix-Care', 40, 420);

doc.fontSize(14).font('Helvetica').fillColor('white').text('Live Demo:', 40, 460);
doc.fontSize(12).font('Helvetica').fillColor('#d1d5db').text('https://vitalix-care-8o6b.vercel.app', 40, 480);

// Finalize PDF
doc.end();

stream.on('finish', () => {
  const fileSizeInMB = (fs.statSync(outputPath).size / (1024 * 1024)).toFixed(2);
  console.log(`✓ PDF generated successfully at: ${outputPath}`);
  console.log(`✓ File size: ${fileSizeInMB} MB`);
});

stream.on('error', (err) => {
  console.error('Error generating PDF:', err);
  process.exit(1);
});
