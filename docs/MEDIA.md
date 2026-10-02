# Photos and video

## Replacing a photo

Every photo is listed once in `src/data/images.ts`, e.g.

```ts
cherriesRipe: {
  src: 'https://images.unsplash.com/photo-…',   // placeholder
  alt: 'Ripe red coffee cherries among dark green leaves',
  position: '50% 50%',
  placeholder: true,
},
```

To replace it:

1. Export your photo as JPEG or WebP, about **2400 px on the long edge**, quality around 80%.
2. Put it in `public/media/images/`, e.g. `public/media/images/cherries-ripe.jpg`.
3. Set `src: '/media/images/cherries-ripe.jpg'`, update `alt` to describe the new photo, and remove `placeholder: true`.
4. If the crop cuts off the subject on phones, adjust `position` (e.g. `'30% 50%'` moves the focus left).

Current placeholders are free-licence Unsplash images, loaded at a size that fits each screen. They are
stand-ins only and should be replaced with Woodfox-owned photography before launch.

### Photos that would help most

- Ripe cherries on the plant (hero still, "How we choose", contact page)
- A wide landscape of a growing region (homepage Origin section, Sourcing header)
- Hands picking or sorting cherries
- Green coffee, close up
- Your roaster, and coffee in the cooling tray
- Brewing, used sparingly

## Hero video

The homepage hero currently streams `hero-harvest.mp4` from the live woodfoxroasters.com
(a 4K file of about 73 MB). For production, add a web-sized copy to the project:

1. Re-encode to 1920×1080 H.264, no audio, about 4–8 MB. With [ffmpeg](https://ffmpeg.org):

   ```bash
   ffmpeg -i hero-harvest.mp4 -vf "scale=1920:-2" -c:v libx264 -crf 26 -preset slow -an -movflags +faststart hero-harvest-1080.mp4
   ```

2. Save it as `public/media/video/hero-harvest-1080.mp4`.
3. In `src/config/site.ts`, set `heroVideo.src` to `'/media/video/hero-harvest-1080.mp4'`.

The video is only loaded on screens 768 px and wider, and never for visitors who have asked their
device to reduce motion or save data. Everyone else sees the still photo (`heroPoster` in
`images.ts`). A pause button is included for accessibility.
