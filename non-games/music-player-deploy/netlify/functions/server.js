const serverless = require('serverless-http');
const express = require('express');
const fs = require('fs');
const path = require('path');
const mm = require('music-metadata');

const app = express();

const MUSIC_DIR = path.join(__dirname, '../../music');

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
app.get('/music/files/:file', (req, res) => {
  const filePath = path.join(MUSIC_DIR, req.params.file);
  
  if (!fs.existsSync(filePath)) {
    return res.status(404).send('File not found');
  }
  
  res.sendFile(filePath);
});

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
      return res.sendStatus(204);
    }

    res.type(picture.format).send(picture.data);
  } catch (error) {
    console.error('Error extracting album art:', error);
    res.sendStatus(404);
  }
});

module.exports.handler = serverless(app);
