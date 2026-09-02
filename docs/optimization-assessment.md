# Optimization Assessment

Updated: 2026-09-01

## Priority 0: Security

### Remove AWS secrets from the browser

`src/utils/assets.ts:4-9` reads `VITE_AWS_ACCESS_KEY_ID` and `VITE_AWS_SECRET_ACCESS_KEY`. Vite embeds `VITE_*` values in the client bundle, so every visitor can retrieve and reuse these credentials.

Recommended direction:

1. Rotate any credentials that have been used with this deployment.
2. Prefer public or signed CloudFront/CDN asset URLs for this read-only gallery.
3. If objects must remain private, generate signed URLs in a server-side endpoint and return only the asset URL to the browser.
4. Restrict the bucket policy and IAM permissions to read-only access for the required prefix.

This is more important than client-side performance work.

## Priority 1: Release Quality

### Fix lint failures

The metadata and hook issues were fixed. `npm run lint` now passes.

### Address dependency audit findings

`npm audit fix` was run and `npm audit --omit=dev` now reports zero vulnerabilities. The unused AWS SDK dependencies were also removed.

### Add basic automated coverage

`npm run test:content` now provides a dependency-free content validation check for:

- single image metadata
- `.mp4` reel metadata
- carousel metadata
- featured filename matching
- malformed or missing filenames

## Priority 2: Accessibility And Correctness

- Clickable cards now use links/buttons in the category and featured-work flows.
- Navigation, modal, and carousel controls now have accessible names and state.
- The modal now provides dialog semantics, Escape handling, focus restoration, and focus containment.
- Carousel image alternatives, visible focus styles, and reduced-motion behavior are implemented.
- A not-found route now handles unknown paths, categories, and brands.
- Category pages now expose project thumbnails directly, so a separate BrandPage is no longer needed.

## Priority 3: Asset Loading

- Images use lazy loading and async decoding; videos use `preload="metadata"` so thumbnails can display their first frame without downloading the full file.
- Poster images remain a content follow-up because no poster metadata exists in `images.json`.
- Carousel slides still mount together, but browser image loading is lazy and asset URLs are cached in the asset layer.
- The previous duplicate signing concern is removed with the client-side signing path; URL resolution is now a local public-URL conversion.
- Carousel aspect ratios are passed through to skeletons.

## Priority 4: Build And Maintenance

- The production bundle is now about 386 kB minified after removing the AWS SDK. Measure real load performance before adding route-level splitting.
- Pin or more tightly control dependency versions. The project uses the Vite 8 beta range, and the installed version is `8.0.0-beta.15` even though `package.json` starts at `beta.13`.
- Keep generated `dist/` out of source control; it is already ignored.
- Move inline footer styles from `src/App.tsx:49-53` into the existing stylesheet system for consistency.
- Remove unused or duplicated CSS/declarations only after confirming they are not needed by the responsive layouts.
- Add production security headers such as a Content Security Policy and `Referrer-Policy` at the hosting layer.

## Verification

| Command | Result |
| --- | --- |
| `npm run build` | Passes; main JavaScript bundle is about 386 kB minified |
| `npm run lint` | Passes |
| `npm audit --omit=dev` | Passes with 0 vulnerabilities |
| `npm run test:content` | Passes; validates 102 media files |

## Recommended Order

1. Rotate any credentials used by the old browser-side AWS implementation.
2. Configure a CDN or public S3 object access for deployed assets.
3. Add poster metadata if video thumbnails need stronger loading behavior.
4. Add deployment security headers at the hosting layer.
