export interface CertificateData {
  name: string;
  wpm: number;
  accuracy: number;
  date: string;
  testMode?: string;
  certificateId?: string;
}

export function generateCertificateCanvas(data: CertificateData): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  // High-DPI resolution for print-ready crisp rendering
  const width = 1600;
  const height = 1100;
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  // 1. Background gradient (rich dark blue / midnight blue luxury palette)
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, '#0a1226');
  bgGrad.addColorStop(0.5, '#0f1d3d');
  bgGrad.addColorStop(1, '#080d1a');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Subtle decorative geometric background pattern
  ctx.strokeStyle = 'rgba(59, 130, 246, 0.05)';
  ctx.lineWidth = 1.5;
  for (let i = 0; i < width; i += 60) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i + 400, height);
    ctx.stroke();
  }

  // 2. Ornate outer border with gold and cyan gradients
  ctx.lineWidth = 6;
  const borderGrad = ctx.createLinearGradient(0, 0, width, height);
  borderGrad.addColorStop(0, '#38bdf8');
  borderGrad.addColorStop(0.5, '#fbbf24');
  borderGrad.addColorStop(1, '#3b82f6');
  ctx.strokeStyle = borderGrad;
  ctx.strokeRect(50, 50, width - 100, height - 100);

  // Inner border
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'rgba(251, 191, 36, 0.4)';
  ctx.strokeRect(65, 65, width - 130, height - 130);

  // Corner decorative flourishes
  const drawCorner = (x: number, y: number, angle: number) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(40, 0);
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 40);
    ctx.stroke();
    // Inner diamond
    ctx.fillStyle = '#38bdf8';
    ctx.beginPath();
    ctx.arc(14, 14, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  drawCorner(75, 75, 0);
  drawCorner(width - 75, 75, Math.PI / 2);
  drawCorner(width - 75, height - 75, Math.PI);
  drawCorner(75, height - 75, (3 * Math.PI) / 2);

  // 3. Header branding & Badge
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Small tracking label
  ctx.fillStyle = '#94a3b8';
  ctx.font = '600 20px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('TYPING TIP GLOBAL TYPING PROFICIENCY', width / 2, 160);

  // Main Title
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 56px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('CERTIFICATE OF ACHIEVEMENT', width / 2, 230);

  // Subtitle
  ctx.fillStyle = '#38bdf8';
  ctx.font = '500 22px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('THIS IS TO OFFICIALLY CERTIFY THAT', width / 2, 310);

  // Recipient Name
  const recipientName = data.name.trim() || 'Valued Typist';
  ctx.fillStyle = '#fbbf24';
  ctx.font = 'bold 64px "Plus Jakarta Sans", Georgia, serif';
  ctx.fillText(recipientName, width / 2, 400);

  // Underline for name
  ctx.strokeStyle = 'rgba(251, 191, 36, 0.4)';
  ctx.lineWidth = 2;
  const nameWidth = ctx.measureText(recipientName).width;
  ctx.beginPath();
  ctx.moveTo(width / 2 - Math.max(nameWidth / 2 + 60, 260), 450);
  ctx.lineTo(width / 2 + Math.max(nameWidth / 2 + 60, 260), 450);
  ctx.stroke();

  // Achievement narrative text
  ctx.fillStyle = '#cbd5e1';
  ctx.font = '400 22px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(
    'has successfully completed the Typing Tip Professional Speed & Accuracy Assessment,',
    width / 2,
    510
  );
  ctx.fillText(
    'demonstrating outstanding keyboard control, rhythm, and touch typing proficiency.',
    width / 2,
    546
  );

  // 4. Metric display cards (WPM and Accuracy)
  const drawStatCard = (centerX: number, centerY: number, label: string, value: string, color: string) => {
    const cardW = 280;
    const cardH = 150;
    const left = centerX - cardW / 2;
    const top = centerY - cardH / 2;

    // Card background
    ctx.fillStyle = 'rgba(15, 29, 61, 0.85)';
    ctx.strokeStyle = 'rgba(59, 130, 246, 0.4)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(left, top, cardW, cardH, 16);
    ctx.fill();
    ctx.stroke();

    // Value
    ctx.fillStyle = color;
    ctx.font = 'bold 54px "JetBrains Mono", "Plus Jakarta Sans", monospace';
    ctx.fillText(value, centerX, centerY - 14);

    // Label
    ctx.fillStyle = '#94a3b8';
    ctx.font = '600 18px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(label, centerX, centerY + 38);
  };

  drawStatCard(width / 2 - 200, 680, 'NET SPEED', `${data.wpm} WPM`, '#38bdf8');
  drawStatCard(width / 2 + 200, 680, 'ACCURACY', `${data.accuracy}%`, '#10b981');

  // 5. Official Golden Seal in Center Bottom
  const sealX = width / 2;
  const sealY = 870;
  ctx.save();
  ctx.beginPath();
  ctx.arc(sealX, sealY, 52, 0, Math.PI * 2);
  ctx.fillStyle = '#1e3a8a';
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.strokeStyle = '#fbbf24';
  ctx.stroke();

  // Seal inner star ring
  ctx.fillStyle = '#fbbf24';
  ctx.font = 'bold 15px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('VERIFIED', sealX, sealY - 10);
  ctx.fillText('EXCELLENCE', sealX, sealY + 12);
  ctx.restore();

  // 6. Footer metadata: Date & Certificate ID & Verification
  ctx.textAlign = 'left';
  ctx.fillStyle = '#94a3b8';
  ctx.font = '500 18px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(`Issue Date: ${data.date}`, 160, 960);
  ctx.fillText(`Test Standard: 5-char words / International WPM`, 160, 990);

  ctx.textAlign = 'right';
  const certId = data.certificateId || `TT-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
  ctx.fillText(`Certificate ID: ${certId}`, width - 160, 960);
  ctx.fillText(`Verified by Typing Tip Engine • typingtip.com`, width - 160, 990);

  return canvas;
}

export function downloadCertificate(data: CertificateData): void {
  const canvas = generateCertificateCanvas(data);
  const link = document.createElement('a');
  const safeName = (data.name || 'typist').toLowerCase().replace(/[^a-z0-9]/g, '-');
  link.download = `TypingTip-Certificate-${safeName}.png`;
  link.href = canvas.toDataURL('image/png');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
