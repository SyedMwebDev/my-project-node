import express from 'express';
import path from 'path';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { pdfMerger } from './merge.js';

const app = express();
const upload = multer({ dest: 'uploads/' });
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/static', express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates/index.html'));
});

// In server.js, modify your POST handler to:
app.post('/merge', upload.array('pdfs', 2), async (req, res) => {
  try {
    const file1 = path.join(__dirname, req.files[0].path);
    const file2 = path.join(__dirname, req.files[1].path);

    await pdfMerger(file1, file2);

    res.redirect('/static/merged.pdf');
  } catch (err) {
    console.error('Merge Error:', err);
    // Send back the real error message for debugging:
    res.status(500).send(`PDF merge failed: ${err.message}`);
  }
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
