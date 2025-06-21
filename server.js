// server.js
import fs from 'fs';
import path from 'path';
import express from 'express';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { pdfMerger } from './merge.js';

// Auto-create uploads/ and public/ on every startup
for (const dir of ['uploads', 'public']) {
  const dirPath = path.join(process.cwd(), dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const upload = multer({ dest: 'uploads/' });
const port = process.env.PORT || 3000;

// Serve merged PDF and other static assets
app.use('/static', express.static(path.join(__dirname, 'public')));

// Serve the HTML form
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates', 'index.html'));
});

// Handle PDF merge
app.post('/merge', upload.array('pdfs', 2), async (req, res) => {
  try {
    const file1 = path.join(__dirname, req.files[0].path);
    const file2 = path.join(__dirname, req.files[1].path);

    await pdfMerger(file1, file2);

    // Redirect client to the merged PDF
    res.redirect('/static/merged.pdf');
  } catch (err) {
    console.error('Merge Error:', err);
    res.status(500).send(`PDF merge failed: ${err.message}`);
  }
});

// Start server
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
