const PDFMerger = require('pdf-merger-js').default; // ✅ use .default

const pdfMerger = async (p1, p2) => {
    const merger = new PDFMerger(); // ✅ moved inside function to avoid reuse
    await merger.add(p1);
    await merger.add(p2);
    await merger.save('public/merged.pdf');
};

module.exports = { pdfMerger };
