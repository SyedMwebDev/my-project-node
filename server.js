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

app.post('/merge', upload.array('pdfs', 2), async (req, res) => {
    try {
        await pdfMerger(
            path.join(__dirname, req.files[0].path),
            path.join(__dirname, req.files[1].path)
        );
        res.redirect('/static/merged.pdf');
    } catch (err) {
        console.error('Merge Error:', err);
        res.status(500).send('Internal Server Error during PDF merge.');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
