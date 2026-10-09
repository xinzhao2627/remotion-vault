# Software promo production workspace

Remotion 4.0.534 with React, TypeScript, npm, and all 12 official project-local Remotion skills. Initialized using the [official blank scaffold](https://www.remotion.dev/docs/).

`VaultPitch` is the current 55-second storyboard at 1920 x 1080/30 fps. It restores the document-to-answer story at a moderate pace, followed by a short “there's more” interlude: two three-second, four-phone showcases covering six extra features. Offline use and the local vector/RAG pipeline provide the closing payoff. Footage remains replaceable. Narration and music are pending, with review cues and audio slots prepared. The original `MotionStudy` remains available for typography calibration.

## Preview

```powershell
npm install
npm run dev
```

Open the URL printed by Studio, normally http://localhost:3000/VaultPitch. Studio is kept running during creation so you can preview changes. Current compositions are in `Vault-Scenes` and `Vault-Story-Scenes`; the earlier feature-reel layouts remain as studies.

## Checks and exports

```powershell
npm run check
npm run compositions
npm run build
npm run still
npm run still:vault
```

Export when ready:

```powershell
npm run render:hd
```

`render:hd` exports `VaultPitch` when explicitly requested. Its H.264 preset uses CRF 16 and yuv420p for high-quality, broadly compatible playback. Outputs go to the ignored `out/` directory. The current storyboard is a silent draft until real recordings, narration, and music are supplied.

## Production preparation

- `docs/production-brief.md`: product inputs, narrative plan, and review criteria.
- `docs/storyboard-preview.md`: current preview status and timing.
- `public/assets/vault/README.md`: clip and audio replacement instructions.
- `AGENTS.md`: persistent creative and technical guidance.
- `src/design/`: local font loading and initial palette/motion tokens.
- `public/assets/`: product captures, brand assets, and soundtrack assets.
- `docs/asset-manifest.md`: provenance and license notes.
- `.agents/skills/`: official Remotion skills, pinned by `skills-lock.json`.

Media, transitions, font loading, paths, text-layout utilities, and Zod prop controls are installed. Design and image-generation skills are available in the agent environment. External voiceover services are optional and are not configured.

The creative target is disciplined software storytelling: generous space, precise typography, intentional movement, convincing product demonstrations, and carefully timed sound. Brand choices and copy follow the actual product, audience, and benefit.

Update packages and local Remotion skills with `npm run upgrade`; verify package alignment with `npx remotion versions`. Keep the lockfile. Never store API keys in source control.

## Known tooling issue

At initialization, `npm audit` reports ten high-severity entries originating in a `braces` stack-exhaustion advisory through the development lint dependency chain. `npm audit fix` found no compatible fix. This remains unresolved; it does not prevent the project's functional checks. Recheck with future tooling updates. Advisory: https://github.com/advisories/GHSA-vfj7-8cjw-p6xm
