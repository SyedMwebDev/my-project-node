const express = require('express');
const path = require('path');
const multer = require('multer');
const { pdfMerger } = require('./merge');

const app = express();
const port = 3000;
const upload = multer({ dest: 'uploads/' });

// Serve static files from 'public' folder (merged PDF will be here)
app.use('/static', express.static(path.join(__dirname, 'public')));

// Serve HTML form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates/index.html'));
});

// Handle PDF merge
app.post('/merge', upload.array('pdfs', 2), async (req, res) => {
    try {
        console.log(req.files);

        // Merge the two uploaded PDFs
        await pdfMerger(
            path.join(__dirname, req.files[0].path),
            path.join(__dirname, req.files[1].path)
        );

        // Redirect to the merged PDF file
        res.redirect('/static/merged.pdf');
    } catch (error) {
        console.error('Merging failed:', error);
        res.status(500).send('Error while merging PDFs.');
    }
});

app.listen(port, () => {
    console.log(`App running at http://localhost:${port}`);
});
