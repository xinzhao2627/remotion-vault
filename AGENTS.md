# Software promo workspace

Use the installed Remotion plugin and project-local Remotion skills for all video work. Read the relevant creation, markup, interactivity, Studio, and rendering guidance before changing a composition. Consult current official documentation for unfamiliar APIs.

## Creative direction

The user wants an Apple-caliber software pitch. Interpret this as disciplined art direction: generous negative space, exceptional typography, clear product demonstrations, purposeful camera movement, precise easing, and sound synchronized to meaningful events. Establish the actual software, audience, strongest benefit, brand assets, and call to action before authoring a product-specific film.

- Make one idea dominate each shot. Prefer brief, concrete copy.
- Show the real product and a believable workflow. Use supplied captures or faithful recreations; do not invent features, customers, metrics, or endorsements.
- Build the narrative around a viewer's problem, the product's payoff, a demonstrated workflow, and one clear next step.
- Use restrained light, shadows, and depth. Avoid unrelated decoration, random particles, constant bouncing, and generic feature-card montages.
- Treat typography, music, and pacing as part of the edit. Let important moments breathe.
- Apple is a quality reference. Preserve the software's own identity.

## Implementation

- Use deterministic frame-based animation; no CSS animation, timers, or unseeded randomness.
- Keep substantial scenes in separate files and register them for standalone Studio editing. Give independently editable scenes and layers separate authored JSX nodes.
- Keep composition metadata and default props inline. Prefer Studio-editable interactive markup where useful.
- Use `useVideoConfig()` for frame rate and `useCurrentFrame()` for motion. Premount timed scenes and media for one second.
- Keep assets in `public/`, reference them with `staticFile()`, and load fonts before rendering. Retain font licenses and asset provenance.
- Use `npx remotion add` for matching Remotion packages. Keep all Remotion package versions aligned and commit the npm lockfile when committing project changes.
- The starter is a motion study, not the software's final promo. Adapt the art direction after receiving the actual brief.

## Preview and verification

Start Studio before editing a video and keep it available while working. Verify the composition loads, scrub important moments and cut boundaries, check readable text and asset loading, and run `npm run check` before delivery. Use stills for visual QA when browser control is unavailable. Verify audio transitions when audio is added.

Only render/export a complete video when the user asks for an export. Initialization and preview requests do not imply a final MP4.
