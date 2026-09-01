# Repository Findings

Updated: 2026-09-01

## Summary

`work-gallery` is a client-side React portfolio archive. It presents creative work by category and brand, with images and video loaded from AWS S3 or an optional CDN.

## Runtime And Tooling

- React 19 with TypeScript
- Vite 8 beta for development and production builds
- React Router 7 for client-side routes
- Framer Motion for page and gallery animation
- `react-masonry-css` and Lucide React are installed; the current inspected page flow primarily uses CSS modules and Lucide controls
- Public S3 object URLs or a configured CDN provide browser-safe asset URLs

## Application Flow

1. `src/main.tsx` mounts `App`.
2. `src/App.tsx` provides the router, navigation, footer, scroll restoration, and animated route transitions.
3. `/` renders the home sections: hero, featured work, categories, and contact.
4. `/category/:categoryId` lists brands belonging to the selected category.
5. `/category/:categoryId/:brandId` filters projects for a brand and category, then opens media in a modal.
6. `src/data/projects.ts` converts `src/assets/images.json` into typed project records and category indexes at module load time.
7. `useAssetUrl` resolves `s3://...` references asynchronously through `src/utils/assets.ts`.

## Data And Asset Contract

`src/assets/images.json` is the content source. Each brand contains items with:

- `file` for a single image or video
- `files` for a carousel
- `title` for display text
- optional `aspectRatio`

Files ending in `.mp4` become `video` projects and are assigned to `reels`. Other single files and carousels become `image` or `carousel` projects in `social-media`. The special `featured` array contains filenames matched back to processed projects.

Project URLs are represented internally as `s3://<bucket>/<brand>/<filename>`. Resolution uses this order:

1. Return an existing HTTP URL unchanged.
2. Use `VITE_CDN_URL` plus the object key when configured.
3. Otherwise construct a public S3 object URL from the configured bucket and region.

## Local Development

```bash
npm install
npm run dev
```

Required or supported environment values are documented in `README.md`:

```env
VITE_AWS_REGION=
VITE_AWS_BUCKET_NAME=
VITE_CDN_URL=
VITE_CONTACT_EMAIL=
VITE_CONTACT_PHONE=
```

`.env` and `.env.*` are ignored by Git. Do not commit credentials. A CDN-only deployment should avoid exposing AWS credentials in the browser.

## Validation Snapshot

- `npm run build`: passes. Vite reports a minified JavaScript chunk above the 500 kB warning threshold.
- `npm run lint`: passes after typing metadata and adjusting the asset hook.

Lint and the TypeScript/Vite production build are both passing.

## Repository Notes

- `dist/` is generated output and is ignored.
- There are no test scripts or test files currently defined.
- Routes are client-side; production hosting must serve `index.html` as a fallback for nested paths.
- Category and brand labels are mostly derived from data. `src/data/brandMapping.ts` provides display names for known brand keys.
- Private S3 assets still require a server-side signing endpoint; this static client intentionally does not expose AWS credentials.

## Suggested Next Actions

1. Type the `images.json` import instead of using `any`.
2. Refactor the empty-key branch in `useAssetUrl` to satisfy the current React hooks lint rule.
3. Add a minimal content transformation test or assertion for carousel, video, featured, and missing-asset cases.
4. Split the large production JavaScript chunk only if load performance becomes a measured problem.
