# Assets Folder

This folder is for storing images and audio files for your Valentine's website.

## How to Add Photos

1. **Upload a photo** to this folder via GitHub's web interface
2. **Name it clearly**, e.g., `arya-photo.jpg` or `us-together.jpg`
3. **Update index.html** to reference the image:
   ```html
   <img src="assets/arya-photo.jpg" alt="Arya" />
   ```

## How to Add Background Music

You have two options:

### Option 1: Upload to This Folder (if under 25MB)
1. Upload your MP3 file here, e.g., `our-song.mp3`
2. Update `config.js`:
   ```javascript
   music: {
     musicUrl: "assets/our-song.mp3"
   }
   ```

### Option 2: Use Cloudinary (Recommended)
1. Go to [Cloudinary.com](https://cloudinary.com/) and sign up (free)
2. Upload your music file
3. Copy the URL and paste it in `config.js` under `musicUrl`

## File Organization

```
assets/
├── README.md (this file)
├── arya.jpg (example photo)
├── us-together.jpg (example photo)
└── our-song.mp3 (example audio - or use Cloudinary link)
```

## Tips

- Keep image file sizes small (under 2MB) for faster loading
- Use .jpg or .png for photos
- Use .mp3 for audio files
- Alt text is important for accessibility

Happy customizing! 💝
