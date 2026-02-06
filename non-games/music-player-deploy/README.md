# Music Player - Deployment Ready

A beautiful, modern music player that works with your local music files and supports embedded album art extraction.

## Features

- 🎵 Play .webm, .mkv, .mp3, .m4a, and .ogg files
- 🎨 Automatic album art extraction from embedded metadata
- 🔍 Real-time search functionality
- 🔀 Shuffle and repeat modes
- 💾 Remembers last played track
- 📱 Responsive design

## Project Structure

```
music-player-deploy/
├── server.js              # Main Express server
├── package.json           # Dependencies
├── vercel.json           # Vercel configuration
├── netlify.toml          # Netlify configuration
├── public/
│   └── index.html        # Frontend UI
├── netlify/
│   └── functions/
│       └── server.js     # Netlify serverless function
└── music/                # Your music files go here (create this folder)
```

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Add Your Music

Create a `music` folder in the project root and add your music files:

```bash
mkdir music
# Copy your .webm, .mkv, .mp3, .m4a, or .ogg files to the music folder
```

### 3. Test Locally

```bash
npm start
```

Visit `http://localhost:3000` to test the player.

## Deployment Options

### Option 1: Vercel (Recommended)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

**Important for Vercel:**
- The `music` folder with your files must be uploaded
- Vercel has a 100MB deployment size limit for the free tier
- For larger music libraries, consider upgrading to Pro or using Netlify

### Option 2: Netlify

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Login to Netlify:
```bash
netlify login
```

3. Deploy:
```bash
netlify deploy --prod
```

**Important for Netlify:**
- You'll need to add `serverless-http` to package.json:
```bash
npm install serverless-http
```
- The `music` folder must be uploaded with your deployment

### Option 3: Manual Deployment

You can also deploy to any Node.js hosting platform:

- **Railway**: Connect your GitHub repo
- **Render**: Connect your GitHub repo and set build command to `npm install`
- **Fly.io**: Use `flyctl launch`
- **DigitalOcean App Platform**: Connect your GitHub repo

## Configuration

### Environment Variables

You can set custom port:

```bash
PORT=3000 npm start
```

### Supported Audio Formats

The player supports:
- `.webm` - WebM audio
- `.mkv` - Matroska video/audio
- `.mp3` - MP3 audio
- `.m4a` - AAC audio
- `.ogg` - Ogg Vorbis audio

## How It Works

### Backend (server.js)

1. **`/music/list`** - Returns JSON array of all music files
2. **`/music/files/:filename`** - Streams the requested audio file
3. **`/music/art/:filename`** - Extracts and serves embedded album art using `music-metadata` library

### Frontend (public/index.html)

- Clean, modern UI with dark theme
- Search functionality to filter tracks
- Playback controls (play, pause, next, previous)
- Seek bar and volume control
- Shuffle and repeat modes
- Remembers last played track using localStorage

## Troubleshooting

### Music files not showing up

1. Make sure the `music` folder exists in the project root
2. Check that your files have supported extensions
3. Verify the server has read permissions for the music folder

### Album art not displaying

- The app uses the `music-metadata` library to extract embedded album art
- If no album art is embedded in the file, a placeholder will show
- Make sure your music files have album art embedded

### Deployment size limits

- **Vercel Free**: 100MB total deployment size
- **Netlify Free**: 100MB for functions, separate from static files

For larger libraries:
- Use a CDN for music files
- Upgrade to paid tier
- Use a dedicated media server

## Development

To modify the player:

1. **Frontend changes**: Edit `public/index.html`
2. **Backend changes**: Edit `server.js`
3. **Test locally**: Run `npm start`

## License

This is an open-source project. Feel free to modify and use as needed.

## Credits

Ported from an Electron app to work with modern hosting platforms like Vercel and Netlify.
