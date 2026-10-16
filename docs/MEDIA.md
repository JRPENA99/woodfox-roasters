# Photos, packaging and video

## Product packaging images

Coffee bags live in `public/media/images/products/`, three files per product:

| File | Use |
| --- | --- |
| `<name>-560.webp` | cards, thumbnails, phones |
| `<name>-1120.webp` | large displays and high-density screens |
| `<name>.png` | fallback for browsers without WebP (original, transparent) |

Current images are packaging concepts: House Blend No. 01, Single Origin and Espresso Blend.
To add or replace one, export a transparent PNG at about 1122 × 1402 px, then create the WebP files:

```bash
ffmpeg -i bag.png -c:v libwebp -quality 88 -pix_fmt yuva420p name-1120.webp
ffmpeg -i bag.png -vf scale=560:-2 -c:v libwebp -quality 88 -pix_fmt yuva420p name-560.webp
```

Then point the product's `image.base` in `src/data/products.ts` at `/media/images/products/name`.
Every bag is shown on its `backdrop` colour at the same scale and is never cropped or stretched.

## Photography

Other photos are listed in `src/data/images.ts`. Most are Unsplash stand-ins used for context
(farms, cherries, roasting). Replace them with Woodfox photography by putting the file in
`public/media/images/` and changing its `src` and `alt`.

## Hero video

The homepage film is Woodfox's own harvest footage, served from
`public/media/video/hero-harvest-1080.mp4` (1080p, about 8 MB). It loads only on screens 768 px and
wider, and never for visitors who prefer reduced motion or have data saver on; everyone else sees
the still frame `public/media/images/hero-poster.jpg`.
