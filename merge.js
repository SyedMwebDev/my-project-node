// merge.js
import fs from 'fs';
import path from 'path';
import PDFMerger from 'pdf-merger-js';

const pdfMerger = async (inputPath1, inputPath2) => {
  // Ensure the public folder exists before writing
  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const merger = new PDFMerger();
  await merger.add(inputPath1);
  await merger.add(inputPath2);

  // Use absolute path to save
  const outputPath = path.join(publicDir, 'merged.pdf');
  await merger.save(outputPath);
};

export { pdfMerger };
