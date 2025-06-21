// merge.js
import fs from 'fs';
import path from 'path';
import PDFMerger from 'pdf-merger-js';

export async function pdfMerger(inputPath1, inputPath2) {
  // ensure public folder exists
  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const merger = new PDFMerger();
  await merger.add(inputPath1);
  await merger.add(inputPath2);

  const outputPath = path.join(publicDir, 'merged.pdf');
  await merger.save(outputPath);
}
