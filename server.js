// server.js
const express = require('express');
const path = require('path');
const multer = require('multer');
const { pdfMerger } = require('./merge');

const app = express();
const port = process.env.PORT || 3000;

// Ensure your folders exist: uploads/ and public/
const upload = multer({ dest: 'uploads/' });

// Serve static files (merged PDF will live here)
app.use('/static', express.static(path.join(__dirname, 'public')));

// Serve your HTML form
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates', 'index.html'));
});

// Handle the merge request
app.post('/merge', upload.array('pdfs', 2), async (req, res) => {
  try {
    const file1 = path.join(__dirname, req.files[0].path);
    const file2 = path.join(__dirname, req.files[1].path);

    await pdfMerger(file1, file2);

    // Redirect to the merged file
    res.redirect('/static/merged.pdf');
  } catch (err) {
    console.error('Merge error:', err);
    res.status(500).send('Failed to merge PDFs.');
  }
});

// Start server
app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
