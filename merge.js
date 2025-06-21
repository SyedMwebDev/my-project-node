import PDFMerger from 'pdf-merger-js';

const pdfMerger = async (p1, p2) => {
    const merger = new PDFMerger();
    await merger.add(p1);
    await merger.add(p2);
    await merger.save('public/merged.pdf');
};

export { pdfMerger };
