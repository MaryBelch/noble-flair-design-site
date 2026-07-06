# Image Optimization — Approach

## Current State

Images in the project are stored in `public/images/` and referenced directly:

```html
<img src="/images/portfolio-1.jpg" alt="..." />
```

This works but has no optimization:
- No responsive sizing (serves full-resolution to mobile)
- No WebP/AVIF conversion
- No lazy loading (except manual `loading="lazy"`)
- No CDN caching

## Recommended Approach: Cloudinary (Zero Build Changes)

Cloudinary is the simplest option for a static site on GitHub Pages. It works at the **URL level** — no build plugins needed.

### How It Works

Upload your images to Cloudinary (free tier: 25 GB storage, 25 GB bandwidth/month), then use their URL transforms:

```html
<!-- Original: ~2 MB JPEG → auto-format + quality + width -->
<img
  src="https://res.cloudinary.com/YOUR_CLOUD/image/upload/f_auto,q_auto,w_800/v1/portfolio-1"
  srcset="
    https://res.cloudinary.com/YOUR_CLOUD/image/upload/f_auto,q_auto,w_400/v1/portfolio-1 400w,
    https://res.cloudinary.com/YOUR_CLOUD/image/upload/f_auto,q_auto,w_800/v1/portfolio-1 800w,
    https://res.cloudinary.com/YOUR_CLOUD/image/upload/f_auto,q_auto,w_1200/v1/portfolio-1 1200w
  "
  sizes="(max-width: 768px) 100vw, 50vw"
  alt="Portfolio item"
  loading="lazy"
/>
```

Key URL parameters:
| Param | Effect |
|---|---|
| `f_auto` | Serve WebP when supported, fallback to original format |
| `q_auto` | Auto-quality (balancing file size and visual quality) |
| `w_N` | Resize to N pixels wide |
| `c_limit` | Don't upscale — only shrink |

### Migration Steps

1. **Create a free Cloudinary account** at https://cloudinary.com
2. **Upload existing images** via Media Library or API.
3. **Update image URLs** in components (or create a helper component).
4. **Bonus**: Add a `CloudinaryImage` React component for reuse:

```jsx
const CLOUD_NAME = 'YOUR_CLOUD';

export default function CloudinaryImage({ publicId, alt, width = 800, className }) {
  const base = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_auto,q_auto,w_${width}/v1/`;
  return (
    <img
      src={`${base}${publicId}`}
      alt={alt}
      className={className}
      loading="lazy"
    />
  );
}
```

## Alternative: Vite Plugin Approach

If you prefer no external service, use `vite-plugin-imagemin` or `vite-imagetools`:

```bash
npm install -D vite-imagetools
```

`vite.config.js`:
```js
import { imagetools } from 'vite-imagetools';

export default defineConfig({
  plugins: [react(), imagetools()],
});
```

Then in components:
```jsx
import image from '/images/portfolio-1.jpg?w=800&webp';
```

**Downside**: Images are optimized at build time, included in the bundle, and still served from GitHub Pages without CDN edge caching.

## Recommendation

**Use Cloudinary** for:
- Automatic WebP/AVIF conversion (`f_auto`)
- Responsive resizing without build-time overhead
- CDN delivery (images served from Cloudinary's edge, not GitHub Pages)
- Free tier is generous enough for a portfolio site
- No vendor lock-in — URLs are portable

If Cloudinary is too much setup, add `loading="lazy"` to all `<img>` tags immediately (zero-cost improvement) and compress images manually with a tool like [Squoosh](https://squoosh.app) before uploading to the repo.

## Low-Effort First Step (No Build Changes)

Add `loading="lazy"` to all images and use `<picture>` with pre-converted WebP sources:

```html
<picture>
  <source srcset="/images/portfolio-1.webp" type="image/webp" />
  <img src="/images/portfolio-1.jpg" alt="..." loading="lazy" />
</picture>
```

Manually convert key images to WebP using Squoosh or similar.
