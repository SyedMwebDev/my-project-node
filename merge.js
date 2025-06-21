// merge.js
const path = require('path');

const pdfMerger = async (inputPath1, inputPath2) => {
  // Dynamically import the ES‐module
  const { default: PDFMerger } = await import('pdf-merger-js');
  const merger = new PDFMerger();

  // Merge all pages of both PDFs
  await merger.add(inputPath1);
  await merger.add(inputPath2);

  // Save merged PDF into public/merged.pdf
  const outputPath = path.join('public', 'merged.pdf');
  await merger.save(outputPath);
};

module.exports = { pdfMerger };
