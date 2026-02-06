# 🎵 Quick Start Reference

## ⚡ 60-Second Setup

```bash
# 1. Install dependencies
npm install

# 2. Add music files
# Copy your .mp3, .webm, .mkv, .m4a, or .ogg files to the 'music' folder

# 3. Test locally
npm start
# Visit http://localhost:3000

# 4. Deploy to Vercel (easiest)
npm install -g vercel
vercel login
vercel
```

## 📁 Project Structure
```
music-player-deploy/
├── server.js          # Backend server
├── package.json       # Dependencies
├── public/
│   └── index.html    # Music player UI
└── music/            # Add your music files here! ⭐
```

## 🚀 Deploy Commands

| Platform | Command |
|----------|---------|
| Vercel   | `vercel` |
| Netlify  | `netlify deploy --prod` |
| Railway  | `railway up` |

## 🎵 Supported Formats
- .mp3
- .webm
- .mkv
- .m4a
- .ogg

## ⚠️ Important Notes

1. **Add music files** to the `music/` folder
2. **100MB limit** on free tiers (Vercel/Netlify)
3. **Album art** automatically extracted from file metadata
4. **Local testing** before deploy: `npm start`

## 🆘 Quick Fixes

**Music not showing?**
- Verify files are in `music/` folder
- Check file extensions are supported
- Run `npm start` to test locally

**Deployment too large?**
- Remove unused files
- Compress audio files
- Upgrade to paid tier
- Use fewer songs initially

**Can't deploy?**
- Run `npm install` first
- Check you're logged in: `vercel login`
- Verify all files are present

## 📖 Full Documentation
- `README.md` - Complete guide
- `DEPLOYMENT.md` - Detailed deployment instructions

## 🎯 What's Next?

1. Customize the UI in `public/index.html`
2. Add more audio format support in `server.js`
3. Set up custom domain on your hosting platform
4. Share with friends! 🎉
