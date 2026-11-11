# APERTURE autoplay and responsive framing

User direction: the Phoenix is an animation and must begin when the site opens on Android, tablet and desktop.

- `dist/scene.js`: removed the mobile click-to-load requirement, data-saving gate and desktop 3.5-second delay. The WebGL module is requested immediately on entry. A static image remains only during loading or when WebGL fails.
- `dist/aperture.js`: starts in running state on every viewport. Explicit pause/resume remains available. Reduced-motion mode uses a slower pace and disables pointer tilt rather than forcing a still image. Hidden tabs and off-screen scenes suspend rendering, then resume when visible unless the visitor explicitly paused.
- Camera distance is recalculated from the canvas aspect ratio with room for wings and orbital geometry. Renderer pixel density adjusts after resizing. Context restoration returns to the working renderer and controls.
- `dist/motion.css`: responsive scene aspect/height, full-width portrait-tablet panel, readable toolbar, mobile spacing, and no empty legacy scene spacer. Hide the static poster immediately after WebGL is ready to prevent overlapping Phoenix silhouettes during cross-fade.
- `scripts/check-aperture.cjs`: seven Chromium scenarios, including Android/touch emulation, portrait/landscape tablets, desktop and reduced-motion. Checks immediate module request without interaction, actual animation-time advancement, pause/resume, no horizontal overflow, canvas dimensions, rotation resize and desktop WebGL context loss/recovery. Screenshots/results are stored under ignored `qa/aperture/`.

These are browser/emulation checks, not a physical Android device performance certification. The prior Lighthouse scores in the main audit report were measured before this autoplay change and should not be presented as measurements of this build.

Local source/preview update only; no publication was performed.
