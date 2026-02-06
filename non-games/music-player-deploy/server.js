const express = require('express');
const fs = require('fs');
const path = require('path');
const mm = require('music-metadata');

const app = express();
const PORT = process.env.PORT || 3000;

const ROOT = __dirname;
const MUSIC_DIR = path.join(ROOT, 'music');

// Serve static files from public directory
app.use(express.static(path.join(ROOT, 'public')));

// List all music files
app.get('/music/list', (_, res) => {
  try {
    if (!fs.existsSync(MUSIC_DIR)) {
      return res.json([]);
    }
    const files = fs.readdirSync(MUSIC_DIR)
      .filter(f => f.endsWith('.webm') || f.endsWith('.mkv') || f.endsWith('.mp3') || f.endsWith('.m4a') || f.endsWith('.ogg'));
    res.json(files);
  } catch (error) {
    console.error('Error listing music files:', error);
    res.status(500).json({ error: 'Failed to list music files' });
  }
});

// Serve music files
app.use('/music/files', express.static(MUSIC_DIR));

// Extract and serve embedded album art
app.get('/music/art/:file', async (req, res) => {
  const filePath = path.join(MUSIC_DIR, req.params.file);

  try {
    if (!fs.existsSync(filePath)) {
      return res.sendStatus(404);
    }

    const metadata = await mm.parseFile(filePath);
    const picture = metadata.common.picture?.[0];
    
    if (!picture) {
      return res.sendStatus(204); // No content - no album art
    }

    res.type(picture.format).send(picture.data);
  } catch (error) {
    console.error('Error extracting album art:', error);
    res.sendStatus(404);
  }
});

app.listen(PORT, () => {
  console.log(`▶ Music player running at http://localhost:${PORT}`);
  console.log(`📁 Music directory: ${MUSIC_DIR}`);
});
